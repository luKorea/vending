/*! 版权所有，翻版必究 */!function(e){function a(a){for(var p,d,y=a[0],c=a[1],o=a[2],l=0,s=[];l<y.length;l++)d=y[l],Object.prototype.hasOwnProperty.call(n,d)&&n[d]&&s.push(n[d][0]),n[d]=0;for(p in c)Object.prototype.hasOwnProperty.call(c,p)&&(e[p]=c[p]);for(r&&r(a);s.length;)s.shift()();return t.push.apply(t,o||[]),i()}function i(){for(var e,a=0;a<t.length;a++){for(var i=t[a],p=!0,y=1;y<i.length;y++){var c=i[y];0!==n[c]&&(p=!1)}p&&(t.splice(a--,1),e=d(d.s=i[0]))}return e}var p={},n={30:0},t=[];function d(a){if(p[a])return p[a].exports;var i=p[a]={i:a,l:!1,exports:{}};return e[a].call(i.exports,i,i.exports,d),i.l=!0,i.exports}d.m=e,d.c=p,d.d=function(e,a,i){d.o(e,a)||Object.defineProperty(e,a,{enumerable:!0,get:i})},d.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},d.t=function(e,a){if(1&a&&(e=d(e)),8&a)return e;if(4&a&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(d.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&a&&"string"!=typeof e)for(var p in e)d.d(i,p,function(a){return e[a]}.bind(null,p));return i},d.n=function(e){var a=e&&e.__esModule?function(){return e.default}:function(){return e};return d.d(a,"a",a),a},d.o=function(e,a){return Object.prototype.hasOwnProperty.call(e,a)},d.p="";var y=window.webpackJsonp=window.webpackJsonp||[],c=y.push.bind(y);y.push=a,y=y.slice();for(var o=0;o<y.length;o++)a(y[o]);var r=c;t.push([256,0]),i()}({256:function(e,a,i){"use strict";i.r(a);i(633);layui.use(["table","form","layer","tree"],function(){var e=layui.table,a=layui.layer,i=layui.tree,p=layui.form,n=null,t=[[{field:"1",title:"升降序",templet:"#imgtmp",event:"rank",align:"center"},{field:"rank",title:"排序",align:"center"},{field:"payName",title:"支付类型",align:"center"},{field:"appId",title:"微信公众号id/支付宝商户id/杉德商户号",align:"center",templet:function(e){return e.app_id?e.app_id:e.mchId}},{field:"merchantName",title:"所属商户",align:"center"},{field:"payee",title:"收款方",align:"center"},{field:"update_user",title:"最后修改人",align:"center"},{field:"update_time",title:"最后修改时间",align:"center",templet:function(e){return e.update_time?timeStamp(e.update_time):"-"}},{field:"operation",align:"center",title:"操作",toolbar:"#barDemo"}]],d=e.render({elem:"#payList",url:"".concat(vApi,"/pay/getPayParam"),method:"post",contentType:"application/json",headers:{token:sessionStorage.token},cols:t,id:"tablePayId",loading:!0,request:{pageName:"pageNum",limitName:"pageSize"},where:{merchantId:o},parseData:function(e){return 200==e.code?{code:e.code,msg:e.message,count:e.data.total,data:e.data}:{code:e.code,msg:e.message}},response:{statusCode:200},done:function(e){n=e.data,fixedFun(),403==e.code&&(window.parent.location.href="login.html")}});$(".refreshBtn").click(function(){saveTableWidth(t),d.reload({where:{merchantId:o},cols:t})}),$("body").bind("keydown",function(e){116==e.keyCode&&f5Fun()}),$(".playHeader .close").click(function(){$(".one").html("未上传"),$(".two").html("未上传"),$(this).parent().parent().addClass("margin0"),$(this).parents(".maskContnet").fadeOut()});var y=null,c=null;e.on("tool(payList)",function(e){if(event.stopPropagation(),y=e.data,"operation"===e.event){if(c==e.data.id)return $(".ListOperation").fadeOut(),void(c=null);c=e.data.id,$(".ListOperation").fadeIn(),$(".ListOperation").css({left:$(this).offset().left-35+"px",top:$(this).offset().top+35+"px"})}else if("rank"==e.event){if(1==e.data.rank)return;console.log(e),console.log(n);var i=JSON.stringify({merchantId:Number(o),topId:e.data.id,bottomId:n[e.data.rank-2].id});loadingAjax("/pay/sortPayParam","post",i,sessionStorage.token,"","","",a).then(function(e){a.msg("修改成功",{icon:1}),d.reload({where:{}})}).catch(function(e){console.log(res),a.msg("修改失败",{icon:1})})}}),$(".ListOperation .edit").click(function(){console.log(y,"payData"),"微信"==y.payName?($(".changePay .WeChat").show(),$(".changePay .Alipay").hide(),$(".changePay .IcbcPay").hide(),$(".changePay .juhePay").hide(),$(".changePay .numberPay").hide(),h=y.cert_dir):"支付宝"==y.payName?($(".changePay .WeChat").hide(),$(".changePay .IcbcPay").hide(),$(".changePay .juhePay").hide(),$(".changePay .numberPay").hide(),$(".changePay .Alipay").show()):3==y.payType?($(".changePay .IcbcPay").show(),$(".changePay .WeChat").hide(),$(".changePay .Alipay").hide(),$(".changePay .numberPay").hide(),$(".changePay .juhePay").hide()):4==y.payType||5==y.payType?(m=y.app_private_key,k=y.alipay_public_key,$(".changePay .juhePay").show(),$(".changePay .IcbcPay").hide(),$(".changePay .WeChat").hide(),$(".changePay .numberPay").hide(),$(".changePay .Alipay").hide()):6==y.payType?($(".changePay .numberPay").show(),$(".changePay .IcbcPay").hide(),$(".changePay .juhePay").hide(),$(".changePay .WeChat").hide(),$(".changePay .Alipay").hide()):($(".changePay .numberPay").hide(),$(".changePay .juhePay").hide(),$(".changePay .WeChat").hide(),$(".changePay .Alipay").hide(),$(".changePay .IcbcPay").hide());var e=y.payType+"";p.val("SetPay",{typeIndex:y.payType,payee:y.payee,officialId:"微信"===y.payName?y.app_id:"",MerchantsId:"微信"===y.payName?y.mchId:"",app_key:"微信"===y.payName?y.app_key:"",MerchantsKey:"微信"===y.payName?y.app_private_key:"",aliPayId:"支付宝"===y.payName?y.app_id:"",alipay_public_key:"支付宝"===y.payName||"4"===e||"5"===e?y.alipay_public_key:"",app_private_key:"支付宝"===y.payName||"4"===e||"5"===e?y.app_private_key:"",mchId:"3"===e?y.mchId:"",app_id:"3"===e?y.app_id:"",ICBC_app_key:"3"===e?y.app_key:"",ICBC_alipay_public_key:"3"===e?y.alipay_public_key:"",ICBC_app_private_key:"3"===e?y.app_private_key:"",juhemchId:"4"===e||"5"===e?y.mchId:"",juheapp_id:"4"===e||"5"===e?y.app_id:"",juheapp_key:"4"===e||"5"===e?y.app_key:"",app_key_number:"6"===e?y.app_key:"",numberId:"6"===e?y.mchId:"",app_id_number:"6"===e?y.app_id:"",alipay_public_key_number:"6"===e?y.alipay_public_key:"",app_private_key_number:"6"===e?y.app_private_key:""}),popupShow("changePay","changeBox")}),$(".ListOperation .del").click(function(){a.confirm("确定删除？",function(e){a.close(e);var i=JSON.stringify({merchantId:Number(o),id:y.id});loadingAjax("/pay/deletePayParam","post",i,sessionStorage.token,"","","",a).then(function(e){a.msg(e.message,{icon:1}),d.reload({where:{}})}).catch(function(e){a.msg(e.message,{icon:2})})})}),$(".changeBody .cancel_btn").click(function(){popupHide("changePay","changeBox")}),$(".changeBody .submit_btn").click(function(){var e=p.val("SetPay"),i=e.typeIndex+"";if("2"===i){if(!(e.payee&&e.officialId&&e.MerchantsId&&e.app_key&&e.MerchantsKey))return void a.msg("带*为必填",{icon:7})}else if("1"===i){if(!(e.payee&&e.aliPayId&&e.alipay_public_key&&e.app_private_key))return void a.msg("带*为必填",{icon:7})}else if("3"===i){if(!(e.payee&&e.mchId&&e.app_id&&e.ICBC_app_key&&e.ICBC_alipay_public_key&&e.ICBC_app_private_key))return void a.msg("带*为必填",{icon:7})}else if("4"===i||"5"===i){if(!(e.payee&&e.juhemchId&&e.juheapp_key))return void a.msg("带*为必填",{icon:7})}else if(!e.payee||!e.aliPayId)return void a.msg("带*为必填",{icon:7});if($(".mask").fadeIn(),$(".maskSpan").addClass("maskIcon"),"2"===i)var n=JSON.stringify({app_id:e.officialId,mchId:e.MerchantsId,app_key:e.app_key}),t="/pay/testWxPay";else if("1"===e.typeIndex)n=JSON.stringify({app_id:e.aliPayId,app_private_key:e.app_private_key,alipay_public_key:e.alipay_public_key}),t="/pay/testAliPay";else{if("3"===i){var c=JSON.stringify({alipay_public_key:e.ICBC_alipay_public_key,mchId:e.mchId,app_id:e.app_id,app_key:e.ICBC_app_key,app_private_key:e.ICBC_app_private_key});return void loadingAjax("/pay/testICBCPay","post",c,sessionStorage.token,"mask","","",a).then(function(i){var n=JSON.stringify({merchantId:o,id:y.id,payee:e.payee,payType:e.typeIndex,alipay_public_key:e.ICBC_alipay_public_key,mchId:e.mchId,app_id:e.app_id,app_key:e.ICBC_app_key,app_private_key:e.ICBC_app_private_key});loadingAjax("/pay/updatePayParam","post",n,sessionStorage.token,"mask","changePay","changeBox",a).then(function(e){a.msg(e.message,{icon:1}),d.reload({where:{}}),p.val("addPay",{typeIndex:"",payee:"",alipay_public_key:"",mchId:"",app_id:"",app_key:"",app_private_key:""})}).catch(function(e){a.msg(e.message,{icon:2})})}).catch(function(e){a.msg(e.message,{icon:2})})}if("4"===i||"5"===i)n=JSON.stringify({mchId:e.juhemchId,app_id:e.juheapp_id,app_key:e.juheapp_key,alipay_public_key:k,app_private_key:m}),t="/pay/testSand";else if("6"===i)n=JSON.stringify({alipay_public_key:e.alipay_public_key_number,mchId:e.numberId,app_id:e.app_id_number,app_key:e.app_key_number,app_private_key:e.app_private_key_number}),t="/pay/testSand"}loadingAjax(t,"post",n,sessionStorage.token,"mask","","",a).then(function(n){var t=JSON.stringify({merchantId:o,id:y.id,payee:e.payee,payType:i,app_id:"2"===i?e.officialId:"4"===i||"5"===i?e.juheapp_id:"6"===i?e.app_id_number:e.aliPayId,app_key:"2"===i?e.app_key:"4"===i||"5"===i?e.juheapp_key:"6"===i?e.app_key_number:"",mchId:"2"===i?e.MerchantsId:"4"===i||"5"===i?e.juhemchId:"6"===i?e.numberId:"",alipay_public_key:"1"===i?e.alipay_public_key:"4"===i||"5"===i?k:"6"===i?y.alipay_public_key_number:"",app_private_key:"1"===i?e.app_private_key:"4"===i||"5"===i?m:"6"===i?e.app_private_key_number:e.MerchantsKey,cert_dir:"2"===i?h:null});loadingAjax("/pay/updatePayParam","post",t,sessionStorage.token,"mask","changePay","changeBox",a).then(function(e){a.msg(e.message,{icon:1}),d.reload({where:{}}),$(".uploadFlag").html("未上传"),p.val("SetPay",{typeIndex:"",payee:"",officialId:"",juheapp_id:"",juheapp_key:"",juhemchId:"",MerchantsId:"",appId:"",numberId:"",app_id_number:"",app_key:"",app_key_number:"",aliPayId:"",alipay_public_key:"",app_private_key:"",alipay_public_key_number:"",app_private_key_number:"",MerchantsKey:""})}).catch(function(e){a.msg(e.message,{icon:2})})}).catch(function(e){a.msg(e.message,{icon:2})})});var o=sessionStorage.machineID,r=treeList();i.render({elem:"#test1",id:"treelist",showLine:!0,onlyIconControl:!0,data:r,spread:!0,text:{defaultNodeName:"无数据",none:"您没有权限，请联系管理员授权!"},click:function(e){console.log(e),d.reload({where:{merchantId:e.data.id}}),o=e.data.id;for(var a=$("#test1 .layui-tree-txt"),i=0;i<a.length;i++)a[i].innerHTML===e.data.title?a[i].style.color="#be954a":a[i].style.color="#555"}}),$(".sidebar i").click(function(){$(".left-mian").hide(),$(".onLeft").show()}),$(".onLeft").click(function(){$(".left-mian").show(),$(".onLeft").hide()});var l=JSON.stringify({status:1});loadingAjax("/pay/getAllPayType","post",l,sessionStorage.token).then(function(e){console.log(e);var a='<option value="">请选择</option>';e.data.forEach(function(e,i){1==e.status&&(a+='<option value="'.concat(e.id,'">').concat(e.name,"</option>"))}),console.log(a),$("#editTypeSelect").html(a),$("#addTypeSelect").html(a),p.render("select")}).catch(function(e){}),$(".addBtnClick").click(function(){popupShow("addePay","addBox")});var s=null;p.on("select(addSelect)",function(e){1===(s=+e.value)?($(".addePay .WeChat").hide(),$(".addePay .numberPay").hide(),$(".addePay .IcbcPay").hide(),$(".addePay .Alipay").show(),$(".addePay .juhePay").hide()):2===s?($(".addePay .numberPay").hide(),$(".addePay .WeChat").show(),$(".addePay .Alipay").hide(),$(".addePay .IcbcPay").hide(),$(".addePay .juhePay").hide()):3===s?($(".addePay .numberPay").hide(),$(".addePay .IcbcPay").show(),$(".addePay .WeChat").hide(),$(".addePay .Alipay").hide(),$(".addePay .juhePay").hide()):4===s||5===s?($(".addePay .juhePay").show(),$(".addePay .numberPay").hide(),$(".addePay .IcbcPay").hide(),$(".addePay .WeChat").hide(),$(".addePay .Alipay").hide()):6===s?($(".addePay .numberPay").show(),$(".addePay .juhePay").hide(),$(".addePay .IcbcPay").hide(),$(".addePay .WeChat").hide(),$(".addePay .Alipay").hide()):($(".addePay .numberPay").hide(),$(".addePay .juhePay").hide(),$(".addePay .IcbcPay").hide(),$(".addePay .WeChat").hide(),$(".addePay .Alipay").hide())}),$(".addePay .submit_btn").click(function(){var e=p.val("addPay"),i=String(e.typeIndex);if(console.log(e,"addData"),"2"===i){if(!(e.payee&&e.officialId&&e.MerchantsId&&e.app_key&&e.MerchantsKey))return void a.msg("带*为必填",{icon:7});if(!_)return void a.msg("请上传微信证书",{icon:7})}else if("1"===i){if(!(e.payee&&e.aliPayId&&e.alipay_public_key&&e.app_private_key))return void a.msg("带*为必填",{icon:7})}else if("3"===i){if(!(e.payee&&e.mchId&&e.app_id&&e.ICBC_app_key&&e.ICBC_alipay_public_key&&e.ICBC_app_private_key))return void a.msg("带*为必填",{icon:7})}else if("4"===i||"5"===i){if(console.log(e),!(e.payee&&e.juhemchId&&e.juheapp_key))return void a.msg("带*为必填",{icon:7});if(!u)return void a.msg("请上传杉德商户私钥证书",{icon:7});if(!f)return void a.msg("请上传杉德公钥证书",{icon:7})}else if(!e.payee||!e.typeIndex)return void a.msg("带*为必填",{icon:7});if($(".mask").fadeIn(),$(".maskSpan").addClass("maskIcon"),"2"!==i&&"1"!==i&&"3"!==i&&"4"!==i&&"5"!==i&&"6"!==i){var n=JSON.stringify({merchantId:o,payee:e.payee,payType:e.typeIndex});loadingAjax("/pay/newPayParam","post",n,sessionStorage.token,"mask","addePay","addBox",a).then(function(e){a.msg(e.message,{icon:1}),d.reload({where:{}}),p.val("addPay",{typeIndex:"",payee:"",officialId:"",juheapp_id:"",juheapp_key:"",juhemchId:"",MerchantsId:"",appId:"",numberId:"",app_id_number:"",app_key:"",app_key_number:"",aliPayId:"",alipay_public_key:"",app_private_key:"",alipay_public_key_number:"",app_private_key_number:"",MerchantsKey:""})}).catch(function(e){console.log(e),a.msg(e.message,{icon:2})})}if("2"===i)var t=JSON.stringify({app_id:e.officialId,mchId:e.MerchantsId,app_key:e.app_key}),y="/pay/testWxPay";else if("1"===i)t=JSON.stringify({app_id:e.aliPayId,app_private_key:e.app_private_key,alipay_public_key:e.alipay_public_key}),y="/pay/testAliPay";else{if("3"===i){var c=JSON.stringify({alipay_public_key:e.ICBC_alipay_public_key,mchId:e.mchId,app_id:e.app_id,app_key:e.ICBC_app_key,app_private_key:e.ICBC_app_private_key});return void loadingAjax("/pay/testICBCPay","post",c,sessionStorage.token,"mask","","",a).then(function(i){var n=JSON.stringify({merchantId:o,payee:e.payee,payType:e.typeIndex,alipay_public_key:e.ICBC_alipay_public_key,mchId:e.mchId,app_id:e.app_id,app_key:e.ICBC_app_key,app_private_key:e.ICBC_app_private_key,cert_dir:2==e.typeIndex?_:null});loadingAjax("/pay/newPayParam","post",n,sessionStorage.token,"mask","addePay","addBox",a).then(function(e){a.msg(e.message,{icon:1}),d.reload({where:{}}),p.val("addPay",{typeIndex:"",payee:"",ICBC_alipay_public_key:"",mchId:"",app_id:"",ICBC_app_key:"",ICBC_app_private_key:""}),$(".uploadFlag").html("未上传"),_=null}).catch(function(e){a.msg(e.message,{icon:2})})}).catch(function(e){a.msg(e.message,{icon:2})})}if("4"===i||"5"===i)t=JSON.stringify({mchId:e.juhemchId,app_id:e.juheapp_id,app_key:e.juheapp_key,app_private_key:u,alipay_public_key:f}),y="/pay/testSand";else if("6"===i)t=JSON.stringify({alipay_public_key:e.alipay_public_key_number,mchId:e.numberId,app_id:e.app_id_number,app_key:e.app_key_number,app_private_key:e.app_private_key_number}),y="/pay"}loadingAjax(y,"post",t,sessionStorage.token,"mask","","",a).then(function(n){var t=JSON.stringify({merchantId:o,payee:e.payee,payType:i,app_id:"2"===i?e.officialId:"4"===i||"5"===i?e.juheapp_id:"6"===i?e.app_id_number:e.aliPayId,app_key:"2"===i||"4"===i||"5"===i?e.juheapp_key:"",mchId:"2"===i?e.MerchantsId:"4"===i||"5"===i?e.juhemchId:"6"===i?e.numberId:"",alipay_public_key:"1"===i?e.alipay_public_key:"4"===i||"5"===i?f:"6"===i?e.alipay_public_key_number:"",app_private_key:"1"===i?e.app_private_key:"4"===i||"5"===i?u:"6"===i?e.app_private_key_number:e.MerchantsKey});console.log(JSON.parse(t),"editdPay"),loadingAjax("/pay/newPayParam","post",t,sessionStorage.token,"mask","addePay","addBox",a).then(function(e){a.msg(e.message,{icon:1}),d.reload({where:{}}),$(".one").html("未上传"),$(".two").html("未上传"),p.val("addPay",{typeIndex:"",payee:"",officialId:"",juheapp_id:"",juheapp_key:"",juhemchId:"",MerchantsId:"",appId:"",numberId:"",app_id_number:"",app_key:"",app_key_number:"",aliPayId:"",alipay_public_key:"",app_private_key:"",alipay_public_key_number:"",app_private_key_number:"",MerchantsKey:""})}).catch(function(e){a.msg(e.message,{icon:2})})}).catch(function(e){a.msg(e.message,{icon:2})})}),$(".addePay .cancel_btn").click(function(){$(".one").html("未上传"),$(".two").html("未上传"),popupHide("addePay","addBox")}),$(".refreshBtnList").click(function(){var e=treeList();JSON.stringify(e)!=JSON.stringify(r)?(r=e,i.reload("treelist",{data:r}),d.reload({where:{merchantId:Number(sessionStorage.machineID)}})):a.msg("已刷新",{icon:1})});var _=null,h=null,u=null,m=null,f=null,k=null;function g(e,i,p){$.ajax({type:"post",url:"".concat(vApi,"/uploading"),processData:!1,contentType:!1,timeout:6e4,headers:{token:token},data:e,success:function(e){$(".mask").fadeOut(),$(".maskSpan").removeClass("maskIcon"),$(p).val(""),0===e.code?(a.msg("上传成功",{icon:1}),1===i?(_=e.data.src,$(".uploadFlag").html("已上传")):2===i?h=e.data.src:3===i?(u=e.data.src,$(".one").html("已上传")):4===i?m=e.data.src:5===i?(f=e.data.src,$(".two").html("已上传")):6===i&&(k=e.data.src)):a.msg(e.message,{icon:7})},error:function(e){$(p).val(""),$(".mask").fadeOut(),$(".maskSpan").removeClass("maskIcon"),a.msg("上传失败",{icon:2})}})}$('.addBody .WeChat input[name="addUpload"]').change(function(e){if($(this).val()){var a=new FormData;a.append("file",e.target.files[0]),$(".mask").fadeIn(),$(".maskSpan").addClass("maskIcon"),g(a,1,this)}}),$('.changePay .WeChat input[name="addUpload"]').change(function(e){if($(this).val()){var a=new FormData;a.append("file",e.target.files[0]),$(".mask").fadeIn(),$(".maskSpan").addClass("maskIcon"),g(a,2,this)}}),$('.addBody .juhePay input[name="juheAddSi"]').change(function(e){if($(this).val()){var a=new FormData;a.append("file",e.target.files[0]),$(".mask").fadeIn(),$(".maskSpan").addClass("maskIcon"),g(a,3,this)}}),$('.changePay .juhePay input[name="juheAddSi"]').change(function(e){if($(this).val()){var a=new FormData;a.append("file",e.target.files[0]),$(".mask").fadeIn(),$(".maskSpan").addClass("maskIcon"),g(a,4,this)}}),$('.addBody .juhePay input[name="juheEditGong"]').change(function(e){if($(this).val()){var a=new FormData;a.append("file",e.target.files[0]),$(".mask").fadeIn(),$(".maskSpan").addClass("maskIcon"),g(a,5,this)}}),$('.changePay .juhePay input[name="juheEditGong"]').change(function(e){if($(this).val()){var a=new FormData;a.append("file",e.target.files[0]),$(".mask").fadeIn(),$(".maskSpan").addClass("maskIcon"),g(a,6,this)}}),$("body").click(function(){$(".ListOperation").fadeOut(),c=null})})},633:function(e,a){}});