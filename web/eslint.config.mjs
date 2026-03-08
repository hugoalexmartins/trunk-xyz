import parser from "@typescript-eslint/parser";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import js from "@eslint/js";
import globals from "globals";

export default [
  {
    ignores: ["node_modules", ".next", ".next-check", "dist", "coverage", "**/*.tsbuildinfo", "next.config.js"],
  },
  {
    files: ["jest.config.mjs"],
    languageOptions: {
      globals: globals.node,
      ecmaVersion: 2020,
      sourceType: "module",
    },
  },
  js.configs.recommended,
  {
    files: ["**/*.mjs"],
    languageOptions: {
      globals: globals.node,
      ecmaVersion: 2020,
      sourceType: "module",
    },
  },
  {
    files: ["postcss.config.js"],
    languageOptions: {
      globals: globals.node,
      ecmaVersion: 2020,
      sourceType: "commonjs",
    },
  },
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: parser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
        project: "./tsconfig.json",
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        React: "readonly",
      },
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
    },
    rules: {
      ...tsPlugin.configs.recommended.rules,
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/no-explicit-any": "off",
    },
  },
  {
    files: ["**/*.test.ts", "**/*.test.tsx", "**/*.spec.ts", "**/*.spec.tsx"],
    languageOptions: {
      globals: {
        ...globals.jest,
      },
    },
  },
];
