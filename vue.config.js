/* eslint-disable no-console */
const path = require("path");

let productionFlag = process.env.NODE_ENV === "production";
let publicPath = productionFlag
  ? typeof process.env.publicPath === "undefined"
    ? ""
    : process.env.publicPath
  : "";
const commandName = process.argv[2];
if (commandName !== "lint") {
  console.log(`productionFlag=${productionFlag}`);
  console.log(`publicPath=${publicPath}`);
}

function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  publicPath,
  runtimeCompiler: !productionFlag,
  productionSourceMap: false,
  configureWebpack: config => {
    if (productionFlag) {
      //
    } else {
      config.devtool = "source-map";
    }
  },
  lintOnSave: !productionFlag,
  chainWebpack: config => {
    config.plugin("yn-webpack-plugin").use(require("yn-webpack-plugin"));
    if (process.env.use_analyzer) {
      config
        .plugin("webpack-bundle-analyzer")
        .use(require("webpack-bundle-analyzer").BundleAnalyzerPlugin);
    }
    config
      .plugin("moment-locales-webpack-plugin")
      .use(require("moment-locales-webpack-plugin"), [
        { localesToKeep: ["zh-cn"] }
      ]);
    config.module
      .rule("html-loader")
      .test(/\.html$/)
      .use("html-loader")
      .loader("html-loader")
      .end();
    config.resolve.alias.set("vue$", "vue/dist/vue.esm.js");
    if (productionFlag) {
      config.optimization.splitChunks({
        maxSize: 700000,
        minSize: 300000,
        maxInitialRequests: 6,
        chunks: chunk =>
          require("yn-webpack-plugin").customFilter(chunk, "all"),
        cacheGroups: {
          YnP1: {
            name: "vendor-ynp1",
            test: /[\\/]node_modules[\\/]_?yn-p1/,
            priority: 90
          },
          default: {
            minChunks: 2,
            priority: -20
          }
        }
      });
    }
  },
  transpileDependencies: ["ant-design-vue", "vue-echarts", "resize-detector"],
  css: {
    loaderOptions: {
      less: {
        modifyVars: require(resolve("src/themes/themeLoader")),
        javascriptEnabled: true
      }
    }
  },


  devServer: {
    proxy: {
      '/mdd': {
        target: 'http://localhost:8080',
        
      },
    }
  }
};
