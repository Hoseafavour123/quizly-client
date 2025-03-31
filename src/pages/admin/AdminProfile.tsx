import { useAdminAuthContext } from '../../context/AdminAuthContext'
import { FaEdit, FaUser } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const OrganisationProfile = () => {
  const { admin } = useAdminAuthContext()
  return (
    <div className="md:p-5 bg-white rounded-md">
      <div className="flex justify-between md:border md:p-2 max-md:p-3 rounded-md">
        <div className="md:flex md:gap-5">
          <div className="w-20 h-20 rounded-full">
            {admin?.imageInfo.imageUrl ? (
              <img src={admin?.imageInfo.imageUrl} alt="h-full w-full" />
            ) : (
              <FaUser className="text-4xl h-full w-full" />
            )}
          </div>
          <div>
            <h1 className="md:text-2xl font-bold text-indigo-700 capitalize">
              {admin?.name}
            </h1>
            <p className="text-sm">{admin?.email}</p>
          </div>
        </div>
        <div>
          <Link className="w-full " to={'/organisation/profile/edit'}>
            <FaEdit className="max-md:text-xl text-2xl md:mr-5 text-indigo-700 hover:text-indigo-500 cursor-pointer" />{' '}
          </Link>
        </div>
      </div>
    
    </div>
  )
}

export default OrganisationProfile
