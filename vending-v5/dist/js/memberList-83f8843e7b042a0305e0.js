/*! 版权所有，翻版必究 */!function(e){function t(t){for(var a,r,s=t[0],l=t[1],c=t[2],u=0,m=[];u<s.length;u++)r=s[u],Object.prototype.hasOwnProperty.call(i,r)&&i[r]&&m.push(i[r][0]),i[r]=0;for(a in l)Object.prototype.hasOwnProperty.call(l,a)&&(e[a]=l[a]);for(d&&d(t);m.length;)m.shift()();return o.push.apply(o,c||[]),n()}function n(){for(var e,t=0;t<o.length;t++){for(var n=o[t],a=!0,s=1;s<n.length;s++){var l=n[s];0!==i[l]&&(a=!1)}a&&(o.splice(t--,1),e=r(r.s=n[0]))}return e}var a={},i={19:0},o=[];function r(t){if(a[t])return a[t].exports;var n=a[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,r),n.l=!0,n.exports}r.m=e,r.c=a,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)r.d(n,a,function(t){return e[t]}.bind(null,a));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="";var s=window.webpackJsonp=window.webpackJsonp||[],l=s.push.bind(s);s.push=t,s=s.slice();for(var c=0;c<s.length;c++)t(s[c]);var d=l;o.push([254,0]),n()}({254:function(e,t,n){"use strict";n.r(t);n(633);layui.use(["table","form","layer","tree","util","transfer"],function(){tooltip(".refreshBtnList",{transition:!0,time:200});var e=window.parent.permissionsData1(),t=permissionsVal1({389:!1,390:!1,397:!1,451:!1},e);function n(){t[389]?$(".addBtn").removeClass("hide"):$(".addBtn").addClass("hide"),t[390]?$(".listEdit").removeClass("hide"):$(".listEdit").addClass("hide"),t[397]?$(".del-btn").removeClass("hides"):$(".del-btn").addClass("hides"),t[451]?$(".userMachine").removeClass("hides"):$(".userMachine").addClass("hides")}n();var a=layui.table,i=layui.layer,o=(i=layui.layer,layui.util,layui.tree),r=layui.transfer,s=sessionStorage.token,l=sessionStorage.UserId,c=a.render({elem:"#tableTest",url:"".concat(vApi,"/user/findUser"),method:"post",contentType:"application/json",headers:{token:s},cols:[[{field:"userName",width:180,title:"用户名",align:"center"},{field:"name",width:150,title:"姓名",align:"center"},{field:"open",width:150,title:"状态",align:"center",templet:function(e){return 0==e.open?"不启用":"启用"}},{field:"roleSign",width:150,align:"center",title:"售货机管理员",templet:function(e){return 0==e.roleSign?"否":"是"}},{field:"alias",width:250,title:"用户编号",align:"center"},{field:"phone",width:150,title:"手机号",align:"center"},{field:"merchantName",width:200,title:"所属商户",align:"center"},{field:"addUser",width:150,title:"创建人",align:"center"},{field:"addTime",width:180,title:"创建时间",align:"center"},{field:"lastUser",width:150,title:"最后修改人",align:"center"},{field:"lastTime",width:180,title:"最后修改时间",align:"center"},{field:"operation",fixed:"right",align:"center",right:0,width:150,title:"操作",toolbar:"#barDemo"}]],id:"tableId",page:!0,loading:!0,request:{pageName:"pageNum",limitName:"pageSize"},where:{condition:sessionStorage.machineID},parseData:function(e){return fixedFun(),200==e.code?{code:e.code,msg:e.message,count:e.data.total,data:e.data.list}:403!=e.code?{code:e.code,msg:e.message}:void(window.parent.location.href="login.html")},response:{statusCode:200},done:function(e){n(),403==e.code?window.parent.location.href="login.html":405==e.code&&$(".hangContent").show()}}),d=null;$(".queryBtnClick ").click(function(){c.reload({where:{conditionTwo:$('.mian input[name="keyMerchants"]').val()}})});var u=null,m=null,p=null;a.on("tool(test)",function(e){if(event.stopPropagation(),u=e.data,m=e.data,d=u.uuid,"sysadmin"==u.userName?$(".ListOperation .Status").removeClass("hide"):$(".ListOperation .Status").addClass("hide"),1==u.open?$(".ListOperation .Status").html("禁用"):$(".ListOperation .Status").html("启用"),"operation"===e.event){if(p==e.data.uuid)return $(".ListOperation").fadeOut(),void(p=null);p=e.data.uuid,$(".ListOperation").fadeIn(),$(".ListOperation").css({left:$(this).offset().left-35+"px",top:$(this).offset().top+35+"px"})}}),$(".ListOperation .Status").click(function(){i.confirm(1==u.open?"确定禁用？":"确定启用？",function(e){var t=1==u.open?0:1;i.close(e);var n=JSON.stringify({id:u.uuid,status:t});loadingAjax("/user/switchById","post",n,sessionStorage.token,"","","",i).then(function(e){i.msg(e.message,{icon:1}),c.reload({where:{}}),0==t&&k(u.uuid)}).catch(function(e){i.msg(e.message,{icon:7})})})}),$(".ListOperation .edit").click(function(){var e,t,n,a,r;0!=y.length?("sysadmin"==u.userName?$(".switchListStatus").hide():$(".switchListStatus").show(),$('.inputWidth input[name="userName"]').prop("disabled",!0),$(".treeTest").show(),$(".OperationHeader span").html("编辑用户"),f=2,popupShow("MemberOperation","MemberContent"),h.val("information",{userName:u.userName,name:u.name,userPwd:"      ",DuserPwd:"      ",alonePwd:"      ",DalonePwd:"      ",phone:u.phone,cardId:u.cardId,startThe:u.open?"on":"",administrator:u.roleSign?"on":"",marchantsListname:u.merchantName}),o.reload("treelistEdit",{}),$('.terminal input[name="topmachantsVal"]').val(u.merchantId),h.render("select"),e=v,t="checkCont",n=u,a=u.merchantId,r="",e.forEach(function(e,t){r+='<div>\n                     <input type="checkbox" '.concat(1!=a&&0==t?"disabled":"",'  name="').concat(e.id,'" title="').concat(e.name,'"lay-skin="primary" value="').concat(e.id,'"></input>\n                   </div>')}),$(".".concat(t)).empty(),$(".".concat(t)).html(r),$(".roleCont").show(),n.roles.forEach(function(n,a){for(var i=0;i<e.length;i++)n.id==e[i].id&&$(".".concat(t," input")).eq(i).prop("checked",!0)}),h.render("checkbox")):i.msg("服务器请求超时",{icon:7})}),$(".ListOperation .stores").click(function(){0!=u.roleSign?C(u.uuid):i.msg("该用户不是售货机管理员",{icon:7})}),$(".ListOperation .role").click(function(){if(0!=u.roles.length){var e="";u.roles.forEach(function(t,n){e+="<p>".concat(t.name,"</p>")}),$(".RoleListBody>div").empty(),$(".RoleListBody>div").html(e),popupShow("roleContList","RoleListBox")}else i.msg("该用户没有配置角色",{icon:7})}),$(".delete").click(function(){i.confirm("确定删除？",function(e){$.ajax({type:"get",url:"".concat(vApi,"/user/deleteById"),headers:{token:s},data:{id:Number(u.uuid)},success:function(t){200==t.code?(i.msg(t.message,{icon:1}),i.close(e),c.reload({where:{}}),k(u.uuid)):403==t.code?window.parent.location.href="login.html":i.msg(t.message,{icon:2})}})})});var h=layui.form,f=null;function g(e,t){var n=$(e).val();if(n&&!/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[~!@#$%^&*()_+`\-={}:";'<>?,.\/]).{6,64}$/.test(n))return t.msg("密码必须包含英文和数字以及特殊字符且不少于6位数",{icon:7}),$(e).val(""),!1}$(".addBtn").click(function(){0!=y.length?(o.reload("treelistEdit",{}),$('.inputWidth input[name="userName"]').prop("disabled",!1),$(".treeTest").hide(),popupShow("MemberOperation","MemberContent"),f=$(this).attr("typeID"),d=null,$(".OperationHeader span").html("添加用户"),h.val("information",{userName:"",name:"",userPwd:"",alonePwd:"",phone:"",cardId:"",DalonePwd:"",DuserPwd:""}),$(".checkCont").empty(),$(".roleCont").hide()):i.msg("服务器请求超时",{icon:7})}),$(".cancel_btn").click(function(){popupHide("MemberOperation","MemberContent")}),$(".submit_btn").click(function(){var e=h.val("information"),t=null;if(e.userName&&e.name&&e.userPwd&&e.alonePwd&&e.phone&&e.marchantsListname)if(e.userName&&e.name&&e.phone&&e.marchantsListname)if(e.DuserPwd==e.userPwd)if(e.alonePwd==e.DalonePwd){if($(".mask").fadeIn(),$(".maskSpan").addClass("maskIcon"),"1"==f)t="".concat(vApi,"/user/saveUser");else{t="".concat(vApi,"/user/updateUser");var n=h.val("checkboxData"),a=[];for(var o in n)a.push(Number(n[o]))}var r=null;w.forEach(function(t,n){e.topmachantsVal==t.id&&(r=t.alias)});var u=e.startThe?1:0,m=e.administrator?1:0;console.log(e),t&&$.ajax({type:"post",url:t,headers:{"Content-Type":"application/json",token:s},data:JSON.stringify({uid:d,username:e.userName,name:e.name,userPwd:"      "!=e.userPwd?hex_md5(e.userPwd):"",alonePwd:"      "!=e.alonePwd?hex_md5(e.alonePwd):"",phone:e.phone,cardId:e.cardId,open:u,roleSign:m,roleId:2==f?a:null,merchantId:Number(e.topmachantsVal),alias:r}),success:function(t){$(".mask").fadeOut(),$(".maskSpan").removeClass("maskIcon"),200==t.code?(2==f&&(k(d),l==d&&(sessionStorage.machineID=e.marchantsListname)),c.reload({where:{}}),h.val("information",{userName:"",name:"",userPwd:"",alonePwd:"",phone:"",cardId:""}),$(".MemberOperation").fadeOut(),i.msg(t.message,{icon:1})):403==t.code?window.parent.location.href="login.html":i.msg(t.message,{icon:2})},error:function(e){$(".mask").fadeOut(),$(".maskSpan").removeClass("maskIcon"),i.msg("请求服务器超时",{icon:2})}})}else i.msg("独立密码不一致",{icon:7});else i.msg("登录密码不一致",{icon:7});else i.msg("带*为必填",{icon:7});else i.msg("带*为必填",{icon:7})}),$('.listInput input[name="phone"]').blur(function(){var e=$(this).val();if(e&&!/^1[3456789]\d{9}$/.test(e))return i.msg("请填写正确的手机号码",{icon:7}),$(this).val(""),!1}),$('.listInput input[name="userPwd"]').blur(function(){g(this,i)}),$('.listInput input[name="alonePwd"]').blur(function(){g(this,i)});var v=null;$.ajax({type:"post",headers:{"Content-Type":"application/json",token:s},url:"".concat(vApi,"/role/findRole"),data:JSON.stringify({pageNum:1,pageSize:1e3}),success:function(e){200==e.code&&(v=e.data.list)},error:function(e){i.msg("服务器请求超时",{icon:2})}}),h.on("select(stateSelect)",function(e){0==e.value?$('.checkCont input[name="100001"]').prop("disabled",!1):($('.checkCont input[name="100001"]').prop("checked",!1),$('.checkCont input[name="100001"]').prop("disabled",!0)),h.render("checkbox")});var w=merchantsListMian("");$(".sidebar i").click(function(){$(".left-mian").hide(),$(".onLeft").show()}),$(".onLeft").click(function(){$(this).hide(),$(".left-mian").show()});var y=null,b=y=treeList();function k(e){var t=JSON.stringify({uid:e,msg:"用户信息发生变更，请重新登录！",tag:2});loadingAjax("/pushWebMsg","post",t,sessionStorage.token).then(function(e){}).catch(function(e){})}$('.terminal input[name="marchantsListname"]').val(b[0].title),$('.terminal input[name="topmachantsVal"]').val(b[0].id),$(".refreshBtn").click(function(){location.reload()}),$("body").bind("keydown",function(e){116==e.keyCode&&f5Fun()}),$(".playHeader .close").click(function(){$(this).parent().parent().addClass("margin0"),$(this).parents(".maskContnet").fadeOut()}),$('.inputWidth input[name="userName"]').blur(function(){ChineseREgular(this,i)});o.render({elem:"#test1",id:"treelistAdd",showLine:!0,onlyIconControl:!0,isJump:!1,edit:!1,data:y,text:{defaultNodeName:"无数据",none:""},click:function(e){$('.terminal input[name="marchantsListname"]').val(e.data.title),$('.terminal input[name="topmachantsVal"]').val(e.data.id),c.reload({where:{condition:e.data.id+""}});for(var t=$("#test1 .layui-tree-txt"),n=0;n<t.length;n++)t[n].innerHTML===e.data.title?t[n].style.color="#be954a":t[n].style.color="#555"}}),o.render({elem:"#test2",id:"treelistEdit",showLine:!0,onlyIconControl:!0,isJump:!1,edit:!1,data:y,text:{defaultNodeName:"无数据",none:""},click:function(e){$('.terminal input[name="marchantsListname"]').val(e.data.title),$('.terminal input[name="topmachantsVal"]').val(e.data.id),1==e.data.id?$('.checkCont input[name="100001"]').prop("disabled",!1):($('.checkCont input[name="100001"]').prop("checked",!1),$('.checkCont input[name="100001"]').prop("disabled",!0)),h.render("checkbox");for(var t=$(".terminal .layui-tree-txt"),n=0;n<t.length;n++)t[n].innerHTML===e.data.title?t[n].style.color="#be954a":t[n].style.color="#555"}});var S=[],O=[];function C(e){loadingAjax("/user/getUserMachine","post",JSON.stringify({UUId:e}),sessionStorage.token).then(function(e){S=[],O=[],e.data.select.forEach(function(e,t){O.push(e.machineId)}),e.data.unSelect.concat(e.data.select).forEach(function(e,t){var n={value:e.machineId,title:e.info?e.info+"("+e.number+")":"(此为未命名的新售货机)"};S.push(n),function e(t,n){r.render({elem:"#test6",data:t,title:["未配置的售货机","已配置的售货机"],width:380,height:500,value:n,onchange:function(t,n){var a=[];i.confirm("确定修改配置？",function(o){t.forEach(function(e,t){O.push(e.value),a.push(e.value)}),i.close(o);var r=JSON.stringify({UUID:m.uuid,machineId:a,select:0==n?1:0});loadingAjax("/user/configUserMachine","post",r,sessionStorage.token,"mask","","",i).then(function(e){i.msg(e.message,{icon:1}),C(m.uuid)}).catch(function(t){i.msg(t.message,{icon:2}),e(S,O)})},function(t){e(S,O)})}})}(S,O)}),0!=S.length||0!=O.length?popupShow("storesCont","storesBox"):i.msg("该用户所属商户没有售货机",{icon:7})}).catch(function(e){console.log(e),i.msg(e.message,{icon:2})})}$(".refreshBtnList").click(function(){var e=treeList();JSON.stringify(e)!=JSON.stringify(b)?(y=e,o.reload("treelistAdd",{data:y}),c.reload({where:{condition:sessionStorage.machineID}}),i.msg("已刷新",{icon:1})):i.msg("已刷新",{icon:1})}),$("body").click(function(){$(".ListOperation").fadeOut(),p=null})})},633:function(e,t){}});