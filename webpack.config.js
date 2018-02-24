var fs = require('fs')
var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var OpenBrowserPlugin = require('open-browser-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var config = require('./config/env.prod.js')
require('shelljs/global')
if (process.env.NODE_ENV === 'production') {
  config = require('./config/env.prod.js')
} else if (process.env.NODE_ENV === 'test') {
  config = require('./config/test.env.js')
} else {
  config = require('./config/local.env.js')
}

function resolve(dir) {
  return path.join(__dirname, '.', dir)
}

var delFolder = function (path) {
  var files = []
  if (fs.existsSync(path)) {
    files = fs.readdirSync(path)
    files.forEach(function (file, index) {
      var curPath = path + '/' + file
      if (fs.statSync(curPath).isDirectory()) { // recurse
        delFolder(curPath)
      } else {  // delete file
        fs.unlinkSync(curPath)
      }
    })
    fs.rmdirSync(path)
  }
}
delFolder('./build/js/')
delFolder('./build/style/')
delFolder('./build/fonts/')
delFolder('./build/images/')
const assetsRoot =  path.resolve(__dirname, './build')
const assetsSubDirectory =  '/'
var assetsPath = path.join(assetsRoot, assetsSubDirectory)
rm('-rf', assetsPath)
mkdir('-p', assetsPath)
cp('-R', 'src/static', assetsPath)
module.exports = {
  entry: {
    main: path.resolve(__dirname, 'src/Main.jsx')
  },
  devtool: 'source-map',
  output: {
    publicPath: '/',
    path: path.resolve(__dirname, './build'),
    filename: 'js/[name].[hash:8].js',
    chunkFilename: 'js/[name].[hash:8].js'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      '@': resolve('src')
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        // use: ['babel-loader', 'eslint-loader']
        // use: ['babel-loader']
        loader: ['babel-loader', 'eslint-loader']
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'less-loader']
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.(png|gif|jpg|jpeg|bmp)$/,
        loader: 'url-loader?limit=1&name=images/[name].[hash:8].[ext]'
      },
      {
        test: /\.(woff|woff2|svg|ttf|eot)($|\?)/,
        loader: 'file-loader?name=fonts/[name].[hash:8].[ext]'
      }
    ]
  },

  plugins: [
    // html 模板插件
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/index.html'),
      minify: {
        removeEmptyAttributes: true,
        removeAttributeQuotes: true,
        collapseBooleanAttributes: true,
        collapseWhitespace: true
      }
    }),

    // 可在业务 js 代码中使用 __DEV__ 判断是否是dev模式（dev模式下可以提示错误、测试报告等, production模式不提示
    new webpack.DefinePlugin({
      '__DEV__': true,
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        host: {
          fbs: config.FBS_URL,
          wechat: config.WECHAT_URL,
          user: config.USER_API,
          fdn: config.FOUNDATION_API,
          app: config.APP_HOST,
          appv3: config.APPV3,
          v4_item: config.V4_ITEM_API,
          v3_maint: config.MAINT_API,
          cfg: config.CFG_API
        }
      }
    }),

    // 为组件分配ID，通过这个插件webpack可以分析和优先考虑使用最多的模块，并分配最小的ID
    new webpack.optimize.OccurrenceOrderPlugin(),

    // 分离CSS和JS文件
    new ExtractTextPlugin('/style/[name].[hash:8].css'),

    // 提供公共代码
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'js/[name].[hash:8].js'
    }),

    // 热模块替换插件
    new webpack.HotModuleReplacementPlugin(),

    // 打开浏览器
    new OpenBrowserPlugin({
      url: 'http://localhost:8080?token=355e9052c6bb7a07c2805b7c9a12faedabee1fac2aec1e7dc229a460ebde4fda'
    })
  ],

  devServer: {
    historyApiFallback: true,
    inline: true,
    hot: true
  }
}
