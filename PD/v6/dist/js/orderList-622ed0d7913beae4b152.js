/*! 版权所有，翻版必究 */!function(c){function e(e){for(var t,n,i=e[0],a=e[1],r=e[2],o=0,l=[];o<i.length;o++)n=i[o],Object.prototype.hasOwnProperty.call(s,n)&&s[n]&&l.push(s[n][0]),s[n]=0;for(t in a)Object.prototype.hasOwnProperty.call(a,t)&&(c[t]=a[t]);for(p&&p(e);l.length;)l.shift()();return u.push.apply(u,r||[]),d()}function d(){for(var e,t=0;t<u.length;t++){for(var n=u[t],i=!0,a=1;a<n.length;a++){var r=n[a];0!==s[r]&&(i=!1)}i&&(u.splice(t--,1),e=o(o.s=n[0]))}return e}var n={},s={6:0},u=[];function o(e){if(n[e])return n[e].exports;var t=n[e]={i:e,l:!1,exports:{}};return c[e].call(t.exports,t,t.exports,o),t.l=!0,t.exports}o.m=c,o.c=n,o.d=function(e,t,n){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(t,e){if(1&e&&(t=o(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)o.d(n,i,function(e){return t[e]}.bind(null,i));return n},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="";var t=(i=window.webpackJsonp=window.webpackJsonp||[]).push.bind(i);i.push=e;for(var i=i.slice(),a=0;a<i.length;a++)e(i[a]);var p=t;u.push([338,0]),d()}({338:function(e,t,n){"use strict";n.r(t);var t=n(353),m=n(1);layui.use(["table","form","layer","tree","util","laydate"],function(){var o=layui.jquery,e=layui.table,l=layui.layer,t=layui.laydate,i=sessionStorage.token,c=Object(m.e)().startTime,d=Object(m.e)().endTime,n=JSON.parse(sessionStorage.roleData),a=permissionsVal1(permissionData,n);(a[6]?removeClass:addClass)(".pushBtnShow"),(a[25]?removeClass:addClass)(".pullBtnShow"),a[7]?removeClass(".list-table"):(addClass(".list-table"),removeClass(".role-text")),t.render({elem:"#test6",range:!0,value:Object(m.e)().keyTimeData,done:function(e){e=e.split(" - ");c=e[0],d=e[1]}});var r=e.render({elem:"#tableTest",url:"".concat(Vapi,"/order/getOrder"),method:"post",contentType:"application/json",headers:{token:i},height:"600",cols:[[{field:"orderId",width:180,fixed:"left",title:"订单编号",align:"center"},{field:"orderYard",width:180,fixed:"left",title:"订单码",align:"center"},{field:"bicId",width:160,fixed:"left",title:"商家ID",align:"center"},{field:"companyName",width:160,fixed:"left",title:"商家名称",align:"center"},{field:"orderAppointFlag",width:160,title:"订单履约状态",align:"center"},{field:"combinedBillFee",width:160,title:"合单费",align:"center"},{field:"ztBasicFreight",width:160,title:"中通基本运费",align:"center"},{field:"packingCharge",width:160,title:"打包费",align:"center"},{field:"ztFreightReceivable",width:160,title:"中通应收运费",align:"center"},{field:"jdFeedbackFreight",width:160,title:"京东反馈运费",align:"center"},{field:"jdBillingWeight",width:160,title:"京东计费重量",align:"center"},{field:"jdFirstWeightAmount",width:160,title:"京东首重金额",align:"center"},{field:"jdFreightReceivable",width:160,title:"京东应收运费",align:"center"},{field:"sfFeedbackFreight",width:160,title:"顺丰反馈的运费",align:"center"},{field:"sfBillingWeight",width:160,title:"顺丰计费重量",align:"center"},{field:"sfPartsType",width:160,title:"顺丰件类型",align:"center"},{field:"sfFirstWeightAmount",width:160,title:"顺丰首重金额",align:"center"},{field:"sfFreightReceivable",width:160,title:"顺丰应收运费",align:"center"},{field:"total",width:160,title:"合计",align:"center"},{field:"totalAfterDiscount",width:160,title:"优惠后合计",align:"center"},{field:"mergeBatch",width:160,title:"合并批次号",align:"center"},{field:"storageNumber",width:160,title:"入库件数",align:"center"},{field:"testingInstitutes",width:160,title:"质检机构",align:"center"},{field:"qualityResult",width:160,title:"质检结果",align:"center"},{field:"recheckResult",width:160,title:"复检结果",align:"center"},{field:"planExpress",width:160,title:"计划发货快递",align:"center"},{field:"realityExpress",width:160,title:"实际发货快递",align:"center"},{field:"expressNumber",width:160,title:"快递单号",align:"center"},{field:"placeReceipt",width:160,title:"收货省份",align:"center"},{field:"orderTime",width:180,title:"下单时间",align:"center"},{field:"storageTime",width:180,title:"入库时间",align:"center"},{field:"inspectTime",width:180,title:"送检时间",align:"center"},{field:"accomplishTime",width:180,title:"质检完成时间",align:"center"},{field:"deliveryTime",width:180,title:"出库时间",align:"center"}]],id:"tableId",page:!0,loading:!0,even:!0,request:{pageName:"pageNum",limitName:"pageSize"},where:{startTime:c,endTime:d},parseData:function(e){return 200==e.code?{code:e.code,msg:e.message,count:e.data.total,data:e.data.list}:{code:e.code,msg:e.message}},response:{statusCode:200},done:function(e){403==e.code&&(l.msg("登录过期,请重新登录",{icon:2}),setTimeout(function(e){window.parent.location.href="login.html"},1500)),Object(m.c)()}});o(".playHeader .close").click(function(){o(this).parent().parent().addClass("margin0"),o(this).parents(".maskContnet").fadeOut()}),o(".queryBtnClick").click(function(){Object(m.l)(c,d)?l.msg("时间选择范围最多三个月",{icon:7}):r.reload({where:{orderId:o('.newKeyContent input[name="orderId"]').val(),orderYard:o('.newKeyContent input[name="orderYard"]').val(),bicId:o('.newKeyContent input[name="bicId"]').val(),companyName:o('.newKeyContent input[name="companyName"]').val(),startTime:c,endTime:d}})});var s=null;e.on("tool(tableTest)",function(e){if(event.stopPropagation(),e.data,"operation"===e.event){if(s==e.data.companyId)return o(".ListOperation").fadeOut(),void(s=null);s=e.data.companyId,o(".ListOperation").fadeIn(),o(".ListOperation").css({left:o(this).offset().left-35+"px",top:o(this).offset().top+35+"px"})}}),o(".pushBtnShow").click(function(){Object(m.k)(".pushOrderContent",".pushOrderBox")}),o("#pushMerchants").change(function(e){var t,n;o(this).val()&&(t=this,(n=new FormData).append("file",e.target.files[0]),Object(m.b)(),o.ajax({type:"post",url:"".concat(Vapi,"/order/excelOrder"),processData:!1,contentType:!1,timeout:6e4,headers:{token:sessionStorage.token},data:n,success:function(e){Object(m.a)(),o(t).val(""),200==e.code?(l.msg(e.message,{icon:1}),r.reload({where:{}}),Object(m.j)(".pushOrderContent ",".pushOrderBox")):403==e.code?(l.msg("登录过期,请重新登录",{icon:2}),setTimeout(function(e){window.parent.location.href="login.html"},1500)):(Object(m.j)(".pushOrderContent",".pushOrderBox"),Object(m.k)(".catchContent",".messageBox"),0<e.data.length?function(e){console.log(e);var t="";e.forEach(function(e){t+="<p>".concat(e.replace("null",""),"</p>")}),o(".messageBox .message .import_fail").html(t)}(e.data):o(".messageBox .message .import_fail").html("导入失败"))},error:function(e){o(t).val(""),Object(m.a)(),o(".maskSpan").removeClass("maskIcon"),l.msg("服务器请求超时",{icon:2})}}))}),o(".pullBtnShow").click(function(){var a,e,r,t,n;c&&d?Object(m.l)(c,d)?l.msg("时间选择范围最多三个月",{icon:7}):(o(".mask").fadeIn(),o(".maskSpan").addClass("maskIcon"),a=new XMLHttpRequest,e=o("input[name='orderId']").val(),r=o("input[name='companyName']").val(),t=o("input[name='bicId']").val(),n=o("input[name='orderYard']").val(),n="/order/exportOrder?startTime=".concat(c,"&endTime=").concat(d,"&bicId=").concat(t,"&orderId=").concat(e,"&companyName=").concat(r,"&orderYard=").concat(n),a.open("GET","".concat(Vapi).concat(n),!0),a.setRequestHeader("token",i),a.responseType="blob",a.onload=function(e){var t,n,i;200===a.status?(o(".mask").fadeOut(),o(".maskSpan").removeClass("maskIcon"),a.response.size<50?l.msg("导出失败",{icon:7}):(i=a.response,t="".concat(r,"订单(").concat(c,"-").concat(d,").xlsx"),(n=document.createElement("a")).download=t,n.style.display="none",i=new Blob([i]),n.href=URL.createObjectURL(i),document.body.appendChild(n),n.click(),document.body.removeChild(n))):(o(".mask").fadeOut(),o(".maskSpan").removeClass("maskIcon"),l.msg("服务器请求超时",{icon:2}))},a.send()):l.msg("请选择时间",{icon:7})}),o("body").click(function(){o(".ListOperation").fadeOut(),s=null}),o(".recordBtnShow").click(function(){u?u.reload({where:{type:1}}):u=e.render({elem:"#recordTable",url:"".concat(Vapi,"/excelTask/getExcelTaskList"),method:"GET",headers:{token:i},height:"600",cols:[[{field:"id",width:100,title:"ID",align:"center"},{field:"userName",title:"操作用户",align:"center",templet:function(e){return"".concat(e.name,"(").concat(e.userName,")")}},{field:"createTime",title:"导入开始时间",align:"center"},{field:"updateTime",title:"导入结束时间",align:"center"},{field:"status",width:150,title:"状态",align:"center",templet:function(e){return 0===e.status?"未完成":1===e.status?"已完成":2===e.status?"已失败":"部分数据导入失败"}},{field:"message",title:"消息",align:"center",templet:function(e){return e.excelTaskErrList.map(function(e){return e.message}).join("<br>")}}]],id:"id",page:!0,loading:!0,even:!0,request:{pageName:"pageNum",limitName:"pageSize"},where:{type:1},parseData:function(e){return 200==e.code?{code:e.code,msg:e.message,count:e.data.total,data:e.data.list}:{code:e.code,msg:e.message}},response:{statusCode:200},done:function(e){403==e.code&&(l.msg("登录过期,请重新登录",{icon:2}),setTimeout(function(e){window.parent.location.href="login.html"},1500)),Object(m.c)()}}),o(".recordOrderBox .playHeader span").html("导入订单信息"),Object(m.k)(".recordOrderContent",".recordOrderBox")}),o(".queryBtnClickrecordIns").click(function(){u.reload({where:{type:1}})});var u=null;var p=null,s=null;e.on("tool(recordTable)",function(e){if(event.stopPropagation(),p=e.data,"operation"===e.event){if(s==e.data.id)return o(".ListOperation").fadeOut(),void(s=null);s=e.data.id,o(".ListOperation").fadeIn(),o(".ListOperation").css({left:o(this).offset().left-35+"px",top:o(this).offset().top+35+"px"})}}),o("body").click(function(){o(".ListOperation").fadeOut(),s=null}),o(".ListOperation .Err").click(function(){f?f.reload({where:{taskId:p.id}}):f=e.render({elem:"#useTable",url:"".concat(Vapi,"/excelTask/getExcelTaskErrList"),method:"GET",headers:{token:i},height:"600",cols:[[{field:"id",width:150,title:"ID",align:"center"},{field:"message",title:"失败消息",align:"center"}]],id:"taskId",loading:!0,even:!0,request:{},where:{taskId:p.id},parseData:function(e){return 200==e.code?{code:e.code,msg:e.message,count:e.data.length,data:e.data}:{code:e.code,msg:e.message}},response:{statusCode:200},done:function(e){403==e.code&&(l.msg("登录过期,请重新登录",{icon:2}),setTimeout(function(e){window.parent.location.href="login.html"},1500)),Object(m.c)()}}),o(".useRecordBox .playHeader span").html("任务"+p.id+"导入结果"),Object(m.k)(".useRecordContent",".useRecordBox")});var f=null})},353:function(e,t){}});