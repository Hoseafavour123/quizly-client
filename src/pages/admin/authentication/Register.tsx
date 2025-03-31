import React from 'react'
import { useForm, SubmitHandler} from 'react-hook-form'
import { useMutation } from 'react-query'
import { Link, useNavigate } from 'react-router-dom'
import * as apiAdmin from '../../../apiAdmin'
import { useAppContext } from '../../../context/AppContext'
import { FaBrain } from 'react-icons/fa'

export interface RegisterFormData {
  name: string
  email: string
  password: string
  confirmPassword: string
}

const AdminRegister: React.FC = () => {
  const navigate = useNavigate()
  const { showToast } = useAppContext()
  const { mutate, isLoading } = useMutation(apiAdmin.registerAdmin, {
    onSuccess: () => {
      navigate('/admin/verify-message', { replace: true })
    },
    onError: (err: Error) => {
      showToast({ message: err.message, type: 'ERROR' })
    },
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<RegisterFormData>()

  const onSubmit: SubmitHandler<RegisterFormData> = (data) => {
    console.log(data)
    mutate(data)
  }

  const password = watch('password')

  return (
    <div className="font-montserrat mx-auto flex max-md:flex-col justify-center items-center gap-5 min-h-screen">
      <div className="md:w-[30%]">
        <FaBrain className="text-9xl text-indigo-500" />
        <h1 className="bg-gradient-to-r from-indigo-500 via-pink-400 to-pink-500 text-transparent bg-clip-text text-6xl max-md:text-4xl font-semibold">
          Quizly
        </h1>
        <p>Take a quiz and earn!</p>
      </div>

      <div className="md:w-[30%] mt-10 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Admin Registration
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Organisation Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
               Name
            </label>
            <input
              {...register('name', { required: 'Name is required' })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {errors.name && (
              <p className="mt-2 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              {...register('email', { required: 'Email is required' })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {errors.email && (
              <p className="mt-2 text-sm text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>


          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              {...register('password', { required: 'Password is required' })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {errors.password && (
              <p className="mt-2 text-sm text-red-600">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              type="password"
              {...register('confirmPassword', {
                required: 'Confirm password is required',
                validate: (value) =>
                  value === password || 'Passwords do not match',
              })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {errors.confirmPassword && (
              <p className="mt-2 text-sm text-red-600">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            disabled={isLoading}
            type="submit"
            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
              isLoading
                ? 'bg-indigo-400 cursor-not-allowed'
                : 'bg-indigo-600 focus:ring-indigo-500 hover:bg-indigo-700 '
            }  focus:outline-none focus:ring-2 focus:ring-offset-2 `}
          >
            {isLoading ? 'Processing...' : 'Register'}
          </button>

          {/* Already Registered Link */}
          <p className="text-sm">
            Already in?{' '}
            <span className=" text-indigo-500">
              <Link to={'/admin/login'}>Login</Link>
            </span>
          </p>
        </form>
      </div>
    </div>
  )
}

export default AdminRegister
