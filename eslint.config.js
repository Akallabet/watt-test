import eslintJs from '@eslint/js'
import importPlugin from 'eslint-plugin-import'
import prettierPlugin from 'eslint-plugin-prettier/recommended'
import tseslint from 'typescript-eslint'

export default [
  {
    ignores: ['**/build', '**/dist', '**/.next'],
  },
  eslintJs.configs.recommended,
  ...tseslint.configs.recommended,
  importPlugin.flatConfigs.recommended,
  importPlugin.configs.typescript,
  prettierPlugin,
  {
    files: ['**/*.{js,mjs,cjs,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
        allowDefaultProject: ['*.js', '*.mjs', 'eslint.config.js'],
      },
    },
    rules: {
      'import/no-unresolved': 'off',
      'import/extensions': ['error', 'ignorePackages'],
      'no-else-return': 'error',
    },
    settings: {
      typescript: true,
      node: ['.js'],
      'import/parsers': {
        '@typescript-eslint/parser': ['.ts', '.tsx'],
      },

      'import/resolver': {
        typescript: {
          project: 'web/*/tsconfig.json',
        },

        node: {
          project: 'web/*/tsconfig.json',
        },
      },
    },
  },
]
