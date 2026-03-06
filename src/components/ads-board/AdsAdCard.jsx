import { motion } from 'framer-motion'
import { FaClock, FaLocationDot } from 'react-icons/fa6'
import { ADS_PAGE_TEXT } from './adsBoardData'

const MotionArticle = motion.article
const cardVariants = {
  hidden: ({ index, viewMode }) => ({
    opacity: 0,
    y: viewMode === 'list' ? 18 : 26,
    x: viewMode === 'list' ? 26 : 0,
    scale: 0.96,
    transition: {
      duration: 0.26,
      delay: index * 0.03
    }
  }),
  visible: ({ index }) => ({
    opacity: 1,
    y: 0,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.46,
      delay: index * 0.05,
      ease: [0.22, 1, 0.36, 1]
    }
  }),
  exit: ({ index, viewMode }) => ({
    opacity: 0,
    y: -10,
    x: viewMode === 'list' ? -22 : 0,
    scale: 0.97,
    transition: {
      duration: 0.22,
      delay: Math.min(index * 0.02, 0.12),
      ease: 'easeInOut'
    }
  })
}

function AdsAdCard({ item, index, viewMode }) {
  return (
    <MotionArticle
      layout
      custom={{ index, viewMode }}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={{ layout: { type: 'spring', stiffness: 220, damping: 24 } }}
      whileHover={{ y: -8, scale: 1.01 }}
      className={`overflow-hidden rounded-[28px] border border-[var(--ads-border)] bg-[var(--ads-surface)] shadow-[0_18px_34px_rgba(18,34,62,0.12)] ${
        viewMode === 'list' ? 'grid gap-0 md:grid-cols-[360px_1fr]' : ''
      }`}
      dir="rtl"
    >
      <div className="relative overflow-hidden">
        <motion.img
          src={item.image}
          alt={item.title}
          loading="lazy"
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className={`h-full w-full object-cover ${viewMode === 'list' ? 'aspect-[16/10] md:aspect-[4/3]' : 'aspect-[16/10]'}`}
        />

        <div className="absolute inset-x-3 top-3 flex items-center justify-between">
          <span className="rounded-full bg-black/55 px-3 py-1 text-sm font-black text-white backdrop-blur-sm">{item.category}</span>
          {item.featured ? (
            <motion.span
              animate={{ y: [0, -2, 0], boxShadow: ['0 0 0 rgba(0,0,0,0)', '0 8px 16px rgba(96,51,255,0.45)', '0 0 0 rgba(0,0,0,0)'] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              className="rounded-full bg-gradient-to-r from-fuchsia-600 to-violet-500 px-3 py-1 text-sm font-black text-white"
            >
              مميز
            </motion.span>
          ) : null}
        </div>

        <motion.span
          animate={{ opacity: [0.75, 1, 0.75] }}
          transition={{ duration: 1.7, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-3 left-3 rounded-full bg-black/45 px-3 py-1 text-3xl font-black tracking-wide text-white backdrop-blur-sm"
        >
          {item.price}$
        </motion.span>
      </div>

      <div className="flex flex-col p-4 md:p-5">
        <h3 className="text-[clamp(1.15rem,1.8vw,1.9rem)] font-black leading-snug text-[var(--ads-text)]">{item.title}</h3>

        <div className="mt-3 flex flex-wrap items-center justify-end gap-4 text-[clamp(0.95rem,1.2vw,1.1rem)] font-semibold text-[var(--ads-muted)]">
          <span className="inline-flex items-center gap-2">
            <FaLocationDot />
            {item.location}
          </span>
          <span className="inline-flex items-center gap-2">
            <FaClock />
            {item.timeAgo}
          </span>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2 md:mt-auto md:pt-4">
          <button
            type="button"
            className="h-11 rounded-xl border border-[var(--ads-button-ghost-border)] bg-[var(--ads-button-ghost-bg)] text-[clamp(0.95rem,1.2vw,1.05rem)] font-bold text-[var(--ads-button-ghost-text)] transition-all duration-300 hover:-translate-y-0.5"
          >
            {ADS_PAGE_TEXT.dashboard}
          </button>
          <button
            type="button"
            className="h-11 rounded-xl text-[clamp(0.95rem,1.2vw,1.05rem)] font-black text-[var(--ads-button-primary-text)] shadow-[0_10px_20px_rgba(44,183,176,0.3)] transition-all duration-300 hover:-translate-y-0.5 [background:var(--ads-button-primary-bg)]"
          >
            {ADS_PAGE_TEXT.details}
          </button>
        </div>
      </div>
    </MotionArticle>
  )
}

export default AdsAdCard
