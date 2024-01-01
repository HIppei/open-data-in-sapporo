import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';
import json from '@rollup/plugin-json';

/** @type {import('rollup').RollupOptions} */
const config = {
  input: ['src/index.ts'],
  output: {
    dir: 'dist',
    exports: 'named',
    sourcemap: true,
    strict: true,
    preserveModules: false,
  },
  plugins: [
    typescript(),
    json({ compact: true }),
    terser({ format: { comments: false } }),
  ],
};

export default config;
