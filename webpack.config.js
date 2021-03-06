'use strict';

let webpack = require('webpack'),
    path = require('path'),
    ExtractTextPlugin = require("extract-text-webpack-plugin"),
    isDevelopment = process.env.NODE_ENV == 'development',
    dev ={},
    prod = {};

const main = {
    //entry: "./index.js",//для единственной точки входа
    context: path.resolve(__dirname, 'frontend'),
    entry: {
        main: './main.js',
        about: './about.js',
        common: ['../src/scripts/welcome', './common.js']//для добавления общего функционала. последним надо указывать common
    },
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, "public"),
        publicPath: "/assets/",
        library: '[name]'
    },
    resolve: {
        //modulesDirectories: ['node_modules', 'vendors'],
        extensions: ['', '.js'],
        root: path.resolve(__dirname, 'vendors'),//для указания доп директории для пакетов,
        //modules: [path.resolve(__dirname, '/vendors'), 'node_modules'],
        alias: {
            old: 'old/dist/old/old.js'
        }
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
                include: /src\/scripts\/routing/,
                loader: 'bundle',
                query: {
                    lazy: true
                }
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
            },
            {
                test: /old\.js$/,
                //loader: 'imports?workSetting=>{delay:1000}!exports?Work'
                loaders:['expose?Work','imports?workSetting=>{delay:1000}', 'exports?Work']
            }
        ],
        noParse: /\/node_modules\/react|lodash/
    },
    plugins: [
        new ExtractTextPlugin('theme.css'),
        new webpack.DefinePlugin({
            NODE_ENV_DEV: isDevelopment
        }),
        new webpack.NoErrorsPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            //minChunks: 2,//выносятся те модули, которые есть хотя бы в 2х точках входа
            //chanks: ['welcome', 'main']//эти модули надо выносить в общий модуль
        }),
        new webpack.ContextReplacementPlugin(/locale$/, /ru|en-gb/),
        new webpack.IgnorePlugin(/en-gb/),
        new webpack.ProvidePlugin({//еще вариант для указания глобальных переменных
            _: 'lodash'
        })
    ],
    externals: {
        //lodash: '_',
        react: 'React',
        "react-dom": 'ReactDOM'
    }
};

if (isDevelopment) {
    Object.assign(dev, main);
    dev.devtool = 'cheap-inline-module-source-map';
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