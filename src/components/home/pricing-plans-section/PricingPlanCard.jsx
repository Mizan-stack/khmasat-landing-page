import { motion } from 'framer-motion'
import { FaCircleCheck, FaCircleXmark } from 'react-icons/fa6'

const MotionArticle = motion.article

function PricingPlanCard({
  plan,
  activeCycle,
  index,
  isSelected,
  onSelect,
  planFeatures,
  selectedChipLabel = '\u0627\u0644\u0645\u062e\u062a\u0627\u0631\u0629 \u0627\u0644\u0622\u0646',
  chooseButtonLabel = '\u0627\u062e\u062a\u0631 \u0627\u0644\u0628\u0627\u0642\u0629',
  currencySymbol = '\u0631.\u0633',
}) {
  return (
    <MotionArticle
      onClick={() => onSelect(plan.key)}
      initial={{ opacity: 0, y: 24, scale: 0.94 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.45, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{
        y: -10,
        scale: 1.015,
        boxShadow: isSelected ? '0 28px 60px rgba(68, 208, 201, 0.32)' : '0 24px 52px rgba(9, 26, 49, 0.34)',
      }}
      className={`relative cursor-pointer overflow-hidden rounded-[26px] border p-5 text-right transition-opacity duration-300 md:p-6 ${
        isSelected
          ? 'border-[var(--home-pricing-card-highlight-border)] [background:var(--home-pricing-card-highlight-bg)]'
          : 'border-[var(--home-pricing-card-border)] [background:var(--home-pricing-card-bg)] opacity-80'
      }`}
      dir="rtl"
    >
      {isSelected && (
        <>
          <motion.span
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

      <h3
        className={`mt-5 text-3xl font-black ${
          isSelected ? 'text-[var(--home-pricing-highlight-title)]' : 'text-[var(--home-pricing-card-title)]'
        }`}
      >
        {plan.title}
      </h3>

      <div className="mt-2">
        <motion.p
          key={`${activeCycle}-${plan.key}-price`}
          initial={{ opacity: 0, y: 12, scale: 0.85 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.36, ease: 'easeOut' }}
          className={`text-6xl font-black leading-none ${
            isSelected ? 'text-[var(--home-pricing-highlight-price)]' : 'text-[var(--home-pricing-card-price)]'
          }`}
        >
          {plan.price}
          <span className="mr-2 text-4xl">{currencySymbol}</span>
        </motion.p>
        <p
          className={`mt-1 text-lg font-bold ${
            isSelected ? 'text-[var(--home-pricing-highlight-muted)]' : 'text-[var(--home-pricing-card-muted)]'
          }`}
        >
          {plan.period}
        </p>
      </div>

      <motion.ul
        key={`${activeCycle}-${plan.key}-features`}
        initial="hidden"
        animate="show"
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.035, delayChildren: 0.08 } },
        }}
        className="mt-5 space-y-2.5"
      >
        {planFeatures.map((featureTitle, featureIndex) => {
          const enabled = plan.features[featureIndex]
          return (
            <motion.li
              key={`${plan.key}-${featureTitle}`}
              variants={{
                hidden: { opacity: 0, x: 10, filter: 'blur(4px)' },
                show: { opacity: 1, x: 0, filter: 'blur(0px)' },
              }}
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
                <FaCircleCheck className="text-[var(--home-pricing-check)]" />
              ) : (
                <FaCircleXmark className="text-[var(--home-pricing-close)]" />
              )}
            </motion.li>
          )
        })}
      </motion.ul>

      <button
        type="button"
        onClick={() => onSelect(plan.key)}
        className={`mt-6 inline-flex h-11 w-full items-center justify-center rounded-xl text-base font-black transition-transform duration-300 hover:-translate-y-0.5 ${
          isSelected
            ? 'bg-[var(--home-pricing-highlight-button)] text-[var(--home-pricing-highlight-button-text)]'
            : 'bg-[var(--home-pricing-card-button)] text-[var(--home-pricing-card-button-text)]'
        }`}
      >
        {chooseButtonLabel}
      </button>
    </MotionArticle>
  )
}

export default PricingPlanCard
