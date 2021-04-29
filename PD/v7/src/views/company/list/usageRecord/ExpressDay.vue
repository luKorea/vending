<template>
    <div class="app-container">
        <avue-crud v-bind="bindVal" v-on="onEvent" v-model="form" :page.sync="page">
        </avue-crud>
    </div>
</template>
<script>
import crudMix from "@/mixins/crudMix";
/**
 * TODO:每天/每月快递详情
 */
export default {
  mixins: [
    crudMix,
  ],
  props: {
    row: {},
  },
  data() {
    return {
      config: {
        detail: '',
        save: '',
        delete: '',
        update: '',
        list: '/logCompany/getOrderByDayAndbicId'
      },
      rowKey: 'orderId',
      option: {
        index: true,
        menu: false,
        column: [
          { prop: 'orderId', fixed: 'left', label: '订单编号', minWidth: 180, viewDisplay: false, },
          { prop: 'orderYard', label: '订单码', minWidth: 100, viewDisplay: false, },
          { prop: 'bicId', label: '商家ID', minWidth: 100, viewDisplay: false, },
          { prop: 'companyName', label: '商家名称', minWidth: 180, viewDisplay: false, },
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
            valueFormat: 'yyyy-MM-dd',
            format: 'yyyy-MM-dd',
          },
          { prop: 'storageTime', label: '入库时间', minWidth: 180, viewDisplay: false, },
          { prop: 'inspectTime', label: '送检时间', minWidth: 180, viewDisplay: false, },
          { prop: 'accomplishTime', label: '质检完成时间', minWidth: 180, viewDisplay: false, },
          { prop: 'deliveryTime', label: '出库时间', minWidth: 180, viewDisplay: false, },
        ],
      },
    }
  },
  methods: {
    //获取列表前
    listBefore() {
      let type = '1';
      if (this.row.day) {
        type = '2';
      }
      this.params.bicId = this.row.bicId
      this.params.orderTime = this.row.day || dayjs(this.row.statisticsTime).format('YYYY-MM') || ''
      this.params.type = type
    },
  }
}
</script>
