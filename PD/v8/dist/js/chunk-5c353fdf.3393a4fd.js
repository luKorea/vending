(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-5c353fdf"],{"22a4":function(e,t,a){"use strict";var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"app-container"},[a("avue-crud",e._g(e._b({attrs:{page:e.page},on:{"update:page":function(t){e.page=t}},scopedSlots:e._u([{key:"filePath",fn:function(t){return[t.row.filePath&&1==t.row.status?a("el-link",{staticClass:"dowloadX",staticStyle:{"font-size":"12px"},attrs:{href:t.row.filePath,download:t.row.fileName+".xlsx",type:"primary",icon:"el-icon-download"}},[e._v(" 下载")]):e._e()]}}]),model:{value:e.form,callback:function(t){e.form=t},expression:"form"}},"avue-crud",e.bindVal,!1),e.onEvent),[a("template",{slot:"menuLeft"},[a("el-button",{staticClass:"el-icon-download",attrs:{type:"primary",size:"small",loading:e.deriveExcelloading},nativeOn:{click:function(t){return e.exportURL(e.config.exportExcel)}}},[e._v(e._s(e.title))])],1)],2)],1)},l=[],o=a("1c5e"),n=(a("b4fb"),a("053b"),a("d718")),s=a("337a"),r={components:{},mixins:[n["a"]],props:{type:{},exportParams:{},Pconfig:{},title:{}},data:function(){return{deriveExcelloading:!1,config:{detail:"",save:"",delete:"",update:"",list:"/exportTask/getExportTaskList",exportExcel:""},method:{list:"GET"},rowKey:"id",option:{index:!1,menu:!1,column:[{label:"ID",prop:"id",width:60},{label:"操作用户",prop:"name",formatter:function(e,t,a,i){return"".concat(e.name,"(").concat(e.userName,")")}},{label:"创建时间",prop:"createTime"}].concat(Object(o["a"])(this.column_select("状态","status",!1,{width:60,dicData:[{value:0,label:"未完成"},{value:1,label:"已完成"},{value:2,label:"已失败"},{value:3,label:"部分数据导入失败"}]})),[{label:"文件名",prop:"fileName"},{label:"文件下载",prop:"filePath",solt:!0}])}}},created:function(){this.Pconfig&&this.Pconfig.exportTask&&(this.config.list=this.Pconfig.exportTask),this.Pconfig&&this.Pconfig.exportExcel&&(this.config.exportExcel=this.Pconfig.exportExcel)},methods:{exportURL:function(e){var t=this;t.deriveExcelloading=!0,Object(s["a"])(e,this.exportParams,"GET",!0).then((function(e){t.deriveExcelloading=!1,t.getList()})).catch((function(e){t.deriveExcelloading=!1}))},listBefore:function(){this.params.type=this.type}}},c=r,u=a("5d22"),p=Object(u["a"])(c,i,l,!1,null,null,null);t["a"]=p.exports},"99a4":function(e,t,a){"use strict";var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"app-container"},[a("avue-crud",e._g(e._b({attrs:{page:e.page},on:{"update:page":function(t){e.page=t}},model:{value:e.form,callback:function(t){e.form=t},expression:"form"}},"avue-crud",e.bindVal,!1),e.onEvent))],1)},l=[],o=a("1c5e"),n=(a("b4fb"),a("053b"),a("9302"),a("2eeb"),a("d718")),s={components:{},mixins:[n["a"]],props:{type:{},listurl:{}},data:function(){return{config:{detail:"",save:"",delete:"",update:"",list:"/excelTask/getExcelTaskList"},method:{list:"GET"},rowKey:"id",option:{index:!0,menu:!1,column:[{label:"ID",prop:"id",width:60},{label:"操作用户",prop:"name",formatter:function(e,t,a,i){return"".concat(e.name,"(").concat(e.userName,")")}},{label:"导入开始时间",prop:"createTime"},{label:"导入结束时间",prop:"updateTime"}].concat(Object(o["a"])(this.column_select("状态","status",!1,{width:60,dicData:[{value:0,label:"未完成"},{value:1,label:"已完成"},{value:2,label:"已失败"},{value:3,label:"部分数据导入失败"}]})),[{label:"消息",prop:"message",minWidth:200,overHidden:!0,formatter:function(e,t,a,i){return e.excelTaskErrList.map((function(e,t){return"".concat(t+1,":").concat(e.message,"  ")})).join(",")}}])}}},created:function(){console.log(this.listurl),this.listurl&&(this.config.list=this.listurl)},methods:{listBefore:function(){this.params.type=this.type}}},r=s,c=a("5d22"),u=Object(c["a"])(r,i,l,!1,null,null,null);t["a"]=u.exports},"9cf3":function(e,t,a){"use strict";var i=a("b2a2"),l=a("857c"),o=a("2732"),n=a("9d5c"),s=a("59da");i("search",1,(function(e,t,a){return[function(t){var a=o(this),i=void 0==t?void 0:t[e];return void 0!==i?i.call(t,a):new RegExp(t)[e](String(a))},function(e){var i=a(t,e,this);if(i.done)return i.value;var o=l(e),r=String(this),c=o.lastIndex;n(c,0)||(o.lastIndex=0);var u=s(o,r);return n(o.lastIndex,c)||(o.lastIndex=c),null===u?-1:u.index}]}))},"9d5c":function(e,t){e.exports=Object.is||function(e,t){return e===t?0!==e||1/e===1/t:e!=e&&t!=t}},e381:function(e,t,a){"use strict";var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"row-c"},[a("el-upload",{ref:"upload",staticStyle:{margin:"auto"},attrs:{limit:1,accept:".xlsx, .xls",action:e.uploadData.url,disabled:e.isUploading,"http-request":e.handleFileUpload,"auto-upload":!0,drag:""}},[a("i",{staticClass:"el-icon-upload"}),a("div",{staticClass:"el-upload__text"},[e._v("将文件拖到此处，或"),a("em",[e._v("点击上传")])]),a("div",{staticClass:"el-upload__tip",staticStyle:{color:"#ff0000","text-align":"center"},attrs:{slot:"tip"},slot:"tip"},[a("el-link",{staticClass:"dowloadX",staticStyle:{"font-size":"12px"},attrs:{href:e.uploadData.href,download:e.uploadData.title+"导入模板.xlsx",type:"primary",icon:"el-icon-warning-outline"}},[e._v(" 下载"+e._s(e.uploadData.title)+"导入模板")]),e.msg?a("br"):e._e(),e._v(" "+e._s(e.msg)+" "),a("br"),e._v(" 提示：仅允许导入“xls”或“xlsx”格式文件！ ")],1)])],1)},l=[],o=(a("9302"),a("337a")),n={components:{},props:{uploadData:{type:Object,default:{title:"",url:"",href:""}},msg:""},watch:{},data:function(){return{isUploading:!1}},created:function(){},methods:{handleFileUpload:function(e){var t=this,a=new FormData;a.append("file",e.file),t.isUploading=!0;var i=this.$loading({lock:!0,text:"文件上传中",spinner:"el-icon-loading",background:"rgba(0, 0, 0, 0.7)"});Object(o["a"])(t.uploadData.url,a,"upload",!0,!0).then((function(e){console.log(e),t.$refs.upload.clearFiles(),t.isUploading=!1,t.$emit("closeDialog"),i.close(),200!=e.code&&t.$alert(e.data&&e.data.join(","),"提示",{confirmButtonText:"确定",callback:function(e){}})})).catch((function(e){t.$refs.upload.clearFiles(),t.isUploading=!1,i.close()}))}}},s=n,r=a("5d22"),c=Object(r["a"])(s,i,l,!1,null,null,null);t["a"]=c.exports},f9d0:function(e,t,a){"use strict";a.r(t);var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"app-container"},[a("avue-crud",e._g(e._b({attrs:{search:e.search,page:e.page},on:{"update:search":function(t){e.search=t},"update:page":function(t){e.page=t}},scopedSlots:e._u([{key:"uploadExcelOrderForm",fn:function(t){return a("div",{},[e.form&&e.form.formslot==t.column.prop?a("uploadExcel",{attrs:{uploadData:t.column.uploadData,msg:t.column.msg},on:{closeDialog:function(t){return e.closeDialog("excelTask2")}}}):e._e(),a("excelTask",{ref:"excelTask2",attrs:{listurl:"/excelTask/getQualityTestingExcelTaskList",type:"2"}})],1)}},{key:"exportQualityTestingForm",fn:function(t){return a("div",{},[e.form&&e.form.formslot==t.column.prop?a("exportTask",{attrs:{title:"导出质检费",Pconfig:e.config,row:t.row,type:"2",exportParams:e.params}}):e._e()],1)}}]),model:{value:e.form,callback:function(t){e.form=t},expression:"form"}},"avue-crud",e.bindVal,!1),e.onEvent),[a("template",{slot:"menuLeft"},[e.hasPermission("/quelityTesting/excelOrder")?a("el-button",{staticClass:"el-icon-upload2",attrs:{size:"small"},on:{click:function(t){return e.rowView({formslot:"uploadExcelOrder",viewTitle:"导入质检费"},0)}}},[e._v("导入质检费")]):e._e(),e.hasPermission("/quelityTesting/exportQualityTesting")?a("el-button",{staticClass:"el-icon-download",attrs:{size:"small"},on:{click:function(t){return e.rowView({formslot:"exportQualityTesting",viewTitle:"导出质检费"},0)}}},[e._v(" 导出质检费")]):e._e()],1)],2)],1)},l=[],o=a("1c5e"),n=a("f374"),s=(a("b4fb"),a("e35a"),a("9cf3"),a("d718")),r=a("82ff"),c=a("e381"),u=a("22a4"),p=a("99a4"),d={components:{uploadExcel:c["a"],exportTask:u["a"],excelTask:p["a"]},mixins:[s["a"],r["a"]],data:function(){var e=dayjs().format("YYYY-MM-DD"),t=dayjs().subtract(1,"month").format("YYYY-MM-DD");return{endTime:e,startTime:t,config:{detail:"",save:"",delete:"",update:"",list:"/quelityTesting/getQualityTesting",exportExcel:"/quelityTesting/exportQualityTesting",exportTask:"/exportTask/getQualityTestingExportTaskList",excelTask:"/quelityTesting/excelOrder"},rowKey:"id",option:Object(n["a"])({menu:!1,clearExclude:["date"],column:[Object(n["a"])({prop:"date",label:"质检日期",type:"date",searchSpan:6,searchRange:!0,search:!0,valueFormat:"yyyy-MM-dd",format:"yyyy-MM-dd",searchValue:[t,e],viewDisplay:!1,searchOrder:1,order:1,searchClearable:!1},this.pickerOptions),{label:"商家名称",prop:"bicName",search:!0,searchSpan:6,viewDisplay:!1},{label:"证书类型",prop:"certificateType",viewDisplay:!1}].concat(Object(o["a"])(this.column_money("应收单价","unitPriceReceivable",!1,{viewDisplay:!1})),[{label:"数量（件）",prop:"number",viewDisplay:!1}],Object(o["a"])(this.column_money("应收合计","totalReceivables",!1,{viewDisplay:!1})),Object(o["a"])(this.column_money("优惠金额","preferentialAmount",!1,{viewDisplay:!1})),Object(o["a"])(this.column_money("实收金额","amountActuallyReceived",!1,{viewDisplay:!1})),[{label:"所属机构",prop:"affiliatedInstitutions",viewDisplay:!1}])},this.group_def([].concat(Object(o["a"])(this.group_column_formslot("uploadExcelOrder",{uploadData:{title:"质检费",url:"/quelityTesting/excelOrder",href:"./assets/uploadQuality.xlsx"}})),Object(o["a"])(this.group_column_formslot("exportQualityTesting",{})))))}},methods:{listBefore:function(){this.params.date&&this.params.date.length>0&&(this.params.startTime=this.params.date[0],this.params.endTime=this.params.date[1],delete this.params.date)},resetBefore:function(){this.search.date=[this.startTime,this.endTime]}},created:function(){this.params.startTime=this.startTime,this.params.endTime=this.endTime},mounted:function(){}},f=d,m=a("5d22"),h=Object(m["a"])(f,i,l,!1,null,null,null);t["default"]=h.exports}}]);