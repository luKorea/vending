/*! 版权所有，翻版必究 */!function(e){function t(t){for(var o,s,r=t[0],l=t[1],c=t[2],d=0,p=[];d<r.length;d++)s=r[d],Object.prototype.hasOwnProperty.call(a,s)&&a[s]&&p.push(a[s][0]),a[s]=0;for(o in l)Object.prototype.hasOwnProperty.call(l,o)&&(e[o]=l[o]);for(u&&u(t);p.length;)p.shift()();return i.push.apply(i,c||[]),n()}function n(){for(var e,t=0;t<i.length;t++){for(var n=i[t],o=!0,r=1;r<n.length;r++){var l=n[r];0!==a[l]&&(o=!1)}o&&(i.splice(t--,1),e=s(s.s=n[0]))}return e}var o={},a={22:0},i=[];function s(t){if(o[t])return o[t].exports;var n=o[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,s),n.l=!0,n.exports}s.m=e,s.c=o,s.d=function(e,t,n){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},s.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(s.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)s.d(n,o,function(t){return e[t]}.bind(null,o));return n},s.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="";var r=window.webpackJsonp=window.webpackJsonp||[],l=r.push.bind(r);r.push=t,r=r.slice();for(var c=0;c<r.length;c++)t(r[c]);var u=l;i.push([255,0]),n()}({255:function(e,t,n){"use strict";n.r(t);n(630);var o=null;layui.use(["table","form","layer","tree"],function(){var e=layui.table,t=layui.form,n=layui.layer,a=layui.tree,i=sessionStorage.token;$(".playHeader .close").click(function(){$(this).parent().parent().addClass("margin0"),$(this).parents(".maskContnet").fadeOut()}),$("body").bind("keydown",function(e){116==e.keyCode&&f5Fun()}),$(".refreshBtn").click(function(){location.reload()}),o=e.render({elem:"#massageTable",method:"post",url:"".concat(vApi,"/notices/getHistoryMsg"),contentType:"application/json",headers:{token:sessionStorage.token},cols:[[{field:"title",title:"消息标题",align:"center"},{field:"name",title:"状态",align:"center",templet:function(e){return 0==e.is_read?"未读":"已读"}},{field:"create_user",title:"创建人",align:"center",templet:function(e){return"<div>".concat(e.usName,"</div><div>(").concat(e.um,")</div>")}},{field:"create_time",title:"创建时间",align:"center",templet:function(e){return e.create_time?timeStamp(e.create_time):"-"}}]],id:"messageId",page:!0,loading:!0,request:{pageName:"pageNum",limitName:"pageSize"},where:{type:1},parseData:function(e){return 200==e.code?{code:e.code,msg:e.message,count:e.data.total,data:e.data.list}:403!=e.code?{code:e.code,msg:e.message}:void(window.parent.location.href="login.html")},response:{statusCode:200},done:function(e){}});var s=new(0,window.wangEditor)("#addWangEditor");s.customConfig.customUploadImg=function(e,t){console.log(e);var o=new FormData;o.append("file",e[0]),$.ajax({type:"post",url:"".concat(vApi,"/fileUpload"),processData:!1,contentType:!1,timeout:1e4,headers:{token:i},data:o,success:function(e){0==e.code?t(e.data.src):n.msg(e.message,{icon:7})},error:function(e){n.msg("上传失败",{icon:2})}})},s.create(),$(".pushMessageCont .chooseUserBtn").click(function(){u||(u=a.render({elem:"#test1",id:"treelist",showLine:!0,onlyIconControl:!0,data:r,spread:!0,text:{defaultNodeName:"无数据",none:"您没有权限，请联系管理员授权!"},click:function(e){console.log(e),d.reload({where:{condition:e.data.id}}),l=e.data.id,c=e.data.title;for(var t=$("#test1 .layui-tree-txt"),n=0;n<t.length;n++)t[n].innerHTML===e.data.title?t[n].style.color="#be954a":t[n].style.color="#555"}}),d=e.render({elem:"#userList",url:"".concat(vApi,"/user/findUser"),method:"post",contentType:"application/json",headers:{token:i},cols:[[{checkbox:!0,width:70,align:"center"},{field:"userName",title:"用户名",align:"center"},{field:"name",title:"姓名",align:"center"},{field:"open",title:"状态",align:"center",templet:function(e){return 0==e.open?"不启用":"启用"}},{field:"roleSign",align:"center",title:"售货机管理员",templet:function(e){return 0==e.roleSign?"否":"是"}},{field:"alias",title:"用户编号",align:"center"},{field:"phone",title:"手机号",align:"center"},{field:"merchantName",title:"所属商户",align:"center"}]],id:"userId",page:!0,loading:!0,request:{pageName:"pageNum",limitName:"pageSize"},where:{condition:sessionStorage.machineID},parseData:function(e){return 200==e.code?{code:e.code,msg:e.message,count:e.data.total,data:e.data.list}:403!=e.code?{code:e.code,msg:e.message}:void(window.parent.location.href="login.html")},response:{statusCode:200},done:function(e){console.log(g),p=[],200==e.code&&e.data.forEach(function(e){for(var n in p.push(e.uuid),g){var o=g[n];e.uuid==o&&($(".userContent tr[data-index="+n+'] input[type="checkbox"]').prop("checked",!0),t.render())}})}})),popupShow("userContent","userBox")});var r=treeList(),l=sessionStorage.machineID,c=r[0]?r[0].title:"",u=null;0==r.length?$(".addPushBtn").hide():$(".addPushBtn").show();var d=null;var p=[],g=[],m=[];function f(e,t){loadingAjax("/notices/addMessage","post",e,sessionStorage.token,"mask","pushMessageCont","pushMessageBox",n).then(function(e){n.msg(e.message,{icon:1}),popupHide("pushMessageCont","pushMessageBox"),1==t?h(p):2==t&&h(g),g=[],$('.pushMessageCont input[name="title"]').val(""),$(".chooseTitle").html("未选择"),s.txt.html(""),v&&v.reload({where:{}})}).catch(function(e){console.log(e),n.msg(e.message,{icon:2})})}$(".userContent .cancelBtn").click(function(){popupHide("userContent","userBox")}),e.on("checkbox(userList)",function(e){if(console.log(e.data),"all"==e.type)if(console.log(g),e.checked)p.forEach(function(e){g.includes(e)||g.push(e)}),console.log(g);else{var t=[];g.forEach(function(e){p.includes(e)||t.push(e)}),g=t}else e.checked?g.push(e.data.uuid):g.splice(g.indexOf(e.data.uuid),1)}),$(".userContent .confirmBtn").click(function(){m=g,popupHide("userContent","userBox"),m.length>0?$(".chooseTitle").html("已选择"):$(".chooseTitle").html("未选择")}),$(".pushMessageCont .cancelBtn").click(function(){popupHide("pushMessageCont","pushMessageBox")}),$(".addPushBtn").click(function(){popupShow("pushMessageCont","pushMessageBox")}),$(".pushMessageCont .confirmBtn").click(function(){if($('.pushMessageCont input[name="title"]').val())if(s.txt.html().length>11)if(0==g.length){var e=JSON.stringify({title:$('.pushMessageCont input[name="title"]').val(),content:s.txt.html(),merchantId:0==g.length?Number(l):""});n.confirm("您没有选择用户,消息将发送给".concat(c,"商户的所有用户"),function(t){n.close(t),$(".mask").fadeIn(),$(".maskSpan").addClass("maskIcon"),f(e,1)})}else{e=JSON.stringify({title:$('.pushMessageCont input[name="title"]').val(),content:s.txt.html(),uuid:g});$(".mask").fadeIn(),$(".maskSpan").addClass("maskIcon"),f(e,2)}else n.msg("公告详情最少五个字",{icon:7});else n.msg("带*未必填",{icon:7})}),$(".queryBtn").click(function(){o.reload({where:{keyword:$(".KyeText").val()}})});function h(e){console.log(e),e.forEach(function(e){var t=JSON.stringify({uid:e,msg:"消息通知",tag:3});loadingAjax("/pushWebMsg","post",t,sessionStorage.token).then(function(e){console.log(e)}).catch(function(e){console.log(e)})})}e.on("row(massageTable)",function(e){var t=e.data;0==t.is_read&&function(e){var t=JSON.stringify({message_id:e});loadingAjax("/notices/readMessage","post",t,sessionStorage.token,"","","",n).then(function(e){o.reload({where:{}}),window.parent.messageFunList()}).catch(function(e){console.log(e),n.msg("阅读消息失败",{icon:2})})}(t.id),$(".messageDetails .playHeader span").html("".concat(t.title)),$(".messageDetails .detailsHtml ").html(t.content),popupShow("messageDetails","detailsBox")});var v=null;$(".messageListBtn").click(function(){v||(v=e.render({elem:"#massagePushList",method:"post",url:"".concat(vApi,"/notices/getHistoryMsg"),contentType:"application/json",headers:{token:sessionStorage.token},cols:[[{field:"title",title:"消息标题",align:"center"},{field:"create_user",title:"创建人",align:"center"},{field:"is_read",title:"接收人",align:"center",templet:function(e){return"<div>".concat(e.name,"</div><div>(").concat(e.username,")</div>")}},{field:"create_time",align:"center",title:"创建时间",templet:function(e){return e.create_time?timeStamp(e.create_time):"-"}}]],id:"messageListID",page:!0,loading:!0,request:{pageName:"pageNum",limitName:"pageSize"},where:{type:0},parseData:function(e){return 200==e.code?{code:e.code,msg:e.message,count:e.data.total,data:e.data.list}:403!=e.code?{code:e.code,msg:e.message}:void(window.parent.location.href="login.html")},response:{statusCode:200},done:function(e){}})),popupShow("pushMessageList","pushMessageListBox")}),e.on("row(massagePushList)",function(e){var t=e.data;$(".messageDetails .playHeader span").html("".concat(t.title)),$(".messageDetails .detailsHtml ").html(t.content),popupShow("messageDetails","detailsBox")})}),window.reloadFun=function(){o.reload({where:{}})}},630:function(e,t){}});