(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-423dbd93"],{"33fd":function(e,i,t){"use strict";var a=function(){var e=this,i=e.$createElement,t=e._self._c||i;return t("div",{staticClass:"app-container"},[t("avue-crud",e._g(e._b({attrs:{page:e.page},on:{"update:page":function(i){e.page=i}},scopedSlots:e._u([{key:"filePath",fn:function(i){return[i.row.filePath&&1==i.row.status?t("el-link",{staticClass:"dowloadX",staticStyle:{"font-size":"12px"},attrs:{target:"_blank",href:i.row.filePath,download:i.row.fileName+".xlsx",type:"primary",icon:"el-icon-download"}},[e._v(" 下载")]):e._e()]}}]),model:{value:e.form,callback:function(i){e.form=i},expression:"form"}},"avue-crud",e.bindVal,!1),e.onEvent),[t("template",{slot:"menuLeft"},[t("el-button",{staticClass:"el-icon-download",attrs:{type:"primary",size:"small",loading:e.deriveExcelloading},nativeOn:{click:function(i){return e.exportURL(e.config.exportExcel)}}},[e._v(e._s(e.title))])],1)],2)],1)},r=[],l=t("e7e7"),o=(t("b4fb"),t("053b"),t("d718")),n=t("337a"),s={mixins:[o["a"]],props:{type:{},exportParams:{},Pconfig:{},title:{}},data:function(){return{deriveExcelloading:!1,config:{detail:"",save:"",delete:"",update:"",list:"/exportTask/getExportTaskList",exportExcel:""},method:{list:"GET"},rowKey:"id",option:{index:!1,menu:!1,column:[{label:"ID",prop:"id",width:60},{label:"操作用户",prop:"name",formatter:function(e,i,t,a){return"".concat(e.name,"(").concat(e.userName,")")}},{label:"创建时间",prop:"createTime"}].concat(Object(l["a"])(this.column_select("状态","status",!1,{width:60,dicData:[{value:0,label:"未完成"},{value:1,label:"已完成"},{value:2,label:"已失败"},{value:3,label:"部分数据导入失败"}]})),[{label:"文件名",prop:"fileName"},{label:"文件下载",prop:"filePath",solt:!0}])}}},created:function(){this.Pconfig&&this.Pconfig.exportTask&&(this.config.list=this.Pconfig.exportTask),this.Pconfig&&this.Pconfig.exportExcel&&(this.config.exportExcel=this.Pconfig.exportExcel)},methods:{exportURL:function(e){var i=this;i.deriveExcelloading=!0,Object(n["a"])(e,this.exportParams,"GET",!0).then((function(e){i.deriveExcelloading=!1,i.getList()})).catch((function(e){i.deriveExcelloading=!1}))},listBefore:function(){this.params.type=this.type}}},p=s,d=t("5d22"),c=Object(d["a"])(p,a,r,!1,null,null,null);i["a"]=c.exports},"9cf3":function(e,i,t){"use strict";var a=t("b2a2"),r=t("857c"),l=t("2732"),o=t("9d5c"),n=t("59da");a("search",1,(function(e,i,t){return[function(i){var t=l(this),a=void 0==i?void 0:i[e];return void 0!==a?a.call(i,t):new RegExp(i)[e](String(t))},function(e){var a=t(i,e,this);if(a.done)return a.value;var l=r(e),s=String(this),p=l.lastIndex;o(p,0)||(l.lastIndex=0);var d=n(l,s);return o(l.lastIndex,p)||(l.lastIndex=p),null===d?-1:d.index}]}))},"9d5c":function(e,i){e.exports=Object.is||function(e,i){return e===i?0!==e||1/e===1/i:e!=e&&i!=i}},ad18:function(e,i,t){"use strict";t.r(i);var a=function(){var e=this,i=e.$createElement,t=e._self._c||i;return t("div",{staticClass:"app-container"},[t("avue-crud",e._g(e._b({attrs:{search:e.search,page:e.page},on:{"update:search":function(i){e.search=i},"update:page":function(i){e.page=i}},scopedSlots:e._u([{key:"getExportTaskListForm",fn:function(i){return t("div",{},[e.form&&e.form.formslot==i.column.prop?t("ExportTask",{attrs:{Pconfig:e.config,title:"导出订单",row:i.row,exportParams:e.params,type:"1"}}):e._e()],1)}}]),model:{value:e.form,callback:function(i){e.form=i},expression:"form"}},"avue-crud",e.bindVal,!1),e.onEvent),[t("template",{slot:"menuLeft"},[e.hasPermission(e.config.exportExcel)?t("el-button",{staticClass:"el-icon-download",attrs:{size:"small"},on:{click:function(i){return e.rowView({formslot:"getExportTaskList",viewTitle:"导出订单"},0)}}},[e._v("导出订单")]):e._e()],1)],2)],1)},r=[],l=t("e7e7"),o=t("efe28"),n=(t("e35a"),t("9cf3"),t("d718")),s=t("82ff"),p=t("33fd"),d={components:{ExportTask:p["a"]},mixins:[n["a"],s["a"]],data:function(){var e=dayjs().format("YYYY-MM-DD"),i=dayjs().subtract(1,"month").format("YYYY-MM-DD");return{endTime:e,startTime:i,config:{detail:"",save:"",delete:"",update:"",list:"/myOrder/getOrder",exportExcel:"/myOrder/exportOrder",exportTask:"/myOrder/getExportTaskList",excelTask:""},rowKey:"orderId",option:Object(o["a"])({menu:!1,columnBtn:!0,clearExclude:["orderTime"],column:[{prop:"orderId",fixed:"left",label:"订单编号",minWidth:180,search:!0,searchSpan:6,viewDisplay:!1},{prop:"orderYard",fixed:"left",label:"订单码",minWidth:100,search:!0,searchSpan:6,viewDisplay:!1},{prop:"bicId",fixed:"left",label:"商家ID",minWidth:100,viewDisplay:!1},{prop:"companyName",fixed:"left",label:"商家名称",minWidth:180,viewDisplay:!1},{prop:"orderAppointFlag",label:"订单履约状态",minWidth:180,overHidden:!0,viewDisplay:!1},{prop:"combinedBillFee",label:"合单费",minWidth:180,overHidden:!0,viewDisplay:!1},{prop:"ztBasicFreight",label:"中通基本运费",minWidth:180,overHidden:!0,viewDisplay:!1},{prop:"packingCharge",label:"打包费",minWidth:180,overHidden:!0,viewDisplay:!1},{prop:"ztFreightReceivable",label:"中通应收运费",minWidth:180,overHidden:!0,viewDisplay:!1},{prop:"jdFeedbackFreight",label:"京东反馈运费",minWidth:180,overHidden:!0,viewDisplay:!1},{prop:"jdBillingWeight",label:"京东计费重量",minWidth:180,overHidden:!0,viewDisplay:!1},{prop:"jdFirstWeightAmount",label:"京东首重金额",minWidth:180,overHidden:!0,viewDisplay:!1},{prop:"jdFreightReceivable",label:"京东应收运费",minWidth:180,overHidden:!0,viewDisplay:!1},{prop:"sfFeedbackFreight",label:"顺丰反馈的运费",minWidth:180,overHidden:!0,viewDisplay:!1},{prop:"sfBillingWeight",label:"顺丰计费重量",minWidth:180,overHidden:!0,viewDisplay:!1},{prop:"sfPartsType",label:"顺丰件类型",minWidth:180,overHidden:!0,viewDisplay:!1},{prop:"sfFirstWeightAmount",label:"顺丰首重金额",minWidth:180,overHidden:!0,viewDisplay:!1},{prop:"sfFreightReceivable",label:"顺丰应收运费",minWidth:180,overHidden:!0,viewDisplay:!1},{prop:"total",label:"合计",minWidth:180,overHidden:!0,viewDisplay:!1},{prop:"totalAfterDiscount",label:"优惠后合计",minWidth:180,overHidden:!0,viewDisplay:!1},{prop:"mergeBatch",label:"合并批次号",minWidth:180,overHidden:!0,viewDisplay:!1},{prop:"storageNumber",label:"入库件数",minWidth:180,overHidden:!0,viewDisplay:!1},{prop:"testingInstitutes",label:"质检机构",minWidth:180,overHidden:!0,viewDisplay:!1},{prop:"qualityResult",label:"质检结果",minWidth:180,overHidden:!0,viewDisplay:!1},{prop:"recheckResult",label:"复检结果",minWidth:180,overHidden:!0,viewDisplay:!1},{prop:"planExpress",label:"计划发货快递",minWidth:180,overHidden:!0,viewDisplay:!1},{prop:"realityExpress",label:"实际发货快递",minWidth:180,overHidden:!0,viewDisplay:!1},{prop:"expressNumber",label:"快递单号",minWidth:180,overHidden:!0,viewDisplay:!1},{prop:"placeReceipt",label:"收货省份",minWidth:180,overHidden:!0,viewDisplay:!1},Object(o["a"])({prop:"orderTime",label:"下单时间",minWidth:180,type:"date",searchSpan:6,searchRange:!0,search:!0,valueFormat:"yyyy-MM-dd",format:"yyyy-MM-dd HH:mm:ss",searchValue:[i,e],viewDisplay:!1,searchOrder:1,order:1,searchClearable:!1},this.pickerOptions),{prop:"storageTime",label:"入库时间",minWidth:180,viewDisplay:!1},{prop:"inspectTime",label:"送检时间",minWidth:180,viewDisplay:!1},{prop:"accomplishTime",label:"质检完成时间",minWidth:180,viewDisplay:!1},{prop:"deliveryTime",label:"出库时间",minWidth:180,viewDisplay:!1}]},this.group_def(Object(l["a"])(this.group_column_formslot("getExportTaskList"))))}},methods:{listBefore:function(){this.params.orderTime&&this.params.orderTime.length>0&&(this.params.startTime=this.params.orderTime[0],this.params.endTime=this.params.orderTime[1])},resetBefore:function(){this.search.orderTime=[this.startTime,this.endTime]}},created:function(){this.params.startTime=this.startTime,this.params.endTime=this.endTime},mounted:function(){}},c=d,m=t("5d22"),h=Object(m["a"])(c,a,r,!1,null,null,null);i["default"]=h.exports}}]);