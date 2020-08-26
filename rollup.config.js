import babel from 'rollup-plugin-babel'
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
  plugins: [babel({
    exclude: '**/node_modules/**'
  })]
}
