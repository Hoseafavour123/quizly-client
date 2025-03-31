import { useState } from 'react'
import { SubmitHandler, useForm, Controller } from 'react-hook-form'
import { useMutation } from 'react-query'
import * as apiAdmin from '../../apiAdmin'
import { useAppContext } from '../../context/AppContext'
import { abcBlock } from '../../assets/images'
import { FloatingLabel } from 'flowbite-react'
import { useNavigate } from 'react-router-dom'

import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css' // Import styles

type Question = {
  text: string
  options: string[]
  correctAnswer: string
  image?: File | null
}

type QuizFormData = {
  title: string
  description: string
  duration: number
  category: string
  questions: Question[]
}

const quizCategories = [
  'General Knowledge',
  'Science & Technolgy',
  'Entertainment & Pop Culture',
  'History',
  'Sports & Fitness',
  'Business & Finance',
  'Health & Medicine',
]

const QuizBuilder = () => {
  const { showToast } = useAppContext()
  const navigate = useNavigate()
  const { control, register, handleSubmit, reset } = useForm<QuizFormData>()
  const [questions, setQuestions] = useState<Question[]>([])
  const [newQuestion, setNewQuestion] = useState<Question>({
    text: '',
    options: [''],
    correctAnswer: '',
    image: null,
  })

  const { mutate, isLoading } = useMutation(apiAdmin.createQuiz, {
    onSuccess: () => {
      showToast({ message: 'Quiz created successfully!', type: 'SUCCESS' })
      reset()
      setQuestions([])
      navigate('/admin/all-quizzes')
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: 'ERROR' })
    },
  })

  const addOption = () => {
    setNewQuestion({ ...newQuestion, options: [...newQuestion.options, ''] })
  }

  const removeOption = (index: number) => {
    const updatedOptions = [...newQuestion.options]
    updatedOptions.splice(index, 1)
    setNewQuestion({ ...newQuestion, options: updatedOptions })
  }

  const addQuestion = () => {
    setQuestions([...questions, newQuestion])
    setNewQuestion({
      text: '',
      options: [''],
      correctAnswer: '',
      image: null,
    })
  }

  const deleteQuestion = (index: number) => {
    setQuestions(questions.filter((_, i) => i !== index))
  }

  const onSubmit: SubmitHandler<QuizFormData> = (data) => {
    const formData = new FormData()

    formData.append('title', data.title)
    formData.append('description', data.description)
    formData.append('duration', data.duration.toString())
    formData.append('category', data.category)
    console.log(data.category)

    // Include questions from state, not just the form
    questions.forEach((q, index) => {
      formData.append(`questions[${index}][text]`, q.text)
      q.options.forEach((opt, optIndex) => {
        formData.append(`questions[${index}][options][${optIndex}]`, opt)
      })
      formData.append(`questions[${index}][correctAnswer]`, q.correctAnswer)
      if (q.image) {
        formData.append(`questions[${index}][image]`, q.image)
      }
    })

    mutate(formData)
  }

  return (
    <>
      <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
        <div className="text-center">
          <img src={abcBlock} alt="Quiz Builder" className="w-25 mx-auto" />
          <h2 className="text-2xl font-bold mb-4">
            Quiz <span className="text-pink-500">Builder</span>
          </h2>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex gap-5 rounded-md items-center border p-2">
            <div className="flex rounded-md items-center justify-center w-8 h-10 p-4 bg-indigo-500 text-white">
              1
            </div>
            <p className="font-bold">Quiz Name: </p>
            <div className="w-3/4">
              <FloatingLabel
                {...register('title')}
                variant="standard"
                label=""
              />
            </div>
          </div>

          <div className="flex gap-5 rounded-md items-center border p-2">
            <div className="flex rounded-md items-center justify-center w-8 h-10 p-4 bg-indigo-500 text-white">
              2
            </div>
            <p className="font-bold">Quiz Category: </p>
            <div className="w-3/4"></div>
            <Controller
              control={control}
              name="category"
              render={({ field }) => (
                <select
                  {...field}
                  {...register('category')}
                  className="mt-2 p-2 border border-gray-300 rounded w-full"
                >
                  <option value="" disabled>
                    Select a category
                  </option>
                  {quizCategories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              )}
              rules={{ required: 'Category is required' }}
            />
          </div>

          <div className="rounded-md items-center border p-2  mt-5">
            <div className="flex gap-5 mb-3 items-center">
              <div className="flex rounded-md items-center justify-center w-8 h-10 p-4 bg-indigo-500 text-white">
                3
              </div>
              <span className="font-bold">Description:</span>
            </div>

            <div className="">
              <Controller
                {...register('description')}
                control={control}
                render={({ field }) => <ReactQuill {...field} theme="snow" />}
              />

              <p className="mt-4 mb-4 text-sm font-semibold">Preview:</p>
              <div className="border p-2 rounded bg-gray-100 mt-2">
                <Controller
                  {...register('description')}
                  control={control}
                  render={({ field }) => (
                    <div dangerouslySetInnerHTML={{ __html: field?.value }} />
                  )}
                />
              </div>
            </div>
          </div>

          <div className="flex gap-5 rounded-md items-center border p-2 mt-5">
            <div className="flex rounded-md items-center justify-center w-8 h-10 p-4 bg-indigo-500 text-white">
              4
            </div>
            <p className="font-bold">Duration(in minutes): </p>
            <div className="">
              <FloatingLabel
                {...register('duration')}
                min={1}
                type="number"
                variant="standard"
                label=""
              />
            </div>
          </div>

          <div className="gap-5 rounded-md items-center border p-2 mt-[50px]">
            <div className="flex gap-5 items-center">
              <div className="flex rounded-md items-center justify-center w-8 h-10 p-4 bg-indigo-500 text-white">
                5
              </div>
              <p className="font-bold">Quiz Questions: </p>
            </div>

            <h3 className="font-semibold mt-3 mb-4">
              Add Question(attach image if needed)
            </h3>

            <FloatingLabel
              value={newQuestion.text}
              onChange={(e) =>
                setNewQuestion({ ...newQuestion, text: e.target.value })
              }
              variant="standard"
              label="Question"
              className="w-full"
            />

            {newQuestion.options.map((option, index) => (
              <div key={index} className="flex items-center gap-2 mb-2">
                <span className="font-bold">
                  {String.fromCharCode(65 + index)}.
                </span>
                <FloatingLabel
                  value={option}
                  onChange={(e) => {
                    const updatedOptions = [...newQuestion.options]
                    updatedOptions[index] = e.target.value
                    setNewQuestion({ ...newQuestion, options: updatedOptions })
                  }}
                  variant="standard"
                  label={`Option ${index + 1}`}
                  className="w-full"
                />

                {newQuestion.options.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeOption(index)}
                    className="bg-red-400 text-white text-xs p-1 rounded"
                  >
                    X
                  </button>
                )}
              </div>
            ))}

            <button
              type="button"
              onClick={addOption}
              className="bg-gray-500 text-white text-xs px-3 py-1 rounded mb-3"
            >
              + Add Option
            </button>

            <div className=" mt-5">
              <p className="font-semibold">Correct answer (A, B, C or D)</p>
              <FloatingLabel
                value={newQuestion.correctAnswer}
                onChange={(e) =>
                  setNewQuestion({
                    ...newQuestion,
                    correctAnswer: e.target.value.toUpperCase(),
                  })
                }
                variant="standard"
                label={``}
                className="w-auto"
              />

              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setNewQuestion({
                    ...newQuestion,
                    image: e.target.files?.[0] || null,
                  })
                }
                className="hidden p-2 border rounded mb-3 text-xs"
              />
            </div>

            <button
              type="button"
              className="bg-indigo-500 text-white px-2 py-1 rounded mb-4"
              onClick={addQuestion}
            >
              Add Question
            </button>
          </div>

          <div className="border-t pt-4 mt-8">
            <h2 className="text-2xl text-center mt-5 font-semibold">
              Added <span> Questions</span>
            </h2>
            {questions.map((question, index) => (
              <div key={index} className="border p-3 mb-2 rounded shadow-sm">
                <h4 className="font-bold">
                  {index + 1}. {question.text}
                </h4>
                {question.image && (
                  <img
                    src={URL.createObjectURL(question.image)}
                    alt="Question"
                    className="w-40 h-40 object-cover mt-2"
                  />
                )}
                <ul className="mt-2">
                  {question.options.map((option, optIndex) => (
                    <li key={optIndex} className="flex gap-2 items-center">
                      <span className="font-bold">
                        {String.fromCharCode(65 + optIndex)}.
                      </span>{' '}
                      {option}
                    </li>
                  ))}
                </ul>
                <p className="mt-2">
                  <strong>Correct Answer:</strong> {question.correctAnswer}
                </p>
                <button
                  type="button"
                  onClick={() => deleteQuestion(index)}
                  className="bg-red-500 text-white text-xs px-2 py-1 rounded mt-2"
                >
                  Delete Question
                </button>
              </div>
            ))}
          </div>

          <button
            type="submit"
            className="bg-pink-600 text-white px-6 py-2 rounded mt-4"
            disabled={isLoading}
          >
            {isLoading ? 'Saving...' : 'Save Quiz'}
          </button>
        </form>
      </div>
    </>
  )
}

export default QuizBuilder
