const path = require("path");
module.exports = {
  entry: "./static/js/algomobile.js",
  module: {
    rules: [
      {
        test: /\.tsx?/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  output: {
    filename: "bundle.js",
    path: path.resolve("static", "admin", "..", "files", "..", "public"),
  },
  resolve: {
    alias: {
      node_modules: path.join(__dirname, "node_modules"),
    },
    extensions: [".ts", ".js"],
    fallback: {
      crypto: require.resolve("crypto-browserify"),
      stream: require.resolve("stream-browserify"),
    },
  },
  experiments: {
    topLevelAwait: true,
  },
};
