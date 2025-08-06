// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from "@tailwindcss/vite";
import react from '@astrojs/react';
import vercel from '@astrojs/vercel';
// https://astro.build/config
export default defineConfig({
  // Ajoutez cette ligne
  output:'server',

  integrations: [react()],

  vite:{
    define:{
      'ssr':{
          noExternal: ['@react-email/components', 'react-email']
      },
    },
    plugins:[
      tailwindcss(),
    ],
},

  adapter: vercel(),
});