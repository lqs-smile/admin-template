import { createRouter, createWebHistory } from 'vue-router'
import { AppRoutes } from './routes'
import { beforeEach, afterEach } from './guards'

// 路由表
const AppRouter = createRouter({
    history: createWebHistory(),
    routes: AppRoutes
})

// 路由前置、路由后置
AppRouter.beforeEach(beforeEach)
AppRouter.afterEach(afterEach)

export default AppRouter
