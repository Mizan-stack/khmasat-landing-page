import { motion } from 'framer-motion'
import { LOGIN_FORM_TEXT } from './LoginFormText'

const MotionDiv = motion.div

function LoginIntroCard() {
  return (
    <MotionDiv
      initial={{ opacity: 0, x: 80 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.75, delay: 0.14 }}
      className="rounded-3xl border border-[var(--right-hero-border)] [background:var(--right-hero-bg)] px-4 py-4 md:px-5 md:py-5"
    >
      <h2 className="text-right text-[clamp(2rem,3.4vw,4rem)] font-black leading-tight text-[var(--right-text-primary)]">
        {LOGIN_FORM_TEXT.headingTop}
        <br />
        {LOGIN_FORM_TEXT.headingBottom}
      </h2>
      <p className="mt-3 max-w-2xl text-right text-sm leading-relaxed text-[var(--right-text-muted)] md:text-lg">
        {LOGIN_FORM_TEXT.intro}
      </p>
    </MotionDiv>
  )
}

export default LoginIntroCard
