import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import HomeThemeToggle from './HomeThemeToggle'

const NAV_LINKS = [
  { label: 'الرئيسية', href: '#home' },
  { label: 'من نحن', href: '#about' },
  { label: 'لماذا نحن', href: '#why-us' },
  { label: 'الحلول', href: '#solutions' },
  { label: 'أعمالنا', href: '#works' },
  { label: 'تواصل معنا', href: '#contact' },
]

const MotionNav = motion.nav
const MotionDiv = motion.div

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
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 md:gap-3">
            <Link
              to="/login"
              state={{ direction: 1 }}
              className="hidden h-11 items-center justify-center rounded-xl bg-[var(--home-accent)] px-6 text-base font-black text-white shadow-[0_10px_20px_rgba(61,181,180,0.35)] transition-transform hover:-translate-y-0.5 md:inline-flex"
            >
              تسجيل الدخول
            </Link>

            <div className="hidden md:block">
              <HomeThemeToggle />
            </div>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--home-nav-border)] bg-[var(--home-surface-soft)] text-xl text-[var(--home-text-primary)] lg:hidden"
            >
              {mobileMenuOpen ? '×' : '☰'}
            </button>
          </div>

          <nav className="hidden items-center gap-7 lg:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`text-lg font-bold transition-colors ${
                  link.label === 'الرئيسية'
                    ? 'text-[var(--home-accent)]'
                    : 'text-[var(--home-text-primary)] hover:text-[var(--home-accent)]'
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="inline-flex items-center gap-2 text-[var(--home-text-primary)]">
            <span className="text-3xl leading-none">◍</span>
            <span className="text-2xl font-black">Logo</span>
          </div>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <MotionDiv
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="mt-4 space-y-2 rounded-2xl border border-[var(--home-nav-border)] bg-[var(--home-nav-bg)] p-3 lg:hidden"
            >
              <div className="mb-3">
                <HomeThemeToggle />
              </div>

              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block rounded-xl px-3 py-2 text-base font-bold text-[var(--home-text-primary)] transition-colors hover:bg-[var(--home-surface-soft)] hover:text-[var(--home-accent)]"
                >
                  {link.label}
                </a>
              ))}

              <Link
                to="/login"
                state={{ direction: 1 }}
                onClick={() => setMobileMenuOpen(false)}
                className="mt-2 inline-flex h-11 w-full items-center justify-center rounded-xl bg-[var(--home-accent)] text-base font-black text-white"
              >
                تسجيل الدخول
              </Link>
            </MotionDiv>
          )}
        </AnimatePresence>
      </MotionNav>
    </header>
  )
}

export default HomeNavbar
