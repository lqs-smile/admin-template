import path from 'path'

/**
 * 返回所有子路由
 */
const getChildrenRoutes = (routes) => {
    const result = []
    routes.forEach((route) => {
        if (route.children && route.children.length > 0) {
            result.push(...route.children)
        }
    })
    return result
}
/**
 * 处理脱离层级的路由：某个一级路由为其他子路由，则剔除该一级路由，保留路由层级
 * @param {*} routes router.getRoutes()
 */
export const filterRouters = (routes) => {
    const childrenRoutes = getChildrenRoutes(routes)
    return routes.filter((route) => {
        return !childrenRoutes.find((childrenRoute) => {
            return childrenRoute.path === route.path
        })
    })
}

/**
 * 判断数据是否为空值
 */
function isNull(data) {
    if (!data) return true
    if (JSON.stringify(data) === '{}') return true
    return JSON.stringify(data) === '[]'
}
/**
 * 根据 routes 数据，返回对应 menu 规则数组
 */
export function generateMenus1(routes, basePath = '') {
    console.log(routes, 'rr')

    const result = []
    // 遍历路由表
    routes.forEach((item) => {
        // 不存在 children && 不存在 meta 直接 return
        if (isNull(item.meta) && isNull(item.children)) return
        // 存在 children 不存在 meta，进入迭代,这种是节点
        if (isNull(item.meta) && !isNull(item.children)) {
            result.push(...generateMenus(item.children))
            return
        }
        // 合并 path 作为跳转路径
        // const routePath = path.resolve(basePath, item.path) 用不了
        const routePath = path
        // 路由分离之后，存在同名父路由的情况，需要单独处理
        let route = result.find((item) => item.path === routePath)
        if (!route) {
            route = {
                ...item,
                path: routePath,
                children: []
            }

            // icon 与 title 必须全部存在
            if (route.meta.icon && route.meta.title) {
                // meta 存在生成 route 对象，放入 arr
                result.push(route)
            }
        }

        // 存在 children 进入迭代到children
        if (item.children) {
            route.children.push(...generateMenus(item.children, route.path))
        }
    })
    return result
}

/**
 * 根据子路由，返回所有的父路由
 */
export function findParentRoute(path, list = [], result = []) {
    for (let i = 0; i < list.length; i += 1) {
        const item = list[i]
        // 找到目标
        if (item.path === path) {
            // 加入到结果中
            result.push(item.path)
            // 因为可能在第一层就找到了结果，直接返回当前结果
            if (result.length === 1) return result
            return true
        }
        // 如果存在下级节点，则继续遍历
        if (item.children) {
            // 预设本次是需要的节点并加入到最终结果result中
            result.push(item.path)
            const find = findParentRoute(path, item.children, result)
            // 如果不是false则表示找到了，直接return，结束递归
            if (find) {
                return result
            }
            // 到这里，意味着本次并不是需要的节点，则在result中移除
            result.pop()
        }
    }
    // 如果都走到这儿了，也就是本轮遍历children没找到，将此次标记为false
    return false
}

export function generateMenus(routes: any[]) {
    // 平铺根路由
    const rootChildren = routes.find((item: any) => item.path === '/')
    return rootChildren.children.filter((item: any) => item.meta.isShow)
}
