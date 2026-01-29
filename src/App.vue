<script setup lang="ts">
import { useConfigStore } from '@/store/config'
import { onMounted } from 'vue'

onMounted(() => {
    useConfigStore().modeChange(useConfigStore().isDarkMode)
})
</script>

<template>
    <router-view></router-view>
</template>

<style scoped>
#app {
    height: 100vh;
}
</style>
