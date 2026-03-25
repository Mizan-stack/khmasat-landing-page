import { motion } from 'framer-motion'
import { SIGNUP_FORM_TEXT } from './SignUpFormText'

const MotionDiv = motion.div

function SignUpIntroCard() {
  return (
    <MotionDiv
      initial={{ opacity: 0, x: -80 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.75, delay: 0.14 }}
      className="rounded-[26px] border border-[var(--right-hero-border)] [background:var(--right-hero-bg)] px-4 py-3.5 md:px-5 md:py-4"
    >
      <h2 className="text-right text-[clamp(1.3rem,2.1vw,2.15rem)] font-black leading-tight text-[var(--right-text-primary)]">
        {SIGNUP_FORM_TEXT.headingTop}
        <br />
        {SIGNUP_FORM_TEXT.headingBottom}
      </h2>
      <p className="mt-2.5 max-w-2xl text-right text-xs leading-relaxed text-[var(--right-text-muted)] md:text-sm">
        {SIGNUP_FORM_TEXT.intro}
      </p>
    </MotionDiv>
  )
}

export default SignUpIntroCard
