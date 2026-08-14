import { test, describe } from 'node:test'
import assert from 'node:assert/strict'
import { mapPageToNewsEvent } from '../services/notions.js'

function richText(text) {
  return [{ plain_text: text }]
}

describe('mapPageToNewsEvent', () => {
  test('maps a fully populated Event page across every property type', () => {
    const page = {
      id: 'page-1',
      properties: {
        Title: { title: richText('Fall Soccer Camp') },
        Type: { select: { name: 'Event' } },
        Status: { select: { name: 'Published' } },
        'Published Date': { date: { start: '2026-01-15' } },
        Featured: { checkbox: true },
        Category: { multi_select: [{ name: 'Sports' }, { name: 'Community' }] },
        Description: { rich_text: richText('A week of soccer training.') },
        Image: { url: 'https://example.com/image.jpg' },
        Slug: { rich_text: richText('fall-soccer-camp') },
        'Start Date': { date: { start: '2026-02-01' } },
        'End Date': { date: { start: '2026-02-05' } },
        Location: { place: { name: 'Academy Field', address: '123 Main St' } },
        'Registration URL': { url: 'https://example.com/register' },
      },
    }

    assert.deepEqual(mapPageToNewsEvent(page), {
      id: 'page-1',
      title: 'Fall Soccer Camp',
      type: 'Event',
      status: 'Published',
      publishDate: '2026-01-15',
      featured: true,
      category: ['Sports', 'Community'],
      summary: 'A week of soccer training.',
      featuredImage: 'https://example.com/image.jpg',
      slug: 'fall-soccer-camp',
      startDate: '2026-02-01',
      endDate: '2026-02-05',
      location: 'Academy Field',
      registrationUrl: 'https://example.com/register',
    })
  })

  test('falls back to sane defaults when every property is missing', () => {
    const page = { id: 'page-2', properties: {} }

    assert.deepEqual(mapPageToNewsEvent(page), {
      id: 'page-2',
      title: '',
      type: null,
      status: null,
      publishDate: null,
      featured: false,
      category: [],
      summary: '',
      featuredImage: null,
      slug: '',
      startDate: null,
      endDate: null,
      location: null,
      registrationUrl: null,
    })
  })

  describe('title (title property)', () => {
    test('joins multiple rich text runs into one string', () => {
      const page = { id: 'p', properties: { Title: { title: [{ plain_text: 'Part One ' }, { plain_text: 'Part Two' }] } } }
      assert.equal(mapPageToNewsEvent(page).title, 'Part One Part Two')
    })

    test('is an empty string when the title has no runs', () => {
      const page = { id: 'p', properties: { Title: { title: [] } } }
      assert.equal(mapPageToNewsEvent(page).title, '')
    })
  })

  describe('summary / location text (rich_text property)', () => {
    test('joins multiple rich text runs into one string', () => {
      const page = { id: 'p', properties: { Description: { rich_text: [{ plain_text: 'Line one. ' }, { plain_text: 'Line two.' }] } } }
      assert.equal(mapPageToNewsEvent(page).summary, 'Line one. Line two.')
    })

    test('is an empty string, not null, when absent', () => {
      const page = { id: 'p', properties: {} }
      assert.equal(mapPageToNewsEvent(page).summary, '')
      assert.equal(mapPageToNewsEvent(page).slug, '')
    })
  })

  describe('type / status (select property)', () => {
    test('reads the selected option name', () => {
      const page = { id: 'p', properties: { Type: { select: { name: 'News' } }, Status: { select: { name: 'Draft' } } } }
      const mapped = mapPageToNewsEvent(page)
      assert.equal(mapped.type, 'News')
      assert.equal(mapped.status, 'Draft')
    })

    test('is null when no option is selected', () => {
      const page = { id: 'p', properties: { Type: { select: null }, Status: { select: null } } }
      const mapped = mapPageToNewsEvent(page)
      assert.equal(mapped.type, null)
      assert.equal(mapped.status, null)
    })
  })

  describe('category (multi_select property)', () => {
    test('returns every selected option name, in order', () => {
      const page = { id: 'p', properties: { Category: { multi_select: [{ name: 'Education' }, { name: 'Fundraising' }, { name: 'Leadership' }] } } }
      assert.deepEqual(mapPageToNewsEvent(page).category, ['Education', 'Fundraising', 'Leadership'])
    })

    test('is an empty array, not null, when nothing is selected', () => {
      const page = { id: 'p', properties: { Category: { multi_select: [] } } }
      assert.deepEqual(mapPageToNewsEvent(page).category, [])
    })

    test('is an empty array when the property is missing entirely', () => {
      const page = { id: 'p', properties: {} }
      assert.deepEqual(mapPageToNewsEvent(page).category, [])
    })
  })

  describe('publishDate / startDate / endDate (date property)', () => {
    test('reads the start date', () => {
      const page = { id: 'p', properties: { 'Start Date': { date: { start: '2026-03-01', end: null } } } }
      assert.equal(mapPageToNewsEvent(page).startDate, '2026-03-01')
    })

    test('is null when the date value is null', () => {
      const page = { id: 'p', properties: { 'Start Date': { date: null } } }
      assert.equal(mapPageToNewsEvent(page).startDate, null)
    })

    test('is null when the property is missing entirely', () => {
      const page = { id: 'p', properties: {} }
      const mapped = mapPageToNewsEvent(page)
      assert.equal(mapped.publishDate, null)
      assert.equal(mapped.startDate, null)
      assert.equal(mapped.endDate, null)
    })
  })

  describe('featured (checkbox property)', () => {
    test('passes true and false through as-is', () => {
      assert.equal(mapPageToNewsEvent({ id: 'p', properties: { Featured: { checkbox: true } } }).featured, true)
      assert.equal(mapPageToNewsEvent({ id: 'p', properties: { Featured: { checkbox: false } } }).featured, false)
    })

    test('defaults to false when the property is missing', () => {
      assert.equal(mapPageToNewsEvent({ id: 'p', properties: {} }).featured, false)
    })
  })

  describe('featuredImage / registrationUrl (url property)', () => {
    test('reads the url string', () => {
      const page = { id: 'p', properties: { Image: { url: 'https://example.com/a.jpg' }, 'Registration URL': { url: 'https://example.com/r' } } }
      const mapped = mapPageToNewsEvent(page)
      assert.equal(mapped.featuredImage, 'https://example.com/a.jpg')
      assert.equal(mapped.registrationUrl, 'https://example.com/r')
    })

    test('is null when the url value is null or the property is missing', () => {
      const nullUrl = mapPageToNewsEvent({ id: 'p', properties: { Image: { url: null } } })
      assert.equal(nullUrl.featuredImage, null)

      const missing = mapPageToNewsEvent({ id: 'p', properties: {} })
      assert.equal(missing.featuredImage, null)
      assert.equal(missing.registrationUrl, null)
    })
  })

  describe('location (place property)', () => {
    test('prefers the place name when both name and address are present', () => {
      const page = { id: 'p', properties: { Location: { place: { name: 'Academy Campus', address: '456 Side St' } } } }
      assert.equal(mapPageToNewsEvent(page).location, 'Academy Campus')
    })

    test('falls back to address when name is absent', () => {
      const page = { id: 'p', properties: { Location: { place: { address: '456 Side St' } } } }
      assert.equal(mapPageToNewsEvent(page).location, '456 Side St')
    })

    test('is null when the place value itself is null (property set but empty)', () => {
      const page = { id: 'p', properties: { Location: { place: null } } }
      assert.equal(mapPageToNewsEvent(page).location, null)
    })

    test('is null when neither name nor address is set', () => {
      const page = { id: 'p', properties: { Location: { place: { lat: 6.3, lon: -10.8 } } } }
      assert.equal(mapPageToNewsEvent(page).location, null)
    })
  })

  test('passes the Notion page id straight through', () => {
    assert.equal(mapPageToNewsEvent({ id: 'abc-123', properties: {} }).id, 'abc-123')
  })
})
