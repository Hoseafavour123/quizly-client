import { ForgotPasswordFormData } from './pages/admin/authentication/ForgotPassword'
import { LoginFormData } from './pages/admin/authentication/Login'
import { RegisterFormData } from './pages/admin/authentication/Register'

type AdminReturnType = {
  _id: string
  name: string
  email: string
  imageInfo: { imageUrl: string; imageId: string }
  createdAt: Date
  updatedAt: Date
}

export type QuizzesReturnType = {
  _id: string
  title: string
  description: string
  duration: string | undefined
  questions: [
    {
      image: string
      text: string
      options: [string]
      correctAnswer: string
    }
  ]
  createdAt: Date
  updatedAt: Date
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || ''

export const registerAdmin = async (formData: RegisterFormData) => {
  const response = await fetch(`${API_BASE_URL}/auth/admin/register`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ...formData }),
  })
  const body = await response.json()
  if (!response.ok) {
    throw new Error(body.message)
  }
  return body
}

export const loginAdmin = async (formData: LoginFormData) => {
  const response = await fetch(`${API_BASE_URL}/auth/admin/login`, {
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

export const logoutAdmin = async () => {
  const response = await fetch(`${API_BASE_URL}/auth/admin/logout`, {
    credentials: 'include',
  })

  if (!response.ok) {
    throw new Error('Logout failed')
  }
}

export const verifyAdminEmail = async (code: string) => {
  const response = await fetch(
    `${API_BASE_URL}/auth/admin/email/verify/${code}`,
    {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )
  const responseBody = await response.json()

  if (!response.ok) {
    throw new Error(responseBody)
  }
}

export const sendForgotPasswordEmail = async (
  email: ForgotPasswordFormData
) => {
  const response = await fetch(`${API_BASE_URL}/auth/admin/password/forgot`, {
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

export const resetAdminPassword = async (formData: FormData) => {
  const response = await fetch(`${API_BASE_URL}/auth/admin/password/reset`, {
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

export const getAdmin = async (): Promise<AdminReturnType> => {
  const response = await fetch(`${API_BASE_URL}/admin`, {
    credentials: 'include',
  })
  const body = await response.json()
  if (!response.ok) {
    throw new Error(body.message)
  }
  return body
}

export const updatedAdmin = async (formData: FormData) => {
  const response = await fetch(`${API_BASE_URL}/admin/update`, {
    method: 'PUT',
    credentials: 'include',
    body: formData,
  })
  const body = await response.json()
  if (!response.ok) {
    throw new Error(body.message)
  }
  return body
}

// QUIZ SECTION

export const createQuiz = async (formData: FormData) => {
  const response = await fetch(`${API_BASE_URL}/quiz`, {
    method: 'POST',
    credentials: 'include',
    body: formData,
  })
  const body = await response.json()
  if (!response.ok) {
    throw new Error(body.message)
  }
}

export const getAllQuizzes = async (page: number) => {
  const response = await fetch(`${API_BASE_URL}/quiz?page=${page}`, {
    credentials: 'include',
  })
  const body = await response.json()
  if (!response.ok) throw new Error('Failed to fetch quizzes')
  return body
}

export const fetchQuiz = async (id: string): Promise<QuizzesReturnType> => {
  const response = await fetch(`${API_BASE_URL}/quiz/${id}`, {
    credentials: 'include',
  })
  if (!response.ok) throw new Error('Failed to fetch quiz')
  return response.json()
}

export const updateQuiz = async ({
  id,
  formData,
}: {
  id: string
  formData: FormData
}) => {
  const response = await fetch(`${API_BASE_URL}/quiz/${id}`, {
    method: 'PUT',
    body: formData,
    credentials: 'include',
  })

  if (!response.ok) {
    throw new Error(`Failed to update quiz: ${response.statusText}`)
  }

  return response.json()
}

export const deleteQuiz = async (id: string) => {
  const response = await fetch(`${API_BASE_URL}/quiz/${id}`, {
    method: 'DELETE',
    credentials: 'include',
  })

  if (!response.ok) {
    throw new Error('Failed to delete quiz')
  }
}

export const goLive = async (id: string) => {
  const response = await fetch(`${API_BASE_URL}/quiz/go-live/${id}`, {
    method: 'PUT',
    credentials: 'include',
  })

  if (!response.ok) {
    // Try to parse error message from response
    let errorMessage = 'Failed to go live' // Default error message

    try {
      const errorData = await response.json() // Assuming the response is JSON
      errorMessage = errorData.message || errorMessage // Use API message if available
    } catch (error) {
      console.error('Error parsing response:', error)
    }

    throw new Error(errorMessage)
  }
}

export const getLiveQuiz = async () => {
  console.log('fetchig live quiz...')
  const response = await fetch(`${API_BASE_URL}/quiz/get-live-quiz`, {
    credentials: 'include',
  })
  if (!response.ok) {
    // Try to parse error message from response
    let errorMessage = 'Failed to fetch live quiz' // Default error message

    try {
      const errorData = await response.json() // Assuming the response is JSON
      errorMessage = errorData.message || errorMessage // Use API message if available
    } catch (error) {
      console.error('Error parsing response:', error)
    }

    throw new Error(errorMessage)
  }
  return response.json()
}


export const getAdminStats = async () => {
  const response = await fetch(`${API_BASE_URL}/admin/get-stats`, {
    credentials: 'include',
  })

 if (!response.ok) {
   // Try to parse error message from response
   let errorMessage = 'Failed to get admin stats' // Default error message

   try {
     const errorData = await response.json() // Assuming the response is JSON
     errorMessage = errorData.message || errorMessage // Use API message if available
   } catch (error) {
     console.error('Error parsing response:', error)
   }

   throw new Error(errorMessage)
 }
 return response.json()
}


export const notifyUsersForPayment = async (quizId: string) => {
  const response = await fetch(
    `${API_BASE_URL}/payment/notify-users/${quizId}`,
    {
      method: 'PUT',
      credentials: 'include',
    }
  )

  if (!response.ok) {
    // Try to parse error message from response
    let errorMessage = 'Failed to notify users for payment' // Default error message

    try {
      const errorData = await response.json() // Assuming the response is JSON
      errorMessage = errorData.message || errorMessage // Use API message if available
    } catch (error) {
      console.error('Error parsing response:', error)
    }

    throw new Error(errorMessage)
  }
}

export const startPayment = async (
  payload: { amount: string; email: string | undefined; full_name: string },
  quizId: string
) => {
  console.log(' data', payload, quizId)
  const response = await fetch(`${API_BASE_URL}/payment/start/${quizId}`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    // Try to parse error message from response
    let errorMessage = 'Failed to start payment' // Default error message

    try {
      const errorData = await response.json() // Assuming the response is JSON
      errorMessage = errorData.message || errorMessage // Use API message if available
    } catch (error) {
      console.error('Error parsing response:', error)
    }

    throw new Error(errorMessage)
  }

  const body = await response.json()

  return body
}

export const fetchPaymentStatus = async (reference: string) => {
  const response = await fetch(`${API_BASE_URL}/payment/verify?reference=${reference}`, {
    credentials: 'include',
  })
  if (!response.ok) {
    // Try to parse error message from response
    let errorMessage = 'Failed to fetch payment status' // Default error message

    try {
      const errorData = await response.json() // Assuming the response is JSON
      errorMessage = errorData.message || errorMessage // Use API message if available
    } catch (error) {
      console.error('Error parsing response:', error)
    }

    throw new Error(errorMessage)
  }
  return response.json()
}



export const isQuizPaidFor = async (quizId: string) => {
  const response = await fetch(`${API_BASE_URL}/payment/quiz-paid/${quizId}`, {
    credentials: 'include',
  })
  if (!response.ok) {
    // Try to parse error message from response
    let errorMessage = 'Failed to check if quiz is paid for' // Default error message

    try {
      const errorData = await response.json() // Assuming the response is JSON
      errorMessage = errorData.message || errorMessage // Use API message if available
    } catch (error) {
      console.error('Error parsing response:', error)
    }

    throw new Error(errorMessage)
  }
  return response.json()
}