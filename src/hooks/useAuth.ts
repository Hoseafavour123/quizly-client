import { useQuery } from 'react-query'
import * as apiClient from '../apiClient'

export const AUTH = 'auth'

const useAuth = (opts = {}) => {
  const { data: user, ...rest } = useQuery({
    queryKey: [AUTH],
    queryFn: apiClient.getUser,
    staleTime: Infinity,
    ...opts,
  })

  return { user, ...rest }
}

export default useAuth
