import { JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useState } from "react"
import { motion } from "framer-motion"
import { FaStar } from "react-icons/fa"
import { useQuery } from "react-query"
import * as apiUser from '../../apiClient'
import Loader1 from "../../components/Loader1"

const MyQuizzes = () => {
  const [page, setPage] = useState(1)

  const { data, isLoading, error } = useQuery({
    queryKey: ["quizzes", page],
    queryFn: () => apiUser.getCompletedQuizzes({ page }),
    keepPreviousData: true,
    onSuccess(data) {
        console.log(data)
    },
  })

  if (isLoading) return <Loader1/>
  if (error) return <p className="text-red-500">Failed to load quizzes</p>

  return (
    <div className="p-6 text-white bg-[#0D0D12] min-h-screen">
      <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-indigo-400 via-pink-400 to-pink-600 bg-clip-text text-transparent">
        My Quizzes
      </h1>

      {/* Quizzes List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.quizzes.map(
          (quiz: {
            totalQuestions: ReactNode
            quizId: any
            _id: Key | null | undefined
            title:
              | string
              | number
              | boolean
              | ReactElement<any, string | JSXElementConstructor<any>>
              | Iterable<ReactNode>
              | ReactPortal
              | null
              | undefined
            category:
              | string
              | number
              | boolean
              | ReactElement<any, string | JSXElementConstructor<any>>
              | Iterable<ReactNode>
              | ReactPortal
              | null
              | undefined
            score:
              | string
              | number
              | boolean
              | ReactElement<any, string | JSXElementConstructor<any>>
              | Iterable<ReactNode>
              | null
              | undefined
            status:
              | string
              | number
              | boolean
              | ReactElement<any, string | JSXElementConstructor<any>>
              | Iterable<ReactNode>
              | null
              | undefined
          }) => (
            <motion.div
              key={quiz._id}
              whileHover={{ scale: 1.05 }}
              className="cursor-pointer bg-neutral-900 p-5 rounded-lg shadow-lg hover:shadow-indigo-500/50 transition"
            >
              <h2 className="text-xl font-semibold mb-2">
                {quiz.quizId?.title}
              </h2>
              <p className="text-gray-400 mb-2">
                Category: {quiz.quizId?.category}
              </p>
              <div className="flex items-center justify-between">
                {quiz.score !== null ? (
                  <div className="flex items-center gap-2">
                    <FaStar className="text-yellow-400" />
                    <span className="font-semibold">Score: {quiz?.score} / {quiz?.totalQuestions}</span>
                  
                  </div>
                ) : (
                  <span className="text-gray-400">{quiz.quizId?.status}</span>
                )}

                <button
                  className="cursor-default px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition"
                >
                  {quiz?.status === 'Completed' ? 'Retake' : 'Completed'}
                </button>
              </div>
            </motion.div>
          )
        )}
      </div>

      {/* Pagination Controls */}
        <div className="mt-6 flex justify-center gap-4">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-lg text-white">Page {data.currentPage}</span>
        <button
          onClick={() => setPage((prev) => prev + 1)}
          disabled={data.quizzes.length < 10} 
          className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default MyQuizzes