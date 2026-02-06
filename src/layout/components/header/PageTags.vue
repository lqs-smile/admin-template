<template>
    <div class="page-tags">
        <div
            @click="clickTab(tag)"
            :key="tag.path"
            v-for="tag in tabList"
            class="tag-item"
            :class="{
                active: tag.path === activeTab
            }"
        >
            <SvgIcon :name="tag.icon" className="tagIcon" size="14px" />
            <span>
                {{ tag.title }}
            </span>
            <span>
                <SvgIcon
                    v-if="tabList.length > 1"
                    name="delete"
                    className="delete-icon"
                    size="13px"
                    @click.stop="removeTab(tag.path)"
                />
            </span>
        </div>
    </div>
</template>

<script setup lang="ts">
import SvgIcon from '@/components/svg-icon.vue'
import { useTabList } from '@/hooks/useTabList.ts'
import { computed, onMounted } from 'vue'
/* 
  activeTab：当前高亮
  tabList：tab列表
  clickTab：切换tab
  removeTab：删除tab
  handleClose：关闭其他/关闭全部
*/
const { activeTab, tabList, clickTab, removeTab, handleClose } = useTabList()

// const activeTabLeft = computed(() => {
//     const curIndex = tabList.value.findIndex((item) => item.path === activeTab.value)
//     if (curIndex > 0) {
//         return tabList.value[curIndex - 1].path
//     }
//     return null
// })

// const activeTabRight = computed(() => {
//     const curIndex = tabList.value.findIndex((item) => item.path === activeTab.value)
//     if (curIndex < tabList.value.length - 1) {
//         return tabList.value[curIndex + 1].path
//     }
//     return null
// })

console.log(tabList.value, 'tabList.value')
console.log(activeTab.value, 'activeTab.value')

onMounted(() => {})
</script>

<style scoped lang="less">
.delete-icon {
    fill: currentColor;
    margin-left: 8px !important;
    margin-right: 0px;
    color: var(--td-text-color-secondary);
}
.page-tags {
    position: relative;
    background-color: var(--td-bg-color-secondarycontainer);
    // border-radius: 8px;
    height: 44px;
    display: flex;
    align-items: center;
    padding: 8px 20px 0;
}
.tag-item {
    // z-index: auto;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    cursor: pointer;
    // height: 36px;
    height: 100%;
    border-radius: 4px 4px 0px 0px;
    font-weight: 400;
    font-size: 14px;
    padding: 0 16px;
    min-width: 78px;
    // margin-right: 8px;

    border: 1px solid red !important;

    background-color: var(--td-bg-color-secondarycontainer);
    color: var(--td-text-color-secondary);

    &:hover {
        background-color: var(--td-bg-color-secondarycontainer-hover);
    }
}
.active {
    border-radius: 14px 14px 0px 0px;
    color: var(--td-brand-color) !important;
    background-color: var(--td-brand-color-light) !important;
    // border-color: var(--td-brand-color-2);
}
.active-borther-left {
    border-radius: 0px 0px 14px 0px;
}
.active-borther-right {
    border-radius: 0px 0px 0px 14px;

    &::before {
        content: '';
        z-index: -1;
        background-color: red;
        position: absolute;
        top: 0;
        left: 0;
        width: 200px;
        height: 100px;
    }
}
</style>
