import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { FaWhatsapp } from 'react-icons/fa'
import { FaHeadset } from 'react-icons/fa6'
import ContactModal from './ContactModal'
import { WHATSAPP_LINK } from './floatingContactData'

const MotionDiv = motion.div
const MotionButton = motion.button

function HomeFloatingContact() {
  const [isOpen, setIsOpen] = useState(false)
  const [isFooterVisible, setIsFooterVisible] = useState(false)
  const [isMobile, setIsMobile] = useState(() => (typeof window !== 'undefined' ? window.innerWidth < 768 : false))

  useEffect(() => {
    if (!isOpen) return undefined

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [isOpen])

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    const footer = document.getElementById('footer')
    if (!footer) return undefined

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsFooterVisible(entry.isIntersecting)
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px 190px 0px',
      },
    )

    observer.observe(footer)
    return () => observer.disconnect()
  }, [])

  const liftOffset = isFooterVisible ? (isMobile ? -195 : -150) : 0

  return (
    <>
      <MotionDiv
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0, y: liftOffset }}
        transition={{
          opacity: { duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.3 },
          x: { duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.3 },
          y: { type: 'spring', stiffness: 240, damping: 28 },
        }}
        className="pointer-events-none sticky top-[calc(100dvh-8.5rem)] z-30 h-0 md:top-[calc(100dvh-9rem)]"
      >
        <div className="pointer-events-auto ml-auto flex w-max flex-col items-end gap-2 pr-1 md:gap-3 md:pr-2">
          <motion.a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noreferrer"
            whileHover={{ y: -5, scale: 1.08, rotate: -6 }}
            whileTap={{ scale: 0.95 }}
            animate={{
              y: [0, -5, 0],
              boxShadow: ['0 10px 20px rgba(7,148,99,0.35)', '0 18px 30px rgba(7,148,99,0.55)', '0 10px 20px rgba(7,148,99,0.35)'],
            }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            className="relative inline-flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl border border-emerald-300/40 bg-[linear-gradient(145deg,#17c964,#0ea95a)] text-3xl text-white shadow-[0_16px_30px_rgba(16,185,129,0.38)]"
            aria-label="تواصل واتساب"
          >
            <motion.span
              animate={{ opacity: [0.25, 0.6, 0.25], scale: [1, 1.25, 1] }}
              transition={{ duration: 1.6, repeat: Infinity }}
              className="absolute inset-0 rounded-2xl bg-white/30"
            />
            <span className="relative">
              <FaWhatsapp />
            </span>
          </motion.a>

          <MotionButton
            type="button"
            onClick={() => setIsOpen(true)}
            whileHover={{ y: -4, scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="group relative inline-flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl border border-[var(--home-contact-btn-border)] bg-[var(--home-contact-btn-bg)] text-xl font-black text-[var(--home-contact-btn-text)] shadow-[0_18px_36px_rgba(18,42,76,0.26)]"
            aria-label="اتصل بنا"
          >
            <span className="relative inline-flex h-9 w-9 items-center justify-center rounded-xl bg-white/20">
              <FaHeadset />
            </span>
          </MotionButton>
        </div>
      </MotionDiv>

      <AnimatePresence>{isOpen ? <ContactModal onClose={() => setIsOpen(false)} /> : null}</AnimatePresence>
    </>
  )
}

export default HomeFloatingContact
