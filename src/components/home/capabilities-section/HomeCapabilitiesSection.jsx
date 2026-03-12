import { motion } from 'framer-motion'
import { CAPABILITIES } from './capabilitiesData'
import './capabilityIconAnimations.css'

const MotionSection = motion.section
const MotionArticle = motion.article
const MotionHeader = motion.h2
const MotionParagraph = motion.p

function HomeCapabilitiesSection() {
  return (
    <MotionSection
      id="solutions"
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.55 }}
      className="mx-auto w-full max-w-[1320px] px-3 pb-24 md:px-6"
    >
      <div className="relative overflow-hidden rounded-[32px] border border-[var(--home-card-border)] bg-[var(--home-card-bg)] p-6 md:p-8">
        <motion.span
          aria-hidden
          animate={{ x: [0, 22, 0], y: [0, -14, 0], opacity: [0.35, 0.65, 0.35] }}
          transition={{ duration: 7.5, repeat: Infinity, ease: 'easeInOut' }}
          className="pointer-events-none absolute -left-12 -top-16 h-44 w-44 rounded-full [background:var(--home-cap-glow)] blur-3xl"
        />

        <div className="relative z-10">
          <span className="inline-flex rounded-full border border-[var(--home-cap-badge-border)] bg-[var(--home-cap-badge-bg)] px-4 py-1 text-xs font-bold text-[var(--home-cap-badge-text)]">
            حلول احترافية لخدمة نمو أعمالك
          </span>

          <MotionHeader
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="mt-4 text-center text-[clamp(2rem,4.7vw,4.7rem)] font-black leading-tight text-[var(--home-cap-title)]"
          >
            منصة واحدة..
            <br />
            <span className="text-[var(--home-cap-accent)]">إمكانيات لا محدودة</span>
          </MotionHeader>

          <MotionParagraph
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.42, delay: 0.12 }}
            className="mx-auto mt-3 max-w-3xl text-center text-sm leading-relaxed text-[var(--home-cap-text)] md:text-lg"
          >
            نقدّم منظومة تقنية متكاملة تمنح متجرك تجربة تشغيل أسرع، وتحكم أفضل، ونتائج بيع أعلى.
          </MotionParagraph>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {CAPABILITIES.map((item, index) => {
              const Icon = item.icon
              const delay = `${(index % 4) * 0.12}s`
              const shineDelay = `${index * 0.15}s`

              return (
                <MotionArticle
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -10, scale: 1.02, boxShadow: '0 24px 45px rgba(14,28,62,0.2)' }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.38, delay: index * 0.04 }}
                  className={`group cap-motion-${item.motionType} relative overflow-hidden rounded-2xl border border-[var(--home-cap-card-border)] [background:var(--home-cap-card-bg)] p-4 transition-all duration-300`}
                >
                  <span
                    aria-hidden
                    className="cap-shine pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-white/25 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{ '--cap-shine-delay': shineDelay }}
                  />

                  <div className="relative z-10 text-right">
                    <span
                      className="cap-icon-wrapper relative inline-flex h-11 w-11 items-center justify-center overflow-hidden rounded-xl border text-lg shadow-[0_8px_20px_rgba(0,0,0,0.08)]"
                      style={{
                        '--cap-delay': delay,
                        color: item.iconColor,
                        backgroundColor: item.iconBg,
                        borderColor: item.iconBorder,
                      }}
                    >
                      <span
                        aria-hidden
                        className="cap-icon-halo pointer-events-none absolute inset-0 rounded-xl blur-[2px]"
                        style={{ backgroundColor: item.iconColor, opacity: 0.2 }}
                      />

                      <span className="cap-icon-inner relative inline-flex origin-center">
                        <Icon />
                      </span>
                    </span>

                    <h3 className="mt-3 text-lg font-black text-[var(--home-cap-card-title)]">{item.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-[var(--home-cap-card-text)]">{item.description}</p>
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

export default HomeCapabilitiesSection
