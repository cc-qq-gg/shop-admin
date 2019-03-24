<template>
  <div class="box">
  <el-container>
  <el-header>
    <el-row :gutter="20">
  <el-col :span="4">beautiful</el-col>
  <el-col :span="16">电商后台管理系统</el-col>
  <el-col :span="4"><el-button type="success" @click="handleLogout" round>退出</el-button></el-col>
    </el-row>
  </el-header>
  <el-container class="el-container-side">
    <el-aside width="200px" height="100%" style="background-color: #545c64">
    <el-menu :default-openeds="['1', '3']"
    background-color="#545c64"
     text-color="#fff"
      active-text-color="#ffd04b"
      router=true>
      <el-submenu index="1">
        <template slot="title"><i class="el-icon-location"></i>用户管理</template>
          <el-menu-item index="/auth">用户列表</el-menu-item>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title"><i class="el-icon-location"></i>权限管理</template>
          <el-menu-item index="2-1">选项1</el-menu-item>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title"><i class="el-icon-location"></i>商品管理</template>
          <el-menu-item index="3-1">选项1</el-menu-item>
      </el-submenu>
      <el-submenu index="4">
        <template slot="title"><i class="el-icon-location"></i>订单管理</template>
          <el-menu-item index="4-1">选项1</el-menu-item>
      </el-submenu>
      <el-submenu index="5">
        <template slot="title"><i class="el-icon-location"></i>数据管理</template>
          <el-menu-item index="5-1">选项1</el-menu-item>
      </el-submenu>
    </el-menu>
  </el-aside>
    <el-container class="el-container-main">
      <el-main>
        <router-view/>
      </el-main>
      <!-- <el-footer>Footer</el-footer> -->
    </el-container>
  </el-container>
</el-container>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Layout',
  components: {
  },
  data () {
    return {
      yes: true
    }
  },
  methods: {
    handleLogout () {
      this.$confirm('are you', '确定退出吗？', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 清除token
        window.localStorage.removeItem('token')
        // 跳回登录页
        this.$router.push('/login')
        // 退出成功提示
        this.$message({
          type: 'success',
          message: '退出成功'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消退出'
        })
      })
    }
  }
}
</script>

<style scoped>
.el-header {
padding: 0;
}
.grid-content .bg-purple {
    height: 100%;
}
.el-menu-item-group>.el-menu-item-group__title {
  display: none;
}
.el-row {
    margin-top: 10px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .el-submenu__title {
    height: 44px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
  .box {
    height: 100%;
  }
  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 44px;
  }
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 80px;
  }
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }
  .el-submenu__title {
    line-height: 40px;
    height: 40px;
  }
  .el-container {
    height: 100%;
  }
  body > .el-container {
    margin-bottom: 40px;
  }
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 60px;
  }
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>
