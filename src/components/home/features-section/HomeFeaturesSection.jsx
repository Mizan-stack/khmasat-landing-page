import { FEATURES } from './featuresData'
import { motion } from 'framer-motion'

const MotionArticle = motion.article
const MotionSpan = motion.span
const MotionHeader = motion.h3
const MotionText = motion.p

function HomeFeaturesSection() {
  return (
    <section id="why-us" className="mx-auto w-full max-w-[1320px] px-3 pb-14 md:px-6 md:pb-24">
      <div className="rounded-[30px] border border-[var(--home-card-border)] bg-[var(--home-card-bg)] p-5 shadow-[0_20px_55px_rgba(18,27,48,0.12)] md:p-6">
        <h2 className="text-right text-xl font-black text-[var(--home-hero-title)] md:text-2xl">لماذا منصتنا؟</h2>
        <p className="mt-2 text-right text-[0.92rem] text-[var(--home-text-muted)] md:text-sm">
          حلول مرنة تساعدك على إطلاق حملات أسرع وتحقيق نتائج أفضل.
        </p>

        <div className="mt-5 grid gap-4 md:grid-cols-3 [perspective:1200px]">
          {FEATURES.map((feature, index) => (
            <MotionArticle
              key={feature.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{
                y: -14,
                scale: 1.03,
                rotateX: 7,
                rotateY: index === 1 ? 0 : index === 0 ? 7 : -7,
                boxShadow: '0 32px 55px rgba(20,34,72,0.26)',
              }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="group relative overflow-hidden rounded-2xl border border-[var(--home-card-border)] [background:var(--home-feature-bg)] p-4 [transform-style:preserve-3d]"
            >
              <MotionSpan
                aria-hidden
                animate={{ opacity: [0.25, 0.6, 0.25], scale: [1, 1.08, 1] }}
                transition={{ duration: 4.6, repeat: Infinity, delay: index * 0.2 }}
                className="pointer-events-none absolute -left-10 -top-12 h-32 w-32 rounded-full [background:var(--home-feature-glow)] blur-3xl"
              />

              <MotionSpan
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              >
                <MotionSpan
                  animate={{ x: ['-120%', '120%'] }}
                  transition={{ duration: 1.4, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-y-0 w-2/5 bg-gradient-to-r from-transparent via-white/35 to-transparent"
                />
              </MotionSpan>

              <div className="relative z-10">
                <div dir="rtl" className="flex items-center gap-3 text-right">
                  <MotionSpan
                    whileHover={{ rotate: 12, scale: 1.12, y: -2 }}
                    transition={{ type: 'spring', stiffness: 320, damping: 16 }}
                    className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[var(--home-card-border)] [background:var(--home-feature-icon-bg)] text-2xl"
                  >
                    {feature.icon}
                  </MotionSpan>

                  <MotionHeader
                    whileHover={{ x: -4, color: 'var(--home-hero-title)' }}
                    transition={{ duration: 0.25 }}
                    className="flex-1 text-right text-base font-black leading-snug text-[var(--home-text-primary)]"
                  >
                    {feature.title}
                  </MotionHeader>
                </div>

                <MotionText
                  whileHover={{ x: -3 }}
                  transition={{ duration: 0.28 }}
                  className="mt-3 text-right text-sm leading-relaxed text-[var(--home-text-muted)] md:text-base"
                >
                  {feature.description}
                </MotionText>
              </div>
            </MotionArticle>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HomeFeaturesSection

