var pkg = require('./package.json')
var fs = require('fs')
var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')

var delFolder = function (path) {
  var files = []
  if (fs.existsSync(path)) {
    files = fs.readdirSync(path)
    files.forEach(function (file, index) {
      var curPath = path + '/' + file
      if (fs.statSync(curPath).isDirectory()) { // recurse
        delFolder(curPath)
      } else { // delete file
        fs.unlinkSync(curPath)
      }
    })
    fs.rmdirSync(path)
  }
}
delFolder('./build/js/')

module.exports = {
  entry: {
    main: path.resolve(__dirname, 'src/Main.jsx'),
    vendor: Object.keys(pkg.dependencies)
  },
  output: {
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
        // loaders加载器
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          'presets': ['react', 'es2015']
        }
      },
      {
        test: /\.less$/,
        exclude: /node_modules/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader?modules&localIdentName=[local]-[hash:base64:8]!resolve-url-loader!postcss-loader!less-loader'
        })
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loadermodules&localIdentName=[local]-[hash:base64:8]!resolve-url-loader!postcss-loader'
        })
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
        // webpack 内置的 banner-plugin
    new webpack.BannerPlugin('Copyright by SLYX@github.io.'),

        // html 模板插件
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '/src/index.html'),
      minify: {
        removeEmptyAttributes: true,
        removeAttributeQuotes: true,
        collapseBooleanAttributes: true,
        collapseWhitespace: true
      }
    }),

        // 为组件分配ID，通过这个插件webpack可以分析和优先考虑使用最多的模块，并分配最小的ID
    new webpack.optimize.OccurrenceOrderPlugin(),

        // 分离CSS和JS文件
    new ExtractTextPlugin('/style/[name].[hash:8].css'),

        // js代码压缩
    new webpack.optimize.UglifyJsPlugin({
      compress: {
              // supresses warnings, usually from module minification
              // drop debugger and console
        warnings: false,
        drop_debugger: true,
        drop_console: true
      },
      beautify: false,
      comments: false
    }),

        // css代码压缩
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano'),
      cssProcessorOptions: { discardComments: { removeAll: true } },
      canPrint: true
    }),

        // 热模块替换插件
    new webpack.HotModuleReplacementPlugin()
  ]

}
