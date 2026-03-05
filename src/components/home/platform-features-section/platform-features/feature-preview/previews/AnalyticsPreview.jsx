import { motion } from 'framer-motion'
import PreviewShell from '../PreviewShell'

const BARS = [56, 96, 78, 112, 60, 88, 70]
const MotionSpan = motion.span

function AnalyticsPreview({ item }) {
  return (
    <PreviewShell accent={item.accent}>
      <div className="space-y-3">
        <div className="flex h-[120px] items-end justify-between gap-2">
          {BARS.map((barHeight, index) => (
            <MotionSpan
              key={barHeight + index}
              animate={{ height: [`${barHeight - 22}px`, `${barHeight}px`, `${barHeight - 14}px`] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut', delay: index * 0.09 }}
              className="flex-1 rounded-t-lg"
              style={{ backgroundColor: item.accent }}
            />
          ))}
        </div>
        <div className="grid grid-cols-3 gap-2">
          {[0, 1, 2].map((stat) => (
            <div key={stat} className="rounded-lg bg-[#f5efe4] px-2 py-1 text-center text-[11px] font-black" style={{ color: item.accent }}>
              نمو
            </div>
          ))}
        </div>
      </div>
    </PreviewShell>
  )
}

export default AnalyticsPreview
