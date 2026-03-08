import { z } from "zod/v4";
import { removeEmptyEnvVariables } from "./utils/environment";

const EnvSchema = z.object({
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
  NEXTAUTH_URL: z.string().url().optional(),
  TRUNKXYZ_LOG_FORMAT: z.enum(["text", "json"]).default("json"),
  TRUNKXYZ_LOG_LEVEL: z
    .enum(["error", "warn", "info", "http", "debug"])
    .default("info"),
  REDIS_HOST: z.string().nullish(),
  REDIS_PORT: z.coerce
    .number() // .env files convert numbers to strings, therefore we have to enforce them to be numbers
    .positive()
    .max(65536, `options.port should be >= 0 and < 65536`)
    .default(6379)
    .nullable(),
  REDIS_AUTH: z.string().nullish(),
  REDIS_USERNAME: z.string().nullish(),
  REDIS_CONNECTION_STRING: z.string().nullish(),
  REDIS_KEY_PREFIX: z.string().nullish(),
  REDIS_TLS_ENABLED: z.enum(["true", "false"]).default("false"),
  REDIS_TLS_CA_PATH: z.string().optional(),
  REDIS_TLS_CERT_PATH: z.string().optional(),
  REDIS_TLS_KEY_PATH: z.string().optional(),
  REDIS_TLS_SERVERNAME: z.string().optional(),
  REDIS_TLS_REJECT_UNAUTHORIZED: z.enum(["true", "false"]).optional(),
  REDIS_TLS_CHECK_SERVER_IDENTITY: z.enum(["true", "false"]).optional(),
  REDIS_TLS_SECURE_PROTOCOL: z.string().optional(),
  REDIS_TLS_CIPHERS: z.string().optional(),
  REDIS_TLS_HONOR_CIPHER_ORDER: z.enum(["true", "false"]).optional(),
  REDIS_TLS_KEY_PASSPHRASE: z.string().optional(),
  REDIS_ENABLE_AUTO_PIPELINING: z.enum(["true", "false"]).default("true"),
});

export type SharedEnv = z.infer<typeof EnvSchema>;

export const env: SharedEnv =
  process.env.DOCKER_BUILD === "1" // eslint-disable-line turbo/no-undeclared-env-vars
    ? (process.env as any)
    : EnvSchema.parse(removeEmptyEnvVariables(process.env));
