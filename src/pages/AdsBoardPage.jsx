import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { AdsBoardNavbar, AdsBoardSection, AdsWelcomeModal } from '../components/ads-board'
import { HomeFloatingContact, HomeFooterSection } from '../components/home'
import { getStoredDashboardUser } from '../utils/dashboardUserSession'

function AdsBoardPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const routeState = typeof location.state === 'object' && location.state ? location.state : null
  const [isWelcomeOpen, setIsWelcomeOpen] = useState(Boolean(routeState?.showWelcomePopup))
  const [dashboardUser] = useState(() => {
    if (routeState?.dashboardUser && typeof routeState.dashboardUser === 'object') {
      return routeState.dashboardUser
    }

    return getStoredDashboardUser()
  })

  useEffect(() => {
    if (!routeState?.showWelcomePopup) return

    const nextState = { ...routeState }
    delete nextState.showWelcomePopup
    delete nextState.dashboardUser

    if (Object.keys(nextState).length > 0) {
      navigate(location.pathname, { replace: true, state: nextState })
      return
    }

    navigate(location.pathname, { replace: true })
  }, [location.pathname, navigate, routeState])

  return (
    <main className="min-h-screen [background:var(--ads-page-bg)]">
      <AdsBoardNavbar user={dashboardUser} />
      <HomeFloatingContact />
      <AdsBoardSection />
      <HomeFooterSection />
      <AdsWelcomeModal
        isOpen={isWelcomeOpen}
        onClose={() => setIsWelcomeOpen(false)}
        userLabel={dashboardUser?.displayName ?? ''}
      />
    </main>
  )
}

export default AdsBoardPage
