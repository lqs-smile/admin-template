import { ref } from 'vue'
import { useRouter, useRoute, onBeforeRouteUpdate } from 'vue-router'
import { useRouterStore } from '@/store/router'

export function useTabList() {
    const router = useRouter()
    const route = useRoute()
    // 当前高亮的tab
    let activeTab = ref(route.path)
    let tabList = ref([])

    // 路由更新之前
    onBeforeRouteUpdate((to, from) => {
        activeTab.value = to.path
        if (to.meta.cache) {
            addTab({ icon: to.meta.icon, title: to.meta.title, path: to.path })
        }
        if (to.name === 'reload') {
            tempUnmountComponentCache(from)
        }
    })

    // 路由更新之后

    // 初始化标签导航列表
    function inittabList() {
        // let tbs = getStorage('tabList', 'session')
        let tbs = useRouterStore().keepAlive
        if (tbs.length > 0) {
            tabList.value = tbs
        } else {
            // 获取当前路由信息
            tabList.value.push({ title: route.meta.title, path: route.path })
        }
    }
    inittabList()

    // 添加标签导航
    function addTab(tab) {
        let noTab = tabList.value.findIndex((item) => item.path == tab.path) == -1
        if (noTab) {
            tabList.value.push(tab)
        }
        // setStorage("tabList", tabList.value, "session")
        useRouterStore().setKeepAlive(tabList.value)
    }

    // 给activeTab赋值会导致触发tab-change事件，导致路由重复跳转！！！
    // 点击切换tab
    // function changeTab(path) {
    //   activeTab.value = path
    //   router.push(path)
    // }

    // 点击切换tab
    function clickTab({ path }) {
        // 如果当前的path不等于要去的path则跳转
        if (route.path != path) router.push(path)
    }

    // 关闭标签
    const removeTab = (path) => {
        let current = activeTab.value
        let tbs = tabList.value
        // 是否关闭当前的
        if (current == path) {
            tbs.forEach((item, index) => {
                if (item.path == path) {
                    const nextTab = tbs[index + 1] || tbs[index - 1]
                    current = nextTab.path ? nextTab.path : current
                    router.push(current)
                }
            })
        }
        activeTab.value = current
        tabList.value = tbs.filter((item) => item.path != path)
        // setStorage("tabList", tabList.value, "session")
        useRouterStore().setBreadcrumb(tabList.value)
    }

    // 关闭其他/关闭全部
    const handleClose = (command) => {
        if (command == 'clearAll') {
            activeTab.value = '/'
            tabList.value = [{ title: '后台首页', path: '/' }]
            router.push('/')
        } else if (command == 'clearOther') {
            // 过滤只剩下首页和当前激活
            tabList.value = tabList.value.filter(
                (tab) => tab.path == '/' || tab.path == activeTab.value
            )
        }
        useRouterStore().setKeepAlive(tabList.value)
    }

    return {
        activeTab,
        tabList,
        clickTab,
        removeTab,
        handleClose
    }
}

/**
 * 临时卸载组件缓存
 */
function tempUnmountComponentCache(routerObj: any) {
    const componentName = getComponentName(routerObj)
    // 临时卸载组件缓存
    useRouterStore().pushKeepAlive(componentName)
    setTimeout(() => {
        useRouterStore().popKeepAlive(componentName)
    })
}
/**
 * 根据当前路由对象返回组件名称
 * @param routeObj
 * @returns
 */
function getComponentName(routeObj: any) {
    const fullPath = routeObj.fullPath
    const pathList = routeObj.matched
    const target = pathList.find((item: any) => item.path === fullPath)
    return target.components.default.name
}
