import { motion } from 'framer-motion'
import { FaChartLine, FaUsers, FaTrophy } from 'react-icons/fa'

const Statistics = () => {
  return (
    <div className="p-6 space-y-8">
      <motion.h1
        className="text-4xl font-bold text-center bg-gradient-to-r from-indigo-500 to-pink-500 text-transparent bg-clip-text"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Quiz Statistics
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          className="bg-[#1E1E27] p-6 rounded-lg shadow-lg flex items-center gap-4"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <FaUsers className="text-4xl text-indigo-400" />
          <div>
            <h3 className="text-lg font-semibold">Total Participants</h3>
            <p className="text-2xl font-bold">12,340</p>
          </div>
        </motion.div>

        <motion.div
          className="bg-[#1E1E27] p-6 rounded-lg shadow-lg flex items-center gap-4"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <FaTrophy className="text-4xl text-yellow-400" />
          <div>
            <h3 className="text-lg font-semibold">Top Scorers</h3>
            <p className="text-2xl font-bold">Elite Quiz Masters</p>
          </div>
        </motion.div>

        <motion.div
          className="bg-[#1E1E27] p-6 rounded-lg shadow-lg flex items-center gap-4"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <FaChartLine className="text-4xl text-green-400" />
          <div>
            <h3 className="text-lg font-semibold">Average Score</h3>
            <p className="text-2xl font-bold">85%</p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Statistics