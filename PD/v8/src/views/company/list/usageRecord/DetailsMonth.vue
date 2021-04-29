<template>
    <div class="app-container">
        <avue-crud v-bind="bindVal" v-on="onEvent" v-model="form" :page.sync="page">
            <template slot-scope="scope" slot="expressFee">
                <span v-if="scope.row.expressFee&&scope.row.expressFee>0" @click="rowView({ ...scope.row, formslot:'expressDay',viewTitle:`商家[${row.companyName}](${scope.row.day})的快递详情`},scope.index)"
                    style="color: rgb(190, 149, 74);cursor: pointer;">{{scope.row.expressFee|filtersFormatMoney}}</span>
                <span v-else>--</span>
            </template>
            <template slot-scope="scope" slot="qualityInspectionFee">
                <span v-if="scope.row.qualityInspectionFee&&scope.row.qualityInspectionFee>0"
                    @click="rowView({ ...scope.row, formslot:'qualityDay' ,viewTitle:`商家[${row.companyName}](${scope.row.day})的质检详情`},scope.index)"
                    style="color: rgb(190, 149, 74);cursor: pointer;">{{scope.row.qualityInspectionFee|filtersFormatMoney}}</span>
                <span v-else>--</span>
            </template>
            <div slot="qualityDayForm" slot-scope="scope">
                <qualityDay :row="{...scope.row,...row}" v-if="form&&form.formslot==scope.column.prop"></qualityDay>
            </div>
            <div slot="expressDayForm" slot-scope="scope">
                <expressDay :row="{...scope.row,...row}" v-if="form&&form.formslot==scope.column.prop"></expressDay>
            </div>
        </avue-crud>
    </div>
</template>
<script>
/**
 * 混入
 */
import crudMix from "@/mixins/crudMix";
/**
 * 组件
 */
import qualityDay from '@/views/company/list/usageRecord/QualityDay'
import expressDay from '@/views/company/list/usageRecord/ExpressDay'
/**
 * TODO:每日详情
 */
export default {
  components: {
    qualityDay,
    expressDay
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
        list: '/company/findDayOrder'
      },
      method: {
        list: 'GET'
      },
      rowKey: 'bicId',
      option: {
        index: true,
        menu: false,
        column: [
          { label: "使用时间", prop: "day" },
          ...this.column_money("快递费用", "expressFee", false, { viewDisplay: false, solt: true, }),
          ...this.column_money("质检费用", "qualityInspectionFee", false, { viewDisplay: false, solt: true, }),
          ...this.column_money("使用金额", "monthMoney", false, { viewDisplay: false })
        ],
        ...this.group_def([
          ...this.group_column_formslot("qualityDay", {}),
          ...this.group_column_formslot("expressDay", {}),
        ]),
      },
    }
  },
  created() {
  },
  methods: {
    //获取列表后
    listAfter(data) {
      this.data = data;
      this.page.total = data.length;
      this.page.pageSize = this.page.total;
    },
    //获取列表前
    listBefore() {
      this.params.bicId = this.row.bicId
      this.params.time = dayjs(this.row.statisticsTime).format('YYYY-MM')
    },
  }
}
</script>
