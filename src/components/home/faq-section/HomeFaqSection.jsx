import { motion } from 'framer-motion'
import { useState } from 'react'
import { FAQ_ITEMS, FAQ_SIDE_CONTENT } from './faqData'
import FaqAccordionItem from './FaqAccordionItem'

const MotionSection = motion.section
const MotionDiv = motion.div
const MotionSpan = motion.span

function HomeFaqSection() {
  const [openId, setOpenId] = useState(FAQ_ITEMS[0]?.id ?? null)

  function toggleItem(id) {
    setOpenId((current) => (current === id ? null : id))
  }

  return (
    <MotionSection
      id="faq"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.55 }}
      className="w-full py-20 md:py-28"
    >
      <div className="relative w-full overflow-hidden border-y border-[var(--home-faq-border)] [background:var(--home-faq-bg)] py-12 md:py-16">
        <MotionSpan
          aria-hidden
          animate={{ x: [0, 38, 0], y: [0, -26, 0], opacity: [0.2, 0.45, 0.2] }}
          transition={{ duration: 8.2, repeat: Infinity, ease: 'easeInOut' }}
          className="pointer-events-none absolute -left-24 top-8 h-72 w-72 rounded-full [background:var(--home-faq-glow)] blur-3xl"
        />
        <MotionSpan
          aria-hidden
          animate={{ x: [0, -34, 0], y: [0, 18, 0], opacity: [0.16, 0.4, 0.16] }}
          transition={{ duration: 7.6, repeat: Infinity, ease: 'easeInOut' }}
          className="pointer-events-none absolute -bottom-20 right-[-90px] h-64 w-64 rounded-full [background:var(--home-faq-glow)] blur-3xl"
        />

        <div className="relative z-10 grid w-full items-center gap-6 px-2 md:px-4 lg:grid-cols-[1.35fr_0.95fr]" dir="ltr">
          <MotionDiv
            initial={{ opacity: 0, x: -48, filter: 'blur(8px)' }}
            whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            dir="rtl"
            className="order-2 overflow-hidden rounded-[32px] border border-[var(--home-faq-list-border)] bg-[var(--home-faq-list-bg)] shadow-[0_24px_54px_rgba(25,35,58,0.12)] lg:order-1"
          >
            {FAQ_ITEMS.map((item, index) => (
              <FaqAccordionItem
                key={item.id}
                item={item}
                isOpen={openId === item.id}
                isLast={index === FAQ_ITEMS.length - 1}
                onToggle={() => toggleItem(item.id)}
              />
            ))}
          </MotionDiv>

          <MotionDiv
            initial={{ opacity: 0, x: 48, filter: 'blur(8px)' }}
            whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
            dir="rtl"
            className="order-1 px-3 text-right md:px-5 lg:order-2"
          >
            <motion.span
              animate={{
                y: [0, -4, 0],
                boxShadow: ['0 14px 28px rgba(52,107,238,0.2)', '0 24px 34px rgba(52,107,238,0.32)', '0 14px 28px rgba(52,107,238,0.2)'],
              }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
              className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-3xl bg-[var(--home-faq-badge-bg)] text-6xl font-black text-[var(--home-faq-badge-text)]"
            >
              {FAQ_SIDE_CONTENT.badge}
            </motion.span>

            <h2 className="text-[clamp(2.3rem,5vw,5.8rem)] font-black leading-[1.02] text-[var(--home-faq-side-title)]">
              {FAQ_SIDE_CONTENT.title}
              <span className="mt-2 block w-fit border-b-[6px] border-[var(--home-faq-side-underline)] text-[var(--home-faq-side-accent)]">
                {FAQ_SIDE_CONTENT.highlightedTitle}
              </span>
            </h2>

            <p className="mt-6 max-w-2xl text-[clamp(1.15rem,1.9vw,2rem)] leading-relaxed text-[var(--home-faq-side-text)]">
              {FAQ_SIDE_CONTENT.description}
            </p>
          </MotionDiv>
        </div>
      </div>
    </MotionSection>
  )
}

export default HomeFaqSection
