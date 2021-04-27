<template>
    <div class="app-container">
        <avue-crud v-bind="bindVal" v-on="onEvent" v-model="form" :before-open="beforeOpen" :page.sync="page">
        </avue-crud>
    </div>
</template>
<script>
import crudMix from "@/mixins/crudMix";
import { column_money } from '@/utils/base-crud.js'
/**
 * TODO:每天/每月质检详情
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
        list: '/logCompany/getQualityTestingByDayAndbicName'
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
          ...column_money("应收单价", "unitPriceReceivable", false, { viewDisplay: false }),
          { label: "数量（件）", prop: "number" },
          ...column_money("应收合计", "totalReceivables", false, { viewDisplay: false }),
          ...column_money("优惠金额", "preferentialAmount", false, { viewDisplay: false }),
          ...column_money("实收金额", "amountActuallyReceived", false, { viewDisplay: false }),
          { label: "所属机构", prop: "affiliatedInstitutions" },
        ],
      },
    }
  },
  created() {
  },
  methods: {
    //获取列表前
    listBefore() {
      let type = '1';
      if (this.row.day) {
        type = '2';
      }
      this.params.bicName = this.row.companyName
      this.params.date = this.row.day || dayjs(this.row.statisticsTime).format('YYYY-MM') || ''
      this.params.type = type
    },
  }
}
</script>
