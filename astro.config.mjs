// @ts-check
import { defineConfig } from 'astro/config';

import path from 'path';

import svelte from '@astrojs/svelte';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  integrations: [svelte()],

  vite: {
    plugins: [tailwindcss()],
     resolve: {
  alias: {
   "@lib": path.resolve("./src/lib"),
  },

  }
}});