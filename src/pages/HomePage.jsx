import {
  HomeCapabilitiesSection,
  HomeClientControlSection,
  HomeCommerceNeedsSection,
  HomeFeaturesSection,
  HomeFloatingContact,
  HomeHeroSection,
  HomeHowToRegisterSection,
  HomeImpactStatsSection,
  HomeNavbar,
  HomePlatformFeaturesSection,
  HomePricingPlansSection,
  HomeRegisterNowSection,
  HomeStoryTabsSection,
  HomeTopBar,
} from '../components/home'

function HomePage() {
  return (
    <main id="home" className="min-h-screen [background:var(--home-page-bg)]">
      <HomeTopBar />
      <HomeNavbar />
      <HomeFloatingContact />
      <HomeHeroSection />
      <HomeStoryTabsSection />
      <HomeFeaturesSection />
      <HomeCapabilitiesSection />
      <HomePlatformFeaturesSection />
      <HomeCommerceNeedsSection />
      <HomePricingPlansSection />
      <HomeHowToRegisterSection />
      <HomeClientControlSection />
      <HomeImpactStatsSection />
      <HomeRegisterNowSection />
    </main>
  )
}

export default HomePage
