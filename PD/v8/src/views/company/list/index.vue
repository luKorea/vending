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
                <el-dropdown-item v-if="hasPermission(config.addBalance)" @click.native="$refs.crud.rowEdit({ ...scope.row, editType:'Recharge',editTitle:'充值' },scope.index)">充值</el-dropdown-item>
                <el-dropdown-item v-if="hasPermission(config.subBalance)" @click.native="$refs.crud.rowEdit({ ...scope.row, editType:'Reduce' ,editTitle:'调减'},scope.index)">调减</el-dropdown-item>
                <el-dropdown-item v-if="hasPermission(config.getTopUpLog)"
                    @click.native="rowView({ ...scope.row, formslot:'reduceBalance' ,viewTitle:`商家[${scope.row.companyName}]的充值/调减记录`},scope.index)">
                    充值/调减记录</el-dropdown-item>
                <el-dropdown-item v-if="hasPermission(config.orderStatistics )"
                    @click.native="rowView({ ...scope.row, formslot:'usageRecord' ,viewTitle:`商家[${scope.row.companyName}]的使用记录`},scope.index)">
                    使用记录</el-dropdown-item>
            </template>
            <template slot="menuLeft">
                <el-button v-if="hasPermission(config.excel.url)" class="el-icon-upload2" size="small" @click="rowView({formslot:'uploadExcelCompany',viewTitle:'导入商家'},0)">导入商家</el-button>
                <el-button v-if="hasPermission(config.exportExcel)" class="el-icon-download" size="small" @click="rowView({formslot:'getExportTaskList',viewTitle:'导出商家'},0)">导出商家</el-button>
            </template>
            <div slot="uploadExcelCompanyForm" slot-scope="scope">
                <uploadExcel @closeDialog="closeDialog('excelTask3')" :data="config.excel" v-if="form&&form.formslot==scope.column.prop"></uploadExcel>
                <excelTask :Pconfig="config" ref="excelTask3" type="3"></excelTask>
            </div>
            <div slot="reduceBalanceForm" slot-scope="scope">
                <balanceRecord :Pconfig="config" :row="scope.row" v-if="form&&form.formslot==scope.column.prop"></balanceRecord>
            </div>
            <div slot="usageRecordForm" slot-scope="scope">
                <usageRecord :Pconfig="config" :row="scope.row" v-if="form&&form.formslot==scope.column.prop"></usageRecord>
            </div>
            <div slot="getExportTaskListForm" slot-scope="scope">
                <exportTask title="导出商家" :Pconfig="config" :row="scope.row" type="3" :exportParams="params" v-if="form&&form.formslot==scope.column.prop"></exportTask>
            </div>
            <template slot-scope="{disabled,size}" slot="isMoneyRemindSearch">
                <el-checkbox v-model="search.isMoneyRemind" :disabled="disabled" :size="size" label="是否查询低于预警值" border></el-checkbox>
            </template>
            <template slot-scope="{disabled,size}" slot="rangeBalanceSearch">
                <div class="row rangeSearch">
                    <el-input placeholder="最小" :step="step" v-model="search.startBalance" type="number" :disabled="disabled" :size="size" />
                    <el-input placeholder="最大" :step="step" v-model="search.endBalance" type="number" :disabled="disabled" :size="size" />
                </div>
            </template>
            <template slot-scope="{disabled,size}" slot="rangeUsableBalanceSearch">
                <div class="row rangeSearch">
                    <el-input placeholder="最小" :step="step" v-model="search.startUsableBalance" type="number" :disabled="disabled" :size="size" />
                    <el-input placeholder="最大" :step="step" v-model="search.endUsableBalance" type="number" :disabled="disabled" :size="size" />
                </div>
            </template>

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
import numberRange from '@/components/Form/numberRange'

//import api from "@/api/api";
/**
 * TODO:商家列表（全部）
 */
