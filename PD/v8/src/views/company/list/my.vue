<template>
    <div class="app-container">
        <avue-crud v-bind="bindVal" v-on="onEvent" v-model="form" :page.sync="page">
            <div class="row-c" slot="bicId" slot-scope="scope">
                <el-tooltip content="您的可用余额低于预警值，请及时充值" placement="top" v-if="scope.row.flag!=1">
                    <svg-icon icon-class="warning" style="font-size: 25px;margin-right: 10px;" />
                </el-tooltip>
                <span>{{scope.row.bicId}}</span>
            </div>
            <template slot-scope="scope" slot="menuBtn">
                <el-dropdown-item v-if="hasPermission(config.getTopUpLog)"
                    @click.native="rowView({ ...scope.row, formslot:'reduceBalance' ,viewTitle:`商家[${scope.row.companyName}]的充值/调减记录`},scope.index)">
                    充值/调减记录</el-dropdown-item>
                <el-dropdown-item v-if="hasPermission(config.orderStatistics)"
                    @click.native="rowView({ ...scope.row, formslot:'usageRecord' ,viewTitle:`商家[${scope.row.companyName}]的使用记录`},scope.index)">
                    使用记录</el-dropdown-item>
            </template>
            <template slot="menuLeft">
                <el-button v-if="hasPermission(config.exportExcel)" class="el-icon-download" size="small" @click="rowView({formslot:'getExportTaskList',viewTitle:'导出商家'},0)">导出商家</el-button>
            </template>
            <div slot="reduceBalanceForm" slot-scope="scope">
                <balanceRecord :Pconfig="config" :row="scope.row" v-if="form&&form.formslot==scope.column.prop"></balanceRecord>
            </div>
            <div slot="usageRecordForm" slot-scope="scope">
                <usageRecord :Pconfig="config" :row="scope.row" v-if="form&&form.formslot==scope.column.prop"></usageRecord>
            </div>
            <div slot="getExportTaskListForm" slot-scope="scope">
                <exportTask title="导出商家" :Pconfig="config" :row="scope.row" type="3" :exportParams="params" v-if="form&&form.formslot==scope.column.prop"></exportTask>
            </div>
        </avue-crud>
    </div>
</template>
<script>
/**
 * 混入
 */
import crudMix from "@/mixins/crudMix";
import permissionMix from "@/mixins/permissionMix";

/**
 * 组件
 */
import uploadExcel from '@/views/company/list/uploadExcel'
import balanceRecord from '@/views/company/list/balanceRecord'
import usageRecord from '@/views/company/list/usageRecord'
import exportTask from '@/views/exportTask'
import excelTask from '@/views/excelTask/'

/**
 * TODO:商家列表（我的）
 */
