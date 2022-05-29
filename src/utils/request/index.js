import axios from 'axios';
import qs from 'qs';
import { debounce } from 'lodash-es';
import store from '@/store';
import {
  baseURL,
  timeout,
  responseSuccessCode,
  tokenName,
  tokenPrefix,
} from '@/configs/request';
import { binaryParser } from '@/utils';
import adapter from './adapter';
import { toast, loading } from '@/utils/modal';
import { handleLogin, requestConsoles, responseConsoles } from './helper';

axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8';

const service = axios.create({
  baseURL,
  timeout,
  adapter,
});

const handleLoading = loading('加载中, 请稍后...');

// 请求拦截
service.interceptors.request.use(
  (request) => {
    requestConsoles(request);

    const showLoading = request.showLoading;
    if (showLoading) {
      // 开启加载动画
      handleLoading.start();
    }

    const token = store.getters.token;
    if (token) request.headers[tokenName] = tokenPrefix + token;

    // 解决query无法传递数组的问题
    request.paramsSerializer = (params) => qs.stringify(params, {
      arrayFormat: 'repeat',
    });

    return request;
  },
  (error) => Promise.reject(error),
);

const closeLoading = debounce(handleLoading.end, 500);
// 响应拦截
service.interceptors.response.use(
  async (response) => {
    responseConsoles(response);

    const showLoading = response.config.showLoading;
    if (showLoading) {
      // 关闭加载动画
      closeLoading();
    }

    let res = response.data;
    // 文件二进制流响应全部数据（PS:文件名在请求头中）
    if (response.request && response.request.responseType === 'blob') {
      res = await binaryParser(response);
    }

    if (
      res.code === '1005'
      || res.code === '1006'
      || res.code === '1000'
      || (res.code === '1010' && response.config.url.indexOf('/login') === -1)
    ) {
      handleLogin(res);
    } else if (res.code !== responseSuccessCode && res.message) {
      toast(res.message, {
        type: 'warning',
        duration: 5 * 1000,
      });
    } else {
      return res;
    }
    return Promise.resolve(res);
  },
  (error) => {
    console.log(`err${error}`); // for debug
    const status = error.response.status;

    if (status === 401 || status === 403) {
      handleLogin();
    } else {
      toast(error.message, {
        type: 'error',
        duration: 5 * 1000,
      });
      return Promise.reject(error);
    }
  },
);

// todo
// service.postForm = (url, data, options) => service.post(url, qs.stringify(data), {
//   ...options,
//   headers: {
//     'Content-Type': 'application/json;charset=utf-8', // 'application/x-www-form-urlencoded',
//   },
// });

export const FormDataPost = (url, params) => new Promise((resolve, reject) => {
  url = filterApi(url);
  _axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=utf-8';
  delete _axios.defaults.responseType;
  _axios.post(url, qs.stringify(params))
    .then((res) => {
      resolve(res.data);
    })
    .catch((err) => {
      _error(err);// 通用错误提示
      reject(err.data);// 特定界面错误处理
    });
});
// 文件格式post，上传图片，文件等
export const FilePost = (url, params) => new Promise((resolve, reject) => {
  url = filterApi(url);
  _axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
  delete _axios.defaults.responseType;
  _axios.post(url, params)
    .then((res) => {
      resolve(res.data);
    })
    .catch((err) => {
      _error(err);// 通用错误提示
      reject(err.data);// 特定界面错误处理
    });
});
// 返回格式为文件流，如导出excle文件流。
export const BlobPost = (url, params) => new Promise((resolve, reject) => {
  url = filterApi(url);
  _axios.defaults.headers.post['Content-Type'] = 'application/json; charset=UTF-8';
  _axios.defaults.responseType = 'blob';
  _axios.post(url, JSON.stringify(params))
    .then((res) => {
      resolve(res.data);
    })
    .catch((err) => {
      _error(err);// 通用错误提示
      reject(err.data);// 特定界面错误处理
    });
});
// get请求，这里注意和axios.get和axios.post请求参数格式的区别写法post{},get{params:{}}
export const get = (url, params) => new Promise((resolve, reject) => {
  url = filterApi(url);
  delete _axios.defaults.responseType;
  _axios.get(url, { params })
    .then((res) => {
      resolve(res.data);
    })
    .catch((err) => {
      _error(err);// 通用错误提示
      reject(err.data);// 特定界面错误处理
    });
});

export default service;
