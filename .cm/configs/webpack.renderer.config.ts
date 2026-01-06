import path from 'path';
import type { Configuration } from 'webpack';

import { rules } from './webpack.rules';
import { plugins } from './webpack.plugins';

const CopyWebpackPlugin = require('copy-webpack-plugin');

rules.push({
  test: /\.css$/,
  use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
});

const assets = ['img', "icons", "keyrune"]; // asset directories
assets.forEach((dir: string) =>
  plugins.push(new CopyWebpackPlugin({patterns: [
    {
      from: path.resolve(__dirname, '../../assets', dir),
      to: path.resolve(__dirname, '../../.webpack/renderer/assets', dir)
    }]})
  ));

export const rendererConfig: Configuration = {
  module: {
    rules,
  },
  devServer: {
    hot: false
  },
  plugins,
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css'],
  },
};
