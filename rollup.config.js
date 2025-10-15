import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';

export default [
  // CommonJS build (for Node.js)
  {
    input: 'src/index.js',
    output: {
      file: 'dist/index.cjs',
      format: 'cjs',
      exports: 'auto'
    },
    plugins: [
      resolve(),
      commonjs(),
      babel({
        babelHelpers: 'bundled',
        presets: [
          ['@babel/preset-env', {
            targets: {
              node: '8'
            },
            modules: false
          }]
        ]
      })
    ]
  },
  // ES Module build
  {
    input: 'src/index.js',
    output: {
      file: 'dist/index.mjs',
      format: 'esm'
    },
    plugins: [
      resolve(),
      commonjs(),
      babel({
        babelHelpers: 'bundled',
        presets: [
          ['@babel/preset-env', {
            targets: {
              node: '8'
            },
            modules: false
          }]
        ]
      })
    ]
  },
  // UMD build (for browsers)
  {
    input: 'src/index.js',
    output: {
      file: 'dist/index.umd.js',
      format: 'umd',
      name: 'IdNumber',
      exports: 'named'
    },
    plugins: [
      resolve(),
      commonjs(),
      babel({
        babelHelpers: 'bundled',
        presets: [
          ['@babel/preset-env', {
            targets: {
              browsers: ['> 1%', 'last 2 versions', 'not ie <= 8']
            },
            modules: false
          }]
        ]
      })
    ]
  }
];