import Layout from '@/layout/index.vue'
import Login from '@/views/login/index.vue'
import Settle from '@/views/settle/index.vue'
import Video from '@/views/video/index.vue'
import Reload from '@/views/reload.vue'
import Test2 from '@/views/test2.vue'
import type { RouteRecordRaw } from 'vue-router'
export const AppRoutes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'layout',
        component: Layout,
        redirect: '/settle', // 默认子集路由
        children: [
            {
                path: '/reload',
                name: 'reload',
                component: Reload,
                meta: {
                    icon: 'reload',
                    isShow: false,
                    title: '刷新页面',
                    parentRouter: 'Layout',
                    cache: false
                }
            },

            {
                path: '/settle',
                name: 'settle',
                component: Settle,
                meta: {
                    icon: 'settle',
                    isShow: true,
                    title: '药店结算',
                    parentRouter: 'Layout',
                    cache: true
                }
            },
            {
                path: '/video',
                name: 'video',
                component: Video,
                meta: {
                    icon: 'video',
                    isShow: true,
                    title: '视频监控',
                    parentRouter: 'Layout',
                    cache: true
                }
            },
            {
                path: '/test',
                name: 'test',
                children: [
                    {
                        path: '/test/test1',
                        name: 'test1',
                        children: [
                            {
                                path: '/test/test1/test11',
                                name: 'test11',
                                component: Video,
                                meta: {
                                    icon: 'video',
                                    isShow: true,
                                    title: '测试11',
                                    cache: true
                                }
                            },
                            {
                                path: '/test/test1/test22',
                                name: 'testtt',
                                component: Test2,
                                meta: {
                                    icon: 'settle',
                                    isShow: true,
                                    title: '测试22',
                                    cache: true
                                }
                            }
                        ],
                        meta: {
                            icon: 'video',
                            isShow: true,
                            title: '测试1'
                        }
                    }
                ],
                meta: {
                    icon: 'video',
                    isShow: true,
                    title: '测试',
                    parentRouter: 'Layout'
                }
            }
        ]
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
        meta: {
            icon: 'login',
            isShow: true,
            title: '登录',
            parentRouter: 'Layout'
        }
    }
]
