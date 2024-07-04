import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(() => {
  return {
    build: {
      outDir: 'build',
    },
    plugins: [react()],
    server: {
    proxy: {
      '/API': {
        target: 'http://poka-backend.bct.itclub.pp.ua',
        changeOrigin: true,
      },
    },
  },
  };
});
