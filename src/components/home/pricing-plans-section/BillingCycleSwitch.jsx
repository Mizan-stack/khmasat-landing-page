import { motion } from 'framer-motion'

const MotionButton = motion.button

function BillingCycleSwitch({ cycles, activeCycle, onChange }) {
  return (
    <div className="relative inline-flex rounded-2xl border border-[var(--home-pricing-switch-border)] bg-[var(--home-pricing-switch-bg)] p-1.5">
      {cycles.map((cycle) => {
        const isActive = cycle.key === activeCycle
        return (
          <MotionButton
            key={cycle.key}
            type="button"
            onClick={() => onChange(cycle.key)}
            whileTap={{ scale: 0.95 }}
            className="relative min-w-28 overflow-hidden rounded-xl px-5 py-2 text-base font-black"
          >
            {isActive && (
              <motion.span
                layoutId="pricing-cycle-active"
                transition={{ type: 'spring', stiffness: 320, damping: 28 }}
                className="absolute inset-0 [background:var(--home-pricing-switch-active)] shadow-[0_10px_24px_rgba(59,214,202,0.35)]"
              />
            )}
            <span
              className={`relative z-10 transition-colors ${
                isActive ? 'text-[var(--home-pricing-switch-text-active)]' : 'text-[var(--home-pricing-switch-text)]'
              }`}
            >
              {cycle.label}
            </span>
          </MotionButton>
        )
      })}
    </div>
  )
}

export default BillingCycleSwitch
