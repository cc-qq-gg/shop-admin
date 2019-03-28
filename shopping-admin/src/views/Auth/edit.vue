<template>
  <el-dialog
    title="编辑用户"
    :visible.sync="fomrVisible"
    width="40%">
    <el-form
      :model="editForm"
      size="mini"
      label-position="left"
      ref="addFormEl"
      :rules="formRules">
      <el-form-item label="用户名" label-width="80px" prop="username">
        <el-input :value="editForm.username" :disabled='true' autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" label-width="80px" prop="email">
        <el-input v-model="editForm.email" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="电话" label-width="80px" prop="mobile">
        <el-input v-model="editForm.mobile" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="fomrVisible = false">取 消</el-button>
      <el-button type="primary" @click.prevent="handleEdit(editForm.id)">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { editUserInfo } from '@/api/user.js'
export default {
  name: 'UserEdit',
  data () {
    return {
      fomrVisible: false,
      editForm: {
        username: '',
        email: '',
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
    async handleEdit (id) {
      const { meta } = await editUserInfo(id, this.editForm)
      if (meta.status === 200) {
        this.fomrVisible = false
        this.$message({
          type: 'success',
          message: '修改成功！'
        })
        this.$emit('edited')
      }
    },
    showEditDialog (data) {
      this.editForm = data
      this.fomrVisible = true
    }
  }
}
</script>

<style>
</style>
