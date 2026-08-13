import { Router } from 'express'
import { getPublishedNewsEvents, getPublishedNewsEventBySlug } from '../services/notions.js'

export const newsEventsRouter = Router()

newsEventsRouter.get('/news-events', async (_req, res) => {
  try {
    const items = await getPublishedNewsEvents()
    res.json(items)
  } catch (err) {
    console.error('Failed to fetch news & events from Notion:', err)
    res.status(500).json({ error: 'Unable to load news & events right now. Please try again shortly.' })
  }
})

newsEventsRouter.get('/news-events/:slug', async (req, res) => {
  try {
    const item = await getPublishedNewsEventBySlug(req.params.slug)
    if (!item) {
      return res.status(404).json({ error: 'News or event not found.' })
    }
    res.json(item)
  } catch (err) {
    console.error('Failed to fetch news & event from Notion:', err)
    res.status(500).json({ error: 'Unable to load this article right now. Please try again shortly.' })
  }
})
