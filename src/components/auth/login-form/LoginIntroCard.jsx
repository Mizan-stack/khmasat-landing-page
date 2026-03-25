import { motion } from 'framer-motion'
import { LOGIN_FORM_TEXT } from './LoginFormText'

const MotionDiv = motion.div

function LoginIntroCard() {
  return (
    <MotionDiv
      initial={{ opacity: 0, x: 80 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.75, delay: 0.14 }}
      className="rounded-[26px] border border-[var(--right-hero-border)] [background:var(--right-hero-bg)] px-4 py-3.5 md:px-5 md:py-4"
    >
      <h2 className="text-right text-[clamp(1.3rem,2.1vw,2.15rem)] font-black leading-tight text-[var(--right-text-primary)]">
        {LOGIN_FORM_TEXT.headingTop}
        <br />
        {LOGIN_FORM_TEXT.headingBottom}
      </h2>
      <p className="mt-2.5 max-w-2xl text-right text-xs leading-relaxed text-[var(--right-text-muted)] md:text-sm">
        {LOGIN_FORM_TEXT.intro}
      </p>
    </MotionDiv>
  )
}

export default LoginIntroCard
