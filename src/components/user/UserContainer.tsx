import { Navigate, Outlet } from 'react-router-dom'
import { useAuthContext } from '../../context/AuthContext'

const UserContainer = () => {
  const { user, isLoading } = useAuthContext()

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[90vh] w-full flex-col">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
      </div>
    )
  }

  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
        state={{
          redirectUrl: window.location.pathname,
        }}
      />
    )
  }

  return (
    <div className="min-h-screen">
      <Outlet />
    </div>
  )
}

export default UserContainer
