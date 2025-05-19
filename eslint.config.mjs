import { FlatCompat } from '@eslint/eslintrc';
import pluginNext from '@next/eslint-plugin-next';
import pluginImport from 'eslint-plugin-import';
import eslintPluginPrettier from 'eslint-plugin-prettier';
import pluginReact from 'eslint-plugin-react';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),

  {
    plugins: {
      react: pluginReact,
      'react-hooks': pluginReactHooks,
      next: pluginNext,
      import: pluginImport,
      prettier: eslintPluginPrettier,
    },
    rules: {
      'prettier/prettier': 'error',

      // React and JSX rules
      'react/jsx-uses-react': 'off', // React 17+ no longer requires importing React in every file
      'react/react-in-jsx-scope': 'off', // React 17+ no longer requires React in the scope
      'react/prop-types': 'off', // TypeScript handles type checking, so prop-types are not needed
      'react/jsx-no-undef': 'error', // Ensures variables used in JSX are defined

      // TypeScript rules
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }], // Allow unused function arguments if they start with an underscore
      '@typescript-eslint/explicit-module-boundary-types': 'off', // Disable requiring return types for functions, unless desired
      '@typescript-eslint/no-explicit-any': 'error', // Warn about the use of `any` type (can be relaxed as needed)

      // Next.js specific rules
      'next/no-img-element': 'error', // Suggest using next/image for image optimization
      'next/next-script-for-ga': 'error', // Enforce correct usage of the <Script> component

      // Import rules
      'import/no-unresolved': 'error', // Ensure imports resolve properly
      'import/order': ['warn', { groups: [['builtin', 'external', 'internal']] }], // Enforce a proper order of imports

      // Code style and best practices
      'no-console': ['warn', { allow: ['warn', 'error'] }], // Warn for console statements
      eqeqeq: 'error', // Require strict equality (=== and !==)
      'no-undef': 'error', // Disallow the use of undeclared variables
      'no-restricted-syntax': ['error', 'WithStatement', 'LabeledStatement'], // Avoid using 'with' or labeled statements

      // Hooks rules
      'react-hooks/rules-of-hooks': 'error', // Ensure hooks are used correctly
      'react-hooks/exhaustive-deps': 'warn', // Ensure dependencies for hooks are correctly specified
    },
  },
];

export default eslintConfig;
