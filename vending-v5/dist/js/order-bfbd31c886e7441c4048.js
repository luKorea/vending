/*! 版权所有，翻版必究 */!function(e){function n(n){for(var a,s,r=n[0],d=n[1],c=n[2],l=0,p=[];l<r.length;l++)s=r[l],Object.prototype.hasOwnProperty.call(o,s)&&o[s]&&p.push(o[s][0]),o[s]=0;for(a in d)Object.prototype.hasOwnProperty.call(d,a)&&(e[a]=d[a]);for(u&&u(n);p.length;)p.shift()();return i.push.apply(i,c||[]),t()}function t(){for(var e,n=0;n<i.length;n++){for(var t=i[n],a=!0,r=1;r<t.length;r++){var d=t[r];0!==o[d]&&(a=!1)}a&&(i.splice(n--,1),e=s(s.s=t[0]))}return e}var a={},o={26:0},i=[];function s(n){if(a[n])return a[n].exports;var t=a[n]={i:n,l:!1,exports:{}};return e[n].call(t.exports,t,t.exports,s),t.l=!0,t.exports}s.m=e,s.c=a,s.d=function(e,n,t){s.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:t})},s.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,n){if(1&n&&(e=s(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(s.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var a in e)s.d(t,a,function(n){return e[n]}.bind(null,a));return t},s.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return s.d(n,"a",n),n},s.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},s.p="";var r=window.webpackJsonp=window.webpackJsonp||[],d=r.push.bind(r);r.push=n,r=r.slice();for(var c=0;c<r.length;c++)n(r[c]);var u=d;i.push([261,0]),t()}({261:function(e,n,t){"use strict";t.r(n);t(647),t(649);layui.use(["laydate","table","tree","flow","layer","form"],function(){var e=getKeyTime().startTime,n=getKeyTime().endTime,t=layui.laydate;t.render({elem:"#test6",range:!0,value:getKeyTime().keyTimeData,done:function(t){var a=t.split(" - ");e=a[0],n=a[1]}}),$(".sidebar i").click(function(){$(".data-left").hide(),$(".onLeft").show()}),$(".onLeft").click(function(){$(".onLeft").hide(),$(".data-left").show()});var a=sessionStorage.token,o=layui.tree,i=layui.flow,s=layui.layer,r=layui.table,d=layui.form,c=r.render({elem:"#moneyData",url:"".concat(vApi,"/order/getOrderList"),method:"post",contentType:"application/json",headers:{token:a},cols:[[{fixed:"left",field:"info",width:220,title:"售货机名(编号)",align:"center",templet:function(e){return"<div>".concat(e.info,"</div>\n                  <div>(").concat(e.machineNumber,")</div>")}},{field:"number",width:190,title:"订单编号",align:"center",fixed:"left"},{field:"amount",width:130,title:"订单金额",align:"center",templet:function(e){return percentileMoney(e.amount)}},{field:"payStatus",width:130,align:"center",title:"支付状态",templet:function(e){return 1==e.payStatus?"等待支付":2==e.payStatus?"已支付":"未支付"}},{field:"time",width:180,title:"下单时间",align:"center",templet:function(e){return e.time?timeStamp(e.time):"-"}},{field:"bili",width:135,align:"center",title:"支付类型",templet:function(e){return 1==e.payType?"微信":0==e.payType?"支付宝":"工行支付"}},{field:"sign_name",width:135,title:"退款状态",align:"center",templet:function(e){return 1==e.refund?"未退款":2==e.refund?"部分退款":3==e.refund?"全部退款":"-"}},{field:"shipStatus",width:150,title:"出货状态",align:"center",templet:function(e){return e.shipStatus||0==e.shipStatus?setOrderStatus(e.shipStatus):"-"}},{field:"ship_info",width:200,title:"出货详情",align:"center",templet:function(e){if(0==e.ship_info.length)return"-";var n="";return e.ship_info.forEach(function(e,t){n+="<span>".concat(e.goods_Name," (").concat(e.way,"货道 ").concat(setOrderDetailStatus(e.ship_status),") </span>")}),n}},{field:"sales_no",width:160,title:"销售经理",align:"center",templet:function(e){return e.sales_no?e.sales_no:"-"}},{field:"payee",width:160,title:"收款方",align:"center"},{field:"operation",width:110,title:"详情 ",toolbar:"#barDemo",align:"center"}]],page:!0,loading:!0,request:{pageName:"pageNum",limitName:"pageSize"},where:{conditionFive:sessionStorage.machineID,conditionSeven:0,condition:e,conditionTwo:n},parseData:function(e){return 200==e.code?{code:e.code,msg:e.message,count:e.data.total,data:e.data.list}:403!=e.code?{code:e.code,msg:e.message}:void(window.parent.location.href="login.html")},response:{statusCode:200},done:function(e){}}),u=" ",l=sessionStorage.machineID,p=treeList(u);function m(){i.load({elem:"#demo",isAuto:!0,scrollElem:"#demo",end:" ",done:function(e,n){setTimeout(function(){var t=[];n(t.join(""),e<1e4);var a=JSON.stringify({pageNum:e,pageSize:100,merchantId:l});loadingAjax("/machine/getMachineList","post",a,sessionStorage.token).then(function(e){e.data.list.forEach(function(e,n){t.push('<span machineID="'.concat(e.machineId,'">').concat(e.info?e.info:"未命名售货机","</span>"))}),n(t.join(""),e.data.list.length>=100)}).catch(function(e){console.log(e),s.msg(e.message,{icon:7}),n(t.join(""),200==e.code)})},200)}})}u=sessionStorage.marchantName,function(e,n,t){e.render({elem:"#".concat(n),id:"treelist",showLine:!0,onlyIconControl:!0,data:t,spread:!0,text:{defaultNodeName:"无数据",none:"您没有权限，请联系管理员授权!"},click:function(e){console.log(e),u=e.data.title;for(var t=$("#".concat(n," .layui-tree-txt")),a=0;a<t.length;a++)t[a].innerHTML===e.data.title?t[a].style.color="#be954a":t[a].style.color="#555";l!=e.data.id&&(l=e.data.id,$("#demo").remove(),$(document).unbind(),$(".equipment").append('<div class="machineList" id="demo"></div>'),m(),$(".allmachine").addClass("active"),$(".machineList span").removeClass("active"),f="",c.reload({where:{conditionFour:f,conditionFive:l}}))}})}(o,"test1",p),m();var f="";$("body").on("click",".machineList span",function(){$(".allmachine").removeClass("active"),$(this).addClass("active").siblings().removeClass("active"),f=$(this).attr("machineID"),c.reload({where:{conditionFour:f}})}),$(".allmachine").click(function(){$(this).addClass("active"),$(".machineList span").removeClass("active"),f="",c.reload({where:{conditionFour:f}})});t.render({elem:"#test8",type:"month",range:!0,done:function(e){var n=e.split(" - ");n[0],n[1]}}),$(".playHeader .close").click(function(){$(this).parent().parent().addClass("margin0"),$(this).parents(".maskContnet").fadeOut()}),$(".exportCont .cancelBtn").click(function(){popupHide("exportCont","exportBox")}),$(".pushBtn").click(function(){if(e&&n)if(timeFlag(e,n))s.msg("时间选择范围最多三个月",{icon:7});else{var t="售货机订单-".concat(u,"(").concat(e,"至").concat(n,").xls"),a="".concat(vApi,"/exportExcel?startDate=").concat(e,"&endDate=").concat(n,"&merchant_id=").concat(l,"&conditionSix=").concat($('.newKeyContent select[name="keyPayStatus"]').val(),"&shipStatus=").concat($('.newKeyContent select[name="keyShipStatus"]').val(),"&refund=").concat($('.newKeyContent select[name="keyrefundStatus"]').val(),"&conditionThree=").concat($('.key-contnet input[name="orderCode"]').val());exportExcel(a,t)}else s.msg("请选择时间",{icon:7})});var h=null;var g=null;r.on("row(moneyData)",function(e){console.log(e),g=e.data,h||(h=r.render({elem:"#GooodsData",cols:[[{field:"goods_images",title:"图片",templet:"#imgtmp",align:"center"},{field:"good_name_core",title:"商品名(编号)",align:"center"},{field:"count",title:"购买数量",align:"center"},{field:"refund_count",title:"已退款数量",align:"center"},{field:"price",title:"销售价 ",align:"center",templet:function(e){return percentileMoney(e.price)}},{field:"operation",align:"center",title:"操作",toolbar:"#refundDemo"}]],data:[],id:"goodsLIstTable",loading:!0,done:function(e){for(var n in 0,e.data.forEach(function(e){e.goods_Price}),S(),e.data)1==e.data[n].refund&&($(".goodsListBody tr[data-index="+n+'] input[type="checkbox"]').prop("disabled",!0),d.render())}})),2==g.payStatus?loadingAjax("/order/getOrderStatistics","post",JSON.stringify({number:g.number}),"","","",s).then(function(e){$(".paidInSum").html(percentileMoney(e.data.real)),$(".profitsSum").html(percentileMoney(e.data.cost)),$(".refundSum").html(percentileMoney(e.data.refund)),$(".collectionBody").show()}).catch(function(e){$(".collectionBody").hide()}):$(".collectionBody").hide(),$(".detailsOrderCode").html(e.data.number),$(".payTime").html(timeStamp(e.data.time)),$(".orderInformation button span").html(setOrderStatus(e.data.shipStatus));var n=0;e.data.goodsList.forEach(function(e,t){n+=e.count}),$(".payType").html(0==e.data.payType?"支付宝":1==e.data.payType?"微信":"工行支付"),$(".payNUmber").html(n),$(".orderSum").html(percentileMoney(g.amount)),$(".collection button span").html(1==e.data.payStatus?"等待支付":2==e.data.payStatus?"已支付":"未支付"),$(".machineCode").html(e.data.machineNumber),$(".merchantName").html(e.data.merchantName),$(".merchantCode ").html(e.data.alias),popupShow("orderDetails","orderDetailsBox"),h.reload({data:e.data.goodsList})}),$(".queryBtn").click(function(){timeFlag(e,n)?s.msg("时间选择范围最多三个月",{icon:7}):c.reload({where:{condition:e,conditionTwo:n,conditionThree:$('.key-contnet input[name="orderCode"]').val(),conditionSix:$('.newKeyContent select[name="keyPayStatus"]').val(),shipStatus:$('.newKeyContent select[name="keyShipStatus"]').val(),refund:$('.newKeyContent select[name="keyrefundStatus"]').val()}})}),$(".refreshBtn").click(function(){location.reload()}),$("body").bind("keydown",function(e){116==e.keyCode&&f5Fun()});var y=null;r.on("tool(GooodsData)",function(e){2==g.payStatus?(y=e.data,console.log(y),e.data.count!=e.data.refund_count?($(".twoPoles span").html(e.data.count-e.data.refund_count),$(".refundNumber input").val(1),$(".refundNumber input").prop("max",e.data.count-e.data.refund_count),$('.sumInput input[name="sum"]').val(y.price),popupShow("refundNUmCont","refundBox")):s.msg("该商品已全部退款",{icon:7})):s.msg("订单未支付，不能进行退款操作",{icon:7})}),$(".refundNUmCont .chooseCan").click(function(){popupHide("refundNUmCont","refundBox")}),$(".refundNUmCont .determineBtn").click(function(){$(".refundNumber input").val()>0&&$(".refundNumber input").val()<=y.count-y.refund_count?s.confirm("确定退款？",function(e){s.close(e),popupShow("iPasswprd","passwordCont")}):s.msg("请按照提示填写数量",{icon:7})}),$(".iPasswprd .passBtn").click(function(){if($('.passBody input[name="iPassword"]').val()){var e=JSON.stringify({alonePwd:hex_md5($('.iPasswprd input[name="iPassword"]').val())});loadingAjax("/user/verifyAlonePwd","post",e,sessionStorage.token,"mask","iPasswprd","passwordCont",s).then(function(e){if($(".mask").fadeIn(),$(".maskSpan").addClass("maskIcon"),$('.iPasswprd input[name="iPassword"]').val(""),0==g.payType){var n=JSON.stringify({machineId:g.machineId,orderId:g.number,goodId:y.goods_Id,count:Number($(".refundNumber input").val()),amount:Number($('.sumInput input[name="sum"]').val()),pay_id:g.pay_id});loadingAjax("/pay/refund_alipay","post",n,sessionStorage.token,"mask","refundNUmCont","refundBox",s).then(function(e){s.msg(e.message,{icon:1}),popupHide("orderDetails","orderDetailsBox"),c.reload({where:{}})}).catch(function(e){s.msg(e.message,{icon:2})})}else if(1==g.payType){n=JSON.stringify({machineId:g.machineId,orderId:g.number,goodId:y.goods_Id,count:Number($(".refundNumber input").val()),amount:Number($('.sumInput input[name="sum"]').val()),transaction_id:g.transaction_id,total:g.amount,pay_id:g.pay_id});loadingAjax("/pay/refund_wxpay","post",n,sessionStorage.token,"mask","refundNUmCont","refundBox").then(function(e){s.msg(e.message,{icon:1}),popupHide("orderDetails","orderDetailsBox"),c.reload({where:{}})}).catch(function(e){s.msg(e.message,{icon:2})})}else if(3==g.payType){n=JSON.stringify({machineId:g.machineId,orderId:g.number,goodId:y.goods_Id,count:Number($(".refundNumber input").val()),transaction_id:g.transaction_id,amount:Number($('.sumInput input[name="sum"]').val()),pay_id:g.pay_id});loadingAjax("/pay/refund_icbc","post",n,sessionStorage.token,"mask","refundNUmCont","refundBox").then(function(e){s.msg(e.message,{icon:1}),popupHide("orderDetails","orderDetailsBox"),c.reload({where:{}})}).catch(function(e){s.msg(e.message,{icon:2})})}}).catch(function(e){console.log(e),s.msg(e.message,{icon:2})})}else s.msg("请输入独立密码",{icon:7})}),$(".iPasswprd .passCancelBtn").click(function(){popupHide("iPasswprd","passwordCont")}),$(".iPasswprd .passBtn").click(function(){if($('.passBody input[name="iPassword"]').val()){var e=JSON.stringify({alonePwd:hex_md5($('.iPasswprd input[name="iPassword"]').val())});loadingAjax("/user/verifyAlonePwd","post",e,sessionStorage.token,"mask","iPasswprd","passwordCont",s).then(function(e){if($(".mask").fadeIn(),$(".maskSpan").addClass("maskIcon"),$('.iPasswprd input[name="iPassword"]').val(""),0==g.payType){var n=JSON.stringify({machineId:g.machineId,orderId:g.number,goodId:y.goods_Id,count:Number($(".refundNumber input").val()),amount:Number($('.sumInput input[name="sum"]').val()),pay_id:g.pay_id});loadingAjax("/pay/refund_alipay","post",n,sessionStorage.token,"mask","refundNUmCont","refundBox",s).then(function(e){s.msg(e.message,{icon:1}),popupHide("orderDetails","orderDetailsBox"),c.reload({where:{}})}).catch(function(e){s.msg(e.message,{icon:2})})}else if(1==g.payType){n=JSON.stringify({machineId:g.machineId,orderId:g.number,goodId:y.goods_Id,count:Number($(".refundNumber input").val()),amount:Number($('.sumInput input[name="sum"]').val()),transaction_id:g.transaction_id,total:g.amount,pay_id:g.pay_id});loadingAjax("/pay/refund_wxpay","post",n,sessionStorage.token,"mask","refundNUmCont","refundBox").then(function(e){s.msg(e.message,{icon:1}),popupHide("orderDetails","orderDetailsBox"),c.reload({where:{}})}).catch(function(e){s.msg(e.message,{icon:2})})}else if(3==g.payType){n=JSON.stringify({machineId:g.machineId,orderId:g.number,goodId:y.goods_Id,count:Number($(".refundNumber input").val()),transaction_id:g.transaction_id,amount:Number($('.sumInput input[name="sum"]').val()),pay_id:g.pay_id});loadingAjax("/pay/refund_icbc","post",n,sessionStorage.token,"mask","refundNUmCont","refundBox").then(function(e){s.msg(e.message,{icon:1}),popupHide("orderDetails","orderDetailsBox"),c.reload({where:{}})}).catch(function(e){s.msg(e.message,{icon:2})})}}).catch(function(e){console.log(e),s.msg(e.message,{icon:2})})}else s.msg("请输入独立密码",{icon:7})}),$(".iPasswprd .passCancelBtn").click(function(){popupHide("iPasswprd","passwordCont")});var v=1;$(".refundNumber input").keyup(function(){var e=$(this).val();/^\d*$/.test(e)?(v=$(this).val(),console.log(v),$('.sumInput input[name="sum"]').val(Number($(this).val()*y.price))):(s.msg("只能输入正整数",{icon:7}),$(this).val(v),$('.sumInput input[name="sum"]').val(Number($(this).val()*y.price))),$('.sumInput input[name="sum"]').val(Number($(this).val()*y.price))}),$(".refundNumber input").change(function(){$('.sumInput input[name="sum"]').val(Number($(this).val()*y.price))}),$(".orderDetails .refundBtn").click(function(){s.confirm("确定退款？(请检查订单出货情况！)",function(e){s.close(e),$(".mask").fadeIn(),$(".maskSpan").addClass("maskIcon");var n=[];g.goodsList.forEach(function(e){n.push(e.goods_Id)});var t=JSON.stringify({machineId:g.machineId,orderId:g.number,amount:.01,goodId:n,transaction_id:1==g.payType?g.transaction_id:"",total:1==g.payType?Number(g.amount):""}),a="";0==g.payType?a="".concat(vApi,"/pay/refund_alipay"):1==g.payType&&(a="".concat(vApi,"/pay/refund_wxpay")),loadingAjax(a,"post",t,sessionStorage.token,"mask","orderDetails ","orderDetailsBox",s).then(function(e){s.msg(e.message,{icon:1}),c.reload({where:{}})}).catch(function(e){s.msg(e.message,{icon:2})})})});var w=window.parent.permissionsData1(),b=permissionsVal1({420:!1,421:!1},w);function S(){b[420]?$(".pushBtn").removeClass("hide"):$(".pushBtn").addClass("hide"),b[421]?$(".refundBtnTwo").removeClass("hide"):$(".refundBtnTwo").addClass("hide")}S();var k=!0;$(".goodsListBody").on("mouseenter",".pic102",function(e){$("#pic101").attr("src",$(this).attr("src"));var n=new Image;n.onload=function(){$("#pic101").css({width:this.width>=this.height?"350px":"auto",height:this.height>this.width?"450px":"auto"}).fadeIn("fast"),this.onload=null},n.src=$(this).attr("src")}),$(".goodsListBody").on("click",".pic102",function(){event.stopPropagation(),k=!1}),$(".goodsListBody").on("mouseleave",".pic102",function(){k&&$("#pic101").hide()}),$("#pic101").click(function(){event.stopPropagation()}),$("body").click(function(){k=!0,$("#pic101").hide()}),$("#pic101").mouseenter(function(){$("#pic101").show()}),$("#pic101").mouseleave(function(){k&&$("#pic101").hide()}),$(".refreshBtnList").click(function(){s.msg("已刷新",{icon:1}),p=treeList(u)})})},647:function(e,n){},649:function(e,n){}});