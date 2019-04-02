<template>
  <div class="goods-add-wrap">
    <!-- 步骤条 -->
    <el-steps finish-status="success" :active='activeStep'>
      <el-step title="步骤 1"></el-step>
      <el-step title="步骤 2"></el-step>
      <el-step title="步骤 3"></el-step>
      <el-step title="步骤 4"></el-step>
      <el-step title="步骤 5"></el-step>
    </el-steps>
    <!-- /步骤条 -->
 <!-- 侧边导航标签页 -->
    <el-tabs tab-position="left" @tab-click='handleTabClick'>
      <el-tab-pane label="基本信息">
        <el-form :label-position="labelPosition" label-width="100px" :model="formData" class='addTable'>
          <el-form-item label="商品名称">
            <el-input v-model="formData.goods_name"></el-input>
          </el-form-item>
          <el-form-item label="商品价格">
            <el-input v-model.number="formData.goods_price"></el-input>
          </el-form-item>
          <el-form-item label="商品重量">
            <el-input v-model.number="formData.goods_weight"></el-input>
          </el-form-item>
          <el-form-item label="商品数量">
            <el-input v-model.number="formData.goods_number"></el-input>
          </el-form-item>
            <el-form-item label="商品分类">
              <el-cascader
                :options="goodsCategories"
                expand-trigger="hover"
                :props="{
                  value: 'cat_id',
                  label: 'cat_name',
                  children: 'children'
                }"
                v-model="formData.goods_cat">
              </el-cascader>
          </el-form-item>
          <el-form-item label="是否促销">
            <el-radio-group v-model="formData.is_promote">
              <el-radio :label="true">促销</el-radio>
              <el-radio :label="false">不用，谢谢</el-radio>
            </el-radio-group>
        </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="商品参数">
         <el-row v-for="attr in goodsCategoryAttrs" :key="attr.attr_id">
          <el-col :span="4">{{ attr.attr_name }}</el-col>
          <el-col :span="20">
            <!--
              1. 它里面可以得到选中的多个节点的 value
            -->
            <el-checkbox-group v-model="attr.attr_selected_vals" size="small">
              <el-checkbox
                :label="val"
                :key="val.active"
                border
                v-for="val in attr.attr_vals.split(',')"></el-checkbox>
            </el-checkbox-group>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="商品属性">
        <el-form label-width="150px" >
          <el-form-item :label="item.attr_name" v-for="item in goodsCategoryParams" :key="item.attr_id">
            <el-input v-model="item.attr_vals"></el-input>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="商品图片">
        <!--
          action 上传的接口地址
            上传组件会自动去请求接口进行上传
            由于请求不是我们发送的，所以要写完整的请求路径
            包括接口的 token 都需要我们自己手动的配置
          on-preview 预览成功的处理函数
          :on-remove 删除图片的时候
         -->
        <el-upload
          action="http://localhost:8888/api/private/v1/upload"
          :headers="uploadHeaders"
          :file-list="fileList"
          :on-success="handleUploadSuccess"
          list-type="picture">
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-tab-pane>
      <el-tab-pane label="商品内容">
        <Editor :content.sync='formData.goods_introduce '></Editor>
      </el-tab-pane>
    </el-tabs>
    <!-- /侧边导航标签页 -->

    <!-- <el-radio-group v-model="labelPosition" size="small">
      <el-radio-button label="left">左对齐</el-radio-button>
      <el-radio-button label="right">右对齐</el-radio-button>
      <el-radio-button label="top">顶部对齐</el-radio-button>
  </el-radio-group> -->
<div style="margin: 20px;"></div>
 <el-button>取消</el-button>
            <el-button type="primary" @click.prevent="handleSubmit">保存</el-button>
  </div>
