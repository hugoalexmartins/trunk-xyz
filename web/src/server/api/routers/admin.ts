import { createTRPCRouter, protectedProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

const userActionInputSchema = z.object({
  userId: z.string().min(1, "User ID is required"),
});

const checkAdminRole = async (prisma: any, userId: string) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { role: true },
  });
  return user?.role === "admin";
};

export const adminRouter = createTRPCRouter({
  listUsers: protectedProcedure.query(async ({ ctx }) => {
    // Check if user is admin
    const isAdmin = await checkAdminRole(ctx.prisma, ctx.user!.sub);
    if (!isAdmin) {
      throw new TRPCError({
        code: "FORBIDDEN",
        message: "Only admins can view user list",
      });
    }

    const users = await ctx.prisma.user.findMany({
      select: {
        id: true,
        email: true,
        approved: true,
        role: true,
        createdAt: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return users;
  }),

  approveUser: protectedProcedure
    .input(userActionInputSchema)
    .mutation(async ({ ctx, input }) => {
      // Check if user is admin
      const isAdmin = await checkAdminRole(ctx.prisma, ctx.user!.sub);
      if (!isAdmin) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "Only admins can approve users",
        });
      }

      const user = await ctx.prisma.user.findUnique({
        where: { id: input.userId },
      });

      if (!user) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "User not found",
        });
      }

      const updatedUser = await ctx.prisma.user.update({
        where: { id: input.userId },
        data: {
          approved: true,
          approvedBy: ctx.user.sub,
        },
        select: {
          id: true,
          email: true,
          approved: true,
          role: true,
        },
      });

      return updatedUser;
    }),

  rejectUser: protectedProcedure
    .input(userActionInputSchema)
    .mutation(async ({ ctx, input }) => {
      // Check if user is admin
      const isAdmin = await checkAdminRole(ctx.prisma, ctx.user!.sub);
      if (!isAdmin) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "Only admins can reject users",
        });
      }

      const user = await ctx.prisma.user.findUnique({
        where: { id: input.userId },
      });

      if (!user) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "User not found",
        });
      }

      // Delete the user
      await ctx.prisma.user.delete({
        where: { id: input.userId },
      });

      return { success: true, message: "User rejected and removed" };
    }),

  disableUser: protectedProcedure
    .input(userActionInputSchema)
    .mutation(async ({ ctx, input }) => {
      // Check if user is admin
      const isAdmin = await checkAdminRole(ctx.prisma, ctx.user!.sub);
      if (!isAdmin) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "Only admins can disable users",
        });
      }

      const user = await ctx.prisma.user.findUnique({
        where: { id: input.userId },
      });

      if (!user) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "User not found",
        });
      }

      const updatedUser = await ctx.prisma.user.update({
        where: { id: input.userId },
        data: { approved: false },
        select: {
          id: true,
          email: true,
          approved: true,
          role: true,
        },
      });

      return updatedUser;
    }),

  enableUser: protectedProcedure
    .input(userActionInputSchema)
    .mutation(async ({ ctx, input }) => {
      // Check if user is admin
      const isAdmin = await checkAdminRole(ctx.prisma, ctx.user!.sub);
      if (!isAdmin) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "Only admins can enable users",
        });
      }

      const user = await ctx.prisma.user.findUnique({
        where: { id: input.userId },
      });

      if (!user) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "User not found",
        });
      }

      const updatedUser = await ctx.prisma.user.update({
        where: { id: input.userId },
        data: { approved: true },
        select: {
          id: true,
          email: true,
          approved: true,
          role: true,
        },
      });

      return updatedUser;
    }),
});
