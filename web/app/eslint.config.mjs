import eslintJs from '@eslint/js'
// import tanstackPluginQuery from '@tanstack/eslint-plugin-query'
import tsParser from '@typescript-eslint/parser'
import { defineConfig, globalIgnores } from 'eslint/config'
import prettierPlugin from 'eslint-plugin-prettier/recommended'
// import eslintReact from 'eslint-plugin-react'
// import eslintReactHook from 'eslint-plugin-react-hooks'
// import reactRefresh from 'eslint-plugin-react-refresh'
// import { configs as eslintStorybookConfigs } from 'eslint-plugin-storybook'
// import eslintPluginUnicorn from 'eslint-plugin-unicorn'
import globals from 'globals'
import { configs } from 'typescript-eslint'
import { FlatCompat } from '@eslint/eslintrc'

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
})

const nextConfig = compat.extends('next/core-web-vitals')

/** @type {import('eslint').Linter.Config[]} */
const config = defineConfig([
  eslintJs.configs.recommended,
  ...configs.recommended,
  ...nextConfig,
  prettierPlugin,
  // eslintReactHook.configs.flat['recommended-latest'],
  // tanstackPluginQuery.configs['flat/recommended'],
  // ...eslintStorybookConfigs['flat/recommended'],
  // eslintReact.configs.flat.recommended,
  // eslintReact.configs.flat['jsx-runtime'],
  // reactRefresh.configs.vite,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
      },
      parser: tsParser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
        allowDefaultProject: ['*.js', '*.mjs', 'eslint.config.js'],
      },
    },
    rules: {
      'no-async-promise-executor': 'off',
      'no-extra-boolean-cast': 'off',
      //   // Core hooks rules
      //   'react-hooks/rules-of-hooks': 'warn',
      //   'react-hooks/exhaustive-deps': 'warn',
      //   // React Compiler rules
      //   'react-hooks/config': 'warn',
      //   'react-hooks/error-boundaries': 'warn',
      //   'react-hooks/component-hook-factories': 'warn',
      //   'react-hooks/gating': 'warn',
      //   'react-hooks/globals': 'warn',
      //   'react-hooks/immutability': 'warn',
      //   'react-hooks/preserve-manual-memoization': 0, // TODO: enable later
      //   'react-hooks/purity': 'warn',
      //   'react-hooks/refs': 'warn',
      //   'react-hooks/set-state-in-effect': 'warn',
      //   'react-hooks/set-state-in-render': 'warn',
      //   'react-hooks/static-components': 'warn',
      //   'react-hooks/unsupported-syntax': 'warn',
      //   'react-hooks/use-memo': 0, // TODO: enable later
      //   'react-hooks/incompatible-library': 'warn',
      //   'react/prop-types': 0,
      //   'react/display-name': 0,
      //   '@typescript-eslint/consistent-type-imports': 'error',
      //   '@typescript-eslint/no-floating-promises': 'error',
      //   '@typescript-eslint/require-await': 'error',
      //   '@typescript-eslint/return-await': ['error', 'in-try-catch'],
      //   'unicorn/no-unnecessary-await': 'error',
    },

    settings: {
      react: {
        version: 'detect',
      },
      typescript: true,
      node: ['.js'],
      'import/parsers': {
        '@typescript-eslint/parser': ['.ts', '.tsx'],
      },
      'import/resolver': {
        typescript: {
          project: './tsconfig.json',
        },
      },
    },
  },
  globalIgnores([
    '**/node_modules',
    '**/dist',
    '**/coverage',
    '**/.eslintrc.cjs',
    '**/storybook-static',
    '**/.next',
  ]),
])

export default config
