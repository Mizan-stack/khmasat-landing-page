import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import HomeStoreIllustration from './HomeStoreIllustration'

const MotionDiv = motion.div

function HomeHeroSection() {
  return (
    <section className="mx-auto w-full max-w-[1320px] px-3 pb-16 pt-10 md:px-6 md:pt-14">
      <div className="grid items-center gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="order-2 lg:order-1">
          <HomeStoreIllustration />
        </div>

        <MotionDiv
          initial={{ opacity: 0, x: 55 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.65, delay: 0.08 }}
          className="order-1 text-right lg:order-2"
        >
          <p className="text-base font-bold text-[var(--home-accent)] md:text-lg">نمو أسرع لحملاتك الإعلانية</p>
          <h1 className="mt-3 text-[clamp(2.1rem,5.4vw,5.2rem)] font-black leading-tight text-[var(--home-hero-title)]">
            انطلق بتجارتك
            <br />
            الإلكترونية
          </h1>
          <p className="mt-5 text-[clamp(1rem,1.6vw,2rem)] leading-relaxed text-[var(--home-text-primary)]">
            نحن متخصصون في بناء متاجر احترافية، وإنشاء تجارب رقمية تفاعلية للعلامات التجارية. ابدأ رحلتك الرقمية اليوم.
          </p>

          <div className="mt-8">
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
    </section>
  )
}

export default HomeHeroSection
