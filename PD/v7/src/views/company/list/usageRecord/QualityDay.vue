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
        list: 'logCompany/getQualityTestingByDayAndbicName'
      },

      rowKey: 'bicId',
      option: {
        index: true,
        addBtn: false,
        delBtn: false,
        editBtn: false,
        viewBtn: false,
        menu: false,
        column: [
          { label: "质检日期", prop: "date" },
          { label: "商家名称", prop: "bicName" },
          { label: "证书类型", prop: "certificateType" },
          {
            label: "应收单价", prop: "unitPriceReceivable", type: 'number', value: 0, viewDisplay: false,
            minRows: 0,
            precision: 2,
            formatter: function (row, value, label, column) {
              return filtersFormatMoney(label)
            },
          },
          { label: "数量（件）", prop: "number" },
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
          { label: "所属机构", prop: "affiliatedInstitutions" },
        ],


      },
    }
  },
  created() {

  },
  methods: {

    listBefore() {

      this.params.bicName = this.row.companyName
      this.params.date = this.row.day
    },
  }
}
</script>
