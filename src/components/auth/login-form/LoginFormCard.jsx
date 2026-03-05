import { motion } from 'framer-motion'
import { useState } from 'react'
import { useLoginForm } from '../../../hooks/useLoginForm'
import { AuthFormField, PasswordInputField, PhoneFieldRow, inputClass } from '../shared'
import LoginCardHeader from './LoginCardHeader'
import { LOGIN_FORM_TEXT } from './LoginFormText'
import LoginIntroCard from './LoginIntroCard'
import LoginStatusMessages from './LoginStatusMessages'

const MotionSection = motion.section
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

  const phonePlaceholder = selectedCountry
    ? `اكتب رقم ${selectedCountry.name} بدون ${selectedCountry.dialCode}`
    : LOGIN_FORM_TEXT.phoneFallbackPlaceholder

  return (
    <MotionSection
      initial={{ opacity: 0, x: 90 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className="relative flex h-full flex-col rounded-[30px] border border-[var(--border-strong)] [background:var(--right-panel-bg)] px-6 py-5 shadow-[0_24px_80px_rgba(8,15,45,0.2)] backdrop-blur-xl md:px-8 md:py-6"
    >
      <LoginCardHeader />
      <LoginIntroCard />

      <MotionForm
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.28 }}
        onSubmit={handleSubmit}
        noValidate
        className="mt-5 space-y-4 rounded-3xl border border-[var(--border-soft)] bg-[var(--surface-panel)] p-4 md:p-5"
      >
        <AuthFormField label={LOGIN_FORM_TEXT.emailLabel} error={emailError}>
          <input
            type="email"
            dir="ltr"
            value={form.email}
            onChange={(event) => {
              updateField('email', event.target.value)
              resetSuccess()
            }}
            onBlur={() => markFieldTouched('email')}
            placeholder={LOGIN_FORM_TEXT.emailPlaceholder}
            className={inputClass(emailError)}
          />
        </AuthFormField>

        <AuthFormField label={LOGIN_FORM_TEXT.phoneLabel} error={phoneError}>
          <PhoneFieldRow
            value={form.phone}
            onChange={(event) => {
              updateField('phone', event.target.value)
              resetSuccess()
            }}
            onBlur={() => markFieldTouched('phone')}
            placeholder={phonePlaceholder}
            error={phoneError}
            countryIso={form.countryIso}
            onChangeCountry={changeCountry}
          />
        </AuthFormField>

        <AuthFormField label={LOGIN_FORM_TEXT.passwordLabel} error={passwordError}>
          <PasswordInputField
            showPassword={showPassword}
            onToggle={() => setShowPassword((prev) => !prev)}
            value={form.password}
            onChange={(event) => {
              updateField('password', event.target.value)
              resetSuccess()
            }}
            onBlur={() => markFieldTouched('password')}
            error={passwordError}
          />
        </AuthFormField>

        <button
          type="submit"
          className="group relative mt-3 inline-flex h-14 w-full items-center justify-center overflow-hidden rounded-2xl text-lg font-black text-slate-950 transition-transform duration-300 hover:-translate-y-0.5"
        >
          <span className="absolute inset-0 bg-gradient-to-r from-[var(--accent)] via-[var(--accent-2)] to-[var(--accent-3)] transition-transform duration-500 group-hover:scale-105" />
          <span className="relative">{LOGIN_FORM_TEXT.submit}</span>
        </button>

        <LoginStatusMessages submitted={submitted} hasErrors={hasErrors} touched={touched} />
      </MotionForm>
    </MotionSection>
  )
}

export default LoginFormCard
