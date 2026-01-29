import { defineStore } from 'pinia'
//路由
import { useRouterStore } from './router'
//用户
import { useUserStore } from './user'
// 布局
import { useLayoutStore } from './layout'
// 配置
import { useConfigStore } from './config'

export const useStore = defineStore('store', {
    state: () => {
        return {
            user: useUserStore(), //用户
            routers: useRouterStore(), //路由
            layout: useLayoutStore(), //布局
            config: useConfigStore() //配置
        }
    },
    getters: {},
    actions: {
        clearUserConfig() {
            return new Promise((resolve) => {
                this.user.clearData() // 清除用户信息
                this.routers.clearData() // 清除keepaliveTag
                this.layout.clearData() // 清除layout配置
                localStorage.removeItem('token')
                resolve(true)
            })
        }
    },
    persist: true
})
