<template>
<div>
<el-dialog title="用户权限" :visible.sync="dialogFormVisible">
<el-input
  placeholder="输入关键字进行过滤"
  v-model="filterText">
</el-input>

<el-tree
  class="filter-tree"
  :data="data2"
  :props="defaultProps"
  default-expand-all
  show-checkbox
  node-key="id"
  :default-expanded-keys="defaultChecked"
  :default-checked-keys="defaultChecked"
  :filter-node-method="filterNode"
  ref="tree">
</el-tree>
<!-- <el-form-item> -->
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button class='login-submit' type="primary" @click="getCheckedNodes">提交</el-button>
    <!-- </el-form-item> -->
</el-dialog>
</div>

</template>

<script>
import { rightList, updateAuth } from '@/api/right'
export default {
  // 筛选过滤监听函数
  watch: {
    filterText (val) {
      this.$refs.tree.filter(val)
    }
  },
  methods: {
    filterNode (value, data) {
      if (!value) return true
      return data.authName.indexOf(value) !== -1
    },
    async getCheckedNodes () {
      const tree = this.$refs.tree
      // 可能因为后端sqp语句，此处的id要以对对象装字符串的形式传入
      const rids = [...tree.getCheckedKeys(), ...tree.getHalfCheckedKeys()].join(',')
      const { meta } = await updateAuth(this.roleId, rids)
      if (meta.status === 200) {
        this.$message({
          type: 'success',
          message: '修改权限成功！'
        })
        this.dialogFormVisible = false
        this.$emit('updateRids')
      }
    },
    async show (row) {
      // 每个用户都有自己的的权限信息
      this.roleId = row.id
      this.dialogFormVisible = true
      const { data } = await rightList('tree')
      // console.log(data)
      this.data2 = data
      // 设置权限选中
      this.rightsShow(row.children)
      // console.log(this.defaultChecked)
    },
    rightsShow (roleRights) {
      console.log(roleRights)
      // ！！！！此处数组应该要重头更新，要么清空，要么重新等于另一个对象
      this.defaultChecked = []
      roleRights.forEach(first => {
        first.children.forEach(second => {
          second.children.forEach(third => {
            this.defaultChecked.push(third.id)
          })
        })
      })

      console.log(this.defaultChecked)
    }
  },
  data () {
    return {
      authIds: [],
      roleId: '',
      dialogFormVisible: false,
      defaultChecked: [],
      filterText: '',
      data2: [],
      defaultProps: {
        children: 'children',
        label: 'authName'
      }
    }
  },
  created () {
    // this.show()
  }
}
</script>
