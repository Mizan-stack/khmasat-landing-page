import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { MOBILE_PROJECTS, RESTART_DELAY_MS, REVEAL_INTERVAL_MS } from './clientControlData'

const MotionSection = motion.section
const MotionDiv = motion.div
const MotionArticle = motion.article
const MotionSpan = motion.span

function HomeClientControlSection() {
  const [sequenceId, setSequenceId] = useState(0)
  const [visibleCount, setVisibleCount] = useState(0)

  useEffect(() => {
    let nextVisible = 0

    const revealTimer = setInterval(() => {
      nextVisible += 1
      setVisibleCount(nextVisible)

      if (nextVisible >= MOBILE_PROJECTS.length) {
        clearInterval(revealTimer)
      }
    }, REVEAL_INTERVAL_MS)

    const restartTimer = setTimeout(() => {
      setVisibleCount(0)
      setSequenceId((prev) => prev + 1)
    }, REVEAL_INTERVAL_MS * (MOBILE_PROJECTS.length + 1) + RESTART_DELAY_MS)

    return () => {
      clearInterval(revealTimer)
      clearTimeout(restartTimer)
    }
  }, [sequenceId])

  return (
    <MotionSection
      id="client-control"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.55 }}
      className="w-full pb-14 md:pb-24"
    >
      <div className="relative overflow-hidden border-y border-[var(--home-mobile-border)] [background:var(--home-mobile-bg)] py-8 md:py-12">
        <MotionSpan
          aria-hidden
          animate={{ x: [0, 30, 0], y: [0, -20, 0], opacity: [0.22, 0.5, 0.22] }}
          transition={{ duration: 7.4, repeat: Infinity, ease: 'easeInOut' }}
          className="pointer-events-none absolute -left-16 top-10 h-56 w-56 rounded-full [background:var(--home-mobile-glow)] blur-3xl"
        />
        <MotionSpan
          aria-hidden
          animate={{ x: [0, -36, 0], y: [0, 24, 0], opacity: [0.14, 0.36, 0.14] }}
          transition={{ duration: 8.1, repeat: Infinity, ease: 'easeInOut' }}
          className="pointer-events-none absolute -bottom-24 right-[-90px] h-72 w-72 rounded-full [background:var(--home-mobile-glow)] blur-3xl"
        />

        <div className="relative z-10 mx-auto w-full max-w-[1320px] px-3 md:px-6">
          <div className="grid items-center gap-6 md:gap-7 lg:grid-cols-[400px_1fr]" dir="ltr">
            <div className="mx-auto w-full max-w-[360px]">
              <div className="relative h-[720px] rounded-[48px] border border-[var(--home-mobile-phone-border)] bg-[var(--home-mobile-phone-body)] p-2.5 shadow-[0_30px_55px_rgba(8,18,36,0.42)] md:h-[780px]">
                <span className="absolute left-1/2 top-4 h-8 w-36 -translate-x-1/2 rounded-full bg-[var(--home-mobile-notch)]" />

                <div className="flex h-full flex-col overflow-hidden rounded-[38px] border border-[var(--home-mobile-screen-border)] bg-[var(--home-mobile-screen-bg)] px-4 pb-4 pt-11">
                  <div className="text-right">
                    <p className="text-sm font-semibold text-[var(--home-mobile-screen-muted)]">مشاريعي</p>
                    <h3 className="text-[1.25rem] font-black text-[var(--home-mobile-screen-title)]">الخدمات النشطة</h3>
                  </div>

                  <MotionDiv key={sequenceId} className="mt-4 grid grid-cols-2 gap-3 [perspective:1000px]">
                    {MOBILE_PROJECTS.map((project, index) => {
                      const visible = index < visibleCount

                      return (
                        <MotionArticle
                          key={project.id}
                          initial={{ opacity: 0, scale: 0.5, y: 40, rotateY: -48, filter: 'blur(10px)' }}
                          animate={
                            visible
                              ? { opacity: 1, scale: 1, y: 0, rotateY: 0, filter: 'blur(0px)' }
                              : { opacity: 0, scale: 0.64, y: 34, rotateY: -36, filter: 'blur(8px)' }
                          }
                          transition={{
                            type: 'spring',
                            stiffness: 220,
                            damping: 18,
                            mass: 0.7,
                          }}
                          className="group relative h-[96px] overflow-hidden rounded-2xl border border-[var(--home-mobile-thumb-border)] shadow-[0_14px_28px_rgba(10,19,34,0.26)]"
                        >
                          <img src={project.image} alt={project.title} className="h-full w-full object-cover" />
                          <span className="absolute inset-0" style={{ background: project.tint }} />
                          <span className="absolute bottom-2 right-2 rounded-lg bg-black/35 px-2 py-0.5 text-[11px] font-bold text-white">
                            {project.title}
                          </span>
                        </MotionArticle>
                      )
                    })}
                  </MotionDiv>

                  <div className="flex-1" />

                  <div className="mt-5 border-t border-[var(--home-mobile-screen-divider)] pt-3 text-center text-sm font-semibold text-[var(--home-mobile-screen-muted)]">
                    الحالة . الدعم . الفواتير . الملفات
                  </div>
                </div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 44, filter: 'blur(8px)' }}
              whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              dir="rtl"
              className="text-right"
            >
              <h2 className="text-[clamp(1.65rem,3.6vw,3.2rem)] font-black leading-tight text-[var(--home-mobile-title)]">
                تحكم في أصولك الرقمية
              </h2>
              <p className="mt-4 max-w-4xl text-[clamp(0.95rem,1.15vw,1.15rem)] leading-relaxed text-[var(--home-mobile-text)]">
                مكان واحد لإدارة طلبات الخدمة الخاصة بك، وعرض التقدم، والوصول إلى الدعم بسرعة.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </MotionSection>
  )
}

export default HomeClientControlSection
