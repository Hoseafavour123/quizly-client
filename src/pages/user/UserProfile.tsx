import { useAuthContext } from '../../context/AuthContext'
import { FaEdit } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const UserProfile = () => {
  const { user } = useAuthContext()
  return (
    <div className="md:p-5 bg-white rounded-md">
      <div className="flex justify-between md:border md:p-2 max-md:p-3 rounded-md">
        <div className="md:flex md:gap-5">
          <div className="rounded-full h-20 w-20">
            <img src={user?.imageInfo.imageUrl} alt="h-full w-full" />
          </div>
          <div>
            <h1 className="md:text-2xl font-bold text-indigo-700 capitalize">
              {user?.firstName} {user?.lastName}
            </h1>
            <p className="text-sm">{user?.email}</p>
            <p className="text-sm text-green-500">Open for work</p>
          </div>
        </div>
        <div>
          <Link to={'/profile/edit'} className="w-full">
            <FaEdit className="max-md:text-xl text-2xl md:mr-5 text-indigo-700 cursor-pointer" />
          </Link>
        </div>
      </div>
  
    </div>
  )
}

export default UserProfile
