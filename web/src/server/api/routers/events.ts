import { z } from 'zod';
import { createTRPCRouter, publicProcedure } from '../trpc';
import type { Prisma } from '@prisma/client';
import { EventType, EventStatus } from '@prisma/client';

// Zod schemas for validation
const eventMetadataSchema = z.any().optional();

const createEventSchema = z.object({
  type: z.nativeEnum(EventType),
  title: z.string().min(1).max(255),
  description: z.string().max(1000).optional(),
  pipelineId: z.string().uuid().optional(),
  status: z.nativeEnum(EventStatus).optional().default(EventStatus.PENDING),
  metadata: eventMetadataSchema,
});

const updateEventSchema = z.object({
  title: z.string().min(1).max(255).optional(),
  description: z.string().max(1000).optional(),
  status: z.nativeEnum(EventStatus).optional(),
  metadata: eventMetadataSchema,
});

const listEventsFilterSchema = z.object({
  type: z.nativeEnum(EventType).optional(),
  status: z.nativeEnum(EventStatus).optional(),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
  pipelineId: z.string().uuid().optional(),
  search: z.string().optional(),
  cursor: z.string().optional(),
  limit: z.number().int().positive().max(100).default(20),
});

export const eventsRouter = createTRPCRouter({
  // CRUD operations
  create: publicProcedure
    .input(createEventSchema)
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.event.create({
        data: {
          type: input.type,
          title: input.title,
          description: input.description || null,
          pipelineId: input.pipelineId || null,
          status: input.status,
          metadata: input.metadata as Prisma.InputJsonValue,
        },
      });
    }),

  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.prisma.event.findUnique({
        where: { id: input.id },
      });
    }),

  update: publicProcedure
    .input(z.object({ id: z.string(), data: updateEventSchema }))
    .mutation(async ({ ctx, input }) => {
      const updateData: Prisma.EventUpdateInput = {};
      if (input.data.title !== undefined) updateData.title = input.data.title;
      if (input.data.description !== undefined) updateData.description = input.data.description;
      if (input.data.status !== undefined) updateData.status = input.data.status;
      if (input.data.metadata !== undefined) updateData.metadata = input.data.metadata as Prisma.InputJsonValue;

      return ctx.prisma.event.update({
        where: { id: input.id },
        data: updateData,
      });
    }),

  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.event.delete({
        where: { id: input.id },
      });
    }),

  // List operations
  listByPipeline: publicProcedure
    .input(
      z.object({
        pipelineId: z.string().uuid(),
        cursor: z.string().optional(),
        limit: z.number().int().positive().max(100).default(20),
      })
    )
    .query(async ({ ctx, input }) => {
      const events = await ctx.prisma.event.findMany({
        where: { pipelineId: input.pipelineId },
        orderBy: { createdAt: 'desc' },
        take: input.limit + 1,
        cursor: input.cursor ? { id: input.cursor } : undefined,
        skip: input.cursor ? 1 : undefined,
      });

      let nextCursor: string | undefined = undefined;
      if (events.length > input.limit) {
        nextCursor = events.pop()?.id;
      }

      return {
        events,
        nextCursor,
      };
    }),

  listAll: publicProcedure
    .input(listEventsFilterSchema)
    .query(async ({ ctx, input }) => {
      const where: Prisma.EventWhereInput = {};

      if (input.type) where.type = input.type;
      if (input.status) where.status = input.status;
      if (input.pipelineId) where.pipelineId = input.pipelineId;

      if (input.startDate || input.endDate) {
        where.createdAt = {};
        if (input.startDate) {
          where.createdAt.gte = input.startDate;
        }
        if (input.endDate) {
          where.createdAt.lte = input.endDate;
        }
      }

      if (input.search) {
        where.OR = [
          { title: { contains: input.search, mode: 'insensitive' } },
          { description: { contains: input.search, mode: 'insensitive' } },
        ];
      }

      const events = await ctx.prisma.event.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        take: input.limit + 1,
        cursor: input.cursor ? { id: input.cursor } : undefined,
        skip: input.cursor ? 1 : undefined,
      });

      let nextCursor: string | undefined = undefined;
      if (events.length > input.limit) {
        nextCursor = events.pop()?.id;
      }

      return {
        events,
        nextCursor,
      };
    }),

  count: publicProcedure
    .input(z.object({ pipelineId: z.string().uuid().optional() }))
    .query(async ({ ctx, input }) => {
      return ctx.prisma.event.count({
        where: input.pipelineId ? { pipelineId: input.pipelineId } : undefined,
      });
    }),
});
