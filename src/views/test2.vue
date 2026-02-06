<template>
    <t-form ref="form">
        <t-form-item label="用户名" help="这是用户名字段帮助说明" name="account">
            <t-input></t-input>
        </t-form-item>
    </t-form>
</template>
<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
defineOptions({
    name: 'Test2'
})
const router = useRouter()
onMounted(() => {})
</script>
<style scoped lang="less"></style>
