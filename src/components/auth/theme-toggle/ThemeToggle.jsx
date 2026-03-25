import { motion } from 'framer-motion'
import { FaMoon, FaSun } from 'react-icons/fa6'
import { useTheme } from '../../../app/providers/useTheme'

const MotionButton = motion.button
const MotionSpan = motion.span
const THEME_OPTIONS = [
  { value: 'dark', label: 'الوضع الليلي', icon: FaMoon },
  { value: 'light', label: 'الوضع النهاري', icon: FaSun },
]

function ThemeToggle() {
  const { isDark, setTheme } = useTheme()

  return (
    <div
      className="relative flex h-10 w-[112px] items-center rounded-full border border-[var(--border-soft)] bg-[var(--surface-soft)] p-1"
      aria-label="تبديل وضع العرض"
    >
      <MotionSpan
        layout
        transition={{ type: 'spring', stiffness: 330, damping: 26 }}
        className="absolute h-8 w-[48px] rounded-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent-2)] shadow-[0_8px_22px_rgba(0,0,0,0.22)]"
        style={{ right: isDark ? 4 : 60 }}
      />

      {THEME_OPTIONS.map((option) => {
        const isActive = isDark ? option.value === 'dark' : option.value === 'light'
        const Icon = option.icon

        return (
          <MotionButton
            key={option.value}
            type="button"
            onClick={() => setTheme(option.value)}
            whileTap={{ scale: 0.92 }}
            className={`relative z-10 flex h-8 w-1/2 items-center justify-center rounded-full text-sm transition-colors ${
              isActive ? 'text-slate-950' : 'text-[var(--text-muted)] hover:text-[var(--accent)]'
            }`}
            aria-label={option.label}
            title={option.label}
          >
            <Icon className="text-base" />
          </MotionButton>
        )
      })}
    </div>
  )
}

export default ThemeToggle