</template>
<script>
import E from 'wangeditor'
import { getCategoriesList, addGoods, getGoodsCategoryAttrs, upload } from '@/api/goods'
import { getToken } from '@/utils/token.js'
import Editor from '@/components/wangEditor'
export default {
  name: 'GoodsAdd',
  components: {
    Editor
  },
  data () {
    return {
      activeStep: 0,
      uploadHeaders: { // 上传组件自定义请求头
        Authorization: getToken()
      },
      fileList: [], // 图片列表
      goodsCategoryAttrs: [], // 商品属性
      goodsCategoryParams: [], // 商品参数
      labelPosition: 'right',
      goodsCategories: [],
      formData: {
        goods_name: '',
        goods_cat: [],
        goods_price: '',
        goods_number: '',
        goods_weight: '',
        goods_introduce: '',
        is_promote: ''
      },
      active: 0
    }
  },
  created () {
    this.getGoodsCategories()
  },
  methods: {
    handleEditorChange (html) {
      console.log(html)
      // this.formData.goods_introduce = html
    },
    async handleSubmit () {
      console.log('canshu', this.goodsCategoryAttrs)
      const {
        goods_name: goodsName,
        goods_cat: goodsCat,
        goods_price: goodsPrice,
        goods_number: goodsNumber,
        goods_weight: goodsWeight,
        goods_introduce
      } = this.formData
      // 将商品参数里选中的属性集中在一个数组里，然后上传，many
      const categoryAttrs  = this.goodsCategoryAttrs
        .map(attr => {
          console.log(attr.attr_selected_vals)
          return {
            attr_id: attr.attr_id,
            attr_value: attr.attr_selected_vals.join(',')
          }
        })
        .filter(attr => attr.attr_value.length > 0)
      //  商品参数，only
        const categoryParams = this.goodsCategoryParams.map(attr => {
                return {
                  attr_id: attr.attr_id,
                  attr_value: attr.attr_vals
                }
      })
      // 处理商品的图片
      const pics = this.fileList.map(item => {
        console.log(item)
        const a = document.createElement('a')
        a.href = item.url
        return {
          pic: a.pathname // 图片的服务端访问路径
        }
      })
      const attrs = [...categoryAttrs,...categoryParams]
      const { data, meta } = await addGoods({
        goodsName,
        goodsCat: goodsCat.join(','),
        goodsPrice,
        goodsNumber,
        goodsWeight,
        attrs,
        pics,
        goods_introduce
      })
      console.log('设置参数',data, meta)
      if (data.meta.status === 201) {
        this.$router.replace('/goods')
        this.$message({
          type: 'success',
          message: '添加商品成功！'
        })
      }
    },
    async getGoodsCategories () {
      const { data, meta } = await getCategoriesList()
      console.log(data, meta)
      if (meta.status === 200) {
        this.goodsCategories = data
      }
    },
    handleTabClick (currentTab) {
      this.activeStep = Number.parseInt(currentTab.index)
      if (currentTab.label === '商品参数' || currentTab.label === '商品属性') {
        // 获取商品的分类id
        const { goods_cat } = this.formData
        console.log(this.formData)
        // 判断是否已经选择分类
        if (goods_cat.length === 0) {
          this.$message({
            type: 'warning',
            message: '请选择商品分类!'
          })
          return
        }
        if (currentTab.label === '商品参数') {
         // 如果用户选择了商品分类，则动态就加载分类参数
         this.loadGoodsCategoryAttrs()
      } else if (currentTab.label === '商品属性') {
        this.loadGoodsCategoryParams()
       }
      }
    },
    // 商品属性
    async loadGoodsCategoryAttrs () {
      // console.log('haha')  ????? 状态码200，无法获取参数，要么没有，既然成功应该就是没有
      const catId = this.formData.goods_cat
      const { data, meta } = await getGoodsCategoryAttrs(catId[catId.length - 1])
      if (meta.status === 200 && data.length !== 0) {
        data.forEach(attr => {
           attr.attr_selected_vals = attr.attr_vals.split(',')
        })
        // 复选框接收一个数组，白痴版的错错误，在更改数组前赋值
        this.goodsCategoryAttrs = data
      } else {
        this.$message({
          type: 'warning',
          message: '该属性没有参数！'
        })
        return
      }
    },
    // 商品参数
    async loadGoodsCategoryParams () {
      const { goods_cat } = this.formData
      const { data, meta } = await getGoodsCategoryAttrs(goods_cat[goods_cat.length - 1], 'only')
      if (meta.status === 200) {
        this.goodsCategoryParams = data
        console.log('parmas',data)
      }
    },
     /**
     * 图片上传成功处理函数
     * response 是上传请求的响应结果数据
     * file 是上传的那个文件的信息对象
     * fileList 是存储文件信息的列表数据
     */
    handleUploadSuccess (response, file, fileList) {
      console.log('response => ', response)
      console.log('file => ', file)
      console.log('fileList => ', fileList)
      // fileList 用于默认被展示的图片列表
      // 我们将上传成功的图片信息存储到这个数组中
      // 之后需要提交给添加商品接口
      this.fileList.push({
        name: file.name, // 接口要求名字叫 pic
        url: `http://localhost:8888/${response.data.tmp_path}`
      })
     }
  }
}
</script>

<style scoped>
.el-tabs {
  margin-left: -20px;
  margin-top: 20px;
}
.addTable {
  text-align: left;
}
</style>
