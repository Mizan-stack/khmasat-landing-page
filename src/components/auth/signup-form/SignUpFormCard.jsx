import { motion } from 'framer-motion'
import { useState } from 'react'
import { useSignUpForm } from '../../../hooks/useSignUpForm'
import OtpVerificationModal from '../otp-modal/OtpVerificationModal'
import { AuthFormField, PasswordInputField, PhoneFieldRow, inputClass } from '../shared'
import SignUpActionButtons from './SignUpActionButtons'
import SignUpCardHeader from './SignUpCardHeader'
import { SIGNUP_FORM_TEXT } from './SignUpFormText'
import SignUpIntroCard from './SignUpIntroCard'
import SignUpStatusMessages from './SignUpStatusMessages'

const MotionSection = motion.section
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

  const phonePlaceholder = selectedCountry
    ? `اكتب رقم ${selectedCountry.name} بدون ${selectedCountry.dialCode}`
    : SIGNUP_FORM_TEXT.phoneFallbackPlaceholder

  return (
    <>
      <MotionSection
        initial={{ opacity: 0, x: -90 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="relative flex h-full flex-col rounded-[30px] border border-[var(--border-strong)] [background:var(--right-panel-bg)] px-6 py-5 shadow-[0_24px_80px_rgba(8,15,45,0.2)] backdrop-blur-xl md:px-8 md:py-6"
      >
        <SignUpCardHeader />
        <SignUpIntroCard />

        <MotionForm
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.28 }}
          onSubmit={handleSubmit}
          noValidate
          className="mt-5 space-y-4 rounded-3xl border border-[var(--border-soft)] bg-[var(--surface-panel)] p-4 md:p-5"
        >
          <AuthFormField label={SIGNUP_FORM_TEXT.nameLabel} error={nameError}>
            <input
              type="text"
              value={form.name}
              onChange={(event) => {
                updateField('name', event.target.value)
                resetSuccess()
              }}
              onBlur={() => markFieldTouched('name')}
              placeholder={SIGNUP_FORM_TEXT.namePlaceholder}
              className={inputClass(nameError)}
            />
          </AuthFormField>

          <AuthFormField label={SIGNUP_FORM_TEXT.emailLabel} error={emailError}>
            <input
              type="email"
              dir="ltr"
              value={form.email}
              onChange={(event) => {
                updateField('email', event.target.value)
                resetSuccess()
              }}
              onBlur={() => markFieldTouched('email')}
              placeholder={SIGNUP_FORM_TEXT.emailPlaceholder}
              className={inputClass(emailError)}
            />
          </AuthFormField>

          <AuthFormField label={SIGNUP_FORM_TEXT.phoneLabel} error={phoneError}>
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

          <AuthFormField label={SIGNUP_FORM_TEXT.passwordLabel} error={passwordError}>
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

          <SignUpActionButtons onRequestOtp={handleRequestOtp} />

          <SignUpStatusMessages
            otpSent={otpSent}
            otpVerified={otpVerified}
            submitted={submitted}
            hasErrors={hasErrors}
            touched={touched}
          />
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

export default SignUpFormCard
