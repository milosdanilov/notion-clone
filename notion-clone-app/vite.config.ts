/// <reference types="vitest" />

import analog from '@analogjs/platform';
import { defineConfig, Plugin, splitVendorChunkPlugin } from 'vite';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { typescriptPaths } from 'rollup-plugin-typescript-paths';
import * as path from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    root: __dirname,
    publicDir: 'src/public',

    ssr: {
      noExternal: ['@analogjs/trpc', '@trpc/server'],
    },
    alias: {
      '@/': path.resolve(__dirname, './src'),
    },
    build: {
      outDir: '../dist/./notion-clone-app/client',
      reportCompressedSize: true,
      commonjsOptions: { transformMixedEsModules: true },
      target: ['es2020'],
    },
    server: {
      fs: {
        allow: ['.'],
      },
    },
    plugins: [
      analog({
        nitro: {
          routeRules: {
            '/': {
              prerender: false,
            },
          },
          rollupConfig: {
            plugins: [
              typescriptPaths({
                tsConfigPath: 'tsconfig.base.json',
                preserveExtensions: true,
              }),
            ],
          },
        },
      }),

      nxViteTsPaths(),
      splitVendorChunkPlugin(),
    ],
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: ['src/test-setup.ts'],
      include: ['**/*.spec.ts'],
      reporters: ['default'],
      cache: {
        dir: `../node_modules/.vitest`,
      },
    },
    define: {
      'import.meta.vitest': mode !== 'production',
    },
  };
});
