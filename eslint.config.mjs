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
];