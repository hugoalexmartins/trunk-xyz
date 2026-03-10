/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.mjs");
import { env } from "./src/env.mjs";

/**
 * CSP headers
 * img-src https to allow loading images from SSO providers
 */
const cspHeader = ``;

const reportToHeader = {
  key: "Report-To",
  value: JSON.stringify({
    group: "csp-endpoint",
    max_age: 10886400,
    endpoints: [],
    include_subdomains: true,
  }),
};

/** @type {import("next").NextConfig} */
const nextConfig = {
  // Allow building to alternate directory for parallel build checks while dev server runs
  distDir: process.env.NEXT_DIST_DIR || ".next",
  staticPageGenerationTimeout: 500, // default is 60. Required for build process for amd
  transpilePackages: ["@repo/shared"],
  reactStrictMode: true,
  serverExternalPackages: [],
  poweredByHeader: false,
  basePath: env.NEXT_PUBLIC_BASE_PATH,
  turbopack: {
    resolveAlias: {
      "@repo/shared": "./packages/shared/src",
      // this is an ugly hack to get turbopack to work with react-resizable, used in the
      // web/src/features/widgets/components/DashboardGrid.tsx file. This **only** affects
      // the dev server. The CSS is included in the non-turbopack based prod build anyways.
      // Also not needed for the non-turbopack based dev server.
      "react-resizable/css/styles.css":
        "../node_modules/.pnpm/react-resizable@3.0.5_react-dom@19.2.3_react@19.2.3__react@19.2.3/node_modules/react-resizable/css/styles.css",
    },
  },
  experimental: {
    browserDebugInfoInTerminal: true, // Logs browser logs to terminal
    // TODO: enable with new next version! 15.6
    // see: https://nextjs.org/docs/app/api-reference/config/next-config-js/turbopackPersistentCaching
    // turbopackPersistentCaching: true,
  },

  /**
   * If you have `experimental: { appDir: true }` set, then you must comment the below `i18n` config
   * out.
   *
   * @see https://github.com/vercel/next.js/issues/41980
   */
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  output: "standalone",

  async headers() {
    return [
      {
        // Add noindex for all pages except root and /auth*
        source: "/:path((?!auth|^$).*)*",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "noindex",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
