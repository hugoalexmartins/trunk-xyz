import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { trpc } from '@/utils/trpc';
import ProtectedRoute from '@/components/ProtectedRoute';

type FilterType = 'all' | 'pending' | 'approved';

const AdminUsersPage: React.FC = () => {
  const [filter, setFilter] = useState<FilterType>('all');
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const queryClient = useQueryClient();

  // Fetch users
  const { data: users = [], isLoading: usersLoading, error: usersError } = useQuery({
    queryKey: ['admin', 'users'],
    queryFn: () => trpc.admin.listUsers.query(),
  });

  // Approve mutation
  const approveMutation = useMutation({
    mutationFn: (userId: string) => trpc.admin.approveUser.mutate({ userId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'users'] });
      setNotification({ type: 'success', message: 'User approved successfully' });
      setTimeout(() => setNotification(null), 3000);
    },
    onError: (error: any) => {
      setNotification({ type: 'error', message: error.message || 'Failed to approve user' });
    },
  });

  // Reject mutation
  const rejectMutation = useMutation({
    mutationFn: (userId: string) => trpc.admin.rejectUser.mutate({ userId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'users'] });
      setNotification({ type: 'success', message: 'User rejected successfully' });
      setTimeout(() => setNotification(null), 3000);
    },
    onError: (error: any) => {
      setNotification({ type: 'error', message: error.message || 'Failed to reject user' });
    },
  });

  // Disable mutation
  const disableMutation = useMutation({
    mutationFn: (userId: string) => trpc.admin.disableUser.mutate({ userId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'users'] });
      setNotification({ type: 'success', message: 'User disabled successfully' });
      setTimeout(() => setNotification(null), 3000);
    },
    onError: (error: any) => {
      setNotification({ type: 'error', message: error.message || 'Failed to disable user' });
    },
  });

  // Enable mutation
  const enableMutation = useMutation({
    mutationFn: (userId: string) => trpc.admin.enableUser.mutate({ userId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'users'] });
      setNotification({ type: 'success', message: 'User enabled successfully' });
      setTimeout(() => setNotification(null), 3000);
    },
    onError: (error: any) => {
      setNotification({ type: 'error', message: error.message || 'Failed to enable user' });
    },
  });

  // Filter users based on selected filter
  const filteredUsers = users.filter((u) => {
    if (filter === 'pending') return !u.approved;
    if (filter === 'approved') return u.approved;
    return true;
  });

  const isLoading = usersLoading;
  const isProcessing = approveMutation.isPending || rejectMutation.isPending || disableMutation.isPending || enableMutation.isPending;

  return (
    <ProtectedRoute requiredRole="admin">
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '20px' }}>
        <h1>User Management</h1>

        {/* Notification */}
        {notification && (
          <div
            style={{
              padding: '10px 15px',
              marginBottom: '20px',
              borderRadius: '4px',
              backgroundColor: notification.type === 'success' ? '#d4edda' : '#f8d7da',
              color: notification.type === 'success' ? '#155724' : '#721c24',
              border: `1px solid ${notification.type === 'success' ? '#c3e6cb' : '#f5c6cb'}`,
            }}
          >
            {notification.message}
          </div>
        )}

        {/* Error */}
        {usersError && (
          <div
            style={{
              padding: '10px 15px',
              marginBottom: '20px',
              borderRadius: '4px',
              backgroundColor: '#f8d7da',
              color: '#721c24',
              border: '1px solid #f5c6cb',
            }}
          >
            Error loading users: {(usersError as any)?.message}
          </div>
        )}

        {/* Filter Bar */}
        <div style={{ marginBottom: '20px' }}>
          <button
            onClick={() => setFilter('all')}
            style={{
              padding: '8px 16px',
              marginRight: '10px',
              backgroundColor: filter === 'all' ? '#007bff' : '#e9ecef',
              color: filter === 'all' ? 'white' : 'black',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            All ({users.length})
          </button>
          <button
            onClick={() => setFilter('pending')}
            style={{
              padding: '8px 16px',
              marginRight: '10px',
              backgroundColor: filter === 'pending' ? '#007bff' : '#e9ecef',
              color: filter === 'pending' ? 'white' : 'black',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Pending ({users.filter((u) => !u.approved).length})
          </button>
          <button
            onClick={() => setFilter('approved')}
            style={{
              padding: '8px 16px',
              backgroundColor: filter === 'approved' ? '#007bff' : '#e9ecef',
              color: filter === 'approved' ? 'white' : 'black',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Approved ({users.filter((u) => u.approved).length})
          </button>
        </div>

        {/* Loading */}
        {isLoading && <p>Loading users...</p>}

        {/* Users Table */}
        {!isLoading && filteredUsers.length === 0 && (
          <p style={{ color: '#6c757d' }}>No users found in this category.</p>
        )}

        {!isLoading && filteredUsers.length > 0 && (
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              marginTop: '20px',
            }}
          >
            <thead>
              <tr style={{ borderBottom: '2px solid #dee2e6' }}>
                <th style={{ textAlign: 'left', padding: '12px', fontWeight: 'bold' }}>Email</th>
                <th style={{ textAlign: 'left', padding: '12px', fontWeight: 'bold' }}>Status</th>
                <th style={{ textAlign: 'left', padding: '12px', fontWeight: 'bold' }}>Role</th>
                <th style={{ textAlign: 'left', padding: '12px', fontWeight: 'bold' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((u) => (
                <tr key={u.id} style={{ borderBottom: '1px solid #dee2e6' }}>
                  <td style={{ padding: '12px' }}>{u.email}</td>
                  <td style={{ padding: '12px' }}>
                    <span
                      style={{
                        padding: '4px 8px',
                        borderRadius: '4px',
                        backgroundColor: u.approved ? '#d4edda' : '#fff3cd',
                        color: u.approved ? '#155724' : '#856404',
                        fontSize: '12px',
                      }}
                    >
                      {u.approved ? 'Approved' : 'Pending'}
                    </span>
                  </td>
                  <td style={{ padding: '12px' }}>
                    <span style={{ textTransform: 'capitalize' }}>{u.role}</span>
                  </td>
                  <td style={{ padding: '12px' }}>
                    {!u.approved ? (
                      <>
                        <button
                          onClick={() => approveMutation.mutate(u.id)}
                          disabled={isProcessing}
                          style={{
                            padding: '6px 12px',
                            marginRight: '8px',
                            backgroundColor: '#28a745',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: isProcessing ? 'not-allowed' : 'pointer',
                            opacity: isProcessing ? 0.6 : 1,
                          }}
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => rejectMutation.mutate(u.id)}
                          disabled={isProcessing}
                          style={{
                            padding: '6px 12px',
                            backgroundColor: '#dc3545',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: isProcessing ? 'not-allowed' : 'pointer',
                            opacity: isProcessing ? 0.6 : 1,
                          }}
                        >
                          Reject
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => disableMutation.mutate(u.id)}
                        disabled={isProcessing}
                        style={{
                          padding: '6px 12px',
                          backgroundColor: '#ffc107',
                          color: 'black',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: isProcessing ? 'not-allowed' : 'pointer',
                          opacity: isProcessing ? 0.6 : 1,
                        }}
                      >
                        Disable
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </ProtectedRoute>
  );
};

export default AdminUsersPage;
