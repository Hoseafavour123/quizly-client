import { motion } from 'framer-motion'
import { testimonial1, testimonial2, testimonial3 } from '../../../assets/images'

// Sample testimonials data
const testimonials = [
  {
    name: 'John Doe',
    position: 'Software Developer',
    testimonial:
      'Quizver is an amazing platform for testing my knowledge and learning new things. I love the rewards system!',
    image: testimonial1,
    rating: 5,
  },
  {
    name: 'Jane Smith',
    position: 'Marketing Manager',
    testimonial:
      'The quizzes are fun and engaging, and I can challenge my friends. Highly recommend this app!',
    image: testimonial2,
    rating: 4,
  },
  {
    name: 'Michael Johnson',
    position: 'Product Designer',
    testimonial:
      "I enjoy the variety of quizzes offered. It's a great way to learn while having fun. Awesome experience!",
    image: testimonial3,
    rating: 5,
  },
]

export default function Testimonials() {
  return (
    <div className="bg-gray-100 text-gray-900 pt-32 pb-40 px-6 border-b border-gray-300">
      {/* Testimonials Content */}
      <div className="max-w-6xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl font-bold mb-8"
        >
          What Our Users Say 💬
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg opacity-80 mb-12"
        >
          See why people love Quizver and how it’s making learning fun and
          engaging!
        </motion.p>

        {/* Testimonials Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105"
            >
              {/* Profile Picture */}
              <div className="mb-6">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full mx-auto mb-4"
                />
              </div>

              {/* Testimonial Text */}
              <p className="text-xl text-gray-600 mb-4">
                "{testimonial.testimonial}"
              </p>

              {/* User Info */}
              <div className="text-sm text-gray-500">
                <p className="font-semibold">{testimonial.name}</p>
                <p>{testimonial.position}</p>
              </div>

              {/* Star Rating */}
              <div className="flex justify-center mt-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <svg
                    key={i}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-5 h-5 text-yellow-400"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 15l-3.293 1.735.628-3.833L4.5 8.607l3.852-.558L10 4.1l1.648 3.95 3.85.557-2.835 4.295.629 3.833L10 15z"
                      clipRule="evenodd"
                    />
                  </svg>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
