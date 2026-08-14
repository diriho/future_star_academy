import 'dotenv/config'
import { test, describe } from 'node:test'
import assert from 'node:assert/strict'
import { getPublishedNewsEvents, getPublishedNewsEventBySlug } from '../services/notions.js'

// Exercises the real Notion database configured in server/.env. Skips (rather than
// fails) when credentials aren't available, so the suite still runs for anyone who
// clones the repo without server/.env.
const hasCredentials = Boolean(process.env.NOTION_API_KEY && process.env.NOTION_DATABASE_ID)
const skip = hasCredentials ? false : 'NOTION_API_KEY / NOTION_DATABASE_ID not set — skipping live Notion query tests.'

const TYPES = new Set(['News', 'Event'])
const DATE_ONLY = /^\d{4}-\d{2}-\d{2}/

function isDateOnlyString(value) {
  return typeof value === 'string' && DATE_ONLY.test(value) && !Number.isNaN(new Date(value).getTime())
}

describe('getPublishedNewsEvents (live database)', { skip }, () => {
  test('resolves with at least one published item', async () => {
    const items = await getPublishedNewsEvents()
    assert.ok(Array.isArray(items), 'expected an array')
    assert.ok(
      items.length > 0,
      'expected at least one Published row with a Published Date on or before today — check the Notion database has one',
    )
  })

  test('every item has the right shape and types for each database property', async () => {
    const items = await getPublishedNewsEvents()
    const today = new Date().toISOString().slice(0, 10)

    for (const item of items) {
      const label = `item "${item.title}" (${item.id})`

      assert.equal(typeof item.id, 'string', `${label}: id should be a string`)
      assert.ok(item.id.length > 0, `${label}: id should not be empty`)

      assert.equal(typeof item.title, 'string', `${label}: title should be a string`)
      assert.ok(item.title.length > 0, `${label}: title should not be empty — a page was published without a Title`)

      assert.ok(TYPES.has(item.type), `${label}: type should be "News" or "Event", got ${JSON.stringify(item.type)}`)

      assert.equal(item.status, 'Published', `${label}: status should always be "Published" — the query filter should have excluded anything else`)

      assert.ok(isDateOnlyString(item.publishDate), `${label}: publishDate should be a YYYY-MM-DD date, got ${JSON.stringify(item.publishDate)}`)
      assert.ok(item.publishDate <= today, `${label}: publishDate (${item.publishDate}) should not be in the future`)

      assert.equal(typeof item.featured, 'boolean', `${label}: featured should be a boolean`)

      assert.ok(Array.isArray(item.category), `${label}: category should be an array`)
      for (const c of item.category) {
        assert.equal(typeof c, 'string', `${label}: each category should be a string`)
      }

      assert.equal(typeof item.summary, 'string', `${label}: summary should be a string`)
      assert.equal(typeof item.slug, 'string', `${label}: slug should be a string`)

      assert.ok(item.featuredImage === null || typeof item.featuredImage === 'string', `${label}: featuredImage should be a string or null`)
      assert.ok(item.location === null || typeof item.location === 'string', `${label}: location should be a string or null`)
      assert.ok(item.registrationUrl === null || typeof item.registrationUrl === 'string', `${label}: registrationUrl should be a string or null`)

      assert.ok(item.startDate === null || isDateOnlyString(item.startDate), `${label}: startDate should be a YYYY-MM-DD date or null`)
      assert.ok(item.endDate === null || isDateOnlyString(item.endDate), `${label}: endDate should be a YYYY-MM-DD date or null`)

      if (item.startDate && item.endDate) {
        assert.ok(item.endDate >= item.startDate, `${label}: endDate (${item.endDate}) should not be before startDate (${item.startDate})`)
      }
    }
  })

  test('slugs are unique across published items', async () => {
    const items = await getPublishedNewsEvents()
    const slugs = items.map((item) => item.slug).filter((slug) => slug.length > 0)
    const uniqueSlugs = new Set(slugs)
    assert.equal(uniqueSlugs.size, slugs.length, 'expected every non-empty Slug in the database to be unique')
  })

  test('is sorted by publishDate, most recent first', async () => {
    const items = await getPublishedNewsEvents()
    for (let i = 1; i < items.length; i++) {
      assert.ok(
        items[i - 1].publishDate >= items[i].publishDate,
        `expected item ${i - 1} (${items[i - 1].publishDate}) to be on or after item ${i} (${items[i].publishDate})`,
      )
    }
  })
})

describe('getPublishedNewsEventBySlug (live database)', { skip }, () => {
  test('returns the matching item for a slug that exists', async () => {
    const [first] = await getPublishedNewsEvents()
    assert.ok(first, 'need at least one published item to run this test — see the "at least one published item" test above')
    assert.ok(first.slug, `item "${first.title}" has no Slug set — can't look it up by slug`)

    const found = await getPublishedNewsEventBySlug(first.slug)
    assert.ok(found, `expected to find an item for slug "${first.slug}"`)
    assert.equal(found.id, first.id)
    assert.equal(found.title, first.title)
  })

  test('returns null for a slug that does not exist', async () => {
    const found = await getPublishedNewsEventBySlug('this-slug-does-not-exist-in-the-database-abc123')
    assert.equal(found, null)
  })
})
