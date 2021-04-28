<template>
    <div class="app-container">
        <avue-crud v-bind="bindVal" v-on="onEvent" v-model="form" :page.sync="page">
            <template slot="menuLeft">
                <el-button v-if="hasPermission('/quelityTesting/excelOrder')" class="el-icon-upload2" size="small" @click="rowView({formslot:'uploadExcelOrder',viewTitle:'导入质检费'},0)">导入质检费</el-button>
                <el-button class="el-icon-download" size="small" @click="rowView({formslot:'exportQualityTesting',viewTitle:'导出质检费'},0)">
                    导出质检费</el-button>
            </template>
            <div slot="uploadExcelOrderForm" slot-scope="scope">
                <uploadExcel @closeDialog="closeDialog('excelTask2')" :uploadData="scope.column.uploadData" :msg="scope.column.msg" v-if="form&&form.formslot==scope.column.prop"></uploadExcel>
                <excelTask ref="excelTask2" type="2"></excelTask>
            </div>
            <div slot="exportQualityTestingForm" slot-scope="scope">
                <exportTask :row="scope.row" type="2" :exportParams="params" v-if="form&&form.formslot==scope.column.prop"></exportTask>
            </div>
        </avue-crud>
    </div>
</template>
<script>
import crudMix from "@/mixins/crudMix";
import permissionMix from "@/mixins/permissionMix";
import uploadExcel from '@/views/company/list/uploadExcel'
import exportTask from '@/views/exportTask'
import excelTask from '@/views/excelTask/'
export default {
  components: {
    uploadExcel,
    exportTask,
    excelTask
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
        list: '/quelityTesting/getQualityTesting'
      },
      rowKey: 'id',
      option: {
        menu: false,
        clearExclude: ['date'],
        column: [
          {
            prop: 'date', label: '质检日期',
            type: 'date',
            searchSpan: 6,
            searchRange: true,
            search: true,
            valueFormat: 'yyyy-MM-dd',
            format: 'yyyy-MM-dd',
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
          ...this.group_column_formslot("uploadExcelOrder", {
            uploadData: { title: '质检费', url: 'quelityTesting/excelOrder', href: './assets/uploadQuality.xlsx' },
          }),
          ...this.group_column_formslot("exportQualityTesting", {}),
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
  },
  created() {
    this.params.startTime = this.startTime;
    this.params.endTime = this.endTime;
  },
  mounted() {
  },
}
</script>