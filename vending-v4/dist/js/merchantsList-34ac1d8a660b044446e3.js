/*! 版权所有，翻版必究 */!function(r){function e(e){for(var t,a,n=e[0],i=e[1],o=e[2],s=0,c=[];s<n.length;s++)a=n[s],Object.prototype.hasOwnProperty.call(l,a)&&l[a]&&c.push(l[a][0]),l[a]=0;for(t in i)Object.prototype.hasOwnProperty.call(i,t)&&(r[t]=i[t]);for(p&&p(e);c.length;)c.shift()();return m.push.apply(m,o||[]),d()}function d(){for(var e,t=0;t<m.length;t++){for(var a=m[t],n=!0,i=1;i<a.length;i++){var o=a[i];0!==l[o]&&(n=!1)}n&&(m.splice(t--,1),e=s(s.s=a[0]))}return e}var a={},l={19:0},m=[];function s(e){if(a[e])return a[e].exports;var t=a[e]={i:e,l:!1,exports:{}};return r[e].call(t.exports,t,t.exports,s),t.l=!0,t.exports}s.m=r,s.c=a,s.d=function(e,t,a){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},s.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(t,e){if(1&e&&(t=s(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var a=Object.create(null);if(s.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)s.d(a,n,function(e){return t[e]}.bind(null,n));return a},s.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="";var t=window.webpackJsonp=window.webpackJsonp||[],n=t.push.bind(t);t.push=e,t=t.slice();for(var i=0;i<t.length;i++)e(t[i]);var p=n;m.push([139,0]),d()}({139:function(e,t,a){"use strict";a.r(t);t=a(393);layui.use(["table","form","layer","tree","util"],function(){var n=layui.jquery,e=layui.table,i=layui.layer,i=layui.layer,a=(layui.util,layui.tree),o=layui.form;token=sessionStorage.token;var s=e.render({elem:"#tableTest",url:"".concat(vApi,"/merchant/getMerchantList"),method:"post",contentType:"application/json",headers:{token:token},cols:[[{field:"title",width:180,title:"商户名",align:"center"},{field:"merchantName",width:150,title:"上级商户",align:"center",templet:function(e){return 0==e.id?"":e.merchantName}},{field:"alias",width:160,title:"商户编号",align:"center"},{field:"addUser",width:150,title:"创建人",align:"center"},{field:"addTime",width:180,title:"创建时间",align:"center",templet:function(e){return timeStamp(e.addTime)}},{field:"lastUser",width:150,title:"最后修改人",align:"center"},{field:"lastTime",width:180,title:"最后修改时间",align:"center",templet:function(e){return e.lastTime?timeStamp(e.lastTime):"-"}},{field:"operation",width:150,title:"操作",toolbar:"#barDemo",align:"center"}]],id:"tableId",page:!0,loading:!0,limits:[10,20,50],request:{pageName:"pageNum",limitName:"pageSize"},where:{conditionTwo:sessionStorage.machineID,conditionThree:"0"},parseData:function(e){return 200==e.code?{code:e.code,msg:e.message,count:e.data.total,data:e.data.list}:{code:e.code,msg:e.message}},response:{statusCode:200},done:function(e){u(),403==e.code?window.parent.location.href="login.html":405==e.code&&n(".hangContent").show()}});n(".sidebar i").click(function(){n(".left-mian").hide(),n(".onLeft").show()}),n(".onLeft").click(function(){n(this).hide(),n(".left-mian").show()});var c=null,t=!1;e.on("tool(test)",function(e){c=e.data,"edit"===e.event?0!=d.length?(n('.editMerchants input[name="merchantsName"]').val(c.title),n('.editMerchants input[name="max_ship"]').val(c.max_ship),popupShow("MemberOperation","MemberContent"),1==c.id?n('.listInput input[name="marchantsText"]').val(""):n('.listInput input[name="marchantsText"]').val(c.merchantName),n(".marchantsList").val(c.topMerchant),n('.MemberOperation input[name="service_phone"]').val(c.service_phone),n('.editMerchants input[name="customPhone"]').val(c.custom_phone),c.service_code?(n(".editImg").show(),n(".editImg img").prop("src",c.service_code)):(n(".editImg").hide(),n(".editImg img").prop("src","")),c.custom_code?(n(".customImg").show(),n(".customImg img").prop("src",c.custom_code)):(n(".customImg").hide(),n(".customImg img").prop("src","")),t=1==c.is_service?(n('.editMerchants input[name="editServiceOpen"]').prop("checked",!0),n(".editServiceContent").show(),!0):(n('.editMerchants input[name="editServiceOpen"]').prop("checked",!1),n(".editServiceContent").hide(),!1),f=1==c.is_custom?(n('.editMerchants input[name="editCustomOpen"]').prop("checked",!0),n(".editCustomCont").show(),!0):(n('.editMerchants input[name="editCustomOpen"]').prop("checked",!1),n(".editCustomCont").hide(),!1),g=[],function(e,t){t=JSON.stringify({merchantId:e,pageSize:10,pageNum:t});loadingAjax("/sales_manager/getSalesType","post",t,sessionStorage.token,"mask","","",i).then(function(e){var t;0!=e.data.list&&(g=g.concat(e.data.list),t="",g.forEach(function(e){t+='<input type="radio" name="salseClassName" '.concat(c.sales_type==e.sm_classify?"checked":"",' value="').concat(e.sm_classify,'" title="').concat(e.sm_classify,'">')}),n(".salseCont").html(t),o.render()),0==g.length&&(n(".salseCont").html('<input type="radio" name="salseClassName" value="" title="无" checked>'),o.render()),10==e.data.list.length?n(".loadMore").show():n(".loadMore").hide()}).catch(function(e){i.msg(e.message,{icon:2})})}(c.id,1),n('.MemberOperation input[name="order"]').prop("checked",1==c.follow_mail),o.render()):i.msg("服务器请求超时",{icon:7}):"delete"===e.event&&(1!=c.id?i.confirm("确定删除？",function(e){i.close(e),loadingAjax("/merchant/deleteMerchant","post",JSON.stringify({id:c.id,topMerchant:c.topMerchant}),sessionStorage.token,"mask","","",i).then(function(e){i.msg("删除成功",{icon:1}),treeList();var t=treeList();a.reload("treelistEdit",{data:t}),s.reload({where:{}})}).catch(function(e){i.msg(e.msg,{icon:7})})}):i.msg(c.title+"不能进行删除操作",{icon:7}))}),n(".queryBtnClick").click(function(){s.reload({where:{condition:n('.addMember input[name="keyMerchants"]').val(),conditionThree:"1"}})}),n(".addBtn").click(function(){0!=d.length?(n('.addBox input[name="marchantsListname"]').val(""),popupShow("addMerchants","addBox")):i.msg("服务器请求超时",{icon:7})}),n(".cancel_btn").click(function(){popupHide("MemberOperation","MemberContent")}),n(".playHeader .close").click(function(){n(this).parent().parent().addClass("margin0"),n(this).parents(".maskContnet").fadeOut()}),n(".addBox .addCancelBtn").click(function(){popupHide("addMerchants","addBox")});var r=null;n(".addBox .addUpload").change(function(e){var t,a;n(this).val()&&(t=this,(a=new FormData).append("file",e.target.files[0]),n(".mask").fadeIn(),n(".maskSpan").addClass("maskIcon"),n.ajax({type:"post",url:"".concat(vApi,"/fileUpload"),processData:!1,contentType:!1,headers:{token:token},data:a,success:function(e){n(".mask").fadeOut(),n(".maskSpan").removeClass("maskIcon"),n(t).val(""),0==e.code?(r=e.data.src,n(".addImg img").prop("src",r),n(".addImg").show()):i.msg(e.message,{icon:7})},error:function(){n(t).val(""),n(".mask").fadeOut(),n(".maskSpan").removeClass("maskIcon"),i.msg("上传失败",{icon:2})}}))}),n(".addBody .addSubmiBtn").click(function(){var e=n('.addBox input[name="addmarchantsVal"]').val().split(" ");n('.addBox input[name="merchantsName"]').val()&&n('.addBox input[name="addmarchantsVal"]').val()?r||n('.addBox input[name="service_phone"]').val()||!h?(e=JSON.stringify({name:n('.addBox input[name="merchantsName"]').val(),topMerchant:Number(e[0]),alias:e[1],is_service:h?1:0,service_phone:h?n('.addBox input[name="service_phone"]').val():"",service_code:h?r:"",follow_mail:n('.addMerchants input[name="order"]').prop("checked")?1:0}),loadingAjax("/merchant/newMerchant","post",e,sessionStorage.token,"","addMerchants","addBox",i).then(function(e){n('.addBox input[name="merchantsName"]').val(""),n('.addMerchants input[name="addServiceOpen"]').prop("checked"),o.render(),i.msg(e.message,{icon:1}),r=null,n(".addImg").hide(),treeList();e=treeList();a.reload("treelistEdit",{data:e}),s.reload({where:{}})}).catch(function(e){i.msg(e.message,{icon:2})})):i.msg("请填写客服电话或上传客服微信二维码",{icon:7}):i.msg("带*号为必填",{icon:7})}),n(".editMerchants .editUpload").change(function(e){var t,a;n(this).val()&&(t=this,(a=new FormData).append("file",e.target.files[0]),n(".mask").fadeIn(),n(".maskSpan").addClass("maskIcon"),n.ajax({type:"post",url:"".concat(vApi,"/fileUpload"),processData:!1,contentType:!1,headers:{token:token},data:a,success:function(e){n(".mask").fadeOut(),n(".maskSpan").removeClass("maskIcon"),n(t).val(""),0==e.code?(n(".editImg").show(),n(".editImg img").prop("src",e.data.src)):i.msg(e.message,{icon:7})},error:function(){n(t).val(""),n(".mask").fadeOut(),n(".maskSpan").removeClass("maskIcon"),i.msg("上传失败",{icon:2})}}))}),n(".Medit .submit_btn").click(function(){var e;n('.editMerchants input[name="merchantsName"]').val()?0<n('.MemberOperation input[name="max_ship"]').val()&&Number.isInteger(Number(n('.MemberOperation input[name="max_ship"]').val()))?(e=JSON.stringify({id:c.id,name:n('.editMerchants input[name="merchantsName"]').val(),topMerchant:Number(n(".marchantsList").val()),service_phone:t?n('.editMerchants input[name="service_phone"]').val():"",service_code:t?n(".editImg img").attr("src"):"",is_service:t?1:0,is_custom:f?1:0,custom_phone:f?n('.editMerchants input[name="customPhone"]').val():"",custom_code:f?n(".customImg img").attr("src"):"",is_sales:v?1:0,sales_type:n('.salseCont input[name="salseClassName"]:checked').val(),follow_mail:n('.MemberOperation input[name="order"]').prop("checked")?1:0,max_ship:Number(n('.MemberOperation input[name="max_ship"]').val())}),loadingAjax("/merchant/updateMerchant","post",e,sessionStorage.token,"","MemberOperation","MemberContent",i).then(function(e){var t=treeList();a.reload("treelistEdit",{data:t}),i.msg(e.message,{icon:1}),s.reload({where:{}})}).catch(function(e){i.msg(e.message,{icon:2})})):i.msg("最大出货数必须是正整数",{icon:7}):i.msg("请填写商户名",{icon:7})});var d=null;d=treeList();n('.addBox input[name="marchantsListname"]').prop("placeholder",d[0].title),n('.addBox input[name="addmarchantsVal"]').val(d[0].id+" "+d[0].alias),n("body").bind("keydown",function(e){116==e.keyCode&&f5Fun()});a.render({elem:"#test1",id:"treelistEdit",showLine:!0,onlyIconControl:!0,isJump:!1,edit:!1,data:d,text:{defaultNodeName:"您没有权限，请联系管理员授权!",none:""},click:function(e){s.reload({where:{conditionTwo:e.data.id+"",conditionThree:"0"}});for(var t=n("#test1 .layui-tree-txt"),a=0;a<t.length;a++)t[a].innerHTML===e.data.title?(t[a].style.color="#be954a",t[a]):t[a].style.color="#555";n('.addBox input[name="marchantsListname"]').prop("placeholder",e.data.title),n('.addBox input[name="addmarchantsVal"]').val(e.data.id+" "+e.data.alias)}});var l=!1,m=!1,p=!1;function u(){l?n(".addBtn").removeClass("hide"):n(".addBtn").addClass("hide"),m?n(".editBtn").removeClass("hide"):n(".editBtn").addClass("hide"),p?n(".del-btn").removeClass("hide"):n(".del-btn").addClass("hide")}permissionsVal(393,394,395).then(function(e){l=e.addFlag,m=e.editFlag,p=e.delFlag,u()}).catch(function(e){i.msg("服务器请求超时",{icon:7})}),n(".refreshBtn").click(function(){location.reload()});var h=!1;o.on("switch(switchTest)",function(e){h=e.elem.checked,e.elem.checked?n(".serviceCont").slideDown():n(".serviceCont").slideUp()}),o.on("switch(editService)",function(e){t=e.elem.checked,e.elem.checked?n(".editServiceContent").slideDown():n(".editServiceContent").slideUp()});var f=!1;o.on("switch(editCustomOpen)",function(e){f=e.elem.checked,e.elem.checked?n(".editCustomCont").slideDown():n(".editCustomCont").slideUp()}),n(".customBtn .customInput").change(function(e){var t,a;n(this).val()&&(t=this,(a=new FormData).append("file",e.target.files[0]),n(".mask").fadeIn(),n(".maskSpan").addClass("maskIcon"),n.ajax({type:"post",url:"".concat(vApi,"/fileUpload"),processData:!1,contentType:!1,headers:{token:token},data:a,success:function(e){n(".mask").fadeOut(),n(".maskSpan").removeClass("maskIcon"),n(t).val(""),0==e.code?(n(".customImg").show(),n(".customImg img").prop("src",e.data.src)):i.msg(e.message,{icon:7})},error:function(){n(t).val(""),n(".mask").fadeOut(),n(".maskSpan").removeClass("maskIcon"),i.msg("上传失败",{icon:2})}}))}),n(".editDelImgBtn").click(function(){i.confirm("确定定制图片？",function(e){i.close(e),n(".customImg").hide(),n(".customImg img").prop("src","")})});var g=[];var v=!1;o.on("switch(salseOpne)",function(e){v=e.elem.checked,e.elem.checked})})},393:function(e,t){}});