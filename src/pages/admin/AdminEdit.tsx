import React from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useMutation } from 'react-query'
import * as apiAdmin from '../../apiAdmin'
import { useAppContext } from '../../context/AppContext'
import { useAdminAuthContext } from '../../context/AdminAuthContext'
import { useNavigate } from 'react-router-dom'

export interface UpdateAdminFormData {
  name: string
  email: string
  password: string
  image: FileList | null
  confirmPassword: string
}


const UpdateAdminProfile: React.FC = () => {
  const navigate = useNavigate()
  const { admin } = useAdminAuthContext()
  const { showToast } = useAppContext()
  const { mutate, isLoading } = useMutation(
    apiAdmin.updatedAdmin,
    {
      onSuccess: () => {
        showToast({ message: 'Profile updated successfully', type: 'SUCCESS' })
        navigate('/admin')
        window.location.reload()
      },
      onError: (err: Error) => {
        showToast({ message: err.message, type: 'ERROR' })
      },
    }
  )

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateAdminFormData>({
    defaultValues: {
      name: admin?.name || '',
      email: admin?.email || ''
    },
  })

  const onSubmit: SubmitHandler<UpdateAdminFormData> = (data) => {
    const formData = new FormData()
    formData.append('name', data.name)
    formData.append('email', data.email)
    formData.append('password', data.password)
    if (data.image && data.image[0]) {
      formData.append('image', data.image[0])
    }
    mutate(formData)
  }

  return (
    <div className="flex items-center justify-center font-montserrat mx-auto max-md:flex-col gap-5 min-h-screen">
      <div className="md:w-[40%] mt-10 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Update Admin
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
              New Password
            </label>
            <input
              type="password"
              {...register('password')}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Upload Image
            </label>
            <input
              type="file"
              accept="image/*"
              {...register('image')}
              className="mt-1 block w-full text-sm text-gray-700"
            />
          </div>
          <button
            disabled={isLoading}
            type="submit"
            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
              isLoading
                ? 'bg-indigo-400 cursor-not-allowed'
                : 'bg-indigo-600 focus:ring-indigo-500 hover:bg-indigo-700'
            } focus:outline-none focus:ring-2 focus:ring-offset-2`}
          >
            {isLoading ? 'Processing...' : 'Update Profile'}
          </button>
        </form>
      </div>
    </div>
  )
}
export default UpdateAdminProfile
