import { AnimatePresence, motion } from 'framer-motion'
import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { FaXmark } from 'react-icons/fa6'
import { WIZARD_STEPS } from './addAdModalData'
import BusinessInfoStep from './BusinessInfoStep'
import PaymentStep from './PaymentStep'
import PaymentSuccessToast from './PaymentSuccessToast'
import PlanStep from './PlanStep'
import { useAddAdWizard } from './useAddAdWizard'

const MotionDiv = motion.div

const stepVariants = {
  enter: (direction) => ({
    opacity: 0,
    x: direction > 0 ? 90 : -90,
    rotateY: direction > 0 ? 12 : -12,
    filter: 'blur(6px)',
  }),
  center: {
    opacity: 1,
    x: 0,
    rotateY: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
  exit: (direction) => ({
    opacity: 0,
    x: direction > 0 ? -70 : 70,
    rotateY: direction > 0 ? -8 : 8,
    filter: 'blur(5px)',
    transition: { duration: 0.28, ease: [0.4, 0, 1, 1] },
  }),
}

const modalPanelStyle = {
  backgroundColor: 'var(--ads-surface, rgba(255, 255, 255, 0.98))',
  borderColor: 'var(--ads-border, rgba(182, 198, 223, 0.56))',
}

function AddAdModal({ isOpen, onClose }) {
  const {
    step,
    direction,
    planCycle,
    planOptions,
    selectedPlan,
    selectedPlanKey,
    businessForm,
    paymentForm,
    businessErrors,
    paymentErrors,
    businessTouched,
    paymentTouched,
    isPaying,
    paymentSuccessOpen,
    setPlanCycle,
    setSelectedPlanKey,
    updateBusinessField,
    updatePaymentField,
    markBusinessTouched,
    markPaymentTouched,
    changePhoneCountry,
    continueFromPlans,
    continueFromBusiness,
    goBack,
    submitPayment,
    resetWizard,
  } = useAddAdWizard()

  useEffect(() => {
    if (!isOpen) return undefined

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [isOpen])

  function closeModal() {
    resetWizard()
    onClose()
  }

  function completePayment() {
    submitPayment(onClose)
  }

  function renderStep() {
    if (step === 1) {
      return (
        <PlanStep
          planCycle={planCycle}
          planOptions={planOptions}
          selectedPlanKey={selectedPlanKey}
          onCycleChange={setPlanCycle}
          onSelectPlan={setSelectedPlanKey}
          onContinue={continueFromPlans}
        />
      )
    }

    if (step === 2) {
      return (
        <BusinessInfoStep
          form={businessForm}
          errors={businessErrors}
          touched={businessTouched}
          onFieldChange={updateBusinessField}
          onFieldBlur={markBusinessTouched}
          onPhoneCountryChange={changePhoneCountry}
          onBack={goBack}
          onContinue={continueFromBusiness}
        />
      )
    }

    return (
      <PaymentStep
        plan={selectedPlan}
        form={paymentForm}
        errors={paymentErrors}
        touched={paymentTouched}
        isPaying={isPaying}
        onFieldChange={updatePaymentField}
        onFieldBlur={markPaymentTouched}
        onBack={goBack}
        onPay={completePayment}
      />
    )
  }

  if (typeof document === 'undefined') return null

  return createPortal(
    <AnimatePresence>
      {isOpen ? (
        <MotionDiv
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="pointer-events-none fixed inset-0 z-[2000] isolate flex items-start justify-center overflow-y-auto p-3 md:items-center md:p-6"
        >
          <button
            type="button"
            aria-label="إغلاق نافذة إضافة الإعلان"
            onClick={closeModal}
            className="pointer-events-auto absolute inset-0 z-0 bg-slate-950/45 backdrop-blur-[3px]"
          />

          <MotionDiv
            initial={{ opacity: 0, y: 40, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.95 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            onClick={(event) => event.stopPropagation()}
            className="pointer-events-auto relative z-10 flex w-full max-w-5xl flex-col overflow-hidden rounded-[30px] border bg-[var(--ads-surface)] p-4 shadow-[0_30px_70px_rgba(4,13,31,0.42)] max-h-[94dvh] md:max-h-[92dvh] md:p-6"
            style={modalPanelStyle}
            dir="rtl"
          >
            <button
              type="button"
              onClick={closeModal}
              className="absolute left-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--ads-border-soft)] bg-[var(--ads-surface-soft)] text-xl text-[var(--ads-text)] transition-transform duration-300 hover:rotate-90 hover:scale-105"
            >
              <FaXmark />
            </button>

            <div className="mb-5 text-right">
              <h2 className="text-[clamp(1.5rem,2.8vw,2.2rem)] font-black text-[var(--ads-text)]">إضافة إعلان جديد</h2>
              <p className="mt-1 text-sm text-[var(--ads-muted)]">
                {WIZARD_STEPS.find((wizardStep) => wizardStep.key === step)?.title}
              </p>
            </div>

            <div className="mb-6 grid grid-cols-3 gap-2">
              {WIZARD_STEPS.map((wizardStep) => {
                const isActive = wizardStep.key === step
                const isDone = wizardStep.key < step

                return (
                  <div
                    key={wizardStep.key}
                    className={`rounded-xl border px-3 py-2 text-center text-xs font-black transition-colors md:text-sm ${
                      isActive
                        ? 'border-cyan-300 bg-cyan-500/15 text-cyan-700 dark:text-cyan-300'
                        : isDone
                          ? 'border-emerald-300/50 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300'
                          : 'border-[var(--ads-border-soft)] bg-[var(--ads-surface-soft)] text-[var(--ads-muted)]'
                    }`}
                  >
                    {wizardStep.title}
                  </div>
                )
              })}
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden pe-1">
              <AnimatePresence mode="wait" custom={direction}>
                <MotionDiv
                  key={step}
                  custom={direction}
                  variants={stepVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                >
                  {renderStep()}
                </MotionDiv>
              </AnimatePresence>
            </div>
          </MotionDiv>

          <PaymentSuccessToast isOpen={paymentSuccessOpen} />
        </MotionDiv>
      ) : null}
    </AnimatePresence>,
    document.body,
  )
}

export default AddAdModal

