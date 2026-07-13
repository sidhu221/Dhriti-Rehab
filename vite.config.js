import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./src/test/setup.js",
    // Playwright owns e2e/ and brings its own test()/expect() - keep vitest out of it.
    exclude: ["**/node_modules/**", "**/dist/**", "e2e/**"],
  },
})
