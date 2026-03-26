import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { FaChevronDown, FaChevronUp, FaCircleCheck, FaCircleXmark } from 'react-icons/fa6'

const MotionArticle = motion.article
const MotionDiv = motion.div
const MotionSpan = motion.span

function PricingPlanCard({
  plan,
  activeCycle,
  cycleDirection,
  index,
  isSelected,
  onSelect,
  planFeatures,
  selectedChipLabel = '\u0627\u0644\u0645\u062e\u062a\u0627\u0631\u0629 \u0627\u0644\u0622\u0646',
  chooseButtonLabel = '\u0627\u062e\u062a\u0631 \u0627\u0644\u0628\u0627\u0642\u0629',
  currencySymbol = '\u0631.\u0633',
}) {
  const [isMobile, setIsMobile] = useState(() => (typeof window !== 'undefined' ? window.innerWidth < 768 : false))
  const [isMobileDetailsOpen, setIsMobileDetailsOpen] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined
    }

    const mediaQuery = window.matchMedia('(max-width: 767px)')

    function syncViewportState(event) {
      const matches = typeof event?.matches === 'boolean' ? event.matches : mediaQuery.matches
      setIsMobile(matches)

      if (!matches) {
        setIsMobileDetailsOpen(false)
      }
    }

    syncViewportState()

    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', syncViewportState)
      return () => mediaQuery.removeEventListener('change', syncViewportState)
    }

    mediaQuery.addListener(syncViewportState)
    return () => mediaQuery.removeListener(syncViewportState)
  }, [])

  function handleCardSelect() {
    if (!isMobile) {
      onSelect(plan.key)
    }
  }

  function toggleMobileDetails(event) {
    event.stopPropagation()
    setIsMobileDetailsOpen((currentValue) => !currentValue)
  }

  function handleChoosePlan(event) {
    event.stopPropagation()
    onSelect(plan.key)
  }

  return (
    <MotionArticle
      layout
      onClick={handleCardSelect}
      initial={{ opacity: 0, y: 24, scale: 0.94 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.28,
        delay: index * 0.04,
        ease: [0.22, 1, 0.36, 1],
        layout: { duration: 0.22, ease: [0.22, 1, 0.36, 1] },
      }}
      whileHover={
        isMobile
          ? undefined
          : {
              y: -6,
              scale: 1.01,
              boxShadow: isSelected ? '0 22px 44px rgba(68, 208, 201, 0.24)' : '0 18px 36px rgba(9, 26, 49, 0.26)',
            }
      }
      className={`relative cursor-default overflow-hidden rounded-[26px] border p-5 text-right transition-opacity duration-300 md:cursor-pointer md:p-6 ${
        isSelected
          ? 'border-[var(--home-pricing-card-highlight-border)] [background:var(--home-pricing-card-highlight-bg)]'
          : 'border-[var(--home-pricing-card-border)] [background:var(--home-pricing-card-bg)] opacity-80'
      }`}
      dir="rtl"
    >
      <div className="md:hidden">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h3
                className={`text-lg font-black ${
                  isSelected ? 'text-[var(--home-pricing-highlight-title)]' : 'text-[var(--home-pricing-card-title)]'
                }`}
              >
                {plan.title}
              </h3>
              {isSelected ? (
                <span className="rounded-full bg-white/90 px-2.5 py-0.5 text-[11px] font-black text-[var(--home-pricing-highlight-chip)]">
                  {selectedChipLabel}
                </span>
              ) : null}
            </div>

            <p
              className={`mt-1 text-sm font-bold ${
                isSelected ? 'text-[var(--home-pricing-highlight-muted)]' : 'text-[var(--home-pricing-card-muted)]'
              }`}
            >
              {plan.period}
            </p>
          </div>

          <div className="flex shrink-0 items-start gap-2">
            <div className="text-left">
              <motion.p
                layout="position"
                className={`text-3xl font-black leading-none ${
                  isSelected ? 'text-[var(--home-pricing-highlight-price)]' : 'text-[var(--home-pricing-card-price)]'
                }`}
              >
                {plan.price}
                <span className="mr-1 text-lg">{currencySymbol}</span>
              </motion.p>
            </div>

            <button
              type="button"
              onClick={toggleMobileDetails}
              aria-expanded={isMobileDetailsOpen}
              aria-controls={`pricing-plan-details-${plan.key}`}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/10 px-3 text-xs font-black text-[var(--home-pricing-title)] backdrop-blur-sm"
            >
              <span>{isMobileDetailsOpen ? 'إخفاء' : 'التفاصيل'}</span>
              {isMobileDetailsOpen ? <FaChevronUp className="text-xs" /> : <FaChevronDown className="text-xs" />}
            </button>
          </div>
        </div>

        <AnimatePresence initial={false}>
          {isMobileDetailsOpen ? (
            <MotionDiv
              key={`pricing-mobile-details-${plan.key}`}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div id={`pricing-plan-details-${plan.key}`} className="mt-4 border-t border-white/15 pt-4">
                <ul className="space-y-2.5">
                  {planFeatures.map((featureTitle, featureIndex) => {
                    const enabled = plan.features[featureIndex]
                    return (
                      <li
                        key={`${plan.key}-${featureTitle}`}
                        className={`flex items-center justify-between gap-3 text-sm font-bold ${
                          enabled
                            ? isSelected
                              ? 'text-[var(--home-pricing-highlight-text)]'
                              : 'text-[var(--home-pricing-card-text)]'
                            : 'text-[var(--home-pricing-disabled-text)]'
                        }`}
                      >
                        <span>{featureTitle}</span>
                        {enabled ? (
                          <FaCircleCheck className="shrink-0 text-[var(--home-pricing-check)] transition-colors duration-200" />
                        ) : (
                          <FaCircleXmark className="shrink-0 text-[var(--home-pricing-close)] transition-colors duration-200" />
                        )}
                      </li>
                    )
                  })}
                </ul>

                <button
                  type="button"
                  onClick={handleChoosePlan}
                  className={`mt-5 inline-flex h-11 w-full items-center justify-center rounded-xl text-sm font-black transition-transform duration-300 ${
                    isSelected
                      ? 'bg-[var(--home-pricing-highlight-button)] text-[var(--home-pricing-highlight-button-text)]'
                      : 'bg-[var(--home-pricing-card-button)] text-[var(--home-pricing-card-button-text)]'
                  }`}
                >
                  {chooseButtonLabel}
                </button>
              </div>
            </MotionDiv>
          ) : null}
        </AnimatePresence>
      </div>

      <div className="hidden md:block">
        <AnimatePresence initial={false}>
          <MotionSpan
            key={`pricing-sheen-${plan.key}-${activeCycle}`}
            initial={{ opacity: 0, x: cycleDirection > 0 ? '38%' : '-38%', scaleX: 0.72 }}
            animate={{ opacity: [0, 0.18, 0], x: cycleDirection > 0 ? ['38%', '0%', '-24%'] : ['-38%', '0%', '24%'], scaleX: [0.72, 1.04, 0.88] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-none absolute inset-0 rounded-[26px] bg-gradient-to-r from-transparent via-white/14 to-transparent"
          />
        </AnimatePresence>

        {isSelected && (
          <>
            <MotionSpan
              layoutId="pricing-active-ring"
              transition={{ type: 'spring', stiffness: 300, damping: 24 }}
              className="pointer-events-none absolute inset-0 rounded-[26px] border-2"
              style={{ borderColor: 'var(--home-pricing-card-highlight-border)' }}
            />
            <span className="absolute left-1/2 top-2 -translate-x-1/2 rounded-full bg-white/90 px-3 py-0.5 text-xs font-black text-[var(--home-pricing-highlight-chip)]">
              {selectedChipLabel}
            </span>
          </>
        )}

        <AnimatePresence initial={false} mode="popLayout" custom={cycleDirection}>
          <MotionDiv
            key={`${plan.key}-${activeCycle}`}
            layout
            custom={cycleDirection}
            initial={(direction) => ({
              opacity: 0,
              x: direction > 0 ? 34 : -34,
              y: 10,
              scale: 0.965,
              rotateZ: direction > 0 ? 1.2 : -1.2,
              filter: 'blur(8px)',
            })}
            animate={{
              opacity: 1,
              x: 0,
              y: 0,
              scale: 1,
              rotateZ: 0,
              filter: 'blur(0px)',
            }}
            exit={(direction) => ({
              opacity: 0,
              x: direction > 0 ? -28 : 28,
              y: -6,
              scale: 0.975,
              rotateZ: direction > 0 ? -0.8 : 0.8,
              filter: 'blur(6px)',
            })}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
          >
            <h3
              className={`mt-5 text-xl font-black ${
                isSelected ? 'text-[var(--home-pricing-highlight-title)]' : 'text-[var(--home-pricing-card-title)]'
              }`}
            >
              {plan.title}
            </h3>

            <div className="mt-2">
              <motion.p
                layout="position"
                className={`text-6xl font-black leading-none ${
                  isSelected ? 'text-[var(--home-pricing-highlight-price)]' : 'text-[var(--home-pricing-card-price)]'
                }`}
              >
                {plan.price}
                <span className="mr-2 text-4xl">{currencySymbol}</span>
              </motion.p>
              <p
                className={`mt-1 text-sm font-bold ${
                  isSelected ? 'text-[var(--home-pricing-highlight-muted)]' : 'text-[var(--home-pricing-card-muted)]'
                }`}
              >
                {plan.period}
              </p>
            </div>

            <ul className="mt-5 space-y-2.5">
              {planFeatures.map((featureTitle, featureIndex) => {
                const enabled = plan.features[featureIndex]
                return (
                  <li
                    key={`${plan.key}-${featureTitle}`}
                    className={`flex items-center justify-between text-sm font-bold md:text-base ${
                      enabled
                        ? isSelected
                          ? 'text-[var(--home-pricing-highlight-text)]'
                          : 'text-[var(--home-pricing-card-text)]'
                        : 'text-[var(--home-pricing-disabled-text)]'
                    }`}
                  >
                    <span>{featureTitle}</span>
                    {enabled ? (
                      <FaCircleCheck className="text-[var(--home-pricing-check)] transition-colors duration-200" />
                    ) : (
                      <FaCircleXmark className="text-[var(--home-pricing-close)] transition-colors duration-200" />
                    )}
                  </li>
                )
              })}
            </ul>

            <button
              type="button"
              onClick={handleChoosePlan}
              className={`mt-6 inline-flex h-11 w-full items-center justify-center rounded-xl text-base font-black transition-transform duration-300 hover:-translate-y-0.5 ${
                isSelected
                  ? 'bg-[var(--home-pricing-highlight-button)] text-[var(--home-pricing-highlight-button-text)]'
                  : 'bg-[var(--home-pricing-card-button)] text-[var(--home-pricing-card-button-text)]'
              }`}
            >
              {chooseButtonLabel}
            </button>
          </MotionDiv>
        </AnimatePresence>
      </div>
    </MotionArticle>
  )
}

export default PricingPlanCard
