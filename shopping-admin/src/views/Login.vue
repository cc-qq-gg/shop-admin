<template>
  <div class="login-wrap">
  <div class="login-form">
  <el-form ref='form' :model="loginForm" :rules='loginFormRule'>
    <el-form-item prop="username">
      <el-input v-model="loginForm.username" placeholder="用户名"></el-input>
      <div class="box"></div>
    </el-form-item>
    <el-form-item prop="password">
      <el-input type="password" v-model="loginForm.password" placeholder="密码"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button class='login-submit' type="primary" @click="handleLogin">登陆</el-button>
    </el-form-item>
  </el-form>
</div>
</div>
</template>

<script>

import axios from 'axios'

export default {
  name: 'Login',
  data () {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginFormRule: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleLogin () {
      // 验证输入是否合法
      this.$refs['form'].validate(valid => {
        if (!valid) {
          return
        }
        axios.post('http://localhost:8888/api/private/v1/login', this.loginForm)
          .then(res => {
            const { data, meta } = res.data
            const { status, msg } = meta
            console.log(meta)
            if (status === 200) {
              console.log(data.token)
              window.localStorage.setItem('token', data.token)
              this.$router.replace('/')
              this.$message({
                message: '登陆成功',
                type: 'success'
              })
            } else if (status === 400) {
              this.$message.error(msg)
            }
          })
      })
    }
  },
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.box {
  height: 100px;
  width: 100px;
  background: palevioletred;
  position: absolute;
  top: -110px;
  left: 50%;
  margin-left: -50px;
  border-radius: 50%;
}
  .login-wrap {
    width: 100%;
    height: 100%;
    background-color: #3d434c;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .login-wrap .login-form {
    background-color: #fff;
    padding: 60px 50px 20px 50px;
    width: 25%;
    border-radius: 5px;
  }
  .login-wrap .login-form .login-submit{
    width: 100%;
  }
</style>
