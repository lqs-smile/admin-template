<template>
    <t-dialog
        @Close="emit('offVisible')"
        width="600px"
        autoFocus
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
                        @Change="handleSearch"
                        clearable
                        :autofocus="autofocus"
                        inputClass="search-input"
                        v-model="searchText"
                        placeholder="支持URL和菜单名称"
                    />
                    <div class="del-icon-wrap" @click="emit('offVisible')">
                        <SvgIcon size="16px" name="hotkey-delete"></SvgIcon>
                    </div>
                </div>
            </div>
            <div class="hotkey-list-wrap">
                <template v-if="searchHistoryList.length > 0">
                    <div
                        @click="handleClick(item.path)"
                        @mouseenter="handleHover(item.path, true)"
                        @mouseleave="handleHover(item.path, false)"
                        class="hotkey-list-item"
                        v-for="item in searchHistoryList"
                        :key="item.path"
                    >
                        <MenuKeyItem :searchText="searchText" :item="item" />
                    </div>
                </template>
                <template v-else>
                    <div class="hotkey-list-noData">
                        <div class="hotkey-list-noData-content">
                            <SvgIcon size="32px" name="hotkey-smile"></SvgIcon>
                            <span>{{ searchText || '输入你要搜索的导航' }}</span>
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
import MenuKeyItem from './MenuKeyItem.vue'
import { onMounted, ref, watch, onUnmounted } from 'vue'
import { useRouterNodeList } from '@/hooks/useRouterInfo'
import { useRouterList } from '@/hooks/useRouterInfo'
import { useRouter } from 'vue-router'
const router = useRouter()
const props = defineProps({
    visible: {
        type: Boolean,
        default: false
    }
})
watch(
    () => props.visible,
    (newVal, oldVal) => {
        if (newVal) {
            autofocus.value = true
        } else {
            autofocus.value = false
        }
    }
)
const emit = defineEmits(['offVisible'])
const autofocus = ref(false)
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
    // {
    //     label: '新窗口',
    //     icon: ['hotkey-share'],
    //     type: 'primary',
    //     handler: () => {
    //         visible.value = false
    //     }
    // },
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
const routes = useRouterList()

const handleSearch = (searchText) => {
    console.log(searchText, 'searchText')
    if (searchText) {
        searchHistoryList.value = routes.value.filter((item) => {
            return item.path.includes(searchText) || item.meta?.title.includes(searchText)
        })
    } else {
        searchHistoryList.value = []
    }
}
const searchHistoryList = ref([])
watch(
    () => searchHistoryList.value,
    (newVal, oldVal) => {
        console.log(newVal, oldVal, 'searchHistoryList')
    }
)

const selectCur = ref(0)

document.addEventListener('keydown', (e) => {
    // 监听上下箭头
    if (e.key === 'ArrowUp') {
        if (selectCur.value > 0) {
            selectCur.value--
            handleHover(searchHistoryList.value[selectCur.value].path, true)
        }
        e.preventDefault() // 阻止默认行为
    }
    if (e.key === 'ArrowDown') {
        if (selectCur.value < searchHistoryList.value.length - 1) {
            selectCur.value++
            handleHover(searchHistoryList.value[selectCur.value].path, true)
        }
        e.preventDefault() // 阻止默认行为
    }
    // 回车
    if (e.key === 'Enter') {
        e.preventDefault() // 阻止默认行为
        console.log(searchHistoryList.value[selectCur.value].path, 'enter')
        if (searchHistoryList.value[selectCur.value].path) {
            router.push(searchHistoryList.value[selectCur.value].path)
            emit('offVisible')
        }
    }
})

onUnmounted(() => {
    // 取消监听
    document.removeEventListener('keydown', () => {})
})

const handleHover = (path, hover) => {
    searchHistoryList.value.forEach((item, index) => {
        if (item.path === path) {
            searchHistoryList.value[index].hover = hover
            selectCur.value = index
        } else {
            searchHistoryList.value[index].hover = false
        }
    })
}
const handleClick = (path) => {
    if (path) {
        router.push(path)
        emit('offVisible')
    }
}

onMounted(() => {})
</script>
<style scoped lang="less">
:global(.t-dialog) {
    padding: 0px !important;
    border: none !important;
}
:global(.t-dialog__body) {
    padding: 0px !important;
    border: none !important;
}
:global(.search-input) {
    border: none !important;
    box-shadow: none !important;
}
:global(.hotkey-dialog) {
    padding: 0px !important;
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
        padding: 20px 16px 60px 16px;
        overflow: auto;
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
                & > svg {
                    margin-right: 0px;
                }
                & > span {
                    margin-top: 16px;
                    font-size: 14px;
                    color: var(--td-text-color-secondary);
                }
            }
        }
        .hotkey-list-item {
            // padding: 0px 16px;
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
