import React, { ReactNode, useState, useEffect, useCallback } from 'react';
import { UserContext, User, UserContextType } from './UserContext';
import { trpc } from '@/utils/trpc';

interface UserProviderProps {
  children: ReactNode;
}

/**
 * UserProvider manages global authentication state
 * Wraps the application and provides UserContext to all child components
 *
 * On mount, attempts to load the current authenticated user from the API
 * If no valid JWT cookie exists, user will be null (unauthenticated)
 */
export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Check if user is logged in on component mount
  useEffect(() => {
    const checkUser = async () => {
      try {
        // Try to fetch the current user from the API
        // This call will use the JWT cookie if it exists
        const result = await trpc.auth.getCurrentUser.query();
        if (result) {
          setUser(result);
          setError(null);
        } else {
          setUser(null);
        }
      } catch (err) {
        // No user logged in or token expired - silently fail
        setUser(null);
        setError(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkUser();
  }, []);

  const handleSetUser = useCallback((newUser: User | null) => {
    setUser(newUser);
    setError(null);
  }, []);

  const handleSetError = useCallback((newError: string | null) => {
    setError(newError);
  }, []);

  const value: UserContextType = {
    user,
    isLoading,
    error,
    setUser: handleSetUser,
    setIsLoading,
    setError: handleSetError,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
