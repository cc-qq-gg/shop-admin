
<template>
<div>
  <el-row>
    <el-col :span="4">
      <el-button type="primary" @click='$refs.roleAdd.show()'>添加角色</el-button>
    </el-col>
  </el-row>
  <!-- 添加角色 -->
<roleAdd ref='roleAdd' @roleAdded='loadList'></roleAdd>
<!-- 添加角色 -->

<!-- 编辑角色 -->
<roleEdit ref='roleEdit' @roleEdited='loadList'></roleEdit>
<!-- 编辑角色权限 -->
<editRoleRight ref='roleAuthEdit' @updateRids='loadList'></editRoleRight>
  <!-- 角色列表 -->
  <el-table
    :data="tableData"
    border
    stripe
    style="width: 100%">
    <el-table-column type="expand">
      <!-- 列表扩展 -->
      <template slot-scope="scope">
        <el-row class="first" v-for="first in scope.row.children" :key="first.id">
          <!-- 一级 -->
          <el-col :span="4">
            <el-tag closable>{{ first.authName }}</el-tag>
            <i class="el-icon-arrow-right"></i>
          </el-col>

          <!-- 二级 -->
          <el-col :span="20">
            <el-row class="second" v-for="second in first.children" :key="second.id">
              <el-col :span="6">
                <el-tag closable type="success">{{ second.authName }}</el-tag>
                <i class="el-icon-arrow-right"></i>
              </el-col>

              <!-- 三级 -->
              <el-col :span="18">
                <el-tag class="third"
                 @close="handleRightDelete( scope.row, third.id)"
                 v-for="third in second.children"
                 :key="third.id"
                 closable type="warning">
                 {{ third.authName }}</el-tag>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </template>
    </el-table-column>
    <el-table-column
      prop="id"
      label="#"
      width="140">
    </el-table-column>
    <el-table-column
      prop="roleName"
      label="姓名"
      width="100">
    </el-table-column>
    <el-table-column
      prop="roleDesc"
      label="描述">
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="$refs.roleEdit.show(scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.row.id)">删除</el-button>
        <el-button
          size="mini"
          type="warning"
          @click="$refs.roleAuthEdit.show(scope.row)">授权角色</el-button>
      </template>
    </el-table-column>
  </el-table>
  <!-- /角色列表 -->
</div>
</template>

<script>
import roleAdd from './roleAdd.vue'
import roleEdit from './editRole.vue'
import editRoleRight from './editRoleRight'
import { getRoleList, roleDelete, rightDelete } from '@/api/role.js'
export default {
  name: 'RolesList',
  data () {
    return {
      tableData: []
    }
  },
  created () {
    this.loadList()
  },
  components: {
    roleAdd,
    roleEdit,
    editRoleRight
  },
  methods: {
    handleRightDelete (row, rightId) {
      this.$confirm('确认删除吗？', '删除提示', {
        confirmButtonText: '确定',
        cancelButtonText: '  取消'
      }).then(async () => {
        const { data, meta } = await rightDelete(row.id, rightId)
        if (meta.status === 200) {
          this.$message({
            type: 'success',
            message: '删除成功'
          })
          // 刷新页面任何部分都不跳转只能更改数据，
          // 返回的是删除后的数据，可以通过访问参数属性的形式将其赋值到当前权限列表
          row.children = data
        }
      }).catch((err) => {
        console.log(err)
        this.$message({
          type: 'info',
          message: '已取消删除！'
        })
      })
      console.log(999)
    },
    handleShowAuth (a) { console.log(a) },
    handleDelete (id) {
      this.$confirm('确认删除吗？', '删除提示', {
        confirmButtonText: '确定',
        cancelButtonText: '  取消'
      }).then(async () => {
        const { data: { meta } } = await roleDelete(id)
        if (meta.status === 200) {
          this.$message({
            type: 'success',
            message: '删除成功'
          })
          this.loadList()
        }
      }).catch((err) => {
        console.log(err)
        this.$message({
          type: 'info',
          message: '已取消删除！'
        })
      })
    },
    async loadList () {
      const { data, meta } = await getRoleList()
      if (meta.status === 200) {
        this.tableData = data
        console.log(data)
      }
    }
  }
}
</script>

<style scoped>
.second {
  padding: 0 0 5px 0;
}

</style>
