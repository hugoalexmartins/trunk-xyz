import { describe, it, expect, beforeEach } from '@jest/globals';
import { TRPCError } from '@trpc/server';
import { applicationsRouter } from '../applications';
import type { Context } from '../../trpc';

const mockPrisma = {
  event: {
    findFirst: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    $transaction: jest.fn(),
  },
  $transaction: jest.fn(),
};

const createMockContext = (userId: string): Context => ({
  user: {
    sub: userId,
    email: `user-${userId}@example.com`,
  },
  prisma: mockPrisma as any,
});

describe('Applications Router', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('hasAny', () => {
    it('returns false when user has no APPLICATION events', async () => {
      const ctx = createMockContext('user-1');
      mockPrisma.event.findFirst.mockResolvedValueOnce(null);

      const result = await applicationsRouter.createCaller(ctx).hasAny();

      expect(result).toBe(false);
      expect(mockPrisma.event.findFirst).toHaveBeenCalledWith({
        where: { type: 'APPLICATION', createdById: 'user-1' },
        select: { id: true },
      });
    });

    it('returns true when user has at least one APPLICATION event', async () => {
      const ctx = createMockContext('user-1');
      mockPrisma.event.findFirst.mockResolvedValueOnce({ id: 'event-1' });

      const result = await applicationsRouter.createCaller(ctx).hasAny();

      expect(result).toBe(true);
    });
  });

  describe('create', () => {
    it('auto-generates title as "position @ company"', async () => {
      const ctx = createMockContext('user-1');
      const createdEvent = { id: 'event-1', pipelineId: null };
      const updatedEvent = { id: 'event-1', pipelineId: 'event-1' };

      mockPrisma.$transaction.mockImplementation(async (fn: (tx: any) => Promise<any>) => {
        const tx = {
          event: {
            create: jest.fn().mockResolvedValueOnce(createdEvent),
            update: jest.fn().mockResolvedValueOnce(updatedEvent),
          },
        };
        return fn(tx);
      });

      const result = await applicationsRouter.createCaller(ctx).create({
        position: 'Software Engineer',
        company: 'Acme Corp',
      });

      expect(result).toEqual(updatedEvent);

      // Verify title was auto-generated
      const txFn = mockPrisma.$transaction.mock.calls[0][0];
      const tx = {
        event: {
          create: jest.fn().mockResolvedValueOnce(createdEvent),
          update: jest.fn().mockResolvedValueOnce(updatedEvent),
        },
      };
      await txFn(tx);
      expect(tx.event.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            title: 'Software Engineer @ Acme Corp',
          }),
        })
      );
    });

    it('sets pipelineId to the event own id via transaction update', async () => {
      const ctx = createMockContext('user-2');
      const createdEvent = { id: 'event-abc', pipelineId: null };
      const updatedEvent = { id: 'event-abc', pipelineId: 'event-abc' };

      mockPrisma.$transaction.mockImplementation(async (fn: (tx: any) => Promise<any>) => {
        const tx = {
          event: {
            create: jest.fn().mockResolvedValueOnce(createdEvent),
            update: jest.fn().mockResolvedValueOnce(updatedEvent),
          },
        };
        return fn(tx);
      });

      const result = await applicationsRouter.createCaller(ctx).create({
        position: 'PM',
        company: 'BigCo',
      });

      expect(result.pipelineId).toBe('event-abc');
    });

    it('throws validation error when position is missing', async () => {
      const ctx = createMockContext('user-1');

      try {
        await applicationsRouter.createCaller(ctx).create({
          position: '',
          company: 'Acme',
        });
        expect(true).toBe(false); // Should throw
      } catch (error) {
        expect(error).toBeInstanceOf(TRPCError);
      }
    });

    it('throws validation error when company is missing', async () => {
      const ctx = createMockContext('user-1');

      try {
        await applicationsRouter.createCaller(ctx).create({
          position: 'Engineer',
          company: '',
        });
        expect(true).toBe(false); // Should throw
      } catch (error) {
        expect(error).toBeInstanceOf(TRPCError);
      }
    });

    it('requires authentication', async () => {
      const ctx: Context = {
        user: null,
        prisma: mockPrisma as any,
      };

      try {
        await applicationsRouter.createCaller(ctx).create({
          position: 'Engineer',
          company: 'Acme',
        });
        expect(true).toBe(false);
      } catch (error) {
        expect(error).toBeInstanceOf(TRPCError);
        expect((error as TRPCError).code).toBe('UNAUTHORIZED');
      }
    });
  });
});
