import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'
import { FaApplePay, FaCcMastercard, FaCcVisa } from 'react-icons/fa'
import {
  FaBuildingColumns,
  FaCheck,
  FaChevronDown,
  FaCircleInfo,
  FaShieldHalved,
  FaXmark,
} from 'react-icons/fa6'
import {
  BUSINESS_ACTIVITY_OPTIONS,
  BUSINESS_COUNTRY_OPTIONS,
  PAYMENT_METHOD_OPTIONS,
  PLATFORM_OPTIONS,
  REGISTRATION_TYPES,
} from './addAdModalData'
import StepField from './StepField'

const MotionButton = motion.button
const MotionDiv = motion.div

const CARD_METHODS = ['visa', 'mastercard', 'mada']
const INSTALLMENT_METHODS = ['tabby', 'tamara']
const SUMMARY_CARD_CLASS =
  'rounded-[28px] border border-[var(--ads-border)] bg-[var(--ads-surface)] p-4 shadow-[0_18px_38px_rgba(18,34,62,0.08)] md:p-5'
const SOFT_CARD_CLASS = 'rounded-[24px] border border-[var(--ads-border-soft)] bg-[var(--ads-surface-soft)] p-4'

const BANK_TRANSFER_DETAILS = [
  { label: 'اسم الحساب', value: 'شركة لينك للإعلانات الرقمية', dir: 'rtl' },
  { label: 'البنك', value: 'البنك الأهلي السعودي', dir: 'rtl' },
  { label: 'IBAN', value: 'SA0380000000608010167519', dir: 'ltr' },
  { label: 'SWIFT', value: 'NCBKSAJE', dir: 'ltr' },
]

function fieldClass(hasError, extraClassName = '') {
  return `h-12 w-full rounded-2xl border px-4 text-base text-[var(--ads-text)] outline-none transition-all duration-300 placeholder:text-[var(--ads-muted)] ${
    hasError
      ? 'border-red-500 bg-[var(--ads-surface-soft)] shadow-[0_0_0_1px_rgba(239,68,68,0.18)]'
      : 'border-[var(--ads-border-soft)] bg-[var(--ads-surface-soft)] focus:border-[var(--ads-dropdown-active-bg)]'
  } ${extraClassName}`.trim()
}

function summaryRowClass(isLast = false) {
  return `flex items-start justify-between gap-4 py-3 ${isLast ? '' : 'border-b border-[var(--ads-border-soft)]'}`
}

function formatCurrency(value) {
  return `${new Intl.NumberFormat('ar-SA').format(value ?? 0)} ر.س`
}

function labelOf(options, value, fallback = 'غير محدد') {
  return options.find((option) => option.value === value)?.label ?? fallback
}

