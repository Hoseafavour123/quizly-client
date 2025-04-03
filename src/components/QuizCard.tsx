import { Link } from 'react-router-dom'
import { FaEdit } from 'react-icons/fa'
import DeleteQuizButton from './buttons/DeleteQuiz'
import { useModal } from '../context/ModalContext'
import { useMutation } from 'react-query'
import * as apiAdmin from '../apiAdmin'
import { useAppContext } from '../context/AppContext'

interface QuizCardProps {
  quiz: any
}

const QuizCard = ({ quiz }: QuizCardProps) => {
  const { showToast } = useAppContext()

  const mutation = useMutation(apiAdmin.goLive, {
    onSuccess: () => {
      showToast({ message: 'Quiz is live', type: 'SUCCESS' })
      window.location.reload()
      console.log('Quiz is live')
    },
    onError: (err: Error) => {
      showToast({ message: err.message, type: 'ERROR' })
      console.log(err.message)
    },
  })

  const mutatePay = useMutation(apiAdmin.notifyUsersForPayment, {
    onSuccess: () => {
      showToast({ message: 'Payment notification sent', type: 'SUCCESS' })
      window.location.reload()
    },
    onError: (err: Error) => {
      showToast({ message: err.message, type: 'ERROR' })
      console.log(err.message)
    },
  })

  const { showModal } = useModal()
  const openModal = () => {
    showModal({
      title: 'Go Live',
      content: 'Are you sure you want to go live?',
      confirmText: 'Yes',
      cancelText: 'No',
      onConfirm: () => {
        mutation.mutate(quiz._id)
      },
    })
  }

  const openPaymentModal = () => {
    showModal({
      title: 'Notify for Payment',
      content: 'Are you sure you want to notify all users for payment?',
      confirmText: 'Yes',
      cancelText: 'No',
      onConfirm: () => {
        mutatePay.mutate(quiz._id)
      },
    })
  }

  return (
    <>
      <div className="p-3 rounded-md border border-gray-200 shadow-md bg-white">
        <div
          className={`${
            quiz.status == 'draft'
              ? 'bg-yellow-200'
              : `${quiz.status == 'live' ? 'bg-green-300' : 'bg-gray-300'}`
          } flex items-center justify-center  h-[200px] w-full`}
        >
          <div className="bg-black p-2 rounded-md flex items-center justify-center text-white">
            <button
              disabled={quiz.status == 'closed'}
              onClick={openModal}
              className={`${
                quiz.status == 'draft'
                  ? 'bg-purple-500'
                  : quiz.status == 'live'
                  ? 'bg-green-500'
                  : 'bg-gray-500'
              } p-1 rounded-md text-white`}
            >
              {' '}
              {quiz.status == 'draft' ? (
                'Go live'
              ) : (
                <>{quiz.status == 'live' ? 'Active' : 'Closed'}</>
              )}
            </button>
          </div>

          <div
            className={`${
              quiz.status !== 'draft' && 'hidden'
            } bg-black p-2 rounded-md flex items-center justify-center text-white`}
          >
            <button
              onClick={openPaymentModal}
              disabled={quiz.notificationSent}
              className={`${
                quiz.notificationSent ?'bg-green-400':'bg-yellow-500'
              } p-1 rounded-md text-white`}
            >
              {' '}
              {quiz.status == 'draft' && quiz.notificationSent
                ? 'Notification Sent'
                : 'Notify users'}
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

          {quiz.status !== 'live' && (
            <DeleteQuizButton quizId={`${quiz._id}`} />
          )}
        </div>
      </div>
    </>
  )
}

export default QuizCard
