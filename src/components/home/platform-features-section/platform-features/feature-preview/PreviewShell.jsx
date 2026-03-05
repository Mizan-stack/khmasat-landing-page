import { motion } from 'framer-motion'

const MotionSpan = motion.span

function PreviewShell({ accent, children }) {
  return (
    <div className="mx-auto w-full max-w-[360px] rounded-[24px] border border-cyan-200/12 bg-[#111522] p-4 shadow-[0_22px_45px_rgba(0,0,0,0.36)]">
      <div className="mb-4 flex items-center justify-between rounded-xl bg-cyan-500/8 px-3 py-2">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-cyan-200/36" />
          <span className="h-2.5 w-2.5 rounded-full bg-cyan-200/24" />
          <span className="h-2.5 w-2.5 rounded-full bg-cyan-200/18" />
        </div>
        <MotionSpan
          animate={{ width: ['30%', '52%', '40%'], opacity: [0.55, 1, 0.6] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="h-2 rounded-full"
          style={{ backgroundColor: `${accent}8f` }}
        />
      </div>
      {children}
    </div>
  )
}

export default PreviewShell
