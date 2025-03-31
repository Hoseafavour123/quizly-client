import { createContext, useContext, ReactNode } from 'react'
import useAdminAuth from '../hooks/useAdminAuth'

type AdminAuthContextType = ReturnType<typeof useAdminAuth>

const AdminAuthContext = createContext<
  AdminAuthContextType | undefined
>(undefined)

export const AdminAuthProvider = ({
  children,
}: {
  children: ReactNode
}) => {
  const auth = useAdminAuth()

  return (
    <AdminAuthContext.Provider value={auth}>
      {children}
    </AdminAuthContext.Provider>
  )
}

export const useAdminAuthContext = () => {
  const context = useContext(AdminAuthContext)
  if (!context) {
    throw new Error(
      'useAdminAuthContext must be used within a AdminAuthProvider'
    )
  }
  return context
}
