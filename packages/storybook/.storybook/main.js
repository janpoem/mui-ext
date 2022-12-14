const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
const { resolve } = require('path');

module.exports = {
  core       : {
    builder: 'webpack5'
  },
  'stories'  : [
    '../src/**/*.stories.mdx',
    '../src/**/*.stories.@(js|jsx|ts|tsx)'
  ],
  'addons'   : [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    {
      name   : 'storybook-addon-swc',
      options: {
        enable: process.env.BUILD_TOOL === 'swc'
      }
    }
  ],
  // typescript: {
  //   reactDocgen: 'react-docgen-typescript',
  //   reactDocgenTypescriptOptions: {
  //     compilerOptions: {
  //       // allowSyntheticDefaultImports: false,
  //       // esModuleInterop: false,
  //     },
  //   }
  // },
  'framework': '@storybook/react',
  managerWebpack(config) {
    config.plugins.push(new SpeedMeasurePlugin());
    return config;
  },
  webpackFinal(config) {
    config.plugins.push(new SpeedMeasurePlugin());
    config.resolve.alias['@mui-ext/core'] = resolve('../core/src');
    return config;
  }
};
