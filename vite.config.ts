import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react({
    jsxRuntime: 'automatic',
  })],
  base: '/test_repo_2_miya123123/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
})