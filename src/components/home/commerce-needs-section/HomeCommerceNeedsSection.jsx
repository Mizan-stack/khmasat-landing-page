import { COMMERCE_NEEDS } from './commerceNeedsData'
import { motion } from 'framer-motion'

const MotionSection = motion.section
const MotionArticle = motion.article
const MotionSpan = motion.span

function HomeCommerceNeedsSection() {
  return (
    <MotionSection
      id="contact"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.55 }}
      className="mx-auto w-full max-w-[1320px] px-3 pb-20 md:px-6 md:pb-24"
    >
      <div className="relative overflow-hidden rounded-[34px] border border-[var(--home-needs-border)] [background:var(--home-needs-bg)] px-4 py-8 md:px-7 md:py-10">
        {Array.from({ length: 8 }).map((_, ringIndex) => (
          <MotionSpan
            key={ringIndex}
            aria-hidden
            animate={{ opacity: [0.16, 0.32, 0.16] }}
            transition={{ duration: 4.8, repeat: Infinity, delay: ringIndex * 0.25 }}
            className="pointer-events-none absolute left-[-430px] top-1/2 -translate-y-1/2 rounded-full border"
            style={{
              width: `${560 + ringIndex * 95}px`,
              height: `${560 + ringIndex * 95}px`,
              borderColor: 'var(--home-needs-lines)',
              opacity: 0.26,
            }}
          />
        ))}

        <div className="relative z-10">
          <div className="text-center">
            <h2 className="text-[clamp(1.6rem,3.5vw,3.1rem)] font-black leading-tight text-[var(--home-needs-title)]">
              كل ما تحتاجه للبيع أونلاين
            </h2>
          </div>

          <div className="mt-6 grid items-start gap-4 md:grid-cols-2 lg:grid-cols-4">
            {COMMERCE_NEEDS.map((item, index) => {
              if (item.featured) {
                const FeaturedIcon = item.icon
                return (
                  <MotionArticle
                    key={item.title}
                    initial={{ opacity: 0, y: 18, scale: 0.96 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    whileHover={{ y: -8, scale: 1.015, boxShadow: '0 30px 60px rgba(47,199,190,0.32)' }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.42, delay: index * 0.05 }}
                    className="flex flex-col rounded-[22px] [background:var(--home-needs-feature-bg)] px-6 py-6 text-right shadow-[0_20px_46px_rgba(41,172,164,0.3)] md:px-7"
                  >
                    <div className="flex justify-end">
                      <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-black/10 text-2xl text-[var(--home-needs-feature-text)]">
                        {FeaturedIcon ? <FeaturedIcon /> : null}
                      </div>
                    </div>

                    <div className="mt-auto">
                      <h3 className="text-[clamp(1.95rem,2.8vw,2.6rem)] font-black leading-[1.05] text-[var(--home-needs-feature-text)]">
                        {item.title}
                      </h3>
                      <p className="mt-3 text-[1.1rem] font-bold text-[var(--home-needs-feature-text)]/90">{item.subtitle}</p>
                    </div>
                  </MotionArticle>
                )
              }

              const Icon = item.icon
              return (
                <MotionArticle
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{
                    y: -10,
                    scale: 1.02,
                    boxShadow: `0 24px 45px ${item.accentSoft}`,
                  }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.4, delay: index * 0.04 }}
                  className="group rounded-[22px] border border-[var(--home-needs-card-border)] bg-[var(--home-needs-card-bg)] p-5 shadow-[0_12px_32px_rgba(18,41,84,0.08)]"
                >
                  <div className="flex flex-col text-right" dir="rtl">
                    <div className="flex items-start gap-4">
                      <motion.span
                        whileHover={{ rotate: 8, scale: 1.08 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                        className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border text-2xl"
                        style={{
                          color: item.accent,
                          backgroundColor: item.accentSoft,
                          borderColor: `${item.accent}45`,
                        }}
                      >
                        <Icon />
                      </motion.span>

                      <div className="min-w-0 flex-1">
                        <h3 className="text-[clamp(1.08rem,1.4vw,1.38rem)] font-black leading-[1.15] text-[var(--home-needs-card-title)]">
                          {item.title}
                        </h3>
                        <p className="mt-2 text-[0.98rem] font-semibold leading-relaxed text-[var(--home-needs-card-text)]">
                          {item.subtitle}
                        </p>

                      </div>
                    </div>
                  </div>
                </MotionArticle>
              )
            })}
          </div>
        </div>
      </div>
    </MotionSection>
  )
}

export default HomeCommerceNeedsSection



