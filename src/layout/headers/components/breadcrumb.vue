<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item v-for="(item, index) in breadcrumbList" :key="index">
      <!-- 最后一项 -->
      <span class="no-redirect" v-if="index === breadcrumbList.length - 1">{{
        $t(`menus.${item.name}`)
      }}</span>
      <!-- 第一项且点击跳转 -->
      <span class="redirect" v-else @click="handleRedirect(item.path)">{{
        $t(`menus.${item.name}`)
      }}</span>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup>
// 获取数据
import { watch, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
// 获取当前路由的完整路由表
const router = useRouter()
const breadcrumbList = ref([])
const initBreadcrumbList = () => {
  breadcrumbList.value = route.matched
  console.log(route.matched)
}
const handleRedirect = (path) => {
  router.push(path)
}
watch(
  route,
  () => {
    initBreadcrumbList()
  },
  { deep: true, immediate: true }
)
</script>

<style lang="scss" scoped>
.no-redirect {
  color: #97a8be;
  cursor: text;
}
.redirect {
  color: #666;
  font-weight: 600;
  cursor: pointer;
  &:hover {
    color: $menuBg;
  }
}
</style>
