/*! 版权所有，翻版必究 */!function(e){function a(a){for(var s,n,r=a[0],l=a[1],c=a[2],d=0,h=[];d<r.length;d++)n=r[d],Object.prototype.hasOwnProperty.call(i,n)&&i[n]&&h.push(i[n][0]),i[n]=0;for(s in l)Object.prototype.hasOwnProperty.call(l,s)&&(e[s]=l[s]);for(m&&m(a);h.length;)h.shift()();return o.push.apply(o,c||[]),t()}function t(){for(var e,a=0;a<o.length;a++){for(var t=o[a],s=!0,r=1;r<t.length;r++){var l=t[r];0!==i[l]&&(s=!1)}s&&(o.splice(a--,1),e=n(n.s=t[0]))}return e}var s={},i={15:0},o=[];function n(a){if(s[a])return s[a].exports;var t=s[a]={i:a,l:!1,exports:{}};return e[a].call(t.exports,t,t.exports,n),t.l=!0,t.exports}n.m=e,n.c=s,n.d=function(e,a,t){n.o(e,a)||Object.defineProperty(e,a,{enumerable:!0,get:t})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,a){if(1&a&&(e=n(e)),8&a)return e;if(4&a&&"object"==typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(n.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&a&&"string"!=typeof e)for(var s in e)n.d(t,s,function(a){return e[a]}.bind(null,s));return t},n.n=function(e){var a=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(a,"a",a),a},n.o=function(e,a){return Object.prototype.hasOwnProperty.call(e,a)},n.p="";var r=window.webpackJsonp=window.webpackJsonp||[],l=r.push.bind(r);r.push=a,r=r.slice();for(var c=0;c<r.length;c++)a(r[c]);var m=l;o.push([618,0]),t()}({618:function(e,a,t){"use strict";t.r(a);t(620);var s=['<iframe class="iframe_show" src="report.html" iframeId="1"></iframe>','<iframe class="iframe_show" src="logo.html"></iframe>','<iframe class="iframe_show" src="terminalMember.html"></iframe>','<iframe class="iframe_show" src="memberList.html"></iframe>','<iframe class="iframe_show" src="roleManagement.html"></iframe>','<iframe class="iframe_show" src="machine.html"></iframe>','<iframe class="iframe_show" src="remote.html"></iframe>','<iframe class="iframe_show" src="generalGoods.html"></iframe>','<iframe class="iframe_show" src="customCategory.html"></iframe>','<iframe class="iframe_show" src="customGoods.html"></iframe>','<iframe class="iframe_show" src="goodsMaterial.html"></iframe>','<iframe class="iframe_show" src="merchantsList.html"></iframe>','<iframe class="iframe_show" src="Mymerchants.html"></iframe>','<iframe class="iframe_show" src="settlementDetails.html"></iframe>','<iframe class="iframe_show" src="machineAccounts.html"></iframe>','<iframe class="iframe_show" src="merchantsAcconuts.html"></iframe>','<iframe class="iframe_show" src="order.html"></iframe>','<iframe class="iframe_show" src="oldOrder.html"></iframe>','<iframe class="iframe_show" src="fodder.html"></iframe>','<iframe class="iframe_show" src="release.html"></iframe>','<iframe class="iframe_show" src="open.html"></iframe>','<iframe class="iframe_show" src="binding.html"></iframe>','<iframe class="iframe_show" src="myInformation.html"></iframe>','<iframe class="iframe_show" src="ThePublic.html"></iframe>','<iframe class="iframe_show" src="record.html"></iframe>','<iframe class="iframe_show" src="notice.html"></iframe>','<iframe class="iframe_show" src="paySet.html"></iframe>','<iframe class="iframe_show" src="payType.html"></iframe>','<iframe class="iframe_show" src="pickupCode.html"></iframe>','<iframe class="iframe_show" name="message" src="message.html"></iframe>','<iframe class="iframe_show" src="salesManager.html"></iframe>','<iframe class="iframe_show" src="mailOrder.html"></iframe>','<iframe class="iframe_show" src="codeOrder.html"></iframe>','<iframe class="iframe_show" src="salesResults.html"></iframe>','<iframe class="iframe_show" src="orderSummary.html"></iframe>'];sessionStorage.token||(window.location.href="login.html"),document.documentElement.clientWidth<=600&&(window.location.href="M_my.html"),window.onload=function(){var e=sessionStorage.username;$("#userLogin .userName").html(e);var a=[];layui.use(["layer","form","element","carousel","table"],function(){var e=layui.layer,t=(layui.form,layui.table),i=layui.jquery,o=layui.element;function n(e,a){o.tabAdd("demo",{title:a,content:'<div class="content-tbas-iframe-html">\n                             '.concat(s[e],"\n                         </div>"),id:e})}function r(e){o.tabChange("demo",e)}i(".navClick").click(function(){-1==a.indexOf(i(this).attr("navId"))?(n(i(this).attr("navId"),i(this).html()),r(i(this).attr("navId")),a.push(i(this).attr("navId"))):r(i(this).attr("navId"))}),i(".layui-tab").on("click",function(e){if(i(e.target).is(".layui-tab-close")){var t=a.indexOf(i(e.target).parent().attr("lay-id"));a.splice(t,1)}});var l=null;o.on("tab(demo)",function(e){var a=i(this).html().substr(0,i(this).html().indexOf("<"));history.replaceState(null,"","?theModule="+i(this).attr("lay-id")+"-"+a);for(var t=i(".navClick").length,s=0;s<t;s++)i(this).attr("lay-id")==i(".navClick").eq(s).attr("navId")&&(l=s);i(".layui-nav-item").removeClass("layui-nav-itemed"),i(".navClick").eq(l).parent().parent().parent().addClass("layui-nav-itemed"),i(".navClick").parent().removeClass("layui-this"),i(".navClick").eq(l).parent().addClass("layui-this"),999==i(this).attr("lay-id")&&(i(".layui-nav-item").removeClass("layui-nav-itemed"),i(".navClick").parent().removeClass("layui-this"))});var c,m,d,h,f,u=(c="theModule",m=window.location.search,d=new RegExp("(^|&)"+c+"=([^&]*)(&|$)"),(h=m.substr(1).match(d))?decodeURIComponent(h[2]):null);if(u){var p=u.split("-");22!=p[0]&&p&&(n(p[0],p[1]),r(p[0]),a.push(p[0]))}i("#nav .layui-nav-item>a").click(function(){i(this).parent().siblings().removeClass("layui-nav-itemed")});var g=!0;function w(){if("undefined"==typeof WebSocket)console.log("您的浏览器不支持WebSocket");else{var e="https://vd.ybtech.gold/websocket/pushServer/".concat(sessionStorage.UserId);e=e.replace("https","wss").replace("http","ws"),null!=f&&(f.close(),f=null),(f=new WebSocket(e)).onopen=function(){g=!0,console.log("websocket开启成功")},f.onmessage=function(e){var a=JSON.parse(e.data);console.log(a),1==a.type?(i(".sockotTitle p").html(a.data),popupShow("socketCont","sockotBox"),setTimeout(function(){v()},3500)):2==a.type?(i(".sockotTitle p").html(a.data),popupShow("socketCont","sockotBox"),setTimeout(function(){v()},3500)):3==a.type?F():"notice"==a.type&&O()},f.onclose=function(){console.log("websocket已关闭"),g=!1},f.onerror=function(){console.log("websocket发生了错误"),g=!1}}}function v(){loadingAjax("/user/logout","post","",sessionStorage.token,"","","",e).then(function(e){sessionStorage.token="",window.location.replace("login.html")}).catch(function(a){e.msg(a.message)})}setInterval(function(){sessionStorage.token&&(g||(g=!0,w()))},1e4),i(".exitLogin").click(function(){v()}),i(".determineBtn button").click(function(){popupHide("socketCont","sockotBox"),v()});var C={408:!1,407:!1,413:!1,414:!1,409:!1,410:!1,400:!1,431:!1,423:!1,419:!1,412:!1,411:!1,447:!1,448:!1,463:!1,455:!1},y=null;permissionsFun("/role/findUserPermission","post",sessionStorage.token,e).then(function(e){y=e.data;var a=permissionsVal1(C,e.data);a[408]?i(".userListFlag").removeClass("hide"):i(".userListFlag").addClass("hide"),a[407]?i(".roleListFlag").removeClass("hide"):i(".roleListFlag").addClass("hide"),a[408]||a[407]?i(".userCont").removeClass("hide"):i(".userCont").addClass("hide"),a[413]?i(".machineListFlag").removeClass("hide").parents(".machineCont").removeClass("hide"):i(".machineListFlag").addClass("hide").parents(".machineCont").addClass("hide"),a[414]?i(".goodsClassFlag").removeClass("hide"):i(".goodsClassFlag").addClass("hide"),a[409]?i(".goodsListFlag").removeClass("hide"):i(".goodsListFlag").addClass("hide"),a[410]?i(".materialListFlag").removeClass("hide"):i(".materialListFlag").addClass("hide"),a[414]||a[409]||a[410]?i(".goodsCont").removeClass("hide"):i(".goodsCont").addClass("hide"),a[400]?i(".merchantsListFlag").removeClass("hide").parents(".merchantsCont").removeClass("hide"):i(".merchantsListFlag").addClass("hide").parents(".merchantsCont").addClass("hide"),a[431]?i(".merchantsPay").removeClass("hide"):i(".merchantsPay").addClass("hide"),a[407]?i(".merchantsPayType").removeClass("hide"):i(".merchantsPayType").addClass("hide"),a[447]?i(".sales").removeClass("hide"):i(".sales").addClass("hide"),a[419]?i(".orderListFlag").removeClass("hide"):i(".orderListFlag").addClass("hide"),a[463]?i(".orderSummaryFlag").removeClass("hide"):i(".orderSummaryFlag").addClass("hide"),a[455]?i(".codeORderFlag").removeClass("hide"):i(".codeORderFlag").addClass("hide"),a[419]||a[463]||a[455]?i(".orderCont").removeClass("hide"):i(".orderCont").addClass("hide"),a[412]?i(".RMListFlag").removeClass("hide"):i(".RMListFlag").addClass("hide"),a[411]?i(".ReListFlag").removeClass("hide"):i(".ReListFlag").addClass("hide"),a[412]||a[411]?i(".releaseCont").removeClass("hide"):i(".releaseCont").addClass("hide"),a[448]?i(".pickupCode").removeClass("hide").parents(".marketingCont").removeClass("hide"):i(".pickupCode").addClass("hide").parents(".marketingCont").addClass("hide")}).catch(function(a){e.msg(a.message,{icon:2})}),window.permissionsData1=function(){return y};var _=JSON.stringify({pageSize:10,pageNum:1,n_status:1,is_show:1}),k=layui.carousel,b=null;function S(){loadingAjax("/notices/getNoticeList","post",_,sessionStorage.token).then(function(e){0==(b=e.data.list).length?i(".swipe-content-carousel").hide():i(".swipe-content-carousel").show(),x(b)}).catch(function(a){e.msg("获取公告失败",{icon:2})})}function x(e){var a="";e.forEach(function(e,t){a+='<div class="swpier"  ArrList="'.concat(t,'">').concat(e.title,"</div>")}),i(".noticeTitleText").html(a);k.render({elem:"#test1",width:"480px",height:"25px",arrow:"none",anim:"updown",indicator:"none",interval:"2000"}).reload({interval:2e3})}S(),i(".noticeTitleText").on("click",".swpier",function(){var e=b[i(this).attr("ArrList")];i(".previewContent .playHeader span").html(e.title),i(".previewContent .previewBody .previewHtml").html(e.content),i(".previeName span").html(e.create_user);var a=timeStamp(e.create_time);if(i(".previeTime span").html(a),e.attach_name){i(".downloadBtn").show(),i(".downloadBtn a").attr("src",e.attach_url);var t=e.attach_url.split("."),s=t[t.length-1];i(".downloadBtn a").attr("download",e.attach_name+"."+s)}else i(".downloadBtn").hide();popupShow("previewContent","previewBox")}),i(".playHeader .close").click(function(){i(this).parent().parent().addClass("margin0"),i(this).parents(".maskContnet").fadeOut()}),i(".previewBox").click(function(){event.stopPropagation()}),i(".previewContent").click(function(){popupHide("previewContent","previewBox")});var L=[],B=0;function F(){B=0;var a=JSON.stringify({pageSize:25,pageNum:1,is_read:0});loadingAjax("/notices/getHistoryMsg","post",a,sessionStorage.token).then(function(e){var a="";if((L=e.data.list).forEach(function(e,t){0==e.is_read&&e.create_user!=sessionStorage.username&&(B++,a+='<dd >\n                                    <a class="messageDow" messageIndex="'.concat(t,'" href="javascript:;"><span>').concat(e.title,"</span></a>\n                                </dd>"))}),i(".unreadMessageBox").html(a),i(".unreadMessage").html(B),0==B){i(".unreadMessageBox").html("<dd>\n                                <h5>暂无未读消息</h5>\n                            </dd>")}}).catch(function(a){e.msg("获取未读消息失败",{icon:2})})}F(),window.messageFunList=F,i(".messageContentList").on("click",".messageDow",function(){var a,t,s=L[i(this).attr("messageIndex")];i(".messageCont .playHeader span").html("".concat(s.title)),i(".messageBody .messageHtml").html(s.content),a=s.id,t=JSON.stringify({message_id:a}),loadingAjax("/notices/readMessage","post",t,sessionStorage.token,"","","",e).then(function(e){F(),window.message&&window.message.reloadFun()}).catch(function(a){console.log(a),e.msg("阅读消息失败",{icon:2})}),popupShow("messageCont","messageBox")}),i(".messageBox").click(function(){event.stopPropagation()}),i(".messageCont").click(function(){popupHide("messageCont","messageBox")});function O(){t.render({elem:"#noticeTable",method:"post",url:"".concat(vApi,"/notices/getNoticeList"),contentType:"application/json",headers:{token:sessionStorage.token},cols:[[{field:"title",width:210,title:"标题",align:"center"},{field:"attach_name",width:150,title:"附件名",align:"center",templet:function(e){return e.attach_name?e.attach_name:"-"}},{field:"attach_url",width:320,title:"附件地址",align:"center",templet:function(e){return e.attach_url?e.attach_url:"-"}},{field:"create_user",width:130,title:"创建人",align:"center"},{field:"create_time",width:180,title:"创建时间",align:"center",templet:function(e){return timeStamp(e.create_time)}}]],id:"noticeTableId",page:!0,loading:!0,request:{pageName:"pageNum",limitName:"pageSize"},where:{n_status:1,is_show:1},parseData:function(e){return 200==e.code?{code:e.code,msg:e.message,count:e.data.total,data:e.data.list}:403!=e.code?{code:e.code,msg:e.message}:void(window.parent.location.href="login.html")},response:{statusCode:200},done:function(e){b=[],200==e.code&&e.data.forEach(function(e){1==e.is_show&&1==e.n_status&&(b.push(e),x(b))})}})}window.shuffling=S,i(".more").click(function(){O(),popupShow("noticeContent","noticeBox")}),i(".noticeBox").click(function(){event.stopPropagation()}),i(".noticeContent").click(function(){popupHide("noticeContent","noticeBox")}),t.on("row(noticeTable)",function(e){i(".previewContent .playHeader span").html(e.data.title),i(".previewContent .previewBody .previewHtml").html(e.data.content),i(".previeName span").html(e.data.create_user);var a=timeStamp(e.data.create_time);if(i(".previeTime span").html(a),e.data.attach_name){i(".downloadBtn").show(),i(".downloadBtn a").attr("src",e.data.attach_url);var t=e.data.attach_url.split("."),s=t[t.length-1];i(".downloadBtn a").attr("download",e.data.attach_name+"."+s)}else i(".downloadBtn").hide();popupShow("previewContent","previewBox")}),sessionStorage.token&&w()}),$("body").bind("keydown",function(e){116==e.keyCode&&e.preventDefault()}),window.history.forward(1)}},620:function(e,a){}});