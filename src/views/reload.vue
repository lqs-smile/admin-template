<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
defineOptions({
    name: 'Reload'
})
const router = useRouter()

onMounted(() => {
    router.go(-1)
})
</script>

<template>
    <div />
</template>
