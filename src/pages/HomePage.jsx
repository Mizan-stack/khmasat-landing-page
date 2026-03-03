import HomeFeaturesSection from '../components/home/HomeFeaturesSection'
import HomeHeroSection from '../components/home/HomeHeroSection'
import HomeNavbar from '../components/home/HomeNavbar'
import HomeStoryTabsSection from '../components/home/HomeStoryTabsSection'
import HomeTopBar from '../components/home/HomeTopBar'

function HomePage() {
  return (
    <main id="home" className="min-h-screen [background:var(--home-page-bg)]">
      <HomeTopBar />
      <HomeNavbar />
      <HomeHeroSection />
      <HomeStoryTabsSection />
      <HomeFeaturesSection />
    </main>
  )
}

export default HomePage
