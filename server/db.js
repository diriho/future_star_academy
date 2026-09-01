import { createRequire } from 'node:module'
import { mkdirSync } from 'node:fs'
import { dirname } from 'node:path'

// node:sqlite is a built-in, but it is flagged before Node 23.4 — require it through
// createRequire so an unsupported runtime is a catchable error rather than a crash
// at module load (a static import is hoisted and cannot be wrapped in try/catch).
const require = createRequire(import.meta.url)

// This table is a convenience mirror; Stripe holds the real record of every donation.
// Serverless hosts give the function a read-only filesystem outside /tmp, so opening
// the file is allowed to fail and the writers below degrade to no-ops.
function openDatabase() {
  try {
    const { DatabaseSync } = require('node:sqlite')

    const dbPath = process.env.DB_PATH || './data/donations.db'
    mkdirSync(dirname(dbPath), { recursive: true })

    const handle = new DatabaseSync(dbPath)
    handle.exec(`
      CREATE TABLE IF NOT EXISTS donations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        stripe_session TEXT NOT NULL UNIQUE,
        amount INTEGER NOT NULL,
        recurring INTEGER NOT NULL DEFAULT 0,
        status TEXT NOT NULL DEFAULT 'pending',
        created_at TEXT NOT NULL DEFAULT (datetime('now'))
      )
    `)
    return handle
  } catch (err) {
    console.warn(
      `Donation ledger disabled (${err.message}). Donations still process normally — Stripe remains the source of truth.`,
    )
    return null
  }
}

export const db = openDatabase()

export function insertDonation({ stripeSession, amount, recurring }) {
  if (!db) return
  db.prepare(
    `INSERT INTO donations (stripe_session, amount, recurring, status) VALUES (?, ?, ?, 'pending')`,
  ).run(stripeSession, amount, recurring ? 1 : 0)
}

export function markDonationStatus(stripeSession, status) {
  if (!db) return
  db.prepare(`UPDATE donations SET status = ? WHERE stripe_session = ?`).run(status, stripeSession)
}
