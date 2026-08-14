import { test } from 'node:test'
import assert from 'node:assert/strict'
import { getPublishedNewsEvents } from '../services/notions.js'

// This file must not make a successful Notion call before these run — a successful
// call caches the resolved data source id at module scope, which would short-circuit
// the "missing NOTION_DATABASE_ID" check below. node --test runs each file in its own
// process, so that's guaranteed as long as this file only ever exercises the failure paths.

test('rejects with a clear error when NOTION_API_KEY is not set', async () => {
  const original = process.env.NOTION_API_KEY
  delete process.env.NOTION_API_KEY
  try {
    await assert.rejects(() => getPublishedNewsEvents(), /NOTION_API_KEY is not set/)
  } finally {
    if (original === undefined) delete process.env.NOTION_API_KEY
    else process.env.NOTION_API_KEY = original
  }
})

test('rejects with a clear error when NOTION_DATABASE_ID is not set', async () => {
  const originalKey = process.env.NOTION_API_KEY
  const originalDb = process.env.NOTION_DATABASE_ID
  process.env.NOTION_API_KEY = originalKey ?? 'test-placeholder-key'
  delete process.env.NOTION_DATABASE_ID
  try {
    await assert.rejects(() => getPublishedNewsEvents(), /NOTION_DATABASE_ID is not set/)
  } finally {
    if (originalKey === undefined) delete process.env.NOTION_API_KEY
    else process.env.NOTION_API_KEY = originalKey
    if (originalDb === undefined) delete process.env.NOTION_DATABASE_ID
    else process.env.NOTION_DATABASE_ID = originalDb
  }
})
