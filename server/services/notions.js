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

function mapPageToNewsEvent(page) {
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

  return results.map(mapPageToNewsEvent)
}

export async function getPublishedNewsEventBySlug(slug) {
  const items = await getPublishedNewsEvents()
  return items.find((item) => item.slug === slug) ?? null
}
