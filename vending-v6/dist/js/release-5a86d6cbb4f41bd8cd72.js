/*! 版权所有，翻版必究 */!function(e){function t(t){for(var i,s,c=t[0],r=t[1],l=t[2],u=0,p=[];u<c.length;u++)s=c[u],Object.prototype.hasOwnProperty.call(a,s)&&a[s]&&p.push(a[s][0]),a[s]=0;for(i in r)Object.prototype.hasOwnProperty.call(r,i)&&(e[i]=r[i]);for(d&&d(t);p.length;)p.shift()();return o.push.apply(o,l||[]),n()}function n(){for(var e,t=0;t<o.length;t++){for(var n=o[t],i=!0,c=1;c<n.length;c++){var r=n[c];0!==a[r]&&(i=!1)}i&&(o.splice(t--,1),e=s(s.s=n[0]))}return e}var i={},a={35:0},o=[];function s(t){if(i[t])return i[t].exports;var n=i[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,s),n.l=!0,n.exports}s.m=e,s.c=i,s.d=function(e,t,n){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},s.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(s.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)s.d(n,i,function(t){return e[t]}.bind(null,i));return n},s.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="";var c=window.webpackJsonp=window.webpackJsonp||[],r=c.push.bind(c);c.push=t,c=c.slice();for(var l=0;l<c.length;l++)t(c[l]);var d=r;o.push([251,0]),n()}({251:function(e,t,n){"use strict";n.r(t);n(624);layui.use(["element","laydate","table","carousel","tree","form"],function(){var e=window.parent.permissionsData1(),t=permissionsVal1({383:!1,384:!1,386:!1,404:!1,406:!1},e);function i(){t[383]?$(".publicAdvertisingBtn").removeClass("hide"):$(".publicAdvertisingBtn").addClass("hide"),t[386]?$(".auditBtnTwo").removeClass("hide"):$(".auditBtnTwo").addClass("hide"),t[404]?$(".pushReleaseBtn").removeClass("hide"):$(".pushReleaseBtn").addClass("hide"),t[406]?$(".RpushListBtn").removeClass("hide"):$(".RpushListBtn").addClass("hide")}i();var a=sessionStorage.token,o=layui.tree,s=layui.form,c=getKeyTime().startTime,r=getKeyTime().endTime,l=layui.laydate;l.render({elem:"#test6",range:!0,value:getKeyTime().keyTimeData,done:function(e,t,n){var i=e.split(" - ");c=i[0],r=i[1]}}),$(".sidebar i").click(function(){$(".left-mian").hide(),$(".on-left").show()}),$(".on-left").click(function(){$(".left-mian").show(),$(".on-left").hide()}),$(".keyBtn").click(function(){timeFlag(c,r)?layer.msg("时间选择范围最多三个月",{icon:7}):(saveTableWidth(u),p.reload({where:{condition:c,conditionTwo:r},cols:u}))});$(".an-btn").click(function(){$(".pack-up").slideToggle()});var d=layui.table,u=[[{type:"checkbox"},{field:"number",title:"发布单号",align:"center"},{field:"advertisingTime",align:"center",title:"广告时长(秒)",templet:function(e){var t=0;return e.publicizeAdvert.forEach(function(e,n){return t+=Number(e.time)}),t}},{field:"advertisingSize",align:"center",title:"广告大小(MB)",templet:function(e){var t=0;return e.publicizeAdvert.forEach(function(e,n){return t+=Number(e.size)}),t=t.toFixed(2)}},{field:"attribute",align:"center",title:"审核状态",templet:function(e){return 0==e.attribute?"未审核":1==e.attribute?"待审核":2==e.attribute?"审核通过":"审核不通过"}},{field:"addUser",title:"创建人",align:"center"},{field:"creationTime",title:"创建时间",align:"center"},{field:"operation",align:"center",title:"操作",toolbar:"#barDemo"}]],p=d.render({elem:"#machineListData",url:"".concat(vApi,"/publicized/selectPublicize"),method:"post",contentType:"application/json",headers:{token:a},cols:u,page:!0,id:"advertisingData",loading:!0,height:"full-210",request:{pageName:"pageNum",limitName:"pageSize"},where:{conditionThree:sessionStorage.machineID,condition:c,conditionTwo:r},parseData:function(e){return 200==e.code?{code:e.code,msg:"",count:e.data.total,data:e.data.list}:{code:e.code,msg:e.message}},response:{statusCode:200},done:function(e){i(),403==e.code?window.parent.location.href="login.html":405==e.code&&$(".hangContent").show()}}),m=layui.carousel,h=null,g=null,f=null,v=null,b=null;d.on("tool(machineListData)",function(e){if(event.stopPropagation(),g=e.data.number,b=e.data,"operation"===e.event){if(v==e.data.number)return $(".ListOperation").fadeOut(),void(v=null);2!=e.data.attribute?$(".ListOperation .push").addClass("hide"):$(".ListOperation .push").removeClass("hide"),v=e.data.number,$(".ListOperation").fadeIn(),$(".ListOperation").css({left:$(this).offset().left-35+"px",top:$(this).offset().top+35+"px"})}}),$(".ListOperation .preview").click(function(){f=b.publicizeAdvert,L(b.publicizeAdvert,"previewSwiperCont","swiperDetails",f);var e={interval:1e3*f[0].time};T.reload(e),popupShow("preview","previewContnet")}),$(".ListOperation .details").click(function(){C(h=b.publicizeAdvert,"detailsListBox"),popupShow("advertisingDetails","detailsBox")}),$(".ListOperation .toView").click(function(){d.render({elem:"#machine1",url:"".concat(vApi,"/publicized/getPublicizedMachine"),method:"post",contentType:"application/json",headers:{token:a},cols:[[{field:"number",title:"售货机编号",align:"center"},{field:"info",title:"售货机名",align:"center"},{field:"location",title:"机售货机地址",align:"center"},{field:"operatio",title:"操作",toolbar:"#machineDemo",align:"center"}]],page:!0,id:"machineDataDetail",skin:"nob",request:{pageName:"pageNum",limitName:"pageSize"},where:{condition:g},parseData:function(e){return 200==e.code?{code:e.code,msg:"",count:e.data.total,data:e.data.list}:{code:e.code,msg:e.message}},response:{statusCode:200},done:function(e){403==e.code&&(window.parent.location.href="login.html")}}),popupShow("toViveCont","toViveBox")}),$(".ListOperation .push").click(function(){b.merchantId==sessionStorage.machineID?(B||(B=d.render({elem:"#machineDetailsList",url:"".concat(vApi,"/machine/getMachineList"),method:"post",contentType:"application/json",headers:{token:a},cols:[[{type:"checkbox"},{field:"number",title:"售货机编号",align:"center"},{field:"info",title:"售货机信息",align:"center"},{field:"location",title:"地址",align:"center"},{field:"merchantName",title:"所属商户",align:"center"},{field:"description",title:"描述",align:"center"}]],page:!0,id:"machineAdvertisingList",loading:!0,limits:[10,20,50],request:{pageName:"pageNum",limitName:"pageSize"},parseData:function(e){return 200==e.code?{code:e.code,msg:e.message,count:e.data.total,data:e.data.list}:{code:e.code,msg:e.message}},where:{actionStatus:"1",merchantId:sessionStorage.machineID},response:{statusCode:200},done:function(e){403==e.code&&(window.parent.location.href="login.html")}})),popupShow("machineDetailsCont","machineDetailsBox")):layer.msg("不能使用下级商户广告",{icon:7})}),$(".playHeader .close").click(function(){$(this).parent().parent().addClass("margin0"),$(this).parents(".maskContnet").fadeOut(),T&&T.reload({autoplay:!1})}),$(".detailsListBox").on("click",".listPreview .previewBtn",function(){$(".MateriaBody .materiaImg img").attr("src",h[$(this).attr("previewIndex")].img),popupShow("materialPreview","MateriaBox")}),$(".detailsListBox").on("click",".listLift img",function(){var e=$(this).attr("ImgIndex"),t=h[e-1];h[e-1]=h[e],h[e]=t,C(h,"detailsListBox")}),$(".detailsListBox").on("blur",".listSize input",function(){$(this).val()>0&""!=$(this).val()?h[$(this).attr("inputIndex")].time=$(this).val():$(this).val(h[$(this).attr("inputIndex")].time)}),$(".detailsFooter .confirmBtn").click(function(){if(t[384]){var e=[];h.forEach(function(t,n){var i={sort:n+1,time:t.time,vid:t.vid};e.push(i)}),$.ajax({type:"post",url:"".concat(vApi,"/publicized/updatePublicize"),processData:!1,contentType:!1,headers:{"Content-Type":"application/json",token:a},data:JSON.stringify({number:g,publicizeAdvert:e}),success:function(t){200==t.code?(popupHide("advertisingDetails","detailsBox"),layer.msg("修改成功",{icon:1}),e=[]):403==t.code?window.parent.location.href="login.html":layer.msg(t.message,{icon:7})}})}else layer.msg("您没有编辑广告的权限",{icon:7})}),$(".publishCont .onBtn").click(function(){onStep("publishCont","setAdvertising"),$(".stepsTwo").css("borderColor","#909399"),$(".stepsTwo>div").css("color","#909399"),$(".publishLast").css("color","#909399"),T.reload({autoplay:!1})});var y="",k="";l.render({elem:"#itemrs1",range:!0,done:function(e,t,n){timerKey=e.split(" - "),y=timerKey[0],k=timerKey[1]}}),l.render({elem:"#itemrs2",value:new Date,max:"0"}),$(".addQueryBtn").click(function(){w.reload({where:{startTime:y,endTime:k,keyWord:$('input[name="keyName"]').val()}})});var w=null,S=[];function x(e,t){var i="";$.each(e,function(e,t){i+=' <li class="setMateraialList">\n                                <div class="liftImg" style="text-align: center;">\n                                    <img '.concat(0==e?'class="hidden"':"",' src="').concat(n(252),'" class="sortingImg" index="').concat(e,'" alt="">\n                                </div>\n                                <div class="SetSorting">\n                                    <div>').concat(e+1,'</div>\n                                </div>\n                                <div class="abbreviateImg">\n                                    <img src="').concat(t.img,'" alt="">\n                                </div>\n                                <div class="SetName">\n                                    <div>').concat(t.name,'</div>\n                                </div>\n                                <div class="duration">\n                                    <div>\n                                        <input type="number" value="').concat(t.inputVal?t.inputVal:"",'" index="').concat(e,'">\n                                    </div>\n                                </div>\n                                <div class="SetType">\n                                    <div>').concat(0==t.advertisingAttribute?"图片":"视频",'</div>\n                                </div>\n                                <div class="SetType">\n                                    <div>').concat(0==t.advertisingType?"横屏":"竖屏",'</div>\n                                </div>\n                                <div class="SetOperation">\n                                    <button class="layui-btn layui-btn-normal  btn delBtn" delindex="').concat(e,'">\n                                        <span>删除</span>\n                                    </button>\n                                </div>\n                            </li>')}),$(".".concat(t)).empty(),$(".".concat(t)).html(i)}$(".setAdvertising .addBtn").click(function(){popupShow("pubilshMaterialCont","pubilshMaterialBox"),w||(w=d.render({elem:"#chooseData",url:"".concat(vApi,"/advertising/selectAdvertising"),method:"post",contentType:"application/json",headers:{token:a},cols:[[{type:"checkbox"},{field:"img",title:"微缩图",templet:"#imgtmp",align:"center"},{field:"name",title:"素材名",align:"center"},{field:"size",title:"大小(MB)",align:"center"},{field:"duration",title:"播放时长(秒)",align:"center"},{field:"advertisingAttribute",align:"center",title:"素材属性",templet:function(e){return 0==e.advertisingAttribute?"图片":"视频"}},{field:"addUser",align:"center",title:"创建人 "},{field:"creationTime",title:"创建时间",align:"center"}]],page:!0,id:"chooesId",height:450,loading:!0,request:{pageName:"pageNum",limitName:"pageSize"},where:{status:"1",checkStatus:"2",merchantId:sessionStorage.machineID},parseData:function(e){return 200==e.code?{code:e.code,msg:"",count:e.data.total,data:e.data.list}:{code:e.code,msg:e.message}},response:{statusCode:200},done:function(e){403==e.code&&(window.parent.location.href="login.html")}}))}),$(".pubilshMaterialCont .determineBtn").click(function(){(S=S.concat(d.checkStatus("chooesId").data)).length>0?(popupHide("pubilshMaterialCont","pubilshMaterialBox"),x(S,"SetContList"),w.reload({where:{}})):layer.msg("请选择素材",{icon:7})}),$(".SetContList").on("click",".sortingImg",function(){var e=$(this).attr("index"),t=S[e-1];S[e-1]=S[e],S[e]=t,x(S,"SetContList")}),$(".SetContList").on("click",".setMateraialList .delBtn",function(){S.splice($(this).attr("delindex"),1),x(S,"SetContList")}),$(".SetContList").on("blur",".duration input",function(){S[$(this).attr("index")].inputVal=$(this).val()}),$(".setAdvertising .nextBtn").click(function(){$(".stepsTwo").css("borderColor","#e6a23c"),$(".stepsTwo>div").css("color","#e6a23c"),$(".publishLast").css("color","#e6a23c");var e=S.every(function(e,t){return e.inputVal>0&""!=e.inputVal});S.length>0?e?(L(S,"swiperList","publisSwiper",S),nextStep("setAdvertising","publishCont")):layer.msg("素材播放时长必须大于0",{icon:7}):layer.msg("请选择素材",{icon:7})}),$(".publishCont .publishBtn").click(function(){popupShow("pubilshSweet","sweetBox")}),$(".pubilshSweet .confirmBtn").click(function(){$(".mask").fadeIn(),$(".maskSpan").addClass("maskIcon");var e=[];S.forEach(function(t,n){var i={sort:n+1,time:t.inputVal,vid:t.vid};e.push(i)}),e.length==S.length?loadingAjax("/publicized/savePublicize","post",JSON.stringify({publicizeAdvert:e,merchantId:sessionStorage.machineID}),sessionStorage.token,"mask","","",layer).then(function(e){popupHide("pubilshSweet","sweetBox"),popupHide("releaseAdvertising","publishBox"),layer.msg("发布成功",{icon:1}),S=[],p.reload({where:{}})}).catch(function(e){layer.msg(e.message,{icon:7})}):layer.msg("出错！请重新发布",{icon:7})});var B=null;function C(e,t){var n="";$.each(e,function(e,t){n+=' <li class="detailsList">\n                                <div class="listSort">\n                                    <span>'.concat(e+1,'</span>\n                                </div>\n                                <div class="listImg">\n                                    <img src="').concat(t.img,'"\n                                        alt="">\n                                </div>\n                                <div class="listName">\n                                    <span>').concat(t.name,'</span>\n                                </div>\n                                <div class="listSize">\n                                    <input type="number" inputIndex="').concat(e,'" value="').concat(t.time,'">\n                                </div>\n                                <div class="listAttribute">\n                                    <span>').concat(0==t.advertisingAttribute?"图片":"视频",'</span>\n                                </div>\n                                <div class="listType">\n                                    <span>').concat(0==t.advertisingType?"横屏":"竖屏",'</span>\n                                </div>      \n                                <div class="listSize">\n                                    <span>').concat(t.size,'</span>\n                                </div>\n                                <div class="uploadName">\n                                    <span>').concat(t.addUser,'</span>\n                                </div>\n                                <div class="listPreview">\n                                    <button class="layui-btn layui-btn-normal  btn previewBtn " previewIndex="').concat(e,'">\n                                        <span>预览</span>\n                                    </button>\n                                </div>\n                                <div class="listLift" >\n                                    <img src="../../img/lift.png" alt="" ').concat(0==e?'class="hidden"':"",' ImgIndex="').concat(e,'">\n                                </div>\n                            </li>')}),$(".".concat(t)).empty(),$(".".concat(t)).html(n)}$(".machineDetailsCont .machineKeyBtn").click(function(){B.reload({where:{keyword:$('.machineDetailsCont input[name="machineKey"]').val()}})}),$(".publicAdvertisingBtn").click(function(){$(".setAdvertising").css("left",0),$(".stepsTwo").css("borderColor","#909399"),$(".stepsTwo>div").css("color","#909399"),$(".publishLast").css("color","#909399"),$(".publishCont").css("left","100%"),popupShow("releaseAdvertising","publishBox"),x(S,"SetContList")});var T=null;function L(e,t,n,i){var a="";$.each(e,function(e,t){a+=' <div>\n                            <img src="'.concat(t.img,'"  ').concat(0!=t.advertisingAttribute?'class="hidden"':"",' alt="">\n                            <video src="').concat(t.img,'" controls="controls" ').concat(1!=t.advertisingAttribute?'class="hidden"':"","></video>\n                           </div>")}),$(".".concat(t)).empty(),$(".".concat(t)).html(a),T=m.render({elem:"#".concat(n),width:"100%",arrow:"always",height:"100%",interval:3e3,autoplay:!0});var o=null;m.on("change(".concat(n,")"),function(e){setTimeout(function(){o={interval:1e3*i[e.index].time||1e3*i[e.index].inputVal},T.reload(o)},500)})}function I(e,t,n){loadingAjax(n,"post",JSON.stringify({data:t,type:e}),sessionStorage.token,"mask","","",layer).then(function(e){layer.msg(e.message,{icon:1}),p.reload({where:{}})}).catch(function(e){202==e.code?(layer.msg(e.message,{icon:7}),p.reload({where:{}})):layer.msg(e.message,{icon:2})})}$(".submitAuditBtn").click(function(){var e=d.checkStatus("advertisingData"),t=[];e.data.length>0?($(".mask").fadeIn(),$(".maskSpan").addClass("maskIcon"),e.data.forEach(function(e,n){var i={number:e.number,status:"1"};t.push(i)}),I("1",t,"/publicized/checkStatus")):layer.msg("请选择需要提交审核的素材",{icon:7})}),$(".approvedBtn").click(function(){var e=d.checkStatus("advertisingData"),t=[];e.data.length>0?layer.confirm("确定审核通过？",function(n){layer.close(n),$(".mask").fadeIn(),$(".maskSpan").addClass("maskIcon"),e.data.forEach(function(e,n){var i={number:e.number,status:"2"};t.push(i)}),I("0",t,"/publicized/updateStatus")}):layer.msg("请选择需要通过审核的素材",{icon:7})}),$(".noPassBtn").click(function(){var e=d.checkStatus("advertisingData"),t=[];e.data.length>0?layer.confirm("确定审核不通过？",function(n){layer.close(n),$(".mask").fadeIn(),e.data.forEach(function(e,n){var i={number:e.number,status:"3"};t.push(i)}),I("0",t,"/publicized/updateStatus")}):layer.msg("请选择需要不通过审核的素材",{icon:7})}),$(".machineDetailsCont .determineBtn").click(function(){var e=d.checkStatus("machineAdvertisingList");if(e.data.length>0){$(".mask").fadeIn(),$(".maskSpan").addClass("maskIcon");var t=[];e.data.forEach(function(e,n){t.push(e.machineId)}),t=t.toString(),$.ajax({type:"post",headers:{"Content-Type":"application/json",token:a},url:"".concat(vApi,"/pushAd"),data:JSON.stringify({number:g,machine:t}),success:function(e){$(".mask").fadeOut(),$(".maskSpan").removeClass("maskIcon"),popupHide("machineDetailsCont","machineDetailsBox"),layer.msg("推送成功",{icon:1})},error:function(e){layer.msg("服务器请求超时",{icon:2})}})}else layer.msg("请选择售货机",{icon:7})}),$(".machineDetailsCont .allDetermineBtn").click(function(){layer.confirm("确认推送广告到所有售货机？",function(e){layer.close(e),$.ajax({type:"post",headers:{"Content-Type":"application/json",token:a},url:"".concat(vApi,"/pushAd"),data:JSON.stringify({number:g}),success:function(e){popupHide("machineDetailsCont","machineDetailsBox"),layer.msg("推送成功",{icon:1})},error:function(e){layer.msg("服务器请求超时",{icon:2})}})})});var D,A=D=treeList();treeFun(o,"test1",p,A,"conditionThree"),d.on("tool(machine1)",function(e){!function(e,t,n){var i=new AMap.Map("machineScottBody",{resizeEnable:!0,center:[e,t],zoom:13}),a=new AMap.Marker({position:i.getCenter(),icon:"//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png",offset:new AMap.Pixel(-13,-30)});a.setMap(i),a.setTitle("我是marker的title"),a.setLabel({offset:new AMap.Pixel(20,20),content:"<div class='info'>"+n+"</div>",direction:"right"})}(e.data.longitude,e.data.latitude,e.data.location),popupShow("ScottCont","scottBox")}),$(".refreshBtn").click(function(){location.reload()}),$("body").bind("keydown",function(e){116==e.keyCode&&(e.preventDefault(),location.reload())});var M=null,z=null;$(".pushReleaseBtn").click(function(){z=[],(M=d.checkStatus("advertisingData")).data.forEach(function(e,t){2==e.attribute&&z.push(e.number)}),0!=z.length?(popupShow("chooseLower","chooseBox"),leg.tree({ele:".treeList",data:D,cascade:!1}),$.each($(".treeList input"),function(){M.data[0].merchantId!=$(this).val()||$(this).prop("disabled",!0)})):layer.msg("请选择审核通过的广告,非审核通过的广告不能推送",{icon:7})});var O=null;$(".RdetermineBtn").click(function(){0!=(O=leg.getCheckedNodes().map(Number)).length?popupShow("PushMandatory","MandatoryBox"):layer.msg("请选择要推送的商户",{icon:7})}),$(".RpushListBtn").click(function(){popupShow("topGoodsList","topBox")}),$(".mandatroFooter div").click(function(){var e=$(this).attr("Ptype");$(".mask").fadeIn(),$(".maskSpan").addClass("maskIcon");var t=JSON.stringify({merchantId:sessionStorage.machineID,merchantList:O,numbers:z,type:e});loadingAjax("/publicized/sendMerchantAd","post",t,sessionStorage.token,"mask","chooseLower","chooseBox",layer).then(function(e){popupHide("PushMandatory","MandatoryBox"),layer.msg(e.message,{icon:1})}).catch(function(e){$(".mask").fadeOut(),$(".maskSpan").removeClass("maskIcon"),popupHide("PushMandatory","MandatoryBox"),layer.msg(e.message,{icon:2})})});var N=null;$(".RpushListBtn").click(function(){popupShow("topGoodsList","topBox"),N||(N=d.render({elem:"#parentTableTest",url:"".concat(vApi,"/publicized/getAdHistory"),height:500,method:"post",contentType:"application/json",headers:{token:a},cols:[[{type:"checkbox"},{field:"number",title:"发布单号",templet:"#Listimgtmp",align:"center"},{field:"duration",title:"广告时长(秒)",align:"center",templet:function(e){var t=0;return e.advertising.forEach(function(e,n){return t+=Number(e.time)}),t}},{field:"size",title:"广告大小(MB)",align:"center",templet:function(e){var t=0;return e.advertising.forEach(function(e,n){return t+=Number(e.size)}),t=t.toFixed(2)}},{field:"topMerchant",title:"推送商户",align:"center"},{field:"targetMerchant",title:"接收商户",align:"center"},{field:"received",title:"接收状态 ",align:"center",templet:function(e){return 0==e.received?"未接收":"已接收"}},{field:"sendTime",title:"推送时间 ",align:"center",templet:function(e){var t=new Date(e.sendTime);return t.getFullYear()+"-"+(t.getMonth()+1)+"-"+(e=t.getDate())+" "+t.getHours()+":"+t.getMinutes()+":"+t.getSeconds()}},{field:"operatio",title:"操作",align:"center",toolbar:"#pushReleaseDemo"}]],id:"parentTableId",page:!0,loading:!0,limits:[10,20,50],request:{pageName:"pageNum",limitName:"pageSize"},where:{condition:"0",conditionTwo:"0",conditionThree:"0"},parseData:function(e){return 200==e.code?{code:e.code,msg:"",count:e.data.total,data:e.data.list}:{code:e.code,msg:e.message}},response:{statusCode:200},done:function(e){for(var t in 403==e.code&&(window.parent.location.href="login.html"),e.data){var n=e.data[t];n.childMerchantId==sessionStorage.machineID&&1!=n.received||($(".list_table1 tr[data-index="+t+'] input[type="checkbox"]').prop("disabled",!0),s.render())}}}))}),$(".pushReleaseListBtn").click(function(){var e=d.checkStatus("parentTableId"),t=[];if(e.data.length>0){if(e.data.forEach(function(e,n){e.childMerchantId==sessionStorage.machineID&&0==e.received&&t.push(e.tempNumber)}),0==t.length)return void layer.msg("没有能接收的广告",{icon:7});$(".mask").fadeIn(),$(".maskSpan").addClass("maskIcon");var n=JSON.stringify({numbers:t});loadingAjax("/publicized/getMerchantAd","post",n,sessionStorage.token,"mask","topGoodsList","topBox",layer).then(function(e){layer.msg(e.message,{icon:1}),p.reload({where:{}}),N.reload({where:{}})}).catch(function(e){$(".mask").fadeOut(),$(".maskSpan").removeClass("maskIcon"),layer.msg(e.message,{icon:2})})}else layer.msg("请选择接收的广告",{icon:7})}),$(".topBody .pushQueryBtn").click(function(){N.reload({where:{condition:$('.topBody select[name="receiveStatus"]').val()||"0",conditionTwo:$('.topBody select[name="receiveType"]').val()||"0",conditionThree:$('.topBody select[name="mandatory"]').val()||"0"}})}),d.on("tool(parentTableTest)",function(e){f=e.data.advertising,L(e.data.advertising,"previewSwiperCont","swiperDetails",f);var t={interval:1e3*f[0].time};T.reload(t),popupShow("preview","previewContnet")}),$(".chooseLower .chooseCan").click(function(){popupHide("chooseLower","chooseBox")}),$(".refreshBtnList").click(function(){var e=treeList();JSON.stringify(e)!=JSON.stringify(A)?(A=e,treeFun(o,"test1",p,A,"conditionThree"),p.reload({where:{conditionThree:sessionStorage.machineID}})):layer.msg("已刷新",{icon:1})});var j=!0;$(".pubilshMaterialCont").on("mouseenter",".pic102",function(e){$("#pic101").attr("src",$(this).attr("src"));var t=new Image;t.onload=function(){$("#pic101").css({width:this.width>=this.height?"350px":"auto",height:this.height>this.width?"350px":"auto"}).fadeIn("fast"),this.onload=null},t.src=$(this).attr("src")}),$(".pubilshMaterialCont").on("click",".pic102",function(){event.stopPropagation(),j=!1}),$(".pubilshMaterialCont").on("mouseleave",".pic102",function(){j&&$("#pic101").hide()}),$("#pic101").click(function(){event.stopPropagation()}),$("body").click(function(){j=!0,$("#pic101").hide(),$(".ListOperation").fadeOut(),v=null}),$("#pic101").mouseenter(function(){$("#pic101").show()}),$("#pic101").mouseleave(function(){j&&$("#pic101").hide()})})},252:function(e,t,n){e.exports=n.p+"image/a699865ab3ac2d388064ab0bc15b4519.png"},624:function(e,t){}});