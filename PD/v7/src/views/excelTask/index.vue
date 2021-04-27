<template>
    <div class="app-container">
        <avue-crud v-bind="bindVal" v-on="onEvent" v-model="form" :before-open="beforeOpen" :page.sync="page">

        </avue-crud>
    </div>
</template>
<script>
import crudMix from "@/mixins/crudMix";
/**
 * TODO:导入记录
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
      config: {
        detail: '',
        save: '',
        delete: '',
        update: '',
        list: '/excelTask/getExcelTaskList'
      },
      method: {//修改请求method post GET
        list: 'GET',
      },
      rowKey: 'id',
      option: {
       
        index: true,
        menu: false,
        column: [
          { label: "ID", prop: "id", width: 60 },
          {
            label: "操作用户", prop: "name",
            formatter: function (row, value, label, column) {
              return `${row.name}(${row.userName})`
            },
          },
          { label: "导入开始时间", prop: "createTime" },
          { label: "导入结束时间", prop: "updateTime" },
          { label: "状态", prop: "status", type: 'select', width: 60, dicData: [{ value: 0, label: '未完成' }, { value: 1, label: '已完成' }, { value: 2, label: '已失败' },
           { value: 3, label: '部分数据导入失败' }
          
          ] },
          {
            label: "消息", prop: "message", minWidth: 200,
            overHidden: true,
            formatter: function (row, value, label, column) {
              return row.excelTaskErrList.map((item,index) => { return `${index+1}:${item.message}  `  }).join(',')
            },
          },
        ],

      },
    }
  },
  created() {

  },
  methods: {
    listBefore() {
      this.params.type = this.type
    }
  }
}
</script>
