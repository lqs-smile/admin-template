<template>
    <div class="header">
        <!-- 面包屑 -->
        <div class="breadcrumb">
            <div class="tools">
                <!-- 收藏夹 -->
                <t-popup
                    style="
                        padding: 0 !important;
                        border-radius: 8px !important;
                        overflow: hidden !important;
                    "
                    placement="bottom-right"
                    trigger="click"
                >
                    <template #content>
                        <Favorite />
                    </template>
                    <div class="like-icon">
                        <t-tooltip content="收藏夹">
                            <SvgIcon name="like" size="20px" />
                        </t-tooltip>
                    </div>
                </t-popup>

                <Breadcrumb />
            </div>
            <div class="right-wrap">
                <Setting />

                <t-popup placement="top-right" showArrow>
                    <template #content>
                        <div class="userInfo-wrap">
                            <div class="info">
                                <div class="userName">
                                    <div class="userName-text">
                                        {{ useUserStore().userInfo.userName }}
                                    </div>
                                    <t-tag theme="success" variant="light">管理员</t-tag>
                                </div>
                                <div class="userEmail">
                                    {{ useUserStore().userInfo.userEmail || 'Admin@kbj.com' }}
                                </div>
                            </div>
                            <div class="setting">
                                <div
                                    v-for="item in settingList"
                                    :key="item.path"
                                    class="setting-item"
                                >
                                    <div className="setting-left">
                                        <SvgIcon :name="item.icon" size="16px" />
                                        <span>{{ item.name }}</span>
                                    </div>
                                    <SvgIcon name="right" size="14px" />
                                </div>
                            </div>
                            <div class="loginout">
                                <t-button
                                    theme="default"
                                    size="medium"
                                    @click="handleClick('logout')"
                                >
                                    <SvgIcon
                                        className="loginout-icon"
                                        name="loginout"
                                        size="20px"
                                    />
                                    退出登录
                                </t-button>
                            </div>
                        </div>
                    </template>
                    <div class="user">
                        <span>{{ useUserStore().userInfo.userName }} </span>
                        <SvgIcon className="down-icon" name="down" size="24px" />
                    </div>
                </t-popup>
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
import Favorite from '../favorite/Favorite.vue'
import { computedExpanded, setExpanded } from '@/hooks/layout'
import { useUserStore } from '@/store/user'

onMounted(() => {})

const handleClick = (e) => {
    if (e.value === 'logout') {
        useUserStore().logout()
    }
}

const settingList = [
    {
        name: '个人中心',
        icon: 'user',
        path: '/user-center'
    },
    {
        name: '修改密码',
        icon: 'openLock',
        path: '/user-setting'
    }
]
</script>
<style scoped lang="less">
@import '../../layout.less';
:global(.t-popup .t-popup__content) {
    padding: 0 !important;
    border-radius: 8px !important;
    overflow: hidden !important;
}

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
        margin-right: 4px;
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
.down-icon {
    color: var(--td-text-color-secondary);
}
.userInfo-wrap {
    width: 180px;
    padding: 8px;
    background-color: var(--td-bg-color-container);
}
.info {
    .userName {
        font-weight: 500;
        font-size: 16px;
        color: var(--td-text-color-primary);
        line-height: 24px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .userName-text {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            flex: 1;
        }
    }
    .userEmail {
        margin-top: 4px;
        font-weight: 400;
        font-size: 14px;
        color: var(--td-text-color-secondary);
        line-height: 24px;
    }
}
.setting {
    padding: 20px 0;
    .setting-item {
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 12px 12px;
        border-radius: 4px;
        transition: background-color 0.2s ease-in-out;
        &:hover {
            background-color: var(--td-bg-color-secondarycontainer);
        }
        .setting-left {
            display: flex;
            align-items: center;
        }
        .icon {
            font-size: 18px;
        }
    }
}
.loginout {
    display: flex;
    align-items: center;
    justify-content: center;
}
:deep(.t-popup .t-popup__content) {
    background-color: red !important;
    padding: 0 !important;
    border-radius: 8px !important;
    overflow: hidden !important;
}
</style>
