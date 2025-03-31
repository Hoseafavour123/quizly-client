import { useMutation, useQueryClient } from 'react-query'
import { useModal } from '../../context/ModalContext'
import * as apiAdmin from '../../apiAdmin'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../../context/AppContext'
import {FaTrash} from 'react-icons/fa'

const DeleteQuizButton = ({ quizId }: { quizId: string }) => {
  const { showModal } = useModal()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { showToast } = useAppContext()

  const { mutate } = useMutation(apiAdmin.deleteQuiz, {
    onSuccess: () => {
      showToast({ message: 'Quiz deleted successfully!', type: 'SUCCESS' })
      queryClient.invalidateQueries(['quizzes'])
      navigate('/admin/all-quizzes')
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: 'ERROR' })
    },
  })

  const handleDelete = () => {
    showModal({
      title: 'Confirm Deletion',
      content:
        'Are you sure you want to delete this quiz? This action cannot be undone.',
      confirmText: 'Yes, Delete',
      cancelText: 'Cancel',
      onConfirm: () => mutate(quizId),
    })
  }

  return (
    <button onClick={handleDelete} className="text-red-500 hover:text-red-700">
        <FaTrash/>
    </button>
  )
}

export default DeleteQuizButton
