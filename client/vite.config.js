import { createRequire } from 'module'
import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const require = createRequire(import.meta.url)

const prismaClient = require
    .resolve('@prisma/client')
    .replace(/@prisma(\/|\\)client(\/|\\)index\.js/, '.prisma/client/index-browser.js')

const prismaIndexBrowser = path.normalize(path.relative(process.cwd(), prismaClient)) 


// https://vitejs.dev/config/
export default defineConfig(()=>({
  plugins: [react()],
  resolve: { alias: { '.prisma/client/index-browser': prismaIndexBrowser } }

}))
