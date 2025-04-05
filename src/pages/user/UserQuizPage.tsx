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

const socket = io('https://quizver-api.onrender.com', { transports: ['websocket'] })
//const socket = io('http://localhost:4005', { transports: ['websocket'] })

const UserQuizPage = () => {
 
  const {
    data: quiz,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['liveQuiz'],
    queryFn: apiUser.getLiveQuiz,
    refetchInterval: 30000,
  })

  const { data: paidQuiz } = useQuery({
    queryKey: ['isQuizPaidFor'],
    queryFn: () => apiAdmin.isQuizPaidFor(quiz?._id!),
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
    if (submitted) setShowResults(true)
  }, [])

  useEffect(() => {
    if (quiz?.startTime && quiz?.duration) {
      const endTime =
        new Date(quiz.startTime).getTime() + quiz.duration * 60 * 1000
      const updateTimer = () => {
        const remaining = Math.max(0, Math.floor((endTime - Date.now()) / 1000))
        setTimeLeft(remaining)
        if (remaining === 0) setShowResults(true)
      }

      updateTimer()
      const interval = setInterval(updateTimer, 1000)
      return () => clearInterval(interval)
    }
  }, [quiz])

  /// CHEATING CONTROL

  // Function to start the quiz properly
  const startQuiz = () => {
    setQuizStarted(true)

    // Start the cheating detection timer **only after the user starts**
    setTimeout(() => {
      setCheatingDetectionActive(true)
    }, 10000) // 10 seconds
  }

  // Call `startQuiz` when the user clicks "Start Quiz"
  useEffect(() => {
    if (quiz?.questions?.length > 0 && !quizStarted) {
      startQuiz() // Ensures the detection starts after user interaction
    }
  }, [quiz?.questions])

  // Start cheat detection **only if the timer has activated**
  useEffect(() => {
    if (!cheatingDetectionActive) return

    const handleResize = () => {
     showToast({message: 'Cheating detected: Window resized!', type: 'ERROR'})
      handleSubmit()
    }

    const handleVisibilityChange = () => {
      if (document.hidden) {
        showToast({message: 'Cheating detected: Tab hidden!', type: 'ERROR'})
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
    console.log('Selected answer:', answer, questionIndex)
    const updatedAnswers = { ...selectedAnswers }
    updatedAnswers[questionIndex] = answer
    setSelectedAnswers(updatedAnswers)
  }

  const handleNext = () => {
    if (currentQuestion < quiz.questions.length - 1) {
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
      quizId: quiz._id,
      totalQuestions: quiz.questions.length,
      answers: {} as Record<string, string>,
      score: 0,
    }

    let correctCount = 0

    quiz.questions.forEach((q: any, i: number) => {
      const selectedOption = selectedAnswers[i] || '' // Ensure a default value
      const selectedOptionLetter = getOptionLetter(i, selectedOption) // Get the letter for the selected option

      if (selectedOptionLetter === q.correctAnswer) {
        correctCount++
      }

      payload.answers[i] = selectedOptionLetter || ''
    })

    payload.score = correctCount
    setScore(payload.score)
    console.log('Submitting quiz:', payload)

   const submitted = sessionStorage.getItem('quizSubmitted')
    if (!submitted) {
      mutate(payload)
       sessionStorage.setItem('quizSubmitted', 'true')
       setShowResults(true)
    }
   

   
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
    const options = quiz.questions[questionIndex].options
    const letterIndex = options.indexOf(optionText)
    return ['A', 'B', 'C', 'D'][letterIndex] || '?'
  }

  if (isLoading) return <Loader1 />


   if (paidQuiz?.isQuizPaidFor && !quiz) {
     return (
       <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-900 to-purple-600 text-white p-6">
         <motion.div
           initial={{ opacity: 0, y: 50 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8 }}
           className="max-w-lg w-full bg-white text-gray-900 shadow-2xl rounded-2xl p-8 relative overflow-hidden"
         >
           <h1 className="text-3xl font-bold text-center mb-4">
             Quiz Not Available, please wait! 🚫
           </h1>
           <p className="text-center text-gray-700 mb-6">
             The quiz is not available at the moment.
           </p>
         </motion.div>
       </div>
     )
   }


  if ((error && quiz) || !quiz) return <NotAvailable />


 

  if (!paidQuiz.isQuizPaidFor && quiz) {
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

  if (showResults) {
    const totalQuestions = quiz.questions.length
    const percentage = Math.round((score / totalQuestions) * 100)

    // Performance Rating
    let performanceText = ''
    let emoji = ''
    let color = ''

    if (percentage >= 90) {
      performanceText = 'Excellent! 🎯🔥'
      emoji = '🏆'
      color = 'text-green-600'
    } else if (percentage >= 70) {
      performanceText = 'Great Job! 🎉'
      emoji = '👏'
      color = 'text-blue-600'
    } else if (percentage >= 50) {
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
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="mt-6 bg-gray-100 p-6 rounded-lg shadow-inner"
        >
          <p className="text-xl font-semibold">Your Score:</p>
          <p className="text-4xl font-bold text-indigo-600 mt-2">
            {score} / {totalQuestions}
          </p>
          <p className={`mt-4 text-lg font-semibold ${color}`}>
            {performanceText}
          </p>
        </motion.div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => window.location.reload()}
          className="hidden mt-6 px-6 py-3 bg-indigo-600 text-white rounded-full font-semibold shadow-md hover:bg-indigo-700"
        >
          Try Again 🔄
        </motion.button>
      </motion.div>
    )
  }

  const question = quiz.questions[currentQuestion]

  return (
    <motion.div
      initial={{ x: 300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="max-w-lg mx-auto p-4 bg-white rounded-lg shadow-lg"
    >
      <h1 className="text-2xl font-bold mb-4">{quiz.title} 🏆</h1>
      <p className="text-gray-600">Time Left: {formatTime(timeLeft)}</p>
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
            onClick={() => handleSelectAnswer(currentQuestion, option)}
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
  )
}

export default UserQuizPage
