import { z } from 'zod';
import { createTRPCRouter, publicProcedure, protectedProcedure } from '../trpc';
import { hashPassword, verifyPassword } from '@/server/auth/hash';
import { createToken } from '@/server/auth/jwt';
import { validatePassword, COOKIE_NAME, COOKIE_OPTIONS } from '@/server/auth/constants';
import { TRPCError } from '@trpc/server';

const emailSchema = z.string().email();
const passwordSchema = z.string();

export const authRouter = createTRPCRouter({
  signup: publicProcedure
    .input(
      z.object({
        email: emailSchema,
        password: passwordSchema,
      })
    )
    .mutation(async ({ ctx, input }) => {
      // Validate password
      const passwordValidation = validatePassword(input.password);
      if (!passwordValidation.valid) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: passwordValidation.error,
        });
      }

      // Check if user already exists
      const existingUser = await ctx.prisma.user.findUnique({
        where: { email: input.email },
      });

      if (existingUser) {
        throw new TRPCError({
          code: 'CONFLICT',
          message: 'User with this email already exists',
        });
      }

      // Hash password and create user
      const passwordHash = await hashPassword(input.password);
      await ctx.prisma.user.create({
        data: {
          email: input.email,
          passwordHash,
          isApproved: true, // Auto-approve for Phase 1
        },
      });

      return {
        message: 'User created successfully. Please log in.',
      };
    }),

  login: publicProcedure
    .input(
      z.object({
        email: emailSchema,
        password: passwordSchema,
      })
    )
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.findUnique({
        where: { email: input.email },
      });

      if (!user) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'Invalid credentials',
        });
      }

      // Verify password
      const validPassword = await verifyPassword(input.password, user.passwordHash);
      if (!validPassword) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'Invalid credentials',
        });
      }

      // Generate JWT and set cookie
      const token = createToken(user.id, user.email);

      if (ctx.res) {
        ctx.res.setHeader(
          'Set-Cookie',
          `${COOKIE_NAME}=${token}; Path=/; Max-Age=${COOKIE_OPTIONS.maxAge}; HttpOnly${COOKIE_OPTIONS.secure ? '; Secure' : ''}; SameSite=Strict`
        );
      }

      return {
        id: user.id,
        email: user.email,
      };
    }),

  logout: protectedProcedure.mutation(async ({ ctx }) => {
    if (ctx.res) {
      ctx.res.setHeader(
        'Set-Cookie',
        `${COOKIE_NAME}=; Path=/; Max-Age=0; HttpOnly; SameSite=Strict`
      );
    }

    return { message: 'Logged out successfully' };
  }),

  getCurrentUser: protectedProcedure.query(async ({ ctx }) => {
    const user = await ctx.prisma.user.findUnique({
      where: { id: ctx.user!.sub },
      select: {
        id: true,
        email: true,
        createdAt: true,
      },
    });

    return user;
  }),
});
