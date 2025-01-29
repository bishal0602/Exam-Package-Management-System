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
        target: 'https://poka-backend.bct.itclub.pp.ua',
        changeOrigin: true,
      },
    },
  },
  };
});
