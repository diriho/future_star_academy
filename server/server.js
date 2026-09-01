import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { checkoutRouter } from './routes/checkout.js'
import { newsEventsRouter } from './routes/newsEvents.js'
import { getClientUrl } from './clientUrl.js'

// start an express app
const app = express()
const PORT = process.env.PORT || 4000

app.use(cors({ origin: getClientUrl() }))

app.use(express.json())
app.use('/api', checkoutRouter)
app.use('/api', newsEventsRouter)

app.get('/api/health', (_req, res) => res.json({ ok: true }))

// On Vercel the app is invoked as a serverless function (see api/index.mjs) and the
// platform owns the socket, so only bind a port when running as a normal process.
if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`Future Stars Academy API listening on http://localhost:${PORT}`)
  })
}

export default app
