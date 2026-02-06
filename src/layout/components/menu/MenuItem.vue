<template>
    <!-- 支持渲染多级 menu 菜单 -->
    <template v-if="route.children?.length > 0">
        <t-submenu :value="route.name" :title="route.meta?.title">
            <template #icon>
                <svgIcon size="18px" :name="route.meta?.icon" />
            </template>
            <MenuItem v-for="item in route.children" :key="item.name" :route="item" />
        </t-submenu>
    </template>
    <!-- 渲染 item 项 -->
    <template v-else>
        <t-menu-item @click="handleClick(route.path)" :value="route.name">
            <template #icon>
                <svgIcon size="16px" :name="route.meta?.icon" />
            </template>
            <span>{{ route.meta?.title }}</span>
        </t-menu-item>
    </template>
</template>

<script setup>
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import svgIcon from '@/components/svg-icon.vue'
const router = useRouter()

defineComponent({
    name: 'sidebarItem'
})

// 定义 props
defineProps({
    route: {
        type: Object,
        required: true
    }
})

const handleClick = (e) => {
    router.push(e)
}
</script>

<style lang="less" scoped></style>
