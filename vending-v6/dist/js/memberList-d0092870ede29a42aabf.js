/*! 版权所有，翻版必究 */!function(e){function t(t){for(var i,r,s=t[0],c=t[1],l=t[2],u=0,p=[];u<s.length;u++)r=s[u],Object.prototype.hasOwnProperty.call(a,r)&&a[r]&&p.push(a[r][0]),a[r]=0;for(i in c)Object.prototype.hasOwnProperty.call(c,i)&&(e[i]=c[i]);for(d&&d(t);p.length;)p.shift()();return o.push.apply(o,l||[]),n()}function n(){for(var e,t=0;t<o.length;t++){for(var n=o[t],i=!0,s=1;s<n.length;s++){var c=n[s];0!==a[c]&&(i=!1)}i&&(o.splice(t--,1),e=r(r.s=n[0]))}return e}var i={},a={19:0},o=[];function r(t){if(i[t])return i[t].exports;var n=i[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,r),n.l=!0,n.exports}r.m=e,r.c=i,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)r.d(n,i,function(t){return e[t]}.bind(null,i));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="";var s=window.webpackJsonp=window.webpackJsonp||[],c=s.push.bind(s);s.push=t,s=s.slice();for(var l=0;l<s.length;l++)t(s[l]);var d=c;o.push([242,0]),n()}({242:function(e,t,n){"use strict";n.r(t);n(604);layui.use(["table","form","layer","tree","util","transfer"],function(){var e=window.parent.permissionsData1(),t=permissionsVal1({389:!1,390:!1,397:!1,451:!1},e);function n(){t[389]?$(".addBtn").removeClass("hide"):$(".addBtn").addClass("hide"),t[390]?$(".listEdit").removeClass("hide"):$(".listEdit").addClass("hide"),t[397]?$(".del-btn").removeClass("hides"):$(".del-btn").addClass("hides"),t[451]?$(".userMachine").removeClass("hides"):$(".userMachine").addClass("hides")}n();var i=layui.table,a=layui.layer,o=(a=layui.layer,layui.util,layui.tree),r=(layui.transfer,sessionStorage.token),s=sessionStorage.UserId,c=i.render({elem:"#tableTest",url:"".concat(vApi,"/user/findUser"),method:"post",contentType:"application/json",headers:{token:r},height:600,cols:[[{field:"userName",width:150,title:"用户名",align:"center"},{field:"name",width:120,title:"姓名",align:"center"},{field:"open",width:100,title:"状态",align:"center",templet:function(e){return 0==e.open?"不启用":"启用"}},{field:"roleSign",width:120,align:"center",title:"售货机管理员",templet:function(e){return 0==e.roleSign?"否":"是"}},{field:"alias",width:200,title:"用户编号",align:"center"},{field:"phone",width:150,title:"手机号",align:"center"},{field:"merchantName",width:200,title:"所属商户",align:"center"},{field:"addUser",width:150,title:"创建人",align:"center"},{field:"addTime",width:180,title:"创建时间",align:"center"},{field:"lastUser",width:150,title:"最后修改人",align:"center"},{field:"lastTime",width:180,title:"最后修改时间",align:"center"},{field:"operation",fixed:"right",align:"center",right:0,width:150,title:"操作",toolbar:"#barDemo"}]],id:"tableId",page:!0,loading:!0,request:{pageName:"pageNum",limitName:"pageSize"},where:{condition:sessionStorage.machineID},parseData:function(e){return fixedFun(),200==e.code?{code:e.code,msg:e.message,count:e.data.total,data:e.data.list}:403!=e.code?{code:e.code,msg:e.message}:void(window.parent.location.href="login.html")},response:{statusCode:200},done:function(e){n(),403==e.code?window.parent.location.href="login.html":405==e.code&&$(".hangContent").show()}}),l=null;$(".queryBtnClick ").click(function(){c.reload({where:{conditionTwo:$('.mian input[name="keyMerchants"]').val()}})});var d=null,u=null,p=null;i.on("tool(test)",function(e){if(event.stopPropagation(),d=e.data,u=e.data,l=d.uuid,"sysadmin"==d.userName?$(".ListOperation .Status").removeClass("hide"):$(".ListOperation .Status").addClass("hide"),1==d.open?$(".ListOperation .Status").html("禁用"):$(".ListOperation .Status").html("启用"),"operation"===e.event){if(p==e.data.uuid)return $(".ListOperation").fadeOut(),void(p=null);p=e.data.uuid,$(".ListOperation").fadeIn(),$(".ListOperation").css({left:$(this).offset().left-35+"px",top:$(this).offset().top+35+"px"})}}),$(".ListOperation .Status").click(function(){a.confirm(1==d.open?"确定禁用？":"确定启用？",function(e){var t=1==d.open?0:1;a.close(e);var n=JSON.stringify({id:d.uuid,status:t});loadingAjax("/user/switchById","post",n,sessionStorage.token,"","","",a).then(function(e){a.msg(e.message,{icon:1}),c.reload({where:{}}),0==t&&k(d.uuid)}).catch(function(e){a.msg(e.message,{icon:7})})})}),$(".ListOperation .edit").click(function(){0!=w.length?("sysadmin"==d.userName?$(".switchListStatus").hide():$(".switchListStatus").show(),$('.inputWidth input[name="userName"]').prop("disabled",!0),$(".treeTest").show(),$(".OperationHeader span").html("编辑用户"),h=2,popupShow("MemberOperation","MemberContent"),m.val("information",{userName:d.userName,name:d.name,userPwd:"      ",DuserPwd:"      ",alonePwd:"      ",DalonePwd:"      ",phone:d.phone,cardId:d.cardId,startThe:d.open?"on":"",administrator:d.roleSign?"on":"",marchantsListname:d.merchantName}),o.reload("treelistEdit",{}),$('.terminal input[name="topmachantsVal"]').val(d.merchantId),m.render("select"),function(e,t,n,i){var a="";e.forEach(function(e,t){a+='<div>\n                     <input type="checkbox" '.concat(1!=i&&0==t?"disabled":"",'  name="').concat(e.id,'" title="').concat(e.name,'"lay-skin="primary" value="').concat(e.id,'"></input>\n                   </div>')}),$(".".concat(t)).empty(),$(".".concat(t)).html(a),$(".roleCont").show(),n.roles.forEach(function(n,i){for(var a=0;a<e.length;a++)n.id==e[a].id&&$(".".concat(t," input")).eq(a).prop("checked",!0)}),m.render("checkbox")}(g,"checkCont",d,d.merchantId)):a.msg("服务器请求超时",{icon:7})}),$(".ListOperation .role").click(function(){if(0!=d.roles.length){var e="";d.roles.forEach(function(t,n){e+="<p>".concat(t.name,"</p>")}),$(".RoleListBody>div").empty(),$(".RoleListBody>div").html(e),popupShow("roleContList","RoleListBox")}else a.msg("该用户没有配置角色",{icon:7})}),$(".delete").click(function(){a.confirm("确定删除？",function(e){$.ajax({type:"get",url:"".concat(vApi,"/user/deleteById"),headers:{token:r},data:{id:Number(d.uuid)},success:function(t){200==t.code?(a.msg(t.message,{icon:1}),a.close(e),c.reload({where:{}}),k(d.uuid)):403==t.code?window.parent.location.href="login.html":a.msg(t.message,{icon:2})}})})});var m=layui.form,h=null;function f(e,t){var n=$(e).val();if(n&&!/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[~!@#$%^&*()_+`\-={}:";'<>?,.\/]).{6,64}$/.test(n))return t.msg("密码必须包含英文和数字以及特殊字符且不少于6位数",{icon:7}),$(e).val(""),!1}$(".addBtn").click(function(){0!=w.length?(o.reload("treelistEdit",{}),$('.inputWidth input[name="userName"]').prop("disabled",!1),$(".treeTest").hide(),popupShow("MemberOperation","MemberContent"),h=$(this).attr("typeID"),l=null,$(".OperationHeader span").html("添加用户"),m.val("information",{userName:"",name:"",userPwd:"",alonePwd:"",phone:"",cardId:"",DalonePwd:"",DuserPwd:""}),$(".checkCont").empty(),$(".roleCont").hide()):a.msg("服务器请求超时",{icon:7})}),$(".cancel_btn").click(function(){popupHide("MemberOperation","MemberContent")}),$(".submit_btn").click(function(){var e=m.val("information"),t=null;if(e.userName&&e.name&&e.userPwd&&e.alonePwd&&e.phone&&e.marchantsListname)if(e.userName&&e.name&&e.phone&&e.marchantsListname)if(e.DuserPwd==e.userPwd)if(e.alonePwd==e.DalonePwd){if($(".mask").fadeIn(),$(".maskSpan").addClass("maskIcon"),"1"==h)t="".concat(vApi,"/user/saveUser");else{t="".concat(vApi,"/user/updateUser");var n=m.val("checkboxData"),i=[];for(var o in n)i.push(Number(n[o]))}var d=null;v.forEach(function(t,n){e.topmachantsVal==t.id&&(d=t.alias)});var u=e.startThe?1:0,p=e.administrator?1:0;console.log(e),t&&$.ajax({type:"post",url:t,headers:{"Content-Type":"application/json",token:r},data:JSON.stringify({uid:l,username:e.userName,name:e.name,userPwd:"      "!=e.userPwd?hex_md5(e.userPwd):"",alonePwd:"      "!=e.alonePwd?hex_md5(e.alonePwd):"",phone:e.phone,cardId:e.cardId,open:u,roleSign:p,roleId:2==h?i:null,merchantId:Number(e.topmachantsVal),alias:d}),success:function(t){$(".mask").fadeOut(),$(".maskSpan").removeClass("maskIcon"),200==t.code?(2==h&&(k(l),s==l&&(sessionStorage.machineID=e.marchantsListname)),c.reload({where:{}}),m.val("information",{userName:"",name:"",userPwd:"",alonePwd:"",phone:"",cardId:""}),$(".MemberOperation").fadeOut(),a.msg(t.message,{icon:1})):403==t.code?window.parent.location.href="login.html":a.msg(t.message,{icon:2})},error:function(e){$(".mask").fadeOut(),$(".maskSpan").removeClass("maskIcon"),a.msg("请求服务器超时",{icon:2})}})}else a.msg("独立密码不一致",{icon:7});else a.msg("登录密码不一致",{icon:7});else a.msg("带*为必填",{icon:7});else a.msg("带*为必填",{icon:7})}),$('.listInput input[name="phone"]').blur(function(){var e=$(this).val();if(e&&!/^1[3456789]\d{9}$/.test(e))return a.msg("请填写正确的手机号码",{icon:7}),$(this).val(""),!1}),$('.listInput input[name="userPwd"]').blur(function(){f(this,a)}),$('.listInput input[name="alonePwd"]').blur(function(){f(this,a)});var g=null;$.ajax({type:"post",headers:{"Content-Type":"application/json",token:r},url:"".concat(vApi,"/role/findRole"),data:JSON.stringify({pageNum:1,pageSize:1e3}),success:function(e){200==e.code&&(g=e.data.list)},error:function(e){a.msg("服务器请求超时",{icon:2})}}),m.on("select(stateSelect)",function(e){0==e.value?$('.checkCont input[name="100001"]').prop("disabled",!1):($('.checkCont input[name="100001"]').prop("checked",!1),$('.checkCont input[name="100001"]').prop("disabled",!0)),m.render("checkbox")});var v=merchantsListMian("");$(".sidebar i").click(function(){$(".left-mian").hide(),$(".onLeft").show()}),$(".onLeft").click(function(){$(this).hide(),$(".left-mian").show()});var w=null,y=w=treeList();function k(e){var t=JSON.stringify({uid:e,msg:"用户信息发生变更，请重新登录！",tag:2});loadingAjax("/pushWebMsg","post",t,sessionStorage.token).then(function(e){}).catch(function(e){})}$('.terminal input[name="marchantsListname"]').val(y[0].title),$('.terminal input[name="topmachantsVal"]').val(y[0].id),$(".refreshBtn").click(function(){location.reload()}),$("body").bind("keydown",function(e){116==e.keyCode&&f5Fun()}),$(".playHeader .close").click(function(){$(this).parent().parent().addClass("margin0"),$(this).parents(".maskContnet").fadeOut()}),$('.inputWidth input[name="userName"]').blur(function(){ChineseREgular(this,a)});o.render({elem:"#test1",id:"treelistAdd",showLine:!0,onlyIconControl:!0,isJump:!1,edit:!1,data:w,text:{defaultNodeName:"无数据",none:""},click:function(e){$('.terminal input[name="marchantsListname"]').val(e.data.title),$('.terminal input[name="topmachantsVal"]').val(e.data.id),c.reload({where:{condition:e.data.id+""}});for(var t=$("#test1 .layui-tree-txt"),n=0;n<t.length;n++)t[n].innerHTML===e.data.title?t[n].style.color="#be954a":t[n].style.color="#555"}}),o.render({elem:"#test2",id:"treelistEdit",showLine:!0,onlyIconControl:!0,isJump:!1,edit:!1,data:w,text:{defaultNodeName:"无数据",none:""},click:function(e){$('.terminal input[name="marchantsListname"]').val(e.data.title),$('.terminal input[name="topmachantsVal"]').val(e.data.id),1==e.data.id?$('.checkCont input[name="100001"]').prop("disabled",!1):($('.checkCont input[name="100001"]').prop("checked",!1),$('.checkCont input[name="100001"]').prop("disabled",!0)),m.render("checkbox");for(var t=$(".terminal .layui-tree-txt"),n=0;n<t.length;n++)t[n].innerHTML===e.data.title?t[n].style.color="#be954a":t[n].style.color="#555"}});$(".ListOperation .stores").click(function(){0!=d.roleSign?(popupShow("storesCont","storesBox"),b(d.uuid)):a.msg("该用户不是售货机管理员",{icon:7})});function b(e){loadingAjax("/user/getUserMachine","post",JSON.stringify({UUId:e}),sessionStorage.token).then(function(e){var t=e.data,n=t.all,i=t.userSelect;n.forEach(function(e){e.checked=!1,e.children.forEach(function(e){e.checked=!1}),i.forEach(function(t){e.id===t.id&&t.children&&(e.checked=!0),e.children.forEach(function(e){t.children.forEach(function(t){e.id===t.id&&(e.checked=!0)})})}),e&&e.children&&e.children.length>0&&e.children.forEach(function(t){!1===t.checked&&(e.checked=!1)})}),function(e){o.render({elem:"#test6",data:e,id:"treeMachine",showCheckbox:!0,accordion:!0,spread:!0,onlyIconControl:!0})}(n)})}$(".storeSubmit").click(function(){var e=function e(t,n){for(var i in t)t[i].children||n.push(t[i].id),n=e(t[i].children,n);return n}(o.getChecked("treeMachine"),[]);console.log(e),a.confirm("确定修改配置？",function(t){a.close(t);var n=JSON.stringify({UUID:u.uuid,machineId:e});loadingAjax("/user/configUserMachine","post",n,sessionStorage.token,"mask","","",a).then(function(e){a.msg(e.message,{icon:1}),popupHide("storesCont","storesBox"),b(u.uuid)}).catch(function(e){a.msg(e.message,{icon:2})})})}),$(".refreshBtnList").click(function(){var e=treeList();JSON.stringify(e)!=JSON.stringify(y)?(w=e,o.reload("treelistAdd",{data:w}),c.reload({where:{condition:sessionStorage.machineID}}),a.msg("已刷新",{icon:1})):a.msg("已刷新",{icon:1})}),$("body").click(function(){$(".ListOperation").fadeOut(),p=null})})},604:function(e,t){}});