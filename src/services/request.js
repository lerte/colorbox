import wepy from '@wepy/core';
import Toast from 'vant-weapp/lib/toast/toast';

import login, { LOGIN_AUTH_KEY } from './login';
import { validateResponse } from './helpers';

const defaultDataTransformer = data => data;

export default async (config = {}) => {
  if (typeof config === 'string') {
    config = {
      url: config,
    };
  }

  const {
    transformData = true,
    __needValidation = true,
    __needAuth = true,
    __showError = true,
    __showIndicator = true,
    __showLoading = false,
    ...requestConfig
  } = config;

  if (__needAuth) {
    try {
      await wepy.wx.checkSession();
    } catch (error) {
      await login();
    }

    const token = wepy.wx.getStorageSync(LOGIN_AUTH_KEY);

    if (!token) {
      await login();
    }

    requestConfig.data = requestConfig.data || {};
    requestConfig.data.token = token;
  }

  if (__showIndicator) {
    wepy.wx.showNavigationBarLoading();
  }

  if (__showLoading) {
    let loadingConfig = {
      duration: 0,
    };

    if (typeof __showLoading === 'object') {
      loadingConfig = {
        ...__showLoading,
        ...loadingConfig,
      };
    } else if (typeof __showLoading === 'string') {
      loadingConfig.message = __showLoading;
    } else {
      loadingConfig.text = '加载中...';
    }

    Toast.loading(loadingConfig);
  }

  try {
    let data;

    const requestTask = wepy.wx.request(requestConfig);

    const response = await requestTask;
    if (__needValidation) {
      data = validateResponse(response, requestConfig);
    } else {
      data = response.data;
    }

    if (typeof transformData === 'function') {
      data = transformData(response.data);
    } else if (transformData === true) {
      data = defaultDataTransformer(response.data);
    }

    return data;
  } catch (error) {
    console.error(error);

    if (__showError) {
      let errorConfig = {
        duration: 2000,
        mask: true,
      };

      if (typeof __showError === 'object') {
        errorConfig = {
          ...__showError,
          ...errorConfig,
        };
      } else if (typeof __showError === 'string') {
        errorConfig.text = __showError;
      } else {
        errorConfig.text = error.message;
      }

      Toast.fail(errorConfig);
    } else {
      throw error;
    }
  } finally {
    if (__showIndicator) {
      wepy.wx.hideNavigationBarLoading();
    }

    if (__showLoading) {
      Toast.clear();
    }
  }
};
