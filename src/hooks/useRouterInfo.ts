import { filterRouters, generateMenus, getAllRoutes } from '@/utils/route'
import { computed } from 'vue'
import { useRouter } from 'vue-router'

export function useRouterNodeList() {
    const router = useRouter() // 在函数内部调用
    return computed(() => {
        if (!router) return []
        const filterRoutes = filterRouters(router.getRoutes())
        return generateMenus(filterRoutes)
    })
}

export function useRouterList() {
    const router = useRouter() // 在函数内部调用
    const filterRoutes =
        filterRouters(router.getRoutes()).find((item: any) => item.path === '/').children || [] // 获取layout下所有节点
    const layoutRoutes = getAllRoutes(filterRoutes).filter((item) => {
        return !item.children && item.component && item.meta.isShow
    }) // 筛选出叶子节点
    return computed(() => layoutRoutes)
}
