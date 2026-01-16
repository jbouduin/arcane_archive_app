import tseslint from "@typescript-eslint/eslint-plugin";
import parser from "@typescript-eslint/parser";
import stylistic from "@stylistic/eslint-plugin";

export default [
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser,
      parserOptions: {
        project: "./tsconfig.json",
      },
    },
    plugins: {
      "@typescript-eslint": tseslint,
      "@stylistic": stylistic,
    },
    rules: {
      ...tseslint.configs.recommended.rules,
      ...stylistic.configs.recommended.rules,
      // es-lint rules
      "no-console": "error",
      // --- typescript - eslint rules
      "@typescript-eslint/no-unused-vars": ["error", {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
        caughtErrorsIgnorePattern: "^_",
      }],
      // --- stylistic rules ---
      "@stylistic/brace-style": ["error", "1tbs"],
      // who the hell wants dangling comma"s ???
      "@stylistic/comma-dangle": "off",
      "@stylistic/multiline-comment-style": ["error", "starred-block"],
      "@stylistic/indent": ["error", 2],
      "@stylistic/member-delimiter-style": ["error", {
        multiline: {
          delimiter: "semi",
          requireLast: true // enforces comma between members, forbids trailing comma
        },
        singleline: {
          delimiter: "semi",
          requireLast: true
        }
      }],
      "@stylistic/operator-linebreak": ["error", "after", {
        overrides: {
          "?": "before",
          ":": "before",
        },
      }],
      "@stylistic/quotes": ["error", "double"],
      "@stylistic/semi": ["error", "always"],
      "@stylistic/spaced-comment": "off"
    },
  },
];