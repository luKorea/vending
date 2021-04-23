<template>
    <div class="app-container">
        <avue-crud v-bind="bindVal" v-on="onEvent" v-model="form" :before-open="beforeOpen" :row-class-name="tableRowClassName" :page.sync="page">
            <template slot="bicId" slot-scope="scope">
                <div class="row-c">
                    <el-tooltip content="您的可用余额低于预警值，请及时充值" placement="top" v-if="scope.row.flag!=1">
                        <svg-icon icon-class="warning" style="font-size: 25px;margin-right: 10px;" />
                    </el-tooltip>
                    <span>{{scope.row.bicId}}</span>
                </div>
            </template>
            <template slot-scope="scope" slot="menuBtn">
                <el-dropdown-item @click.native="$refs.crud.rowEdit({ ...scope.row, editType:'Recharge',editTitle:'充值' },scope.index)">充值</el-dropdown-item>
                <el-dropdown-item @click.native="$refs.crud.rowEdit({ ...scope.row, editType:'Reduce' ,editTitle:'调减'},scope.index)">调减</el-dropdown-item>
                <el-dropdown-item @click.native="rowView({ ...scope.row, formslot:'reduceBalance' ,viewTitle:`商家[${scope.row.companyName}]的充值/调减记录`},scope.index)">充值/调减记录</el-dropdown-item>
                <el-dropdown-item @click.native="rowView({ ...scope.row, formslot:'usageRecord' ,viewTitle:`商家[${scope.row.companyName}]的使用记录`},scope.index)">使用记录</el-dropdown-item>
            </template>
            <template slot="menuLeft">
                <el-button class="el-icon-upload2" size="small" @click="rowView({formslot:'uploadExcelCompany',viewTitle:'导入商家'},0)">导入商家</el-button>
                <el-button class="el-icon-download" size="small" :loading="deriveExcelloading" @click.native="deriveExcel">导出商家</el-button>
                <el-button class="el-icon-upload2" size="small" @click="rowView({formslot:'uploadExcelOrder',viewTitle:'导入质检费'},0)">导入质检费</el-button>
            </template>
            <template slot="uploadExcelCompanyForm" slot-scope="scope" v-if="form&&form.formslot==scope.column.prop">
                <div>
                    <uploadExcel @closeDialog="closeDialog('excelTask3')" :uploadData="scope.column.uploadData" :msg="scope.column.msg" v-if="form&&form.formslot==scope.column.prop"></uploadExcel>
                    <excelTask ref="excelTask3" type="3"></excelTask>
                </div>
            </template>
            <template slot="uploadExcelOrderForm" slot-scope="scope">
                <div>
                    <uploadExcel @closeDialog="closeDialog('excelTask2')" :uploadData="scope.column.uploadData" :msg="scope.column.msg" v-if="form&&form.formslot==scope.column.prop"></uploadExcel>
                    <excelTask ref="excelTask2" type="2"></excelTask>
                </div>
            </template>
            <template slot="reduceBalanceForm" slot-scope="scope">
                <div>
                    <balanceRecord :row="scope.row" v-if="form&&form.formslot==scope.column.prop"></balanceRecord>
                </div>
            </template>
            <template slot="usageRecordForm" slot-scope="scope">
                <div>
                    <usageRecord :row="scope.row" v-if="form&&form.formslot==scope.column.prop"></usageRecord>
                </div>
            </template>
        </avue-crud>
    </div>
</template>
<script>
import crudMix from "@/mixins/crudMix";
import uploadExcel from '@/views/company/list/uploadExcel'
import balanceRecord from '@/views/company/list/balanceRecord'
import usageRecord from '@/views/company/list/usageRecord'
import excelTask from '@/views/excelTask/'

