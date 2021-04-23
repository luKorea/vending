<template>
    <div class="app-container">
        <avue-crud v-bind="bindVal" v-on="onEvent" v-model="form" :before-open="beforeOpen" :page.sync="page">

        </avue-crud>
    </div>
</template>
<script>
import crudMix from "@/mixins/crudMix";
import { filtersFormatMoney } from '@/utils/filters.js'

export default {
  components: {

  },
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
        list: 'logCompany/getOrderByDayAndbicId'
      },

      rowKey: 'bicId',
      option: {
        index: true,
        addBtn: false,
        delBtn: false,
        editBtn: false,
        viewBtn: false,
        menu:false,
        column: [
      
          { label: "订单编号", prop: "orderId" },
          { label: "计划发货快递", prop: "planExpress" },
          { label: "实际发货快递", prop: "realityExpress" },
          { label: "快递单号", prop: "expressNumber" },
          { label: "收货省份", prop: "placeReceipt" },

        ],


      },
    }
  },
  created() {

  },
  methods: {

    listBefore() {
      this.params.bicId = this.row.bicId
      this.params.orderTime = this.row.day
    },
  }
}
</script>
