import { defineStore } from 'pinia'
interface router {
    expanded: boolean
}
export const useLayoutStore = defineStore('layout', {
    state: (): router => ({
        expanded: true // 是否展开左侧菜单
    }),
    getters: {},
    actions: {
        setExpanded(expanded: boolean) {
            this.expanded = expanded
        },
        // 清除layout配置
        clearData() {
            this.expanded = true
        }
    },

    persist: {
        enabled: true, // 开启持久化
        strategies: [
            {
                key: 'layout', // 存储的 key
                storage: localStorage, // 也可以使用 sessionStorage
                paths: ['layout'] // 只存储部分字段（可选）
            }
        ]
    } as any
})
