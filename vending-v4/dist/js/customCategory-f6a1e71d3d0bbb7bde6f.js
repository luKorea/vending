/*! 版权所有，翻版必究 */!function(l){function e(e){for(var t,a,n=e[0],i=e[1],o=e[2],s=0,r=[];s<n.length;s++)a=n[s],Object.prototype.hasOwnProperty.call(c,a)&&c[a]&&r.push(c[a][0]),c[a]=0;for(t in i)Object.prototype.hasOwnProperty.call(i,t)&&(l[t]=i[t]);for(u&&u(e);r.length;)r.shift()();return f.push.apply(f,o||[]),d()}function d(){for(var e,t=0;t<f.length;t++){for(var a=f[t],n=!0,i=1;i<a.length;i++){var o=a[i];0!==c[o]&&(n=!1)}n&&(f.splice(t--,1),e=s(s.s=a[0]))}return e}var a={},c={8:0},f=[];function s(e){if(a[e])return a[e].exports;var t=a[e]={i:e,l:!1,exports:{}};return l[e].call(t.exports,t,t.exports,s),t.l=!0,t.exports}s.m=l,s.c=a,s.d=function(e,t,a){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},s.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(t,e){if(1&e&&(t=s(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var a=Object.create(null);if(s.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)s.d(a,n,function(e){return t[e]}.bind(null,n));return a},s.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="";var t=window.webpackJsonp=window.webpackJsonp||[],n=t.push.bind(t);t.push=e,t=t.slice();for(var i=0;i<t.length;i++)e(t[i]);var u=n;f.push([137,0]),d()}({137:function(e,t,a){"use strict";a.r(t);t=a(388);layui.use(["table","form","layer","tree"],function(){tooltip(".refreshBtnList",{transition:!0,time:200}),sessionStorage.classTag=sessionStorage.machineID;var e=layui.table,a=layui.layer,t=layui.tree,n=null,i=sessionStorage.token,o=e.render({elem:"#tableTest",url:"".concat(vApi,"/classify/findAll"),method:"post",contentType:"application/json",headers:{token:i},cols:[[{field:"1",width:80,title:"",templet:"#imgtmp",event:"rank",align:"center"},{field:"rank",width:80,title:"排序",align:"center"},{field:"classifyName",width:150,title:"类目名",align:"center"},{field:"remark",width:150,title:"备注",align:"center"},{field:"user",width:150,title:"创建人",align:"center",templet:function(e){return null!=e.user?e.user.userName:""}},{field:"classifyTime",width:200,title:"创建时间",align:"center"},{field:"lastUser",width:150,title:"最后修改人",align:"center"},{field:"lastTime",width:190,title:"最后修改时间",align:"center"},{field:"operation",align:"center",position:"absolute",right:0,width:200,title:"操作",toolbar:"#barDemo"}]],id:"tableId",page:!0,loading:!0,request:{pageName:"pageNum",limitName:"pageSize"},where:{merchantId:sessionStorage.machineID},parseData:function(e){return 200==e.code?{code:e.code,msg:"",count:e.data.total,data:e.data.list}:403!=e.code?{code:e.code,msg:e.message}:void(window.parent.location.href="login.html")},response:{statusCode:200},done:function(e){n=e.data,m(),405==e.code&&$(".hangContent").show()}});$(".queryBtn").click(function(){o.reload({where:{classifyName:$(".keyText").val()}})});$(".addBtn").click(function(){$('.addClass input[name="addTypeName"]').val(""),$('.addClass input[name="addNote"]').val(""),popupShow("addClass","addContent")}),$(".cancel-btn").click(function(){popupHide("addClass","addContent")});var s=layui.form;$(".determine-btn").click(function(){var e=s.val("aDDValData");e.addTypeName?(e=JSON.stringify({classifyName:e.addTypeName,remark:e.addNote,merchantId:Number(sessionStorage.machineID)}),$(".mask").fadeIn(),$(".maskSpan").addClass("maskIcon"),loadingAjax("/classify/saveClassify","post",e,sessionStorage.token,"mask","addClass","addContent",a).then(function(e){a.msg(e.message,{icon:1}),o.reload({where:{}}),loadingAjax("/refreshGoods","post","",sessionStorage.token).then(function(e){}).catch(function(e){})}).catch(function(e){a.msg(e.message,{icon:2})})):a.msg("请填写类型名")});var r=null;e.on("tool(test)",function(t){var e;r=t.data,"edit"===t.event?(popupShow("editClass","editContent"),s.val("editValData",{addTypeName:r.classifyName,addNote:r.remark})):"delete"===t.event?(console.log(t),a.confirm("确定删除？",function(e){Goodsdel(r,2,t,e,o,sessionStorage.classTag)})):"rank"==t.event&&(console.log(t),e=JSON.stringify({topId:n[t.data.rank-1].classifyId,bottomId:n[t.data.rank-2].classifyId,merchantId:sessionStorage.classTag}),loadingAjax("/classify/sortClassify","post",e,i,"","","",a).then(function(e){a.msg(e.message,{icon:1}),o.reload({where:{}})}).catch(function(e){a.msg(e.message,{icon:2})}))}),$(".editDetermine-btn").click(function(){var e=s.val("editValData");e.addTypeName?(e=JSON.stringify({classifyId:r.classifyId,classifyName:e.addTypeName,remark:e.addNote,merchantId:Number(sessionStorage.machineID)}),$(".mask").fadeIn(),$(".maskSpan").addClass("maskIcon"),loadingAjax("/classify/updateClassify","post",e,sessionStorage.token,"mask","editClass","editContent",a).then(function(e){a.msg(e.message,{icon:1}),o.reload({where:{}}),loadingAjax("/refreshGoods","post","",sessionStorage.token).then(function(e){}).catch(function(e){})}).catch(function(e){a.msg(e.message,{icon:2})})):a.msg("请填写类型名")}),$(".editCancel-btn").click(function(){popupHide("editClass","editContent")}),$(".playHeader .close").click(function(){$(this).parent().parent().addClass("margin0"),$(this).parents(".maskContnet").fadeOut()});var l=treeList();treeFun(t,"testGoods",o,l,"merchantId","","","","true"),$(".refreshBtnList").click(function(){var e=treeList();JSON.stringify(e)!=JSON.stringify(l)&&(l=e,treeFun(t,"testGoods",o,l,"merchantId","","","","true"),o.reload({where:{merchantId:sessionStorage.machineID}})),a.msg("已刷新",{icon:1})}),$(".sidebar i").click(function(){$(".left-mian").hide(),$(".on-left").show()}),$(".on-left").click(function(){$(".left-mian").show(),$(".on-left").hide()}),$("body").bind("keydown",function(e){116==e.keyCode&&f5Fun()});var d=!1,c=!1,f=!1,u=!1;function m(){d?$(".addBtn").removeClass("hide"):$(".addBtn").addClass("hide"),c?$(".TEdit").removeClass("hide"):$(".TEdit").addClass("hide"),f?$(".TDel").removeClass("hide"):$(".TDel").addClass("hide"),u?$(".rankImg").removeClass("hide"):$(".rankImg").addClass("hide")}permissionsVal(373,374,372,403).then(function(e){d=e.addFlag,c=e.editFlag,f=e.delFlag,u=e.fourFlag,m()}).catch(function(e){a.msg("服务器请求超时",{icon:7})})})},388:function(e,t){}});