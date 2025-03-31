import { Link, useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import * as apiClient from '../../../apiClient'
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from 'react-icons/ai'
import { FaBrain } from 'react-icons/fa'

export type Activation = {
  otpString: string
}

const VerifyEmail = () => {
  const { code } = useParams()

  const { isLoading, isSuccess, isError } = useQuery('verifyEmail', () => {
    if (code) {
      return apiClient.verifyEmail(code)
    }
  })

  return (
    <div className="font-montserrat flex max-md:flex-col justify-center items-center gap-5 min-h-screen">
      <div className="md:w-[30%]">
        <FaBrain className="text-9xl text-indigo-500" />
        <h1 className="bg-gradient-to-r from-indigo-500 via-pink-400 to-pink-500 text-transparent bg-clip-text text-6xl max-md:text-4xl font-semibold">
          Quizly
        </h1>
      </div>
      <div className="md:w-[30%]">
        <div className="bg-white shadow-lg rounded-lg p-6 text-center max-w-sm w-full">
          {isLoading && (
            <h1 className="text-gray-600 text-2xl font-semibold">
              Verifying...
            </h1>
          )}
          {isSuccess && (
            <div>
              <AiOutlineCheckCircle className="text-green-600 text-5xl mx-auto mb-4" />
              <h1 className="text-2xl font-semibold text-green-600">
                Email Verified
              </h1>
              <p className="text-gray-600 mt-2">
                Your email has been successfully verified!
              </p>
              <p>
                <Link
                  to="/login"
                  className="text-sm font-semibold text-blue-800"
                >
                  Login
                </Link>
              </p>
            </div>
          )}
          {isError && (
            <div>
              <AiOutlineCloseCircle className="text-red-600 text-5xl mx-auto mb-4" />
              <h1 className="text-2xl font-semibold text-red-600">
                Invalid Verification Code
              </h1>
              <p className="text-gray-600 mt-2">
                The verification code you provided is invalid. Please try again.
              </p>
              <p>
                <Link
                  to="/password/reset"
                  className="text-sm font-semibold text-blue-800"
                >
                  Get new link
                </Link>
              </p>
              <p>
                <Link to="/" className="text-sm font-semibold text-blue-800">
                  Go to Home
                </Link>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
export default VerifyEmail
