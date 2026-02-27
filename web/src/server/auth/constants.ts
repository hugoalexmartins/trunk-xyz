export const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-in-production";
export const JWT_EXPIRY = "24h";
export const PASSWORD_MIN_LENGTH = 8;
export const COOKIE_NAME = "auth_token";

export const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict" as const,
  maxAge: 24 * 60 * 60 * 1000, // 24 hours in milliseconds
};

export function validatePassword(password: string): {
  valid: boolean;
  error?: string;
} {
  if (password.length < PASSWORD_MIN_LENGTH) {
    return {
      valid: false,
      error: `Password must be at least ${PASSWORD_MIN_LENGTH} characters`,
    };
  }
  return { valid: true };
}
