/*! 版权所有，翻版必究 */!function(e){function n(n){for(var o,s,i=n[0],c=n[1],u=n[2],f=0,l=[];f<i.length;f++)s=i[f],Object.prototype.hasOwnProperty.call(a,s)&&a[s]&&l.push(a[s][0]),a[s]=0;for(o in c)Object.prototype.hasOwnProperty.call(c,o)&&(e[o]=c[o]);for(p&&p(n);l.length;)l.shift()();return r.push.apply(r,u||[]),t()}function t(){for(var e,n=0;n<r.length;n++){for(var t=r[n],o=!0,i=1;i<t.length;i++){var c=t[i];0!==a[c]&&(o=!1)}o&&(r.splice(n--,1),e=s(s.s=t[0]))}return e}var o={},a={8:0},r=[];function s(n){if(o[n])return o[n].exports;var t=o[n]={i:n,l:!1,exports:{}};return e[n].call(t.exports,t,t.exports,s),t.l=!0,t.exports}s.m=e,s.c=o,s.d=function(e,n,t){s.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:t})},s.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,n){if(1&n&&(e=s(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(s.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var o in e)s.d(t,o,function(n){return e[n]}.bind(null,o));return t},s.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return s.d(n,"a",n),n},s.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},s.p="";var i=window.webpackJsonp=window.webpackJsonp||[],c=i.push.bind(i);i.push=n,i=i.slice();for(var u=0;u<i.length;u++)n(i[u]);var p=c;r.push([616,0]),t()}({616:function(e,n,t){"use strict";t.r(n);t(699);var o=t(2),a=Object(o.b)("machineId");if(sessionStorage.accountPass&&Object(o.c)(sessionStorage.old,(new Date).getTime())){var r=JSON.parse(sessionStorage.accountPass);$('.formCont input[name="name"]').val(r.username),$('.formCont input[name="pass"]').val(r.password)}var s=1,i=1;$('.list input[name="pass"]').focus(function(){1==s&&($(this).val(""),s=2)}),$('.list input[name="pass"]').keyup(function(){i=2}),$(".searchCont .btn").click(function(){if($('.formCont input[name="name"]').val())if($('.formCont input[name="pass"]').val()){$(".mask").show(),console.log(a,Object(o.a)(a));var e=JSON.stringify({username:$('.formCont input[name="name"]').val(),password:1==i?r.password:hex_md5($('.formCont input[name="pass"]').val()),machineId:a});Object(o.d)("/api/user/login","post",e).then(function(e){sessionStorage.token=e.data.token,$.ajax({type:"post",url:"/api/scanLogin",timeout:1e4,data:JSON.stringify({action:sessionStorage.token,machine:Object(o.a)(a)}),headers:{"Content-Type":"application/json",token:sessionStorage.token},success:function(e){$(".mask").hide(),"true"==e?($(".r1").prop("checked")?(sessionStorage.old=(new Date).getTime(),sessionStorage.accountPass=JSON.stringify({username:$('.formCont input[name="name"]').val(),password:1==i?r.password:hex_md5($('.formCont input[name="pass"]').val())})):sessionStorage.accountPass="",window.location.href="operation.html?machineId=".concat(Object(o.b)("machineId"))):Object(o.f)("售货机离线,登录失败")},error:function(e){$(".mask").hide(),Object(o.f)("服务器请求超时")}})}).catch(function(e){$.ajax({type:"post",url:"/api/scanLogin",timeout:1e4,data:JSON.stringify({action:"false",machine:Object(o.a)(a)}),headers:{"Content-Type":"application/json",token:sessionStorage.token},success:function(e){},error:function(e){$(".mask").hide(),Object(o.f)("服务器请求超时")}}),$(".mask").hide(),Object(o.f)(e.message)})}else Object(o.f)("请输入密码");else Object(o.f)("请输入账号")})},699:function(e,n){}});