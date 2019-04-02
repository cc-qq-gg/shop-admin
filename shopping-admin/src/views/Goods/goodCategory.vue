 <template>
 <div>
   <el-row :span='4'>
     <el-input placeHolder='haha'></el-input>
     <el-button type='primary' @click="showAdd">添加分类</el-button>
   </el-row>
<el-table
    :data="tableData"
    style="width: 100%;margin-bottom: 20px;"
    border
    row-key="cat_id">
    <el-table-column
      prop="cat_name"
      label="分类名称"
      sortable
      width="180">
    </el-table-column>
    <el-table-column
      label="是否有效"
      width="180">
      <template slot-scope="scope">
        {{ scope.row.cat_deleted ? '无效' : '有效' }}
      </template>
    </el-table-column>
    <el-table-column
      label="排序">
      <template slot-scope="scope">
        {{ ['一级', '二级', '三级'][scope.row.cat_level] }}
      </template>
    </el-table-column>
    <el-table-column
      label="操作">
      <template>
        <el-button size="mini" type="danger">删除</el-button>
        <el-button size="mini" type="primary">编辑</el-button>
      </template>
    </el-table-column>
  </el-table>
  <goodCategoryAdd ref="categoryAddEl" @add-success="loadCategoriesList" />
 </div>
  </template>

  <script>
  import { getCategoriesList } from '@/api/goods'
  import goodCategoryAdd from './goodCategoryAdd'
    export default {
      name: 'goodCategory',
      components: {
        goodCategoryAdd
      },
      data() {
        return {
          tableData: []
        }
      },
      created () {
        this.loadCategoriesList()
      },
      methods: {
        showAdd () {
           this.$refs.categoryAddEl.show()
        },
        async loadCategoriesList () {
          this.loading = true
          const { data, meta } = await getCategoriesList()
          console.log('loadCategories=>', data, meta)
          if (meta.status === 200) {
            this.tableData = data
            this.loading = false
          }
        }
      }
    }
  </script>

  <style scope>
   .el-table.table th,.el-table.table td {
     line-height: 20px;
   }
  </style>
