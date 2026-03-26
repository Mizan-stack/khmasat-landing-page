import { motion } from 'framer-motion'
import { RegisterNowFormPanel } from './form'
import { RegisterSupportPanel } from './support'

const MotionSection = motion.section

function HomeRegisterNowSection() {
  return (
    <MotionSection
      id="register-now"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.55 }}
      className="mx-auto w-full max-w-[1320px] px-3 pb-14 md:px-6 md:pb-24"
    >
      <div className="rounded-[34px] border border-[var(--home-register-border)] [background:var(--home-register-bg)] p-5 md:p-6">
        <div className="grid gap-6 md:gap-7 lg:grid-cols-[1fr_1.1fr]" dir="ltr">
          <RegisterSupportPanel />
          <RegisterNowFormPanel />
        </div>
      </div>
    </MotionSection>
  )
}

export default HomeRegisterNowSection
