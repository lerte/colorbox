const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');
const DefinePlugin = require('@wepy/plugin-define');

const isDev = process.env.NODE_ENV === 'development';

// dotenv
let mode = process.env.MODE;
if (!mode) {
  mode = process.env.NODE_ENV;
}
const commonEnv = dotenv.parse(fs.readFileSync(path.resolve(__dirname, `.env`)));
const specificEnv = dotenv.parse(fs.readFileSync(path.resolve(__dirname, `.env.${mode}`)));
let env = {
  ...commonEnv,
  ...specificEnv,
};
env = Object.entries(env).reduce((acc, [key, value]) => {
  acc[`process.env.${key}`] = JSON.stringify(value);
  return acc;
}, {});
env[`process.env.NODE_ENV`] = JSON.stringify(process.env.NODE_ENV);

module.exports = {
  wpyExt: '.vue',
  eslint: true,
  cliLogs: isDev,
  build: {},
  resolve: {
    alias: {
      '@': path.join(__dirname, 'src'),
    },
    aliasFields: ['wepy', 'weapp'],
    modules: ['node_modules'],
  },
  compilers: {
    babel: {
      sourceMap: true,
      presets: ['@babel/preset-env'],
      plugins: ['@wepy/babel-plugin-import-regenerator'],
    },
    sass: {
      outputStyle: isDev ? 'compressed' : 'nested',
    },
    postcss: {
      plugins: [
        require('postcss-import'),
        require('tailwindcss'),
        require('postcss-preset-env')({
          stage: 2,
        }),
        require('cssnano')({
          preset: 'default',
        }),
        ...(isDev
          ? []
          : [
              require('@fullhuman/postcss-purgecss')({
                // Specify the paths to all of the template files in your project
                content: [`./src/@(pages|components)/**/*.@(vue|wpy|html)`],

                // Include any special characters you're using in this regular expression
                defaultExtractor(content) {
                  const contentWithoutStyleBlocks = content.replace(/<style[^]+?<\/style>/gi, '');
                  return contentWithoutStyleBlocks.match(/[A-Za-z0-9-_/:]*[A-Za-z0-9-_/]+/g) || [];
                },

                whitelist: ['html', 'body'],
                whitelistPatterns: [/^ant-/],
              }),
            ]),
      ],
    },
  },
  plugins: [DefinePlugin(env)],
  appConfig: {
    noPromiseAPI: ['createSelectorQuery'],
  },
};
