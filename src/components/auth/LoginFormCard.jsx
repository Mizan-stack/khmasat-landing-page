import { motion } from 'framer-motion'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import CountrySelect from './CountrySelect'
import ThemeToggle from './ThemeToggle'
import { useLoginForm } from '../../hooks/useLoginForm'

const MotionSection = motion.section
const MotionDiv = motion.div
const MotionForm = motion.form

function LoginFormCard() {
  const [showPassword, setShowPassword] = useState(false)
  const {
    form,
    fieldErrors,
    touched,
    submitted,
    hasErrors,
    selectedCountry,
    updateField,
    markFieldTouched,
    changeCountry,
    handleSubmit,
    resetSuccess,
  } = useLoginForm()

  const phoneError = touched.phone ? fieldErrors.phone : ''
  const emailError = touched.email ? fieldErrors.email : ''
  const passwordError = touched.password ? fieldErrors.password : ''

  return (
    <MotionSection
      initial={{ opacity: 0, x: 90 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className="relative flex h-full flex-col rounded-[30px] border border-[var(--border-strong)] [background:var(--right-panel-bg)] px-6 py-5 shadow-[0_24px_80px_rgba(8,15,45,0.2)] backdrop-blur-xl md:px-8 md:py-6"
    >
      <div className="mb-10 flex items-center justify-between gap-3">
        <Link
          to="/home"
          state={{ direction: -1 }}
          className="h-12 rounded-full border border-[var(--border-soft)] bg-[var(--surface-soft)] px-6 text-sm font-extrabold text-[var(--right-text-primary)] transition-colors duration-300 hover:border-[var(--accent)]"
        >
          العودة للموقع
        </Link>
        <ThemeToggle />
      </div>

      <MotionDiv
        initial={{ opacity: 0, x: 80 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.75, delay: 0.14 }}
        className="rounded-3xl border border-[var(--right-hero-border)] [background:var(--right-hero-bg)] px-4 py-4 md:px-5 md:py-5"
      >
        <h2 className="text-right text-[clamp(2rem,3.4vw,4rem)] font-black leading-tight text-[var(--right-text-primary)]">
          أهلاً بك في منصة
          <br />
          الإعلانات
        </h2>
        <p className="mt-3 max-w-2xl text-right text-sm leading-relaxed text-[var(--right-text-muted)] md:text-lg">
          سجّل الدخول لإدارة حملاتك، متابعة أداء إعلاناتك، والوصول إلى لوحة تحكم احترافية باللغة العربية.
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

        <button
          type="submit"
          className="group relative mt-3 inline-flex h-14 w-full items-center justify-center overflow-hidden rounded-2xl text-lg font-black text-slate-950 transition-transform duration-300 hover:-translate-y-0.5"
        >
          <span className="absolute inset-0 bg-gradient-to-r from-[var(--accent)] via-[var(--accent-2)] to-[var(--accent-3)] transition-transform duration-500 group-hover:scale-105" />
          <span className="relative">الدخول إلى لوحة الإعلانات</span>
        </button>

        {submitted && !hasErrors && (
          <p className="rounded-xl border px-4 py-3 text-sm font-bold [background:var(--status-success-bg)] text-[var(--status-success-text)] border-[var(--status-success-border)]">
            تم التحقق من البيانات بنجاح (واجهة UI فقط).
          </p>
        )}

        {!submitted && hasErrors && (touched.email || touched.phone || touched.password) && (
          <p className="text-sm font-semibold text-amber-300">أكمل الحقول بشكل صحيح قبل المتابعة.</p>
        )}

        <p className="text-center text-sm text-[var(--right-text-muted)]">
          ليس لديك حساب معلن؟{' '}
          <Link to="/signup" state={{ direction: 1 }} className="font-black text-[var(--accent)]">
            أنشئ حساب جديد
          </Link>
        </p>
      </MotionForm>
    </MotionSection>
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

export default LoginFormCard
