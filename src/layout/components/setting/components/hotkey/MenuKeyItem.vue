<template>
    <div class="menu-key-item" :class="{ 'menu-key-item-hover ': item.hover }">
        <div class="name">
            <div class="title-box">
                <SvgIcon :name="item.meta?.icon" size="14" />
                <div class="title" v-html="title"></div>
            </div>
            <span v-html="path"></span>
        </div>
        <div class="operation">
            <t-tooltip content="复制链接">
                <div class="btn">
                    <SvgIcon name="hotkey-link" size="20" />
                </div>
            </t-tooltip>

            <t-tooltip content="新窗口打开">
                <div class="btn">
                    <SvgIcon name="hotkey-share" size="16" />
                </div>
            </t-tooltip>
        </div>
    </div>
</template>

<script setup>
import { onMounted, defineProps, computed, toRefs } from 'vue'
import SvgIcon from '@/components/svg-icon.vue'
const props = defineProps({
    item: {
        type: Object,
        default: () => ({})
    },
    searchText: {
        type: String,
        default: ''
    }
})

// 使用 toRefs 保持响应式
const { item, searchText, hover } = toRefs(props)

const title = computed(() => {
    return item.value.meta?.title.replace(
        new RegExp(searchText.value, 'g'),
        `<span style="color: var(--td-brand-color);">${searchText.value}</span>`
    )
})
const path = computed(() => {
    return item.value.path.replace(
        new RegExp(searchText.value, 'g'),
        `<span style="color: var(--td-brand-color);">${searchText.value}</span>`
    )
})
onMounted(() => {})
</script>
<style scoped lang="less">
.menu-key-item {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 6px 10px;
    height: 64px;
    box-sizing: border-box;
    border-bottom: 1px dashed var(--td-bg-color-secondarycontainer-hover);
}
.menu-key-item-hover {
    border-radius: 12px;
    border: 1px dashed var(--td-brand-color);
    background-color: var(--td-bg-color-secondarycontainer);
}
.title-box {
    display: flex;
    align-items: center;
    line-height: 28px;
}
.title {
    font-size: 14px;
    font-weight: 500;
    color: var(--td-text-color);
}
.operation {
    display: flex;
    justify-content: center;
    align-items: center;
}

.btn {
    padding: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    margin-right: 6px;
    box-sizing: border-box;
    border: 1px solid transparent;
    & > svg {
        margin-right: 0;
    }
    &:hover {
        border: 1px solid var(--td-brand-color);
    }
}
</style>
