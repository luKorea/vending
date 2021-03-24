/*! 版权所有，翻版必究 */!function(e){function t(t){for(var o,r,s=t[0],l=t[1],c=t[2],u=0,p=[];u<s.length;u++)r=s[u],Object.prototype.hasOwnProperty.call(i,r)&&i[r]&&p.push(i[r][0]),i[r]=0;for(o in l)Object.prototype.hasOwnProperty.call(l,o)&&(e[o]=l[o]);for(d&&d(t);p.length;)p.shift()();return a.push.apply(a,c||[]),n()}function n(){for(var e,t=0;t<a.length;t++){for(var n=a[t],o=!0,s=1;s<n.length;s++){var l=n[s];0!==i[l]&&(o=!1)}o&&(a.splice(t--,1),e=r(r.s=n[0]))}return e}var o={},i={18:0},a=[];function r(t){if(o[t])return o[t].exports;var n=o[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,r),n.l=!0,n.exports}r.m=e,r.c=o,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(n,o,function(t){return e[t]}.bind(null,o));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="";var s=window.webpackJsonp=window.webpackJsonp||[],l=s.push.bind(s);s.push=t,s=s.slice();for(var c=0;c<s.length;c++)t(s[c]);var d=l;a.push([273,0]),n()}({273:function(e,t,n){"use strict";n.r(t);n(671);layui.use(["table","layer","form","laydate","tree"],function(){var e=layui.table,t=layui.layer,n=layui.form,o=layui.tree,i=layui.laydate,a=getKeyTime().startTime,r=getKeyTime().endTime,s=e.render({elem:"#mailTableOn",url:"".concat(vApi,"/order/getOrderList"),method:"post",contentType:"application/json",headers:{token:token},cols:[[{field:"number",width:210,title:"订单编号",align:"center"},{field:"notes",width:210,title:"下单时间",align:"center",templet:function(e){return timeStamp(e.time)}},{field:"sign_name",width:180,title:"收货人",align:"center"},{field:"sign_phone",width:180,title:"收货人电话",align:"center"},{field:"sign_address",width:300,title:"收货地址",align:"center"},{field:"notes",width:230,title:"备注",align:"center",templet:function(e){return e.notes?e.notes:"-"}},{field:"payType",width:150,title:"付款类型",align:"center",templet:function(e){return 0==e.payType?"支付宝":"微信"}},{field:"payee",width:210,title:"收款账号",align:"center"},{field:"amount",width:150,title:"订单金额",align:"center",templet:function(e){return percentileMoney(e.amount)}},{field:"sign_name",width:180,title:"退款状态",align:"center",templet:function(e){return 1==e.refund?"未退款":2==e.refund?"部分退款":3==e.refund?"全部退款":"-"}},{field:"sales_no",width:210,title:"销售经理",align:"center",templet:function(e){return e.sales_no?e.sales_no:"-"}},{field:"dispatch_status",width:210,title:"快递/物流状态",align:"center",templet:function(e){return 0==e.dispatch_status?"未发货":1==e.dispatch_status?"已发货":"已收货"}},{field:"express_type",width:190,title:"快递/物流公司",align:"center",templet:function(e){return e.express_type?e.express_type:"-"}},{field:"express_number",width:210,title:"快递/物流单号",align:"center",templet:function(e){return e.express_number?e.express_number:"-"}},{field:"express_number",width:210,title:"发货时间",align:"center",templet:function(e){return e.express_time?timeStamp(e.express_time):"-"}},{field:"operation",width:150,title:"操作 ",fixed:"right",right:0,toolbar:"#barDemo",align:"center"}]],page:!0,loading:!0,request:{pageName:"pageNum",limitName:"pageSize"},where:{conditionFive:sessionStorage.machineID,conditionSeven:1,condition:a,conditionTwo:r},parseData:function(e){return 200==e.code?{code:e.code,msg:e.message,count:e.data.total,data:e.data.list}:403!=e.code?{code:e.code,msg:e.message}:void(window.parent.location.href="login.html")},response:{statusCode:200},done:function(e){}}),l='<option value="">全部</option>';CourierList.forEach(function(e){l+='<option value="'.concat(e,'">').concat(e,"</option>")}),$("#deliverySele").html(l),$("#editSele").html(l),n.render("select"),$(".playHeader .close").click(function(){$(this).parent().parent().addClass("margin0"),$(this).parents(".maskContnet").fadeOut()});var c=null,d=null;e.on("tool(mailTableOn)",function(e){if(event.stopPropagation(),"operation"===e.event){if(d==e.data.number)return $(".ListOperation").fadeOut(),void(d=null);d=e.data.number,$(".ListOperation").fadeIn(),$(".ListOperation").css({left:$(this).offset().left-35+"px",top:$(this).offset().top+35+"px"})}0==(c=e.data).dispatch_status?$(".ListOperation .delivery").removeClass("hide"):$(".ListOperation .delivery").addClass("hide"),1==c.dispatch_status?$(".ListOperation .edit0").removeClass("hide"):$(".ListOperation .edit0").addClass("hide")}),$(".ListOperation .delivery").click(function(){popupShow("deliveryCont","deliveryBox")}),$(".ListOperation .edit0").click(function(){$('.editCont select[name="company"]').val(c.express_type),$('.editCont input[name="logisticsNumber"]').val(c.express_number),$("#test7").val(c.express_time),popupShow("editCont","editBox"),n.render("select")}),$(".ListOperation .goods0").click(function(){var t;t=c.goodsList,e.render({elem:"#GooodsData",cols:[[{field:"goods_images",width:80,title:"图片",templet:"#imgtmp",align:"center"},{field:"good_name_core",width:240,title:"商品名(编号)",align:"center"},{field:"count",width:120,title:"购买数量",align:"center"},{field:"refund_count",width:120,title:"已退款数量",align:"center"},{field:"price",width:130,title:"销售价 ",align:"center",templet:function(e){return percentileMoney(e.price)}},{field:"operation",right:0,width:80,align:"center",title:"操作",toolbar:"#refundDemo",fixed:"right"}]],data:t,id:"goodsLIstTable",loading:!0,done:function(e){v()}}),popupShow("goodsCont","goodsBox")}),$(".deliveryCont .cancelBtn").click(function(){popupHide("deliveryCont","deliveryBox")}),$(".deliveryCont .determinePushBtn").click(function(){if($('.deliveryBody select[name="company"]').val()&&$('.deliveryBody input[name="logisticsNumber"]').val()){$(".mask").fadeIn(),$(".maskSpan").addClass("maskIcon");var e=JSON.stringify({number:c.number,express_type:$('.deliveryBody select[name="company"]').val(),express_number:$('.deliveryBody input[name="logisticsNumber"]').val(),express_time:$("#test5").val()?$("#test5").val():timeStamp((new Date).getTime())});loadingAjax("/order/updateMailMsg","post",e,sessionStorage.token,"mask","deliveryCont","deliveryBox",t).then(function(e){t.msg(e.message,{icon:1}),s.reload({where:{}}),$('.deliveryBody select[name="company"]').val(""),$('.deliveryBody input[name="logisticsNumber"]').val("")}).catch(function(e){t.msg(e.message,{icon:2})})}else t.msg("带*为必填",{icon:7})}),$(".editCont .cancelBtn").click(function(){popupHide("editCont","editBox")}),$(".editCont .determinePushBtn").click(function(){if($('.editCont select[name="company"]').val()&&$('.editCont input[name="logisticsNumber"]').val()){$(".mask").fadeIn(),$(".maskSpan").addClass("maskIcon");var e=JSON.stringify({number:c.number,express_type:$('.editCont select[name="company"]').val(),express_number:$('.editCont input[name="logisticsNumber"]').val(),express_time:$("#test7").val()?$("#test7").val():timeStamp((new Date).getTime())});loadingAjax("/order/updateOrder","post",e,sessionStorage.token,"mask","editCont","deliveryBox",t).then(function(e){t.msg(e.message,{icon:1}),s.reload({where:{}})}).catch(function(e){t.msg(res.message,{icon:1})})}else t.msg("带*为必填",{icon:7})});i.render({elem:"#test8",type:"month",range:!0,done:function(e){var t=e.split(" - ");t[0],t[1]}}),$(".exportCont .cancelBtn").click(function(){popupHide("exportCont","exportBox")});var u=sessionStorage.machineID,p=null;$(".pushBtn").click(function(){if(a&&r)if(timeFlag(a,r))t.msg("时间选择范围最多三个月",{icon:7});else{$(".mask").fadeIn(),$(".maskSpan").addClass("maskIcon");var e=new XMLHttpRequest;e.open("GET","".concat(vApi,"/exportMailExcel?startDate=").concat(a,"&endDate=").concat(r,"&merchant_id=").concat(u,"&dispatch_status=").concat($('.newKeyContent select[name="takeStatus"]').val(),"&sign_name=").concat($('.newKeyContent input[name="takeName"]').val(),"&sign_phone=").concat($('.newKeyContent input[name="takePhone"]').val(),"&refund=").concat($('.newKeyContent select[name="keyrefundStatus"]').val(),"&conditionThree=").concat($('.key-contnet input[name="orderCode"]').val()),!0),e.setRequestHeader("token",sessionStorage.token),e.responseType="blob",e.onload=function(n){if(console.log(e),200!=e.status)return $(".mask").fadeOut(),$(".maskSpan").removeClass("maskIcon"),void t.msg("服务器请求超时",{icon:2});if($(".mask").fadeOut(),$(".maskSpan").removeClass("maskIcon"),e.response.size<50)t.msg("导出失败",{icon:7});else{var o=e.response,i="邮寄订单-".concat(p,"(").concat(a,"至").concat(r,").xls"),s=document.createElement("a");s.download=i,s.style.display="none";var l=new Blob([o]);s.href=URL.createObjectURL(l),document.body.appendChild(s),s.click(),document.body.removeChild(s)}},e.send()}else t.msg("请选择时间",{icon:7})}),(i=layui.laydate).render({elem:"#test6",range:!0,value:getKeyTime().keyTimeData,done:function(e){var t=e.split(" - ");a=t[0],r=t[1]}}),$(".queryBtn").click(function(){timeFlag(a,r)?t.msg("时间选择范围最多三个月",{icon:7}):s.reload({where:{condition:a,conditionTwo:r,conditionThree:$('.key-contnet input[name="orderCode"]').val(),dispatch_status:$('.newKeyContent select[name="takeStatus"]').val(),sign_name:$('.newKeyContent input[name="takeName"]').val(),sign_phone:$('.newKeyContent input[name="takePhone"]').val(),refund:$('.newKeyContent select[name="keyrefundStatus"]').val()}})}),$(".refreshBtn").click(function(){location.reload()});var m=null;e.on("tool(GooodsData)",function(e){2==c.payStatus?(m=e.data,console.log(m),e.data.count!=e.data.refund_count?($(".twoPoles span").html(e.data.count-e.data.refund_count),$(".refundNumber input").val(1),$(".refundNumber input").prop("max",e.data.count-e.data.refund_count),$('.sumInput input[name="sum"]').val(m.price),popupShow("refundNUmCont","refundBox")):t.msg("该商品已全部退款",{icon:7})):t.msg("订单未支付，不能进行退款操作",{icon:7})}),$(".refundNUmCont .chooseCan").click(function(){popupHide("refundNUmCont","refundBox")});var f=1;$(".refundNumber input").keyup(function(){var e=$(this).val();/^\d*$/.test(e)?(f=$(this).val(),console.log(f),$('.sumInput input[name="sum"]').val(Number($(this).val()*m.price))):(t.msg("只能输入正整数",{icon:7}),$(this).val(f),$('.sumInput input[name="sum"]').val(Number($(this).val()*m.price))),$('.sumInput input[name="sum"]').val(Number($(this).val()*m.price))}),$(".refundNumber input").change(function(){$('.sumInput input[name="sum"]').val(Number($(this).val()*m.price))}),$(".refundNUmCont .determineBtn").click(function(){console.log($(".refundNumber input").val()),$(".refundNumber input").val()>0&&$(".refundNumber input").val()<=m.count-m.refund_count?t.confirm("确定退款？",function(e){if(t.close(e),$(".mask").fadeIn(),$(".maskSpan").addClass("maskIcon"),console.log(c),0==c.payType){var n=JSON.stringify({machineId:c.machineId,orderId:c.number,goodId:m.goods_Id,count:Number($(".refundNumber input").val()),amount:Number($('.sumInput input[name="sum"]').val()),pay_id:c.pay_id});loadingAjax("/pay/refund_alipay","post",n,sessionStorage.token,"mask","refundNUmCont","refundBox",t).then(function(e){t.msg(e.message,{icon:1}),s.reload({where:{}}),popupHide("goodsCont ","goodsBox ")}).catch(function(e){t.msg(e.message,{icon:2})})}else if(1==c.payType){n=JSON.stringify({machineId:c.machineId,orderId:c.number,goodId:m.goods_Id,count:Number($(".refundNumber input").val()),amount:Number($('.sumInput input[name="sum"]').val()),pay_id:c.pay_id,transaction_id:c.transaction_id,total:c.amount});loadingAjax("/pay/refund_wxpay","post",n,sessionStorage.token,"mask","refundNUmCont","refundBox",t).then(function(e){t.msg(e.message,{icon:1}),s.reload({where:{}}),popupHide("goodsCont ","goodsBox ")}).catch(function(e){t.msg(e.message,{icon:2})})}}):t.msg("请按照提示填写数量",{icon:7})});var g=window.parent.permissionsData1(),h=permissionsVal1({420:!1,421:!1},g);function v(){h[420]?$(".pushBtn").removeClass("hide"):$(".pushBtn").addClass("hide"),h[421]?$(".refundBtnTwo").removeClass("hide"):$(".refundBtnTwo").addClass("hide")}v(),$(".selectBox1 .fa").on("click",function(e){$(this).parent().next().toggle(),e.stopPropagation?e.stopPropagation():window.event&&(window.event.cancelBubble=!0)}),$(".selectUl1 li").click(function(e){e=e||window.event,console.log($(this).html()),$('.editCont select[name="company"]').val($(this).html())}),$(".selectBox2 .fa").on("click",function(e){$(this).parent().next().toggle(),e.stopPropagation?e.stopPropagation():window.event&&(window.event.cancelBubble=!0)}),$(".selectUl2 li").click(function(e){e=e||window.event,console.log($(this).html()),$('.deliveryCont select[name="company"]').val($(this).html())}),$(document).click(function(e){e=e||window.event,$(".selectUl").hide()}),i.render({elem:"#test5",type:"datetime"}),i.render({elem:"#test7",type:"datetime"}),$(".sidebar i").click(function(){$(".left-mian").hide(),$(".on-left").show()}),$(".on-left").click(function(){$(".left-mian").show(),$(".on-left").hide()});var y=treeList();function b(e,t,n,o,i){e.render({elem:"#".concat(t),id:"treelist",showLine:!0,onlyIconControl:!0,data:o,spread:!0,text:{defaultNodeName:"无数据",none:"您没有权限，请联系管理员授权!"},click:function(e){u=e.data.id+"",console.log(u),p=e.data.title,n.reload({where:function(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}({},i,e.data.id+"")});for(var o=$("#".concat(t," .layui-tree-txt")),a=0;a<o.length;a++)o[a].innerHTML===e.data.title?o[a].style.color="#be954a":o[a].style.color="#555"}})}b(o,"testGoods",s,y,"conditionFive"),$(".refreshBtnList").click(function(){var e=treeList();JSON.stringify(e)!=JSON.stringify(y)?(b(o,"testGoods",s,y=e,"conditionFive"),s.reload({where:{conditionFive:sessionStorage.machineID}}),t.msg("已刷新",{icon:1})):t.msg("已刷新",{icon:1})}),$("body").on("mouseenter",".pic102",function(e){$("#pic101").attr("src",$(this).attr("src")),$("#pic101").css({top:e.pageY-100+"px",left:e.pageX+20+"px"}).fadeIn("fast")}),$("body").on("mouseleave",".pic102",function(){$("#pic101").hide()}),$("body").click(function(){$(".ListOperation").fadeOut(),d=null})})},671:function(e,t){}});