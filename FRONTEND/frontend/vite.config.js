import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

  
    

// https://vite.dev/config/
export default defineConfig({
  css: {
  postcss: './postcss.config.js',
  
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
          target: "http://localhost:5000", // Backend server URL
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
},
  
})
