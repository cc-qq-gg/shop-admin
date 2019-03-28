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
      :router="true">
      <el-submenu :index="first.id.toString()"
      v-for='first in menuList' :key='first.id'>

        <template slot="title"><i class="el-icon-location"></i>
        <span>{{first.authName}}</span>
        </template>

          <el-menu-item :index="`/${second.path}`"
          v-for='second in first.children'
          :key="second.id"
          >{{second.authName}}</el-menu-item>
      </el-submenu>
    </el-menu>
  </el-aside>
    <el-container class="el-container-main">
      <el-main>
        <el-breadcrumb separator="/" class="navroute">
  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item>
  <el-breadcrumb-item>活动列表</el-breadcrumb-item>
  <el-breadcrumb-item>活动详情</el-breadcrumb-item>
</el-breadcrumb>
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
import { getMenuList } from '@/api/right'
export default {
  name: 'Layout',
  components: {
  },
  created () {
    this.loadMenuList()
  },
  data () {
    return {
      yes: true,
      menuList: []
    }
  },
  methods: {
    async loadMenuList () {
      const { data, meta } = await getMenuList()
      if (meta.status === 200) {
        this.menuList = data
      }
      console.log('data', data)
    },
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
    /* line-height: 160px; */
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
