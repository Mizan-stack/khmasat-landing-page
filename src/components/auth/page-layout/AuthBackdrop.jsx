import { motion } from 'framer-motion'

const MotionSpan = motion.span

function AuthBackdrop() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <MotionSpan
        aria-hidden
        animate={{ x: [0, 45, 0], y: [0, -30, 0], opacity: [0.5, 0.85, 0.5] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute right-[-120px] top-[-80px] h-72 w-72 rounded-full bg-[var(--bg-orb-1)] blur-3xl"
      />

      <MotionSpan
        aria-hidden
        animate={{ x: [0, -30, 0], y: [0, 35, 0], opacity: [0.35, 0.7, 0.35] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        className="absolute bottom-[-110px] left-[-120px] h-80 w-80 rounded-full bg-[var(--bg-orb-2)] blur-3xl"
      />

      <MotionSpan
        aria-hidden
        animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.45, 0.2] }}
        transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--bg-orb-3)] blur-3xl"
      />
    </div>
  )
}

export default AuthBackdrop
