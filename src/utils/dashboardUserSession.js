const DASHBOARD_USER_STORAGE_KEY = 'ads-dashboard-user-v1'

function normalizeWhitespace(value) {
  return value.trim().replace(/\s+/g, ' ')
}

function isLatinSegment(value) {
  return /[A-Za-z]/.test(value)
}

function formatSegment(segment) {
  if (!segment) return ''

  if (isLatinSegment(segment)) {
    return segment.charAt(0).toUpperCase() + segment.slice(1).toLowerCase()
  }

  return segment
}

function deriveDisplayNameFromEmail(email) {
  const localPart = email.split('@')[0] ?? ''
  const segments = localPart
    .replace(/[0-9]+/g, ' ')
    .split(/[._\-\s]+/)
    .map((segment) => normalizeWhitespace(segment.replace(/[^\p{L}\p{N}]/gu, '')))
    .filter(Boolean)

  if (segments.length === 0) {
    return email
  }

  return segments.slice(0, 2).map(formatSegment).join(' ')
}

function deriveDisplayNameFromPhone(phone) {
  const digits = phone.replace(/\D/g, '')
  if (!digits) return 'حساب المعلن'
  return `معلن ${digits.slice(-4)}`
}

function buildAvatarLabel(displayName) {
  const parts = normalizeWhitespace(displayName).split(' ').filter(Boolean)

  if (parts.length >= 2) {
    return `${parts[0].charAt(0)}${parts[1].charAt(0)}`.toUpperCase()
  }

  const compact = parts[0] ?? displayName
  return compact.slice(0, 2).toUpperCase()
}

function sanitizeDashboardUser(user) {
  if (!user || typeof user !== 'object') return null

  const displayName = typeof user.displayName === 'string' ? normalizeWhitespace(user.displayName) : ''
  const contactLabel = typeof user.contactLabel === 'string' ? normalizeWhitespace(user.contactLabel) : ''
  const avatarLabel = typeof user.avatarLabel === 'string' ? normalizeWhitespace(user.avatarLabel) : ''

  if (!displayName) return null

  return {
    displayName,
    contactLabel,
    avatarLabel: avatarLabel || buildAvatarLabel(displayName),
  }
}

function buildDashboardUser(form) {
  const email = normalizeWhitespace(form.email ?? '')
  const phone = normalizeWhitespace(form.phone ?? '')
  const contactLabel = email || phone || 'لوحة الإعلانات'
  const displayName = email ? deriveDisplayNameFromEmail(email) : deriveDisplayNameFromPhone(phone)

  return {
    displayName,
    contactLabel,
    avatarLabel: buildAvatarLabel(displayName),
  }
}

function saveDashboardUser(user) {
  if (typeof window === 'undefined') return

  const sanitized = sanitizeDashboardUser(user)
  if (!sanitized) return

  window.sessionStorage.setItem(DASHBOARD_USER_STORAGE_KEY, JSON.stringify(sanitized))
}

function getStoredDashboardUser() {
  if (typeof window === 'undefined') return null

  const value = window.sessionStorage.getItem(DASHBOARD_USER_STORAGE_KEY)
  if (!value) return null

  try {
    return sanitizeDashboardUser(JSON.parse(value))
  } catch {
    return null
  }
}

export { buildDashboardUser, getStoredDashboardUser, saveDashboardUser }
