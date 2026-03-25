import { TAB_ITEMS } from './storyTabsData'
import { AnimatePresence, motion } from 'framer-motion'
import { useMemo, useState } from 'react'
import { FaCircleCheck } from 'react-icons/fa6'

const MotionDiv = motion.div
const MotionButton = motion.button
const MotionFigure = motion.figure
const MotionList = motion.ul
const MotionListItem = motion.li
const MotionSpan = motion.span

function HomeStoryTabsSection() {
  const [activeKey, setActiveKey] = useState('vision')
  const activeItem = useMemo(() => TAB_ITEMS.find((item) => item.key === activeKey) ?? TAB_ITEMS[0], [activeKey])

  return (
    <section id="about" className="w-full pb-20 md:pb-24">
      <div className="relative w-full overflow-hidden rounded-none border-y border-[var(--home-story-border)] [background:var(--home-story-bg)] p-5 md:border md:p-6">
        <MotionSpan
          aria-hidden
          animate={{ x: [0, 26, 0], y: [0, -18, 0], opacity: [0.35, 0.65, 0.35] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="pointer-events-none absolute -left-16 -top-20 h-48 w-48 rounded-full [background:var(--home-story-glow)] blur-3xl"
        />
        <MotionSpan
          aria-hidden
          animate={{ x: [0, -24, 0], y: [0, 15, 0], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          className="pointer-events-none absolute -bottom-24 right-[-72px] h-64 w-64 rounded-full [background:var(--home-story-glow)] blur-3xl"
        />

        <div className="relative z-10 grid items-center gap-6 lg:grid-cols-[1.05fr_0.95fr]" dir="ltr">
          <div dir="rtl">
            <AnimatePresence mode="wait">
              <MotionDiv
                key={activeItem.key}
                initial={{ opacity: 0, y: 24, x: -28, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, x: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -20, x: 26, filter: 'blur(6px)' }}
                transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
              >
                <h2 className="text-[clamp(1.55rem,3.4vw,3.05rem)] font-black leading-tight text-[var(--home-story-title)]">
                  {activeItem.titleLead}
                  <br />
                  <span className="text-[var(--home-story-accent)]">{activeItem.titleAccent}</span>
                </h2>

                <div className="mt-4 flex flex-wrap gap-3">
                  {TAB_ITEMS.map((item) => {
                    const isActive = item.key === activeKey
                    return (
                      <MotionButton
                        key={item.key}
                        type="button"
                        onClick={() => setActiveKey(item.key)}
                        whileTap={{ scale: 0.95 }}
                        className="relative overflow-hidden rounded-full border border-[var(--home-story-border)] px-7 py-2 text-base font-black"
                      >
                        {isActive && (
                          <motion.span
                            layoutId="about-tab-active-bg"
                            transition={{ type: 'spring', stiffness: 320, damping: 28 }}
                            className="absolute inset-0 [background:var(--home-story-tab-active)] shadow-[0_8px_24px_rgba(43,183,189,0.35)]"
                          />
                        )}
                        <span
                          className={`relative z-10 transition-colors ${
                            isActive ? 'text-[var(--home-story-tab-text-active)]' : 'text-[var(--home-story-tab-text)]'
                          }`}
                        >
                          {item.label}
                        </span>
                      </MotionButton>
                    )
                  })}
                </div>

                <p className="mt-4 max-w-2xl text-right text-sm leading-relaxed text-[var(--home-story-text)] md:text-[1.05rem]">
                  {activeItem.description}
                </p>

                <MotionList
                  initial="hidden"
                  animate="show"
                  variants={{
                    hidden: {},
                    show: {
                      transition: { staggerChildren: 0.08, delayChildren: 0.1 },
                    },
                  }}
                  className="mt-5 grid gap-3 text-right sm:grid-cols-2"
                >
                  {activeItem.points.map((point) => (
                    <MotionListItem
                      key={point}
                      variants={{
                        hidden: { opacity: 0, y: 14 },
                        show: { opacity: 1, y: 0 },
                      }}
                      className="inline-flex flex-row-reverse items-center justify-end gap-2 text-sm font-semibold text-[var(--home-story-muted)] md:text-base"
                    >
                      <span>{point}</span>
                      <FaCircleCheck className="text-[var(--home-story-accent)]" />
                    </MotionListItem>
                  ))}
                </MotionList>
              </MotionDiv>
            </AnimatePresence>
          </div>

          <div className="w-full">
            <AnimatePresence mode="wait">
              <MotionFigure
                key={activeItem.key}
                initial={{ opacity: 0, x: 90, rotate: -4, scale: 0.9, filter: 'blur(10px)' }}
                animate={{ opacity: 1, x: 0, rotate: 0, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, x: -80, rotate: 4, scale: 0.92, filter: 'blur(8px)' }}
                transition={{ duration: 0.56, ease: [0.22, 1, 0.36, 1] }}
                className="relative"
              >
                <div className="overflow-hidden rounded-[28px] border border-[var(--home-story-image-border)] [background:var(--home-story-image-frame)] p-2 shadow-[0_30px_70px_rgba(13,20,43,0.35)]">
                  <motion.img
                    src={activeItem.image}
                    alt={activeItem.label}
                    className="h-[560px] w-full rounded-[22px] object-cover md:h-[620px]"
                    initial={{ scale: 1.12 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.75, ease: 'easeOut' }}
                  />
                </div>

                <MotionDiv
                  initial={{ opacity: 0, y: 40, scale: 0.85 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.45, delay: 0.25 }}
                  className="absolute -bottom-5 right-4 rounded-2xl [background:var(--home-story-stat-bg)] px-6 py-4 text-white shadow-[0_18px_42px_rgba(27,183,189,0.35)] md:right-6"
                >
                  <p className="text-right text-5xl font-black leading-none md:text-6xl">{activeItem.stat}</p>
                  <p className="mt-1 text-right text-sm font-bold text-[var(--home-story-stat-text)] md:text-lg">
                    {activeItem.statLabel}
                  </p>
                </MotionDiv>
              </MotionFigure>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HomeStoryTabsSection

