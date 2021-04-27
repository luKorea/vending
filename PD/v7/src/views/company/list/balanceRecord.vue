<template>
    <div class="app-container">
        <avue-crud v-bind="bindVal" v-on="onEvent" v-model="form" :before-open="beforeOpen" :page.sync="page">
        </avue-crud>
    </div>
</template>
<script>
import crudMix from "@/mixins/crudMix";
import { filtersFormatMoney } from '@/utils/filters.js'
/**
 * TODO:充值/调减记录
 */
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
        list: '/logCompany/getTopUpLog'
      },
      rowKey: 'logcompanyId',
      option: {
        index: true,
        menu: false,
        column: [
          { label: "充值/调减时间", prop: "logTime", type: "datetime", format: 'yyyy-MM-DD HH:mm', },
          {
            label: "充值/调减前余额", prop: "frontBalance", type: 'number', value: 0, viewDisplay: false,
            minRows: 0,
            precision: 2,
            formatter: function (row, value, label, column) {
              return filtersFormatMoney(label)
            },
          },
          {
            label: "充值/调减金额", prop: "money", type: 'number', value: 0, viewDisplay: false,
            minRows: 0,
            precision: 2,
            formatter: function (row, value, label, column) {
              return filtersFormatMoney(label)
            },
          },
          {
            label: "充值/调减后余额", prop: "laterBalance", type: 'number', value: 0, viewDisplay: false,
            minRows: 0,
            precision: 2,
            formatter: function (row, value, label, column) {
              return filtersFormatMoney(label)
            },
          },
          { label: "备注", prop: "remark", type: "textarea", viewDisplay: false, },

        ],

      },
    }
  },
  created() {

  },
  methods: {
    listBefore() {

      this.params.companyId = this.row.companyId
    }
  }
}
</script>
