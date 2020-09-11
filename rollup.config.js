import babel from 'rollup-plugin-babel'
import postcss from 'rollup-plugin-postcss'
import cssnano from 'cssnano'
export default {
  input: './index.js',
  output: [{
    file: './dist/sipoUtils.js',
    format: 'umd',
    name:'sipoUtils'
  }, {
    file: './dist/sipoUtils.esm.js',
    format: 'es'
  }],
  plugins: [
    postcss({
      extensions: ['.css'],
      plugins: [
        cssnano()
      ]
    }),
    babel({
      exclude: '**/node_modules/**'
    })
  ]
}
