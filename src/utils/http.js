import Taro from "@tarojs/taro";
import { baseUrl } from "./consts";

// const token = () => {
//   let data = Taro.getStorageSync("weapp_token");
//   return data;
// };

const interceptor = function(chain) {
  const requestParams = chain.requestParams;
  const { method, data, url } = requestParams;
  console.log(`http ${method || "GET"} --> ${url} data: `, data);
  return chain.proceed(requestParams).then(res => {
    console.log(`http <-- ${url} result:`, res);
    return res;
  });
};

Taro.addInterceptor(interceptor);
Taro.addInterceptor(Taro.interceptors.logInterceptor);
Taro.addInterceptor(Taro.interceptors.timeoutInterceptor);

const http = ({ url = "", params, ...other } = {}) => {
  Taro.showLoading({
    title: "加载中"
  });

  return new Promise(resolve => {
    Taro.request({
      url: `${baseUrl}${url}`,
      data: {
        ...params
        // _t: token()
      },
      ...other
    }).then(res => {
      if (res.data.errorCode === 0) {
        Taro.hideLoading();
        resolve(res.data);
      } else {
        Taro.hideLoading();
        resolve(res.data);
      }
    });
  });
};

const login = () => {
  Taro.login().then(res => {
    Taro.request({
      url: `${baseUrl}/login`,
      method: "POST",
      data: {
        code: res.code
      }
    }).then(result => {
      console.log(result);
    });
  });
};

export default {
  login,
  get(url, params = {}) {
    return http({
      url,
      params
    });
  },
  post(url, params = {}) {
    return http({
      url,
      params,
      method: "POST"
    });
  }
};

// export default http;
