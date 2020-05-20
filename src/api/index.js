// import Vue from 'vue'
import auth from "../utils/auth.js";
import axios from "axios";
import router from "../router/index.js";
import JSONBIGINT from "json-bigint";

axios.defaults.baseURL = "http://ttapi.research.itcast.cn/mp/v1_0/";

// 请求拦截器
axios.interceptors.request.use(
  function(config) {
    const user = auth.getUser();
    if (user.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }

    return config;
  },
  function(error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
axios.interceptors.response.use(
  response => {
    // 对响应数据做点什么
    return response;
  },
  error => {
    if (error.response && error.response.status === 401) {
      router.push("/login");
    }
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);

// 转换响应结果 ， 处理最大安全数值

axios.defaults.transformResponse = [
  data => {
    try {
      return JSONBIGINT.parse(data);
    } catch (e) {
      return data;
    }
  }
];
export default axios;
