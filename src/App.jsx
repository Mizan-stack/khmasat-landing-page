import AppRouter from './app/router/AppRouter'
import { ThemeProvider } from './app/providers/ThemeProvider'
import { MotionConfig } from 'framer-motion'

function App() {
  return (
    <ThemeProvider>
      <MotionConfig reducedMotion="never">
        <AppRouter />
      </MotionConfig>
    </ThemeProvider>
  )
}

export default App
