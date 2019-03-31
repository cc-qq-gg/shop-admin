<template>
 <div ref="editor" style="text-align:left"></div>
</template>
<script>

import E from 'wangeditor'
import { upload } from '@/api/goods'

export default {
  name: 'Editor',
  props: ['content'],
  data () {
    return {

    }
  },
  mounted () {
    // 初始化编辑器
    const editor = new E(this.$refs.editor)
     // 配置服务端地址
    editor.customConfig.uploadImgServer = ''

   /*
     *以下是文档的上传要求的方式，可以自定义上传方式
    */
    // 自定义 fileName
  //  editor.customConfig.uploadFileName = 'file'
  //   //  配置请求上传自定义请求头：添加 token到header中
  //   editor.customConfig.uploadImgHeaders = {
  //     Authorization: getToken()
  //   }

  /*
  自定义上传方式
  */
  editor.customConfig.customUploadImg = async (files, insert) => {
    // files 是 input 中选中的文件列表
    // insert 是获取图片 url 后，插入到编辑器的方法
    const { data, meta } = await upload(files)
    if (meta.status === 200) {
      insert(`http://localhost:8888/${data.tmp_path}`)
    }
    // 上传代码返回结果之后，将图片插入到编辑器中
    // 调用该方法，生成 img 标签，src 指向传递的 imgUrl
    // imgUrl？是上传到服务器的服务端图片访问路径，一个 Web 访问路径 http://xxxx.jpg
    // insert('http://img.redocn.com/201808/20180817/20180817_3beb7f1d22ca9c33139biwRzfgXcizir.png')
  }
    // 同步编辑器内容到vue组件中
  editor.customConfig.onchange = (html) => {
    // 向父组件传递参数，并同步
    // 同步修辞符
    this.$emit('update:content',html)
    // this.editorContent = html
    }
     // 创建生成
    editor.create()
  }
}
</script>
<style>

</style>
