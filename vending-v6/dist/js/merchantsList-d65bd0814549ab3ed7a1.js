/*! 版权所有，翻版必究 */!function(e){function t(t){for(var n,s,r=t[0],c=t[1],d=t[2],m=0,p=[];m<r.length;m++)s=r[m],Object.prototype.hasOwnProperty.call(i,s)&&i[s]&&p.push(i[s][0]),i[s]=0;for(n in c)Object.prototype.hasOwnProperty.call(c,n)&&(e[n]=c[n]);for(l&&l(t);p.length;)p.shift()();return o.push.apply(o,d||[]),a()}function a(){for(var e,t=0;t<o.length;t++){for(var a=o[t],n=!0,r=1;r<a.length;r++){var c=a[r];0!==i[c]&&(n=!1)}n&&(o.splice(t--,1),e=s(s.s=a[0]))}return e}var n={},i={21:0},o=[];function s(t){if(n[t])return n[t].exports;var a=n[t]={i:t,l:!1,exports:{}};return e[t].call(a.exports,a,a.exports,s),a.l=!0,a.exports}s.m=e,s.c=n,s.d=function(e,t,a){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},s.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(s.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)s.d(a,n,function(t){return e[t]}.bind(null,n));return a},s.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="";var r=window.webpackJsonp=window.webpackJsonp||[],c=r.push.bind(r);r.push=t,r=r.slice();for(var d=0;d<r.length;d++)t(r[d]);var l=c;o.push([247,0]),a()}({247:function(e,t,a){"use strict";a.r(t);a(614);layui.use(["table","form","layer","tree","util"],function(){var e=layui.jquery,t=layui.table,a=layui.layer,n=(a=layui.layer,layui.util,layui.tree),i=layui.form,o=sessionStorage.token,s=[[{field:"title",title:"商户名",align:"center"},{field:"merchantName",title:"上级商户",align:"center",templet:function(e){return 0==e.id?"":e.merchantName}},{field:"merchantURL",title:"支付成功跳转地址",align:"center",templet:function(e){return!e.merchantURL||null===e.merchantURL&&void 0===e.merchantURL?"-":'<a href="'.concat(e.merchantURL,'" target="_blank" style="color: rgb(190, 149, 74)">').concat(e.merchantURL,"</a>")}},{field:"alias",title:"商户编号",align:"center"},{field:"addUser",title:"创建人",align:"center"},{field:"addTime",title:"创建时间",align:"center",templet:function(e){return timeStamp(e.addTime)}},{field:"lastUser",title:"最后修改人",align:"center"},{field:"lastTime",title:"最后修改时间",align:"center",templet:function(e){return e.lastTime?timeStamp(e.lastTime):"-"}},{field:"operation",title:"操作",toolbar:"#barDemo",align:"center"}]],r=t.render({elem:"#tableTest",url:"".concat(vApi,"/merchant/getMerchantList"),method:"post",contentType:"application/json",headers:{token:o},cols:s,id:"tableId",page:!0,loading:!0,limits:[10,20,50],request:{pageName:"pageNum",limitName:"pageSize"},where:{conditionTwo:sessionStorage.machineID,conditionThree:"0"},parseData:function(e){return 200==e.code?{code:e.code,msg:e.message,count:e.data.total,data:e.data.list}:{code:e.code,msg:e.message}},response:{statusCode:200},done:function(t){f(),403==t.code?window.parent.location.href="login.html":405==t.code&&e(".hangContent").show()}});e(".sidebar i").click(function(){e(".left-mian").hide(),e(".onLeft").show()}),e(".onLeft").click(function(){e(this).hide(),e(".left-mian").show()});var c=null,d=!1,l=null;t.on("tool(test)",function(t){if(event.stopPropagation(),c=t.data,"operation"===t.event){if(l==t.data.id)return e(".ListOperation").fadeOut(),void(l=null);l=t.data.id,e(".ListOperation").fadeIn(),e(".ListOperation").css({left:e(this).offset().left-35+"px",top:e(this).offset().top+35+"px"})}}),e(".ListOperation .edit").click(function(){0!=p.length?(e('.editMerchants input[name="merchantsName"]').val(c.title),e('.editMerchants input[name="merchantURL"]').val(c.merchantURL),e('.editMerchants input[name="max_ship"]').val(c.max_ship),popupShow("MemberOperation","MemberContent"),1==c.id?e('.listInput input[name="marchantsText"]').val(""):e('.listInput input[name="marchantsText"]').val(c.merchantName),e(".marchantsList").val(c.topMerchant),e('.MemberOperation input[name="service_phone"]').val(c.service_phone),e('.editMerchants input[name="customPhone"]').val(c.custom_phone),c.service_code?(e(".editImg").show(),e(".editImg img").prop("src",c.service_code)):(e(".editImg").hide(),e(".editImg img").prop("src","")),c.custom_code?(e(".customImg").show(),e(".customImg img").prop("src",c.custom_code)):(e(".customImg").hide(),e(".customImg img").prop("src","")),1==c.is_service?(e('.editMerchants input[name="editServiceOpen"]').prop("checked",!0),e(".editServiceContent").show(),d=!0):(e('.editMerchants input[name="editServiceOpen"]').prop("checked",!1),e(".editServiceContent").hide(),d=!1),1==c.is_custom?(e('.editMerchants input[name="editCustomOpen"]').prop("checked",!0),e(".editCustomCont").show(),v=!0):(e('.editMerchants input[name="editCustomOpen"]').prop("checked",!1),e(".editCustomCont").hide(),v=!1),k=[],function(t,n){var o=JSON.stringify({merchantId:t,pageSize:10,pageNum:n});loadingAjax("/sales_manager/getSalesType","post",o,sessionStorage.token,"mask","","",a).then(function(t){0!=t.data.list&&function(t){var a="";t.forEach(function(e){a+='<input type="radio" name="salseClassName" '.concat(c.sales_type==e.sm_classify?"checked":"",' value="').concat(e.sm_classify,'" title="').concat(e.sm_classify,'">')}),e(".salseCont").html(a),i.render()}(k=k.concat(t.data.list)),0==k.length&&(e(".salseCont").html('<input type="radio" name="salseClassName" value="" title="无" checked>'),i.render()),10==t.data.list.length?e(".loadMore").show():e(".loadMore").hide()}).catch(function(e){a.msg(e.message,{icon:2})})}(c.id,1),e('.MemberOperation input[name="order"]').prop("checked",1==c.follow_mail),i.render()):a.msg("服务器请求超时",{icon:7})}),e(".ListOperation .del").click(function(){1!=c.id?a.confirm("确定删除？",function(e){a.close(e),loadingAjax("/merchant/deleteMerchant","post",JSON.stringify({id:c.id,topMerchant:c.topMerchant}),sessionStorage.token,"mask","","",a).then(function(e){a.msg("删除成功",{icon:1}),treeList();var t=treeList();n.reload("treelistEdit",{data:t}),r.reload({where:{}})}).catch(function(e){a.msg(e.msg,{icon:7})})}):a.msg(c.title+"不能进行删除操作",{icon:7})}),e(".queryBtnClick").click(function(){r.reload({where:{condition:e('.addMember input[name="keyMerchants"]').val(),conditionThree:"0"}})}),e(".addBtn").click(function(){0!=p.length?(e('.addBox input[name="marchantsListname"]').val(""),popupShow("addMerchants","addBox")):a.msg("服务器请求超时",{icon:7})}),e(".cancel_btn").click(function(){popupHide("MemberOperation","MemberContent")}),e(".playHeader .close").click(function(){e(this).parent().parent().addClass("margin0"),e(this).parents(".maskContnet").fadeOut()}),e(".addBox .addCancelBtn").click(function(){popupHide("addMerchants","addBox")});var m=null;e(".addBox .addUpload").change(function(t){if(e(this).val()){var n=this,i=new FormData;i.append("file",t.target.files[0]),e(".mask").fadeIn(),e(".maskSpan").addClass("maskIcon"),e.ajax({type:"post",url:"".concat(vApi,"/fileUpload"),processData:!1,contentType:!1,headers:{token:o},data:i,success:function(t){e(".mask").fadeOut(),e(".maskSpan").removeClass("maskIcon"),e(n).val(""),0==t.code?(m=t.data.src,e(".addImg img").prop("src",m),e(".addImg").show()):a.msg(t.message,{icon:7})},error:function(t){e(n).val(""),e(".mask").fadeOut(),e(".maskSpan").removeClass("maskIcon"),a.msg("上传失败",{icon:2})}})}}),e(".addBody .addSubmiBtn").click(function(){var t=e('.addBox input[name="addmarchantsVal"]').val().split(" ");if(e('.addBox input[name="merchantsName"]').val()&&e('.addBox input[name="addmarchantsVal"]').val()){if(!m&&!e('.addBox input[name="service_phone"]').val()&&g)return void a.msg("请填写客服电话或上传客服微信二维码",{icon:7});var o=JSON.stringify({name:e('.addBox input[name="merchantsName"]').val(),merchantURL:e('.addBox input[name="merchantURL"]').val(),topMerchant:Number(t[0]),alias:t[1],is_service:g?1:0,service_phone:g?e('.addBox input[name="service_phone"]').val():"",service_code:g?m:"",follow_mail:e('.addMerchants input[name="order"]').prop("checked")?1:0});loadingAjax("/merchant/newMerchant","post",o,sessionStorage.token,"","addMerchants","addBox",a).then(function(t){e('.addBox input[name="merchantsName"]').val(""),e('.addMerchants input[name="addServiceOpen"]').prop("checked"),i.render(),a.msg(t.message,{icon:1}),m=null,e(".addImg").hide(),treeList();var o=treeList();n.reload("treelistEdit",{data:o}),r.reload({where:{}})}).catch(function(e){a.msg(e.message,{icon:2})})}else a.msg("带*号为必填",{icon:7})}),e(".editMerchants .editUpload").change(function(t){if(e(this).val()){var n=this,i=new FormData;i.append("file",t.target.files[0]),e(".mask").fadeIn(),e(".maskSpan").addClass("maskIcon"),e.ajax({type:"post",url:"".concat(vApi,"/fileUpload"),processData:!1,contentType:!1,headers:{token:o},data:i,success:function(t){e(".mask").fadeOut(),e(".maskSpan").removeClass("maskIcon"),e(n).val(""),0==t.code?(e(".editImg").show(),e(".editImg img").prop("src",t.data.src)):a.msg(t.message,{icon:7})},error:function(t){e(n).val(""),e(".mask").fadeOut(),e(".maskSpan").removeClass("maskIcon"),a.msg("上传失败",{icon:2})}})}}),e(".Medit .submit_btn").click(function(){if(e('.editMerchants input[name="merchantsName"]').val()){if(!(e('.MemberOperation input[name="max_ship"]').val()>0&&Number.isInteger(Number(e('.MemberOperation input[name="max_ship"]').val()))))return void a.msg("最大出货数必须是正整数",{icon:7});var t=JSON.stringify({id:c.id,name:e('.editMerchants input[name="merchantsName"]').val(),merchantURL:e('.editMerchants input[name="merchantURL"]').val(),topMerchant:Number(e(".marchantsList").val()),service_phone:d?e('.editMerchants input[name="service_phone"]').val():"",service_code:d?e(".editImg img").attr("src"):"",is_service:d?1:0,is_custom:v?1:0,custom_phone:v?e('.editMerchants input[name="customPhone"]').val():"",custom_code:v?e(".customImg img").attr("src"):"",is_sales:y?1:0,sales_type:e('.salseCont input[name="salseClassName"]:checked').val(),follow_mail:e('.MemberOperation input[name="order"]').prop("checked")?1:0,max_ship:Number(e('.MemberOperation input[name="max_ship"]').val())});loadingAjax("/merchant/updateMerchant","post",t,sessionStorage.token,"","MemberOperation","MemberContent",a).then(function(e){var t=treeList();n.reload("treelistEdit",{data:t}),a.msg(e.message,{icon:1}),r.reload({where:{}})}).catch(function(e){a.msg(e.message,{icon:2})})}else a.msg("请填写商户名",{icon:7})});var p=null;p=treeList();e('.addBox input[name="marchantsListname"]').prop("placeholder",p[0].title),e('.addBox input[name="addmarchantsVal"]').val(p[0].id+" "+p[0].alias),e("body").bind("keydown",function(e){116==e.keyCode&&f5Fun()});n.render({elem:"#test1",id:"treelistEdit",showLine:!0,onlyIconControl:!0,isJump:!1,edit:!1,data:p,text:{defaultNodeName:"您没有权限，请联系管理员授权!",none:""},click:function(t){r.reload({where:{conditionTwo:t.data.id+"",conditionThree:"0"}});for(var a=e("#test1 .layui-tree-txt"),n=0;n<a.length;n++)a[n].innerHTML===t.data.title?(a[n].style.color="#be954a",a[n]):a[n].style.color="#555";e('.addBox input[name="marchantsListname"]').prop("placeholder",t.data.title),e('.addBox input[name="addmarchantsVal"]').val(t.data.id+" "+t.data.alias)}});var u=window.parent.permissionsData1(),h=permissionsVal1({393:!1,394:!1,395:!1},u);function f(){h[393]?e(".addBtn").removeClass("hide"):e(".addBtn").addClass("hide"),h[394]?e(".editBtn").removeClass("hide"):e(".editBtn").addClass("hide"),h[395]?e(".del-btn").removeClass("hide"):e(".del-btn").addClass("hide")}f(),e(".refreshBtn").click(function(){location.reload()});var g=!1;i.on("switch(switchTest)",function(t){g=t.elem.checked,t.elem.checked?e(".serviceCont").slideDown():e(".serviceCont").slideUp()}),i.on("switch(editService)",function(t){d=t.elem.checked,t.elem.checked?e(".editServiceContent").slideDown():e(".editServiceContent").slideUp()});var v=!1;i.on("switch(editCustomOpen)",function(t){v=t.elem.checked,t.elem.checked?e(".editCustomCont").slideDown():e(".editCustomCont").slideUp()}),e(".customBtn .customInput").change(function(t){if(e(this).val()){var n=this,i=new FormData;i.append("file",t.target.files[0]),e(".mask").fadeIn(),e(".maskSpan").addClass("maskIcon"),e.ajax({type:"post",url:"".concat(vApi,"/fileUpload"),processData:!1,contentType:!1,headers:{token:o},data:i,success:function(t){e(".mask").fadeOut(),e(".maskSpan").removeClass("maskIcon"),e(n).val(""),0==t.code?(e(".customImg").show(),e(".customImg img").prop("src",t.data.src)):a.msg(t.message,{icon:7})},error:function(t){e(n).val(""),e(".mask").fadeOut(),e(".maskSpan").removeClass("maskIcon"),a.msg("上传失败",{icon:2})}})}}),e(".editDelImgBtn").click(function(){a.confirm("确定定制图片？",function(t){a.close(t),e(".customImg").hide(),e(".customImg img").prop("src","")})});var k=[];var y=!1;i.on("switch(salseOpne)",function(e){y=e.elem.checked,e.elem.checked}),e("body").click(function(){e(".ListOperation").fadeOut(),l=null}),e(".refreshBtnList").click(function(){a.msg("已刷新",{icon:1});p=treeList()})})},614:function(e,t){}});