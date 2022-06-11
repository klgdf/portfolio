const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const siteconfig = require('./site.config.json');

module.exports = {
    entry: [
        './src/assets/js/blocks/env/release.js',
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
        minimize: true,
        minimizer: [
            new UglifyJsPlugin({
                parallel: true,
                include: /\.js$/,
                uglifyOptions: {
                    warnings: false,
                    comments: false,
                    parse: {},
                    compress: {
                        warnings: true,
                        drop_console: true,
                        unused: true,
                        properties: true,
                        drop_console: true,
                        dead_code: true,
                        drop_debugger: true,
                        booleans: true,
                        conditionals: true,
                        comparisons: true,
                        loops: true,
                        if_return: true,
                        join_vars: true
                    },
                    mangle: true, // Note `mangle.properties` is `false` by default.
                    output: null,
                    toplevel: true,
                    nameCache: null,
                    ie8: false,
                    keep_fnames: false,
                }
            }),
        ],
    },
    devtool: 'source-map',
};