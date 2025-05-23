const webpack = require("webpack");
const webpackMerge = require("webpack-merge").merge;
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WorkboxPlugin = require("workbox-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const sass = require("sass");
const postcssRTLCSS = require("postcss-rtlcss");

const utils = require("./utils.js");
const commonConfig = require("./webpack.common.js");

const ENV = "development";

module.exports = async () =>
  webpackMerge(await commonConfig({ env: ENV }), {
    // devtool: 'source-map', // Enable source maps. Please note that this will slow down the build
    mode: ENV,
    entry: {
      main: "./src/main/webapp/app/index",
    },
    output: {
      path: utils.root("target/classes/static/"),
      filename: "[name].[contenthash:8].js",
      chunkFilename: "[name].[chunkhash:8].chunk.js",
    },
    module: {
      rules: [
        {
          test: /\.(sa|sc|c)ss$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                publicPath: "../",
              },
            },
            {
              loader: "css-loader",
              options: { url: false },
            },
            {
              loader: "postcss-loader",
              options: {
                postcssOptions: {
                  plugins: [postcssRTLCSS()],
                },
              },
            },
            {
              loader: "sass-loader",
              options: { implementation: sass },
            },
          ],
        },
      ],
    },
    optimization: {
      moduleIds: "named",
    },
    plugins: [
      // new MiniCssExtractPlugin({
      //   // Options similar to the same options in webpackOptions.output
      //   filename: "content/[name].[contenthash].css",
      //   chunkFilename: "content/[name].[chunkhash].css",
      // }),
      new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false,
      }),
      new WorkboxPlugin.GenerateSW({
        clientsClaim: true,
        skipWaiting: true,
      }),
    ],
  });
