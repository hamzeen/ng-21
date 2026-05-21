/// <reference types="vitest" />

import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,

    environment: 'jsdom',

    setupFiles: ['./src/test-setup.ts'],

    include: ['src/**/*.spec.ts'],

    css: true,

    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      reportsDirectory: './coverage',
      exclude: [
        'src/main.ts',
        'src/**/*.routes.ts',
        'src/**/*.config.ts',
        'src/environments/**',
        'src/**/*.mock.ts',
      ],
    },

    reporters: ['default'],

    watch: false,

    deps: {
      inline: [/@angular/],
    },
  },
});
