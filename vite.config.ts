import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueDevTools from 'vite-plugin-vue-devtools'
import replace from '@rollup/plugin-replace'

export default defineConfig({
  plugins: [
    vue(),
    VueDevTools(),
    replace({
      preventAssignment: false,
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ],
  build: {
    cssCodeSplit: true,
    lib: {
      entry: './src/main.ts',
      formats: ['umd'],
      name: 'SD',
      fileName: () => 'index.js'
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
})
