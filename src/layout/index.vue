<template>
    <!-- 布局一 -->
    <section class="layout-content">
        <!-- 左边菜单 -->
        <aside class="layout-menu" :class="{ 'layout-menu-pack': !computedExpanded }">
            <Menu />
        </aside>
        <!-- 右边 -->
        <section class="layout-main">
            <!-- 顶部 -->
            <header class="layout-header">
                <Header />
            </header>
            <!-- 内容 -->
            <main class="layout-main-content">
                <Loading />
                <div class="router-view">
                    <div class="container">
                        <router-view v-slot="{ Component }">
                            <!-- 过渡动画 -->
                            <Transition name="fade" mode="out-in">
                                <!-- 页面缓存 -->
                                <KeepAlive :max="10">
                                    <component :is="Component"></component>
                                </KeepAlive>
                            </Transition>
                        </router-view>
                    </div>
                </div>
            </main>
        </section>
    </section>
</template>

<script lang="ts" setup>
import Menu from './components/menu/index.vue'
import Header from './components/header/index.vue'
import Loading from './components/loading.vue'
import { computedExpanded } from '@/hooks/layout'
</script>

<style lang="scss" scoped>
.layout-content {
    display: flex;
    height: 100%;
    .layout-menu {
        width: 256px;
        height: 100%;
        transition: width 0.3s ease-in-out;
    }
    .layout-menu-pack {
        width: 68px;
    }
    .layout-main {
        flex: 1;
        // overflow-y: auto;
        height: 100%;
        display: flex;
        flex-direction: column;

        .layout-main-content {
            overflow: hidden;
            flex: 1;
            background-color: var(--td-bg-color-page);
            position: relative;
        }
        .router-view {
            box-sizing: border-box;
            height: 100%;
            padding: 20px;
            overflow: auto;
            .container {
                background-color: var(--td-bg-color-container);
                height: 100%;
            }
        }
    }
}

@keyframes fadeInLeft {
    from {
        opacity: 0;
        -webkit-transform: translate3d(-5%, 0, 0);
        transform: translate3d(-5%, 0, 0);
    }

    to {
        opacity: 1;
        -webkit-transform: translate3d(0, 0, 0);
        transform: translate3d(0, 0, 0);
    }
}

@keyframes fadeOutRight {
    from {
        opacity: 1;
    }

    to {
        opacity: 0;
        -webkit-transform: translate3d(5%, 0, 0);
        transform: translate3d(5%, 0, 0);
    }
}

.fade-enter-active {
    animation: fadeInLeft 0.3s;
}

.fade-leave-active {
    animation: fadeOutRight 0.3s;
}
</style>
