/*! 版权所有，翻版必究 */!function(l){function e(e){for(var n,t,a=e[0],i=e[1],o=e[2],c=0,s=[];c<a.length;c++)t=a[c],Object.prototype.hasOwnProperty.call(u,t)&&u[t]&&s.push(u[t][0]),u[t]=0;for(n in i)Object.prototype.hasOwnProperty.call(i,n)&&(l[n]=i[n]);for(h&&h(e);s.length;)s.shift()();return d.push.apply(d,o||[]),r()}function r(){for(var e,n=0;n<d.length;n++){for(var t=d[n],a=!0,i=1;i<t.length;i++){var o=t[i];0!==u[o]&&(a=!1)}a&&(d.splice(n--,1),e=c(c.s=t[0]))}return e}var t={},u={3:0},d=[];function c(e){if(t[e])return t[e].exports;var n=t[e]={i:e,l:!1,exports:{}};return l[e].call(n.exports,n,n.exports,c),n.l=!0,n.exports}c.m=l,c.c=t,c.d=function(e,n,t){c.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:t})},c.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},c.t=function(n,e){if(1&e&&(n=c(n)),8&e)return n;if(4&e&&"object"==typeof n&&n&&n.__esModule)return n;var t=Object.create(null);if(c.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:n}),2&e&&"string"!=typeof n)for(var a in n)c.d(t,a,function(e){return n[e]}.bind(null,a));return t},c.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return c.d(n,"a",n),n},c.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},c.p="";var n=window.webpackJsonp=window.webpackJsonp||[],a=n.push.bind(n);n.push=e,n=n.slice();for(var i=0;i<n.length;i++)e(n[i]);var h=a;d.push([362,0]),r()}({362:function(e,n,a){"use strict";a.r(n);var n=a(435),i=a(0);$("#topHeader .back").click(function(){window.history.go(-1),window.location.href="M_managementCenter.html"});var t=!1,o=!1,c=!1,s=!1,l=!1,r=!1;Object(i.g)("/role/findUserPermission","post",sessionStorage.token).then(function(e){e.data.forEach(function(e){"396"==e.id&&(t=!0),"392"==e.id&&(o=!0),"432"==e.id&&(c=!0),"427"==e.id&&(s=!0),e.id,"402"==e.id&&(l=!0),"456"==e.id&&(r=!0),e.id}),o?$(".remoteOperation").show():$(".remoteOperation").hide(),s?$(".aisleDetalis").show():$(".aisleDetalis").hide(),c?$(".paySetBtn").show():$(".paySetBtn").hide(),l?$(".shipmentRd").show():$(".shipmentRd").hide(),r?$(".Rrecord").show():$(".Rrecord").hide()}).catch(function(e){console.log(e)});var u=sessionStorage.machineID,d=1,h="",p="",m="",f="";var g=[],b=0;function v(e){var t="";e.forEach(function(e,n){t+='<div class="list myScale3d" machineid="'.concat(e.machineId,'" machineListIndex="').concat(b,'" merchantsId="').concat(e.userNum,'">\n                    <p class="info">').concat(e.info,'</p>\n                    <p class="address">').concat(e.location,'</p>\n                    <ul class="status flex">\n                        <li class="').concat(0==e.actionStatus?"colorG":"colorYes",'">').concat(0==e.actionStatus?"未激活":"已激活",'</li>\n                        <li class="').concat(0==e.onlineStatus?"colorNo":"colorYes",'" >').concat(0==e.onlineStatus?"离线":"在线",'</li>\n                        <li class="').concat(0==e.openStatus?"colorG":"colorYes",'">').concat(0==e.openStatus?"无营业":"正在营业","</li>\n\n                    </ul>\n                </div> "),b++}),$(".machineList").append(t)}hui.loadMore(function(){d++;var e=JSON.stringify({pageNum:d,pageSize:10,onlineStatus:p?Number(p):"",actionStatus:h?Number(h):"",openStatus:m?Number(m):"",stockStatus:f?Number(f):"",merchantId:u});Object(i.c)("/machine/getMachineList","post",sessionStorage.token,e,"mask").then(function(e){return $(".allmachine span").html(e.data.total),g=g.concat(e.data.list),k&&v(e.data.list),e.data.list.length<10?(hui.endLoadMore(!0,"已加载全部数据"),!1):void hui.endLoadMore()}).catch(function(e){Object(i.k)(e.message,"error"),hui.endLoadMore(!0,"已加载全部数据")})},"正在加载");var k=!1;function O(){hui.loading("加载中..."),g=[],d=1,b=0;var e=JSON.stringify({pageNum:d,pageSize:10,onlineStatus:p?Number(p):"",actionStatus:h?Number(h):"",openStatus:m?Number(m):"",stockStatus:f?Number(f):"",keyword:C,merchantId:u}),n=!1;Object(i.c)("/machine/getMachineList","post",sessionStorage.token,e,"mask").then(function(e){$(".allmachine span").html(e.data.total),$(".machineList").empty(),$(".machineList").html('<div class="hui-refresh-icon"></div>'),g=e.data.list,0<e.data.list.length&&(n=!0),k=!(e.data.list.length<10),n||$(".machineList").append('<div class="empty">查询无数据</div>'),v(e.data.list),hui.endRefresh(),hui.resetLoadMore()}).catch(function(e){n=!1,Object(i.k)(e.message,"error"),hui.endRefresh(),hui.resetLoadMore()})}hui.refresh("#machineList",O);var j="",y="",x="",S="",C="";$(".actionStatus li").click(function(){$(this).addClass("green").siblings().removeClass("green"),j=$(this).attr("actionIndex")}),$(".onlineStatus li").click(function(){$(this).addClass("yellow").siblings().removeClass("yellow"),y=$(this).attr("onlineIndex")}),$(".permissions li").click(function(){$(this).addClass("blue").siblings().removeClass("blue"),x=$(this).attr("permissionsIndex")}),$(".CreationTime li").click(function(){$(this).addClass("red").siblings().removeClass("red"),S=$(this).attr("CreationIndex")}),$(".KeyInput button").click(function(){h||$(".actionStatus li").eq(0).addClass("green").siblings().removeClass("green"),p||$(".onlineStatus li").eq(0).addClass("yellow").siblings().removeClass("yellow"),m||$(".permissions li").eq(0).addClass("blue").siblings().removeClass("blue"),f||$(".CreationTime li").eq(0).addClass("red").siblings().removeClass("red"),Object(i.i)(".conditionsCont",".conditionsHalf","top0")}),$(".conditionsHalf").click(function(){event.stopPropagation()}),$(".conditionsCont").click(function(){Object(i.b)(this,"top0")}),$(".conditionFooter .cancelBtn").click(function(){Object(i.a)(this,"top0")}),$(".conditionFooter .confirmBtn").click(function(){h=j,p=y,m=x,f=S,C=$('.KeyInput input[name="key"]').val(),O(),Object(i.a)(this,"top0")});var I=null,N=null;$(".machineList").on("click",".list",function(){Object(i.i)(".operationList",".operationBox","top0"),I=$(this).attr("machineid"),N=$(this).attr("machinelistindex"),console.log(N),$(".machineTitle").html(g[N].info+"终端信息"),M=g[N]}),$(".operationList .topHeader span").click(function(){Object(i.a)(this,"top0")}),$(".paySetBtn").click(function(){w(M.machineId,M.userNum),Object(i.i)(".collectionContent",".collectionBox","top30")}),$(".collectionContent .close").click(function(){Object(i.a)(this,"top30")}),$(".collectionContent").click(function(){Object(i.b)(this,"top30")}),$(".collectionBox").click(function(){event.stopPropagation()});function w(e,n){e=JSON.stringify({machineId:e});Object(i.c)("/pay/getMachinePayParam","post",sessionStorage.token,e).then(function(e){console.log(e),Object(i.c)("/pay/getPayParam","post",sessionStorage.token,JSON.stringify({merchantId:Number(n)})).then(function(n){var a="";e.data.forEach(function(t,e){1==t.status&&(a+='<div class="hui-form-items">\n                                    <div class="hui-form-items-title">'.concat(t.tName,'</div>\n                                    <div class="hui-form-radios" style="line-height:38px;">'),0==t.selectPay.length?a+='<input type="radio" value="'.concat("0-0",'" name="').concat(t.id,'"  id="').concat(t.id,'wu" checked  /><label for="').concat(t.id,'wu">无</label>'):a+='<input type="radio" value="'.concat(t.selectPay[0].mpId+"-0",'" name="').concat(t.id,'"  id="').concat(t.id,'wu" /><label for="').concat(t.id,'wu">无</label>'),n.data.forEach(function(e,n){t.id==e.payType&&(a+='<input type="radio" value="'.concat((0<t.selectPay.length?t.selectPay[0].mpId:0)+"-"+e.id,'" name="').concat(t.id,'"  id="').concat(e.id,'" ').concat(!(t.selectPay.length<=0)&&t.selectPay[0].paramId==e.id?"checked":"",' /><label for="').concat(e.id,'">').concat(e.payee,"</label>"))}),a+=" </div>\n                    </div>")}),$("#form1").html(a)}).catch(function(e){Object(i.k)(e.message,"error")})}).catch(function(e){console.log(e),Object(i.k)(e.message,"error")})}$(".aisleDetalis").click(function(){$(".childConten").show(),$(".childData").prop("src","M_machineChild.html"),$("#childData")[0].contentWindow}),sessionStorage.independentPass="";var M=null;$("#form1").on("change",'input[type="radio"]',function(){var n;c?(console.log($(this).val()),n=this,hui.confirm("确定修改收款账户？",["取消","确定"],function(){Object(i.d)("正在修改，请稍后！");var e=$(n).val().split("-"),e=JSON.stringify({machineId:I,paramId:Number(e[1]),mpId:Number(e[0])});Object(i.c)("/pay/updateMachinePayParam","post",sessionStorage.token,e,"mask").then(function(e){console.log(e),Object(i.k)(e.message,"success"),w(M.machineId,M.userNum)}).catch(function(e){Object(i.k)(e.message,"error"),w(M.machineId,M.userNum)})},function(){w(M.machineId,M.userNum)})):Object(i.k)("您没有修改收款账户得权限","warn")}),$(".operationNav .info").click(function(){Object(i.i)(".terminalContent",".terminalBox","top0"),console.log(g[N]),1!=M.openStatus&&t?($(".terminalContent input").prop("disabled",!1),$(".terminalContent .terminalFooter").show(),$('.terminalContent input[name="merchantsNametext"]').prop("disabled",!0),$('.terminalContent input[name="number"]').prop("disabled",!0),$('.terminalContent input[name="merchantsName"]').prop("disabled",!0)):(Object(i.k)(t?"温馨提示！该售货机正在营业，不可进行编辑！":"您没有编辑设备的权限","warn"),$(".terminalContent input").prop("disabled",!0),$(".terminalContent .terminalFooter").hide()),$('.terminalContent input[name="sNumber"]').val(M.number),$('.terminalContent input[name="name"]').val(M.info),$('.terminalContent input[name="number"]').val(M.machineId);var e=M.location.split(" ");$(".province").html(e[0]+" "+e[1]+" "+e[2]),$('.terminalContent input[name="mapVal"]').val(e[3]),$('.terminalContent input[name="area"]').val(M.area),$('.terminalContent input[name="longitude"]').val(M.longitude),$('.terminalContent input[name="latitude"]').val(M.latitude),$('.terminalContent input[name="headPhone"]').val(M.chargerPhone),$('.terminalContent input[name="describe"]').val(M.description),$('.terminalContent input[name="merchantsNametext"]').val(M.merchantName),$('.terminalContent input[name="merchantsName"]').val(M.userNum)}),$(".terminalContent .close").click(function(){Object(i.a)(this,"top0"),$(".hui-picker").hide()});var B=new huiPicker("#province",function(){var e=B.getText(0),n=B.getText(1),t=B.getText(2);hui("#province").html(e+" "+n+" "+t)});B.level=3,B.bindRelevanceData(cities),$(".terminalContent .confirmBtn").click(function(){var e=hui.getFormData("#form2");console.log(e),e.sNumber&&e.name&&e.number&&e.mapVal&&e.area&&e.merchantsName&&e.longitude&&e.latitude?(e=JSON.stringify({number:e.sNumber,info:e.name,machineId:e.number,location:$(".province").html()+" "+$('.terminalContent input[name="mapVal"]').val(),area:e.area,longitude:e.longitude,latitude:e.latitude,userNum:e.merchantsName,chargerPhone:e.headPhone,description:e.describe}),Object(i.d)("正在编辑，请稍后"),Object(i.c)("/machine/updateMachine","post",sessionStorage.token,e,"mask").then(function(e){Object(i.k)(e.message,"success"),O()}).catch(function(e){console.log(e),Object(i.k)(e.message,"error")})):Object(i.k)("带*为必填","warn")}),$(".remoteOperation").click(function(){Object(i.i)(".remoteCont",".remoteBox","top30"),(1==M.actionStatus?$(".actionStatusBtn"):$(".businessBtn ")).hide(),0==M.openStatus?$(".businessBtn p").html("营业"):$(".businessBtn p").html("暂停营业")}),$(".remoteBox").click(function(){event.stopPropagation()}),$(".remoteCont").click(function(){Object(i.b)(this,"top30")}),$(".businessBtn").click(function(){1==M.onlineStatus?hui.confirm(0==M.actionStatus?"确定营业？":"确定暂停营业？",["取消","确定"],function(){var t=0==M.actionStatus?"true":"false",a=0==M.openStatus?"1":"0";Object(i.d)("正在操作，请稍后"),Object(i.c)("/machine/getStatus","post",sessionStorage.token,JSON.stringify({machineId:M.machineId}),"mask").then(function(e){var n=e.data;1==n.actionStatus?Object(i.c)("/pushActive","post",sessionStorage.token,JSON.stringify({machine:M.machineId,action:t}),"mask").then(function(e){Object(i.k)(e.message,"warn")}).catch(function(e){console.log(e),"true"==e?Object(i.c)("/machine/activeMachine","post",sessionStorage.token,JSON.stringify({machineId:M.machineId,openStatus:a}),"mask").then(function(e){M=n,Object(i.k)("操作成功","success"),O(),0==M.openStatus?$(".businessBtn p").html("营业"):$(".businessBtn p").html("暂停营业"),$(".remoteCont").fadeOut(100).children(".remoteBox ").removeClass("top30"),Object(i.b)(".operationList","top0")}).catch(function(e){console.log(e),Object(i.k)("操作失败","error")}):Object(i.k)("操作失败","error")}):Object(i.k)("该设备未激活,无法进行营业操作","warn")}).catch(function(e){console.log(e),alert(1),Object(i.k)(e.message,"error")})},function(){}):Object(i.k)("售货机处于离线状态不可以操作此功能","warn")}),$(".actionStatusBtn").click(function(){hui.confirm("确定激活该售货机？",["取消","确定"],function(){Object(i.d)("正在激活，请稍后!"),Object(i.c)("/machine/activeMachine","post",sessionStorage.token,JSON.stringify({machineId:M.machineId,actionStatus:"1"}),"mask").then(function(e){Object(i.k)(e.message,"success"),M.actionStatus=1,$(".actionStatusBtn").hide(),$(".businessBtn ").show(),O()}).catch(function(e){Object(i.k)(e.message,"error")})},function(){})});new AMap.Map("machineMap",{resizeEnable:!0,zoom:15}),new AMap.Geocoder({city:""}),new AMap.Marker;$(".shipmentRd").click(function(){$(".shipmentContent .sHeader").html("".concat(M.info,"出货记录")),Object(i.i)(".shipmentContent",".shipmentBox","top0"),P(M.machineId,1)}),$(".shipmentContent .close").click(function(){Object(i.a)(this,"top0"),$(".hui-picker").hide()});var _=null,T=null;function P(e,t){e=JSON.stringify({machineId:e,pageNum:t,pageSize:10,start_time:_,end_time:T});Object(i.c)("/machine/getShippingList","post",sessionStorage.token,e).then(function(e){if(console.log(e),1==t){if(0==e.data.list.length)return $(".pages1").hide(),void $(".shipmenList").html("<h2>暂无数据</h2>");L(e.data.total,".pages1"),$(".pages1").show()}else $(".pages1").show();var n="";e.data.list.forEach(function(e){n+='<li>\n                    <div class="keyText flex">\n                        <label for="">出货时间:</label>\n                        <p>'.concat(e.create_time?Object(i.j)(e.create_time):"-",'</p>\n                    </div>\n                    <div class="keyText flex">\n                        <label for="">商品名:</label>\n                        <p>').concat(0!=e.good_info.length?e.good_info[0].goods_Name:"-",'</p>\n                    </div>\n                    <div class="keyText flex">\n                        <label for="">出货状态:</label>\n                        <p>').concat(0==e.ship_status?"出货失败":1==e.ship_status?"出货成功":"货道故障",'</p>\n                    </div>\n                    <div class="keyText flex">\n                        <label for="">出货前数量:</label>\n                        <p>').concat(e.before_count,'</p>\n                    </div>\n                    <div class="keyText flex">\n                        <label for="">出货后数量:</label>\n                        <p>').concat(1==e.ship_status?e.before_count-1:e.before_count,'</p>\n                    </div>\n                    <div class="keyText flex">\n                        <label for="">出货类型:</label>\n                        <p>').concat(1==e.ship_type?"订单":"取货码",'</p>\n                    </div>\n                    <div class="keyText flex">\n                        <label for="">出货货道:</label>\n                        <p>').concat(e.way,'</p>\n                    </div>\n                    <div class="keyText flex">\n                        <label for="">订单号/取货码:</label>\n                        <p>').concat(e.order_code,"</p>\n                    </div>\n                </li>")}),$(".shipmenList").html(n)}).catch(function(e){console.log(e),Object(i.k)(e.message,"error")})}function L(e,n){e=(e=Number(e)/10)%1==0?e:e+1;console.log(Math.floor(e));for(var t=Math.floor(e),a="",i=0;i<t;i++)a+=' <div class="pageVal '.concat(0==i?"hui-pager-active":"",'"  val="').concat(i+1,'"><a href="javascript:hui.toast(\'第').concat(i+1,"页');\" >").concat(i+1,"</a></div>");$("".concat(n," .hui-pager")).html(a)}jeDate("#test08",{format:"YYYY-MM-DD",range:" - ",donefun:function(e){console.log(e);e=e.val.split(" - ");_=e[0],T=e[1],P(M.machineId,1)},clearfun:function(){T=_=null,P(M.machineId,1)}}),$(".pages1").on("click",".pageVal",function(){$(this).addClass("hui-pager-active").siblings().removeClass("hui-pager-active"),P(M.machineId,Number($(this).attr("val")))}),$(".Rrecord").click(function(){$(".rMentContent .rHeader").html("".concat(M.info,"补货记录")),Object(i.i)(".rMentContent",".rMentBox","top0"),Y(M.machineId,1)}),$(".rMentContent .close").click(function(){Object(i.a)(this,"top0"),$(".hui-picker").hide()});var D=null,J=null;function Y(e,t){e=JSON.stringify({machineId:e,pageNum:t,pageSize:10,start_time:D,end_time:J});Object(i.c)("/machine/getReplenish","post",sessionStorage.token,e).then(function(e){if(1==t){if(0==e.data.list.length)return $(".pages2").hide(),void $(".rMentList").html("<h2>暂无数据</h2>");L(e.data.total,".pages2"),$(".pages2").show()}else $(".pages2").show();var n="";e.data.list.forEach(function(e){n+='   <li>\n                        <div class="keyText flex">\n                            <label for="">补货人</label>\n                            <p>'.concat(e.name,"(").concat(e.username,')</p>\n                        </div>\n                        <div class="keyText flex">\n                            <label for="">补货时间:</label>\n                            <p>').concat(e.replenish_time?Object(i.j)(e.replenish_time):"-",'</p>\n                        </div>\n                        <div class="keyText flex">\n                            <label for="">补货货道:</label>\n                            <p>').concat(e.way,'</p>\n                        </div>\n                        <div class="keyText flex">\n                            <label for="">商品名:</label>\n                            <p>').concat(0!=e.good_info.length?e.good_info[0].goods_Name:"-",'</p>\n                        </div>\n                        <div class="keyText flex">\n                            <label for="">补货前数量:</label>\n                            <p>').concat(e.after_count-e.replenish_count,'</p>\n                        </div>\n                        <div class="keyText flex">\n                            <label for="">补货数量:</label>\n                            <p>').concat(e.replenish_count,'</p>\n                        </div>\n                        <div class="keyText flex">\n                            <label for="">补货后数量:</label>\n                            <p>').concat(e.after_count,"</p>\n                        </div>\n                    </li>")}),$(".rMentList").html(n)}).catch(function(e){console.log(e),Object(i.k)(e.message,"error")})}jeDate("#test09",{format:"YYYY-MM-DD",range:" - ",donefun:function(e){console.log(e);e=e.val.split(" - ");D=e[0],J=e[1],Y(M.machineId,1)},clearfun:function(){J=D=null,Y(M.machineId,1)}}),$(".pages2").on("click",".pageVal",function(){$(this).addClass("hui-pager-active").siblings().removeClass("hui-pager-active"),Y(M.machineId,Number($(this).attr("val")))}),$(".salesDetails").click(function(){console.log(M),$(".salesContent .salesheader").html("".concat(M.info,"销售详情")),Object(i.i)(".salesContent",".salesBox","top0"),E(M.machineId,1)}),$(".salesContent .close").click(function(){Object(i.a)(this,"top0"),$(".hui-picker").hide()});var F=null,R=null;function E(e,t){e=JSON.stringify({condition:e,pageNum:t,pageSize:10,conditionTwo:F,conditionThree:R});Object(i.c)("/machine/getSalesList","post",sessionStorage.token,e).then(function(e){if(1==t){if(0==e.data.list.length)return $(".pages3").hide(),void $(".salesList").html("<h2>暂无数据</h2>");L(e.data.total,".pages3"),$(".pages3").show()}else $(".pages3").show();var n="";e.data.list.forEach(function(e){n+='<li>\n                    <div class="keyText flex">\n                        <label for="">时间:</label>\n                        <p>'.concat(Object(i.j)(e.time),'</p>\n                    </div>\n                    <div class="keyText flex">\n                        <label for="">订单号:</label>\n                        <p>').concat(e.number,'</p>\n                    </div>\n                    <div class="keyText flex">\n                        <label for="">支付状态:</label>\n                        <p>').concat(e.payResult,' </p>\n                    </div>\n                    <div class="keyText flex">\n                        <label for="">支付方式:</label>\n                        <p>').concat(e.payTypes,' </p>\n                    </div>\n                    <div class="keyText flex">\n                        <label for="">收款方:</label>\n                        <p>').concat(e.payee,'</p>\n                    </div>\n                    <div class="keyText flex">\n                        <label for="">金额:</label>\n                        <p>').concat(e.amount,"</p>\n                    </div>\n                </li>")}),$(".salesList").html(n)}).catch(function(e){console.log(e),Object(i.k)(e.message,"error")})}jeDate("#test10",{format:"YYYY-MM-DD",range:" - ",donefun:function(e){console.log(e);e=e.val.split(" - ");F=e[0],R=e[1],console.log(F,R),E(M.machineId,1)},clearfun:function(){R=R=null,E(M.machineId,1)}}),$(".pages3").on("click",".pageVal",function(){$(this).addClass("hui-pager-active").siblings().removeClass("hui-pager-active"),E(M.machineId,Number($(this).attr("val")))});var z=Object(i.l)(sessionStorage.machineID);$(".hui-icons-menu-point").click(function(){0!=z.length?Object(i.i)(".merchantsContent",".merchantsBox","top0"):Object(i.k)("您没有查看下级商户的权限","warn")}),$(".merchantsBox").click(function(){event.stopPropagation()}),$(".merchantsContent").click(function(){Object(i.b)(this,"top0")}),console.log(z);var G='<ul class="sire">';!function t(e){$.each(e,function(e,n){n.children&&n.children.length?(G+='<li class="parent "> <img indexFlag="1" class="nextImg" src="'.concat(a(363),'" alt=""> <span class="').concat(0==e?"navFocus":"",'" mId="').concat(n.id,'">').concat(n.title,'</span> <ul class="parentOne">'),t(n.children),G+="</ul>"):G+='<li> <img src="'.concat(a(364),'" alt=""> <span mId="').concat(n.id,'">').concat(n.title,"</span>"),G+="</li>"})}(z),G+="</ul>",$(".merchantsBox").html(G),$(".merchantsBox").on("click",".parent span",function(){$(".merchantsBox .parent span").removeClass("navFocus"),$(this).addClass("navFocus"),u=Number($(this).attr("mId")),d=1,O()}),$(".merchantsBox").on("click",".nextImg",function(){1==$(this).attr("indexFlag")?($(this).attr("indexFlag",2),$(this).addClass("navImg")):($(this).attr("indexFlag",1),$(this).removeClass("navImg")),$(this).siblings(".parentOne").slideToggle()}),$(".openDoor").click(function(){Object(i.i)(".aloneContent",".aloneBox","top30")}),$(".aloneBox").click(function(){event.stopPropagation()}),$(".aloneContent").click(function(){Object(i.b)(this,"top30")}),$(".clearingBtn").click(function(){hui.confirm("清除货道故障?",["取消","确定"],function(){Object(i.d)("正在操作，请稍后"),Object(i.c)("/machine/clearLockMachineWay","post",sessionStorage.token,JSON.stringify({machineId:I}),"mask").then(function(e){Object(i.k)(e.message,"success")}).catch(function(e){Object(i.k)(e.message,"error")})})}),$(".undoAisleBtn").click(function(){hui.confirm("确定撤货？",["取消","确定"],function(){Object(i.d)("正在操作，请稍后"),Object(i.c)("/machine/removeGoodWay","post",sessionStorage.token,JSON.stringify({machineId:I}),"mask").then(function(e){Object(i.k)(e.message,"success"),Object(i.b)(".operationList","top0")}).catch(function(e){Object(i.k)(e.message,"error")})})});var V=null;function H(){Object(i.c)("/machine/getDisplayGood","post",sessionStorage.token,JSON.stringify({machineId:I})).then(function(e){var t;console.log(e),V=e.data,t="",V.forEach(function(e,n){t+='  <div class="hui-swipe-do ">\n            <div class="hui-swipe-do-doms ">\n                <div class="hui-swipe-do-content panelList">\n                    <div class=" flex">\n                        <img src="'.concat(e.goods_images,'" alt="">\n                        <div class="panelRight">\n                            <h4>').concat(e.goods_Name,"</h4>\n                            <p><span>数量:</span>").concat(e.goodCount,"</p>\n                            <p><span>原数量:</span>").concat(e.oldGoodCount,'</p>\n                        </div>\n                    </div>\n                   \n                </div>\n                <div class="hui-swipe-do-btn delBtn" delIndex="').concat(n,'">移除</div>\n            </div>\n        </div>')}),$(".panelDrawing").html(t),hui.swipeDo()}).catch(function(e){Object(i.k)(e.message,"error")})}$(".panelDetails").click(function(){H(),Object(i.i)(".panelContent",".panelBox","top0")}),$(".panelDrawing").on("click",".delBtn",function(){var n=this;console.log($(this).attr("delIndex")),console.log(V[$(this).attr("delIndex")]),hui.confirm("确定移除？",["取消","确定"],function(){Object(i.d)("正在操作，请稍后");var e=JSON.stringify({machineId:I,goodId:V[$(n).attr("delIndex")].goods_Id});Object(i.c)("/machine/removeDisplayGoodCount","post",sessionStorage.token,e,"mask").then(function(e){Object(i.k)(e.message,"success"),H()}).catch(function(e){Object(i.k)(e.message,"error")})})}),$("#footer").load("M_footerNav.html")},363:function(e,n,t){e.exports=t.p+"image/2972e46c9f26e4346ef98af5e8d8e621.png"},364:function(e,n,t){e.exports=t.p+"image/24901e2c42ab561266dda6611e0a8db2.png"},435:function(e,n){}});