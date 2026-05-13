import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  define: {
    'import.meta.env.VITE_APPWRITE_ENDPOINT': JSON.stringify(process.env.VITE_APPWRITE_ENDPOINT),
    'import.meta.env.VITE_APPWRITE_PROJECT_ID': JSON.stringify(process.env.VITE_APPWRITE_PROJECT_ID),
    'import.meta.env.VITE_APPWRITE_DATABASE': JSON.stringify(process.env.VITE_APPWRITE_DATABASE),
    'import.meta.env.VITE_APPWRITE_COLLECTION': JSON.stringify(process.env.VITE_APPWRITE_COLLECTION),
  },
  server: {
    host: true
  }
})
