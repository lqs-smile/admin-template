<template>
    <div class="favorite">
        <div class="collect-pannel">
            <div class="head">
                <div class="title">
                    <span class="">收藏夹</span>
                    <div class="split"></div>
                    <span class="tip">可按住菜单拖拽排序</span>
                </div>
                <div @click="toggleLikeMenu">
                    <SvgIcon
                        :className="'icon' + (showLikeMenu ? ' rotate' : '')"
                        name="expended"
                        size="20px"
                    />
                </div>
            </div>
            <VueDraggable
                class="like-list"
                :animation="250"
                direction="horizontal"
                ref="el"
                v-model="likeList"
                @Start="handleStart"
                @End="handleEnd"
            >
                <TransitionGroup :name="curItem ? '' : 'like-list'">
                    <div
                        @click="handleClick(item)"
                        class="like-item"
                        v-for="(item, index) in likeList"
                        :key="item.path"
                    >
                        <span class="name">{{ item.meta.title }}</span>
                        <SvgIcon
                            @click.stop="handleDelete(item)"
                            className="icon"
                            name="fixed"
                            size="18px"
                        />
                    </div>
                </TransitionGroup>
            </VueDraggable>
        </div>
        <Transition name="fade">
            <div v-show="showLikeMenu" class="menu-list-pannel">
                <div class="head">
                    <div class="title">
                        <span class="">全部页面</span>
                    </div>
                    <div class="head-right">
                        <span class="tip">点击收藏、下次快捷访问</span>
                        <SvgIcon
                            @click="toggleLikeMenu"
                            className="icon"
                            name="off-bp"
                            size="16px"
                        />
                    </div>
                </div>
                <div class="menu-list">
                    <t-tabs :value="tabCurrent" @change="handlerChange">
                        <t-tab-panel :value="item.path" v-for="item in menuData" :key="item.path">
                            <template #label>
                                <SvgIcon :name="item.icon" class="tabs-icon-margin" />
                                {{ item.root }}
                            </template>
                            <div class="tab-content">
                                <TransitionGroup name="tab-content">
                                    <div
                                        class="tab-item"
                                        @click="addLike(child)"
                                        v-for="child in item.items"
                                        :key="child.name"
                                    >
                                        <div class="title-box text-ellipsis">
                                            <span class="">{{ child.meta.title }}</span>
                                        </div>
                                        <!-- <div class="add-block">
                                    <SvgIcon className="icon" name="add-block" size="18px" />
                                </div> -->
                                    </div>
                                </TransitionGroup>
                            </div>
                        </t-tab-panel>
                    </t-tabs>
                </div>
            </div>
        </Transition>
    </div>
</template>

<script setup>
import SvgIcon from '@/components/svg-icon.vue'
import { useRouterNodeList } from '@/hooks/useRouterInfo'
import { Link } from 'tdesign-vue-next'
import { computed, onMounted, ref, watch } from 'vue'
import { VueDraggable } from 'vue-draggable-plus'
import { useRouter } from 'vue-router'
const router = useRouter()
const isExpanded = ref(false)

const emit = defineEmits(['offvisible'])

/**
 * 拖拽排序
 */
const likeList = ref([])

const curName = ref(null)

const menuList = useRouterNodeList()
// const menuData = ref([])

// 递归处理数据
const handleMenuList = (list) => {
    const arr = []
    for (let i = 0; i < list.length; i++) {
        if (list[i].children && list[i].children.length) {
            arr.push(...handleMenuList(list[i].children))
        } else {
            arr.push(list[i])
        }
    }
    return arr
}

const menuData = computed(() => {
    const res = menuList.value.map((item) => {
        const list = item.children ? handleMenuList(item.children) : [item]

        // 从menuList中过滤出不重复的list
        const uniqueList = list.filter((item, index) => {
            return !likeList.value.find((i) => i.path === item.path)
        })

        console.log(uniqueList, 'uniqueList')

        // console.log(list, 'list')
        return {
            root: item.meta.title,
            path: item.path,
            icon: item.meta.icon,
            items: uniqueList
        }
    })
    return res
})

const tabCurrent = ref(menuData.value.length ? menuData.value[0].path : '')

const handlerChange = (val) => {
    tabCurrent.value = val
}

/**
 * 收藏列表操作
 */

