import { AnimatePresence, motion } from 'framer-motion'
import { FaChevronDown } from 'react-icons/fa'

const MotionArticle = motion.article
const MotionButton = motion.button
const MotionDiv = motion.div

function FaqAccordionItem({ item, isOpen, onToggle, isLast }) {
  return (
    <MotionArticle
      layout="position"
      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
      className={`border-b border-[var(--home-faq-row-border)] ${isLast ? 'border-b-0' : ''} ${
        isOpen ? 'bg-[var(--home-faq-row-active)]' : 'bg-[var(--home-faq-row)]'
      }`}
    >
      <MotionButton
        type="button"
        onClick={onToggle}
        className="flex w-full items-center gap-4 px-4 py-6 text-right md:px-7 md:py-7"
      >
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0, color: isOpen ? 'var(--home-faq-icon-active)' : 'var(--home-faq-icon)' }}
          transition={{ duration: 0.18, ease: 'easeOut' }}
          className="inline-flex h-8 w-8 items-center justify-center rounded-full text-base"
        >
          <FaChevronDown />
        </motion.span>

        <span
          className={`flex-1 text-[clamp(1.05rem,1.5vw,1.55rem)] font-black leading-tight transition-colors duration-300 ${
            isOpen ? 'text-[var(--home-faq-question-active)]' : 'text-[var(--home-faq-question)]'
          }`}
        >
          {item.question}
        </span>
      </MotionButton>

      <AnimatePresence initial={false}>
        {isOpen ? (
          <MotionDiv
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              height: { duration: 0.22, ease: [0.22, 1, 0.36, 1] },
              opacity: { duration: 0.16, ease: 'easeOut' },
            }}
            className="overflow-hidden px-4 pb-7 md:px-7"
          >
            <motion.p
              initial={{ y: 8, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -4, opacity: 0 }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
              className="pr-12 text-[clamp(0.92rem,1.05vw,1.1rem)] leading-relaxed text-[var(--home-faq-answer)] md:pr-16"
            >
              {item.answer}
            </motion.p>
          </MotionDiv>
        ) : null}
      </AnimatePresence>
    </MotionArticle>
  )
}

export default FaqAccordionItem
