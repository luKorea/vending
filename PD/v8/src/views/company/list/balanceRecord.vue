<template>
    <div class="app-container">
        <avue-crud v-bind="bindVal" v-on="onEvent" v-model="form" :page.sync="page">
        </avue-crud>
    </div>
</template>
<script>
import crudMix from "@/mixins/crudMix";
/**
 * TODO:充值/调减记录
 */
export default {
  mixins: [
    crudMix,
  ],
  props: {
    row: {},
    Pconfig: {}
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
        menu: false,
        column: [
          ...this.column_datetime("充值/调减时间", "logTime", false),
          ...this.column_money("充值/调减前余额", "frontBalance", false, { viewDisplay: false }),
          ...this.column_money("充值/调减金额", "money", false, { viewDisplay: false }),
          ...this.column_money("充值/调减后余额", "laterBalance", false, { viewDisplay: false }),
          ...this.column_textarea("备注", "remark", false, { viewDisplay: false }),
        ],
      },
    }
  },
  created() {
    if (this.Pconfig && this.Pconfig.getTopUpLog) {
      this.config.list = this.Pconfig.getTopUpLog;
    }
  },
  methods: {
    //获取列表前
    listBefore() {
      this.params.companyId = this.row.companyId
    }
  }
}
</script>
