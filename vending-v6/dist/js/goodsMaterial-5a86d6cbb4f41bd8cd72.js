/*! 版权所有，翻版必究 */!function(e){function t(t){for(var n,s,l=t[0],r=t[1],d=t[2],m=0,u=[];m<l.length;m++)s=l[m],Object.prototype.hasOwnProperty.call(o,s)&&o[s]&&u.push(o[s][0]),o[s]=0;for(n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n]);for(c&&c(t);u.length;)u.shift()();return i.push.apply(i,d||[]),a()}function a(){for(var e,t=0;t<i.length;t++){for(var a=i[t],n=!0,l=1;l<a.length;l++){var r=a[l];0!==o[r]&&(n=!1)}n&&(i.splice(t--,1),e=s(s.s=a[0]))}return e}var n={},o={13:0},i=[];function s(t){if(n[t])return n[t].exports;var a=n[t]={i:t,l:!1,exports:{}};return e[t].call(a.exports,a,a.exports,s),a.l=!0,a.exports}s.m=e,s.c=n,s.d=function(e,t,a){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},s.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(s.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)s.d(a,n,function(t){return e[t]}.bind(null,n));return a},s.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="";var l=window.webpackJsonp=window.webpackJsonp||[],r=l.push.bind(l);l.push=t,l=l.slice();for(var d=0;d<l.length;d++)t(l[d]);var c=r;i.push([246,0]),a()}({246:function(e,t,a){"use strict";a.r(t);a(612);layui.use(["form","layer","laydate","table","tree"],function(){var e=window.parent.permissionsData1(),t=permissionsVal1({380:!1,381:!1,379:!1,382:!1},e);function a(){t[380]?$(".addBtn").removeClass("hide"):$(".addBtn").addClass("hide"),t[381]?$(".ListOperation .edit").removeClass("hide"):$(".ListOperation .edit").addClass("hide"),t[379]?$(".dleBtn").removeClass("hide"):$(".dleBtn").addClass("hide"),t[382]?$(".auditBtnTwo").removeClass("hide"):$(".auditBtnTwo").addClass("hide")}a();$(".navTab li").click(function(){console.log($(this).index()),2==$(this).index()?v||(v=u.render({elem:"#VideoData",method:"post",url:"".concat(vApi,"/good_material/getGoodMaterial"),contentType:"application/json",headers:{token:token},height:500,cols:k,page:!0,id:"VideoListData",loading:!0,request:{pageName:"pageNum",limitName:"pageSize"},parseData:function(e){return 200==e.code?{code:e.code,msg:"",count:e.data.total,data:e.data.list}:{code:e.code,msg:e.message}},where:{conditionFour:"1",conditionSix:sessionStorage.machineID,condition:r,conditionTwo:d},response:{statusCode:200},done:function(e){a(),403==e.code?window.parent.location.href="login.html":405==e.code&&$(".hangContent").show()}}),treeFunMaterial(s,"dataGoodsVideo",v,O,"conditionSix","treelistThree")):1==$(this).index()&&(B||(B=u.render({elem:"#detailsImgData",method:"post",url:"".concat(vApi,"/good_material/getGoodMaterial"),contentType:"application/json",headers:{token:token},height:500,cols:T,page:!0,id:"detailsId",loading:!0,request:{pageName:"pageNum",limitName:"pageSize"},parseData:function(e){return 200==e.code?{code:e.code,msg:"",count:e.data.total,data:e.data.list}:{code:e.code,msg:e.message}},where:{conditionFour:"2",conditionSix:sessionStorage.machineID,condition:c,conditionTwo:m},response:{statusCode:200},done:function(e){a(),403==e.code&&(window.parent.location.href="login.html")}}),treeFunMaterial(s,"detailsIMG",B,D,"conditionSix","treelistTwo"))),$(this).addClass("active").siblings().removeClass("active");var e=$(this);$(".tabLine").animate({left:e.offset().left+"px"},500),$(".tabBox>div").eq($(this).index()).fadeIn().siblings().fadeOut()});var n=getKeyTime().startTime,o=getKeyTime().endTime,i=layui.form,s=layui.tree,l=layui.laydate;l.render({elem:"#itemrs1",range:!0,value:getKeyTime().keyTimeData,done:function(e,t,a){console.log(e);var i=e.split(" - ");console.log(i),n=i[0],o=i[1]}});var r=getKeyTime().startTime,d=getKeyTime().endTime;l.render({elem:"#itemrs2",range:!0,value:getKeyTime().keyTimeData,done:function(e,t,a){console.log(e);var n=e.split(" - ");console.log(n),r=n[0],d=n[1]}});var c=getKeyTime().startTime,m=getKeyTime().endTime;l.render({elem:"#itemrs3",range:!0,value:getKeyTime().keyTimeData,done:function(e,t,a){console.log(e);var n=e.split(" - ");console.log(n),c=n[0],m=n[1]}}),$(".videoList video").click(function(){$(".playVideo video").attr("src",$(this).attr("src")),$(".videoPlay").fadeIn()}),$(".mask").click(function(){$(".videoPlay").fadeOut(function(){$(".playVideo video").attr("src","")})}),$(".ImgContnet .add-btn").click(function(){$('.addImgCont input[name="ImgNane"]').val(""),S=null,popupShow("addImgCont","addImgBox")}),$(".addImgFooter .cancel-btn").click(function(){popupHide("addImgCont","addImgBox")}),$(".VideoContnet .add-btn").click(function(){$('.addVideoCont input[name="VideoName"]').val(""),b=null,popupShow("addVideoCont","addVideoBox")}),$(".addVideoFooter .cancel-btn").click(function(){popupHide("addVideoCont","addVideoBox")});var u=layui.table,p=[[{type:"checkbox"},{field:"img",title:"图片",templet:"#imgtmp",align:"center"},{field:"name",title:"图片名",align:"center"},{field:"status",title:"审核状态",align:"center",templet:function(e){return 0==e.status?"未审核":1==e.status?"待审核":2==e.status?"审核通过":"审核不通过"}},{field:"number",title:"图片编号",align:"center"},{field:"addUser",title:"创建人",align:"center"},{field:"publishTime",title:"创建时间",align:"center"},{field:"operation",title:"操作",toolbar:"#barDemoImg",align:"center"}]],g=u.render({elem:"#ImgData",method:"post",url:"".concat(vApi,"/good_material/getGoodMaterial"),contentType:"application/json",headers:{token:token},height:500,cols:p,page:!0,id:"ImgListData",loading:!0,request:{pageName:"pageNum",limitName:"pageSize"},parseData:function(e){return 200==e.code?{code:e.code,msg:"",count:e.data.total,data:e.data.list}:{code:e.code,msg:e.message}},where:{conditionFour:"0",conditionSix:sessionStorage.machineID,condition:n,conditionTwo:o},response:{statusCode:200},done:function(e){a(),403==e.code&&(window.parent.location.href="login.html")}}),f=null,h=null,I=null,y=null;u.on("tool(ImgData)",function(e){if(event.stopPropagation(),f=e.data,y=1,"operation"===e.event){if(I==e.data.number)return $(".ListOperation").fadeOut(),void(I=null);I=e.data.number,$(".ListOperation").fadeIn(),$(".ListOperation").css({left:$(this).offset().left-35+"px",top:$(this).offset().top+35+"px"})}}),$(".ListOperation .edit").click(function(){1==y?(popupShow("editImgCont","editBox"),$(".editImgCont .playHeader span").html("编辑商品图片"),$(".editBody label").html("图片名："),$('.FlexInputWidth input[name="EidtImgNane"]').val(f.name),h=g):2==y?(popupShow("editImgCont","editBox"),$(".editImgCont .playHeader span").html("编辑商品视频"),$(".editBody label").html("视频名："),$('.FlexInputWidth input[name="EidtImgNane"]').val(f.name),h=v):3==y&&(popupShow("editImgCont","editBox"),$(".editImgCont .playHeader span").html("编辑详情图片"),$(".editBody label").html("图片名："),$('.FlexInputWidth input[name="EidtImgNane"]').val(f.name),h=B)}),$(".ListOperation .Tpreview").click(function(){1==y?(popupShow("videoPlay","playBox"),$(".playBody div").html('<img src="'.concat(f.img,'" alt="">'))):2==y?(popupShow("videoPlay","playBox"),$(".playBody div").html('<video src="'.concat(f.img,'" controls="controls"></video>'))):3==y&&(popupShow("videoPlay","playBox"),$(".playBody div").html('<img src="'.concat(f.img,'" alt="">')))}),$(".editImgBtn").click(function(){var e=[];if($('.FlexInputWidth input[name="EidtImgNane"]').val()){var t={number:f.number,name:$('.FlexInputWidth input[name="EidtImgNane"]').val()};e.push(t),$(".mask").fadeIn(),$(".maskSpan").addClass("maskIcon"),loadingAjax("/good_material/updateGoodMaterial","post",JSON.stringify({data:e}),sessionStorage.token,"mask","editImgCont","editBox",layer).then(function(e){layer.msg(e.message,{icon:1}),setTimeout(function(){h.reload({where:{}})},100)}).catch(function(e){layer.msg(e.message,{icon:2})})}else layer.msg("素材名不能为空",{icon:7})}),$(".ImgQueyuBtnClick").click(function(){timeFlag(n,o)?layer.msg("时间选择范围最多三个月",{icon:7}):(saveTableWidth(p),g.reload({where:{conditionThree:$('.newKeyContent input[name="KeyImgName"]').val(),conditionFour:"0",condition:n,conditionTwo:o,conditionFive:$('.ImgContnet select[name="logoImgStatus"]').val()},cols:p}))}),$(".VideoQueryBtnClick").click(function(){saveTableWidth(k),v.reload({where:{conditionThree:$('.newKeyContent input[name="keyVideoName"]').val(),conditionFour:"1",condition:r,conditionTwo:d,conditionFive:$('.VideoContnet select[name="videoStatus"]').val()},cols:k})}),$(".detailsImgQueyuBtnClick").click(function(){timeFlag(c,m)?layer.msg("时间选择范围最多三个月",{icon:7}):(saveTableWidth(T),B.reload({where:{conditionThree:$('.details input[name="KeyImgName"]').val(),conditionFour:"2",condition:c,conditionTwo:m,conditionFive:$('.details select[name="detailsImgStatus"]').val()},cols:T}))});var v=null,k=[[{type:"checkbox"},{field:"name",title:"视频名",align:"center"},{field:"name",title:"审核状态",align:"center",templet:function(e){return 0==e.status?"未审核":1==e.status?"待审核":2==e.status?"审核通过":"审核不通过"}},{field:"number",title:"视频编号",align:"center"},{field:"addUser",title:"创建人",align:"center"},{field:"publishTime",title:"创建时间",align:"center"},{field:"operation",title:"操作",toolbar:"#barDemoVideo",align:"center"}]];u.on("tool(VideoData)",function(e){if(event.stopPropagation(),f=e.data,y=2,"operation"===e.event){if(I==e.data.number)return $(".ListOperation").fadeOut(),void(I=null);I=e.data.number,$(".ListOperation").fadeIn(),$(".ListOperation").css({left:$(this).offset().left-35+"px",top:$(this).offset().top+35+"px"})}}),$(".editCancelBtn").click(function(){popupHide("editImgCont","editBox")}),$(".addDetailsImgCont .detalisCancelBtn").click(function(){popupHide("addDetailsImgCont","addDetailsImgBox")}),$(".uploadBtn").click(function(){$("#tailoringImg").cropper("destroy"),$(".ImgCropping").fadeIn(),$(".tailoring-container").fadeIn()}),$(".ImgBtn").click(function(){var e=i.val("ImgData");if(e.ImgNane)if(S){var t=JSON.stringify({attribute:"0",img:S,name:e.ImgNane});$(".mask").fadeIn(),$(".maskSpan").addClass("maskIcon"),loadingAjax("/good_material/saveGoodMaterial","post",t,sessionStorage.token,"mask","addImgCont","addImgBox",layer).then(function(e){$('.FlexInputWidth ingpu[name="ImgNane"]').val(""),$("#GoodsImg").attr("src",""),S=null,$(".upload-list").hide(),layer.msg(e.message,{icon:1}),g.reload({where:{}})}).catch(function(e){layer.msg(e.message,{icon:2})})}else layer.msg("请上传图片",{icon:7});else layer.msg("图片名不能为空",{icon:7})});var b=null;function w(e,t,a,n,o){loadingAjax(o,"post",JSON.stringify({data:t,type:e}),sessionStorage.token,"mask","","",layer).then(function(e){layer.msg(e.message,{icon:1}),a.reload({where:{conditionFour:n}})}).catch(function(e){202==e.code?(layer.msg(e.message,{icon:7}),a.reload({where:{conditionFour:n}})):layer.msg(e.message,{icon:2})})}$(".uploadVideoChange").change(function(e){console.log(e);var t=new FormData;t.append("file",e.target.files[0]),$(".mask").fadeIn(),$(".maskSpan").addClass("maskIcon"),$.ajax({type:"post",url:"".concat(vApi,"/fileUpload"),processData:!1,contentType:!1,timeout:1e4,headers:{token:token},data:t,success:function(e){console.log(e),$(".mask").fadeOut(),$(".maskSpan").removeClass("maskIcon"),0==e.code?(b=e.data.src,$(".uploadVideo").fadeIn(),$(".uploadVideo video").attr("src",e.data.src)):layer.msg(e.message,{icon:7})},error:function(e){$(".mask").fadeOut(),$(".maskSpan").removeClass("maskIcon"),layer.msg("上传失败",{icon:2})}})}),$(".addVideoBtn").click(function(){if($('.FlexInputWidth input[name="VideoName"]').val())if(b){var e=JSON.stringify({attribute:"1",img:b,name:$('.FlexInputWidth input[name="VideoName"]').val()});$(".mask").fadeIn(),$(".maskSpan").addClass("maskIcon"),loadingAjax("/good_material/saveGoodMaterial","post",e,sessionStorage.token,"mask","addVideoCont","addVideoBox").then(function(e){$('.FlexInputWidth input[name="VideoName"]').val(""),b=null,$(".uploadVideo video").attr("src",""),$(".uploadVideo").fadeOut(),layer.msg(e.message,{icon:1}),v.reload({where:{}})}).catch(function(e){layer.msg(e.message,{icon:2})})}else layer.msg("请上传视频",{icon:7});else layer.msg("视频名不能为空",{icon:7})}),$(".delBtn").click(function(){console.log($(this).attr("typeId"));var e=$(this).attr("typeId"),t=null,a=null;0==$(this).attr("typeId")?(t=u.checkStatus("ImgListData"),a=g):1==$(this).attr("typeId")?(t=u.checkStatus("VideoListData"),a=v):(t=u.checkStatus("detailsId"),a=B),console.log(t),t.data.length>0?layer.confirm("确定删除？",function(n){layer.close(n),$(".mask").fadeIn(),$(".maskSpan").addClass("maskIcon");var o=[];t.data.forEach(function(e,t){var a={number:e.number};o.push(a)}),$(".mask").fadeIn(),$(".maskSpan").addClass("maskIcon"),loadingAjax("/good_material/deleteGoodMaterial","post",JSON.stringify({data:o}),sessionStorage.token,"mask","","",layer).then(function(t){layer.msg(t.message,{icon:1}),a.reload({where:{conditionFour:e}})}).catch(function(t){202==t.code?(layer.msg(res.message,{icon:7}),a.reload({where:{conditionFour:e}})):layer.msg(t.message,{icon:2})})}):layer.msg("请选择需要删除的图片或视频",{icon:7})}),$(".submitAuditBtn").click(function(){var e=null,t=null,a=[];0==$(this).attr("typeId")?(e=u.checkStatus("ImgListData"),t=g):1==$(this).attr("typeId")?(e=u.checkStatus("VideoListData"),t=v):(e=u.checkStatus("detailsId"),t=B),console.log(),e.data.length>0?($(".mask").fadeIn(),$(".maskSpan").addClass("maskIcon"),console.log(e),e.data.forEach(function(e,t){var n={number:e.number,status:"1"};a.push(n)}),console.log(a),w("1",a,t,$(this).attr("typeId"),"/good_material/submitGoodMaterial")):layer.msg("请选择需要提交审核的图片或视频",{icon:7})}),$(".auditBtn").click(function(){var e=null,t=null,a=this,n=[];0==$(this).attr("typeId")?(e=u.checkStatus("ImgListData"),t=g):1==$(this).attr("typeId")?(e=u.checkStatus("VideoListData"),t=v):(e=u.checkStatus("detailsId"),t=B),e.data.length>0?layer.confirm(2==$(a).attr("type")?"确定审核通过":"确定审核不通过？",function(o){layer.close(o),$(".mask").fadeIn(),$(".maskSpan").addClass("maskIcon"),e.data.forEach(function(e,t){var o={number:e.number,status:$(a).attr("type")};n.push(o)}),w("0",n,t,$(a).attr("typeId"),"/good_material/checkGoodMaterial")}):layer.msg("请选择需要提交审核的图片或视频",{icon:7})}),(window.onresize=function(){var e=$(window).height(),t=$(window).width();t<=768?$(".tailoring-content").css({top:(e-$(".tailoring-content").outerHeight())/2,left:0}):$(".tailoring-content").css({top:(e-$(".tailoring-content").outerHeight())/2,left:(t-$(".tailoring-content").outerWidth())/2})})(),$("#chooseImg").on("change",function(){console.log(this);if(this.files&&this.files[0]){var e=new FileReader;e.onload=function(e){var t=e.target.result;$("#tailoringImg").cropper("replace",t,!1)},e.readAsDataURL(this.files[0])}}),$("#tailoringImg").cropper({aspectRatio:1,preview:".previewImg",guides:!1,autoCropArea:.5,dragCrop:!0,movable:!0,resizable:!0,zoomable:!1,mouseWheelZoom:!1,touchDragZoom:!0,rotatable:!0,crop:function(e){}}),$(".cropper-rotate-btn").on("click",function(){$("#tailoringImg").cropper("rotate",45)}),$(".cropper-reset-btn").on("click",function(){$("#tailoringImg").cropper("reset")});var C=!0;$(".cropper-scaleX-btn").on("click",function(){C?($("#tailoringImg").cropper("scaleX",-1),C=!1):($("#tailoringImg").cropper("scaleX",1),C=!0)});var S=null;$("#sureCut").on("click",function(){if(null==$("#tailoringImg").attr("src"))return!1;var e=$("#tailoringImg").cropper("getCroppedCanvas").toDataURL("image/png");$(".tailoring-container").fadeOut();var t=dataURLtoFile(e,"jpg");console.log(t);var a=new FormData;a.append("file",t),console.log(a),$(".mask").fadeIn(),$(".maskSpan").addClass("maskIcon"),$.ajax({type:"post",url:"".concat(vApi,"/fileUpload"),processData:!1,contentType:!1,timeout:1e4,headers:{token:token},data:a,success:function(e){$(".mask").fadeOut(),$(".maskSpan").removeClass("maskIcon"),console.log(e),0==e.code?(S=e.data.src,console.log(S,"img"),$("#GoodsImg").attr("src",S),$(".ImgCropping").fadeOut(),$(".upload-list").fadeIn()):layer.msg(e.msg)},error:function(e){$(".mask").fadeOut(),$(".maskSpan").removeClass("maskIcon"),layer.msg("上传失败",{icon:2})}})}),$(".close-tailoring").click(function(){$(".ImgCropping").fadeOut()}),$(".playHeader .close").click(function(){$(this).parent().parent().addClass("margin0"),$(this).parents(".maskContnet").fadeOut()});var x,D,O,B=null,T=[[{type:"checkbox"},{field:"img",title:"图片",templet:"#detailsImgtmp",align:"center"},{field:"name",title:"图片名",align:"center"},{field:"status",title:"审核状态",align:"center",templet:function(e){return 0==e.status?"未审核":1==e.status?"待审核":2==e.status?"审核通过":"审核不通过"}},{field:"number",title:"图片编号",align:"center"},{field:"addUser",title:"创建人",align:"center"},{field:"publishTime",title:"创建时间",align:"center"},{field:"operation",title:"操作",toolbar:"#barDemoImg",align:"center"}]];$(".details .add-btn").click(function(){$('.addDetailsImgCont input[name="detailsImgNane"]').val(""),b=null,popupShow("addDetailsImgCont","addDetailsImgBox")}),$('.addDetailsImgCont input[name="fileDetails"]').change(function(e){var t=this,a=new FormData;a.append("file",e.target.files[0]),$(".mask").fadeIn(),$(".maskSpan").addClass("maskIcon"),$.ajax({type:"post",url:"".concat(vApi,"/fileUpload"),processData:!1,contentType:!1,timeout:1e4,headers:{token:token},data:a,success:function(e){$(".mask").fadeOut(),$(".maskSpan").removeClass("maskIcon"),console.log(e),$(t).val(""),0==e.code?(b=e.data.src,$(".upload-list2").fadeIn(),$("#GoodsDetailsImg").attr("src",e.data.src)):layer.msg(e.message,{icon:7})},error:function(e){$(".mask").fadeOut(),$(".maskSpan").removeClass("maskIcon"),layer.msg("上传失败",{icon:2})}})}),$(".detailsImgBtn").click(function(){if($('.addDetailsImgBody input[name="detailsImgNane"]').val())if($("#GoodsDetailsImg").attr("src")){$(".mask").fadeIn(),$(".maskSpan").addClass("maskIcon");var e=JSON.stringify({attribute:"2",img:$("#GoodsDetailsImg").attr("src"),name:$('.addDetailsImgBody input[name="detailsImgNane"]').val()});loadingAjax("/good_material/saveGoodMaterial","post",e,sessionStorage.token,"mask","addDetailsImgCont","addDetailsImgBox",layer).then(function(e){$('.addDetailsImgBody input[name="detailsImgNane"]').val(""),$(".upload-list2").fadeOut(),$("#GoodsDetailsImg").attr("src",""),layer.msg(e.message,{icon:1}),B.reload({where:{}})}).catch(function(e){layer.msg(e.message,{icon:2})})}else layer.msg("请上传图片",{icon:7});else layer.msg("请输入图片名",{icon:7})}),u.on("tool(detailsImgData)",function(e){if(event.stopPropagation(),f=e.data,y=3,"operation"===e.event){if(I==e.data.number)return $(".ListOperation").fadeOut(),void(I=null);I=e.data.number,$(".ListOperation").fadeIn(),$(".ListOperation").css({left:$(this).offset().left-35+"px",top:$(this).offset().top+35+"px"})}}),$("body").bind("keydown",function(e){116==e.keyCode&&f5Fun()}),x=D=O=treeList(),treeFunMaterial(s,"LogoIMG",g,x,"conditionSix","treelistOne"),$(".sidebar i").click(function(){console.log($(this).parent()),console.log($(this).parents()),$(this).parents(".left-mian").hide(),$(this).parents(".left-mian").siblings(".on-left").show()}),$(".on-left").click(function(){$(".left-mian").show(),$(".on-left").hide()}),$(".refreshBtn").click(function(){location.reload()});var F=!0;$(".materia-wrap").on("mouseenter",".pic102",function(e){$("#pic101").attr("src",$(this).attr("src"));var t=new Image;t.onload=function(){$("#pic101").css({width:this.width>=this.height?"350px":"auto",height:this.height>this.width?"450px":"auto"}).fadeIn("fast"),this.onload=null},t.src=$(this).attr("src")}),$(".materia-wrap").on("click",".pic102",function(){event.stopPropagation(),F=!1}),$(".materia-wrap").on("mouseleave",".pic102",function(){F&&$("#pic101").hide()}),$("#pic101").click(function(){event.stopPropagation()}),$("body").click(function(){F=!0,$("#pic101").hide(),$(".ListOperation").fadeOut(),I=null}),$("#pic101").mouseenter(function(){$("#pic101").show()}),$("#pic101").mouseleave(function(){F&&$("#pic101").hide()}),$(".refreshBtnList").click(function(){layer.msg("已刷新",{icon:1}),treeList()})})},612:function(e,t){}});