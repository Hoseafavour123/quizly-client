import React from 'react'

import { Link, useSearchParams } from 'react-router-dom' // Assuming React Router is used
import ResetPasswordForm from './ResetPasswordForm'
import {FaBrain} from 'react-icons/fa'

const ResetPassword: React.FC = () => {

 
  const [searchParams] = useSearchParams()
  const code = searchParams.get('code')
  console.log(code)
  const exp = Number(searchParams.get('exp'))

  const now = Date.now()
  const linkIsValid = code && exp && exp > now


  return (
    <div className='font-montserrat flex max-md:flex-col justify-center items-center gap-5 min-h-screen'>
      <div className='md:w-[30%]'>
        <FaBrain className="text-9xl text-indigo-500" />
                <h1 className="bg-gradient-to-r from-indigo-500 via-pink-400 to-pink-500 text-transparent bg-clip-text text-6xl max-md:text-4xl font-semibold">
                  Quizly
                </h1>
      </div>
      <div className="md:w-[30%]">
        {linkIsValid ? (
          <ResetPasswordForm code={code} />
        ) : (
          <>
            <div className="flex justify-center items-center h-screen bg-gray-100">
              <div className="bg-white shadow-lg rounded-lg p-6 text-center max-w-md w-full">
                <h1 className="text-2xl font-semibold text-gray-800">
                  Verification Link Expired
                </h1>
                <p className="mt-2 text-gray-600">
                  The verification link you used has expired. Please request a
                  new one.
                </p>

                <Link
                  to="/password/forgot"
                  className="mt-4 inline-block bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-4 rounded transition"
                >
                  Request New Link
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default ResetPassword
