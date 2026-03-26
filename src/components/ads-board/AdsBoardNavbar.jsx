import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useMemo, useRef, useState } from 'react'
import { FaBars, FaCalendarDays, FaClock, FaGlobe, FaMoon, FaSun, FaXmark } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import { useTheme } from '../../app/providers/useTheme'

const MotionHeader = motion.header
const MotionButton = motion.button
const MotionSpan = motion.span
const MotionDiv = motion.div

const THEME_OPTIONS = [
  { value: 'dark', label: 'الوضع الليلي', icon: FaMoon, rotate: -12 },
  { value: 'light', label: 'الوضع النهاري', icon: FaSun, rotate: 12 },
]

function formatDateTime(now) {
  const timeParts = new Intl.DateTimeFormat('ar-EG-u-nu-latn', {
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
    timeZone: 'Asia/Riyadh',
  }).formatToParts(now)

  const hour = timeParts.find((part) => part.type === 'hour')?.value ?? ''
  const minute = timeParts.find((part) => part.type === 'minute')?.value ?? ''
  const second = timeParts.find((part) => part.type === 'second')?.value ?? ''
  const meridiemLabel = timeParts.find((part) => part.type === 'dayPeriod')?.value.trim() ?? ''
  const timeLabel = [hour, minute, second].filter(Boolean).join(':')

  const dateLabel = new Intl.DateTimeFormat('ar-EG', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'Asia/Riyadh',
  }).format(now)

  return { timeLabel, meridiemLabel, dateLabel }
}

function DashboardThemeToggle() {
  const { isDark, setTheme } = useTheme()

  return (
    <div
      className="relative flex h-11 w-[108px] items-center rounded-full border border-[var(--ads-nav-soft-border)] bg-[var(--ads-nav-soft-bg)] p-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.22)]"
      aria-label="تبديل الوضع"
    >
      <MotionSpan
        layout
        animate={{
          x: isDark ? 0 : -50,
          rotate: isDark ? -8 : 8,
        }}
        transition={{ type: 'spring', stiffness: 340, damping: 26 }}
        className="absolute right-1 h-9 w-[48px] rounded-full [background:var(--ads-nav-avatar-bg)] shadow-[0_10px_22px_rgba(45,164,191,0.24)]"
      />

      {THEME_OPTIONS.map((option) => {
        const Icon = option.icon
        const isActive = isDark ? option.value === 'dark' : option.value === 'light'

        return (
          <MotionButton
            key={option.value}
            type="button"
            onClick={() => setTheme(option.value)}
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.94 }}
            animate={isActive ? { scale: [1, 1.08, 1], rotate: [0, option.rotate, 0] } : { scale: 1, rotate: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className={`relative z-10 flex h-9 w-[50px] items-center justify-center rounded-full text-base transition-colors ${
              isActive ? 'text-slate-950' : 'text-[var(--ads-muted)] hover:text-[var(--ads-nav-accent-text)]'
            }`}
            aria-label={option.label}
            title={option.label}
          >
            <Icon />
          </MotionButton>
        )
      })}
    </div>
  )
}

function DashboardLanguageButton() {
  return (
    <MotionButton
      type="button"
      whileHover={{ y: -1, rotate: -5 }}
      whileTap={{ scale: 0.96 }}
      className="inline-flex h-11 items-center gap-2 rounded-2xl border border-[var(--ads-nav-soft-border)] bg-[var(--ads-nav-soft-bg)] px-3 text-sm font-bold text-[var(--ads-text)] shadow-[0_12px_24px_rgba(18,34,62,0.08)]"
      aria-label="اللغة الحالية العربية"
      title="العربية"
    >
      <FaGlobe className="text-[var(--ads-nav-accent-text)]" />
      <span>AR</span>
    </MotionButton>
  )
}

function DashboardUserBadge({ user, className = '' }) {
  const displayName = user?.displayName || 'حساب المعلن'
  const avatarLabel = user?.avatarLabel || 'BA'

  return (
    <motion.div
      whileHover={{ y: -2 }}
      className={`inline-flex items-center gap-3 rounded-[22px] border border-[var(--ads-nav-soft-border)] bg-[var(--ads-nav-soft-bg)] px-3 py-2.5 text-right shadow-[0_12px_24px_rgba(18,34,62,0.08)] ${className}`}
    >
      <div className="min-w-0">
        <p className="truncate text-sm font-black text-[var(--ads-text)] md:max-w-[180px]">{displayName}</p>
      </div>

      <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl p-[2px] [background:var(--ads-nav-avatar-bg)] shadow-[0_12px_24px_rgba(38,110,205,0.24)]">
        <div className="flex h-full w-full items-center justify-center rounded-[15px] border border-white/15 bg-[var(--ads-surface)] text-sm font-black text-[var(--ads-text)]">
          {avatarLabel}
        </div>
        <span className="absolute bottom-0.5 right-0.5 h-3.5 w-3.5 rounded-full border-2 border-[var(--ads-nav-soft-bg)] bg-emerald-400" />
      </div>
    </motion.div>
  )
}

function BrandBlock() {
  return (
    <Link to="/" className="inline-flex items-center gap-3 text-[var(--ads-text)]">
      <span className="flex h-12 w-12 items-center justify-center rounded-2xl text-xl font-black text-white shadow-[0_12px_26px_rgba(54,160,202,0.24)] [background:var(--ads-nav-avatar-bg)]">
        ب
      </span>
      <span className="text-[1.45rem] font-black leading-none md:text-[1.65rem]">بوابة الأعمال</span>
    </Link>
  )
}

