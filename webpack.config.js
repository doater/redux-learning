var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var BrowserSyncPlugin = require('browser-sync-webpack-plugin');
var NyanProgressPlugin = require('nyan-progress-webpack-plugin');
// 加入热重载 webpack-dev-middleware
module.exports = {
    entry: {
        index: ['webpack-hot-middleware/client?reload=true', './src/index.jsx']
    },
    output: {
        filename: '[name].js',
        chunkFilename: '[id].js',
        path: path.resolve(__dirname, './dist'),
        publicPath: '/'
    },
    module: {
        loaders: [{
            test: /\.js[x]?$/,
            exclude: /node_modules/,
            loader: 'babel-loader?presets[]=es2015&presets[]=react'
        }]
    },
    plugins: [
        new NyanProgressPlugin(), // 进度条
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html',
            chunksSortMode: 'none',
            inject: false
        }),
        new BrowserSyncPlugin({
            host: '127.0.0.1',
            port: 9090,
            proxy: 'http://127.0.0.1:9000/',
            logConnections: false,
            notify: false
        }, {
            reload: false
        })
    ]
}