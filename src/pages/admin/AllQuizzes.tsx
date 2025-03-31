import { useState } from 'react'
import { useQuery } from 'react-query'
import * as apiAdmin from '../../apiAdmin'
import QuizCard from '../../components/QuizCard'
import { Pagination } from 'flowbite-react'
import { Link } from 'react-router-dom'

const AdminQuizList = () => {
  const [page, setPage] = useState(1)

  const { data, isLoading, isError } = useQuery({
    queryKey: ['quizzes', page],
    queryFn: () => apiAdmin.getAllQuizzes(page),
    keepPreviousData: true, // Keeps old data when fetching a new page
  })

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-5">Admin Quiz List</h2>
      <div className="flex justify-end items-end p-2 border  text-white">
        <Link to={'/admin/quiz-builder'} className=" bg-indigo-500 p-2 rounded-md">
          Add New Quiz
        </Link>
      </div>

      {isLoading && <p className="text-center mt-5">Loading quizzes...</p>}
      {isError && (
        <p className="text-center text-red-500">Error fetching quizzes</p>
      )}

      {!isLoading && !isError && data && (
        <>
          <div className="grid md:grid-cols-3 gap-5 mt-5">
            {data.quizzes.map((quiz: any) => (
              <QuizCard key={quiz._id} quiz={quiz} />
            ))}
          </div>

          <Pagination
            currentPage={data.currentPage}
            totalPages={data.totalPages}
            onPageChange={(page) => setPage(page)}
          />
        </>
      )}
    </div>
  )
}

export default AdminQuizList