function DateTimeBadge({ now, stacked = false }) {
  const { timeLabel, meridiemLabel, dateLabel } = useMemo(() => formatDateTime(now), [now])

  return (
    <div className={`flex gap-2 md:gap-3 ${stacked ? 'flex-col items-stretch' : 'flex-wrap items-center'}`}>
      <motion.div
        whileHover={{ y: -2 }}
        className="inline-flex h-14 items-center gap-2 rounded-2xl border border-[var(--ads-nav-soft-border)] bg-[var(--ads-nav-soft-bg)] px-3 text-[var(--ads-text)] shadow-[0_12px_24px_rgba(18,34,62,0.08)]"
      >
        <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[var(--ads-create-bg)] text-[0.82rem] text-[var(--ads-text)]">
          <FaClock />
        </span>
        <div className="flex items-center gap-1.5">
          <span className="rounded-lg border border-[var(--ads-nav-soft-border)] bg-[var(--ads-surface)] px-1.5 py-1 text-[0.68rem] font-black text-[var(--ads-muted)]">
            {meridiemLabel}
          </span>
          <span
            dir="ltr"
            className="rounded-xl border border-[var(--ads-nav-soft-border)] bg-[var(--ads-surface)] px-2.5 py-1 text-[0.94rem] font-black tracking-[0.06em] tabular-nums text-[var(--ads-text)] md:text-[1rem]"
          >
            {timeLabel}
          </span>
        </div>
      </motion.div>

      <motion.div
        whileHover={{ y: -2 }}
        className="inline-flex h-14 items-center gap-2 rounded-2xl border border-[var(--ads-nav-soft-border)] bg-[var(--ads-nav-soft-bg)] px-3 text-[var(--ads-text)] shadow-[0_12px_24px_rgba(18,34,62,0.08)]"
      >
        <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[var(--ads-button-primary-bg)] text-[0.82rem] text-[var(--ads-text)]">
          <FaCalendarDays />
        </span>
        <p className="text-[0.92rem] font-black leading-none md:text-[0.98rem]">{dateLabel}</p>
      </motion.div>
    </div>
  )
}

function MobileMenuButton({ isOpen, onClick }) {
  return (
    <MotionButton
      type="button"
      whileTap={{ scale: 0.96 }}
      onClick={onClick}
      className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-[var(--ads-nav-soft-border)] bg-[var(--ads-nav-soft-bg)] text-[1.05rem] text-[var(--ads-text)] shadow-[0_12px_24px_rgba(18,34,62,0.08)]"
      aria-label={isOpen ? 'إغلاق القائمة' : 'فتح القائمة'}
      title={isOpen ? 'إغلاق القائمة' : 'فتح القائمة'}
    >
      {isOpen ? <FaXmark /> : <FaBars />}
    </MotionButton>
  )
}

function MobileMenuPanel({ now, user }) {
  return (
    <MotionDiv
      initial={{ opacity: 0, height: 0, y: -6 }}
      animate={{ opacity: 1, height: 'auto', y: 0 }}
      exit={{ opacity: 0, height: 0, y: -6 }}
      transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
      className="overflow-hidden md:hidden"
    >
      <div className="mt-4 space-y-3 border-t border-[var(--ads-nav-soft-border)] pt-4">
        <DateTimeBadge now={now} stacked />

        <div className="flex flex-wrap items-center gap-2">
          <DashboardThemeToggle />
          <DashboardLanguageButton />
        </div>

        <DashboardUserBadge user={user} className="w-full justify-between" />
      </div>
    </MotionDiv>
  )
}

function AdsBoardNavbar({ user }) {
  const [now, setNow] = useState(() => new Date())
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const navbarRef = useRef(null)

  useEffect(() => {
    const intervalId = window.setInterval(() => setNow(new Date()), 1000)
    return () => window.clearInterval(intervalId)
  }, [])

  useEffect(() => {
    if (!isMobileMenuOpen) return undefined

    function handleOutsideClick(event) {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false)
      }
    }

    function handleEscape(event) {
      if (event.key === 'Escape') setIsMobileMenuOpen(false)
    }

    document.addEventListener('mousedown', handleOutsideClick)
    window.addEventListener('keydown', handleEscape)

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
      window.removeEventListener('keydown', handleEscape)
    }
  }, [isMobileMenuOpen])

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <header className="sticky top-2 z-40 px-3 md:px-6">
      <MotionHeader
        ref={navbarRef}
        initial={{ opacity: 0, y: -18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
        dir="rtl"
        style={{ boxShadow: '0 18px 44px var(--ads-nav-shadow)' }}
        className="mx-auto w-full max-w-[1320px] rounded-[26px] border border-[var(--ads-nav-border)] bg-[var(--ads-nav-bg)] px-4 py-3 backdrop-blur-xl md:px-6"
      >
        <div className="flex items-center justify-between md:hidden">
          <BrandBlock />
          <MobileMenuButton isOpen={isMobileMenuOpen} onClick={() => setIsMobileMenuOpen((prev) => !prev)} />
        </div>

        <AnimatePresence initial={false}>
          {isMobileMenuOpen ? <MobileMenuPanel now={now} user={user} /> : null}
        </AnimatePresence>

        <div className="hidden gap-4 md:flex md:flex-col xl:flex-row xl:items-center xl:justify-between">
          <div className="flex flex-col gap-3 xl:flex-row xl:items-center">
            <BrandBlock />
            <DateTimeBadge now={now} />
          </div>

          <div className="flex flex-wrap items-center gap-2 md:gap-3">
            <DashboardThemeToggle />
            <DashboardLanguageButton />
            <DashboardUserBadge user={user} />
          </div>
        </div>
      </MotionHeader>
    </header>
  )
}

export default AdsBoardNavbar
