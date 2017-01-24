'use strict';

let webpack = require('webpack'),
    path = require('path'),
    isDevelopment = process.env.NODE_ENV == 'development';

const dev = {
    entry: "./src/scripts/main.js",
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, "dist"),
        publicPath: "/assets/"
    },
    devTools:"source-map",
    watch: true,
    module: {
        loaders: [
            {
                test: /\.scss$/,
                loader: 'style!css!sass'
            },
            {
                test: /\.js$/,
                loader: 'babel'
            }
        ]
    }
};

const prod = {};
module.exports = isDevelopment ? dev:prod;