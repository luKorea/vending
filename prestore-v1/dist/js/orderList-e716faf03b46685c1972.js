/*! 版权所有，翻版必究 */!function(c){function e(e){for(var t,n,i=e[0],r=e[1],a=e[2],l=0,o=[];l<i.length;l++)n=i[l],Object.prototype.hasOwnProperty.call(s,n)&&s[n]&&o.push(s[n][0]),s[n]=0;for(t in r)Object.prototype.hasOwnProperty.call(r,t)&&(c[t]=r[t]);for(p&&p(e);o.length;)o.shift()();return u.push.apply(u,a||[]),d()}function d(){for(var e,t=0;t<u.length;t++){for(var n=u[t],i=!0,r=1;r<n.length;r++){var a=n[r];0!==s[a]&&(i=!1)}i&&(u.splice(t--,1),e=l(l.s=n[0]))}return e}var n={},s={4:0},u=[];function l(e){if(n[e])return n[e].exports;var t=n[e]={i:e,l:!1,exports:{}};return c[e].call(t.exports,t,t.exports,l),t.l=!0,t.exports}l.m=c,l.c=n,l.d=function(e,t,n){l.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},l.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},l.t=function(t,e){if(1&e&&(t=l(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(l.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)l.d(n,i,function(e){return t[e]}.bind(null,i));return n},l.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return l.d(t,"a",t),t},l.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},l.p="";var t=window.webpackJsonp=window.webpackJsonp||[],i=t.push.bind(t);t.push=e,t=t.slice();for(var r=0;r<t.length;r++)e(t[r]);var p=i;u.push([337,0]),d()}({337:function(e,t,n){"use strict";n.r(t);var t=n(350),d=n(1);layui.use(["table","form","layer","tree","util","laydate"],function(){var i=layui.jquery,e=layui.table,r=layui.layer,r=layui.layer,t=(layui.util,layui.tree,layui.form,layui.laydate),n=sessionStorage.token,a=Object(d.d)().startTime,l=Object(d.d)().endTime;t.render({elem:"#test6",range:!0,value:Object(d.d)().keyTimeData,done:function(e){e=e.split(" - ");a=e[0],l=e[1]}});var o=e.render({elem:"#tableTest",url:"".concat(Vapi,"/order/getOrder"),method:"post",contentType:"application/json",headers:{token:n},cols:[[{field:"orderId",width:180,title:"订单编号",align:"center"},{field:"orderYard",width:180,title:"订单码",align:"center"},{field:"flagStr",width:130,title:"扣费状态",align:"center"},{field:"expressMoney",width:130,title:"物流费用",align:"center",templet:function(e){return Object(d.h)(e.expressMoney)}},{field:"qualityMoney",width:130,title:"质检费用",align:"center",templet:function(e){return Object(d.h)(e.qualityMoney)}},{field:"bicId",width:160,title:"商家ID",align:"center"},{field:"companyName",width:160,title:"商家名称",align:"center"},{field:"orderAppointFlag",width:160,title:"订单履约状态",align:"center"},{field:"cancelStr",width:160,title:"是否取消",align:"center"},{field:"interceptStr",width:160,title:"是否拦截",align:"center"},{field:"interceptCause",width:160,title:"拦截原因",align:"center"},{field:"mergeBatch",width:160,title:"合并批次号",align:"center"},{field:"storageNumber",width:160,title:"入库件数",align:"center"},{field:"testingInstitutes",width:160,title:"质检机构",align:"center"},{field:"qualityResult",width:160,title:"质检结果",align:"center"},{field:"recheckResult",width:160,title:"复检结果",align:"center"},{field:"planExpress",width:160,title:"计划发货快递",align:"center"},{field:"realityExpress",width:160,title:"实际发货快递",align:"center"},{field:"expressNumber",width:160,title:"快递单号",align:"center"},{field:"placeReceipt",width:160,title:"收货省份",align:"center"},{field:"orderTime",width:180,title:"下单时间",align:"center"},{field:"storageTime",width:180,title:"入库时间",align:"center"},{field:"inspectTime",width:180,title:"送检时间",align:"center"},{field:"accomplishTime",width:180,title:"质检完成时间",align:"center"},{field:"deliveryTime",width:180,title:"出库时间",align:"center"}]],id:"tableId",page:!0,loading:!0,even:!0,request:{pageName:"pageNum",limitName:"pageSize"},where:{startTime:a,endTime:l},parseData:function(e){return 200==e.code?{code:e.code,msg:e.message,count:e.data.total,data:e.data.list}:{code:e.code,msg:e.message}},response:{statusCode:200},done:function(e){403==e.code&&(r.msg("登录过期,请重新登录",{icon:2}),setTimeout(function(e){window.parent.location.href="login.html"},1500)),Object(d.c)()}});i(".playHeader .close").click(function(){i(this).parent().parent().addClass("margin0"),i(this).parents(".maskContnet").fadeOut()}),i(".queryBtnClick").click(function(){Object(d.k)(a,l)?r.msg("时间选择范围最多三个月",{icon:7}):o.reload({where:{orderId:i('.newKeyContent input[name="orderId"]').val(),orderYard:i('.newKeyContent input[name="orderYard"]').val(),bicId:i('.newKeyContent input[name="bicId"]').val(),companyName:i('.newKeyContent input[name="companyName"]').val(),startTime:a,endTime:l}})});var c=null;e.on("tool(tableTest)",function(e){if(event.stopPropagation(),e.data,"operation"===e.event){if(c==e.data.companyId)return i(".ListOperation").fadeOut(),void(c=null);c=e.data.companyId,i(".ListOperation").fadeIn(),i(".ListOperation").css({left:i(this).offset().left-35+"px",top:i(this).offset().top+35+"px"})}}),i(".pushBtnShow").click(function(){Object(d.j)(".pushOrderContent",".pushOrderBox")}),i("#pushMerchants").change(function(e){var n,t;i(this).val()&&(n=this,(t=new FormData).append("file",e.target.files[0]),Object(d.b)(),i.ajax({type:"post",url:"".concat(Vapi,"/order/excelOrder"),processData:!1,contentType:!1,timeout:6e4,headers:{token:sessionStorage.token},data:t,success:function(e){var t;Object(d.a)(),i(n).val(""),200==e.code?(r.msg(e.message,{icon:1}),o.reload({where:{}}),Object(d.i)(".pushOrderContent ",".pushOrderBox")):403==e.code?(r.msg("登录过期,请重新登录",{icon:2}),setTimeout(function(e){window.parent.location.href="login.html"},1500)):(Object(d.i)(".pushOrderContent",".pushOrderBox"),Object(d.j)(".catchContent",".messageBox"),0<e.data.length?(e=e.data,t="",e.forEach(function(e){t+="<p>".concat(e.replace("null",""),"</p>")}),i(".messageBox .message .import_fail").html(t)):i(".messageBox .message .import_fail").html("导入失败"))},error:function(){i(n).val(""),Object(d.a)(),i(".maskSpan").removeClass("maskIcon"),r.msg("服务器请求超时",{icon:2})}}))}),i("body").click(function(){i(".ListOperation").fadeOut(),c=null})})},350:function(e,t){}});