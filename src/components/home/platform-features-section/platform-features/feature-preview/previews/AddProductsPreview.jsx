import { motion } from 'framer-motion'
import PreviewShell from '../PreviewShell'

const MotionDiv = motion.div
const MotionSpan = motion.span

function AddProductsPreview({ item }) {
  return (
    <PreviewShell accent={item.accent}>
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="h-2.5 w-28 rounded-full bg-slate-400/42" />
            <div className="h-2.5 w-20 rounded-full bg-slate-400/30" />
          </div>
          <MotionSpan
            animate={{ rotate: [0, 14, -10, 0], y: [0, -2, 0] }}
            transition={{ duration: 1.7, repeat: Infinity, ease: 'easeInOut' }}
            className="inline-flex h-14 w-14 items-center justify-center rounded-xl text-xl"
            style={{ backgroundColor: item.accent, color: '#052830' }}
          >
            <item.icon />
          </MotionSpan>
        </div>

        <MotionDiv
          animate={{
            boxShadow: [
              `0 0 0 0 ${item.accent}00`,
              `0 0 0 5px ${item.accent}2e`,
              `0 0 0 0 ${item.accent}00`,
            ],
          }}
          transition={{ duration: 2, repeat: Infinity }}
          className="rounded-xl border px-3 py-2 text-right text-sm font-bold"
          style={{ borderColor: `${item.accent}79`, color: item.accent, backgroundColor: `${item.accent}18` }}
        >
          إضافة منتج جديد + صورة + سعر
        </MotionDiv>
      </div>
    </PreviewShell>
  )
}

export default AddProductsPreview
