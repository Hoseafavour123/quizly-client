import { motion } from 'framer-motion'
import { Eye } from 'lucide-react'

const NotAvailable = () => {
  return (
    <div className="flex items-center justify-center min-h-screen text-white p-6">
      {/* Animated Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="bg-gray-800 rounded-xl shadow-lg p-8 w-[90%] md:w-[50%] text-center"
      >
        <h1 className="text-3xl md:text-4xl font-extrabold text-yellow-400">
          No Active Quiz
        </h1>
        <p className="text-gray-300 mt-3 text-lg">
          Stay tuned for the next exciting challenge!
        </p>

        {/* Bouncing Eye Icon */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
          className="mt-6 flex items-center justify-center"
        >
          <Eye size={50} className="text-yellow-400 animate-pulse" />
        </motion.div>
      </motion.div>
    </div>
  )
}

export default NotAvailable
