import { motion } from 'framer-motion'
import { FaGlobe } from 'react-icons/fa'

const MotionButton = motion.button

function AuthLanguageBadge() {
  return (
    <MotionButton
      type="button"
      whileHover={{ y: -1, rotate: -8 }}
      whileTap={{ scale: 0.96 }}
      className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-[var(--border-soft)] bg-[var(--surface-soft)] text-base text-[var(--right-text-primary)] shadow-[0_10px_22px_rgba(19,29,55,0.08)] transition-colors duration-300 hover:border-[var(--accent)]"
      aria-label="العربية"
      title="العربية"
    >
      <FaGlobe />
    </MotionButton>
  )
}

export default AuthLanguageBadge
