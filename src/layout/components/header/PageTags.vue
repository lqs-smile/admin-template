<template>
    <div class="page-tags">
        <div class="page-tags-content">
            <div
                class="tag-item-wrap"
                @click="clickTab(tag)"
                :key="tag.path"
                v-for="tag in tabList"
                :class="{
                    factive: tag.path === activeTab
                }"
            >
                <div
                    class="tag-item"
                    :class="{
                        active: tag.path === activeTab
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
            </div>
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
    // box-sizing: border-box;
    width: 100%;
    background-color: var(--td-bg-color-secondarycontainer);
    height: 44px;
    padding: 8px 0px 0;
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
    // background-color: var(--td-brand-color-light) !important;
    display: flex;
    align-items: center;
}
.tag-item-wrap {
    height: 100%;
    padding: 0 14px;
    position: relative;
    &:hover {
        &::after {
            z-index: 99;
            content: '';
            position: absolute;
            bottom: 0;
            right: 0;
            width: 14px;
            height: 100%;
            background-color: var(--td-bg-color-secondarycontainer);

            border-radius: 0px 0px 0px 14px;
        }
        &::before {
            content: '';
            z-index: 99;
            position: absolute;
            bottom: 0;
            left: 0;
            width: 14px;
            height: 100%;
            background-color: var(--td-bg-color-secondarycontainer);
            border-radius: 0px 0px 14px 0px;
        }
        & > .tag-item {
            background-color: var(--td-bg-color-secondarycontainer-hover);
            &::after {
                content: '';
                position: absolute;
                bottom: 0;
                right: -14px;
                width: 14px;
                height: 100%;
                background-color: var(--td-bg-color-secondarycontainer-hover);
            }
            &::before {
                content: '';
                position: absolute;
                bottom: 0;
                left: -14px;
                width: 14px;
                height: 100%;
                background-color: var(--td-bg-color-secondarycontainer-hover);
            }
        }
    }
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
}
.active {
    color: var(--td-brand-color) !important;
    background-color: var(--td-brand-color-light) !important;
    // border-color: var(--td-brand-color-2);
    & > .delWrap > .delete-icon {
        color: var(--td-brand-color);
    }
    &::after {
        content: '';
        position: absolute;
        bottom: 0;
        right: -14px;
        width: 14px;
        height: 100%;
        background-color: var(--td-brand-color-light) !important;
    }
    &::before {
        content: '';
        position: absolute;
        bottom: 0;
        left: -14px;
        width: 14px;
        height: 100%;
        background-color: var(--td-brand-color-light) !important;
    }
}
.fhover {
    &::after {
        z-index: 99;
        content: '';
        position: absolute;
        bottom: 0;
        right: 0;
        width: 14px;
        height: 100%;
        background-color: red;

        border-radius: 0px 0px 0px 14px;
    }
    &::before {
        content: '';
        z-index: 99;
        position: absolute;
        bottom: 0;
        left: 0;
        width: 14px;
        height: 100%;
        background-color: red;
        border-radius: 0px 0px 14px 0px;
    }
}
.factive {
    &::after {
        z-index: 99;
        content: '';
        position: absolute;
        bottom: 0;
        right: 0;
        width: 14px;
        height: 100%;
        background-color: var(--td-bg-color-secondarycontainer);

        border-radius: 0px 0px 0px 14px;
    }
    &::before {
        content: '';
        z-index: 99;
        position: absolute;
        bottom: 0;
        left: 0;
        width: 14px;
        height: 100%;
        background-color: var(--td-bg-color-secondarycontainer);
        border-radius: 0px 0px 14px 0px;
    }
}
</style>
