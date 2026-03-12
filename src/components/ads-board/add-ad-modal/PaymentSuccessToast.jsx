import { AnimatePresence, motion } from 'framer-motion'
import { FaCircleCheck } from 'react-icons/fa6'

const MotionDiv = motion.div

function PaymentSuccessToast({ isOpen }) {
  return (
    <AnimatePresence>
      {isOpen ? (
        <MotionDiv
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="pointer-events-none fixed inset-0 z-[90] flex items-start justify-center p-4 md:p-8"
        >
          <MotionDiv
            initial={{ y: -28, opacity: 0, scale: 0.92 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -16, opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-auto inline-flex items-center gap-3 rounded-2xl border border-emerald-400/45 bg-emerald-500/90 px-5 py-3 text-white shadow-[0_20px_36px_rgba(5,110,88,0.35)]"
            dir="rtl"
          >
            <FaCircleCheck className="text-xl" />
            <div>
              <p className="text-sm font-black">تمت عملية الدفع بنجاح</p>
              <p className="text-xs font-semibold opacity-90">تم تفعيل الإعلان وإغلاق النوافذ تلقائيًا</p>
            </div>
          </MotionDiv>
        </MotionDiv>
      ) : null}
    </AnimatePresence>
  )
}

export default PaymentSuccessToast
