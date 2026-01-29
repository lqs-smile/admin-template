import router from '@/router'
import { defineStore } from 'pinia'
import { useStore } from '@/store/store'

// interface UserState {}

export const useUserStore = defineStore('user', {
    state: () => ({
        userInfo: {},
        token: ''
    }),
    getters: {},
    actions: {
        getUserInfo() {},
        setUserInfo(userInfo: any) {
            const { token, ...rest } = userInfo
            this.userInfo = rest
        },
        // 清除用户信息
        clearData() {
            this.userInfo = {}
            this.token = ''
        },
        // 退出登录
        logout() {
            // 退出登录接口
            useStore()
                .clearUserConfig()
                .then(() => {
                    router.push('/login')
                })
        }
    },
    persist: true
})
