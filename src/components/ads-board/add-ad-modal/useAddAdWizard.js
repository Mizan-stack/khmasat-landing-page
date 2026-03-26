import { useEffect, useMemo, useRef, useState } from 'react'
import { COUNTRIES, DEFAULT_COUNTRY } from '../../../constants/countries'
import { normalizeDigits, sanitizePhone, validateEmail, validatePhone } from '../../../utils/validation'
import {
  DEFAULT_AD_PLAN_KEY,
  DEFAULT_PLAN_CYCLE,
  PROMO_COUPONS,
  getAdPlanOptions,
} from './addAdModalData'

const IMAGE_FIELD_NAMES = ['adImage', 'documentImage']
const VAT_RATE = 0.15

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
  documentNumber: '',
  documentImage: null,
  saudiStoreUrl: '',
  agreement: false,
}

const INITIAL_PAYMENT_FORM = {
  paymentMethod: 'visa',
  couponCode: '',
  appliedCouponCode: '',
  cardHolderName: '',
  cardNumber: '',
  expiryDate: '',
  cvv: '',
  billingEmail: '',
  billingPhone: '',
  payerName: '',
  nationalId: '',
  bankName: '',
  bankReference: '',
  transferDate: '',
}

const INITIAL_COUPON_FEEDBACK = {
  type: 'idle',
  message: '',
}

const INITIAL_FILE_UPLOAD_PROGRESS = {
  adImage: 0,
  documentImage: 0,
}

const INITIAL_FILE_UPLOAD_LOADING = {
  adImage: false,
  documentImage: false,
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
  documentNumber: true,
  documentImage: true,
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
  billingPhone: true,
  payerName: true,
  nationalId: true,
  bankName: true,
  bankReference: true,
  transferDate: true,
}

const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp']
const MAX_IMAGE_SIZE_MB = 5
const INSTALLMENT_METHODS = ['tabby', 'tamara']
const CARD_METHODS = ['visa', 'mastercard', 'mada']

function roundCurrency(value) {
  return Math.round(value * 100) / 100
}

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

function normalizePaymentPhone(value) {
  return sanitizePhone(value).slice(0, 15)
}

function normalizeNationalId(value) {
  return normalizeDigits(value).replace(/\D/g, '').slice(0, 10)
}

function normalizeCouponCode(value) {
  return value.toUpperCase().replace(/\s+/g, '').slice(0, 24)
}

function validateTextRequired(value, label, minLength = 2) {
  const trimmed = value.trim()
  if (!trimmed) return `${label} مطلوب`
  if (trimmed.length < minLength) return `${label} يجب أن يكون ${minLength} أحرف على الأقل`
  return ''
}

function validateDate(value) {
  if (!value) return 'تاريخ التسجيل مطلوب'
  const selected = new Date(value)
  if (Number.isNaN(selected.getTime())) return 'صيغة التاريخ غير صحيحة'

  const today = new Date()
  if (selected > today) return 'لا يمكن اختيار تاريخ في المستقبل'

  return ''
}

function validateTransferDate(value) {
  if (!value) return 'تاريخ التحويل مطلوب'
  const selected = new Date(value)
  if (Number.isNaN(selected.getTime())) return 'صيغة تاريخ التحويل غير صحيحة'

  const today = new Date()
  if (selected > today) return 'لا يمكن إدخال تاريخ تحويل في المستقبل'

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

function validateImageFile(file, label = 'الصورة') {
  if (!file) return `${label} مطلوبة`
  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) return `${label} يجب أن تكون JPG أو PNG أو WEBP`
  const maxBytes = MAX_IMAGE_SIZE_MB * 1024 * 1024
  if (file.size > maxBytes) return `حجم ${label} يجب ألا يتجاوز ${MAX_IMAGE_SIZE_MB}MB`
  return ''
}

