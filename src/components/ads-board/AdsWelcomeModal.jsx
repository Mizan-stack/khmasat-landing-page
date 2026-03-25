import { AnimatePresence, motion } from 'framer-motion'
import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import {
  FaArrowLeftLong,
  FaBullhorn,
  FaChartLine,
  FaCircleCheck,
  FaRocket,
  FaWandMagicSparkles,
  FaXmark,
} from 'react-icons/fa6'

const MotionDiv = motion.div
const MotionButton = motion.button

const FEATURE_ITEMS = [
  {
    icon: FaBullhorn,
    title: 'ابدأ حملتك القادمة',
    description: 'أطلق إعلانًا جديدًا بسرعة ووصّل رسالتك للعميل المناسب في وقت قياسي.',
  },
  {
    icon: FaChartLine,
    title: 'تابع الأداء بذكاء',
    description: 'راقب النتائج، عدّل خطتك، وخذ قرارات أسرع من داخل لوحة واحدة مرتبة.',
  },
  {
    icon: FaRocket,
    title: 'نمّي حضورك بثقة',
    description: 'المنصة جاهزة الآن لتكبير مبيعاتك وبناء حضور أقوى لعلامتك التجارية.',
  },
]

const PARTICLES = [
  { className: 'right-[14%] top-[18%] h-2.5 w-2.5', delay: 0.1, duration: 4.6 },
  { className: 'right-[28%] top-[10%] h-1.5 w-1.5', delay: 0.4, duration: 5.3 },
  { className: 'left-[16%] top-[24%] h-2 w-2', delay: 0.7, duration: 4.9 },
  { className: 'left-[11%] bottom-[22%] h-3 w-3', delay: 1, duration: 5.8 },
  { className: 'right-[18%] bottom-[18%] h-2 w-2', delay: 1.3, duration: 4.8 },
  { className: 'left-[30%] bottom-[12%] h-1.5 w-1.5', delay: 0.2, duration: 5.4 },
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 18,
    filter: 'blur(6px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

function formatUserLabel(userLabel) {
  const trimmed = userLabel.trim()
  if (!trimmed) return ''

  if (trimmed.includes('@')) {
    const [namePart] = trimmed.split('@')
    return namePart.length <= 22 ? namePart : trimmed
  }

  return trimmed.length <= 20 ? trimmed : `${trimmed.slice(0, 20)}...`
}

function AdsWelcomeModal({ isOpen, onClose, userLabel = '' }) {
  const displayUser = formatUserLabel(userLabel)

  useEffect(() => {
    if (!isOpen) return undefined

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    function handleEscape(event) {
      if (event.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', handleEscape)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, onClose])

  if (typeof document === 'undefined') return null

  return createPortal(
    <AnimatePresence>
      {isOpen ? (
        <MotionDiv
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[2100] flex items-center justify-center p-3 md:p-6"
        >
          <button
            type="button"
            aria-label="إغلاق نافذة الترحيب"
            onClick={onClose}
            className="absolute inset-0 bg-slate-950/56 backdrop-blur-[6px]"
          />

          <MotionDiv
            role="dialog"
            aria-modal="true"
            aria-labelledby="ads-welcome-title"
            initial={{ opacity: 0, y: 42, scale: 0.9, rotateX: 16 }}
            animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
            exit={{ opacity: 0, y: 26, scale: 0.95 }}
            transition={{ duration: 0.56, ease: [0.22, 1, 0.36, 1] }}
            onClick={(event) => event.stopPropagation()}
            dir="rtl"
            style={{
              background: 'var(--ads-welcome-bg)',
              borderColor: 'var(--ads-welcome-border)',
              boxShadow: '0 34px 90px rgba(5, 15, 36, 0.46)',
            }}
            className="relative isolate w-full max-w-[760px] overflow-hidden rounded-[32px] border px-5 py-6 text-white md:px-8 md:py-8"
          >
            <div className="pointer-events-none absolute inset-0">
              <motion.div
                animate={{ x: [0, -14, 0], y: [0, 10, 0], scale: [1, 1.08, 1] }}
                transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                style={{ backgroundColor: 'var(--ads-welcome-glow)' }}
                className="absolute -right-12 top-[-52px] h-52 w-52 rounded-full blur-3xl"
              />

              <motion.div
                animate={{ x: [0, 18, 0], y: [0, -12, 0], scale: [1, 0.94, 1] }}
                transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
                style={{ backgroundColor: 'var(--ads-welcome-glow)' }}
                className="absolute -left-10 bottom-[-56px] h-56 w-56 rounded-full blur-3xl"
              />

              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
                className="absolute left-[-42px] top-[-42px] h-48 w-48 rounded-full border border-white/10"
              />

              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
                className="absolute bottom-[-72px] right-[-20px] h-64 w-64 rounded-full border border-white/10"
              />

              {PARTICLES.map((particle) => (
                <motion.span
                  key={particle.className}
                  animate={{ y: [0, -10, 0], opacity: [0.35, 1, 0.35], scale: [1, 1.25, 1] }}
                  transition={{
                    duration: particle.duration,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: particle.delay,
                  }}
                  className={`absolute rounded-full bg-white/80 shadow-[0_0_22px_rgba(255,255,255,0.55)] ${particle.className}`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={onClose}
              style={{ backgroundColor: 'var(--ads-welcome-close-bg)' }}
              className="absolute left-4 top-4 z-20 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-lg text-white transition-all duration-300 hover:rotate-90 hover:scale-105"
            >
              <FaXmark />
            </button>

            <MotionDiv variants={containerVariants} initial="hidden" animate="visible" className="relative z-10">
              <motion.div
                variants={itemVariants}
                style={{
                  backgroundColor: 'var(--ads-welcome-pill-bg)',
                  borderColor: 'var(--ads-welcome-pill-border)',
                }}
                className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-black text-white/95 backdrop-blur-md"
              >
                <FaCircleCheck className="text-emerald-200" />
                تم تسجيل الدخول بنجاح
              </motion.div>

              {displayUser ? (
                <motion.div
                  variants={itemVariants}
                  style={{
                    backgroundColor: 'var(--ads-welcome-pill-bg)',
                    borderColor: 'var(--ads-welcome-pill-border)',
                  }}
                  className="mt-3 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold text-white/85 backdrop-blur-md"
                >
                  <FaWandMagicSparkles className="text-cyan-100" />
                  <span>مرحبًا بعودتك</span>
                  <span className="rounded-full bg-black/15 px-3 py-1 font-black text-white" dir="ltr">
                    {displayUser}
                  </span>
                </motion.div>
              ) : null}

              <motion.h2
                id="ads-welcome-title"
                variants={itemVariants}
                className="mt-5 max-w-[560px] text-[clamp(1.55rem,3.9vw,2.7rem)] font-black leading-[1.1] tracking-tight text-white"
              >
                أهلاً بك داخل لوحة
                <br />
                الإعلانات الخاصة بك
              </motion.h2>

              <motion.p
                variants={itemVariants}
                style={{ color: 'var(--ads-welcome-muted)' }}
                className="mt-3.5 max-w-[560px] text-[clamp(0.88rem,1.15vw,1rem)] leading-7"
              >
                كل شيء جاهز الآن لتبدأ بسرعة: أضف إعلانًا جديدًا، راقب الأداء، وحرّك نشاطك التجاري من مكان واحد
                بتجربة عربية أنيقة وسريعة.
              </motion.p>

              <motion.div variants={itemVariants} className="mt-6 grid gap-3 md:grid-cols-3">
                {FEATURE_ITEMS.map((feature, index) => {
                  const Icon = feature.icon

                  return (
                    <motion.div
                      key={feature.title}
                      whileHover={{ y: -6, scale: 1.01 }}
                      transition={{ duration: 0.28, ease: 'easeOut', delay: index * 0.03 }}
                      style={{
                        backgroundColor: 'var(--ads-welcome-card-bg)',
                        borderColor: 'var(--ads-welcome-card-border)',
                      }}
                      className="rounded-[22px] border p-3.5 backdrop-blur-md"
                    >
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white/16 text-lg text-white shadow-[0_14px_24px_rgba(0,0,0,0.18)]">
                        <Icon />
                      </span>
                      <h3 className="mt-3 text-base font-black text-white md:text-[1.05rem]">{feature.title}</h3>
                      <p className="mt-1.5 text-[0.82rem] leading-6 text-white/82 md:text-[0.88rem]">{feature.description}</p>
                    </motion.div>
                  )
                })}
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="inline-flex items-center gap-2 text-sm font-semibold text-white/82">
                  <FaWandMagicSparkles className="text-cyan-100" />
                  لحظة البداية مهمة، فخلّينا نبدأها بانطباع قوي.
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <MotionButton
                    type="button"
                    whileHover={{ y: -3, scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={onClose}
                    className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-2xl bg-white px-5 text-sm font-black text-slate-900 shadow-[0_18px_42px_rgba(255,255,255,0.24)] md:text-[0.95rem]"
                  >
                    <motion.span
                      animate={{ x: ['-140%', '180%'] }}
                      transition={{ duration: 1.8, repeat: Infinity, repeatDelay: 0.45, ease: 'linear' }}
                      className="absolute inset-y-0 w-20 bg-sky-200/70 blur-md"
                    />
                    <span className="relative inline-flex items-center gap-2">
                      ابدأ إدارة إعلاناتي
                      <motion.span animate={{ x: [0, -4, 0] }} transition={{ duration: 1.2, repeat: Infinity }}>
                        <FaArrowLeftLong />
                      </motion.span>
                    </span>
                  </MotionButton>

                  <MotionButton
                    type="button"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={onClose}
                    style={{
                      backgroundColor: 'var(--ads-welcome-pill-bg)',
                      borderColor: 'var(--ads-welcome-pill-border)',
                    }}
                    className="inline-flex h-12 items-center justify-center rounded-2xl border px-4 text-[0.82rem] font-bold text-white/92 backdrop-blur-md md:text-sm"
                  >
                    متابعة اللوحة
                  </MotionButton>
                </div>
              </motion.div>
            </MotionDiv>
          </MotionDiv>
        </MotionDiv>
      ) : null}
    </AnimatePresence>,
    document.body,
  )
}

export default AdsWelcomeModal
