import { motion } from 'framer-motion'
import { FaReceipt } from 'react-icons/fa6'
import PreviewShell from '../PreviewShell'

const MotionSpan = motion.span
const MotionP = motion.p

function SectionsPreview({ item }) {
  return (
    <PreviewShell accent={item.accent}>
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <MotionSpan
            animate={{ y: [0, -4, 0], scale: [1, 1.08, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full"
            style={{ backgroundColor: item.accentSoft, color: item.accent }}
          >
            <FaReceipt />
          </MotionSpan>
          <span className="h-3 w-24 rounded-full bg-slate-500/45" />
        </div>

        <div className="rounded-2xl border border-dashed border-slate-500/45 bg-slate-700/25 p-3">
          <p className="text-right text-[11px] font-bold" style={{ color: item.accent }}>
            قسيمة خصم
          </p>
          <MotionP
            animate={{ letterSpacing: ['0.01em', '0.03em', '0.01em'], opacity: [0.82, 1, 0.84] }}
            transition={{ duration: 1.8, repeat: Infinity }}
            className="mt-1 text-right text-[2rem] font-black leading-none"
            style={{ color: item.accent }}
          >
            OFF50-SUMMER
          </MotionP>
          <div className="mt-3 h-2 w-full rounded-full bg-slate-500/38">
            <MotionSpan
              animate={{ width: ['32%', '86%', '54%'] }}
              transition={{ duration: 2.1, repeat: Infinity, ease: 'easeInOut' }}
              className="block h-full rounded-full"
              style={{ backgroundColor: item.accent }}
            />
          </div>
        </div>
      </div>
    </PreviewShell>
  )
}

export default SectionsPreview
