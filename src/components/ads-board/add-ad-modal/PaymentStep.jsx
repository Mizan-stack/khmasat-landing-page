import { motion } from 'framer-motion'
import { PAYMENT_METHOD_OPTIONS } from './addAdModalData'
import StepField from './StepField'

const MotionButton = motion.button

function fieldClass(hasError) {
  return `h-12 w-full rounded-2xl border px-4 text-base text-[var(--ads-text)] outline-none transition-all duration-300 placeholder:text-[var(--ads-muted)] ${
    hasError
      ? 'border-red-500 bg-red-500/10'
      : 'border-[var(--ads-border-soft)] bg-[var(--ads-surface-soft)] focus:border-[var(--ads-dropdown-active-bg)]'
  }`
}

function PaymentStep({ plan, form, errors, touched, isPaying, onFieldChange, onFieldBlur, onBack, onPay }) {
  return (
    <div className="space-y-5" dir="rtl">
      <div className="text-right">
        <h3 className="text-2xl font-black text-[var(--ads-text)]">إتمام الدفع</h3>
        <p className="mt-1 text-sm text-[var(--ads-muted)]">راجع الباقة المختارة وأكمل الدفع لتفعيل الإعلان.</p>
      </div>

      <div className="rounded-2xl border border-cyan-300/40 bg-cyan-500/10 p-4">
        <p className="text-sm font-bold text-cyan-700 dark:text-cyan-300">الباقة المختارة</p>
        <div className="mt-1 flex items-center justify-between gap-3">
          <h4 className="text-lg font-black text-[var(--ads-text)]">{plan.title}</h4>
          <p className="text-xl font-black text-[var(--ads-text)]">
            {plan.price} <span className="text-sm font-semibold text-[var(--ads-muted)]">{plan.period}</span>
          </p>
        </div>
      </div>

      <StepField label="طريقة الدفع" required error={touched.paymentMethod ? errors.paymentMethod : ''}>
        <div className="grid gap-2 sm:grid-cols-3">
          {PAYMENT_METHOD_OPTIONS.map((option) => {
            const isActive = form.paymentMethod === option.value
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => onFieldChange('paymentMethod', option.value)}
                className={`h-11 rounded-xl border text-sm font-black transition-colors ${
                  isActive
                    ? 'border-cyan-300 bg-cyan-500/20 text-cyan-800 dark:text-cyan-200'
                    : 'border-[var(--ads-border-soft)] bg-[var(--ads-surface-soft)] text-[var(--ads-text)]'
                }`}
              >
                {option.label}
              </button>
            )
          })}
        </div>
      </StepField>

      <StepField label="اسم حامل البطاقة" required error={touched.cardHolderName ? errors.cardHolderName : ''}>
        <input
          type="text"
          value={form.cardHolderName}
          onChange={(event) => onFieldChange('cardHolderName', event.target.value)}
          onBlur={() => onFieldBlur('cardHolderName')}
          placeholder="اكتب الاسم كما هو على البطاقة"
          className={fieldClass(touched.cardHolderName && errors.cardHolderName)}
        />
      </StepField>

      <StepField label="رقم البطاقة" required error={touched.cardNumber ? errors.cardNumber : ''}>
        <input
          type="text"
          dir="ltr"
          inputMode="numeric"
          value={form.cardNumber}
          onChange={(event) => onFieldChange('cardNumber', event.target.value)}
          onBlur={() => onFieldBlur('cardNumber')}
          placeholder="1234123412341234"
          className={fieldClass(touched.cardNumber && errors.cardNumber)}
        />
      </StepField>

      <div className="grid gap-4 sm:grid-cols-2">
        <StepField label="تاريخ الانتهاء" required error={touched.expiryDate ? errors.expiryDate : ''}>
          <input
            type="text"
            dir="ltr"
            inputMode="numeric"
            value={form.expiryDate}
            onChange={(event) => onFieldChange('expiryDate', event.target.value)}
            onBlur={() => onFieldBlur('expiryDate')}
            placeholder="MM/YY"
            className={fieldClass(touched.expiryDate && errors.expiryDate)}
          />
        </StepField>

        <StepField label="CVV" required error={touched.cvv ? errors.cvv : ''}>
          <input
            type="text"
            dir="ltr"
            inputMode="numeric"
            value={form.cvv}
            onChange={(event) => onFieldChange('cvv', event.target.value)}
            onBlur={() => onFieldBlur('cvv')}
            placeholder="123"
            className={fieldClass(touched.cvv && errors.cvv)}
          />
        </StepField>
      </div>

      <StepField label="البريد الإلكتروني للفاتورة" required error={touched.billingEmail ? errors.billingEmail : ''}>
        <input
          type="email"
          dir="ltr"
          value={form.billingEmail}
          onChange={(event) => onFieldChange('billingEmail', event.target.value)}
          onBlur={() => onFieldBlur('billingEmail')}
          placeholder="billing@example.com"
          className={fieldClass(touched.billingEmail && errors.billingEmail)}
        />
      </StepField>

      <div className="flex flex-wrap justify-between gap-3">
        <button
          type="button"
          onClick={onBack}
          disabled={isPaying}
          className="inline-flex h-12 min-w-28 items-center justify-center rounded-2xl border border-[var(--ads-border-soft)] bg-[var(--ads-surface-soft)] px-6 text-sm font-black text-[var(--ads-text)] disabled:cursor-not-allowed disabled:opacity-60"
        >
          رجوع
        </button>
        <MotionButton
          type="button"
          whileHover={{ y: -2, scale: 1.01 }}
          whileTap={{ scale: 0.97 }}
          onClick={onPay}
          disabled={isPaying}
          className="inline-flex h-12 min-w-40 items-center justify-center rounded-2xl px-7 text-base font-black text-[var(--ads-create-text)] shadow-[0_14px_26px_rgba(32,179,170,0.3)] [background:var(--ads-create-bg)] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isPaying ? 'جارٍ تنفيذ الدفع...' : 'ادفع الآن'}
        </MotionButton>
      </div>
    </div>
  )
}

export default PaymentStep
