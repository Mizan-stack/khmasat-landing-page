import { motion } from 'framer-motion'
import { FaMoon, FaSun } from 'react-icons/fa6'
import { useTheme } from '../../../app/providers/useTheme'

const MotionButton = motion.button
const MotionSpan = motion.span
const THEME_OPTIONS = [
  { value: 'dark', label: 'الوضع الليلي', icon: FaMoon, wobble: -14 },
  { value: 'light', label: 'الوضع النهاري', icon: FaSun, wobble: 14 },
]

function HomeThemeToggle() {
  const { isDark, setTheme } = useTheme()

  return (
    <div
      className="relative flex h-12 w-[116px] items-center rounded-full border border-[var(--home-nav-border)] bg-[var(--home-surface-soft)]/90 p-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.35)] backdrop-blur"
      aria-label="تبديل وضع العرض"
    >
      <MotionSpan
        layout
        animate={{
          x: isDark ? 0 : -54,
          rotate: isDark ? -8 : 8,
        }}
        transition={{ type: 'spring', stiffness: 360, damping: 26 }}
        className="absolute right-1 h-10 w-[50px] rounded-full bg-gradient-to-r from-[var(--home-accent)] to-[var(--home-accent-2)] shadow-[0_10px_24px_rgba(33,143,185,0.28)]"
      />

      {THEME_OPTIONS.map((option) => {
        const isActive = isDark ? option.value === 'dark' : option.value === 'light'
        const Icon = option.icon

        return (
          <MotionButton
            key={option.value}
            type="button"
            onClick={() => setTheme(option.value)}
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.9 }}
            animate={
              isActive
                ? {
                    scale: [1, 1.08, 1],
                    rotate: [0, option.wobble, 0],
                  }
                : {
                    scale: 1,
                    rotate: 0,
                  }
            }
            transition={{ duration: 0.42, ease: 'easeOut' }}
            className={`relative z-10 flex h-10 w-[54px] items-center justify-center rounded-full text-lg transition-colors ${
              isActive ? 'text-slate-950' : 'text-[var(--home-text-muted)] hover:text-[var(--home-accent)]'
            }`}
            aria-label={option.label}
            title={option.label}
          >
            <Icon className={isActive ? 'drop-shadow-[0_0_10px_rgba(255,255,255,0.55)]' : ''} />
          </MotionButton>
        )
      })}
    </div>
  )
}

export default HomeThemeToggle
