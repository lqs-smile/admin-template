<template>
    <div class="page-tags">
        <div
            @click="clickTab(tag)"
            :key="tag.path"
            v-for="tag in tabList"
            class="tag-item"
            :class="{ active: tag.path === activeTab }"
        >
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
import { onMounted } from 'vue'
/* 
  activeTab：当前高亮
  tabList：tab列表
  clickTab：切换tab
  removeTab：删除tab
  handleClose：关闭其他/关闭全部
*/
const { activeTab, tabList, clickTab, removeTab, handleClose } = useTabList()

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
    background-color: var(--td-bg-color-secondarycontainer);
    // border-radius: 8px;
    height: 44px;
    display: flex;
    align-items: center;
    padding: 8px 20px 0;
}
.tag-item {
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
    margin-right: 8px;

    background-color: var(--td-bg-color-secondarycontainer);
    color: var(--td-text-color-secondary);
    border: 1px solid var(--td-component-stroke);

    &:hover {
        background-color: var(--td-bg-color-secondarycontainer-hover);
        // color: var(--td-text-color-secondary-hover);
        // border-color: var(--td-component-stroke-hover);
    }
}
.active {
    background-color: var(--td-bg-color-container);
    color: var(--td-brand-color);
    border-color: var(--td-bg-color-container);
}
</style>
