import axios from "axios";
// @ts-ignore
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { getToken } from './tools';

const instance = axios.create({
  // baseURL: serverUrl, // 请求的基础地址
  timeout: 5000,
  withCredentials: false,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': getToken()
  }
});

// Add a request interceptor，发起请求之前执行
// instance.interceptors.request.use(
//     function (config) {
//         // Do something before request is sent
//         // @ts-ignore
//         config.headers.token = getToken();
//         NProgress.start(); // 启动loading
//         return config;
//     },
//     function (error) {
//         // Do something with request error
//         return Promise.reject(error);
//     }
// );

// Add a response interceptor，请求返会之后执行
// instance.interceptors.response.use(
//   function (response) {
//     // Any status code that lie within the range of 2xx cause this function to trigger
//     // Do something with response data
//     NProgress.done();
//     return response;
//   },
//   function (error) {
//     NProgress.done(); // 关闭loading
//     // Any status codes that falls outside the range of 2xx cause this function to trigger
//     // Do something with response error
//     return Promise.reject(error);
//   }
// );

import { useNavigate } from "react-router-dom";

instance.interceptors.response.use(
  function (response) {
    // Any status code that lies within the range of 2xx will trigger this function
    // Do something with the response data
    NProgress.done(); // Finish any progress indicator, e.g., loading bar
    return response;
  },
  function (error) {
    NProgress.done(); // Finish any progress indicator, e.g., loading bar

    // Check if the error status code is 401 (Unauthorized) indicating token expiration
    if (error.response && error.response.status === 401) {
      // Redirect to the login page
      const navigate = useNavigate();
      navigate('/');
    }

    // Any status codes that fall outside the range of 2xx will trigger this function
    // Do something with the response error
    return Promise.reject(error);
  }
);

/**
 * get请求
 * @param url     地址
 * @param params  参数
 * @returns
 */
export const get = (url, params) =>
  instance.get(url, {
    params, withCredentials: true, headers: {
      'Content-Type': 'application/json',
      'Authorization': getToken()
    }
  }).then((res) => res.data);

/**
 * post请求
 * @param url   地址
 * @param data  参数
 * @returns
 */
export const post = (url, data) =>
  instance.post(url, data, {
    withCredentials: true, headers: {
      'Content-Type': 'application/json',
      'Authorization': getToken()
    }
  }).then((res) => res.data);

/**
 * put请求
 * @param url   地址
 * @param data  参数
 * @returns
 */
export const put = (url, data) =>
  instance.put(url, data, {
    withCredentials: true, headers: {
      'Content-Type': 'application/json',
      'Authorization': getToken()
    }
  }).then((res) => res.data);

/**
 * patch请求
 * @param url   地址
 * @param data  参数
 * @returns
 */
export const patch = (url, data) =>
  instance.patch(url, data, {
    withCredentials: true, headers: {
      'Content-Type': 'application/json',
      'Authorization': getToken()
    }
  }).then((res) => res.data);

/**
 * delete请求
 * @param url   地址
 * @returns
 */
export const del = (url) =>
  instance.delete(url, {
    withCredentials: true, headers: {
      'Content-Type': 'application/json',
      'Authorization': getToken()
    }
  }).then((res) => res.data);

export const httpMethods = new Map([
  ["GET", (url, data) => get(url, data)],
  ["POST", (url, data) => post(url, data)],
  ["PUT", (url, data) => put(url, data)],
  ["DELETE", (url, data) => del(url, data)],
]);

// httpMethods.set('GET', (url, data) => {
//     return get(url, data);
// });

// httpMethods.set('POST', (url, data) => {
//     return post(url, data);
// });

// httpMethods.set('DELETE', (url, data) => {
//     return del(url, data);
// });

// httpMethods.set('PUT', (url, data) => {
//     return put(url, data);
// });
