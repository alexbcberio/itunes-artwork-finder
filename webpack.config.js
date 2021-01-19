const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const JsonMinimizerPlugin = require('json-minimizer-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require("path");
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const webpack = require('webpack');

const devMode = process.env.NODE_ENV === "development";
const outDir = "docs";

const webpackConfig = {
    mode: devMode ? "development" : "production",
    entry: ["./src/index.js", "./src/scss/main.scss"],
    output: {
        path: path.resolve(__dirname, outDir),
        filename: "app.js",
        publicPath: "",
        assetModuleFilename: (pathData) => {
            const request = pathData.module.request.replace(/\\/g, "/");
            const extension = request
                .split(".")
                .pop();

            let contentType;
            switch(extension.toLowerCase()) {
                case "otf":
                case "ttf":
                case "woff":
                case "woff2":
                    contentType = "fonts";
                    break;
                case "apng":
                case "gif":
                case "jpeg":
                case "jpg":
                case "png":
                case "svg":
                case "webp":
                    contentType = "images";
                    break;
                default:
                    contentType = "other";
            }

            return `assets/${contentType}/[name][ext]`;
        }
    },
    devServer: {
        compress: true,
        contentBase: `./${outDir}`,
        hot: true,
        open: false,
        overlay: true,
        port: 8001
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
            }, {
                test: /\.(woff2?|svg)$/i,
                type: 'asset/resource'
            }
        ],
    },
    plugins: [
        new webpack.ProgressPlugin(),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: './index.html',
            scriptLoading: "defer"
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css',
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: "static/manifest.json" },
                { from: "static/img/", to: "assets/images" },
                { from: "src/serviceworker.js" }
            ]
        }),
        new VueLoaderPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],
    optimization: {
        minimize: !devMode,
        minimizer: [
            "...",
            new CssMinimizerPlugin({
                sourceMap: devMode
            }),
            new JsonMinimizerPlugin()
        ]
    }
};

if (devMode) {
    webpackConfig.devtool = "inline-source-map";

    if (!process.argv.includes("--watch")) {
        const browserSync = new BrowserSyncPlugin({
            host: "localhost",
            port: "8000",
            proxy: "http://localhost:8001"
        }, {
            reload: false
        });
        webpackConfig.plugins.push(browserSync);
    }
}

module.exports = webpackConfig;