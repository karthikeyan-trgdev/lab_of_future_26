import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  build: {
    rollupOptions: {
      output: {
        // Force React, React DOM, scheduler, three, and the entire
        // @react-three ecosystem into ONE chunk. The previous split
        // (react-three in a "three" chunk, React itself in "vendor")
        // caused `Cannot read properties of undefined (useLayoutEffect)`
        // at runtime — three's chunk executed while vendor (React) was
        // still being parsed, so the React module binding was undefined.
        // Co-bundling guarantees React is evaluated before fiber/drei
        // read its hooks.
        manualChunks: {
          'react-three': [
            'react',
            'react-dom',
            'react-dom/client',
            'scheduler',
            'three',
            '@react-three/fiber',
            '@react-three/drei',
            '@react-three/postprocessing',
            'postprocessing',
          ],
        },
      },
    },
    chunkSizeWarningLimit: 1500,
  },
});
