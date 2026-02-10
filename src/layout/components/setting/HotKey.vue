<template>
    <t-dialog
        @Close="emit('offVisible')"
        width="600px"
        :header="false"
        :footer="false"
        :closeBtn="false"
        v-model:visible="props.visible"
        class="hotkey-dialog"
    >
        <div class="hotkey-container">
            <div class="search-wrap">
                <div class="search-content">
                    <div class="search-icon-warap">
                        <SvgIcon size="16px" name="search"></SvgIcon>
                    </div>
                    <t-input
                        clearable
                        inputClass="search-input"
                        v-model="searchText"
                        placeholder="支持URL和菜单名称"
                    ></t-input>
                    <div class="del-icon-wrap" @click="emit('offVisible')">
                        <SvgIcon size="16px" name="hotkey-delete"></SvgIcon>
                    </div>
                </div>
            </div>
            <div class="hotkey-list-wrap">
                <template v-if="searchHistoryList.length > 0">
                    <div class="hotkey-list-item" v-for="item in searchHistoryList" :key="item">
                        {{ item }}
                    </div>
                </template>
                <template v-else>
                    <div class="hotkey-list-noData">
                        <div class="hotkey-list-noData-content">
                            <SvgIcon size="32px" name="hotkey-smile"></SvgIcon>
                            <span>输入你要搜索的导航</span>
                        </div>
                    </div>
                </template>
            </div>
            <div class="hotkey-handle-wrap">
                <t-space :size="6" align="center" separator="|">
                    <div class="hotkey-handle-item" v-for="item in handleBtnList" :key="item.label">
                        <div class="handle-icon" v-for="icon in item.icon">
                            <SvgIcon
                                class="hotkey-handle-icon"
                                :key="icon"
                                size="14px"
                                :name="icon"
                            ></SvgIcon>
                        </div>
                        {{ item.label }}
                    </div>
                </t-space>
            </div>
        </div>
    </t-dialog>
</template>

<script setup>
import SvgIcon from '@/components/svg-icon.vue'
import { onMounted, ref } from 'vue'
const props = defineProps({
    visible: {
        type: Boolean,
        default: false
    }
})
const emit = defineEmits(['offVisible'])
const searchText = ref('')
const handleBtnList = [
    {
        label: '搜索',
        icon: ['hotkey-enter'],
        type: 'primary',
        handler: () => {
            visible.value = false
        }
    },
    {
        label: '新窗口',
        icon: ['hotkey-share'],
        type: 'primary',
        handler: () => {
            visible.value = false
        }
    },
    {
        label: '切换',
        icon: ['hotkey-up', 'hotkey-down'],
        type: 'primary',
        handler: () => {
            visible.value = false
        }
    },
    {
        label: '退出',
        icon: ['hotkey-esc'],
        type: 'primary',
        handler: () => {
            visible.value = false
        }
    }
]
const searchHistoryList = ref([])
onMounted(() => {})
</script>
<style lang="less">
// :deep(.t-dialog) {
//     padding: 0px !important;
// }
.t-dialog {
    padding: 0px !important;
    border: none !important;
}
.t-dialog__body {
    padding: 0px !important;
    border: none !important;
}
.hotkey-dialog {
    padding: 0px !important;
}
.search-input {
    border: none !important;
    box-shadow: none !important;
}

// 黑夜模式

:root[theme-mode='dark'] {
    .search-wrap {
        .search-content {
            background-color: var(--td-brand-color-light);
        }
    }
}

.hotkey-container {
    // padding: 20px;

    .search-wrap {
        padding: 16px 12px;
        .search-content {
            border-radius: 8px;
            padding: 0 16px;
            height: 44px;
            box-sizing: border-box;
            display: flex;
            align-items: center;
        }

        .search-icon-wrap {
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .del-icon-wrap {
            margin-left: 8px;
            cursor: pointer;
            padding: 6px;
            border-radius: 50%;
            background-color: var(--td-bg-color-secondarycontainer);
            // box-shadow: var(--td-shadow-1);
            display: flex;
            align-items: center;
            justify-content: center;
            & > svg {
                margin-right: 0px;
            }
        }
        .del-icon-wrap:hover {
            background-color: var(--td-bg-color-secondarycontainer-hover);
        }
    }
    .hotkey-list-wrap {
        min-height: 168px;
        max-height: 450px;
        border-top: 1px solid var(--td-border-level-1-color);
        border-bottom: 1px solid var(--td-border-level-1-color);
        .hotkey-list-noData {
            height: 168px;
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            .hotkey-list-noData-content {
                display: flex;
                align-items: center;
                justify-content: center;
                flex-direction: column;
                & > span {
                    margin-top: 16px;
                    font-size: 14px;
                    color: var(--td-text-color-secondary);
                }
            }
        }
    }
    .hotkey-handle-wrap {
        // height: 55px;
        display: flex;
        // box-sizing: border-box;
        align-items: center;
        justify-content: space-between;
        padding: 12px 0px;
        border-radius: 4px;
        transition: background-color 0.2s ease-in-out;
    }
    .hotkey-handle-item {
        cursor: pointer;
        padding: 6px 12px;
        border-radius: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        color: var(--td-text-color-secondary);
        .handle-icon {
            margin-right: 6px;
            border-radius: 8px;
            padding: 4px 6px;
            background-color: var(--td-bg-color-secondarycontainer);
        }
        .hotkey-handle-icon {
            margin-right: 0px;
            color: var(--td-text-color-placeholder);
        }
    }
}
</style>
