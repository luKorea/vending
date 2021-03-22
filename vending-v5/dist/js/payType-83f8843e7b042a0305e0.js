/*! 版权所有，翻版必究 */!function(e){function t(t){for(var o,p,r=t[0],l=t[1],c=t[2],d=0,u=[];d<r.length;d++)p=r[d],Object.prototype.hasOwnProperty.call(a,p)&&a[p]&&u.push(a[p][0]),a[p]=0;for(o in l)Object.prototype.hasOwnProperty.call(l,o)&&(e[o]=l[o]);for(s&&s(t);u.length;)u.shift()();return i.push.apply(i,c||[]),n()}function n(){for(var e,t=0;t<i.length;t++){for(var n=i[t],o=!0,r=1;r<n.length;r++){var l=n[r];0!==a[l]&&(o=!1)}o&&(i.splice(t--,1),e=p(p.s=n[0]))}return e}var o={},a={31:0},i=[];function p(t){if(o[t])return o[t].exports;var n=o[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,p),n.l=!0,n.exports}p.m=e,p.c=o,p.d=function(e,t,n){p.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},p.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},p.t=function(e,t){if(1&t&&(e=p(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(p.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)p.d(n,o,function(t){return e[t]}.bind(null,o));return n},p.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return p.d(t,"a",t),t},p.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},p.p="";var r=window.webpackJsonp=window.webpackJsonp||[],l=r.push.bind(r);r.push=t,r=r.slice();for(var c=0;c<r.length;c++)t(r[c]);var s=l;i.push([269,0]),n()}({269:function(e,t,n){"use strict";n.r(t);n(663);layui.use(["table","form","layer"],function(){var e=layui.table,t=(layui.form,layui.layer),n=e.render({elem:"#payTypeList",url:"".concat(vApi,"/pay/getAllPayType"),method:"post",contentType:"application/json",headers:{token:sessionStorage.token},cols:[[{field:"logo",width:180,title:"图标",templet:"#imgtmp",align:"center"},{field:"name",width:180,title:"类型名",align:"center"},{field:"status",width:180,title:"状态",align:"center",templet:function(e){return 1==e.status?"启用":"禁用"}},{field:"update_user",width:180,title:"最后修改人",align:"center"},{field:"update_time",width:180,title:"最后修改时间",align:"center",templet:function(e){return e.update_time?timeStamp(e.update_time):"-"}},{field:"operation",fixed:"right",align:"center",right:0,width:250,title:"操作",toolbar:"#barDemo"}]],id:"tableId",loading:!0,where:{condition:sessionStorage.machineID},parseData:function(e){return 200==e.code?{code:e.code,msg:e.message,count:e.data.total,data:e.data}:403!=e.code?{code:e.code,msg:e.message}:void(window.parent.location.href="login.html")},response:{statusCode:200},done:function(e){405==e.code&&$(".hangContent").show()}});$(".addTypeBtn").click(function(){popupShow("addpayType","addBox")}),$('.listFlex input[name="uploadImg"]').change(function(e){}),$(".refreshBtn").click(function(){location.reload()}),$("body").bind("keydown",function(e){116==e.keyCode&&f5Fun()}),$(".playHeader .close").click(function(){$(this).parent().parent().addClass("margin0"),$(this).parents(".maskContnet").fadeOut()});var o=null;$('.addpayType .listFlex input[name="uploadImg"]').change(function(e){var n=this,a=new FormData;a.append("file",e.target.files[0]),$.ajax({type:"post",url:"".concat(vApi,"/fileUpload"),processData:!1,contentType:!1,timeout:1e4,headers:{token:token},data:a,success:function(e){console.log(e),$(n).val(""),0==e.code?(o=e.data.src,$(".addpayType .logiImg img").prop("src",o),$(".logiImg").show()):t.msg(e.message,{icon:7})},error:function(e){t.msg("服务器请求超时",{icon:2})}})}),$(".addpayType .addCancelBtn").click(function(){popupHide("addpayType","addBox")}),$(".addpayType .RdetermineBtn").click(function(){if($('.addpayType input[name="name"]').val())if(o){var e=JSON.stringify({logo:o,name:$('.addpayType input[name="name"]').val()});loadingAjax("/pay/newPayType","post",e,sessionStorage.token,"","addpayType","addBox",t).then(function(e){t.msg("添加成功",{icon:1}),n.reload({where:{}}),$('.addpayType input[name="name"]').val(""),$(".addpayType .logiImg").hide(),o=null}).catch(function(e){console.log(e),t.msg("添加失败",{icon:2})})}else t.msg("请上传图标",{icon:7});else t.msg("类型名不能为空",{icon:7})});var a=null;e.on("tool(payTypeList)",function(e){a=e.data,"edit"==e.event?($('.editpayType input[name="name"]').val(a.name),$(".editpayType .logiImg img").prop("src",a.logo),popupShow("editpayType","editBox")):"del"==e.event?t.confirm("确定删除？",function(e){t.close(e);var o=JSON.stringify({id:a.id});loadingAjax("/pay/deletePayType","post",o,sessionStorage.token,"","","",t).then(function(e){t.msg(e.message,{icon:1}),n.reload({where:{}})}).catch(function(e){t.msg(e.message,{icon:2})})}):"status"==e.event&&t.confirm(1==a.status?"确定禁用？":"确定启用？",function(e){t.close(e);var o=JSON.stringify({id:a.id,logo:"微信"==a.name||"支付宝"==a.name?"":a.logo,name:a.name,status:1==a.status?0:1});loadingAjax("/pay/updatePayType","post",o,sessionStorage.token,"","editpayType","editBox",t).then(function(e){console.log(e),t.msg(e.message,{icon:1}),n.reload({where:{}})}).catch(function(e){console.log(e),t.msg(e.message,{icon:2})})})}),$('.editpayType .listFlex input[name="uploadImg"]').change(function(e){var n=this,o=new FormData;o.append("file",e.target.files[0]),$.ajax({type:"post",url:"".concat(vApi,"/fileUpload"),processData:!1,contentType:!1,timeout:1e4,headers:{token:token},data:o,success:function(e){console.log(e),$(n).val(""),0==e.code?$(".editpayType .logiImg img").prop("src",e.data.src):t.msg(e.message,{icon:7})},error:function(e){t.msg("服务器请求超时",{icon:2})}})}),$(".editpayType .editCancelBtn").click(function(){popupHide("editpayType","editBox")}),$(".editpayType .RdetermineBtn").click(function(){if($('.editpayType input[name="name"]').val()){var e=JSON.stringify({id:a.id,logo:$(".editpayType .logiImg img").prop("src"),name:$('.editpayType input[name="name"]').val()});loadingAjax("/pay/updatePayType","post",e,sessionStorage.token,"","editpayType","editBox",t).then(function(e){console.log(e),t.msg(e.message,{icon:1}),n.reload({where:{}}),o=null}).catch(function(e){console.log(e),t.msg(e.message,{icon:2})})}else t.msg("类型名不能为空",{icon:7})})})},663:function(e,t){}});