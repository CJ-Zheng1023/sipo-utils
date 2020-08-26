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
  plugins: []
}
