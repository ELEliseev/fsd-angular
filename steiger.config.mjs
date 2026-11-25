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
      // Учебный проект: фичи выделены намеренно, хотя их использует одна страница.
      // В реальном проекте с единственной страницей линтер советует слить их в pages —
      // здесь это осознанный компромисс ради демонстрации слоя features.
      'fsd/insignificant-slice': 'warn',
    },
  },
]);
