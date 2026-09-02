import { test, describe } from 'node:test'
import assert from 'node:assert/strict'
import { mapBlock, collectImages } from '../services/notions.js'

function run(text, annotations = {}, href = null) {
  return { plain_text: text, annotations, href }
}

function block(type, value, extra = {}) {
  return { type, [type]: value, ...extra }
}

describe('mapBlock', () => {
  describe('text blocks', () => {
    test('maps each rich-text block type to its content node type', () => {
      const cases = [
        ['paragraph', 'paragraph'],
        ['quote', 'quote'],
        ['callout', 'callout'],
        ['bulleted_list_item', 'bulleted-list-item'],
        ['numbered_list_item', 'numbered-list-item'],
      ]

      for (const [notionType, nodeType] of cases) {
        const node = mapBlock(block(notionType, { rich_text: [run('Hello')] }))
        assert.deepEqual(node, { type: nodeType, richText: [{ text: 'Hello', bold: false, italic: false, code: false, href: null }] })
      }
    })

    test("renders a toggle's own text as a paragraph, since there is no disclosure UI", () => {
      const node = mapBlock(block('toggle', { rich_text: [run('Summary line')] }))
      assert.equal(node.type, 'paragraph')
      assert.equal(node.richText[0].text, 'Summary line')
    })

    test('keeps every run, in order, with its annotations and link', () => {
      const node = mapBlock(
        block('paragraph', {
          rich_text: [
            run('plain '),
            run('bold', { bold: true }),
            run(' and '),
            run('linked', {}, 'https://example.com'),
          ],
        }),
      )

      assert.deepEqual(node.richText, [
        { text: 'plain ', bold: false, italic: false, code: false, href: null },
        { text: 'bold', bold: true, italic: false, code: false, href: null },
        { text: ' and ', bold: false, italic: false, code: false, href: null },
        { text: 'linked', bold: false, italic: false, code: false, href: 'https://example.com' },
      ])
    })

    test('drops empty paragraphs, which Notion pages are full of', () => {
      assert.equal(mapBlock(block('paragraph', { rich_text: [] })), null)
      assert.equal(mapBlock(block('paragraph', { rich_text: [run('')] })), null)
    })
  })

  describe('headings', () => {
    test('maps heading_1 to level 2, so the item title stays the only h1', () => {
      assert.deepEqual(mapBlock(block('heading_1', { rich_text: [run('Big')] })).level, 2)
      assert.deepEqual(mapBlock(block('heading_2', { rich_text: [run('Mid')] })).level, 3)
      assert.deepEqual(mapBlock(block('heading_3', { rich_text: [run('Small')] })).level, 4)
    })

    test('uses the heading node type regardless of level', () => {
      assert.equal(mapBlock(block('heading_2', { rich_text: [run('Mid')] })).type, 'heading')
    })

    test('drops a heading with no text', () => {
      assert.equal(mapBlock(block('heading_1', { rich_text: [] })), null)
    })
  })

  describe('images', () => {
    test('reads a Notion-hosted image from its signed file url', () => {
      const node = mapBlock(block('image', { type: 'file', file: { url: 'https://notion.so/signed.jpg' }, caption: [run('On the pitch')] }))
      assert.deepEqual(node, { type: 'image', url: 'https://notion.so/signed.jpg', caption: 'On the pitch' })
    })

    test('reads an externally hosted image from its external url', () => {
      const node = mapBlock(block('image', { type: 'external', external: { url: 'https://example.com/a.jpg' }, caption: [] }))
      assert.deepEqual(node, { type: 'image', url: 'https://example.com/a.jpg', caption: '' })
    })

    test('joins a multi-run caption into one string', () => {
      const node = mapBlock(block('image', { type: 'external', external: { url: 'https://example.com/a.jpg' }, caption: [run('Part one, '), run('part two')] }))
      assert.equal(node.caption, 'Part one, part two')
    })

    test('drops an image with no usable url', () => {
      assert.equal(mapBlock(block('image', { type: 'file', file: null, caption: [] })), null)
      assert.equal(mapBlock(block('image', {})), null)
    })
  })

  test('maps a divider to a bare node', () => {
    assert.deepEqual(mapBlock(block('divider', {})), { type: 'divider' })
  })

  test('drops block types the article view does not render, rather than half-rendering them', () => {
    for (const type of ['table', 'embed', 'child_database', 'video', 'bookmark', 'code']) {
      assert.equal(mapBlock(block(type, {})), null, `expected ${type} to be dropped`)
    }
  })

  test('returns null for a malformed block', () => {
    assert.equal(mapBlock(null), null)
    assert.equal(mapBlock({}), null)
  })
})

describe('collectImages', () => {
  const item = { title: 'Match Day', featuredImage: 'https://example.com/hero.jpg' }

  test('leads with the featured image, captioned with the item title', () => {
    const images = collectImages(item, [])
    assert.deepEqual(images, [{ url: 'https://example.com/hero.jpg', caption: 'Match Day' }])
  })

  test('appends body images in reading order, skipping non-image blocks', () => {
    const content = [
      { type: 'paragraph', richText: [] },
      { type: 'image', url: 'https://example.com/1.jpg', caption: 'First' },
      { type: 'divider' },
      { type: 'image', url: 'https://example.com/2.jpg', caption: 'Second' },
    ]

    assert.deepEqual(collectImages(item, content), [
      { url: 'https://example.com/hero.jpg', caption: 'Match Day' },
      { url: 'https://example.com/1.jpg', caption: 'First' },
      { url: 'https://example.com/2.jpg', caption: 'Second' },
    ])
  })

  test('de-duplicates a body image that repeats the featured one', () => {
    const content = [{ type: 'image', url: 'https://example.com/hero.jpg', caption: 'Again' }]
    assert.deepEqual(collectImages(item, content), [{ url: 'https://example.com/hero.jpg', caption: 'Match Day' }])
  })

  test('is an empty array when the item has neither a featured image nor body images', () => {
    assert.deepEqual(collectImages({ title: 'No pictures', featuredImage: null }, [{ type: 'paragraph', richText: [] }]), [])
  })
})
