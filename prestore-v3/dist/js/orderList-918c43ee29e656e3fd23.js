/*! 版权所有，翻版必究 */!function(c){function e(e){for(var t,n,a=e[0],i=e[1],r=e[2],o=0,l=[];o<a.length;o++)n=a[o],Object.prototype.hasOwnProperty.call(d,n)&&d[n]&&l.push(d[n][0]),d[n]=0;for(t in i)Object.prototype.hasOwnProperty.call(i,t)&&(c[t]=i[t]);for(u&&u(e);l.length;)l.shift()();return p.push.apply(p,r||[]),s()}function s(){for(var e,t=0;t<p.length;t++){for(var n=p[t],a=!0,i=1;i<n.length;i++){var r=n[i];0!==d[r]&&(a=!1)}a&&(p.splice(t--,1),e=o(o.s=n[0]))}return e}var n={},d={5:0},p=[];function o(e){if(n[e])return n[e].exports;var t=n[e]={i:e,l:!1,exports:{}};return c[e].call(t.exports,t,t.exports,o),t.l=!0,t.exports}o.m=c,o.c=n,o.d=function(e,t,n){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(t,e){if(1&e&&(t=o(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var a in t)o.d(n,a,function(e){return t[e]}.bind(null,a));return n},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="";var t=window.webpackJsonp=window.webpackJsonp||[],a=t.push.bind(t);t.push=e,t=t.slice();for(var i=0;i<t.length;i++)e(t[i]);var u=a;p.push([337,0]),s()}({337:function(e,t,n){"use strict";n.r(t);var t=n(352),p=n(1);layui.use(["table","form","layer","tree","util","laydate"],function(){var o=layui.jquery,e=layui.table,l=layui.layer,t=layui.laydate,a=sessionStorage.token,c=Object(p.d)().startTime,s=Object(p.d)().endTime,n=JSON.parse(sessionStorage.roleData),i=permissionsVal1(permissionData,n);(i[6]?removeClass:addClass)(".pushBtnShow"),(i[25]?removeClass:addClass)(".pullBtnShow"),i[7]?removeClass(".list-table"):(addClass(".list-table"),removeClass(".role-text")),t.render({elem:"#test6",range:!0,value:Object(p.d)().keyTimeData,done:function(e){e=e.split(" - ");c=e[0],s=e[1]}});var r=e.render({elem:"#tableTest",url:"".concat(Vapi,"/order/getOrder"),method:"post",contentType:"application/json",headers:{token:a},cols:[[{field:"orderId",width:180,title:"订单编号",align:"center"},{field:"orderYard",width:180,title:"订单码",align:"center"},{field:"flagStr",width:130,title:"扣费状态",align:"center"},{field:"expressMoney",width:130,title:"物流费用",align:"center",templet:function(e){return Object(p.h)(e.expressMoney)}},{field:"qualityMoney",width:130,title:"质检费用",align:"center",templet:function(e){return Object(p.h)(e.qualityMoney)}},{field:"bicId",width:160,title:"商家ID",align:"center"},{field:"companyName",width:160,title:"商家名称",align:"center"},{field:"orderAppointFlag",width:160,title:"订单履约状态",align:"center"},{field:"cancelStr",width:160,title:"是否取消",align:"center"},{field:"interceptStr",width:160,title:"是否拦截",align:"center"},{field:"interceptCause",width:160,title:"拦截原因",align:"center"},{field:"mergeBatch",width:160,title:"合并批次号",align:"center"},{field:"storageNumber",width:160,title:"入库件数",align:"center"},{field:"testingInstitutes",width:160,title:"质检机构",align:"center"},{field:"qualityResult",width:160,title:"质检结果",align:"center"},{field:"recheckResult",width:160,title:"复检结果",align:"center"},{field:"planExpress",width:160,title:"计划发货快递",align:"center"},{field:"realityExpress",width:160,title:"实际发货快递",align:"center"},{field:"expressNumber",width:160,title:"快递单号",align:"center"},{field:"placeReceipt",width:160,title:"收货省份",align:"center"},{field:"orderTime",width:180,title:"下单时间",align:"center"},{field:"storageTime",width:180,title:"入库时间",align:"center"},{field:"inspectTime",width:180,title:"送检时间",align:"center"},{field:"accomplishTime",width:180,title:"质检完成时间",align:"center"},{field:"deliveryTime",width:180,title:"出库时间",align:"center"}]],id:"tableId",page:!0,loading:!0,even:!0,request:{pageName:"pageNum",limitName:"pageSize"},where:{startTime:c,endTime:s},parseData:function(e){return 200==e.code?{code:e.code,msg:e.message,count:e.data.total,data:e.data.list}:{code:e.code,msg:e.message}},response:{statusCode:200},done:function(e){403==e.code&&(l.msg("登录过期,请重新登录",{icon:2}),setTimeout(function(e){window.parent.location.href="login.html"},1500)),Object(p.c)()}});o(".playHeader .close").click(function(){o(this).parent().parent().addClass("margin0"),o(this).parents(".maskContnet").fadeOut()}),o(".queryBtnClick").click(function(){Object(p.k)(c,s)?l.msg("时间选择范围最多三个月",{icon:7}):r.reload({where:{orderId:o('.newKeyContent input[name="orderId"]').val(),orderYard:o('.newKeyContent input[name="orderYard"]').val(),bicId:o('.newKeyContent input[name="bicId"]').val(),companyName:o('.newKeyContent input[name="companyName"]').val(),startTime:c,endTime:s}})});var d=null;e.on("tool(tableTest)",function(e){if(event.stopPropagation(),e.data,"operation"===e.event){if(d==e.data.companyId)return o(".ListOperation").fadeOut(),void(d=null);d=e.data.companyId,o(".ListOperation").fadeIn(),o(".ListOperation").css({left:o(this).offset().left-35+"px",top:o(this).offset().top+35+"px"})}}),o(".pushBtnShow").click(function(){Object(p.j)(".pushOrderContent",".pushOrderBox")}),o("#pushMerchants").change(function(e){var t,n;o(this).val()&&(t=this,(n=new FormData).append("file",e.target.files[0]),Object(p.b)(),o.ajax({type:"post",url:"".concat(Vapi,"/order/excelOrder"),processData:!1,contentType:!1,timeout:6e4,headers:{token:sessionStorage.token},data:n,success:function(e){Object(p.a)(),o(t).val(""),200==e.code?(l.msg(e.message,{icon:1}),r.reload({where:{}}),Object(p.i)(".pushOrderContent ",".pushOrderBox")):403==e.code?(l.msg("登录过期,请重新登录",{icon:2}),setTimeout(function(e){window.parent.location.href="login.html"},1500)):(Object(p.i)(".pushOrderContent",".pushOrderBox"),Object(p.j)(".catchContent",".messageBox"),0<e.data.length?function(e){console.log(e);var t="";e.forEach(function(e){t+="<p>".concat(e.replace("null",""),"</p>")}),o(".messageBox .message .import_fail").html(t)}(e.data):o(".messageBox .message .import_fail").html("导入失败"))},error:function(){o(t).val(""),Object(p.a)(),o(".maskSpan").removeClass("maskIcon"),l.msg("服务器请求超时",{icon:2})}}))}),o(".pullBtnShow").click(function(){var i,e,r,t,n;c&&s?Object(p.k)(c,s)?l.msg("时间选择范围最多三个月",{icon:7}):(o(".mask").fadeIn(),o(".maskSpan").addClass("maskIcon"),i=new XMLHttpRequest,e=o("input[name='orderId']").val(),r=o("input[name='companyName']").val(),t=o("input[name='bicId']").val(),n=o("input[name='orderYard']").val(),n="/order/exportOrder?startDate=".concat(c,"&endDate=").concat(s,"&bicId=").concat(t,"&orderId=").concat(e,"&companyName=").concat(r,"&orderYard=").concat(n),i.open("GET","".concat(Vapi).concat(n),!0),i.setRequestHeader("token",a),i.responseType="blob",i.onload=function(e){var t,n,a;200===i.status?(o(".mask").fadeOut(),o(".maskSpan").removeClass("maskIcon"),i.response.size<50?l.msg("导出失败",{icon:7}):(a=i.response,t="".concat(r,"订单(").concat(c,"-").concat(s,").xls"),(n=document.createElement("a")).download=t,n.style.display="none",a=new Blob([a]),n.href=URL.createObjectURL(a),document.body.appendChild(n),n.click(),document.body.removeChild(n))):(o(".mask").fadeOut(),o(".maskSpan").removeClass("maskIcon"),l.msg("服务器请求超时",{icon:2}))},i.send()):l.msg("请选择时间",{icon:7})}),o("body").click(function(){o(".ListOperation").fadeOut(),d=null})})},352:function(e,t){}});