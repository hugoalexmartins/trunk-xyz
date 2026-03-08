import { z } from "zod";

// Email that works for signup and login
const EMAIL_SCHEMA = z
  .string()
  .email("Invalid email address")
  .max(255, "Email must be less than 255 characters")
  .transform((val) => val.toLowerCase().trim());

const newLocal = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/;
// Strong password (12 chars, uppercase, number, special char)
const PASSWORD_SCHEMA = z
  .string()
  .min(12, "Password must be at least 12 characters")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[0-9]/, "Password must contain at least one number")
  .regex(
    newLocal,
    "Password must contain at least one special character (!@#$%^&*etc)",
  );

// User signup
export const signupInputSchema = z.object({
  email: EMAIL_SCHEMA,
  password: PASSWORD_SCHEMA,
});

export type SignupInput = z.infer<typeof signupInputSchema>;

// User login
export const loginInputSchema = z.object({
  email: EMAIL_SCHEMA,
  password: z.string().min(1, "Password is required"),
});

export type LoginInput = z.infer<typeof loginInputSchema>;

// Change password (optional, include if you have this endpoint)
export const changePasswordInputSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: PASSWORD_SCHEMA,
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type ChangePasswordInput = z.infer<typeof changePasswordInputSchema>;
