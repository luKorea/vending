/*! 版权所有，翻版必究 */!function(e){function t(t){for(var a,r,s=t[0],c=t[1],d=t[2],l=0,p=[];l<s.length;l++)r=s[l],Object.prototype.hasOwnProperty.call(o,r)&&o[r]&&p.push(o[r][0]),o[r]=0;for(a in c)Object.prototype.hasOwnProperty.call(c,a)&&(e[a]=c[a]);for(u&&u(t);p.length;)p.shift()();return i.push.apply(i,d||[]),n()}function n(){for(var e,t=0;t<i.length;t++){for(var n=i[t],a=!0,s=1;s<n.length;s++){var c=n[s];0!==o[c]&&(a=!1)}a&&(i.splice(t--,1),e=r(r.s=n[0]))}return e}var a={},o={26:0},i=[];function r(t){if(a[t])return a[t].exports;var n=a[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,r),n.l=!0,n.exports}r.m=e,r.c=a,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)r.d(n,a,function(t){return e[t]}.bind(null,a));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="";var s=window.webpackJsonp=window.webpackJsonp||[],c=s.push.bind(s);s.push=t,s=s.slice();for(var d=0;d<s.length;d++)t(s[d]);var u=c;i.push([249,0]),n()}({249:function(e,t,n){"use strict";n.r(t);n(616),n(618);layui.use(["laydate","table","tree","flow","layer","form"],function(){var e=getKeyTime().startTime,t=getKeyTime().endTime,n=layui.laydate;n.render({elem:"#test6",range:!0,value:getKeyTime().keyTimeData,done:function(n){var a=n.split(" - ");e=a[0],t=a[1]}}),$(".sidebar i").click(function(){$(".data-left").hide(),$(".onLeft").show()}),$(".onLeft").click(function(){$(".onLeft").hide(),$(".data-left").show()});var a=sessionStorage.token,o=layui.tree,i=layui.flow,r=layui.layer,s=layui.table,c=layui.form,d=s.render({elem:"#moneyData",url:"".concat(vApi,"/order/getOrderList"),method:"post",contentType:"application/json",headers:{token:a},cols:[[{fixed:"left",field:"info",width:220,title:"售货机名(编号)",align:"center",templet:function(e){return"<div>".concat(e.info,"</div>\n                  <div>(").concat(e.machineNumber,")</div>")}},{field:"number",width:190,title:"订单编号",align:"center",fixed:"left"},{field:"amount",width:130,title:"订单金额",align:"center",templet:function(e){return percentileMoney(e.amount)}},{field:"payStatus",width:130,align:"center",title:"支付状态",templet:function(e){return setPayStatus(e.payStatus)}},{field:"time",width:180,title:"下单时间",align:"center",templet:function(e){return e.time?timeStamp(e.time):"-"}},{field:"bili",width:135,align:"center",title:"支付类型",templet:function(e){return setPayType(e.payType)}},{field:"sign_name",width:135,title:"退款状态",align:"center",templet:function(e){return setRefundStatus(e.refund)}},{field:"shipStatus",width:150,title:"出货状态",align:"center",templet:function(e){return e.shipStatus||0==e.shipStatus?setOrderStatus(e.shipStatus):"-"}},{field:"ship_info",width:200,title:"出货详情",align:"center",templet:function(e){if(0==e.ship_info.length)return"-";var t="";return e.ship_info.forEach(function(e,n){t+="<span>".concat(e.goods_Name," (").concat(e.way,"货道 ").concat(setOrderDetailStatus(e.ship_status),") </span>")}),t}},{field:"sales_no",width:160,title:"销售经理",align:"center",templet:function(e){return e.sales_no?e.sales_no:"-"}},{field:"payee",width:160,title:"收款方",align:"center"},{field:"operation",width:110,title:"详情 ",toolbar:"#barDemo",align:"center"}]],page:!0,loading:!0,request:{pageName:"pageNum",limitName:"pageSize"},where:{conditionFive:sessionStorage.machineID,conditionSeven:0,condition:e,conditionTwo:t},parseData:function(e){return 200==e.code?{code:e.code,msg:e.message,count:e.data.total,data:e.data.list}:403!=e.code?{code:e.code,msg:e.message}:void(window.parent.location.href="login.html")},response:{statusCode:200},done:function(e){}}),u=" ",l=sessionStorage.machineID,p=treeList(u);function m(){i.load({elem:"#demo",isAuto:!0,scrollElem:"#demo",end:" ",done:function(e,t){setTimeout(function(){var n=[];t(n.join(""),e<1e4);var a=JSON.stringify({pageNum:e,pageSize:100,merchantId:l});loadingAjax("/machine/getMachineList","post",a,sessionStorage.token).then(function(e){e.data.list.forEach(function(e,t){n.push('<span machineID="'.concat(e.machineId,'">').concat(e.info?e.info:"未命名售货机","</span>"))}),t(n.join(""),e.data.list.length>=100)}).catch(function(e){console.log(e),r.msg(e.message,{icon:7}),t(n.join(""),200==e.code)})},200)}})}u=sessionStorage.marchantName,function(e,t,n){e.render({elem:"#".concat(t),id:"treelist",showLine:!0,onlyIconControl:!0,data:n,spread:!0,text:{defaultNodeName:"无数据",none:"您没有权限，请联系管理员授权!"},click:function(e){console.log(e),u=e.data.title;for(var n=$("#".concat(t," .layui-tree-txt")),a=0;a<n.length;a++)n[a].innerHTML===e.data.title?n[a].style.color="#be954a":n[a].style.color="#555";l!=e.data.id&&(l=e.data.id,$("#demo").remove(),$(document).unbind(),$(".equipment").append('<div class="machineList" id="demo"></div>'),m(),$(".allmachine").addClass("active"),$(".machineList span").removeClass("active"),f="",d.reload({where:{conditionFour:f,conditionFive:l}}))}})}(o,"test1",p),m();var f="";$("body").on("click",".machineList span",function(){$(".allmachine").removeClass("active"),$(this).addClass("active").siblings().removeClass("active"),f=$(this).attr("machineID"),d.reload({where:{conditionFour:f}})}),$(".allmachine").click(function(){$(this).addClass("active"),$(".machineList span").removeClass("active"),f="",d.reload({where:{conditionFour:f}})});n.render({elem:"#test8",type:"month",range:!0,done:function(e){var t=e.split(" - ");t[0],t[1]}}),$(".playHeader .close").click(function(){$(this).parent().parent().addClass("margin0"),$(this).parents(".maskContnet").fadeOut()}),$(".exportCont .cancelBtn").click(function(){popupHide("exportCont","exportBox")}),$(".pushBtn").click(function(){if(e&&t)if(timeFlag(e,t))r.msg("时间选择范围最多三个月",{icon:7});else{var n="售货机订单-".concat(u,"(").concat(e,"至").concat(t,").xls"),a="".concat(vApi,"/exportExcel?startDate=").concat(e,"&endDate=").concat(t,"&merchant_id=").concat(l,"&conditionSix=").concat($('.newKeyContent select[name="keyPayStatus"]').val(),"&shipStatus=").concat($('.newKeyContent select[name="keyShipStatus"]').val(),"&refund=").concat($('.newKeyContent select[name="keyrefundStatus"]').val(),"&conditionThree=").concat($('.key-contnet input[name="orderCode"]').val());exportExcel(a,n)}else r.msg("请选择时间",{icon:7})});var h=null;var g=null;s.on("row(moneyData)",function(e){console.log(e),g=e.data,h||(h=s.render({elem:"#GooodsData",cols:[[{field:"goods_images",title:"图片",templet:"#imgtmp",align:"center"},{field:"good_name_core",title:"商品名(编号)",align:"center"},{field:"count",title:"购买数量",align:"center"},{field:"refund_count",title:"已退款数量",align:"center"},{field:"price",title:"销售价 ",align:"center",templet:function(e){return percentileMoney(e.price)}},{field:"operation",align:"center",title:"操作",toolbar:"#refundDemo"}]],data:[],id:"goodsLIstTable",loading:!0,done:function(e){for(var t in 0,e.data.forEach(function(e){e.goods_Price}),S(),e.data)1==e.data[t].refund&&($(".goodsListBody tr[data-index="+t+'] input[type="checkbox"]').prop("disabled",!0),c.render())}})),loadingAjax("/order/getOrderStatistics","post",JSON.stringify({number:g.number}),"","","",r).then(function(e){$(".paidInSum").html(percentileMoney(e.data.real)),$(".profitsSum").html(percentileMoney(e.data.cost)),$(".refundSum").html(percentileMoney(e.data.refund)),$(".collectionBody").show()}).catch(function(e){$(".collectionBody").hide()}),$(".detailsOrderCode").html(e.data.number),$(".payTime").html(timeStamp(e.data.time)),$(".orderInformation button span").html(setOrderStatus(e.data.shipStatus));var t=0;e.data.goodsList.forEach(function(e,n){t+=e.count}),$(".payType").html(setPayType(e.data.payType)),$(".payNUmber").html(t),$(".orderSum").html(percentileMoney(g.amount)),$(".collection button span").html(setPayStatus(e.data.payStatus)),$(".machineCode").html(e.data.machineNumber),$(".merchantName").html(e.data.merchantName),$(".merchantCode ").html(e.data.alias),popupShow("orderDetails","orderDetailsBox"),h.reload({data:e.data.goodsList})}),$(".queryBtn").click(function(){timeFlag(e,t)?r.msg("时间选择范围最多三个月",{icon:7}):d.reload({where:{condition:e,conditionTwo:t,conditionThree:$('.key-contnet input[name="orderCode"]').val(),conditionSix:$('.newKeyContent select[name="keyPayStatus"]').val(),shipStatus:$('.newKeyContent select[name="keyShipStatus"]').val(),refund:$('.newKeyContent select[name="keyrefundStatus"]').val()}})}),$(".refreshBtn").click(function(){location.reload()}),$("body").bind("keydown",function(e){116==e.keyCode&&f5Fun()});var y=null;s.on("tool(GooodsData)",function(e){2==g.payStatus?(y=e.data,console.log(y),e.data.count!=e.data.refund_count?($(".twoPoles span").html(e.data.count-e.data.refund_count),$(".refundNumber input").val(1),$(".refundNumber input").prop("max",e.data.count-e.data.refund_count),$('.sumInput input[name="sum"]').val(y.price),popupShow("refundNUmCont","refundBox")):r.msg("该商品已全部退款",{icon:7})):r.msg("订单未支付，不能进行退款操作",{icon:7})}),$(".refundNUmCont .chooseCan").click(function(){popupHide("refundNUmCont","refundBox")}),$(".refundNUmCont .determineBtn").click(function(){$(".refundNumber input").val()>0&&$(".refundNumber input").val()<=y.count-y.refund_count?r.confirm("确定退款？",function(e){r.close(e),popupShow("iPasswprd","passwordCont")}):r.msg("请按照提示填写数量",{icon:7})}),$(".iPasswprd .passBtn").click(function(){if($('.passBody input[name="iPassword"]').val()){var e=JSON.stringify({alonePwd:hex_md5($('.iPasswprd input[name="iPassword"]').val())});loadingAjax("/user/verifyAlonePwd","post",e,sessionStorage.token,"mask","iPasswprd","passwordCont",r).then(function(e){if($(".mask").fadeIn(),$(".maskSpan").addClass("maskIcon"),$('.iPasswprd input[name="iPassword"]').val(""),0==+g.payType){var t=JSON.stringify({machineId:g.machineId,orderId:g.number,goodId:y.goods_Id,count:Number($(".refundNumber input").val()),amount:Number($('.sumInput input[name="sum"]').val()),pay_id:g.pay_id});loadingAjax("/pay/refund_alipay","post",t,sessionStorage.token,"mask","refundNUmCont","refundBox",r).then(function(e){r.msg(e.message,{icon:1}),popupHide("orderDetails","orderDetailsBox"),d.reload({where:{}})}).catch(function(e){r.msg(e.message,{icon:2})})}else if(1==+g.payType){t=JSON.stringify({machineId:g.machineId,orderId:g.number,goodId:y.goods_Id,count:Number($(".refundNumber input").val()),amount:Number($('.sumInput input[name="sum"]').val()),transaction_id:g.transaction_id,total:g.amount,pay_id:g.pay_id});loadingAjax("/pay/refund_wxpay","post",t,sessionStorage.token,"mask","refundNUmCont","refundBox").then(function(e){r.msg(e.message,{icon:1}),popupHide("orderDetails","orderDetailsBox"),d.reload({where:{}})}).catch(function(e){r.msg(e.message,{icon:2})})}else if(3==+g.payType){t=JSON.stringify({machineId:g.machineId,orderId:g.number,goodId:y.goods_Id,count:Number($(".refundNumber input").val()),transaction_id:g.transaction_id,amount:Number($('.sumInput input[name="sum"]').val()),pay_id:g.pay_id});loadingAjax("/pay/refund_icbc","post",t,sessionStorage.token,"mask","refundNUmCont","refundBox").then(function(e){r.msg(e.message,{icon:1}),popupHide("orderDetails","orderDetailsBox"),d.reload({where:{}})}).catch(function(e){r.msg(e.message,{icon:2})})}}).catch(function(e){console.log(e),r.msg(e.message,{icon:2})})}else r.msg("请输入独立密码",{icon:7})}),$(".iPasswprd .passCancelBtn").click(function(){popupHide("iPasswprd","passwordCont")});var v=1;$(".refundNumber input").keyup(function(){var e=$(this).val();/^\d*$/.test(e)?(v=$(this).val(),console.log(v),$('.sumInput input[name="sum"]').val(Number($(this).val()*y.price))):(r.msg("只能输入正整数",{icon:7}),$(this).val(v),$('.sumInput input[name="sum"]').val(Number($(this).val()*y.price))),$('.sumInput input[name="sum"]').val(Number($(this).val()*y.price))}),$(".refundNumber input").change(function(){$('.sumInput input[name="sum"]').val(Number($(this).val()*y.price))}),$(".orderDetails .refundBtn").click(function(){r.confirm("确定退款？(请检查订单出货情况！)",function(e){r.close(e),$(".mask").fadeIn(),$(".maskSpan").addClass("maskIcon");var t=[];g.goodsList.forEach(function(e){t.push(e.goods_Id)});var n=JSON.stringify({machineId:g.machineId,orderId:g.number,amount:.01,goodId:t,transaction_id:1==g.payType?g.transaction_id:"",total:1==g.payType?Number(g.amount):""}),a="";0==g.payType?a="".concat(vApi,"/pay/refund_alipay"):1==g.payType&&(a="".concat(vApi,"/pay/refund_wxpay")),loadingAjax(a,"post",n,sessionStorage.token,"mask","orderDetails ","orderDetailsBox",r).then(function(e){r.msg(e.message,{icon:1}),d.reload({where:{}})}).catch(function(e){r.msg(e.message,{icon:2})})})});var w=window.parent.permissionsData1(),b=permissionsVal1({420:!1,421:!1},w);function S(){b[420]?$(".pushBtn").removeClass("hide"):$(".pushBtn").addClass("hide"),b[421]?$(".refundBtnTwo").removeClass("hide"):$(".refundBtnTwo").addClass("hide")}S();var k=!0;$(".goodsListBody").on("mouseenter",".pic102",function(e){$("#pic101").attr("src",$(this).attr("src"));var t=new Image;t.onload=function(){$("#pic101").css({width:this.width>=this.height?"350px":"auto",height:this.height>this.width?"450px":"auto"}).fadeIn("fast"),this.onload=null},t.src=$(this).attr("src")}),$(".goodsListBody").on("click",".pic102",function(){event.stopPropagation(),k=!1}),$(".goodsListBody").on("mouseleave",".pic102",function(){k&&$("#pic101").hide()}),$("#pic101").click(function(){event.stopPropagation()}),$("body").click(function(){k=!0,$("#pic101").hide()}),$("#pic101").mouseenter(function(){$("#pic101").show()}),$("#pic101").mouseleave(function(){k&&$("#pic101").hide()}),$(".refreshBtnList").click(function(){r.msg("已刷新",{icon:1}),p=treeList(u)})})},616:function(e,t){},618:function(e,t){}});