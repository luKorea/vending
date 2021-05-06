<template>
    <div class="app-container">
        <avue-crud v-bind="bindVal" v-on="onEvent" v-model="form" :search.sync="search" :page.sync="page">
            <template slot="menuLeft">
                <el-button v-if="hasPermission(config.exportExcel)" class="el-icon-download" size="small" @click="rowView({formslot:'getExportTaskList',viewTitle:'导出订单'},0)">导出订单</el-button>
            </template>
            <div slot="getExportTaskListForm" slot-scope="scope">
                <exportTask :Pconfig="config" title="导出订单" :row="scope.row" :exportParams="params" type="1" v-if="form&&form.formslot==scope.column.prop"></exportTask>
            </div>
        </avue-crud>
    </div>
</template>
<script>
import crudMix from "@/mixins/crudMix";
import permissionMix from "@/mixins/permissionMix";

import exportTask from '@/views/exportTask'
/**
 * TODO:订单列表(我的)
 */
export default {
  components: {
    exportTask,
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
        list: '/myOrder/getOrder',
        exportExcel: '/myOrder/exportOrder',
        exportTask: '/myOrder/getExportTaskList',
        excelTask: ''
      },
      rowKey: 'orderId',
      option: {
        menu: false,
        columnBtn: true,
        clearExclude: ['orderTime'],
        column: [
          { prop: 'orderId', fixed: 'left', label: '订单编号', minWidth: 180, search: true, searchSpan: 6, viewDisplay: false, },
          { prop: 'orderYard', fixed: 'left', label: '订单码', minWidth: 100, search: true, searchSpan: 6, viewDisplay: false, },
          { prop: 'bicId', fixed: 'left', label: '商家ID', minWidth: 100, viewDisplay: false, },
          { prop: 'companyName', fixed: 'left', label: '商家名称', minWidth: 180, viewDisplay: false, },
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
            prop: 'orderTime', label: '下单时间',
            minWidth: 180,
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
          { prop: 'storageTime', label: '入库时间', minWidth: 180, viewDisplay: false, },
          { prop: 'inspectTime', label: '送检时间', minWidth: 180, viewDisplay: false, },
          { prop: 'accomplishTime', label: '质检完成时间', minWidth: 180, viewDisplay: false, },
          { prop: 'deliveryTime', label: '出库时间', minWidth: 180, viewDisplay: false, },
        ],
        ...this.group_def([
          ...this.group_column_formslot("getExportTaskList"),
        ]),
      }
    }
  },
  methods: {
    //列表请求前
    listBefore() {
      if (this.params.orderTime && this.params.orderTime.length > 0) {
        this.params.startTime = this.params.orderTime[0];
        this.params.endTime = this.params.orderTime[1];
      }
    },
    //重置条件
    resetBefore() {
      this.search.orderTime = [this.startTime, this.endTime]
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