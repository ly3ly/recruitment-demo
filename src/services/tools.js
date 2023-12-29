

/**
 * 服务器地址
 */
export const serverUrl = "http://43.156.54.192:3000";

/**
 * 设置token
 * @param token
 * @returns
 */
export const setToken = (token) => sessionStorage.setItem("token", token);

/**
 * 获取token
 * @returns
 */
export const getToken = () => sessionStorage.getItem("token");

