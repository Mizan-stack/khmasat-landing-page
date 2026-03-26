import { AnimatePresence, motion } from 'framer-motion'
import { useLayoutEffect, useMemo, useRef, useState } from 'react'
import FeaturePreviewPanel from './platform-features/feature-preview'
import FeatureSideList from './platform-features/FeatureSideList'
import { PLATFORM_FEATURES } from './platform-features/platformFeaturesData'

const MotionSection = motion.section
const MotionDiv = motion.div
const MotionSpan = motion.span

function HomePlatformFeaturesSection() {
  const [activeKey, setActiveKey] = useState(PLATFORM_FEATURES[0].key)
  const [previewOffset, setPreviewOffset] = useState(0)
  const listRef = useRef(null)
  const previewRef = useRef(null)
  const buttonRefs = useRef(new Map())
  const activeItem = useMemo(
    () => PLATFORM_FEATURES.find((item) => item.key === activeKey) ?? PLATFORM_FEATURES[0],
    [activeKey],
  )

  useLayoutEffect(() => {
    function updatePreviewOffset() {
      if (window.innerWidth < 1024) {
        setPreviewOffset(0)
        return
      }

      const listElement = listRef.current
      const previewElement = previewRef.current
      const activeButton = buttonRefs.current.get(activeKey)

      if (!listElement || !previewElement || !activeButton) {
        setPreviewOffset(0)
        return
      }

      const listRect = listElement.getBoundingClientRect()
      const buttonRect = activeButton.getBoundingClientRect()
      const previewRect = previewElement.getBoundingClientRect()
      const rawOffset = buttonRect.top - listRect.top + buttonRect.height / 2 - previewRect.height / 2
      const maxOffset = Math.max(listRect.height - previewRect.height, 0)
      const nextOffset = Math.max(0, Math.min(rawOffset, maxOffset))

      setPreviewOffset(nextOffset)
    }

    const frameId = window.requestAnimationFrame(updatePreviewOffset)
    window.addEventListener('resize', updatePreviewOffset)

    return () => {
      window.cancelAnimationFrame(frameId)
      window.removeEventListener('resize', updatePreviewOffset)
    }
  }, [activeKey])

  return (
    <MotionSection
      id="works"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.55 }}
      className="w-full pb-14 md:pb-24"
    >
      <div className="relative overflow-hidden border-y border-[var(--home-power-border)] [background:var(--home-power-bg)] py-8 md:py-12">
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
            <h2 className="text-[clamp(1.6rem,3.6vw,3.2rem)] font-black leading-tight text-[var(--home-power-title)]">
              مميزات قوية للمنصة
            </h2>
            <p className="mx-auto mt-2 max-w-2xl text-sm text-[var(--home-power-text)] md:text-lg">
              كل ما تحتاجه لإدارة وتنمية تجارتك الإلكترونية بكفاءة.
            </p>
          </div>

          <div className="mt-8 space-y-4 md:hidden">
            <FeatureSideList features={PLATFORM_FEATURES} activeKey={activeKey} onChange={setActiveKey} mobile />

            <MotionDiv className="relative overflow-hidden rounded-[30px] border border-[var(--home-power-panel-border)] [background:var(--home-power-panel-bg)] p-4">
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
            </MotionDiv>
          </div>

          <div className="mt-8 hidden items-start gap-6 md:grid md:mt-10 lg:grid-cols-[minmax(0,1fr)_340px]" dir="ltr">
            <MotionDiv
              ref={previewRef}
              initial={false}
              animate={{ y: previewOffset }}
              transition={{ type: 'spring', stiffness: 150, damping: 22, mass: 0.92 }}
              className="relative overflow-hidden rounded-[30px] border border-[var(--home-power-panel-border)] [background:var(--home-power-panel-bg)] p-4 md:p-5 lg:self-start"
            >
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
            </MotionDiv>

            <FeatureSideList
              features={PLATFORM_FEATURES}
              activeKey={activeKey}
              onChange={setActiveKey}
              listRef={listRef}
              buttonRefs={buttonRefs}
            />
          </div>
        </div>
      </div>
    </MotionSection>
  )
}

export default HomePlatformFeaturesSection
