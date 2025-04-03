import { motion } from 'framer-motion'
import { mascot } from '../../../assets/images'
import { Link } from 'react-router-dom'

export default function HeroSection() {
  return (
    <div className="relative bg-gray-900 text-white min-h-screen flex items-center justify-center px-6">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-800 via-gray-900 to-black opacity-80"></div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-6xl w-full flex flex-col md:flex-row items-center">
        {/* Left Side (Text Content) */}
        <div className="md:w-1/2 text-center md:text-left">
          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl font-extrabold tracking-tight mb-6 leading-tight"
          >
            The Ultimate Quiz <br />
            Experience with <span className="text-yellow-400">Quizver</span> 🚀
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg opacity-80 mb-8"
          >
            Test your knowledge, compete with friends, and climb the
            leaderboard. Fun, challenging, and rewarding quizzes await you!
          </motion.p>

          {/* Call to Action Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Link to={'/register'}
           
              className="inline-block py-3 px-6 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-semibold rounded-lg text-lg shadow-lg hover:scale-105 transition transform duration-300"
            >
              Start Your Quiz Now!
            </Link>
          </motion.div>
        </div>

        {/* Right Side (Blended Mascot) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="md:w-1/2 flex justify-center mt-10 md:mt-0 relative"
        >
          {/* Glow Effect Behind Mascot */}
          <div className="absolute inset-0 w-72 h-72 bg-yellow-400 opacity-20 rounded-full blur-3xl"></div>

          {/* Mascot Image */}
          <img
            src={mascot}
            alt="Quiz Mascot"
            className="w-80 md:w-96 relative"
          />
        </motion.div>
      </div>
    </div>
  )
}
