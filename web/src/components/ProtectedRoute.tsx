import React, { ReactNode } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/hooks/useAuth';
import { useLogout } from '@/hooks/useLogout';

interface ProtectedRouteProps {
  children: ReactNode;
  returnUrl?: string;
  requiredRole?: 'admin' | 'regular';
}

const PendingApprovalScreen: React.FC = () => {
  const { mutate: logout } = useLogout();

  return (
    <div style={{ maxWidth: '500px', margin: '100px auto', textAlign: 'center', padding: '20px' }}>
      <h1>Pending Admin Approval</h1>
      <p style={{ marginTop: '20px', color: '#666' }}>
        Your account is awaiting approval from an administrator. You will receive an email once your account has been approved.
      </p>
      <p style={{ marginTop: '10px', color: '#666' }}>
        Please check back soon.
      </p>
      <button
        onClick={() => logout()}
        style={{
          marginTop: '30px',
          padding: '10px 20px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        Logout
      </button>
    </div>
  );
};

const AccessDeniedScreen: React.FC = () => {
  const router = useRouter();

  return (
    <div style={{ maxWidth: '500px', margin: '100px auto', textAlign: 'center', padding: '20px' }}>
      <h1>Access Denied</h1>
      <p style={{ marginTop: '20px', color: '#666' }}>
        You don't have permission to access this page.
      </p>
      <button
        onClick={() => router.push('/')}
        style={{
          marginTop: '30px',
          padding: '10px 20px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        Go to Home
      </button>
    </div>
  );
};

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  returnUrl,
  requiredRole,
}) => {
  const router = useRouter();
  const { user, isLoading, isMounted } = useAuth();

  // Show loading while hydrating
  if (!isMounted || isLoading) {
    return <div style={{ textAlign: 'center', padding: '50px' }}>Loading...</div>;
  }

  // Not authenticated, redirect to login
  if (!user) {
    const loginUrl = returnUrl
      ? `/auth/login?returnUrl=${encodeURIComponent(returnUrl)}`
      : '/auth/login';

    router.push(loginUrl);
    return null;
  }

  // Check if user is approved
  if (!user.approved) {
    return <PendingApprovalScreen />;
  }

  // Check role if required
  if (requiredRole && user.role !== requiredRole) {
    return <AccessDeniedScreen />;
  }

  // Authenticated and approved, render children
  return <>{children}</>;
};

export default ProtectedRoute;
