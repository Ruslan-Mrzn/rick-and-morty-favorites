import { rmSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import federation from '@originjs/vite-plugin-federation';
import react from '@vitejs/plugin-react';
import { defineConfig, type Plugin } from 'vite';
import svgr from 'vite-plugin-svgr';

const dirname = path.dirname(fileURLToPath(import.meta.url));

// GitHub Pages раздаёт репозиторий в подпапке, Vercel — в корне домена
const base = process.env.VITE_BASE_PATH || '/';

// Очистка index.html из продакшн-сборки
function removeStandaloneEntry(): Plugin {
  return {
    name: 'remove-standalone-entry',
    apply: 'build',
    enforce: 'post',
    closeBundle() {
      rmSync(path.resolve(dirname, 'dist/index.html'), { force: true });
    }
  };
}

export default defineConfig({
  base,
  // remote раздаёт только JS/CSS, публичных статик-файлов нет
  publicDir: false,
  plugins: [
    react(),
    svgr({
      svgrOptions: {
        icon: false,
        dimensions: true
      },
      include: '**/*.svg?react'
    }),
    federation({
      name: 'remote_app',
      filename: 'remoteEntry.js',
      exposes: {
        './FavoriteCharacters': './src/widgets/FavoriteCharacters/index.tsx'
      },
      shared: ['react', 'react-dom']
    }),
    removeStandaloneEntry()
  ],
  resolve: {
    alias: {
      '@': path.resolve(dirname, './src')
    }
  },
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false
  },
  preview: {
    port: 5001,
    strictPort: true,
    cors: true
  }
});
