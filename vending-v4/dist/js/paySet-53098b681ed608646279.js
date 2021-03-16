/*! 版权所有，翻版必究 */!function(y){function e(e){for(var a,t,i=e[0],n=e[1],p=e[2],o=0,d=[];o<i.length;o++)t=i[o],Object.prototype.hasOwnProperty.call(r,t)&&r[t]&&d.push(r[t][0]),r[t]=0;for(a in n)Object.prototype.hasOwnProperty.call(n,a)&&(y[a]=n[a]);for(l&&l(e);d.length;)d.shift()();return s.push.apply(s,p||[]),c()}function c(){for(var e,a=0;a<s.length;a++){for(var t=s[a],i=!0,n=1;n<t.length;n++){var p=t[n];0!==r[p]&&(i=!1)}i&&(s.splice(a--,1),e=o(o.s=t[0]))}return e}var t={},r={26:0},s=[];function o(e){if(t[e])return t[e].exports;var a=t[e]={i:e,l:!1,exports:{}};return y[e].call(a.exports,a,a.exports,o),a.l=!0,a.exports}o.m=y,o.c=t,o.d=function(e,a,t){o.o(e,a)||Object.defineProperty(e,a,{enumerable:!0,get:t})},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(a,e){if(1&e&&(a=o(a)),8&e)return a;if(4&e&&"object"==typeof a&&a&&a.__esModule)return a;var t=Object.create(null);if(o.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:a}),2&e&&"string"!=typeof a)for(var i in a)o.d(t,i,function(e){return a[e]}.bind(null,i));return t},o.n=function(e){var a=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(a,"a",a),a},o.o=function(e,a){return Object.prototype.hasOwnProperty.call(e,a)},o.p="";var a=window.webpackJsonp=window.webpackJsonp||[],i=a.push.bind(a);a.push=e,a=a.slice();for(var n=0;n<a.length;n++)e(a[n]);var l=i;s.push([151,0]),c()}({151:function(e,a,t){"use strict";t.r(a);a=t(413);layui.use(["table","form","layer","tree"],function(){tooltip(".refreshBtnList",{transition:!0,time:200});var e=layui.table,n=layui.layer,n=layui.layer,a=(layui.util,layui.tree),p=layui.form,t=null,o=e.render({elem:"#payList",url:"".concat(vApi,"/pay/getPayParam"),method:"post",contentType:"application/json",headers:{token:sessionStorage.token},cols:[[{field:"1",width:80,title:"",templet:"#imgtmp",event:"rank",align:"center"},{field:"rank",width:80,title:"排序",align:"center"},{field:"payName",width:180,title:"支付类型",align:"center"},{field:"app_id",width:300,title:"微信公众号id/支付宝商户id",align:"center"},{field:"merchantName",width:250,title:"所属商户",align:"center"},{field:"payee",width:280,title:"收款方",align:"center"},{field:"update_user",width:200,title:"最后修改人",align:"center"},{field:"update_time",width:250,title:"最后修改时间",align:"center",templet:function(e){return e.update_time?timeStamp(e.update_time):"-"}},{field:"operation",right:0,width:150,align:"center",title:"操作",toolbar:"#barDemo",fixed:"right"}]],id:"tablePayId",loading:!0,request:{pageName:"pageNum",limitName:"pageSize"},where:{merchantId:Number(sessionStorage.machineID)},parseData:function(e){return 200==e.code?{code:e.code,msg:e.message,count:e.data.total,data:e.data}:{code:e.code,msg:e.message}},response:{statusCode:200},done:function(e){t=e.data,fixedFun(),403==e.code&&(window.parent.location.href="login.html")}});$(".refreshBtn").click(function(){location.reload()}),$("body").bind("keydown",function(e){116==e.keyCode&&f5Fun()}),$(".playHeader .close").click(function(){$(this).parent().parent().addClass("margin0"),$(this).parents(".maskContnet").fadeOut()});var d=null,i=null;e.on("tool(payList)",function(e){if(event.stopPropagation(),d=e.data,"operation"===e.event){if(i==e.data.id)return $(".ListOperation").fadeOut(),void(i=null);i=e.data.id,$(".ListOperation").fadeIn(),$(".ListOperation").css({left:$(this).offset().left-35+"px",top:$(this).offset().top+35+"px"})}else{"rank"==e.event&&1!=e.data.rank&&(console.log(e),console.log(t),e=JSON.stringify({merchantId:Number(y),topId:e.data.id,bottomId:t[e.data.rank-2].id}),loadingAjax("/pay/sortPayParam","post",e,sessionStorage.token,"","","",n).then(function(e){n.msg("修改成功",{icon:1}),o.reload({where:{}})}).catch(function(e){console.log(res),n.msg("修改失败",{icon:1})}))}}),$(".ListOperation .edit").click(function(){"微信"==d.payName?($(".changePay .WeChat").show(),$(".changePay .Alipay").hide(),$(".changePay .IcbcPay").hide(),s=d.cert_dir):"支付宝"==d.payName?($(".changePay .WeChat").hide(),$(".changePay .IcbcPay").hide(),$(".changePay .Alipay").show()):3==d.payType?($(".changePay .IcbcPay").show(),$(".changePay .WeChat").hide(),$(".changePay .Alipay").hide()):($(".changePay .WeChat").hide(),$(".changePay .Alipay").hide(),$(".changePay .IcbcPay").hide()),p.val("SetPay",{typeIndex:d.payType,payee:d.payee,officialId:"微信"==d.payName?d.app_id:"",MerchantsId:"微信"==d.payName?d.mchId:"",app_key:"微信"==d.payName?d.app_key:"",MerchantsKey:"微信"==d.payName?d.app_private_key:"",aliPayId:"支付宝"==d.payName?d.app_id:"",alipay_public_key:"支付宝"==d.payName?d.alipay_public_key:"",app_private_key:"支付宝"==d.payName?d.app_private_key:"",mchId:3==d.payType?d.mchId:"",app_id:3==d.payType?d.app_id:"",ICBC_app_key:3==d.payType?d.app_key:"",ICBC_alipay_public_key:3==d.payType?d.alipay_public_key:"",ICBC_app_private_key:3==d.payType?d.app_private_key:""}),popupShow("changePay","changeBox")}),$(".ListOperation .del").click(function(){n.confirm("确定删除？",function(e){n.close(e);e=JSON.stringify({merchantId:Number(y),id:d.id});loadingAjax("/pay/deletePayParam","post",e,sessionStorage.token,"","","",n).then(function(e){n.msg(e.message,{icon:1}),o.reload({where:{}})}).catch(function(e){n.msg(e.message,{icon:2})})})}),$(".changeBody .cancel_btn").click(function(){popupHide("changePay","changeBox")}),$(".changeBody .submit_btn").click(function(){var t=p.val("SetPay");if("2"==t.typeIndex){if(!(t.payee&&t.officialId&&t.MerchantsId&&t.app_key&&t.MerchantsKey))return void n.msg("带*为必填",{icon:7})}else if("1"==t.typeIndex){if(!(t.payee&&t.aliPayId&&t.alipay_public_key&&t.app_private_key))return void n.msg("带*为必填",{icon:7})}else if("3"==t.typeIndex){if(!(t.payee&&t.mchId&&t.app_id&&t.ICBC_app_key&&t.ICBC_alipay_public_key&&t.ICBC_app_private_key))return void n.msg("带*为必填",{icon:7})}else if(!t.payee||!t.aliPayId)return void n.msg("带*为必填",{icon:7});if($(".mask").fadeIn(),$(".maskSpan").addClass("maskIcon"),2==t.typeIndex)var e=JSON.stringify({app_id:t.officialId,mchId:t.MerchantsId,app_key:t.app_key}),a="/pay/testWxPay";else if(1==t.typeIndex)e=JSON.stringify({app_id:t.aliPayId,app_private_key:t.app_private_key,alipay_public_key:t.alipay_public_key}),a="/pay/testAliPay";else if(3==t.typeIndex){var i=JSON.stringify({alipay_public_key:t.ICBC_alipay_public_key,mchId:t.mchId,app_id:t.app_id,app_key:t.ICBC_app_key,app_private_key:t.ICBC_app_private_key});return void loadingAjax("/pay/testICBCPay","post",i,sessionStorage.token,"mask","","",n).then(function(e){var a=JSON.stringify({merchantId:y,id:d.id,payee:t.payee,payType:t.typeIndex,alipay_public_key:t.ICBC_alipay_public_key,mchId:t.mchId,app_id:t.app_id,app_key:t.ICBC_app_key,app_private_key:t.ICBC_app_private_key});loadingAjax("/pay/updatePayParam","post",a,sessionStorage.token,"mask","changePay","changeBox",n).then(function(e){n.msg(e.message,{icon:1}),o.reload({where:{}}),p.val("addPay",{typeIndex:"",payee:"",alipay_public_key:"",mchId:"",app_id:"",app_key:"",app_private_key:""})}).catch(function(e){n.msg(e.message,{icon:2})})}).catch(function(e){n.msg(e.message,{icon:2})})}loadingAjax(a,"post",e,sessionStorage.token,"mask","","",n).then(function(e){var a=JSON.stringify({merchantId:y,id:d.id,payee:t.payee,payType:t.typeIndex,app_id:"2"==t.typeIndex?t.officialId:t.aliPayId,app_key:"2"==t.typeIndex?t.app_key:"",mchId:"2"==t.typeIndex?t.MerchantsId:"",alipay_public_key:"1"==t.typeIndex?t.alipay_public_key:"",app_private_key:"1"==t.typeIndex?t.app_private_key:t.MerchantsKey,cert_dir:2==t.typeIndex?s:null});loadingAjax("/pay/updatePayParam","post",a,sessionStorage.token,"mask","changePay","changeBox",n).then(function(e){n.msg(e.message,{icon:1}),o.reload({where:{}}),p.val("SetPay",{typeIndex:"",payee:"",officialId:"",MerchantsId:"",app_key:"",aliPayId:"",alipay_public_key:"",app_private_key:""})}).catch(function(e){n.msg(e.message,{icon:2})})}).catch(function(e){n.msg(e.message,{icon:2})})});var y=sessionStorage.machineID,c=treeList();a.render({elem:"#test1",id:"treelist",showLine:!0,onlyIconControl:!0,data:c,spread:!0,text:{defaultNodeName:"无数据",none:"您没有权限，请联系管理员授权!"},click:function(e){console.log(e),o.reload({where:{merchantId:e.data.id}}),y=e.data.id;for(var a=$("#test1 .layui-tree-txt"),t=0;t<a.length;t++)a[t].innerHTML===e.data.title?a[t].style.color="#be954a":a[t].style.color="#555"}}),$(".sidebar i").click(function(){$(".left-mian").hide(),$(".onLeft").show()}),$(".onLeft").click(function(){$(".left-mian").show(),$(".onLeft").hide()});e=JSON.stringify({status:1});loadingAjax("/pay/getAllPayType","post",e,sessionStorage.token).then(function(e){console.log(e);var t='<option value="">请选择</option>';e.data.forEach(function(e,a){1==e.status&&(t+='<option value="'.concat(e.id,'">').concat(e.name,"</option>"))}),$("#editTypeSelect").html(t),$("#addTypeSelect").html(t),p.render("select")}).catch(function(e){}),$(".addBtnClick").click(function(){popupShow("addePay","addBox")});p.on("select(addSelect)",function(e){console.log(e.value),1==e.value?($(".addePay .WeChat").hide(),$(".addePay .IcbcPay").hide(),$(".addePay .Alipay").show()):2==e.value?($(".addePay .WeChat").show(),$(".addePay .Alipay").hide(),$(".addePay .IcbcPay").hide()):(3==e.value?$(".addePay .IcbcPay").show():$(".addePay .IcbcPay").hide(),$(".addePay .WeChat").hide(),$(".addePay .Alipay").hide())}),$(".addePay .submit_btn").click(function(){var t=p.val("addPay");if("2"==t.typeIndex){if(!(t.payee&&t.officialId&&t.MerchantsId&&t.app_key&&t.MerchantsKey))return void n.msg("带*为必填",{icon:7});if(!r)return void n.msg("请上传微信证书",{icon:7})}else if("1"==t.typeIndex){if(!(t.payee&&t.aliPayId&&t.alipay_public_key&&t.app_private_key))return void n.msg("带*为必填",{icon:7})}else if("3"==t.typeIndex){if(!(t.payee&&t.mchId&&t.app_id&&t.ICBC_app_key&&t.ICBC_alipay_public_key&&t.ICBC_app_private_key))return void n.msg("带*为必填",{icon:7})}else if(!t.payee||!t.typeIndex)return void n.msg("带*为必填",{icon:7});if($(".mask").fadeIn(),$(".maskSpan").addClass("maskIcon"),2!=t.typeIndex&&1!=t.typeIndex&&3!=t.typeIndex&&(i=JSON.stringify({merchantId:y,payee:t.payee,payType:t.typeIndex}),loadingAjax("/pay/newPayParam","post",i,sessionStorage.token,"mask","addePay","addBox",n).then(function(e){n.msg(e.message,{icon:1}),o.reload({where:{}}),p.val("addPay",{typeIndex:"",payee:"",officialId:"",MerchantsId:"",app_key:"",aliPayId:"",alipay_public_key:"",app_private_key:"",MerchantsKey:""})}).catch(function(e){console.log(e),n.msg(e.message,{icon:2})})),2==t.typeIndex)var e=JSON.stringify({app_id:t.officialId,mchId:t.MerchantsId,app_key:t.app_key}),a="/pay/testWxPay";else if(1==t.typeIndex)e=JSON.stringify({app_id:t.aliPayId,app_private_key:t.app_private_key,alipay_public_key:t.alipay_public_key}),a="/pay/testAliPay";else if(3==t.typeIndex){var i=JSON.stringify({alipay_public_key:t.ICBC_alipay_public_key,mchId:t.mchId,app_id:t.app_id,app_key:t.ICBC_app_key,app_private_key:t.ICBC_app_private_key});return void loadingAjax("/pay/testICBCPay","post",i,sessionStorage.token,"mask","","",n).then(function(e){var a=JSON.stringify({merchantId:y,payee:t.payee,payType:t.typeIndex,alipay_public_key:t.ICBC_alipay_public_key,mchId:t.mchId,app_id:t.app_id,app_key:t.ICBC_app_key,app_private_key:t.ICBC_app_private_key,cert_dir:2==t.typeIndex?r:null});loadingAjax("/pay/newPayParam","post",a,sessionStorage.token,"mask","addePay","addBox",n).then(function(e){n.msg(e.message,{icon:1}),o.reload({where:{}}),p.val("addPay",{typeIndex:"",payee:"",ICBC_alipay_public_key:"",mchId:"",app_id:"",ICBC_app_key:"",ICBC_app_private_key:""}),$(".uploadFlag").html("未上传"),r=null}).catch(function(e){n.msg(e.message,{icon:2})})}).catch(function(e){n.msg(e.message,{icon:2})})}loadingAjax(a,"post",e,sessionStorage.token,"mask","","",n).then(function(e){var a=JSON.stringify({merchantId:y,payee:t.payee,payType:t.typeIndex,app_id:"2"==t.typeIndex?t.officialId:t.aliPayId,app_key:"2"==t.typeIndex?t.app_key:"",mchId:"2"==t.typeIndex?t.MerchantsId:"",alipay_public_key:"1"==t.typeIndex?t.alipay_public_key:"",app_private_key:"1"==t.typeIndex?t.app_private_key:t.MerchantsKey});loadingAjax("/pay/newPayParam","post",a,sessionStorage.token,"mask","addePay","addBox",n).then(function(e){n.msg(e.message,{icon:1}),o.reload({where:{}}),p.val("addPay",{typeIndex:"",payee:"",officialId:"",MerchantsId:"",app_key:"",aliPayId:"",alipay_public_key:"",app_private_key:"",MerchantsKey:""})}).catch(function(e){n.msg(e.message,{icon:2})})}).catch(function(e){n.msg(e.message,{icon:2})})}),$(".addePay .cancel_btn").click(function(){popupHide("addePay","addBox")}),$(".refreshBtnList").click(function(){var e=treeList();JSON.stringify(e)!=JSON.stringify(c)?(c=e,a.reload("treelist",{data:c}),o.reload({where:{merchantId:Number(sessionStorage.machineID)}})):n.msg("已刷新",{icon:1})});var r=null,s=null;function l(e,a,t){$.ajax({type:"post",url:"".concat(vApi,"/uploading"),processData:!1,contentType:!1,timeout:6e4,headers:{token:token},data:e,success:function(e){$(".mask").fadeOut(),$(".maskSpan").removeClass("maskIcon"),$(t).val(""),0==e.code?(n.msg("上传成功",{icon:1}),1==a?(r=e.data.src,$(".uploadFlag").html("已上传")):2==a&&(s=e.data.src)):n.msg(e.message,{icon:7})},error:function(){$(t).val(""),$(".mask").fadeOut(),$(".maskSpan").removeClass("maskIcon"),n.msg("上传失败",{icon:2})}})}$('.addBody .WeChat input[name="addUpload"]').change(function(e){var a;$(this).val()&&((a=new FormData).append("file",e.target.files[0]),$(".mask").fadeIn(),$(".maskSpan").addClass("maskIcon"),l(a,1,this))}),$('.changePay .WeChat input[name="addUpload"]').change(function(e){var a;$(this).val()&&((a=new FormData).append("file",e.target.files[0]),$(".mask").fadeIn(),$(".maskSpan").addClass("maskIcon"),l(a,2,this))}),$("body").click(function(){$(".ListOperation").fadeOut(),i=null})})},413:function(e,a){}});