<template>
    <div class="box">我是蓝色的盒子</div>
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
<style scoped lang="less">
.box {
    width: 200px;
    height: 200px;
    border: 2px solid black;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;
    font-weight: bold;
    background-color: blue;
    position: relative;
    z-index: auto; /* 创建层叠上下文 */
    border-radius: 50%;
}

.box::after {
    z-index: -1;
    content: '';
    background-color: red;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}
</style>
