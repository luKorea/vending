/*! 版权所有，翻版必究 */!function(d){function e(e){for(var t,a,i=e[0],n=e[1],o=e[2],s=0,r=[];s<i.length;s++)a=i[s],Object.prototype.hasOwnProperty.call(c,a)&&c[a]&&r.push(c[a][0]),c[a]=0;for(t in n)Object.prototype.hasOwnProperty.call(n,t)&&(d[t]=n[t]);for(u&&u(e);r.length;)r.shift()();return m.push.apply(m,o||[]),l()}function l(){for(var e,t=0;t<m.length;t++){for(var a=m[t],i=!0,n=1;n<a.length;n++){var o=a[n];0!==c[o]&&(i=!1)}i&&(m.splice(t--,1),e=s(s.s=a[0]))}return e}var a={},c={10:0},m=[];function s(e){if(a[e])return a[e].exports;var t=a[e]={i:e,l:!1,exports:{}};return d[e].call(t.exports,t,t.exports,s),t.l=!0,t.exports}s.m=d,s.c=a,s.d=function(e,t,a){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},s.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(t,e){if(1&e&&(t=s(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var a=Object.create(null);if(s.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)s.d(a,i,function(e){return t[e]}.bind(null,i));return a},s.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="";var t=window.webpackJsonp=window.webpackJsonp||[],i=t.push.bind(t);t.push=e,t=t.slice();for(var n=0;n<t.length;n++)e(t[n]);var u=i;m.push([142,0]),l()}({142:function(e,t,a){"use strict";a.r(t);t=a(400);function A(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}layui.use(["laydate","table","layer","tree"],function(){tooltip(".refreshBtnList",{transition:!0,time:200});var i=sessionStorage.token,l=layui.layer,n=layui.form,e=layui.laydate,t=layui.tree,a="",o="";e.render({elem:"#test6",range:!0,done:function(e){console.log(e);e=e.split(" - ");console.log(e),a=e[0],o=e[1]}});var s=layui.table,c=s.render({elem:"#moneyData",url:"".concat(vApi,"/advertising/selectAdvertising"),method:"post",contentType:"application/json",headers:{token:i},cols:[[{type:"checkbox"},{field:"img",width:120,title:"微缩图",templet:"#imgtmp",align:"center"},{field:"name",width:150,title:"素材名",align:"center"},{field:"size",width:100,title:"大小(MB)",align:"center"},{field:"advertisingAttribute",align:"center",width:150,title:"素材属性",templet:function(e){return 0==e.advertisingAttribute?"图片":"视频"}},{field:"advertisingType",align:"center",width:150,title:"素材类别",templet:function(e){return 0==e.advertisingType?"横屏":"竖屏"}},{field:"duration",width:100,title:"播放时长",align:"center"},{field:"checkStatus",align:"center",width:160,title:"审核状态",templet:function(e){return 0==e.checkStatus?"未审核":1==e.checkStatus?"待审核":2==e.checkStatus?"审核通过":"审核不通过"}},{field:"advertisingStatus",align:"center",width:160,title:"素材状态",templet:function(e){return"1"==e.advertisingStatus?"启用":"不启用"}},{field:"addUser",width:150,title:"创建人 ",align:"center"},{field:"creationTime",width:160,title:"创建时间",align:"center"},(A(e={field:"operation",right:0,width:200,title:"操作",align:"center",toolbar:"#barDemo"},"align","center"),A(e,"fixed","right"),e)]],page:!0,id:"tableId",loading:!0,height:"full-200",request:{pageName:"pageNum",limitName:"pageSize"},where:{merchantId:Number(sessionStorage.machineID)},parseData:function(e){return 200==e.code?{code:e.code,msg:e.message,count:e.data.total,data:e.data.list}:{code:e.code,msg:e.message}},response:{statusCode:200},done:function(e){C(),403==e.code?window.parent.location.href="login.html":405==e.code&&$(".hangContent").show()}});$(".keyQueryBtn").click(function(){var e=n.val("KeyValData");console.log(e),c.reload({where:{keyWord:e.name,attribute:e.attribute,type:e.type,checkStatus:e.checkStatus,minSize:e.minSize,maxSize:e.maxSize,status:e.advertisingStatus,startTime:a,endTime:o}})}),$(".uploadBtn").click(function(){b?($(".uploadTitle").fadeIn(),$(".titleBox").removeClass("margin0")):l.msg("您没有上传广告素材权限!",{iocn:7})}),$(".titleHeader button").click(function(){$(".uploadTitle").fadeOut(),$(".titleBox").addClass("margin0")}),$(".issue").click(function(){popupHide("uploadTitle","titleBox"),popupShow("uploadMaterialCont","uploadMateriaBox")}),$(".uploadMateriaFooter .cancel-btn").click(function(){popupHide("uploadMaterialCont","uploadMateriaBox")}),$(".del-btn").click(function(){var e,t;S?(e=s.checkStatus("tableId"),console.log(e),console.log,t=null,0<e.data.length?(t=e.data.map(function(e,t){return e.vid}),console.log(t),l.confirm("确定删除？",function(e){l.close(e),$(".mask").fadeIn(),$(".maskSpan").addClass("maskIcon"),loadingAjax("/advertising/deleteAdvertising","post",JSON.stringify({list:t}),sessionStorage.token,"mask","","",l).then(function(e){l.msg(e.message,{icon:1}),c.reload({where:{}})}).catch(function(e){202==e.code?(l.msg(e.message,{icon:7}),c.reload({where:{}})):l.msg(e.message,{icon:7})})})):l.msg("请选择要删除的素材",{icon:7})):l.msg("您没有删除广告素材权限!",{iocn:7})}),$(".sidebar i").click(function(){$(".left-mian").hide(),$(".on-left").show()}),$(".on-left").click(function(){$(".left-mian").show(),$(".on-left").hide()});var r=null,d=null,m=null,u=null;function g(e,t,a,i,n,o,s,r,d){r=JSON.stringify({vid:e,name:t,advertisingAttribute:a,advertisingStatus:i,advertisingType:n,duration:o,img:s,url:d,size:r});loadingAjax("/advertising/updateAdvertising","post",r,sessionStorage.token,"mask","editMaterialCont","uploadMateriaBox",l).then(function(e){c.reload({where:{}}),l.msg(e.message,{icon:1})}).catch(function(e){l.msg(e.message,{icon:2})})}s.on("tool(moneyData)",function(e){r=e.data,"preview"==e.event?((-1<r.img.indexOf("mp4")?$(".imgCont video"):$(".imgCont img")).attr("src",r.img).show().siblings().hide(),popupShow("materialPreview","previewBox")):"edit"==e.event&&(y?(popupShow("editMaterialCont","uploadMateriaBox"),n.val("editValData",{materialName:r.name,materiaAttribute:r.advertisingAttribute,materiaType:r.advertisingType,materiaStatus:r.advertisingStatus}),"0"==r.checkStatus?($('.editCont select[name="materiaAttribute"]').prop("disabled",""),$('.editCont select[name="materiaType"]').prop("disabled",""),n.render(),$(".materiaDowEdit").show().children().show(),"0"==r.advertisingAttribute?($(".editImgBtn").show().siblings(".editVideoBtn").hide(),$(".materiaImgEdit img").attr("src",r.img).show().siblings().hide()):($(".editVideoBtn").show().siblings(".editImgBtn").hide(),$(".materiaImgEdit video").attr("src",r.img).show().siblings().hide())):($('.editCont select[name="materiaAttribute"]').prop("disabled",!0),$('.editCont select[name="materiaType"]').prop("disabled",!0),n.render(),$(".editImgBtn").hide(),$(".editVideoBtn").hide(),$(".materiaDowEdit").hide().children().hide(),$(".materiaImgEdit img").hide().siblings().hide())):l.msg("您没有编辑广告素材权限!",{iocn:7}))}),$(".submitAuditBtn").click(function(){var e=s.checkStatus("tableId");console.log(e);var a=[];0<e.data.length?($(".mask").fadeIn(),$(".maskSpan").addClass("maskIcon"),e.data.forEach(function(e,t){e={id:e.vid,status:"1"};a.push(e),console.log(a)}),k("1",a,"/advertising/submitAdvertisingStatus")):l.msg("请选择需要提交审核的素材",{icon:7})}),$(".approvedBtn").click(function(){var t=s.checkStatus("tableId"),a=[];0<t.data.length?l.confirm("确定审核通过？",function(e){l.close(e),$(".mask").fadeIn(),$(".maskSpan").addClass("maskIcon"),t.data.forEach(function(e,t){e={id:e.vid,status:"2"};a.push(e)}),k("0",a,"/advertising/checkAdvertisingStatus")}):l.msg("请选择需要通过审核的素材",{icon:7})}),$(".noPassBtn").click(function(){var t,a;I?(t=s.checkStatus("tableId"),a=[],0<t.data.length?l.confirm("确定审核不通过？",function(e){l.close(e),$(".mask").fadeIn(),$(".maskSpan").addClass("maskIcon"),t.data.forEach(function(e,t){e={id:e.vid,status:"3"};a.push(e)}),k("0",a,"/advertising/checkAdvertisingStatus")}):l.msg("请选择需要不通过审核的素材",{icon:7})):l.msg("您没有审核广告素材权限!",{iocn:7})}),$(".editConfirmBtn").click(function(){var t=n.val("editValData");$(".mask").fadeIn(),$(".maskSpan").addClass("maskIcon"),"0"==r.checkStatus?loadingAjax("/advertising/findAdvertising","post",JSON.stringify({id:r.vid}),sessionStorage.token,"","","",l).then(function(e){"0"==e.data?(console.log(d.indexOf("jpg")),1<d.indexOf("jpg")||1<d.indexOf("png")||1<d.indexOf("gif")&&"0"==t.materiaAttribute||1<d.indexOf("mp4")&&"1"==t.materiaAttribute?g(r.vid,t.materialName,t.materiaAttribute,t.materiaStatus,t.materiaType,u,d,m.slice(0,4),r.url):l.msg("素材属性不正确",{icon:7})):l.confirm("检测到当前素材只能修改素材名和状态，是否继续修改？",function(e){g(r.vid,t.materialName,t.materiaAttribute,t.materiaStatus,t.materiaType,r.duration,r.img,r.size,r.url),l.close(e)})}).catch(function(e){l.msg(e.message,{icon:2})}):g(r.vid,t.materialName,t.materiaAttribute,t.materiaStatus,t.materiaType,r.duration,r.img,r.size,r.url)}),n.on("select(EditSelect)",function(e){console.log(e.value),"0"==e.value?($(".editImgBtn").show().siblings(".editVideoBtn").hide(),$(".materiaImgEdit img").show().siblings().hide()):($(".editVideoBtn").show().siblings(".editImgBtn").hide(),$(".materiaImgEdit video").show().siblings().hide())}),$('.editImgBtn input[name="editImg"]').change(function(e){var t=this;m=e.target.files[0].size/1024/1024+"";var a=new FormData;a.append("file",e.target.files[0]),$(".mask").fadeIn(),$(".maskSpan").addClass("maskIcon"),$.ajax({type:"post",url:"".concat(vApi,"/fileUpload"),processData:!1,contentType:!1,headers:{token:i},data:a,success:function(e){console.log(e),$(".mask").fadeOut(),$(".maskSpan").removeClass("maskIcon"),0==e.code?(d=e.data.src,$(".materiaImgEdit img").attr("src",d),$(".materiaImgEdit video").attr("src",""),$(t).val()):403==e.code?window.parent.location.href="login.html":l.msg(e.message,{icon:2})},error:function(){$(".mask").fadeOut(),$(".maskSpan").removeClass("maskIcon"),l.msg("图片上传失败",{icon:2})}})}),$('.editVideoBtn input[name="editVideo"]').change(function(e){m=e.target.files[0].size/1024/1024+"";var t=this,a=new FormData;a.append("file",e.target.files[0]),$(".mask").fadeIn(),$(".maskSpan").addClass("maskIcon"),$.ajax({type:"post",url:"".concat(vApi,"/fileUpload"),processData:!1,contentType:!1,headers:{token:i},data:a,success:function(e){$(".mask").fadeOut(),$(".maskSpan").removeClass("maskIcon"),console.log(e),0==e.code?(d=e.data.src,$(".materiaImgEdit video").attr("src",d),$(".materiaImgEdit img").attr("src",""),$("#EditVideo")[0].addEventListener("loadedmetadata",function(){u=parseInt(this.duration),console.log(u)}),$(t).val()):403==e.code?window.history.go(-1):l.msg(e.message)},error:function(){$(".mask").fadeOut(),$(".maskSpan").removeClass("maskIcon"),l.msg("视频上传失败",{icon:2})}})}),$(".editCancelBtn").click(function(){popupHide("editMaterialCont","uploadMateriaBox")}),$(".playHeader .close").click(function(){$(this).parent().parent().addClass("margin0"),$(this).parents(".maskContnet").fadeOut()}),n.on("select(myAttribute)",function(e){"0"==e.value?($(".VideoBtn").hide(),$(".ImgBtn").fadeIn(),$(".materiaDow video").hide(),p||h?($(".materiaDow").show(),$(".materiaDow img").show()):$(".materiaDow").hide()):"1"==e.value?($(".ImgBtn").hide(),$(".VideoBtn").fadeIn(),$(".materiaDow img").hide(),p||h?($(".materiaDow").show(),$(".materiaDow video").show()):$(".materiaDow").hide()):($(".ImgBtn").fadeOut(),$(".VideoBtn").fadeOut(),$(".materiaDow").hide())});var p=null,f=null,h=null;$('.ImgBtn input[name="ImgFile"]').change(function(e){$(".materiaImg img").attr("src",""),base64(e.target.files[0],".materiaImg img"),$(".materiaImg video").hide(),$(".materiaDow").show(),$(".materiaDow img").show(),p=e.target.files[0],f=e.target.files[0].size/1024/1024+"",$(this).val("")});var v=null;function k(e,t,a){loadingAjax(a,"post",JSON.stringify({data:t,type:e}),sessionStorage.token,"mask","","",l).then(function(e){l.msg(e.message,{icon:1}),c.reload({where:{}})}).catch(function(e){202==e.code?(l.msg(e.message,{icon:7}),c.reload({where:{}})):l.msg(e.message,{icon:2})})}$('.VideoBtn input[name="videoFile"]').change(function(e){var t=$(this);$(".materiaImg video").attr("src",""),$(".materiaImg img").hide();var a=new FormData;a.append("file",e.target.files[0]),f=e.target.files[0].size/1024/1024+"",console.log(f),$(".mask").fadeIn(),$(".maskSpan").addClass("maskIcon"),$.ajax({type:"post",url:"".concat(vApi,"/fileUpload"),processData:!1,contentType:!1,headers:{token:i},data:a,success:function(e){$(".mask").fadeOut(),$(".maskSpan").removeClass("maskIcon"),console.log(e),0==e.code?($(".materiaDow").show(),$(".materiaDow video").show(),$(".materiaImg video").attr("src",e.data.src),h=e.data.src,$("#video")[0].addEventListener("loadedmetadata",function(){v=parseInt(this.duration),console.log(v)}),t.val("")):l.msg(e.msg)},error:function(){$(".mask").fadeOut(),$(".maskSpan").removeClass("maskIcon"),l.msg("上传视频失败",{icon:2})}})}),$(".confirmBtn").click(function(){var t,a=n.val("uploadValData");console.log(a),a.materiaAttribute&&a.materiaType&&a.materialName?h||p?($(".mask").fadeIn(),$(".maskSpan").addClass("maskIcon"),(t=new FormData).append("file",p),console.log(222),setTimeout(function(){"0"==a.materiaAttribute&&$.ajax({type:"post",url:"".concat(vApi,"/fileUpload"),async:!1,processData:!1,contentType:!1,headers:{token:i},data:t,success:function(e){if(console.log(e),0!=e.code)return l.msg(e.message),!1;h=e.data.src},error:function(){return $(".mask").fadeOut(),$(".maskSpan").removeClass("maskIcon"),l.msg("上传图片失败",{icon:icon}),!1}});var e=JSON.stringify({advertisingAttribute:a.materiaAttribute,advertisingStatus:a.materiaStatus,advertisingType:a.materiaType,duration:v,img:h,name:a.materialName,size:f.slice(0,4),merchantId:sessionStorage.machineID});loadingAjax("/advertising/saveAdvertising","post",e,sessionStorage.token,"mask","uploadMaterialCont","uploadMateriaBox",l).then(function(e){c.reload({where:{}}),l.msg(e.message,{icon:1}),n.val("uploadValData",{materialName:"",materiaAttribute:"",materiaType:"",materiaStatus:""}),$(".uploadMaterialCont .materiaImg video").hide(),$(".uploadMaterialCont .materiaDow").hide(),$(".uploadMaterialCont .materiaDow img").hide(),$(".uploadMaterialCont .ImgBtn").hide(),$(".uploadMaterialCont .VideoBtn").hide(),p=h=null}).catch(function(e){l.msg(e.message,{icon:2})})},300)):l.msg("请上传图片或视频",{icon:7}):l.msg("带*为必填",{icon:7})});var w=treeList();treeFun(t,"test1",c,w,"merchantId"),$("body").bind("keydown",function(e){116==e.keyCode&&f5Fun()});var b=!1,y=!1,S=!1,I=!1;permissionsFun("/role/findUserPermission","post",sessionStorage.token,l).then(function(e){b=e.data.some(function(e,t){return"362"==e.id}),y=e.data.some(function(e,t){return"371"==e.id}),S=e.data.some(function(e,t){return"369"==e.id}),I=e.data.some(function(e,t){return"387"==e.id})}).catch(function(e){l.msg(e.message,{icon:2})});var b=!1,y=!1,S=!1,B=!1;function C(){b?$(".uploadBtn").removeClass("hide"):$(".uploadBtn").addClass("hide"),y?$(".editBtn").removeClass("hide"):$(".editBtn").addClass("hide"),S?$(".del-btn").removeClass("hide"):$(".del-btn").addClass("hide"),B?$(".auditBtnTwo").removeClass("hide"):$(".auditBtnTwo").addClass("hide")}permissionsVal(362,371,369,387).then(function(e){b=e.addFlag,y=e.editFlag,S=e.delFlag,B=e.fourFlag,C()}).catch(function(e){l.msg("服务器请求超时",{icon:7})}),$(".refreshBtn").click(function(){location.reload()}),$(".refreshBtnList").click(function(){var e=treeList();JSON.stringify(e)!=JSON.stringify(w)&&(w=e,treeFun(t,"test1",c,w,"merchantId"),c.reload({where:{merchantId:Number(sessionStorage.machineID)}})),l.msg("已刷新",{icon:1})}),$("body").on("error","img",function(){console.log(1999),$(this).prop("src","../../img/failure.png")})})},400:function(e,t){}});