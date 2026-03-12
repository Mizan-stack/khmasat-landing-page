import { motion } from 'framer-motion'
import { AD_BILLING_CYCLES } from './addAdModalData'

const MotionButton = motion.button

function PlanStep({ planCycle, planOptions, selectedPlanKey, onCycleChange, onSelectPlan, onContinue }) {
  return (
    <div className="space-y-5" dir="rtl">
      <div className="text-right">
        <h3 className="text-2xl font-black text-[var(--ads-text)]">اختر الباقة المناسبة لإعلانك</h3>
        <p className="mt-1 text-sm text-[var(--ads-muted)]">نفس باقات صفحة الأسعار في الصفحة الرئيسية مع كل دورات الدفع.</p>
      </div>

      <div className="flex justify-center">
        <div className="inline-flex rounded-2xl border border-[var(--ads-border-soft)] bg-[var(--ads-surface-soft)] p-1.5">
          {AD_BILLING_CYCLES.map((cycle) => {
            const isActive = planCycle === cycle.key
            return (
              <button
                key={cycle.key}
                type="button"
                onClick={() => onCycleChange(cycle.key)}
                className={`relative min-w-24 rounded-xl px-4 py-2 text-sm font-black transition-colors ${
                  isActive
                    ? 'bg-[var(--ads-dropdown-active-bg)] text-white shadow-[0_10px_24px_rgba(47,102,230,0.35)]'
                    : 'text-[var(--ads-text)] hover:bg-[var(--ads-dropdown-hover-bg)]'
                }`}
              >
                {cycle.label}
              </button>
            )
          })}
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        {planOptions.map((plan, index) => {
          const isActive = selectedPlanKey === plan.key

          return (
            <MotionButton
              key={plan.key}
              type="button"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              onClick={() => onSelectPlan(plan.key)}
              className={`relative overflow-hidden rounded-2xl border p-4 text-right transition-all duration-300 ${
                isActive
                  ? 'border-cyan-300 bg-cyan-500/10 shadow-[0_16px_30px_rgba(27,192,185,0.25)]'
                  : 'border-[var(--ads-border-soft)] bg-[var(--ads-surface-soft)] hover:-translate-y-0.5'
              }`}
            >
              <span className="inline-flex rounded-full bg-[var(--ads-dropdown-active-bg)]/15 px-2.5 py-1 text-xs font-black text-[var(--ads-dropdown-active-bg)]">
                {plan.badge}
              </span>
              <h4 className="mt-3 text-lg font-black text-[var(--ads-text)]">{plan.title}</h4>
              <p className="mt-2 text-3xl font-black text-[var(--ads-text)]">{plan.price}</p>
              <p className="text-sm font-semibold text-[var(--ads-muted)]">{plan.period}</p>
              <p className="mt-2 text-sm leading-relaxed text-[var(--ads-muted)]">{plan.description}</p>
            </MotionButton>
          )
        })}
      </div>

      <div className="flex justify-end">
        <MotionButton
          type="button"
          whileHover={{ y: -2, scale: 1.01 }}
          whileTap={{ scale: 0.97 }}
          onClick={onContinue}
          disabled={!selectedPlanKey}
          className="inline-flex h-12 min-w-36 items-center justify-center rounded-2xl px-7 text-base font-black text-[var(--ads-create-text)] [background:var(--ads-create-bg)] disabled:cursor-not-allowed disabled:opacity-55"
        >
          التالي
        </MotionButton>
      </div>
    </div>
  )
}

export default PlanStep
