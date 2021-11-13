import axios from 'axios'

/**
 * @author Chen Q.
 * @abstract 封装axios
 * @param config
 * @returns {Promise<unknown>}
 */
export function request(config) {
  return new Promise((resolve, reject) => {

    //创建axios实例
    const instance = axios.create({
      baseURL: "/api",
      timeout: 10000,
      headers: {
        "Content-Type": 'application/json;charset=utf-8'
      }
    })

    //请求拦截器
    instance.interceptors.request.use(config => {
      return config;
    }, err => {
      return err;
    });

    //响应拦截器
    instance.interceptors.response.use(res => {
      //如果头部附带token，则将token刷新
      return res.data;
    }, err => {
      if (err && err.response) {
        switch (err.response.status) {
          case 400:
            err.message = "请求出错";
            break;
          case 401:
            err.message = "授权失败，请重新登录";
            break;
          case 403:
            err.message = "拒绝访问";
            break;
          case 404:
            err.message = "请求错误，未找到该资源";
            break;
          case 500:
            err.message = "服务器错误";
            break;
        }
      } else {
        err.message = "连接服务器失败";
      }
      console.log(err);
      return err;
    });

    instance(config)
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}


