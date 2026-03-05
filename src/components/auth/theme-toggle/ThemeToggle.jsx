import { motion } from 'framer-motion'
import { useTheme } from '../../../app/providers/useTheme'

const MotionSpan = motion.span

function ThemeToggle() {
  const { isDark, setTheme } = useTheme()

  return (
    <div className="relative flex h-12 w-[150px] items-center rounded-full border border-[var(--border-soft)] bg-[var(--surface-soft)] p-1">
      <MotionSpan
        layout
        transition={{ type: 'spring', stiffness: 330, damping: 26 }}
        className="absolute h-10 w-[70px] rounded-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent-2)] shadow-[0_8px_22px_rgba(0,0,0,0.22)]"
        style={{ right: isDark ? 4 : 76 }}
      />
      <button
        type="button"
        onClick={() => setTheme('dark')}
        className={`relative z-10 w-1/2 text-sm font-extrabold transition-colors ${
          isDark ? 'text-slate-950' : 'text-[var(--text-muted)]'
        }`}
      >
        ليلي
      </button>
      <button
        type="button"
        onClick={() => setTheme('light')}
        className={`relative z-10 w-1/2 text-sm font-extrabold transition-colors ${
          !isDark ? 'text-slate-950' : 'text-[var(--text-muted)]'
        }`}
      >
        نهاري
      </button>
    </div>
  )
}

export default ThemeToggle
