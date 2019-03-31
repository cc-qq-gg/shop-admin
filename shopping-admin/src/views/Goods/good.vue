<template>
<div class="goods-wrap">
  <!-- 操作选项 -->
  <el-row :gutter="20">
    <el-col :span="4">
      <el-input
        placeholder="请输入内容"
         v-model='searchText'
         @keyup.enter.native="loadGoodsList(1)">
        <i slot="prefix" class="el-input__icon el-icon-search"></i>
      </el-input>
    </el-col>
    <el-col :span="4">
      <el-button type="primary" @click="$router.push('/goodAdd')">添加商品</el-button>
    </el-col>
  </el-row>
  <!-- /操作选项 -->

  <!-- 数据列表 -->
  <el-table
    :data="goodsData"
    border
    stripe
    style="width: 100%">
    <el-table-column
      type='index'
      :index="indexMethod"
      label="编号"
      width="50">
    </el-table-column>
    <el-table-column
      prop="goods_name"
      label="产品名称"
      width="180">
    </el-table-column>
    <el-table-column
      prop="goods_price"
      label="价格"
      width="180">
    </el-table-column>
    <el-table-column
      prop="add_time"
      label="创建时间">
      <!-- 组件模板中设置插槽<slot>，组件中就可以使用其他组件 -->
      <template slot-scope="scope">
        {{scope.row.add_time | dateFormat}}
      </template>
    </el-table-column>
    <el-table-column
      prop="goods_weight"
      label="商品重量(单位: g)">
    </el-table-column>
     <el-table-column
     width='180' label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="$refs.roleEdit.show(scope.row)"><i class="el-icon-edit"></i></el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.row.id)"><i class="el-icon-delete"></i></el-button>
        <el-button
          size="mini"
          type="warning"
          @click="$refs.roleAuthEdit.show(scope.row)"><i class="el-icon-check"></i></el-button>
      </template>
    </el-table-column>
  </el-table>
  <!-- /数据列表 -->

  <!-- 数据分页 -->
  <div class="block">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="100"
      :current-page.sync="pagenum"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
    <!--
    :current-page.sync="page" 分页组件会把当前页面同步到 page 属性
   -->
  </div>
  <!-- /数据分页 -->
</div>
</template>
<script>
// import dayjs from 'dayjs'
import { getGoodsList } from '@/api/goods'
export default {
  name: 'GoodList',
  data () {
    return {
      searchText: '',
      goodsData: [],
      pagenum: 1,
      pagesize: 10,
      total: 20
    }
  },
  created () {
    this.loadGoodsList()
    console.log(1111)
  },
  methods: {
    indexMethod (index) {
      // 自定义成序列号
      return index + 1 + (this.pagenum - 1) * this.pagesize
    },
    async loadGoodsList (pagenum, pagesize) {
      const { data, meta } = await getGoodsList({ pagenum, pagesize, query: this.searchText })
      if (meta.status === 200) {
        const goods = data.goods
        // 注册全局过滤器后，下列代码就显得多余了
        // goods.forEach(item => {
        //   item.add_time = dayjs(item.add_time).format('YYYY-MM-DD HH:mm:ss SSS [Z] A')
        // })
        this.goodsData = goods
        this.total = data.total
      }
      console.log('goodsList', data, meta)
    },
    handleSizeChange (val) {
      this.pagesize = val
      this.loadGoodsList(this.pagenum, val)
    },
    handleCurrentChange (val) {
      this.pagenum = val
      this.loadGoodsList(val, this.pagesize)
    }
  }
}
</script>
<style>

</style>
