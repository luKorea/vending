/*! 版权所有，翻版必究 */!function(e){function t(t){for(var i,s,r=t[0],d=t[1],l=t[2],m=0,u=[];m<r.length;m++)s=r[m],Object.prototype.hasOwnProperty.call(n,s)&&n[s]&&u.push(n[s][0]),n[s]=0;for(i in d)Object.prototype.hasOwnProperty.call(d,i)&&(e[i]=d[i]);for(c&&c(t);u.length;)u.shift()();return o.push.apply(o,l||[]),a()}function a(){for(var e,t=0;t<o.length;t++){for(var a=o[t],i=!0,r=1;r<a.length;r++){var d=a[r];0!==n[d]&&(i=!1)}i&&(o.splice(t--,1),e=s(s.s=a[0]))}return e}var i={},n={12:0},o=[];function s(t){if(i[t])return i[t].exports;var a=i[t]={i:t,l:!1,exports:{}};return e[t].call(a.exports,a,a.exports,s),a.l=!0,a.exports}s.m=e,s.c=i,s.d=function(e,t,a){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},s.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(s.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)s.d(a,i,function(t){return e[t]}.bind(null,i));return a},s.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="";var r=window.webpackJsonp=window.webpackJsonp||[],d=r.push.bind(r);r.push=t,r=r.slice();for(var l=0;l<r.length;l++)t(r[l]);var c=d;o.push([250,0]),a()}({250:function(e,t,a){"use strict";a.r(t);a(620);layui.use(["laydate","table","layer","tree"],function(){var e=window.parent.permissionsData1(),t=sessionStorage.machineID,a=permissionsVal1({362:!1,371:!1,369:!1,387:!1},e);function i(){a[362]?$(".uploadBtn").removeClass("hide"):$(".uploadBtn").addClass("hide"),a[371]?$(".ListOperation .edit").removeClass("hide"):$(".ListOperation .edit").addClass("hide"),a[369]?$(".del-btn").removeClass("hide"):$(".del-btn").addClass("hide"),a[387]?$(".auditBtnTwo").removeClass("hide"):$(".auditBtnTwo").addClass("hide")}i();var n=sessionStorage.token,o=layui.layer,s=layui.form,r=layui.laydate,d=layui.tree,l=getKeyTime().startTime,c=getKeyTime().endTime;r.render({elem:"#test6",range:!0,value:getKeyTime().keyTimeData,done:function(e,t,a){console.log(e);var i=e.split(" - ");console.log(i),l=i[0],c=i[1]}});var m=layui.table,u=m.render({elem:"#moneyData",url:"".concat(vApi,"/advertising/selectAdvertising"),method:"post",contentType:"application/json",headers:{token:n},cols:[[{type:"checkbox"},{field:"img",title:"微缩图",templet:"#imgtmp",align:"center"},{field:"name",title:"素材名",align:"center"},{field:"size",title:"大小(MB)",align:"center"},{field:"advertisingAttribute",align:"center",title:"素材属性",templet:function(e){return 0==e.advertisingAttribute?"图片":"视频"}},{field:"advertisingType",align:"center",title:"素材类别",templet:function(e){return 0==e.advertisingType?"横屏":"竖屏"}},{field:"duration",title:"播放时长",align:"center"},{field:"checkStatus",align:"center",title:"审核状态",templet:function(e){return 0==e.checkStatus?"未审核":1==e.checkStatus?"待审核":2==e.checkStatus?"审核通过":"审核不通过"}},{field:"advertisingStatus",align:"center",title:"素材状态",templet:function(e){return"1"==e.advertisingStatus?"启用":"不启用"}},{field:"addUser",title:"创建人 ",align:"center"},{field:"creationTime",title:"创建时间",align:"center"},{field:"operation",title:"操作",toolbar:"#barDemo",align:"center"}]],page:!0,id:"tableId",loading:!0,height:"full-200",request:{pageName:"pageNum",limitName:"pageSize"},where:{merchantId:Number(t),startTime:l,endTime:c},parseData:function(e){return 200==e.code?{code:e.code,msg:e.message,count:e.data.total,data:e.data.list}:{code:e.code,msg:e.message}},response:{statusCode:200},done:function(e){i(),fixedFun(),403==e.code?window.parent.location.href="login.html":405==e.code&&$(".hangContent").show()}});$(".keyQueryBtn").click(function(){if(timeFlag(l,c))o.msg("时间选择范围最多三个月",{icon:7});else{var e=s.val("KeyValData");console.log(e),u.reload({where:{keyWord:e.name,attribute:e.attribute,type:e.type,checkStatus:e.checkStatus,minSize:e.minSize,maxSize:e.maxSize,status:e.advertisingStatus,startTime:l,endTime:c}})}}),$(".uploadBtn").click(function(){$(".uploadTitle").fadeIn(),$(".titleBox").removeClass("margin0")}),$(".titleHeader button").click(function(){$(".uploadTitle").fadeOut(),$(".titleBox").addClass("margin0")}),$(".issue").click(function(){popupHide("uploadTitle","titleBox"),popupShow("uploadMaterialCont","uploadMateriaBox")}),$(".uploadMateriaFooter .cancel-btn").click(function(){popupHide("uploadMaterialCont","uploadMateriaBox")}),$(".del-btn").click(function(){var e=m.checkStatus("tableId");console.log(e),console.log;var t=null;e.data.length>0?(t=e.data.map(function(e,t){return e.vid}),console.log(t),o.confirm("确定删除？",function(e){o.close(e),$(".mask").fadeIn(),$(".maskSpan").addClass("maskIcon"),loadingAjax("/advertising/deleteAdvertising","post",JSON.stringify({list:t}),sessionStorage.token,"mask","","",o).then(function(e){o.msg(e.message,{icon:1}),u.reload({where:{}})}).catch(function(e){202==e.code?(o.msg(e.message,{icon:7}),u.reload({where:{}})):o.msg(e.message,{icon:7})})})):o.msg("请选择要删除的素材",{icon:7})}),$(".sidebar i").click(function(){$(".left-mian").hide(),$(".on-left").show()}),$(".on-left").click(function(){$(".left-mian").show(),$(".on-left").hide()});var g=null,p=null,f=null,h=null,v=null;function k(e,t,a,i,n,s,r,d,l){var c=JSON.stringify({vid:e,name:t,advertisingAttribute:a,advertisingStatus:i,advertisingType:n,duration:s,img:r,url:l,size:d});loadingAjax("/advertising/updateAdvertising","post",c,sessionStorage.token,"mask","editMaterialCont","uploadMateriaBox",o).then(function(e){u.reload({where:{}}),p=null,o.msg(e.message,{icon:1})}).catch(function(e){o.msg(e.message,{icon:2})})}m.on("tool(moneyData)",function(e){if(g=e.data,event.stopPropagation(),"operation"===e.event){if(v==e.data.vid)return $(".ListOperation").fadeOut(),void(v=null);v=e.data.vid,$(".ListOperation").fadeIn(),$(".ListOperation").css({left:$(this).offset().left-35+"px",top:$(this).offset().top+35+"px"})}}),$(".ListOperation .edit").click(function(){popupShow("editMaterialCont","uploadMateriaBox"),s.val("editValData",{materialName:g.name,materiaAttribute:g.advertisingAttribute,materiaType:g.advertisingType,materiaStatus:g.advertisingStatus}),"0"==g.checkStatus?($('.editCont select[name="materiaAttribute"]').prop("disabled",""),$('.editCont select[name="materiaType"]').prop("disabled",""),s.render(),$(".materiaDowEdit").show().children().show(),"0"==g.advertisingAttribute?($(".editImgBtn").show().siblings(".editVideoBtn").hide(),$(".materiaImgEdit img").attr("src",g.img).show().siblings().hide()):($(".editVideoBtn").show().siblings(".editImgBtn").hide(),$(".materiaImgEdit video").attr("src",g.img).show().siblings().hide())):($('.editCont select[name="materiaAttribute"]').prop("disabled",!0),$('.editCont select[name="materiaType"]').prop("disabled",!0),s.render(),$(".editImgBtn").hide(),$(".editVideoBtn").hide(),$(".materiaDowEdit").hide().children().hide(),$(".materiaImgEdit img").hide().siblings().hide())}),$(".ListOperation .Tpreview").click(function(){g.img.indexOf("mp4")>-1?$(".imgCont video").attr("src",g.img).show().siblings().hide():$(".imgCont img").attr("src",g.img).show().siblings().hide(),popupShow("materialPreview","previewBox")}),$(".submitAuditBtn").click(function(){var e=m.checkStatus("tableId");console.log(e);var t=[];e.data.length>0?($(".mask").fadeIn(),$(".maskSpan").addClass("maskIcon"),e.data.forEach(function(e,a){var i={id:e.vid,status:"1"};t.push(i),console.log(t)}),S("1",t,"/advertising/submitAdvertisingStatus")):o.msg("请选择需要提交审核的素材",{icon:7})}),$(".approvedBtn").click(function(){var e=m.checkStatus("tableId"),t=[];e.data.length>0?o.confirm("确定审核通过？",function(a){o.close(a),$(".mask").fadeIn(),$(".maskSpan").addClass("maskIcon"),e.data.forEach(function(e,a){var i={id:e.vid,status:"2"};t.push(i)}),S("0",t,"/advertising/checkAdvertisingStatus")}):o.msg("请选择需要通过审核的素材",{icon:7})}),$(".noPassBtn").click(function(){var e=m.checkStatus("tableId"),t=[];e.data.length>0?o.confirm("确定审核不通过？",function(a){o.close(a),$(".mask").fadeIn(),$(".maskSpan").addClass("maskIcon"),e.data.forEach(function(e,a){var i={id:e.vid,status:"3"};t.push(i)}),S("0",t,"/advertising/checkAdvertisingStatus")}):o.msg("请选择需要不通过审核的素材",{icon:7})}),$(".editConfirmBtn").click(function(){var e=s.val("editValData");e.materialName?($(".mask").fadeIn(),$(".maskSpan").addClass("maskIcon"),"0"==g.checkStatus?loadingAjax("/advertising/findAdvertising","post",JSON.stringify({id:g.vid}),sessionStorage.token,"","","",o).then(function(t){"0"==t.data?(p=g.img,f=f?f.slice(0,4):g.size,p.indexOf("jpg")>1||p.indexOf("png")>1||p.indexOf("gif")>1&&"0"==e.materiaAttribute||p.indexOf("mp4")>1&&"1"==e.materiaAttribute?k(g.vid,e.materialName,e.materiaAttribute,e.materiaStatus,e.materiaType,h,p,f,g.url):o.msg("素材属性不正确",{icon:7})):o.confirm("检测到当前素材只能修改素材名和状态，是否继续修改？",function(t){k(g.vid,e.materialName,e.materiaAttribute,e.materiaStatus,e.materiaType,g.duration,g.img,g.size,g.url),o.close(t)})}).catch(function(e){o.msg(e.message,{icon:2})}):k(g.vid,e.materialName,e.materiaAttribute,e.materiaStatus,e.materiaType,g.duration,g.img,g.size,g.url)):o.msg("素材名不能空",{icon:7})}),s.on("select(EditSelect)",function(e){console.log(e.value),"0"==e.value?($(".editImgBtn").show().siblings(".editVideoBtn").hide(),$(".materiaImgEdit img").show().siblings().hide()):($(".editVideoBtn").show().siblings(".editImgBtn").hide(),$(".materiaImgEdit video").show().siblings().hide())}),$('.editImgBtn input[name="editImg"]').change(function(e){var t=this;f=e.target.files[0].size/1024/1024+"";var a=new FormData;a.append("file",e.target.files[0]),$(".mask").fadeIn(),$(".maskSpan").addClass("maskIcon"),$.ajax({type:"post",url:"".concat(vApi,"/fileUpload"),processData:!1,contentType:!1,headers:{token:n},data:a,success:function(e){console.log(e),$(".mask").fadeOut(),$(".maskSpan").removeClass("maskIcon"),0==e.code?(p=e.data.src,$(".materiaImgEdit img").attr("src",p),$(".materiaImgEdit video").attr("src",""),$(t).val()):403==e.code?window.parent.location.href="login.html":o.msg(e.message,{icon:2})},error:function(e){$(".mask").fadeOut(),$(".maskSpan").removeClass("maskIcon"),o.msg("图片上传失败",{icon:2})}})}),$('.editVideoBtn input[name="editVideo"]').change(function(e){f=e.target.files[0].size/1024/1024+"";var t=this,a=new FormData;a.append("file",e.target.files[0]),$(".mask").fadeIn(),$(".maskSpan").addClass("maskIcon"),$.ajax({type:"post",url:"".concat(vApi,"/fileUpload"),processData:!1,contentType:!1,headers:{token:n},data:a,success:function(e){$(".mask").fadeOut(),$(".maskSpan").removeClass("maskIcon"),console.log(e),0==e.code?(p=e.data.src,$(".materiaImgEdit video").attr("src",p),$(".materiaImgEdit img").attr("src",""),$("#EditVideo")[0].addEventListener("loadedmetadata",function(){h=parseInt(this.duration),console.log(h)}),$(t).val()):403==e.code?window.history.go(-1):o.msg(e.message)},error:function(e){$(".mask").fadeOut(),$(".maskSpan").removeClass("maskIcon"),o.msg("视频上传失败",{icon:2})}})}),$(".editCancelBtn").click(function(){popupHide("editMaterialCont","uploadMateriaBox")}),$(".playHeader .close").click(function(){$(this).parent().parent().addClass("margin0"),$(this).parents(".maskContnet").fadeOut()}),s.on("select(myAttribute)",function(e){"0"==e.value?($(".VideoBtn").hide(),$(".ImgBtn").fadeIn(),$(".materiaDow video").hide(),w||b?($(".materiaDow").show(),$(".materiaDow img").show()):$(".materiaDow").hide()):"1"==e.value?($(".ImgBtn").hide(),$(".VideoBtn").fadeIn(),$(".materiaDow img").hide(),w||b?($(".materiaDow").show(),$(".materiaDow video").show()):$(".materiaDow").hide()):($(".ImgBtn").fadeOut(),$(".VideoBtn").fadeOut(),$(".materiaDow").hide())});var w=null,y=null,b=null;$('.ImgBtn input[name="ImgFile"]').change(function(e){$(".materiaImg img").attr("src",""),base64(e.target.files[0],".materiaImg img"),$(".materiaImg video").hide(),$(".materiaDow").show(),$(".materiaDow img").show(),w=e.target.files[0],y=e.target.files[0].size/1024/1024+"",$(this).val("")});var I=null;function S(e,t,a){loadingAjax(a,"post",JSON.stringify({data:t,type:e}),sessionStorage.token,"mask","","",o).then(function(e){o.msg(e.message,{icon:1}),u.reload({where:{}})}).catch(function(e){202==e.code?(o.msg(e.message,{icon:7}),u.reload({where:{}})):o.msg(e.message,{icon:2})})}$('.VideoBtn input[name="videoFile"]').change(function(e){var t=$(this);$(".materiaImg video").attr("src",""),$(".materiaImg img").hide();var a=new FormData;a.append("file",e.target.files[0]),y=e.target.files[0].size/1024/1024+"",console.log(y),$(".mask").fadeIn(),$(".maskSpan").addClass("maskIcon"),$.ajax({type:"post",url:"".concat(vApi,"/fileUpload"),processData:!1,contentType:!1,headers:{token:n},data:a,success:function(e){$(".mask").fadeOut(),$(".maskSpan").removeClass("maskIcon"),console.log(e),0==e.code?($(".materiaDow").show(),$(".materiaDow video").show(),$(".materiaImg video").attr("src",e.data.src),b=e.data.src,$("#video")[0].addEventListener("loadedmetadata",function(){I=parseInt(this.duration),console.log(I)}),t.val("")):o.msg(e.msg)},error:function(e){$(".mask").fadeOut(),$(".maskSpan").removeClass("maskIcon"),o.msg("上传视频失败",{icon:2})}})}),$(".confirmBtn").click(function(){var e=s.val("uploadValData");if(console.log(e),e.materiaAttribute&&e.materiaType&&e.materialName)if(b||w){$(".mask").fadeIn(),$(".maskSpan").addClass("maskIcon");var a=new FormData;a.append("file",w),console.log(222),setTimeout(function(){"0"==e.materiaAttribute&&$.ajax({type:"post",url:"".concat(vApi,"/fileUpload"),async:!1,processData:!1,contentType:!1,headers:{token:n},data:a,success:function(e){if(console.log(e),0!=e.code)return o.msg(e.message),!1;b=e.data.src},error:function(e){return $(".mask").fadeOut(),$(".maskSpan").removeClass("maskIcon"),o.msg("上传图片失败",{icon:icon}),!1}});var i=JSON.stringify({advertisingAttribute:e.materiaAttribute,advertisingStatus:e.materiaStatus,advertisingType:e.materiaType,duration:I,img:b,name:e.materialName,size:y.slice(0,4),merchantId:t});loadingAjax("/advertising/saveAdvertising","post",i,sessionStorage.token,"mask","uploadMaterialCont","uploadMateriaBox",o).then(function(e){u.reload({where:{}}),o.msg(e.message,{icon:1}),s.val("uploadValData",{materialName:"",materiaAttribute:"",materiaType:"",materiaStatus:""}),$(".uploadMaterialCont .materiaImg video").hide(),$(".uploadMaterialCont .materiaDow").hide(),$(".uploadMaterialCont .materiaDow img").hide(),$(".uploadMaterialCont .ImgBtn").hide(),$(".uploadMaterialCont .VideoBtn").hide(),b=null,w=null}).catch(function(e){o.msg(e.message,{icon:2})})},300)}else o.msg("请上传图片或视频",{icon:7});else o.msg("带*为必填",{icon:7})});var C=treeList();function B(e,a,i,n){e.render({elem:"#".concat(a),id:"treelist",showLine:!0,onlyIconControl:!0,data:n,spread:!0,text:{defaultNodeName:"无数据",none:"您没有权限，请联系管理员授权!"},click:function(e){t=String(e.data.id),i.reload({where:{merchantId:t,merchant_id:e.data.id}});for(var n=$("#".concat(a," .layui-tree-txt")),o=0;o<n.length;o++)n[o].innerHTML===e.data.title?n[o].style.color="#be954a":n[o].style.color="#555"}})}B(d,"test1",u,C),$("body").bind("keydown",function(e){116==e.keyCode&&f5Fun()}),$(".refreshBtn").click(function(){location.reload()}),$(".refreshBtnList").click(function(){var e=treeList();JSON.stringify(e)!=JSON.stringify(C)?(B(d,"test1",u,C=e),u.reload({where:{merchantId:Number(t)}}),o.msg("已刷新",{icon:1})):o.msg("已刷新",{icon:1})});var O=!0;$(".data-list").on("mouseenter",".pic102",function(e){$("#pic101").attr("src",$(this).attr("src"));var t=new Image;t.onload=function(){$("#pic101").css({width:this.width>=this.height?"350px":"auto",height:this.height>this.width?"350px":"auto"}).fadeIn("fast"),this.onload=null},t.src=$(this).attr("src")}),$(".data-list").on("click",".pic102",function(){event.stopPropagation(),O=!1}),$(".data-list").on("mouseleave",".pic102",function(){O&&$("#pic101").hide()}),$("#pic101").click(function(){event.stopPropagation()}),$("body").click(function(){O=!0,$("#pic101").hide(),$(".ListOperation").fadeOut(),v=null}),$("#pic101").mouseenter(function(){$("#pic101").show()}),$("#pic101").mouseleave(function(){O&&$("#pic101").hide()})})},620:function(e,t){}});