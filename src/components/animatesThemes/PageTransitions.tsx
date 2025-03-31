import { motion } from 'framer-motion'
import { Outlet, useLocation } from 'react-router-dom'

const pageVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.2, ease: 'easeIn' } },
}

const AnimatedLayout = () => {
  const location = useLocation()

  return (
    <motion.div
      key={location.pathname}
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="min-h-screen"
    >
      <Outlet />
    </motion.div>
  )
}

export default AnimatedLayout