import axios, { type AxiosResponse } from 'axios'

import { MessagePlugin } from 'tdesign-vue-next'

const request = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL
})

// 添加请求拦截器
request.interceptors.request.use(
    function (config) {
        const token: string | null = localStorage.getItem('TOKEN')
        if (token) {
            config.headers['Authorization'] = token
        }
        return config
    },
    function (error) {
        return Promise.reject(error)
    }
)

// 添加响应拦截器
request.interceptors.response.use(
    function (response) {
        return response
    },
    function (error) {
        return Promise.reject(error)
    }
)

// 同意处理http请求结果
const handleResponse = (res: AxiosResponse, { resolve, reject }: { resolve: any; reject: any }) => {
    if (res.data.code === 200) {
        resolve(res.data.data)
    } else {
        MessagePlugin.error(res.data.msg)
        reject(res.data)
    }
}

interface Http {
    get<T>(url: string, params?: any, config?: {}): Promise<T>
    post<T>(url: string, data?: any, config?: {}): Promise<T>
    request: typeof request
}

const http: Http = {
    get<T>(url: string, params?: any, config?: {}): Promise<T> {
        return new Promise((resolve: any, reject) => {
            request
                .get<T>(url, { params, ...config })
                .then(async (res: AxiosResponse<T>) => {
                    resolve(res.data)
                })
                .catch((error) => {
                    reject(error)
                })
        })
    },
    post<T>(url: string, data?: any, config?: {}): Promise<T> {
        return new Promise((resolve, reject) => {
            request
                .post<T>(url, data, config)
                .then(async (res: AxiosResponse<T>) => {
                    handleResponse(res, {
                        resolve,
                        reject
                    })
                })
                .catch((error) => {
                    reject(error)
                    MessagePlugin.error(error.message)
                })
        })
    },
    request
}

export default http
