import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { webhookRouter } from './routes/webhook.js'
import { checkoutRouter } from './routes/checkout.js'
import { newsEventsRouter } from './routes/newsEvents.js'
import './db.js'

// start an express app
const app = express()
const PORT = process.env.PORT || 4000

app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173' }))

// Mounted before express.json() — the webhook route parses its own raw body internally.
app.use('/api', webhookRouter)

// app use the routes 
app.use(express.json())
app.use('/api', checkoutRouter)
app.use('/api', newsEventsRouter)

app.get('/api/health', (_req, res) => res.json({ ok: true }))

app.listen(PORT, () => {
  console.log(`Future Stars Academy API listening on http://localhost:${PORT}`)
})
