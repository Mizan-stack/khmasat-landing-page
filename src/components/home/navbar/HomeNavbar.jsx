import { NAV_LINKS } from './navbarData'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { FaGlobe } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import HomeThemeToggle from '../theme-toggle/HomeThemeToggle'

const MotionNav = motion.nav
const MotionDiv = motion.div
const MotionSpan = motion.span

function NavItem({ link, onClick, mobile = false }) {
  const className = mobile
    ? `block rounded-2xl px-3 py-2.5 text-base font-bold transition-colors ${
        link.accent
          ? 'bg-[var(--home-surface-soft)] text-[var(--home-accent)]'
          : 'text-[var(--home-text-primary)] hover:bg-[var(--home-surface-soft)] hover:text-[var(--home-accent)]'
      }`
    : `text-[1.05rem] font-bold transition-colors ${
        link.accent
          ? 'text-[var(--home-accent)]'
          : 'text-[var(--home-text-primary)] hover:text-[var(--home-accent)]'
      }`

  if (link.to) {
    return (
      <Link to={link.to} state={link.state} onClick={onClick} className={className}>
        {link.label}
      </Link>
    )
  }

  return (
    <a href={link.href} onClick={onClick} className={className}>
      {link.label}
    </a>
  )
}

function LanguageBadge() {
  return (
    <MotionSpan
      whileHover={{ y: -1, rotate: -8 }}
      whileTap={{ scale: 0.96 }}
      className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-[var(--home-nav-border)] bg-[var(--home-surface-soft)] text-lg text-[var(--home-text-primary)] shadow-[0_10px_22px_rgba(19,29,55,0.08)]"
      aria-label="العربية"
      title="العربية"
    >
      <FaGlobe />
    </MotionSpan>
  )
}

function HomeNavbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 36)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!mobileMenuOpen) return undefined
    const closeMenu = () => setMobileMenuOpen(false)
    window.addEventListener('resize', closeMenu)
    return () => window.removeEventListener('resize', closeMenu)
  }, [mobileMenuOpen])

  return (
    <header className="sticky top-2 z-40 px-3 md:px-6">
      <MotionNav
        initial={false}
        animate={{
          y: scrolled ? 0 : 10,
          scale: scrolled ? 0.985 : 1,
        }}
        transition={{ duration: 0.28, ease: 'easeOut' }}
        className={`mx-auto w-full max-w-[1320px] rounded-[22px] border px-4 py-3 transition-all duration-300 md:px-7 ${
          scrolled
            ? 'border-[var(--home-nav-border-scrolled)] bg-[var(--home-nav-bg-scrolled)] shadow-[0_22px_48px_rgba(19,29,55,0.22)] backdrop-blur-xl'
            : 'border-[var(--home-nav-border)] bg-[var(--home-nav-bg)] shadow-[0_14px_30px_rgba(19,29,55,0.12)]'
        }`}
      >
        <div className="flex items-center justify-between gap-4">
          <Link to="/" className="inline-flex items-center gap-3 text-[var(--home-text-primary)]">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--home-accent)] to-[var(--home-accent-2)] text-xl font-black text-white shadow-[0_10px_24px_rgba(33,143,185,0.24)]">
              ب
            </span>
            <span className="text-[1.55rem] font-black leading-none">بوابة الأعمال</span>
          </Link>

          <nav className="hidden items-center gap-6 xl:flex">
            {NAV_LINKS.map((link) => (
              <NavItem key={link.label} link={link} />
            ))}
          </nav>

          <div className="flex items-center gap-2 md:gap-3">
            <div className="hidden xl:block">
              <HomeThemeToggle />
            </div>

            <div className="hidden xl:block">
              <LanguageBadge />
            </div>

            <Link
              to="/login"
              state={{ direction: 1 }}
              className="hidden h-11 items-center justify-center rounded-2xl bg-[var(--home-accent)] px-6 text-base font-black text-white shadow-[0_12px_24px_rgba(61,181,180,0.32)] transition-transform hover:-translate-y-0.5 xl:inline-flex"
            >
              الدخول
            </Link>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--home-nav-border)] bg-[var(--home-surface-soft)] text-xl text-[var(--home-text-primary)] xl:hidden"
            >
              {mobileMenuOpen ? '×' : '☰'}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <MotionDiv
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="mt-4 space-y-2 rounded-2xl border border-[var(--home-nav-border)] bg-[var(--home-nav-bg)] p-3 xl:hidden"
            >
              <div className="mb-3 flex items-center justify-between gap-3 rounded-2xl bg-[var(--home-surface-soft)] p-2">
                <HomeThemeToggle />
                <LanguageBadge />
              </div>

              {NAV_LINKS.map((link) => (
                <NavItem key={link.label} link={link} onClick={() => setMobileMenuOpen(false)} mobile />
              ))}

              <Link
                to="/login"
                state={{ direction: 1 }}
                onClick={() => setMobileMenuOpen(false)}
                className="mt-2 inline-flex h-11 w-full items-center justify-center rounded-2xl bg-[var(--home-accent)] text-base font-black text-white"
              >
                الدخول
              </Link>
            </MotionDiv>
          )}
        </AnimatePresence>
      </MotionNav>
    </header>
  )
}

export default HomeNavbar
