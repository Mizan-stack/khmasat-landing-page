import { motion } from 'framer-motion'
import PreviewShell from '../PreviewShell'

const MotionSpan = motion.span

function OrderControlPreview({ item }) {
  return (
    <PreviewShell accent={item.accent}>
      <div className="space-y-3">
        {[0, 1, 2].map((control, index) => (
          <div key={control} className="rounded-xl bg-slate-200/80 px-3 py-2">
            <div className="flex items-center justify-between gap-2">
              <div className="h-2.5 w-1/2 rounded-full bg-slate-900/12" />
              <MotionSpan
                animate={{ backgroundColor: ['#6a7388', item.accent, '#6a7388'] }}
                transition={{ duration: 2.1, repeat: Infinity, delay: index * 0.2 }}
                className="relative inline-flex h-6 w-10 rounded-full p-1"
              >
                <MotionSpan
                  animate={{ x: [0, 16, 0] }}
                  transition={{ duration: 2.1, repeat: Infinity, delay: index * 0.2 }}
                  className="inline-block h-4 w-4 rounded-full bg-cyan-100 shadow-[0_3px_8px_rgba(0,0,0,0.25)]"
                />
              </MotionSpan>
            </div>
          </div>
        ))}
      </div>
    </PreviewShell>
  )
}

export default OrderControlPreview
