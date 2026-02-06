<template>
    <div class="page-tags">
        <div class="page-tags-content">
            <div
                class="active-borther-left"
                style="
                    width: 16px;
                    height: 100%;
                    background-color: var(--td-bg-color-secondarycontainer);
                "
            ></div>
            <div
                @click="clickTab(tag)"
                :key="tag.path"
                v-for="tag in tabList"
                class="tag-item"
                :class="{
                    active: tag.path === activeTab,
                    'active-borther-left': tag.path === activeTabLeft,
                    'active-borther-right': tag.path === activeTabRight
                }"
            >
                <SvgIcon :name="tag.icon" className="tagIcon" size="14px" />
                <span>
                    {{ tag.title }}
                </span>
                <div class="delWrap">
                    <SvgIcon
                        v-if="tabList.length > 1"
                        name="delete"
                        className="delete-icon"
                        size="13px"
                        @click.stop="removeTab(tag.path)"
                    />
                </div>
            </div>
            <div
                class="active-borther-right"
                style="
                    flex: 1;
                    height: 100%;
                    background-color: var(--td-bg-color-secondarycontainer);
                "
            ></div>
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

const activeTabLeft = computed(() => {
    const curIndex = tabList.value.findIndex((item) => item.path === activeTab.value)
    if (curIndex > 0) {
        return tabList.value[curIndex - 1].path
    }
    return null
})

const activeTabRight = computed(() => {
    const curIndex = tabList.value.findIndex((item) => item.path === activeTab.value)
    if (curIndex < tabList.value.length - 1) {
        return tabList.value[curIndex + 1].path
    }
    return null
})

console.log(tabList.value, 'tabList.value')
console.log(activeTab.value, 'activeTab.value')

onMounted(() => {})
</script>

<style scoped lang="less">
.delete-icon {
    margin-right: 0px;
    color: var(--td-text-color-secondary);
}
.page-tags {
    box-sizing: border-box;
    width: 100%;
    background-color: var(--td-bg-color-secondarycontainer);
    height: 44px;
    padding: 0px 0px 0;
}
.delWrap {
    margin-left: 4px;
    transition: transform 0.3s ease-in-out;
    padding: 6px;
    border-radius: 50%;
    box-sizing: border-box;
    &:hover {
        transform: scale(1.25);
    }
    & > svg {
        margin-right: 0px;
    }
}
.page-tags-content {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    position: relative;
    background-color: var(--td-brand-color-light) !important;
    display: flex;
    align-items: center;
}
.tag-item {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    cursor: pointer;
    // height: 36px;
    height: 100%;
    border-radius: 12px 12px 0px 0px;
    font-weight: 400;
    font-size: 14px;
    padding: 0 16px;
    min-width: 78px;
    // margin-right: 8px;

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
    & > .delWrap > .delete-icon {
        color: var(--td-brand-color);
    }
}
.active-borther-left {
    border-radius: 0px 0px 14px 0px;
}
.active-borther-right {
    border-radius: 0px 0px 0px 14px;
    overflow: hidden;
}
</style>
