import { useState } from 'react'
import { ExternalLink } from 'lucide-react'
import { Modal } from './Modal'
import { LoadingSpinner } from './LoadingSpinner'
import './GoogleFormModal.css'

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
      <div className="google-form__frame-wrap">
        {!loaded && (
          <div className="google-form__loading">
            <LoadingSpinner />
            <p>Loading form…</p>
          </div>
        )}
        <iframe
          title={title}
          src={formUrl}
          onLoad={() => setLoaded(true)}
          className="google-form__iframe"
        >
          Loading…
        </iframe>
      </div>
      <div className="google-form__footer">
        <a href={formUrl} target="_blank" rel="noopener noreferrer" className="google-form__footer-link">
          Having trouble viewing the form? Open it in a new tab
          <ExternalLink size={14} aria-hidden="true" />
        </a>
      </div>
    </Modal>
  )
}
