const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const name2mime = require("name2mime");
const webpack = require("webpack");

const NODE_ENV = process.env.NODE_ENV;
const isDevMode = NODE_ENV === "development";
const basePath = resolve(__dirname, "./src");
const outputPath = resolve(__dirname, "./docs");

const config = {
  mode: NODE_ENV,
  context: basePath,
  devtool: isDevMode ? "eval" : false,
  entry: {
    app: "./app.ts",
  },
  output: {
    path: outputPath,
    filename: "[name].js",
    publicPath: "",
    assetModuleFilename: (pathData) => {
      const request = pathData.module.request.replace(/\\/g, "/");
      const extension = request.split(".").pop().toLowerCase();

      let contentType = name2mime(request).type.split("/").shift();

      const fonts = ["otf", "ttf", "woff", "woff2"];

      if (fonts.includes(extension)) {
        contentType = "font";
      }

      return `assets/${contentType}s[name][ext]`;
    },
  },
  devServer: {
    hot: true,
    open: true,
    port: 8000,
    client: {
      overlay: true,
    },
  },
  module: {
    rules: [
      {
        test: /\.ts$/i,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".ts"],
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "template.html",
      filename: "index.html",
      scriptLoading: "defer",
    }),
  ],
  optimization: {
    minimize: !isDevMode,
  },
};

module.exports = config;
