import { useState, useContext } from 'react'
import { trpc } from '@/utils/trpc'
import { UserContext } from '@/contexts/UserContext'

export const useLogout = () => {
  const [isLoading, setIsLoading] = useState(false)
  const context = useContext(UserContext)

  if (!context) {
    throw new Error('useLogout must be used within UserProvider')
  }

  const mutate = async () => {
    setIsLoading(true)
    try {
      await trpc.auth.logout.mutate()
      context.setUser(null)
      return true
    } catch (err) {
      context.setError('Logout failed')
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  return {
    mutate,
    isLoading,
  }
}
