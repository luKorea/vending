/*! 版权所有，翻版必究 */!function(c){function e(e){for(var t,a,n=e[0],i=e[1],o=e[2],s=0,l=[];s<n.length;s++)a=n[s],Object.prototype.hasOwnProperty.call(r,a)&&r[a]&&l.push(r[a][0]),r[a]=0;for(t in i)Object.prototype.hasOwnProperty.call(i,t)&&(c[t]=i[t]);for(p&&p(e);l.length;)l.shift()();return u.push.apply(u,o||[]),d()}function d(){for(var e,t=0;t<u.length;t++){for(var a=u[t],n=!0,i=1;i<a.length;i++){var o=a[i];0!==r[o]&&(n=!1)}n&&(u.splice(t--,1),e=s(s.s=a[0]))}return e}var a={},r={13:0},u=[];function s(e){if(a[e])return a[e].exports;var t=a[e]={i:e,l:!1,exports:{}};return c[e].call(t.exports,t,t.exports,s),t.l=!0,t.exports}s.m=c,s.c=a,s.d=function(e,t,a){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},s.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(t,e){if(1&e&&(t=s(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var a=Object.create(null);if(s.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)s.d(a,n,function(e){return t[e]}.bind(null,n));return a},s.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="";var t=window.webpackJsonp=window.webpackJsonp||[],n=t.push.bind(t);t.push=e,t=t.slice();for(var i=0;i<t.length;i++)e(t[i]);var p=n;u.push([355,0]),d()}({355:function(e,t,a){"use strict";a.r(t);a(363);var U=null,W=null;layui.use(["form"],function(){for(var i,o,s,l=layui.form,e=$(".province"),t=0;t<provinceList.length;t++)c(e,provinceList[t].name);function c(e,t){var a="<option value="+t+" >"+t+"</option>";e.append(a)}function d(e){e.find("option").remove();e.append("<option value=''>请选择</option>")}l.render("select"),l.on("select(province)",function(e){U(e.value)}),U=function(e){var a=$(".city"),t=$(".district");i=e,$.each(provinceList,function(e,t){if(i==t.name)return s=e}),d(a),d(t),$.each(provinceList[s].cityList,function(e,t){c(a,t.name)}),l.render("select")},l.on("select(city)",function(e){W(e.value)}),W=function(e){var n=$(".district");o=e,d(n),$.each(provinceList,function(e,t){if(i==t.name)return s=e}),$.each(provinceList[s].cityList,function(e,t){if(o==t.name)for(var a=0;a<t.areaList.length;a++)c(n,t.areaList[a])}),l.render("select")}}),layui.use(["table","form","layer","laydate","tree"],function(){$(".sidebar i").click(function(){$(".left-mian").hide(),$(".on-left").show()}),$(".on-left").click(function(){$(".left-mian").show(),$(".on-left").hide()});var e=merchantsListMian(""),o=layui.table,s=sessionStorage.token,l=layui.layer,c=layui.form,t=layui.tree,a=layui.laydate,d=o.render({elem:"#machineTable",url:"/api/machine/getMachineList",method:"post",contentType:"application/json",headers:{token:s},cols:[[{field:"number",width:150,title:"终端编号",align:"center",templet:function(e){return e.number?e.number:"-"}},{field:"info",width:330,title:"终端信息",align:"center",templet:function(e){return e.info?"<div>".concat(e.info,"</div>"):'<div><span style="color:red;">*</span>(售货机为新上线机器，请编辑售货机信息！)</div>'}},{field:"location",width:350,title:"地址",templet:function(e){return e.location?e.location:" - "}},{field:"CreationTime",width:130,title:"缺货状态",align:"center",templet:function(e){return'<div><span class="'.concat(0==e.stockStatus?"tableStateCellTrue":"tableStateCellFalse",'">').concat(0==e.stockStatus?"正常":1==e.stockStatus?"一般":"严重","</span></div>")}},{field:"onlineStatus",width:130,title:"在线状态",align:"center",templet:function(e){return'<div><span class="'.concat(0!=e.onlineStatus?"tableStateCellTrue":"tableStateCellFalse",'">').concat(0==e.onlineStatus?"离线":"在线","</span></div>")}},{field:"actionStatus",width:130,title:"是否激活",align:"center",templet:function(e){return'<div><span class="'.concat(0!=e.actionStatus?"tableStateCellTrue":"tableStateCellFalse",'">').concat(0==e.actionStatus?"未激活":"已激活","</span></div>")}},{field:"openStatus",width:130,title:"营业状态",align:"center",templet:function(e){return'<div><span class="'.concat(0!=e.openStatus?"tableStateCellTrue":"tableStateCellFalse",'">').concat(0==e.openStatus?"无营业":"营业","</span></div>")}},{field:"wayStatus",width:135,title:"货道状态",align:"center",templet:function(e){return'<div><span class="'.concat(0!=e.wayStatus?"tableStateCellTrue":"tableStateCellFalse",'">').concat(0==e.wayStatus?"不正常":"正常","</span></div>")}},{field:"dealTime",width:170,title:"最后交易时间"},{field:"merchantName",width:150,title:"所属商户"},{field:"appVersion",width:135,title:"软件版本"},{field:"connectTime",width:170,title:"联机时间"},{field:"actionTime",width:170,title:"激活时间"},{field:"description",width:250,title:"描述"},{field:"operation",fixed:"right",right:0,width:250,title:"操作",toolbar:"#barDemo",align:"left"}]],id:"tableId",page:!0,loading:!0,limits:[10,20,50,100],request:{pageName:"pageNum",limitName:"pageSize"},where:{merchantId:sessionStorage.machineID},parseData:function(e){return 200==e.code?{code:e.code,msg:e.message,count:e.data.total,data:e.data.list}:{code:e.code,msg:e.message}},response:{statusCode:200},done:function(e){permissionsFun("/api/role/findUserPermission","post",sessionStorage.token,l).then(function(e){e.data.forEach(function(e){"396"==e.id&&(C=!0),"392"==e.id&&(b=!0),"424"==e.id&&(N=!0),"432"==e.id&&(I=!0),"426"==e.id&&(x=!0),"425"==e.id&&(T=!0),"427"==e.id&&(A=!0),"401"==e.id&&(P=!0),"402"==e.id&&(O=!0)}),b?$(".activeMachineType").removeClass("hides"):$(".activeMachineType").addClass("hides"),I?$(".payTypeSet").removeClass("hide"):$(".payTypeSet").addClass("hide"),x?$(".detailsDel").removeClass("hide"):$(".detailsDel").addClass("hide"),A?$(".aisleDetailsTab").removeClass("hide"):$(".aisleDetailsTab").addClass("hide"),P?$(".salesDetails").removeClass("hide"):$(".salesDetails").addClass("hide"),O?$(".shipmentDetails").removeClass("hide"):$(".shipmentDetails").addClass("hide")}).catch(function(e){l.msg(e.message,{icon:2})}),403==e.code?window.parent.location.href="login.html":405==e.code&&$(".hangContent").show()}});$(".machineListKeyBtn").click(function(){var e=c.val("machineData");d.reload({where:{onlineStatus:e.onlineStatus?Number(e.onlineStatus):"",actionStatus:e.actionStatus?Number(e.actionStatus):"",openStatus:e.permissions?Number(e.permissions):"",stockStatus:e.CreationTime?Number(e.CreationTime):"",keyword:e.machineKeyText}})}),$(".setNav li").click(function(){$(this).addClass("active").siblings().removeClass("active");var e=$(this);$(".tabLine").animate({left:0!=e.index()?e.offset().left+"px":e.offset().left-20+"px",width:e.width()+"px"},500),$(".navSetCont li").eq($(this).index()).fadeIn().siblings().hide()});var r=null;o.on("tool(machineTable)",function(e){if(r=e.data,console.log(r),$(".maskHeader span").html(r.info+"详细信息"),"set"==e.event){e.data.wayX,e.data.wayY,A&&_(e.data.machineId),$(".setUpCont").show();var t=null;r.location&&(t=r.location.split(" ")),c.val("setDataVal",{info:r.info,appVersion:r.appVersion,longitude:r.longitude,latitude:r.latitude,location:r.location,setProvince:t?t[1]:"",setCity:t?t[2]:"",setArea:t?t[3]:"",setRegion:r.area}),P&&(i=r.machineId,y=o.render({elem:"#salesDateilsTable",url:"/api//machine/getSalesList",method:"post",contentType:"application/json",headers:{token:s},cols:[[{field:"time",width:200,title:"时间"},{field:"number",width:250,title:"订单号"},{field:"shipStatus",width:150,title:"出货状态",templet:function(e){return'<div><span class="'.concat(0!=e.shipStatus?"tableStateCellTrue":"tableStateCellFalse",'">').concat(0==e.shipStatus?"出货失败":"出货成功","</span></div>")}},{field:"payStatus",width:150,title:"支付状态",templet:function(e){return'<div><span class="'.concat(1==e.payStatus?"tableStateCellTrue":"tableStateCellFalse",'">').concat(1==e.payStatus?"已支付":"未支付","</span></div>")}},{field:"payType",width:150,title:"支付方式",templet:function(e){return'<div><span class="'.concat(0!=e.payType?"tableStateCellTrue":"tableStateCellAli",'">').concat(0!=e.payType?"微信":"支付宝","</span></div>")}},{field:"payee",width:150,title:"收款方"},{field:"amount",width:150,title:"金额"}]],id:"salesId",page:!0,loading:!0,height:"full-100",limits:[10,20,50,100],request:{pageName:"pageNum",limitName:"pageSize"},where:{condition:i},parseData:function(e){return 200==e.code?{code:e.code,msg:e.message,count:e.data.total,data:e.data.list}:{code:e.code,msg:e.message}},response:{statusCode:200},done:function(e){403==e.code&&(window.parent.location.href="login.html")}})),O&&(n=r.machineId,S=o.render({elem:"#shipmentListTable",url:"/api//machine/getShippingList",method:"post",contentType:"application/json",headers:{token:s},cols:[[{field:"time",width:200,title:"出货时间"},{field:"source",width:120,title:"操作来源"},{field:"goodName",width:150,title:"商品名"},{field:"way",width:130,title:"货道名"},{field:"cabinetName",width:130,title:"机柜名"},{field:"cabinetType",width:100,title:"机柜类型"},{field:"countNum",width:100,title:"出货时数量(个)",templet:function(e){return e.stock+e.count}},{field:"stock",width:100,title:"出货后数量(个)"},{field:"count",width:100,title:"出货数量(个)"}]],id:"shipmentId",page:!0,loading:!0,limits:[10,20,50,100],request:{pageName:"pageNum",limitName:"pageSize"},where:{condition:n},parseData:function(e){return 200==e.code?{code:e.code,msg:e.message,count:e.data.total,data:e.data.list}:{code:e.code,msg:e.message}},response:{statusCode:200},done:function(e){403==e.code&&(window.parent.location.href="login.html")}})),I&&R(r.machineId,r.userNum)}else if("edit"==e.event){1==r.openStatus?l.msg("温馨提示！该售货机正在营业，不可进行编辑！",{icon:7}):C||l.msg("温馨提示！您没有编辑售货机的权限！",{icon:7});var a=null;r.location&&(a=r.location.split(" ")),$(".editMachineBox .layui-tree-txt").css({color:"#555"}),c.val("editmachine",{sNumber:r.number,tName:r.info,number:r.machineId,province:r.location?a[0]:"",mapVal:r.location?a[3]:"",area:r.area,longitude:r.longitude,latitude:r.latitude,headPhone:r.chargerPhone,describe:r.description,merchantsName:r.userNum,merchantsNametext:r.merchantName}),r.location&&(U(a[0]),console.log(a[0]),$(".city").val(a[1]),W(a[1]),$(".district").val(a[2]),c.render("select")),$(".editMachineCont").show(),p()}else if("activate"==e.event){if(!b)return void l.msg("您没有激活售货机的权限!");l.confirm("确定激活该设备？",function(t){$.ajax({type:"post",url:"/api/machine/activeMachine",headers:{"Content-Type":"application/json",token:s},data:JSON.stringify({machineId:r.machineId,actionStatus:"1"}),success:function(e){l.close(t),200==e.code?(l.msg("激活成功",{icon:1}),d.reload({where:{}})):403==e.code?window.parent.location.href="login.html":l.msg(e.message,{icon:2})},error:function(){l.msg("服务器请求超时",{icon:2})}})})}else if("startThe"==e.event){if(1!=r.onlineStatus)return void l.msg("售货机处于离线状态不可以操作此功能",{icon:7});if(!b)return void l.msg("您没有更改营业状态的权限!");1!=r.openStatus?l.confirm("确定营业？",function(e){l.close(e),$(".mask").fadeIn(),$(".maskSpan").addClass("maskIcon"),$.ajax({type:"post",url:"/api/machine/getStatus",headers:{"Content-Type":"application/json",token:s},data:JSON.stringify({machineId:r.machineId}),success:function(e){200==e.code?1==JSON.parse(e.data).actionStatus?$.ajax({type:"post",url:"/api/pushActive",headers:{"Content-Type":"application/json",token:s},data:JSON.stringify({machine:r.machineId,action:"true"}),success:function(e){"true"==e?$.ajax({type:"post",url:"/api/machine/activeMachine",headers:{"Content-Type":"application/json",token:s},data:JSON.stringify({machineId:r.machineId,openStatus:"1"}),success:function(e){$(".mask").fadeOut(),$(".maskSpan").removeClass("maskIcon"),200==e.code?(l.msg("操作成功",{icon:1}),d.reload({where:{}})):l.msg(e.message,{icon:2})}}):($(".mask").fadeOut(),$(".maskSpan").removeClass("maskIcon"),l.msg("操作失败",{icon:2}))},errpr:function(){$(".mask").fadeOut(),$(".maskSpan").removeClass("maskIcon"),l.msg("服务器请求超时",{icon:2})}}):($(".mask").fadeOut(),$(".maskSpan").removeClass("maskIcon"),l.msg("该设备未激活,无法营业",{icon:7})):403==e.code?window.parent.location.href="login.html":($(".mask").fadeOut(),$(".maskSpan").removeClass("maskIcon"),l.msg(e.message,{icon:2}))}})}):l.confirm("确定取消营业？",function(e){l.close(e),$(".mask").fadeIn(),$(".maskSpan").addClass("maskIcon"),$.ajax({type:"post",url:"/api/machine/getStatus",headers:{"Content-Type":"application/json",token:s},data:JSON.stringify({machineId:r.machineId}),success:function(e){200==e.code?1==JSON.parse(e.data).actionStatus?$.ajax({type:"post",url:"/api/pushActive",headers:{"Content-Type":"application/json",token:s},data:JSON.stringify({machine:r.machineId,action:"false"}),success:function(e){"true"==e?$.ajax({type:"post",url:"/api/machine/activeMachine",headers:{"Content-Type":"application/json",token:s},data:JSON.stringify({machineId:r.machineId,openStatus:"0"}),success:function(e){$(".mask").fadeOut(),$(".maskSpan").removeClass("maskIcon"),200==e.code?(l.msg("暂停营业成功",{icon:1}),d.reload({where:{}})):l.msg(e.message,{icon:2})}}):($(".mask").fadeOut(),$(".maskSpan").removeClass("maskIcon"),l.msg("操作失败",{icon:2}))}}):($(".mask").fadeOut(),$(".maskSpan").removeClass("maskIcon"),l.msg("该设备未激活,无法进行营业操作",{icon:7})):403==e.code?window.parent.location.href="login.html":($(".mask").fadeOut(),$(".maskSpan").removeClass("maskIcon"),l.msg(e.message,{icon:2}))}})})}var n,i}),$(".setUpCont .close").click(function(){$(".setUpCont").hide()}),$(".editMachineCont .close").click(function(){$(".editMachineCont").hide()}),$(".editMachineCont .editCancelBtn").click(function(){$(".editMachineCont").hide()});var n=new AMap.Map("machineMap",{resizeEnable:!0}),i=new AMap.Geocoder({city:""}),u=new AMap.Marker;function p(){var e=$('.listFlex select[name="province"]').val()+$('.listFlex select[name="city"]').val()+$('.listFlex select[name="district"]').val()+$('.listFlex input[name="mapVal"]').val();i.getLocation(e,function(e,t){var a;"complete"===e&&t.geocodes.length?(a=t.geocodes[0].location,console.log(a),$('.listFlex input[name="longitude"]').val(a.lng),$('.listFlex input[name="latitude"]').val(a.lat),u.setPosition(a),n.add(u),n.setFitView(u)):l.msg("根据地址查询位置失败",{icon:2})})}function m(){var e=[$('.listFlex input[name="longitude"]').val(),$('.listFlex input[name="latitude"]').val()];n.add(u),u.setPosition(e),n.setFitView(u),i.getAddress(e,function(e,t){var a;"complete"===e&&t.regeocode?(a=t.regeocode,console.log(a),$('.listFlex input[name="mapVal"]').val(a.addressComponent.street+a.addressComponent.streetNumber),$('.listFlex select[name="province"]').val(a.addressComponent.province),U(a.addressComponent.province),"北京市"==a.addressComponent.province||"天津"==a.addressComponent.province||"上海市"==a.addressComponent.province||"重庆市"==a.addressComponent.province?($('.listFlex select[name="city"]').val("市辖区"),W("市辖区")):($('.listFlex select[name="city"]').val(a.addressComponent.city),W(a.addressComponent.city)),$('.listFlex select[name="district"]').val(a.addressComponent.district),c.render("select")):l.msg("根据地址查询位置失败",{icon:2})})}n.on("click",function(e){$('.listFlex input[name="longitude"]').val(),console.log(e)}),$('.listFlex input[name="mapVal"]').blur(function(){p()}),$('.listFlex input[name="longitude"]').blur(function(){m()}),$('.listFlex input[name="latitude"]').blur(function(){m()}),$('.listFlex input[name="userPhone"]').blur(function(){phoneRegular(this,l)}),$('.listFlex input[name="headPhone"]').blur(function(){phoneRegular(this,l)}),$(".editMachineCont .edittBtn").click(function(){var e;1!=r.openStatus?(e=c.val("editmachine")).sNumber&&e.tName&&e.number&&e.province&&e.city&&e.district&&e.mapVal&&e.area&&e.merchantsName?($(".mask").fadeIn(),$(".maskSpan").addClass("maskIcon"),$.ajax({type:"post",headers:{"Content-Type":"application/json",token:s},url:"/api/machine/updateMachine",data:JSON.stringify({number:e.sNumber,info:e.tName,machineId:e.number,location:e.province+" "+e.city+" "+e.district+" "+e.mapVal,area:e.area,longitude:e.longitude,latitude:e.latitude,userNum:e.merchantsName,chargerPhone:e.headPhone,description:e.describe}),success:function(e){$(".mask").fadeOut(),$(".maskSpan").removeClass("maskIcon"),$(".editMachineCont").hide(),200==e.code?(l.msg("编辑成功",{icon:1}),d.reload({where:{}})):403==e.code?window.parent.location.href="login.html":(e.code,l.msg(e.message,{icon:2}))}})):l.msg("带*为必填",{icon:7}):l.msg("正在营业的售货机不可进行编辑！",{icon:7})}),$(".fixedAccount").click(function(){$(".fixedAccount").removeClass("active"),$(this).addClass("active"),d.reload({where:{merchantId:$(this).attr("mid")}})});var h="",f="";a.render({elem:"#test6",range:!0,done:function(e){var t=e.split(" - ");h=t[0],f=t[1]}});var g="",v="";a.render({elem:"#test7",range:!0,done:function(e){console.log(e);var t=e.split(" - ");console.log(t),g=t[0],v=t[1]}});var y=null;$(".selesQueryBtn").click(function(){var e=c.val("salesDataVal");console.log(e),y.reload({where:{conditionFive:e.shipmentStatus,conditionSix:e.payStatus,conditionSeven:e.payType,conditionTwo:h,conditionThree:f}})});var S=null;$(".shipmentQueryBtn").click(function(){S.reload({where:{conditionTwo:g,conditionThree:v,conditionFour:$('.shipmentRecord input[name="keyName"]').val()}})});var k=null,w=k=treeList();0==e.length&&(k=[]),treeFun(t,"test1",d,w,"merchantId","condition",j,"","true");t.render({elem:"#test2",id:"treelistEdit",showLine:!0,onlyIconControl:!0,isJump:!1,edit:!1,data:k,text:{defaultNodeName:"无数据",none:"您没有修改机器所属商户的权限。"},click:function(e){console.log(e),c.val("editmachine",{merchantsName:e.data.id,merchantsNametext:e.data.title});for(var t=$(".editMachineBox .layui-tree-txt"),a=0;a<t.length;a++)t[a].innerHTML===e.data.title?t[a].style.color="#be954a":t[a].style.color="#555"}});$(".refreshBtn").click(function(){location.reload()}),$("body").bind("keydown",function(e){116==e.keyCode&&f5Fun()});var C=!1,b=!1,N=!1,I=!1,x=!1,T=!1,A=!1,P=!1,O=!1;function j(e){$.ajax({type:"post",url:"/api/classify/findAll",data:JSON.stringify({pageNum:1,pageSize:1e4,merchantId:e}),headers:{"Content-Type":"application/json",token:sessionStorage.token},success:function(e){var a;200==e.code&&(a='<option value="">全部</option>',$.each(e.data.list,function(e,t){a+='<option value="'.concat(t.classifyId,'">').concat(t.classifyName,"</option>")}),$("#GoodsType").html(a),c.render("select"))}})}$(".playHeader .close").click(function(){$(this).parent().parent().addClass("margin0"),$(this).parents(".maskContnet").fadeOut()}),j(sessionStorage.machineID),sessionStorage.machineGoodsId=sessionStorage.machineID;var D=null;var F=[],M=[];function _(e){F=[],M=[];var t=JSON.stringify({machineId:e});loadingAjax("/api//machine/getGoodWay","post",t,sessionStorage.token,"","","",l).then(function(e){L(e)}).catch(function(e){console.log(e),F=[];$(".aisleGoodsCont").html('<div style="text-align: center;">您没有权限访问货道详情！</div>')})}function L(t){F=[],M=[];for(var e=0;e<t.data.length;e++)M.push([]);M.forEach(function(e,a){t.data.forEach(function(e,t){a+1==e.way&&(M[a].push(e),console.log(1))})});for(var a,n,e=0;e<M.length;e++)0<M[e].length&&F.push(M[e]);n="",(a=F).forEach(function(e,a){n+='<div class="aisleListCont flexTwo">\n                            <div class="listIndex">\n                                <span>'.concat(a+1,"</span>\n                            </div>"),e.forEach(function(e,t){0!=e.open?n+='<div class="aisleNumderGoods" >\n                                    <div class="aisleNumderClick" fireIndex="'.concat(a+","+t,'">\n                                    <div class="numderTop">                                   \n                                        <img src="').concat(e.goods_images,'" alt=""> \n                                    <span>').concat(t+1,'</span>\n                                    </div>\n                                <div class="numderBottom">\n                                        <div class="status1">正常</div>\n                                    <div>数量:').concat(e.count,'</div>\n                                    </div>\n                                    </div>  \n                                    <div class="chooseCheck">\n                                        <input type="checkbox" value="').concat(e.id,'" ').concat(x?"":"disabled",' name="').concat(e.id,'" lay-skin="primary">\n                                        <span title="').concat(e.goods_Name?e.goods_Name:"-",'">').concat(e.goods_Name?e.goods_Name:"-","</span>\n                                    </div>\n                                </div>"):n+='<div class="aisleNumderGoods" >\n                                    <div class="aisleNumderClick" fireIndex="'.concat(a+","+t,'">\n                                    <div class="numderTop">\n                                    <img src="').concat(e.goods_images?e.goods_images:"http://172.16.71.142:8087/image/127b55b9-da32-4569-b740-3adf5e5524af.png",'" alt="">\n                                        <span>').concat(t+1,'</span>\n                                    </div>\n                                    <div class="numderBottom">\n                                        <div class="status2">禁用</div>\n                                        <div>数量:').concat(e.count,'</div>\n                                    </div>\n                                    </div>  \n                                    <div class="chooseCheck">\n                                        <input type="checkbox" value="').concat(e.id,'" ').concat(x?"":"disabled",' name="').concat(e.id,'" lay-skin="primary">\n                                        <span title="').concat(e.goods_Name?e.goods_Name:"-",'">').concat(e.goods_Name?e.goods_Name:"-","</span>\n                                    </div>\n                                </div>")}),n+='<div class="addAisle '.concat(T?"":"hide",'" indexVal="').concat(a+1,'">\n                             <span>+</span>\n                         </div>\n                         </div>')}),n+='<div class="aisleListCont flexTwo '.concat(T?"":"hide",'">\n        <div class="listIndex">\n                                <span>').concat(a.length+1,'</span>\n                            </div>\n                        <div class="addAisle" indexVal="').concat(a.length+1,'">\n                            <span>+</span>\n                        </div>\n                    </div>'),$(".aisleGoodsCont").html(n),c.render("checkbox")}$(".relative").click(function(){popupShow("goodsCont","goodsBox"),D?D.reload({where:{}}):D=o.render({elem:"#goodsTable",url:"/api/goods/findAll",method:"post",contentType:"application/json",headers:{token:sessionStorage.token},cols:[[{field:"goods_images",width:100,title:"图片",templet:"#imgtmp"},{field:"goods_Name",width:200,title:"商品名",color:"#409eff"},{field:"classifyName",width:250,title:"商品类目"},{field:"goods_Core",width:300,title:"商品编号"},{field:"operation",position:"absolute",right:0,width:80,title:"操作",toolbar:"#GoodsbarDemo"}]],id:"goodsID",page:!0,loading:!0,height:"480",request:{pageName:"pageNum",limitName:"pageSize"},where:{condition:sessionStorage.machineGoodsId,conditionFour:"1"},parseData:function(e){return 200==e.code?{code:e.code,msg:"",count:e.data.total,data:e.data.list}:{code:e.code,msg:e.message}},response:{statusCode:200},done:function(e){403==e.code&&(window.parent.location.href="login.html")}})}),$(".goodsCont .queryBtnClick").click(function(){D.reload({where:{conditionTwo:$('.goodsCont input[name="GoodsKyeText"]').val(),conditionThree:$("#GoodsType").val()}})});sessionStorage.independentPass="";var B=null;$("body").on("click",".aisleNumderClick",function(){console.log($(this).attr("fireIndex")),B=$(this).attr("fireIndex").split(","),console.log(B),N?sessionStorage.independentPass?(V(),popupShow("editAisle","editAisleBox")):popupShow("iPasswprd","passwordCont"):l.msg("您没有编辑货道的权限!",{icon:7})}),$(".passBtn").click(function(){var e=JSON.stringify({alonePwd:hex_md5($('.iPasswprd input[name="iPassword"]').val())});loadingAjax("/api/user/verifyAlonePwd","post",e,sessionStorage.token,"mask","iPasswprd","passwordCont",l).then(function(e){sessionStorage.independentPass="true",1==q?z(JSON.stringify({machineId:r.machineId,ways:H})):G?(popupHide("iPasswprd","passwordCont"),popupShow("addDetalis","addCont")):(console.log(1),V(),popupHide("iPasswprd","passwordCont"),popupShow("editAisle","editAisleBox"))}).catch(function(e){console.log(e),l.msg(e.message,{icon:2})})}),$(".iPasswprd .cancelBtn").click(function(){popupHide("iPasswprd","passwordCont")}),$(".editAisle .cancelBtn").click(function(){popupHide("editAisle","editAisleBox")});var J=null;function V(){J=F[B[0]][B[1]],console.log(J),$('.editAisle input[name="goodsName"]').val(J.goods_Name),$('.editAisle input[name="goodsName"]').attr("IVal",J.goods_Id),$('.editAisle input[name="price"]').val(J.goods_Price),$('.editAisle input[name="count"]').val(J.count),$('.editAisle input[name="total"]').val(J.total),c.val("testVal",{testSele:J.open})}o.on("tool(goodsTable)",function(e){console.log(e),"choose"==e.event&&($('.editAisle input[name="goodsName"]').val(e.data.goods_Name),$('.editAisle input[name="goodsName"]').attr("IVal",e.data.goods_Id),$('.editAisle input[name="price"]').val(e.data.goods_Price),popupHide("goodsCont","goodsBox"))}),$(".editAisle .ediaisleBtn").click(function(){var e;$('.editAisle input[name="goodsName"]').attr("IVal")?$('.editAisle input[name="count"]').val()&&$('.editAisle input[name="total"]').val()?Number($('.aisleList input[name="total"]').val())>=Number($('.aisleList input[name="count"]').val())?(e=JSON.stringify({machineId:r.machineId,id:J.id,goodId:$('.editAisle input[name="goodsName"]').attr("IVal"),count:$('.editAisle input[name="count"]').val(),total:$('.editAisle input[name="total"]').val(),open:$('.editAisle select[name="testSele"]').val()}),$(".mask").fadeIn(),$(".maskSpan").addClass("maskIcon"),loadingAjax("/api/machine/updateGoodWay","post",e,sessionStorage.token,"mask","editAisle","editAisleBox",l).then(function(e){l.msg(e.message,{icon:1}),_(r.machineId)}).catch(function(e){console.log(e),l.msg(e.message,{icon:2})})):l.msg("货道容量不能小于当前数量",{icon:7}):l.msg("数量和容量为为必填",{icon:7}):l.msg("请选择商品",{icon:7})});var G=null;$(".aisleDetails").on("click",".addAisle",function(){G=$(this).attr("indexVal"),sessionStorage.independentPass?popupShow("addDetalis","addCont"):popupShow("iPasswprd","passwordCont")}),$(".addCancelBtn").click(function(){popupHide("addDetalis","addCont")}),$(".addDetalisBtn").click(function(){var e;""!=$('.addDetalis input[name="addNum"]').val()&&0<$('.addDetalis input[name="addNum"]').val()?($(".mask").fadeIn(),$(".maskSpan").addClass("maskIcon"),e=JSON.stringify({machineId:r.machineId,way:Number(G),count:Number($('.addDetalis input[name="addNum"]').val())}),loadingAjax("/api/machine/insertGoodWay","post",e,sessionStorage.token,"mask","addDetalis","addCont",l).then(function(e){console.log(e),l.msg(e.message,{icon:1}),L(e),$('.addDetalis input[name="addNum"]').val(" ")}).catch(function(e){l.msg(e.message,{icon:2})})):l.msg("数量必须大于0",{icon:7})});var E=1;$('.addDetalis input[name="addNum"]').keyup(function(){var e=$(this).val();/^\d*$/.test(e)?(E=$(this).val(),console.log(E)):(l.msg("只能输入正整数",{icon:7}),$(this).val(E))}),$(".testNumdev input").keyup(function(){var e=$(this).val();/^\d*$/.test(e)||(l.msg("只能输入正整数",{icon:7}),$(this).val(""))});var H=[],q=null;function z(e){$(".mask").fadeIn(),$(".maskSpan").addClass("maskIcon"),loadingAjax("api/machine/deleteGoodWay","post",e,sessionStorage.token,"mask","","",l).then(function(e){console.log(e),l.msg(e.message,{icon:1}),L(e)}).catch(function(e){l.msg(e.message,{icon:2})})}function R(e,t){var a=JSON.stringify({machineId:e});loadingAjax("/api/pay/getMachinePayParam","post",a,sessionStorage.token).then(function(e){console.log(e),loadingAjax("/api/pay/getPayParam","post",JSON.stringify({merchantId:Number(t)}),sessionStorage.token).then(function(t){var n="";e.data.forEach(function(a,e){1==a.status&&(n+='<div class="layui-form-item">\n                                        <label class="layui-form-label">'.concat(a.tName,'：</label>\n                                    <div class="layui-input-block">'),0==a.selectPay.length?n+='<input type="radio" lay-filter="radioTest" name="'.concat(a.id,'" value="').concat("0-0",'" title="无" checked>'):n+='<input type="radio" lay-filter="radioTest" name="'.concat(a.id,'" value="').concat(a.selectPay[0].mpId+"-0",'" title="无" >'),t.data.forEach(function(e,t){a.id==e.payType&&(n+='<input type="radio" lay-filter="radioTest" name="'.concat(a.id,'" value="').concat((0<a.selectPay.length?a.selectPay[0].mpId:0)+"-"+e.id,'" title="').concat(e.payee,'" ').concat(!(a.selectPay.length<=0)&&a.selectPay[0].paramId==e.id?"checked":""," >"))}),n+="</div>\n                        </div>")}),$("#setPayList").html(n),c.render("radio")}).catch(function(e){console.log(e),l.msg(e.message,{icon:2})})}).catch(function(e){l.msg(e.message,{icon:2})})}$(".delBtn").click(function(){H=[],q=1;var a=c.val("delDetalis");console.log(a),"{}"!=JSON.stringify(a)?l.confirm("确定删除？",function(e){for(var t in l.close(e),a)H.push(Number(a[t]));sessionStorage.independentPass?(console.log(H),z(JSON.stringify({machineId:r.machineId,ways:H}))):popupShow("iPasswprd","passwordCont")}):l.msg("请选择需要删除的货道",{icon:7})}),$(".paySet .paySetBtn").click(function(){var e=c.val("paySetData");console.log(e)}),c.on("radio(radioTest)",function(n){l.confirm("确定修改收款账户？",function(e){l.close(e),console.log(n);var t=n.value.split("-");console.log(t);var a=JSON.stringify({machineId:r.machineId,paramId:Number(t[1]),mpId:Number(t[0])});loadingAjax("/api/pay/updateMachinePayParam","post",a,sessionStorage.token).then(function(e){l.msg(e.message,{icon:1}),R(r.machineId,r.userNum)}).catch(function(e){l.msg(e.message,{icon:2})})},function(){R(r.machineId,r.userNum)})})})},363:function(e,t){}});