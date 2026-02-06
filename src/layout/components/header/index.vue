<template>
    <div class="header">
        <!-- 面包屑 -->
        <div class="breadcrumb">
            <div class="tools">
                <!-- 收藏夹 -->
                <div class="like-icon">
                    <SvgIcon name="like" size="20px" />
                </div>

                <Breadcrumb />
            </div>
            <div class="right-wrap">
                <Setting />
                <t-dropdown
                    :options="[
                        { content: '退出登录', value: 'logout' },
                        { content: '个人中心', value: 'userCenter' }
                    ]"
                    trigger="hover"
                    @click="handleClick"
                >
                    <div class="user">
                        <span>{{ useUserStore().userInfo.userName }} </span>
                        <SvgIcon name="down" size="12px" />
                    </div>
                </t-dropdown>
            </div>
        </div>
        <!-- 页签 -->
        <div class="tab">
            <PageTags />
        </div>
    </div>
</template>

<script setup>
import { onMounted } from 'vue'
import Breadcrumb from './Breadcrumb.vue'
import Setting from '../setting/Setting.vue'
import PageTags from './PageTags.vue'
import SvgIcon from '@/components/svg-icon.vue'
import { computedExpanded, setExpanded } from '@/hooks/layout'
import { useUserStore } from '@/store/user'

onMounted(() => {})

const handleClick = (e) => {
    if (e.value === 'logout') {
        useUserStore().logout()
    }
}
</script>
<style scoped lang="less">
@import '../../layout.less';
.header {
    .breadcrumb {
        height: @header-height;
        width: 100%;
        background: var(--td-bg-color-container);
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 20px;
        box-sizing: border-box;
    }
}

.t-breadcrumb-item {
    color: #fff !important;
    font-size: 16px !important;
}

.tools {
    display: flex;
    align-items: center;
}

.user {
    cursor: pointer;
    display: flex;
    align-items: center;
    & > span {
        margin-right: 8px;
        font-weight: 500;
        font-size: 16px;
        color: var(--td-text-color-primary);
        line-height: 24px;
    }
}
.right-wrap {
    display: flex;
    align-items: center;
}

.like-icon {
    display: flex;
    align-items: center;
    user-select: none;
    cursor: pointer;
    transition: transform 0.2s ease-in-out;
    &:hover {
        transform: scale(1.15);
    }
    color: var(--td-text-color-secondary);
}
</style>
