import { useContext, useEffect, useState } from 'react';
import { UserContext } from '@/contexts/UserContext';

export const useAuth = () => {
  const context = useContext(UserContext);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!context) {
    throw new Error('useAuth must be used within UserProvider');
  }

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return {
      user: null,
      isLoading: true,
      error: null,
      isMounted: false,
    };
  }

  return {
    user: context.user,
    isLoading: context.isLoading,
    error: context.error,
    isMounted: true,
  };
};
