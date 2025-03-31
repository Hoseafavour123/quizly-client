import { ForgotPasswordFormData } from './pages/user/authentication/ForgotPassword'
import { LoginFormData } from './pages/user/authentication/Login'
import { RegisterFormData } from './pages/user/authentication/Register'

type UserReturnType = {
  _id: string
  firstName: string
  lastName: string
  email: string
  imageInfo: { imageUrl: string; imageId: string }
  createdAt: Date
  updatedAt: Date
}

export interface StatsData {
  highestScore: number
  totalQuizzesTaken: number
  userRank: number | null
  formattedStats: { day: string; score: number; quizzes: number }[]
}


export type LeaderboardType = {
  id: string
  email:string
  name: string
  imageUrl: string
  score: number
}

const API_BASE_URL = 'https://quizver-api.onrender.com'

export const register = async (formData: RegisterFormData) => {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  })
  const body = await response.json()
  if (!response.ok) {
    throw new Error(body.message)
  }
  return body
}

export const login = async (formData: LoginFormData) => {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  })

  const body = await response.json()
  if (!response.ok) {
    throw new Error(body.message)
  }

  return body
}

export const logout = async () => {
  const response = await fetch(`${API_BASE_URL}/auth/logout`, {
    credentials: 'include',
  })

  if (!response.ok) {
    throw new Error('Logout failed')
  }
}

export const verifyEmail = async (code: string) => {
  const response = await fetch(`${API_BASE_URL}/auth/email/verify/${code}`, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  const responseBody = await response.json()

  if (!response.ok) {
    throw new Error(responseBody)
  }
}

export const sendForgotPasswordEmail = async (
  email: ForgotPasswordFormData
) => {
  const response = await fetch(`${API_BASE_URL}/auth/password/forgot`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(email),
  })
  const responseBody = await response.json()

  if (!response.ok) {
    throw new Error(responseBody.message)
  }
}

export const resetPassword = async (formData: FormData) => {
  const response = await fetch(`${API_BASE_URL}/auth/password/reset`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      code: formData.get('code'),
      password: formData.get('password'),
    }),
  })

  const responseBody = await response.json()

  if (!response.ok) {
    throw new Error(responseBody.message)
  }
}

export const getUser = async (): Promise<UserReturnType> => {
  const response = await fetch(`${API_BASE_URL}/user`, {
    credentials: 'include',
  })
  const body = await response.json()
  if (!response.ok) {
    throw new Error(body.message)
  }
  return body
}

export const updateUser = async (
  formData: FormData
): Promise<UserReturnType> => {
  const response = await fetch(`${API_BASE_URL}/user/update`, {
    credentials: 'include',
    method: 'PUT',
    body: formData,
  })

  const body = await response.json()
  if (!response.ok) {
    throw new Error(body.message)
  }

  return body
}

export const getLiveQuiz = async () => {
  console.log('fetchig live quiz...')
  const response = await fetch(`${API_BASE_URL}/quiz/get-live-quiz`, {
    credentials: 'include',
  })
  if (!response.ok) {
    let errorMessage = 'Failed to fetch live quiz'
    try {
      const errorData = await response.json()
      errorMessage = errorData.message || errorMessage
    } catch (error) {
      console.error('Error parsing response:', error)
    }

    throw new Error(errorMessage)
  }
  return response.json()
}

export const submitQuiz = async (data: any) => {
  const response = await fetch(`${API_BASE_URL}/quiz/submit`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    let errorMessage = 'Failed to submit'

    try {
      const errorData = await response.json()
      errorMessage = errorData.message || errorMessage
    } catch (error) {
      console.error('Error parsing response:', error)
    }

    throw new Error(errorMessage)
  }
}

export const getStats = async (filter: string): Promise<StatsData> => {
  const response = await fetch(`${API_BASE_URL}/user/get-stats?filter=${filter}`, {
    credentials: 'include',
  })

  if (!response.ok) {
    let errorMessage = 'Failed to fetch live quiz'
    try {
      const errorData = await response.json()
      errorMessage = errorData.message || errorMessage
    } catch (error) {
      console.error('Error parsing response:', error)
    }

    throw new Error(errorMessage)
  }
  return response.json()
}


export const getCompletedQuizzes = async ({ page }: { page: number }) => {
  const response = await fetch(`${API_BASE_URL}/quiz/completed-quizzes?page=${page}`, {
    credentials: 'include',
  })

  if (!response.ok) {
    let errorMessage = 'Failed to fetch quizzes'
    try {
      const errorData = await response.json()
      errorMessage = errorData.message || errorMessage
    } catch (error) {
      console.error('Error parsing response:', error)
    }

    throw new Error(errorMessage)
  }
  return response.json()
}

export const getLeaderboardData = async (filter: string = 'all'): Promise<LeaderboardType[]> => {
  const response = await fetch(`${API_BASE_URL}/quiz/leaderboard?filter=${filter}`, {
    credentials:'include'
  })

 if (!response.ok) {
   let errorMessage = 'Failed to get leaderboard data'
   try {
     const errorData = await response.json()
     errorMessage = errorData.message || errorMessage
   } catch (error) {
     console.error('Error parsing response:', error)
   }

   throw new Error(errorMessage)
 }

  return response.json()
}
