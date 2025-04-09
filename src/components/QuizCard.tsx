import { Link } from 'react-router-dom'
import { FaEdit } from 'react-icons/fa'
import DeleteQuizButton from './buttons/DeleteQuiz'
import { useModal } from '../context/ModalContext'
import { useMutation } from 'react-query'
import * as apiAdmin from '../apiAdmin'
import { useAppContext } from '../context/AppContext'
import { useState } from 'react'

interface QuizCardProps {
  quiz: any
}

const QuizCard = ({ quiz }: QuizCardProps) => {
  const { showToast } = useAppContext()
  const [scheduleHours, setScheduleHours] = useState<number>(1)

  const scheduleQuiz = useMutation(apiAdmin.scheduleQuiz, {
    onSuccess: () => {
      showToast({ message: 'Quiz scheduled successfully', type: 'SUCCESS' })
      window.location.reload()
    },
    onError: (err: Error) => {
      showToast({ message: err.message, type: 'ERROR' })
    },
  })

  const { showModal } = useModal()

  const openScheduleModal = () => {
    showModal({
      title: 'Schedule Quiz',
      content: (
        <select
          value={scheduleHours}
          onChange={(e) => setScheduleHours(Number(e.target.value))}
          className="p-2 border rounded w-full"
        >
          {Array.from({ length: 24 }, (_, i) => i + 1).map((hr) => (
            <option key={hr} value={hr}>{`${hr} hour${
              hr > 1 ? 's' : ''
            }`}</option>
          ))}
        </select>
      ),
      confirmText: 'Schedule',
      cancelText: 'Cancel',
      onConfirm: () =>
        scheduleQuiz.mutate({ quizId: quiz._id, hours: scheduleHours }),
    })
  }

  return (
    <div className="p-3 rounded-md border border-gray-200 shadow-md bg-white">
      <div
        className={`${
          quiz.status == 'draft'
            ? 'bg-yellow-200'
            : quiz.status == 'live'
            ? 'bg-green-300'
            : 'bg-gray-300'
        } flex flex-col gap-2 items-center justify-center h-[240px] w-full`}
      >
        <div
          className={`${
            quiz.status == 'draft'
              ? 'bg-yellow-200'
              : quiz.status == 'live'
              ? 'bg-green-300'
              : quiz.status == 'scheduled'
              ? 'bg-blue-300'
              : 'bg-gray-300'
          } flex flex-col gap-2 items-center justify-center h-[240px] w-full`}
        >
          <button
            onClick={openScheduleModal}
            disabled={
              quiz.status == 'scheduled' ||
              quiz.status == 'closed' ||
              quiz.status == 'live'
            }
            className={`${
              quiz.status == 'draft'
                ? 'bg-purple-500'
                : quiz.status == 'live'
                ? 'bg-green-500'
                : 'bg-gray-500'
            } p-1 rounded-md text-white`}
          >
            {quiz.status == 'draft' && !scheduleQuiz.isLoading && 'Schedule Quiz'}
            {quiz.status == 'live' && 'Active'}
            {quiz.status == 'scheduled' && 'Scheduled'}
            {quiz.status == 'closed' && 'Closed'}
            {scheduleQuiz.isLoading && (
              <>
                <span>scheduling</span>
                <span className="animate-spin ml-2">⏳</span>
              </>
            )}
          </button>
        </div>
      </div>

      <p className="font-bold text-xl mt-2">{quiz.title}</p>
      <p className="text-gray-400">{quiz.questions.length} Questions</p>
      <p className="text-gray-400">{quiz.duration} Minutes</p>
      <p className="text-gray-400">{quiz.category}</p>
      <div className="flex justify-end">
        <Link
          to={`/admin/quiz-builder/${quiz._id}`}
          className="text-blue-500 mr-2"
        >
          {quiz.status == 'draft' && <FaEdit className="text-blue-500" />}
        </Link>
        {quiz.status !== 'live' && <DeleteQuizButton quizId={`${quiz._id}`} />}
      </div>
    </div>
  )
}

export default QuizCard
