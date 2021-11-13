import { RequestConfig } from 'umi';

export const request: RequestConfig = {
  timeout: 1000,
  errorConfig: {
    adaptor: (resData) => {
      return {
        ...resData,
        success: resData.ok,
        errorMessage: resData.message,
        showType: 0
      };
    },
  },
  middlewares: [],
  requestInterceptors: [
    (url, options) => {
      return {
        url, options
      }
    }
  ],
  responseInterceptors: [
    response => {
      return response;
    }
  ],
};