export default {
  components: {
    uploadExcel,
    balanceRecord,
    usageRecord,
    excelTask,
    exportTask
  },
  mixins: [
    crudMix,
    permissionMix
  ],
  props: {
    my: {},
  },
  data() {
    return {
      config: {
        detail: '',
        save: '',
        delete: '',
        update: '',
        list: '/myCompany/getCompany',

        orderStatistics: '/myCompany/orderStatistics',  // 使用记录
        getTopUpLog: '/myCompany/getTopUpLog',  // 查看充值/调减记录
        findDayOrder: '/myCompany/findDayOrder',  // 每日详情：
        getOrderByDayAndbicId: '/myCompany/getOrderByDayAndbicId',  // 根据日期获取快递
        getQualityTestingByDayAndbicName: '/myCompany/getQualityTestingByDayAndbicName',  // 根据日期获取质检

        exportExcel: '/myCompany/deriveExcel',  // 导出商家
        exportTask: '/myCompany/getExportTaskList',  // 获取商家导出任务列表
      },
      method: {
        delete: 'GET'
      },
      rowKey: 'companyId',
      option: {
        index: true,
        addBtn: false,
        editBtn: false,
        delBtn: false,
        menuType: 'menu',
    
        viewBtn: false,
        column: [
          ...this.column_def("商家ID", "bicId", true, { editDisabled: true, fixed: 'left', viewDisplay: false, }),
          ...this.column_def("商家名称", "companyName", true, { fixed: 'left', viewDisplay: false, }),
          ...this.column_def("是否启用", "startUsingStr", false, { hide: true, addDisplay: false, editDisplay: false, viewDisplay: false }),
          ...this.column_switch("是否启用", "startUsing", false, { hide: true, value: 2, addDisplay: false, editDisplay: false, viewDisplay: false, dicData: [{ value: 1, label: '否' }, { value: 2, label: '是' }], }),
          ...this.column_money("余额", "balance", true, { viewDisplay: false, editDisabled: true }),
          ...this.column_money("冻结金额", "freezeMoney", true, { addDisplay: false, viewDisplay: false, editDisplay: false }),
          ...this.column_money("可用余额", "usableBalance", true, { addDisplay: false, viewDisplay: false, editDisplay: false }),
          ...this.column_money("余额预警值", "moneyRemind", true, { viewDisplay: false, editDisabled: true }),
          ...this.column_money("充值金额", "Recharge", true, { addDisplay: false, viewDisplay: false, display: true, hide: true }),
          ...this.column_money("调减金额", "Reduce", true, { addDisplay: false, viewDisplay: false, display: true, hide: true }),
          ...this.column_textarea("备注", "remark", false, { viewDisplay: false, editDisplay: true })
        ],
        ...this.group_def([
          ...this.group_column_formslot("uploadExcelCompany", {
            msg: "若商家在系统中已存在，余额将会以系统中余额为准，不做修改!",
            uploadData: { title: '商家', url: '/company/excelCompany', href: './assets/uploadCompany.xlsx' },
          }),
          ...this.group_column_formslot("uploadExcelOrder", {
            uploadData: { title: '质检费', url: '/quelityTesting/excelOrder', href: './assets/uploadQuality.xlsx' },
          }),
          ...this.group_column_formslot("reduceBalance", {}),
          ...this.group_column_formslot("usageRecord", {}),
          ...this.group_column_formslot("getExportTaskList", {}),
          ...this.group_column_formslot("exportQualityTesting", {}),
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
    //打开窗口前
    openBefore(type) {
      let that = this;
      //充值&调减
      if (that.form.editType && (that.form.editType == 'Recharge' || that.form.editType == 'Reduce')) {
        that.option.column.forEach((v) => {
          v.prop == 'Reduce' && that.form.editType == 'Recharge' ? v.display = false : 0;
          v.prop == 'Recharge' && that.form.editType == 'Reduce' ? v.display = false : 0;
          v.prop == 'Recharge' && that.form.editType == 'Recharge' ? v.display = true : 0;
          v.prop == 'Reduce' && that.form.editType == 'Reduce' ? v.display = true : 0;
          (v.prop == 'moneyRemind') ? v.editDisplay = false : 0;
          v.prop == 'companyName' ? v.editDisabled = true : 0;
          v.prop == 'balance' ? v.editDisplay = true : 0;
        })
      }
      else {
        that.option.column.forEach((v) => {
          v.prop == 'Reduce' ? v.display = false : 0;
          v.prop == 'Recharge' ? v.display = false : 0;
          v.prop == 'companyName' ? v.editDisabled = false : 0;
          (v.prop == 'moneyRemind') ? (v.editDisplay = true, v.editDisabled = false) : 0;
          v.prop == 'balance' ? v.editDisplay = false : 0;
        })
        that.option = Object.assign(that.option, {})
      }
      this.option.editTitle = this.form.editTitle;
      this.option = Object.assign(this.option, {})
      console.log(this.option);
    },
    //提示颜色
    tableRowClassName({ row, rowIndex }) {
      if (row.flag == 1) {
        return '';
      } else {
        return 'warning-row ';
      }
    },
  }
}
</script>
