<template>
    <t-menu
        width="100%"
        class="menu-list"
        v-model:expanded="expanded"
        :value="defaultActive"
        :collapsed="!computedExpanded"
    >
        <MenuItem v-for="item in routes" :key="item.name" :route="item" />
    </t-menu>
</template>

<script setup>
import { computed, defineComponent, watch, ref } from 'vue'
import MenuItem from './MenuItem.vue'
import { useRouter, useRoute, onBeforeRouteUpdate } from 'vue-router'
import { filterRouters, generateMenus, findParentRoute } from '@/utils/route'
import { computedExpanded } from '@/hooks/layout'
const router = useRouter()
const route = useRoute()

defineComponent({
    name: 'sidebarMenu'
})

// ==================== 计算路由表结构 ====================

const routes = computed(() => {
    const filterRoutes = filterRouters(router.getRoutes())
    return generateMenus(filterRoutes)
})

// 默认选中
const defaultActive = ref(route.name)
console.log(defaultActive, 'defaultActive')

const expanded = ref(route.path.split('/'))

console.log(expanded.value, 'expanded')

watch(
    () => route.name,
    () => {
        console.log(route.name, 'route.name')
        expanded.value = route.path.split('/')
        defaultActive.value = route.name
    }
)

// // watch监控routes值得变化
// watch(routes, (newVal, oldVal) => {
//     console.log(newVal, oldVal, 'routes')
// })

// // // ==================== 获取适用于menu的路由数组 ====================
// // const menuList = router.options.routes[0].children?.filter((item) => {
// //     return item.meta?.isShow
// // })

// // 计算高亮 menu 的方法
// const route = useRoute()
// const activeMenu = computed(() => {
//     const { meta, path } = route
//     if (meta.activeMenu) {
//         return meta.activeMenu
//     }
//     return [path]
// })

// // 计算高亮展开 Menu 的方法
// const activeOpenMenu = computed(() => {
//     const arr = []
//     const { path } = route
//     findParentRoute(path, routes.value, arr)
//     return arr
// })

// // 菜单点击回调
// const menuClickBtn = (menu) => {
//     const { key } = menu
//     router.push(key)
// }

// 菜单折叠
const collapsed = ref(false)
</script>

<style lang="scss" scoped>
.menu-list {
    flex: 1;
    // background: #192b3d !important;
    // .menu-item {
    //     height: 64px;
    //     line-height: 64px;
    //     padding-left: 24px;
    //     color: #fff;

    //     .menu-item:hover {
    //         background: #003366;
    //     }
    // }
    // --td-bg-color-container: #192b3d;
}
</style>
