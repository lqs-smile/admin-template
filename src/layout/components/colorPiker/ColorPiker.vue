<template>
    <div class="color-piker-container">
        <div
            v-for="item in colorList"
            @click="changeColor(item.name)"
            :key="item.name"
            class="color-item"
        >
            <div class="color-preview" :style="{ background: item.color }"></div>
            <span> {{ item.name }}</span>
            <div
                v-if="item.name === curColor"
                class="active"
                :style="{ border: `2px solid ${item.color}` }"
            ></div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useConfigStore } from '@/store/config'
const store = useConfigStore()
onMounted(() => {})

const colorList = [
    {
        name: '默认',
        color: '#0052d9'
    },
    {
        name: '紫罗兰',
        color: '#7166f0'
    },
    {
        name: '樱花粉',
        color: '#e84a6c'
    },
    {
        name: '玫瑰红',
        color: '#bb1b1b'
    },
    {
        name: '天蓝色',
        color: '#4e69fd'
    },
    {
        name: '深蓝色',
        color: '#1b2a69'
    },
    {
        name: '浅绿色',
        color: '#0bd092'
    },
    {
        name: '深绿色',
        color: '#0d9496'
    },
    {
        name: '橙黄色',
        color: '#efbd48'
    }
]

const curColor = ref('默认')

const changeColor = (name) => {
    curColor.value = name
    const targetColor = colorList.find((item) => item.name === name)
    setThemeColor(targetColor.color)
}

// 设置主题色
const setThemeColor = (themeColor) => {
    store.changeBrandTheme(themeColor)
}
</script>
<style scoped lang="less">
.color-piker-container {
    display: grid;
    display: grid;
    grid-template-columns: 33.33% 33.33% 33.33%;
    grid-template-rows: 33.33% 33.33% 33.33%;
    width: 250px;
    height: 250px;
    background-color: var(--td-bg-color-container);
    .color-item {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: transform 0.2s ease-in-out;
        color: var(--td-text-color-primary);
        font-size: 12px;
        & > .active {
            border-radius: 16px;
            width: 75%;
            height: 75%;
            position: absolute;
        }
        .color-preview {
            width: 24px;
            height: 24px;
            border-radius: 4px;
            margin-bottom: 5px;
        }
        &:hover {
            transform: scale(1.15);
        }
    }
}
</style>
