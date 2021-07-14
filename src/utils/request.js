import axios from 'axios';
import { Toast } from 'antd-mobile';
import { getToken } from "./auth";

// create an axios instance
const service = axios.create({
    baseURL: (process.env.NODE_ENV === 'development')
     && 'http://localhost:8080/'
     || 'http://api.xiangxiangshu.com/', 
    timeout: 15000 
})
// request interceptor
service.interceptors.request.use(
    config => {
        if (getToken()) {
            config.headers.common['X-Auth-Token'] = getToken();
        }
        config.headers['Content-Type'] = 'application/json';
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
        if (state !== 'SUCCESS') {
            Toast.fail(responseData.resultErrorMessage || '请求失败');
            return Promise.reject(responseData || 'Error');
        } else {
            return response;
        }
    },
    error => {
        
        if ((error && error.response && error.response.status === 403) 
            && getToken() 
            && error.response.data.path !== '/user/logout') {
                //clear token
        }
        if ((error && error.response && error.response.status === 500) 
            && getToken() 
            && error.response.data.path !== '/user/logout') {
                //clear token
        }
        console.log(error);
        Toast.fail(error.message || '请求失败')
        return Promise.reject(error);
    }
)

export default service;