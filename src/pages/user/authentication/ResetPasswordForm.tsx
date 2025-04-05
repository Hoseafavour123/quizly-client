import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import * as apiClient from '../../../apiClient'
import { Link } from 'react-router-dom'

export type ResetPasswordFormData = {
  password: string
  confirmPassword: string
}

type ResetPasswordFormProps = {
  code: string
}

const ResetPasswordForm = ({ code }: ResetPasswordFormProps) => {
  const [errMsg, setErrMsg] = useState<string>('')
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<ResetPasswordFormData>()

  const { mutate, isLoading, isSuccess, isError } = useMutation(
    apiClient.resetPassword,
    {
      onError: (err: Error) => {
        setErrMsg(err.message)
      },
    }
  )

  const onSubmit = (data: ResetPasswordFormData) => {
    const formData = new FormData()
    formData.append('code', code)
    formData.append('password', data.password)
    mutate(formData)
  }

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 text-center max-w-md w-full">
      <h1 className="text-2xl font-semibold text-gray-800">Reset Password</h1>
      {isSuccess ? (
        <div className="flex justify-center items-center bg-gray-100">
          <div className="bg-white p-6 text-center w-full">
            <h1 className="text-xl font-semibold text-green-600">
              Password Reset Successful
            </h1>
            <p className="mt-2 text-sm text-gray-600">
              Your password has been successfully reset. You can now log in with
              your new password.
            </p>

            <Link
              to="/login"
              className="mt-4 inline-block bg-[#E706E5] hover:opacity-80 text-white py-2 px-4 rounded transition"
            >
              Go to Login
            </Link>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-left text-gray-700 font-medium"
            >
              New Password
            </label>
            <input
              type="password"
              id="password"
              className={`mt-1 block w-full px-4 py-2 rounded border ${
                errors.password ? 'border-red-500' : 'border-gray-300'
              } focus:ring focus:ring-blue-300 focus:outline-none`}
              placeholder="Enter your new password"
              {...register('password', {
                required: 'Password is required',
                minLength: 6,
              })}
            />
            {errors.password && (
              <p className="text-left text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="confirmPassword"
              className="block text-left text-gray-700 font-medium"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              className={`mt-1 block w-full px-4 py-2 rounded border ${
                errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
              } focus:ring focus:ring-blue-300 focus:outline-none`}
              placeholder="Confirm your password"
              {...register('confirmPassword', {
                required: 'Please confirm your password',
                validate: (value) =>
                  value === watch('password') || 'Passwords do not match',
              })}
            />
            {errors.confirmPassword && (
              <p className="text-left text-red-500 text-sm mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className={`w-full py-2 px-4 rounded text-white font-medium ${
              isLoading ? 'opacity-50' : 'bg-[#E706E5] hover:opacity-80'
            } transition`}
            disabled={isLoading}
          >
            {isLoading ? 'Resetting...' : 'Reset Password'}
          </button>
        </form>
      )}

      {isError && <p className="mt-4 text-red-500">{errMsg}</p>}
    </div>
  )
}

export default ResetPasswordForm
