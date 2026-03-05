import { AnimatePresence, motion } from 'framer-motion'
import { useMemo, useState } from 'react'
import FeaturePreviewPanel from './platform-features/feature-preview'
import FeatureSideList from './platform-features/FeatureSideList'
import { PLATFORM_FEATURES } from './platform-features/platformFeaturesData'

const MotionSection = motion.section
const MotionDiv = motion.div
const MotionSpan = motion.span

function HomePlatformFeaturesSection() {
  const [activeKey, setActiveKey] = useState(PLATFORM_FEATURES[0].key)
  const activeItem = useMemo(
    () => PLATFORM_FEATURES.find((item) => item.key === activeKey) ?? PLATFORM_FEATURES[0],
    [activeKey],
  )

  return (
    <MotionSection
      id="works"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.55 }}
      className="w-full pb-24"
    >
      <div className="relative overflow-hidden border-y border-[var(--home-power-border)] [background:var(--home-power-bg)] py-16 md:py-20">
        <MotionSpan
          aria-hidden
          animate={{ x: [0, 36, 0], y: [0, -24, 0], opacity: [0.25, 0.65, 0.25] }}
          transition={{ duration: 7.2, repeat: Infinity, ease: 'easeInOut' }}
          className="pointer-events-none absolute -left-20 top-6 h-64 w-64 rounded-full [background:var(--home-power-glow)] blur-3xl"
        />
        <MotionSpan
          aria-hidden
          animate={{ x: [0, -32, 0], y: [0, 20, 0], opacity: [0.2, 0.55, 0.2] }}
          transition={{ duration: 8.1, repeat: Infinity, ease: 'easeInOut' }}
          className="pointer-events-none absolute -bottom-24 right-[-110px] h-72 w-72 rounded-full [background:var(--home-power-glow)] blur-3xl"
        />

        <div className="relative z-10 mx-auto w-full max-w-[1320px] px-3 md:px-6">
          <div className="text-center">
            <span className="inline-flex rounded-full border border-[var(--home-power-chip-border)] bg-[var(--home-power-chip-bg)] px-4 py-1 text-xs font-bold text-[var(--home-power-chip-text)]">
              ما الذي نقدمه
            </span>
            <h2 className="mt-4 text-[clamp(2.2rem,5.6vw,5rem)] font-black leading-tight text-[var(--home-power-title)]">
              مميزات قوية للمنصة
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-lg text-[var(--home-power-text)] md:text-2xl">
              كل ما تحتاجه لإدارة وتنمية تجارتك الإلكترونية بكفاءة.
            </p>
          </div>

          <div className="mt-12 grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_340px]" dir="ltr">
            <div className="relative overflow-hidden rounded-[30px] border border-[var(--home-power-panel-border)] [background:var(--home-power-panel-bg)] p-4 md:p-6">
              <AnimatePresence mode="wait">
                <MotionDiv
                  key={activeItem.key}
                  initial={{
                    opacity: 0,
                    clipPath: 'inset(12% 8% 12% 8% round 28px)',
                    rotateX: 12,
                    y: 34,
                    filter: 'blur(8px)',
                  }}
                  animate={{
                    opacity: 1,
                    clipPath: 'inset(0% 0% 0% 0% round 0px)',
                    rotateX: 0,
                    y: 0,
                    filter: 'blur(0px)',
                  }}
                  exit={{
                    opacity: 0,
                    clipPath: 'inset(14% 10% 14% 10% round 28px)',
                    rotateX: -9,
                    y: -26,
                    filter: 'blur(7px)',
                  }}
                  transition={{ duration: 0.62, ease: [0.22, 1, 0.36, 1] }}
                >
                  <FeaturePreviewPanel item={activeItem} />
                </MotionDiv>
              </AnimatePresence>
            </div>

            <FeatureSideList features={PLATFORM_FEATURES} activeKey={activeKey} onChange={setActiveKey} />
          </div>
        </div>
      </div>
    </MotionSection>
  )
}

export default HomePlatformFeaturesSection
