// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // Publicado en GitHub Pages como sitio de proyecto: https://dv304.github.io/soltave/
  site: 'https://dv304.github.io',
  base: '/soltave',
  vite: {
    plugins: [tailwindcss()]
  }
});
