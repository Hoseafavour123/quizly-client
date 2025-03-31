import { Card } from 'flowbite-react'
import { motion } from 'framer-motion'
import { Line, Doughnut } from 'react-chartjs-2'
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
)

const Dashboard = () => {
  const lineData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Score Progression',
        data: [70, 80, 85, 90],
        borderColor: '#6366F1',
        backgroundColor: 'rgba(99, 102, 241, 0.2)',
        tension: 0.3,
      },
    ],
  }

  const doughnutData = {
    labels: ['Math', 'Science', 'History', 'English'],
    datasets: [
      {
        data: [30, 25, 20, 25],
        backgroundColor: ['#6366F1', '#10B981', '#F59E0B', '#EF4444'],
      },
    ],
  }

  return (
    <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Statistics Cards */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="p-6 shadow-lg">
          <h2 className="text-xl font-semibold">Total Quizzes Taken</h2>
          <p className="text-3xl font-bold text-indigo-500">24</p>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card className="p-6 shadow-lg">
          <h2 className="text-xl font-semibold">Average Score</h2>
          <p className="text-3xl font-bold text-green-500">85%</p>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Card className="p-6 shadow-lg">
          <h2 className="text-xl font-semibold">Highest Score</h2>
          <p className="text-3xl font-bold text-yellow-500">98%</p>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <Card className="p-6 shadow-lg">
          <h2 className="text-xl font-semibold">Rank</h2>
          <p className="text-3xl font-bold text-red-500">#3</p>
        </Card>
      </motion.div>

      {/* Charts Section */}
      <Card className="p-6 shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Score Progression</h2>
        <Line data={lineData} />
      </Card>

      <Card className="p-6 shadow-lg">
        <h2 className="text-xl font-semibold mb-4">
          Quiz Category Distribution
        </h2>
        <Doughnut data={doughnutData} />
      </Card>

      
    </div>
  )
}

export default Dashboard
