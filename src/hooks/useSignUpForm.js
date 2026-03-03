import { useMemo, useState } from 'react'
import { COUNTRIES, DEFAULT_COUNTRY } from '../constants/countries'
import {
  sanitizeNumeric,
  sanitizePhone,
  validateEmail,
  validateName,
  validateOtpCode,
  validatePassword,
  validatePhone,
} from '../utils/validation'

const INITIAL_FORM = {
  name: '',
  email: '',
  phone: '',
  password: '',
  countryIso: DEFAULT_COUNTRY,
}

export function useSignUpForm() {
  const [form, setForm] = useState(INITIAL_FORM)
  const [touched, setTouched] = useState({})
  const [otpSent, setOtpSent] = useState(false)
  const [otpOpen, setOtpOpen] = useState(false)
  const [otpCode, setOtpCode] = useState('')
  const [otpTouched, setOtpTouched] = useState(false)
  const [otpVerified, setOtpVerified] = useState(false)
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
  const otpFieldsValid = !fieldErrors.name && !fieldErrors.email && !fieldErrors.phone
  const otpError = otpTouched ? validateOtpCode(otpCode) : ''

  function updateField(name, value) {
    setForm((prev) => ({
      ...prev,
      [name]: name === 'phone' ? sanitizePhone(value) : value,
    }))
    setOtpSent(false)
    setOtpVerified(false)
  }

  function markFieldTouched(name) {
    setTouched((prev) => ({ ...prev, [name]: true }))
  }

  function changeCountry(countryIso) {
    setForm((prev) => ({ ...prev, countryIso, phone: '' }))
    setTouched((prev) => ({ ...prev, phone: false }))
    setOtpSent(false)
    setOtpVerified(false)
  }

  function handleRequestOtp() {
    setTouched((prev) => ({ ...prev, name: true, email: true, phone: true }))
    if (!otpFieldsValid) {
      setOtpSent(false)
      setOtpOpen(false)
      return false
    }

    setOtpSent(true)
    setOtpVerified(false)
    setOtpOpen(true)
    setOtpTouched(false)
    setOtpCode('')
    return true
  }

  function updateOtpCode(value) {
    setOtpCode(sanitizeNumeric(value).slice(0, 6))
    setOtpTouched(false)
  }

  function closeOtpModal() {
    setOtpOpen(false)
    setOtpTouched(false)
  }

  function verifyOtpCode() {
    setOtpTouched(true)
    if (validateOtpCode(otpCode)) {
      return false
    }

    setOtpVerified(true)
    setOtpOpen(false)
    return true
  }

  function handleSubmit(event) {
    event.preventDefault()
    setTouched({ name: true, email: true, phone: true, password: true })

    if (hasErrors) {
      setSubmitted(false)
      return
    }

    if (!otpVerified) {
      setSubmitted(false)
      return
    }

    setSubmitted(true)
  }

  function resetSuccess() {
    if (submitted) {
      setSubmitted(false)
    }
    if (otpSent) {
      setOtpSent(false)
    }
  }

  return {
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
  }
}
