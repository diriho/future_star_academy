import { test, describe } from 'node:test'
import assert from 'node:assert/strict'
import { slugify, resolveSlugs } from '../services/notions.js'

function item(id, title, slug = '') {
  return { id, title, slug }
}

describe('slugify', () => {
  test('lowercases and joins words with hyphens', () => {
    assert.equal(slugify('Fall Soccer Camp'), 'fall-soccer-camp')
  })

  test('strips punctuation and collapses separator runs', () => {
    assert.equal(slugify('FSA vs. Worcester City F.C. — 2026!'), 'fsa-vs-worcester-city-f-c-2026')
  })

  test('strips accents rather than dropping the letters', () => {
    assert.equal(slugify('Café Fundraiser'), 'cafe-fundraiser')
  })

  test('trims leading and trailing separators', () => {
    assert.equal(slugify('  ...Season Opener!  '), 'season-opener')
  })

  test('is an empty string when nothing sluggable remains', () => {
    assert.equal(slugify('!!!'), '')
    assert.equal(slugify(''), '')
  })
})

describe('resolveSlugs', () => {
  test('leaves an explicit Slug untouched', () => {
    const [only] = resolveSlugs([item('page-1', 'Fall Soccer Camp', 'custom-slug')])
    assert.equal(only.slug, 'custom-slug')
  })

  test('derives a slug from the title when the Slug property is empty', () => {
    const [only] = resolveSlugs([item('page-1', 'FSA VS Worcester City FC')])
    assert.equal(only.slug, 'fsa-vs-worcester-city-fc')
  })

  test('never overwrites an explicit slug with a derived one that would collide', () => {
    const items = resolveSlugs([
      item('aaaaaaaa-1111', 'Season Opener'),
      item('bbbbbbbb-2222', 'Something Else', 'season-opener'),
    ])
    assert.equal(items[1].slug, 'season-opener', 'the explicit slug keeps its URL')
    assert.equal(items[0].slug, 'season-opener-aaaaaaaa', 'the derived one is disambiguated')
  })

  test('disambiguates two derived slugs that share a title', () => {
    const items = resolveSlugs([item('aaaaaaaa-1111', 'Season Opener'), item('bbbbbbbb-2222', 'Season Opener')])
    assert.equal(items[0].slug, 'season-opener')
    assert.equal(items[1].slug, 'season-opener-bbbbbbbb')
  })

  test('falls back to the page id when the title yields nothing sluggable', () => {
    const [only] = resolveSlugs([item('abcdef12-3456-7890', '???')])
    assert.equal(only.slug, 'abcdef12')
  })

  test('gives every item a non-empty, unique slug', () => {
    const items = resolveSlugs([
      item('aaaaaaaa-1111', 'Season Opener'),
      item('bbbbbbbb-2222', 'Season Opener'),
      item('cccccccc-3333', '!!!'),
      item('dddddddd-4444', 'Gala Night', 'gala'),
    ])
    const slugs = items.map((i) => i.slug)
    assert.ok(slugs.every((s) => s.length > 0), 'no item should be left without a slug')
    assert.equal(new Set(slugs).size, slugs.length, 'slugs should be unique')
  })

  test('does not mutate the items it is given', () => {
    const original = item('page-1', 'Fall Soccer Camp')
    resolveSlugs([original])
    assert.equal(original.slug, '')
  })
})
