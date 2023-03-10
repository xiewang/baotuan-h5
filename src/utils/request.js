import axios from 'axios';
import { Toast } from 'antd-mobile';
import { getToken, removeToken } from "./auth";

// create an axios instance
const service = axios.create({
    baseURL: (process.env.NODE_ENV === 'development')
        && 'http://localhost:8080/'
        || 'http://39.105.139.200:8080/',
    timeout: 65000
})

axios.defaults.withCredentials = false

// request interceptor
service.interceptors.request.use(
    config => {
        if (getToken()) {
            config.headers.common['X-Auth-Token'] = getToken();
        }
        if (!config.headers['Content-Type']) {
            config.headers['Content-Type'] = 'application/json';
        }
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

// response interceptor
service.interceptors.response.use(
    response => {
        const responseData = response.data;
        const state = responseData.state;
        let headers = response.headers
        let token = headers['x-auth-token'] || ''
        if (token) {
            response.data.token = token;
        }
        if (state === 'REJECTED') {
            // 清除cookie，重新登录
            removeToken();
            window.location.href = '/login';

        }
        if (state !== 'SUCCESS') {
            Toast.show({
                icon: 'fail',
                content: responseData.resultErrorMessage || responseData.error.message || '请求失败',
            });
            return Promise.resolve(response || 'Error');
        } else {
            return response;
        }
    },
    error => {

        if ((error && error.response && (error.response.status === 403 || error.response.status === 401))
            && error.response.data.path !== '/user/logout') {
            // 清除cookie，重新登录
            removeToken();
            window.location.href = '/login';
        }
        if ((error && error.response && error.response.status === 500)
            && error.response.data.path !== '/user/logout') {
            window.location.href = '/500';
        }
        Toast.show({
            icon: 'fail',
            content: error.message || '请求失败',
        });
        return Promise.reject(error);
    }
)

export default service;