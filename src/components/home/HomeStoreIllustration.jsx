import { motion } from 'framer-motion'

const MotionFigure = motion.figure

function HomeStoreIllustration() {
  return (
    <MotionFigure
      initial={{ opacity: 0, x: -48, scale: 0.96 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      className="relative overflow-hidden rounded-[30px] border border-[var(--home-card-border)] bg-[var(--home-card-bg)] p-3 shadow-[0_30px_80px_rgba(26,38,78,0.16)]"
    >
      <img
        src="/images/home-hero-store.jpg"
        alt="متجر إلكتروني"
        className="h-full w-full rounded-[22px] object-cover"
        loading="eager"
      />
    </MotionFigure>
  )
}

export default HomeStoreIllustration
