import { motion } from 'framer-motion'

const MotionSpan = motion.span

function FloatingShape({ className = '', delay = 0 }) {
  return (
    <MotionSpan
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.65, y: [0, -16, 0] }}
      transition={{ duration: 5.5, repeat: Infinity, delay }}
      className={`pointer-events-none absolute rounded-full bg-[var(--orb-color)] blur-3xl ${className}`}
    />
  )
}

export default FloatingShape
