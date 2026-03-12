import { useEffect, useMemo, useRef, useState } from 'react'
import { COUNTRIES, DEFAULT_COUNTRY } from '../../../constants/countries'
import { normalizeDigits, sanitizePhone, validateEmail, validatePhone } from '../../../utils/validation'
import { DEFAULT_PLAN_CYCLE, getAdPlanOptions } from './addAdModalData'

const INITIAL_BUSINESS_FORM = {
  registrationType: 'commercial',
  businessName: '',
  contactEmail: '',
  registrationDate: '',
  activity: '',
  countryIso: 'SA',
  phoneCountryIso: DEFAULT_COUNTRY,
  phone: '',
  platform: '',
  storeUrl: '',
  adImage: null,
  licenseNumber: '',
  saudiStoreUrl: '',
  agreement: false,
}

const INITIAL_PAYMENT_FORM = {
  paymentMethod: 'card',
  cardHolderName: '',
  cardNumber: '',
  expiryDate: '',
  cvv: '',
  billingEmail: '',
}

const ALL_BUSINESS_TOUCHED = {
  registrationType: true,
  businessName: true,
  contactEmail: true,
  registrationDate: true,
  activity: true,
  countryIso: true,
  phone: true,
  platform: true,
  storeUrl: true,
  adImage: true,
  licenseNumber: true,
  saudiStoreUrl: true,
  agreement: true,
}

const ALL_PAYMENT_TOUCHED = {
  paymentMethod: true,
  cardHolderName: true,
  cardNumber: true,
  expiryDate: true,
  cvv: true,
  billingEmail: true,
}

const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp']
const MAX_IMAGE_SIZE_MB = 5

function normalizeCardDigits(value) {
  return normalizeDigits(value).replace(/\D/g, '').slice(0, 16)
}

function normalizeCvv(value) {
  return normalizeDigits(value).replace(/\D/g, '').slice(0, 4)
}

function normalizeExpiry(value) {
  const digits = normalizeDigits(value).replace(/\D/g, '').slice(0, 4)
  if (digits.length <= 2) return digits
  return `${digits.slice(0, 2)}/${digits.slice(2)}`
}

function validateTextRequired(value, label, minLength = 2) {
  const trimmed = value.trim()
  if (!trimmed) return `${label} مطلوب`
  if (trimmed.length < minLength) return `${label} يجب أن يكون ${minLength} أحرف على الأقل`
  return ''
}

function validateDate(value) {
  if (!value) return 'تاريخ التسجيل مطلوب'
  const selected = new Date(`${value}T00:00:00`)
  if (Number.isNaN(selected.getTime())) return 'صيغة التاريخ غير صحيحة'

  const today = new Date()
  today.setHours(0, 0, 0, 0)
  if (selected > today) return 'لا يمكن اختيار تاريخ في المستقبل'

  return ''
}

function validateRequiredOption(value, label) {
  if (!value) return `${label} مطلوب`
  return ''
}

function validateUrl(value, label) {
  const trimmed = value.trim()
  if (!trimmed) return `${label} مطلوب`
  const urlPattern = /^(https?:\/\/)[^\s/$.?#].[^\s]*$/i
  if (!urlPattern.test(trimmed)) return `${label} يجب أن يبدأ بـ https:// أو http://`
  return ''
}

function validateImageFile(file) {
  if (!file) return 'صورة الإعلان مطلوبة'
  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) return 'الصورة يجب أن تكون JPG أو PNG أو WEBP'
  const maxBytes = MAX_IMAGE_SIZE_MB * 1024 * 1024
  if (file.size > maxBytes) return `حجم الصورة يجب أن لا يتجاوز ${MAX_IMAGE_SIZE_MB}MB`
  return ''
}

function validateLicense(value) {
  const trimmed = value.trim()
  if (!trimmed) return 'رقم الترخيص مطلوب'
  if (!/^[A-Za-z0-9-]{5,}$/.test(trimmed)) return 'رقم الترخيص غير صالح'
  return ''
}

function validateAgreement(value) {
  return value ? '' : 'يجب الموافقة على صحة البيانات'
}

