import { motion } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'
import { FaXmark } from 'react-icons/fa6'
import { validateEmail, validateName } from '../../../utils/validation'
import ContactField from './ContactField'
import { CONTACT_MODAL_TEXT } from './floatingContactData'

const MotionDiv = motion.div
const MotionButton = motion.button

const INITIAL_FORM = {
  name: '',
  email: '',
  message: '',
}

function validateMessage(value) {
  const trimmed = value.trim()
  if (!trimmed) return 'الرسالة مطلوبة'
  if (trimmed.length < 10) return 'اكتب تفاصيل أكثر (10 أحرف على الأقل)'
  return ''
}

function ContactModal({ onClose }) {
  const [form, setForm] = useState(INITIAL_FORM)
  const [touched, setTouched] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const errors = useMemo(
    () => ({
      name: validateName(form.name),
      email: validateEmail(form.email),
      message: validateMessage(form.message),
    }),
    [form.email, form.message, form.name],
  )

  useEffect(() => {
    function handleEscape(event) {
      if (event.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [onClose])

  function updateField(name, value) {
    setForm((prev) => ({ ...prev, [name]: value }))
    if (submitted) setSubmitted(false)
  }

  function touchField(name) {
    setTouched((prev) => ({ ...prev, [name]: true }))
  }

  function handleSubmit(event) {
    event.preventDefault()

    setTouched({
      name: true,
      email: true,
      message: true,
    })

    if (Object.values(errors).some(Boolean)) {
      setSubmitted(false)
      return
    }

    setSubmitted(true)
  }

  const nameError = touched.name ? errors.name : ''
  const emailError = touched.email ? errors.email : ''
  const messageError = touched.message ? errors.message : ''

  return (
    <MotionDiv
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[95] flex items-center justify-center p-3 md:p-6"
    >
      <MotionButton
        type="button"
        aria-label="إغلاق نافذة التواصل"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-slate-950/45 backdrop-blur-[2px]"
      />

      <MotionDiv
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-modal-title"
        initial={{ opacity: 0, x: 90, y: 24, scale: 0.92, rotate: 1.5 }}
        animate={{ opacity: 1, x: 0, y: 0, scale: 1, rotate: 0 }}
        exit={{ opacity: 0, x: 110, y: 20, scale: 0.95 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        onClick={(event) => event.stopPropagation()}
        dir="rtl"
        className="relative w-full max-w-[600px] rounded-[28px] border border-[var(--home-contact-border)] bg-[var(--home-contact-modal-bg)] p-5 shadow-[0_34px_60px_rgba(0,0,0,0.34)] md:p-8"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute left-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--home-contact-close-border)] bg-[var(--home-contact-close-bg)] text-2xl text-[var(--home-contact-close-text)] transition-all duration-300 hover:scale-105 hover:rotate-90"
        >
          <FaXmark />
        </button>

        <h3 id="contact-modal-title" className="text-center text-4xl font-black text-[var(--home-contact-title)] md:text-5xl">
          {CONTACT_MODAL_TEXT.title}
        </h3>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <ContactField label={CONTACT_MODAL_TEXT.nameLabel} error={nameError}>
            <input
              type="text"
              value={form.name}
              onChange={(event) => updateField('name', event.target.value)}
              onBlur={() => touchField('name')}
              placeholder={CONTACT_MODAL_TEXT.namePlaceholder}
              className={inputClass(nameError)}
            />
          </ContactField>

          <ContactField label={CONTACT_MODAL_TEXT.emailLabel} error={emailError}>
            <input
              type="email"
              dir="ltr"
              value={form.email}
              onChange={(event) => updateField('email', event.target.value)}
              onBlur={() => touchField('email')}
              placeholder={CONTACT_MODAL_TEXT.emailPlaceholder}
              className={inputClass(emailError)}
            />
          </ContactField>

          <ContactField label={CONTACT_MODAL_TEXT.messageLabel} error={messageError}>
            <textarea
              rows={5}
              value={form.message}
              onChange={(event) => updateField('message', event.target.value)}
              onBlur={() => touchField('message')}
              placeholder={CONTACT_MODAL_TEXT.messagePlaceholder}
              className={`${inputClass(messageError)} h-36 resize-none py-3`}
            />
          </ContactField>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="group relative inline-flex h-14 w-full items-center justify-center overflow-hidden rounded-2xl text-2xl font-black text-white shadow-[0_16px_34px_rgba(43,184,179,0.32)]"
          >
            <motion.span
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-y-0 w-1/2 bg-white/25 blur-md"
            />
            <span className="absolute inset-0 [background:var(--home-contact-button-bg)]" />
            <span className="relative">{CONTACT_MODAL_TEXT.submit}</span>
          </motion.button>

          {submitted ? (
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-xl border border-[var(--status-success-border)] bg-[var(--status-success-bg)] px-4 py-3 text-center text-sm font-bold text-[var(--status-success-text)]"
            >
              {CONTACT_MODAL_TEXT.success}
            </motion.p>
          ) : null}
        </form>
      </MotionDiv>
    </MotionDiv>
  )
}

function inputClass(hasError) {
  return `h-14 w-full rounded-2xl border px-4 text-base text-[var(--home-contact-input-text)] outline-none transition-all duration-300 placeholder:text-[var(--home-contact-placeholder)] ${
    hasError
      ? 'border-red-400/80 bg-red-500/10'
      : 'border-[var(--home-contact-input-border)] bg-[var(--home-contact-input-bg)] focus:border-[var(--home-contact-focus)]'
  }`
}

export default ContactModal
