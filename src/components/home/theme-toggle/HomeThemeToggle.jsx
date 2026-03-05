import { motion } from 'framer-motion'
import { useTheme } from '../../../app/providers/useTheme'

const MotionSpan = motion.span

function HomeThemeToggle() {
  const { isDark, setTheme } = useTheme()

  return (
    <div className="relative flex h-11 w-[146px] items-center rounded-xl border border-[var(--home-nav-border)] bg-[var(--home-surface-soft)] p-1">
      <MotionSpan
        layout
        transition={{ type: 'spring', stiffness: 330, damping: 28 }}
        className="absolute h-9 w-[68px] rounded-lg bg-gradient-to-r from-[var(--home-accent)] to-[var(--home-accent-2)] shadow-[0_8px_20px_rgba(0,0,0,0.15)]"
        style={{ right: isDark ? 4 : 74 }}
      />

      <button
        type="button"
        onClick={() => setTheme('dark')}
        className={`relative z-10 w-1/2 text-sm font-black transition-colors ${
          isDark ? 'text-slate-950' : 'text-[var(--home-text-muted)]'
        }`}
      >
        ليلي
      </button>
      <button
        type="button"
        onClick={() => setTheme('light')}
        className={`relative z-10 w-1/2 text-sm font-black transition-colors ${
          !isDark ? 'text-slate-950' : 'text-[var(--home-text-muted)]'
        }`}
      >
        نهاري
      </button>
    </div>
  )
}

export default HomeThemeToggle
