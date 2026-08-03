import { DatabaseSync } from 'node:sqlite'
import { mkdirSync } from 'node:fs'
import { dirname } from 'node:path'

const dbPath = process.env.DB_PATH || './data/donations.db'
mkdirSync(dirname(dbPath), { recursive: true })

export const db = new DatabaseSync(dbPath)

db.exec(`
  CREATE TABLE IF NOT EXISTS donations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    stripe_session TEXT NOT NULL UNIQUE,
    amount INTEGER NOT NULL,
    recurring INTEGER NOT NULL DEFAULT 0,
    status TEXT NOT NULL DEFAULT 'pending',
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  )
`)

export function insertDonation({ stripeSession, amount, recurring }) {
  db.prepare(
    `INSERT INTO donations (stripe_session, amount, recurring, status) VALUES (?, ?, ?, 'pending')`,
  ).run(stripeSession, amount, recurring ? 1 : 0)
}

export function markDonationStatus(stripeSession, status) {
  db.prepare(`UPDATE donations SET status = ? WHERE stripe_session = ?`).run(status, stripeSession)
}
