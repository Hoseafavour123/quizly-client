import { motion } from 'framer-motion'

const Loader1 = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white p-6">
      {/* Animated Dots Loader */}
      <motion.div className="flex space-x-2 mt-6">
        {[...Array(3)].map((_, index) => (
          <motion.div
            key={index}
            className="w-4 h-4 bg-blue-400 rounded-full"
            animate={{ y: [0, -10, 0] }}
            transition={{
              repeat: Infinity,
              duration: 0.6,
              delay: index * 0.2,
              ease: 'easeInOut',
            }}
          />
        ))}
      </motion.div>
      <p className="text-gray-400 mt-4 text-lg">Loading...</p>
    </div>
  )
}

export default Loader1
