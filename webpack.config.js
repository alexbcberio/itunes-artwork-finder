const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const path = require("path");

const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
    mode: "development",
    entry: ["./src/index.js", "./src/assets/css/main.css"],
    output: {
        path: path.resolve(__dirname, "docs"),
        filename: "app.js"
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './docs',
        hot: true
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
            { from: "src/manifest.json" },
            { from: "src/assets/img/", to: "assets/img" }
        ]),
        new webpack.HotModuleReplacementPlugin(),
    ]
};
