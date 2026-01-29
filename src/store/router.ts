import { defineStore } from 'pinia'
import { type Router } from '@/interface/router'
interface router {
    breadcrumb: Router[]
    keepAlive: string[]
}
export const useRouterStore = defineStore('router', {
    state: (): router => ({
        breadcrumb: [],
        keepAlive: []
    }),
    getters: {},
    actions: {
        setBreadcrumb(breadcrumb: Router[]) {
            this.breadcrumb = breadcrumb
        },
        setKeepAlive(keepAlive: string[]) {
            this.keepAlive = keepAlive
        },
        // 清除路由信息
        clearData() {
            this.breadcrumb = []
            this.keepAlive = []
        }
    },

    persist: {
        enabled: true, // 开启持久化
        strategies: [
            {
                key: 'keepAlive', // 存储的 key
                storage: localStorage, // 也可以使用 sessionStorage
                paths: ['keepAlive'] // 只存储部分字段（可选）
            }
        ]
    } as any
})
