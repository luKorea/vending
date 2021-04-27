<template>
    <div class="app-container">
        <avue-crud v-bind="bindVal" v-on="onEvent" v-model="form" :before-open="beforeOpen" :page.sync="page">
            <template slot="menuLeft">
                <el-button slot="deriveExcel" type="primary" class="el-icon-download" size="small" :loading="deriveExcelloading" @click.native="deriveExcel">导出商家</el-button>
            </template>
            <template slot="fileName" slot-scope="scope">
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
          {
            label: "状态", prop: "status", type: 'select', width: 60, dicData: [{ value: 0, label: '未完成' }, { value: 1, label: '已完成' }, { value: 2, label: '已失败' },
            ]
          },
          { label: "文件下载", prop: "fileName", solt: true },
        ],

      },
    }
  },
  created() {

  },
  methods: {
    deriveExcel() {
      let that = this;
      that.deriveExcelloading = true;
      req('/company/deriveExcel', {}, "GET", true).then(function (res) {
        that.deriveExcelloading = false;
        that.getList()
      }).catch(function (error) {
        that.deriveExcelloading = false;
      });
    },
    listBefore() {
      this.params.type = this.type
    },
   
  }
}
</script>
