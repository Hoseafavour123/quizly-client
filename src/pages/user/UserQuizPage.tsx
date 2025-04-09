import { useMutation, useQuery } from 'react-query'
import { useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import * as apiUser from '../../apiClient'
import * as apiAdmin from '../../apiAdmin'
import { motion } from 'framer-motion'
import NotAvailable from '../../components/NoAvailable'
import Loader1 from '../../components/Loader1'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../../context/AuthContext'
import { useAppContext } from '../../context/AppContext'

//const socket = io('http://localhost:4005', { transports: ['websocket'] })
const socket = io('https://quizver-api.onrender.com', { transports: ['websocket'] })

const UserQuizPage = () => {
  const {
    data: quiz,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['liveQuiz'],
    queryFn: () => apiUser.getLiveQuiz(),
    refetchInterval: 30000,
  })

  const { data: paidQuiz, isLoading: isPaidQuizLoading } = useQuery({
    queryKey: ['isQuizPaidFor'],
    queryFn: () => apiAdmin.isQuizPaidFor(quiz?._id!),
    onSuccess(data) {
      console.log(data)
    },
    onError(err: Error) {
      showToast({ message: err.message, type: 'ERROR' })
      console.log(err.message)
    },
    enabled: !!quiz?._id,
  })

  const navigate = useNavigate()
  const { user } = useAuthContext()
  const [timeLeft, setTimeLeft] = useState<number | null>(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)

  const [selectedAnswers, setSelectedAnswers] = useState<
    Record<number, string>
  >({})

  const [showResults, setShowResults] = useState(false)

  const [quizStarted, setQuizStarted] = useState<boolean>(false)
  const [cheatingDetectionActive, setCheatingDetectionActive] = useState(false)

  const { showToast } = useAppContext()
  const { mutate } = useMutation(apiUser.submitQuiz, {
    onSuccess: () => {
      navigate(`/user/my-quizzes`)
    },
  })

  useEffect(() => {
    socket.on('quiz-live', () => refetch())
    socket.on('quiz-ended', () => refetch())

    return () => {
      socket.off('quiz-live')
      socket.off('quiz-ended')
    }
  }, [refetch])

  useEffect(() => {
    const submitted = sessionStorage.getItem('quizSubmitted')
    if (submitted) {
      setShowResults(true)
      sessionStorage.removeItem('quizSubmitted')
    }
  }, [])

  // Adjusted Timer logic: Start quiz when scheduled time is reached and ensure it lasts for the duration
  useEffect(() => {
    if (quiz?.duration && quiz?.scheduledTime) {
      const startTime = new Date(quiz.scheduledTime).getTime()
      const endTime = startTime + quiz.duration * 60 * 1000

      // Check if the quiz should start
      const checkIfStarted = () => {
        const now = Date.now()
        if (now >= startTime && !quizStarted) {
          setQuizStarted(true)
        }
      }

      // Update the time remaining every second
      const updateTimer = () => {
        const now = Date.now()
        const remainingTime = Math.max(0, Math.floor((endTime - now) / 1000))
        setTimeLeft(remainingTime)

        if (remainingTime <= 0) {
          setShowResults(true)
        }
      }

      checkIfStarted()
      const interval = setInterval(updateTimer, 1000)

      return () => clearInterval(interval)
    }
  }, [quiz, quizStarted])

  const startQuiz = () => {
    setQuizStarted(true)

    // Start the cheating detection timer **only after the user starts**
    setTimeout(() => {
      setCheatingDetectionActive(true)
    }, 10000) // 10 seconds
  }

  useEffect(() => {
    if ((quiz?.questions?.length ?? 0) > 0 && !quizStarted) {
      startQuiz() // Ensures the detection starts after user interaction
    }
  }, [quiz?.questions])

  useEffect(() => {
    if (!cheatingDetectionActive) return

    const handleResize = () => {
      showToast({
        message: 'Cheating detected: Window resized!',
        type: 'ERROR',
      })
      handleSubmit()
    }

    const handleVisibilityChange = () => {
      if (document.hidden) {
        showToast({ message: 'Cheating detected: Tab hidden!', type: 'ERROR' })
        handleSubmit()
      }
    }

    window.addEventListener('resize', handleResize)
    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      window.removeEventListener('resize', handleResize)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [cheatingDetectionActive])

  const handleSelectAnswer = (questionIndex: number, answer: string) => {
    const updatedAnswers = { ...selectedAnswers }
    updatedAnswers[questionIndex] = answer
    setSelectedAnswers(updatedAnswers)
  }

  const handleNext = () => {
    if (quiz?.questions && currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const handleSubmit = () => {
    const payload = {
      userId: user?._id,
      quizId: quiz?._id,
      totalQuestions: quiz?.questions.length,
      answers: {} as Record<string, string>,
      score: 0,
    }

    let correctCount = 0

    quiz?.questions.forEach((q: any, i: number) => {
      const selectedOption = selectedAnswers[i] || '' // Ensure a default value
      const selectedOptionLetter = getOptionLetter(i, selectedOption)

      if (selectedOptionLetter === q.correctAnswer) {
        correctCount++
      }

      payload.answers[i] = selectedOptionLetter || ''
    })

    payload.score = correctCount
    setScore(payload.score)

    mutate(payload)

    sessionStorage.setItem('quizSubmitted', 'true')
    setShowResults(true)
  }

  const formatTime = (seconds: number | null) => {
    if (seconds === null) return '00:00'
    const minutes = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(
      2,
      '0'
    )}`
  }

  const getOptionLetter = (questionIndex: number, optionText: string) => {
    const options = quiz?.questions[questionIndex].options as string[]
    const letterIndex = (options ?? []).indexOf(optionText)
    return ['A', 'B', 'C', 'D'][letterIndex] || '?'
  }

  if (isLoading || isPaidQuizLoading) return <Loader1 />

  if (paidQuiz?.isQuizPaidFor && !quiz) {
    return <NotAvailable />
  }

  if (!paidQuiz?.isQuizPaidFor && quiz) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-900 to-purple-600 text-white p-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-lg w-full bg-white text-gray-900 shadow-2xl rounded-2xl p-8 relative overflow-hidden"
        >
          <h1 className="text-3xl font-bold text-center mb-4">
            Payment Required! 💳
          </h1>
          <p className="text-center text-gray-700 mb-6">
            You need to pay N200 to access this quiz.
          </p>
          <button
            onClick={() => navigate(`/quiz/pay/${quiz._id}`)}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Go to Payment
          </button>
        </motion.div>
      </div>
    )
  }

  if (quiz?.status === 'closed') {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-900 to-purple-600 text-white p-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-lg w-full bg-white text-gray-900 shadow-2xl rounded-2xl p-8 relative overflow-hidden"
        >
          <h1 className="text-3xl font-bold text-center mb-4">
            Quiz Closed! ❌
          </h1>
          <p className="text-center text-gray-700 mb-6">
            This quiz is no longer available.
          </p>
        </motion.div>
      </div>
    )
  }

  if (showResults) {
    const totalQuestions = quiz?.questions.length || 0
    const percentage = ((score / totalQuestions) * 100).toFixed(2)

    let performanceText = ''
    let emoji = ''
    let color = ''

    if (Number(percentage) >= 90) {
      performanceText = 'Excellent! 🎯🔥'
      emoji = '🏆'
      color = 'text-green-600'
    } else if (Number(percentage) >= 70) {
      performanceText = 'Great Job! 🎉'
      emoji = '👏'
      color = 'text-blue-600'
    } else if (Number(percentage) >= 50) {
      performanceText = 'Good Effort! 💪'
      emoji = '🙂'
      color = 'text-yellow-600'
    } else {
      performanceText = 'Keep Practicing! 📚'
      emoji = '😔'
      color = 'text-red-600'
    }

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg text-center"
      >
        <h1 className="text-3xl font-bold text-gray-800">
          Quiz Completed! {emoji}
        </h1>
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <p className={`${color} text-lg font-medium my-4`}>
            {performanceText}
          </p>
          <p className="text-xl font-bold">
            Your Score: {score}/{quiz?.questions.length}
          </p>
          <p className="hidden text-md text-gray-600 mt-4">
            Percentage: {percentage}%
          </p>
          <button
            onClick={() => navigate(`/user/my-quizzes`)}
            className="mt-6 px-6 py-2 bg-gray-800 text-white rounded-full hover:bg-gray-900"
          >
            Back to Quizzes
          </button>
        </motion.div>
      </motion.div>
    )
  }

  const question = quiz.questions[currentQuestion]

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-900 to-purple-600 text-white p-6">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl w-full bg-white text-gray-900 shadow-2xl rounded-2xl p-8 relative overflow-hidden"
      >
        <div>
          <h1 className="text-4xl font-bold text-center mb-6">
            Start the Quiz!
          </h1>
          <div className="text-center">
            {quizStarted ? (
              <>
                <p className="text-lg font-semibold text-gray-600 mb-2">
                  Time Remaining: {formatTime(timeLeft)}
                </p>
                <motion.div
                  initial={{ x: 300, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  className="max-w-lg mx-auto p-4 bg-white rounded-lg shadow-lg"
                >
                  <h1 className="text-2xl font-bold mb-4">{quiz.title} 🏆</h1>
                  <p className="text-gray-600">
                    Time Left: {formatTime(timeLeft)}
                  </p>
                  <div className="mt-4 p-4 bg-gray-100 rounded-lg">
                    <h2 className="font-semibold">
                      Q{currentQuestion + 1}. {question.text}
                    </h2>
                    {question.options.map((option: string, i: number) => (
                      <motion.button
                        key={i}
                        className={`block mt-2 p-2 w-full text-left border rounded transition ${
                          selectedAnswers[currentQuestion] === option
                            ? 'bg-blue-300'
                            : 'hover:bg-blue-100'
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() =>
                          handleSelectAnswer(currentQuestion, option)
                        }
                      >
                        ({getOptionLetter(currentQuestion, option)}) {option}
                      </motion.button>
                    ))}
                  </div>

                  <div className="flex justify-between mt-4">
                    <motion.button
                      className="p-2 bg-gray-200 rounded"
                      onClick={handlePrev}
                      disabled={currentQuestion === 0}
                      whileHover={{ scale: 1.1 }}
                    >
                      ⬅ Prev
                    </motion.button>
                    {currentQuestion < quiz.questions.length - 1 && (
                      <motion.button
                        className="p-2 bg-blue-500 text-white rounded"
                        onClick={handleNext}
                        whileHover={{ scale: 1.1 }}
                      >
                        Next ➡
                      </motion.button>
                    )}
                  </div>

                  {currentQuestion === quiz.questions.length - 1 && (
                    <motion.button
                      className="p-2 bg-green-500 text-white rounded mt-4"
                      onClick={handleSubmit}
                      whileHover={{ scale: 1.1 }}
                    >
                      ✅ Submit Quiz
                    </motion.button>
                  )}
                </motion.div>
              </>
            ) : (
              <div>
                <p className="text-2xl font-bold text-center mt-6">
                  Waiting for quiz to start...
                </p>
                <p className="text-lg font-semibold text-gray-600 mb-2">
                  Starting in: {formatTime(timeLeft)}
                </p>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default UserQuizPage
