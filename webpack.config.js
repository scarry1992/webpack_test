'use strict';

let webpack = require('webpack'),
    path = require('path'),
    ExtractTextPlugin = require("extract-text-webpack-plugin"),
    isDevelopment = process.env.NODE_ENV == 'development';

const dev = {
    entry: "./src/scripts/main.js",
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
    devTools:"source-map",
    watch: true,
    module: {
        loaders: [
            {
                test: /\.scss$/,
                //loader: 'style!css!sass'
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader', 'sass-loader')
            },
            {
                test: /\.js$/,
                loader: 'babel',
                include: /src\/scripts/
            },
            {
                test: /\.handlebars$/,
                //include: /src\/teplates/,
                loader: 'handlebars-loader'
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('theme.css')
    ]
};

const prod = {};
module.exports = isDevelopment ? dev:prod;