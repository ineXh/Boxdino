var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'src/client/public');
var APP_DIR = path.resolve(__dirname, 'src/client/app');

var config = {
  entry: './src/client/app/index.jsx', //APP_DIR + '/index.jsx', // //
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },
  resolve: {
    alias: {
      createjs: 'createjs/builds/1.0.0/createjs.js'
    }
  },
  module : {
    rules: [
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader?url=false' ]
      },
      {
        test : /\.jsx?/,
        include : APP_DIR, //'./src/client/app/',//APP_DIR,
        loader : 'babel-loader'
      },
      {
        test: /node_modules[/\\]createjs/,
        loaders: [
          'imports-loader?this=>window',
          'exports-loader?window.createjs'
        ]
      },
    ]
    ,
  },
  //debug: true,
  devtool: "#eval-source-map",
  plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
            },
            output: {
                comments: false,
            },
        }),
    ],
  /*externals: {
    "createjs": "createjs"
  }*/
};

module.exports = config;

