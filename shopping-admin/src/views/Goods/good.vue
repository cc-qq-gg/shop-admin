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
      <el-button type="primary">添加商品</el-button>
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
      prop=""
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
      prop="address"
      label="地址">
    </el-table-column>
     <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="$refs.roleEdit.show(scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.row.id)">删除</el-button>
        <el-button
          size="mini"
          type="warning"
          @click="$refs.roleAuthEdit.show(scope.row)">授权角色</el-button>
      </template>
    </el-table-column>
  </el-table>
  <!-- /数据列表 -->

  <!-- 数据分页 -->
  <div class="block">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
  <!-- /数据分页 -->
</div>
</template>
<script>
import { getCategoriesList, getGoodsList } from '@/api/goods'
export default {
  name: 'GoodList',
  data () {
    return {
      searchText: '',
      currentPage4: 4,
      goodsData: [],
      pagenum: 1,
      pagesize: 20,
      total: 20
    }
  },
  created () {
    this.loadGoodsList()
    console.log(1111)
  },
  methods: {
    async loadGoodsList (pagenum,pagesize) {
      console.log(pagenum,pagesize)
      const { data, meta } = await getGoodsList({pagenum,pagesize,query:this.searchText})
      if (meta.status === 200) {
        this.goodsData = data.goods
        this.total = data.total
      }
      console.log('goodsList', data, meta)
    },
      handleSizeChange(val) {
        this.pagesize = val
        this.loadGoodsList(this.pagenum,val)
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.pagenum = val
        this.loadGoodsList(val,this.pagesize)

      }
  }
}
</script>
<style>

</style>
