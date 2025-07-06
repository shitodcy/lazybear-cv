import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      // Permintaan ke /api akan diteruskan ke backend
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
      // === TAMBAHAN BARU ===
      // Permintaan ke /public juga akan diteruskan ke backend
      // Ini akan menyelesaikan masalah gambar yang tidak tampil
      '/public': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      }
    }
  }
})