import { AnimatePresence, motion } from 'framer-motion'
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import HomePage from '../../pages/HomePage'
import LoginPage from '../../pages/LoginPage'
import SignUpPage from '../../pages/SignUpPage'

const MotionDiv = motion.div
const ROUTE_ORDER = {
  '/': 0,
  '/home': 0,
  '/login': 1,
  '/signup': 2,
}

function AppRouter() {
  return (
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  )
}

function AnimatedRoutes() {
  const location = useLocation()
  const fromStateDirection =
    typeof location.state === 'object' && location.state && 'direction' in location.state
      ? Number(location.state.direction)
      : 0

  const routeDirection = getRouteDirection(location.pathname)
  const direction = fromStateDirection || routeDirection || 1

  return (
    <AnimatePresence mode="wait" initial={false}>
      <MotionDiv
        key={location.pathname}
        custom={direction}
        variants={pageVariants}
        initial="initial"
        animate="enter"
        exit="exit"
      >
        <Routes location={location}>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </MotionDiv>
    </AnimatePresence>
  )
}

function getRouteDirection(pathname) {
  const order = ROUTE_ORDER[pathname]
  const homeOrder = ROUTE_ORDER['/']
  if (typeof order !== 'number') return 0
  return order > homeOrder ? 1 : -1
}

const pageVariants = {
  initial: (direction) => ({
    opacity: 0,
    x: direction > 0 ? 140 : -140,
    scale: 0.98,
    filter: 'blur(6px)',
  }),
  enter: {
    opacity: 1,
    x: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.58, ease: [0.22, 1, 0.36, 1] },
  },
  exit: (direction) => ({
    opacity: 0,
    x: direction > 0 ? -120 : 120,
    scale: 0.98,
    filter: 'blur(4px)',
    transition: { duration: 0.42, ease: [0.4, 0, 1, 1] },
  }),
}

export default AppRouter
