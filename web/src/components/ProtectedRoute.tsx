import React, { ReactNode } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/hooks/useAuth';

interface ProtectedRouteProps {
  children: ReactNode;
  returnUrl?: string;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  returnUrl
}) => {
  const router = useRouter();
  const { user, isLoading, isMounted } = useAuth();

  // Show loading while hydrating
  if (!isMounted || isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  // Not authenticated, redirect to login
  if (!user) {
    const loginUrl = returnUrl
      ? `/auth/login?returnUrl=${encodeURIComponent(returnUrl)}`
      : '/auth/login';

    router.push(loginUrl);
    return null;
  }

  // Authenticated, render children
  return <>{children}</>;
};
