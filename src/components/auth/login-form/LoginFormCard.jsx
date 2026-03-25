import { motion } from 'framer-motion'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useLoginForm } from '../../../hooks/useLoginForm'
import { buildDashboardUser, saveDashboardUser } from '../../../utils/dashboardUserSession'
import { AuthContactFieldsRow, AuthFormField, PasswordInputField } from '../shared'
import LoginCardHeader from './LoginCardHeader'
import { LOGIN_FORM_TEXT } from './LoginFormText'
import LoginIntroCard from './LoginIntroCard'
import LoginStatusMessages from './LoginStatusMessages'

const MotionSection = motion.section
const MotionForm = motion.form

function LoginFormCard() {
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()
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

  function onSubmit(event) {
    const isValid = handleSubmit(event)
    if (isValid) {
      const dashboardUser = buildDashboardUser(form)
      saveDashboardUser(dashboardUser)

      navigate('/ads-board', {
        state: {
          direction: 1,
          showWelcomePopup: true,
          dashboardUser,
        },
      })
    }
  }

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
      className="relative flex h-full flex-col rounded-[28px] border border-[var(--border-strong)] [background:var(--right-panel-bg)] px-5 py-4 shadow-[0_24px_80px_rgba(8,15,45,0.2)] backdrop-blur-xl md:px-6 md:py-5"
    >
      <LoginCardHeader />
      <LoginIntroCard />

      <MotionForm
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.28 }}
        onSubmit={onSubmit}
        noValidate
        className="mt-4 space-y-3 rounded-[26px] border border-[var(--border-soft)] bg-[var(--surface-panel)] p-3.5 md:p-4"
      >
        <AuthContactFieldsRow
          emailLabel={LOGIN_FORM_TEXT.emailLabel}
          emailPlaceholder={LOGIN_FORM_TEXT.emailPlaceholder}
          emailValue={form.email}
          onEmailChange={(event) => {
            updateField('email', event.target.value)
            resetSuccess()
          }}
          onEmailBlur={() => markFieldTouched('email')}
          emailError={emailError}
          phoneLabel={LOGIN_FORM_TEXT.phoneLabel}
          phonePlaceholder={phonePlaceholder}
          phoneValue={form.phone}
          onPhoneChange={(event) => {
            updateField('phone', event.target.value)
            resetSuccess()
          }}
          onPhoneBlur={() => markFieldTouched('phone')}
          phoneError={phoneError}
          countryIso={form.countryIso}
          onChangeCountry={changeCountry}
        />

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
          className="group relative mt-2 inline-flex h-11 w-full items-center justify-center overflow-hidden rounded-2xl text-sm font-black text-slate-950 transition-transform duration-300 hover:-translate-y-0.5 md:text-base"
        >
          <span className="absolute inset-0 bg-gradient-to-r from-[var(--accent)] via-[var(--accent-2)] to-[var(--accent-3)] transition-transform duration-500 group-hover:scale-105" />
          <span className="relative">{LOGIN_FORM_TEXT.submit}</span>
        </button>

        <LoginStatusMessages submitted={submitted} hasErrors={hasErrors} touched={touched} />
      </MotionForm>

      <Link
        to="/"
        state={{ direction: -1 }}
        className="mt-3 inline-flex h-10 w-full items-center justify-center rounded-2xl border border-[var(--border-soft)] bg-[var(--surface-soft)] text-xs font-extrabold text-[var(--right-text-primary)] transition-colors duration-300 hover:border-[var(--accent)] md:text-sm"
      >
        {LOGIN_FORM_TEXT.backToSite}
      </Link>
    </MotionSection>
  )
}

export default LoginFormCard
