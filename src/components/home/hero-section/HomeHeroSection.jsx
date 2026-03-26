import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useTheme } from '../../../app/providers/useTheme'
import HomeSocialLinks from '../top-bar/HomeSocialLinks'
import HomeStoreIllustration from './HomeStoreIllustration'

const MotionDiv = motion.div

function HomeHeroSection() {
  const { isDark } = useTheme()

  return (
    <section className="relative w-full overflow-x-clip pb-10 pt-8 md:pb-20 md:pt-10">
      <div className="absolute left-0 top-1/2 z-20 hidden -translate-y-1/2 xl:block">
        <HomeSocialLinks desktop isDark={isDark} />
      </div>

      <div className="mx-auto w-full max-w-[1320px] px-3 md:px-6">
        <div className="grid items-center gap-7 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="order-1">
            <HomeStoreIllustration />
          </div>

          <MotionDiv
            initial={{ opacity: 0, x: 55 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65, delay: 0.08 }}
            className="order-2 text-right lg:order-2"
          >
            <div className="mb-4 hidden justify-start md:flex xl:hidden">
              <HomeSocialLinks isDark={isDark} />
            </div>

            <h1 className="text-[clamp(1.55rem,3.8vw,3.25rem)] font-black leading-tight text-[var(--home-hero-title)]">
              انطلق بتجارتك
              <br />
              الإلكترونية
            </h1>
            <p className="mt-4 text-[clamp(0.92rem,1.05vw,1.1rem)] leading-relaxed text-[var(--home-text-primary)]">
              نحن متخصصون في بناء متاجر احترافية، وإنشاء تجارب رقمية تفاعلية للعلامات التجارية. ابدأ رحلتك الرقمية اليوم.
            </p>

            <div className="mt-6 flex justify-center md:justify-start">
              <Link
                to="/signup"
                state={{ direction: 1 }}
                className="group relative inline-flex h-14 items-center justify-center overflow-hidden rounded-full px-10 text-xl font-black text-white shadow-[0_16px_35px_rgba(33,143,185,0.32)]"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-[var(--home-accent)] to-[var(--home-accent-2)] transition-transform duration-500 group-hover:scale-105" />
                <span className="relative">ابدأ متجرك الآن</span>
              </Link>
            </div>
          </MotionDiv>
        </div>
      </div>
    </section>
  )
}

export default HomeHeroSection
