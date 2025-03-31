import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import * as apiClient from '../../../apiClient'
import { Link } from 'react-router-dom'
import { FaBrain } from 'react-icons/fa'

export type ForgotPasswordFormData = {
  email: string
}

const ForgotPassword: React.FC = () => {
  const [errMsg, setErrMsg] = useState<string | null>(null)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>()

  const { mutate, isLoading, isSuccess, isError } = useMutation(
    apiClient.sendForgotPasswordEmail,
    {
      onError: (err: Error) => {
        setErrMsg(err.message)
      },
    }
  )

  const onSubmit = (data: ForgotPasswordFormData) => {
    mutate(data)
  }

  return (
    <div className="font-montserrat flex max-md:flex-col justify-center items-center gap-5 min-h-screen">
      <div className="md:w-[30%]">
        <FaBrain className="text-9xl text-indigo-500" />
        <h1 className="bg-gradient-to-r from-indigo-500 via-pink-400 to-pink-500 text-transparent bg-clip-text text-6xl max-md:text-4xl font-semibold">
          Quizly
        </h1>
      </div>
      <div className="md:w-[30%]">
        <div className="bg-white shadow-lg rounded-lg p-6 text-center max-w-md w-full">
          <h1 className="text-2xl font-semibold text-gray-800">
            Reset Password
          </h1>

          {isSuccess ? (
            <p className="mt-4 text-green-600">
              Password reset link sent! Check your email.
            </p>
          ) : (
            <>
              <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-left text-gray-700 font-medium"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    className={`mt-1 block w-full px-4 py-2 rounded border ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    } focus:ring focus:ring-blue-300 focus:outline-none`}
                    placeholder="Enter your email"
                    {...register('email', { required: 'Email is required' })}
                  />
                  {errors.email && (
                    <p className="text-left text-red-500 text-sm mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className={`w-full py-2 px-4 rounded text-white font-medium ${
                    isLoading
                      ? 'bg-gray-400'
                      : 'bg-indigo-600 hover:bg-indigo-500'
                  } transition`}
                  disabled={isLoading}
                >
                  {isLoading ? 'Sending...' : 'Send Reset Link'}
                </button>
              </form>
            </>
          )}
          <div className="text-sm mt-2">
            <p className="text-sm">
              Go back to{' '}
              <Link to={'/register'} className="text-indigo-500">
                Register
              </Link>{' '}
              or{' '}
              <Link to={'/login'} className="text-indigo-500">
                Login
              </Link>
            </p>
          </div>
          {isError && <p className="mt-4 text-red-500">{errMsg}</p>}
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword
