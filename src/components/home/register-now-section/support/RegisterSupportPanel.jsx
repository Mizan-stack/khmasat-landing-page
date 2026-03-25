import { motion } from 'framer-motion'
import { SUPPORT_ITEMS } from '../registerNowSupportData'
import RegisterSupportCard from './RegisterSupportCard'

const MotionDiv = motion.div

function RegisterSupportPanel() {
  return (
    <MotionDiv
      initial={{ opacity: 0, x: -44, filter: 'blur(8px)' }}
      whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      dir="rtl"
    >
      <h2 className="text-right text-[clamp(1.6rem,3.4vw,3rem)] font-black text-[var(--home-register-title)]">دعم الأعمال</h2>
      <p className="mt-2 text-right text-[clamp(0.9rem,1.05vw,1.05rem)] text-[var(--home-register-text)]">
        هل لديك أسئلة؟ مستشارو الأعمال لدينا هنا للمساعدة.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {SUPPORT_ITEMS.map((item, index) => (
          <RegisterSupportCard key={item.id} item={item} index={index} />
        ))}
      </div>
    </MotionDiv>
  )
}

export default RegisterSupportPanel
