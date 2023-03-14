import path from 'path'
import analyze from 'rollup-plugin-analyzer'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import smartAsset from 'rollup-plugin-smart-asset'
import { terser } from 'rollup-plugin-terser'
import typescript from 'rollup-plugin-typescript2'
import ttypescript from 'ttypescript'

import alias from '@rollup/plugin-alias'
import json from '@rollup/plugin-json'
import url from '@rollup/plugin-url'

import pkg from './package.json'

const limitBytes = 1e10

const onAnalysis = ({ bundleSize }) => {
  if (bundleSize < limitBytes) return
  console.log(`Bundle size exceeds ${limitBytes} bytes: ${bundleSize} bytes`)
  return process.exit(1)
}

const external = Object.keys(pkg.dependencies || {})

export default {
  input: 'src/index.ts',
  output: [
    { file: pkg.main, format: 'cjs' },
    { file: pkg.module, format: 'es' },
  ],
  external,
  plugins: [
    alias({
      entries: [{ find: '~/', replacement: path.resolve(__dirname, 'src') }],
    }),
    typescript({
      typescript: ttypescript,
    }),
    peerDepsExternal(),
    url({
      include: ['**/*.woff', '**/*.woff2', '**/*.ttf', '**/*.otf'],
      limit: Infinity,
      fileName: '[dirname][name][extname]',
    }),
    terser(),
    smartAsset({
      url: 'inline',
      maxSize: 500,
    }),
    json(),
    analyze({
      onAnalysis,
      summaryOnly: true,
    }),
  ],
}
