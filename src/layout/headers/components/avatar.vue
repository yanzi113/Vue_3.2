<template>
  <el-dropdown>
    <span class="el-dropdown-link">
      <el-avatar shape="square" :size="60" :src="squareUrl" />
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="logout">退出</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
const store = useStore()
const squareUrl = ref(
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuJlG6pbg_q5aGGgI7w6OaicC5szlkXkNwEw&usqp=CAU'
)
const logout = () => {
  store.dispatch('app/logout')
}
</script>

<style lang="scss" scoped>
::v-deep .el-dropdown-menu_item {
  white-space: nowrap;
}
</style>
