<template>
  <div class="auth">

<el-row class="row">
    <el-col :span="6" class="inputbox">
      <el-input placeholder="请输入内容" v-model.trim="searchText" @keyup.enter.native="handleSearch" class="input-with-select">
        <el-button slot="append" icon="el-icon-search" @click="handleSearch"></el-button>
      </el-input>
    </el-col>
    <el-col :span="2">
      <el-button type="primary" class="inputbox" @click="dialogFormVisible = true">添加用户</el-button>
    </el-col>
  </el-row>
  <!-- 添加用户对话框 -->
   <el-dialog title="添加用户" :visible.sync="dialogFormVisible">
    <el-form ref="form" :model="addUserForm" label-position="left" size="small" :rules="formRule">
      <el-form-item label="用户名" label-width="80px" prop="username">
        <el-input v-model="addUserForm.username" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" label-width="80px" prop="password">
        <el-input v-model="addUserForm.password" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" label-width="80px" prop="email">
        <el-input v-model="addUserForm.email" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="电话" label-width="80px" prop="mobile">
        <el-input v-model="addUserForm.mobile" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item>
       <!-- <div slot="footer" class="dialog-footer"> -->
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button class='login-submit' type="primary" @click="handleAddUser">提交</el-button>
    <!-- </div> -->
    </el-form-item>
    </el-form>

  </el-dialog>
     <el-table
      v-loading="loading"
  :data="tableData"
  border
  style="width: 100%">
  <el-table-column
    prop="id"
    label="id"
    width="80">
  </el-table-column>
  <el-table-column
    prop="username"
    label="姓名"
    width="80">
  </el-table-column>
  <el-table-column
    prop="create_time"
    label="日期"
    width="150">
  </el-table-column>
  <el-table-column
    prop="role_name"
    label="级别"
    width="150">
  </el-table-column>
  <el-table-column
    prop="mobile"
    label="电话"
    width="130">
  </el-table-column>
  <el-table-column
    label="状态"
    width="60">
     <template slot-scope="scope">
        <el-switch
          v-model="scope.row.mg_state"
          active-color="#13ce66"
          @change="changeSwitch(scope.row.id, scope.row.mg_state)"
        >
</el-switch>
      </template>
  </el-table-column>
  <el-table-column label="操作" width="250">
      <template slot-scope="scope">
          <el-button
            size="mini"
            @click="$refs.UserEdit.showEditDialog(scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.row)">删除</el-button>
         <el-button type="success" icon="el-icon-check" size="mini"
         @click="$refs.RoleEdit.showEditRoleDialog(scope.row)">分类角色</el-button>
       </template>
      </el-table-column>
</el-table>
<!-- 分页栏 -->
 <div class="block">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[4, 8, 16, 32]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
  <!-- 编辑用户对话框 -->
  <UserEdit ref='UserEdit' @edited='loadUsersByPage'></UserEdit>
  <!-- 编辑用户对话框 -->

  <!-- 编辑用户角色 -->
  <userEditRole ref='RoleEdit' @roleEdited='loadUsersByPage'></userEditRole>
  <!-- 编辑用户角色 -->

  </div>
