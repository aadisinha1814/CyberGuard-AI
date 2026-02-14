/*
  ESLint Configuration File

  Purpose:
  This file defines linting rules and coding standards for the project.
  ESLint helps maintain code quality, readability, and consistency
  by identifying syntax issues, unused variables, improper React usage,
  and formatting inconsistencies.

  This configuration specifically supports:
  - Modern JavaScript (ES2020+)
  - React JSX development
  - React Hooks best practices
  - Vite development environment compatibility
*/

import js from '@eslint/js'                 // Base ESLint JavaScript rules
import globals from 'globals'              // Predefined global variables (browser, node, etc.)
import reactHooks from 'eslint-plugin-react-hooks'  // Ensures correct React Hooks usage
import reactRefresh from 'eslint-plugin-react-refresh' // Supports Vite fast-refresh
import { defineConfig, globalIgnores } from 'eslint/config'


export default defineConfig([

  /*
    Ignore compiled build output directory.
    Prevents linting generated files inside /dist.
  */
  globalIgnores(['dist']),

  {
    // Apply linting rules to JavaScript and JSX files
    files: ['**/*.{js,jsx}'],

    extends: [
      js.configs.recommended,              // Recommended JavaScript lint rules
      reactHooks.configs.flat.recommended, // React Hooks correctness rules
      reactRefresh.configs.vite,           // Compatibility with Vite hot reload
    ],

    /*
      Language settings for parsing modern JS and React code.
    */
    languageOptions: {
      ecmaVersion: 2020,      // Enables modern JavaScript syntax
      globals: globals.browser, // Defines browser global variables
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true }, // Enables JSX parsing
        sourceType: 'module',        // Uses ES module system
      },
    },

    /*
      Custom project-specific linting rules.
    */
    rules: {

      /*
        Flags unused variables as errors.

        Exception:
        Variables starting with uppercase or underscore
        are ignored. This helps prevent false warnings
        for constants, React components, or placeholders.
      */
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
    },
  },
])
