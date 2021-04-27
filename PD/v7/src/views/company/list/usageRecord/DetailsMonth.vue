<template>
    <div class="app-container">
        <avue-crud v-bind="bindVal" v-on="onEvent" v-model="form" :before-open="beforeOpen" :page.sync="page">
            <template slot-scope="scope" slot="expressFee">
                <span v-if="scope.row.expressFee&&scope.row.expressFee>0"
                    @click="rowView({ ...scope.row, formslot:'expressDay',viewTitle:`商家[${row.companyName}](${scope.row.day})的快递详情`},scope.index)"
                    style="color: rgb(190, 149, 74);cursor: pointer;">{{scope.row.expressFee|filtersFormatMoney}}</span>
                <span v-else>--</span>
            </template>
            <template slot-scope="scope" slot="qualityInspectionFee">
                <span v-if="scope.row.qualityInspectionFee&&scope.row.qualityInspectionFee>0"
                    @click="rowView({ ...scope.row, formslot:'qualityDay' ,viewTitle:`商家[${row.companyName}](${scope.row.day})的质检详情`},scope.index)"
                    style="color: rgb(190, 149, 74);cursor: pointer;">{{scope.row.qualityInspectionFee|filtersFormatMoney}}</span>
                <span v-else>--</span>
            </template>
            <template slot="qualityDayForm" slot-scope="scope">
                <div>
                    <qualityDay :row="{...scope.row,...row}" v-if="form&&form.formslot==scope.column.prop"></qualityDay>
                </div>
            </template>
            <template slot="expressDayForm" slot-scope="scope">
                <div>
                    <expressDay :row="{...scope.row,...row}" v-if="form&&form.formslot==scope.column.prop"></expressDay>
                </div>
            </template>
        </avue-crud>
    </div>
</template>
<script>
import crudMix from "@/mixins/crudMix";
import { filtersFormatMoney } from '@/utils/filters.js'
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
        addBtn: false,
        delBtn: false,
        editBtn: false,
        viewBtn: false,
        menu: false,
        column: [
          { label: "使用时间", prop: "day" },
          {
            label: "快递费用", prop: "expressFee", type: 'number', value: 0, viewDisplay: false,
            minRows: 0,
            precision: 2,
            solt: true,
            // formatter: function (row, value, label, column) {
            //   return filtersFormatMoney(label)
            // },
          },
          {
            label: "质检费用", prop: "qualityInspectionFee", type: 'number', value: 0, viewDisplay: false,
            minRows: 0,
            precision: 2,
            solt: true,
            // formatter: function (row, value, label, column) {
            //   return filtersFormatMoney(label)
            // },
          },
          {
            label: "使用金额", prop: "monthMoney", type: 'number', value: 0, viewDisplay: false,
            minRows: 0,
            precision: 2,
            formatter: function (row, value, label, column) {
              return filtersFormatMoney(label)
            },
          },
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
                prop: "qualityDay",
                hide: true, editDisplay: false, viewDisplay: true, addDisplay: false, formslot: true, span: 24, labelWidth: 0,
              },
              {
                prop: "expressDay",
                hide: true, editDisplay: false, viewDisplay: true, addDisplay: false, formslot: true, span: 24, labelWidth: 0,
              },
            ]
          },
        ]

      },
    }
  },
  created() {
  },
  methods: {
    listAfter(data) {
      this.data = data;
      this.page.total = data.length;
      this.page.pageSize = this.page.total;
    },
    listBefore() {
      this.params.bicId = this.row.bicId
      this.params.time = dayjs(this.row.statisticsTime).format('YYYY-MM')
    },
  }
}
</script>
