import { sveltekit } from '@sveltejs/kit/vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { defineConfig } from 'vite';
// import { svelte } from '@sveltejs/vite-plugin-svelte'

export default defineConfig({
	plugins: [
    sveltekit(),
  ]
});
