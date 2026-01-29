<template>
    <div class="menu-content">
        <div class="logo">
            <div class="logo-content">
                <div
                    class="logo-text"
                    :style="{
                        flex: computedExpanded ? '1' : '0',
                        transform: computedExpanded ? 'scale(1)' : 'scale(0)'
                    }"
                >
                    {{ computedExpanded ? '测试中台' : '' }}
                </div>
                <div :class="{ 'svg-r': computedExpanded }">
                    <SvgIcon
                        className="svg"
                        name="menu-open"
                        size="18px"
                        @click="setExpanded(!computedExpanded)"
                    />
                </div>
            </div>
            <!-- <SvgIcon v-if="!computedExpanded" name="logo" className="logo-icon" color="#ffffff" /> -->
        </div>
        <div class="menu-list">
            <SubMenu />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { computedExpanded, setExpanded } from '@/hooks/layout'
import { useRouter } from 'vue-router'
import SubMenu from './SubMenu.vue'
const router = useRouter()
import SvgIcon from '@/components/svg-icon.vue'

console.log('router.getRoutes()', router.options.routes)

// ==================== 获取适用于menu的路由数组 ====================
const menuList = router.options.routes[0].children?.filter((item) => {
    return item.meta?.isShow
})

const collapsed = ref(false)
</script>

<style lang="scss" scoped>
// 引入 SCSS 变量文件
@use '../../layout';
.menu-content {
    height: 100%;
    display: flex;
    flex-direction: column;
    background: var(--td-bg-color-container);
}
.logo {
    overflow: hidden;

    height: layout.$header-height;
    font-family: SourceHanSansSC, SourceHanSansSC;
    font-weight: bold;
    font-size: 24px;
    color: var(--td-text-color-primary);
    line-height: 24px;
    text-align: left;
    font-style: normal;
    display: flex;
    align-items: center;
    padding: 12px;
    box-sizing: border-box;
    // width: auto;
    .logo-text {
        transition: transform 0.5s ease-in-out;
    }
    .logo-content {
        width: 100%;
        display: flex;
        align-items: flex-end;
        justify-content: center;
    }
}

.t-demo-collapse-btn {
    // color: #fff;
    // &:hover {
    //     background-color: #4b4b4b;
    //     border-color: transparent;
    //     --ripple-color: #383838;
    // }
}
.logo-icon {
    width: 36px;
    height: 28px;
}
.svg {
    margin: 0px !important;
    // width: 124px;
    // height: 124px;
    // font-weight: bold;
    // color: red;
    // transform: rotate(45deg);
}
.svg-r {
    transform: rotate(180deg);
}
</style>
