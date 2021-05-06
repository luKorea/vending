(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0afa1c"],{"0ec4":function(e,a,o){"use strict";o.r(a);var t=function(){var e=this,a=e.$createElement,o=e._self._c||a;return o("div",{staticClass:"app-container"},[o("avue-crud",e._g(e._b({attrs:{page:e.page},on:{"update:page":function(a){e.page=a}},scopedSlots:e._u([{key:"bicId",fn:function(a){return o("div",{staticClass:"row-c"},[1!=a.row.flag?o("el-tooltip",{attrs:{content:"您的可用余额低于预警值，请及时充值",placement:"top"}},[o("svg-icon",{staticStyle:{"font-size":"25px","margin-right":"10px"},attrs:{"icon-class":"warning"}})],1):e._e(),o("span",[e._v(e._s(a.row.bicId))])],1)}},{key:"menuBtn",fn:function(a){return[e.hasPermission(e.config.addBalance)?o("el-dropdown-item",{nativeOn:{click:function(o){return e.$refs.crud.rowEdit(Object.assign({},a.row,{editType:"Recharge",editTitle:"充值"}),a.index)}}},[e._v("充值")]):e._e(),e.hasPermission(e.config.subBalance)?o("el-dropdown-item",{nativeOn:{click:function(o){return e.$refs.crud.rowEdit(Object.assign({},a.row,{editType:"Reduce",editTitle:"调减"}),a.index)}}},[e._v("调减")]):e._e(),e.hasPermission(e.config.getTopUpLog)?o("el-dropdown-item",{nativeOn:{click:function(o){return e.rowView(Object.assign({},a.row,{formslot:"reduceBalance",viewTitle:"商家["+a.row.companyName+"]的充值/调减记录"}),a.index)}}},[e._v(" 充值/调减记录")]):e._e(),e.hasPermission(e.config.orderStatistics)?o("el-dropdown-item",{nativeOn:{click:function(o){return e.rowView(Object.assign({},a.row,{formslot:"usageRecord",viewTitle:"商家["+a.row.companyName+"]的使用记录"}),a.index)}}},[e._v(" 使用记录")]):e._e()]}},{key:"uploadExcelCompanyForm",fn:function(a){return o("div",{},[e.form&&e.form.formslot==a.column.prop?o("uploadExcel",{attrs:{uploadData:a.column.uploadData,msg:a.column.msg},on:{closeDialog:function(a){return e.closeDialog("excelTask3")}}}):e._e(),o("excelTask",{ref:"excelTask3",attrs:{Pconfig:e.config,type:"3"}})],1)}},{key:"reduceBalanceForm",fn:function(a){return o("div",{},[e.form&&e.form.formslot==a.column.prop?o("balanceRecord",{attrs:{Pconfig:e.config,row:a.row}}):e._e()],1)}},{key:"usageRecordForm",fn:function(a){return o("div",{},[e.form&&e.form.formslot==a.column.prop?o("usageRecord",{attrs:{Pconfig:e.config,row:a.row}}):e._e()],1)}},{key:"getExportTaskListForm",fn:function(a){return o("div",{},[e.form&&e.form.formslot==a.column.prop?o("exportTask",{attrs:{title:"导出商家",Pconfig:e.config,row:a.row,type:"3",exportParams:e.params}}):e._e()],1)}}]),model:{value:e.form,callback:function(a){e.form=a},expression:"form"}},"avue-crud",e.bindVal,!1),e.onEvent),[o("template",{slot:"menuLeft"},[e.hasPermission("/company/excelCompany")?o("el-button",{staticClass:"el-icon-upload2",attrs:{size:"small"},on:{click:function(a){return e.rowView({formslot:"uploadExcelCompany",viewTitle:"导入商家"},0)}}},[e._v("导入商家")]):e._e(),e.hasPermission(e.config.exportExcel)?o("el-button",{staticClass:"el-icon-download",attrs:{size:"small"},on:{click:function(a){return e.rowView({formslot:"getExportTaskList",viewTitle:"导出商家"},0)}}},[e._v("导出商家")]):e._e()],1)],2)],1)},n=[],i=o("f206"),r=o("1c5e"),c=o("f374"),s=(o("6a61"),o("b4fb"),o("08ba"),o("d718")),l=o("82ff"),p=o("e381"),d=o("7e3b"),m=o("47ad"),u=o("22a4"),f=o("99a4"),y={components:{uploadExcel:p["a"],balanceRecord:d["a"],usageRecord:m["a"],excelTask:f["a"],exportTask:u["a"]},mixins:[s["a"],l["a"]],props:{my:{}},data:function(){return{config:{detail:"",save:"/company/addCompany",delete:"/company/deleteCompanyId",update:"/company/updateCompany",list:"/company/getCompany",addBalance:"/company/addBalance",subBalance:"/company/subBalance",getTopUpLog:"/logCompany/getTopUpLog",orderStatistics:"/logCompany/orderStatistics",findDayOrder:"/company/findDayOrder",getOrderByDayAndbicId:"/logCompany/getOrderByDayAndbicId",getQualityTestingByDayAndbicName:"/logCompany/getQualityTestingByDayAndbicName",exportExcel:"/company/deriveExcel",exportTask:"/exportTask/getCompanyExportTaskList",excelTask:"/excelTask/getCompanyExcelTaskList"},method:{delete:"GET"},rowKey:"companyId",option:Object(c["a"])({index:!0,addBtn:!0,addBtnText:"新增商家",menuType:"menu",viewBtn:!1,column:[].concat(Object(r["a"])(this.column_def("商家ID","bicId",!0,{search:!0,searchSpan:6,editDisabled:!0,fixed:"left",viewDisplay:!1})),Object(r["a"])(this.column_def("商家名称","companyName",!0,{search:!0,searchSpan:6,fixed:"left",viewDisplay:!1})),Object(r["a"])(this.column_def("是否启用","startUsingStr",!1,{hide:!0,addDisplay:!1,editDisplay:!1,viewDisplay:!1})),Object(r["a"])(this.column_switch("是否启用","startUsing",!1,{hide:!0,value:2,addDisplay:!1,editDisplay:!1,viewDisplay:!1,dicData:[{value:1,label:"否"},{value:2,label:"是"}]})),Object(r["a"])(this.column_money("余额","balance",!0,{viewDisplay:!1,editDisabled:!0})),Object(r["a"])(this.column_money("冻结金额","freezeMoney",!0,{addDisplay:!1,viewDisplay:!1,editDisplay:!1})),Object(r["a"])(this.column_money("可用余额","usableBalance",!0,{addDisplay:!1,viewDisplay:!1,editDisplay:!1})),Object(r["a"])(this.column_money("余额预警值","moneyRemind",!0,{viewDisplay:!1,editDisabled:!0})),Object(r["a"])(this.column_money("充值金额","Recharge",!0,{addDisplay:!1,viewDisplay:!1,display:!0,hide:!0})),Object(r["a"])(this.column_money("调减金额","Reduce",!0,{addDisplay:!1,viewDisplay:!1,display:!0,hide:!0})),Object(r["a"])(this.column_textarea("备注","remark",!1,{viewDisplay:!1,editDisplay:!0})))},this.group_def([].concat(Object(r["a"])(this.group_column_formslot("uploadExcelCompany",{msg:"若商家在系统中已存在，余额将会以系统中余额为准，不做修改!",uploadData:{title:"商家",url:"/company/excelCompany",href:"./assets/uploadCompany.xlsx"}})),Object(r["a"])(this.group_column_formslot("uploadExcelOrder",{uploadData:{title:"质检费",url:"/quelityTesting/excelOrder",href:"./assets/uploadQuality.xlsx"}})),Object(r["a"])(this.group_column_formslot("reduceBalance",{})),Object(r["a"])(this.group_column_formslot("usageRecord",{})),Object(r["a"])(this.group_column_formslot("getExportTaskList",{})),Object(r["a"])(this.group_column_formslot("exportQualityTesting",{})))))}},created:function(){return Object(i["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:case"end":return e.stop()}}),e)})))()},methods:{By100:function(){var e=this;e.form.balance=100*e.form.balance,e.form.usableBalance=100*e.form.usableBalance,e.form.moneyRemind=100*e.form.moneyRemind},addBefore:function(){return this.By100(),1},updateBefore:function(){var e=this;return!e.form.editType||"Recharge"!=e.form.editType&&"Reduce"!=e.form.editType?e.config.update="company/updateCompany":("Recharge"==e.form.editType&&(e.config.update="company/addBalance",e.form.balance=e.form.Recharge),"Reduce"==e.form.editType&&(e.config.update="company/subBalance",e.form.balance=e.form.Reduce)),this.By100(),1},openBefore:function(e){var a=this;!a.form.editType||"Recharge"!=a.form.editType&&"Reduce"!=a.form.editType?(a.option.column.forEach((function(e){"Reduce"==e.prop&&(e.display=!1),"Recharge"==e.prop&&(e.display=!1),"companyName"==e.prop&&(e.editDisabled=!1),"moneyRemind"==e.prop&&(e.editDisplay=!0,e.editDisabled=!1),"balance"==e.prop&&(e.editDisplay=!1)})),a.option=Object.assign(a.option,{})):a.option.column.forEach((function(e){"Reduce"==e.prop&&"Recharge"==a.form.editType&&(e.display=!1),"Recharge"==e.prop&&"Reduce"==a.form.editType&&(e.display=!1),"Recharge"==e.prop&&"Recharge"==a.form.editType&&(e.display=!0),"Reduce"==e.prop&&"Reduce"==a.form.editType&&(e.display=!0),"moneyRemind"==e.prop&&(e.editDisplay=!1),"companyName"==e.prop&&(e.editDisabled=!0),"balance"==e.prop&&(e.editDisplay=!0)})),this.option.editTitle=this.form.editTitle,this.option=Object.assign(this.option,{}),console.log(this.option)},tableRowClassName:function(e){var a=e.row;e.rowIndex;return 1==a.flag?"":"warning-row "}}},g=y,b=o("5d22"),h=Object(b["a"])(g,t,n,!1,null,null,null);a["default"]=h.exports}}]);