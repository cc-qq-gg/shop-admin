<template>
<el-table
  :data="rights"
  border
  stripe
  style="width: 100%">
  <el-table-column type="index"></el-table-column>
  <el-table-column
    prop="authName"
    label="权限名称"
    width="180">
  </el-table-column>
  <el-table-column
    prop="path"
    label="路径"
    width="180">
  </el-table-column>
  <el-table-column
    label="层级">
    <!-- 插槽作用域的使用 -->
    <template slot-scope="scope">
      {{ ['一级', '二级', '三级'][scope.row.level] }}
    </template>
  </el-table-column>
</el-table>
</template>

<script>
import { rightList } from '@/api/right.js'

export default {
  name: 'RightsList',
  data () {
    return {
      rights: []
    }
  },
  created () {
    this.loadRights()
  },
  methods: {
    async loadRights () {
      const { meta, data } = await rightList('list')
      if (meta.status === 200) {
        this.rights = data
      }
    }
  }
}
</script>

<style>
.el-table__header.has-gutter{
  height: 50px;
}
</style>
