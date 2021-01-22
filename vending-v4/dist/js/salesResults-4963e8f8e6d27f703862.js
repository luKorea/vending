/*! 版权所有，翻版必究 */!function(l){function e(e){for(var t,n,a=e[0],o=e[1],r=e[2],i=0,s=[];i<a.length;i++)n=a[i],Object.prototype.hasOwnProperty.call(d,n)&&d[n]&&s.push(d[n][0]),d[n]=0;for(t in o)Object.prototype.hasOwnProperty.call(o,t)&&(l[t]=o[t]);for(u&&u(e);s.length;)s.shift()();return m.push.apply(m,r||[]),c()}function c(){for(var e,t=0;t<m.length;t++){for(var n=m[t],a=!0,o=1;o<n.length;o++){var r=n[o];0!==d[r]&&(a=!1)}a&&(m.splice(t--,1),e=i(i.s=n[0]))}return e}var n={},d={33:0},m=[];function i(e){if(n[e])return n[e].exports;var t=n[e]={i:e,l:!1,exports:{}};return l[e].call(t.exports,t,t.exports,i),t.l=!0,t.exports}i.m=l,i.c=n,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},i.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var a in t)i.d(n,a,function(e){return t[e]}.bind(null,a));return n},i.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="";var t=window.webpackJsonp=window.webpackJsonp||[],a=t.push.bind(t);t.push=e,t=t.slice();for(var o=0;o<t.length;o++)e(t[o]);var u=a;m.push([158,0]),c()}({158:function(e,t,n){"use strict";n.r(t);t=n(427);layui.use(["table","form","layer","laydate"],function(){var e=window.parent.permissionsData1(),t=permissionsVal1({460:!1},e);function n(){t[460]?$(".pushBtn").removeClass("hide"):$(".pushBtn").addClass("hide")}n();var a=layui.table,r=(layui.form,layui.layer),e=layui.laydate,i=(sessionStorage.token,getKeyTime().startTime),s=getKeyTime().endTime;e.render({elem:"#test6",range:!0,value:getKeyTime().keyTimeData,done:function(e){e=e.split(" - ");i=e[0],s=e[1]}});var o=a.render({elem:"#salesTable",method:"post",url:"".concat(vApi,"/sales_manager/getSalesAchievement"),contentType:"application/json",headers:{token:sessionStorage.token},cols:[[{field:"sm_no",width:200,title:"销售经理编号",align:"center"},{field:"sm_name",width:230,title:"销售经理姓名",align:"center"},{field:"sm_phone",width:230,title:"销售经理电话",align:"center"},{field:"sm_classify",width:230,title:"销售经理类别",align:"center"},{field:"create_name",width:230,title:"总单数",align:"center",templet:function(e){return 0==e.achievement.length?"-":e.order_total}},{field:"create_name",width:230,title:"总金额(￥)",align:"center",templet:function(e){return 0!=e.achievement.length?e.achievement:"-"}}]],id:"salesId",page:!0,loading:!0,request:{pageName:"pageNum",limitName:"pageSize"},where:{merchantId:Number(sessionStorage.machineID),refund:0,start_time:i,end_time:s},parseData:function(e){return 200==e.code?{code:e.code,msg:e.message,count:e.data.total,data:e.data.list}:403!=e.code?{code:e.code,msg:e.message}:void(window.parent.location.href="login.html")},response:{statusCode:200},done:function(e){403==e.code?window.parent.location.href="login.html":405==e.code&&$(".hangContent").show(),n()}});$(".queryBtn").click(function(){timeFlag(i,s)?r.msg("时间选择范围最多三个月",{icon:7}):o.reload({where:{start_time:i,end_time:s,refund:$('.newKeyItem input[name="open"]').prop("checked")?0:1}})}),$(".refreshBtn").click(function(){location.reload()}),$(".playHeader .close").click(function(){$(this).parent().parent().addClass("margin0"),$(this).parents(".maskContnet").fadeOut()});var l=null;var c;a.on("row(salesTable)",function(e){c=e.data,$(".salesCont .playHeader span").html("".concat(c.sm_name,"(").concat(i,"-").concat(s,")销售业绩")),popupShow("salesCont","salesBox"),l?l.reload({where:{sm_no:c.sm_no,start_time:i,end_time:s}}):(e=c.sm_no,l=a.render({elem:"#managerIn",method:"post",url:"".concat(vApi,"/sales_manager/getSalesManagerOrder"),contentType:"application/json",headers:{token:sessionStorage.token},cols:[[{field:"number",width:200,title:"订单号",align:"center"},{field:"amount",width:180,title:"订单金额(￥)",align:"center"},{field:"refundAmount",width:145,title:"退款金额",align:"center",templet:function(e){return 0==e.refundAmount.length?"-":e.refundAmount[0]}},{field:"sm_phone",width:130,title:"是否邮寄订单",align:"center",templet:function(e){return 1==e.mail?"是":"否"}},{field:"subject",width:180,title:"订单商品",align:"center"},{field:"notes",width:180,title:"出货状态",align:"center",templet:function(e){return e.shipStatus||"-"}},{field:"payType",width:180,title:"支付类型",align:"center",templet:function(e){return 1==e.payType?"微信":"支付宝"}},{field:"payType",width:180,title:"支付状态",align:"center",templet:function(e){return 0==e.payStatus?"未支付":1==e.payStatus?"支付中":"已支付"}},{field:"time",width:230,title:"购买时间",align:"center",templet:function(e){return e.time?timeStamp(e.time):"-"}}]],id:"managerId",page:!0,loading:!0,request:{pageName:"pageNum",limitName:"pageSize"},where:{sm_no:e,start_time:i,end_time:s,machineId:Number(sessionStorage.machineID)},parseData:function(e){return 200==e.code?{code:e.code,msg:e.message,count:e.data.total,data:e.data.list}:403!=e.code?{code:e.code,msg:e.message}:void(window.parent.location.href="login.html")},response:{statusCode:200},done:function(){}}))});var d=timeStamp((new Date).getTime()),m=timeStamp((new Date).getTime());e.render({elem:"#test8",type:"month",range:!0,done:function(e){e=e.split(" - ");d=e[0],m=e[1]}}),$(".pushBtn").click(function(){i&&s?timeFlag(i,s)?r.msg("时间选择范围最多三个月",{icon:7}):r.confirm("确定导出（".concat(i,"至").concat(s,"销售经理业绩）？"),function(e){r.close(e),$(".mask").fadeIn(),$(".maskSpan").addClass("maskIcon");var o=new XMLHttpRequest;o.open("POST","".concat(vApi,"/sales_manager/exportSalesManagerOrder"),!0),o.setRequestHeader("token",sessionStorage.token),o.setRequestHeader("Content-Type","application/json;charset=utf-8"),o.responseType="blob",o.onload=function(e){var t,n,a;200==o.status?($(".mask").fadeOut(),$(".maskSpan").removeClass("maskIcon"),a=o.response,t="".concat(sessionStorage.marchantName,"销售经理业绩(").concat(i,"-").concat(s,").xlsx"),(n=document.createElement("a")).download=t,n.style.display="none",a=new Blob([a]),n.href=URL.createObjectURL(a),document.body.appendChild(n),n.click(),document.body.removeChild(n)):($(".mask").fadeOut(),$(".maskSpan").removeClass("maskIcon"),r.msg("服务器请求超时",{icon:2}))};e=JSON.stringify({start_time:i,end_time:s,merchantId:Number(sessionStorage.machineID),refund:$('.newKeyItem input[name="open"]').prop("checked")?0:1});o.send(e)}):r.msg("请选择时间",{icon:7})}),$(".content-footer .cancelBtn").click(function(){popupHide("exportCont","exportBox")}),$(".exportCont .determinePushBtn").click(function(){var o,e;d&&m?($(".mask").fadeIn(),$(".maskSpan").addClass("maskIcon"),(o=new XMLHttpRequest).open("POST","".concat(vApi,"/sales_manager/exportSalesManagerOrder"),!0),o.setRequestHeader("token",sessionStorage.token),o.setRequestHeader("Content-Type","application/json;charset=utf-8"),o.responseType="blob",o.onload=function(e){var t,n,a;200==o.status?($(".mask").fadeOut(),$(".maskSpan").removeClass("maskIcon"),a=o.response,t="".concat(sessionStorage.marchantName,"销售经理业绩(").concat(d,"-").concat(m,").xlsx"),(n=document.createElement("a")).download=t,n.style.display="none",a=new Blob([a]),n.href=URL.createObjectURL(a),document.body.appendChild(n),n.click(),document.body.removeChild(n)):($(".mask").fadeOut(),$(".maskSpan").removeClass("maskIcon"),r.msg("服务器请求超时",{icon:2}))},e=JSON.stringify({start_time:d,end_time:m,merchantId:Number(sessionStorage.machineID)}),o.send(e)):r.msg("请选择时间",{icon:7})})})},427:function(e,t){}});