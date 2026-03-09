import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { trpc } from '@/utils/trpc';
import ProtectedRoute from '@/components/ProtectedRoute';
import { Header } from '@/components/Header';
import { Container } from '@/components/Container';
import { PageHeader } from '@/components/PageHeader';
import { Button } from '@/components/Button';

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
      <div className="min-h-screen bg-canvas">
        <Header />
        <main>
          <Container className="py-12">
            <PageHeader title="User Management" description="Review and manage user accounts" />

            {/* Notification */}
            {notification && (
              <div
                className={`p-4 border-4 rounded-none mb-6 font-bold ${
                  notification.type === 'success'
                    ? 'bg-primary text-ink border-ink'
                    : 'bg-accent text-white border-ink'
                }`}
              >
                {notification.message}
              </div>
            )}

            {/* Error */}
            {usersError && (
              <div className="p-4 bg-accent border-4 border-ink rounded-none text-white font-bold mb-6">
                Error loading users: {(usersError as any)?.message}
              </div>
            )}

            {/* Filter Bar */}
            <div className="flex gap-3 mb-8">
              <Button
                variant={filter === 'all' ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setFilter('all')}
              >
                All ({users.length})
              </Button>
              <Button
                variant={filter === 'pending' ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setFilter('pending')}
              >
                Pending ({users.filter((u) => !u.approved).length})
              </Button>
              <Button
                variant={filter === 'approved' ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setFilter('approved')}
              >
                Approved ({users.filter((u) => u.approved).length})
              </Button>
            </div>

            {/* Loading */}
            {isLoading && <p className="text-ink font-bold text-center py-8">Loading users...</p>}

            {/* Users Table */}
            {!isLoading && filteredUsers.length === 0 && (
              <p className="text-neutral-dark font-bold text-center py-8">No users found in this category.</p>
            )}

            {!isLoading && filteredUsers.length > 0 && (
              <div className="overflow-x-auto border-4 border-ink">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-4 border-ink bg-primary">
                      <th className="text-left p-4 font-bold text-ink">Email</th>
                      <th className="text-left p-4 font-bold text-ink">Status</th>
                      <th className="text-left p-4 font-bold text-ink">Role</th>
                      <th className="text-left p-4 font-bold text-ink">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((u) => (
                      <tr key={u.id} className="border-b-2 border-ink hover:bg-neutral-light transition-colors">
                        <td className="p-4 text-ink font-bold">{u.email}</td>
                        <td className="p-4">
                          <span
                            className={`px-3 py-1 border-2 border-ink font-bold text-sm ${
                              u.approved
                                ? 'bg-primary text-ink'
                                : 'bg-secondary text-ink'
                            }`}
                          >
                            {u.approved ? 'Approved' : 'Pending'}
                          </span>
                        </td>
                        <td className="p-4 text-ink font-bold capitalize">{u.role}</td>
                        <td className="p-4">
                          <div className="flex gap-2">
                            {!u.approved ? (
                              <>
                                <Button
                                  variant="primary"
                                  size="sm"
                                  onClick={() => approveMutation.mutate(u.id)}
                                  disabled={isProcessing}
                                >
                                  Approve
                                </Button>
                                <Button
                                  variant="secondary"
                                  size="sm"
                                  onClick={() => rejectMutation.mutate(u.id)}
                                  disabled={isProcessing}
                                >
                                  Reject
                                </Button>
                              </>
                            ) : (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => disableMutation.mutate(u.id)}
                                disabled={isProcessing}
                              >
                                Disable
                              </Button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </Container>
        </main>
      </div>
    </ProtectedRoute>
  );
};

export default AdminUsersPage;
