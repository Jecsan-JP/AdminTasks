// eslint.config.mjs
import next from "eslint-config-next";

export default [
  next,
  {
    plugins: {
      prettier: require("eslint-plugin-prettier"),
      "react-hooks": require("eslint-plugin-react-hooks"),
      "@typescript-eslint": require("@typescript-eslint/eslint-plugin"),
      "jsx-a11y": require("eslint-plugin-jsx-a11y"),
      import: require("eslint-plugin-import"),
    },
    languageOptions: {
      parser: require("@typescript-eslint/parser"),
      parserOptions: {
        ecmaVersion: 12,
        sourceType: "module",
        ecmaFeatures: { jsx: true },
      },
      globals: {
        window: "readonly",
        document: "readonly",
      },
    },
    env: {
      browser: true,
      es2021: true,
      node: true,
    },
    rules: {
      "prettier/prettier": ["error", { singleQuote: true }],
      "react/react-in-jsx-scope": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_" },
      ],
      "import/order": [
        "error",
        { groups: [["builtin", "external", "internal"]] },
      ],
      "@typescript-eslint/no-explicit-any": "off",
      "jsx-a11y/click-events-have-key-events": "off",
      "jsx-a11y/anchor-is-valid": "off",
      "jsx-a11y/no-static-element-interactions": "off",
      "jsx-a11y/no-noninteractive-element-interactions": "off",
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    overrides: [
      {
        files: ["src/**/*.ts", "src/**/*.tsx"],
        rules: {
          "no-console": ["error", { allow: ["warn", "error"] }],
        },
      },
      {
        files: ["src/common/domain/constants/debugPrint.ts"],
        rules: {
          "no-console": ["off", { allow: ["warn", "error"] }],
        },
      },
    ],
  },
];
