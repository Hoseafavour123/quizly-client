import { Link, useLocation } from 'react-router-dom'
import {
  FaTimes,
  FaTrophy,
  FaChartBar,
  FaCog,
  FaQuestion,
  FaBroadcastTower
} from 'react-icons/fa'
import { appInfo } from '../../constants/app.info'

type SidebarProps = {
  isOpen: boolean
  toggleSidebar: () => void
}

const Sidebar = ({ isOpen, toggleSidebar }: SidebarProps) => {
  return (
    <div className="flex h-screen fixed z-30 text-white">
      <div
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-[#0D0D12] transition-transform duration-300 ease-in-out transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 lg:static lg:inset-0`}
      >
        <div className="h-full p-4 text-white">
          {/* Sidebar Header */}
          <div className="flex justify-between items-center mb-10">
            <Link
              to={'/user'}
              className="text-3xl font-bold flex items-center gap-2"
            >
                               
              <img src={appInfo.logo} className="w-full h-[70px]" alt="" />
          
            </Link>
             
            <button onClick={toggleSidebar} className="lg:hidden">
              <FaTimes size={24} />
            </button>
          </div>

          {/* Sidebar Links */}
          <div className="flex-1">
            <p className="font-semibold text-lg mb-4">Main Menu</p>
            <div className="flex flex-col gap-4">
              <SidebarLink
                to="/user"
                icon={<FaChartBar />}
                label="Dashboard"
                toggleSidebar={toggleSidebar}
              />
              <SidebarLink
                to="/user/live-quiz"
                icon={<FaBroadcastTower/>}
                label="Live Quiz"
                toggleSidebar={toggleSidebar}
              />
              <SidebarLink
                to="/user/my-quizzes"
                icon={<FaQuestion />}
                label="My Quizzes"
                toggleSidebar={toggleSidebar}
              />
              <SidebarLink
                to="/user/leaderboard"
                icon={<FaTrophy />}
                label="Leaderboard"
                toggleSidebar={toggleSidebar}
              />
              <SidebarLink
                to="/user/settings"
                icon={<FaCog />}
                label="Settings"
                toggleSidebar={toggleSidebar}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 z-20 bg-black opacity-50 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </div>
  )
}

// Sidebar Link Component with Active State
const SidebarLink = ({
  to,
  icon,
  label,
  toggleSidebar,
}: {
  to: string
  icon: React.ReactNode
  label: string
  toggleSidebar: () => void
}) => {
  const location = useLocation()
  const isActive = location.pathname === to

  return (
    <Link
      to={to}
      className={`flex items-center gap-3 p-3 rounded-md text-sm transition duration-200 ${
        isActive
          ? 'bg-indigo-600 text-white font-semibold'
          : 'hover:bg-neutral-700 active:bg-neutral-600'
      }`}
      onClick={toggleSidebar}
    >
      {icon} <span>{label}</span>
    </Link>
  )
}

export default Sidebar
