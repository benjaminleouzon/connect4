import webpack from 'webpack';
import path from 'path';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';

const SRC_DIR = path.resolve(__dirname, 'src/');
const BUILD_DIR = path.resolve(__dirname, 'dist/');

export default {
	cache: true,
  entry: `${SRC_DIR}/main.js`,
  output: {
    path: BUILD_DIR,
    filename: 'connect4.js'
  },
  resolve: {
    modules: ['node_modules', 'src'],
    extensions: ['.js']
  },
  plugins: [
    new HtmlWebpackPlugin({
    	template: `${SRC_DIR}/index.html`,
    }),
    new ExtractTextPlugin('style.css'),
    new CopyWebpackPlugin([{ from: 'src/assets', to: 'assets' }])
  ],
  module : {
    rules : [{
      test : /\.js?/,
      include : SRC_DIR,
      loader : 'babel-loader'
    }, {
      test: /\.less$/,
      loader: ExtractTextPlugin.extract({
        use: ['css-loader', 'less-loader']
      })
    }]
  }
};

