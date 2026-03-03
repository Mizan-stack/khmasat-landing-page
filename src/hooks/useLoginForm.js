import { useMemo, useState } from 'react'
import { COUNTRIES, DEFAULT_COUNTRY } from '../constants/countries'
import { sanitizePhone, validateEmail, validatePassword, validatePhone } from '../utils/validation'

const INITIAL_FORM = {
  email: '',
  phone: '',
  password: '',
  countryIso: DEFAULT_COUNTRY,
}

export function useLoginForm() {
  const [form, setForm] = useState(INITIAL_FORM)
  const [touched, setTouched] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const selectedCountry = useMemo(
    () => COUNTRIES.find((country) => country.isoCode === form.countryIso),
    [form.countryIso],
  )

  const fieldErrors = useMemo(() => {
    const phone = sanitizePhone(form.phone)

    return {
      email: validateEmail(form.email),
      phone: validatePhone(phone, selectedCountry),
      password: validatePassword(form.password),
    }
  }, [form.email, form.password, form.phone, selectedCountry])

  const hasErrors = Object.values(fieldErrors).some(Boolean)

  function updateField(name, value) {
    setForm((prev) => ({
      ...prev,
      [name]: name === 'phone' ? sanitizePhone(value) : value,
    }))
  }

  function markFieldTouched(name) {
    setTouched((prev) => ({ ...prev, [name]: true }))
  }

  function changeCountry(countryIso) {
    setForm((prev) => ({ ...prev, countryIso, phone: '' }))
    setTouched((prev) => ({ ...prev, phone: false }))
  }

  function handleSubmit(event) {
    event.preventDefault()
    setTouched({ email: true, phone: true, password: true })

    if (hasErrors) {
      setSubmitted(false)
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
    hasErrors,
    selectedCountry,
    updateField,
    markFieldTouched,
    changeCountry,
    handleSubmit,
    resetSuccess,
  }
}
