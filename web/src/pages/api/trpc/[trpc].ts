import * as trpcNext from '@trpc/server/adapters/next';
import { appRouter } from '@/server/api/root';
import { prisma } from '@/server/api/trpc';
import { extractTokenFromCookie } from '@/server/auth/middleware';
import { verifyToken } from '@/server/auth/jwt';

// export API handler
export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: ({ req, res }) => {
    const token = extractTokenFromCookie(req);
    const user = token ? verifyToken(token) : undefined;

    return {
      prisma,
      user,
      req,
      res,
    };
  },
});
