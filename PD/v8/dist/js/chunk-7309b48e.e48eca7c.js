(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7309b48e"],{"1e0a":function(e,t,i){"use strict";var a=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"app-container"},[i("avue-crud",e._g(e._b({attrs:{page:e.page},on:{"update:page":function(t){e.page=t}},model:{value:e.form,callback:function(t){e.form=t},expression:"form"}},"avue-crud",e.bindVal,!1),e.onEvent))],1)},l=[],r=i("e7e7"),o=(i("b4fb"),i("053b"),i("9302"),i("2eeb"),i("d718")),n={mixins:[o["a"]],props:{type:{},Pconfig:{}},data:function(){return{config:{detail:"",save:"",delete:"",update:"",list:"/excelTask/getExcelTaskList"},method:{list:"GET"},rowKey:"id",option:{menu:!1,column:[{label:"ID",prop:"id",width:60},{label:"操作用户",prop:"name",formatter:function(e,t,i,a){return"".concat(e.name,"(").concat(e.userName,")")}},{label:"导入开始时间",prop:"createTime"},{label:"导入结束时间",prop:"updateTime"}].concat(Object(r["a"])(this.column_select("状态","status",!1,{width:60,dicData:[{value:0,label:"未完成"},{value:1,label:"已完成"},{value:2,label:"已失败"},{value:3,label:"部分数据导入失败"}]})),[{label:"消息",prop:"message",minWidth:200,overHidden:!0,formatter:function(e,t,i,a){return e.excelTaskErrList.map((function(e,t){return"".concat(t+1,":").concat(e.message,"  ")})).join(",")}}])}}},created:function(){this.Pconfig&&this.Pconfig.excelTask&&(this.config.list=this.Pconfig.excelTask)},methods:{listBefore:function(){this.params.type=this.type}}},s=n,c=i("5d22"),d=Object(c["a"])(s,a,l,!1,null,null,null);t["a"]=d.exports},"33fd":function(e,t,i){"use strict";var a=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"app-container"},[i("avue-crud",e._g(e._b({attrs:{page:e.page},on:{"update:page":function(t){e.page=t}},scopedSlots:e._u([{key:"filePath",fn:function(t){return[t.row.filePath&&1==t.row.status?i("el-link",{staticClass:"dowloadX",staticStyle:{"font-size":"12px"},attrs:{target:"_blank",href:t.row.filePath,download:t.row.fileName+".xlsx",type:"primary",icon:"el-icon-download"}},[e._v(" 下载")]):e._e()]}}]),model:{value:e.form,callback:function(t){e.form=t},expression:"form"}},"avue-crud",e.bindVal,!1),e.onEvent),[i("template",{slot:"menuLeft"},[i("el-button",{staticClass:"el-icon-download",attrs:{type:"primary",size:"small",loading:e.deriveExcelloading},nativeOn:{click:function(t){return e.exportURL(e.config.exportExcel)}}},[e._v(e._s(e.title))])],1)],2)],1)},l=[],r=i("e7e7"),o=(i("b4fb"),i("053b"),i("d718")),n=i("337a"),s={mixins:[o["a"]],props:{type:{},exportParams:{},Pconfig:{},title:{}},data:function(){return{deriveExcelloading:!1,config:{detail:"",save:"",delete:"",update:"",list:"/exportTask/getExportTaskList",exportExcel:""},method:{list:"GET"},rowKey:"id",option:{index:!1,menu:!1,column:[{label:"ID",prop:"id",width:60},{label:"操作用户",prop:"name",formatter:function(e,t,i,a){return"".concat(e.name,"(").concat(e.userName,")")}},{label:"创建时间",prop:"createTime"}].concat(Object(r["a"])(this.column_select("状态","status",!1,{width:60,dicData:[{value:0,label:"未完成"},{value:1,label:"已完成"},{value:2,label:"已失败"},{value:3,label:"部分数据导入失败"}]})),[{label:"文件名",prop:"fileName"},{label:"文件下载",prop:"filePath",solt:!0}])}}},created:function(){this.Pconfig&&this.Pconfig.exportTask&&(this.config.list=this.Pconfig.exportTask),this.Pconfig&&this.Pconfig.exportExcel&&(this.config.exportExcel=this.Pconfig.exportExcel)},methods:{exportURL:function(e){var t=this;t.deriveExcelloading=!0,Object(n["a"])(e,this.exportParams,"GET",!0).then((function(e){t.deriveExcelloading=!1,t.getList()})).catch((function(e){t.deriveExcelloading=!1}))},listBefore:function(){this.params.type=this.type}}},c=s,d=i("5d22"),p=Object(d["a"])(c,a,l,!1,null,null,null);t["a"]=p.exports},3899:function(e,t,i){"use strict";var a=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"row-c UploadExcel "},[i("el-upload",{ref:"upload",staticStyle:{margin:"auto"},attrs:{limit:1,accept:".xlsx, .xls",action:e.data.url,disabled:e.isUploading,"http-request":e.handleFileUpload,"auto-upload":!0,drag:""}},[i("i",{staticClass:"el-icon-upload"}),i("div",{staticClass:"el-upload__text"},[e._v("将文件拖到此处，或"),i("em",[e._v("点击上传")])]),i("div",{staticClass:"el-upload__tip",staticStyle:{color:"#ff0000","text-align":"center"},attrs:{slot:"tip"},slot:"tip"},[i("el-link",{staticClass:"dowloadX",staticStyle:{"font-size":"12px"},attrs:{href:e.data.href,download:e.data.title+"导入模板.xlsx",type:"primary",icon:"el-icon-warning-outline"}},[e._v(" 下载"+e._s(e.data.title)+"导入模板")]),e.data.msg?i("br"):e._e(),e._v(" "+e._s(e.data.msg)+" "),i("br"),e._v(" 提示：仅允许导入“xls”或“xlsx”格式文件！ ")],1)])],1)},l=[],r=i("337a"),o={props:{data:{}},watch:{},data:function(){return{isUploading:!1}},created:function(){},methods:{handleFileUpload:function(e){var t=this,i=new FormData;i.append("file",e.file),t.isUploading=!0;var a=this.$loading({lock:!0,text:"文件上传中",spinner:"el-icon-loading",background:"rgba(0, 0, 0, 0.7)"});Object(r["a"])(t.data.url,i,"upload",!0,!0).then((function(e){console.log(e),t.$refs.upload.clearFiles(),t.isUploading=!1,t.$emit("closeDialog"),a.close()})).catch((function(e){t.$refs.upload.clearFiles(),t.isUploading=!1,a.close()}))}}},n=o,s=(i("646a"),i("5d22")),c=Object(s["a"])(n,a,l,!1,null,null,null);t["a"]=c.exports},"646a":function(e,t,i){"use strict";i("b887")},"6af2":function(e,t,i){"use strict";i.r(t);var a=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"app-container"},[i("avue-crud",e._g(e._b({attrs:{search:e.search,page:e.page},on:{"update:search":function(t){e.search=t},"update:page":function(t){e.page=t}},scopedSlots:e._u([{key:"uploadExcelOrderForm",fn:function(t){return i("div",{},[e.form&&e.form.formslot==t.column.prop?i("UploadExcel",{attrs:{data:e.config.excel},on:{closeDialog:function(t){return e.closeDialog("excelTask1")}}}):e._e(),i("ExcelTask",{ref:"excelTask1",attrs:{Pconfig:e.config,type:"1"}})],1)}},{key:"getExportTaskListForm",fn:function(t){return i("div",{},[e.form&&e.form.formslot==t.column.prop?i("ExportTask",{attrs:{title:"导出订单",Pconfig:e.config,row:t.row,exportParams:e.params,type:"1"}}):e._e()],1)}}]),model:{value:e.form,callback:function(t){e.form=t},expression:"form"}},"avue-crud",e.bindVal,!1),e.onEvent),[i("template",{slot:"menuLeft"},[e.hasPermission(e.config.excel.url)?i("el-button",{staticClass:"el-icon-upload2",attrs:{size:"small"},on:{click:function(t){return e.rowView({formslot:"uploadExcelOrder",viewTitle:"导入订单"},0)}}},[e._v("导入订单")]):e._e(),e.hasPermission(e.config.exportExcel)?i("el-button",{staticClass:"el-icon-download",attrs:{size:"small"},on:{click:function(t){return e.rowView({formslot:"getExportTaskList",viewTitle:"导出订单"},0)}}},[e._v("导出订单")]):e._e()],1)],2)],1)},l=[],r=i("e7e7"),o=i("55ae"),n=i("efe28"),s=(i("b4fb"),i("e35a"),i("9cf3"),i("d718")),c=i("82ff"),d=i("3899"),p=i("33fd"),u=i("1e0a"),m={components:{UploadExcel:d["a"],ExportTask:p["a"],ExcelTask:u["a"]},mixins:[s["a"],c["a"]],data:function(){var e,t=dayjs().format("YYYY-MM-DD"),i=dayjs().subtract(1,"month").format("YYYY-MM-DD");return{endTime:t,startTime:i,config:{detail:"",save:"",delete:"",update:"",list:"/order/getOrder",exportExcel:"/order/exportOrder",exportTask:"/exportTask/getOrderExportTaskList",excelTask:"/excelTask/getOrderExcelTaskList",excel:{title:"订单",url:"/order/excelOrder",href:"./assets/uploadOrder.xlsx"}},rowKey:"orderId",option:Object(n["a"])((e={menu:!1,columnBtn:!1,clearExclude:["orderTime"]},Object(o["a"])(e,"columnBtn",!0),Object(o["a"])(e,"column",[{prop:"orderId",fixed:"left",label:"订单编号",minWidth:180,search:!0,searchSpan:6,viewDisplay:!1},{prop:"orderYard",fixed:"left",label:"订单码",minWidth:100,search:!0,searchSpan:6,viewDisplay:!1},{prop:"bicId",fixed:"left",label:"商家ID",minWidth:100,search:!0,searchSpan:6,viewDisplay:!1},{prop:"companyName",fixed:"left",label:"商家名称",minWidth:180,search:!0,searchSpan:6,viewDisplay:!1},{prop:"orderAppointFlag",label:"订单履约状态",minWidth:180,overHidden:!0,viewDisplay:!1},{prop:"combinedBillFee",label:"合单费",minWidth:180,overHidden:!0,viewDisplay:!1},{prop:"ztBasicFreight",label:"中通基本运费",minWidth:180,overHidden:!0,viewDisplay:!1},{prop:"packingCharge",label:"打包费",minWidth:180,overHidden:!0,viewDisplay:!1},{prop:"ztFreightReceivable",label:"中通应收运费",minWidth:180,overHidden:!0,viewDisplay:!1},{prop:"jdFeedbackFreight",label:"京东反馈运费",minWidth:180,overHidden:!0,viewDisplay:!1},{prop:"jdBillingWeight",label:"京东计费重量",minWidth:180,overHidden:!0,viewDisplay:!1},{prop:"jdFirstWeightAmount",label:"京东首重金额",minWidth:180,overHidden:!0,viewDisplay:!1},{prop:"jdFreightReceivable",label:"京东应收运费",minWidth:180,overHidden:!0,viewDisplay:!1},{prop:"sfFeedbackFreight",label:"顺丰反馈的运费",minWidth:180,overHidden:!0,viewDisplay:!1},{prop:"sfBillingWeight",label:"顺丰计费重量",minWidth:180,overHidden:!0,viewDisplay:!1},{prop:"sfPartsType",label:"顺丰件类型",minWidth:180,overHidden:!0,viewDisplay:!1},{prop:"sfFirstWeightAmount",label:"顺丰首重金额",minWidth:180,overHidden:!0,viewDisplay:!1},{prop:"sfFreightReceivable",label:"顺丰应收运费",minWidth:180,overHidden:!0,viewDisplay:!1},{prop:"total",label:"合计",minWidth:180,overHidden:!0,viewDisplay:!1},{prop:"totalAfterDiscount",label:"优惠后合计",minWidth:180,overHidden:!0,viewDisplay:!1},{prop:"mergeBatch",label:"合并批次号",minWidth:180,overHidden:!0,viewDisplay:!1},{prop:"storageNumber",label:"入库件数",minWidth:180,overHidden:!0,viewDisplay:!1},{prop:"testingInstitutes",label:"质检机构",minWidth:180,overHidden:!0,viewDisplay:!1},{prop:"qualityResult",label:"质检结果",minWidth:180,overHidden:!0,viewDisplay:!1},{prop:"recheckResult",label:"复检结果",minWidth:180,overHidden:!0,viewDisplay:!1},{prop:"planExpress",label:"计划发货快递",minWidth:180,overHidden:!0,viewDisplay:!1},{prop:"realityExpress",label:"实际发货快递",minWidth:180,overHidden:!0,viewDisplay:!1},{prop:"expressNumber",label:"快递单号",minWidth:180,overHidden:!0,viewDisplay:!1},{prop:"placeReceipt",label:"收货省份",minWidth:180,overHidden:!0,viewDisplay:!1},Object(n["a"])({prop:"orderTime",label:"下单时间",minWidth:180,type:"date",searchSpan:6,searchRange:!0,search:!0,valueFormat:"yyyy-MM-dd",format:"yyyy-MM-dd HH:mm:ss",searchValue:[i,t],viewDisplay:!1,searchOrder:1,order:1,searchClearable:!1},this.pickerOptions),{prop:"storageTime",label:"入库时间",minWidth:180,viewDisplay:!1},{prop:"inspectTime",label:"送检时间",minWidth:180,viewDisplay:!1},{prop:"accomplishTime",label:"质检完成时间",minWidth:180,viewDisplay:!1},{prop:"deliveryTime",label:"出库时间",minWidth:180,viewDisplay:!1}]),e),this.group_def([].concat(Object(r["a"])(this.group_column_formslot("uploadExcelOrder")),Object(r["a"])(this.group_column_formslot("getExportTaskList")))))}},methods:{listBefore:function(){this.params.orderTime&&this.params.orderTime.length>0&&(this.params.startTime=this.params.orderTime[0],this.params.endTime=this.params.orderTime[1])},resetBefore:function(){this.search.orderTime=[this.startTime,this.endTime]}},created:function(){this.params.startTime=this.startTime,this.params.endTime=this.endTime},mounted:function(){}},f=m,h=i("5d22"),v=Object(h["a"])(f,a,l,!1,null,null,null);t["default"]=v.exports},"9cf3":function(e,t,i){"use strict";var a=i("b2a2"),l=i("857c"),r=i("2732"),o=i("9d5c"),n=i("59da");a("search",1,(function(e,t,i){return[function(t){var i=r(this),a=void 0==t?void 0:t[e];return void 0!==a?a.call(t,i):new RegExp(t)[e](String(i))},function(e){var a=i(t,e,this);if(a.done)return a.value;var r=l(e),s=String(this),c=r.lastIndex;o(c,0)||(r.lastIndex=0);var d=n(r,s);return o(r.lastIndex,c)||(r.lastIndex=c),null===d?-1:d.index}]}))},"9d5c":function(e,t){e.exports=Object.is||function(e,t){return e===t?0!==e||1/e===1/t:e!=e&&t!=t}},b887:function(e,t,i){}}]);