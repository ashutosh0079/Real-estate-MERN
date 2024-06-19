<<<<<<< HEAD
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
})
=======
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://real-estate-mern-psi.vercel.app/',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
>>>>>>> eab7d3dae1e99033a312428eae7f442cc746999c
