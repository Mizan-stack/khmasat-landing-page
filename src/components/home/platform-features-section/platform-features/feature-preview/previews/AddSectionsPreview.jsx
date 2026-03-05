import { motion } from 'framer-motion'
import PreviewShell from '../PreviewShell'

const MotionDiv = motion.div
const MotionSpan = motion.span

function AddSectionsPreview({ item }) {
  return (
    <PreviewShell accent={item.accent}>
      <div className="grid grid-cols-[1fr_58px] gap-3">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <MotionSpan
              animate={{
                y: [0, -6, 0],
                boxShadow: ['0 0 0 rgba(0,0,0,0)', `0 0 0 8px ${item.accent}20`, '0 0 0 rgba(0,0,0,0)'],
              }}
              transition={{ duration: 1.7, repeat: Infinity }}
              className="inline-flex h-8 w-8 items-center justify-center rounded-full text-lg"
              style={{ backgroundColor: item.accent, color: '#04242a' }}
            >
              +
            </MotionSpan>
            <span className="h-3 w-20 rounded-full bg-slate-300/68" />
          </div>

          <div className="grid grid-cols-2 gap-2">
            {[0, 1].map((card) => (
              <MotionDiv
                key={card}
                animate={{ y: [0, -2, 0] }}
                transition={{ duration: 1.6, repeat: Infinity, delay: card * 0.18 }}
                className="rounded-xl bg-slate-200/78 p-2"
              >
                <div className="h-10 rounded-lg bg-slate-900/16" />
                <div className="mt-2 h-2 w-4/5 rounded-full bg-slate-900/22" />
                <div className="mt-1 h-2 w-3/5 rounded-full bg-slate-900/22" />
              </MotionDiv>
            ))}
          </div>
        </div>

        <MotionDiv
          animate={{ opacity: [0.76, 1, 0.76] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="rounded-xl bg-slate-200/68 p-2"
        >
          <div className="space-y-2">
            <div className="h-2 rounded-full bg-slate-900/18" />
            <div className="h-2 rounded-full bg-slate-900/18" />
            <div className="h-2 rounded-full bg-slate-900/18" />
            <div className="h-2 rounded-full bg-slate-900/18" />
            <div className="h-2 rounded-full bg-slate-900/18" />
          </div>
        </MotionDiv>
      </div>
    </PreviewShell>
  )
}

export default AddSectionsPreview
