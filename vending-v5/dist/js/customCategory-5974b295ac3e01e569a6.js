/*! 版权所有，翻版必究 */!function(e){function t(t){for(var a,s,r=t[0],l=t[1],d=t[2],f=0,u=[];f<r.length;f++)s=r[f],Object.prototype.hasOwnProperty.call(i,s)&&i[s]&&u.push(i[s][0]),i[s]=0;for(a in l)Object.prototype.hasOwnProperty.call(l,a)&&(e[a]=l[a]);for(c&&c(t);u.length;)u.shift()();return o.push.apply(o,d||[]),n()}function n(){for(var e,t=0;t<o.length;t++){for(var n=o[t],a=!0,r=1;r<n.length;r++){var l=n[r];0!==i[l]&&(a=!1)}a&&(o.splice(t--,1),e=s(s.s=n[0]))}return e}var a={},i={10:0},o=[];function s(t){if(a[t])return a[t].exports;var n=a[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,s),n.l=!0,n.exports}s.m=e,s.c=a,s.d=function(e,t,n){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},s.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(s.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)s.d(n,a,function(t){return e[t]}.bind(null,a));return n},s.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="";var r=window.webpackJsonp=window.webpackJsonp||[],l=r.push.bind(r);r.push=t,r=r.slice();for(var d=0;d<r.length;d++)t(r[d]);var c=l;o.push([257,0]),n()}({257:function(e,t,n){"use strict";n.r(t);n(639);layui.use(["table","form","layer","tree"],function(){tooltip(".refreshBtnList",{transition:!0,time:200});var e=window.parent.permissionsData1(),t=permissionsVal1({373:!1,374:!1,372:!1,403:!1},e);function n(){t[373]?$(".addBtn").removeClass("hide"):$(".addBtn").addClass("hide"),t[374]?$(".ListOperation .edit").removeClass("hide"):$(".ListOperation .edit").addClass("hide"),t[372]?$(".ListOperation .del").removeClass("hide"):$(".ListOperation .del").addClass("hide"),t[374]||t[372]?$(".Toperation").removeClass("hide"):$(".Toperation").addClass("hide"),t[403]?$(".rankImg").removeClass("hide"):$(".rankImg").addClass("hide")}n(),sessionStorage.classTag=sessionStorage.machineID;var a=layui.table,i=layui.layer,o=layui.tree,s=null,r=sessionStorage.token,l=a.render({elem:"#tableTest",url:"".concat(vApi,"/classify/findAll"),method:"post",contentType:"application/json",headers:{token:r},cols:[[{field:"1",width:80,title:"",templet:"#imgtmp",event:"rank",align:"center"},{field:"rank",width:80,title:"排序",align:"center"},{field:"classifyName",width:150,title:"类目名",align:"center"},{field:"remark",width:150,title:"备注",align:"center"},{field:"user",width:150,title:"创建人",align:"center",templet:function(e){return null!=e.user?e.user.userName:""}},{field:"classifyTime",width:200,title:"创建时间",align:"center"},{field:"lastUser",width:150,title:"最后修改人",align:"center"},{field:"lastTime",width:190,title:"最后修改时间",align:"center"},{field:"operation",align:"center",position:"absolute",right:0,width:150,title:"操作",toolbar:"#barDemo"}]],id:"tableId",page:!0,loading:!0,request:{pageName:"pageNum",limitName:"pageSize"},where:{merchantId:sessionStorage.machineID},parseData:function(e){return 200==e.code?{code:e.code,msg:"",count:e.data.total,data:e.data.list}:403!=e.code?{code:e.code,msg:e.message}:void(window.parent.location.href="login.html")},response:{statusCode:200},done:function(e){s=e.data,n(),403==e.code?window.parent.location.href="login.html":405==e.code&&$(".hangContent").show()}});$(".queryBtn").click(function(){l.reload({where:{}})});$(".addBtn").click(function(){$('.addClass input[name="addTypeName"]').val(""),$('.addClass input[name="addNote"]').val(""),popupShow("addClass","addContent")}),$(".cancel-btn").click(function(){popupHide("addClass","addContent")});var d=layui.form;$(".determine-btn").click(function(){var e=d.val("aDDValData");if(e.addTypeName){var t=JSON.stringify({classifyName:e.addTypeName,remark:e.addNote,merchantId:Number(sessionStorage.machineID)});$(".mask").fadeIn(),$(".maskSpan").addClass("maskIcon"),loadingAjax("/classify/saveClassify","post",t,sessionStorage.token,"mask","addClass","addContent",i).then(function(e){i.msg(e.message,{icon:1}),l.reload({where:{}}),loadingAjax("/refreshGoods","post","",sessionStorage.token).then(function(e){}).catch(function(e){})}).catch(function(e){i.msg(e.message,{icon:2})})}else i.msg("请填写类目名")});var c=null,f=null,u=null;a.on("tool(test)",function(e){if(event.stopPropagation(),c=e.data,u=e,"operation"===e.event){if(f==e.data.classifyId)return $(".ListOperation").fadeOut(),void(f=null);f=e.data.classifyId,$(".ListOperation").fadeIn(),$(".ListOperation").css({left:$(this).offset().left-35+"px",top:$(this).offset().top+35+"px"})}else if("rank"==e.event){console.log(e);var t=JSON.stringify({topId:s[e.data.rank-1].classifyId,bottomId:s[e.data.rank-2].classifyId,merchantId:sessionStorage.classTag});loadingAjax("/classify/sortClassify","post",t,r,"","","",i).then(function(e){i.msg(e.message,{icon:1}),l.reload({where:{}})}).catch(function(e){i.msg(e.message,{icon:2})})}}),$(".ListOperation .edit").click(function(){popupShow("editClass","editContent"),d.val("editValData",{addTypeName:c.classifyName,addNote:c.remark})}),$(".ListOperation .del").click(function(){i.confirm("确定删除？",function(e){Goodsdel(c,2,u,e,l,sessionStorage.classTag)})}),$(".editDetermine-btn").click(function(){var e=d.val("editValData");if(e.addTypeName){var t=JSON.stringify({classifyId:c.classifyId,classifyName:e.addTypeName,remark:e.addNote,merchantId:Number(sessionStorage.machineID)});$(".mask").fadeIn(),$(".maskSpan").addClass("maskIcon"),loadingAjax("/classify/updateClassify","post",t,sessionStorage.token,"mask","editClass","editContent",i).then(function(e){i.msg(e.message,{icon:1}),l.reload({where:{}}),loadingAjax("/refreshGoods","post","",sessionStorage.token).then(function(e){}).catch(function(e){})}).catch(function(e){i.msg(e.message,{icon:2})})}else i.msg("请填写类目名")}),$(".editCancel-btn").click(function(){popupHide("editClass","editContent")}),$(".playHeader .close").click(function(){$(this).parent().parent().addClass("margin0"),$(this).parents(".maskContnet").fadeOut()});var p=treeList();treeFun(o,"testGoods",l,p,"merchantId","","","","true"),$(".refreshBtnList").click(function(){var e=treeList();JSON.stringify(e)!=JSON.stringify(p)?(p=e,treeFun(o,"testGoods",l,p,"merchantId","","","","true"),l.reload({where:{merchantId:sessionStorage.machineID}}),i.msg("已刷新",{icon:1})):i.msg("已刷新",{icon:1})}),$(".sidebar i").click(function(){$(".left-mian").hide(),$(".on-left").show()}),$(".on-left").click(function(){$(".left-mian").show(),$(".on-left").hide()}),$("body").bind("keydown",function(e){116==e.keyCode&&f5Fun()}),$("body").click(function(){$(".ListOperation").fadeOut(),f=null})})},639:function(e,t){}});