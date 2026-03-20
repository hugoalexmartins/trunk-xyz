import { createTRPCRouter, protectedProcedure } from '../trpc';
import { z } from 'zod';

export const applicationsRouter = createTRPCRouter({
  hasAny: protectedProcedure.query(async ({ ctx }) => {
    const event = await ctx.prisma.event.findFirst({
      where: {
        type: 'APPLICATION',
        createdById: ctx.user.sub,
      },
      select: { id: true },
    });
    return event !== null;
  }),

  create: protectedProcedure
    .input(
      z.object({
        position: z.string().min(1),
        company: z.string().min(1),
        jobUrl: z.string().url().optional(),
        jobUrlFile: z.string().optional(),
        date: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const title = `${input.position} @ ${input.company}`;
      const date = input.date ? new Date(input.date) : new Date();

      const event = await ctx.prisma.$transaction(async (tx) => {
        const created = await tx.event.create({
          data: {
            type: 'APPLICATION',
            status: 'PENDING',
            title,
            date,
            createdById: ctx.user.sub,
            metadata: {
              position: input.position,
              company: input.company,
              jobUrl: input.jobUrl ?? null,
              jobUrlFile: input.jobUrlFile ?? null,
            },
          },
        });

        const updated = await tx.event.update({
          where: { id: created.id },
          data: { pipelineId: created.id },
        });

        return updated;
      });

      return event;
    }),
});
