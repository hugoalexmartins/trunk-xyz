import path from 'node:path'
import { defineConfig } from 'prisma/config'

export default defineConfig({
  earlyAccess: true,
  schema: path.join(import.meta.dirname, 'prisma/schema.prisma'),
  migrations: {
    seed: 'node --loader ts-node/esm prisma/seed.ts',
  },
})
