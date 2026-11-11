import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // Relative asset URLs: the build works from any path, e.g. GitHub Pages at
  // https://<user>.github.io/asian-castle/ or a custom domain root. Safe because
  // the site is a single page with hash links only.
  base: './',
  plugins: [react()],
})
