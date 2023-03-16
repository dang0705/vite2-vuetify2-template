import axios from 'axios';
import env from '@utils/get-server-env-file';

let gotEnv = false;
const statusCodes = {
  OK: 200,
  NotFound: 404,
  BindFail: 500
};
const httpErrorMessage = {
  default: '操作失败',
  response: '服务器繁忙',
  request: '请求失败',
  unknown: '未知错误',
  noEnvJson: '加载 "env.json" 时出错, 请联系后端或者运维人员'
};

const http = axios.create({
  baseURL: '/api'
});

const errorHandler = ({ msg, code }) => useBus.emit('err', msg, code);

http.interceptors.request.use(
  async (config) => {
    if (!_isDev_ && !gotEnv) {
      try {
        await env(config);
      } catch (e) {
        errorHandler({ msg: httpErrorMessage.noEnvJson });
      } finally {
        gotEnv = true;
      }
    }
    useBus.emit('loading', true);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

http.interceptors.response.use(
  (response) => {
    useBus.emit('loading', false);
    const {
      data: { code, data }
    } = response;
    if (code && code === statusCodes.OK) {
      return Promise.resolve(data);
    }
  },
  (error) => {
    errorHandler({ msg: '服务器繁忙，请稍后' });
    useBus.emit('loading', false);
    return Promise.reject(error);
  }
);

export default {
  install(app) {
    app.prototype.$http = http;
  }
};
export const $http = http;
