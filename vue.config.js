// https://cli.vuejs.org/config/
module.exports = {
  outputDir: "docs",
  publicPath:
    process.env.NODE_ENV === "production" ? "/itunes-artwork-finder" : "/",
  devServer: {
    port: 8000,
  },
  transpileDependencies: ["vuetify"],
};
