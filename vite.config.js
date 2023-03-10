import { defineConfig } from 'vite'
import { resolve } from 'path'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],

  resolve: {
    alias: {

      '@': resolve(__dirname, 'src/'),
      '@assets': resolve(__dirname, 'src/assets/'),
      '@component': resolve(__dirname, 'src/components/'),
      '@utils': resolve(__dirname, 'src/utilities/'),
    },
  },

  // Define the base path where you would like to deploy the site.
  // Refer: https://vitepress.vuejs.org/config/app-configs#base
  base: '/',
})
