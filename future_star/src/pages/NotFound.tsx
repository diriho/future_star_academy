import { Helmet } from 'react-helmet-async'
import { Home as HomeIcon } from 'lucide-react'
import { Button } from '../components/shared/Button'
import './NotFound.css'

export default function NotFound() {
  return (
    <div className="not-found">
      <Helmet>
        <title>Page Not Found | Future Stars Academy</title>
      </Helmet>
      <span className="not-found__code">404</span>
      <h1 className="not-found__title">Page Not Found</h1>
      <p className="not-found__description">
        The page you're looking for doesn't exist or may have moved. Let's get you back on track.
      </p>
      <Button to="/" variant="gold" size="lg" icon={<HomeIcon size={16} />} className="not-found__action">
        Back to Home
      </Button>
    </div>
  )
}
