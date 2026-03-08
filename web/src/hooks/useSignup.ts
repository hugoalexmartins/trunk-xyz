import { useState } from 'react';
import { trpc } from '@/utils/trpc';

export const useSignup = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mutate = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await trpc.auth.signup.mutate({
        email,
        password,
      });

      return result;
    } catch (err: any) {
      const errorMessage = err?.message || 'Signup failed';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    mutate,
    isLoading,
    error,
    success: false,
  };
};
