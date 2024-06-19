
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '.prisma/client': path.resolve(__dirname, 'path/to/.prisma/client/index-browser')
    }
  }
})
