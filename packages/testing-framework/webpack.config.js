const path = require('path')
const { CheckerPlugin } = require('awesome-typescript-loader')

module.exports = {
  entry: './app/index.ts',

  output: {
    path: path.resolve(__dirname, 'framework', 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: 'awesome-typescript-loader',
      }
    ]
  },
  resolve: {
    extensions: [ '.ts', '.js' ]
  },
  plugins: [
      new CheckerPlugin()
  ]
}

