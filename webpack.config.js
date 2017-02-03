'use strict';

let webpack = require('webpack'),
    path = require('path'),
    ExtractTextPlugin = require("extract-text-webpack-plugin"),
    isDevelopment = process.env.NODE_ENV == 'development';

const main = {
    entry: "./index1.js",
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, "dist"),
        publicPath: "/assets/"
    },
    resolve: {
        modulesDirectories: [
            'node_modules'
        ]
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
                //include: /src\/teplates/,
                loader: 'pug'
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('theme.css')
    ]
};

const dev = {
    devTools:"source-map",
    watch: true
};
const prod = {};
module.exports = isDevelopment ? Object.assign(main, dev):Object.assign(main, prod);