const handleDelete = (item) => {
    likeList.value = likeList.value.filter((i) => i.path !== item.path)
}
const curItem = ref(null)
const handleStart = (el) => {
    curItem.value = el
}

const handleEnd = (el) => {
    setTimeout(() => {
        curItem.value = null
    })
}

const addLike = (item) => {
    likeList.value.push(item)
}

const showLikeMenu = ref(false)

const toggleLikeMenu = () => {
    showLikeMenu.value = !showLikeMenu.value
}

/**
 * 点击收藏项
 */

const handleClick = (item) => {
    console.log(item, 'item')
    router.push({ path: item.path })
    emit('offvisible')
}

onMounted(() => {})
</script>
<style scoped lang="less">
:deep(.t-tabs) {
    background-color: var(--td-bg-color-secondarycontainer);
}
.favorite {
    display: flex;
    // align-items: center;
    background-color: var(--td-bg-color-secondarycontainer);
    .collect-pannel {
        border-right: 1px solid var(--td-border-level-1-color);
        // max-height: 800vh;
        overflow-y: auto;
        width: 414px;
        min-height: 200px;
        // line-height: 50px;
        box-sizing: border-box;
        font-size: 16px;
        color: #fff;
        // padding: 12px 16px;
        flex-direction: column;
        .like-list {
            width: 100%;
            box-sizing: border-box;
            flex: 1;
            // border: 1px solid var(--td-brand-color);
            padding: 14px 16px;
            // display: flex;
            // flex-wrap: wrap;
            overflow-x: hidden;
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            grid-gap: 12px;
            .like-item {
                position: relative;
                cursor: pointer;
                // height: 44px;
                line-height: 32px;
                border-radius: 6px;
                font-size: 14px;
                display: flex;
                align-items: center;
                justify-content: center;
                background-color: var(--td-bg-color-component);
                color: var(--td-text-color-primary);
                &:hover {
                    background-color: var(--td-bg-color-component-hover);
                }

                & > svg {
                    position: absolute;
                    top: -3px;
                    right: -13px;
                    &:hover {
                        color: var(--td-text-color-brand);
                    }
                }
                .icon {
                    color: var(--td-text-color-primary);
                }
            }
        }
    }
    .menu-list-pannel {
        width: 560px;
        height: 100%;
        background-color: var(--td-bg-color-secondarycontainer);
        .head-right {
            display: flex;
            align-items: center;
            .tip {
                margin-right: 10px;
            }
        }
        .tab-content {
            padding: 14px 16px;
            //九宫格布局
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            grid-gap: 24px;
            .tab-item {
                overflow: hidden; /* 隐藏溢出内容 */
                text-overflow: ellipsis; /* 省略号显示 */
                white-space: nowrap; /* 强制不换行 */
                /* 必须设置宽度 */
                position: relative;
                cursor: pointer;
                // height: 44px;
                line-height: 32px;
                border-radius: 6px;
                padding: 0px 12px;
                box-sizing: border-box;
                font-size: 14px;
                display: flex;
                align-items: center;
                justify-content: center;
                // 虚线边框
                border: 1px dashed var(--td-text-color-primary);
                color: var(--td-text-color-primary);
                &:hover {
                    // background-color: var(--td-bg-color-container-hover);
                    border-color: var(--kbj-brand-color-border);
                    color: var(--td-text-color-brand);
                    &:hover .add-block {
                        opacity: 0.5;
                        transform: translateY(0);
                    }
                }
                .title-box {
                    width: 100%;
                    height: 100%;
                }
                .add-block {
                    transition: all 0.3s ease-out;
                    transform: translateY(100%);
                    position: absolute;
                    inset: 0;
                    display: flex;
                    justify-content: flex-end;
                    align-items: center;
                    // background-color: var(--td-bg-color-container-hover);
                    opacity: 0;
                    .icon {
                        // transform: translateY(-100%);
                        color: var(--td-text-color-brand);
                        // margin-left: 8px;
                    }
                }
            }
        }
    }
    .head {
        // height: 44px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 14px 16px;
        border-bottom: 1px solid var(--td-border-level-1-color);
        .split {
            width: 0.5px;
            height: 16px;
            background-color: var(--td-text-color-secondary);
            margin: 0 15px;
        }
    }
    .title {
        display: flex;
        align-items: center;
        color: var(--td-primary-color);
        font-size: 16px;
        font-weight: 400;
    }
    .tip {
        font-size: 14px;
        color: var(--td-text-color-secondary);
    }
}

