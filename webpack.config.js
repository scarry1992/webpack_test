'use strict';

let webpack = require('webpack'),
    path = require('path'),
    ExtractTextPlugin = require("extract-text-webpack-plugin"),
    isDevelopment = process.env.NODE_ENV == 'development';

const main = {
    entry: "./index.js",
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, "dist"),
        publicPath: "/assets/"
    },
    resolve: {
        modulesDirectories: ['node_modules'],
        extensions: ['', '.js']
    },
    resolveLoaders: {
        modulesDirectories: ['node_modules'],
        extensions: ['','.js'],
        moduleTemplate: ['*','*-loader']
    },
    module: {
        loaders: [
            {
                test: /\.scss$/,
                //loader: 'style!css!sass'
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader', 'sass-loader'),
                include: /src\/style/
            },
            {
                test: /\.js$/,
                loader: 'babel',
                //include: /src\/scripts/
                exclude: /node_modules/
            },
            {
                test: /\.pug$/,
                include: /src\/templates/,
                loader: 'pug'
            },
            {
                test: /\.(jpg|png)$/,
                include: /src\/img/,
                loader: 'url',
                query: {
                    name: 'img/[name].[ext]?[hash]',
                    limit: 10000
                }
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('theme.css'),
        new webpack.DefinePlugin({
            NODE_ENV_DEV: isDevelopment
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                drop_console: true,
                unsafe: true
            }
        })
    ]
};

const dev = {
    devTools:"cheap-inline-module-source-map",
    watch: true
};
const prod = {};
module.exports = isDevelopment ? Object.assign(main, dev):Object.assign(main, prod);