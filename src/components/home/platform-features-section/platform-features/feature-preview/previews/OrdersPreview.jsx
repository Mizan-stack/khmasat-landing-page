import { motion } from 'framer-motion'
import PreviewShell from '../PreviewShell'

const MotionDiv = motion.div
const MotionSpan = motion.span

function OrdersPreview({ item }) {
  return (
    <PreviewShell accent={item.accent}>
      <div className="space-y-3">
        {[0, 1, 2].map((order, index) => (
          <MotionDiv
            key={order}
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: index * 0.14 }}
            className="rounded-xl bg-slate-200/80 p-2 text-right"
          >
            <div className="flex items-center justify-between gap-2 text-xs">
              <MotionSpan
                animate={{ opacity: [0.38, 1, 0.38] }}
                transition={{ duration: 1.2, repeat: Infinity, delay: index * 0.2 }}
                className="inline-block h-7 w-7 rounded-full border border-slate-900/12 bg-slate-300/36"
              />
              <div className="font-bold text-slate-900/68">طلب #{8800 + order}</div>
              <span className="rounded-full px-2 py-1 text-[10px] font-black" style={{ backgroundColor: `${item.accent}22`, color: '#0f8f63' }}>
                مدفوع
              </span>
            </div>
          </MotionDiv>
        ))}
      </div>
    </PreviewShell>
  )
}

export default OrdersPreview
