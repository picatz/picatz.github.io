import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  publicDir: 'public',
  assetsInclude: ['**/me2.png'],
  build: {
    outDir: 'dist',
  }
})
