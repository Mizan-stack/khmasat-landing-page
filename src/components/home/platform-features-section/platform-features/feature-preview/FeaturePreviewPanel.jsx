import { motion } from 'framer-motion'
import FeatureDetails from './FeatureDetails'
import FeaturePreview from './FeaturePreview'

const MotionDiv = motion.div

function FeaturePreviewPanel({ item }) {
  return (
    <MotionDiv className="grid items-center gap-6 lg:grid-cols-[minmax(0,390px)_1fr]" dir="ltr">
      <FeaturePreview item={item} />
      <FeatureDetails item={item} />
    </MotionDiv>
  )
}

export default FeaturePreviewPanel
