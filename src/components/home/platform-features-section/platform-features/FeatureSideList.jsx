import { motion } from 'framer-motion'
import { FaArrowLeft } from 'react-icons/fa'

const MotionButton = motion.button

function FeatureSideList({ features, activeKey, onChange, listRef, buttonRefs, mobile = false }) {
  if (mobile) {
    return (
      <div dir="rtl" className="overflow-x-auto pb-1 [scrollbar-width:none]">
        <div className="flex w-max gap-3 pe-1">
          {features.map((item) => {
            const isActive = item.key === activeKey
            const Icon = item.icon

            return (
              <MotionButton
                key={item.key}
                type="button"
                onClick={() => onChange(item.key)}
                whileTap={{ scale: 0.96 }}
                className={`relative flex min-w-[172px] shrink-0 items-center gap-3 overflow-hidden rounded-2xl border px-4 py-3 text-right transition-colors ${
                  isActive
                    ? 'border-transparent text-[#07242b]'
                    : 'border-[var(--home-power-list-border)] bg-[var(--home-power-list-bg)] text-[var(--home-power-list-text)]'
                }`}
                style={
                  isActive
                    ? {
                        background: item.activeGradient,
                        boxShadow: `0 14px 28px ${item.glow}`,
                      }
                    : undefined
                }
              >
                <span
                  className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border text-base transition-all duration-300"
                  style={{
                    color: isActive ? '#04252c' : item.accent,
                    backgroundColor: isActive ? `${item.accent}66` : item.accentSoft,
                    borderColor: isActive ? `${item.accent}8f` : `${item.accent}4f`,
                  }}
                >
                  <Icon />
                </span>

                <span className="text-sm font-black leading-snug">{item.label}</span>
              </MotionButton>
            )
          })}
        </div>
      </div>
    )
  }

  return (
    <div ref={listRef} dir="rtl" className="space-y-3">
      {features.map((item) => {
        const isActive = item.key === activeKey
        const Icon = item.icon

        return (
          <MotionButton
            key={item.key}
            ref={(node) => {
              if (!buttonRefs?.current) return

              if (node) {
                buttonRefs.current.set(item.key, node)
                return
              }

              buttonRefs.current.delete(item.key)
            }}
            type="button"
            onClick={() => onChange(item.key)}
            whileTap={{ scale: 0.96 }}
            className="relative w-full overflow-visible rounded-2xl border border-[var(--home-power-list-border)] bg-[var(--home-power-list-bg)] px-4 py-3 text-right"
          >
            {isActive && (
              <>
                <motion.span
                  layoutId="power-list-active-bg"
                  transition={{ type: 'spring', stiffness: 260, damping: 24 }}
                  className="absolute inset-0 rounded-2xl"
                  style={{
                    background: item.activeGradient,
                    boxShadow: `0 16px 32px ${item.glow}`,
                  }}
                />
                <motion.span
                  layoutId="power-list-active-arrow"
                  transition={{ type: 'spring', stiffness: 300, damping: 26 }}
                  className="absolute -left-2.5 top-1/2 h-5 w-5 -translate-y-1/2 rotate-45 rounded-[5px]"
                  style={{
                    background: item.activeGradient,
                    boxShadow: `0 0 0 6px ${item.glow}`,
                  }}
                />
              </>
            )}

            <div className="relative z-10 flex items-center gap-3">
              <span
                className="inline-flex h-9 w-9 items-center justify-center rounded-xl border text-base transition-all duration-300"
                style={{
                  color: isActive ? '#04252c' : item.accent,
                  backgroundColor: isActive ? `${item.accent}66` : item.accentSoft,
                  borderColor: isActive ? `${item.accent}8f` : `${item.accent}4f`,
                }}
              >
                <Icon />
              </span>

              <span
                className={`flex-1 text-right text-xl font-black transition-colors ${
                  isActive ? 'text-[#07242b]' : 'text-[var(--home-power-list-text)]'
                }`}
              >
                {item.label}
              </span>

              <motion.span
                animate={
                  isActive
                    ? { x: [4, -8, 4], rotate: [0, -13, 0], opacity: [0.8, 1, 0.8] }
                    : { x: 0, rotate: 0, opacity: 0.45 }
                }
                transition={{ duration: 1.05, repeat: isActive ? Infinity : 0, ease: 'easeInOut' }}
                className={`inline-flex h-8 w-8 items-center justify-center rounded-full ${
                  isActive ? 'bg-cyan-950/35 text-[#072e36]' : 'bg-cyan-500/12 text-[var(--home-power-list-text)]'
                }`}
              >
                <FaArrowLeft />
              </motion.span>
            </div>

          </MotionButton>
        )
      })}
    </div>
  )
}

export default FeatureSideList
