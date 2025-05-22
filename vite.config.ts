import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
// import { TanStackRouterVite } from '@tanstack/router-vite-plugin'

export default defineConfig({
  plugins: [
    react(),
    // TanStackRouterVite(),
    // routesDirectory: false,
    // generatedRouteTree: false,
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
  },
})
