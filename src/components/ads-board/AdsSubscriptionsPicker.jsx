import { motion } from 'framer-motion'
import { useMemo, useState } from 'react'
import { FaChevronDown, FaChevronUp, FaCircleCheck, FaCircleXmark } from 'react-icons/fa6'
import { BILLING_CYCLES, PLAN_FEATURES, PLAN_TITLES, PRICING_DATA } from '../home/pricing-plans-section/pricingPlansData'
import { DEFAULT_AD_PLAN_KEY } from './add-ad-modal/addAdModalData'

const MotionArticle = motion.article
const MotionButton = motion.button
const MotionDiv = motion.div

const PLAN_BADGES = {
  advanced: 'الأقوى',
  standard: 'الأكثر استخدامًا',
  free: 'للبداية',
}

const PLAN_NOTES = {
  advanced: 'مناسب للأنشطة التي تريد أفضل وصول وتحكم ومزايا متقدمة.',
  standard: 'الخيار المتوازن بين السعر والمزايا لإدارة الإعلانات بشكل مريح.',
  free: 'حل سريع وبسيط لبدء الإعلان وتجربة المنصة قبل التوسع.',
}

const PREVIEW_FEATURE_COUNT = 4

function AdsSubscriptionsPicker({
  title,
  description,
  activeCycle,
  selectedPlanKey,
  onCycleChange,
  onSelectPlan,
  currentPlanKey,
  currentPlanLabel = 'باقتك الحالية',
  selectedSummaryLabel = 'الباقة المختارة',
  summaryNote,
  actionLabel,
  onAction,
  actionDisabled = false,
  actionTrailingIcon = null,
  secondaryActionLabel,
  onSecondaryAction,
  topMeta = null,
}) {
  const [expandedPlanKey, setExpandedPlanKey] = useState(null)

  const plans = useMemo(() => {
    const cycleData = PRICING_DATA[activeCycle] ?? PRICING_DATA.halfYear

    return PLAN_TITLES.map((planTitle) => ({
      ...planTitle,
      ...cycleData[planTitle.key],
    }))
  }, [activeCycle])

  const effectiveSelectedPlanKey = selectedPlanKey || DEFAULT_AD_PLAN_KEY
  const selectedPlan = plans.find((plan) => plan.key === effectiveSelectedPlanKey) ?? plans[0]

  function togglePlanDetails(planKey) {
    setExpandedPlanKey((currentKey) => (currentKey === planKey ? null : planKey))
  }

  return (
    <div className="space-y-5" dir="rtl">
      {title || description ? (
        <div className="text-right">
          {title ? <h3 className="text-[clamp(1.55rem,2.4vw,2.15rem)] font-black text-[var(--ads-text)]">{title}</h3> : null}
          {description ? <p className="mt-2 max-w-3xl text-sm leading-7 text-[var(--ads-muted)] md:text-base">{description}</p> : null}
        </div>
      ) : null}

      <div className="rounded-[32px] border border-[var(--ads-border)] bg-[var(--ads-surface)] p-4 shadow-[0_18px_38px_rgba(18,34,62,0.08)] md:p-6">
        {topMeta ? <div className="mb-5">{topMeta}</div> : null}

        <div className="flex justify-center">
          <div className="inline-flex rounded-2xl border border-[var(--ads-border-soft)] bg-[var(--ads-surface-soft)] p-1.5">
            {BILLING_CYCLES.map((cycle) => {
              const isActive = cycle.key === activeCycle

              return (
                <MotionButton
                  key={cycle.key}
                  type="button"
                  onClick={() => onCycleChange(cycle.key)}
                  whileTap={{ scale: 0.96 }}
                  className={`rounded-xl px-5 py-2 text-sm font-black transition-all duration-300 md:min-w-28 ${
                    isActive
                      ? 'text-[var(--ads-button-primary-text)] shadow-[0_12px_24px_rgba(44,183,176,0.24)] [background:var(--ads-button-primary-bg)]'
                      : 'text-[var(--ads-text)] hover:bg-[var(--ads-button-ghost-bg)]'
                  }`}
                >
                  {cycle.label}
                </MotionButton>
              )
            })}
          </div>
        </div>

        <MotionDiv layout className="mt-6 grid gap-4 xl:grid-cols-3">
          {plans.map((plan, index) => {
            const isSelected = effectiveSelectedPlanKey === plan.key
            const isCurrent = currentPlanKey === plan.key
            const isExpanded = expandedPlanKey === plan.key
            const featureIndexes = isExpanded
              ? PLAN_FEATURES.map((_, featureIndex) => featureIndex)
              : PLAN_FEATURES.slice(0, PREVIEW_FEATURE_COUNT).map((_, featureIndex) => featureIndex)

            return (
              <MotionArticle
                key={`${plan.key}-${activeCycle}`}
                layout
                initial={{ opacity: 0, y: 18, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.28, delay: index * 0.04, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -5 }}
                className={`relative flex h-full flex-col overflow-hidden rounded-[28px] border p-5 text-right transition-all duration-300 md:p-6 ${
                  isSelected
                    ? 'border-[color:var(--ads-selected-plan-border)] [background:var(--ads-selected-plan-bg)] [box-shadow:var(--ads-selected-plan-shadow)]'
                    : 'border-[var(--ads-border-soft)] bg-[var(--ads-surface-soft)] shadow-[0_14px_28px_rgba(18,34,62,0.06)]'
                }`}
              >
                {isSelected ? (
                  <span className="pointer-events-none absolute inset-x-0 top-0 h-1 [background:var(--ads-button-primary-bg)]" />
                ) : null}

                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-[var(--ads-button-ghost-bg)] px-3 py-1 text-xs font-black text-[var(--ads-button-ghost-text)]">
                      {PLAN_BADGES[plan.key]}
                    </span>
                    {isCurrent ? (
                      <span className="rounded-full border border-[var(--ads-success-soft-border)] bg-[var(--ads-success-soft-bg)] px-3 py-1 text-xs font-black text-[var(--ads-success-soft-text)]">
                        {currentPlanLabel}
                      </span>
                    ) : null}
                  </div>

                  {isSelected ? (
                    <span className="rounded-full border border-[var(--ads-selected-soft-border)] bg-[var(--ads-selected-soft-bg)] px-3 py-1 text-xs font-black text-[var(--ads-selected-soft-text)]">
                      المختارة الآن
                    </span>
                  ) : null}
                </div>

                <h4 className="mt-4 text-xl font-black text-[var(--ads-text)]">{plan.title}</h4>

                <div className="mt-3">
                  <p className="text-5xl font-black leading-none text-[var(--ads-text)]">
                    {plan.price}
                    <span className="me-2 text-2xl font-extrabold text-[var(--ads-muted)]">ر.س</span>
                  </p>
                  <p className="mt-1 text-sm font-bold text-[var(--ads-muted)]">{plan.period}</p>
                </div>

                <p className="mt-3 text-sm leading-7 text-[var(--ads-muted)]">{PLAN_NOTES[plan.key]}</p>

                <div className="mt-5 rounded-[22px] border border-[var(--ads-border-soft)] bg-[var(--ads-surface)] p-4">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-xs font-black text-[var(--ads-muted)]">تفاصيل الباقة</p>
                    {!isExpanded ? (
                      <span className="text-xs font-bold text-[var(--ads-muted)]">
                        +{PLAN_FEATURES.length - PREVIEW_FEATURE_COUNT} مزايا إضافية
                      </span>
                    ) : null}
                  </div>

                  <ul className="mt-3 space-y-2.5">
                    {featureIndexes.map((featureIndex) => {
                      const featureTitle = PLAN_FEATURES[featureIndex]
                      const enabled = plan.features[featureIndex]

                      return (
                        <li
                          key={`${plan.key}-${featureTitle}`}
                          className={`flex items-center justify-between gap-3 text-sm font-bold ${
                            enabled ? 'text-[var(--ads-text)]' : 'text-[var(--ads-muted)] opacity-60'
                          }`}
                        >
                          <span>{featureTitle}</span>
                          {enabled ? (
                            <FaCircleCheck className="shrink-0 text-[var(--ads-button-ghost-text)]" />
                          ) : (
                            <FaCircleXmark className="shrink-0 text-[var(--ads-muted)]" />
                          )}
                        </li>
                      )
                    })}
                  </ul>
                </div>

                <div className="mt-auto grid grid-cols-2 gap-2 pt-4">
                  <MotionButton
                    type="button"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => togglePlanDetails(plan.key)}
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl border border-[var(--ads-border-soft)] bg-[var(--ads-surface)] px-4 text-sm font-black text-[var(--ads-text)]"
                  >
                    {isExpanded ? 'إخفاء التفاصيل' : 'Read more'}
                    {isExpanded ? <FaChevronUp className="text-xs" /> : <FaChevronDown className="text-xs" />}
                  </MotionButton>

                  <MotionButton
                    type="button"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => onSelectPlan(plan.key)}
                    className={`inline-flex h-11 items-center justify-center rounded-2xl px-4 text-sm font-black transition-all duration-300 ${
                      isSelected
                        ? 'border border-[var(--ads-selected-soft-border)] bg-[var(--ads-selected-soft-bg)] text-[var(--ads-selected-soft-text)]'
                        : 'text-[var(--ads-button-primary-text)] shadow-[0_14px_24px_rgba(44,183,176,0.24)] [background:var(--ads-button-primary-bg)]'
                    }`}
                  >
                    {isSelected ? 'تم الاختيار' : 'اختر الباقة'}
                  </MotionButton>
                </div>
              </MotionArticle>
            )
          })}
        </MotionDiv>
      </div>

      {actionLabel || secondaryActionLabel ? (
        <div className="flex flex-col gap-3 rounded-[26px] border border-[var(--ads-border-soft)] bg-[var(--ads-surface-soft)] p-4 md:flex-row md:items-center md:justify-between">
          <div className="text-right">
            <p className="text-xs font-bold text-[var(--ads-muted)]">{selectedSummaryLabel}</p>
            <p className="mt-1 text-lg font-black text-[var(--ads-text)]">{selectedPlan.title}</p>
            <p className="mt-1 text-sm text-[var(--ads-muted)]">
              {selectedPlan.price} ر.س {selectedPlan.period}
            </p>
            {summaryNote ? <p className="mt-1 text-xs leading-6 text-[var(--ads-muted)]">{summaryNote}</p> : null}
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            {secondaryActionLabel ? (
              <MotionButton
                type="button"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={onSecondaryAction}
                className="inline-flex h-12 items-center justify-center rounded-2xl border border-[var(--ads-border-soft)] bg-[var(--ads-surface)] px-5 text-sm font-black text-[var(--ads-text)]"
              >
                {secondaryActionLabel}
              </MotionButton>
            ) : null}

            {actionLabel ? (
              <MotionButton
                type="button"
                whileHover={actionDisabled ? undefined : { y: -2, scale: 1.01 }}
                whileTap={actionDisabled ? undefined : { scale: 0.98 }}
                onClick={onAction}
                disabled={actionDisabled}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl px-6 text-sm font-black text-[var(--ads-button-primary-text)] shadow-[0_16px_26px_rgba(44,183,176,0.22)] transition-opacity duration-300 [background:var(--ads-button-primary-bg)] disabled:cursor-not-allowed disabled:opacity-55"
              >
                {actionLabel}
                {actionTrailingIcon}
              </MotionButton>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default AdsSubscriptionsPicker
