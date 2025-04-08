/// <reference types="vitest/config" />

import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react-swc';
import path from 'node:path';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    coverage: {
      include: ['src'],
      reporter: ['text', 'json', 'html'],
      exclude: [
        'src/main.tsx',
        'src/vite-env.d.ts',
        'src/**/index.ts',
        'src/**/__mocks__/*',
        'src/**/__tests__/*',
        'src/App.tsx',
        'src/core/ui/**/*.tsx',
      ],
      thresholds: {
        branches: 80,
        functions: 80,
        statements: 80,
        lines: 80,
      },
    },
    restoreMocks: true,
    setupFiles: ['./vitest.setup.ts'],
  },
});
