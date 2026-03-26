import { motion } from 'framer-motion'
import { useState } from 'react'
import { FaArrowLeftLong } from 'react-icons/fa6'
import { FOOTER_CONTENT, FOOTER_LINKS, FOOTER_SOCIALS } from './footerData'

const MotionSection = motion.section
const MotionSpan = motion.span

function HomeFooterSection() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle')

  function handleSubmit(event) {
    event.preventDefault()
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())
    setStatus(isValid ? 'success' : 'error')
    if (isValid) setEmail('')
  }

  return (
    <MotionSection
      id="footer"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.55 }}
      className="w-full"
    >
      <footer className="relative overflow-hidden border-t border-[var(--home-footer-border)] [background:var(--home-footer-bg)]">
        <MotionSpan
          aria-hidden
          animate={{ x: [0, 46, 0], y: [0, -20, 0], opacity: [0.2, 0.45, 0.2] }}
          transition={{ duration: 8.6, repeat: Infinity, ease: 'easeInOut' }}
          className="pointer-events-none absolute -left-20 top-8 h-72 w-72 rounded-full [background:var(--home-footer-glow)] blur-3xl"
        />
        <MotionSpan
          aria-hidden
          animate={{ x: [0, -40, 0], y: [0, 26, 0], opacity: [0.15, 0.4, 0.15] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          className="pointer-events-none absolute -bottom-20 right-[-100px] h-80 w-80 rounded-full [background:var(--home-footer-glow)] blur-3xl"
        />

        <div className="relative z-10 w-full px-4 pb-7 pt-10 md:px-8 md:pt-16 lg:px-12">
          <div className="grid gap-10 lg:grid-cols-[1fr_0.85fr_1.1fr]" dir="rtl">
            <motion.div
              initial={{ opacity: 0, x: 34, filter: 'blur(7px)' }}
              whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.5 }}
              className="text-right"
            >
              <h3 className="text-[clamp(1.5rem,2.5vw,2.7rem)] font-black leading-tight text-[var(--home-footer-title)]">
                {FOOTER_CONTENT.brandName}
              </h3>
              <p className="mt-3 max-w-xl text-[clamp(0.92rem,1.05vw,1.1rem)] leading-relaxed text-[var(--home-footer-text)]">
                {FOOTER_CONTENT.brandDescription}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.5, delay: 0.07 }}
              className="text-right"
            >
              <h4 className="text-[clamp(1.25rem,1.9vw,2rem)] font-black text-[var(--home-footer-title)]">{FOOTER_CONTENT.linksTitle}</h4>
              <ul className="mt-4 grid grid-cols-2 justify-items-start gap-x-6 gap-y-2">
                {FOOTER_LINKS.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="inline-flex text-[clamp(0.92rem,1.05vw,1.1rem)] font-bold text-[var(--home-footer-link)] transition-all duration-300 hover:translate-x-[-4px] hover:text-[var(--home-footer-link-hover)]"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -34, filter: 'blur(7px)' }}
              whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.5, delay: 0.12 }}
              className="text-right"
            >
              <h4 className="text-[clamp(1.25rem,1.9vw,2rem)] font-black text-[var(--home-footer-title)]">{FOOTER_CONTENT.newsletterTitle}</h4>
              <p className="mt-3 max-w-xl text-[clamp(0.92rem,1.05vw,1.05rem)] text-[var(--home-footer-text)]">
                {FOOTER_CONTENT.newsletterDescription}
              </p>

              <form onSubmit={handleSubmit} className="mt-6">
                <div
                  dir="ltr"
                  className="flex overflow-hidden rounded-2xl border border-[var(--home-footer-input-border)] bg-[var(--home-footer-input-bg)] shadow-[0_14px_32px_rgba(13,39,46,0.2)]"
                >
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative inline-flex h-14 w-16 items-center justify-center bg-[var(--home-footer-submit-bg)] text-2xl text-[var(--home-footer-submit-text)]"
                    aria-label={FOOTER_CONTENT.submitAriaLabel}
                  >
                    <motion.span
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.1, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      <FaArrowLeftLong />
                    </motion.span>
                  </motion.button>

                  <input
                    type="email"
                    dir="rtl"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder={FOOTER_CONTENT.newsletterPlaceholder}
                    className="h-14 flex-1 border-0 bg-transparent px-4 text-right text-[clamp(1.05rem,1.5vw,1.3rem)] text-[var(--home-footer-input-text)] outline-none placeholder:text-[var(--home-footer-placeholder)]"
                  />
                </div>

                {status === 'success' ? (
                  <p className="mt-3 text-right text-sm font-bold text-[var(--home-footer-success)]">تم الاشتراك بنجاح.</p>
                ) : null}
                {status === 'error' ? (
                  <p className="mt-3 text-right text-sm font-bold text-[var(--home-footer-error)]">اكتب بريدًا إلكترونيًا صحيحًا.</p>
                ) : null}
              </form>
            </motion.div>
          </div>

          <div className="mt-12 border-t border-[var(--home-footer-bottom-border)] pt-5">
            <div className="flex flex-col gap-5 md:flex-row md:items-center" dir="rtl">
              <div className="flex justify-center gap-1 md:min-w-[270px] md:justify-end">
                {FOOTER_SOCIALS.map((item) => {
                  const Icon = item.icon
                  return (
                    <motion.a
                      key={item.label}
                      href={item.href}
                      target={item.href.startsWith('http') ? '_blank' : undefined}
                      rel={item.href.startsWith('http') ? 'noreferrer' : undefined}
                      whileHover={{ y: -5, scale: 1.08 }}
                      whileTap={{ scale: 0.95 }}
                      className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--home-footer-social-border)] bg-[var(--home-footer-social-bg)] text-xl text-[var(--home-footer-social-icon)]"
                      aria-label={item.label}
                    >
                      <Icon />
                    </motion.a>
                  )
                })}
              </div>

              <p className="flex-1 text-center text-[clamp(0.95rem,1.25vw,1.2rem)] font-semibold text-[var(--home-footer-copy)]">
                {FOOTER_CONTENT.copy}
              </p>
            </div>
          </div>
        </div>
      </footer>
    </MotionSection>
  )
}

export default HomeFooterSection
