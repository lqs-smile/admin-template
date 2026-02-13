<template>
    <div class="favorite">
        <div class="collect-pannel">
            <div class="head">
                <div class="title">
                    <span class="">收藏夹</span>
                    <div class="split"></div>
                    <span class="tip">可按住菜单拖拽排序</span>
                </div>
                <div>
                    <SvgIcon className="icon" name="expended" size="20px" />
                </div>
            </div>
            <div class="like-list">
                <div class="like-item" v-for="item in likeList" :key="item.name">
                    <span class="name">{{ item.name }}</span>
                    <SvgIcon className="icon" name="hotkey-delete" size="16px" />
                </div>
            </div>
        </div>
        <div class="menu-list-pannel">
            <div class="head">
                <div class="title">
                    <span class="">全部页面</span>
                </div>
                <div class="head-right">
                    <span class="tip">点击收藏、下次快捷访问</span>
                    <SvgIcon className="icon" name="off-bp" size="16px" />
                </div>
            </div>
            <div class="menu-list">
                <t-tabs :value="tabCurrent" @change="handlerChange">
                    <t-tab-panel :value="item.path" v-for="item in menuData" :key="item.path">
                        <template #label>
                            <SvgIcon :name="item.icon" class="tabs-icon-margin" /> {{ item.root }}
                        </template>
                        <div class="tab-content">
                            <div class="tab-item" v-for="child in item.items" :key="child.name">
                                {{ child.meta.title }}
                                <SvgIcon className="icon" name="like-false" size="18px" />
                            </div>
                        </div>
                    </t-tab-panel>
                </t-tabs>
            </div>
        </div>
    </div>
</template>

<script setup>
import SvgIcon from '@/components/svg-icon.vue'
import { useRouterNodeList } from '@/hooks/useRouterInfo'
import { onMounted, ref, watch } from 'vue'

const isExpanded = ref(false)

const likeList = ref([
    {
        name: '收藏夹1'
    },
    {
        name: '收藏夹2'
    },
    {
        name: '收藏夹3'
    },
    {
        name: '收藏夹4'
    },
    {
        name: '收藏夹5'
    },
    {
        name: '收藏夹6'
    },
    {
        name: '收藏夹7'
    }
])

const menuList = useRouterNodeList()
const menuData = ref([])

const tabCurrent = ref(null)
// 递归处理数据
const handleMenuList = (list) => {
    const arr = []
    for (let i = 0; i < list.length; i++) {
        if (list[i].children && list[i].children.length) {
            arr.push(...handleMenuList(list[i].children))
        } else {
            arr.push(list[i])
        }
    }
    return arr
}

watch(
    menuList,
    (newVal) => {
        const res = newVal.map((item) => {
            return {
                root: item.meta.title,
                path: item.path,
                icon: item.meta.icon,
                items: item.children ? handleMenuList(item.children) : [item]
            }
        })
        console.log(res, 'res')
        tabCurrent.value = res[0].path
        menuData.value = res
    },
    { immediate: true }
)

const handlerChange = (val) => {
    tabCurrent.value = val
}

onMounted(() => {})
</script>
<style scoped lang="less">
:deep(.t-tabs) {
    background-color: var(--td-bg-color-secondarycomponent);
}
.favorite {
    display: flex;
    // align-items: center;
    background-color: var(--td-bg-color-secondarycomponent);
    .collect-pannel {
        border-right: 1px solid var(--td-border-level-1-color);
        // max-height: 800vh;
        overflow-y: auto;
        width: 414px;
        min-height: 200px;
        // line-height: 50px;
        box-sizing: border-box;
        font-size: 16px;
        color: #fff;
        // padding: 12px 16px;
        flex-direction: column;
        .like-list {
            flex: 1;
            // border: 1px solid var(--td-brand-color);
            padding: 14px 16px;
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            grid-gap: 12px;
            .like-item {
                position: relative;
                cursor: pointer;
                // height: 44px;
                line-height: 32px;
                border-radius: 6px;
                font-size: 14px;
                display: flex;
                align-items: center;
                justify-content: center;
                background-color: var(--td-bg-color-container);
                color: var(--td-text-color-primary);
                &:hover {
                    background-color: var(--td-bg-color-container-hover);
                }

                & > svg {
                    position: absolute;
                    top: -7px;
                    right: -14px;
                }
                .icon {
                    color: var(--td-text-color-primary);
                    // margin-left: 8px;
                }
            }
        }
    }
    .menu-list-pannel {
        width: 560px;
        height: 100%;
        background-color: var(--td-bg-color-secondarycomponent);
        .head-right {
            display: flex;
            align-items: center;
            .tip {
                margin-right: 10px;
            }
        }
        .tab-content {
            padding: 14px 16px;
            //九宫格布局
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            grid-gap: 24px;
            .tab-item {
                position: relative;
                cursor: pointer;
                // height: 44px;
                line-height: 32px;
                border-radius: 6px;
                font-size: 14px;
                display: flex;
                align-items: center;
                justify-content: center;
                background-color: var(--td-bg-color-container);
                color: var(--td-text-color-primary);
                &:hover {
                    background-color: var(--td-bg-color-container-hover);
                }
                & > svg {
                    position: absolute;
                    top: -7px;
                    right: -14px;
                    transform: rotate(15deg);
                }
            }
        }
    }
    .head {
        // height: 44px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 14px 16px;
        border-bottom: 1px solid var(--td-border-level-1-color);
        .split {
            width: 0.5px;
            height: 16px;
            background-color: var(--td-text-color-secondary);
            margin: 0 15px;
        }
    }
    .title {
        display: flex;
        align-items: center;
        color: var(--td-primary-color);
        font-size: 16px;
        font-weight: 400;
    }
    .tip {
        font-size: 14px;
        color: var(--td-text-color-secondary);
    }
}
</style>
