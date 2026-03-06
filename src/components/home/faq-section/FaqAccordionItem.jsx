import { AnimatePresence, motion } from 'framer-motion'
import { FaChevronDown } from 'react-icons/fa'

const MotionArticle = motion.article
const MotionButton = motion.button
const MotionDiv = motion.div

function FaqAccordionItem({ item, isOpen, onToggle, isLast }) {
  return (
    <MotionArticle
      layout
      transition={{ type: 'spring', stiffness: 420, damping: 32, mass: 0.4 }}
      className={`border-b border-[var(--home-faq-row-border)] ${isLast ? 'border-b-0' : ''} ${
        isOpen ? 'bg-[var(--home-faq-row-active)]' : 'bg-[var(--home-faq-row)]'
      }`}
    >
      <MotionButton
        type="button"
        layout
        onClick={onToggle}
        className="flex w-full items-center gap-4 px-4 py-6 text-right md:px-7 md:py-7"
      >
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0, color: isOpen ? 'var(--home-faq-icon-active)' : 'var(--home-faq-icon)' }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="inline-flex h-8 w-8 items-center justify-center rounded-full text-base"
        >
          <FaChevronDown />
        </motion.span>

        <span
          className={`flex-1 text-[clamp(1.35rem,2.3vw,2.65rem)] font-black leading-tight transition-colors duration-300 ${
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
            initial={{ height: 0, opacity: 0, filter: 'blur(3px)' }}
            animate={{ height: 'auto', opacity: 1, filter: 'blur(0px)' }}
            exit={{ height: 0, opacity: 0, filter: 'blur(2px)' }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden px-4 pb-7 md:px-7"
          >
            <motion.p
              initial={{ y: 4, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 2, opacity: 0 }}
              transition={{ duration: 0.18, delay: 0.02 }}
              className="pr-12 text-[clamp(1.1rem,1.8vw,2rem)] leading-relaxed text-[var(--home-faq-answer)] md:pr-16"
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
