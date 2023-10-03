import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5014,
    host: "192.168.129.72"
  },
  resolve: {
    alias: {
      '@mui/icons-material': '/node_modules/@mui/icons-material',
    },
  },
})
