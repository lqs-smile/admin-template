<template>
    <div class="loading" :class="{ hidden: !loading }">
        <div class="loader"></div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import router from '@/router/index'
import { useRouterStore } from '@/store/router'

const loading = ref(false)

router.beforeEach((to, from, next) => {
    console.log('beforeEach', to, from)

    console.log('keepAlive', useRouterStore().keepAlive)
    console.log('to.path', to.path)

    if (!useRouterStore().keepAlive.find((item) => item.path === to.path)) {
        loading.value = true
    }

    next()
})

router.afterEach((to, from) => {
    setTimeout(() => {
        loading.value = false
    }, 500)
})

onMounted(() => {})
</script>
<style scoped lang="scss">
.loading {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    backdrop-filter: blur(4px);
    background-color: rgba(242, 242, 242, 0.45);
    z-index: 999;
    display: flex;
}
.loading.hidden {
    pointer-events: none;
    visibility: hidden;
    opacity: 0;
    transition: all 0.8s ease-out;
}

.dark .loading {
    background: #0d0d10;
}

.title {
    margin-top: 66px;
    font-size: 28px;
    font-weight: 600;
    color: rgb(0 0 0 / 85%);
}

.dark .title {
    color: #fff;
}

.loader {
    position: relative;
    width: 48px;
    height: 48px;
}

.loader::before {
    position: absolute;
    top: 60px;
    left: 0;
    width: 48px;
    height: 5px;
    content: '';
    background: hsl(var(--primary, 210 100% 50%) / 50%);
    border-radius: 50%;
    animation: shadow-ani 0.5s linear infinite;
}

.loader::after {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    content: '';
    background: hsl(var(--primary, 210 100% 50%));
    border-radius: 4px;
    animation: jump-ani 0.5s linear infinite;
}

@keyframes jump-ani {
    15% {
        border-bottom-right-radius: 3px;
    }

    25% {
        transform: translateY(9px) rotate(22.5deg);
    }

    50% {
        border-bottom-right-radius: 40px;
        transform: translateY(18px) scale(1, 0.9) rotate(45deg);
    }

    75% {
        transform: translateY(9px) rotate(67.5deg);
    }

    100% {
        transform: translateY(0) rotate(90deg);
    }
}

@keyframes shadow-ani {
    0%,
    100% {
        transform: scale(1, 1);
    }

    50% {
        transform: scale(1.2, 1);
    }
}
</style>
