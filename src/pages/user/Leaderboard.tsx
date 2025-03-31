import { useQuery } from 'react-query'
import { motion, AnimatePresence } from 'framer-motion'
import { FaCrown } from 'react-icons/fa'
import { useState } from 'react'
import Filters from './Filters'
import * as apiUser from '../../apiClient'
import ConfettiEffect from './ConfettiEffect'
import { LeaderboardType } from '../../apiClient'
import { userIcon } from '../../assets/icons'

export default function Leaderboard() {
  const [filter, setFilter] = useState('weekly')

 
  
  const { data: users, isLoading } = useQuery<LeaderboardType[]>(['leaderboard', filter], () =>
      apiUser.getLeaderboardData(filter), {
        onSuccess(data) {
          console.log(data)
        },
      }
  )

  return (
    <div className="flex flex-col items-center min-h-screen p-6 bg-[#0D0D12] text-white">
      <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-400 via-red-500 to-purple-500 bg-clip-text text-transparent mb-6">
        Leaderboard 🏆
      </h1>

      <Filters filter={filter} setFilter={setFilter} />

      <div className="w-full max-w-3xl bg-neutral-900 p-5 rounded-lg mt-4 shadow-lg">
        {isLoading ? (
          <p className="text-center text-gray-400">Loading...</p>
        ) : (
          <AnimatePresence>
            {users &&
              users.map((user, index) => (
                <motion.div
                  key={user.id}
                  layout
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ type: 'spring', stiffness: 100 }}
                  className={`flex items-center justify-between p-4 mb-3 rounded-lg shadow-md ${
                    index === 0
                      ? 'bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 text-white font-bold shadow-lg'
                      : 'bg-neutral-800'
                  } relative`}
                >
                  {index === 0 && <ConfettiEffect />}{' '}
                  {/* Celebration for 1st place */}
                  <div className="flex items-center justify-evenly space-x-4">
                    <span
                      className={`text-2xl font-bold ${
                        index === 0 ? 'text-yellow-200' : 'text-blue-400'
                      }`}
                    >
                      #{index + 1}
                    </span>

                    <img
                      src={user.imageUrl || userIcon}
                      alt={typeof user.name === 'string' ? user.name : ''}
                      className="w-12 h-12 rounded-full border-2 border-white"
                    />
                    <div className='flex flex-col items-center'>
                      <p className="text-lg hover:underline cursor-pointer">
                        {user.name}
                      </p>
                      <small>{user.email}</small>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <p className="text-xl font-semibold text-yellow-400">
                      {user.score} pts
                    </p>
                    {index === 0 && (
                      <FaCrown className="text-yellow-200 text-2xl animate-pulse" />
                    )}
                  </div>
                </motion.div>
              ))}
          </AnimatePresence>
        )}
      </div>
    </div>
  )
}