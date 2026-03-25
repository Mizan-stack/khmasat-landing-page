import { motion } from 'framer-motion'

const MotionArticle = motion.article

function RegisterSupportCard({ item, index }) {
  const Icon = item.icon
  const singleColumn = item.id === 'location'
  const isContactValue = item.id === 'email' || item.id === 'phone'

  return (
    <MotionArticle
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      whileHover={{ y: -6, scale: 1.015 }}
      transition={{ duration: 0.42, delay: index * 0.08 }}
      className={`rounded-2xl border border-[var(--home-register-item-border)] bg-[var(--home-register-item-bg)] p-4 text-right ${
        singleColumn ? 'sm:col-span-2' : ''
      }`}
    >
      <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-[var(--home-register-icon-border)] bg-[var(--home-register-icon-bg)] text-3xl text-[var(--home-register-icon)]">
        <Icon />
      </span>
      <h3 className="mt-4 text-[clamp(1.1rem,1.5vw,1.45rem)] font-black text-[var(--home-register-item-title)]">{item.title}</h3>
      <p className="mt-1 text-[clamp(0.85rem,1.05vw,1rem)] text-[var(--home-register-item-muted)]">{item.subtitle}</p>
      <p
        dir={isContactValue ? 'ltr' : 'rtl'}
        className={`mt-3 max-w-full text-[clamp(0.85rem,1vw,0.95rem)] font-bold leading-tight text-[var(--home-register-link)] underline decoration-1 underline-offset-2 ${
          isContactValue ? 'break-all text-left [unicode-bidi:plaintext]' : 'text-right'
        }`}
      >
        {item.value}
      </p>
    </MotionArticle>
  )
}

export default RegisterSupportCard