function validateCardNumber(value) {
  if (!value) return 'رقم البطاقة مطلوب'
  if (value.length !== 16) return 'رقم البطاقة يجب أن يكون 16 رقمًا'
  return ''
}

function validateExpiryDate(value) {
  if (!value) return 'تاريخ الانتهاء مطلوب'
  if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(value)) return 'صيغة الانتهاء يجب أن تكون MM/YY'

  const [monthText, yearText] = value.split('/')
  const month = Number(monthText)
  const year = Number(`20${yearText}`)
  const now = new Date()
  const currentMonth = now.getMonth() + 1
  const currentYear = now.getFullYear()

  if (year < currentYear || (year === currentYear && month < currentMonth)) {
    return 'البطاقة منتهية الصلاحية'
  }

  return ''
}

function validateCvv(value) {
  if (!value) return 'CVV مطلوب'
  if (value.length < 3 || value.length > 4) return 'CVV يجب أن يكون 3 أو 4 أرقام'
  return ''
}

function validateBusinessForm(form, selectedPhoneCountry) {
  const isFreelance = form.registrationType === 'freelance'

  return {
    registrationType: validateRequiredOption(form.registrationType, 'نوع التسجيل'),
    businessName: validateTextRequired(form.businessName, isFreelance ? 'اسم الشخص' : 'الاسم التجاري', 3),
    contactEmail: isFreelance ? validateEmail(form.contactEmail) : '',
    registrationDate: isFreelance ? '' : validateDate(form.registrationDate),
    activity: validateRequiredOption(form.activity, 'النشاط'),
    countryIso: validateRequiredOption(form.countryIso, 'الدولة'),
    phone: validatePhone(sanitizePhone(form.phone), selectedPhoneCountry),
    platform: validateRequiredOption(form.platform, 'المنصة'),
    storeUrl: validateUrl(form.storeUrl, 'رابط المتجر'),
    adImage: validateImageFile(form.adImage),
    licenseNumber: isFreelance ? '' : validateLicense(form.licenseNumber),
    saudiStoreUrl: isFreelance ? '' : validateUrl(form.saudiStoreUrl, 'رابط المتجر السعودي للأعمال'),
    agreement: validateAgreement(form.agreement),
  }
}

function validatePaymentForm(form) {
  return {
    paymentMethod: validateRequiredOption(form.paymentMethod, 'طريقة الدفع'),
    cardHolderName: validateTextRequired(form.cardHolderName, 'اسم حامل البطاقة', 3),
    cardNumber: validateCardNumber(form.cardNumber),
    expiryDate: validateExpiryDate(form.expiryDate),
    cvv: validateCvv(form.cvv),
    billingEmail: validateEmail(form.billingEmail),
  }
}

