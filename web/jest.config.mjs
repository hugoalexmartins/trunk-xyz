// jest.config.mjs
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

const clientTestConfig = {
  displayName: "client",
  testMatch: ["/**/*.clienttest.[jt]s?(x)"],
  testEnvironment: "jest-environment-jsdom",
  testEnvironmentOptions: { globalsCleanup: "on" },
};

const asyncServerTestConfig = {
  displayName: "async-server",
  testMatch: [
    "/**/__tests__/**/*.[jt]s?(x)",
    "/**/*.test.[jt]s?(x)",
    "/**/*.spec.[jt]s?(x)",
  ],
  testPathIgnorePatterns: ["/.next/", "/node_modules/", ".*\\.clienttest\\."],
  testEnvironment: "node",
};

// To avoid the "Cannot use import statement outside a module" errors while transforming ESM.
// jsonpath-plus is needed because /shared barrel exports evals/utilities which imports it
const esModules = ["superjson", "jsonpath-plus"];

// Add any custom config to be passed to Jest
export default async () => {
  /** @type {import('jest').Config} */
  const config = {
    // Ignore .next/standalone to avoid "Haste module naming collision" warning
    modulePathIgnorePatterns: ["<rootDir>/.next/"],
    // Jest 30 performance: recycle workers when memory exceeds limit
    workerIdleMemoryLimit: "512MB",
    // Add more setup options before each test is run
    projects: [
      {
        ...(await createJestConfig(clientTestConfig)()),
        // Added transformIgnorePatterns to client tests to handle ESM dependencies from /shared
        // Without this, importing from @langfuse/shared fails with "Unexpected token 'export'" errors
        transformIgnorePatterns: [
          `/web/node_modules/(?!(${esModules.join("|")})/)`,
        ],
      },
      {
        ...(await createJestConfig(asyncServerTestConfig)()),
        transformIgnorePatterns: [
          `/web/node_modules/(?!(${esModules.join("|")})/)`,
        ],
        moduleNameMapper: {
          "^@/server/(.*)$": "<rootDir>/src/server/$1",
          "^@/hooks/(.*)$": "<rootDir>/src/hooks/$1",
          "^@/utils/(.*)$": "<rootDir>/src/utils/$1",
          "^@/features/(.*)$": "<rootDir>/src/features/$1",
          "^@/components/(.*)$": "<rootDir>/src/components/$1",
          "^@/contexts/(.*)$": "<rootDir>/src/contexts/$1",
          "^@/pages/(.*)$": "<rootDir>/src/pages/$1",
          "^@/src/(.*)$": "<rootDir>/src/$1",
        },
      },
    ],
  };
  return config;
};
