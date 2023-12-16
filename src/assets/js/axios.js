import axios from 'axios';
const instance = axios.create({
    baseURL: process.env.VUE_APP_BASE_API,
    timeout: 5000
})

// 请求拦截器
instance.interceptors.request.use(
    config => {
        // 在请求发送之前做一些处理
        return config
    },
    error => {
        // 处理请求错误
        console.log(error)
        return Promise.reject(error)
    }
)

// 响应拦截器
instance.interceptors.response.use(
    response => {
        // 在响应数据之前做一些处理
        return response.data
    },
    error => {
        // 处理响应错误
        console.log(error)
        return Promise.reject(error)
    }
)

export default {
    get(url, params) {
        console.log('url', url)
        return instance.get(url, { params })
    },
    post(url, data) {
        return instance.post(url, data)
    },
    put(url, data) {
        return instance.put(url, data)
    },
    delete(url, params) {
        return instance.delete(url, { params })
    }
}
