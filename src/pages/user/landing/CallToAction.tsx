import { motion } from 'framer-motion'

export default function CallToAction() {
  return (
    <div className="relative bg-black text-white py-32 px-6">
      {/* CTA Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl font-semibold mb-6 leading-tight"
        >
          Ready to Challenge Your Knowledge? 💡
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg mb-8 opacity-80"
        >
          Join thousands of quiz enthusiasts around the world and start testing
          your skills with Quizver today!
        </motion.p>

        {/* Call to Action Button */}
        <motion.a
          href="#"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="inline-block bg-gradient-to-r from-green-500 to-teal-500 text-white text-xl font-semibold px-10 py-5 rounded-lg shadow-md hover:bg-teal-600 transition-all transform"
        >
          Take Your First Quiz
        </motion.a>

        {/* Social Proof */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-8 text-lg font-medium opacity-80"
        >
          <p>Over 15,000 users are already discovering new things! 🌍</p>
        </motion.div>
      </div>
    </div>
  )
}
