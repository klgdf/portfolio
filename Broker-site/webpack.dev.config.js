const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const siteconfig = require('./site.config.json');

module.exports = {
    entry: [
        './src/assets/js/blocks/env/develop.js',
        './' + siteconfig.build.links.source.assets.js + '/' + siteconfig.build.links.build.input.js.main + '.js'
    ],
    mode: 'development',
    output: {
        path: path.resolve(__dirname, siteconfig.build.links.build.assets.js),
        filename: '[name].js',
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules|bower_components/,
            use: {
                loader: 'babel-loader',
            },
        }, ],
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    chunks: 'initial',
                    test: /node_modules|bower_components/,
                    name: siteconfig.build.links.build.output.js.vendor,
                    enforce: true,
                },
            },
        },
    },
    devtool: 'source-map',
};