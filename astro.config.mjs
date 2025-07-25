// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from "@tailwindcss/vite";
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  output:'server',
  integrations: [react()],
  vite:{
    define:{
      'process.env':process.env
    },
    plugins:[
      tailwindcss(),
    ],
     server: {
      host: true,
      port: 4321,
      // Permet tous les hosts pour le développement
      // allowedHosts: true,
      // Ou spécifiquement votre domaine :
      // allowedHosts: [''],
    },
    preview: {
      host: true,
      port: 4321,
      // Permet tous les hosts pour le preview
      // allowedHosts: true,
      // Ou spécifiquement votre domaine :
      // allowedHosts: ['thereby-scoop-wet-celebs.trycloudflare.com'],
    }
}});