</template>
<script>
// import axios from 'axios'
import { getUserList, addUser, changeUserState, deleteUser } from '@/api/user.js'
import UserEdit from './edit.vue'
import UserEditRole from './userEditRole.vue'
export default {
  name: 'auth',
  created () {
    // 如果参数值为undefined，测使用默认值
    this.loadUsersByPage()
  },
  data () {
    return {
      loading: true,
      pagesize: 4,
      pagenum: 1,
      searchText: '',
      total: 0,
      currentPage4: 1,
      tableData: [{
        create_time: '',
        role_name: '',
        username: '',
        mobile: '',
        id: '',
        mg_state: ''
      }],
      dialogFormVisible: false,
      addUserForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      formRule: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 16, message: '密码为 3 - 16 位长度', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' }
        ]
      },
      search: ''
    }
  },
  methods: {
    // 编辑用户提交
    // async handleEdit (data) {
    //   const { meta, status } = await editUserInfo(data.id)
    //   if (status === 200) {
    //     console.log(data.id)
    //   }
    // },
    // 单个删除
    handleDelete (data) {
      const id = data.id
      this.$confirm('确认删除吗？', '删除提示', {
        confirmButtonText: '确定',
        cancelButtonText: '  取消'
      }).then(async () => {
        const { data, meta } = await deleteUser(id)
        console.log(data, meta)
        if (meta.status === 200) {
          this.$message({
            type: 'success',
            message: '删除成功！'
          })
          this.loadUsersByPage(this.pagenum, this.pagesize)
        }
      }).catch((err) => {
        console.log(err)
        this.$message({
          type: 'info',
          message: '已取消删除！'
        })
      })
      // deleteUser()
      console.log(data.id)
    },
    // 添加用户
    handleAddUser () {
      // 表单验证，会返回promise对象
      this.$refs['form'].validate(async valid => {
        if (!valid) {
          return
        }
        const { meta: { status, msg } } = await addUser(this.addUserForm)
        if (status === 201) {
          this.dialogFormVisible = false
          // console.log(msg)
          this.$message({
            message: '添加成功',
            type: 'success'
          })
          // 清空表单
          this.$refs['form'].resetFields()
          // 更新列表
          this.loadUsersByPage()
        } else if (status === 400) {
          this.$message.error(msg)
        }
        // axios({
        //   method: 'post',
        //   url: 'http://localhost:8888/api/private/v1/users',
        //   data: this.addUserForm,
        //   headers: {
        //     Authorization: window.localStorage.getItem('token')
        //   }
        // })
        //   .then(res => {
        //     const { meta } = res.data
        //     const { status, msg } = meta
        //     if (status === 201) {
        //       this.dialogFormVisible = false
        //       console.log(msg)
        //       this.$message({
        //         message: '添加成功',
        //         type: 'success'
        //       })
        //       // 清空表单
        //       this.$refs['form'].resetFields()
        //       // 更新列表
        //       this.loadUsersByPage(1)
        //     } else if (status === 400) {
        //       this.$message.error(msg)
        //     }
        //   })
      })
    },
    // 查询
    handleSearch () {
      this.loadUsersByPage(1, this.pagesize)
    },
    // 每页显示项数
    handleSizeChange (val) {
      this.pagesize = val
      console.log(val)
      this.loadUsersByPage(1, this.pagesize)
    },
    // 翻页
    handleCurrentChange (val) {
      console.log(val)
      this.pagenum = val
      this.loadUsersByPage(val, this.pagesize)
    },
    // 加载成员
    async loadUsersByPage (pagenum, pagesize) {
      console.log(arguments.length)
      if (arguments.length === 0) {
        pagesize = this.pagesize
        pagenum = this.pagenum
      }
      this.loading = true
      let { data: { total }, data: { users } } = await getUserList({ pagesize, pagenum, query: this.searchText })
      this.tableData = users
      console.log(users)
      this.total = total
      this.loading = false
      if (total === 0) {
        this.$message('没有相关用户！')
      }
      // axios.get('http://localhost:8888/api/private/v1/users', {
      // // 需要授权的API必须使用authorization字段，提供token令牌
      //   headers: {
      //     Authorization: window.localStorage.getItem('token')
      //   },
      //   params: {
      //     pagenum: num, // 告诉服务器要获取第一页的数据
      //     pagesize: this.pagesize, // 告诉服务器，每页5条
      //     query: this.searchText// 查询方法
      //     // 页数项对应的服务器公式为(P*n,n)
      //   }
      // }).then(res => {
      //   const { data: { data: { users } }, data: { data: { total } } } = res
      //   this.tableData = users
      //   this.total = total
      //   this.loading = false
      //   if (total === 0) {
      //     this.$message('没有相关用户！')
      //   }
      // })
    },
    // 更改状态
    async changeSwitch (id, state) {
      const data = await changeUserState(id, state)
      if (data.meta.status === 200) {
        this.handleCurrentChange(this.pagenum)
        this.$message({
          type: 'success',
          message: `${data.data.mg_state ? '启用' : '禁用'}用户状态成功！`
        })
      }
    }
  },
  components: {
    UserEdit,
    UserEditRole
  }
}
</script>

<style>
.auth {
  line-height: 20px;
}
.navroute {
  padding: 20px 10px;
  background-color: #CCC;
}
.el-button.inputbox {
  width: 100px;
  margin-left: 70px;
}
.el-row.row {
  padding:10px;
}
.inputbox.el-col {
  width:250px;
}
</style>
