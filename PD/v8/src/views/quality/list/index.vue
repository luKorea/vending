<template>
    <div class="app-container">
        <avue-crud v-bind="bindVal" v-on="onEvent" v-model="form" :search.sync="search" :page.sync="page">
            <template slot="menuLeft">
                <el-button class="el-icon-upload2" v-if="hasPermission(config.excel.url)" size="small" @click="rowView({formslot:'uploadExcelOrder',viewTitle:'导入质检费'},0)">导入质检费</el-button>
                <el-button class="el-icon-download" v-if="hasPermission(config.exportExcel)" size="small" @click="rowView({formslot:'exportQualityTesting',viewTitle:'导出质检费'},0)">
                    导出质检费</el-button>
            </template>
            <div slot="uploadExcelOrderForm" slot-scope="scope">
                <UploadExcel @closeDialog="closeDialog('excelTask2')" :data="config.excel" v-if="form&&form.formslot==scope.column.prop"></UploadExcel>
                <ExcelTask :Pconfig="config" ref="excelTask2" type="2"></ExcelTask>
            </div>
            <div slot="exportQualityTestingForm" slot-scope="scope">
                <ExportTask title="导出质检费" :Pconfig="config" :row="scope.row" type="2" :exportParams="params" v-if="form&&form.formslot==scope.column.prop"></ExportTask>
            </div>
        </avue-crud>
    </div>
</template>
<script>
import crudMix from "@/mixins/crudMix";
import permissionMix from "@/mixins/permissionMix";
import UploadExcel from '@/views/UploadExcel'
import ExportTask from '@/views/ExportTask'
import ExcelTask from '@/views/ExcelTask'
/**
 * TODO:质检列表(全部)
 */
export default {
  components: {
    UploadExcel,
    ExportTask,
    ExcelTask
  },
  mixins: [
    crudMix,
    permissionMix,
  ],
  data() {
    let endTime = dayjs().format('YYYY-MM-DD')
    let startTime = dayjs().subtract(1, 'month').format('YYYY-MM-DD')
    return {
      endTime: endTime,
      startTime: startTime,
      config: {
        detail: '',
        save: '',
        delete: '',
        update: '',
        list: '/quelityTesting/getQualityTesting',
        exportExcel: '/quelityTesting/exportQualityTesting',
        exportTask: '/exportTask/getQualityTestingExportTaskList',
        excelTask: '/excelTask/getQualityTestingExcelTaskList',
        excel: { title: '质检费', url: '/quelityTesting/excelOrder', href: './assets/uploadQuality.xlsx' }
      },
      rowKey: 'id',
      option: {
        menu: false,
        columnBtn: true,
        clearExclude: ['date'],
        column: [
          {
            prop: 'date', label: '质检日期',
            type: 'date',
            searchSpan: 6,
            searchRange: true,
            search: true,
            valueFormat: 'yyyy-MM-dd',
            format: 'yyyy-MM-dd HH:mm:ss',
            searchValue: [startTime, endTime],
            viewDisplay: false,
            searchOrder: 1,
            order: 1,
            searchClearable: false,
            ...this.pickerOptions,
          },
          { label: "商家名称", prop: "bicName", search: true, searchSpan: 6, viewDisplay: false, },
          { label: "证书类型", prop: "certificateType", viewDisplay: false, },
          ...this.column_money("应收单价", "unitPriceReceivable", false, { viewDisplay: false, }),
          { label: "数量（件）", prop: "number", viewDisplay: false, },
          ...this.column_money("应收合计", "totalReceivables", false, { viewDisplay: false, }),
          ...this.column_money("优惠金额", "preferentialAmount", false, { viewDisplay: false, }),
          ...this.column_money("实收金额", "amountActuallyReceived", false, { viewDisplay: false, }),
          { label: "所属机构", prop: "affiliatedInstitutions", viewDisplay: false, },
        ],
        ...this.group_def([
          ...this.group_column_formslot("uploadExcelOrder"),
          ...this.group_column_formslot("exportQualityTesting"),
        ]),
      }
    }
  },
  methods: {
    //列表请求前
    listBefore() {
      if (this.params.date && this.params.date.length > 0) {
        this.params.startTime = this.params.date[0];
        this.params.endTime = this.params.date[1];
        delete this.params.date
      }
    },
    //重置条件
    resetBefore() {
      this.search.date = [this.startTime, this.endTime]
    },
  },
  created() {
    this.params.startTime = this.startTime;
    this.params.endTime = this.endTime;
  },
  mounted() {
  },
}
</script>