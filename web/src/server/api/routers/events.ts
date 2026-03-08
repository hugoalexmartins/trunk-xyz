import { createTRPCRouter, protectedProcedure } from "../trpc";
import type { Prisma } from "@prisma/client";
import { z } from "zod";
import {
  CreateEventInput,
  UpdateEventInput,
  ListEventsInput,
} from "@/web/schemas/events";

export const eventsRouter = createTRPCRouter({
  // CRUD operations
  create: protectedProcedure
    .input(CreateEventInput)
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.event.create({
        data: {
          type: input.type,
          title: input.title,
          description: input.description || null,
          pipelineId: input.pipelineId || null,
          status: input.status,
          metadata: input.metadata as Prisma.InputJsonValue,
          createdById: ctx.user.sub,
        },
        include: {
          creator: {
            select: {
              id: true,
              email: true,
            },
          },
        },
      });
    }),

  getById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.prisma.event.findUnique({
        where: { id: input.id },
        include: {
          creator: {
            select: {
              id: true,
              email: true,
            },
          },
        },
      });
    }),

  update: protectedProcedure
    .input(UpdateEventInput)
    .mutation(async ({ ctx, input }) => {
      const { id, ...updateData } = input;
      const data: Prisma.EventUpdateInput = {};
      if (updateData.type !== undefined) data.type = updateData.type;
      if (updateData.title !== undefined) data.title = updateData.title;
      if (updateData.description !== undefined)
        data.description = updateData.description;
      if (updateData.pipelineId !== undefined)
        data.pipelineId = updateData.pipelineId;
      if (updateData.status !== undefined) data.status = updateData.status;
      if (updateData.metadata !== undefined)
        data.metadata = updateData.metadata as Prisma.InputJsonValue;

      return ctx.prisma.event.update({
        where: { id },
        data,
        include: {
          creator: {
            select: {
              id: true,
              email: true,
            },
          },
        },
      });
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.event.delete({
        where: { id: input.id },
      });
    }),

  // List operations
  listByPipeline: protectedProcedure
    .input(
      z.object({
        pipelineId: z.string().uuid(),
        cursor: z.string().optional(),
        limit: z.number().int().positive().max(100).default(20),
      }),
    )
    .query(async ({ ctx, input }) => {
      const events = await ctx.prisma.event.findMany({
        where: { pipelineId: input.pipelineId },
        orderBy: { createdAt: "desc" },
        take: input.limit + 1,
        cursor: input.cursor ? { id: input.cursor } : undefined,
        skip: input.cursor ? 1 : undefined,
        include: {
          creator: {
            select: {
              id: true,
              email: true,
            },
          },
        },
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

  listAll: protectedProcedure
    .input(ListEventsInput)
    .query(async ({ ctx, input }) => {
      const events = await ctx.prisma.event.findMany({
        skip: input.skip ? 1 : undefined,
        take: input.take,
        orderBy: { [input.sortBy]: input.sortOrder },
        where: {},
        include: {
          creator: {
            select: {
              id: true,
              email: true,
            },
          },
        },
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

  count: protectedProcedure
    .input(z.object({ pipelineId: z.string().uuid().optional() }))
    .query(async ({ ctx, input }) => {
      return ctx.prisma.event.count({
        where: input.pipelineId ? { pipelineId: input.pipelineId } : undefined,
      });
    }),
});
