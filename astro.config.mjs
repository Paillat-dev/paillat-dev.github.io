// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

import path from 'path';

import svelte from '@astrojs/svelte';
import mdx from '@astrojs/mdx';

import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  integrations: [svelte(), mdx()],
  experimental: {
    fonts: [
      {
        provider: fontProviders.google(),
        name: 'Geist Mono',
        cssVariable: '--font-geist-mono',
        fallbacks: ['monospace'],
        weights: ['100 900'],
      },
      {
        provider: fontProviders.google(),
        name: 'Geist',
        cssVariable: '--font-geist',
        fallbacks: ['sans-serif'],
        weights: ['100 900'],
      },
      {
        provider: 'local',
        name: 'Fluent Emoji Color',
        cssVariable: '--font-fluent-emoji-color',
        fallbacks: [
          'Noto Color Emoji',
          'Segoe UI Emoji',
          'Segoe UI Symbol',
          'Apple Color Emoji',
        ],
        variants: [
          {
            weight: 400,
            style: 'normal',
            src: ['./src/assets/fonts/FluentEmojiColor.ttf'],
          },
        ],
      },
    ],
  },

  vite: {
    plugins: [tailwindcss()],
    css: {
      transformer: 'lightningcss',
    },
    resolve: {
      alias: {
        '@lib': path.resolve('./src/lib'),
        '@components': path.resolve('./src/components'),
        '@layouts': path.resolve('./src/layouts'),
        '@content': path.resolve('./src/content'),
        '@stores': path.resolve('./src/stores'),
      },
    },
  },
});
