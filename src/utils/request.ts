import axios from "axios";
import setting from "../setting";
export default function createInstance(baseURL) {
  /**
   * @description 创建请求实例
   */
  const instance = axios.create({
    //默认请求地址，根据环境的不同可在.env 文件中进行修改
    baseURL,
    // baseURL: import.meta.env.VITE_APP_AXIOS_BASE_URL,
    //设置接口访问超时时间
    timeout: setting.network.requestTimeout,
    //配后端数据的接收方式
    headers: {
      "Content-Type": setting.network.contentType,
    },
  });

  /**
   * @description 请求拦截器
   */
  instance.interceptors.request.use(
    (config) => {
      /**
       * 按需从stroe从拿去token并在请求时携带
       */
      // const UserStore = useUserStore();
      // if (UserStore.token) {
      //     config.headers.token = UserStore.token;
      // }
      return config;
    },
    (error) => {
      // 请求错误,进行全局提示框使用
      return Promise.reject(error);
    },
  );

  /**
   * @description 响应拦截器
   */
  instance.interceptors.response.use(
    (response) => {
      /**
       * 进行相应的全局提示
       */
      return response;
    },
    (error) => {
      console.error(error);
    },
  );
  return instance;
}
