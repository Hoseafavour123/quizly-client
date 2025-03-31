import { useQuery } from "react-query"
import * as apiAdmin from '../apiAdmin'

export const AUTH_ADMIN = 'auth_admin'

const useAdminAuth = (opts = {}) => {
    const { data: admin, ...rest } = useQuery({
        queryKey: [AUTH_ADMIN],
        queryFn: apiAdmin.getAdmin,
        staleTime:Infinity,
        ...opts
    })
    
    return { admin, ...rest }
}

export default useAdminAuth