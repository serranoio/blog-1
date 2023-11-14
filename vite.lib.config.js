// vite.config.js

import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    svelte({
      exclude: ['./src/lib/Clock.svelte']
    }),
    svelte({
      exclude: ['./src/App.svelte', './src/lib/Counter.svelte',  './src/components/blog/*'],
      compilerOptions: {
        customElement: true,
      }
    })
  ]
})