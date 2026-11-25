import { defineConfig } from 'steiger';
import fsd from '@feature-sliced/steiger-plugin';

export default defineConfig([
  ...fsd.configs.recommended,
  {
    ignores: ['**/dist/**', '**/node_modules/**'],
  },
  {
    files: ['./src/app/features/**'],
    rules: {
      // Учебный проект: task/create, comment/add и comment/delete намеренно выделены
      // в фичи, хотя каждую использует одна страница. Остальные фичи переиспользуются
      // доской и архивом. В реальном проекте линтер советует слить такую фичу в pages.
      'fsd/insignificant-slice': 'warn',
    },
  },
]);
