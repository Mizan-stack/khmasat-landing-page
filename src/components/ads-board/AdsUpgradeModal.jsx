import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
import { FaArrowLeftLong, FaWandMagicSparkles, FaXmark } from 'react-icons/fa6'
import AdsSubscriptionsPicker from './AdsSubscriptionsPicker'
import { DEFAULT_PLAN_CYCLE } from './add-ad-modal/addAdModalData'

const MotionDiv = motion.div
const PLAN_ORDER = ['free', 'standard', 'advanced']

function getDefaultPlanKey(currentPlanKey) {
  const currentIndex = PLAN_ORDER.indexOf(currentPlanKey)
  if (currentIndex === -1) return 'standard'

  return PLAN_ORDER[currentIndex + 1] ?? currentPlanKey
}

function getPlanRank(planKey) {
  return PLAN_ORDER.indexOf(planKey)
}

function AdsUpgradeModal({ isOpen, item, onClose }) {
  const [activeCycle, setActiveCycle] = useState(() => DEFAULT_PLAN_CYCLE)
  const [selectedPlanKey, setSelectedPlanKey] = useState(() => getDefaultPlanKey(item?.planKey))

  useEffect(() => {
    if (!isOpen) return undefined

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    function handleEscape(event) {
      if (event.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', handleEscape)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, onClose])

  const currentPlanRank = getPlanRank(item?.planKey)
  const selectedPlanRank = getPlanRank(selectedPlanKey)
  const isHighestPlan = currentPlanRank === PLAN_ORDER.length - 1
  const canUpgrade = !isHighestPlan && selectedPlanRank > currentPlanRank

  const upgradeHint = useMemo(() => {
    if (isHighestPlan) {
      return 'هذا الإعلان مفعّل بالفعل على أعلى باقة متاحة حاليًا.'
    }

    if (canUpgrade) {
      return 'اخترنا لك تجربة الترقية الكاملة بنفس تفاصيل صفحة الاشتراكات لتقارن كل المزايا بوضوح.'
    }

    return 'اختر باقة أعلى من باقتك الحالية لتفعيل الترقية لهذا الإعلان.'
  }, [canUpgrade, isHighestPlan])

  if (typeof document === 'undefined') return null

  return createPortal(
    <AnimatePresence>
      {isOpen && item ? (
        <MotionDiv
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="pointer-events-none fixed inset-0 z-[2200] isolate flex items-start justify-center overflow-y-auto p-3 md:items-center md:p-6"
        >
          <button
            type="button"
            aria-label="إغلاق نافذة الترقية"
            onClick={onClose}
            className="pointer-events-auto absolute inset-0 bg-slate-950/45 backdrop-blur-[3px]"
          />

          <MotionDiv
            initial={{ opacity: 0, y: 42, scale: 0.93 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
            onClick={(event) => event.stopPropagation()}
            dir="rtl"
            className="pointer-events-auto relative z-10 flex max-h-[94dvh] w-full max-w-[1400px] flex-col overflow-hidden rounded-[30px] border border-[var(--ads-border)] bg-[var(--ads-surface)] p-4 shadow-[0_30px_70px_rgba(4,13,31,0.32)] md:p-6"
          >
            <div className="mb-5 text-right">
              <button
                type="button"
                onClick={onClose}
                className="absolute left-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--ads-border-soft)] bg-[var(--ads-surface-soft)] text-xl text-[var(--ads-text)] transition-transform duration-300 hover:rotate-90 hover:scale-105"
              >
                <FaXmark />
              </button>

              <span className="inline-flex rounded-full border border-[var(--ads-border-soft)] bg-[var(--ads-surface-soft)] px-3 py-1 text-xs font-black text-[var(--ads-button-ghost-text)]">
                ترقية الاشتراك
              </span>
              <h2 className="mt-3 pe-12 text-[clamp(1.5rem,2.8vw,2.2rem)] font-black text-[var(--ads-text)]">اختر باقة الترقية</h2>
              <p className="mt-1 max-w-4xl text-sm text-[var(--ads-muted)]">
                نفس شكل الباقات الخفيف داخل الـ popup، مع إمكانية مراجعة التفاصيل ثم اختيار الباقة المناسبة لإعلانك.
              </p>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto pe-1">
              <AdsSubscriptionsPicker
                title={null}
                description={null}
                activeCycle={activeCycle}
                selectedPlanKey={selectedPlanKey}
                onCycleChange={setActiveCycle}
                onSelectPlan={setSelectedPlanKey}
                currentPlanKey={item.planKey}
                selectedSummaryLabel="الباقة التي ستتم الترقية إليها"
                summaryNote={upgradeHint}
                actionLabel={isHighestPlan ? 'أعلى باقة مفعلة' : 'متابعة الترقية'}
                onAction={onClose}
                actionDisabled={!canUpgrade}
                actionTrailingIcon={<FaArrowLeftLong />}
                secondaryActionLabel="إغلاق"
                onSecondaryAction={onClose}
                topMeta={
                  <div className="flex flex-wrap items-center justify-between gap-3 rounded-[24px] border border-[var(--ads-border-soft)] bg-[var(--ads-surface-soft)] p-3">
                    <div className="text-right">
                      <p className="text-xs font-bold text-[var(--ads-muted)]">الإعلان الحالي</p>
                      <p className="mt-1 text-lg font-black text-[var(--ads-text)]">{item.title}</p>
                    </div>

                    <div className="text-right">
                      <p className="text-xs font-bold text-[var(--ads-muted)]">الباقة الحالية</p>
                      <p className="mt-1 text-lg font-black text-[var(--ads-text)]">{item.planName}</p>
                    </div>

                    <div className="text-right">
                      <p className="text-xs font-bold text-[var(--ads-muted)]">تنتهي في</p>
                      <p className="mt-1 text-lg font-black text-[var(--ads-text)]">{item.expiresOn}</p>
                    </div>

                    <div className="inline-flex items-center gap-2 rounded-full border border-[var(--ads-success-soft-border)] bg-[var(--ads-success-soft-bg)] px-3 py-2 text-sm font-black text-[var(--ads-success-soft-text)]">
                      <FaWandMagicSparkles />
                      {isHighestPlan ? 'إعلانك على أعلى باقة الآن' : 'اختر باقة أعلى الآن'}
                    </div>
                  </div>
                }
              />
            </div>
          </MotionDiv>
        </MotionDiv>
      ) : null}
    </AnimatePresence>,
    document.body,
  )
}

export default AdsUpgradeModal
