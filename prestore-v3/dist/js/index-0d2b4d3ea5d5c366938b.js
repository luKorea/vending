/*! 版权所有，翻版必究 */!function(l){function e(e){for(var t,r,n=e[0],o=e[1],i=e[2],a=0,s=[];a<n.length;a++)r=n[a],Object.prototype.hasOwnProperty.call(u,r)&&u[r]&&s.push(u[r][0]),u[r]=0;for(t in o)Object.prototype.hasOwnProperty.call(o,t)&&(l[t]=o[t]);for(h&&h(e);s.length;)s.shift()();return f.push.apply(f,i||[]),c()}function c(){for(var e,t=0;t<f.length;t++){for(var r=f[t],n=!0,o=1;o<r.length;o++){var i=r[o];0!==u[i]&&(n=!1)}n&&(f.splice(t--,1),e=a(a.s=r[0]))}return e}var r={},u={1:0},f=[];function a(e){if(r[e])return r[e].exports;var t=r[e]={i:e,l:!1,exports:{}};return l[e].call(t.exports,t,t.exports,a),t.l=!0,t.exports}a.m=l,a.c=r,a.d=function(e,t,r){a.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},a.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(t,e){if(1&e&&(t=a(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(a.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)a.d(r,n,function(e){return t[e]}.bind(null,n));return r},a.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="";var t=window.webpackJsonp=window.webpackJsonp||[],n=t.push.bind(t);t.push=e,t=t.slice();for(var o=0;o<t.length;o++)e(t[o]);var h=n;f.push([340,0]),c()}({340:function(e,t,r){"use strict";r.r(t);r(341);var o=['<iframe class="iframe_show" src="merchantsList.html" style="width: 100%;height: 100%;border: 0;"></iframe>','<iframe class="iframe_show" src="orderList.html" style="width: 100%;height: 100%;border: 0;"></iframe>','<iframe class="iframe_show" src="memberList.html" style="width: 100%;height: 100%;border: 0;"></iframe>','<iframe class="iframe_show" src="roleManagement.html" style="width: 100%;height: 100%;border: 0;"></iframe>'],i=r(1);window.onload=function(){var e=sessionStorage.username,n=sessionStorage.token;$("#userLogin .userName").html(e);layui.use(["layer","form","element","carousel","table"],function(){var e=layui.jquery,t=layui.layer;Object(i.f)("/control/getControl","get",n).then(function(e){200===e.code&&(sessionStorage.roleData=JSON.stringify(e.data))}).catch(function(e){t.msg(e.message,{icon:2})}),e(".navClick").click(function(){history.replaceState(null,"","?theModule="+e(this).attr("navId")),e(".wrapContent").html(o[e(this).attr("navId")])});var r=Object(i.e)("theModule");r||0==r?(e(".navClick").eq(r).addClass("layui-this").siblings().removeClass("layui-this"),e(".wrapContent").html(o[r])):(e(".navClick").eq(r).addClass("layui-this").siblings().removeClass("layui-this"),e(".wrapContent").html(o[0])),e("#nav .layui-nav-item>a").click(function(){e(this).parent().siblings().removeClass("layui-nav-itemed")}),e(".determineBtn button").click(function(){Object(i.i)("socketCont","sockotBox")}),e(".exitLogin").click(function(){sessionStorage.token="",sessionStorage.roleData="",window.location.replace("login.html")})}),window.history.forward(1)}},341:function(e,t){}});