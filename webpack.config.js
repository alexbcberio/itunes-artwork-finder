const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const webpack = require('webpack');
const path = require("path");

const devMode = !process.argv.includes("--production");

module.exports = {
    mode: devMode ? "development" : "production",
    entry: ["./src/index.js", "./src/scss/main.scss"],
    output: {
        path: path.resolve(__dirname, "docs"),
        filename: "app.js"
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './docs',
        hot: true,
        host: "0.0.0.0",
        port: 8000
    },
    module: {
        rules: [
            {
                test: /\.(sa|sc|c)ss$/i,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: process.env.NODE_ENV === 'development',
                            reloadAll: true,
                        },
                    },
                    'css-loader',
                    'sass-loader',
                ],
            }, {
                test: /\.vue$/i,
                loader: 'vue-loader',
                options: {
                    hotReload: true
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
            filename: devMode ? '[name].css' : '[name].[hash].css',
            chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
        }),
        new CopyWebpackPlugin([
            { from: "static/manifest.json" },
            { from: "static/img", to: "img" }
        ]),
        new VueLoaderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
    ],
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.common.js'
        }
    }
};
