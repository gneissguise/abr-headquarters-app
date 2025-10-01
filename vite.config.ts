/// <reference types="vitest" />
/// <reference types="vitest/globals" />

import { defineConfig } from 'vite';
import solid from 'vite-plugin-solid';

export default defineConfig({
  plugins: [solid()],
  test: {
    environment: 'jsdom',
    globals: true,
    transformMode: {
      web: [/\.[jt]sx?$/],
    },
    setupFiles: './src/setupTests.ts',
  },
  resolve: {
    conditions: ['development', 'browser'],
  },
});