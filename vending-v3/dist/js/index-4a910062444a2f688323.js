/*! 版权所有，翻版必究 */!function(l){function e(e){for(var a,s,t=e[0],r=e[1],i=e[2],o=0,n=[];o<t.length;o++)s=t[o],Object.prototype.hasOwnProperty.call(m,s)&&m[s]&&n.push(m[s][0]),m[s]=0;for(a in r)Object.prototype.hasOwnProperty.call(r,a)&&(l[a]=r[a]);for(h&&h(e);n.length;)n.shift()();return d.push.apply(d,i||[]),c()}function c(){for(var e,a=0;a<d.length;a++){for(var s=d[a],t=!0,r=1;r<s.length;r++){var i=s[r];0!==m[i]&&(t=!1)}t&&(d.splice(a--,1),e=o(o.s=s[0]))}return e}var s={},m={11:0},d=[];function o(e){if(s[e])return s[e].exports;var a=s[e]={i:e,l:!1,exports:{}};return l[e].call(a.exports,a,a.exports,o),a.l=!0,a.exports}o.m=l,o.c=s,o.d=function(e,a,s){o.o(e,a)||Object.defineProperty(e,a,{enumerable:!0,get:s})},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(a,e){if(1&e&&(a=o(a)),8&e)return a;if(4&e&&"object"==typeof a&&a&&a.__esModule)return a;var s=Object.create(null);if(o.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:a}),2&e&&"string"!=typeof a)for(var t in a)o.d(s,t,function(e){return a[e]}.bind(null,t));return s},o.n=function(e){var a=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(a,"a",a),a},o.o=function(e,a){return Object.prototype.hasOwnProperty.call(e,a)},o.p="";var a=window.webpackJsonp=window.webpackJsonp||[],t=a.push.bind(a);a.push=e,a=a.slice();for(var r=0;r<a.length;r++)e(a[r]);var h=t;d.push([354,0]),c()}({354:function(e,a,s){"use strict";s.r(a);s(356);var c=['<iframe class="iframe_show" src="report.html" iframeId="1"></iframe>','<iframe class="iframe_show" src="logo.html"></iframe>','<iframe class="iframe_show" src="terminalMember.html"></iframe>','<iframe class="iframe_show" src="memberList.html"></iframe>','<iframe class="iframe_show" src="roleManagement.html"></iframe>','<iframe class="iframe_show" src="machine.html"></iframe>','<iframe class="iframe_show" src="remote.html"></iframe>','<iframe class="iframe_show" src="generalGoods.html"></iframe>','<iframe class="iframe_show" src="customCategory.html"></iframe>','<iframe class="iframe_show" src="customGoods.html"></iframe>','<iframe class="iframe_show" src="goodsMaterial.html"></iframe>','<iframe class="iframe_show" src="merchantsList.html"></iframe>','<iframe class="iframe_show" src="Mymerchants.html"></iframe>','<iframe class="iframe_show" src="settlementDetails.html"></iframe>','<iframe class="iframe_show" src="machineAccounts.html"></iframe>','<iframe class="iframe_show" src="merchantsAcconuts.html"></iframe>','<iframe class="iframe_show" src="order.html"></iframe>','<iframe class="iframe_show" src="oldOrder.html"></iframe>','<iframe class="iframe_show" src="fodder.html"></iframe>','<iframe class="iframe_show" src="release.html"></iframe>','<iframe class="iframe_show" src="open.html"></iframe>','<iframe class="iframe_show" src="binding.html"></iframe>','<iframe class="iframe_show" src="myInformation.html"></iframe>','<iframe class="iframe_show" src="ThePublic.html"></iframe>','<iframe class="iframe_show" src="record.html"></iframe>','<iframe class="iframe_show" src="notice.html"></iframe>','<iframe class="iframe_show" src="paySet.html"></iframe>','<iframe class="iframe_show" src="payType.html"></iframe>'];sessionStorage.token||(window.location.href="login.html"),window.onload=function(){var e=sessionStorage.username;$("#userLogin .userName").html(e);var l=[];layui.use(["layer","form","element","carousel"],function(){var a=layui.layer;layui.form;layui.carousel.render({elem:"#test1",width:"480px",height:"25px",arrow:"none",anim:"updown",indicator:"none",interval:"2000"});var f=layui.jquery,s=layui.element;function t(e){s.tabChange("demo",e)}f(".navClick").click(function(){var e,a;-1==l.indexOf(f(this).attr("navId"))?(e=f(this).attr("navId"),a=f(this).html(),s.tabAdd("demo",{title:a,content:'<div class="content-tbas-iframe-html">\n                             '.concat(c[e],"\n                         </div>"),id:e}),t(f(this).attr("navId")),l.push(f(this).attr("navId"))):t(f(this).attr("navId"))}),f(".layui-tab").on("click",function(e){var a;f(e.target).is(".layui-tab-close")&&(a=l.indexOf(f(e.target).parent().attr("lay-id")),l.splice(a,1))});var r,i=null;s.on("tab(demo)",function(e){for(var a=f(".navClick").length,s=0;s<a;s++)f(this).attr("lay-id")==f(".navClick").eq(s).attr("navId")&&(i=s);f(".layui-nav-item").removeClass("layui-nav-itemed"),f(".navClick").eq(i).parent().parent().parent().addClass("layui-nav-itemed"),f(".navClick").parent().removeClass("layui-this"),f(".navClick").eq(i).parent().addClass("layui-this"),999==f(this).attr("lay-id")&&(f(".layui-nav-item").removeClass("layui-nav-itemed"),f(".navClick").parent().removeClass("layui-this"))}),f("#nav .layui-nav-item>a").click(function(){f(this).parent().siblings().removeClass("layui-nav-itemed")});var o=!0;function e(){var e;"undefined"==typeof WebSocket?console.log("您的浏览器不支持WebSocket"):(console.log("您的浏览器支持WebSocket"),e=(e="http://172.16.71.142:8086/pushServer/".concat(sessionStorage.UserId)).replace("https","ws").replace("http","ws"),null!=r&&(r.close(),r=null),(r=new WebSocket(e)).onopen=function(){console.log("websocket已打开"),o=!0},r.onmessage=function(e){var a=JSON.parse(e.data);1==a.type?(console.log(a),f(".sockotTitle p").html(a.data),popupShow("socketCont","sockotBox"),setTimeout(function(){n()},3500)):2==a.type&&(f(".sockotTitle p").html(a.data),popupShow("socketCont","sockotBox"),setTimeout(function(){n()},3500))},r.onclose=function(){console.log("websocket已关闭"),o=!1},r.onerror=function(){console.log("websocket发生了错误"),o=!1})}function n(){loadingAjax("/api/user/logout","post","",sessionStorage.token,"","","",a).then(function(e){console.log(e),sessionStorage.token="",window.location.replace("login.html")}).catch(function(e){console.log(e),a.msg(e.message)})}sessionStorage.token&&e(),setInterval(function(){sessionStorage.token&&(o||(o=!0,e())),console.log(999)},1e4),f(".exitLogin").click(function(){n()}),f(".determineBtn button").click(function(){popupHide("socketCont","sockotBox"),n()}),permissionsFun("/api/role/findUserPermission","post",sessionStorage.token,a).then(function(e){var a=!1,s=!1,t=!1,r=!1,i=!1,o=!1,n=!1,l=!1,c=!1,m=!1,d=!1,h=!1;e.data.forEach(function(e){408==e.id&&(a=!0),407==e.id&&(s=!0),413==e.id&&(t=!0),414==e.id&&(r=!0),409==e.id&&(i=!0),410==e.id&&(o=!0),400==e.id&&(n=!0),431==e.id&&(l=!0),423==e.id&&(c=!0),419==e.id&&(m=!0),412==e.id&&(d=!0),411==e.id&&(h=!0)}),a?f(".userListFlag").removeClass("hide"):f(".userListFlag").addClass("hide"),s?f(".roleListFlag").removeClass("hide"):f(".roleListFlag").addClass("hide"),a||s?f(".userCont").removeClass("hide"):f(".userCont").addClass("hide"),t?f(".machineListFlag").removeClass("hide").parents(".machineCont").removeClass("hide"):f(".machineListFlag").addClass("hide").parents(".machineCont").addClass("hide"),r?f(".goodsClassFlag").removeClass("hide"):f(".goodsClassFlag").addClass("hide"),i?f(".goodsListFlag").removeClass("hide"):f(".goodsListFlag").addClass("hide"),o?f(".materialListFlag").removeClass("hide"):f(".materialListFlag").addClass("hide"),r||i||o?f(".goodsCont").removeClass("hide"):f(".goodsCont").addClass("hide"),n?f(".merchantsListFlag").removeClass("hide").parents(".merchantsCont").removeClass("hide"):f(".merchantsListFlag").addClass("hide").parents(".merchantsCont").addClass("hide"),l?f(".merchantsPay").removeClass("hide"):f(".merchantsPay").addClass("hide"),c?f(".accountsListFlag").removeClass("hide").parents(".accountsCont").removeClass("hide"):f(".accountsListFlag").addClass("hide").parents(".accountsCont").addClass("hide"),m?f(".orderListFlag").removeClass("hide").parents(".orderCont").removeClass("hide"):f(".orderListFlag").addClass("hide").parents(".orderCont").addClass("hide"),d?f(".RMListFlag").removeClass("hide"):f(".RMListFlag").addClass("hide"),h?f(".ReListFlag").removeClass("hide"):f(".ReListFlag").addClass("hide"),d||h?f(".releaseCont").removeClass("hide"):f(".releaseCont").addClass("hide")}).catch(function(e){console.log(e),a.msg(e.message,{icon:2})})}),$("body").bind("keydown",function(e){116==e.keyCode&&e.preventDefault()}),window.history.forward(1)}},356:function(e,a){}});