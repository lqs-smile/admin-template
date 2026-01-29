<template>
    <div style="width: 100%">
        <t-form
            :rules="rules"
            ref="form"
            :data="formData"
            :colon="true"
            :label-width="0"
            @reset="onReset"
            @submit="onSubmit"
        >
            <t-form-item name="account">
                <t-input
                    size="large"
                    v-model="formData.account"
                    clearable
                    placeholder="请输入账户名"
                >
                    <template #prefix-icon>
                        <SvgIcon className="svg" name="username" size="18px" />
                    </template>
                </t-input>
            </t-form-item>

            <t-form-item name="password">
                <t-input
                    size="large"
                    v-model="formData.password"
                    type="password"
                    clearable
                    placeholder="请输入密码"
                >
                    <template #prefix-icon>
                        <SvgIcon className="svg" name="password" size="18px" />
                    </template>
                </t-input>
            </t-form-item>

            <t-form-item name="rememberPassword">
                <t-checkbox v-model="formData.rememberPassword" label="记住密码" />
            </t-form-item>

            <!-- 记住密码 -->

            <t-form-item>
                <t-button
                    :loading="loading"
                    class="login-btn"
                    size="large"
                    theme="primary"
                    type="submit"
                    block
                    >登录</t-button
                >
            </t-form-item>
        </t-form>
    </div>
</template>
<script setup>
import { reactive, ref } from 'vue'
import { MessagePlugin, NotifyPlugin } from 'tdesign-vue-next'
// import { DesktopIcon, LockOnIcon } from 'tdesign-icons-vue-next'
import SvgIcon from '@/components/svg-icon.vue'
import { Md5Encrypt } from '@/utils/aes'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/store/user'
const router = useRouter()

const formData = reactive({
    account: '',
    password: '',
    rememberPassword: false
})

const rules = {
    account: [{ required: true, message: '请输入账户名' }],
    password: [{ required: true, message: '请输入密码' }]
}

const onReset = () => {
    MessagePlugin.success('重置成功')
}

const loading = ref(false)

const onSubmit = ({ validateResult, firstError }) => {
    if (validateResult === true) {
        loginSubmit()
    } else {
        console.log('Validate Errors: ', firstError, validateResult)
        MessagePlugin.warning(firstError)
    }
}

// 登录请求
import { loginByJson } from '@/api/login'

// 登录
const loginSubmit = async () => {
    loading.value = true
    MessagePlugin.loading({ content: '登录中...', duration: 0 })
    const data = await loginByJson({
        loginName: formData.account,
        password: formData.password
    }).finally(() => {
        setTimeout(() => {
            loading.value = false
            MessagePlugin.closeAll()
        }, 500)
    })
    loginSuccess(data)
    setTimeout(() => {
        NotifyPlugin('success', {
            title: '登录成功',
            content: `Hi、欢迎回来，${useUserStore().userInfo.userName}`
        })
    }, 2000)
}
// 登录成功后
const loginSuccess = (data) => {
    const { token } = data
    // 登录成功后，将token存储到localStorage
    useUserStore().setUserInfo(data)
    // 登录成功后，将token存储到localStorage
    localStorage.setItem('token', token)
    // 登录成功后，重定向到首页
    router.push({
        path: '/',
        replace: true
    })
}
</script>

<style lang="scss" scoped>
.login-btn {
    background: linear-gradient(136deg, #3f97ee 0%, #006dda 100%);
    box-shadow: var(--td-shadow-3);
    border-radius: 4px;
    border: none;
}
</style>
