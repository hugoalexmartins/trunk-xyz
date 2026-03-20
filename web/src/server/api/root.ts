import { createTRPCRouter } from './trpc';
import { eventsRouter } from './routers/events';
import { authRouter } from './routers/auth';
import { adminRouter } from './routers/admin';
import { applicationsRouter } from './routers/applications';

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  auth: authRouter,
  events: eventsRouter,
  admin: adminRouter,
  applications: applicationsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
