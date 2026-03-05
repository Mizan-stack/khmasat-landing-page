import { REGISTER_STEPS } from './registerStepsData'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const MotionSection = motion.section
const MotionArticle = motion.article
const MotionSpan = motion.span

function HomeHowToRegisterSection() {
  return (
    <MotionSection
      id="how-to-register"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.55 }}
      className="mx-auto w-full max-w-[1320px] px-3 pb-28 md:px-6"
    >
      <div className="relative overflow-hidden rounded-[34px] border border-[var(--home-steps-border)] [background:var(--home-steps-bg)] px-4 py-12 md:px-8 md:py-14">
        <MotionSpan
          aria-hidden
          animate={{ x: [0, 36, 0], y: [0, -18, 0], opacity: [0.16, 0.38, 0.16] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          className="pointer-events-none absolute -left-14 top-10 h-56 w-56 rounded-full [background:var(--home-steps-glow)] blur-3xl"
        />
        <MotionSpan
          aria-hidden
          animate={{ x: [0, -28, 0], y: [0, 20, 0], opacity: [0.12, 0.32, 0.12] }}
          transition={{ duration: 8.2, repeat: Infinity, ease: 'easeInOut' }}
          className="pointer-events-none absolute -bottom-16 right-[-84px] h-64 w-64 rounded-full [background:var(--home-steps-glow)] blur-3xl"
        />

        <div className="relative z-10">
          <div className="text-center">
            <h2 className="text-[clamp(2.1rem,4.7vw,4.8rem)] font-black leading-tight text-[var(--home-steps-title)]">
              كيفية التسجيل في الموقع
            </h2>
            <p className="mt-2 text-[clamp(1rem,1.7vw,1.7rem)] text-[var(--home-steps-text)]">
              خطوات بسيطة وسريعة لتبدأ رحلتك معنا خلال دقائق
            </p>
          </div>

          <div className="mt-10 grid gap-7 md:grid-cols-4" dir="rtl">
            {REGISTER_STEPS.map((step, index) => {
              const Icon = step.icon

              return (
                <MotionArticle
                  key={step.number}
                  initial={{ opacity: 0, y: 26, scale: 0.94 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  whileHover={{ y: -8, scale: 1.03 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{ duration: 0.45, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  className="relative text-center"
                >
                  {index < REGISTER_STEPS.length - 1 && (
                    <motion.span
                      aria-hidden
                      initial={{ scaleX: 0, opacity: 0 }}
                      whileInView={{ scaleX: 1, opacity: 1 }}
                      viewport={{ once: true, amount: 0.35 }}
                      transition={{ duration: 0.55, delay: 0.32 + index * 0.1, ease: 'easeOut' }}
                      className="absolute left-[-46%] top-[58px] hidden h-8 w-[92%] origin-right rounded-[100px] border-t-2 border-dashed border-[var(--home-steps-connector)] md:block"
                    />
                  )}

                  <div className="relative mx-auto inline-flex h-28 w-28 items-center justify-center rounded-full border border-[var(--home-steps-circle-border)] [background:var(--home-steps-circle-bg)] shadow-[0_14px_30px_rgba(12,27,52,0.12)]">
                    <motion.span
                      animate={{ scale: [1, 1.08, 1], opacity: [0.6, 1, 0.6] }}
                      transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut', delay: index * 0.14 }}
                      className="absolute inset-2 rounded-full border border-[var(--home-steps-circle-ring)]"
                    />
                    <Icon className="text-5xl text-[var(--home-steps-icon)]" />

                    <motion.span
                      animate={{ y: [0, -3, 0], scale: [1, 1.07, 1] }}
                      transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut', delay: index * 0.12 }}
                      className="absolute -right-2 -top-2 inline-flex h-12 w-12 items-center justify-center rounded-full text-2xl font-black text-[var(--home-steps-badge-text)] [background:var(--home-steps-badge-bg)] shadow-[0_12px_26px_rgba(41,184,179,0.35)]"
                    >
                      {step.number}
                    </motion.span>
                  </div>

                  <h3 className="mt-4 text-[clamp(1.7rem,2.5vw,2.6rem)] font-black text-[var(--home-steps-title)]">{step.title}</h3>
                  <p className="mt-2 text-[clamp(1rem,1.3vw,1.25rem)] font-semibold text-[var(--home-steps-text)]">{step.subtitle}</p>
                </MotionArticle>
              )
            })}
          </div>

          <div className="mt-10 text-center">
            <Link
              to="/signup"
              state={{ direction: 1 }}
              className="group relative inline-flex h-16 min-w-64 items-center justify-center overflow-hidden rounded-2xl px-10 text-3xl font-black text-white shadow-[0_20px_42px_rgba(43,184,179,0.34)]"
            >
              <span className="absolute inset-0 [background:var(--home-steps-button-bg)] transition-transform duration-500 group-hover:scale-105" />
              <span className="relative">إنشاء حساب الآن</span>
            </Link>
          </div>
        </div>
      </div>
    </MotionSection>
  )
}

export default HomeHowToRegisterSection

