import * as trpcNext from '@trpc/server/adapters/next';
import { appRouter } from '@/server/api/root';
import { prisma } from '@/server/api/trpc';

// export API handler
export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: () => ({
    prisma,
  }),
});
