/*! 版权所有，翻版必究 */!function(d){function e(e){for(var t,n,a=e[0],o=e[1],i=e[2],s=0,r=[];s<a.length;s++)n=a[s],Object.prototype.hasOwnProperty.call(u,n)&&u[n]&&r.push(u[n][0]),u[n]=0;for(t in o)Object.prototype.hasOwnProperty.call(o,t)&&(d[t]=o[t]);for(p&&p(e);r.length;)r.shift()();return l.push.apply(l,i||[]),c()}function c(){for(var e,t=0;t<l.length;t++){for(var n=l[t],a=!0,o=1;o<n.length;o++){var i=n[o];0!==u[i]&&(a=!1)}a&&(l.splice(t--,1),e=s(s.s=n[0]))}return e}var n={},u={24:0},l=[];function s(e){if(n[e])return n[e].exports;var t=n[e]={i:e,l:!1,exports:{}};return d[e].call(t.exports,t,t.exports,s),t.l=!0,t.exports}s.m=d,s.c=n,s.d=function(e,t,n){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},s.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(t,e){if(1&e&&(t=s(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(s.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var a in t)s.d(n,a,function(e){return t[e]}.bind(null,a));return n},s.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="";var t=window.webpackJsonp=window.webpackJsonp||[],a=t.push.bind(t);t.push=e,t=t.slice();for(var o=0;o<t.length;o++)e(t[o]);var p=a;l.push([144,0]),c()}({144:function(e,t,n){"use strict";n.r(t);t=n(399),t=n(401);layui.use(["laydate","table","tree","flow","layer","form"],function(){var i=getKeyTime().startTime,s=getKeyTime().endTime,e=layui.laydate;e.render({elem:"#test6",range:!0,value:getKeyTime().keyTimeData,done:function(e){e=e.split(" - ");i=e[0],s=e[1]}}),$(".sidebar i").click(function(){$(".data-left").hide(),$(".onLeft").show()}),$(".onLeft").click(function(){$(".onLeft").hide(),$(".data-left").show()});var a,t,n=sessionStorage.token,o=layui.tree,r=layui.flow,d=layui.layer,c=layui.table,u=layui.form,l=c.render({elem:"#moneyData",url:"".concat(vApi,"/order/getOrderList"),method:"post",contentType:"application/json",headers:{token:n},cols:[[{field:"info",width:220,title:"售货机名(编号)",align:"center",templet:function(e){return"<div>".concat(e.info,"</div>\n                  <div>(").concat(e.machineNumber,")</div>")}},{field:"number",width:190,title:"订单编号",align:"center"},{field:"amount",width:130,title:"订单金额",align:"center"},{field:"payStatus",width:130,align:"center",title:"支付状态",templet:function(e){return 1==e.payStatus?"等待支付":2==e.payStatus?"已支付":"未支付"}},{field:"time",width:180,title:"下单时间",align:"center",templet:function(e){return e.time?timeStamp(e.time):"-"}},{field:"bili",width:160,align:"center",title:"支付类型",templet:function(e){return 1==e.payType?"微信":0==e.payType?"支付宝":"工行支付"}},{field:"sign_name",width:210,title:"退款状态",align:"center",templet:function(e){return 1==e.refund?"未退款":2==e.refund?"部分退款":3==e.refund?"全部退款":"-"}},{field:"shipStatus",width:210,title:"出货状态",align:"center",templet:function(e){return 0==e.shipStatus?"未出货":1==e.shipStatus?"部分出货失败":2==e.shipStatus?"全部出货成功":"出货中"}},{field:"ship_info",width:200,title:"出货详情",align:"center",templet:function(e){if(0==e.ship_info.length)return"-";var n="";return e.ship_info.forEach(function(e,t){n+="<div>".concat(e.goods_Name,"(").concat(e.way,"货道").concat(0==e.ship_status?"出货失败":1==e.ship_status?"出货成功":"货道故障",")</div>")}),n}},{field:"sales_no",width:160,title:"销售经理",align:"center",templet:function(e){return e.sales_no||"-"}},{field:"payee",width:160,title:"收款方",align:"center"},{field:"operation",width:110,title:"详情 ",toolbar:"#barDemo",align:"center"}]],page:!0,loading:!0,request:{pageName:"pageNum",limitName:"pageSize"},where:{conditionFive:sessionStorage.machineID,conditionSeven:0,condition:i,conditionTwo:s},parseData:function(e){return 200==e.code?{code:e.code,msg:e.message,count:e.data.total,data:e.data.list}:403!=e.code?{code:e.code,msg:e.message}:void(window.parent.location.href="login.html")},response:{statusCode:200},done:function(){}}),p=" ",m=sessionStorage.machineID,n=treeList(p);function f(){r.load({elem:"#demo",isAuto:!0,scrollElem:"#demo",end:" ",done:function(t,a){setTimeout(function(){var n=[];a(n.join(""),t<1e4);var e=JSON.stringify({pageNum:t,pageSize:100,merchantId:m});loadingAjax("/machine/getMachineList","post",e,sessionStorage.token).then(function(e){e.data.list.forEach(function(e,t){n.push('<span machineID="'.concat(e.machineId,'">').concat(e.info||"未命名售货机","</span>"))}),a(n.join(""),100<=e.data.list.length)}).catch(function(e){console.log(e),d.msg(e.message,{icon:7}),a(n.join(""),200==e.code)})},200)}})}p=sessionStorage.marchantName,a="test1",t=n,o.render({elem:"#".concat(a),id:"treelist",showLine:!0,onlyIconControl:!0,data:t,spread:!0,text:{defaultNodeName:"无数据",none:"您没有权限，请联系管理员授权!"},click:function(e){console.log(e),p=e.data.title;for(var t=$("#".concat(a," .layui-tree-txt")),n=0;n<t.length;n++)t[n].innerHTML===e.data.title?t[n].style.color="#be954a":t[n].style.color="#555";m!=e.data.id&&(m=e.data.id,$("#demo").remove(),$(document).unbind(),$(".equipment").append('<div class="machineList" id="demo"></div>'),f(),$(".allmachine").addClass("active"),$(".machineList span").removeClass("active"),h="",l.reload({where:{conditionFour:h,conditionFive:m}}))}}),f();var h="";$("body").on("click",".machineList span",function(){$(".allmachine").removeClass("active"),$(this).addClass("active").siblings().removeClass("active"),h=$(this).attr("machineID"),l.reload({where:{conditionFour:h}})}),$(".allmachine").click(function(){$(this).addClass("active"),$(".machineList span").removeClass("active"),h="",l.reload({where:{conditionFour:h}})});e.render({elem:"#test8",type:"month",range:!0,done:function(e){e=e.split(" - ");e[0],e[1]}}),$(".playHeader .close").click(function(){$(this).parent().parent().addClass("margin0"),$(this).parents(".maskContnet").fadeOut()}),$(".exportCont .cancelBtn").click(function(){popupHide("exportCont","exportBox")}),$(".pushBtn").click(function(){var o;i&&s?timeFlag(i,s)?d.msg("时间选择范围最多三个月",{icon:7}):($(".mask").fadeIn(),$(".maskSpan").addClass("maskIcon"),(o=new XMLHttpRequest).open("GET","".concat(vApi,"/exportExcel?startDate=").concat(i,"&endDate=").concat(s,"&merchant_id=").concat(m,"&conditionSix=").concat($('.newKeyContent select[name="keyPayStatus"]').val(),"&shipStatus=").concat($('.newKeyContent select[name="keyShipStatus"]').val(),"&refund=").concat($('.newKeyContent select[name="keyrefundStatus"]').val(),"&conditionThree=").concat($('.key-contnet input[name="orderCode"]').val()),!0),o.setRequestHeader("token",sessionStorage.token),o.responseType="blob",o.onload=function(e){var t,n,a;200==o.status?($(".mask").fadeOut(),$(".maskSpan").removeClass("maskIcon"),o.response.size<50?d.msg("导出失败",{icon:7}):(a=o.response,t="".concat(p,"订单(").concat(i,"-").concat(s,").xls"),(n=document.createElement("a")).download=t,n.style.display="none",a=new Blob([a]),n.href=URL.createObjectURL(a),document.body.appendChild(n),n.click(),document.body.removeChild(n))):($(".mask").fadeOut(),$(".maskSpan").removeClass("maskIcon"),d.msg("服务器请求超时",{icon:2}))},o.send()):d.msg("请选择时间",{icon:7})});var g=null;var y=null;c.on("row(moneyData)",function(e){console.log(e),y=e.data,g=g||c.render({elem:"#GooodsData",cols:[[{field:"goods_images",width:120,title:"图片",templet:"#imgtmp",align:"center"},{field:"good_name_core",width:250,title:"商品名(编号)",align:"center"},{field:"count",width:120,title:"购买数量",align:"center"},{field:"refund_count",width:120,title:"已退款数量",align:"center"},{field:"price",width:140,title:"销售价 ",align:"center"},{field:"operation",right:0,width:80,align:"center",title:"操作",toolbar:"#refundDemo",fixed:"right"}]],data:[],id:"goodsLIstTable",loading:!0,done:function(e){for(var t in e.data.forEach(function(e){e.goods_Price}),S(),e.data){1==e.data[t].refund&&($(".goodsListBody tr[data-index="+t+'] input[type="checkbox"]').prop("disabled",!0),u.render())}}}),2==y.payStatus?loadingAjax("/order/getOrderStatistics","post",JSON.stringify({number:y.number}),"","","",d).then(function(e){$(".paidInSum").html(e.data.real),$(".profitsSum").html(e.data.cost),$(".refundSum").html(e.data.refund),$(".collectionBody").show()}).catch(function(e){$(".collectionBody").hide()}):$(".collectionBody").hide(),$(".detailsOrderCode").html(e.data.number),$(".payTime").html(timeStamp(e.data.time)),$(".orderInformation button span").html(0==e.data.shipStatus?"未出货":1==e.data.shipStatus?"部分出货失败":"出货成功");var n=0;e.data.goodsList.forEach(function(e,t){n+=e.count}),$(".payType").html(0==e.data.payType?"支付宝":1==e.data.payType?"微信":"工行支付"),$(".payNUmber").html(n),$(".orderSum").html("￥"+y.amount),$(".collection button span").html(1==e.data.payStatus?"等待支付":2==e.data.payStatus?"支付成功":"未支付"),$(".machineCode").html(e.data.machineId),$(".merchantName").html(e.data.merchantName),$(".merchantCode ").html(e.data.alias),popupShow("orderDetails","orderDetailsBox"),g.reload({data:e.data.goodsList})}),$(".queryBtn").click(function(){timeFlag(i,s)?d.msg("时间选择范围最多三个月",{icon:7}):l.reload({where:{condition:i,conditionTwo:s,conditionThree:$('.key-contnet input[name="orderCode"]').val(),conditionSix:$('.newKeyContent select[name="keyPayStatus"]').val(),shipStatus:$('.newKeyContent select[name="keyShipStatus"]').val(),refund:$('.newKeyContent select[name="keyrefundStatus"]').val()}})}),$(".refreshBtn").click(function(){location.reload()}),$("body").bind("keydown",function(e){116==e.keyCode&&f5Fun()});var v=null;c.on("tool(GooodsData)",function(e){2==y.payStatus?(v=e.data,console.log(v),e.data.count!=e.data.refund_count?($(".twoPoles span").html(e.data.count-e.data.refund_count),$(".refundNumber input").val(1),$(".refundNumber input").prop("max",e.data.count-e.data.refund_count),$('.sumInput input[name="sum"]').val(v.price),popupShow("refundNUmCont","refundBox")):d.msg("该商品已全部退款",{icon:7})):d.msg("订单未支付，不能进行退款操作",{icon:7})}),$(".refundNUmCont .chooseCan").click(function(){popupHide("refundNUmCont","refundBox")}),$(".refundNUmCont .determineBtn").click(function(){0<$(".refundNumber input").val()&&$(".refundNumber input").val()<=v.count-v.refund_count?d.confirm("确定退款？",function(e){d.close(e),popupShow("iPasswprd","passwordCont")}):d.msg("请按照提示填写数量",{icon:7})}),$(".iPasswprd .passBtn").click(function(){var e;$('.passBody input[name="iPassword"]').val()?(e=JSON.stringify({alonePwd:hex_md5($('.iPasswprd input[name="iPassword"]').val())}),loadingAjax("/user/verifyAlonePwd","post",e,sessionStorage.token,"mask","iPasswprd","passwordCont",d).then(function(e){var t;$(".mask").fadeIn(),$(".maskSpan").addClass("maskIcon"),$('.iPasswprd input[name="iPassword"]').val(""),0==y.payType?(t=JSON.stringify({machineId:y.machineId,orderId:y.number,goodId:v.goods_Id,count:Number($(".refundNumber input").val()),amount:Number($('.sumInput input[name="sum"]').val()),pay_id:y.pay_id}),loadingAjax("/pay/refund_alipay","post",t,sessionStorage.token,"mask","refundNUmCont","refundBox",d).then(function(e){d.msg(e.message,{icon:1}),popupHide("orderDetails","orderDetailsBox"),l.reload({where:{}})}).catch(function(e){d.msg(e.message,{icon:2})})):1==y.payType?(t=JSON.stringify({machineId:y.machineId,orderId:y.number,goodId:v.goods_Id,count:Number($(".refundNumber input").val()),amount:Number($('.sumInput input[name="sum"]').val()),transaction_id:y.transaction_id,total:y.amount,pay_id:y.pay_id}),loadingAjax("/pay/refund_wxpay","post",t,sessionStorage.token,"mask","refundNUmCont","refundBox").then(function(e){d.msg(e.message,{icon:1}),popupHide("orderDetails","orderDetailsBox"),l.reload({where:{}})}).catch(function(e){d.msg(e.message,{icon:2})})):3==y.payType&&(t=JSON.stringify({machineId:y.machineId,orderId:y.number,goodId:v.goods_Id,count:Number($(".refundNumber input").val()),transaction_id:y.transaction_id,amount:Number($('.sumInput input[name="sum"]').val()),pay_id:y.pay_id}),loadingAjax("/pay/refund_icbc","post",t,sessionStorage.token,"mask","refundNUmCont","refundBox").then(function(e){d.msg(e.message,{icon:1}),popupHide("orderDetails","orderDetailsBox"),l.reload({where:{}})}).catch(function(e){d.msg(e.message,{icon:2})}))}).catch(function(e){console.log(e),d.msg(e.message,{icon:2})})):d.msg("请输入独立密码",{icon:7})}),$(".iPasswprd .passCancelBtn").click(function(){popupHide("iPasswprd","passwordCont")});var w=1;$(".refundNumber input").keyup(function(){var e=$(this).val();/^\d*$/.test(e)?(w=$(this).val(),console.log(w)):(d.msg("只能输入正整数",{icon:7}),$(this).val(w)),$('.sumInput input[name="sum"]').val(Number($(this).val()*v.price)),$('.sumInput input[name="sum"]').val(Number($(this).val()*v.price))}),$(".refundNumber input").change(function(){$('.sumInput input[name="sum"]').val(Number($(this).val()*v.price))}),$(".orderDetails .refundBtn").click(function(){d.confirm("确定退款？(请检查订单出货情况！)",function(e){d.close(e),$(".mask").fadeIn(),$(".maskSpan").addClass("maskIcon");var t=[];y.goodsList.forEach(function(e){t.push(e.goods_Id)});var n=JSON.stringify({machineId:y.machineId,orderId:y.number,amount:.01,goodId:t,transaction_id:1==y.payType?y.transaction_id:"",total:1==y.payType?Number(y.amount):""}),e="";0==y.payType?e="".concat(vApi,"/pay/refund_alipay"):1==y.payType&&(e="".concat(vApi,"/pay/refund_wxpay")),loadingAjax(e,"post",n,sessionStorage.token,"mask","orderDetails ","orderDetailsBox",d).then(function(e){d.msg(e.message,{icon:1}),l.reload({where:{}})}).catch(function(e){d.msg(e.message,{icon:2})})})});var e=window.parent.permissionsData1(),b=permissionsVal1({420:!1,421:!1},e);function S(){b[420]?$(".pushBtn").removeClass("hide"):$(".pushBtn").addClass("hide"),b[421]?$(".refundBtnTwo").removeClass("hide"):$(".refundBtnTwo").addClass("hide")}S();var k=!0;$(".goodsListBody").on("mouseenter",".pic102",function(e){$("#pic101").attr("src",$(this).attr("src"));var t=new Image;t.onload=function(){$("#pic101").css({width:this.width>=this.height?"350px":"auto",height:this.height>this.width?"450px":"auto"}).fadeIn("fast"),this.onload=null},t.src=$(this).attr("src")}),$(".goodsListBody").on("click",".pic102",function(){event.stopPropagation(),k=!1}),$(".goodsListBody").on("mouseleave",".pic102",function(){k&&$("#pic101").hide()}),$("#pic101").click(function(){event.stopPropagation()}),$("body").click(function(){k=!0,$("#pic101").hide()}),$("#pic101").mouseenter(function(){$("#pic101").show()}),$("#pic101").mouseleave(function(){k&&$("#pic101").hide()})})},399:function(e,t){},401:function(e,t){}});