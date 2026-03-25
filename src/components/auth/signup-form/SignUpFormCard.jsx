import { motion } from 'framer-motion'
import { useState } from 'react'
import { useSignUpForm } from '../../../hooks/useSignUpForm'
import OtpVerificationModal from '../otp-modal/OtpVerificationModal'
import { AuthContactFieldsRow, AuthFormField, PasswordInputField, inputClass } from '../shared'
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
    verificationStep,
    verificationCode,
    verificationError,
    hasErrors,
    selectedCountry,
    updateField,
    markFieldTouched,
    changeCountry,
    updateVerificationCode,
    closeVerificationModal,
    confirmVerificationStep,
    handleSubmit,
    resetSuccess,
  } = useSignUpForm()

  const nameError = touched.name ? fieldErrors.name : ''
  const emailError = touched.email ? fieldErrors.email : ''
  const phoneError = touched.phone ? fieldErrors.phone : ''
  const passwordError = touched.password ? fieldErrors.password : ''
  const phoneLabel = selectedCountry ? `${selectedCountry.dialCode} ${form.phone || '000000000'}` : form.phone
  const verificationTitle =
    verificationStep === 'email'
      ? SIGNUP_FORM_TEXT.emailVerificationTitle
      : SIGNUP_FORM_TEXT.phoneVerificationTitle
  const verificationDescription =
    verificationStep === 'email'
      ? SIGNUP_FORM_TEXT.emailVerificationDescription
      : SIGNUP_FORM_TEXT.phoneVerificationDescription
  const verificationTargetLabel = verificationStep === 'email' ? form.email : phoneLabel

  const phonePlaceholder = selectedCountry
    ? `اكتب رقم ${selectedCountry.name} بدون ${selectedCountry.dialCode}`
    : SIGNUP_FORM_TEXT.phoneFallbackPlaceholder

  return (
    <>
      <MotionSection
        initial={{ opacity: 0, x: -90 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="relative flex h-full flex-col rounded-[28px] border border-[var(--border-strong)] [background:var(--right-panel-bg)] px-5 py-4 shadow-[0_24px_80px_rgba(8,15,45,0.2)] backdrop-blur-xl md:px-6 md:py-5"
      >
        <SignUpCardHeader />
        <SignUpIntroCard />

        <MotionForm
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.28 }}
          onSubmit={handleSubmit}
          noValidate
          className="mt-4 space-y-3 rounded-[26px] border border-[var(--border-soft)] bg-[var(--surface-panel)] p-3.5 md:p-4"
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

          <AuthContactFieldsRow
            emailLabel={SIGNUP_FORM_TEXT.emailLabel}
            emailPlaceholder={SIGNUP_FORM_TEXT.emailPlaceholder}
            emailValue={form.email}
            onEmailChange={(event) => {
              updateField('email', event.target.value)
              resetSuccess()
            }}
            onEmailBlur={() => markFieldTouched('email')}
            emailError={emailError}
            phoneLabel={SIGNUP_FORM_TEXT.phoneLabel}
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

          <SignUpActionButtons />

          <SignUpStatusMessages
            submitted={submitted}
            hasErrors={hasErrors}
            touched={touched}
          />
        </MotionForm>
      </MotionSection>

      <OtpVerificationModal
        isOpen={Boolean(verificationStep)}
        title={verificationTitle}
        description={verificationDescription}
        targetLabel={verificationTargetLabel}
        code={verificationCode}
        error={verificationError}
        confirmText={SIGNUP_FORM_TEXT.confirmVerification}
        onCodeChange={updateVerificationCode}
        onClose={closeVerificationModal}
        onVerify={confirmVerificationStep}
      />
    </>
  )
}

export default SignUpFormCard
