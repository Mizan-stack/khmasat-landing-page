import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef } from 'react'

const MotionDiv = motion.div

function OtpVerificationModal({ isOpen, phoneLabel, code, error, onCodeChange, onClose, onVerify }) {
  const inputRef = useRef(null)

  useEffect(() => {
    if (!isOpen) return

    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const focusTimer = window.setTimeout(() => inputRef.current?.focus(), 180)

    return () => {
      document.body.style.overflow = originalOverflow
      window.clearTimeout(focusTimer)
    }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <MotionDiv className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <MotionDiv
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="absolute inset-0 bg-slate-950/70 backdrop-blur-[2px]"
            onClick={onClose}
          />

          <MotionDiv
            initial={{ opacity: 0, y: 80, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 60, scale: 0.95 }}
            transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-md overflow-hidden rounded-3xl border border-[var(--border-strong)] [background:var(--right-panel-bg)] p-6 shadow-[0_35px_100px_rgba(0,0,0,0.45)]"
          >
            <motion.span
              animate={{ x: [0, 14, 0], y: [0, -12, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[var(--bg-orb-1)] opacity-35 blur-2xl"
            />
            <motion.span
              animate={{ x: [0, -12, 0], y: [0, 10, 0] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
              className="pointer-events-none absolute -bottom-8 -left-8 h-24 w-24 rounded-full bg-[var(--bg-orb-2)] opacity-40 blur-2xl"
            />

            <div className="relative z-10">
              <h3 className="text-right text-3xl font-black text-[var(--right-text-primary)]">تحقق OTP</h3>
              <p className="mt-2 text-right text-sm leading-relaxed text-[var(--right-text-muted)]">
                أدخل رمز التحقق المكوّن من 6 أرقام المرسل إلى:
              </p>
              <p className="mt-1 text-left text-sm font-black tracking-wide text-[var(--accent)]" dir="ltr">
                {phoneLabel}
              </p>

              <input
                ref={inputRef}
                value={code}
                onChange={(event) => onCodeChange(event.target.value)}
                maxLength={6}
                inputMode="numeric"
                dir="ltr"
                placeholder="000000"
                className="mt-4 h-12 w-full rounded-2xl border border-[var(--border-soft)] bg-[var(--surface-soft)] px-4 text-center text-xl font-black tracking-[0.35em] text-[var(--right-text-primary)] outline-none transition-colors placeholder:tracking-normal placeholder:text-[var(--text-placeholder)] focus:border-[var(--accent)]"
              />

              <div className="mt-3 grid grid-cols-6 gap-2">
                {Array.from({ length: 6 }).map((_, index) => (
                  <span
                    key={index}
                    className="flex h-10 items-center justify-center rounded-xl border border-[var(--border-soft)] bg-[var(--surface-soft)] text-base font-black text-[var(--right-text-primary)]"
                  >
                    {code[index] ?? '•'}
                  </span>
                ))}
              </div>

              {error && <p className="mt-3 text-xs font-bold text-red-300">{error}</p>}

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="h-11 rounded-2xl border border-[var(--border-soft)] bg-[var(--surface-soft)] text-sm font-black text-[var(--right-text-primary)] transition-colors hover:border-[var(--accent)]"
                >
                  إلغاء
                </button>
                <button
                  type="button"
                  onClick={onVerify}
                  className="group relative h-11 overflow-hidden rounded-2xl text-sm font-black text-slate-950"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-[var(--accent)] via-[var(--accent-2)] to-[var(--accent-3)] transition-transform duration-500 group-hover:scale-105" />
                  <span className="relative">Verify</span>
                </button>
              </div>
            </div>
          </MotionDiv>
        </MotionDiv>
      )}
    </AnimatePresence>
  )
}

export default OtpVerificationModal
