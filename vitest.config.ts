import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test-setup.ts'],
    coverage: {
      provider: 'c8',
      all: true,
      include: ['src/**/*.ts'],
      exclude: ['src/main.ts'],
    },
  },
});
