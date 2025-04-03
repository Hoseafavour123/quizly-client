import { motion } from 'framer-motion'

const features = [
  {
    emoji: '🔥',
    title: 'Exciting Quizzes',
    desc: 'Fun and challenging quizzes for every topic!',
  },
  {
    emoji: '👥',
    title: 'Challenge Friends',
    desc: 'Compete with friends and see who ranks higher!',
  },
  {
    emoji: '🏆',
    title: 'Win Rewards',
    desc: 'Earn points and unlock exclusive badges!',
  },
  {
    emoji: '📊',
    title: 'Track Progress',
    desc: 'See your stats and improve over time!',
  },
  {
    emoji: '🌍',
    title: 'Global Leaderboard',
    desc: 'Compete against players worldwide!',
  },
  {
    emoji: '🎨',
    title: 'Personalized Themes',
    desc: 'Customize your quiz experience with vibrant themes!',
  },
]

export default function FeaturesSection() {
  return (
    <div className="bg-white text-gray-900 pt-32 pb-40 px-6 border-b border-gray-300">
      {/* Features Content */}
      <div className="max-w-5xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl font-bold mb-6 text-gradient"
        >
          Why Choose <span className="text-yellow-400">Quizver?</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg opacity-80 mb-12"
        >
          A powerful quiz platform packed with features that keep you engaged
          and learning!
        </motion.p>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="p-6 bg-gray-800 rounded-lg shadow-lg transform hover:scale-105 transition duration-300"
            >
              <span className="text-4xl">{feature.emoji}</span>
              <h3 className="text-xl font-bold mt-4 text-white">
                {feature.title}
              </h3>
              <p className="mt-2 text-gray-300">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
