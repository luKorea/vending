/*! 版权所有，翻版必究 */!function(e){function t(t){for(var a,s,r=t[0],l=t[1],d=t[2],f=0,u=[];f<r.length;f++)s=r[f],Object.prototype.hasOwnProperty.call(i,s)&&i[s]&&u.push(i[s][0]),i[s]=0;for(a in l)Object.prototype.hasOwnProperty.call(l,a)&&(e[a]=l[a]);for(c&&c(t);u.length;)u.shift()();return o.push.apply(o,d||[]),n()}function n(){for(var e,t=0;t<o.length;t++){for(var n=o[t],a=!0,r=1;r<n.length;r++){var l=n[r];0!==i[l]&&(a=!1)}a&&(o.splice(t--,1),e=s(s.s=n[0]))}return e}var a={},i={10:0},o=[];function s(t){if(a[t])return a[t].exports;var n=a[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,s),n.l=!0,n.exports}s.m=e,s.c=a,s.d=function(e,t,n){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},s.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(s.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)s.d(n,a,function(t){return e[t]}.bind(null,a));return n},s.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="";var r=window.webpackJsonp=window.webpackJsonp||[],l=r.push.bind(r);r.push=t,r=r.slice();for(var d=0;d<r.length;d++)t(r[d]);var c=l;o.push([257,0]),n()}({257:function(e,t,n){"use strict";n.r(t);n(639);layui.use(["table","form","layer","tree"],function(){tooltip(".refreshBtnList",{transition:!0,time:200});var e=window.parent.permissionsData1(),t=sessionStorage.machineID,n=permissionsVal1({373:!1,374:!1,372:!1,403:!1},e);function a(){n[373]?$(".addBtn").removeClass("hide"):$(".addBtn").addClass("hide"),n[374]?$(".ListOperation .edit").removeClass("hide"):$(".ListOperation .edit").addClass("hide"),n[372]?$(".ListOperation .del").removeClass("hide"):$(".ListOperation .del").addClass("hide"),n[374]||n[372]?$(".Toperation").removeClass("hide"):$(".Toperation").addClass("hide"),n[403]?$(".rankImg").removeClass("hide"):$(".rankImg").addClass("hide")}a(),sessionStorage.classTag=sessionStorage.machineID;var i=layui.table,o=layui.layer,s=layui.tree,r=null,l=sessionStorage.token,d=i.render({elem:"#tableTest",url:"".concat(vApi,"/classify/findAll"),method:"post",contentType:"application/json",headers:{token:l},cols:[[{field:"1",width:80,title:"",templet:"#imgtmp",event:"rank",align:"center"},{field:"rank",width:80,title:"排序",align:"center"},{field:"classifyName",width:150,title:"类目名",align:"center"},{field:"remark",width:150,title:"备注",align:"center"},{field:"user",width:150,title:"创建人",align:"center",templet:function(e){return null!=e.user?e.user.userName:""}},{field:"classifyTime",width:200,title:"创建时间",align:"center"},{field:"lastUser",width:150,title:"最后修改人",align:"center"},{field:"lastTime",width:190,title:"最后修改时间",align:"center"},{field:"operation",align:"center",position:"absolute",right:0,width:150,title:"操作",toolbar:"#barDemo"}]],id:"tableId",page:!0,loading:!0,request:{pageName:"pageNum",limitName:"pageSize"},where:{merchantId:t},parseData:function(e){return 200==e.code?{code:e.code,msg:"",count:e.data.total,data:e.data.list}:403!=e.code?{code:e.code,msg:e.message}:void(window.parent.location.href="login.html")},response:{statusCode:200},done:function(e){r=e.data,a(),403==e.code?window.parent.location.href="login.html":405==e.code&&$(".hangContent").show()}});$(".queryBtn").click(function(){d.reload({where:{}})});$(".addBtn").click(function(){$('.addClass input[name="addTypeName"]').val(""),$('.addClass input[name="addNote"]').val(""),popupShow("addClass","addContent")}),$(".cancel-btn").click(function(){popupHide("addClass","addContent")});var c=layui.form;$(".determine-btn").click(function(){var e=c.val("aDDValData");if(e.addTypeName){var n=JSON.stringify({classifyName:e.addTypeName,remark:e.addNote,merchantId:Number(t)});$(".mask").fadeIn(),$(".maskSpan").addClass("maskIcon"),loadingAjax("/classify/saveClassify","post",n,sessionStorage.token,"mask","addClass","addContent",o).then(function(e){o.msg(e.message,{icon:1}),d.reload({where:{}}),loadingAjax("/refreshGoods","post","",sessionStorage.token).then(function(e){}).catch(function(e){})}).catch(function(e){o.msg(e.message,{icon:2})})}else o.msg("请填写类目名")});var f=null,u=null,p=null;i.on("tool(test)",function(e){if(event.stopPropagation(),f=e.data,p=e,"operation"===e.event){if(u==e.data.classifyId)return $(".ListOperation").fadeOut(),void(u=null);u=e.data.classifyId,$(".ListOperation").fadeIn(),$(".ListOperation").css({left:$(this).offset().left-35+"px",top:$(this).offset().top+35+"px"})}else if("rank"==e.event){console.log(e);var n=JSON.stringify({topId:r[e.data.rank-1].classifyId,bottomId:r[e.data.rank-2].classifyId,merchantId:t});loadingAjax("/classify/sortClassify","post",n,l,"","","",o).then(function(e){o.msg(e.message,{icon:1}),d.reload({where:{}})}).catch(function(e){o.msg(e.message,{icon:2})})}}),$(".ListOperation .edit").click(function(){popupShow("editClass","editContent"),c.val("editValData",{addTypeName:f.classifyName,addNote:f.remark})}),$(".ListOperation .del").click(function(){o.confirm("确定删除？",function(e){Goodsdel(f,2,p,e,d,sessionStorage.classTag)})}),$(".editDetermine-btn").click(function(){var e=c.val("editValData");if(e.addTypeName){var n=JSON.stringify({classifyId:f.classifyId,classifyName:e.addTypeName,remark:e.addNote,merchantId:Number(t)});$(".mask").fadeIn(),$(".maskSpan").addClass("maskIcon"),loadingAjax("/classify/updateClassify","post",n,sessionStorage.token,"mask","editClass","editContent",o).then(function(e){o.msg(e.message,{icon:1}),d.reload({where:{}}),loadingAjax("/refreshGoods","post","",sessionStorage.token).then(function(e){}).catch(function(e){})}).catch(function(e){o.msg(e.message,{icon:2})})}else o.msg("请填写类目名")}),$(".editCancel-btn").click(function(){popupHide("editClass","editContent")}),$(".playHeader .close").click(function(){$(this).parent().parent().addClass("margin0"),$(this).parents(".maskContnet").fadeOut()});var m=treeList();function h(e,n,a,i){e.render({elem:"#".concat(n),id:"treelist",showLine:!0,onlyIconControl:!0,data:i,spread:!0,text:{defaultNodeName:"无数据",none:"您没有权限，请联系管理员授权!"},click:function(e){t=String(e.data.id),console.log(t,"test"),a.reload({where:{merchantId:t}});for(var i=$("#".concat(n," .layui-tree-txt")),o=0;o<i.length;o++)i[o].innerHTML===e.data.title?i[o].style.color="#be954a":i[o].style.color="#555"}})}h(s,"testGoods",d,m),$(".refreshBtnList").click(function(){var e=treeList();JSON.stringify(e)!=JSON.stringify(m)?(h(s,"testGoods",d,m=e),d.reload({where:{merchantId:t}}),o.msg("已刷新",{icon:1})):o.msg("已刷新",{icon:1})}),$(".sidebar i").click(function(){$(".left-mian").hide(),$(".on-left").show()}),$(".on-left").click(function(){$(".left-mian").show(),$(".on-left").hide()}),$("body").bind("keydown",function(e){116==e.keyCode&&f5Fun()}),$("body").click(function(){$(".ListOperation").fadeOut(),u=null})})},639:function(e,t){}});