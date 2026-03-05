import { BILLING_CYCLES, PLAN_FEATURES, PLAN_TITLES, PRICING_DATA } from './pricingPlansData'
import { AnimatePresence, motion } from 'framer-motion'
import { useMemo, useState } from 'react'
import BillingCycleSwitch from './BillingCycleSwitch'
import PricingPlanCard from './PricingPlanCard'

const MotionSection = motion.section
const MotionDiv = motion.div

function HomePricingPlansSection() {
  const [activeCycle, setActiveCycle] = useState('halfYear')
  const [selectedPlanKey, setSelectedPlanKey] = useState('standard')

  const plans = useMemo(() => {
    const cycleData = PRICING_DATA[activeCycle]
    return PLAN_TITLES.map((planTitle) => ({
      ...planTitle,
      ...cycleData[planTitle.key],
    }))
  }, [activeCycle])

  return (
    <MotionSection
      id="pricing"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.55 }}
      className="w-full pb-28"
    >
      <div className="relative overflow-hidden border-y border-[var(--home-pricing-border)] [background:var(--home-pricing-bg)] px-4 py-12 md:px-8 md:py-14">
        <motion.span
          aria-hidden
          animate={{ x: [0, 34, 0], y: [0, -26, 0], opacity: [0.18, 0.42, 0.18] }}
          transition={{ duration: 6.8, repeat: Infinity, ease: 'easeInOut' }}
          className="pointer-events-none absolute -left-20 top-8 h-64 w-64 rounded-full [background:var(--home-pricing-glow)] blur-3xl"
        />
        <motion.span
          aria-hidden
          animate={{ x: [0, -30, 0], y: [0, 18, 0], opacity: [0.14, 0.35, 0.14] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="pointer-events-none absolute -bottom-24 right-[-76px] h-72 w-72 rounded-full [background:var(--home-pricing-glow)] blur-3xl"
        />

        <div className="relative z-10 mx-auto w-full">
          <div className="text-center">
            <span className="inline-flex rounded-full border border-[var(--home-pricing-chip-border)] bg-[var(--home-pricing-chip-bg)] px-4 py-1 text-sm font-black text-[var(--home-pricing-chip-text)]">
              باقات الاشتراك
            </span>
            <h2 className="mt-3 text-[clamp(2.2rem,4.8vw,4.8rem)] font-black leading-tight text-[var(--home-pricing-title)]">
              أسعار شفافة
            </h2>
            <p className="mt-2 text-base text-[var(--home-pricing-muted)] md:text-lg">اختر الباقة المثالية لنمو تجارتك</p>
          </div>

          <div className="mt-6 flex justify-center">
            <BillingCycleSwitch cycles={BILLING_CYCLES} activeCycle={activeCycle} onChange={setActiveCycle} />
          </div>

          <AnimatePresence mode="wait">
            <MotionDiv
              key={activeCycle}
              initial={{ opacity: 0, y: 38, scale: 0.94, rotateX: 14, filter: 'blur(7px)' }}
              animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -26, scale: 0.95, rotateX: -8, filter: 'blur(6px)' }}
              transition={{ duration: 0.62, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 grid gap-4 lg:grid-cols-3"
              dir="ltr"
            >
                            {plans.map((plan, index) => (
                <PricingPlanCard
                  key={`${plan.key}-${activeCycle}`}
                  plan={plan}
                  activeCycle={activeCycle}
                  index={index}
                  isSelected={selectedPlanKey === plan.key}
                  onSelect={setSelectedPlanKey}
                  planFeatures={PLAN_FEATURES}
                />
              ))}
            </MotionDiv>
          </AnimatePresence>
        </div>
      </div>
    </MotionSection>
  )
}

export default HomePricingPlansSection


