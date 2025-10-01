/// <reference types="vitest" />
/// <reference types="vitest/globals" />

import { defineConfig } from 'vite';
import solid from 'vite-plugin-solid';

export default defineConfig({
  plugins: [solid()],
  test: {
    // 👇 This is the entire object now
    environment: 'jsdom',
    globals: true,
    transformMode: {
      web: [/\.[jt]sx?$/],
    },
  },
  resolve: {
    conditions: ['development', 'browser'],
  },
});