 <template>
   <!-- 添加用户对话框 -->
   <el-dialog title="添加用户" :visible.sync="dialogFormVisible">
    <el-form ref="form" :model="addRole" label-position="left" size="small" :rules="formRule">
      <el-form-item label="角色名" label-width="80px" prop="roleName">
        <el-input v-model="addRole.roleName" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="描述" label-width="80px" prop="roleDesc">
        <el-input v-model="addRole.roleDesc" auto-complete="off"></el-input>
      </el-form-item>
<el-form-item>
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button class='login-submit' type="primary" @click="handleAddRole">提交</el-button>
    </el-form-item>
    </el-form>

  </el-dialog>
 </template>

<script>
import { addRole } from '@/api/role.js'
export default {
  name: 'roleAdd',
  data () {
    return {
      dialogFormVisible: false,
      addRole: {
        roleName: '',
        roleDesc: ''
      },
      formRule: {
      //  此处名字是表格里的prop属性的
        roleName: [
          { required: true, message: '请输入角色名称', trigger: 'blur' }
        ],
        roleDesc: [
          { required: true, message: '请输入描述', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    show () {
      this.dialogFormVisible = true
    },
    handleAddRole () {
      this.$refs['form'].validate(async valid => {
        if (!valid) {
          return
        }
        const { meta } = await addRole(this.addRole)
        if (meta.status === 201) {
          this.dialogFormVisible = false
          this.$message({
            type: 'success',
            message: '角色添加成功！'
          })
          this.$refs['form'].resetFields()
          this.$emit('roleAdded')
        }
      })
    }
  }
}
</script>

<style>
</style>
