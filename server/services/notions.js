import { Client, collectPaginatedAPI } from '@notionhq/client'

let notionClient = null
let dataSourceId = null

function getClient() {
  if (!process.env.NOTION_API_KEY) {
    throw new Error('NOTION_API_KEY is not set — copy server/.env.example to server/.env and add your key.')
  }
  if (!notionClient) {
    notionClient = new Client({ auth: process.env.NOTION_API_KEY })
  }
  return notionClient
}

// Databases and their queryable data live under separate IDs in the Notion API —
// resolve the database's first data source once and cache it for the process lifetime.
async function getDataSourceId() {
  if (dataSourceId) return dataSourceId

  const databaseId = process.env.NOTION_DATABASE_ID
  if (!databaseId) {
    throw new Error('NOTION_DATABASE_ID is not set — copy server/.env.example to server/.env and add your database ID.')
  }

  const notion = getClient()
  const database = await notion.databases.retrieve({ database_id: databaseId })
  dataSourceId = database.data_sources[0]?.id
  if (!dataSourceId) {
    throw new Error(`Notion database ${databaseId} has no data sources.`)
  }
  return dataSourceId
}

function getTitle(prop) {
  return prop?.title?.map((t) => t.plain_text).join('') || ''
}

function getRichText(prop) {
  return prop?.rich_text?.map((t) => t.plain_text).join('') || ''
}

function getSelect(prop) {
  return prop?.select?.name ?? null
}

function getDate(prop) {
  return prop?.date?.start ?? null
}

function getCheckbox(prop) {
  return prop?.checkbox ?? false
}

function getUrl(prop) {
  return prop?.url ?? null
}

function getMultiSelect(prop) {
  return prop?.multi_select?.map((o) => o.name) ?? []
}

function getPlace(prop) {
  return prop?.place?.name ?? prop?.place?.address ?? null
}

export function mapPageToNewsEvent(page) {
  const props = page.properties
  return {
    id: page.id,
    title: getTitle(props['Title']),
    type: getSelect(props['Type']),
    status: getSelect(props['Status']),
    publishDate: getDate(props['Published Date']),
    featured: getCheckbox(props['Featured']),
    category: getMultiSelect(props['Category']),
    summary: getRichText(props['Description']),
    featuredImage: getUrl(props['Image']),
    slug: getRichText(props['Slug']),
    startDate: getDate(props['Start Date']),
    endDate: getDate(props['End Date']),
    location: getPlace(props['Location']),
    registrationUrl: getUrl(props['Registration URL']),
  }
}

