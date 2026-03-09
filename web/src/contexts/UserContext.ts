import { createContext } from 'react';

export interface User {
  id: string;
  email: string;
  createdAt?: string;
  approved: boolean;
  role: 'admin' | 'regular';
}

export interface UserContextType {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  setUser: (user: User | null) => void;
  setIsLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);
