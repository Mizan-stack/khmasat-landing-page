import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { FaChevronDown, FaGrip, FaListUl } from 'react-icons/fa6'
import { ADS_SORT_OPTIONS } from './adsBoardData'

const MotionDiv = motion.div
const MotionButton = motion.button

function AdsBoardToolbar({ resultLabel, sortBy, onSortChange, viewMode, onViewModeChange }) {
  const [open, setOpen] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    if (!open) return undefined

    function onPointerDown(event) {
      if (!dropdownRef.current?.contains(event.target)) {
        setOpen(false)
      }
    }

    window.addEventListener('pointerdown', onPointerDown)
    return () => window.removeEventListener('pointerdown', onPointerDown)
  }, [open])

  const selectedOption = ADS_SORT_OPTIONS.find((option) => option.value === sortBy) ?? ADS_SORT_OPTIONS[0]
  const viewToggleButtons = [
    { value: 'list', label: 'عرض القائمة', icon: FaListUl, activeRotate: -8 },
    { value: 'grid', label: 'عرض الشبكة', icon: FaGrip, activeRotate: 8 }
  ]

  return (
    <MotionDiv
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.08 }}
      className="rounded-3xl border border-[var(--ads-border)] bg-[var(--ads-surface)] p-4 shadow-[0_14px_35px_rgba(19,34,61,0.12)]"
      dir="rtl"
    >
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <p className="text-right text-[clamp(1.1rem,1.6vw,1.8rem)] font-semibold text-[var(--ads-muted)]">{resultLabel}</p>

        <div className="flex items-center justify-end gap-2">
          <div className="inline-flex items-center rounded-2xl border border-[var(--ads-border-soft)] bg-[var(--ads-surface-soft)] p-1">
            {viewToggleButtons.map((button) => {
              const Icon = button.icon
              const isActive = viewMode === button.value

              return (
                <button
                  key={button.value}
                  type="button"
                  onClick={() => onViewModeChange(button.value)}
                  className="relative inline-flex h-11 w-11 items-center justify-center rounded-xl text-xl"
                  aria-label={button.label}
                >
                  {isActive ? (
                    <motion.span
                      layoutId="ads-view-mode-active-pill"
                      transition={{ type: 'spring', stiffness: 320, damping: 24, mass: 0.8 }}
                      className="absolute inset-0 rounded-xl bg-[var(--ads-toggle-active-bg)] shadow-[0_8px_24px_rgba(20,176,173,0.22)]"
                    />
                  ) : null}

                  <motion.span
                    className={`relative z-10 ${
                      isActive ? 'text-[var(--ads-toggle-active-text)]' : 'text-[var(--ads-toggle-text)]'
                    }`}
                    animate={
                      isActive
                        ? { scale: [1, 1.2, 1], rotate: [0, button.activeRotate, 0] }
                        : { scale: 1, rotate: 0 }
                    }
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                  >
                    <Icon />
                  </motion.span>
                </button>
              )
            })}
          </div>

          <div ref={dropdownRef} className="relative min-w-[160px]">
            <MotionButton
              type="button"
              whileTap={{ scale: 0.97 }}
              onClick={() => setOpen((current) => !current)}
              className="flex h-14 w-full items-center justify-between rounded-2xl border border-[var(--ads-border-soft)] bg-[var(--ads-surface-soft)] px-4 text-[clamp(1rem,1.3vw,1.25rem)] font-bold text-[var(--ads-text)]"
            >
              <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.22 }}>
                <FaChevronDown />
              </motion.span>
              <span>{selectedOption.label}</span>
            </MotionButton>

            <AnimatePresence>
              {open ? (
                <MotionDiv
                  initial={{ opacity: 0, y: 10, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.96 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 top-[calc(100%+8px)] z-20 w-full overflow-hidden rounded-2xl border border-[var(--ads-dropdown-border)] bg-[var(--ads-dropdown-bg)] shadow-[0_16px_30px_rgba(9,19,36,0.2)]"
                >
                  {ADS_SORT_OPTIONS.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => {
                        onSortChange(option.value)
                        setOpen(false)
                      }}
                      className={`block w-full px-4 py-3 text-right text-base font-bold transition-colors ${
                        option.value === sortBy
                          ? 'bg-[var(--ads-dropdown-active-bg)] text-[var(--ads-dropdown-active-text)]'
                          : 'text-[var(--ads-text)] hover:bg-[var(--ads-dropdown-hover-bg)]'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </MotionDiv>
              ) : null}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </MotionDiv>
  )
}

export default AdsBoardToolbar
