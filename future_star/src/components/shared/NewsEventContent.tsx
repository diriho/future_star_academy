import { Fragment, type ReactNode } from 'react'
import type { ContentBlock, RichTextRun } from '../../lib/api'
import { cn } from '../../lib/utils'
import { LazyImage } from './LazyImage'
import './NewsEventContent.css'

interface NewsEventContentProps {
  blocks: ContentBlock[]
  // Index of each image within the page's flat image list, so a click can open the
  // lightbox on the right picture. Body images start after the featured one.
  imageIndexOf: (url: string) => number
  onOpenImage: (index: number) => void
}

function renderRuns(runs: RichTextRun[]): ReactNode {
  return runs.map((run, i) => {
    let node: ReactNode = run.text
    if (run.code) node = <code className="article__code">{node}</code>
    if (run.bold) node = <strong>{node}</strong>
    if (run.italic) node = <em>{node}</em>
    if (run.href) {
      node = (
        <a href={run.href} target="_blank" rel="noopener noreferrer" className="article__link">
          {node}
        </a>
      )
    }
    return <Fragment key={i}>{node}</Fragment>
  })
}

// Consecutive list items arrive as separate blocks from Notion; group them so they
// can be rendered as real <ul>/<ol> elements rather than a run of loose rows.
type Group =
  | { kind: 'block'; block: ContentBlock }
  | { kind: 'list'; ordered: boolean; items: RichTextRun[][] }

function groupBlocks(blocks: ContentBlock[]): Group[] {
  const groups: Group[] = []

  for (const block of blocks) {
    if (block.type === 'bulleted-list-item' || block.type === 'numbered-list-item') {
      const ordered = block.type === 'numbered-list-item'
      const last = groups[groups.length - 1]
      if (last?.kind === 'list' && last.ordered === ordered) {
        last.items.push(block.richText)
      } else {
        groups.push({ kind: 'list', ordered, items: [block.richText] })
      }
    } else {
      groups.push({ kind: 'block', block })
    }
  }

  return groups
}

export function NewsEventContent({ blocks, imageIndexOf, onOpenImage }: NewsEventContentProps) {
  return (
    <div className="article">
      {groupBlocks(blocks).map((group, i) => {
        if (group.kind === 'list') {
          const List = group.ordered ? 'ol' : 'ul'
          return (
            <List key={i} className={cn('article__list', group.ordered && 'article__list--ordered')}>
              {group.items.map((item, j) => (
                <li key={j}>{renderRuns(item)}</li>
              ))}
            </List>
          )
        }

        const block = group.block

        switch (block.type) {
          case 'heading': {
            const Heading = block.level === 2 ? 'h3' : block.level === 3 ? 'h4' : 'h5'
            return (
              <Heading key={i} className={`article__heading article__heading--${block.level}`}>
                {renderRuns(block.richText)}
              </Heading>
            )
          }
          case 'paragraph':
            return (
              <p key={i} className="article__paragraph">
                {renderRuns(block.richText)}
              </p>
            )
          case 'quote':
            return (
              <blockquote key={i} className="article__quote">
                {renderRuns(block.richText)}
              </blockquote>
            )
          case 'callout':
            return (
              <div key={i} className="article__callout">
                {renderRuns(block.richText)}
              </div>
            )
          case 'image': {
            const index = imageIndexOf(block.url)
            return (
              <figure key={i} className="article__figure">
                <button
                  type="button"
                  onClick={() => onOpenImage(index)}
                  className="article__image-button"
                  aria-label={block.caption ? `View image: ${block.caption}` : 'View image full size'}
                >
                  <LazyImage src={block.url} alt={block.caption} className="article__image" />
                </button>
                {block.caption && <figcaption className="article__figcaption">{block.caption}</figcaption>}
              </figure>
            )
          }
          case 'divider':
            return <hr key={i} className="article__divider" />
          default:
            return null
        }
      })}
    </div>
  )
}
