const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
module.exports = {
  entry: {
    bundle: ['react-hot-loader/patch', path.resolve(__dirname, './src/js/core.js')]
  },
  resolve: {
    extensions: ['.webpack.js', '.web.js', '.js'],
    alias: {
      ie: 'component-ie',
      react: path.resolve('./node_modules/react')
    }
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loaders: ['babel-loader']
      },
      { test: /\.(sass|scss)$/, loaders: ['style-loader', 'css-loader', 'sass-loader'] },
      { test: /\.css$/, loaders: ['style-loader', 'css-loader'] },
      { test: /.(png|woff(2)?|eot|ttf|svg)(\?[a-z0-9=\.]+)?$/, loader: 'url-loader?limit=100000&name=fonts/[name].[ext]' }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    }),
    new HtmlWebpackPlugin({
      hash: false,
      template: 'src/index.html'
    }),
    new webpack.ProvidePlugin({
      React: 'react',
      cn: 'classnames',
      _: 'lodash',
      ReactDOM: 'react-dom',
      axios: 'axios'
    }),
    new webpack.LoaderOptionsPlugin({
      options: {
        sassLoader: {
          indentedSyntax: true,
          includePaths: [path.resolve(__dirname, 'node_modules')]
        }
      }
    })
  ],
  performance: {
    hints: false
  },
  devServer: {
    historyApiFallback: true,
    proxy: {
      '/api/*': {
        target: 'http://localhost:3001',
        secure: false
      }
    },
    stats: {
      colors: true,
      hash: false,
      version: false,
      timings: false,
      assets: false,
      chunks: false,
      modules: false,
      reasons: false,
      children: false,
      source: false,
      warnings: false,
      publicPath: false
    }
  }
}
