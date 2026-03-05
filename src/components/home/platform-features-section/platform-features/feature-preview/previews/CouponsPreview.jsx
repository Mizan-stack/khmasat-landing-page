import { motion } from 'framer-motion'
import { FaTags } from 'react-icons/fa'
import PreviewShell from '../PreviewShell'

const MotionDiv = motion.div
const MotionSpan = motion.span

function CouponsPreview({ item }) {
  return (
    <PreviewShell accent={item.accent}>
      <div className="space-y-3">
        {[0, 1].map((coupon, index) => (
          <MotionDiv
            key={coupon}
            animate={{ x: [0, index % 2 === 0 ? -8 : 8, 0] }}
            transition={{ duration: 1.7, repeat: Infinity, ease: 'easeInOut', delay: index * 0.15 }}
            className="relative overflow-hidden rounded-xl border border-cyan-200/20 bg-slate-700/30 px-3 py-2"
          >
            <MotionSpan
              animate={{ x: ['-130%', '130%'] }}
              transition={{ duration: 1.35, repeat: Infinity, ease: 'linear', delay: index * 0.25 }}
              className="absolute inset-y-0 w-2/5"
              style={{
                background: `linear-gradient(90deg, transparent, ${item.accent}4f, transparent)`,
              }}
            />
            <div className="relative flex items-center justify-between gap-2">
              <div className="h-6 w-6 rounded-md bg-slate-400/70" />
              <div className="flex-1 space-y-2">
                <div className="h-2 w-full rounded-full bg-slate-300/58" />
                <div className="h-2 w-3/4 rounded-full bg-slate-300/36" />
              </div>
              <MotionSpan
                animate={{ rotate: [0, -14, 14, 0], scale: [1, 1.1, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-sm"
                style={{ backgroundColor: item.accent, color: '#052830' }}
              >
                <FaTags />
              </MotionSpan>
            </div>
          </MotionDiv>
        ))}
      </div>
    </PreviewShell>
  )
}

export default CouponsPreview
