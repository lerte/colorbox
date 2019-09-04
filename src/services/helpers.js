import isPlainObject from 'lodash/isPlainObject';

export const log = message => {
  if (process.env.NODE_ENV === 'development') {
    console.log(message);
  }
};

export const validateResponse = response => {
  if (!isPlainObject(response)) {
    return response;
  }

  const { code = 200, message = '未知错误', ...rest } = response;
  switch (`${code}`) {
    case '200':
      return rest;

    default: {
      throw new Error(message);
    }
  }
};

export const validateStatus = ({ statusCode }) => {
  return `服务异常: ${statusCode}`;
};
