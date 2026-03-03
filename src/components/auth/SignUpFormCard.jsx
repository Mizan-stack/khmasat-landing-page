import { motion } from 'framer-motion'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import CountrySelect from './CountrySelect'
import OtpVerificationModal from './OtpVerificationModal'
import ThemeToggle from './ThemeToggle'
import { useSignUpForm } from '../../hooks/useSignUpForm'

const MotionSection = motion.section
const MotionDiv = motion.div
const MotionForm = motion.form

function SignUpFormCard() {
  const [showPassword, setShowPassword] = useState(false)
  const {
    form,
    fieldErrors,
    touched,
    submitted,
    otpSent,
    otpOpen,
    otpCode,
    otpError,
    otpVerified,
    hasErrors,
    selectedCountry,
    updateField,
    markFieldTouched,
    changeCountry,
    handleRequestOtp,
    updateOtpCode,
    closeOtpModal,
    verifyOtpCode,
    handleSubmit,
    resetSuccess,
  } = useSignUpForm()

  const nameError = touched.name ? fieldErrors.name : ''
  const emailError = touched.email ? fieldErrors.email : ''
  const phoneError = touched.phone ? fieldErrors.phone : ''
  const passwordError = touched.password ? fieldErrors.password : ''
  const phoneLabel = selectedCountry ? `${selectedCountry.dialCode} ${form.phone || '000000000'}` : form.phone

  return (
    <>
      <MotionSection
        initial={{ opacity: 0, x: -90 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="relative flex h-full flex-col rounded-[30px] border border-[var(--border-strong)] [background:var(--right-panel-bg)] px-6 py-5 shadow-[0_24px_80px_rgba(8,15,45,0.2)] backdrop-blur-xl md:px-8 md:py-6"
      >
        <div className="mb-10 flex items-center justify-between gap-3">
          <Link
            to="/login"
            state={{ direction: -1 }}
            className="inline-flex h-12 items-center rounded-full border border-[var(--border-soft)] bg-[var(--surface-soft)] px-6 text-sm font-extrabold text-[var(--right-text-primary)] transition-colors duration-300 hover:border-[var(--accent)]"
          >
            العودة لتسجيل الدخول
          </Link>
          <ThemeToggle />
        </div>

        <MotionDiv
          initial={{ opacity: 0, x: -80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.75, delay: 0.14 }}
          className="rounded-3xl border border-[var(--right-hero-border)] [background:var(--right-hero-bg)] px-4 py-4 md:px-5 md:py-5"
        >
          <h2 className="text-right text-[clamp(2rem,3.4vw,4rem)] font-black leading-tight text-[var(--right-text-primary)]">
            أنشئ حسابك
            <br />
            الإعلاني الآن
          </h2>
          <p className="mt-3 max-w-2xl text-right text-sm leading-relaxed text-[var(--right-text-muted)] md:text-lg">
            افتح حسابك كمعلن في خطوات بسيطة، وابدأ الوصول لعملاء أكثر من خلال حملات موجهة باللغة العربية.
          </p>
        </MotionDiv>

        <MotionForm
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.28 }}
          onSubmit={handleSubmit}
          noValidate
          className="mt-5 space-y-4 rounded-3xl border border-[var(--border-soft)] bg-[var(--surface-panel)] p-4 md:p-5"
        >
          <FieldWrapper label="الاسم الكامل" error={nameError}>
            <input
              type="text"
              value={form.name}
              onChange={(event) => {
                updateField('name', event.target.value)
                resetSuccess()
              }}
              onBlur={() => markFieldTouched('name')}
              placeholder="مثال: أحمد محمد"
              className={inputClass(nameError)}
            />
          </FieldWrapper>

          <FieldWrapper label="البريد الإلكتروني" error={emailError}>
            <input
              type="email"
              dir="ltr"
              value={form.email}
              onChange={(event) => {
                updateField('email', event.target.value)
                resetSuccess()
              }}
              onBlur={() => markFieldTouched('email')}
              placeholder="owner@adsplatform.com"
              className={inputClass(emailError)}
            />
          </FieldWrapper>

          <FieldWrapper label="رقم الهاتف" error={phoneError}>
            <div className="flex flex-col-reverse gap-3 md:flex-row md:items-start">
              <input
                type="tel"
                inputMode="numeric"
                dir="ltr"
                value={form.phone}
                onChange={(event) => {
                  updateField('phone', event.target.value)
                  resetSuccess()
                }}
                onBlur={() => markFieldTouched('phone')}
                placeholder={
                  selectedCountry
                    ? `اكتب رقم ${selectedCountry.name} بدون ${selectedCountry.dialCode}`
                    : 'اكتب رقم الهاتف'
                }
                className={`${inputClass(phoneError)} w-full`}
              />
              <CountrySelect value={form.countryIso} onChange={changeCountry} error={phoneError} />
            </div>
          </FieldWrapper>

          <FieldWrapper label="كلمة المرور" error={passwordError}>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                dir="ltr"
                value={form.password}
                onChange={(event) => {
                  updateField('password', event.target.value)
                  resetSuccess()
                }}
                onBlur={() => markFieldTouched('password')}
                placeholder="••••••••"
                className={`${inputClass(passwordError)} pl-28`}
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute left-2 top-1/2 -translate-y-1/2 rounded-xl border border-[var(--border-soft)] bg-[var(--surface-soft)] px-3 py-2 text-sm font-bold text-[var(--text-muted)] transition-colors hover:text-[var(--text-primary)]"
              >
                {showPassword ? 'إخفاء' : 'إظهار'}
              </button>
            </div>
          </FieldWrapper>

          <div className="grid gap-3 md:grid-cols-2">
            <button
              type="button"
              onClick={handleRequestOtp}
              className="inline-flex h-12 items-center justify-center rounded-2xl border border-[var(--border-soft)] bg-[var(--surface-soft)] text-base font-black text-[var(--right-text-primary)] transition-colors hover:border-[var(--accent)]"
            >
              احصل على OTP
            </button>
            <button
              type="submit"
              className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-2xl text-base font-black text-slate-950 transition-transform duration-300 hover:-translate-y-0.5"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-[var(--accent)] via-[var(--accent-2)] to-[var(--accent-3)] transition-transform duration-500 group-hover:scale-105" />
              <span className="relative">تسجيل الحساب</span>
            </button>
          </div>

          {otpSent && (
            <p className="rounded-xl border px-4 py-3 text-sm font-bold [background:var(--status-info-bg)] text-[var(--status-info-text)] border-[var(--status-info-border)]">
              تم إرسال رمز OTP بنجاح. افتح الشاشة وأدخل الكود ثم اضغط Verify.
            </p>
          )}

          {otpVerified && (
            <p className="rounded-xl border px-4 py-3 text-sm font-bold [background:var(--status-success-bg)] text-[var(--status-success-text)] border-[var(--status-success-border)]">
              تم التحقق من OTP بنجاح.
            </p>
          )}

          {submitted && !hasErrors && (
            <p className="rounded-xl border px-4 py-3 text-sm font-bold [background:var(--status-success-bg)] text-[var(--status-success-text)] border-[var(--status-success-border)]">
              تم تسجيل الحساب بنجاح (واجهة UI فقط).
            </p>
          )}

          {!submitted && hasErrors && (touched.name || touched.email || touched.phone || touched.password) && (
            <p className="text-sm font-semibold text-amber-300">أكمل الحقول بشكل صحيح قبل المتابعة.</p>
          )}

          {!submitted && !otpVerified && !hasErrors && touched.password && (
            <p className="text-sm font-semibold text-amber-300">اطلب OTP ثم أدخل الكود واضغط Verify قبل تسجيل الحساب.</p>
          )}

          <p className="text-center text-sm text-[var(--right-text-muted)]">
            لديك حساب بالفعل؟{' '}
            <Link to="/login" state={{ direction: -1 }} className="font-black text-[var(--accent)]">
              سجّل الدخول
            </Link>
          </p>
        </MotionForm>
      </MotionSection>

      <OtpVerificationModal
        isOpen={otpOpen}
        phoneLabel={phoneLabel}
        code={otpCode}
        error={otpError}
        onCodeChange={updateOtpCode}
        onClose={closeOtpModal}
        onVerify={verifyOtpCode}
      />
    </>
  )
}

function FieldWrapper({ label, error, children }) {
  return (
    <label className="block text-right">
      <span className="mb-2 inline-block text-sm font-extrabold text-[var(--right-text-primary)]">{label}</span>
      {children}
      {error && <p className="mt-2 text-xs font-bold text-red-300">{error}</p>}
    </label>
  )
}

function inputClass(hasError) {
  return `h-12 w-full rounded-2xl border px-4 text-base text-[var(--right-text-primary)] outline-none transition-all duration-300 placeholder:text-[var(--text-placeholder)] ${
    hasError
      ? 'border-red-400/80 bg-red-500/10'
      : 'border-[var(--border-soft)] bg-[var(--surface-soft)] focus:border-[var(--accent)]'
  }`
}

export default SignUpFormCard
