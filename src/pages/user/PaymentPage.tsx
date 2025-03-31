import { motion } from 'framer-motion'
import { Button } from 'flowbite-react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useMutation } from 'react-query'
import * as apiAdmin from '../../apiAdmin'
import { useAppContext } from '../../context/AppContext'
import { useAuthContext } from '../../context/AuthContext'

const PaymentPage = () => {
  const [isLoading, setIsLoading] = useState(false)
  const { showToast } = useAppContext()
  const { user  } = useAuthContext()

  const { quizId } = useParams()

  const mutatePayment = useMutation(
    (payload: { amount: string; email: string | undefined; full_name: string }) =>
      apiAdmin.startPayment(payload, quizId!),
    {
      onSuccess: (data) => {
        console.log(data)
        setIsLoading(false)
        window.location.href = data.data.data.authorization_url
      },
      onError: (error: Error) => {
        showToast({
          message: error.message,
          type: 'ERROR',
        })
        setIsLoading(false)
      },
    }
  )


  const handlePayment = () => {
    setIsLoading(true)
    const payload = {
      amount: '2',
      email: user?.email,
      full_name: `${user?.firstName} ${user?.lastName}`,
    }

    mutatePayment.mutate(payload)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 to-purple-600 text-white p-6">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-3xl w-full bg-white text-gray-900 shadow-2xl rounded-2xl p-8 relative overflow-hidden"
      >
        {/* Floating Background Animation */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-purple-500 to-indigo-500 opacity-30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, repeat: Infinity, repeatType: 'mirror' }}
        />

        <div className="text-3xl font-bold text-center mb-4">
          <h1> REGISTER FOR NEW QUIZ </h1>
          <small>For just N200</small>
        </div>
        <p className="text-center text-gray-700 mb-6">
          Get access to our exclusive quiz on{' '}
          <span className="text-indigo-600 font-semibold">
            “The Ultimate Knowledge Challenge”
          </span>
          . Improve your skills, compete globally, and win rewards!
        </p>

        <div className="flex justify-center">
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{
              duration: 0.5,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
          >
            <Button
              onClick={handlePayment}
              disabled={isLoading}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg text-lg"
            >
              {isLoading ? 'Processing...' : 'Make Payment'}
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}

export default PaymentPage
