import { Suspense, lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Layout } from './components/layout/Layout'
import { LoadingSpinner } from './components/shared/LoadingSpinner'

const Home = lazy(() => import('./pages/Home'))
const GetInvolvedLanding = lazy(() => import('./pages/GetInvolved/GetInvolvedLanding'))
const Volunteer = lazy(() => import('./pages/GetInvolved/Volunteer'))
const Sponsor = lazy(() => import('./pages/GetInvolved/Sponsor'))
const Partner = lazy(() => import('./pages/GetInvolved/Partner'))
const Education = lazy(() => import('./pages/Programs/Education'))
const Sports = lazy(() => import('./pages/Programs/Sports'))
const Mentorship = lazy(() => import('./pages/Programs/Mentorship'))
const CommunityServices = lazy(() => import('./pages/Programs/CommunityServices'))
const NotFound = lazy(() => import('./pages/NotFound'))

function PageFallback() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <LoadingSpinner size="md" />
    </div>
  )
}

function App() {
  return (
    <Suspense fallback={<PageFallback />}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/get-involved" element={<GetInvolvedLanding />} />
          <Route path="/get-involved/volunteer" element={<Volunteer />} />
          <Route path="/get-involved/sponsor" element={<Sponsor />} />
          <Route path="/get-involved/partner" element={<Partner />} />
          <Route path="/programs/education" element={<Education />} />
          <Route path="/programs/sports" element={<Sports />} />
          <Route path="/programs/mentorship" element={<Mentorship />} />
          <Route path="/programs/community-services" element={<CommunityServices />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  )
}

export default App
