import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue2';
import Components from 'unplugin-vue-components/vite';
import { VuetifyResolver } from 'unplugin-vue-components/resolvers';
import viteLegacyPlugin from '@vitejs/plugin-legacy';
import { browserslist as targets } from './package.json';
import { resolve } from './vite.config/alias.js';
import proxy from './vite.config/proxy.js';

const polyfills = [
  'es.object.from-entries',
  'es.object.values',
  'es.array.at',
  'es.array.flat-map',
  'es.array.flat'
];
// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const _isDev_ = mode === 'development';
  return {
    define: {
      _isDev_
    },
    plugins: [
      vue(),
      Components({ resolvers: [VuetifyResolver()] }),
      viteLegacyPlugin({ targets, polyfills, modernPolyfills: polyfills })
    ],
    resolve,
    server: {
      proxy,
      port: 9999
    },
    preview: {
      port: 8686
    }
  };
});
