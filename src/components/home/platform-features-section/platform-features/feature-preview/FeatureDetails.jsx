import { motion } from 'framer-motion'
import { FaCircleCheck } from 'react-icons/fa6'

const MotionDiv = motion.div

function FeatureDetails({ item }) {
  return (
    <div dir="rtl" className="text-right">
      <MotionDiv
        initial={{ opacity: 0, scale: 0.86, rotate: -8 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 0.45, delay: 0.12 }}
        className="inline-flex h-16 w-16 items-center justify-center rounded-2xl border text-3xl"
        style={{
          color: item.accent,
          backgroundColor: item.accentSoft,
          borderColor: `${item.accent}5c`,
          boxShadow: `0 18px 35px ${item.glow}`,
        }}
      >
        <item.icon />
      </MotionDiv>

      <h3 className="mt-4 text-5xl font-black leading-tight text-[var(--home-power-title)]">{item.title}</h3>
      <p className="mt-4 max-w-xl text-xl leading-relaxed text-[var(--home-power-text)]">{item.description}</p>

      <div className="mt-6 flex flex-wrap gap-3">
        {item.chips.map((chip, index) => (
          <motion.span
            key={chip}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.2 + index * 0.08 }}
            className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-base font-bold"
            style={{
              borderColor: `${item.accent}4d`,
              backgroundColor: 'rgba(11, 17, 30, 0.7)',
              color: 'var(--home-power-muted)',
            }}
          >
            <FaCircleCheck style={{ color: item.accent }} />
            {chip}
          </motion.span>
        ))}
      </div>
    </div>
  )
}

export default FeatureDetails
