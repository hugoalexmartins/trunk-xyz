import { z } from "zod";

// Admin action input - approve/reject/disable/enable user
export const userActionInputSchema = z.object({
  userId: z.string().min(1, "User ID is required"),
});

export type UserActionInput = z.infer<typeof userActionInputSchema>;
