import { defineStore } from 'pinia'

// interface UserState {}

export const useConfigStore = defineStore('config', {
    state: () => ({
        isDarkMode: true
    }),
    getters: {},
    actions: {
        modeChange(flag: boolean, e: any) {
            this.isDarkMode = flag

            const transition = document.startViewTransition(() => {
                document.documentElement.setAttribute('theme-mode', flag ? 'dark' : 'right')
            })

            transition.ready.then(() => {
                // 由于我们要从鼠标点击的位置开始做动画，所以我们需要先获取到鼠标的位置

                const { clientX, clientY } = e
                // 计算半径，以鼠标点击的位置为圆心，到四个角的距离中最大的那个作为半径
                const radius = Math.hypot(
                    Math.max(clientX, innerWidth - clientX),
                    Math.max(clientY, innerHeight - clientY)
                )
                const clipPath = [
                    `circle(0% at ${clientX}px ${clientY}px)`,
                    `circle(${radius}px at ${clientX}px ${clientY}px)`
                ]
                // 自定义动画
                document.documentElement.animate(
                    {
                        // 如果要切换到暗色主题，我们在过渡的时候从半径 100% 的圆开始，到 0% 的圆结束
                        clipPath: flag ? clipPath.reverse() : clipPath
                    },
                    {
                        duration: 500,
                        fill: 'both',
                        // 如果要切换到暗色主题，我们应该裁剪 view-transition-old(root) 的内容
                        pseudoElement: flag
                            ? '::view-transition-old(root)'
                            : '::view-transition-new(root)'
                    }
                )
            })
        },
        // 清除用户信息
        clearData() {
            this.isDarkMode = false
        }
    },
    persist: true
})
