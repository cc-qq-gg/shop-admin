 <template>
   <!-- 添加用户对话框 -->
   <el-dialog title="添加用户" :visible.sync="dialogFormVisible">
    <el-form ref="form" :model="editRole" label-position="left" size="small" :rules="formRule">
      <el-form-item label="角色名" label-width="80px" prop="roleName">
        <el-input v-model="editRole.roleName" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="描述" label-width="80px" prop="roleDesc">
        <el-input v-model="editRole.roleDesc" auto-complete="off"></el-input>
      </el-form-item>
<el-form-item>
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button class='login-submit' type="primary" @click="handleRoleEdited(editRole.roleId)">提交</el-button>
    </el-form-item>
    </el-form>

  </el-dialog>
 </template>

<script>
import { getRole, roleEdited } from '@/api/role.js'
export default {
  name: 'roleEdit',
  data () {
    return {
      dialogFormVisible: false,
      editRole: {
        roleName: '',
        roleDesc: ''
      },
      formRule: {
      //  此处名字是表格里的prop属性的
        roleName: [
          { required: true, message: '请输入角色名称', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    async show (row) {
      this.dialogFormVisible = true
      const { data, meta } = await getRole(row.id)
      if (meta.status === 200) {
        this.editRole = data
      }
    },
    handleRoleEdited (id) {
      this.$refs['form'].validate(async valid => {
        if (!valid) {
          return
        }
        const { roleName, roleDesc, roleId } = this.editRole
        const { meta } = await roleEdited({ roleName, roleDesc, roleId })
        console.log(meta)
        if (meta.status === 200) {
          this.dialogFormVisible = false
          this.$message({
            type: 'success',
            message: '更改成功！'
          })
          this.$emit('roleEdited')
        }
      })
    }
  }
}
</script>

<style>
</style>
