/*! 版权所有，翻版必究 */!function(e){function t(t){for(var a,s,r=t[0],l=t[1],c=t[2],u=0,p=[];u<r.length;u++)s=r[u],Object.prototype.hasOwnProperty.call(i,s)&&i[s]&&p.push(i[s][0]),i[s]=0;for(a in l)Object.prototype.hasOwnProperty.call(l,a)&&(e[a]=l[a]);for(d&&d(t);p.length;)p.shift()();return o.push.apply(o,c||[]),n()}function n(){for(var e,t=0;t<o.length;t++){for(var n=o[t],a=!0,r=1;r<n.length;r++){var l=n[r];0!==i[l]&&(a=!1)}a&&(o.splice(t--,1),e=s(s.s=n[0]))}return e}var a={},i={29:0},o=[];function s(t){if(a[t])return a[t].exports;var n=a[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,s),n.l=!0,n.exports}s.m=e,s.c=a,s.d=function(e,t,n){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},s.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(s.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)s.d(n,a,function(t){return e[t]}.bind(null,a));return n},s.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="";var r=window.webpackJsonp=window.webpackJsonp||[],l=r.push.bind(r);r.push=t,r=r.slice();for(var c=0;c<r.length;c++)t(r[c]);var d=l;o.push([276,0]),n()}({276:function(e,t,n){"use strict";n.r(t);n(677);layui.use(["table","form","layer","tree","laydate"],function(){tooltip(".refreshBtnList",{transition:!0,time:200}),sessionStorage.classTag=sessionStorage.machineID;var e=layui.table,t=layui.layer,n=layui.tree,a=layui.laydate,i=sessionStorage.marchantName,o=sessionStorage.machineID,s=sessionStorage.token,r=getKeyTime().startTime,l=getKeyTime().endTime;a.render({elem:"#test6",range:!0,value:getKeyTime().keyTimeData,done:function(e,t,n){console.log(e);var a=e.split(" - ");console.log(a),r=a[0],l=a[1]}});var c=e.render({elem:"#tableTest",url:"".concat(vApi,"/order/getOrderMerchant"),method:"post",contentType:"application/json",headers:{token:s},cols:[[{field:"info",width:220,title:"售货机名(编号)",align:"center",templet:function(e){return"<div>".concat(e.info,"</div>\n                      <div>(").concat(e.machineNumber,")</div>")}},{field:"number",width:190,title:"订单编号",align:"center"},{field:"number",width:130,title:"订单类型",align:"center",templet:function(e){return 0==e.mail?"售货机订单":"邮寄订单"}},{field:"amount",width:130,title:"订单金额(￥)",align:"center",templet:function(e){return percentileMoney(e.amount)}},{field:"payStatus",width:130,align:"center",title:"支付状态",templet:function(e){return 1==e.payStatus?"等待支付":2==e.payStatus?"已支付":"未支付"}},{field:"time",width:180,title:"支付时间",align:"center",templet:function(e){return e.time?timeStamp(e.time):"-"}},{field:"bili",width:130,align:"center",title:"支付类型",templet:function(e){return 1==e.payType?"微信":0==e.payType?"支付宝":"工行支付"}},{field:"sign_name",width:150,title:"退款状态",align:"center",templet:function(e){return 1==e.refund?"未退款":2==e.refund?"部分退款":3==e.refund?"全部退款":"-"}},{field:"shipStatus",width:150,title:"出货状态",align:"center",templet:function(e){return 0==e.mail?0==e.shipStatus?"未出货":1==e.shipStatus?"部分出货失败":"全部出货成功":"-"}},{field:"ship_info",width:200,title:"出货详情",align:"center",templet:function(e){if(0==e.ship_info.length)return"-";var t="";return e.ship_info.forEach(function(e,n){t+="<div>".concat(e.goods_Name,"(").concat(e.way,"货道").concat(0==e.ship_status?"出货失败":1==e.ship_status?"出货成功":"货道故障",")</div>")}),t}},{field:"ship_info",width:230,title:"邮寄信息",align:"center",templet:function(e){return 1==e.mail?'\n                                <div class="mailFlex"><span> 收货人:</span><span>'.concat(e.sign_name,'</span></div>\n                                <div class="mailFlex"> <span>收货人电话:</span><span>').concat(e.sign_phone,'</span></div>\n                                <div class="mailFlex"><span>收货地址:</span><span>').concat(e.sign_address,'</span></div>\n                                <div class="mailFlex"><span>快递/物流状态:</span><span>').concat(0==e.dispatch_status?"未发货":1==e.dispatch_status?"已发货":"已收货",'</span></div>\n                                <div class="mailFlex"><span>快递/物流公司:</span><span>').concat(e.express_type?e.express_type:"-",'</span></div>\n                                <div class="mailFlex"><span>快递/物流单号:</span><span>').concat(e.express_number?e.express_number:"-","</span></div>\n                               "):"-"}},{field:"sales_no",width:160,title:"销售经理",align:"center",templet:function(e){return e.sales_no?e.sales_no:"-"}},{field:"payee",width:160,title:"收款方",align:"center"}]],id:"tableId",page:!0,loading:!0,request:{pageName:"pageNum",limitName:"pageSize"},where:{merchant_id:o,startTime:r,endTime:l},parseData:function(e){return 200==e.code?{code:e.code,msg:"",count:e.data.total,data:e.data.list}:403!=e.code?{code:e.code,msg:e.message}:void(window.parent.location.href="login.html")},response:{statusCode:200},done:function(e){e.data,m(),405==e.code&&$(".hangContent").show()}});layui.form;$(".playHeader .close").click(function(){$(this).parent().parent().addClass("margin0"),$(this).parents(".maskContnet").fadeOut()});var d=treeList();f(n,"testGoods",d),$(".refreshBtnList").click(function(){var e=treeList();JSON.stringify(e)!=JSON.stringify(d)?(f(n,"testGoods",d=e),c.reload({where:{merchant_id:sessionStorage.machineID}}),t.msg("已刷新",{icon:1})):t.msg("已刷新",{icon:1})}),$(".sidebar i").click(function(){$(".left-mian").hide(),$(".on-left").show()}),$(".on-left").click(function(){$(".left-mian").show(),$(".on-left").hide()}),$("body").bind("keydown",function(e){116==e.keyCode&&f5Fun()});var u=window.parent.permissionsData1(),p=permissionsVal1({464:!1},u);function m(){p[464]?$(".pushBtn").removeClass("hide"):$(".pushBtn").addClass("hide")}function f(e,t,n){e.render({elem:"#".concat(t),id:"treelist",showLine:!0,onlyIconControl:!0,data:n,spread:!0,text:{defaultNodeName:"无数据",none:"您没有权限，请联系管理员授权!"},click:function(e){console.log(e),i=e.data.title;for(var n=$("#".concat(t," .layui-tree-txt")),a=0;a<n.length;a++)n[a].innerHTML===e.data.title?n[a].style.color="#be954a":n[a].style.color="#555";o!=e.data.id&&(o=e.data.id,c.reload({where:{merchant_id:o}}))}})}m(),$(".pushBtn").click(function(){if(r&&l)if(timeFlag(r,l))t.msg("时间选择范围最多三个月",{icon:7});else{$(".mask").fadeIn(),$(".maskSpan").addClass("maskIcon");new Date;var e=new XMLHttpRequest;e.open("GET","".concat(vApi,"/complete?startDate=").concat(r,"&endDate=").concat(l,"&merchant_id=").concat(o,"&conditionThree=").concat($('.key-contnet input[name="orderCode"]').val(),"&conditionSix=").concat($('.newKeyContent select[name="keyPayStatus"]').val(),"&refund=").concat($('.newKeyContent select[name="keyrefundStatus"]').val()),!0),e.setRequestHeader("token",sessionStorage.token),e.responseType="blob",e.onload=function(n){if(console.log(n),200!=e.status)return $(".mask").fadeOut(),$(".maskSpan").removeClass("maskIcon"),void t.msg("服务器请求超时",{icon:2});if($(".mask").fadeOut(),$(".maskSpan").removeClass("maskIcon"),e.response.size<50)t.msg("导出失败",{icon:7});else{var a=e.response,o="".concat(i,"订单汇总(").concat(r,"-").concat(l,").xls"),s=document.createElement("a");s.download=o,s.style.display="none";var c=new Blob([a]);s.href=URL.createObjectURL(c),document.body.appendChild(s),s.click(),document.body.removeChild(s)}};sessionStorage.machineID;e.send()}else t.msg("请选择时间",{icon:7})}),$(".queryBtn").click(function(){timeFlag(r,l)?t.msg("时间选择范围最多三个月",{icon:7}):c.reload({where:{startTime:r,endTime:l,conditionThree:$('.key-contnet input[name="orderCode"]').val(),conditionSix:$('.newKeyContent select[name="keyPayStatus"]').val(),refund:$('.newKeyContent select[name="keyrefundStatus"]').val()}})})})},677:function(e,t){}});