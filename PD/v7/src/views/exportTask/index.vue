<template>
    <div class="app-container">
        <avue-crud v-bind="bindVal" v-on="onEvent" v-model="form" :page.sync="page">
            <template slot="menuLeft">
                <el-button v-if="type==2" type="primary" class="el-icon-download" size="small" :loading="deriveExcelloading" @click.native="exportURL('/quelityTesting/exportQualityTesting')">导出质检费
                </el-button>
                <el-button v-if="type==3" type="primary" class="el-icon-download" size="small" :loading="deriveExcelloading" @click.native="exportURL('/company/deriveExcel')">导出商家</el-button>
                <el-button v-if="type==1" type="primary" class="el-icon-download" size="small" :loading="deriveExcelloading" @click.native="exportURL('/order/exportOrder')">导出订单</el-button>
            </template>
            <template slot="filePath" slot-scope="scope">
                <el-link v-if="scope.row.filePath&&scope.row.status==1" :href="scope.row.filePath" class="dowloadX" :download="scope.row.fileName+'.xlsx'" type="primary" style="font-size:12px"
                    icon="el-icon-download">
                    下载</el-link>
            </template>
        </avue-crud>
    </div>
</template>
<script>
import crudMix from "@/mixins/crudMix";
import { req } from '@/utils/req.js'
/**
 * TODO:导出记录
 */
export default {
  components: {
  },
  mixins: [
    crudMix,
  ],
  props: {
    type: {},
    exportParams: {},
  },
  data() {
    return {
      deriveExcelloading: false,
      config: {
        detail: '',
        save: '',
        delete: '',
        update: '',
        list: '/exportTask/getExportTaskList'
      },
      method: {//修改请求method post GET
        list: 'GET',
      },
      rowKey: 'id',
      option: {
        index: false,
        menu: false,
        column: [
          { label: "ID", prop: "id", width: 60 },
          {
            label: "操作用户", prop: "name",
            formatter: function (row, value, label, column) {
              return `${row.name}(${row.userName})`
            },
          },
          { label: "创建时间", prop: "createTime" },
          ...this.column_select("状态", "status", false, {
            width: 60,
            dicData: [
              { value: 0, label: '未完成' },
              { value: 1, label: '已完成' },
              { value: 2, label: '已失败' },
              { value: 3, label: '部分数据导入失败' }
            ]
          }),
          { label: "文件名", prop: "fileName", },
          { label: "文件下载", prop: "filePath", solt: true },
        ],
      },
    }
  },
  methods: {
    //导出 
    exportURL(url) {
      let that = this;
      that.deriveExcelloading = true;
      req(url, this.exportParams, "GET", true).then(function (res) {
        that.deriveExcelloading = false;
        that.getList()
      }).catch(function (error) {
        that.deriveExcelloading = false;
      });
    },
    //列表获取前
    listBefore() {
      this.params.type = this.type
    },

  }
}
</script>
