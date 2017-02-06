'use strict';

let webpack = require('webpack'),
    path = require('path'),
    ExtractTextPlugin = require("extract-text-webpack-plugin"),
    isDevelopment = process.env.NODE_ENV == 'development',
    dev ={},
    prod = {};

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
        })
    ]
};

if (isDevelopment) {
    Object.assign(dev, main);
    dev.devTools = 'cheap-inline-module-source-map';
    dev.watch = true;
    dev.debug = true;
    dev.progress = true;
    dev.devServer = {
        inline: true
    };
}

if (!isDevelopment) {
    Object.assign(prod, main);
    prod.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                drop_console: true,
                unsafe: true
            }
        })
    );
}

module.exports = isDevelopment ? dev:prod;