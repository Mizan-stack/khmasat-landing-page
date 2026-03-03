import { motion } from 'framer-motion'

const MotionSection = motion.section
const MotionDiv = motion.div
const MotionSpan = motion.span

const MARKETING_COPY = {
  login: {
    eyebrow: 'إعلانات ذكية. نتائج أوضح.',
    title: 'أطلق إعلانك\nوخلي منتجك يوصل',
    description: 'منصة إعلانات عربية متكاملة لإدارة الحملات وتحليل النتائج لحظة بلحظة، مع تجربة استخدام بسيطة وسريعة.',
    pill: 'منصة إعلانات سريعة بواجهة عربية كاملة',
  },
  signup: {
    eyebrow: 'انطلق الآن بخطة ترويج أقوى.',
    title: 'ابدأ رحلة الإعلان\nووصل لعملاء أكثر',
    description: 'أنشئ حسابك كمعلن وابدأ إعداد حملات مدفوعة بذكاء، مع أدوات عربية سهلة للمتابعة والتحسين اليومي.',
    pill: 'تسجيل سريع وتجربة واضحة من أول خطوة',
  },
}

function MarketingPanel({ variant = 'login', from = 'left' }) {
  const content = MARKETING_COPY[variant] ?? MARKETING_COPY.login
  const panelShift = from === 'right' ? 90 : -90
  const textShift = from === 'right' ? 40 : -40

  return (
    <MotionSection
      initial={{ opacity: 0, x: panelShift }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className="relative flex h-full items-center overflow-hidden rounded-[30px] border border-[var(--border-strong)] [background:var(--left-panel-bg)] p-6 md:p-8"
    >
      <FloatingShape className="-right-20 top-14 h-56 w-56" />
      <FloatingShape className="left-[-56px] bottom-[-28px] h-44 w-44" delay={0.4} />
      <FloatingShape className="right-[38%] top-[44%] h-28 w-28" delay={0.9} />

      <MotionDiv
        initial={{ opacity: 0, x: textShift }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.75, delay: 0.18 }}
        className="relative z-10"
      >
        <p className="text-center text-lg font-semibold tracking-tight text-[var(--left-title-soft)] md:text-xl">
          {content.eyebrow}
        </p>

        <h1 className="mt-7 text-center text-[clamp(2.2rem,4.6vw,5rem)] font-black leading-tight text-[var(--left-title-main)] md:mt-9">
          {content.title.split('\n').map((line, index) => (
            <span key={line}>
              {index > 0 && <br />}
              {line}
            </span>
          ))}
        </h1>

        <p className="mx-auto mt-5 max-w-xl text-center text-base leading-relaxed text-[var(--left-paragraph)] md:text-xl">
          {content.description}
        </p>

        <MotionDiv
          initial={{ y: 18, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.45, duration: 0.55 }}
          className="mt-7 flex justify-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-[var(--left-pill-border)] [background:var(--left-pill-bg)] px-5 py-2 text-sm font-bold text-[var(--left-pill-text)]">
            <span>⚡</span>
            <span>{content.pill}</span>
          </span>
        </MotionDiv>
      </MotionDiv>
    </MotionSection>
  )
}

function FloatingShape({ className = '', delay = 0 }) {
  return (
    <MotionSpan
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.65, y: [0, -16, 0] }}
      transition={{ duration: 5.5, repeat: Infinity, delay }}
      className={`pointer-events-none absolute rounded-full bg-[var(--orb-color)] blur-3xl ${className}`}
    />
  )
}

export default MarketingPanel
