<template>
    <div>
        <t-breadcrumb :max-item-width="'150'" theme="dark">
            <t-breadcrumb-item v-for="item in breadList" :key="item.path">
                <template #icon>
                    <SvgIcon className="icon" :name="item.meta.icon" size="12px" />
                </template>
                {{ item.meta.title }}
            </t-breadcrumb-item>
        </t-breadcrumb>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import SvgIcon from '@/components/svg-icon.vue'
const route = useRoute()
import { type Router } from '@/interface/router'
const breadList = ref<Router[]>([])
const getBreadcrumb = () => {
    breadList.value = route.matched.filter((item) => item.meta && item.meta.title)
    console.log(breadList.value)
}

watch(route, () => {
    getBreadcrumb()
})
onMounted(() => {
    getBreadcrumb()
})
</script>
<style scoped lang="less">
// :deep(.t-breadcrumb__inner-text) {
//     font-weight: 500;
//     font-size: 16px;
//     color: #ffffff;
//     line-height: 24px;
// }margin-right: 20px;
</style>
