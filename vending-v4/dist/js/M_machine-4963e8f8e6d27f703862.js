/*! 版权所有，翻版必究 */!function(l){function e(e){for(var t,n,a=e[0],i=e[1],o=e[2],c=0,s=[];c<a.length;c++)n=a[c],Object.prototype.hasOwnProperty.call(d,n)&&d[n]&&s.push(d[n][0]),d[n]=0;for(t in i)Object.prototype.hasOwnProperty.call(i,t)&&(l[t]=i[t]);for(m&&m(e);s.length;)s.shift()();return u.push.apply(u,o||[]),r()}function r(){for(var e,t=0;t<u.length;t++){for(var n=u[t],a=!0,i=1;i<n.length;i++){var o=n[i];0!==d[o]&&(a=!1)}a&&(u.splice(t--,1),e=c(c.s=n[0]))}return e}var n={},d={4:0},u=[];function c(e){if(n[e])return n[e].exports;var t=n[e]={i:e,l:!1,exports:{}};return l[e].call(t.exports,t,t.exports,c),t.l=!0,t.exports}c.m=l,c.c=n,c.d=function(e,t,n){c.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},c.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},c.t=function(t,e){if(1&e&&(t=c(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(c.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var a in t)c.d(n,a,function(e){return t[e]}.bind(null,a));return n},c.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return c.d(t,"a",t),t},c.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},c.p="";var t=window.webpackJsonp=window.webpackJsonp||[],a=t.push.bind(t);t.push=e,t=t.slice();for(var i=0;i<t.length;i++)e(t[i]);var m=a;u.push([365,0]),r()}({365:function(e,t,a){"use strict";a.r(t);var t=a(437),i=a(0);$("#topHeader .back").click(function(){window.location.href="M_managementCenter.html"});var n=!1,o=!1,c=!1,s=!1,l=!1,r=!1;Object(i.h)("/role/findUserPermission","post",sessionStorage.token).then(function(e){e.data.forEach(function(e){"396"==e.id&&(n=!0),"392"==e.id&&(o=!0),"432"==e.id&&(c=!0),"427"==e.id&&(s=!0),e.id,"402"==e.id&&(l=!0),"456"==e.id&&(r=!0),e.id}),o?$(".remoteOperation").show():$(".remoteOperation").hide(),s?$(".aisleDetalis").show():$(".aisleDetalis").hide(),c?$(".paySetBtn").show():$(".paySetBtn").hide(),l?$(".shipmentRd").show():$(".shipmentRd").hide(),r?$(".Rrecord").show():$(".Rrecord").hide()}).catch(function(e){console.log(e)});var d=sessionStorage.machineID,u=1,m="",p="",h="",f="";var g=[],b=0;function v(e){var n="";e.forEach(function(e,t){n+='<div class="list myScale3d" machineid="'.concat(e.machineId,'" machineListIndex="').concat(b,'" merchantsId="').concat(e.userNum,'">\n                    <p class="info">').concat(e.info,'</p>\n                    <p class="address">').concat(e.location,'</p>\n                    <ul class="status flex">\n                        <li class="').concat(0==e.actionStatus?"colorG":"colorYes",'">').concat(0==e.actionStatus?"未激活":"已激活",'</li>\n                        <li class="').concat(0==e.onlineStatus?"colorNo":"colorYes",'" >').concat(0==e.onlineStatus?"离线":"在线",'</li>\n                        <li class="').concat(0==e.openStatus?"colorG":"colorYes",'">').concat(0==e.openStatus?"无营业":"正在营业","</li>\n\n                    </ul>\n                </div> "),b++}),$(".machineList").append(n)}hui.loadMore(function(){u++;var e=JSON.stringify({pageNum:u,pageSize:10,onlineStatus:p?Number(p):"",actionStatus:m?Number(m):"",openStatus:h?Number(h):"",stockStatus:f?Number(f):"",merchantId:d});Object(i.c)("/machine/getMachineList","post",sessionStorage.token,e,"mask").then(function(e){return $(".allmachine span").html(e.data.total),g=g.concat(e.data.list),O&&v(e.data.list),e.data.list.length<10?(hui.endLoadMore(!0,"已加载全部数据"),!1):void hui.endLoadMore()}).catch(function(e){Object(i.l)(e.message,"error"),hui.endLoadMore(!0,"已加载全部数据")})},"正在加载");var O=!1;function k(){hui.loading("加载中..."),g=[],u=1,b=0;var e=JSON.stringify({pageNum:u,pageSize:10,onlineStatus:p?Number(p):"",actionStatus:m?Number(m):"",openStatus:h?Number(h):"",stockStatus:f?Number(f):"",keyword:S,merchantId:d}),t=!1;Object(i.c)("/machine/getMachineList","post",sessionStorage.token,e,"mask").then(function(e){$(".allmachine span").html(e.data.total),$(".machineList").empty(),$(".machineList").html('<div class="hui-refresh-icon"></div>'),g=e.data.list,0<e.data.list.length&&(t=!0),O=!(e.data.list.length<10),t||$(".machineList").append('<div class="empty">查询无数据</div>'),v(e.data.list),hui.endRefresh(),hui.resetLoadMore()}).catch(function(e){t=!1,Object(i.l)(e.message,"error"),hui.endRefresh(),hui.resetLoadMore()})}hui.refresh("#machineList",k);var j="",y="",x="",C="",S="";$(".actionStatus li").click(function(){$(this).addClass("green").siblings().removeClass("green"),j=$(this).attr("actionIndex")}),$(".onlineStatus li").click(function(){$(this).addClass("yellow").siblings().removeClass("yellow"),y=$(this).attr("onlineIndex")}),$(".permissions li").click(function(){$(this).addClass("blue").siblings().removeClass("blue"),x=$(this).attr("permissionsIndex")}),$(".CreationTime li").click(function(){$(this).addClass("red").siblings().removeClass("red"),C=$(this).attr("CreationIndex")}),$(".KeyInput button").click(function(){m||$(".actionStatus li").eq(0).addClass("green").siblings().removeClass("green"),p||$(".onlineStatus li").eq(0).addClass("yellow").siblings().removeClass("yellow"),h||$(".permissions li").eq(0).addClass("blue").siblings().removeClass("blue"),f||$(".CreationTime li").eq(0).addClass("red").siblings().removeClass("red"),Object(i.j)(".conditionsCont",".conditionsHalf","top0")}),$(".conditionsHalf").click(function(){event.stopPropagation()}),$(".conditionsCont").click(function(){Object(i.b)(this,"top0")}),$(".conditionFooter .cancelBtn").click(function(){Object(i.a)(this,"top0")}),$(".conditionFooter .confirmBtn").click(function(){m=j,p=y,h=x,f=C,S=$('.KeyInput input[name="key"]').val(),k(),Object(i.a)(this,"top0")});var N=null,I=null;$(".machineList").on("click",".list",function(){Object(i.j)(".operationList",".operationBox","top0"),N=$(this).attr("machineid"),I=$(this).attr("machinelistindex"),console.log(I),$(".machineTitle").html(g[I].info+"终端信息"),w=g[I]}),$(".operationList .topHeader span").click(function(){Object(i.a)(this,"top0")}),$(".paySetBtn").click(function(){B(w.machineId,w.userNum),Object(i.j)(".collectionContent",".collectionBox","top30")}),$(".collectionContent .close").click(function(){Object(i.a)(this,"top30")}),$(".collectionContent").click(function(){Object(i.b)(this,"top30")}),$(".collectionBox").click(function(){event.stopPropagation()});function B(e,t){e=JSON.stringify({machineId:e});Object(i.c)("/pay/getMachinePayParam","post",sessionStorage.token,e).then(function(e){console.log(e),Object(i.c)("/pay/getPayParam","post",sessionStorage.token,JSON.stringify({merchantId:Number(t)})).then(function(t){var a="";e.data.forEach(function(n,e){1==n.status&&(a+='<div class="hui-form-items">\n                                    <div class="hui-form-items-title">'.concat(n.tName,'</div>\n                                    <div class="hui-form-radios" style="line-height:38px;">'),0==n.selectPay.length?a+='<input type="radio" value="'.concat("0-0",'" name="').concat(n.id,'"  id="').concat(n.id,'wu" checked  /><label for="').concat(n.id,'wu">无</label>'):a+='<input type="radio" value="'.concat(n.selectPay[0].mpId+"-0",'" name="').concat(n.id,'"  id="').concat(n.id,'wu" /><label for="').concat(n.id,'wu">无</label>'),t.data.forEach(function(e,t){n.id==e.payType&&(a+='<input type="radio" value="'.concat((0<n.selectPay.length?n.selectPay[0].mpId:0)+"-"+e.id,'" name="').concat(n.id,'"  id="').concat(e.id,'" ').concat(!(n.selectPay.length<=0)&&n.selectPay[0].paramId==e.id?"checked":"",' /><label for="').concat(e.id,'">').concat(e.payee,"</label>"))}),a+=" </div>\n                    </div>")}),$("#form1").html(a)}).catch(function(e){Object(i.l)(e.message,"error")})}).catch(function(e){console.log(e),Object(i.l)(e.message,"error")})}$(".aisleDetalis").click(function(){$(".childConten").show(),$(".childData").prop("src","M_machineChild.html"),$("#childData")[0].contentWindow}),sessionStorage.independentPass="";var w=null;$("#form1").on("change",'input[type="radio"]',function(){var t;c?(console.log($(this).val()),t=this,hui.confirm("确定修改收款账户？",["取消","确定"],function(){Object(i.d)("正在修改，请稍后！");var e=$(t).val().split("-"),e=JSON.stringify({machineId:N,paramId:Number(e[1]),mpId:Number(e[0])});Object(i.c)("/pay/updateMachinePayParam","post",sessionStorage.token,e,"mask").then(function(e){console.log(e),Object(i.l)(e.message,"success"),B(w.machineId,w.userNum)}).catch(function(e){Object(i.l)(e.message,"error"),B(w.machineId,w.userNum)})},function(){B(w.machineId,w.userNum)})):Object(i.l)("您没有修改收款账户得权限","warn")}),$(".operationNav .info").click(function(){Object(i.j)(".terminalContent",".terminalBox","top0"),console.log(g[I]),1!=w.openStatus&&n?($(".terminalContent input").prop("disabled",!1),$(".terminalContent .terminalFooter").show(),$('.terminalContent input[name="merchantsNametext"]').prop("disabled",!0),$('.terminalContent input[name="number"]').prop("disabled",!0),$('.terminalContent input[name="merchantsName"]').prop("disabled",!0)):(Object(i.l)(n?"温馨提示！该售货机正在营业，不可进行编辑！":"您没有编辑设备的权限","warn"),$(".terminalContent input").prop("disabled",!0),$(".terminalContent .terminalFooter").hide()),$('.terminalContent input[name="sNumber"]').val(w.number),$('.terminalContent input[name="name"]').val(w.info),$('.terminalContent input[name="number"]').val(w.machineId);var e=w.location.split(" ");$(".province").html(e[0]+" "+e[1]+" "+e[2]),$('.terminalContent input[name="mapVal"]').val(e[3]),$('.terminalContent input[name="area"]').val(w.area),$('.terminalContent input[name="longitude"]').val(w.longitude),$('.terminalContent input[name="latitude"]').val(w.latitude),$('.terminalContent input[name="headPhone"]').val(w.chargerPhone),$('.terminalContent input[name="describe"]').val(w.description),$('.terminalContent input[name="merchantsNametext"]').val(w.merchantName),$('.terminalContent input[name="merchantsName"]').val(w.userNum)}),$(".terminalContent .close").click(function(){Object(i.a)(this,"top0"),$(".hui-picker").hide()});var _=new huiPicker("#province",function(){var e=_.getText(0),t=_.getText(1),n=_.getText(2);hui("#province").html(e+" "+t+" "+n)});_.level=3,_.bindRelevanceData(cities),$(".terminalContent .confirmBtn").click(function(){var e=hui.getFormData("#form2");console.log(e),e.sNumber&&e.name&&e.number&&e.mapVal&&e.area&&e.merchantsName&&e.longitude&&e.latitude?(e=JSON.stringify({number:e.sNumber,info:e.name,machineId:e.number,location:$(".province").html()+" "+$('.terminalContent input[name="mapVal"]').val(),area:e.area,longitude:e.longitude,latitude:e.latitude,userNum:e.merchantsName,chargerPhone:e.headPhone,description:e.describe}),Object(i.d)("正在编辑，请稍后"),Object(i.c)("/machine/updateMachine","post",sessionStorage.token,e,"mask").then(function(e){Object(i.l)(e.message,"success"),k()}).catch(function(e){console.log(e),Object(i.l)(e.message,"error")})):Object(i.l)("带*为必填","warn")}),$(".remoteOperation").click(function(){Object(i.j)(".remoteCont",".remoteBox","top30"),(1==w.actionStatus?$(".actionStatusBtn"):$(".businessBtn ")).hide(),0==w.openStatus?$(".businessBtn p").html("营业"):$(".businessBtn p").html("暂停营业")}),$(".remoteBox").click(function(){event.stopPropagation()}),$(".remoteCont").click(function(){Object(i.b)(this,"top30")}),$(".businessBtn").click(function(){1==w.onlineStatus?hui.confirm(0==w.actionStatus?"确定营业？":"确定暂停营业？",["取消","确定"],function(){var n=0==w.actionStatus?"true":"false",a=0==w.openStatus?"1":"0";Object(i.d)("正在操作，请稍后"),Object(i.c)("/machine/getStatus","post",sessionStorage.token,JSON.stringify({machineId:w.machineId}),"mask").then(function(e){var t=e.data;1==t.actionStatus?Object(i.c)("/pushActive","post",sessionStorage.token,JSON.stringify({machine:w.machineId,action:n}),"mask").then(function(e){Object(i.l)(e.message,"warn")}).catch(function(e){console.log(e),"true"==e?Object(i.c)("/machine/activeMachine","post",sessionStorage.token,JSON.stringify({machineId:w.machineId,openStatus:a}),"mask").then(function(e){w=t,Object(i.l)("操作成功","success"),k(),0==w.openStatus?$(".businessBtn p").html("营业"):$(".businessBtn p").html("暂停营业"),$(".remoteCont").fadeOut(100).children(".remoteBox ").removeClass("top30"),Object(i.b)(".operationList","top0")}).catch(function(e){console.log(e),Object(i.l)("操作失败","error")}):Object(i.l)("操作失败","error")}):Object(i.l)("该设备未激活,无法进行营业操作","warn")}).catch(function(e){console.log(e),alert(1),Object(i.l)(e.message,"error")})},function(){}):Object(i.l)("售货机处于离线状态不可以操作此功能","warn")}),$(".actionStatusBtn").click(function(){hui.confirm("确定激活该售货机？",["取消","确定"],function(){Object(i.d)("正在激活，请稍后!"),Object(i.c)("/machine/activeMachine","post",sessionStorage.token,JSON.stringify({machineId:w.machineId,actionStatus:"1"}),"mask").then(function(e){Object(i.l)(e.message,"success"),w.actionStatus=1,$(".actionStatusBtn").hide(),$(".businessBtn ").show(),k()}).catch(function(e){Object(i.l)(e.message,"error")})},function(){})});new AMap.Map("machineMap",{resizeEnable:!0,zoom:15}),new AMap.Geocoder({city:""}),new AMap.Marker;$(".shipmentRd").click(function(){$(".shipmentContent .sHeader").html("".concat(w.info,"出货记录")),Object(i.j)(".shipmentContent",".shipmentBox","top0"),P(w.machineId,1)}),$(".shipmentContent .close").click(function(){Object(i.a)(this,"top0"),$(".hui-picker").hide()});var M=null,T=null;function P(e,n){e=JSON.stringify({machineId:e,pageNum:n,pageSize:10,start_time:M,end_time:T});Object(i.c)("/machine/getShippingList","post",sessionStorage.token,e).then(function(e){if(console.log(e),1==n){if(0==e.data.list.length)return $(".pages1").hide(),void $(".shipmenList").html("<h2>暂无数据</h2>");L(e.data.total,".pages1"),$(".pages1").show()}else $(".pages1").show();var t="";e.data.list.forEach(function(e){t+='<li>\n                    <div class="keyText flex">\n                        <label for="">出货时间:</label>\n                        <p>'.concat(e.create_time?Object(i.k)(e.create_time):"-",'</p>\n                    </div>\n                    <div class="keyText flex">\n                        <label for="">商品名:</label>\n                        <p>').concat(e.goods_Name,'</p>\n                    </div>\n                    <div class="keyText flex">\n                        <label for="">出货状态:</label>\n                        <p>').concat(0==e.ship_status?"出货失败":1==e.ship_status?"出货成功":"货道故障",'</p>\n                    </div>\n                    <div class="keyText flex">\n                        <label for="">出货前数量:</label>\n                        <p>').concat(e.before_count,'</p>\n                    </div>\n                    <div class="keyText flex">\n                        <label for="">出货后数量:</label>\n                        <p>').concat(1==e.ship_status?e.before_count-1:e.before_count,'</p>\n                    </div>\n                    <div class="keyText flex">\n                        <label for="">出货类型:</label>\n                        <p>').concat(1==e.ship_type?"订单":"取货码",'</p>\n                    </div>\n                    <div class="keyText flex">\n                        <label for="">出货货道:</label>\n                        <p>').concat(e.way,'</p>\n                    </div>\n                    <div class="keyText flex">\n                        <label for="">订单号/取货码:</label>\n                        <p>').concat(e.order_code,"</p>\n                    </div>\n                </li>")}),$(".shipmenList").html(t)}).catch(function(e){console.log(e),Object(i.l)(e.message,"error")})}function L(e,t){for(var e=(e=Number(e)/10)%1==0?e:e+1,n=Math.floor(e),a="",i=0;i<n;i++)a+=' <div class="pageVal '.concat(0==i?"hui-pager-active":"",'"  val="').concat(i+1,'"><a href="javascript:hui.toast(\'第').concat(i+1,"页');\" >").concat(i+1,"</a></div>");$("".concat(t," .hui-pager")).html(a)}jeDate("#test08",{format:"YYYY-MM-DD",range:" - ",donefun:function(e){console.log(e);e=e.val.split(" - ");M=e[0],T=e[1],P(w.machineId,1)},clearfun:function(){T=M=null,P(w.machineId,1)}}),$(".pages1").on("click",".pageVal",function(){$(this).addClass("hui-pager-active").siblings().removeClass("hui-pager-active"),P(w.machineId,Number($(this).attr("val")))}),$(".Rrecord").click(function(){$(".rMentContent .rHeader").html("".concat(w.info,"补货记录")),Object(i.j)(".rMentContent",".rMentBox","top0"),J(w.machineId,1)}),$(".rMentContent .close").click(function(){Object(i.a)(this,"top0"),$(".hui-picker").hide()});var D=null,A=null;function J(e,n){e=JSON.stringify({machineId:e,pageNum:n,pageSize:10,start_time:D,end_time:A});Object(i.c)("/machine/getReplenish","post",sessionStorage.token,e).then(function(e){if(1==n){if(0==e.data.list.length)return $(".pages2").hide(),void $(".rMentList").html("<h2>暂无数据</h2>");L(e.data.total,".pages2"),$(".pages2").show()}else $(".pages2").show();var t="";e.data.list.forEach(function(e){t+='   <li>\n                        <div class="keyText flex">\n                            <label for="">补货人</label>\n                            <p>'.concat(e.name,"(").concat(e.username,')</p>\n                        </div>\n                        <div class="keyText flex">\n                            <label for="">补货时间:</label>\n                            <p>').concat(e.replenish_time?Object(i.k)(e.replenish_time):"-",'</p>\n                        </div>\n                        <div class="keyText flex">\n                            <label for="">补货货道:</label>\n                            <p>').concat(e.way,'</p>\n                        </div>\n                        <div class="keyText flex">\n                            <label for="">商品名:</label>\n                            <p>').concat(e.goods_Name,'</p>\n                        </div>\n                        <div class="keyText flex">\n                            <label for="">补货前数量:</label>\n                            <p>').concat(e.after_count-e.replenish_count,'</p>\n                        </div>\n                        <div class="keyText flex">\n                            <label for="">补货数量:</label>\n                            <p>').concat(e.replenish_count,'</p>\n                        </div>\n                        <div class="keyText flex">\n                            <label for="">补货后数量:</label>\n                            <p>').concat(e.after_count,"</p>\n                        </div>\n                    </li>")}),$(".rMentList").html(t)}).catch(function(e){console.log(e),Object(i.l)(e.message,"error")})}jeDate("#test09",{format:"YYYY-MM-DD",range:" - ",donefun:function(e){console.log(e);e=e.val.split(" - ");D=e[0],A=e[1],J(w.machineId,1)},clearfun:function(){A=D=null,J(w.machineId,1)}}),$(".pages2").on("click",".pageVal",function(){$(this).addClass("hui-pager-active").siblings().removeClass("hui-pager-active"),J(w.machineId,Number($(this).attr("val")))}),$(".salesDetails").click(function(){console.log(w),$(".salesContent .salesheader").html("".concat(w.info,"销售详情")),Object(i.j)(".salesContent",".salesBox","top0"),V(w.machineId,1)}),$(".salesContent .close").click(function(){Object(i.a)(this,"top0"),$(".hui-picker").hide()});var Y=null,F=null;function V(e,n){e=JSON.stringify({condition:e,pageNum:n,pageSize:10,conditionTwo:Y,conditionThree:F});Object(i.c)("/machine/getSalesList","post",sessionStorage.token,e).then(function(e){if(1==n){if(0==e.data.list.length)return $(".pages3").hide(),void $(".salesList").html("<h2>暂无数据</h2>");L(e.data.total,".pages3"),$(".pages3").show()}else $(".pages3").show();var t="";e.data.list.forEach(function(e){t+='<li>\n                    <div class="keyText flex">\n                        <label for="">时间:</label>\n                        <p>'.concat(Object(i.k)(e.time),'</p>\n                    </div>\n                    <div class="keyText flex">\n                        <label for="">订单号:</label>\n                        <p>').concat(e.number,'</p>\n                    </div>\n                    <div class="keyText flex">\n                        <label for="">支付状态:</label>\n                        <p>').concat(e.payResult,' </p>\n                    </div>\n                    <div class="keyText flex">\n                        <label for="">支付方式:</label>\n                        <p>').concat(e.payTypes,' </p>\n                    </div>\n                    <div class="keyText flex">\n                        <label for="">收款方:</label>\n                        <p>').concat(e.payee,'</p>\n                    </div>\n                    <div class="keyText flex">\n                        <label for="">金额:</label>\n                        <p>').concat(e.amount,"</p>\n                    </div>\n                </li>")}),$(".salesList").html(t)}).catch(function(e){console.log(e),Object(i.l)(e.message,"error")})}jeDate("#test10",{format:"YYYY-MM-DD",range:" - ",donefun:function(e){console.log(e);e=e.val.split(" - ");Y=e[0],F=e[1],console.log(Y,F),V(w.machineId,1)},clearfun:function(){F=F=null,V(w.machineId,1)}}),$(".pages3").on("click",".pageVal",function(){$(this).addClass("hui-pager-active").siblings().removeClass("hui-pager-active"),V(w.machineId,Number($(this).attr("val")))});var R=Object(i.m)(sessionStorage.machineID);$(".hui-icons-menu-point").click(function(){0!=R.length?Object(i.j)(".merchantsContent",".merchantsBox","top0"):Object(i.l)("您没有查看下级商户的权限","warn")}),$(".merchantsBox").click(function(){event.stopPropagation()}),$(".merchantsContent").click(function(){Object(i.b)(this,"top0")});var E='<ul class="sire">';!function n(e){$.each(e,function(e,t){t.children&&t.children.length?(E+='<li class="parent "> <img indexFlag="1" class="nextImg" src="'.concat(a(133),'" alt=""> <span class="').concat(0==e?"navFocus":"",'" mId="').concat(t.id,'">').concat(t.title,'</span> <ul class="parentOne">'),n(t.children),E+="</ul>"):E+='<li> <img src="'.concat(a(134),'" alt=""> <span mId="').concat(t.id,'">').concat(t.title,"</span>"),E+="</li>"})}(R),E+="</ul>",$(".merchantsBox").html(E),$(".merchantsBox").on("click",".parent span",function(){$(".merchantsBox .parent span").removeClass("navFocus"),$(this).addClass("navFocus"),d=Number($(this).attr("mId")),u=1,k()}),$(".merchantsBox").on("click",".nextImg",function(){1==$(this).attr("indexFlag")?($(this).attr("indexFlag",2),$(this).addClass("navImg")):($(this).attr("indexFlag",1),$(this).removeClass("navImg")),$(this).siblings(".parentOne").slideToggle()}),$(".openDoor").click(function(){Object(i.j)(".aloneContent",".aloneBox","top30")}),$(".aloneBox").click(function(){event.stopPropagation()}),$(".aloneContent").click(function(){Object(i.b)(this,"top30")}),$(".clearingBtn").click(function(){hui.confirm("清除货道故障?",["取消","确定"],function(){Object(i.d)("正在操作，请稍后"),Object(i.c)("/machine/clearLockMachineWay","post",sessionStorage.token,JSON.stringify({machineId:N}),"mask").then(function(e){Object(i.l)(e.message,"success")}).catch(function(e){Object(i.l)(e.message,"error")})})}),$(".undoAisleBtn").click(function(){hui.confirm("确定撤货？",["取消","确定"],function(){Object(i.d)("正在操作，请稍后"),Object(i.c)("/machine/removeGoodWay","post",sessionStorage.token,JSON.stringify({machineId:N}),"mask").then(function(e){Object(i.l)(e.message,"success"),Object(i.b)(".operationList","top0")}).catch(function(e){Object(i.l)(e.message,"error")})})}),$(".panelContent .close").click(function(){Object(i.a)(this,"top0"),$(".hui-picker").hide()});var G=null;function z(){Object(i.c)("/machine/getDisplayGood","post",sessionStorage.token,JSON.stringify({machineId:N})).then(function(e){var n;console.log(e),G=e.data,n="",G.forEach(function(e,t){n+='  <div class="hui-swipe-do ">\n            <div class="hui-swipe-do-doms ">\n                <div class="hui-swipe-do-content panelList" data-panelData=\''.concat(JSON.stringify(e),'\'>\n                    <div class=" flex">\n                        <img src="').concat(e.goods_images,'" alt="">\n                        <div class="panelRight">\n                            <h4>').concat(e.goods_Name,"</h4>\n                            <p><span>数量:</span>").concat(e.goodCount,"</p>\n                            <p><span>原数量:</span>").concat(e.oldGoodCount,'</p>\n                        </div>\n                    </div>\n                   \n                </div>\n                <div class="hui-swipe-do-btn delBtn" delIndex="').concat(t,'">移除</div>\n            </div>\n        </div>')}),$(".panelDrawing").html(n),hui.swipeDo()}).catch(function(e){Object(i.l)(e.message,"error")})}$(".panelDetails").click(function(){z(),Object(i.j)(".panelContent",".panelBox","top0")}),$(".panelDrawing").on("click",".delBtn",function(){var t=this;console.log($(this).attr("delIndex")),console.log(G[$(this).attr("delIndex")]),hui.confirm("确定移除？",["取消","确定"],function(){Object(i.d)("正在操作，请稍后");var e=JSON.stringify({machineId:N,goodId:G[$(t).attr("delIndex")].goods_Id});Object(i.c)("/machine/removeDisplayGoodCount","post",sessionStorage.token,e,"mask").then(function(e){Object(i.l)(e.message,"success"),z()}).catch(function(e){Object(i.l)(e.message,"error")})})});var H=null;function q(e,t){e=JSON.stringify({pageNum:t,pageSize:10,condition:e,conditionFour:"1",conditionTwo:$('.goodsBody input[name="editName"]').val()});Object(i.c)("/goods/findAll","post",sessionStorage.token,e,"mask").then(function(e){if(1==t){if(0==e.data.list.length)return $(".pages4").hide(),void $(".goodsList").html('<h2 style="text-align: center;">暂无数据</h2>');L(e.data.total,".pages4"),$(".pages4").show()}else $(".pages4").show();var n="";e.data.list.forEach(function(e,t){n+='<div class="chooseList" mail="'.concat(e.mail,'" gID="').concat(e.goods_Id,'" gName="').concat(e.goods_Name,'">\n                                <div class="goodsImg">\n                                    <img src="').concat(e.goods_images,'"\n                                        alt="">\n                                </div>\n                                <div class="goodsInformation">\n                                    <p>').concat(1==e.mail?"(邮寄)"+e.goods_Name:e.goods_Name,"</p>\n                                    <p>").concat(e.classifyName,'</p>\n                                    <div class="flexThree">\n                                        <p>编号</p>\n                                        <span>').concat(e.goods_Core,'</span>\n                                    </div>\n                                    <div class="flexThree">\n                                        <p>销售价</p>\n                                        <span>￥').concat(e.goods_Price,"</span>\n                                    </div>\n                                </div>\n                            </div>")}),$(".goodsList").html(n)}).catch(function(e){Object(i.l)(e.message,"error")})}$(".addPanelBtn").click(function(){H=1,$('.editiAsleBody input[name="goodsName"]').attr("IVal",""),$('.editiAsleBody input[name="goodsName"]').val(""),$('.editiAsleBody input[name="goodsNum"]').val(""),Object(i.j)(".editAisleContent",".editAisleBox","top30")}),$(".panelDrawing").on("click",".panelList",function(){H=2;var e=$(this).data("paneldata");$('.editiAsleBody input[name="goodsName"]').attr("IVal",e.goods_Id),$('.editiAsleBody input[name="goodsName"]').val(e.goods_Name),$('.editiAsleBody input[name="goodsNum"]').val(e.goodCount),console.log($(this).data("paneldata")),Object(i.j)(".editAisleContent",".editAisleBox","top30")}),$(".editAisleBox .close").click(function(){Object(i.a)(this,"top30")}),$(".editAisleBox").click(function(){event.stopPropagation()}),$(".editAisleContent").click(function(){Object(i.b)(this,"top30")}),$(".editAisleContent .goodsChoose").click(function(){Object(i.j)(".goodsContnet",".goodsBox","top50"),q(d,1)}),$(".goodsContnet .goodConfirmBtn").click(function(){q(d,1)}),$(".goodsWrap").on("click",".chooseList",function(){$('.editiAsleBody input[name="goodsName"]').val(1==$(this).attr("mail")?"(邮寄)"+$(this).attr("gName"):$(this).attr("gName")),$('.editiAsleBody input[name="goodsName"]').attr("IVal",$(this).attr("gID")),Object(i.a)(this,"top50")}),$(".pages4").on("click",".pageVal",function(){$(this).addClass("hui-pager-active").siblings().removeClass("hui-pager-active"),q(d,Number($(this).attr("val")))}),$(".editAisleBox  .panelConfirmBtn").click(function(){var e,t;$('.editAisleBox input[name="goodsName"]').val()?$('.editAisleBox input[name="goodsNum"]').val()?(Object(i.d)("正在操作，请稍后"),e=1==H?"/machine/newDisplayGood":"/machine/updateDisplayGoodCount",t=JSON.stringify({machineId:w.machineId,goodId:Number($('.editiAsleBody input[name="goodsName"]').attr("IVal")),goodCount:Number($('.editAisleBox input[name="goodsNum"]').val())}),Object(i.c)(e,"post",sessionStorage.token,t,"mask",".editAisleContent").then(function(e){Object(i.l)(e.message,"success"),z(),$('.editiAsleBody input[name="goodsName"]').attr("IVal",""),$('.editiAsleBody input[name="goodsName"]').val(""),$('.editiAsleBody input[name="goodsNum"]').val("")}).catch(function(e){Object(i.l)(e.message,"error")})):Object(i.l)("请填写数量","warn"):Object(i.l)("请选择商品","warn")}),$("#footer").load("M_footerNav.html")},437:function(e,t){}});