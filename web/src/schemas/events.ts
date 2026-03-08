import { z } from "zod";
import { EventType, EventStatus } from "@prisma/client";

export const createEventInputSchema = z.object({
  type: z.nativeEnum(EventType),
  title: z
    .string()
    .min(1, "Title is required")
    .max(255, "Title must be less than 255 characters")
    .trim(),

  description: z
    .string()
    .max(5000, "Description must be less than 5000 characters")
    .optional(),

  pipelineId: z.string().uuid("Invalid pipeline ID").optional(),
  status: z.nativeEnum(EventStatus).optional().default(EventStatus.PENDING),
  metadata: z.record(z.string(), z.any()).optional(),
});

export type CreateEventInput = z.infer<typeof createEventInputSchema>;

export const updateEventInputSchema = z.object({
  id: z.string().uuid("Invalid event ID"),

  type: z.nativeEnum(EventType).optional(),
  title: z
    .string()
    .min(1, "Title is required")
    .max(255, "Title must be less than 255 characters")
    .optional(),

  description: z
    .string()
    .max(5000, "Description must be less than 5000 characters")
    .optional(),

  pipelineId: z.string().uuid("Invalid pipeline ID").optional(),
  status: z.nativeEnum(EventStatus).optional(),
  metadata: z.record(z.string(), z.any()).optional(),
});

export type UpdateEventInput = z.infer<typeof updateEventInputSchema>;

export const listEventsInputSchema = z.object({
  skip: z.number().int().min(0).default(0),
  take: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(["date", "createdAt"]).default("createdAt"),
  sortOrder: z.enum(["asc", "desc"]).default("desc"),
  limit: z.number().int().positive().max(100).default(20),
  type: z.nativeEnum(EventType).optional(),
  status: z.nativeEnum(EventStatus).optional(),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
  pipelineId: z.string().uuid().optional(),
  search: z.string().optional(),
  cursor: z.string().optional(),
});

export type ListEventsInput = z.infer<typeof listEventsInputSchema>;