function useAddAdWizard() {
  const [step, setStep] = useState(1)
  const [direction, setDirection] = useState(1)
  const [planCycle, setPlanCycle] = useState(DEFAULT_PLAN_CYCLE)
  const [selectedPlanKey, setSelectedPlanKey] = useState('')
  const [businessForm, setBusinessForm] = useState(INITIAL_BUSINESS_FORM)
  const [paymentForm, setPaymentForm] = useState(INITIAL_PAYMENT_FORM)
  const [businessTouched, setBusinessTouched] = useState({})
  const [paymentTouched, setPaymentTouched] = useState({})
  const [isPaying, setIsPaying] = useState(false)
  const [paymentSuccessOpen, setPaymentSuccessOpen] = useState(false)
  const timersRef = useRef([])

  const selectedPhoneCountry = useMemo(
    () => COUNTRIES.find((country) => country.isoCode === businessForm.phoneCountryIso) ?? COUNTRIES[0],
    [businessForm.phoneCountryIso],
  )

  const planOptions = useMemo(() => getAdPlanOptions(planCycle), [planCycle])

  const selectedPlan = useMemo(
    () => planOptions.find((plan) => plan.key === selectedPlanKey) ?? planOptions[0],
    [planOptions, selectedPlanKey],
  )

  const businessErrors = useMemo(
    () => validateBusinessForm(businessForm, selectedPhoneCountry),
    [businessForm, selectedPhoneCountry],
  )
  const paymentErrors = useMemo(() => validatePaymentForm(paymentForm), [paymentForm])

  const businessHasErrors = Object.values(businessErrors).some(Boolean)
  const paymentHasErrors = Object.values(paymentErrors).some(Boolean)

  useEffect(
    () => () => {
      timersRef.current.forEach((timer) => window.clearTimeout(timer))
    },
    [],
  )

  function resetWizard() {
    timersRef.current.forEach((timer) => window.clearTimeout(timer))
    timersRef.current = []
    setStep(1)
    setDirection(1)
    setPlanCycle(DEFAULT_PLAN_CYCLE)
    setSelectedPlanKey('')
    setBusinessForm(INITIAL_BUSINESS_FORM)
    setPaymentForm(INITIAL_PAYMENT_FORM)
    setBusinessTouched({})
    setPaymentTouched({})
    setIsPaying(false)
    setPaymentSuccessOpen(false)
  }

  function updateBusinessField(name, value) {
    if (name === 'registrationType') {
      setBusinessForm((prev) => ({
        ...prev,
        registrationType: value,
        registrationDate: value === 'freelance' ? '' : prev.registrationDate,
        licenseNumber: value === 'freelance' ? '' : prev.licenseNumber,
        saudiStoreUrl: value === 'freelance' ? '' : prev.saudiStoreUrl,
      }))
      return
    }

    setBusinessForm((prev) => ({
      ...prev,
      [name]: name === 'phone' ? sanitizePhone(value) : value,
    }))
  }

  function updatePaymentField(name, value) {
    let normalizedValue = value
    if (name === 'cardNumber') normalizedValue = normalizeCardDigits(value)
    if (name === 'cvv') normalizedValue = normalizeCvv(value)
    if (name === 'expiryDate') normalizedValue = normalizeExpiry(value)

    setPaymentForm((prev) => ({ ...prev, [name]: normalizedValue }))
  }

  function markBusinessTouched(name) {
    setBusinessTouched((prev) => ({ ...prev, [name]: true }))
  }

  function markPaymentTouched(name) {
    setPaymentTouched((prev) => ({ ...prev, [name]: true }))
  }

  function changePhoneCountry(countryIso) {
    setBusinessForm((prev) => ({ ...prev, phoneCountryIso: countryIso, phone: '' }))
    setBusinessTouched((prev) => ({ ...prev, phone: false }))
  }

  function openStep(nextStep) {
    setDirection(nextStep > step ? 1 : -1)
    setStep(nextStep)
  }

  function continueFromPlans() {
    if (!selectedPlanKey) return false
    openStep(2)
    return true
  }

  function continueFromBusiness() {
    setBusinessTouched(ALL_BUSINESS_TOUCHED)
    if (businessHasErrors) return false
    openStep(3)
    return true
  }

  function goBack() {
    if (step > 1) {
      openStep(step - 1)
    }
  }

  function submitPayment(onSuccessDone) {
    setPaymentTouched(ALL_PAYMENT_TOUCHED)
    if (paymentHasErrors) return false

    setIsPaying(true)
    const payTimer = window.setTimeout(() => {
      setIsPaying(false)
      setPaymentSuccessOpen(true)

      const successTimer = window.setTimeout(() => {
        setPaymentSuccessOpen(false)
        resetWizard()
        if (typeof onSuccessDone === 'function') onSuccessDone()
      }, 2000)
      timersRef.current.push(successTimer)
    }, 650)

    timersRef.current.push(payTimer)
    return true
  }

  return {
    step,
    direction,
    planCycle,
    planOptions,
    selectedPlan,
    selectedPlanKey,
    businessForm,
    paymentForm,
    businessErrors,
    paymentErrors,
    businessTouched,
    paymentTouched,
    selectedPhoneCountry,
    isPaying,
    paymentSuccessOpen,
    setPlanCycle,
    setSelectedPlanKey,
    updateBusinessField,
    updatePaymentField,
    markBusinessTouched,
    markPaymentTouched,
    changePhoneCountry,
    continueFromPlans,
    continueFromBusiness,
    goBack,
    submitPayment,
    resetWizard,
  }
}

export { useAddAdWizard }