function formatDate(value) {
  if (!value) return 'غير محدد'

  const parsedDate = new Date(value)
  if (Number.isNaN(parsedDate.getTime())) return value

  return new Intl.DateTimeFormat('ar-SA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(parsedDate)
}

function shortUrl(value) {
  if (!value) return 'غير مضاف'

  const normalizedValue = value.replace(/^https?:\/\//, '')
  if (normalizedValue.length <= 34) return normalizedValue
  return `${normalizedValue.slice(0, 31)}...`
}

function feedbackClass(type) {
  if (type === 'success') {
    return 'border-[var(--ads-success-soft-border)] bg-[var(--ads-success-soft-bg)] text-[var(--ads-success-soft-text)]'
  }

  if (type === 'error') {
    return 'border-red-500/45 bg-red-500/10 text-red-500'
  }

  return 'border-[var(--ads-selected-soft-border)] bg-[var(--ads-selected-soft-bg)] text-[var(--ads-selected-soft-text)]'
}

function methodIcon(methodValue) {
  if (methodValue === 'visa') return <FaCcVisa className="text-[1.8rem]" />
  if (methodValue === 'mastercard') return <FaCcMastercard className="text-[1.8rem]" />
  if (methodValue === 'applePay') return <FaApplePay className="text-[2rem]" />
  if (methodValue === 'bankTransfer') return <FaBuildingColumns className="text-[1.4rem]" />
  if (methodValue === 'mada') return <span className="text-sm font-black tracking-[0.08em]">MADA</span>
  if (methodValue === 'tabby') return <span className="text-sm font-black">Tabby</span>
  if (methodValue === 'tamara') return <span className="text-sm font-black">Tamara</span>
  return <FaShieldHalved className="text-[1.25rem]" />
}

function MethodCard({ option, isActive, onSelect }) {
  return (
    <MotionButton
      type="button"
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.985 }}
      onClick={() => onSelect(option.value)}
      className={`group relative flex min-h-[132px] flex-col justify-between overflow-hidden rounded-[24px] border p-4 text-right transition-all ${
        isActive
          ? 'border-[color:var(--ads-selected-plan-border)] [background:var(--ads-selected-plan-bg)] [box-shadow:var(--ads-selected-plan-shadow)]'
          : 'border-[var(--ads-border-soft)] bg-[var(--ads-surface-soft)] hover:border-[var(--ads-selected-soft-border)] hover:bg-[var(--ads-selected-soft-bg)]'
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <span
          className={`inline-flex min-h-11 min-w-11 items-center justify-center rounded-2xl border px-3 text-[var(--ads-text)] ${
            isActive
              ? 'border-[var(--ads-selected-soft-border)] bg-[var(--ads-selected-soft-bg)] text-[var(--ads-selected-soft-text)]'
              : 'border-[var(--ads-border-soft)] bg-[var(--ads-surface)]'
          }`}
        >
          {methodIcon(option.value)}
        </span>

        {isActive ? (
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[var(--ads-success-soft-border)] bg-[var(--ads-success-soft-bg)] text-[var(--ads-success-soft-text)]">
            <FaCheck className="text-sm" />
          </span>
        ) : null}
      </div>

      <div className="space-y-2">
        <h4 className="text-lg font-black text-[var(--ads-text)]">{option.label}</h4>
        <p className="text-sm leading-7 text-[var(--ads-muted)]">{option.description}</p>
      </div>
    </MotionButton>
  )
}

function SummaryRow({ label, value, valueDir = 'rtl', isLast = false }) {
  return (
    <div className={summaryRowClass(isLast)}>
      <span className="text-sm font-bold text-[var(--ads-muted)]">{label}</span>
      <span className="max-w-[58%] text-left text-sm font-black text-[var(--ads-text)]" dir={valueDir}>
        {value}
      </span>
    </div>
  )
}

function Field({
  label,
  name,
  required = false,
  type = 'text',
  value,
  placeholder,
  error,
  touched,
  onChange,
  onBlur,
  dir = 'rtl',
  inputMode,
  readOnly = false,
  maxLength,
  note,
}) {
  const currentError = touched ? error : ''

  return (
    <StepField label={label} required={required} error={currentError}>
      <input
        type={type}
        dir={dir}
        value={value}
        inputMode={inputMode}
        readOnly={readOnly}
        maxLength={maxLength}
        onChange={(event) => onChange(name, event.target.value)}
        onBlur={() => onBlur(name)}
        placeholder={placeholder}
        className={fieldClass(Boolean(currentError), readOnly ? 'opacity-95' : '')}
      />
      {note ? <p className="mt-1 text-xs font-semibold text-[var(--ads-muted)]">{note}</p> : null}
    </StepField>
  )
}

function PaymentStep({
  plan,
  businessForm,
  form,
  paymentSummary,
  appliedCoupon,
  couponFeedback,
  errors,
  touched,
  isPaying,
  selectedPhoneCountry,
  onFieldChange,
  onFieldBlur,
  onApplyCoupon,
  onRemoveCoupon,
  onBack,
  onPay,
}) {
  const isFree = paymentSummary.total <= 0
  const [isMethodPickerOpen, setIsMethodPickerOpen] = useState(!isFree)

  const selectedMethod = useMemo(
    () => PAYMENT_METHOD_OPTIONS.find((option) => option.value === form.paymentMethod) ?? null,
    [form.paymentMethod],
  )

  useEffect(() => {
    if (isFree) {
      setIsMethodPickerOpen(false)
    }
  }, [isFree])

  useEffect(() => {
    if (!isFree && touched.paymentMethod && errors.paymentMethod) {
      setIsMethodPickerOpen(true)
    }
  }, [errors.paymentMethod, isFree, touched.paymentMethod])

  const registrationTypeLabel = labelOf(REGISTRATION_TYPES, businessForm.registrationType)
  const activityLabel = labelOf(BUSINESS_ACTIVITY_OPTIONS, businessForm.activity)
  const countryLabel = labelOf(BUSINESS_COUNTRY_OPTIONS, businessForm.countryIso)
  const platformLabel = labelOf(PLATFORM_OPTIONS, businessForm.platform)
  const phoneWithCountry = businessForm.phone
    ? `${selectedPhoneCountry?.dialCode ?? ''} ${businessForm.phone}`
    : 'غير مضاف'
  const businessIdentityLabel = businessForm.registrationType === 'freelance' ? 'رقم الوثيقة' : 'رقم السجل'
  const businessIdentityValue =
    businessForm.registrationType === 'freelance' ? businessForm.documentNumber || 'غير مضاف' : businessForm.licenseNumber || 'غير مضاف'
  const payButtonLabel = isFree
    ? 'تفعيل الإعلان الآن'
    : form.paymentMethod === 'bankTransfer'
      ? 'إرسال بيانات التحويل'
      : INSTALLMENT_METHODS.includes(form.paymentMethod)
        ? `متابعة إلى ${selectedMethod?.label ?? 'خدمة التقسيط'}`
        : form.paymentMethod === 'applePay'
          ? 'متابعة عبر Apple Pay'
          : 'ادفع الآن'

  function selectPaymentMethod(nextMethod) {
    onFieldChange('paymentMethod', nextMethod)
    onFieldBlur('paymentMethod')
    setIsMethodPickerOpen(false)
  }

  function renderPaymentFields() {
    if (isFree) {
      return (
        <div className="space-y-4">
          <div className={`${SOFT_CARD_CLASS} border-[var(--ads-success-soft-border)] bg-[var(--ads-success-soft-bg)] text-right`}>
            <div className="flex items-start gap-3">
              <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-[var(--ads-success-soft-border)] bg-[var(--ads-surface)] text-[var(--ads-success-soft-text)]">
                <FaCheck />
              </span>
              <div>
                <p className="text-sm font-black text-[var(--ads-success-soft-text)]">هذه الباقة مجانية</p>
                <p className="mt-1 text-sm leading-7 text-[var(--ads-text)]">
                  أكمل بريد الفاتورة فقط وسنفعّل الإعلان مباشرة بدون أي خطوات دفع إضافية.
                </p>
              </div>
            </div>
          </div>

          <Field
            label="البريد الإلكتروني للفاتورة"
            name="billingEmail"
            required
            type="email"
            dir="ltr"
            value={form.billingEmail}
            placeholder="billing@example.com"
            error={errors.billingEmail}
            touched={touched.billingEmail}
            onChange={onFieldChange}
            onBlur={onFieldBlur}
          />
        </div>
      )
    }

    if (CARD_METHODS.includes(form.paymentMethod)) {
      return (
        <div className="grid gap-4 md:grid-cols-2">
          <div className="md:col-span-2">
            <Field
              label="اسم حامل البطاقة"
              name="cardHolderName"
              required
              value={form.cardHolderName}
              placeholder="اكتب الاسم كما هو على البطاقة"
              error={errors.cardHolderName}
              touched={touched.cardHolderName}
              onChange={onFieldChange}
              onBlur={onFieldBlur}
            />
          </div>

          <div className="md:col-span-2">
            <Field
              label="البريد الإلكتروني للفاتورة"
              name="billingEmail"
              required
              type="email"
              dir="ltr"
              value={form.billingEmail}
              placeholder="billing@example.com"
              error={errors.billingEmail}
              touched={touched.billingEmail}
              onChange={onFieldChange}
              onBlur={onFieldBlur}
            />
          </div>

          <div className="md:col-span-2">
            <Field
              label="رقم البطاقة"
              name="cardNumber"
              required
              dir="ltr"
              inputMode="numeric"
              maxLength={16}
              value={form.cardNumber}
              placeholder="1234123412341234"
              error={errors.cardNumber}
              touched={touched.cardNumber}
              onChange={onFieldChange}
              onBlur={onFieldBlur}
            />
          </div>

          <Field
            label="تاريخ الانتهاء"
            name="expiryDate"
            required
            dir="ltr"
            inputMode="numeric"
            maxLength={5}
            value={form.expiryDate}
            placeholder="MM/YY"
            error={errors.expiryDate}
            touched={touched.expiryDate}
            onChange={onFieldChange}
            onBlur={onFieldBlur}
          />

          <Field
            label="CVV"
            name="cvv"
            required
            dir="ltr"
            inputMode="numeric"
            maxLength={4}
            value={form.cvv}
            placeholder="123"
            error={errors.cvv}
            touched={touched.cvv}
            onChange={onFieldChange}
            onBlur={onFieldBlur}
          />
        </div>
      )
    }

    if (form.paymentMethod === 'applePay') {
      return (
        <div className="space-y-4">
          <div className={SOFT_CARD_CLASS}>
            <div className="flex items-start gap-3">
              <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-[var(--ads-border-soft)] bg-[var(--ads-surface)] text-[var(--ads-text)]">
                <FaApplePay className="text-[2rem]" />
              </span>
              <div>
                <p className="text-sm font-black text-[var(--ads-text)]">دفع سريع عبر Apple Pay</p>
                <p className="mt-1 text-sm leading-7 text-[var(--ads-muted)]">
                  بعد الضغط على المتابعة سيتم استخدام المحفظة المدعومة على جهازك لإتمام العملية بسرعة.
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Field
              label="الاسم الكامل"
              name="payerName"
              required
              value={form.payerName}
              placeholder="الاسم الثلاثي"
              error={errors.payerName}
              touched={touched.payerName}
              onChange={onFieldChange}
              onBlur={onFieldBlur}
            />

            <Field
              label="رقم الجوال"
              name="billingPhone"
              required
              dir="ltr"
              inputMode="tel"
              value={form.billingPhone}
              placeholder="5XXXXXXXX"
              error={errors.billingPhone}
              touched={touched.billingPhone}
              onChange={onFieldChange}
              onBlur={onFieldBlur}
            />

            <div className="md:col-span-2">
              <Field
                label="البريد الإلكتروني"
                name="billingEmail"
                required
                type="email"
                dir="ltr"
                value={form.billingEmail}
                placeholder="billing@example.com"
                error={errors.billingEmail}
                touched={touched.billingEmail}
                onChange={onFieldChange}
                onBlur={onFieldBlur}
              />
            </div>
          </div>
        </div>
      )
    }

    if (form.paymentMethod === 'bankTransfer') {
      return (
        <div className="space-y-4">
          <div className={SOFT_CARD_CLASS}>
            <div className="mb-3 flex items-start gap-3 text-right">
              <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-[var(--ads-border-soft)] bg-[var(--ads-surface)] text-[var(--ads-text)]">
                <FaBuildingColumns />
              </span>
              <div>
                <p className="text-sm font-black text-[var(--ads-text)]">بيانات التحويل البنكي</p>
                <p className="mt-1 text-sm leading-7 text-[var(--ads-muted)]">
                  حوّل المبلغ ثم أدخل بيانات المرجع بالأسفل حتى نستطيع مراجعة العملية وتفعيل إعلانك.
                </p>
              </div>
            </div>

            <div className="grid gap-3 md:grid-cols-2">
              {BANK_TRANSFER_DETAILS.map((detail) => (
                <div
                  key={detail.label}
                  className="rounded-2xl border border-[var(--ads-border-soft)] bg-[var(--ads-surface)] p-3"
                >
                  <p className="text-xs font-bold text-[var(--ads-muted)]">{detail.label}</p>
                  <p className="mt-1 text-sm font-black text-[var(--ads-text)]" dir={detail.dir}>
                    {detail.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Field
              label="اسم المحوّل"
              name="payerName"
              required
              value={form.payerName}
              placeholder="اسم صاحب الحساب المحوِّل"
              error={errors.payerName}
              touched={touched.payerName}
              onChange={onFieldChange}
              onBlur={onFieldBlur}
            />

            <Field
              label="اسم البنك"
              name="bankName"
              required
              value={form.bankName}
              placeholder="اسم البنك الذي تم التحويل منه"
              error={errors.bankName}
              touched={touched.bankName}
              onChange={onFieldChange}
              onBlur={onFieldBlur}
            />

            <Field
              label="رقم مرجع التحويل"
              name="bankReference"
              required
              dir="ltr"
              value={form.bankReference}
              placeholder="TRX12345"
              error={errors.bankReference}
              touched={touched.bankReference}
              onChange={onFieldChange}
              onBlur={onFieldBlur}
            />

            <Field
              label="تاريخ التحويل"
              name="transferDate"
              required
              type="date"
              dir="ltr"
              value={form.transferDate}
              error={errors.transferDate}
              touched={touched.transferDate}
              onChange={onFieldChange}
              onBlur={onFieldBlur}
            />

            <div className="md:col-span-2">
              <Field
                label="البريد الإلكتروني للمتابعة"
                name="billingEmail"
                required
                type="email"
                dir="ltr"
                value={form.billingEmail}
                placeholder="billing@example.com"
                error={errors.billingEmail}
                touched={touched.billingEmail}
                onChange={onFieldChange}
                onBlur={onFieldBlur}
              />
            </div>

            <div className="md:col-span-2">
              <Field
                label="المبلغ المطلوب تحويله"
                name="transferAmount"
                value={formatCurrency(paymentSummary.total)}
                readOnly
                note="يشمل الخصم والضريبة إن وجدا."
                onChange={() => {}}
                onBlur={() => {}}
              />
            </div>
          </div>
        </div>
      )
    }

    if (INSTALLMENT_METHODS.includes(form.paymentMethod)) {
      return (
        <div className="space-y-4">
          <div className={SOFT_CARD_CLASS}>
            <div className="flex items-start gap-3">
              <span className="inline-flex h-11 min-w-11 items-center justify-center rounded-2xl border border-[var(--ads-border-soft)] bg-[var(--ads-surface)] px-3 text-sm font-black text-[var(--ads-text)]">
                {selectedMethod?.label}
              </span>
              <div>
                <p className="text-sm font-black text-[var(--ads-text)]">تقسيم تلقائي على 4 دفعات</p>
                <p className="mt-1 text-sm leading-7 text-[var(--ads-muted)]">
                  الدفعة التقريبية لكل قسط: <span className="font-black text-[var(--ads-text)]">{formatCurrency(paymentSummary.installmentAmount)}</span>
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Field
              label="الاسم الكامل"
              name="payerName"
              required
              value={form.payerName}
              placeholder="الاسم كما في الهوية"
              error={errors.payerName}
              touched={touched.payerName}
              onChange={onFieldChange}
              onBlur={onFieldBlur}
            />

            <Field
              label="رقم الجوال"
              name="billingPhone"
              required
              dir="ltr"
              inputMode="tel"
              value={form.billingPhone}
              placeholder="5XXXXXXXX"
              error={errors.billingPhone}
              touched={touched.billingPhone}
              onChange={onFieldChange}
              onBlur={onFieldBlur}
            />

            <div className="md:col-span-2">
              <Field
                label="البريد الإلكتروني"
                name="billingEmail"
                required
                type="email"
                dir="ltr"
                value={form.billingEmail}
                placeholder="billing@example.com"
                error={errors.billingEmail}
                touched={touched.billingEmail}
                onChange={onFieldChange}
                onBlur={onFieldBlur}
              />
            </div>

            <div className="md:col-span-2">
              <Field
                label="رقم الهوية أو الإقامة"
                name="nationalId"
                required
                dir="ltr"
                inputMode="numeric"
                maxLength={10}
                value={form.nationalId}
                placeholder="10 أرقام"
                error={errors.nationalId}
                touched={touched.nationalId}
                onChange={onFieldChange}
                onBlur={onFieldBlur}
              />
            </div>
          </div>
        </div>
      )
    }

    return (
      <div className={`${SOFT_CARD_CLASS} text-right`}>
        <p className="text-sm font-bold text-[var(--ads-muted)]">اختر وسيلة دفع أولًا</p>
        <p className="mt-2 text-sm leading-7 text-[var(--ads-text)]">
          بعد اختيار وسيلة الدفع ستظهر الحقول المطلوبة تلقائيًا هنا.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-5" dir="rtl">
      <div className="text-right">
        <h3 className="text-[clamp(1.55rem,2.2vw,2.2rem)] font-black text-[var(--ads-text)]">إتمام الدفع</h3>
        <p className="mt-1 max-w-3xl text-sm leading-7 text-[var(--ads-muted)]">
          راجع الباقة والبيانات المسجلة، ثم اختر وسيلة الدفع المناسبة. بعد اختيار الوسيلة ستظهر فقط الحقول التي
          تحتاجها لإكمال العملية.
        </p>
      </div>

      <div className="grid gap-5 xl:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] xl:[direction:ltr]">
        <aside className="space-y-4 xl:sticky xl:top-0 xl:self-start" dir="rtl">
          <div className={SUMMARY_CARD_CLASS}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="inline-flex rounded-full border border-[var(--ads-button-ghost-border)] bg-[var(--ads-button-ghost-bg)] px-3 py-1 text-xs font-black text-[var(--ads-button-ghost-text)]">
                  {plan.badge}
                </span>
                <p className="mt-3 text-xs font-bold text-[var(--ads-muted)]">الباقة المختارة</p>
                <h4 className="mt-1 text-[1.65rem] font-black text-[var(--ads-text)]">{plan.title}</h4>
                <p className="mt-2 text-sm leading-7 text-[var(--ads-muted)]">{plan.description}</p>
              </div>

              <div className="text-left">
                <p className="text-xs font-bold text-[var(--ads-muted)]">السعر الأساسي</p>
                <p className="mt-2 text-[2rem] font-black leading-none text-[var(--ads-text)]">{formatCurrency(plan.priceValue)}</p>
                <p className="mt-2 text-sm font-bold text-[var(--ads-muted)]">{plan.period}</p>
              </div>
            </div>
          </div>

          <div className={SUMMARY_CARD_CLASS}>
            <div className="mb-2 text-right">
              <p className="text-xs font-bold text-[var(--ads-muted)]">ملخص البيانات</p>
              <h4 className="mt-1 text-xl font-black text-[var(--ads-text)]">تفاصيل الإعلان والعميل</h4>
            </div>

            <SummaryRow label="الباقة" value={plan.title} />
            <SummaryRow label="دورة الدفع" value={plan.cycleLabel} />
            <SummaryRow label="نوع التسجيل" value={registrationTypeLabel} />
            <SummaryRow label="الاسم التجاري" value={businessForm.businessName || 'غير مضاف'} />
            <SummaryRow label="النشاط" value={activityLabel} />
            <SummaryRow label="الدولة" value={countryLabel} />
            <SummaryRow label="المنصة" value={platformLabel} />
            <SummaryRow label={businessIdentityLabel} value={businessIdentityValue} valueDir="ltr" />
            <SummaryRow label="تاريخ التسجيل" value={formatDate(businessForm.registrationDate)} />
            <SummaryRow label="رقم الجوال" value={phoneWithCountry} valueDir="ltr" />
            {businessForm.contactEmail ? <SummaryRow label="البريد" value={businessForm.contactEmail} valueDir="ltr" /> : null}
            <SummaryRow label="رابط المتجر" value={shortUrl(businessForm.storeUrl)} valueDir="ltr" isLast />
          </div>

          {!isFree ? (
            <div className={SUMMARY_CARD_CLASS}>
              <div className="mb-3 text-right">
                <p className="text-xs font-bold text-[var(--ads-muted)]">الكوبون</p>
                <h4 className="mt-1 text-xl font-black text-[var(--ads-text)]">إضافة خصم</h4>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={appliedCoupon ? onRemoveCoupon : onApplyCoupon}
                  className={`inline-flex h-12 shrink-0 items-center justify-center rounded-2xl border px-5 text-sm font-black transition-colors ${
                    appliedCoupon
                      ? 'border-red-500/35 bg-red-500/10 text-red-500'
                      : 'border-[var(--ads-button-ghost-border)] bg-[var(--ads-button-ghost-bg)] text-[var(--ads-button-ghost-text)]'
                  }`}
                >
                  {appliedCoupon ? 'حذف الكوبون' : 'تطبيق'}
                </button>

                <input
                  type="text"
                  dir="ltr"
                  value={form.couponCode}
                  onChange={(event) => onFieldChange('couponCode', event.target.value)}
                  placeholder="WELCOME10"
                  className={fieldClass(false)}
                />
              </div>

              {appliedCoupon ? (
                <div className="mt-3 flex items-center justify-between gap-3 rounded-2xl border border-[var(--ads-success-soft-border)] bg-[var(--ads-success-soft-bg)] px-4 py-3">
                  <div className="text-right">
                    <p className="text-xs font-bold text-[var(--ads-muted)]">الكوبون المطبق</p>
                    <p className="mt-1 text-sm font-black text-[var(--ads-success-soft-text)]">{appliedCoupon.label}</p>
                  </div>
                  <button
                    type="button"
                    onClick={onRemoveCoupon}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--ads-success-soft-border)] bg-[var(--ads-surface)] text-[var(--ads-success-soft-text)]"
                    aria-label="حذف الكوبون"
                  >
                    <FaXmark />
                  </button>
                </div>
              ) : null}

              {couponFeedback?.message ? (
                <div className={`mt-3 rounded-2xl border px-4 py-3 text-sm font-bold ${feedbackClass(couponFeedback.type)}`}>
                  {couponFeedback.message}
                </div>
              ) : null}
            </div>
          ) : null}

          <div className={SUMMARY_CARD_CLASS}>
            <div className="mb-3 text-right">
              <p className="text-xs font-bold text-[var(--ads-muted)]">الفاتورة النهائية</p>
              <h4 className="mt-1 text-xl font-black text-[var(--ads-text)]">تفاصيل السعر</h4>
            </div>

            <SummaryRow label="السعر قبل الخصم" value={formatCurrency(paymentSummary.subtotal)} valueDir="ltr" />
            <SummaryRow label="الخصم" value={paymentSummary.discount ? `- ${formatCurrency(paymentSummary.discount)}` : '0 ر.س'} valueDir="ltr" />
            <SummaryRow label="بعد الخصم" value={formatCurrency(paymentSummary.discountedSubtotal)} valueDir="ltr" />
            <SummaryRow label="ضريبة القيمة المضافة 15%" value={formatCurrency(paymentSummary.vat)} valueDir="ltr" />

            <div className="mt-4 rounded-[24px] border border-[var(--ads-selected-soft-border)] bg-[var(--ads-selected-soft-bg)] p-4">
              <div className="flex items-center justify-between gap-3">
                <div className="text-right">
                  <p className="text-xs font-bold text-[var(--ads-muted)]">الإجمالي النهائي</p>
                  <p className="mt-1 text-[2rem] font-black text-[var(--ads-text)]">{formatCurrency(paymentSummary.total)}</p>
                </div>
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-[var(--ads-selected-soft-border)] bg-[var(--ads-surface)] text-[var(--ads-selected-soft-text)]">
                  <FaShieldHalved />
                </span>
              </div>

              {INSTALLMENT_METHODS.includes(form.paymentMethod) && !isFree ? (
                <p className="mt-3 text-sm font-semibold text-[var(--ads-muted)]">
                  القسط التقريبي: <span className="font-black text-[var(--ads-text)]">{formatCurrency(paymentSummary.installmentAmount)}</span>
                </p>
              ) : null}
            </div>
          </div>
        </aside>

        <section className="space-y-4" dir="rtl">
          <div className={SUMMARY_CARD_CLASS}>
            <div className="mb-4 text-right">
              <p className="text-xs font-bold text-[var(--ads-muted)]">الدفع</p>
              <h4 className="mt-1 text-xl font-black text-[var(--ads-text)]">{isFree ? 'تأكيد التفعيل' : 'اختر وسيلة الدفع'}</h4>
              <p className="mt-1 text-sm leading-7 text-[var(--ads-muted)]">
                {isFree
                  ? 'لا توجد رسوم على هذه الباقة. راجع البريد ثم فعّل الإعلان مباشرة.'
                  : 'يمكنك فتح القائمة وتغيير وسيلة الدفع في أي وقت من السهم الصغير.'}
              </p>
            </div>

            {!isFree ? (
              <div className="space-y-3">
                <div className="text-right">
                  <span className="mb-1.5 block text-sm font-bold text-[var(--ads-text)]">
                    طريقة الدفع
                    <span className="ms-1 text-red-500">*</span>
                  </span>

                  <button
                    type="button"
                    onClick={() => setIsMethodPickerOpen((currentValue) => !currentValue)}
                    className={`flex w-full items-center justify-between gap-3 rounded-[24px] border px-4 py-4 text-right transition-all ${
                      touched.paymentMethod && errors.paymentMethod
                        ? 'border-red-500 bg-[var(--ads-surface-soft)] shadow-[0_0_0_1px_rgba(239,68,68,0.18)]'
                        : 'border-[var(--ads-border-soft)] bg-[var(--ads-surface-soft)] hover:border-[var(--ads-selected-soft-border)]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="inline-flex h-12 min-w-12 items-center justify-center rounded-2xl border border-[var(--ads-border-soft)] bg-[var(--ads-surface)] text-[var(--ads-text)]">
                        {methodIcon(selectedMethod?.value)}
                      </span>

                      <div>
                        <p className="text-xs font-bold text-[var(--ads-muted)]">وسيلة الدفع المختارة</p>
                        <p className="mt-1 text-lg font-black text-[var(--ads-text)]">{selectedMethod?.label ?? 'اختر الوسيلة المناسبة'}</p>
                        <p className="mt-1 text-xs leading-6 text-[var(--ads-muted)]">
                          {isMethodPickerOpen
                            ? 'اختر وسيلة مناسبة وسيتم إغلاق القائمة تلقائيًا بعد الضغط عليها.'
                            : selectedMethod?.description ?? 'اضغط لفتح القائمة وتغيير وسيلة الدفع.'}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {selectedMethod ? (
                        <span className="hidden rounded-full border border-[var(--ads-success-soft-border)] bg-[var(--ads-success-soft-bg)] px-3 py-1 text-xs font-black text-[var(--ads-success-soft-text)] sm:inline-flex">
                          تم الاختيار
                        </span>
                      ) : null}
                      <span
                        className={`inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-[var(--ads-border-soft)] bg-[var(--ads-surface)] text-[var(--ads-text)] transition-transform duration-300 ${
                          isMethodPickerOpen ? 'rotate-180' : ''
                        }`}
                      >
                        <FaChevronDown />
                      </span>
                    </div>
                  </button>

                  {touched.paymentMethod && errors.paymentMethod ? <p className="mt-1 text-xs font-bold text-red-500">{errors.paymentMethod}</p> : null}
                </div>

                <AnimatePresence initial={false}>
                  {isMethodPickerOpen ? (
                    <MotionDiv
                      key="payment-method-picker"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="grid gap-3 pt-1 sm:grid-cols-2 xl:grid-cols-3">
                        {PAYMENT_METHOD_OPTIONS.map((option) => (
                          <MethodCard key={option.value} option={option} isActive={form.paymentMethod === option.value} onSelect={selectPaymentMethod} />
                        ))}
                      </div>
                    </MotionDiv>
                  ) : null}
                </AnimatePresence>
              </div>
            ) : null}
          </div>

          <div className={SUMMARY_CARD_CLASS}>
            <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
              <div className="text-right">
                <p className="text-xs font-bold text-[var(--ads-muted)]">الحقول المطلوبة</p>
                <h4 className="mt-1 text-xl font-black text-[var(--ads-text)]">{isFree ? 'مراجعة أخيرة' : `الدفع عبر ${selectedMethod?.label ?? 'الوسيلة المختارة'}`}</h4>
              </div>

              {!isFree && selectedMethod ? (
                <span className="inline-flex items-center gap-2 rounded-full border border-[var(--ads-button-ghost-border)] bg-[var(--ads-button-ghost-bg)] px-3 py-1 text-xs font-black text-[var(--ads-button-ghost-text)]">
                  <FaShieldHalved />
                  بياناتك محمية أثناء الإرسال
                </span>
              ) : null}
            </div>

            <AnimatePresence mode="wait" initial={false}>
              <MotionDiv
                key={isFree ? 'free' : form.paymentMethod}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.22, ease: 'easeOut' }}
              >
                {renderPaymentFields()}
              </MotionDiv>
            </AnimatePresence>
          </div>

          <div className={`${SUMMARY_CARD_CLASS} ${SOFT_CARD_CLASS}`}>
            <div className="flex items-start gap-3 text-right">
              <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-[var(--ads-border-soft)] bg-[var(--ads-surface)] text-[var(--ads-text)]">
                <FaCircleInfo />
              </span>
              <div>
                <p className="text-sm font-black text-[var(--ads-text)]">معلومة سريعة</p>
                <p className="mt-1 text-sm leading-7 text-[var(--ads-muted)]">
                  يمكنك الرجوع لتعديل الباقة أو البيانات في أي وقت قبل إتمام العملية، ولن نفعل الإعلان إلا بعد نجاح
                  الدفع أو مراجعة بيانات التحويل البنكي.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col-reverse justify-between gap-3 sm:flex-row sm:items-center">
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
              whileTap={{ scale: 0.98 }}
              onClick={onPay}
              disabled={isPaying}
              className="inline-flex h-12 min-w-[220px] items-center justify-center gap-2 rounded-2xl px-7 text-base font-black text-[var(--ads-button-primary-text)] shadow-[0_16px_28px_rgba(44,183,176,0.24)] transition-opacity duration-300 [background:var(--ads-button-primary-bg)] disabled:cursor-not-allowed disabled:opacity-70"
            >
              <FaShieldHalved className="text-sm" />
              {isPaying ? 'جارٍ تجهيز العملية...' : payButtonLabel}
            </MotionButton>
          </div>
        </section>
      </div>
    </div>
  )
}

export default PaymentStep
