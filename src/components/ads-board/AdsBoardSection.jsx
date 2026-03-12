import { AnimatePresence, motion } from 'framer-motion'
import { useMemo, useState } from 'react'
import { FaPlus } from 'react-icons/fa6'
import { AddAdModal } from './add-ad-modal'
import AdsAdCard from './AdsAdCard'
import AdsBoardToolbar from './AdsBoardToolbar'
import { ADS_ITEMS, ADS_PAGE_TEXT } from './adsBoardData'

const MotionSection = motion.section
const MotionDiv = motion.div

function sortItems(items, sortBy) {
  const data = [...items]
  if (sortBy === 'priceLow') {
    return data.sort((a, b) => a.price - b.price)
  }
  if (sortBy === 'priceHigh') {
    return data.sort((a, b) => b.price - a.price)
  }
  return data.sort((a, b) => b.createdRank - a.createdRank)
}

function AdsBoardSection() {
  const [sortBy, setSortBy] = useState('latest')
  const [viewMode, setViewMode] = useState('grid')
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)

  const ads = useMemo(() => sortItems(ADS_ITEMS, sortBy), [sortBy])

  return (
    <MotionSection
      id="ads-board"
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mx-auto w-full max-w-[1320px] px-3 pb-20 pt-7 md:px-6 md:pt-10"
    >
      <MotionDiv
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="mb-5 flex justify-start"
        dir="rtl"
      >
        <motion.button
          type="button"
          whileHover={{ y: -3, scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => setIsAddModalOpen(true)}
          className="inline-flex h-12 items-center gap-2 rounded-2xl px-5 text-[clamp(1rem,1.2vw,1.1rem)] font-black text-[var(--ads-create-text)] shadow-[0_14px_26px_rgba(32,179,170,0.34)] [background:var(--ads-create-bg)]"
        >
          <FaPlus />
          {ADS_PAGE_TEXT.createService}
        </motion.button>
      </MotionDiv>

      <AdsBoardToolbar
        resultLabel={ADS_PAGE_TEXT.resultLabel}
        sortBy={sortBy}
        onSortChange={setSortBy}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />

      <AnimatePresence mode="wait" initial={false}>
        <MotionDiv
          key={viewMode}
          initial={{ opacity: 0, y: 16, filter: 'blur(5px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
          transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
          className={`mt-6 grid gap-5 ${viewMode === 'grid' ? 'lg:grid-cols-2' : 'grid-cols-1'}`}
        >
          {ads.map((item, index) => (
            <AdsAdCard key={`${viewMode}-${item.id}`} item={item} index={index} viewMode={viewMode} />
          ))}
        </MotionDiv>
      </AnimatePresence>

      <AddAdModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
    </MotionSection>
  )
}

export default AdsBoardSection
