module.exports = {
  prefix: 'tw-',
  separator: '_',
  important: true,

  theme: {
    width: theme => ({
      auto: 'auto',
      ...theme('spacing'),
      full: '100%',
      screen: '100vw',
    }),

    extend: {},
  },

  variants: [],

  plugins: [],

  corePlugins: [
    'alignContent',
    'alignItems',
    'alignSelf',
    'alignContent',
    'appearance',
    'backgroundAttachment',
    'backgroundColor',
    'backgroundPosition',
    'backgroundRepeat',
    'backgroundSize',
    'borderCollapse',
    'borderColor',
    'borderRadius',
    'borderStyle',
    'borderWidth',
    'boxShadow',
    'display',
    'flex',
    'flexDirection',
    'flexGrow',
    'flexShrink',
    'flexWrap',
    'fontSize',
    'fontStyle',
    'fontWeight',
    'justifyContent',
    'margin',
    'opacity',
    'outline',
    'padding',
    'position',
    'textAlign',
    'textColor',
    'textDecoration',
    'height',
    'width',
  ],
};
