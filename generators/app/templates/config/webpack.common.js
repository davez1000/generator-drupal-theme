const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlWebpackHarddiskPlugin = require("html-webpack-harddisk-plugin");
const paths = require("./paths");

module.exports = {
  entry: path.resolve(paths.srcDir, "javascript/index.js"),

  output: {
    filename: "bundle.js",
    path: path.resolve(paths.rootDir, "javascript"),
    publicPath: "/themes/custom/<%= sanitizedName %>/javascript/"
  },

  resolve: {
    extensions: [".webpack.js", ".web.js", ".js"]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(paths.srcDir, "html.html.twig"),
      filename: path.resolve(paths.templatesDir, "layout/html.html.twig"),
      inject: "body",
      alwaysWriteToDisk: true
    }),

    // Support for alwaysWriteToDisk config in HtmlWebpackPlugin
    new HtmlWebpackHarddiskPlugin()
  ],

  module: {
    rules: [
      // {
      //   enforce: "pre",
      //   test: /\.js$/,
      //   use: [
      //     { loader: "eslint-loader", options: { emitWarning: true } },
      //     "source-map-loader"
      //   ],
      //   include: path.resolve(paths.srcDir, "javascript")
      // },

      {
        test: /\.js$/,
        include: path.resolve(paths.srcDir, "javascript"),
        use: ["babel-loader"]
      },

      // Image loading. Inlines small images as data URIs (i.e. < 10k).
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        loader: "url-loader",
        options: {
          name: "images/[name].[hash].[ext]",
          limit: 10000
        }
      },

      // Font loading
      {
        test: /\.(eot|ttf|woff2?)$/,
        loader: "file-loader",
        options: {
          name: "fonts/[hash].[ext]"
        }
      },

      {
        test: /\.(css|scss)$/,
        use: [
          "style-loader",
          "css-loader",
          // PostCSS must come after style and css loaders but before SASS loader
          {
            loader: "postcss-loader",
            options: {
              ident: "postcss",
              plugins: loader => [require("autoprefixer")()]
            }
          },
          "sass-loader"
        ]
      }
    ]
  }
};
