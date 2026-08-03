import { Helmet } from 'react-helmet-async'
import { Home as HomeIcon } from 'lucide-react'
import { Button } from '../components/shared/Button'

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center bg-offwhite px-6 text-center">
      <Helmet>
        <title>Page Not Found | Future Stars Academy</title>
      </Helmet>
      <span className="font-heading text-7xl font-extrabold text-navy/10">404</span>
      <h1 className="mt-2 font-heading text-2xl font-bold text-navy md:text-3xl">Page Not Found</h1>
      <p className="mt-3 max-w-md text-navy/70">
        The page you're looking for doesn't exist or may have moved. Let's get you back on track.
      </p>
      <Button to="/" variant="gold" size="lg" icon={<HomeIcon className="h-4 w-4" />} className="mt-8">
        Back to Home
      </Button>
    </div>
  )
}
