const path = require("path");

const webpack = require("webpack");
const merge = require("webpack-merge");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");

const common = require("./webpack.common.js");

module.exports = merge(common, {

  "devtool": "source-map",

  "plugins": [
    new HtmlWebpackPlugin({
      "filename": "index.html",
      "template": path.join(__dirname, "/template/index.html"),
      "inject": "head",
    }),

    new webpack.optimize.CommonsChunkPlugin({ "name": "vendor", "chunks": [ "material", "react", "redux", "vendor" ] }),
    new webpack.optimize.CommonsChunkPlugin({ "name": "runtime" }),
    new webpack.optimize.CommonsChunkPlugin({ "name": "manifest" }),
    new webpack.HashedModuleIdsPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new CompressionPlugin({
      "test": /\.(js|jsx|css|html)$/,
    }),
  ],

  // the entry file for the bundle
  "entry": {
    "bundle": path.join(__dirname, "/client/src/app.jsx"),
    "material": [
      "material-ui",
    ],
    "react": [
      "react",
      "react-document-title",
      "react-dom",
      "react-router-dom",
      "react-table",
      "react-to-print",
      "react-select-plus",
      "react-svg",
    ],
    "vendor": [
      "axios",
      "lodash",
      "prop-types",
    ],
  },

});
