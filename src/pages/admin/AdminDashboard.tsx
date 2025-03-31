import { useQuery } from 'react-query'
import { motion } from 'framer-motion'
import { Card, Button } from 'flowbite-react'
import { Link } from 'react-router-dom'
import {
  FaUsers,
  FaClipboardList,
  FaUserShield,
  FaUserPlus,
  FaFileAlt,
  FaPlus,
  FaEye,
} from 'react-icons/fa'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import * as apiAdmin from '../../apiAdmin'
import Loader1 from '../../components/Loader1'

const AdminDashboard = () => {
  const { data, isLoading, error } = useQuery(
    ['adminStats'],
    apiAdmin.getAdminStats
  )

  if (isLoading) return <Loader1 />
  if (error) return <p>Error fetching stats</p>

  return (
    <div className="min-h-screen bg-gray-900 p-6 text-gray-200">
      {/* Title and Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex justify-between items-center mb-8"
      >
        <h1 className="text-4xl font-extrabold text-white">Admin Dashboard</h1>
        <div className="flex  gap-4">
          <Link to="/admin/quiz-builder">
            <Button className="bg-green-500 hover:bg-green-600 text-white flex items-center justify-center gap-2">
              <FaPlus /> <p> New Quiz </p>
            </Button>
          </Link>
          <Link to="/admin/all-quizzes">
            <Button className="bg-blue-500 hover:bg-blue-600 text-white flex items-center gap-2">
              <FaEye /> View Quizzes
            </Button>
          </Link>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6 mb-8">
        {[
          {
            title: 'Total Users',
            value: data?.totalUsers,
            icon: FaUsers,
            color: 'yellow',
          },
          {
            title: 'New Users (This Month)',
            value: data?.newUsersThisMonth,
            icon: FaUserPlus,
            color: 'green',
          },
          {
            title: 'Total Quizzes',
            value: data?.totalQuizzes,
            icon: FaClipboardList,
            color: 'blue',
          },
          {
            title: 'New Quizzes (This Month)',
            value: data?.newQuizzesThisMonth,
            icon: FaFileAlt,
            color: 'purple',
          },
          {
            title: 'Total Admins',
            value: data?.totalAdmins,
            icon: FaUserShield,
            color: 'red',
          },
        ].map((stat, index) => (
          <motion.div key={index} whileHover={{ scale: 1.05 }}>
            <Card className="p-6 flex items-center bg-gray-800 shadow-lg rounded-lg">
              <stat.icon className={`text-${stat.color}-400 text-5xl mr-4`} />
              <div>
                <h2 className="text-lg font-semibold text-gray-300">
                  {stat.title}
                </h2>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* User Registration Chart */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-white mb-4">
          User Registrations (Last 6 Months)
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data?.userRegistrations || []}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" stroke="#ccc" />
            <YAxis stroke="#ccc" />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="count"
              stroke="#4CAF50"
              strokeWidth={3}
              dot={{ fill: 'white' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default AdminDashboard
