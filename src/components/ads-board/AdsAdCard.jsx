import { motion } from 'framer-motion'
import { FaCalendarDays, FaClock, FaLocationDot } from 'react-icons/fa6'
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
      delay: index * 0.03,
    },
  }),
  visible: ({ index }) => ({
    opacity: 1,
    y: 0,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.46,
      delay: index * 0.05,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
  exit: ({ index, viewMode }) => ({
    opacity: 0,
    y: -10,
    x: viewMode === 'list' ? -22 : 0,
    scale: 0.97,
    transition: {
      duration: 0.22,
      delay: Math.min(index * 0.02, 0.12),
      ease: 'easeInOut',
    },
  }),
}

function AdsAdCard({ item, index, viewMode, onUpgrade }) {
  const isGrid = viewMode === 'grid'

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
        isGrid ? 'flex h-full flex-col' : 'grid grid-cols-[128px_1fr] gap-0 sm:grid-cols-[168px_1fr] md:grid-cols-[250px_1fr]'
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
          className={`h-full w-full object-cover ${isGrid ? 'aspect-[4/3]' : 'aspect-[5/4] sm:aspect-[4/3] md:aspect-[5/4]'}`}
        />

        <div className={`absolute flex items-center justify-between ${isGrid ? 'inset-x-2.5 top-2.5' : 'inset-x-2 top-2 sm:inset-x-3 sm:top-3'}`}>
          <span
            className={`rounded-full bg-black/55 font-black text-white backdrop-blur-sm ${
              isGrid ? 'px-2.5 py-1 text-[0.72rem]' : 'px-2 py-1 text-[0.64rem] sm:px-2.5 sm:text-[0.74rem] md:px-3 md:text-sm'
            }`}
          >
            {item.planName}
          </span>

          {item.featured ? (
            <motion.span
              animate={{ y: [0, -2, 0], boxShadow: ['0 0 0 rgba(0,0,0,0)', '0 8px 16px rgba(96,51,255,0.45)', '0 0 0 rgba(0,0,0,0)'] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              className={`rounded-full bg-gradient-to-r from-fuchsia-600 to-violet-500 font-black text-white ${
                isGrid ? 'px-2.5 py-1 text-[0.72rem]' : 'px-2 py-1 text-[0.64rem] sm:px-2.5 sm:text-[0.74rem] md:px-3 md:text-sm'
              }`}
            >
              مميز
            </motion.span>
          ) : null}
        </div>

        <motion.span
          animate={{ opacity: [0.75, 1, 0.75] }}
          transition={{ duration: 1.7, repeat: Infinity, ease: 'easeInOut' }}
          className={`absolute rounded-full bg-black/45 font-black tracking-wide text-white backdrop-blur-sm ${
            isGrid
              ? 'bottom-2.5 left-2.5 px-2.5 py-1 text-[1.7rem]'
              : 'bottom-2 left-2 px-2 py-1 text-[1.45rem] sm:bottom-2.5 sm:left-2.5 sm:px-2.5 sm:text-[1.85rem] md:bottom-3 md:left-3 md:px-3 md:text-3xl'
          }`}
        >
          {item.price}$
        </motion.span>
      </div>

      <div className={`flex flex-1 flex-col ${isGrid ? 'p-3.5' : 'p-3 ps-3 pe-2.5 sm:p-3.5 md:p-4'}`}>
        <h3
          className={`font-black leading-snug text-[var(--ads-text)] ${
            isGrid
              ? 'text-[0.98rem] [display:-webkit-box] overflow-hidden [-webkit-box-orient:vertical] [-webkit-line-clamp:3]'
              : 'text-[0.88rem] [display:-webkit-box] overflow-hidden [-webkit-box-orient:vertical] [-webkit-line-clamp:2] sm:text-[0.96rem] md:text-[clamp(0.94rem,1.2vw,1.2rem)]'
          }`}
        >
          {item.title}
        </h3>

        <div
          className={`inline-flex items-center justify-end gap-2 font-semibold text-[var(--ads-muted)] ${
            isGrid ? 'mt-2 text-[0.78rem]' : 'mt-1.5 text-[0.72rem] sm:mt-2 sm:text-[0.8rem] md:text-[0.88rem]'
          }`}
        >
          <span>{ADS_PAGE_TEXT.expiresLabel}</span>
          <span>{item.expiresOn}</span>
          <FaCalendarDays />
        </div>

        <div
          className={`flex flex-wrap items-center justify-end font-semibold text-[var(--ads-muted)] ${
            isGrid ? 'mt-2 gap-2 text-[0.8rem]' : 'mt-1.5 gap-x-2 gap-y-1 text-[0.72rem] sm:mt-2 sm:text-[0.8rem] md:mt-2.5 md:gap-3 md:text-[0.92rem]'
          }`}
        >
          <span className="inline-flex items-center gap-2">
            <FaLocationDot />
            {item.location}
          </span>
          <span className="inline-flex items-center gap-2">
            <FaClock />
            {item.timeAgo}
          </span>
        </div>

        <div
          className={`grid gap-2 ${
            isGrid ? 'mt-auto grid-cols-3 pt-3' : 'mt-auto grid-cols-2 pt-2 sm:grid-cols-3 sm:pt-3 md:mt-3'
          }`}
        >
          <button
            type="button"
            className={`rounded-xl border border-[var(--ads-button-ghost-border)] bg-[var(--ads-button-ghost-bg)] font-bold text-[var(--ads-button-ghost-text)] transition-all duration-300 hover:-translate-y-0.5 ${
              isGrid ? 'h-10 px-2 text-[0.76rem]' : 'h-9 px-2 text-[0.72rem] sm:h-10 sm:text-[0.78rem] md:text-[0.84rem]'
            }`}
          >
            {ADS_PAGE_TEXT.dashboard}
          </button>

          <button
            type="button"
            className={`rounded-xl font-black text-[var(--ads-button-primary-text)] shadow-[0_10px_20px_rgba(44,183,176,0.3)] transition-all duration-300 hover:-translate-y-0.5 [background:var(--ads-button-primary-bg)] ${
              isGrid ? 'h-10 px-2 text-[0.76rem]' : 'h-9 px-2 text-[0.72rem] sm:h-10 sm:text-[0.78rem] md:text-[0.84rem]'
            }`}
          >
            {ADS_PAGE_TEXT.goToAd}
          </button>

          <button
            type="button"
            className={`rounded-xl bg-gradient-to-r from-fuchsia-600 to-violet-500 font-black text-white shadow-[0_10px_22px_rgba(167,40,255,0.28)] transition-all duration-300 hover:-translate-y-0.5 ${
              isGrid
                ? 'h-10 px-2 text-[0.76rem]'
                : 'col-span-2 h-9 px-2 text-[0.72rem] sm:col-span-1 sm:h-10 sm:text-[0.78rem] md:text-[0.84rem]'
            }`}
            onClick={() => onUpgrade(item)}
          >
            {ADS_PAGE_TEXT.upgrade}
          </button>
        </div>
      </div>
    </MotionArticle>
  )
}

export default AdsAdCard
