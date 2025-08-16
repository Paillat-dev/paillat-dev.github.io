// @ts-check
import { defineConfig } from 'astro/config';

import path from 'path';

import svelte from '@astrojs/svelte';
import mdx from '@astrojs/mdx';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  integrations: [svelte(), mdx()],

  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        '@lib': path.resolve('./src/lib'),
      },
    },
  },
});
