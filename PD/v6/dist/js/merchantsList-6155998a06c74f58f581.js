/*! 版权所有，翻版必究 */!function(l){function e(e){for(var t,n,a=e[0],i=e[1],o=e[2],c=0,r=[];c<a.length;c++)n=a[c],Object.prototype.hasOwnProperty.call(d,n)&&d[n]&&r.push(d[n][0]),d[n]=0;for(t in i)Object.prototype.hasOwnProperty.call(i,t)&&(l[t]=i[t]);for(p&&p(e);r.length;)r.shift()();return m.push.apply(m,o||[]),s()}function s(){for(var e,t=0;t<m.length;t++){for(var n=m[t],a=!0,i=1;i<n.length;i++){var o=n[i];0!==d[o]&&(a=!1)}a&&(m.splice(t--,1),e=c(c.s=n[0]))}return e}var n={},d={5:0},m=[];function c(e){if(n[e])return n[e].exports;var t=n[e]={i:e,l:!1,exports:{}};return l[e].call(t.exports,t,t.exports,c),t.l=!0,t.exports}c.m=l,c.c=n,c.d=function(e,t,n){c.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},c.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},c.t=function(t,e){if(1&e&&(t=c(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(c.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var a in t)c.d(n,a,function(e){return t[e]}.bind(null,a));return n},c.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return c.d(t,"a",t),t},c.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},c.p="";var t=(a=window.webpackJsonp=window.webpackJsonp||[]).push.bind(a);a.push=e;for(var a=a.slice(),i=0;i<a.length;i++)e(a[i]);var p=t;m.push([337,0]),s()}({337:function(e,t,n){"use strict";n.r(t);var t=n(351),v=n(0);layui.use(["table","form","layer","tree","util"],function(){sessionStorage.token||(window.parent.location.href="login.html");var e=JSON.parse(sessionStorage.roleData),t=permissionsVal1(permissionData,e);(t[8]?removeClass:addClass)(".addBtn"),(t[9]?removeClass:addClass)(".ListOperation .edit"),t[10]?removeClass(".list-table"):(addClass(".list-table"),removeClass(".role-text")),(t[11]?removeClass:addClass)(".ListOperation .topUpBtn"),(t[12]?removeClass:addClass)(".ListOperation .reductionsBtn"),(t[13]?removeClass:addClass)(".ListOperation .del"),(t[14]?removeClass:addClass)(".pushBtn"),(t[15]?removeClass:addClass)(".importBtn"),(t[16]?removeClass:addClass)(".ListOperation .use"),(t[17]?removeClass:addClass)(".ListOperation .top"),(t[27]?removeClass:addClass)(".importQuality");var i=layui.jquery,n=layui.table,o=layui.layer,a=layui.form,c=sessionStorage.token,r=n.render({elem:"#tableTest",url:"".concat(Vapi,"/company/getCompany"),method:"post",contentType:"application/json",headers:{token:c},height:"600",cols:[[{field:"bicId",fixed:"left",title:"商家ID",align:"center",templet:"#imgtmp",width:180},{field:"companyName",fixed:"left",width:250,title:"商家名称",align:"center"},{field:"startUsingStr",width:110,title:"是否启用",align:"center"},{field:"balance",width:160,title:"余额",align:"center",templet:function(e){return Object(v.i)(e.balance)}},{field:"freezeMoney",width:150,title:"冻结金额",align:"center",templet:function(e){return Object(v.i)(e.freezeMoney)}},{field:"usableBalance",width:150,title:"可用余额",align:"center",templet:function(e){return Object(v.i)(e.usableBalance)}},{field:"moneyRemind",width:150,title:"余额预警值",align:"center",templet:function(e){return Object(v.i)(e.moneyRemind)}},{field:"initialAmount",width:150,title:"初始化余额",align:"center",templet:function(e){return Object(v.i)(e.initialAmount||0)}},{field:"remark",title:"备注",align:"center"},{field:"operation",width:150,title:"操作",toolbar:"#barDemo",align:"center"}]],id:"tableId",page:!0,loading:!0,even:!0,request:{pageName:"pageNum",limitName:"pageSize"},where:{},parseData:function(e){return 200===e.code?{code:e.code,msg:e.message,count:e.data.total,data:e.data.list}:{code:e.code,msg:e.message}},response:{statusCode:200},done:function(e){for(var t in 403==e.code&&(o.msg("登录过期,请重新登录",{icon:2}),setTimeout(function(e){window.parent.location.href="login.html"},1500)),e.data)2==e.data[t].flag&&i(".data_list1 tr[data-index="+t+"]").addClass("warning");Object(v.c)()}});i(".playHeader .close").click(function(){i(this).parent().parent().addClass("margin0"),i(this).parents(".maskContnet").fadeOut()}),i(".queryBtnClick").click(function(){r.reload({where:{companyName:i('.addMember input[name="keyMerchants"]').val(),bicId:i('.addMember input[name="keyBIC"]').val()}})});var l=null,s=null;n.on("tool(tableTest)",function(e){if(event.stopPropagation(),l=e.data,console.log(l,"companyData"),"operation"===e.event){if(s==e.data.companyId)return i(".ListOperation").fadeOut(),void(s=null);s=e.data.companyId,i(".ListOperation").fadeIn(),i(".ListOperation").css({left:i(this).offset().left-35+"px",top:i(this).offset().top+35+"px"})}}),i(".addBtn").click(function(){Object(v.k)(".addMerchantsCont",".addMBox")}),i(".addMBox .cancel1").click(function(){Object(v.j)(".addMerchantsCont",".addMBox")}),i(".addMBox .determine1").click(function(){var e;i('.addMBody input[name="companyName"]').val()&&i('.addMBody input[name="bicId"]').val()&&i('.addMBody input[name="moneyRemind"]').val()?(Object(v.b)(),e=JSON.stringify({companyName:i('.addMBody input[name="companyName"]').val(),bicId:i('.addMBody input[name="bicId"]').val(),moneyRemind:Object(v.h)(Number(i('.addMBody input[name="moneyRemind"]').val()),100),startUsing:i('.addMBox input[name="open"]').prop("checked")?2:1,remark:i('.addMBody input[name="remark"]').val(),balance:Object(v.h)(Number(i('.addMBody input[name="balance"]').val()),100)}),Object(v.g)("/company/addCompany","post",sessionStorage.token,e,o,"mask",".addMerchantsCont",".addMBox").then(function(e){o.msg(e.message,{icon:1}),r.reload({where:{}}),i('.addMBody input[name="companyName"]').val(""),i('.addMBody input[name="bicId"]').val(""),i('.addMBody input[name="moneyRemind"]').val(""),i('.addMBody input[name="balance"]').val(""),i('.addMBody input[name="remark"]').val("")}).catch(function(e){o.msg(e.message,{icon:2})})):o.msg("带*为必填",{icon:"7"})}),i(".ListOperation .topUpBtn").click(function(){i('.topUPBox input[name="bicId"]').val(l.bicId),i('.topUPBox input[name="companyName"]').val(l.companyName),i('.topUPBox input[name="balance"]').val(l.balance),Object(v.k)(".topUPContent",".topUPBox")}),i(".topUPBox .determine1").click(function(){i('.topUPBox input[name="topUpNum"]').val()?0<i('.topUPBox input[name="topUpNum"]').val()?o.confirm("确定充值?",function(e){o.close(e),Object(v.b)();e=JSON.stringify({balance:Object(v.h)(Number(i('.topUPBox input[name="topUpNum"]').val()),100),companyId:l.companyId,remark:i('.topUPBox input[name="remark"]').val()});Object(v.g)("/company/addBalance","post",sessionStorage.token,e,o,"mask",".topUPContent",".topUPBox").then(function(e){o.msg(e.message,{icon:1}),r.reload({where:{}}),i('.topUPBox input[name="topUpNum"]').val(""),i('.topUPBox input[name="remark"]').val("")}).catch(function(e){o.msg(e.message,{icon:2})})}):o.msg("充值金额必须大于0",{icon:7}):o.msg("带*为必填",{icon:7})}),i(".topUPBox .cancel1").click(function(){Object(v.j)(".topUPContent",".topUPBox")}),i(".ListOperation .reductionsBtn").click(function(){i('.reductionsBox input[name="bicId"]').val(l.bicId),i('.reductionsBox input[name="companyName"]').val(l.companyName),i('.reductionsBox input[name="balance"]').val(l.balance),Object(v.k)(".reductionsCOntent",".reductionsBox")}),i(".reductionsBox .determine1").click(function(){i('.reductionsBox input[name="reductionsNum"]').val()?0<i('.reductionsBox input[name="reductionsNum"]').val()?o.confirm("确定调减?",function(e){o.close(e),Object(v.b)();e=JSON.stringify({balance:Object(v.h)(Number(i('.reductionsBox input[name="reductionsNum"]').val()),100),companyId:l.companyId,remark:i('.reductionsBox input[name="remark"]').val()});Object(v.g)("/company/subBalance","post",sessionStorage.token,e,o,"mask",".reductionsCOntent",".reductionsBox").then(function(e){o.msg(e.message,{icon:1}),r.reload({where:{}}),i('.reductionsBox input[name="reductionsNum"]').val(""),i('.reductionsBox input[name="remark"]').val("")}).catch(function(e){o.msg(e.message,{icon:2})})}):o.msg("调减金额必须大于0",{icon:7}):o.msg("带*为必填",{icon:7})}),i(".reductionsBox .cancel1").click(function(){Object(v.j)(".reductionsCOntent",".reductionsBox")}),i(".ListOperation .edit").click(function(){i('.editBox input[name="companyName"]').val(l.companyName),i('.editBox input[name="bicId"]').val(l.bicId),i('.editBox input[name="moneyRemind"]').val(l.moneyRemind),i('.editBox input[name="open"]').prop("checked",2==l.startUsing),i('.editBox input[name="remark"]').val(l.remark),a.render("checkbox"),Object(v.k)(".editContent",".editBox")}),i(".editBox .determine1").click(function(){var e;i('.editBox input[name="companyName"]').val()&&i('.editBox input[name="bicId"]').val()&&i('.editBox input[name="moneyRemind"]').val()?(Object(v.b)(),e=JSON.stringify({companyName:i('.editBox input[name="companyName"]').val(),bicId:i('.editBox input[name="bicId"]').val(),moneyRemind:Object(v.h)(Number(i('.editBox input[name="moneyRemind"]').val()),100),companyId:l.companyId,startUsing:i('.editBox input[name="open"]').prop("checked")?2:1,remark:i('.editBox input[name="remark"]').val()}),Object(v.g)("/company/updateCompany","post",sessionStorage.token,e,o,"mask",".editContent",".editBox").then(function(e){o.msg(e.message,{icon:1}),r.reload({where:{}})}).catch(function(e){o.msg(e.message,{icon:2})})):o.msg("带*为必填",{icon:"7"})}),i(".editBox .cancel1").click(function(){Object(v.j)(".editContent",".editBox")}),i("body").click(function(){i(".ListOperation").fadeOut(),i(".ListUseOperation").fadeOut(),i(".ListDateOperation").fadeOut(),s=null}),i(".ListOperation .del").click(function(){o.confirm("确定删除?",function(e){o.close(e),Object(v.b)();e={companyId:l.companyId};Object(v.g)("/company/deleteCompanyId","get",sessionStorage.token,e,o,"mask").then(function(e){o.msg(e.message,{icon:1}),r.reload({where:{}})}).catch(function(e){o.msg(e.message,{icon:2})})})}),i(".ListOperation .top").click(function(){Object(v.k)(".TopUpRecordContent",".topUpRecordBox"),d?d.reload({where:{companyId:l.companyId}}):d=n.render({elem:"#TopUpTable",url:"".concat(Vapi,"/logCompany/getTopUpLog"),method:"post",contentType:"application/json",headers:{token:c},cols:[[{field:"logTime",width:180,title:"充值/调减时间",align:"center"},{field:"frontBalance",width:160,title:"充值/调减前余额",align:"center",templet:function(e){return Object(v.i)(e.frontBalance)}},{field:"money",width:160,title:"充值/调减金额",align:"center",templet:function(e){return 1==e.flag?"-"+Object(v.i)(e.money):Object(v.i)(e.money)}},{field:"laterBalance",width:160,title:"充值/调减后余额",align:"center",templet:function(e){return Object(v.i)(e.laterBalance)}},{field:"remark",width:160,title:"备注",align:"center"}]],id:"tioUpId",page:!0,loading:!0,even:!0,request:{pageName:"pageNum",limitName:"pageSize"},where:{companyId:l.companyId},parseData:function(e){return 200==e.code?{code:e.code,msg:e.message,count:e.data.total,data:e.data.list}:{code:e.code,msg:e.message}},response:{statusCode:200},done:function(e){403==e.code&&(o.msg("登录过期,请重新登录",{icon:2}),setTimeout(function(e){window.parent.location.href="login.html"},1500)),Object(v.c)()}}),i(".topUpRecordBox .playHeader span").html("".concat(l.companyName,"充值/调减记录"))}),i(".ListOperation .use").click(function(){m?m.reload({where:{bicId:l.companyId}}):m=n.render({elem:"#useTable",url:"".concat(Vapi,"/logCompany/orderStatistics"),method:"GET",headers:{token:c},cols:[[{field:"statisticsTime",width:200,title:"使用月份",align:"center",templet:function(e){return e.statisticsTime?Object(v.m)(e.statisticsTime):"-"}},{field:"expressFee",width:150,title:"快递费用",align:"center",templet:function(e){return e.expressFee&&0<e.expressFee?Object(v.i)(e.expressFee):"-"}},{field:"qualityInspectionFee",width:150,title:"质检费用",align:"center",templet:function(e){return e.qualityInspectionFee&&0<e.qualityInspectionFee?Object(v.i)(e.qualityInspectionFee):"-"}},{field:"monthMoney",width:150,title:"使用金额",align:"center",templet:function(e){return e.monthMoney||0==e.monthMoney?Object(v.i)(e.monthMoney):"-"}},{field:"updateTime",width:180,title:"更新时间",align:"center",templet:function(e){return e.updateTime?Object(v.d)(e.updateTime):"-"}},{field:"operationUse",width:120,title:"详情",toolbar:"#barUser",align:"center"}]],id:"useId",page:!0,loading:!0,even:!0,request:{pageName:"pageNum",limitName:"pageSize"},where:{bicId:l.companyId},parseData:function(e){return 200==e.code?{code:e.code,msg:e.message,count:e.data.total,data:e.data.list}:{code:e.code,msg:e.message}},response:{statusCode:200},done:function(e){403==e.code&&(o.msg("登录过期,请重新登录",{icon:2}),setTimeout(function(e){window.parent.location.href="login.html"},1500)),Object(v.c)()}}),i(".useRecordBox .playHeader span").html(l.companyName+"使用记录"),Object(v.k)(".useRecordContent",".useRecordBox")});var d=null;var m=null;var p=null;n.on("tool(useTable)",function(e){event.stopPropagation(),p=e.data,"operation"===e.event&&i(".ListUseOperation .detail").click()}),i(".ListUseOperation .detail").click(function(){f?(console.log(Object(v.m)(p.statisticsTime),l.companyName,l.bicId),f.reload({where:{bicId:l.bicId,time:Object(v.m)(p.statisticsTime)}})):f=n.render({elem:"#dayTable",url:"".concat(Vapi,"/company/findDayOrder"),method:"GET",headers:{token:c},cols:[[{field:"day",width:150,title:"使用时间",align:"center"},{field:"expressFee",width:150,title:"快递费用",align:"center",templet:function(e){return e.expressFee&&0<e.expressFee?Object(v.i)(e.expressFee):"-"}},{field:"qualityInspectionFee",width:150,title:"质检费用",align:"center",templet:function(e){return e.qualityInspectionFee&&0<e.qualityInspectionFee?Object(v.i)(e.qualityInspectionFee):"-"}},{field:"money",width:150,title:"使用金额",align:"center",templet:function(e){return Object(v.i)(e.money)}},{field:"operationDate",width:150,title:"操作",toolbar:"#barDate",align:"center"}]],id:"dayId",loading:!0,even:!0,request:{pageName:"pageNum",limitName:"pageSize"},initSort:{field:"day",type:"desc"},where:{bicId:l.bicId,time:Object(v.m)(p.statisticsTime)},parseData:function(e){return 200==e.code?{code:e.code,msg:e.message,count:e.data.length,data:e.data}:{code:e.code,msg:e.message}},response:{statusCode:200},done:function(e){403==e.code&&(o.msg("登录过期,请重新登录",{icon:2}),setTimeout(function(e){window.parent.location.href="login.html"},1500)),Object(v.c)()}}),i(".dayRecordBox .playHeader span").html("".concat(l.companyName,"(").concat(Object(v.m)(p.statisticsTime),")使用记录")),Object(v.k)(".dayRecordContent",".dayRecordBox")});var u=null;i(".ListUseOperation .quality").click(function(){u?(console.log(Object(v.m)(p.statisticsTime),l.companyName,l.bicId),u.reload({where:{bicId:l.bicId,time:Object(v.m)(p.statisticsTime)}})):u=n.render({elem:"#qualityTable",url:"".concat(Vapi,"/company/findDayOrder"),method:"GET",headers:{token:c},cols:[[{field:"day",title:"使用时间",align:"center"},{field:"qualityInspectionFee",title:"质检费用",align:"center",templet:function(e){return e.qualityInspectionFee&&0<e.qualityInspectionFee?Object(v.i)(e.qualityInspectionFee):"-"}},{field:"money",title:"使用金额",align:"center",templet:function(e){return Object(v.i)(e.money)}}]],id:"dayId",loading:!0,even:!0,request:{pageName:"pageNum",limitName:"pageSize"},initSort:{field:"day",type:"desc"},where:{bicId:l.bicId,time:Object(v.m)(p.statisticsTime)},parseData:function(e){return 200==e.code?{code:e.code,msg:e.message,count:e.data.length,data:e.data}:{code:e.code,msg:e.message}},response:{statusCode:200},done:function(e){403==e.code&&(o.msg("登录过期,请重新登录",{icon:2}),setTimeout(function(e){window.parent.location.href="login.html"},1500)),Object(v.c)()}}),i(".qualityRecordBox .playHeader span").html("".concat(l.companyName,"(").concat(Object(v.m)(p.statisticsTime),")质检费用")),Object(v.k)(".qualityRecordContent",".qualityRecordBox")});var g=null;i(".ListUseOperation .express").click(function(){g?(console.log(Object(v.m)(p.statisticsTime),l.companyName,l.bicId),g.reload({where:{bicId:l.bicId,time:Object(v.m)(p.statisticsTime)}})):g=n.render({elem:"#expressTable",url:"".concat(Vapi,"/company/findDayOrder"),method:"GET",headers:{token:c},cols:[[{field:"day",title:"使用时间",align:"center"},{field:"expressFee",title:"快递费用",align:"center",templet:function(e){return e.expressFee&&0<e.expressFee?Object(v.i)(e.expressFee):"-"}},{field:"money",title:"使用金额",align:"center",templet:function(e){return Object(v.i)(e.money)}}]],id:"dayId",loading:!0,even:!0,request:{pageName:"pageNum",limitName:"pageSize"},initSort:{field:"day",type:"desc"},where:{bicId:l.bicId,time:Object(v.m)(p.statisticsTime)},parseData:function(e){return 200==e.code?{code:e.code,msg:e.message,count:e.data.length,data:e.data}:{code:e.code,msg:e.message}},response:{statusCode:200},done:function(e){403==e.code&&(o.msg("登录过期,请重新登录",{icon:2}),setTimeout(function(e){window.parent.location.href="login.html"},1500)),Object(v.c)()}}),i(".expressRecordBox .playHeader span").html("".concat(l.companyName,"(").concat(Object(v.m)(p.statisticsTime),") 快递费用")),Object(v.k)(".expressRecordContent",".expressRecordBox")});var f=null;var y=null;n.on("tool(dayTable)",function(e){event.stopPropagation(),y=e.data,"operation"===e.event&&(i(".ListDateOperation").fadeIn(),i(".ListDateOperation").css({left:i(this).offset().left-35+"px",top:i(this).offset().top+35+"px"}))}),i(".ListDateOperation .detail").click(function(){});var h=null;i(".ListDateOperation .quality").click(function(){h?h.reload({where:{date:y.day,bicName:l.companyName}}):h=n.render({elem:"#dayqualityTable",url:"".concat(Vapi,"/logCompany/getQualityTestingByDayAndbicName"),method:"post",headers:{token:c},contentType:"application/json",cols:[[{field:"date",width:180,title:"质检日期",align:"center"},{field:"bicName",width:180,title:"商家名称",align:"center"},{field:"certificateType",width:180,title:"证书类型",align:"center"},{field:"unitPriceReceivable",width:180,title:"应收单价",align:"center"},{field:"number",width:180,title:"数量（件）",align:"center"},{field:"totalReceivables",width:180,title:"应收合计",align:"center"},{field:"preferentialAmount",width:180,title:"优惠金额",align:"center"},{field:"amountActuallyReceived",width:180,title:"实收金额",align:"center"},{field:"affiliatedInstitutions",width:180,title:"所属机构",align:"center"}]],id:"id",page:!0,loading:!0,even:!0,request:{pageName:"pageNum",limitName:"pageSize"},where:{date:y.day,bicName:l.companyName},parseData:function(e){return 200==e.code?{code:e.code,msg:e.message,count:e.data.total,data:e.data.list}:{code:e.code,msg:e.message}},response:{statusCode:200},done:function(e){403==e.code&&(o.msg("登录过期,请重新登录",{icon:2}),setTimeout(function(e){window.parent.location.href="login.html"},1500)),Object(v.c)()}}),console.log(y,"dateData"),i(".dayqualityRecordBox .playHeader span").html("".concat(l.companyName,"(").concat(y.day,") 的质检费用")),Object(v.k)(".dayqualityRecordContent",".dayqualityRecordBox")});var b=null;i(".ListDateOperation .express").click(function(){b?b.reload({where:{bicId:l.bicId,orderTime:y.day}}):b=n.render({elem:"#dayexpressTable",url:"".concat(Vapi,"/logCompany/getOrderByDayAndbicId"),method:"post",headers:{token:c},contentType:"application/json",cols:[[{field:"orderId",width:180,title:"订单编号",align:"center"},{field:"planExpress",width:160,title:"计划发货快递",align:"center"},{field:"realityExpress",width:160,title:"实际发货快递",align:"center"},{field:"expressNumber",width:160,title:"快递单号",align:"center"},{field:"placeReceipt",width:160,title:"收货省份",align:"center"}]],id:"orderId",page:!0,loading:!0,even:!0,request:{pageName:"pageNum",limitName:"pageSize"},where:{bicId:l.bicId,orderTime:y.day},parseData:function(e){return 200==e.code?{code:e.code,msg:e.message,count:e.data.total,data:e.data.list}:{code:e.code,msg:e.message}},response:{statusCode:200},done:function(e){403==e.code&&(o.msg("登录过期,请重新登录",{icon:2}),setTimeout(function(e){window.parent.location.href="login.html"},1500)),Object(v.c)()}}),console.log(y,"dateData"),i(".dayexpressRecordBox .playHeader span").html("".concat(l.companyName,"(").concat(y.day,") 的快递费用")),Object(v.k)(".dayexpressRecordContent",".dayexpressRecordBox")});i(".pushBtn").click(function(){Object(v.b)();var a=new XMLHttpRequest,e=i("input[name='keyMerchants']").val(),t=i("input[name='keyBIC']").val();a.open("GET","".concat(Vapi,"/company/deriveExcel?bicId=").concat(t,"&companyName=").concat(e),!0),a.setRequestHeader("token",sessionStorage.token),a.responseType="blob",a.onload=function(e){var t,n;200==a.status?(Object(v.a)(),a.response.size<50?o.msg("导出失败",{icon:7}):(n=a.response,(t=document.createElement("a")).download="商家信息汇总.xlsx",t.style.display="none",n=new Blob([n]),t.href=URL.createObjectURL(n),document.body.appendChild(t),t.click(),document.body.removeChild(t))):(Object(v.a)(),o.msg("服务器请求超时",{icon:2}))},a.send()}),i(".importBtn").click(function(){Object(v.k)(".pushOrderContent",".pushOrderBox")}),i("#pushMerchants").change(function(e){var n,t;i(this).val()&&(n=this,(t=new FormData).append("file",e.target.files[0]),Object(v.b)(),i.ajax({type:"post",url:"".concat(Vapi,"/company/excelCompany"),processData:!1,contentType:!1,timeout:6e4,headers:{token:sessionStorage.token},data:t,success:function(e){var t;Object(v.a)(),i(n).val(""),200==e.code?(o.msg(e.message,{icon:1}),Object(v.j)(".pushOrderContent",".pushOrderBox"),r.reload({where:{}})):403==e.code?(o.msg("登录过期,请重新登录",{icon:2}),setTimeout(function(e){window.parent.location.href="login.html"},1500)):0<e.data.length?(Object(v.j)(".pushOrderContent",".pushOrderBox"),Object(v.k)(".catchContent",".messageBox"),e=e.data,t="",e.forEach(function(e){t+="<p>".concat(e,"</p>")}),i(".messageBox .message .import_fail").html(t)):i(".messageBox .message .import_fail").html("导入失败")},error:function(e){i(n).val(""),Object(v.a)(),i(".maskSpan").removeClass("maskIcon"),o.msg("服务器请求超时",{icon:2})}}))}),i(".importQuality").click(function(){console.log("导入质检费模块"),Object(v.k)(".pushQualityContent",".pushQualityBox")}),i("#pushQualityMerchants").change(function(e){var n,t;i(this).val()&&(n=this,(t=new FormData).append("file",e.target.files[0]),Object(v.b)(),console.log("导入质检费模块2"),i.ajax({type:"post",url:"".concat(Vapi,"/quelityTesting/excelOrder"),processData:!1,contentType:!1,timeout:6e4,headers:{token:sessionStorage.token},data:t,success:function(e){var t;Object(v.a)(),i(n).val(""),200==e.code?(o.msg(e.message,{icon:1}),Object(v.j)(".pushQualityContent",".pushQualityBox"),r.reload({where:{}})):403==e.code?(o.msg("登录过期,请重新登录",{icon:2}),setTimeout(function(e){window.parent.location.href="login.html"},1500)):(console.log(1),0<e.data.length?(Object(v.j)(".pushQualityContent",".pushQualityBox"),Object(v.k)(".catchQualityContent",".messageQualityBox"),e=e.data,t="",e.forEach(function(e){t+="<p>".concat(e,"</p>")}),i(".messageQualityBox .message .import_fail").html(t)):i(".messageQualityBox .message .import_fail").html("导入失败"))},error:function(e){i(n).val(""),Object(v.a)(),i(".maskSpan").removeClass("maskIcon"),o.msg("服务器请求超时",{icon:2})}}))}),i(".recordBtnShow").click(function(){O?O.reload({where:{type:2}}):O=n.render({elem:"#recordTable",url:"".concat(Vapi,"/excelTask/getExcelTaskList"),method:"GET",headers:{token:c},height:"600",cols:[[{field:"id",width:100,title:"ID",align:"center"},{field:"userName",title:"操作用户",align:"center",templet:function(e){return"".concat(e.name,"(").concat(e.userName,")")}},{field:"createTime",title:"导入开始时间",align:"center"},{field:"updateTime",title:"导入结束时间",align:"center"},{field:"status",width:150,title:"状态",align:"center",templet:function(e){return 0===e.status?"未完成":1===e.status?"已完成":2===e.status?"已失败":"部分数据导入失败"}},{field:"message",title:"消息",align:"center",templet:function(e){return e.excelTaskErrList.map(function(e){return e.message}).join("<br>")}}]],id:"id",page:!0,loading:!0,even:!0,request:{pageName:"pageNum",limitName:"pageSize"},where:{type:2},parseData:function(e){return 200==e.code?{code:e.code,msg:e.message,count:e.data.total,data:e.data.list}:{code:e.code,msg:e.message}},response:{statusCode:200},done:function(e){403==e.code&&(o.msg("登录过期,请重新登录",{icon:2}),setTimeout(function(e){window.parent.location.href="login.html"},1500)),Object(v.c)()}}),i(".recordOrderBox .playHeader span").html("导入质检费信息"),Object(v.k)(".recordOrderContent",".recordOrderBox")});var O=null;i(".record2BtnShow").click(function(){x?x.reload({where:{type:3}}):x=n.render({elem:"#record2Table",url:"".concat(Vapi,"/excelTask/getExcelTaskList"),method:"GET",headers:{token:c},height:"600",cols:[[{field:"id",width:100,title:"ID",align:"center"},{field:"userName",title:"操作用户",align:"center",templet:function(e){return"".concat(e.name,"(").concat(e.userName,")")}},{field:"createTime",title:"导入开始时间",align:"center"},{field:"updateTime",title:"导入结束时间",align:"center"},{field:"status",width:150,title:"状态",align:"center",templet:function(e){return 0===e.status?"未完成":1===e.status?"已完成":2===e.status?"已失败":"部分数据导入失败"}},{field:"message",title:"消息",align:"center",templet:function(e){return e.excelTaskErrList.map(function(e){return e.message}).join("<br>")}}]],id:"id",page:!0,loading:!0,even:!0,request:{pageName:"pageNum",limitName:"pageSize"},where:{type:3},parseData:function(e){return 200==e.code?{code:e.code,msg:e.message,count:e.data.total,data:e.data.list}:{code:e.code,msg:e.message}},response:{statusCode:200},done:function(e){403==e.code&&(o.msg("登录过期,请重新登录",{icon:2}),setTimeout(function(e){window.parent.location.href="login.html"},1500)),Object(v.c)()}}),i(".record2OrderBox .playHeader span").html("导入商家信息"),Object(v.k)(".record2OrderContent",".record2OrderBox")});var x=null})},351:function(e,t){}});