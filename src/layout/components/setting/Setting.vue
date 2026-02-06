<template>
    <div class="setting-container">
        <!-- 左侧菜单快捷是搜索 -->
        <div class="setting-item menu-search">
            <SvgIcon className="search-icon" name="search" size="16px" />
            <span class="search-text">搜索</span>
            <div class="hotkey">Ctrl<span>k</span></div>
        </div>
        <!-- 暗黑模式 -->
        <div class="setting-item" @click="changeWeatcher">
            <SvgIcon className="mode-icon" :name="mode ? 'sun' : 'dark'" size="22px" />
        </div>
        <!-- 主题 -->
        <div class="setting-item">
            <t-popup position="bottom" showArrow trigger="click">
                <template #content>
                    <ColorPiker />
                </template>
                <SvgIcon className="theme-icon" name="theme" size="20px" />
            </t-popup>
        </div>
        <!-- 刷新 -->
        <div class="setting-item" @click="changeRefresh">
            <SvgIcon
                :className="`refresh-icon ${refreshIconRotate ? 'refresh-icon-rotate' : ''}`"
                name="refresh"
                size="20px"
            />
        </div>
        <!-- 全屏 -->
        <div class="setting-item" @click="changeFullscreen">
            <SvgIcon className="full-icon" :name="isFullscreen ? 'off-full' : 'full'" size="16px" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, computed, ref } from 'vue'
import { useConfigStore } from '@/store/config'
import SvgIcon from '@/components/svg-icon.vue'
import ColorPiker from '@/layout/components/colorPiker/ColorPiker.vue'
const store = useConfigStore()
import { useRoute, useRouter } from 'vue-router'
const router = useRouter()
const route = useRoute()
onMounted(() => {})

const mode = computed(() => store.isDarkMode)

const isFullscreen = ref(false)

const changeWeatcher = (e: any) => {
    const themeMode = store.isDarkMode
    store.modeChange(!themeMode, e)
}

const changeFullscreen = (e: any) => {
    // 网页全屏
    if (document.fullscreenElement) {
        document.exitFullscreen()
        isFullscreen.value = false
    } else {
        document.documentElement.requestFullscreen()
        isFullscreen.value = true
    }
}

const changeRefresh = (e: any) => {
    if (e.ctrlKey) {
        window.location.reload()
    } else {
        // 跳转/reload但是不修改当前url
        router.push({
            path: '/reload'
        })
        // 刷新icon旋转状态
        refreshIconRotate.value = true
        // 刷新完成后，重置旋转状态
        setTimeout(() => {
            refreshIconRotate.value = false
        }, 500)
    }
}
// 刷新icon旋转状态
const refreshIconRotate = ref(false)
</script>
<style scoped lang="less">
.setting-container {
    display: flex;
    align-items: center;
    margin-right: 20px;
}
.setting-item {
    display: flex;
    align-items: center;
    margin-left: 10px;
    user-select: none;
    cursor: pointer;
    transition: transform 0.2s ease-in-out;
    &:hover {
        transform: scale(1.15);
    }
}
.menu-search {
    color: var(--td-text-color-secondary);
    font-size: 14px;
    display: flex;
    align-items: center;
    padding: 6px 12px;
    border-radius: 16px;
    background-color: var(--td-bg-color-secondarycontainer);

    .search-text {
        margin: 0 8px;
    }
    .hotkey {
        padding: 5px 6px;
        margin-left: 5px;
        font-size: 12px;
        border-radius: 0 12px 12px 0;
        background-color: var(--td-bg-color-container);
        color: var(--td-text-color-secondary);
        & > span {
            margin-left: 5px;
        }
    }
}
.search-icon {
    color: var(--td-text-color-secondary);
}
.theme-icon {
    color: var(--td-text-color-secondary);
}
.mode-icon {
    color: var(--td-text-color-secondary);
}
.full-icon {
    color: var(--td-text-color-secondary);
}
.refresh-icon {
    color: red;
}

// 刷新icon旋转动画
.refresh-icon-rotate {
    animation: refresh-icon-rotate 0.5s linear infinite;
}
@keyframes refresh-icon-rotate {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
</style>
