import { motion } from 'framer-motion'
import { useSearchParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import * as apiAdmin from '../../apiAdmin'
import { useNavigate } from 'react-router-dom'

const PaymentStatusPage = () => {
  const [searchParams] = useSearchParams()
  const reference = searchParams.get('reference')
  const navigate = useNavigate()

  const { data, error, isLoading } = useQuery(
    ['paymentStatus', reference],
    () => apiAdmin.fetchPaymentStatus(reference!),
    {
      enabled: !!reference,
      retry: false,
      onSuccess: () => {
        navigate('/user/live-quiz', { replace: true })
      },
    } // Only run if reference is available
  )

  let status: 'loading' | 'success' | 'failed'
  let message = 'Verifying payment...'

  if (isLoading) {
    status = 'loading'
  } else if (error) {
    status = 'failed'
    message = 'Payment verification failed. Please try again later.'
  } else if (data?.status === 'Success') {
    status = 'success'
    message = 'Payment Successful! Your access is now granted.'
  } else {
    status = 'failed'
    message =
      data?.message || 'Payment verification failed. Please contact support.'
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="max-w-lg w-full text-center bg-white text-gray-900 shadow-2xl rounded-2xl p-8"
      >
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1.1 }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
          className="text-5xl mb-4"
        >
          {status === 'success' && '🎉'}
        </motion.div>
        <h1 className="text-2xl font-bold mb-2">
          {status === 'success' && 'Payment Successful'}
        </h1>
        <p className="text-gray-700 mb-6">{message}</p>
        <button
          onClick={() => (navigate('/', {replace: true}))}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-lg"
        >
          Retry payment
        </button>
      </motion.div>
    </div>
  )
}

export default PaymentStatusPage
