import { motion } from 'framer-motion'

const steps = [
  {
    emoji: '📝',
    title: 'Choose a Quiz',
    desc: 'Pick from a variety of exciting quizzes!',
  },
  {
    emoji: '⏳',
    title: 'Answer Questions',
    desc: 'Test your knowledge with fun and challenging questions!',
  },
  {
    emoji: '🏆',
    title: 'Earn Rewards',
    desc: 'Score high and earn exciting rewards and badges!',
  },
]

export default function HowItWorks() {
  return (
    <div className="bg-gray-50 text-gray-900 pt-32 pb-40 px-6 border-b border-gray-300">
      {/* Content */}
      <div className="max-w-4xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl font-bold mb-6"
        >
          How Does <span className="text-blue-500">Quizver Work?</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg opacity-80 mb-12"
        >
          It’s super simple! Follow these three steps and start quizzing.
        </motion.p>

        {/* Steps Timeline */}
        <div className="flex flex-col items-center gap-10">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="flex flex-col md:flex-row items-center bg-white p-6 rounded-lg shadow-md w-full md:w-3/4"
            >
              <span className="text-4xl">{step.emoji}</span>
              <div className="md:ml-6 text-center md:text-left">
                <h3 className="text-xl font-bold">{step.title}</h3>
                <p className="mt-2 text-gray-700">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
