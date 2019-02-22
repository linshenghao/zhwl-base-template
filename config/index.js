'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.


const path = require('path')
//客户端地址
const cliAddress = '0.0.0.0';
//客户端端口
const cliPort = 8080;
//后端服务器地址
const  serverAddress = "192.168.100.49";

//后端服务器端口
const serverPort = "80";

const serverUrl = 'http://'+serverAddress+":"+serverPort;

const zeServerUrl =  'http://192.168.100.49';

module.exports = {
  dev: {
    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '/sh/*':{
        target: zeServerUrl,//文生
        changeOrigin: true,
        secure: true,//是否支持https
      },
      '/':{//代理到----服务器环境+本地环境
        target: zeServerUrl,//文生
        changeOrigin: true,
        pathRewrite: {
          '^/': ''
        }
      }
    },

    // Various Dev Server settings
    host: cliAddress, // can be overwritten by process.env.HOST
    port: cliPort, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

    // Use Eslint Loader?
    // If true, your code will be linted during bundling and
    // linting errors and warnings will be shown in the console.
    useEslint: true,
    // If true, eslint errors and warnings will also be shown in the error overlay
    // in the browser.
    showEslintErrorsInOverlay: false,

    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: true
  },

  build: {
    // Template for index.html
    index: path.resolve(__dirname, '../dist/dpcpathwx.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'dpcpathwx',
    assetsPublicPath: './',

    /**
     * Source Maps
     */

    productionSourceMap: true,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
