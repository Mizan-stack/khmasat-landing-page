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
      className="mx-auto w-full max-w-[1320px] px-3 pb-20 md:px-6 md:pb-24"
    >
      <div className="relative overflow-hidden rounded-[34px] border border-[var(--home-steps-border)] [background:var(--home-steps-bg)] px-4 py-9 md:px-7 md:py-11">
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
            <h2 className="text-[clamp(1.6rem,3.5vw,3.1rem)] font-black leading-tight text-[var(--home-steps-title)]">
              كيفية التسجيل في الموقع
            </h2>
            <p className="mt-2 text-[clamp(0.9rem,1.05vw,1.05rem)] text-[var(--home-steps-text)]">
              خطوات بسيطة وسريعة لتبدأ رحلتك معنا خلال دقائق
            </p>
          </div>

          <div className="mt-7 grid gap-7 md:mt-8 md:grid-cols-4" dir="rtl">
            {REGISTER_STEPS.map((step, index) => {
              const Icon = step.icon
              const isCelebration = step.celebration
              const circleBorderColor = isCelebration ? 'rgba(214, 171, 74, 0.42)' : 'var(--home-steps-circle-border)'
              const circleBackground = isCelebration
                ? 'linear-gradient(180deg, rgba(255, 248, 224, 0.96) 0%, rgba(255, 233, 178, 0.82) 100%)'
                : 'var(--home-steps-circle-bg)'
              const ringBorderColor = isCelebration ? 'rgba(206, 157, 47, 0.26)' : 'var(--home-steps-circle-ring)'
              const iconColor = isCelebration ? '#c68f1f' : 'var(--home-steps-icon)'
              const badgeBackground = isCelebration
                ? 'linear-gradient(135deg, #f4cf77 0%, #d9a12a 100%)'
                : 'var(--home-steps-badge-bg)'
              const badgeTextColor = isCelebration ? '#fff9ec' : 'var(--home-steps-badge-text)'
              const titleColor = isCelebration ? '#bb8a1f' : 'var(--home-steps-title)'
              const subtitleColor = isCelebration ? '#8c6a1f' : 'var(--home-steps-text)'
              const cardGlow = isCelebration ? 'drop-shadow(0 20px 35px rgba(212, 165, 58, 0.24))' : 'none'

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
                    <div
                      aria-hidden
                      className="absolute left-[-46%] top-[58px] hidden h-8 w-[92%] overflow-hidden md:block"
                    >
                      <motion.span
                        initial={{ scaleX: 0, opacity: 0 }}
                        whileInView={{ scaleX: 1, opacity: 1 }}
                        viewport={{ once: true, amount: 0.35 }}
                        transition={{ duration: 0.55, delay: 0.32 + index * 0.1, ease: 'easeOut' }}
                        className="absolute inset-x-0 top-1/2 h-[2px] origin-right rounded-full border-t-2 border-dashed border-[var(--home-steps-connector)]"
                      />
                      <motion.span
                        animate={{
                          right: ['-14%', '100%'],
                          opacity: [0, 1, 0],
                          scaleX: [0.7, 1.08, 0.82],
                        }}
                        transition={{
                          duration: 1.65,
                          repeat: Infinity,
                          repeatDelay: 0.18,
                          delay: index * 0.28,
                          ease: 'linear',
                        }}
                        className="absolute top-1/2 h-3 w-24 -translate-y-1/2 rounded-full bg-gradient-to-l from-transparent via-cyan-200 to-transparent blur-[3px]"
                      />
                      <motion.span
                        animate={{
                          right: ['-2%', '100%'],
                          opacity: [0, 1, 0],
                          scale: [0.8, 1.14, 0.86],
                        }}
                        transition={{
                          duration: 1.65,
                          repeat: Infinity,
                          repeatDelay: 0.18,
                          delay: index * 0.28 + 0.04,
                          ease: 'linear',
                        }}
                        className="absolute top-1/2 h-4 w-4 -translate-y-1/2 rounded-full bg-white shadow-[0_0_0_6px_rgba(103,232,249,0.35),0_0_22px_rgba(103,232,249,0.95)]"
                      />
                    </div>
                  )}

                  <div
                    className="relative mx-auto inline-flex h-28 w-28 items-center justify-center rounded-full border shadow-[0_14px_30px_rgba(12,27,52,0.12)]"
                    style={{
                      borderColor: circleBorderColor,
                      background: circleBackground,
                      filter: cardGlow,
                    }}
                  >
                    <motion.span
                      animate={{ scale: [1, 1.08, 1], opacity: [0.6, 1, 0.6] }}
                      transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut', delay: index * 0.14 }}
                      className="absolute inset-2 rounded-full border"
                      style={{ borderColor: ringBorderColor }}
                    />
                    <Icon className="text-5xl" style={{ color: iconColor }} />

                    <motion.span
                      animate={{ y: [0, -3, 0], scale: [1, 1.07, 1] }}
                      transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut', delay: index * 0.12 }}
                      className="absolute -right-2 -top-2 inline-flex h-12 w-12 items-center justify-center rounded-full text-2xl font-black shadow-[0_12px_26px_rgba(41,184,179,0.35)]"
                      style={{
                        color: badgeTextColor,
                        background: badgeBackground,
                        boxShadow: isCelebration
                          ? '0 12px 28px rgba(208, 161, 55, 0.38)'
                          : '0 12px 26px rgba(41,184,179,0.35)',
                      }}
                    >
                      {step.number}
                    </motion.span>
                  </div>

                  <h3
                    className="mt-4 text-[clamp(1.15rem,1.55vw,1.45rem)] font-black"
                    style={{ color: titleColor }}
                  >
                    {step.title}
                  </h3>
                  <p
                    className={`mt-2 font-semibold ${isCelebration ? 'text-[clamp(0.88rem,1.02vw,1rem)]' : 'text-[clamp(0.85rem,0.98vw,0.95rem)]'}`}
                    style={{ color: subtitleColor }}
                  >
                    {step.subtitle}
                  </p>
                </MotionArticle>
              )
            })}
          </div>

          <div className="mt-8 text-center">
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

