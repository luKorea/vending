/*! 版权所有，翻版必究 */!function(e){function n(n){for(var o,s,r=n[0],c=n[1],l=n[2],u=0,d=[];u<r.length;u++)s=r[u],Object.prototype.hasOwnProperty.call(i,s)&&i[s]&&d.push(i[s][0]),i[s]=0;for(o in c)Object.prototype.hasOwnProperty.call(c,o)&&(e[o]=c[o]);for(p&&p(n);d.length;)d.shift()();return a.push.apply(a,l||[]),t()}function t(){for(var e,n=0;n<a.length;n++){for(var t=a[n],o=!0,r=1;r<t.length;r++){var c=t[r];0!==i[c]&&(o=!1)}o&&(a.splice(n--,1),e=s(s.s=t[0]))}return e}var o={},i={37:0},a=[];function s(n){if(o[n])return o[n].exports;var t=o[n]={i:n,l:!1,exports:{}};return e[n].call(t.exports,t,t.exports,s),t.l=!0,t.exports}s.m=e,s.c=o,s.d=function(e,n,t){s.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:t})},s.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,n){if(1&n&&(e=s(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(s.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var o in e)s.d(t,o,function(n){return e[n]}.bind(null,o));return t},s.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return s.d(n,"a",n),n},s.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},s.p="";var r=window.webpackJsonp=window.webpackJsonp||[],c=r.push.bind(r);r.push=n,r=r.slice();for(var l=0;l<r.length;l++)n(r[l]);var p=c;a.push([243,0]),t()}({243:function(e,n,t){"use strict";t.r(n);t(606);layui.use(["table","form","layer","tree","util"],function(){var e=layui.form,n=layui.jquery,t=layui.table,o=layui.layer,i=(o=layui.layer,layui.util,layui.tree,[[{field:"name",title:"角色名",align:"center"},{field:"addUser",title:"添加人",align:"center"},{field:"addTime",title:"添加时间",align:"center"},{field:"lastUser",title:"最后修改人",align:"center"},{field:"lastTime",title:"最后修改时间",align:"center"},{field:"operation",align:"center",right:0,title:"操作",toolbar:"#barDemo"}]]),a=sessionStorage.token,s=t.render({elem:"#tableTest",url:"".concat(vApi,"/role/findRole"),method:"post",contentType:"application/json",headers:{token:a},cols:i,id:"tableId",page:!0,loading:!0,limits:[10,20,50],request:{pageName:"pageNum",limitName:"pageSize"},parseData:function(e){return 200==e.code?{code:e.code,msg:e.message,count:e.data.total,data:e.data.list}:{code:e.code,msg:e.message}},response:{statusCode:200},done:function(e){403==e.code?window.parent.location.href="login.html":405==e.code&&n(".hangContent").show()}});n(".playHeader .close").click(function(){n(this).parent().parent().addClass("margin0"),n(this).parents(".maskContnet").fadeOut()});var r=null,c=[],l=[],p=[],u=[],d=[],f=[],m=[],g=[],h=[],y=null,b=null;function v(t,o,i){var a='<div>\n        <input type="checkbox" lay-filter="permissionsAll" name="'.concat(o,'" title="全选"\n            lay-skin="primary"  value="" >\n         </div>');t.forEach(function(e,n){a+='<div>\n                            <input type="checkbox" lay-filter="permissions" name="'.concat(e.id,'" title="').concat(e.name,'"\n                                lay-skin="primary"  value="').concat(e.id,'" >\n                        </div>')}),n(".".concat(o)).empty(),n(".".concat(o)).html(a),i.permissions.forEach(function(e,i){for(var a=1;a<n(".".concat(o," input")).length;a++)e.id==t[a-1].id&&n(".".concat(o," input")).eq(a).prop("checked",!0)}),e.render("checkbox")}t.on("tool(test)",function(e){if(y=e.data,event.stopPropagation(),n('.editInput input[name="userName"]').val(y.name),"operation"===e.event){if(b==e.data.id)return n(".ListOperation").fadeOut(),void(b=null);b=e.data.id,n(".ListOperation").fadeIn(),n(".ListOperation").css({left:n(this).offset().left-35+"px",top:n(this).offset().top+35+"px"})}}),n(".ListOperation .edit").click(function(){popupShow("editRold","editBox"),"100001"!=y.id?(n(".permissionsContList").show(),r||n.ajax({type:"post",url:"".concat(vApi,"/role/findPermission"),headers:{"Content-Type":"application/json",token:a},async:!1,data:JSON.stringify({pageNum:"1",pageSize:"1000"}),success:function(e){200==e.code&&(r=e.data.list.filter(function(e,n){return 6!=e.classify&&8!=e.classify&&9!=e.classify?e:""}),e.data.list.forEach(function(e,n){switch(e.classify){case 1:c.push(e);break;case 2:l.push(e);break;case 3:p.push(e);break;case 4:u.push(e);break;case 5:d.push(e);break;case 7:f.push(e);break;case 10:m.push(e);break;case 11:g.push(e);break;case 13:h.push(e)}}))}}),v(c,"permissionsASF",y),v(l,"permissionsGClass",y),v(p,"permissionsGoods",y),v(u,"permissionsGAF",y),v(d,"permissionsMachine",y),v(f,"permissionsASR",y),v(m,"permissionsGeneral",y),v(g,"permissionsOrder",y),v(h,"permissionsMarketing",y)):n(".permissionsContList").hide()}),n(".ListOperation .del").click(function(){O(y.id),o.confirm("确定删除？",function(e){n.ajax({type:"post",url:"".concat(vApi,"/role/deleteRole"),headers:{"Content-Type":"application/json",token:a},data:JSON.stringify({id:y.id}),success:function(n){o.close(e),200==n.code?(w(k),o.msg(n.message,{icon:1}),s.reload({where:{}})):403==n.code?window.parent.location.href="login.html":o.msg(n.message,{icon:2})},error:function(e){o.msg("服务器请求超时",{icon:2})}})})}),n(".addBtn").click(function(){popupShow("MemberOperation","MemberContent")}),n(".cancel_btn").click(function(){popupHide("MemberOperation","MemberContent")}),n(".submitBtn").click(function(){n('.addInput input[name="userName"]').val()?n.ajax({type:"post",url:"".concat(vApi,"/role/saveRole"),headers:{"Content-Type":"application/json",token:a},data:JSON.stringify({name:n('.addInput input[name="userName"]').val()}),success:function(e){popupHide("MemberOperation","MemberContent"),console.log(e),200==e.code?(o.msg(e.message,{icon:1}),n('.addInput input[name="userName"]').val(""),s.reload({where:{}})):403==e.code?window.history.go(-1):o.msg(e.message,{icon:2})},error:function(e){o.msg("服务器请求超时",{icon:2})}}):o.msg("带*为必填",{icon:7})}),n(".edittBtn").click(function(){n(".mask").fadeIn(),n(".maskSpan").addClass("maskIcon");var t=[];if(n('.editInput input[name="userName"]').val()){var i=e.val("editInformation");console.log(i);var c=function(e){r.forEach(function(n,o){n.id==i[e]&&t.push(n)})};for(var l in i)c(l);n.ajax({type:"post",url:"".concat(vApi,"/role/updateRole"),headers:{"Content-Type":"application/json",token:a},data:JSON.stringify({id:y.id,name:n('.editInput input[name="userName"]').val(),permissions:t}),success:function(e){n(".mask").fadeOut(),n(".maskSpan").removeClass("maskIcon"),popupHide("editRold","editBox"),200==e.code?(o.msg(e.message,{icon:1}),s.reload({where:{}}),"100001"!=y.id&&O(y.id,"true")):403==e.code?window.parent.location.href="login.html":o.msg(e.message,{icon:2})},error:function(e){o.msg("服务器请求超时",{icon:2})}})}else o.msg("带*为必填",{icon:7})}),n(".editCancelbtn").click(function(){popupHide("editRold","editBox")}),n(".refreshBtn").click(function(){location.reload()}),n("body").bind("keydown",function(e){116==e.keyCode&&f5Fun()});var k=[];function O(e,n){var t=JSON.stringify({roleId:Number(e)});loadingAjax("/role/getRoleUser","post",t,a).then(function(e){k=e.data.map(Number),console.log(k),n&&w(k)}).catch(function(e){console.log(e)})}function w(e){e.forEach(function(e,n){console.log(e);var t=JSON.stringify({uid:e,msg:"用户角色权限发生变更,请重新登录！",tag:1});loadingAjax("/pushWebMsg","post",t,sessionStorage.token).then(function(e){console.log(e)}).catch(function(e){console.log(e)})})}n(".queryBtnClick").click(function(){saveTableWidth(i),s.reload({where:{condition:n(".KyeText").val()},cols:i})}),e.on("checkbox(permissionsAll)",function(t){console.log(t.elem),console.log(t.elem.checked);var o=n(t.elem).attr("name");t.value||(t.elem.checked?n(".".concat(o," input")).prop("checked",!0):n(".".concat(o," input")).prop("checked",!1),e.render("checkbox"))}),n("body").click(function(){n(".ListOperation").fadeOut(),b=null})})},606:function(e,n){}});