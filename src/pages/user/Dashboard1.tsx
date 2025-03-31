import { motion } from 'framer-motion'
import { Button, Card } from 'flowbite-react'
import {
  FaChartBar,
  FaClipboardList,
  FaEye,
  FaTasks,
  FaTrophy
} from 'react-icons/fa'
import * as apiUser from '../../apiClient'
import { StatsData } from '../../apiClient'
import { useQuery } from 'react-query'
import { useAuthContext } from '../../context/AuthContext'
import { useState } from 'react'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
} from 'chart.js'
import Loader1 from '../../components/Loader1'
import { Link } from 'react-router-dom'

// Register Chart.js components
ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale)

const Dashboard = () => {
  const { user } = useAuthContext() // Get logged-in user
  const userId = user?._id

  const [filter, setFilter] = useState<'daily' | 'weekly' | 'monthly'>('weekly')
  const [stats, setStats] = useState<StatsData | null>(null)

  const { data, isLoading } = useQuery(
    ['userStats', userId, filter], // Include filter in dependency array
    () =>
      user ? apiUser.getStats(filter) : Promise.reject('User is undefined'),
    {
      enabled: !!userId, // Prevent query if userId is missing
      onSuccess(data) {
        console.log(data)
        setStats(data)
      },
    }
  )

  // Prepare data for Chart.js
  const chartData = {
    labels: stats?.formattedStats?.map((d) => d.day) || [],
    datasets: [
      {
        label: 'Score Progression',
        data: stats?.formattedStats?.map((d) => d.score) || [],
        borderColor: '#4F46E5',
        backgroundColor: 'rgba(79, 70, 229, 0.2)',
        borderWidth: 2,
        tension: 0.4,
        fill: true,
      },
    ],
  }

  if (isLoading) return <Loader1 />

  return (
    <div className="min-h-screen bg-gray-900 p-6 text-gray-200">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex justify-between items-center mb-8"
      >
        <h1 className="text-4xl font-extrabold text-white">Quiz Dashboard</h1>
      </motion.div>
      <div className="mt-5 mb-4 flex gap-4">
        <Link to="/my-quizzes">
          <Button className="bg-green-500 hover:bg-green-600 text-white flex items-center justify-center gap-2">
            <FaTasks/> <p> My Quizzes </p>
          </Button>
        </Link>
        <Link to="/leaderboard">
          <Button className="bg-blue-500 hover:bg-blue-600 text-white flex items-center gap-2">
            <FaEye /> Leaderboard
          </Button>
        </Link>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <motion.div whileHover={{ scale: 1.05 }}>
          <Card className="p-6 flex items-center bg-gray-800 shadow-lg rounded-lg">
            <FaChartBar className="text-yellow-400 text-5xl mr-4" />
            <div>
              <h2 className="text-lg font-semibold text-gray-300">
                Total Quizzes Taken
              </h2>
              <p className="text-2xl font-bold text-white">
                {data?.totalQuizzesTaken}
              </p>
            </div>
          </Card>
        </motion.div>
        <motion.div whileHover={{ scale: 1.05 }}>
          <Card className="p-6 flex items-center bg-gray-800 shadow-lg rounded-lg">
            <FaClipboardList className="text-green-400 text-5xl mr-4" />
            <div>
              <h2 className="text-lg font-semibold text-gray-300">
                Highest Score
              </h2>
              <p className="text-2xl font-bold text-white">
                {data?.highestScore}%
              </p>
            </div>
          </Card>
        </motion.div>
        <motion.div whileHover={{ scale: 1.05 }}>
          <Card className="p-6 flex items-center bg-gray-800 shadow-lg rounded-lg">
            <FaTrophy className="text-blue-400 text-5xl mr-4" />
            <div>
              <h2 className="text-lg font-semibold text-gray-300">Rank</h2>
              <h3 className="text-xl font-bold">{data?.userRank || 'N/A'}</h3>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Statistics Section */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-300">Statistics</h3>
        <select
          value={filter}
          onChange={(e) =>
            setFilter(e.target.value as 'daily' | 'weekly' | 'monthly')
          }
          className="hidden p-2 border border-gray-600 bg-gray-800 text-gray-300 rounded-md"
        >
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>
      </div>

      <div className="bg-gray-800 p-4 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-300 mb-2">
          Score Progression
        </h3>
        <Line data={chartData} />
      </div>
    </div>
  )
}

export default Dashboard
