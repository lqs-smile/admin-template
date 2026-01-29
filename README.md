## 组件库 TDesign

https://tdesign.tencent.com/vue-next/overview

## store 状态管理 pinia

https://pinia.vuejs.org/zh/introduction.html

## 首屏动画

https://github.com/hooray/vite-plugin-app-loading/blob/main/README.CN.md

## vue标准命名规范与项目结构

```bash
# 推荐结构
src/
├── components/
│   ├── base/              # 文件夹：小写
│   │   ├── AppButton.vue  # 文件：PascalCase
│   │   └── AppInput.vue
│   ├── features/
│   │   └── user-profile/  # 文件夹：kebab-case
│   │       ├── UserProfile.vue      # 主组件：PascalCase
│   │       ├── UserAvatar.vue       # 子组件：PascalCase
│   │       └── constants.js         # JS文件：camelCase
│   └── layouts/
│       ├── MainLayout.vue
│       └── AuthLayout.vue
├── views/
│   ├── user-profile-view/     # 文件夹：kebab-case
│   │   └── UserProfileView.vue # 文件：PascalCase
│   └── product/
│       ├── ProductListView.vue
│       └── ProductDetailView.vue
└── composables/
    ├── use-user-profile.js    # JS文件：kebab-case
    └── useProductApi.js      # 或者 camelCase
```
