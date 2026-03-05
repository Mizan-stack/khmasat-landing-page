import { IMPACT_CARDS } from './impactCardsData'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const MotionSection = motion.section
const MotionArticle = motion.article

function ImpactCard({ card, index }) {
  const Icon = card.icon
  const isLarge = card.size === 'large'

  return (
    <MotionArticle
      initial={{ opacity: 0, y: 30, scale: 0.93, filter: 'blur(6px)' }}
      whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
      whileHover={{
        y: -8,
        scale: 1.015,
        boxShadow: 'var(--home-impact-card-hover-shadow)',
      }}
      viewport={{ once: true, amount: 0.22 }}
      transition={{ duration: 0.46, delay: card.delay, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative overflow-hidden rounded-[28px] border border-[var(--home-impact-card-border)] [background:var(--home-impact-card-bg)] p-6 text-right ${
        isLarge ? 'min-h-[248px]' : 'min-h-[190px]'
      }`}
      dir="rtl"
    >
      <motion.span
        aria-hidden
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut', delay: card.floatDelay }}
        className="pointer-events-none absolute -right-8 -top-8 h-36 w-36 rounded-full bg-cyan-400/8 blur-2xl"
      />

      <motion.span
        aria-hidden
        animate={{ x: ['-135%', '135%'] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'linear', delay: index * 0.2 }}
        className="pointer-events-none absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-cyan-300/18 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />

      <div className="flex items-start justify-between gap-4">
        <h3 className="text-[clamp(1.7rem,2.2vw,2.5rem)] font-black text-[var(--home-impact-card-title)]">{card.title}</h3>
        <motion.span
          animate={{ y: [0, -3, 0], rotate: [0, 4, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: card.floatDelay }}
          className="inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-[var(--home-impact-icon-border)] bg-[var(--home-impact-icon-bg)] text-3xl text-[var(--home-impact-icon)]"
        >
          <Icon />
        </motion.span>
      </div>

      <p className="mt-5 text-[clamp(1.1rem,1.4vw,1.5rem)] font-semibold text-[var(--home-impact-card-text)]">{card.description}</p>

      <div className="mt-7 flex items-end justify-end gap-1.5">
        <motion.span
          animate={{ scale: [1, 1.07, 1], opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 1.7, repeat: Infinity, ease: 'easeInOut', delay: card.floatDelay }}
          className="text-[clamp(2.6rem,3.6vw,4.4rem)] font-black leading-none text-[var(--home-impact-number)]"
        >
          {card.suffix}
        </motion.span>
        <motion.span
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 1.7, repeat: Infinity, ease: 'easeInOut', delay: card.floatDelay }}
          className="text-[clamp(2.6rem,3.6vw,4.4rem)] font-black leading-none text-[var(--home-impact-number)]"
        >
          {card.value}
        </motion.span>
      </div>
    </MotionArticle>
  )
}

function HomeImpactStatsSection() {
  return (
    <MotionSection
      id="impact"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.55 }}
      className="w-full pb-28"
    >
      <div className="relative overflow-hidden py-14 md:py-18">
        <div className="relative z-10 mx-auto w-full max-w-[1320px] px-3 md:px-6">
          <div className="grid items-center gap-8 lg:grid-cols-[1fr_0.95fr]" dir="ltr">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-4">
                {IMPACT_CARDS.left.map((card, index) => (
                  <ImpactCard key={card.id} card={card} index={index} />
                ))}
              </div>
              <div className="space-y-4">
                {IMPACT_CARDS.right.map((card, index) => (
                  <ImpactCard key={card.id} card={card} index={index + 2} />
                ))}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 42, filter: 'blur(8px)' }}
              whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              dir="rtl"
              className="text-right"
            >
              <p className="text-[clamp(1.4rem,2.1vw,2.1rem)] font-black text-[var(--home-impact-accent)]">تأثيرنا</p>
              <h2 className="mt-2 text-[clamp(2.3rem,5vw,5.2rem)] font-black leading-tight text-[var(--home-impact-title)]">
                سجل نجاحاتنا
              </h2>
              <p className="mt-4 text-[clamp(1.2rem,1.8vw,2rem)] leading-relaxed text-[var(--home-impact-text)]">
                نفخر بالمشاريع التي ساعدناها على النمو. أرقامنا تعكس التزامنا بنجاح التجار.
              </p>

              <div className="mt-8">
                <Link
                  to="/signup"
                  state={{ direction: 1 }}
                  className="group relative inline-flex h-14 min-w-52 items-center justify-center overflow-hidden rounded-2xl px-8 text-2xl font-black text-[var(--home-impact-button-text)] shadow-[0_16px_34px_rgba(43,184,179,0.35)]"
                >
                  <span className="absolute inset-0 [background:var(--home-impact-button-bg)] transition-transform duration-500 group-hover:scale-105" />
                  <span className="relative">ابدأ مشروعك</span>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </MotionSection>
  )
}

export default HomeImpactStatsSection


