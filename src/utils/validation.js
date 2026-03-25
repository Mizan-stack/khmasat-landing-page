const ARABIC_NUMERALS = {
  '٠': '0',
  '١': '1',
  '٢': '2',
  '٣': '3',
  '٤': '4',
  '٥': '5',
  '٦': '6',
  '٧': '7',
  '٨': '8',
  '٩': '9',
}

export function normalizeDigits(value) {
  return value
    .split('')
    .map((char) => ARABIC_NUMERALS[char] ?? char)
    .join('')
}

export function sanitizeNumeric(value) {
  return normalizeDigits(value).replace(/\D/g, '')
}

export function sanitizePhone(value) {
  return sanitizeNumeric(value)
}

export function validateEmail(value) {
  if (!value.trim()) return 'البريد الإلكتروني مطلوب'
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
  if (!emailPattern.test(value.trim())) return 'صيغة البريد الإلكتروني غير صحيحة'
  return ''
}

export function validateName(value) {
  const trimmed = value.trim()
  if (!trimmed) return 'الاسم مطلوب'
  if (trimmed.length < 3) return 'الاسم يجب أن يكون 3 أحرف على الأقل'

  const validNamePattern = /^[\p{L}\s'-]+$/u
  if (!validNamePattern.test(trimmed)) return 'الاسم يحتوي على حروف غير مسموحة'

  return ''
}

export function validatePassword(value) {
  if (!value) return 'كلمة المرور مطلوبة'
  return ''
}

export function validatePhone(value, country) {
  if (!country) return 'اختر مفتاح الدولة أولاً'

  if (!value) return 'رقم الهاتف مطلوب'

  if (/^(\d)\1+$/.test(value)) {
    return 'رقم الهاتف غير واقعي'
  }

  if (value.startsWith('0')) {
    return 'اكتب الرقم بدون الصفر الأول بعد اختيار الدولة'
  }

  if (value.length < country.minLength || value.length > country.maxLength) {
    if (country.minLength === country.maxLength) {
      return `رقم ${country.name} يجب أن يكون ${country.minLength} أرقام`
    }
    return `رقم ${country.name} يجب أن يكون بين ${country.minLength} و${country.maxLength} أرقام`
  }

  return ''
}

export function validateOtpCode(value) {
  if (!value) return 'رمز التحقق مطلوب'
  if (value.length !== 6) return 'رمز التحقق يجب أن يكون 6 أرقام'
  return ''
}
