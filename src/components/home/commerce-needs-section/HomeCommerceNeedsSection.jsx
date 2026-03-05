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
      className="mx-auto w-full max-w-[1320px] px-3 pb-28 md:px-6"
    >
      <div className="relative overflow-hidden rounded-[34px] border border-[var(--home-needs-border)] [background:var(--home-needs-bg)] px-4 py-10 md:px-8 md:py-14">
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
            <span className="text-[clamp(1.2rem,2.2vw,2rem)] font-black text-[var(--home-needs-accent)]">حلولنا</span>
            <h2 className="mt-2 text-[clamp(2.1rem,4.6vw,4.7rem)] font-black leading-tight text-[var(--home-needs-title)]">
              كل ما تحتاجه للبيع أونلاين
            </h2>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
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
                    className="rounded-[22px] [background:var(--home-needs-feature-bg)] px-6 py-8 text-right shadow-[0_20px_46px_rgba(41,172,164,0.3)]"
                  >
                    <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-black/10 text-2xl text-[var(--home-needs-feature-text)]">
                      {FeaturedIcon ? <FeaturedIcon /> : null}
                    </div>
                    <h3 className="mt-4 text-5xl font-black leading-tight text-[var(--home-needs-feature-text)]">{item.title}</h3>
                    <p className="mt-3 text-2xl font-bold text-[var(--home-needs-feature-text)]/90">{item.subtitle}</p>
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
                  className="group rounded-[22px] border border-[var(--home-needs-card-border)] bg-[var(--home-needs-card-bg)] p-5"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="inline-flex flex-col text-right">
                      <h3 className="text-[clamp(1.5rem,2.4vw,2.2rem)] font-black leading-tight text-[var(--home-needs-card-title)]">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-[clamp(1.1rem,1.9vw,1.5rem)] font-semibold text-[var(--home-needs-card-text)]">
                        {item.subtitle}
                      </p>
                    </div>

                    <motion.span
                      whileHover={{ rotate: 8, scale: 1.1 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                      className="inline-flex h-14 w-14 items-center justify-center rounded-2xl border text-2xl"
                      style={{
                        color: item.accent,
                        backgroundColor: item.accentSoft,
                        borderColor: `${item.accent}45`,
                      }}
                    >
                      <Icon />
                    </motion.span>
                  </div>

                  <div className="mt-5 flex items-center justify-between text-right text-[clamp(1rem,1.5vw,1.3rem)] font-bold text-[var(--home-needs-card-meta)]">
                    <span>{item.meta}</span>
                    <span className="text-[var(--home-needs-card-text)]">{item.subtitle}</span>
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