export default {
  components: {
    uploadExcel,
    balanceRecord,
    usageRecord,
    excelTask,
    exportTask,
    numberRange
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
      step: 100,
      search: {
        isMoneyRemind: false,
        startBalance: '',
        endBalance: '',
        startUsableBalance: '',
        endUsableBalance: '',
      },
      config: {
        detail: '',
        save: '/company/addCompany',
        delete: '/company/deleteCompanyId',
        update: '/company/updateCompany',
        list: '/company/getCompany',
        addBalance: '/company/addBalance',//充值
        subBalance: '/company/subBalance',//调减
        getTopUpLog: '/logCompany/getTopUpLog',  // 查看充值/调减记录
        orderStatistics: '/logCompany/orderStatistics',  // 使用记录
        findDayOrder: '/company/findDayOrder',  // 每日详情：
        getOrderByDayAndbicId: '/logCompany/getOrderByDayAndbicId',  // 根据日期获取快递
        getQualityTestingByDayAndbicName: '/logCompany/getQualityTestingByDayAndbicName',  // 根据日期获取质检
        exportExcel: '/company/deriveExcel',  // 导出商家
        exportTask: '/exportTask/getCompanyExportTaskList',  // 获取商家导出任务列表
        excelTask: '/excelTask/getCompanyExcelTaskList', // 导入
        excel: {
          msg: "若商家在系统中已存在，余额将会以系统中余额为准，不做修改!",
          title: '商家',
          url: '/company/excelCompany',
          href: './assets/uploadCompany.xlsx',
        }
      },
      method: {
        delete: 'GET'
      },
      rowKey: 'companyId',
      option: {
        // index: true,
        addBtn: true,
        addBtnText: '新增商家',
        menuType: 'menu',
        viewBtn: false,
        stripe: false,
        column: [
          ...this.column_def("商家ID", "bicId", true, { search: true, searchSpan: 6, editDisabled: true, fixed: 'left', viewDisplay: false, }),
          ...this.column_def("商家名称", "companyName", true, { search: true, searchSpan: 6, fixed: 'left', viewDisplay: false, }),
          ...this.column_def("是否启用", "startUsingStr", false, { hide: true, addDisplay: false, editDisplay: false, viewDisplay: false }),
          ...this.column_switch("是否启用", "startUsing", false, { hide: true, value: 2, addDisplay: false, editDisplay: false, viewDisplay: false, dicData: [{ value: 1, label: '否' }, { value: 2, label: '是' }], }),
          ...this.column_money("余额", "balance", true, { searchslot: true, viewDisplay: false, editDisabled: true }),

          ...this.column_money("余额", "rangeBalance", false, { hide: true, search: true, searchslot: true, searchSpan: 6, searchslot: true, viewDisplay: false, editDisplay: false }),
          ...this.column_money("可用余额", "rangeUsableBalance", false, { hide: true, search: true, searchslot: true, searchSpan: 6, searchslot: true, viewDisplay: false, editDisplay: false }),
          ...this.column_switch("", "isMoneyRemind", false, { hide: true, search: true, searchslot: true, searchSpan: 6, searchslot: true, viewDisplay: false, editDisplay: false, dicData: [{ value: 1, label: '是' }, { value: 2, label: '否' }], }),

          ...this.column_money("冻结金额", "freezeMoney", true, { addDisplay: false, viewDisplay: false, editDisplay: false }),
          ...this.column_money("可用余额", "usableBalance", true, { addDisplay: false, viewDisplay: false, editDisplay: false }),
          ...this.column_money("余额预警值", "moneyRemind", true, { viewDisplay: false, editDisabled: true }),
          ...this.column_money("充值金额", "Recharge", true, { addDisplay: false, viewDisplay: false, display: true, hide: true }),
          ...this.column_money("调减金额", "Reduce", true, { addDisplay: false, viewDisplay: false, display: true, hide: true }),
          ...this.column_textarea("备注", "remark", false, { viewDisplay: false, editDisplay: true })
        ],
        ...this.group_def([
          ...this.group_column_formslot("uploadExcelCompany"),
          ...this.group_column_formslot("reduceBalance"),
          ...this.group_column_formslot("usageRecord"),
          ...this.group_column_formslot("getExportTaskList"),
          ...this.group_column_formslot("exportQualityTesting"),
        ]),
      },
    }
  },
  async created() {

  },
  methods: {
    //列表前
    listBefore() {
      for (let key in this.search) {
        this.params[key] = this.search[key];
      }
      this.search.isMoneyRemind ? (this.params.isMoneyRemind = 1) : (this.params.isMoneyRemind = 2);
    },
    //重置条件
    resetBefore() {
      for (let key in this.search) {
        this.search[key] = '';
      }
      this.search.isMoneyRemind = false;
    },
    //*100
    By100() {
      let that = this;
      that.form.balance = that.form.balance * 100;
      that.form.usableBalance = that.form.usableBalance * 100;
      that.form.moneyRemind = that.form.moneyRemind * 100;
    },
    //添加前
    addBefore() {
      this.By100();
      return 1
    },
    //更新前
    updateBefore() {
      let that = this;
      if (that.form.editType && (that.form.editType == 'Recharge' || that.form.editType == 'Reduce')) {
        if (that.form.editType == 'Recharge') {
          that.config.update = 'company/addBalance'
          that.form.balance = that.form.Recharge
        }
        if (that.form.editType == 'Reduce') {
          that.config.update = 'company/subBalance'
          that.form.balance = that.form.Reduce
        }
      } else {
        that.config.update = 'company/updateCompany'
      }
      this.By100();
      return 1
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
