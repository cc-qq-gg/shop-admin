<template>
  <div class="login-wrap">
  <div class="login-form">
  <el-form ref='form' :model="loginForm" :rules='loginFormRule'>
    <el-form-item prop="username">
      <el-input v-model="loginForm.username" placeholder="用户名"></el-input>
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
  name: 'HelloWorld',
  data () {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginFormRule: {
        username: [
          { require: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { require: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleLogin () {
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
              window.localStorage.setItem('token', data.token)
              this.$router.push('/')
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
    padding: 50px 50px 20px 50px;
    width: 25%;
  }
  .login-wrap .login-form .login-submit{
    width: 100%;
  }
</style>
