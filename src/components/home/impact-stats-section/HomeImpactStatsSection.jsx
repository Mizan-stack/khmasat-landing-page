import { IMPACT_CARDS } from './impactCardsData'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const MotionSection = motion.section
const MotionArticle = motion.article

function AnimatedCounter({ value, decimals = 0, duration = 1.5 }) {
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    let frameId = 0
    let startTime = 0
    const targetValue = Number(value)

    function step(timestamp) {
      if (!startTime) {
        startTime = timestamp
      }

      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1)
      const easedProgress = 1 - (1 - progress) ** 3
      const nextValue = targetValue * easedProgress

      setDisplayValue(nextValue)

      if (progress < 1) {
        frameId = window.requestAnimationFrame(step)
      }
    }

    frameId = window.requestAnimationFrame(step)

    return () => {
      window.cancelAnimationFrame(frameId)
    }
  }, [duration, value])

  return (
    <>
      {displayValue.toLocaleString('en-US', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
    </>
  )
}

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
      className={`group relative flex flex-col overflow-hidden rounded-[26px] border border-[var(--home-impact-card-border)] [background:var(--home-impact-card-bg)] p-5 text-right md:p-6 ${
        isLarge ? 'min-h-[224px]' : 'min-h-[176px]'
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

      <div className="flex items-start justify-between gap-3">
        <div className="max-w-[75%]">
          <h3 className="text-[clamp(1.05rem,1.35vw,1.34rem)] font-black leading-[1.15] text-[var(--home-impact-card-title)]">
            {card.title}
          </h3>
          <p className="mt-3 text-[clamp(0.88rem,0.98vw,0.96rem)] font-semibold leading-relaxed text-[var(--home-impact-card-text)]">
            {card.description}
          </p>
        </div>
        <motion.span
          animate={{ y: [0, -3, 0], rotate: [0, 4, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: card.floatDelay }}
          className={`inline-flex shrink-0 items-center justify-center rounded-2xl border border-[var(--home-impact-icon-border)] bg-[var(--home-impact-icon-bg)] text-[var(--home-impact-icon)] ${
            isLarge ? 'h-14 w-14 text-3xl' : 'h-12 w-12 text-[1.65rem]'
          }`}
        >
          <Icon />
        </motion.span>
      </div>

      <div className="mt-auto pt-5">
        <div className="mb-4 h-px w-full bg-[linear-gradient(90deg,rgba(57,188,188,0),rgba(57,188,188,0.24),rgba(57,188,188,0))]" />
        <div className="flex items-end justify-end gap-1.5">
        <motion.span
          animate={{ scale: [1, 1.07, 1], opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 1.7, repeat: Infinity, ease: 'easeInOut', delay: card.floatDelay }}
          className="text-[clamp(2.2rem,3.2vw,3.9rem)] font-black leading-none text-[var(--home-impact-number)]"
        >
          {card.suffix}
        </motion.span>
        <motion.span
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 1.7, repeat: Infinity, ease: 'easeInOut', delay: card.floatDelay }}
          className="text-[clamp(2.2rem,3.2vw,3.9rem)] font-black leading-none tracking-tight text-[var(--home-impact-number)]"
        >
          <AnimatedCounter value={card.numericValue} decimals={card.decimals} duration={card.counterDuration} />
        </motion.span>
        </div>
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
      className="w-full pb-20 md:pb-24"
    >
      <div className="relative overflow-hidden py-10 md:py-12">
        <div className="relative z-10 mx-auto w-full max-w-[1320px] px-3 md:px-6">
          <div className="grid items-center gap-6 md:gap-7 lg:grid-cols-[1fr_0.95fr]" dir="ltr">
            <div className="grid gap-3.5 sm:grid-cols-2 md:gap-4">
              <div className="space-y-3.5 md:space-y-4">
                {IMPACT_CARDS.left.map((card, index) => (
                  <ImpactCard key={card.id} card={card} index={index} />
                ))}
              </div>
              <div className="space-y-3.5 md:space-y-4">
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
              <h2 className="text-[clamp(1.65rem,3.6vw,3.2rem)] font-black leading-tight text-[var(--home-impact-title)]">
                سجل نجاحاتنا
              </h2>
              <p className="mt-3 text-[clamp(0.95rem,1.1vw,1.15rem)] leading-relaxed text-[var(--home-impact-text)]">
                نفخر بالمشاريع التي ساعدناها على النمو. أرقامنا تعكس التزامنا بنجاح التجار.
              </p>

              <div className="mt-6">
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


