import { generateColorMap, insertThemeStylesheet } from '@/utils/color'
import { defineStore } from 'pinia'
import { Color } from 'tvision-color'

// interface UserState {}

export const useConfigStore = defineStore('config', {
    state: () => ({
        isDarkMode: true,
        brandTheme: '0052d9', // 主题色
        colorList: {} as any
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

                this.changeBrandTheme(this.brandTheme)

                if (!e) {
                    return
                }

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
        },
        changeBrandTheme(brandTheme: string) {
            console.log(brandTheme, '主题色')
            this.brandTheme = brandTheme
            // 确认模式
            const mode = this.isDarkMode ? 'dark' : 'right' // auto

            // 以主题色加显示模式作为键
            const colorKey = `${brandTheme}[${mode}]`

            // let colorMap = this.colorList[colorKey]
            let colorMap

            // 如果不存在色阶，就需要计算
            if (colorMap === undefined) {
                const [{ colors: newPalette, primary: brandColorIndex }] = Color.getColorGradations(
                    {
                        colors: [brandTheme],
                        step: 10,
                        remainInput: false // 是否保留输入 不保留会矫正不合适的主题色
                    }
                )
                colorMap = generateColorMap(brandTheme, newPalette, mode, brandColorIndex)
                this.colorList[colorKey] = colorMap
            }
            // TODO 需要解决不停切换时有反复插入 style 的问题
            insertThemeStylesheet(brandTheme, colorMap, mode)

            document.documentElement.setAttribute('theme-color', brandTheme)
        }
    },
    persist: true
})
