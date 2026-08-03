import { useState } from 'react'
import { ExternalLink } from 'lucide-react'
import { Modal } from './Modal'
import { LoadingSpinner } from './LoadingSpinner'

interface GoogleFormModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  formUrl: string
}

export function GoogleFormModal({ isOpen, onClose, title, formUrl }: GoogleFormModalProps) {
  const [loaded, setLoaded] = useState(false)

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <div className="relative min-h-[70vh] w-full">
        {!loaded && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-white">
            <LoadingSpinner />
            <p className="text-sm text-navy/60">Loading form…</p>
          </div>
        )}
        <iframe
          title={title}
          src={formUrl}
          onLoad={() => setLoaded(true)}
          className="h-[70vh] w-full border-0"
        >
          Loading…
        </iframe>
      </div>
      <div className="flex justify-center border-t border-navy/10 px-6 py-3">
        <a
          href={formUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-navy/60 transition-colors hover:text-gold-dark"
        >
          Having trouble viewing the form? Open it in a new tab
          <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
        </a>
      </div>
    </Modal>
  )
}
