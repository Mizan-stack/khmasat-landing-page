import { useMemo, useState } from 'react'
import { COUNTRIES, DEFAULT_COUNTRY } from '../../../../constants/countries'
import { sanitizePhone, validateEmail, validateName, validatePhone } from '../../../../utils/validation'

const INITIAL_FORM = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  countryIso: DEFAULT_COUNTRY,
  agree: false,
}

const ALL_TOUCHED = {
  firstName: true,
  lastName: true,
  email: true,
  phone: true,
  agree: true,
}

function useRegisterNowForm() {
  const [form, setForm] = useState(INITIAL_FORM)
  const [touched, setTouched] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const selectedCountry = useMemo(
    () => COUNTRIES.find((country) => country.isoCode === form.countryIso) ?? COUNTRIES[0],
    [form.countryIso],
  )

  const errors = useMemo(() => {
    const phone = sanitizePhone(form.phone)

    return {
      firstName: validateName(form.firstName),
      lastName: validateName(form.lastName),
      email: validateEmail(form.email),
      phone: validatePhone(phone, selectedCountry),
      agree: form.agree ? '' : 'وافق على استلام المراسلات أولًا',
    }
  }, [form.agree, form.email, form.firstName, form.lastName, form.phone, selectedCountry])

  const fieldErrors = useMemo(
    () => ({
      firstName: touched.firstName ? errors.firstName : '',
      lastName: touched.lastName ? errors.lastName : '',
      email: touched.email ? errors.email : '',
      phone: touched.phone ? errors.phone : '',
      agree: touched.agree ? errors.agree : '',
    }),
    [errors, touched],
  )

  const hasErrors = Object.values(errors).some(Boolean)

  function updateField(name, value) {
    setForm((prev) => ({
      ...prev,
      [name]: name === 'phone' ? sanitizePhone(value) : value,
    }))
    if (submitted) setSubmitted(false)
  }

  function changeCountry(countryIso) {
    setForm((prev) => ({ ...prev, countryIso, phone: '' }))
    setTouched((prev) => ({ ...prev, phone: false }))
    if (submitted) setSubmitted(false)
  }

  function touchField(name) {
    setTouched((prev) => ({ ...prev, [name]: true }))
  }

  function handleSubmit(event) {
    event.preventDefault()
    setTouched(ALL_TOUCHED)

    if (hasErrors) {
      setSubmitted(false)
      return
    }

    setSubmitted(true)
  }

  return {
    form,
    selectedCountry,
    fieldErrors,
    submitted,
    updateField,
    changeCountry,
    touchField,
    handleSubmit,
  }
}

export { useRegisterNowForm }
