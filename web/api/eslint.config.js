import { defineConfig, globalIgnores } from 'eslint/config'
import globals from 'globals'
import baseConfig from '../../eslint.config.js'

export default defineConfig([
  ...baseConfig,
  globalIgnores([
    './src/migrations/**/*',
    './types/*',
    './src/global.d.ts',
    './plt-env.d.ts',
  ]),
  {
    languageOptions: {
      globals: {
        ...globals.node,
      },
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
        allowDefaultProject: ['*.js', '*.mjs', 'eslint.config.js'],
      },
    },
    rules: {
      'import/no-named-as-default-member': 'off',
    },
  },
])
