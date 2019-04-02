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
    <el-menu
     @select='handleSelect'
     @open='handleOpen'
     unique-opened
     :default-active="$route.path"
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

  <el-breadcrumb-item v-for="(item, index) in breadNames" :key="index">{{item}}</el-breadcrumb-item>
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
  // 没加async时，初始化没有显示，逻辑正确=》那么必然没有获取到数据》列表初始化函数未完成面包屑就已经加载完了
  // 所以让数据加载完在执行面包屑函数
  async created () {
    // 异步执行
    await this.loadMenuList()
    this.handleSelect(this.$route.path)
    console.log('hah',this.$route.path)
  },
  data () {
    return {
      yes: true,
      menuList: [],
      breadNames: []
    }
  },
  methods: {
    handleOpen (a,b) {
        console.log(a, b)
    },
    handleMenuSelect (names) {
      this.breadNames = names
    },
    handleSelect (index) {
      console.log('init index', index)
      console.log('breadNames', this.breadNames)
      console.log('menuList', this.menuList)
      const secondPath = index.substr(1)
      // 根据二级路径找到一级
      this.menuList.forEach(first => {
        // find 会遍历数据，将符合 second.path === secondPath 条件的元素返回
        const second = first.children.find(second => {
          return second.path === secondPath
        })
        if (second) { // 如果找到 second
          // console.log(first.authName, second.authName)
          // 重新赋值breadNames
          this.handleMenuSelect([first.authName, second.authName])
        }
      })
    },
    async loadMenuList () {
      const { data, meta } = await getMenuList()
      if (meta.status === 200) {
        this.menuList = data
      }
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
