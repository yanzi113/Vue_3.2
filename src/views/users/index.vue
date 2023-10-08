<template>
  <el-card>
    <el-row :gutter="20" class="header">
      <el-col :span="7">
        <el-input
          :placeholder="$t('table.placeholder')"
          clearable
          v-model="queryForm.query"
        >
        </el-input>
      </el-col>
      <el-button type="primary" :icon="Search">{{
        $t('table.search')
      }}</el-button>
      <el-button type="primary">{{ $t('table.adduser') }}</el-button>
    </el-row>
  </el-card>
  <el-table :data="tableData" stripe style="width: 100%">
    <el-table-column
      :prop="item.prop"
      :label="item.label"
      v-for="(item, index) in options"
      :key="index"
    >
      <template #default v-if="item.prop === 'action'">
        <el-button type="primary" size="small">Primary</el-button>
        <el-button type="warning" size="small">Warning</el-button>
        <el-button type="danger" size="small">Danger</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup>
import { ref } from 'vue'
import { Search } from '@element-plus/icons-vue'
import { getUser } from '@/api/users'
import { options } from './options'
const queryForm = ref({
  query: '',
  pagenum: 1,
  pagesize: 2
})
const tableData = ref([])
const initGetUsersList = async () => {
  const res = await getUser(queryForm.value)
  console.log(res)
  tableData.value = res.users
}
initGetUsersList()
</script>

<style lang="scss" scoped>
.header {
  padding-bottom: 16px;
  box-sizing: border-box;
}
</style>
