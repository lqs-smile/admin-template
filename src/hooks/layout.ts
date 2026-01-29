import { useLayoutStore } from '@/store/layout'
import { computed } from 'vue'

// 获取是否展开左侧菜单
export const computedExpanded = computed(() => {
    return useLayoutStore().expanded
})

// 设置是否展开左侧菜单
export const setExpanded = (expanded: boolean) => {
    useLayoutStore().setExpanded(expanded)
}
