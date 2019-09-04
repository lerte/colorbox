import request from './request';

export const plugin = {
  install(wepy) {
    wepy.$reqest = request;
  },
};

export { request };

export * from './helpers';
