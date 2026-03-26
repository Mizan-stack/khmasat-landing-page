import { BILLING_CYCLES, PLAN_FEATURES, PLAN_TITLES, PRICING_DATA } from './pricingPlansData'
import { motion } from 'framer-motion'
import { useMemo, useState } from 'react'
import BillingCycleSwitch from './BillingCycleSwitch'
import PricingPlanCard from './PricingPlanCard'

const MotionSection = motion.section
const MotionDiv = motion.div

function HomePricingPlansSection() {
  const [activeCycle, setActiveCycle] = useState('halfYear')
  const [cycleDirection, setCycleDirection] = useState(1)
  const [selectedPlanKey, setSelectedPlanKey] = useState('standard')

  const plans = useMemo(() => {
    const cycleData = PRICING_DATA[activeCycle]
    return PLAN_TITLES.map((planTitle) => ({
      ...planTitle,
      ...cycleData[planTitle.key],
    }))
  }, [activeCycle])

  function handleCycleChange(nextCycle) {
    if (nextCycle === activeCycle) {
      return
    }

    const currentIndex = BILLING_CYCLES.findIndex((cycle) => cycle.key === activeCycle)
    const nextIndex = BILLING_CYCLES.findIndex((cycle) => cycle.key === nextCycle)

    setCycleDirection(nextIndex > currentIndex ? 1 : -1)
    setActiveCycle(nextCycle)
  }

  return (
    <MotionSection
      id="pricing"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.55 }}
      className="w-full pb-14 md:pb-24"
    >
      <div className="relative overflow-hidden border-y border-[var(--home-pricing-border)] [background:var(--home-pricing-bg)] px-4 py-7 md:px-7 md:py-11">
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
            <h2 className="text-[clamp(1.6rem,3.5vw,3rem)] font-black leading-tight text-[var(--home-pricing-title)]">
              أسعار شفافة
            </h2>
            <p className="mt-2 text-xs text-[var(--home-pricing-muted)] md:text-sm">اختر الباقة المثالية لنمو تجارتك</p>
          </div>

          <div className="mt-5 flex justify-center">
            <BillingCycleSwitch cycles={BILLING_CYCLES} activeCycle={activeCycle} onChange={handleCycleChange} />
          </div>

          <MotionDiv
            layout
            transition={{ layout: { duration: 0.22, ease: [0.22, 1, 0.36, 1] } }}
            className="mt-6 grid gap-4 lg:grid-cols-3"
            dir="ltr"
          >
            {plans.map((plan, index) => (
              <PricingPlanCard
                key={plan.key}
                plan={plan}
                activeCycle={activeCycle}
                cycleDirection={cycleDirection}
                index={index}
                isSelected={selectedPlanKey === plan.key}
                onSelect={setSelectedPlanKey}
                planFeatures={PLAN_FEATURES}
              />
            ))}
          </MotionDiv>
        </div>
      </div>
    </MotionSection>
  )
}

export default HomePricingPlansSection


