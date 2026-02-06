<template>
    <!-- <div class="login-wrap" :style="{ backgroundImage: `url(${BG})` }"> -->
    <div class="login-wrap">
        <div class="login-form">
            <h2 class="title">用户登录</h2>
            <div class="login-form-content">
                <Account />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
// import SvgIcon from '@/components/svg-icon.vue'
import Account from './components/Account.vue'
import BG from '@/assets/login_bg.png'
</script>
<style lang="less" scoped>
.login-wrap {
    /* overflow: scroll; */
    width: 100vw;
    height: 100vh;
    // background-color: #c4e5fd;
    background-color: var(--td-bg-color-container);
    position: relative;
    background-size: cover;
    background-position: center;

    .login-form {
        padding: 67px 56px 0;
        box-sizing: border-box;
        .title {
            padding: 0;
            margin: 0;
            font-family: MicrosoftYaHei, MicrosoftYaHei;
            font-weight: bold;
            font-size: 32px;
            // color: #333333;
            color: var(--td-text-color-primary);
            line-height: 32px;
            text-align: center;
            font-style: normal;
        }
        .login-form-content {
            margin-top: 24px;
            border-top: 1px solid var(--td-component-stroke);
            padding-top: 32px;
        }
        width: 522px;
        height: 560px;
        // background: rgba(255, 255, 255, 0.6);
        background-color: var(--td-bg-color-secondarycontainer);
        box-shadow: var(--td-shadow-3);
        border-radius: 14px;
        backdrop-filter: blur(1px);
        position: absolute;
        top: 50%;
        transform: translate(-50%, -50%);
        right: 200px;
        transform: translateY(-50%);
    }
}
</style>
