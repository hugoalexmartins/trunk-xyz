import { useState, useContext } from 'react';
import { trpc } from '@/utils/trpc';
import { UserContext } from '@/contexts/UserContext';

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const context = useContext(UserContext);

  if (!context) {
    throw new Error('useLogin must be used within UserProvider');
  }

  const mutate = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await trpc.auth.login.mutate({
        email,
        password,
      });

      // Update context with logged in user
      context.setUser({
        id: result.id,
        email: result.email,
      });

      return result;
    } catch (err: any) {
      const errorMessage = err?.message || 'Login failed';
      setError(errorMessage);
      context.setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    mutate,
    isLoading,
    error,
  };
};
