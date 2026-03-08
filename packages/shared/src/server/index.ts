// Re-export Prisma client for use across the monorepo
export { PrismaClient } from "@prisma/client";
export type { Prisma } from "@prisma/client";

// Re-export Event model and enums
export type { Event } from "@prisma/client";
export { EventType, EventStatus } from "@prisma/client";

export * from "./logger";
export * from "./env";
// Add additional shared exports here as needed
