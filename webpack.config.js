const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const webpack = require('webpack');
const path = require("path");

const devMode = process.env.NODE_ENV === "development";
const outDir = "docs";

const webpackConfig = {
    mode: devMode ? "development" : "production",
    entry: ["./src/index.js", "./src/scss/main.scss"],
    output: {
        path: path.resolve(__dirname, outDir),
        filename: "app.js"
    },
    devServer: {
        contentBase: `./${outDir}`,
        hot: true,
        port: 8000
    },
    module: {
        rules: [
            {
                test: /\.(sa|sc|c)ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader',
                ],
            }, {
                test: /\.vue$/i,
                loader: 'vue-loader',
                options: {
                    hotReload: devMode
                }
            }
        ],
    },
    plugins: [
        new webpack.ProgressPlugin(),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: './index.html'
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css',
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: "static/manifest.json" },
                { from: "static/img", to: "img" },
                { from: "src/serviceworker.js" }
            ]
        }),
        new VueLoaderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
    ],
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.common.js'
        }
    },
    optimization: {
        minimize: !devMode,
        minimizer: [
            new CssMinimizerPlugin({
                sourceMap: devMode
            })
        ]
    }
};

if (devMode) {
    webpackConfig.devtool = "inline-source-map";
}

module.exports = webpackConfig;