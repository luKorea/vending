/*! 版权所有，翻版必究 */!function(c){function e(e){for(var n,t,o=e[0],a=e[1],r=e[2],i=0,s=[];i<o.length;i++)t=o[i],Object.prototype.hasOwnProperty.call(d,t)&&d[t]&&s.push(d[t][0]),d[t]=0;for(n in a)Object.prototype.hasOwnProperty.call(a,n)&&(c[n]=a[n]);for(p&&p(e);s.length;)s.shift()();return u.push.apply(u,r||[]),l()}function l(){for(var e,n=0;n<u.length;n++){for(var t=u[n],o=!0,a=1;a<t.length;a++){var r=t[a];0!==d[r]&&(o=!1)}o&&(u.splice(n--,1),e=i(i.s=t[0]))}return e}var t={},d={3:0},u=[];function i(e){if(t[e])return t[e].exports;var n=t[e]={i:e,l:!1,exports:{}};return c[e].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.m=c,i.c=t,i.d=function(e,n,t){i.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:t})},i.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(n,e){if(1&e&&(n=i(n)),8&e)return n;if(4&e&&"object"==typeof n&&n&&n.__esModule)return n;var t=Object.create(null);if(i.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:n}),2&e&&"string"!=typeof n)for(var o in n)i.d(t,o,function(e){return n[e]}.bind(null,o));return t},i.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(n,"a",n),n},i.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},i.p="";var n=window.webpackJsonp=window.webpackJsonp||[],o=n.push.bind(n);n.push=e,n=n.slice();for(var a=0;a<n.length;a++)e(n[a]);var p=o;u.push([338,0]),l()}({338:function(e,n,t){"use strict";t.r(n);var n=t(354),m=t(1);layui.use(["table","form","layer","tree","util","transfer"],function(){var e=layui.table,r=layui.layer,i=sessionStorage.token,s=e.render({elem:"#tableTest",url:"".concat(Vapi,"/user/getUser"),method:"post",contentType:"application/json",headers:{token:i},align:"center",cols:[[{field:"username",width:150,title:"用户名",align:"center"},{field:"name",width:150,title:"姓名",align:"center"},{field:"company",width:200,title:"公司名",align:"center",templet:function(e){return e.company?e.company.companyName:""}},{field:"lockCount",width:150,title:"状态",align:"center",templet:function(e){return 0===e.lockCount||2===e.lockCount?"启用":"禁用"}},{field:"roleList",width:150,title:"用户角色",align:"center",templet:function(e){var n="";return e.roleList&&e.roleList.forEach(function(e){n+=e.roleName+"<br>"}),n}},{field:"addUser",width:150,title:"创建人",align:"center",templet:function(e){return e.addUser?e.addUser.username:""}},{field:"addTime",width:180,title:"创建时间",align:"center"},{field:"updateUser",width:150,title:"更改人",align:"center",templet:function(e){return e.updateUser?e.updateUser.username:""}},{field:"updateTime",width:180,title:"更改时间",align:"center"},{field:"operation",align:"center",width:150,title:"操作",toolbar:"#barDemo"}]],id:"tableId",page:!0,loading:!0,request:{pageName:"pageNum",limitName:"pageSize"},where:{condition:sessionStorage.machineID},parseData:function(e){return Object(m.c)(),200==e.code?{code:e.code,msg:e.message,count:e.data.total,data:e.data.list}:403!=e.code?{code:e.code,msg:e.message}:void(window.parent.location.href="login.html")},response:{statusCode:200},done:function(e){403==e.code?window.parent.location.href="login.html":405==e.code&&$(".hangContent").show()}}),n=JSON.parse(sessionStorage.roleData),t=permissionsVal1(permissionData,n);(t[1]?removeClass:addClass)(".addBtn"),(t[2]?removeClass:addClass)(".ListOperation .edit"),t[3]?removeClass(".list-table"):(addClass(".list-table"),removeClass(".role-text")),(t[18]?removeClass:addClass)(".ListOperation .delete"),$(".queryBtnClick ").click(function(){s.reload({where:{conditionTwo:$('.mian input[name="keyMerchants"]').val()}})});var o=null,c=layui.form,l=null,d=null;e.on("tool(test)",function(e){event.stopPropagation(),o=e.data,e.data,"operation"===e.event&&($(".ListOperation").fadeIn(),$(".ListOperation").css({left:$(this).offset().left-35+"px",top:$(this).offset().top+35+"px"}))}),$.ajax({url:"".concat(Vapi,"/company/getAll"),type:"get",headers:{"Content-Type":"application/json",token:i},success:function(e){console.log(e);var t="";$("#companyType").empty(),$.each(e.data,function(e,n){t+='<option value="'.concat(n.companyId,'">').concat(n.companyName,"</option>")}),$("#companyType").append(t),c.render("select")},error:function(){$(".mask").fadeOut(),$(".maskSpan").removeClass("maskIcon"),r.msg("请求服务器超时",{icon:2})}});var u=null;function a(o,a,e){console.log(o);var t="";o.forEach(function(e,n){t+='<div>\n                     <input type="checkbox"\n                     name="'.concat(e.roleId,'" title="').concat(e.roleName,'"lay-skin="primary" value="').concat(e.roleId,'"></input>\n                   </div>')}),$(".".concat(a)).empty(),$(".".concat(a)).html(t),$(".roleCont").show(),void 0!==e&&e.forEach(function(e,n){for(var t=0;t<o.length;t++)e.roleId==o[t].roleId&&$(".".concat(a," input")).eq(t).prop("checked",!0)}),c.render("checkbox")}function p(e,n){var t=$(e).val();t&&(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[~!@#$%^&*()_+`\-={}:";'<>?,.\/]).{6,64}$/.test(t)||(n.msg("密码必须包含英文和数字以及特殊字符且不少于6位数",{icon:7}),$(e).val("")))}$.ajax({type:"get",headers:{token:i},url:"".concat(Vapi,"/role/findAll?pageNum=1&pageSize=1000"),success:function(e){console.log(e),200===e.code&&(u=e.data.list,console.log(u))},error:function(){r.msg("服务器请求超时",{icon:2})}}),$(".delete").click(function(){d=o.id,o.username===sessionStorage.username?r.msg("该用户为当前登陆用户，不可删除！！",{icon:2}):r.confirm("确定删除？",function(n){console.log(n),$.ajax({type:"get",url:"".concat(Vapi,"/user/deleteUserById"),headers:{token:i},data:{uId:d},success:function(e){200===e.code?(s.reload({where:{}}),r.msg(e.message,{icon:1}),r.close(n)):403===e.code?window.parent.location.href="login.html":r.msg(e.message,{icon:2})}})})}),$(".addBtn").click(function(){$(".switchOpen").hide(),$('input[name="username"]').prop("disabled",!1),Object(m.j)(".MemberOperation",".MemberContent"),l=$(this).attr("typeID"),$(".OperationHeader span").html("添加用户"),c.val("information",{id:"",username:"",name:"",password:"",companyId:""}),a(u,"checkCont")}),$(".ListOperation .edit").click(function(){d=o.id,$(".switchOpen").show(),$('input[name="username"]').prop("disabled",!0),$('.switchOpen input[name="open"]').prop("checked",2===o.lockCount||0===o.lockCount),$(".OperationHeader span").html("编辑用户"),l=2,Object(m.j)(".MemberOperation",".MemberContent"),c.val("information",{username:o.username,name:o.name,password:"      ",companyId:o.company.companyId,lockCount:o.lockCount}),a(u,"checkCont",o.roleList),c.render("select")}),$(".submit_btn").click(function(){var e,n=c.val("information"),t=c.val("checkboxData"),o=null,a=[];for(e in t)!function(n){u.forEach(function(e){String(e.roleId)===t[n]&&a.push(e.roleId)})}(e);n.username&&n.name&&n.password&&n.companyId?($(".mask").fadeIn(),$(".maskSpan").addClass("maskIcon"),n=JSON.stringify({id:d,username:n.username,name:n.name,password:"      "!==n.password?hex_md5(n.password):"",companyId:n.companyId,lockCount:$('.switchOpen input[name="open"]').prop("checked")?2:1,roleList:a}),console.log(n),(o="".concat(Vapi,"1"===l?"/user/addUser":"/user/updateUser"))&&$.ajax({type:"post",url:o,headers:{"Content-Type":"application/json",token:i},data:n,success:function(e){$(".mask").fadeOut(),$(".maskSpan").removeClass("maskIcon"),200==e.code?(s.reload({where:{}}),c.val("information",{username:"",name:"",password:"",companyId:""}),$(".MemberOperation").fadeOut(),r.msg(e.message,{icon:1})):403==e.code?window.parent.location.href="login.html":r.msg(e.message,{icon:2})},error:function(){$(".mask").fadeOut(),$(".maskSpan").removeClass("maskIcon"),r.msg("请求服务器超时",{icon:2})}})):r.msg("带*为必填",{icon:7})}),$(".cancel_btn").click(function(){Object(m.i)(".MemberOperation",".MemberContent")}),$('.listInput input[name="phone"]').blur(function(){var e=$(this).val();if(e&&!/^1[3456789]\d{9}$/.test(e))return r.msg("请填写正确的手机号码",{icon:7}),$(this).val(""),!1}),$('.listInput input[name="userPwd"]').blur(function(){p(this,r)}),$('.listInput input[name="alonePwd"]').blur(function(){p(this,r)}),$(".refreshBtn").click(function(){location.reload()}),$("body").bind("keydown",function(e){116===e.keyCode&&f5Fun()}),$(".playHeader .close").click(function(){$(this).parent().parent().addClass("margin0"),$(this).parents(".maskContnet").fadeOut()}),$('.inputWidth input[name="userName"]').blur(function(){ChineseREgular(this,r)}),$("body").click(function(){$(".ListOperation").fadeOut(),0})})},354:function(e,n){}});