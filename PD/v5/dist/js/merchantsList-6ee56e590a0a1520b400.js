/*! 版权所有，翻版必究 */!function(l){function e(e){for(var t,n,a=e[0],o=e[1],i=e[2],c=0,s=[];c<a.length;c++)n=a[c],Object.prototype.hasOwnProperty.call(d,n)&&d[n]&&s.push(d[n][0]),d[n]=0;for(t in o)Object.prototype.hasOwnProperty.call(o,t)&&(l[t]=o[t]);for(p&&p(e);s.length;)s.shift()();return m.push.apply(m,i||[]),r()}function r(){for(var e,t=0;t<m.length;t++){for(var n=m[t],a=!0,o=1;o<n.length;o++){var i=n[o];0!==d[i]&&(a=!1)}a&&(m.splice(t--,1),e=c(c.s=n[0]))}return e}var n={},d={5:0},m=[];function c(e){if(n[e])return n[e].exports;var t=n[e]={i:e,l:!1,exports:{}};return l[e].call(t.exports,t,t.exports,c),t.l=!0,t.exports}c.m=l,c.c=n,c.d=function(e,t,n){c.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},c.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},c.t=function(t,e){if(1&e&&(t=c(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(c.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var a in t)c.d(n,a,function(e){return t[e]}.bind(null,a));return n},c.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return c.d(t,"a",t),t},c.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},c.p="";var t=(a=window.webpackJsonp=window.webpackJsonp||[]).push.bind(a);a.push=e;for(var a=a.slice(),o=0;o<a.length;o++)e(a[o]);var p=t;m.push([337,0]),r()}({337:function(e,t,n){"use strict";n.r(t);var t=n(351),O=n(1);layui.use(["table","form","layer","tree","util"],function(){sessionStorage.token||(window.parent.location.href="login.html");var e=JSON.parse(sessionStorage.roleData),t=permissionsVal1(permissionData,e);(t[8]?removeClass:addClass)(".addBtn"),(t[9]?removeClass:addClass)(".ListOperation .edit"),t[10]?removeClass(".list-table"):(addClass(".list-table"),removeClass(".role-text")),(t[11]?removeClass:addClass)(".ListOperation .topUpBtn"),(t[12]?removeClass:addClass)(".ListOperation .reductionsBtn"),(t[13]?removeClass:addClass)(".ListOperation .del"),(t[14]?removeClass:addClass)(".pushBtn"),(t[15]?removeClass:addClass)(".importBtn"),(t[16]?removeClass:addClass)(".ListOperation .use"),(t[17]?removeClass:addClass)(".ListOperation .top"),(t[27]?removeClass:addClass)(".importQuality");var o=layui.jquery,n=layui.table,i=layui.layer,a=layui.form,c=sessionStorage.token,s=n.render({elem:"#tableTest",url:"".concat(Vapi,"/company/getCompany"),method:"post",contentType:"application/json",headers:{token:c},height:"600",cols:[[{field:"bicId",fixed:"left",title:"商家ID",align:"center",templet:"#imgtmp"},{field:"companyName",fixed:"left",width:250,title:"商家名称",align:"center"},{field:"startUsingStr",width:110,title:"是否启用",align:"center"},{field:"balance",width:160,title:"余额",align:"center",templet:function(e){return Object(O.i)(e.balance)}},{field:"freezeMoney",width:150,title:"冻结金额",align:"center",templet:function(e){return Object(O.i)(e.freezeMoney)}},{field:"usableBalance",width:150,title:"可用余额",align:"center",templet:function(e){return Object(O.i)(e.usableBalance)}},{field:"moneyRemind",width:150,title:"余额预警值",align:"center",templet:function(e){return Object(O.i)(e.moneyRemind)}},{field:"remark",title:"备注",align:"center"},{field:"operation",width:150,title:"操作",toolbar:"#barDemo",align:"center"}]],id:"tableId",page:!0,loading:!0,even:!0,request:{pageName:"pageNum",limitName:"pageSize"},where:{},parseData:function(e){return 200===e.code?{code:e.code,msg:e.message,count:e.data.total,data:e.data.list}:{code:e.code,msg:e.message}},response:{statusCode:200},done:function(e){for(var t in 403==e.code&&(i.msg("登录过期,请重新登录",{icon:2}),setTimeout(function(e){window.parent.location.href="login.html"},1500)),e.data)2==e.data[t].flag&&o(".data_list1 tr[data-index="+t+"]").addClass("warning");Object(O.c)()}});o(".playHeader .close").click(function(){o(this).parent().parent().addClass("margin0"),o(this).parents(".maskContnet").fadeOut()}),o(".queryBtnClick").click(function(){s.reload({where:{companyName:o('.addMember input[name="keyMerchants"]').val(),bicId:o('.addMember input[name="keyBIC"]').val()}})});var l=null,r=null;n.on("tool(tableTest)",function(e){if(event.stopPropagation(),l=e.data,console.log(l,"companyData"),"operation"===e.event){if(r==e.data.companyId)return o(".ListOperation").fadeOut(),void(r=null);r=e.data.companyId,o(".ListOperation").fadeIn(),o(".ListOperation").css({left:o(this).offset().left-35+"px",top:o(this).offset().top+35+"px"})}}),o(".addBtn").click(function(){Object(O.k)(".addMerchantsCont",".addMBox")}),o(".addMBox .cancel1").click(function(){Object(O.j)(".addMerchantsCont",".addMBox")}),o(".addMBox .determine1").click(function(){var e;o('.addMBody input[name="companyName"]').val()&&o('.addMBody input[name="bicId"]').val()&&o('.addMBody input[name="moneyRemind"]').val()?(Object(O.b)(),e=JSON.stringify({companyName:o('.addMBody input[name="companyName"]').val(),bicId:o('.addMBody input[name="bicId"]').val(),moneyRemind:Object(O.h)(Number(o('.addMBody input[name="moneyRemind"]').val()),100),startUsing:o('.addMBox input[name="open"]').prop("checked")?2:1,remark:o('.addMBody input[name="remark"]').val(),balance:Object(O.h)(Number(o('.addMBody input[name="balance"]').val()),100)}),Object(O.g)("/company/addCompany","post",sessionStorage.token,e,i,"mask",".addMerchantsCont",".addMBox").then(function(e){i.msg(e.message,{icon:1}),s.reload({where:{}}),o('.addMBody input[name="companyName"]').val(""),o('.addMBody input[name="bicId"]').val(""),o('.addMBody input[name="moneyRemind"]').val(""),o('.addMBody input[name="balance"]').val(""),o('.addMBody input[name="remark"]').val("")}).catch(function(e){i.msg(e.message,{icon:2})})):i.msg("带*为必填",{icon:"7"})}),o(".ListOperation .topUpBtn").click(function(){o('.topUPBox input[name="bicId"]').val(l.bicId),o('.topUPBox input[name="companyName"]').val(l.companyName),o('.topUPBox input[name="balance"]').val(l.balance),Object(O.k)(".topUPContent",".topUPBox")}),o(".topUPBox .determine1").click(function(){o('.topUPBox input[name="topUpNum"]').val()?0<o('.topUPBox input[name="topUpNum"]').val()?i.confirm("确定充值?",function(e){i.close(e),Object(O.b)();e=JSON.stringify({balance:Object(O.h)(Number(o('.topUPBox input[name="topUpNum"]').val()),100),companyId:l.companyId,remark:o('.topUPBox input[name="remark"]').val()});Object(O.g)("/company/addBalance","post",sessionStorage.token,e,i,"mask",".topUPContent",".topUPBox").then(function(e){i.msg(e.message,{icon:1}),s.reload({where:{}}),o('.topUPBox input[name="topUpNum"]').val(""),o('.topUPBox input[name="remark"]').val("")}).catch(function(e){i.msg(e.message,{icon:2})})}):i.msg("充值金额必须大于0",{icon:7}):i.msg("带*为必填",{icon:7})}),o(".topUPBox .cancel1").click(function(){Object(O.j)(".topUPContent",".topUPBox")}),o(".ListOperation .reductionsBtn").click(function(){o('.reductionsBox input[name="bicId"]').val(l.bicId),o('.reductionsBox input[name="companyName"]').val(l.companyName),o('.reductionsBox input[name="balance"]').val(l.balance),Object(O.k)(".reductionsCOntent",".reductionsBox")}),o(".reductionsBox .determine1").click(function(){o('.reductionsBox input[name="reductionsNum"]').val()?0<o('.reductionsBox input[name="reductionsNum"]').val()?i.confirm("确定调减?",function(e){i.close(e),Object(O.b)();e=JSON.stringify({balance:Object(O.h)(Number(o('.reductionsBox input[name="reductionsNum"]').val()),100),companyId:l.companyId,remark:o('.reductionsBox input[name="remark"]').val()});Object(O.g)("/company/subBalance","post",sessionStorage.token,e,i,"mask",".reductionsCOntent",".reductionsBox").then(function(e){i.msg(e.message,{icon:1}),s.reload({where:{}}),o('.reductionsBox input[name="reductionsNum"]').val(""),o('.reductionsBox input[name="remark"]').val("")}).catch(function(e){i.msg(e.message,{icon:2})})}):i.msg("调减金额必须大于0",{icon:7}):i.msg("带*为必填",{icon:7})}),o(".reductionsBox .cancel1").click(function(){Object(O.j)(".reductionsCOntent",".reductionsBox")}),o(".ListOperation .edit").click(function(){o('.editBox input[name="companyName"]').val(l.companyName),o('.editBox input[name="bicId"]').val(l.bicId),o('.editBox input[name="moneyRemind"]').val(l.moneyRemind),o('.editBox input[name="open"]').prop("checked",2==l.startUsing),o('.editBox input[name="remark"]').val(l.remark),a.render("checkbox"),Object(O.k)(".editContent",".editBox")}),o(".editBox .determine1").click(function(){var e;o('.editBox input[name="companyName"]').val()&&o('.editBox input[name="bicId"]').val()&&o('.editBox input[name="moneyRemind"]').val()?(Object(O.b)(),e=JSON.stringify({companyName:o('.editBox input[name="companyName"]').val(),bicId:o('.editBox input[name="bicId"]').val(),moneyRemind:Object(O.h)(Number(o('.editBox input[name="moneyRemind"]').val()),100),companyId:l.companyId,startUsing:o('.editBox input[name="open"]').prop("checked")?2:1,remark:o('.editBox input[name="remark"]').val()}),Object(O.g)("/company/updateCompany","post",sessionStorage.token,e,i,"mask",".editContent",".editBox").then(function(e){i.msg(e.message,{icon:1}),s.reload({where:{}})}).catch(function(e){i.msg(e.message,{icon:2})})):i.msg("带*为必填",{icon:"7"})}),o(".editBox .cancel1").click(function(){Object(O.j)(".editContent",".editBox")}),o("body").click(function(){o(".ListOperation").fadeOut(),o(".ListUseOperation").fadeOut(),o(".ListDateOperation").fadeOut(),r=null}),o(".ListOperation .del").click(function(){i.confirm("确定删除?",function(e){i.close(e),Object(O.b)();e={companyId:l.companyId};Object(O.g)("/company/deleteCompanyId","get",sessionStorage.token,e,i,"mask").then(function(e){i.msg(e.message,{icon:1}),s.reload({where:{}})}).catch(function(e){i.msg(e.message,{icon:2})})})}),o(".ListOperation .top").click(function(){Object(O.k)(".TopUpRecordContent",".topUpRecordBox"),d?d.reload({where:{companyId:l.companyId}}):d=n.render({elem:"#TopUpTable",url:"".concat(Vapi,"/logCompany/getTopUpLog"),method:"post",contentType:"application/json",headers:{token:c},cols:[[{field:"frontBalance",width:160,title:"充值/调减前余额",align:"center",templet:function(e){return Object(O.i)(e.frontBalance)}},{field:"money",width:160,title:"充值/调减金额",align:"center",templet:function(e){return 1==e.flag?"-"+Object(O.i)(e.money):Object(O.i)(e.money)}},{field:"laterBalance",width:160,title:"充值/调减后余额",align:"center",templet:function(e){return Object(O.i)(e.laterBalance)}},{field:"remark",width:160,title:"备注",align:"center"},{field:"logTime",width:180,title:"充值/调减时间",align:"center"}]],id:"tioUpId",page:!0,loading:!0,even:!0,request:{pageName:"pageNum",limitName:"pageSize"},where:{companyId:l.companyId},parseData:function(e){return 200==e.code?{code:e.code,msg:e.message,count:e.data.total,data:e.data.list}:{code:e.code,msg:e.message}},response:{statusCode:200},done:function(e){403==e.code&&(i.msg("登录过期,请重新登录",{icon:2}),setTimeout(function(e){window.parent.location.href="login.html"},1500)),Object(O.c)()}}),o(".topUpRecordBox .playHeader span").html("".concat(l.companyName,"充值/调减记录"))}),o(".ListOperation .use").click(function(){m?m.reload({where:{bicId:l.companyId}}):m=n.render({elem:"#useTable",url:"".concat(Vapi,"/logCompany/orderStatistics"),method:"GET",headers:{token:c},cols:[[{field:"statisticsTime",width:200,title:"使用月份",align:"center",templet:function(e){return e.statisticsTime?Object(O.m)(e.statisticsTime):"-"}},{field:"expressFee",width:150,title:"快递费用",align:"center",templet:function(e){return e.expressFee&&0<e.expressFee?Object(O.i)(e.expressFee):"-"}},{field:"qualityInspectionFee",width:150,title:"质检费用",align:"center",templet:function(e){return e.qualityInspectionFee&&0<e.qualityInspectionFee?Object(O.i)(e.qualityInspectionFee):"-"}},{field:"monthMoney",width:150,title:"使用金额",align:"center",templet:function(e){return e.monthMoney||0==e.monthMoney?Object(O.i)(e.monthMoney):"-"}},{field:"updateTime",width:180,title:"更新时间",align:"center",templet:function(e){return e.updateTime?Object(O.d)(e.updateTime):"-"}},{field:"operationUse",width:120,title:"操作",toolbar:"#barUser",align:"center"}]],id:"useId",page:!0,loading:!0,even:!0,request:{pageName:"pageNum",limitName:"pageSize"},where:{bicId:l.companyId},parseData:function(e){return 200==e.code?{code:e.code,msg:e.message,count:e.data.total,data:e.data.list}:{code:e.code,msg:e.message}},response:{statusCode:200},done:function(e){403==e.code&&(i.msg("登录过期,请重新登录",{icon:2}),setTimeout(function(e){window.parent.location.href="login.html"},1500)),Object(O.c)()}}),o(".useRecordBox .playHeader span").html(l.companyName+"使用记录"),Object(O.k)(".useRecordContent",".useRecordBox")});var d=null;var m=null;var p=null;n.on("tool(useTable)",function(e){console.log("useData---",e,o(this)),event.stopPropagation(),p=e.data,console.log("useData---",p),"operation"===e.event&&(o(".ListUseOperation").fadeIn(),o(".ListUseOperation").css({left:o(this).offset().left-35+"px",top:o(this).offset().top+35+"px"}))}),o(".ListUseOperation .detail").click(function(){g?(console.log(Object(O.m)(p.statisticsTime),l.companyName,l.bicId),g.reload({where:{bicId:l.bicId,time:Object(O.m)(p.statisticsTime)}})):g=n.render({elem:"#dayTable",url:"".concat(Vapi,"/company/findDayOrder"),method:"GET",headers:{token:c},cols:[[{field:"day",width:150,title:"使用时间",align:"center"},{field:"expressFee",width:150,title:"快递费用",align:"center",templet:function(e){return e.expressFee&&0<e.expressFee?Object(O.i)(e.expressFee):"-"}},{field:"qualityInspectionFee",width:150,title:"质检费用",align:"center",templet:function(e){return e.qualityInspectionFee&&0<e.qualityInspectionFee?Object(O.i)(e.qualityInspectionFee):"-"}},{field:"money",width:150,title:"使用金额",align:"center",templet:function(e){return Object(O.i)(e.money)}},{field:"operationDate",width:150,title:"操作",toolbar:"#barDate",align:"center"}]],id:"dayId",loading:!0,even:!0,request:{pageName:"pageNum",limitName:"pageSize"},initSort:{field:"day",type:"desc"},where:{bicId:l.bicId,time:Object(O.m)(p.statisticsTime)},parseData:function(e){return 200==e.code?{code:e.code,msg:e.message,count:e.data.length,data:e.data}:{code:e.code,msg:e.message}},response:{statusCode:200},done:function(e){403==e.code&&(i.msg("登录过期,请重新登录",{icon:2}),setTimeout(function(e){window.parent.location.href="login.html"},1500)),Object(O.c)()}}),o(".dayRecordBox .playHeader span").html("".concat(l.companyName,"(").concat(Object(O.m)(p.statisticsTime),")使用记录")),Object(O.k)(".dayRecordContent",".dayRecordBox")});var u=null;o(".ListUseOperation .quality").click(function(){u?(console.log(Object(O.m)(p.statisticsTime),l.companyName,l.bicId),u.reload({where:{bicId:l.bicId,time:Object(O.m)(p.statisticsTime)}})):u=n.render({elem:"#qualityTable",url:"".concat(Vapi,"/company/findDayOrder"),method:"GET",headers:{token:c},cols:[[{field:"day",title:"使用时间",align:"center"},{field:"qualityInspectionFee",title:"质检费用",align:"center",templet:function(e){return e.qualityInspectionFee&&0<e.qualityInspectionFee?Object(O.i)(e.qualityInspectionFee):"-"}},{field:"money",title:"使用金额",align:"center",templet:function(e){return Object(O.i)(e.money)}}]],id:"dayId",loading:!0,even:!0,request:{pageName:"pageNum",limitName:"pageSize"},initSort:{field:"day",type:"desc"},where:{bicId:l.bicId,time:Object(O.m)(p.statisticsTime)},parseData:function(e){return 200==e.code?{code:e.code,msg:e.message,count:e.data.length,data:e.data}:{code:e.code,msg:e.message}},response:{statusCode:200},done:function(e){403==e.code&&(i.msg("登录过期,请重新登录",{icon:2}),setTimeout(function(e){window.parent.location.href="login.html"},1500)),Object(O.c)()}}),o(".qualityRecordBox .playHeader span").html("".concat(l.companyName,"(").concat(Object(O.m)(p.statisticsTime),")质检费用")),Object(O.k)(".qualityRecordContent",".qualityRecordBox")});var f=null;o(".ListUseOperation .express").click(function(){f?(console.log(Object(O.m)(p.statisticsTime),l.companyName,l.bicId),f.reload({where:{bicId:l.bicId,time:Object(O.m)(p.statisticsTime)}})):f=n.render({elem:"#expressTable",url:"".concat(Vapi,"/company/findDayOrder"),method:"GET",headers:{token:c},cols:[[{field:"day",title:"使用时间",align:"center"},{field:"expressFee",title:"快递费用",align:"center",templet:function(e){return e.expressFee&&0<e.expressFee?Object(O.i)(e.expressFee):"-"}},{field:"money",title:"使用金额",align:"center",templet:function(e){return Object(O.i)(e.money)}}]],id:"dayId",loading:!0,even:!0,request:{pageName:"pageNum",limitName:"pageSize"},initSort:{field:"day",type:"desc"},where:{bicId:l.bicId,time:Object(O.m)(p.statisticsTime)},parseData:function(e){return 200==e.code?{code:e.code,msg:e.message,count:e.data.length,data:e.data}:{code:e.code,msg:e.message}},response:{statusCode:200},done:function(e){403==e.code&&(i.msg("登录过期,请重新登录",{icon:2}),setTimeout(function(e){window.parent.location.href="login.html"},1500)),Object(O.c)()}}),o(".expressRecordBox .playHeader span").html("".concat(l.companyName,"(").concat(Object(O.m)(p.statisticsTime),") 快递费用")),Object(O.k)(".expressRecordContent",".expressRecordBox")});var g=null;var y=null;n.on("tool(dayTable)",function(e){event.stopPropagation(),y=e.data,"operation"===e.event&&(o(".ListDateOperation").fadeIn(),o(".ListDateOperation").css({left:o(this).offset().left-35+"px",top:o(this).offset().top+35+"px"}))}),o(".ListDateOperation .detail").click(function(){});var b=null;o(".ListDateOperation .quality").click(function(){b?b.reload({where:{}}):b=n.render({elem:"#dayqualityTable",url:"".concat(Vapi,"/logCompany/getQualityTestingByDayAndbicName"),method:"post",headers:{token:c},contentType:"application/json",cols:[[{field:"date",width:180,title:"质检日期",align:"center"},{field:"bicName",width:180,title:"商家名称",align:"center"},{field:"certificateType",width:180,title:"证书类型",align:"center"},{field:"unitPriceReceivable",width:180,title:"应收单价",align:"center"},{field:"number",width:180,title:"数量（件）",align:"center"},{field:"totalReceivables",width:180,title:"应收合计",align:"center"},{field:"preferentialAmount",width:180,title:"优惠金额",align:"center"},{field:"amountActuallyReceived",width:180,title:"实收金额",align:"center"},{field:"affiliatedInstitutions",width:180,title:"所属机构",align:"center"}]],id:"id",page:!0,loading:!0,even:!0,request:{pageName:"pageNum",limitName:"pageSize"},where:{date:y.day,bicName:l.companyName},parseData:function(e){return 200==e.code?{code:e.code,msg:e.message,count:e.data.total,data:e.data.list}:{code:e.code,msg:e.message}},response:{statusCode:200},done:function(e){403==e.code&&(i.msg("登录过期,请重新登录",{icon:2}),setTimeout(function(e){window.parent.location.href="login.html"},1500)),Object(O.c)()}}),o(".dayqualityRecordBox .playHeader span").html("".concat(l.companyName,"(").concat(y.day,") 的质检费用")),Object(O.k)(".dayqualityRecordContent",".dayqualityRecordBox")});var h=null;o(".ListDateOperation .express").click(function(){h?h.reload({where:{}}):h=n.render({elem:"#dayexpressTable",url:"".concat(Vapi,"/logCompany/getOrderByDayAndbicId"),method:"post",headers:{token:c},contentType:"application/json",cols:[[{field:"orderId",width:180,title:"订单编号",align:"center"},{field:"planExpress",width:160,title:"计划发货快递",align:"center"},{field:"realityExpress",width:160,title:"实际发货快递",align:"center"},{field:"expressNumber",width:160,title:"快递单号",align:"center"},{field:"placeReceipt",width:160,title:"收货省份",align:"center"}]],id:"orderId",page:!0,loading:!0,even:!0,request:{pageName:"pageNum",limitName:"pageSize"},where:{bicId:l.bicId,orderTime:y.day},parseData:function(e){return 200==e.code?{code:e.code,msg:e.message,count:e.data.total,data:e.data.list}:{code:e.code,msg:e.message}},response:{statusCode:200},done:function(e){403==e.code&&(i.msg("登录过期,请重新登录",{icon:2}),setTimeout(function(e){window.parent.location.href="login.html"},1500)),Object(O.c)()}}),o(".dayexpressRecordBox .playHeader span").html("".concat(l.companyName,"(").concat(y.day,") 的快递费用")),Object(O.k)(".dayexpressRecordContent",".dayexpressRecordBox")});o(".pushBtn").click(function(){Object(O.b)();var a=new XMLHttpRequest,e=o("input[name='keyMerchants']").val(),t=o("input[name='keyBIC']").val();a.open("GET","".concat(Vapi,"/company/deriveExcel?bicId=").concat(t,"&companyName=").concat(e),!0),a.setRequestHeader("token",sessionStorage.token),a.responseType="blob",a.onload=function(e){var t,n;200==a.status?(Object(O.a)(),a.response.size<50?i.msg("导出失败",{icon:7}):(n=a.response,(t=document.createElement("a")).download="商家信息汇总.xlsx",t.style.display="none",n=new Blob([n]),t.href=URL.createObjectURL(n),document.body.appendChild(t),t.click(),document.body.removeChild(t))):(Object(O.a)(),i.msg("服务器请求超时",{icon:2}))},a.send()}),o(".importBtn").click(function(){Object(O.k)(".pushOrderContent",".pushOrderBox")}),o("#pushMerchants").change(function(e){var n,t;o(this).val()&&(n=this,(t=new FormData).append("file",e.target.files[0]),Object(O.b)(),o.ajax({type:"post",url:"".concat(Vapi,"/company/excelCompany"),processData:!1,contentType:!1,timeout:6e4,headers:{token:sessionStorage.token},data:t,success:function(e){var t;Object(O.a)(),o(n).val(""),200==e.code?(i.msg(e.message,{icon:1}),Object(O.j)(".pushOrderContent",".pushOrderBox"),s.reload({where:{}})):403==e.code?(i.msg("登录过期,请重新登录",{icon:2}),setTimeout(function(e){window.parent.location.href="login.html"},1500)):0<e.data.length?(Object(O.j)(".pushOrderContent",".pushOrderBox"),Object(O.k)(".catchContent",".messageBox"),e=e.data,t="",e.forEach(function(e){t+="<p>".concat(e,"</p>")}),o(".messageBox .message .import_fail").html(t)):o(".messageBox .message .import_fail").html("导入失败")},error:function(e){o(n).val(""),Object(O.a)(),o(".maskSpan").removeClass("maskIcon"),i.msg("服务器请求超时",{icon:2})}}))}),o(".importQuality").click(function(){console.log("导入质检费模块"),Object(O.k)(".pushQualityContent",".pushQualityBox")}),o("#pushQualityMerchants").change(function(e){var n,t;o(this).val()&&(n=this,(t=new FormData).append("file",e.target.files[0]),Object(O.b)(),console.log("导入质检费模块2"),o.ajax({type:"post",url:"".concat(Vapi,"/quelityTesting/excelOrder"),processData:!1,contentType:!1,timeout:6e4,headers:{token:sessionStorage.token},data:t,success:function(e){var t;Object(O.a)(),o(n).val(""),200==e.code?(i.msg(e.message,{icon:1}),Object(O.j)(".pushQualityContent",".pushQualityBox"),s.reload({where:{}})):403==e.code?(i.msg("登录过期,请重新登录",{icon:2}),setTimeout(function(e){window.parent.location.href="login.html"},1500)):(console.log(1),0<e.data.length?(Object(O.j)(".pushQualityContent",".pushQualityBox"),Object(O.k)(".catchQualityContent",".messageQualityBox"),e=e.data,t="",e.forEach(function(e){t+="<p>".concat(e,"</p>")}),o(".messageQualityBox .message .import_fail").html(t)):o(".messageQualityBox .message .import_fail").html("导入失败"))},error:function(e){o(n).val(""),Object(O.a)(),o(".maskSpan").removeClass("maskIcon"),i.msg("服务器请求超时",{icon:2})}}))})})},351:function(e,t){}});