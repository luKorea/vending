/*! 版权所有，翻版必究 */!function(e){function t(t){for(var a,c,s=t[0],l=t[1],r=t[2],m=0,u=[];m<s.length;m++)c=s[m],Object.prototype.hasOwnProperty.call(i,c)&&i[c]&&u.push(i[c][0]),i[c]=0;for(a in l)Object.prototype.hasOwnProperty.call(l,a)&&(e[a]=l[a]);for(d&&d(t);u.length;)u.shift()();return o.push.apply(o,r||[]),n()}function n(){for(var e,t=0;t<o.length;t++){for(var n=o[t],a=!0,s=1;s<n.length;s++){var l=n[s];0!==i[l]&&(a=!1)}a&&(o.splice(t--,1),e=c(c.s=n[0]))}return e}var a={},i={4:0},o=[];function c(t){if(a[t])return a[t].exports;var n=a[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,c),n.l=!0,n.exports}c.m=e,c.c=a,c.d=function(e,t,n){c.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},c.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},c.t=function(e,t){if(1&t&&(e=c(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(c.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)c.d(n,a,function(t){return e[t]}.bind(null,a));return n},c.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return c.d(t,"a",t),t},c.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},c.p="";var s=window.webpackJsonp=window.webpackJsonp||[],l=s.push.bind(s);s.push=t,s=s.slice();for(var r=0;r<s.length;r++)t(s[r]);var d=l;o.push([579,0]),n()}({579:function(e,t,n){"use strict";n.r(t);n(658);var a=n(0);function i(e){""===e&&(e=0),e=e.toString().replace(/[^\d\.-]/g,""),isNaN(e)&&(e="0");var t=e==(e=Math.abs(e)),n=(e=Math.floor(100*e+.50000000001))%100;n=n<10?"0"+n:n,e=Math.floor(e/100).toString();for(var a=0;a<Math.floor((e.length-(1+a))/3);a++)e=e.substring(0,e.length-(4*a+3))+","+e.substring(e.length-(4*a+3));return"￥"+(t?"":"-")+e+"."+n}hui("#select1").selectBeautify(),hui("#select2").selectBeautify(),hui("#select3").selectBeautify(),$("#topHeader .back").click(function(){window.location.href="M_managementCenter.html"});var o=!1,c=!1,s=!1,l=!1,r=!1,d=!1;Object(a.h)("/role/findUserPermission","post",sessionStorage.token).then(function(e){e.data.forEach(function(e){"396"==e.id&&(o=!0),"392"==e.id&&(c=!0),"432"==e.id&&(s=!0),"427"==e.id&&(l=!0),"401"==e.id&&!0,"402"==e.id&&(r=!0),"456"==e.id&&(d=!0),"424"==e.id&&!0}),c?$(".remoteOperation").show():$(".remoteOperation").hide(),l?$(".aisleDetalis").show():$(".aisleDetalis").hide(),s?$(".paySetBtn").show():$(".paySetBtn").hide(),r?$(".shipmentRd").show():$(".shipmentRd").hide(),d?$(".Rrecord").show():$(".Rrecord").hide()}).catch(function(e){console.log(e)});var m=sessionStorage.machineID,u=1,h=10,p="",f="",g="",b="";var v=[],O=0;function j(e){var t="";e.forEach(function(e,n){t+='<div class="list myScale3d" machineid="'.concat(e.machineId,'" machineListIndex="').concat(O,'" merchantsId="').concat(e.userNum,'">\n                    <p class="info">').concat(e.info,'</p>\n                    <p class="address">').concat(e.location,'</p>\n                    <ul class="status flex">\n                        <li class="').concat(0==e.actionStatus?"colorG":"colorYes",'">').concat(0==e.actionStatus?"未激活":"已激活",'</li>\n                        <li class="').concat(0==e.onlineStatus?"colorNo":"colorYes",'" >').concat(0==e.onlineStatus?"离线":"在线",'</li>\n                        <li class="').concat(0==e.openStatus?"colorG":"colorYes",'">').concat(0==e.openStatus?"暂停营业":"正在营业","</li>\n\n                    </ul>\n                </div> "),O++}),$(".machineList").append(t)}hui.loadMore(function(){[],u++;var e=JSON.stringify({pageNum:u,pageSize:h,onlineStatus:f?Number(f):"",actionStatus:p?Number(p):"",openStatus:g?Number(g):"",stockStatus:b?Number(b):"",merchantId:m});Object(a.d)("/machine/getMachineList","post",sessionStorage.token,e,"mask").then(function(e){if($(".allmachine span").html(e.data.total),v=v.concat(e.data.list),k&&j(e.data.list),e.data.list.length<10)return hui.endLoadMore(!0,"已加载全部数据"),!1;hui.endLoadMore()}).catch(function(e){Object(a.m)(e.message,"error"),hui.endLoadMore(!0,"已加载全部数据")})},"正在加载");var k=!1;function y(){hui.loading("加载中..."),v=[],[],u=1,O=0;var e=JSON.stringify({pageNum:u,pageSize:h,onlineStatus:f?Number(f):"",actionStatus:p?Number(p):"",openStatus:g?Number(g):"",stockStatus:b?Number(b):"",keyword:I,merchantId:m}),t=!1;Object(a.d)("/machine/getMachineList","post",sessionStorage.token,e,"mask").then(function(e){$(".allmachine span").html(e.data.total),$(".machineList").empty(),$(".machineList").html('<div class="hui-refresh-icon"></div>'),v=e.data.list,e.data.list.length>0&&(t=!0),k=!(e.data.list.length<10),t||$(".machineList").append('<div class="empty">查询无数据</div>'),j(e.data.list),hui.endRefresh(),hui.resetLoadMore()}).catch(function(e){t=!1,Object(a.m)(e.message,"error"),hui.endRefresh(),hui.resetLoadMore()})}hui.refresh("#machineList",y);var C="",x="",S="",N="",I="";$(".actionStatus li").click(function(){$(this).addClass("green").siblings().removeClass("green"),C=$(this).attr("actionIndex")}),$(".onlineStatus li").click(function(){$(this).addClass("yellow").siblings().removeClass("yellow"),x=$(this).attr("onlineIndex")}),$(".permissions li").click(function(){$(this).addClass("blue").siblings().removeClass("blue"),S=$(this).attr("permissionsIndex")}),$(".CreationTime li").click(function(){$(this).addClass("red").siblings().removeClass("red"),N=$(this).attr("CreationIndex")}),$(".KeyInput button").click(function(){p||$(".actionStatus li").eq(0).addClass("green").siblings().removeClass("green"),f||$(".onlineStatus li").eq(0).addClass("yellow").siblings().removeClass("yellow"),g||$(".permissions li").eq(0).addClass("blue").siblings().removeClass("blue"),b||$(".CreationTime li").eq(0).addClass("red").siblings().removeClass("red"),Object(a.j)(".conditionsCont",".conditionsHalf","top0")}),$(".conditionsHalf").click(function(){event.stopPropagation()}),$(".conditionsCont").click(function(){Object(a.b)(this,"top0")}),$(".conditionFooter .cancelBtn").click(function(){Object(a.a)(this,"top0")}),$(".conditionFooter .confirmBtn").click(function(){p=C,f=x,g=S,b=N,I=$('.KeyInput input[name="key"]').val(),y(),Object(a.a)(this,"top0")});var w=null,B=null;$(".machineList").on("click",".list",function(){Object(a.j)(".operationList",".operationBox","top0"),w=$(this).attr("machineid"),B=$(this).attr("machinelistindex"),console.log(B),$(".machineTitle").html(v[B].info+"售货机信息"),T=v[B]}),$(".operationList .topHeader span").click(function(){Object(a.a)(this,"top0")}),$(".paySetBtn").click(function(){_(T.machineId,T.userNum),Object(a.j)(".collectionContent",".collectionBox","top30")}),$(".collectionContent .close").click(function(){Object(a.a)(this,"top30")}),$(".collectionContent").click(function(){Object(a.b)(this,"top30")}),$(".collectionBox").click(function(){event.stopPropagation()});function _(e,t){var n=JSON.stringify({machineId:e});Object(a.d)("/pay/getMachinePayParam","post",sessionStorage.token,n).then(function(e){console.log(e),Object(a.d)("/pay/getPayParam","post",sessionStorage.token,JSON.stringify({merchantId:Number(t)})).then(function(t){var n="";e.data.forEach(function(e,a){1==e.status&&(n+='<div class="hui-form-items">\n                                    <div class="hui-form-items-title">'.concat(e.tName,'</div>\n                                    <div class="hui-form-radios" style="line-height:38px;">'),0==e.selectPay.length?n+='<input type="radio" value="'.concat("0-0",'" name="').concat(e.id,'"  id="').concat(e.id,'wu" checked  /><label for="').concat(e.id,'wu">无</label>'):n+='<input type="radio" value="'.concat(e.selectPay[0].mpId+"-0",'" name="').concat(e.id,'"  id="').concat(e.id,'wu" /><label for="').concat(e.id,'wu">无</label>'),t.data.forEach(function(t,a){e.id==t.payType&&(n+='<input type="radio" value="'.concat((e.selectPay.length>0?e.selectPay[0].mpId:0)+"-"+t.id,'" name="').concat(e.id,'"  id="').concat(t.id,'" ').concat(e.selectPay.length<=0?"":e.selectPay[0].paramId==t.id?"checked":"",' /><label for="').concat(t.id,'">').concat(t.payee,"</label>"))}),n+=" </div>\n                    </div>")}),$("#form1").html(n)}).catch(function(e){Object(a.m)(e.message,"error")})}).catch(function(e){console.log(e),Object(a.m)(e.message,"error")})}$(".aisleDetalis").click(function(){$(".childConten").show(),$(".childData").prop("src","M_machineChild.html"),$("#childData")[0].contentWindow}),sessionStorage.independentPass="";var T=null;$("#form1").on("change",'input[type="radio"]',function(){if(s){console.log($(this).val());var e=this;hui.confirm("确定修改收款账户？",["取消","确定"],function(){Object(a.e)("正在修改，请稍后！");var t=$(e).val().split("-"),n=JSON.stringify({machineId:w,paramId:Number(t[1]),mpId:Number(t[0])});Object(a.d)("/pay/updateMachinePayParam","post",sessionStorage.token,n,"mask").then(function(e){console.log(e),Object(a.m)(e.message,"success"),_(T.machineId,T.userNum)}).catch(function(e){Object(a.m)(e.message,"error"),_(T.machineId,T.userNum)})},function(){_(T.machineId,T.userNum)})}else Object(a.m)("您没有修改收款账户得权限","warn")}),$(".operationNav .info").click(function(){Object(a.j)(".terminalContent",".terminalBox","top0"),console.log(v[B]),1!=T.openStatus&&o?($(".terminalContent input").prop("disabled",!1),$(".terminalContent .terminalFooter").show(),$('.terminalContent input[name="merchantsNametext"]').prop("disabled",!0),$('.terminalContent input[name="number"]').prop("disabled",!0),$('.terminalContent input[name="merchantsName"]').prop("disabled",!0)):(Object(a.m)(o?"温馨提示！该售货机正在营业，不可进行编辑！":"您没有编辑设备的权限","warn"),$(".terminalContent input").prop("disabled",!0),$(".terminalContent .terminalFooter").hide()),$('.terminalContent input[name="sNumber"]').val(T.number),$('.terminalContent input[name="name"]').val(T.info),$('.terminalContent input[name="number"]').val(T.machineId);var e=T.location.split(" ");$(".province").html(e[0]+" "+e[1]+" "+e[2]),$('.terminalContent input[name="mapVal"]').val(e[3]),$('.terminalContent input[name="area"]').val(T.area),$('.terminalContent input[name="longitude"]').val(T.longitude),$('.terminalContent input[name="latitude"]').val(T.latitude),$('.terminalContent input[name="headPhone"]').val(T.chargerPhone),$('.terminalContent input[name="describe"]').val(T.description),$('.terminalContent input[name="merchantsNametext"]').val(T.merchantName),$('.terminalContent input[name="merchantsName"]').val(T.userNum),1==T.machinesource?$(".maxShipClass").show():$(".maxShipClass").hide(),$('.terminalContent input[name="max_ship"]').val(0==T.max_ship?"":T.max_ship)}),$(".terminalContent .close").click(function(){Object(a.a)(this,"top0"),$(".hui-picker").hide()});var M=new huiPicker("#province",function(){var e=M.getText(0),t=M.getText(1),n=M.getText(2);hui("#province").html(e+" "+t+" "+n)});M.level=3,M.bindRelevanceData(cities),$(".terminalContent .confirmBtn").click(function(){var e=hui.getFormData("#form2");if(console.log(e),e.sNumber&&e.name&&e.number&&e.mapVal&&e.area&&e.merchantsName&&e.longitude&&e.latitude){var t=JSON.stringify({number:e.sNumber,info:e.name,machineId:e.number,location:$(".province").html()+" "+$('.terminalContent input[name="mapVal"]').val(),area:e.area,longitude:e.longitude,latitude:e.latitude,userNum:e.merchantsName,chargerPhone:e.headPhone,description:e.describe,max_ship:1==T.machinesource?$('.terminalContent input[name="max_ship"]').val()?Number($('.terminalContent input[name="max_ship"]').val()):null:1});Object(a.e)("正在编辑，请稍后"),Object(a.d)("/machine/updateMachine","post",sessionStorage.token,t,"mask").then(function(e){Object(a.m)(e.message,"success"),y()}).catch(function(e){console.log(e),Object(a.m)(e.message,"error")})}else Object(a.m)("带*为必填","warn")}),$(".remoteOperation").click(function(){Object(a.j)(".remoteCont",".remoteBox","top30"),1==T.actionStatus?$(".actionStatusBtn").hide():$(".businessBtn ").hide(),0==T.openStatus?$(".businessBtn p").html("营业"):$(".businessBtn p").html("暂停营业")}),$(".remoteBox").click(function(){event.stopPropagation()}),$(".remoteCont").click(function(){Object(a.b)(this,"top30")}),$(".businessBtn").click(function(){1==T.onlineStatus?hui.confirm(0==T.actionStatus?"确定营业？":"确定暂停营业？",["取消","确定"],function(){var e=0==T.actionStatus?"true":"false",t=0==T.openStatus?"1":"0";Object(a.e)("正在操作，请稍后"),Object(a.d)("/machine/getStatus","post",sessionStorage.token,JSON.stringify({machineId:T.machineId}),"mask").then(function(n){var i=n.data;1==i.actionStatus?Object(a.d)("/pushActive","post",sessionStorage.token,JSON.stringify({machine:T.machineId,action:e}),"mask").then(function(e){Object(a.m)(e.message,"warn")}).catch(function(e){console.log(e),"true"==e?Object(a.d)("/machine/activeMachine","post",sessionStorage.token,JSON.stringify({machineId:T.machineId,openStatus:t}),"mask").then(function(e){T=i,Object(a.m)("操作成功","success"),y(),0==T.openStatus?$(".businessBtn p").html("营业"):$(".businessBtn p").html("暂停营业"),$(".remoteCont").fadeOut(100).children(".remoteBox ").removeClass("top30"),Object(a.b)(".operationList","top0")}).catch(function(e){console.log(e),Object(a.m)("操作失败","error")}):Object(a.m)("操作失败","error")}):Object(a.m)("该设备未激活,无法进行营业操作","warn")}).catch(function(e){console.log(e),alert(1),Object(a.m)(e.message,"error")})},function(){}):Object(a.m)("售货机处于离线状态不可以操作此功能","warn")}),$(".actionStatusBtn").click(function(){hui.confirm("确定激活该售货机？",["取消","确定"],function(){Object(a.e)("正在激活，请稍后!"),Object(a.d)("/machine/activeMachine","post",sessionStorage.token,JSON.stringify({machineId:T.machineId,actionStatus:"1"}),"mask").then(function(e){Object(a.m)(e.message,"success"),T.actionStatus=1,$(".actionStatusBtn").hide(),$(".businessBtn ").show(),y()}).catch(function(e){Object(a.m)(e.message,"error")})},function(){})});new AMap.Map("machineMap",{resizeEnable:!0,zoom:15}),new AMap.Geocoder({city:""}),new AMap.Marker;var D=Object(a.c)().startTime,P=Object(a.c)().endTime;function L(e,t){Object(a.d)("/machine/getShippingList","post",sessionStorage.token,JSON.stringify({machineId:e,pageNum:t,pageSize:100,start_time:D,end_time:P,goods_Name:$('.shipmentContent input[name="goodsName"]').val(),order_code:$('.shipmentContent input[name="shipCode"]').val(),way:$('.shipmentContent input[name="shipWay"]').val()})).then(function(e){if(console.log(e),1==t){if(0==e.data.list.length)return $(".pages1").hide(),void $(".shipmenList").html("<h2>暂无数据</h2>");A(e.data.total,".pages1"),$(".pages1").show()}else $(".pages1").show();var n="";e.data.list.forEach(function(e){n+='<li>\n                    <div class="keyText flex">\n                        <label for="">出货时间:</label>\n                        <p>'.concat(e.create_time?Object(a.l)(e.create_time):"-",'</p>\n                    </div>\n                    <div class="keyText flex">\n                        <label for="">商品名(编号):</label>\n                        <p>').concat(e.good_name_core?e.good_name_core:"",'</p>\n                    </div>\n                    <div class="keyText flex">\n                        <label for="">出货状态:</label>\n                        <p>').concat(0==e.ship_status?"出货失败":1==e.ship_status?"出货成功":"货道故障",'</p>\n                    </div>\n                    <div class="keyText flex">\n                        <label for="">出货前数量:</label>\n                        <p>').concat(e.before_count,'</p>\n                    </div>\n                    <div class="keyText flex">\n                        <label for="">出货后数量:</label>\n                        <p>').concat(1==e.ship_status?e.before_count-1:e.before_count,'</p>\n                    </div>\n                    <div class="keyText flex">\n                        <label for="">出货类型:</label>\n                        <p>').concat(1==e.ship_type?"订单":"取货码",'</p>\n                    </div>\n                    <div class="keyText flex">\n                        <label for="">出货货道:</label>\n                        <p>').concat(e.way,'</p>\n                    </div>\n                    <div class="keyText flex">\n                        <label for="">订单号/取货码:</label>\n                        <p>').concat(e.order_code,"</p>\n                    </div>\n                </li>")}),$(".shipmenList").html(n)}).catch(function(e){console.log(e),Object(a.m)(e.message,"error")})}function A(e,t){var n=Number(e)/100;n=n%1==0?n:n+1;for(var a=Math.floor(n),i="",o=0;o<a;o++)i+=' <div class="pageVal '.concat(0==o?"hui-pager-active":"",'"  val="').concat(o+1,'"><a href="javascript:hui.toast(\'第').concat(o+1,"页');\" >").concat(o+1,"</a></div>");$("".concat(t," .hui-pager")).html(i)}$("#test08").val(Object(a.c)().keyTimeData),jeDate("#test08",{format:"YYYY-MM-DD",range:" - ",donefun:function(e){console.log(e);var t=e.val.split(" - ");D=t[0],P=t[1]},clearfun:function(e,t){D=Object(a.c)().startTime,P=Object(a.c)().endTime}}),$(".shipmentRd").click(function(){$(".shipmentContent .sHeader").html("".concat(T.info,"出货记录")),Object(a.j)(".shipmentContent",".shipmentBox","top0"),L(T.machineId,1)}),$(".shipmentContent .close").click(function(){Object(a.a)(this,"top0"),$(".hui-picker").hide()}),$(".pages1").on("click",".pageVal",function(){$(this).addClass("hui-pager-active").siblings().removeClass("hui-pager-active"),L(T.machineId,Number($(this).attr("val")))}),$(".Rrecord").click(function(){$(".rMentContent .rHeader").html("".concat(T.info,"补货记录")),Object(a.j)(".rMentContent",".rMentBox","top0"),F(T.machineId,1)}),$(".rMentContent .close").click(function(){Object(a.a)(this,"top0"),$(".hui-picker").hide()});var J=Object(a.c)().startTime,Y=Object(a.c)().endTime;function F(e,t){var n=JSON.stringify({machineId:e,pageNum:t,pageSize:100,start_time:J,end_time:Y,goods_Name:$('.rMentContent input[name="goodsName"]').val(),way:$('.rMentContent input[name="rMenWay"]').val()});Object(a.d)("/machine/getReplenish","post",sessionStorage.token,n).then(function(e){if(1==t){if(0==e.data.list.length)return $(".pages2").hide(),void $(".rMentList").html("<h2>暂无数据</h2>");A(e.data.total,".pages2"),$(".pages2").show()}else $(".pages2").show();var n="";e.data.list.forEach(function(e){n+='   <li>\n                        <div class="keyText flex">\n                            <label for="">补货人</label>\n                            <p>'.concat(e.name,"(").concat(e.username,')</p>\n                        </div>\n                        <div class="keyText flex">\n                            <label for="">补货时间:</label>\n                            <p>').concat(e.replenish_time?Object(a.l)(e.replenish_time):"-",'</p>\n                        </div>\n                        <div class="keyText flex">\n                            <label for="">补货货道:</label>\n                            <p>').concat(e.way,'</p>\n                        </div>\n                        <div class="keyText flex">\n                            <label for="">商品名(编号):</label>\n                            <p>').concat(e.good_name_core?e.good_name_core:"-",'</p>\n                        </div>\n                        <div class="keyText flex">\n                            <label for="">补货前数量:</label>\n                            <p>').concat(e.after_count-e.replenish_count,'</p>\n                        </div>\n                        <div class="keyText flex">\n                            <label for="">补货数量:</label>\n                            <p>').concat(e.replenish_count,'</p>\n                        </div>\n                        <div class="keyText flex">\n                            <label for="">补货后数量:</label>\n                            <p>').concat(e.after_count,"</p>\n                        </div>\n                    </li>")}),$(".rMentList").html(n)}).catch(function(e){console.log(e),Object(a.m)(e.message,"error")})}$("#test09").val(Object(a.c)().keyTimeData),jeDate("#test09",{format:"YYYY-MM-DD",range:" - ",donefun:function(e){console.log(e);var t=e.val.split(" - ");J=t[0],Y=t[1]},clearfun:function(e,t){J=Object(a.c)().startTime,Y=Object(a.c)().endTime}}),$(".pages2").on("click",".pageVal",function(){$(this).addClass("hui-pager-active").siblings().removeClass("hui-pager-active"),F(T.machineId,Number($(this).attr("val")))}),$(".salesDetails").click(function(){console.log(T),$(".salesContent .salesheader").html("".concat(T.info,"销售详情")),Object(a.j)(".salesContent",".salesBox","top0"),E(T.machineId,1)}),$(".salesContent .close").click(function(){Object(a.a)(this,"top0"),$(".hui-picker").hide()});var V=Object(a.c)().startTime,R=Object(a.c)().endTime;function E(e,t){var n=JSON.stringify({condition:e,pageNum:t,pageSize:100,conditionTwo:V,conditionThree:R,conditionSix:hui("#select1").val(),conditionSeven:hui("#select2").val()});Object(a.d)("/machine/getSalesList","post",sessionStorage.token,n).then(function(e){if(1==t){if(0==e.data.list.length)return $(".pages3").hide(),void $(".salesList").html("<h2>暂无数据</h2>");A(e.data.total,".pages3"),$(".pages3").show()}else $(".pages3").show();var n="";e.data.list.forEach(function(e){n+='<li>\n                    <div class="keyText flex">\n                        <label for="">时间:</label>\n                        <p>'.concat(Object(a.l)(e.time),'</p>\n                    </div>\n                    <div class="keyText flex">\n                        <label for="">订单号:</label>\n                        <p>').concat(e.number,'</p>\n                    </div>\n                    <div class="keyText flex">\n                        <label for="">支付状态:</label>\n                        <p>').concat(e.payResult,' </p>\n                    </div>\n                    <div class="keyText flex">\n                        <label for="">支付方式:</label>\n                        <p>').concat(e.payTypes,' </p>\n                    </div>\n                    <div class="keyText flex">\n                        <label for="">收款方:</label>\n                        <p>').concat(e.payee,'</p>\n                    </div>\n                    <div class="keyText flex">\n                        <label for="">金额:</label>\n                        <p>').concat(i(e.amount),"</p>\n                    </div>\n                </li>")}),$(".salesList").html(n)}).catch(function(e){console.log(e),Object(a.m)(e.message,"error")})}$("#test10").val(Object(a.c)().keyTimeData),jeDate("#test10",{format:"YYYY-MM-DD",range:" - ",donefun:function(e){console.log(e);var t=e.val.split(" - ");V=t[0],R=t[1],console.log(V,R)},clearfun:function(e,t){R=Object(a.c)().startTime,R=Object(a.c)().endTime}}),$(".pages3").on("click",".pageVal",function(){$(this).addClass("hui-pager-active").siblings().removeClass("hui-pager-active"),E(T.machineId,Number($(this).attr("val")))});var G=Object(a.n)(sessionStorage.machineID);$(".hui-icons-menu-point").click(function(){0!=G.length?Object(a.j)(".merchantsContent",".merchantsBox","top0"):Object(a.m)("您没有查看下级商户的权限","warn")}),$(".merchantsBox").click(function(){event.stopPropagation()}),$(".merchantsContent").click(function(){Object(a.b)(this,"top0")});var z='<ul class="sire">';!function e(t){$.each(t,function(t,a){a.children&&a.children.length?(z+='<li class="parent ">\n<img indexFlag="1" class="nextImg" src="'.concat(n(238),'" alt=""> \n<span class="').concat(0==t?"navFocus":"",'" mId="').concat(a.id,'">').concat(a.title,'</span>\n<ul class="parentOne">'),e(a.children),z+="</ul>"):z+='<li> <img src="'.concat(n(239),'" alt=""> <span mId="').concat(a.id,'">').concat(a.title,"</span>"),z+="</li>"})}(G),z+="</ul>",$(".merchantsBox").html(z),$(".merchantsBox").on("click",".parent span",function(){$(".merchantsBox .parent span").removeClass("navFocus"),$(this).addClass("navFocus"),m=Number($(this).attr("mId")),u=1,y()}),$(".merchantsBox").on("click",".nextImg",function(){1==$(this).attr("indexFlag")?($(this).attr("indexFlag",2),$(this).addClass("navImg")):($(this).attr("indexFlag",1),$(this).removeClass("navImg")),$(this).siblings(".parentOne").slideToggle()}),$(".openDoor").click(function(){Object(a.j)(".aloneContent",".aloneBox","top30")}),$(".aloneBox").click(function(){event.stopPropagation()}),$(".aloneContent").click(function(){Object(a.b)(this,"top30")}),$(".clearingBtn").click(function(){hui.confirm("清除货道故障?",["取消","确定"],function(){Object(a.e)("正在操作，请稍后"),Object(a.d)("/machine/clearLockMachineWay","post",sessionStorage.token,JSON.stringify({machineId:w}),"mask").then(function(e){Object(a.m)(e.message,"success")}).catch(function(e){Object(a.m)(e.message,"error")})})}),$(".undoAisleBtn").click(function(){hui.confirm("确定撤货？",["取消","确定"],function(){Object(a.e)("正在操作，请稍后"),Object(a.d)("/machine/removeGoodWay","post",sessionStorage.token,JSON.stringify({machineId:w}),"mask").then(function(e){Object(a.m)(e.message,"success"),Object(a.b)(".operationList","top0")}).catch(function(e){Object(a.m)(e.message,"error")})})}),$(".panelContent .close").click(function(){Object(a.a)(this,"top0"),$(".hui-picker").hide()});var W=null;function H(){Object(a.d)("/machine/getDisplayGood","post",sessionStorage.token,JSON.stringify({machineId:w})).then(function(e){console.log(e),function(e){var t="";e.forEach(function(e,n){t+='  <div class="hui-swipe-do ">\n            <div class="hui-swipe-do-doms ">\n                <div class="hui-swipe-do-content panelList" data-panelData=\''.concat(JSON.stringify(e),'\'>\n                    <div class=" flex">\n                        <img src="').concat(e.goods_images,'" alt="">\n                        <div class="panelRight">\n                            <h4>').concat(e.good_name_core,"</h4>\n                            <p><span>数量:</span>").concat(e.goodCount,"</p>\n                            <p><span>原数量:</span>").concat(e.oldGoodCount,'</p>\n                        </div>\n                    </div>\n                   \n                </div>\n                <div class="hui-swipe-do-btn delBtn" delIndex="').concat(n,'">移除</div>\n            </div>\n        </div>')}),$(".panelDrawing").html(t),hui.swipeDo()}(W=e.data)}).catch(function(e){Object(a.m)(e.message,"error")})}$(".panelDetails").click(function(){H(),Object(a.j)(".panelContent",".panelBox","top0")}),$(".panelDrawing").on("click",".delBtn",function(){var e=this;console.log($(this).attr("delIndex")),console.log(W[$(this).attr("delIndex")]),hui.confirm("确定移除？",["取消","确定"],function(){Object(a.e)("正在操作，请稍后");var t=JSON.stringify({machineId:w,goodId:W[$(e).attr("delIndex")].goods_Id});Object(a.d)("/machine/removeDisplayGoodCount","post",sessionStorage.token,t,"mask").then(function(e){Object(a.m)(e.message,"success"),H()}).catch(function(e){Object(a.m)(e.message,"error")})})});var q=null;function K(e,t){var n=JSON.stringify({pageNum:t,pageSize:100,condition:e,conditionFour:"1",conditionTwo:$('.goodsBody input[name="editName"]').val()});Object(a.d)("/goods/findAll","post",sessionStorage.token,n,"mask").then(function(e){if(1==t){if(0==e.data.list.length)return $(".pages4").hide(),void $(".goodsList").html('<h2 style="text-align: center;">暂无数据</h2>');A(e.data.total,".pages4"),$(".pages4").show()}else $(".pages4").show();var n="";e.data.list.forEach(function(e,t){n+='<div class="chooseList" mail="'.concat(e.mail,'" gID="').concat(e.goods_Id,'" gName="').concat(e.goods_Name,'">\n                                <div class="goodsImg">\n                                    <img src="').concat(e.goods_images,'"\n                                        alt="">\n                                </div>\n                                <div class="goodsInformation">\n                                    <p>').concat(1==e.mail?"(邮寄)"+e.goods_Name:e.goods_Name,"</p>\n                                    <p>").concat(e.classifyName,'</p>\n                                    <div class="flexThree">\n                                        <p>编号</p>\n                                        <span>').concat(e.goods_Core,'</span>\n                                    </div>\n                                    <div class="flexThree">\n                                        <p>销售价</p>\n                                        <span>').concat(i(e.goods_Price),"</span>\n                                    </div>\n                                </div>\n                            </div>")}),$(".goodsList").html(n)}).catch(function(e){Object(a.m)(e.message,"error")})}$(".addPanelBtn").click(function(){q=1,$('.editiAsleBody input[name="goodsName"]').attr("IVal",""),$('.editiAsleBody input[name="goodsName"]').val(""),$('.editiAsleBody input[name="goodsNum"]').val(""),Object(a.j)(".editAisleContent",".editAisleBox","top30")}),$(".panelDrawing").on("click",".panelList",function(){q=2;var e=$(this).data("paneldata");$('.editiAsleBody input[name="goodsName"]').attr("IVal",e.goods_Id),$('.editiAsleBody input[name="goodsName"]').val(e.good_name_core),$('.editiAsleBody input[name="goodsNum"]').val(e.goodCount),console.log($(this).data("paneldata")),Object(a.j)(".editAisleContent",".editAisleBox","top30")}),$(".editAisleBox .close").click(function(){Object(a.a)(this,"top30")}),$(".editAisleBox").click(function(){event.stopPropagation()}),$(".editAisleContent").click(function(){Object(a.b)(this,"top30")}),$(".editAisleContent .goodsChoose").click(function(){Object(a.j)(".goodsContnet",".goodsBox","top50"),K(m,1)}),$(".goodsContnet .close").click(function(){Object(a.a)(this,"top50")}),$(".goodsBox").click(function(){event.stopPropagation()}),$(".goodsContnet").click(function(){Object(a.b)(this,"top50")}),$(".goodsContnet .goodConfirmBtn").click(function(){K(m,1)}),$(".goodsWrap").on("click",".chooseList",function(){$('.editiAsleBody input[name="goodsName"]').val(1==$(this).attr("mail")?"(邮寄)"+$(this).attr("gName"):$(this).attr("gName")),$('.editiAsleBody input[name="goodsName"]').attr("IVal",$(this).attr("gID")),Object(a.a)(this,"top50")}),$(".pages4").on("click",".pageVal",function(){$(this).addClass("hui-pager-active").siblings().removeClass("hui-pager-active"),K(m,Number($(this).attr("val")))}),$(".editAisleBox  .panelConfirmBtn").click(function(){if($('.editAisleBox input[name="goodsName"]').val())if($('.editAisleBox input[name="goodsNum"]').val()){Object(a.e)("正在操作，请稍后");var e=1==q?"/machine/newDisplayGood":"/machine/updateDisplayGoodCount",t=JSON.stringify({machineId:T.machineId,goodId:Number($('.editiAsleBody input[name="goodsName"]').attr("IVal")),goodCount:Number($('.editAisleBox input[name="goodsNum"]').val())});Object(a.d)(e,"post",sessionStorage.token,t,"mask",".editAisleContent").then(function(e){Object(a.m)(e.message,"success"),H(),$('.editiAsleBody input[name="goodsName"]').attr("IVal",""),$('.editiAsleBody input[name="goodsName"]').val(""),$('.editiAsleBody input[name="goodsNum"]').val("")}).catch(function(e){Object(a.m)(e.message,"error")})}else Object(a.m)("请填写数量","warn");else Object(a.m)("请选择商品","warn")});var U=1;$(".salesContent .dowImg").click(function(){$(".salesContent .dowContent").slideToggle(),1==U?(U=2,$(this).children("img").addClass("active")):(U=1,$(this).children("img").removeClass("active"))}),$(".salesContent .keyConfirmBtn").click(function(){Object(a.k)(V,R)?Object(a.m)("时间选择范围最多三个月","warn"):E(T.machineId,1)});var Q=1;$(".shipmentContent .dowImg").click(function(){$(".shipmentContent .dowContent").slideToggle(),1==Q?(Q=2,$(this).children("img").addClass("active")):(Q=1,$(this).children("img").removeClass("active"))}),$(".shipmentContent .keyConfirmBtn").click(function(){if(Object(a.k)(D,P))Object(a.m)("时间选择范围最多三个月","warn");else{/^\d*$/.test($('.shipmentContent input[name="shipWay"]').val())?L(T.machineId,1):Object(a.m)("货道只能输入正整数","warn")}});var X=1;$(".rMentContent .dowImg").click(function(){$(".rMentContent .dowContent").slideToggle(),1==X?(X=2,$(this).children("img").addClass("active")):(X=1,$(this).children("img").removeClass("active"))}),$(".rMentContent .keyConfirmBtn").click(function(){if(Object(a.k)(J,Y))Object(a.m)("时间选择范围最多三个月","warn");else{/^\d*$/.test($('.rMentContent input[name="rMenWay"]').val())?F(T.machineId,1):Object(a.m)("货道只能输入正整数","warn")}}),$("#footer").load("M_footerNav.html")},658:function(e,t){}});