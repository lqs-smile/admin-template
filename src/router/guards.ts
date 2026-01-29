import { useRoute } from 'vue-router'
import router from './index'
import NProgress from 'nprogress'
import { NotifyPlugin } from 'tdesign-vue-next'
NProgress.configure({
    easing: 'ease', // 动画方式
    speed: 500, // 递增速度
    showSpinner: true, // 是否显示旋转图标
    trickleSpeed: 200, // 自动递增间隔
    minimum: 0.3 // 初始时的最小百分比
})
//全局前置导航守卫
export const beforeEach = async (to: any): Promise<string | boolean> => {
    NProgress.start()
    // 如果没有token，跳转到登录页
    if (!localStorage.getItem('token')) {
        if (to.path !== '/login') {
            return '/login'
        }
        return true
    }

    if (localStorage.getItem('token') && to.path == '/login') {
        //   notification('请勿重复登录！', 'error')

        // 使用HTML5 模式无法获取from.path,使用Hash 模式则可以实现回退功能
        //   return from.path ? from.path : '/'
        NotifyPlugin('warning', { title: '您已登录，无需重复登录' })
        router.push('/')
    }

    //当前路由没有匹配到任何路由记录
    if (to.matched.length == 0) {
        router.push('/404')
    }

    return true
}
//全局后置导航守卫
export const afterEach = (to: any): void => {
    // 动态设置title
    document.title = to.meta.title || '龙岩医保监控平台'
    NProgress.done()
    // const route = useRoute()

    // // 直接获取祖先数组（包含当前路由）
    // const ancestorRoutes = route.matched // ✅ 这就是你要的数组
    // console.log(ancestorRoutes, 'ancestorRoutes')
}
