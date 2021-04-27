<template>
    <div class="app-container">
        <avue-crud v-bind="bindVal" v-on="onEvent" v-model="form" :before-open="beforeOpen" :page.sync="page">
            <template slot="menuLeft">
                <el-button v-if="hasPermission('/quelityTesting/excelOrder')" class="el-icon-upload2" size="small" @click="rowView({formslot:'uploadExcelOrder',viewTitle:'导入质检费'},0)">导入质检费</el-button>
                <el-button class="el-icon-download" size="small" @click="rowView({formslot:'exportQualityTesting',viewTitle:'导出质检费'},0)">
                    导出质检费</el-button>
            </template>
            <template slot="uploadExcelOrderForm" slot-scope="scope">
                <div>
                    <uploadExcel @closeDialog="closeDialog('excelTask2')" :uploadData="scope.column.uploadData" :msg="scope.column.msg" v-if="form&&form.formslot==scope.column.prop"></uploadExcel>
                    <excelTask ref="excelTask2" type="2"></excelTask>
                </div>
            </template>
            <template slot="exportQualityTestingForm" slot-scope="scope">
                <div>
                    <exportTask :row="scope.row" type="2" :exportParams="params" v-if="form&&form.formslot==scope.column.prop"></exportTask>
                </div>
            </template>
        </avue-crud>
    </div>
</template>
<script>
import crudMix from "@/mixins/crudMix";
import permissionMix from "@/mixins/permissionMix";
import uploadExcel from '@/views/company/list/uploadExcel'
import exportTask from '@/views/exportTask'
import excelTask from '@/views/excelTask/'
import { xhrGet } from '@/utils/req.js'
import { filtersFormatMoney } from '@/utils/filters.js'
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

      Excelloading: false,
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
        // columnBtn: true,
        clearExclude: ['date'],
        column: [
          {
            label: "质检日期", prop: "date",
            type: 'date',
            searchSpan: 6,
            searchRange: true,
            search: true,
            valueFormat: 'yyyy-MM-dd',
            format: 'yyyy-MM-dd',
            searchValue: [startTime, endTime], viewDisplay: false,
            searchClearable: false,
            pickerOptions: {
              onPick: ({ maxDate, minDate }) => {
                this.selectDate = minDate.getTime();
                if (maxDate) {
                  this.selectDate = ''
                }
              }, disabledDate: (time) => {
                if (this.selectDate !== '') {
                  const one = 30 * 24 * 3600 * 1000 * 3;
                  const minTime = this.selectDate - one;
                  const maxTime = this.selectDate + one;
                  return time.getTime() < minTime || time.getTime() > maxTime
                }
              }
            }
          },
          { label: "商家名称", prop: "bicName", search: true, searchSpan: 6,  viewDisplay: false,},
          { label: "证书类型", prop: "certificateType" , viewDisplay: false,},
          {
            label: "应收单价", prop: "unitPriceReceivable", type: 'number', value: 0, viewDisplay: false,
            minRows: 0,
            precision: 2,
            formatter: function (row, value, label, column) {
              return filtersFormatMoney(label)
            },
          },
          { label: "数量（件）", prop: "number" , viewDisplay: false,},
          {
            label: "应收合计", prop: "totalReceivables", type: 'number', value: 0, viewDisplay: false,
            minRows: 0,
            precision: 2,
            formatter: function (row, value, label, column) {
              return filtersFormatMoney(label)
            },
          },
          {
            label: "优惠金额", prop: "preferentialAmount", type: 'number', value: 0, viewDisplay: false,
            minRows: 0,
            precision: 2,
            formatter: function (row, value, label, column) {
              return filtersFormatMoney(label)
            },
          },
          {
            label: "实收金额", prop: "amountActuallyReceived", type: 'number', value: 0, viewDisplay: false,
            minRows: 0,
            precision: 2,
            formatter: function (row, value, label, column) {
              return filtersFormatMoney(label)
            },
          },
          { label: "所属机构", prop: "affiliatedInstitutions" , viewDisplay: false,},
        ],
        group: [
          {
            prop: 'group',
            arrow: false,
            addDisplay: false,
            viewDisplay: true,
            editDisplay: false,
            column: [

              {
                prop: "uploadExcelOrder",
                uploadData: { title: '质检费', url: 'quelityTesting/excelOrder', href: './assets/uploadQuality.xlsx' },
                hide: true, editDisplay: false, viewDisplay: true, addDisplay: false, formslot: true, span: 24, labelWidth: 0,
              },


              {
                prop: "exportQualityTesting",
                hide: true, editDisplay: false, viewDisplay: true, addDisplay: false, formslot: true, span: 24, labelWidth: 0,
              },
            ]
          },
        ]

      }
    }
  },
  methods: {

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