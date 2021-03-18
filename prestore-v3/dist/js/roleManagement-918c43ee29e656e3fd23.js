/*! 版权所有，翻版必究 */!function(l){function e(e){for(var t,n,o=e[0],a=e[1],i=e[2],r=0,c=[];r<o.length;r++)n=o[r],Object.prototype.hasOwnProperty.call(d,n)&&d[n]&&c.push(d[n][0]),d[n]=0;for(t in a)Object.prototype.hasOwnProperty.call(a,t)&&(l[t]=a[t]);for(p&&p(e);c.length;)c.shift()();return u.push.apply(u,i||[]),s()}function s(){for(var e,t=0;t<u.length;t++){for(var n=u[t],o=!0,a=1;a<n.length;a++){var i=n[a];0!==d[i]&&(o=!1)}o&&(u.splice(t--,1),e=r(r.s=n[0]))}return e}var n={},d={6:0},u=[];function r(e){if(n[e])return n[e].exports;var t=n[e]={i:e,l:!1,exports:{}};return l[e].call(t.exports,t,t.exports,r),t.l=!0,t.exports}r.m=l,r.c=n,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)r.d(n,o,function(e){return t[e]}.bind(null,o));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="";var t=window.webpackJsonp=window.webpackJsonp||[],o=t.push.bind(t);t.push=e,t=t.slice();for(var a=0;a<t.length;a++)e(t[a]);var p=o;u.push([339,0]),s()}({339:function(e,t,n){"use strict";n.r(t);var t=n(356),v=n(1);layui.use(["table","form","layer","tree","util"],function(){var i=layui.form,r=layui.jquery,e=layui.table,n=layui.layer,c=sessionStorage.token,l=e.render({elem:"#tableTest",url:"".concat(Vapi,"/role/findAll"),method:"GET",headers:{token:c},cols:[[{field:"roleName",width:180,title:"角色名",align:"center"},{field:"remark",width:200,title:"备注",align:"center"},{field:"addUser",width:150,title:"创建人",align:"center",templet:function(e){return e.addUser?e.addUser.username:""}},{field:"addTime",width:200,title:"添加时间",align:"center"},{field:"updateUser",width:150,title:"最后修改人",align:"center",templet:function(e){return e.updateUser?e.updateUser.username:""}},{field:"updateTime",width:200,title:"最后修改时间",align:"center"},{field:"operation",position:"absolute",align:"center",right:0,width:200,title:"操作",toolbar:"#barDemo"}]],id:"tableId",page:!0,loading:!0,limits:[10,20,50],even:!0,request:{pageName:"pageNum",limitName:"pageSize"},where:{},parseData:function(e){return 200===e.code?{code:e.code,msg:e.message,count:e.data.total,data:e.data.list}:{code:e.code,msg:e.message}},response:{statusCode:200},done:function(e){403===e.code&&(n.msg("登录过期,请重新登录",{icon:2}),setTimeout(function(e){window.parent.location.href="login.html"},1500)),Object(v.c)()}}),t=JSON.parse(sessionStorage.roleData),o=permissionsVal1(permissionData,t);(o[4]?removeClass:addClass)(".addBtn"),(o[19]?removeClass:addClass)(".ListOperation .edit"),(o[20]?removeClass:addClass)(".ListOperation .del"),o[21]?removeClass(".list-table"):(addClass(".list-table"),removeClass(".role-text"));var a=r('.addInput input[name="roleName"]'),s=r('.addInput input[name="remark"]'),d=r('.editInput input[name="roleName"]'),u=r('.editInput input[name="remark"]');r(".playHeader .close").click(function(){r(this).parent().parent().addClass("margin0"),r(this).parents(".maskContnet").fadeOut()});var p,f=null,m=[],g=null;function h(e,t){Object(v.f)("/role/findByRId?id=".concat(e),"get",c).then(function(e){p=e.data,function(o,a,e){var n='<div>\n        <input type="checkbox" lay-filter="permissionsAll" name="'.concat(a,'" title="全选"\n            lay-skin="primary"  value="" >\n         </div>');o.forEach(function(e,t){n+='<div>\n                            <input type="checkbox" lay-filter="permissions" name="'.concat(e.controlId,'" \n                            title="').concat(e.controlName,'"\n                                lay-skin="primary"  value="').concat(e.controlId,'" >\n                        </div>')});var t=r(".".concat(a));t.empty(),t.html(n),e.forEach(function(e,t){for(var n=1;n<r(".".concat(a," input")).length;n++)e.controlId==o[n-1].controlId&&r(".".concat(a," input")).eq(n).prop("checked",!0)}),i.render("checkbox")}(m,"permissionsGeneral",p),t&&b(y)}).catch(function(e){console.log(e)})}e.on("tool(test)",function(e){g=e.data,event.stopPropagation(),d.val(g.roleName),u.val(g.remark),"operation"===e.event&&(e.data.id,r(".ListOperation").fadeIn(),r(".ListOperation").css({left:r(this).offset().left-35+"px",top:r(this).offset().top+35+"px"}))}),r(".submitBtn").click(function(){a.val()?r.ajax({type:"post",url:"".concat(Vapi,"/role/addRole"),headers:{"Content-Type":"application/json",token:c},data:JSON.stringify({roleName:a.val(),remark:s.val()}),success:function(e){Object(v.i)(".MemberOperation",".MemberContent"),200===e.code?(n.msg(e.message,{icon:1}),a.val(""),s.val(""),l.reload({where:{}})):403==e.code?window.history.go(-1):n.msg(e.message,{icon:2})},error:function(){n.msg("服务器请求超时",{icon:2})}}):n.msg("带*为必填",{icon:7})}),f||r.ajax({type:"GET",url:"".concat(Vapi,"/role/findControl"),headers:{"Content-Type":"application/json",token:c},async:!1,success:function(e){200===e.code&&(f=e.data,e.data.forEach(function(e){m.push(e)}))}}),r(".ListOperation .edit").click(function(){Object(v.j)(".editRold",".editBox"),r(".permissionsContList").show(),h(g.roleId)}),r(".edittBtn").click(function(){r(".mask").fadeIn(),r(".maskSpan").addClass("maskIcon");var a=[];d.val()?function(){var e,o=i.val("editInformation");for(e in o)!function(n){f.forEach(function(e,t){String(e.controlId)===o[n]&&a.push(e.controlId)})}(e);r.ajax({type:"post",url:"".concat(Vapi,"/role/updateRole"),headers:{"Content-Type":"application/json",token:c},data:JSON.stringify({roleId:g.roleId,roleName:d.val(),remark:u.val(),controlList:a}),success:function(e){r(".mask").fadeOut(),r(".maskSpan").removeClass("maskIcon"),Object(v.i)(".editRold",".editBox"),200==e.code?(n.msg(e.message,{icon:1}),n.open({content:"用户权限已更新，请重新登陆",btn:["确定"],yes:function(e){n.close(e),sessionStorage.clear(),window.parent.location.href="login.html"},cancel:function(){return!1}}),l.reload({where:{}})):403===e.code?window.parent.location.href="login.html":n.msg(e.message,{icon:2})},error:function(){n.msg("服务器请求超时",{icon:2})}})}():n.msg("带*为必填",{icon:7})}),r(".ListOperation .del").click(function(){n.confirm("确定删除？",function(t){r.ajax({type:"get",url:"".concat(Vapi,"/role/deRoleByUId?roleId=").concat(g.roleId),headers:{"Content-Type":"application/json",token:c},success:function(e){n.close(t),200==e.code?(b(y),n.msg(e.message,{icon:1}),l.reload({where:{}})):403==e.code?window.parent.location.href="login.html":n.msg(e.message,{icon:2})},error:function(){n.msg("服务器请求超时",{icon:2})}})})}),r(".addBtn").click(function(){Object(v.j)(".MemberOperation",".MemberContent")}),r(".cancel_btn").click(function(){Object(v.i)(".MemberOperation",".MemberContent")}),r(".editCancelbtn").click(function(){Object(v.i)(".editRold",".editBox")}),r(".refreshBtn").click(function(){location.reload()}),r("body").bind("keydown",function(e){116===e.keyCode&&f5Fun()});var y=[];function b(e){e.forEach(function(e,t){e=JSON.stringify({uid:e,msg:"用户角色权限发生变更,请重新登录！",tag:1});loadingAjax("/pushWebMsg","post",e,sessionStorage.token).then(function(e){console.log(e)}).catch(function(e){console.log(e)})})}r(".queryBtnClick").click(function(){l.reload({where:{roleName:r(".KyeText").val()}})}),i.on("checkbox(permissionsAll)",function(e){var t=r(e.elem).attr("name");e.value||(e.elem.checked?r(".".concat(t," input")).prop("checked",!0):r(".".concat(t," input")).prop("checked",!1),i.render("checkbox"))}),r("body").click(function(){r(".ListOperation").fadeOut(),0})})},356:function(e,t){}});