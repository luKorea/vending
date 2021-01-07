/*! 版权所有，翻版必究 */!function(s){function e(e){for(var t,n,o=e[0],i=e[1],a=e[2],r=0,l=[];r<o.length;r++)n=o[r],Object.prototype.hasOwnProperty.call(c,n)&&c[n]&&l.push(c[n][0]),c[n]=0;for(t in i)Object.prototype.hasOwnProperty.call(i,t)&&(s[t]=i[t]);for(m&&m(e);l.length;)l.shift()();return u.push.apply(u,a||[]),d()}function d(){for(var e,t=0;t<u.length;t++){for(var n=u[t],o=!0,i=1;i<n.length;i++){var a=n[i];0!==c[a]&&(o=!1)}o&&(u.splice(t--,1),e=r(r.s=n[0]))}return e}var n={},c={16:0},u=[];function r(e){if(n[e])return n[e].exports;var t=n[e]={i:e,l:!1,exports:{}};return s[e].call(t.exports,t,t.exports,r),t.l=!0,t.exports}r.m=s,r.c=n,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)r.d(n,o,function(e){return t[e]}.bind(null,o));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="";var t=window.webpackJsonp=window.webpackJsonp||[],o=t.push.bind(t);t.push=e,t=t.slice();for(var i=0;i<t.length;i++)e(t[i]);var m=o;u.push([153,0]),d()}({153:function(e,t,n){"use strict";n.r(t);t=n(421);layui.use(["table","layer","form","laydate","tree"],function(){var t=layui.table,a=layui.layer,n=layui.form,o=layui.tree,e=layui.laydate,r=getKeyTime().startTime,l=getKeyTime().endTime,i=t.render({elem:"#mailTableOn",url:"".concat(vApi,"/order/getOrderList"),method:"post",contentType:"application/json",headers:{token:token},cols:[[{field:"number",width:210,title:"订单编号",align:"center"},{field:"notes",width:210,title:"下单时间",align:"center",templet:function(e){return timeStamp(e.time)}},{field:"sign_name",width:180,title:"收货人",align:"center"},{field:"sign_phone",width:180,title:"收货人电话",align:"center"},{field:"sign_address",width:300,title:"收货地址",align:"center"},{field:"notes",width:230,title:"备注",align:"center",templet:function(e){return e.notes||"-"}},{field:"payType",width:150,title:"付款类型",align:"center",templet:function(e){return 0==e.payType?"支付宝":"微信"}},{field:"payee",width:210,title:"收款账号",align:"center"},{field:"amount",width:150,title:"订单金额",align:"center"},{field:"sign_name",width:180,title:"退款状态",align:"center",templet:function(e){var t=0,n=0;return e.goodsList.forEach(function(e){t+=e.count,n+=e.refund_count}),0==n?"未退款":t-n==0?"全部退款":"部分退款"}},{field:"sales_no",width:210,title:"销售经理",align:"center",templet:function(e){return e.sales_no||"-"}},{field:"dispatch_status",width:210,title:"快递/物流状态",align:"center",templet:function(e){return 0==e.dispatch_status?"未发货":1==e.dispatch_status?"已发货":"已收货"}},{field:"express_type",width:190,title:"快递/物流公司",align:"center",templet:function(e){return e.express_type||"-"}},{field:"express_number",width:210,title:"快递/物流单号",align:"center",templet:function(e){return e.express_number||"-"}},{field:"express_number",width:210,title:"发货时间",align:"center",templet:function(e){return e.express_time?timeStamp(e.express_time):"-"}},{field:"operation",width:200,title:"操作 ",fixed:"right",right:0,toolbar:"#barDemo",align:"center"}]],page:!0,loading:!0,request:{pageName:"pageNum",limitName:"pageSize"},where:{conditionFive:sessionStorage.machineID,conditionSeven:1,condition:r,conditionTwo:l},parseData:function(e){return 200==e.code?{code:e.code,msg:e.message,count:e.data.total,data:e.data.list}:403!=e.code?{code:e.code,msg:e.message}:void(window.parent.location.href="login.html")},response:{statusCode:200},done:function(){}}),s='<option value="">全部</option>';CourierList.forEach(function(e){s+='<option value="'.concat(e,'">').concat(e,"</option>")}),$("#deliverySele").html(s),$("#editSele").html(s),n.render("select"),$(".playHeader .close").click(function(){$(this).parent().parent().addClass("margin0"),$(this).parents(".maskContnet").fadeOut()});var d=null;t.on("tool(mailTableOn)",function(e){console.log(e),d=e.data,"delivery"==e.event?popupShow("deliveryCont","deliveryBox"):"edit"==e.event?($('.editCont select[name="company"]').val(d.express_type),$('.editCont input[name="logisticsNumber"]').val(d.express_number),$("#test7").val(d.express_time),popupShow("editCont","editBox")):"goods"==e.event&&(e=e.data.goodsList,t.render({elem:"#GooodsData",cols:[[{field:"goods_images",width:80,title:"图片",templet:"#imgtmp",align:"center"},{field:"goods_Name",width:140,title:"商品名",align:"center",templet:function(e){return 1==e.mail?"(邮寄)"+e.goods_Name:e.goods_Name}},{field:"goods_Core",width:140,title:"商品编号",align:"center"},{field:"count",width:120,title:"购买数量",align:"center"},{field:"refund_count",width:120,title:"已退款数量",align:"center"},{field:"price",width:130,title:"销售价 ",align:"center"},{field:"goods_Cost",width:130,title:"成本价 ",align:"center"},{field:"operation",right:0,width:80,align:"center",title:"操作",toolbar:"#refundDemo",fixed:"right"}]],data:e,id:"goodsLIstTable",loading:!0,done:function(){h()}}),popupShow("goodsCont","goodsBox")),n.render("select")}),$(".deliveryCont .cancelBtn").click(function(){popupHide("deliveryCont","deliveryBox")}),$(".deliveryCont .determinePushBtn").click(function(){var e;$('.deliveryBody select[name="company"]').val()&&$('.deliveryBody input[name="logisticsNumber"]').val()?($(".mask").fadeIn(),$(".maskSpan").addClass("maskIcon"),e=JSON.stringify({number:d.number,express_type:$('.deliveryBody select[name="company"]').val(),express_number:$('.deliveryBody input[name="logisticsNumber"]').val(),express_time:$("#test5").val()?$("#test5").val():timeStamp((new Date).getTime())}),loadingAjax("/order/updateMailMsg","post",e,sessionStorage.token,"mask","deliveryCont","deliveryBox",a).then(function(e){a.msg(e.message,{icon:1}),i.reload({where:{}}),$('.deliveryBody select[name="company"]').val(""),$('.deliveryBody input[name="logisticsNumber"]').val("")}).catch(function(e){a.msg(e.message,{icon:2})})):a.msg("带*为必填",{icon:7})}),$(".editCont .cancelBtn").click(function(){popupHide("editCont","editBox")}),$(".editCont .determinePushBtn").click(function(){var e;$('.editCont select[name="company"]').val()&&$('.editCont input[name="logisticsNumber"]').val()?($(".mask").fadeIn(),$(".maskSpan").addClass("maskIcon"),e=JSON.stringify({number:d.number,express_type:$('.editCont select[name="company"]').val(),express_number:$('.editCont input[name="logisticsNumber"]').val(),express_time:$("#test7").val()?$("#test7").val():timeStamp((new Date).getTime())}),loadingAjax("/order/updateOrder","post",e,sessionStorage.token,"mask","editCont","deliveryBox",a).then(function(e){a.msg(e.message,{icon:1}),i.reload({where:{}})}).catch(function(e){a.msg(res.message,{icon:1})})):a.msg("带*为必填",{icon:7})});e.render({elem:"#test8",type:"month",range:!0,done:function(e){e=e.split(" - ");e[0],e[1]}}),$(".exportCont .cancelBtn").click(function(){popupHide("exportCont","exportBox")});var c=null,u=null;$(".pushBtn").click(function(){var i;r&&l?timeFlag(r,l)?a.msg("时间选择范围最多三个月",{icon:7}):($(".mask").fadeIn(),$(".maskSpan").addClass("maskIcon"),(i=new XMLHttpRequest).open("GET","".concat(vApi,"/exportMailExcel?startDate=").concat(r,"&endDate=").concat(l,"&merchant_id=").concat(c),!0),i.setRequestHeader("token",sessionStorage.token),i.responseType="blob",i.onload=function(e){var t,n,o;console.log(i),200==i.status?($(".mask").fadeOut(),$(".maskSpan").removeClass("maskIcon"),o=i.response,t="".concat(u,"邮寄订单(").concat(r,"-").concat(l,").xlsx"),(n=document.createElement("a")).download=t,n.style.display="none",o=new Blob([o]),n.href=URL.createObjectURL(o),document.body.appendChild(n),n.click(),document.body.removeChild(n)):($(".mask").fadeOut(),$(".maskSpan").removeClass("maskIcon"),a.msg("服务器请求超时",{icon:2}))},i.send()):a.msg("请选择时间",{icon:7})}),(e=layui.laydate).render({elem:"#test6",range:!0,value:getKeyTime().keyTimeData,done:function(e){e=e.split(" - ");r=e[0],l=e[1]}}),$(".queryBtn").click(function(){timeFlag(r,l)?a.msg("时间选择范围最多三个月",{icon:7}):i.reload({where:{condition:r,conditionTwo:l,conditionThree:$('.key-contnet input[name="orderCode"]').val()}})}),$(".refreshBtn").click(function(){location.reload()});var m=null;t.on("tool(GooodsData)",function(e){2==d.payStatus?(m=e.data,console.log(m),e.data.count!=e.data.refund_count?($(".twoPoles span").html(e.data.count-e.data.refund_count),$(".refundNumber input").val(1),$(".refundNumber input").prop("max",e.data.count-e.data.refund_count),$('.sumInput input[name="sum"]').val(m.price),popupShow("refundNUmCont","refundBox")):a.msg("该商品已全部退款",{icon:7})):a.msg("订单未支付，不能进行退款操作",{icon:7})}),$(".refundNUmCont .chooseCan").click(function(){popupHide("refundNUmCont","refundBox")});var p=1;$(".refundNumber input").keyup(function(){var e=$(this).val();/^\d*$/.test(e)?(p=$(this).val(),console.log(p)):(a.msg("只能输入正整数",{icon:7}),$(this).val(p)),$('.sumInput input[name="sum"]').val(Number($(this).val()*m.price)),$('.sumInput input[name="sum"]').val(Number($(this).val()*m.price))}),$(".refundNumber input").change(function(){$('.sumInput input[name="sum"]').val(Number($(this).val()*m.price))}),$(".refundNUmCont .determineBtn").click(function(){console.log($(".refundNumber input").val()),0<$(".refundNumber input").val()&&$(".refundNumber input").val()<=m.count-m.refund_count?a.confirm("确定退款？",function(e){var t;a.close(e),$(".mask").fadeIn(),$(".maskSpan").addClass("maskIcon"),console.log(d),0==d.payType?(t=JSON.stringify({machineId:d.machineId,orderId:d.number,goodId:m.goods_Id,count:Number($(".refundNumber input").val()),amount:Number($('.sumInput input[name="sum"]').val()),pay_id:d.pay_id}),loadingAjax("/pay/refund_alipay","post",t,sessionStorage.token,"mask","refundNUmCont","refundBox",a).then(function(e){a.msg(e.message,{icon:1}),i.reload({where:{}}),popupHide("goodsCont ","goodsBox ")}).catch(function(e){a.msg(e.message,{icon:2})})):1==d.payType&&(t=JSON.stringify({machineId:d.machineId,orderId:d.number,goodId:m.goods_Id,count:Number($(".refundNumber input").val()),amount:Number($('.sumInput input[name="sum"]').val()),pay_id:d.pay_id,transaction_id:d.transaction_id,total:d.amount}),loadingAjax("/pay/refund_wxpay","post",t,sessionStorage.token,"mask","refundNUmCont","refundBox",a).then(function(e){a.msg(e.message,{icon:1}),i.reload({where:{}}),popupHide("goodsCont ","goodsBox ")}).catch(function(e){a.msg(e.message,{icon:2})}))}):a.msg("请按照提示填写数量",{icon:7})});var f=!1,g=!1;function h(){f?$(".pushBtn").removeClass("hide"):$(".pushBtn").addClass("hide"),g?$(".refundBtnTwo").removeClass("hide"):$(".refundBtnTwo").addClass("hide")}permissionsVal(420,421).then(function(e){f=e.addFlag,g=e.editFlag,h()}).catch(function(e){a.msg("服务器请求超时",{icon:7})}),$(".selectBox1 .fa").on("click",function(e){$(this).parent().next().toggle(),e.stopPropagation?e.stopPropagation():window.event&&(window.event.cancelBubble=!0)}),$(".selectUl1 li").click(function(e){e=e||window.event,console.log($(this).html()),$('.editCont select[name="company"]').val($(this).html())}),$(".selectBox2 .fa").on("click",function(e){$(this).parent().next().toggle(),e.stopPropagation?e.stopPropagation():window.event&&(window.event.cancelBubble=!0)}),$(".selectUl2 li").click(function(e){e=e||window.event,console.log($(this).html()),$('.deliveryCont select[name="company"]').val($(this).html())}),$(document).click(function(e){e=e||window.event,$(".selectUl").hide()}),e.render({elem:"#test5",type:"datetime"}),e.render({elem:"#test7",type:"datetime"}),$(".sidebar i").click(function(){$(".left-mian").hide(),$(".on-left").show()}),$(".on-left").click(function(){$(".left-mian").show(),$(".on-left").hide()});var v=treeList();function y(e,r,l,t,s){e.render({elem:"#".concat(r),id:"treelist",showLine:!0,onlyIconControl:!0,data:t,spread:!0,text:{defaultNodeName:"无数据",none:"您没有权限，请联系管理员授权!"},click:function(e){var t,n,o;c=e.data.id+"",u=e.data.title,l.reload({where:(t={},n=s,o=e.data.id+"",n in t?Object.defineProperty(t,n,{value:o,enumerable:!0,configurable:!0,writable:!0}):t[n]=o,t)});for(var i=$("#".concat(r," .layui-tree-txt")),a=0;a<i.length;a++)i[a].innerHTML===e.data.title?i[a].style.color="#be954a":i[a].style.color="#555"}})}y(o,"testGoods",i,v,"conditionFive"),$(".refreshBtnList").click(function(){var e=treeList();JSON.stringify(e)!=JSON.stringify(v)&&(y(o,"testGoods",i,v=e,"conditionFive"),i.reload({where:{conditionFive:sessionStorage.machineID}})),a.msg("已刷新",{icon:1})})})},421:function(e,t){}});