// The Slug property is free text and routinely left blank, which used to leave an item
// with no addressable URL at all. Derive one from the title instead so every published
// item is reachable.
export function slugify(value) {
  return value
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

// Fills in a slug for any item missing one. Explicit Slug values are claimed first so
// that publishing a new item can never steal the URL of one that already had a slug
// set. Collisions between derived slugs are broken with the Notion page id, which keeps
// a given item's URL stable no matter what else gets published around it.
export function resolveSlugs(items) {
  const taken = new Set(items.map((item) => item.slug).filter(Boolean))

  return items.map((item) => {
    if (item.slug) return item

    const shortId = item.id.replace(/-/g, '').slice(0, 8)
    const base = slugify(item.title)
    if (!base) return { ...item, slug: shortId }

    const slug = taken.has(base) ? `${base}-${shortId}` : base
    taken.add(slug)
    return { ...item, slug }
  })
}

export async function getPublishedNewsEvents() {
  const notion = getClient()
  const data_source_id = await getDataSourceId()
  const today = new Date().toISOString().slice(0, 10)

  const results = await collectPaginatedAPI(notion.dataSources.query, {
    data_source_id,
    filter: {
      and: [
        { property: 'Status', select: { equals: 'Published' } },
        { property: 'Published Date', date: { on_or_before: today } },
      ],
    },
    sorts: [{ property: 'Published Date', direction: 'descending' }],
  })

  return resolveSlugs(results.map(mapPageToNewsEvent))
}

export async function getPublishedNewsEventBySlug(slug) {
  const items = await getPublishedNewsEvents()
  return items.find((item) => item.slug === slug) ?? null
}

function richTextToPlain(runs) {
  return (runs ?? []).map((run) => run.plain_text ?? '').join('')
}

// Keeps the annotations the article view actually renders and drops the rest
// (colours, underline, mentions) — those would only ever be styled away again.
function mapRichText(runs) {
  return (runs ?? [])
    .filter((run) => run.plain_text)
    .map((run) => ({
      text: run.plain_text,
      bold: Boolean(run.annotations?.bold),
      italic: Boolean(run.annotations?.italic),
      code: Boolean(run.annotations?.code),
      href: run.href ?? null,
    }))
}

// A Notion file value is either hosted by Notion (a signed, expiring URL) or an
// external link. Callers get whichever applies; see getPageContent on expiry.
function getFileUrl(file) {
  if (file?.type === 'external') return file.external?.url ?? null
  return file?.file?.url ?? null
}

// Block types that carry rich text, mapped to the node type the client renders.
// A toggle's own text becomes a paragraph and its children are flattened after it,
// since the article view has no disclosure UI.
const TEXT_BLOCKS = {
  paragraph: 'paragraph',
  quote: 'quote',
  callout: 'callout',
  toggle: 'paragraph',
  bulleted_list_item: 'bulleted-list-item',
  numbered_list_item: 'numbered-list-item',
}

// heading_1 maps to level 2: the page's <h1> is the item title, not a body heading.
const HEADING_LEVELS = { heading_1: 2, heading_2: 3, heading_3: 4 }

// Turns one Notion block into a content node, or null when the block holds nothing
// worth rendering — an empty paragraph (Notion pages are full of them), or a type
// the article view doesn't support. Dropping those beats half-rendering them.
export function mapBlock(block) {
  const type = block?.type
  if (!type) return null

  if (TEXT_BLOCKS[type]) {
    const richText = mapRichText(block[type]?.rich_text)
    return richText.length > 0 ? { type: TEXT_BLOCKS[type], richText } : null
  }

  if (HEADING_LEVELS[type]) {
    const richText = mapRichText(block[type]?.rich_text)
    return richText.length > 0 ? { type: 'heading', level: HEADING_LEVELS[type], richText } : null
  }

  if (type === 'image') {
    const url = getFileUrl(block.image)
    return url ? { type: 'image', url, caption: richTextToPlain(block.image?.caption) } : null
  }

  if (type === 'divider') return { type: 'divider' }

  return null
}

// Notion page bodies are trees; the article view renders a flat list. Nested blocks
// are appended after their parent, which reads correctly for the shapes editors
// actually use (lists inside lists, content inside columns or toggles).
const MAX_BLOCK_DEPTH = 3
const MAX_BLOCKS = 300

async function collectBlocks(notion, blockId, depth, out) {
  const blocks = await collectPaginatedAPI(notion.blocks.children.list, { block_id: blockId })

  for (const block of blocks) {
    if (out.length >= MAX_BLOCKS) break

    const node = mapBlock(block)
    if (node) out.push(node)

    if (block.has_children && depth + 1 <= MAX_BLOCK_DEPTH) {
      await collectBlocks(notion, block.id, depth + 1, out)
    }
  }

  return out
}

// The body an editor writes inside the Notion page, which is where the long-form
// detail and in-article pictures live (the database properties only hold a summary
// and one image). Notion-hosted image URLs are signed and expire about an hour after
// they're issued, so this is fetched per request rather than cached.
export async function getPageContent(pageId) {
  return collectBlocks(getClient(), pageId, 0, [])
}

// Every picture on the page in reading order, so the client's lightbox can page
// through them as one set. The featured image leads and is de-duplicated in case the
// editor also placed it in the body.
export function collectImages(item, content) {
  const images = []
  const seen = new Set()

  const add = (url, caption) => {
    if (!url || seen.has(url)) return
    seen.add(url)
    images.push({ url, caption })
  }

  add(item.featuredImage, item.title)
  for (const node of content) {
    if (node.type === 'image') add(node.url, node.caption)
  }

  return images
}

export async function getPublishedNewsEventDetail(slug) {
  const item = await getPublishedNewsEventBySlug(slug)
  if (!item) return null

  const content = await getPageContent(item.id)
  return { ...item, content, images: collectImages(item, content) }
}
