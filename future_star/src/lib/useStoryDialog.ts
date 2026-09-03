import { useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import type { NewsEvent } from './api'

// Keeps the open story in the URL as `?story=<slug>`, so a story can be linked to
// directly and the browser's Back button closes the dialog instead of leaving the
// page. Shared by every page that shows news & event cards.
export function useStoryDialog(items: NewsEvent[]) {
  const [searchParams, setSearchParams] = useSearchParams()
  const activeSlug = searchParams.get('story')

  // Updating from the previous params keeps these callbacks stable across renders,
  // so the cards aren't handed a new onSelect whenever the query string changes.
  const openStory = useCallback(
    (item: NewsEvent) => {
      setSearchParams(
        (previous) => {
          const next = new URLSearchParams(previous)
          next.set('story', item.slug)
          return next
        },
        { preventScrollReset: true },
      )
    },
    [setSearchParams],
  )

  // Replaces rather than pushes, so closing doesn't leave an entry that Back would
  // reopen the dialog from.
  const closeStory = useCallback(() => {
    setSearchParams(
      (previous) => {
        const next = new URLSearchParams(previous)
        next.delete('story')
        return next
      },
      { replace: true, preventScrollReset: true },
    )
  }, [setSearchParams])

  // The clicked row, once the list holding it has loaded. Null when a shared link is
  // opened cold, which the dialog covers by fetching the slug itself.
  const activeItem = items.find((item) => item.slug === activeSlug) ?? null

  return { activeSlug, activeItem, openStory, closeStory }
}
