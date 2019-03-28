<template>
  <el-dialog
    title="编辑用户角色"
    :visible.sync="fomrVisible"
    width="40%">
    <el-form
      :model="editForm"
      size="mini"
      label-position="left"
      ref="FormEl"
      :rules="formRules">
      <el-form-item label="用户名" label-width="80px" prop="username">
        <el-input v-model="editForm.username" autocomplete="off" disabled></el-input>
      </el-form-item>
      <el-form-item label="角色" label-width="80px" prop="email">
        <el-input v-model="editForm.email" autocomplete="off"></el-input>
        <el-select placeholder="请选择" v-model="editForm.rid">
        <!-- <el-option :value="-1" label="请选择"></el-option> -->
       <el-option
         v-for="(item) in roles"
         :label="item.roleName"
         :key='item.id'
         :value="item.id">
       </el-option>
     </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="fomrVisible = false">取 消</el-button>
      <el-button type="primary" @click.prevent="handleEditRole">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { searchUserById, editUserInfo } from '@/api/user'
import { getRoleList, updateUserRoleByUserId } from '@/api/role.js'
export default {
  name: 'UserEditRole',
  data () {
    return {
      fomrVisible: false,
      roles: [],
      editForm: {
        id: '',
        rid: '',
        mobile: ''
      },
      formRules: {
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入电话', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    async handleEditRole () {
      const { id: userId, rid: roleId } = this.editForm
      const { meta, data } = await updateUserRoleByUserId(userId, roleId)
      console.log(meta, data)
      if (meta.status === 200) {
        this.$emit('roleEdited')
        // 关闭对话框
        this.fomrVisible = false
        this.$message({
          type: 'success',
          message: '分配用户角色成功'
        })
      }
    },
    async submitEdit () {
      const { id, email, mobile } = this.editForm
      const { meta } = await editUserInfo(id, {
        email,
        mobile
      })
      if (meta.status === 200) {
        this.$emit('edit-role-success')
        this.fomrVisible = false
        this.$message({
          type: 'success',
          message: '分配成功'
        })
      }
    },

    async showEditRoleDialog (item) {
      const { data, meta } = await searchUserById(item.id)
      console.log(data, meta)
      if (meta.status === 200) {
        this.editForm = data
        this.fomrVisible = true // 显式弹框
      }
      const { data: roleData } = await getRoleList()
      this.roles = roleData
    }
  }
}
</script>

<style>
</style>
