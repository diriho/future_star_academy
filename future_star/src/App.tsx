import { Suspense, lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
import { Layout } from './components/layout/Layout'
import { LoadingSpinner } from './components/shared/LoadingSpinner'
import './App.css'

const Home = lazy(() => import('./pages/Home'))
const About = lazy(() => import('./pages/About'))
const GetInvolvedLanding = lazy(() => import('./pages/GetInvolved/GetInvolvedLanding'))
const Volunteer = lazy(() => import('./pages/GetInvolved/Volunteer'))
const Sponsor = lazy(() => import('./pages/GetInvolved/Sponsor'))
const SponsorCheckout = lazy(() => import('./pages/GetInvolved/SponsorCheckout'))
const DonationComplete = lazy(() => import('./pages/GetInvolved/DonationComplete'))
const Partner = lazy(() => import('./pages/GetInvolved/Partner'))
const Education = lazy(() => import('./pages/Programs/Education'))
const Sports = lazy(() => import('./pages/Programs/Sports'))
const Mentorship = lazy(() => import('./pages/Programs/Mentorship'))
const CommunityServices = lazy(() => import('./pages/Programs/CommunityServices'))
const NewsEvents = lazy(() => import('./pages/NewsEvents'))
const Contact = lazy(() => import('./pages/Contact'))
const NotFound = lazy(() => import('./pages/NotFound'))

function PageFallback() {
  return (
    <div className="page-fallback">
      <LoadingSpinner size="md" />
    </div>
  )
}

function App() {
  return (
    <>
      <Suspense fallback={<PageFallback />}>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/get-involved" element={<GetInvolvedLanding />} />
            <Route path="/get-involved/volunteer" element={<Volunteer />} />
            <Route path="/get-involved/sponsor" element={<Sponsor />} />
            <Route path="/get-involved/sponsor/checkout" element={<SponsorCheckout />} />
            <Route path="/get-involved/sponsor/complete" element={<DonationComplete />} />
            <Route path="/get-involved/partner" element={<Partner />} />
            <Route path="/programs/education" element={<Education />} />
            <Route path="/programs/sports" element={<Sports />} />
            <Route path="/programs/mentorship" element={<Mentorship />} />
            <Route path="/programs/community-services" element={<CommunityServices />} />
            <Route path="/news-events" element={<NewsEvents />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
      <Analytics />
    </>
  )
}

export default App
