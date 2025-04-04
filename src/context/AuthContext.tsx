import { createContext, useContext, ReactNode } from 'react'
import useAuth from '../hooks/useAuth'

type AuthContextType = ReturnType<typeof useAuth>

const AuthContext = createContext<
  AuthContextType | undefined
>(undefined)

export const AuthProvider = ({
  children,
}: {
  children: ReactNode
}) => {
  const auth = useAuth()

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error(
      'useAuthContext must be used within a UserAuthProvider'
    )
  }
  return context
}
