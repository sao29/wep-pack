// const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin')
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const CopyPlugin = require('copy-webpack-plugin');

// module.exports = {
//   // Entry nos permite decir el punto de entrada de nuestra aplicación
//   entry: "./src/index.js",
//   // Output nos permite decir hacia dónde va enviar lo que va a preparar webpacks
//   output: {
//     // path es donde estará la carpeta donde se guardará los archivos
//     // Con path.resolve podemos decir dónde va estar la carpeta y la ubicación del mismo
//     path: path.resolve(__dirname, "dist"),
//     // filename le pone el nombre al archivo final
//     filename: "main.js"
//   },
//   resolve: {
//     extensions: ['.js'] // LOS ARCHIVOS QUE WEBPACK VA A LEER
// },
// module: {
//     // REGLAS PARA TRABAJAR CON WEBPACK
//     rules : [
//         {
//             test: /\.m?js$/, // LEE LOS ARCHIVOS CON EXTENSION .JS,
//             exclude: /node_modules/, // IGNORA LOS MODULOS DE LA CARPETA
//             use: {
//                 loader: 'babel-loader'
//             }
//         },
//         {
//           test: /\.css|\.styl$/i,
//           use: [
//             MiniCssExtractPlugin.loader,
//             "css-loader",
//             'stylus-loader'
//           ],
//         },
//         {
//           test: /\.png/,
//                 type: 'asset/resource'
//               }
//     ]
// },
//   // SECCION DE PLUGINS
//   plugins: [
//     new HtmlWebpackPlugin({ // CONFIGURACIÓN DEL PLUGIN
//         inject: true, // INYECTA EL BUNDLE AL TEMPLATE HTML
//         template: './public/index.html', // LA RUTA AL TEMPLATE HTML
//         filename: './index.html' // NOMBRE FINAL DEL ARCHIVO
//     }),
//     new CopyPlugin({
//       patterns: [
//         {
//           from: path.resolve(__dirname, "src", "assets/images"),
//           to: "assets/images"
//         }
//       ]
//     }),
//   ]
// }

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
  },
  resolve: {
    extensions: ['.js'],
    alias: {
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@templates': path.resolve(__dirname, 'src/templates'),
      '@styles': path.resolve(__dirname, 'src/styles'),
      '@images': path.resolve(__dirname, 'src/assets/images'),
    },
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css|.styl$/i,
        use: [MiniCssExtractPlugin.loader,
          'css-loader',
          'stylus-loader'
        ],
      },
      {
        test: /\.png/,
        type: 'asset/resource'
      },
      {
        test: /\.(woff|woff2)$/,
        use: {
          loader: "url-loader",
          options: {
            // limit => limite de tamaño
            limit: 10000,
            // Mimetype => tipo de dato
            mimetype: "application/font-woff",
            // name => nombre de salida
            name: "[name].[contenthash].[ext]",
            // outputPath => donde se va a guardar en la carpeta final
            outputPath: "./assets/fonts/",
            publicPath: "../assets/fonts/",
            esModule: false,
          }
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: './public/index.html',
      filename: './index.html'
    }),
    new MiniCssExtractPlugin({
      filename: 'assets/[name].[contenthash].css'
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "src", "assets/images"),
          to: "assets/images"
        }
      ]
    }),
    new Dotenv(),
    new CleanWebpackPlugin(),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin(),
      new TerserPlugin()
    ]
  }
}