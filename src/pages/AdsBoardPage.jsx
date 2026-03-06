import { AdsBoardSection } from '../components/ads-board'
import { HomeFloatingContact, HomeFooterSection, HomeNavbar } from '../components/home'

function AdsBoardPage() {
  return (
    <main className="min-h-screen [background:var(--ads-page-bg)]">
      <HomeNavbar />
      <HomeFloatingContact />
      <AdsBoardSection />
      <HomeFooterSection />
    </main>
  )
}

export default AdsBoardPage
