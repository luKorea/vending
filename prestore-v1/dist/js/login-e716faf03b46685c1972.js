/*! 版权所有，翻版必究 */!function(u){function e(e){for(var n,t,o=e[0],r=e[1],a=e[2],s=0,i=[];s<o.length;s++)t=o[s],Object.prototype.hasOwnProperty.call(l,t)&&l[t]&&i.push(l[t][0]),l[t]=0;for(n in r)Object.prototype.hasOwnProperty.call(r,n)&&(u[n]=r[n]);for(p&&p(e);i.length;)i.shift()();return f.push.apply(f,a||[]),c()}function c(){for(var e,n=0;n<f.length;n++){for(var t=f[n],o=!0,r=1;r<t.length;r++){var a=t[r];0!==l[a]&&(o=!1)}o&&(f.splice(n--,1),e=s(s.s=t[0]))}return e}var t={},l={2:0},f=[];function s(e){if(t[e])return t[e].exports;var n=t[e]={i:e,l:!1,exports:{}};return u[e].call(n.exports,n,n.exports,s),n.l=!0,n.exports}s.m=u,s.c=t,s.d=function(e,n,t){s.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:t})},s.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(n,e){if(1&e&&(n=s(n)),8&e)return n;if(4&e&&"object"==typeof n&&n&&n.__esModule)return n;var t=Object.create(null);if(s.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:n}),2&e&&"string"!=typeof n)for(var o in n)s.d(t,o,function(e){return n[e]}.bind(null,o));return t},s.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return s.d(n,"a",n),n},s.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},s.p="";var n=window.webpackJsonp=window.webpackJsonp||[],o=n.push.bind(n);n.push=e,n=n.slice();for(var r=0;r<n.length;r++)e(n[r]);var p=o;f.push([335,0]),c()}({335:function(e,n,t){"use strict";t.r(n);var n=t(344),i=t(1);layui.use(["form","layer","carousel"],function(){var t=layui.form,o=layui.layer,e=layui.carousel,r=null;e.render({elem:"#test10",width:"100%",height:"40vw",interval:3e3,arrow:"none"}),sessionStorage.accountPass&&(r=JSON.parse(sessionStorage.accountPass),t.val("loginData",{account:r.account,pass:r.pass,keep:"on"})),$(".login-btn").click(function(){s()}),$("#pass").keydown(function(e){13==e.keyCode&&s()});var n=1,a=1;function s(){var e,n=t.val("loginData");n.account?n.pass?(e=JSON.stringify({username:n.account,password:(1==a?r:n).pass}),Object(i.f)("/user/login","post","",e,o).then(function(e){console.log(e),sessionStorage.username=e.data.username,sessionStorage.token=e.data.token,sessionStorage.UserId=e.data.userId,"on"==n.keep?sessionStorage.accountPass=JSON.stringify({account:n.account,pass:(1==a?r:n).pass}):sessionStorage.accountPass="",window.location.href="index.html"}).catch(function(e){o.msg(e.message,{icon:2})})):o.msg("请输入密码",{icon:7}):o.msg("请输入账号",{icon:7})}$('.list input[name="pass"]').focus(function(){1==n&&($(this).val(""),n=2)}),$('.list input[name="pass"]').keyup(function(){a=2}),window.history.forward(1)})},344:function(e,n){}});