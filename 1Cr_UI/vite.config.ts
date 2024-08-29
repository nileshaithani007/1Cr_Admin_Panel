import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 50000,
  },

  define: {
    'process.env': {
      URL: "http://localhost:8082/cs/apis"
      // URL: "https://pmtool.msltech.ai/cs/apis"
      // URL: "http://52.240.136.21:4002"
      // URL: "http://172.183.254.247:4002"
    }
  },
  server: {
    host: true,
    port: 5174           //uncomment on Virtual Machine
  },
})
