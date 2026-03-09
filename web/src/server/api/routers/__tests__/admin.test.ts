import { describe, it, expect, beforeEach, afterEach } from '@jest/globals';
import { TRPCError } from '@trpc/server';
import { adminRouter } from '../admin';
import { PrismaClient } from '@prisma/client';

/**
 * Admin Router Unit Tests
 * Tests for user management endpoints with role-based authorization
 */

// Mock Prisma
const mockPrisma = {
  user: {
    findUnique: jest.fn(),
    findMany: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
};

const createMockContext = (userId: string, role: 'admin' | 'regular' = 'admin') => ({
  user: {
    sub: userId,
  },
  prisma: mockPrisma,
});

describe('Admin Router', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('listUsers', () => {
    it('should require admin role', async () => {
      const adminId = 'admin-123';
      const ctx = createMockContext(adminId, 'regular');

      mockPrisma.user.findUnique.mockResolvedValueOnce({ id: adminId, role: 'regular' });

      const caller = adminRouter.createCaller(ctx);

      try {
        await caller.listUsers();
        expect(true).toBe(false); // Should throw
      } catch (error) {
        expect(error).toBeInstanceOf(TRPCError);
        expect((error as TRPCError).code).toBe('FORBIDDEN');
      }
    });

    it('should return all users with approval status', async () => {
      const adminId = 'admin-123';
      const ctx = createMockContext(adminId);
      const mockUsers = [
        { id: 'user-1', email: 'user1@example.com', approved: true, role: 'regular', createdAt: new Date() },
        { id: 'user-2', email: 'user2@example.com', approved: false, role: 'regular', createdAt: new Date() },
      ];

      mockPrisma.user.findUnique.mockResolvedValueOnce({ id: adminId, role: 'admin' });
      mockPrisma.user.findMany.mockResolvedValueOnce(mockUsers);

      const caller = adminRouter.createCaller(ctx);
      const result = await caller.listUsers();

      expect(result).toEqual(mockUsers);
      expect(mockPrisma.user.findMany).toHaveBeenCalledWith({
        select: {
          id: true,
          email: true,
          approved: true,
          role: true,
          createdAt: true,
        },
        orderBy: { createdAt: 'desc' },
      });
    });

    it('should be ordered by most recent first', async () => {
      const adminId = 'admin-123';
      const ctx = createMockContext(adminId);

      mockPrisma.user.findUnique.mockResolvedValueOnce({ id: adminId, role: 'admin' });
      mockPrisma.user.findMany.mockResolvedValueOnce([]);

      const caller = adminRouter.createCaller(ctx);
      await caller.listUsers();

      expect(mockPrisma.user.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          orderBy: { createdAt: 'desc' },
        })
      );
    });
  });

  describe('approveUser', () => {
    it('should require admin role', async () => {
      const adminId = 'admin-123';
      const userId = 'user-456';
      const ctx = createMockContext(adminId, 'regular');

      mockPrisma.user.findUnique.mockResolvedValueOnce({ id: adminId, role: 'regular' });

      const caller = adminRouter.createCaller(ctx);

      try {
        await caller.approveUser({ userId });
        expect(true).toBe(false); // Should throw
      } catch (error) {
        expect(error).toBeInstanceOf(TRPCError);
        expect((error as TRPCError).code).toBe('FORBIDDEN');
      }
    });

    it('should set approved=true and approvedBy=adminId', async () => {
      const adminId = 'admin-123';
      const userId = 'user-456';
      const ctx = createMockContext(adminId);
      const updatedUser = { id: userId, email: 'user@example.com', approved: true, role: 'regular' };

      mockPrisma.user.findUnique
        .mockResolvedValueOnce({ id: adminId, role: 'admin' }) // First call for admin check
        .mockResolvedValueOnce({ id: userId }); // Second call to check user exists
      mockPrisma.user.update.mockResolvedValueOnce(updatedUser);

      const caller = adminRouter.createCaller(ctx);
      const result = await caller.approveUser({ userId });

      expect(result).toEqual(updatedUser);
      expect(mockPrisma.user.update).toHaveBeenCalledWith({
        where: { id: userId },
        data: {
          approved: true,
          approvedBy: adminId,
        },
        select: {
          id: true,
          email: true,
          approved: true,
          role: true,
        },
      });
    });

    it('should return updated user data', async () => {
      const adminId = 'admin-123';
      const userId = 'user-456';
      const ctx = createMockContext(adminId);
      const updatedUser = {
        id: userId,
        email: 'user@example.com',
        approved: true,
        role: 'regular',
      };

      mockPrisma.user.findUnique
        .mockResolvedValueOnce({ id: adminId, role: 'admin' })
        .mockResolvedValueOnce({ id: userId });
      mockPrisma.user.update.mockResolvedValueOnce(updatedUser);

      const caller = adminRouter.createCaller(ctx);
      const result = await caller.approveUser({ userId });

      expect(result).toHaveProperty('id');
      expect(result).toHaveProperty('email');
      expect(result).toHaveProperty('approved');
      expect(result).toHaveProperty('role');
    });

    it('should fail if user not found', async () => {
      const adminId = 'admin-123';
      const userId = 'non-existent-user';
      const ctx = createMockContext(adminId);

      mockPrisma.user.findUnique
        .mockResolvedValueOnce({ id: adminId, role: 'admin' })
        .mockResolvedValueOnce(null); // User not found

      const caller = adminRouter.createCaller(ctx);

      try {
        await caller.approveUser({ userId });
        expect(true).toBe(false); // Should throw
      } catch (error) {
        expect(error).toBeInstanceOf(TRPCError);
        expect((error as TRPCError).code).toBe('NOT_FOUND');
      }
    });
  });

  describe('disableUser', () => {
    it('should require admin role', async () => {
      const adminId = 'admin-123';
      const userId = 'user-456';
      const ctx = createMockContext(adminId, 'regular');

      mockPrisma.user.findUnique.mockResolvedValueOnce({ id: adminId, role: 'regular' });

      const caller = adminRouter.createCaller(ctx);

      try {
        await caller.disableUser({ userId });
        expect(true).toBe(false); // Should throw
      } catch (error) {
        expect(error).toBeInstanceOf(TRPCError);
        expect((error as TRPCError).code).toBe('FORBIDDEN');
      }
    });

    it('should set approved=false', async () => {
      const adminId = 'admin-123';
      const userId = 'user-456';
      const ctx = createMockContext(adminId);
      const updatedUser = { id: userId, email: 'user@example.com', approved: false, role: 'regular' };

      mockPrisma.user.findUnique
        .mockResolvedValueOnce({ id: adminId, role: 'admin' })
        .mockResolvedValueOnce({ id: userId });
      mockPrisma.user.update.mockResolvedValueOnce(updatedUser);

      const caller = adminRouter.createCaller(ctx);
      const result = await caller.disableUser({ userId });

      expect(result.approved).toBe(false);
      expect(mockPrisma.user.update).toHaveBeenCalledWith(
        expect.objectContaining({
          data: { approved: false },
        })
      );
    });

    it('should fail if user not found', async () => {
      const adminId = 'admin-123';
      const userId = 'non-existent-user';
      const ctx = createMockContext(adminId);

      mockPrisma.user.findUnique
        .mockResolvedValueOnce({ id: adminId, role: 'admin' })
        .mockResolvedValueOnce(null);

      const caller = adminRouter.createCaller(ctx);

      try {
        await caller.disableUser({ userId });
        expect(true).toBe(false); // Should throw
      } catch (error) {
        expect(error).toBeInstanceOf(TRPCError);
        expect((error as TRPCError).code).toBe('NOT_FOUND');
      }
    });
  });

  describe('rejectUser', () => {
    it('should require admin role', async () => {
      const adminId = 'admin-123';
      const userId = 'user-456';
      const ctx = createMockContext(adminId, 'regular');

      mockPrisma.user.findUnique.mockResolvedValueOnce({ id: adminId, role: 'regular' });

      const caller = adminRouter.createCaller(ctx);

      try {
        await caller.rejectUser({ userId });
        expect(true).toBe(false); // Should throw
      } catch (error) {
        expect(error).toBeInstanceOf(TRPCError);
        expect((error as TRPCError).code).toBe('FORBIDDEN');
      }
    });

    it('should delete the user', async () => {
      const adminId = 'admin-123';
      const userId = 'user-456';
      const ctx = createMockContext(adminId);

      mockPrisma.user.findUnique
        .mockResolvedValueOnce({ id: adminId, role: 'admin' })
        .mockResolvedValueOnce({ id: userId });
      mockPrisma.user.delete.mockResolvedValueOnce({ id: userId });

      const caller = adminRouter.createCaller(ctx);
      const result = await caller.rejectUser({ userId });

      expect(result.success).toBe(true);
      expect(mockPrisma.user.delete).toHaveBeenCalledWith({
        where: { id: userId },
      });
    });
  });

  describe('enableUser', () => {
    it('should require admin role', async () => {
      const adminId = 'admin-123';
      const userId = 'user-456';
      const ctx = createMockContext(adminId, 'regular');

      mockPrisma.user.findUnique.mockResolvedValueOnce({ id: adminId, role: 'regular' });

      const caller = adminRouter.createCaller(ctx);

      try {
        await caller.enableUser({ userId });
        expect(true).toBe(false); // Should throw
      } catch (error) {
        expect(error).toBeInstanceOf(TRPCError);
        expect((error as TRPCError).code).toBe('FORBIDDEN');
      }
    });

    it('should set approved=true', async () => {
      const adminId = 'admin-123';
      const userId = 'user-456';
      const ctx = createMockContext(adminId);
      const updatedUser = { id: userId, email: 'user@example.com', approved: true, role: 'regular' };

      mockPrisma.user.findUnique
        .mockResolvedValueOnce({ id: adminId, role: 'admin' })
        .mockResolvedValueOnce({ id: userId });
      mockPrisma.user.update.mockResolvedValueOnce(updatedUser);

      const caller = adminRouter.createCaller(ctx);
      const result = await caller.enableUser({ userId });

      expect(result.approved).toBe(true);
    });
  });
});
