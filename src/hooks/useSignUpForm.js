import { useMemo, useState } from 'react'
import { COUNTRIES, DEFAULT_COUNTRY } from '../constants/countries'
import { sanitizeNumeric, sanitizePhone, validateEmail, validateName, validateOtpCode, validatePassword, validatePhone } from '../utils/validation'

const INITIAL_FORM = {
  name: '',
  email: '',
  phone: '',
  password: '',
  countryIso: DEFAULT_COUNTRY,
}

const INITIAL_VERIFICATION = {
  step: null,
  emailCode: '',
  phoneCode: '',
  emailCodeTouched: false,
  phoneCodeTouched: false,
  emailVerified: false,
  phoneVerified: false,
}

export function useSignUpForm() {
  const [form, setForm] = useState(INITIAL_FORM)
  const [touched, setTouched] = useState({})
  const [verification, setVerification] = useState(INITIAL_VERIFICATION)
  const [submitted, setSubmitted] = useState(false)

  const selectedCountry = useMemo(
    () => COUNTRIES.find((country) => country.isoCode === form.countryIso),
    [form.countryIso],
  )

  const fieldErrors = useMemo(() => {
    const phone = sanitizePhone(form.phone)

    return {
      name: validateName(form.name),
      email: validateEmail(form.email),
      phone: validatePhone(phone, selectedCountry),
      password: validatePassword(form.password),
    }
  }, [form.email, form.name, form.password, form.phone, selectedCountry])

  const hasErrors = Object.values(fieldErrors).some(Boolean)
  const emailCodeError = verification.emailCodeTouched ? validateOtpCode(verification.emailCode) : ''
  const phoneCodeError = verification.phoneCodeTouched ? validateOtpCode(verification.phoneCode) : ''
  const verificationError =
    verification.step === 'email' ? emailCodeError : verification.step === 'phone' ? phoneCodeError : ''
  const verificationCode =
    verification.step === 'email'
      ? verification.emailCode
      : verification.step === 'phone'
        ? verification.phoneCode
        : ''

  function updateField(name, value) {
    const nextValue = name === 'phone' ? sanitizePhone(value) : value

    setForm((prev) => ({
      ...prev,
      [name]: nextValue,
    }))

    setSubmitted(false)

    if (name === 'email') {
      setVerification((prev) => ({
        ...prev,
        step: prev.step === 'email' ? null : prev.step,
        emailCode: '',
        phoneCode: '',
        emailCodeTouched: false,
        phoneCodeTouched: false,
        emailVerified: false,
        phoneVerified: false,
      }))
      return
    }

    if (name === 'phone') {
      setVerification((prev) => ({
        ...prev,
        step: prev.step === 'phone' ? null : prev.step,
        phoneCode: '',
        phoneCodeTouched: false,
        phoneVerified: false,
      }))
    }
  }

  function markFieldTouched(name) {
    setTouched((prev) => ({ ...prev, [name]: true }))
  }

  function changeCountry(countryIso) {
    setForm((prev) => ({ ...prev, countryIso, phone: '' }))
    setTouched((prev) => ({ ...prev, phone: false }))
    setSubmitted(false)
    setVerification((prev) => ({
      ...prev,
      step: prev.step === 'phone' ? null : prev.step,
      phoneCode: '',
      phoneCodeTouched: false,
      phoneVerified: false,
    }))
  }

  function openVerificationStep(step) {
    setVerification((prev) => ({
      ...prev,
      step,
      emailCode: step === 'email' ? '' : prev.emailCode,
      phoneCode: step === 'phone' ? '' : prev.phoneCode,
      emailCodeTouched: step === 'email' ? false : prev.emailCodeTouched,
      phoneCodeTouched: step === 'phone' ? false : prev.phoneCodeTouched,
    }))
  }

  function updateVerificationCode(value) {
    const nextValue = sanitizeNumeric(value).slice(0, 6)

    setVerification((prev) => {
      if (prev.step === 'email') {
        return { ...prev, emailCode: nextValue, emailCodeTouched: false }
      }

      if (prev.step === 'phone') {
        return { ...prev, phoneCode: nextValue, phoneCodeTouched: false }
      }

      return prev
    })
  }

  function closeVerificationModal() {
    setVerification((prev) => {
      if (prev.step === 'email') {
        return { ...prev, step: null, emailCode: '', emailCodeTouched: false }
      }

      if (prev.step === 'phone') {
        return { ...prev, step: null, phoneCode: '', phoneCodeTouched: false }
      }

      return prev
    })
  }

  function confirmEmailVerification() {
    setVerification((prev) => ({ ...prev, emailCodeTouched: true }))

    if (validateOtpCode(verification.emailCode)) {
      return false
    }

    setVerification((prev) => ({
      ...prev,
      step: 'phone',
      emailVerified: true,
      emailCodeTouched: false,
      phoneCode: '',
      phoneCodeTouched: false,
    }))
    return true
  }

  function confirmPhoneVerification() {
    setVerification((prev) => ({ ...prev, phoneCodeTouched: true }))

    if (validateOtpCode(verification.phoneCode)) {
      return false
    }

    setVerification((prev) => ({
      ...prev,
      step: null,
      phoneVerified: true,
      phoneCodeTouched: false,
    }))
    setSubmitted(true)
    return true
  }

  function confirmVerificationStep() {
    if (verification.step === 'email') {
      return confirmEmailVerification()
    }

    if (verification.step === 'phone') {
      return confirmPhoneVerification()
    }

    return false
  }

  function handleSubmit(event) {
    event.preventDefault()
    setTouched({ name: true, email: true, phone: true, password: true })

    if (hasErrors) {
      setSubmitted(false)
      return
    }

    if (!verification.emailVerified) {
      setSubmitted(false)
      openVerificationStep('email')
      return
    }

    if (!verification.phoneVerified) {
      setSubmitted(false)
      openVerificationStep('phone')
      return
    }

    setSubmitted(true)
  }

  function resetSuccess() {
    if (submitted) {
      setSubmitted(false)
    }
  }

  return {
    form,
    fieldErrors,
    touched,
    submitted,
    verificationStep: verification.step,
    verificationCode,
    verificationError,
    emailVerified: verification.emailVerified,
    phoneVerified: verification.phoneVerified,
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
  }
}
