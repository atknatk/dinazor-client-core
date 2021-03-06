const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const WebpackNotifierPlugin = require('webpack-notifier');
const chalk = require('chalk');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CheckerPlugin, ForkCheckerPlugin} = require('awesome-typescript-loader');

const commonConfig = require('./webpack.common');
const {ENV, dir} = require('./helpers');

module.exports = function (config) {
    return webpackMerge(commonConfig({env: ENV}), {
        devtool: 'source-map',
        devServer: {
            port: 9997,
            hot: config.HMR,
            stats: {
                colors: true,
                hash: true,
                timings: true,
                chunks: true,
                chunkModules: false,
                children: false,
                modules: false,
                reasons: false,
                warnings: true,
                assets: false,
                version: false
            },
            proxy: {
                "/api": {
                    "target": "http://192.168.1.18/gtbpgd/api",
                    "secure": false,
                    "pathRewrite": {
                        "^/api": ""
                    }
                },
                "/dinazor": {
                    "target": "http://localhost:5101/dinazor",
                    "secure": false,
                    "pathRewrite": {
                        "^/dinazor": ""
                    }
                },
                "/tcmb": {
                    "target": "http://www.tcmb.gov.tr/kurlar",
                    "secure": false,
                    "pathRewrite": {
                        "^/tcmb": ""
                    }
                },
                "/report": {
                    "target": "http://192.168.1.18:8080/jasperserver/rest_v2/reports/reports",
                    "secure": false,
                    "pathRewrite": {
                        "^/report": ""
                    }
                }
            }
        },
        entry: {
            'app': './demo/index.ts',
            'libs': './demo/libs.ts'
        },
        module: {
            exprContextCritical: false,
            rules: [
                {
                    enforce: 'pre',
                    test: /\.js$/,
                    loader: 'source-map-loader',
                    exclude: /(node_modules)/
                },
                {
                    enforce: 'pre',
                    test: /\.ts$/,
                    loader: 'tslint-loader',
                    exclude: /(node_modules|release|dist)/
                },
                {
                    test: /\.ts$/,
                    loaders: [
                        'awesome-typescript-loader',
                        'angular2-template-loader'
                    ],
                    exclude: [/\.(spec|e2e|d)\.ts$/]
                }
            ]
        },
        plugins: [
            // new ForkCheckerPlugin(),
            // new webpack.HotModuleReplacementPlugin()
            new CheckerPlugin(),
            new webpack.optimize.CommonsChunkPlugin({
                name: ['libs'],
                minChunks: Infinity
            }),
            new HtmlWebpackPlugin({
                template: 'demo/index.ejs',
                chunksSortMode: 'dependency',
                title: 'dn-core'
            }),
            new WebpackNotifierPlugin({
                excludeWarnings: true
            })
        ]
    });

};
