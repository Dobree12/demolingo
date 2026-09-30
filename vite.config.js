import { defineConfig } from 'vite';

export default defineConfig({
  base: '/',
  build: {
    rollupOptions: {
      // două pagini: aplicația + pagina de urmărire a progresului
      input: { main: 'index.html', progres: 'progres.html' },
    },
  },
});
