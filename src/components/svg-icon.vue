<!-- components/SvgIcon.vue -->
<template>
    <svg :class="svgClass" :style="{ width: size, height: size }" aria-hidden="true">
        <use :href="iconName" />
    </svg>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
    name: {
        type: String,
        required: true
    },
    size: {
        type: [String, Number],
        default: '16px'
    },
    color: {
        type: String,
        default: 'currentColor'
    },
    className: {
        type: String,
        default: ''
    }
})

const iconName = computed(() => `#icon-${props.name}`)
const svgClass = computed(() => {
    const defaultClass = 'svg-icon t-icon '
    if (props.className) {
        return ` ${defaultClass} ${props.className}`
    }
    return defaultClass
})
</script>

<style scoped>
.svg-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    fill: currentColor !important; /* 关键：继承color属性 */
    stroke: currentColor !important;
    overflow: hidden;
    margin-right: 8px;
}
/* 添加到你的CSS文件中 */
svg * {
    fill: currentColor !important;
    stroke: currentColor !important;
}
</style>
