import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  DATABASE_URL: z.string().url().optional(),
  BUILD_ID: z.string().optional(),
  NEXTAUTH_SECRET: z.string().optional(),
  NEXTAUTH_URL: z.string().url().optional(),
  NEXT_PUBLIC_BASE_PATH: z.string().default(""),
  NEXT_PUBLIC_LANGFUSE_CLOUD_REGION: z.string().optional(),
  LANGFUSE_CSP_ENFORCE_HTTPS: z.enum(["true", "false"]).optional(),
  SENTRY_CSP_REPORT_URI: z.string().optional(),
  SENTRY_AUTH_TOKEN: z.string().optional(),
});

const processEnv = {
  NODE_ENV: process.env.NODE_ENV,
  DATABASE_URL: process.env.DATABASE_URL,
  BUILD_ID: process.env.BUILD_ID,
  NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  NEXT_PUBLIC_BASE_PATH: process.env.NEXT_PUBLIC_BASE_PATH,
  NEXT_PUBLIC_LANGFUSE_CLOUD_REGION: process.env.NEXT_PUBLIC_LANGFUSE_CLOUD_REGION,
  LANGFUSE_CSP_ENFORCE_HTTPS: process.env.LANGFUSE_CSP_ENFORCE_HTTPS,
  SENTRY_CSP_REPORT_URI: process.env.SENTRY_CSP_REPORT_URI,
  SENTRY_AUTH_TOKEN: process.env.SENTRY_AUTH_TOKEN,
};

// Validate and parse environment variables
const validated = envSchema.parse(processEnv);

export const env = validated;
