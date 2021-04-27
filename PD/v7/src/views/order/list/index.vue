<template>
    <div class="app-container">
        <avue-crud v-bind="bindVal" v-on="onEvent" v-model="form" :before-open="beforeOpen" :page.sync="page">
            <template slot="menuLeft">
                <el-button v-if="hasPermission('/order/exportOrder')" class="el-icon-download" size="small" :loading="Excelloading" @click.native="exportOrder">导出订单</el-button>
                <el-button v-if="hasPermission('/order/excelOrder')" class="el-icon-upload2" size="small" @click="rowView({formslot:'uploadExcelOrder',viewTitle:'导入订单'},0)">导入订单</el-button>
            </template>
            <template slot="uploadExcelOrderForm" slot-scope="scope">
                <div>
                    <uploadExcel @closeDialog="closeDialog" :uploadData="scope.column.uploadData" :msg="scope.column.msg" v-if="form&&form.formslot==scope.column.prop"></uploadExcel>
                </div>
            </template>
        </avue-crud>
    </div>
</template>
<script>
import crudMix from "@/mixins/crudMix";
import permissionMix from "@/mixins/permissionMix";
import uploadExcel from '@/views/company/list/uploadExcel'
import { xhrGet } from '@/utils/req.js'
export default {
  components: {
    uploadExcel
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
        list: '/order/getOrder'
      },
      rowKey: 'orderId',
      option: {
        menu: false,
        // columnBtn: true,
        clearExclude: ['orderTime'],
        column: [

          { prop: 'orderId', fixed: 'left', label: '订单编号', minWidth: 180, search: true, searchSpan: 6, viewDisplay: false, },
          { prop: 'orderYard', fixed: 'left', label: '订单码', minWidth: 100, search: true, searchSpan: 6, viewDisplay: false, },
          { prop: 'bicId', fixed: 'left', label: '商家ID', minWidth: 100, search: true, searchSpan: 6, viewDisplay: false, },
          { prop: 'companyName', fixed: 'left', label: '商家名称', minWidth: 180, search: true, searchSpan: 6, viewDisplay: false, },

          { prop: 'orderAppointFlag', label: '订单履约状态', minWidth: 180, overHidden: true, viewDisplay: false, },
          { prop: 'combinedBillFee', label: '合单费', minWidth: 180, overHidden: true, viewDisplay: false, },


          { prop: 'ztBasicFreight', label: '中通基本运费', minWidth: 180, overHidden: true, viewDisplay: false, },
          { prop: 'packingCharge', label: '打包费', minWidth: 180, overHidden: true, viewDisplay: false, },
          { prop: 'ztFreightReceivable', label: '中通应收运费', minWidth: 180, overHidden: true, viewDisplay: false, },
          { prop: 'jdFeedbackFreight', label: '京东反馈运费', minWidth: 180, overHidden: true, viewDisplay: false, },
          { prop: 'jdBillingWeight', label: '京东计费重量', minWidth: 180, overHidden: true, viewDisplay: false, },
          { prop: 'jdFirstWeightAmount', label: '京东首重金额', minWidth: 180, overHidden: true, viewDisplay: false, },
          { prop: 'jdFreightReceivable', label: '京东应收运费', minWidth: 180, overHidden: true, viewDisplay: false, },
          { prop: 'sfFeedbackFreight', label: '顺丰反馈的运费', minWidth: 180, overHidden: true, viewDisplay: false, },
          { prop: 'sfBillingWeight', label: '顺丰计费重量', minWidth: 180, overHidden: true, viewDisplay: false, },
          { prop: 'sfPartsType', label: '顺丰件类型', minWidth: 180, overHidden: true, viewDisplay: false, },
          { prop: 'sfFirstWeightAmount', label: '顺丰首重金额', minWidth: 180, overHidden: true, viewDisplay: false, },
          { prop: 'sfFreightReceivable', label: '顺丰应收运费', minWidth: 180, overHidden: true, viewDisplay: false, },
          { prop: 'total', label: '合计', minWidth: 180, overHidden: true, viewDisplay: false, },
          { prop: 'totalAfterDiscount', label: '优惠后合计', minWidth: 180, overHidden: true, viewDisplay: false, },
          { prop: 'mergeBatch', label: '合并批次号', minWidth: 180, overHidden: true, viewDisplay: false, },
          { prop: 'storageNumber', label: '入库件数', minWidth: 180, overHidden: true, viewDisplay: false, },
          { prop: 'testingInstitutes', label: '质检机构', minWidth: 180, overHidden: true, viewDisplay: false, },
          { prop: 'qualityResult', label: '质检结果', minWidth: 180, overHidden: true, viewDisplay: false, },
          { prop: 'recheckResult', label: '复检结果', minWidth: 180, overHidden: true, viewDisplay: false, },
          { prop: 'planExpress', label: '计划发货快递', minWidth: 180, overHidden: true, viewDisplay: false, },
          { prop: 'realityExpress', label: '实际发货快递', minWidth: 180, overHidden: true, viewDisplay: false, },
          { prop: 'expressNumber', label: '快递单号', minWidth: 180, overHidden: true, viewDisplay: false, },
          { prop: 'placeReceipt', label: '收货省份', minWidth: 180, overHidden: true, viewDisplay: false, },
          {
            prop: 'orderTime', label: '下单时间', minWidth: 180,
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
                  const one = 30 * 24 * 3600 * 1000 *3;
                  const minTime = this.selectDate - one;
                  const maxTime = this.selectDate + one;
                  return time.getTime() < minTime || time.getTime() > maxTime
                }
              }
            }

          },
          { prop: 'storageTime', label: '入库时间', minWidth: 180, viewDisplay: false, },
          { prop: 'inspectTime', label: '送检时间', minWidth: 180, viewDisplay: false, },
          { prop: 'accomplishTime', label: '质检完成时间', minWidth: 180, viewDisplay: false, },
          { prop: 'deliveryTime', label: '出库时间', minWidth: 180, viewDisplay: false, },
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
                uploadData: { title: '订单', url: 'order/excelOrder', href: './assets/uploadOrder.xlsx' },
                hide: true, editDisplay: false, viewDisplay: true, addDisplay: false, formslot: true, span: 24, labelWidth: 0,
              },

            ]
          },
        ]
      }
    }
  },
  methods: {
    exportOrder() {
      let that = this;
      that.deriveExcelloading = true;
      if (this.params.orderTime && this.params.orderTime.length > 0) {
        this.params.startTime = this.params.orderTime[0];
        this.params.endTime = this.params.orderTime[1];
      }
      let paramsStr = '';
      for (let key in this.params) {
        paramsStr += key + '=' + this.params[key] + '&'
      }
      paramsStr = paramsStr.slice(0, -1);
      console.log('paramsStr:', paramsStr)
      xhrGet('/order/exportOrder' + (paramsStr ? ('?' + paramsStr) : ''), `${this.params.companyName || ''}订单(${this.params.startTime || ''}-${this.params.endTime || ''})`).then(function (res) {
        that.deriveExcelloading = false;
      }).catch(function (err) {
        that.deriveExcelloading = false;
      });
    },
    listBefore() {
      if (this.params.orderTime && this.params.orderTime.length > 0) {
        this.params.startTime = this.params.orderTime[0];
        this.params.endTime = this.params.orderTime[1];
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