import { filtersFormatMoney } from '@/utils/filters.js'
import { xhrGet } from '@/utils/req.js'
export default {
  components: {
    uploadExcel,
    balanceRecord,
    usageRecord,
    excelTask
  },
  mixins: [
    crudMix,
  ],
  data() {
    return {
      deriveExcelloading: false,
      config: {
        detail: '',
        save: 'company/addCompany',
        delete: 'company/deleteCompanyId',
        update: 'company/updateCompany',
        list: 'company/getCompany'
      },
      method: {
        delete: 'GET'
      },
      rowKey: 'companyId',
      option: {
        index: false,
        addBtn: true,
        addBtnText: '新增商家',
        menuType: 'menu',
        menuWidth: 120,
        viewBtn: false,
        column: [
          {
            label: "商家id", prop: "bicId", search: true, searchSpan: 6, editDisabled: true, fixed: 'left', viewDisplay: false,
            rules: [{
              required: true,
              message: "请输入商家id",
              trigger: "blur"
            },
            ],
          },
          {
            label: "商家名称", prop: "companyName", search: true, searchSpan: 6, fixed: 'left', viewDisplay: false,
            rules: [{
              required: true,
              message: "请输入商家名称",
              trigger: "blur"
            },
            ],
          },
          { label: "是否启用", prop: "startUsingStr", addDisplay: false, editDisplay: false, viewDisplay: false },
          { label: "是否启用", prop: "startUsing", type: 'switch', hide: true, value: 2, viewDisplay: false, dicData: [{ value: 1, label: '否' }, { value: 2, label: '是' }], },
          {
            label: "余额", prop: "balance", type: 'number', value: 0,
            minRows: 0,
            precision: 2, viewDisplay: false, editDisabled: true,
            formatter: function (row, value, label, column) {
              return filtersFormatMoney(label)
            },
            rules: [
              {
                required: true,
                message: "请输入余额",
                trigger: "blur"
              },
            ],
          },
          {
            label: "冻结金额", prop: "freezeMoney", type: 'number', value: 0,
            addDisplay: false,
            viewDisplay: false,
            editDisplay: false,
            minRows: 0,
            precision: 2,
            formatter: function (row, value, label, column) {
              return filtersFormatMoney(label)
            },
            rules: [
              {
                required: true,
                message: "请输入冻结金额",
                trigger: "blur"
              },
            ],
          },
          {
            label: "可用余额", prop: "usableBalance", type: 'number', value: 0,
            addDisplay: false,
            viewDisplay: false,
            editDisplay: false,
            minRows: 0,
            precision: 2,
            formatter: function (row, value, label, column) {
              return filtersFormatMoney(label)
            },
            rules: [
              {
                required: true,
                message: "请输入可用余额",
                trigger: "blur"
              },
            ],
          },
          {
            label: "余额预警值", prop: "moneyRemind", type: 'number', value: 0,
            viewDisplay: false,
            editDisplay: false,
            minRows: 0,
            precision: 2,
            formatter: function (row, value, label, column) {
              return filtersFormatMoney(label)
            },
            rules: [
              {
                required: true,
                message: "请输入余额预警值",
                trigger: "blur"
              },
            ],
          },

          {
            label: "充值金额", prop: "Recharge", type: 'number', value: 0,
            minRows: 0,
            precision: 2,
            addDisplay: false,
            viewDisplay: false,
            display: true,
            hide: true,
            rules: [
              {
                required: true,
                message: "请输入充值金额",
                trigger: "blur"
              },
            ],
          },
          {
            label: "调减金额", prop: "Reduce", type: 'number', value: 0,
            minRows: 0,
            precision: 2,
            addDisplay: false,
            viewDisplay: false,
            display: true,
            hide: true,
            rules: [
              {
                required: true,
                message: "请输入调减金额",
                trigger: "blur"
              },
            ],
          },
          { label: "备注", prop: "remark", type: "textarea", viewDisplay: false, editDisplay: true },
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
                prop: "uploadExcelCompany",
                msg: "若商家在系统中已存在，余额将会以系统中余额为准，不做修改!",
                uploadData: { title: '商家', url: 'company/excelCompany', href: './assets/uploadCompany.xlsx' },
                hide: true, editDisplay: false, viewDisplay: true, addDisplay: false, formslot: true, span: 24, labelWidth: 0,
              },
              {
                prop: "uploadExcelOrder",
                uploadData: { title: '质检费', url: 'quelityTesting/excelOrder', href: './assets/uploadQuality.xlsx' },
                hide: true, editDisplay: false, viewDisplay: true, addDisplay: false, formslot: true, span: 24, labelWidth: 0,
              },
              {
                prop: "reduceBalance",
                hide: true, editDisplay: false, viewDisplay: true, addDisplay: false, formslot: true, span: 24, labelWidth: 0,
              },
              {
                prop: "usageRecord",
                hide: true, editDisplay: false, viewDisplay: true, addDisplay: false, formslot: true, span: 24, labelWidth: 0,
              },
            ]
          },
        ]
      },
    }
  },
  mounted() {
    console.log(this.$refs.crud);
  },
  methods: {
    deriveExcel() {
      let that = this;
      that.deriveExcelloading = true;
      xhrGet('company/deriveExcel', '商家信息汇总').then(function (res) {
        that.deriveExcelloading = false;
      }).catch(function (err) {
        that.deriveExcelloading = false;
      });
    },
    By100() {
      let that = this;
      that.form.balance = that.form.balance * 100;
      that.form.usableBalance = that.form.usableBalance * 100;
      that.form.moneyRemind = that.form.moneyRemind * 100;
    },
    addBefore() {
      this.By100();
      return 1
    },
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
    openBefore(type) {
      let that = this;
      if (that.form.editType && (that.form.editType == 'Recharge' || that.form.editType == 'Reduce')) {
        that.option.column.forEach((v) => {
          v.prop == 'Reduce' && that.form.editType == 'Recharge' ? v.display = false : 0;
          v.prop == 'Recharge' && that.form.editType == 'Reduce' ? v.display = false : 0;
          v.prop == 'Recharge' && that.form.editType == 'Recharge' ? v.display = true : 0;
          v.prop == 'Reduce' && that.form.editType == 'Reduce' ? v.display = true : 0;
          (v.prop == 'moneyRemind' || v.prop == 'startUsing') ? v.editDisplay = false : 0;
          v.prop == 'companyName' ? v.editDisabled = true : 0;
        })
      }
      else {
        that.option.column.forEach((v) => {
          v.prop == 'Reduce' ? v.display = false : 0;
          v.prop == 'Recharge' ? v.display = false : 0;
          v.prop == 'companyName' ? v.editDisabled = false : 0;
          (v.prop == 'moneyRemind' || v.prop == 'startUsing') ? v.editDisplay = true : 0;
        })
        that.option = Object.assign(that.option, {})
      }
      this.option.editTitle = this.form.editTitle;
      this.option = Object.assign(this.option, {})
    },

    closeDialog(name) {
      // this.$refs.crud.closeDialog();
      console.log(this.$refs[name]);
      if (this.$refs[name]) {
        this.$refs[name].getList()
      }
      this.getList()
    },
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
