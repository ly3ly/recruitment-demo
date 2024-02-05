

/**
 * 服务器地址
 */
// export const serverUrl = "http://43.156.54.192";
// const serverIP = "127.0.0.1";
const serverIP = "43.156.54.192";
export const serverUrl = `http://${serverIP}`;
export const wsUrl = `ws://${serverIP}/echo`;

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

