import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import external from 'rollup-plugin-peer-deps-external'
import postcss from 'rollup-plugin-postcss'
import nodePolyfill from 'rollup-plugin-polyfill-node'
import url from 'rollup-plugin-url'
import svgr from '@svgr/rollup'
import json from '@rollup/plugin-json'
import builtins from 'builtin-modules'

import pkg from './package.json'

export default {
  input: 'src/index.js',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      sourcemap: true
    },
    {
      file: pkg.module,
      format: 'es',
      sourcemap: true
    }
  ],
  plugins: [
    external(),
    postcss({
      extensions: ['.css'],
      modules: true
    }),
    url(),
    // node({crypto: true}),
    svgr(),
    babel({
      exclude: 'node_modules/**'
    }),
    nodePolyfill(),
    commonjs(),
    json()
  ],
  external: [...builtins, 'classnames', 'crypto-js']
}
