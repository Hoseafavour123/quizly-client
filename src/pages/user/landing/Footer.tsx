import { motion } from 'framer-motion'
import { FaTwitter, FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-6xl mx-auto px-6">
        {/* Footer Top Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row justify-between items-center mb-8"
        >
          {/* Contact Section */}
          <div className="text-center md:text-left mb-6 md:mb-0">
            <h4 className="text-2xl font-semibold mb-2">Contact Us</h4>
            <p className="text-lg opacity-80">
              Have questions? We're here to help! Reach out anytime.
            </p>
          </div>

          {/* Social Media Icons */}
          <div className="flex justify-center gap-6 mt-6 md:mt-0">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400 transition-colors"
            >
              <FaTwitter size={24} />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-600 transition-colors"
            >
              <FaFacebook size={24} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-400 transition-colors"
            >
              <FaInstagram size={24} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-700 transition-colors"
            >
              <FaLinkedin size={24} />
            </a>
          </div>
        </motion.div>

        {/* Footer Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="border-t border-gray-700 pt-6 text-center"
        >
          <p className="text-sm opacity-70">
            © 2025 Quizver. All Rights Reserved.
          </p>
          <div className="flex justify-center gap-8 mt-4">
            <a href="#" className="text-sm hover:underline">
              Privacy Policy
            </a>
            <a href="#" className="text-sm hover:underline">
              Terms & Conditions
            </a>
            <a href="#" className="text-sm hover:underline">
              FAQ
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