function validateLicense(value, label) {
  const trimmed = value.trim()
  if (!trimmed) return `${label} مطلوب`
  if (!/^[A-Za-z0-9-]{5,}$/.test(trimmed)) return `${label} غير صالح`
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

function validateGeneralPhone(value, label) {
  const digits = normalizeDigits(value).replace(/\D/g, '')
  if (!digits) return `${label} مطلوب`
  if (digits.length < 8 || digits.length > 15) return `${label} يجب أن يكون بين 8 و15 رقمًا`
  return ''
}

function validateNationalId(value) {
  const digits = normalizeDigits(value).replace(/\D/g, '')
  if (!digits) return 'رقم الهوية أو الإقامة مطلوب'
  if (digits.length !== 10) return 'رقم الهوية أو الإقامة يجب أن يكون 10 أرقام'
  return ''
}

function validateBankReference(value) {
  const trimmed = value.trim()
  if (!trimmed) return 'رقم مرجع التحويل مطلوب'
  if (trimmed.length < 4) return 'رقم المرجع يجب أن يكون 4 خانات على الأقل'
  return ''
}

function findCouponByCode(code) {
  return PROMO_COUPONS.find((coupon) => coupon.code === code) ?? null
}

function getCouponRejectionMessage(coupon, selectedPlan) {
  if (!coupon) return 'كوبون الخصم غير صالح'
  if ((selectedPlan?.priceValue ?? 0) <= 0) return 'هذه الباقة لا تحتاج إلى كوبون خصم'
  if (coupon.allowedPlans && !coupon.allowedPlans.includes(selectedPlan.key)) {
    return 'هذا الكوبون غير متاح لهذه الباقة'
  }
  if (coupon.allowedCycles && !coupon.allowedCycles.includes(selectedPlan.cycleKey)) {
    return 'هذا الكوبون غير متاح لدورة الدفع الحالية'
  }
  return ''
}

function calculateCouponDiscount(subtotal, coupon) {
  if (!coupon || subtotal <= 0) return 0
  if (coupon.type === 'percent') {
    return roundCurrency((subtotal * coupon.amount) / 100)
  }
  return Math.min(subtotal, coupon.amount)
}

function buildPaymentSummary(selectedPlan, appliedCoupon) {
  const subtotal = selectedPlan?.priceValue ?? 0
  const discount = calculateCouponDiscount(subtotal, appliedCoupon)
  const discountedSubtotal = Math.max(0, subtotal - discount)
  const vat = discountedSubtotal > 0 ? roundCurrency(discountedSubtotal * VAT_RATE) : 0
  const total = roundCurrency(discountedSubtotal + vat)

  return {
    subtotal,
    discount,
    discountedSubtotal,
    vat,
    total,
    installmentAmount: total > 0 ? roundCurrency(total / 4) : 0,
  }
}

function validateBusinessForm(form, selectedPhoneCountry, fileUploadLoading) {
  const isFreelance = form.registrationType === 'freelance'
  const documentImageLabel = isFreelance ? 'صورة وثيقة العمل الحر' : 'صورة السجل التجاري'

  return {
    registrationType: validateRequiredOption(form.registrationType, 'نوع التسجيل'),
    businessName: validateTextRequired(form.businessName, isFreelance ? 'اسم الشخص' : 'الاسم التجاري', 3),
    contactEmail: isFreelance ? validateEmail(form.contactEmail) : '',
    registrationDate: isFreelance ? '' : validateDate(form.registrationDate),
    activity: validateRequiredOption(form.activity, 'النشاط'),
    countryIso: validateRequiredOption(form.countryIso, 'الدولة'),
    phone: validatePhone(sanitizePhone(form.phone), selectedPhoneCountry),
    platform: validateRequiredOption(form.platform, 'المنصة'),
    storeUrl: isFreelance ? '' : validateUrl(form.storeUrl, 'رابط المتجر'),
    adImage: fileUploadLoading.adImage ? 'جارٍ تحميل صورة الإعلان...' : validateImageFile(form.adImage, 'صورة الإعلان'),
    licenseNumber: isFreelance ? '' : validateLicense(form.licenseNumber, 'رقم السجل التجاري'),
    documentNumber: isFreelance ? validateLicense(form.documentNumber, 'رقم الوثيقة') : '',
    documentImage: fileUploadLoading.documentImage
      ? `جارٍ تحميل ${documentImageLabel}...`
      : validateImageFile(form.documentImage, documentImageLabel),
    saudiStoreUrl: isFreelance ? '' : validateUrl(form.saudiStoreUrl, 'رابط المتجر السعودي للأعمال'),
    agreement: validateAgreement(form.agreement),
  }
}

function validatePaymentForm(form, paymentSummary) {
  const errors = {
    paymentMethod: '',
    cardHolderName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    billingEmail: '',
    billingPhone: '',
    payerName: '',
    nationalId: '',
    bankName: '',
    bankReference: '',
    transferDate: '',
  }

  errors.billingEmail = validateEmail(form.billingEmail)

  if (paymentSummary.total <= 0) {
    return errors
  }

  errors.paymentMethod = validateRequiredOption(form.paymentMethod, 'طريقة الدفع')

  if (CARD_METHODS.includes(form.paymentMethod)) {
    errors.cardHolderName = validateTextRequired(form.cardHolderName, 'اسم حامل البطاقة', 3)
    errors.cardNumber = validateCardNumber(form.cardNumber)
    errors.expiryDate = validateExpiryDate(form.expiryDate)
    errors.cvv = validateCvv(form.cvv)
    return errors
  }

  if (form.paymentMethod === 'applePay') {
    errors.payerName = validateTextRequired(form.payerName, 'الاسم الكامل', 3)
    errors.billingPhone = validateGeneralPhone(form.billingPhone, 'رقم الجوال')
    return errors
  }

  if (form.paymentMethod === 'bankTransfer') {
    errors.payerName = validateTextRequired(form.payerName, 'اسم المحول', 3)
    errors.bankName = validateTextRequired(form.bankName, 'اسم البنك', 2)
    errors.bankReference = validateBankReference(form.bankReference)
    errors.transferDate = validateTransferDate(form.transferDate)
    return errors
  }

  if (INSTALLMENT_METHODS.includes(form.paymentMethod)) {
    errors.payerName = validateTextRequired(form.payerName, 'الاسم الكامل', 3)
    errors.billingPhone = validateGeneralPhone(form.billingPhone, 'رقم الجوال')
    errors.nationalId = validateNationalId(form.nationalId)
    return errors
  }

  return errors
}

function useAddAdWizard() {
  const [step, setStep] = useState(1)
  const [direction, setDirection] = useState(1)
  const [planCycle, setPlanCycle] = useState(DEFAULT_PLAN_CYCLE)
  const [selectedPlanKey, setSelectedPlanKey] = useState(DEFAULT_AD_PLAN_KEY)
  const [businessForm, setBusinessForm] = useState(INITIAL_BUSINESS_FORM)
  const [paymentForm, setPaymentForm] = useState(INITIAL_PAYMENT_FORM)
  const [couponFeedback, setCouponFeedback] = useState(INITIAL_COUPON_FEEDBACK)
  const [businessTouched, setBusinessTouched] = useState({})
  const [paymentTouched, setPaymentTouched] = useState({})
  const [fileUploadProgress, setFileUploadProgress] = useState(INITIAL_FILE_UPLOAD_PROGRESS)
  const [fileUploadLoading, setFileUploadLoading] = useState(INITIAL_FILE_UPLOAD_LOADING)
  const [isPaying, setIsPaying] = useState(false)
  const [paymentSuccessOpen, setPaymentSuccessOpen] = useState(false)
  const timersRef = useRef([])
  const fileReadersRef = useRef({})
  const fileProgressIntervalsRef = useRef({})

  const selectedPhoneCountry = useMemo(
    () => COUNTRIES.find((country) => country.isoCode === businessForm.phoneCountryIso) ?? COUNTRIES[0],
    [businessForm.phoneCountryIso],
  )

  const planOptions = useMemo(() => getAdPlanOptions(planCycle), [planCycle])

  const selectedPlan = useMemo(
    () => planOptions.find((plan) => plan.key === selectedPlanKey) ?? planOptions[0],
    [planOptions, selectedPlanKey],
  )

  const appliedCoupon = useMemo(
    () => findCouponByCode(paymentForm.appliedCouponCode),
    [paymentForm.appliedCouponCode],
  )

  const paymentSummary = useMemo(
    () => buildPaymentSummary(selectedPlan, appliedCoupon),
    [selectedPlan, appliedCoupon],
  )

  const businessErrors = useMemo(
    () => validateBusinessForm(businessForm, selectedPhoneCountry, fileUploadLoading),
    [businessForm, selectedPhoneCountry, fileUploadLoading],
  )
  const paymentErrors = useMemo(
    () => validatePaymentForm(paymentForm, paymentSummary),
    [paymentForm, paymentSummary],
  )

  const businessHasErrors = Object.values(businessErrors).some(Boolean)
  const paymentHasErrors = Object.values(paymentErrors).some(Boolean)

  useEffect(
    () => () => {
      timersRef.current.forEach((timer) => window.clearTimeout(timer))
      Object.values(fileProgressIntervalsRef.current).forEach((intervalId) => window.clearInterval(intervalId))
      Object.values(fileReadersRef.current).forEach((reader) => {
        if (reader?.readyState === FileReader.LOADING) reader.abort()
      })
    },
    [],
  )

  useEffect(() => {
    if (!paymentForm.appliedCouponCode) return

    const rejectionMessage = getCouponRejectionMessage(appliedCoupon, selectedPlan)
    if (!rejectionMessage) return

    setPaymentForm((prev) => ({
      ...prev,
      couponCode: '',
      appliedCouponCode: '',
    }))
    setCouponFeedback({
      type: 'info',
      message: 'تمت إزالة الكوبون لأن الباقة أو دورة الدفع تغيرت',
    })
  }, [appliedCoupon, paymentForm.appliedCouponCode, selectedPlan])

  function clearFileProgressInterval(fieldName) {
    const intervalId = fileProgressIntervalsRef.current[fieldName]
    if (intervalId) {
      window.clearInterval(intervalId)
      delete fileProgressIntervalsRef.current[fieldName]
    }
  }

  function abortFileReader(fieldName) {
    const reader = fileReadersRef.current[fieldName]
    if (reader?.readyState === FileReader.LOADING) reader.abort()
    delete fileReadersRef.current[fieldName]
  }

  function resetFileUploadState(fieldName) {
    abortFileReader(fieldName)
    clearFileProgressInterval(fieldName)
    setFileUploadLoading((prev) => ({ ...prev, [fieldName]: false }))
    setFileUploadProgress((prev) => ({ ...prev, [fieldName]: 0 }))
  }

  function handleFileFieldChange(fieldName, file) {
    abortFileReader(fieldName)
    clearFileProgressInterval(fieldName)

    setBusinessForm((prev) => ({ ...prev, [fieldName]: file }))
    setFileUploadProgress((prev) => ({ ...prev, [fieldName]: 0 }))
    setFileUploadLoading((prev) => ({ ...prev, [fieldName]: false }))

    if (!file) return

    if (validateImageFile(file)) return

    setFileUploadLoading((prev) => ({ ...prev, [fieldName]: true }))

    fileProgressIntervalsRef.current[fieldName] = window.setInterval(() => {
      setFileUploadProgress((prev) => ({
        ...prev,
        [fieldName]: prev[fieldName] >= 90 ? prev[fieldName] : prev[fieldName] + 8,
      }))
    }, 100)

    const reader = new FileReader()
    fileReadersRef.current[fieldName] = reader

    reader.onprogress = (event) => {
      if (!event.lengthComputable) return

      const progress = Math.min(95, Math.round((event.loaded / event.total) * 100))
      setFileUploadProgress((prev) => ({
        ...prev,
        [fieldName]: Math.max(prev[fieldName], progress),
      }))
    }

    reader.onload = () => {
      clearFileProgressInterval(fieldName)
      delete fileReadersRef.current[fieldName]
      setFileUploadProgress((prev) => ({ ...prev, [fieldName]: 100 }))

      const completionTimer = window.setTimeout(() => {
        setFileUploadLoading((prev) => ({ ...prev, [fieldName]: false }))
      }, 180)

      timersRef.current.push(completionTimer)
    }

    reader.onerror = () => {
      resetFileUploadState(fieldName)
    }

    reader.onabort = () => {
      resetFileUploadState(fieldName)
    }

    reader.readAsArrayBuffer(file)
  }

  function resetWizard() {
    timersRef.current.forEach((timer) => window.clearTimeout(timer))
    timersRef.current = []
    IMAGE_FIELD_NAMES.forEach(resetFileUploadState)
    setStep(1)
    setDirection(1)
    setPlanCycle(DEFAULT_PLAN_CYCLE)
    setSelectedPlanKey(DEFAULT_AD_PLAN_KEY)
    setBusinessForm(INITIAL_BUSINESS_FORM)
    setPaymentForm(INITIAL_PAYMENT_FORM)
    setCouponFeedback(INITIAL_COUPON_FEEDBACK)
    setBusinessTouched({})
    setPaymentTouched({})
    setFileUploadProgress(INITIAL_FILE_UPLOAD_PROGRESS)
    setFileUploadLoading(INITIAL_FILE_UPLOAD_LOADING)
    setIsPaying(false)
    setPaymentSuccessOpen(false)
  }

  function updateBusinessField(name, value) {
    if (name === 'registrationType') {
      resetFileUploadState('documentImage')
      setBusinessTouched((prev) => ({
        ...prev,
        registrationDate: false,
        storeUrl: false,
        licenseNumber: false,
        documentNumber: false,
        documentImage: false,
        saudiStoreUrl: false,
      }))
      setBusinessForm((prev) => ({
        ...prev,
        registrationType: value,
        registrationDate: value === 'freelance' ? '' : prev.registrationDate,
        storeUrl: value === 'freelance' ? '' : prev.storeUrl,
        licenseNumber: value === 'freelance' ? '' : prev.licenseNumber,
        documentNumber: value === 'freelance' ? prev.documentNumber : '',
        documentImage: null,
        saudiStoreUrl: value === 'freelance' ? '' : prev.saudiStoreUrl,
      }))
      return
    }

    if (IMAGE_FIELD_NAMES.includes(name)) {
      handleFileFieldChange(name, value)
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
    if (name === 'billingPhone') normalizedValue = normalizePaymentPhone(value)
    if (name === 'nationalId') normalizedValue = normalizeNationalId(value)
    if (name === 'couponCode') normalizedValue = normalizeCouponCode(value)
    if (name === 'bankReference') normalizedValue = value.toUpperCase().slice(0, 24)

    if (name === 'couponCode') {
      setCouponFeedback(INITIAL_COUPON_FEEDBACK)
    }

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

  function applyCoupon() {
    const couponCode = normalizeCouponCode(paymentForm.couponCode)
    if (!couponCode) {
      setCouponFeedback({
        type: 'error',
        message: 'اكتب كوبون الخصم أولًا',
      })
      return false
    }

    const coupon = findCouponByCode(couponCode)
    const rejectionMessage = getCouponRejectionMessage(coupon, selectedPlan)

    if (rejectionMessage) {
      setCouponFeedback({
        type: 'error',
        message: rejectionMessage,
      })
      return false
    }

    setPaymentForm((prev) => ({
      ...prev,
      couponCode,
      appliedCouponCode: couponCode,
    }))
    setCouponFeedback({
      type: 'success',
      message: `تم تطبيق ${coupon.label}`,
    })
    return true
  }

  function removeCoupon() {
    setPaymentForm((prev) => ({
      ...prev,
      couponCode: '',
      appliedCouponCode: '',
    }))
    setCouponFeedback({
      type: 'info',
      message: 'تم حذف كوبون الخصم',
    })
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

    setPaymentForm((prev) => ({
      ...prev,
      billingEmail: prev.billingEmail || businessForm.contactEmail || '',
      billingPhone: prev.billingPhone || businessForm.phone || '',
      payerName: prev.payerName || businessForm.businessName || '',
      cardHolderName: prev.cardHolderName || businessForm.businessName || '',
    }))

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
    paymentSummary,
    appliedCoupon,
    couponFeedback,
    businessErrors,
    paymentErrors,
    businessTouched,
    paymentTouched,
    fileUploadProgress,
    fileUploadLoading,
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
    applyCoupon,
    removeCoupon,
    continueFromPlans,
    continueFromBusiness,
    goBack,
    submitPayment,
    resetWizard,
  }
}

export { useAddAdWizard }
