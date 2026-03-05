import { motion } from 'framer-motion'
import { SOCIAL_LINKS } from './socialLinks'

const MotionAnchor = motion.a
const MotionParagraph = motion.p

function HomeTopBar() {
  return (
    <div className="relative z-30 [background:var(--home-strip-bg)]">
      <div className="mx-auto flex h-14 w-full max-w-[1320px] items-center justify-between px-3 md:px-6">
        <div className="flex items-center gap-2">
          {SOCIAL_LINKS.map((item, index) => (
            <MotionAnchor
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.04 * index }}
              className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/35 bg-white/10 text-white transition-all hover:-translate-y-0.5 hover:bg-white/20"
              aria-label={item.label}
            >
              <item.icon className="text-sm" />
            </MotionAnchor>
          ))}
        </div>

        <MotionParagraph
          initial={{ opacity: 0, x: 18 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 text-xs font-semibold text-white md:text-sm"
        >
          <span>📍</span>
          <span>السعودية - الطائف، الفهدة النور</span>
        </MotionParagraph>
      </div>
    </div>
  )
}

export default HomeTopBar
