import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "commonjs",
      globals: {
        ...globals.node, // Includes Node.js global variables
        __dirname: "readonly",
        __filename: "readonly",
        process: "readonly",
      }
    }
  },
  {
    languageOptions: {
      globals: globals.browser
    }
  },
  pluginJs.configs.recommended,
  {
    files: [
      "src/database/migrations/**/*.js",
      "src/database/models/**/*.js",
      "src/database/seeders/**/*.js"
    ],
    rules: {
      'no-unused-vars': 'off',
    },
  },
];