:deep(.t-tabs__nav-item) {
    color: var(--td-text-color-primary);
}
:deep(.t-tabs__nav-item.t-is-active) {
    color: var(--td-brand-color);
    text-shadow: 0 0 0.3px currentcolor;
}
.icon {
    transition: transform 0.3s ease-out;
}
.rotate {
    transform: rotate(-180deg);
}
</style>

<!-- <style scoped>
.like-item {
    /* display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 12px;
    background: #f5f7fa;
    border-radius: 6px;
    margin-bottom: 8px; */
    /* 开启GPU加速 */
    /* transform: translateZ(0);
    will-change: transform, opacity, height; */
}

/* ===== 极简高性能动画 ===== */
.like-list-leave-active {
    transition: all 0.25s ease-out;
    position: absolute;
    width: calc(100% - 24px);
    /* 强制GPU渲染 */
    transform: translateZ(0);
    backface-visibility: hidden;
}

.like-list-leave-to {
    opacity: 0;
    transform: scale(0.8) translateX(30px) translateZ(0);
}

.like-list-move {
    transition: transform 0.3s ease-out;
    /* 移动动画专用优化 */
    transform: translateZ(0);
}
</style> -->

<style scoped>
/* 入场动画：从左向右滑入 */
.like-list-enter-active {
    animation: slideInLeft1 0.7s ease-out;
}

/* 出场动画：从右向左滑出（向左滑出） */
.like-list-leave-active {
    animation: slideOutLeft1 0.35s ease-in-out;
}

@keyframes slideInLeft1 {
    from {
        opacity: 0;
        transform: translateX(150px); /* 从左边30px的位置开始 */
    }
    to {
        opacity: 1;
        transform: translateX(0); /* 向右滑入到原位 */
    }
}

@keyframes slideOutLeft1 {
    from {
        opacity: 1;
        transform: translateX(0); /* 从原位开始 */
    }
    to {
        opacity: 0;
        transform: translateX(150px); /* 向左边滑出（从右到左渐出） */
    }
}

/* 防止布局抖动 */
.like-list {
    position: relative;
    display: flex;
    flex-wrap: wrap;
}

.like-list-leave-active {
    position: absolute;
    width: 100%;
}

.like-list-enter-active {
    position: relative;
}
</style>

<style scoped>
/* 入场动画：从左向右滑入 */
.tab-content-enter-active {
    animation: slideInLeft 0.7s ease-out;
}

/* 出场动画：从右向左滑出（向左滑出） */
.tab-content-leave-active {
    animation: slideOutLeft 0.35s ease-in-out;
}

@keyframes slideInLeft {
    from {
        opacity: 0;
        transform: translateX(-150px); /* 从左边30px的位置开始 */
    }
    to {
        opacity: 1;
        transform: translateX(0); /* 向右滑入到原位 */
    }
}

@keyframes slideOutLeft {
    from {
        opacity: 1;
        transform: translateX(0); /* 从原位开始 */
    }
    to {
        opacity: 0;
        transform: translateX(-150px); /* 向左边滑出（从右到左渐出） */
    }
}

/* 防止布局抖动 */
.tab-content {
    position: relative;
    display: flex;
    flex-wrap: wrap;
}

.tab-content-leave-active {
    position: absolute;
    width: 100%;
}

.tab-content-enter-active {
    position: relative;
}
</style>

<style scoped>
/* 容器动画 */
.fade-enter-active {
    animation: containerSlideInLeft 0.2s ease-out;
}

.fade-leave-active {
    animation: containerSlideOutRight 0.2s ease-in;
}

@keyframes containerSlideInLeft {
    from {
        opacity: 0;
        transform: scale(0.8); /* 从左边30px的位置开始 */
    }
    to {
        opacity: 1;
        transform: scale(1); /* 向右滑入到原位 */
    }
}

@keyframes containerSlideOutRight {
    from {
        opacity: 1;
        transform: scale(1); /* 从原位开始 */
    }
    to {
        opacity: 0;
        transform: scale(0.8); /* 向右滑出消失 */
    }
}

/* 确保容器有适当的定位和背景 */
.menu-list-pannel {
    background: #fff; /* 或你的背景色 */
    border-radius: 8px; /* 可选 */
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1); /* 可选 */
    overflow: hidden; /* 防止内容溢出动画区域 */
}
</style>
