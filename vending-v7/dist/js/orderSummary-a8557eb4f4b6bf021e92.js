/*! 版权所有，翻版必究 */!function(e){function t(t){for(var a,s,r=t[0],l=t[1],c=t[2],u=0,p=[];u<r.length;u++)s=r[u],Object.prototype.hasOwnProperty.call(i,s)&&i[s]&&p.push(i[s][0]),i[s]=0;for(a in l)Object.prototype.hasOwnProperty.call(l,a)&&(e[a]=l[a]);for(d&&d(t);p.length;)p.shift()();return o.push.apply(o,c||[]),n()}function n(){for(var e,t=0;t<o.length;t++){for(var n=o[t],a=!0,r=1;r<n.length;r++){var l=n[r];0!==i[l]&&(a=!1)}a&&(o.splice(t--,1),e=s(s.s=n[0]))}return e}var a={},i={29:0},o=[];function s(t){if(a[t])return a[t].exports;var n=a[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,s),n.l=!0,n.exports}s.m=e,s.c=a,s.d=function(e,t,n){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},s.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(s.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)s.d(n,a,function(t){return e[t]}.bind(null,a));return n},s.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="";var r=window.webpackJsonp=window.webpackJsonp||[],l=r.push.bind(r);r.push=t,r=r.slice();for(var c=0;c<r.length;c++)t(r[c]);var d=l;o.push([264,0]),n()}({264:function(e,t,n){"use strict";n.r(t);n(649);layui.use(["table","form","layer","tree","laydate"],function(){sessionStorage.classTag=sessionStorage.machineID;var e=layui.table,t=layui.layer,n=layui.tree,a=layui.laydate,i=sessionStorage.marchantName,o=sessionStorage.machineID,s=sessionStorage.token,r=getKeyTime().startTime,l=getKeyTime().endTime;a.render({elem:"#test6",range:!0,value:getKeyTime().keyTimeData,done:function(e,t,n){console.log(e);var a=e.split(" - ");console.log(a),r=a[0],l=a[1]}});var c=[[{fixed:"left",field:"info",width:220,title:"售货机名(编号)",align:"center",templet:function(e){return"<div>".concat(e.info,"</div>\n                      <div>(").concat(e.machineNumber,")</div>")}},{field:"number",width:190,title:"订单编号",align:"center",fixed:"left"},{field:"number",width:130,title:"订单类型",align:"center",templet:function(e){return 0==e.mail?"售货机订单":"邮寄订单"}},{field:"amount",width:130,title:"订单金额(￥)",align:"center",templet:function(e){return percentileMoney(e.amount)}},{field:"payStatus",width:130,align:"center",title:"支付状态",templet:function(e){return setPayStatus(e.payStatus)}},{field:"time",width:180,title:"支付时间",align:"center",templet:function(e){return e.time?timeStamp(e.time):"-"}},{field:"bili",width:130,align:"center",title:"支付类型",templet:function(e){return setPayType(e.payType)}},{field:"sign_name",width:150,title:"退款状态",align:"center",templet:function(e){return setRefundStatus(e.refund)}},{field:"shipStatus",width:150,title:"出货状态",align:"center",templet:function(e){return 0==e.mail?setOrderStatus(e.shipStatus):"-"}},{field:"ship_info",width:200,title:"出货详情",align:"center",templet:function(e){if(0==e.ship_info.length)return"-";var t="";return e.ship_info.forEach(function(e,n){t+="<span>".concat(e.goods_Name,"(").concat(e.way,"货道 ").concat(setOrderDetailStatus(e.ship_status),")</span>")}),t}},{field:"ship_info",width:230,title:"邮寄信息",align:"center",templet:function(e){return 1==e.mail?"<span> 收货人:</span><span>".concat(e.sign_name,"</span>"):"-"}},{field:"sales_no",width:160,title:"销售经理",align:"center",templet:function(e){return e.sales_no?e.sales_no:"-"}},{field:"payee",width:160,title:"收款方",align:"center"}]],d=e.render({elem:"#tableTest",url:"".concat(vApi,"/order/getOrderMerchant"),method:"post",contentType:"application/json",headers:{token:s},height:600,cols:c,id:"tableId",page:!0,loading:!0,request:{pageName:"pageNum",limitName:"pageSize"},where:{merchant_id:o,startTime:r,endTime:l},parseData:function(e){return 200==e.code?{code:e.code,msg:"",count:e.data.total,data:e.data.list}:403!=e.code?{code:e.code,msg:e.message}:void(window.parent.location.href="login.html")},response:{statusCode:200},done:function(e){e.data,m(),405==e.code&&$(".hangContent").show()}});e.on("row",function(e){var t=e.data,n='\n                <div class="mailFlex">\n                    <span>收货人姓名:</span>\n                    <span class="OName">'.concat(t.sign_name,'</span>\n                </div>\n                <div class="mailFlex">\n                    <span>收货人电话:</span>\n                    <span class="OName">').concat(t.sign_phone,'</span>\n                </div>\n                <div class="mailFlex">\n                    <span>收货地址:</span>\n                    <span class="address">').concat(t.sign_address,'</span>\n                </div>\n                <div class="mailFlex">\n                    <span>快递/物流状态:</span>\n                    <span class="status">').concat(0==t.dispatch_status?"未发货":1==t.dispatch_status?"已发货":"已收货",'</span>\n                </div>\n                <div class="mailFlex">\n                    <span>快递/物流公司:</span>\n                    <span class="company">').concat(t.express_type?t.express_type:"-",'</span>\n                </div>\n                <div class="mailFlex">\n                    <span>快递/物流单号:</span>\n                    <span class="number">').concat(t.express_number?t.express_number:"-","</span>\n                </div>");1==t.mail&&($("#info").html(n),popupShow("orderDetails","orderDetailsBox"))}),$(".orderDetails .layui-icon-close").click(function(){popupHide("orderDetails","orderDetailsBox")});layui.form;$(".playHeader .close").click(function(){$(this).parent().parent().addClass("margin0"),$(this).parents(".maskContnet").fadeOut()});var u=treeList();h(n,"testGoods",u),$(".refreshBtnList").click(function(){var e=treeList();JSON.stringify(e)!=JSON.stringify(u)?(h(n,"testGoods",u=e),d.reload({where:{merchant_id:sessionStorage.machineID}}),t.msg("已刷新",{icon:1})):t.msg("已刷新",{icon:1})}),$(".sidebar i").click(function(){$(".left-mian").hide(),$(".on-left").show()}),$(".on-left").click(function(){$(".left-mian").show(),$(".on-left").hide()}),$("body").bind("keydown",function(e){116==e.keyCode&&f5Fun()});var p=window.parent.permissionsData1(),f=permissionsVal1({464:!1},p);function m(){f[464]?$(".pushBtn").removeClass("hide"):$(".pushBtn").addClass("hide")}function h(e,t,n){e.render({elem:"#".concat(t),id:"treelist",showLine:!0,onlyIconControl:!0,data:n,spread:!0,text:{defaultNodeName:"无数据",none:"您没有权限，请联系管理员授权!"},click:function(e){console.log(e),i=e.data.title;for(var n=$("#".concat(t," .layui-tree-txt")),a=0;a<n.length;a++)n[a].innerHTML===e.data.title?n[a].style.color="#be954a":n[a].style.color="#555";o!=e.data.id&&(o=e.data.id,d.reload({where:{merchant_id:o}}))}})}m(),$(".pushBtn").click(function(){if(r&&l)if(timeFlag(r,l))t.msg("时间选择范围最多三个月",{icon:7});else{var e="订单汇总-".concat(i,"(").concat(r,"至").concat(l,").xls"),n=$('.key-contnet input[name="orderCode"]').val(),a=$('.newKeyContent select[name="keyPayStatus"]').val(),s=$('.newKeyContent select[name="keyrefundStatus"]').val(),c="".concat(vApi,"/complete?startDate=").concat(r,"&endDate=").concat(l,"&merchant_id=").concat(o,"&conditionThree=").concat(n,"&conditionSix=").concat(a,"&refund=").concat(s);exportExcel(c,e)}else t.msg("请选择时间",{icon:7})}),$(".queryBtn").click(function(){timeFlag(r,l)?t.msg("时间选择范围最多三个月",{icon:7}):(saveTableWidth(c),d.reload({where:{startTime:r,endTime:l,conditionThree:$('.key-contnet input[name="orderCode"]').val(),conditionSix:$('.newKeyContent select[name="keyPayStatus"]').val(),refund:$('.newKeyContent select[name="keyrefundStatus"]').val()},cols:c}))})})},649:function(e,t){}});