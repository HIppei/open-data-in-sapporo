import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';
import json from '@rollup/plugin-json';

const plugins = [typescript(), json({ compact: true }), terser({ format: { comments: false } })];

const input = ['src/index.ts'];

/** @type {import('rollup').RollupOptions} */
const esmConfig = {
  input,
  output: { dir: 'dist/esm', exports: 'named', sourcemap: true, strict: true, preserveModules: false },
  plugins,
};

/** @type {import('rollup').RollupOptions} */
const cjsConfig = {
  input,
  output: { dir: 'dist/cjs', format: 'cjs', exports: 'named', sourcemap: true, strict: true, preserveModules: false },
  plugins,
};

export default [esmConfig, cjsConfig];
