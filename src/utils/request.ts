import axios from 'axios';
import { message } from 'antd';
import CodeMsg from '@/assets/data/code';
import { BaseResponse } from '@/interfaces/base';

export const DEFAULT_TIP_MESSAGE = '请求失败，请刷新重试';

/**
 * 错误处理
 * @param data {Object} 请求返回的信息
 */
export function handleError(data: BaseResponse): void {
  const msg = CodeMsg[data.code] || data.msg || DEFAULT_TIP_MESSAGE;
  message.error(msg);
}

// create an axios instance
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  // timeout: 5000, // request timeout
});

// request interceptor
service.interceptors.request.use(
  config => {
    // 防止 GET 请求缓存GET
    if (config.method === 'get') {
      const t = new Date().getTime();
      config.params = config.params ? { ...config.params, t } : { t };
    }
    return config;
  },
  error => {
    // Do something with request error
    if (error.status === '504') {
      message.error('网关超时，请重试！');
    } else {
      message.error(`网络异常[-${error.status}]`);
      console.log(error); // for debug
    }
    Promise.reject(error);
  },
);

// response interceptor
service.interceptors.response.use(
  response => {
    const res = response.data;
    if (!res.success) {
      if (res.code === '1007') {
        // 登录失效
        window.location.href = '/';
        return;
      }
      handleError(res);
    }
    return res;
  },
  error => {
    handleError(error);
    console.log(`err${error}`); // for debug
    return Promise.reject(error);
  },
);

export default service;
