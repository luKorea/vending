/*! 版权所有，翻版必究 */!function(u){function e(e){for(var n,t,a=e[0],o=e[1],r=e[2],s=0,c=[];s<a.length;s++)t=a[s],Object.prototype.hasOwnProperty.call(l,t)&&l[t]&&c.push(l[t][0]),l[t]=0;for(n in o)Object.prototype.hasOwnProperty.call(o,n)&&(u[n]=o[n]);for(f&&f(e);c.length;)c.shift()();return p.push.apply(p,r||[]),i()}function i(){for(var e,n=0;n<p.length;n++){for(var t=p[n],a=!0,o=1;o<t.length;o++){var r=t[o];0!==l[r]&&(a=!1)}a&&(p.splice(n--,1),e=s(s.s=t[0]))}return e}var t={},l={2:0},p=[];function s(e){if(t[e])return t[e].exports;var n=t[e]={i:e,l:!1,exports:{}};return u[e].call(n.exports,n,n.exports,s),n.l=!0,n.exports}s.m=u,s.c=t,s.d=function(e,n,t){s.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:t})},s.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(n,e){if(1&e&&(n=s(n)),8&e)return n;if(4&e&&"object"==typeof n&&n&&n.__esModule)return n;var t=Object.create(null);if(s.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:n}),2&e&&"string"!=typeof n)for(var a in n)s.d(t,a,function(e){return n[e]}.bind(null,a));return t},s.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return s.d(n,"a",n),n},s.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},s.p="";var n=window.webpackJsonp=window.webpackJsonp||[],a=n.push.bind(n);n.push=e,n=n.slice();for(var o=0;o<n.length;o++)e(n[o]);var f=a;p.push([157,0]),i()}({157:function(e,n,t){"use strict";t.r(n);var a,o,n=t(427),r=t(0);sessionStorage.accountPass?(a=JSON.parse(sessionStorage.accountPass),$("#c1").attr("checked",!0),$('.flex input[name="account"]').val(a.account),$('.flex input[name="pass"]').val(a.pass)):$("#c1").attr("checked",!1),(o=new huiSwpie("#swipe")).autoPlay=!0,o.delay=3e3,o.run(),$(".loginBtn").click(function(){!function(){if(!$('.flex input[name="account"]').val()||!$('.flex input[name="pass"]').val())return Object(r.k)("账号密码不能为空","warn");Object(r.d)("正在登录，请稍后！");var e=JSON.stringify({username:$('.flex input[name="account"]').val(),password:1==c?a.pass:hex_md5($('.flex input[name="pass"]').val())});Object(r.c)("/user/login","post",sessionStorage.token,e,"mask").then(function(e){console.log(e),sessionStorage.username=e.data.username,sessionStorage.token=e.data.token,sessionStorage.machineID=e.data.merchantId,sessionStorage.UserId=e.data.UUId,$("#c1").prop("checked")?sessionStorage.accountPass=JSON.stringify({account:$('.flex input[name="account"]').val(),pass:1==c?a.pass:hex_md5($('.flex input[name="pass"]').val())}):sessionStorage.accountPass="",window.location.href="M_my.html"}).catch(function(e){Object(r.k)(e.message,"error")})}()});var s=1,c=1;$('.flex input[name="pass"]').focus(function(){1==s&&($(this).val(""),s=2)}),$('.flex input[name="pass"]').keyup(function(){c=2})},427:function(e,n){}});