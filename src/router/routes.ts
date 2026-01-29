import Layout from '@/layout/index.vue'
import Login from '@/views/login/index.vue'
import Settle from '@/views/settle/index.vue'
import Video from '@/views/video/index.vue'
import type { RouteRecordRaw } from 'vue-router'
export const AppRoutes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'layout',
        component: Layout,
        redirect: '/settle', // 默认子集路由
        children: [
            {
                path: '/settle',
                name: 'settle',
                component: Settle,
                meta: {
                    icon: 'settle',
                    isShow: true,
                    title: '药店结算',
                    parentRouter: 'Layout'
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
                    parentRouter: 'Layout'
                }
            },
            {
                path: '/test',
                name: 'test',
                component: Video,
                children: [
                    {
                        path: '/test/test1',
                        name: 'test1',
                        component: Video,
                        children: [
                            {
                                path: '/test/test1/test11',
                                name: 'test11',
                                component: Video,
                                meta: {
                                    icon: 'video',
                                    isShow: true,
                                    title: '测试11'
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
