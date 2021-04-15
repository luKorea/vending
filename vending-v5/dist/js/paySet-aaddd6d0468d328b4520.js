/*! 版权所有，翻版必究 */!function(a){function e(e){for(var t,d,o=e[0],c=e[1],y=e[2],l=0,r=[];l<o.length;l++)d=o[l],Object.prototype.hasOwnProperty.call(n,d)&&n[d]&&r.push(n[d][0]),n[d]=0;for(t in c)Object.prototype.hasOwnProperty.call(c,t)&&(a[t]=c[t]);for(s&&s(e);r.length;)r.shift()();return p.push.apply(p,y||[]),i()}function i(){for(var a,e=0;e<p.length;e++){for(var i=p[e],t=!0,o=1;o<i.length;o++){var c=i[o];0!==n[c]&&(t=!1)}t&&(p.splice(e--,1),a=d(d.s=i[0]))}return a}var t={},n={30:0},p=[];function d(e){if(t[e])return t[e].exports;var i=t[e]={i:e,l:!1,exports:{}};return a[e].call(i.exports,i,i.exports,d),i.l=!0,i.exports}d.m=a,d.c=t,d.d=function(a,e,i){d.o(a,e)||Object.defineProperty(a,e,{enumerable:!0,get:i})},d.r=function(a){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(a,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(a,"__esModule",{value:!0})},d.t=function(a,e){if(1&e&&(a=d(a)),8&e)return a;if(4&e&&"object"==typeof a&&a&&a.__esModule)return a;var i=Object.create(null);if(d.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:a}),2&e&&"string"!=typeof a)for(var t in a)d.d(i,t,function(e){return a[e]}.bind(null,t));return i},d.n=function(a){var e=a&&a.__esModule?function(){return a.default}:function(){return a};return d.d(e,"a",e),e},d.o=function(a,e){return Object.prototype.hasOwnProperty.call(a,e)},d.p="";var o=window.webpackJsonp=window.webpackJsonp||[],c=o.push.bind(o);o.push=e,o=o.slice();for(var y=0;y<o.length;y++)e(o[y]);var s=c;p.push([267,0]),i()}({267:function(a,e,i){"use strict";i.r(e);i(660);layui.use(["table","form","layer","tree"],function(){var a=layui.table,e=layui.layer,i=layui.tree,t=layui.form,n=null,p=a.render({elem:"#payList",url:"".concat(vApi,"/pay/getPayParam"),method:"post",contentType:"application/json",headers:{token:sessionStorage.token},cols:[[{field:"1",title:"升降序",templet:"#imgtmp",event:"rank",align:"center"},{field:"rank",title:"排序",align:"center"},{field:"payName",title:"支付类型",align:"center"},{field:"appId",title:"微信公众号id/支付宝商户id/杉德商户号",align:"center",templet:function(a){return a.app_id?a.app_id:a.mchId}},{field:"merchantName",title:"所属商户",align:"center"},{field:"payee",title:"收款方",align:"center"},{field:"update_user",title:"最后修改人",align:"center"},{field:"update_time",title:"最后修改时间",align:"center",templet:function(a){return a.update_time?timeStamp(a.update_time):"-"}},{field:"operation",align:"center",title:"操作",toolbar:"#barDemo"}]],id:"tablePayId",loading:!0,request:{pageName:"pageNum",limitName:"pageSize"},where:{merchantId:Number(sessionStorage.machineID)},parseData:function(a){return 200==a.code?{code:a.code,msg:a.message,count:a.data.total,data:a.data}:{code:a.code,msg:a.message}},response:{statusCode:200},done:function(a){n=a.data,fixedFun(),403==a.code&&(window.parent.location.href="login.html")}});$(".refreshBtn").click(function(){location.reload()}),$("body").bind("keydown",function(a){116==a.keyCode&&f5Fun()}),$(".playHeader .close").click(function(){$(this).parent().parent().addClass("margin0"),$(this).parents(".maskContnet").fadeOut()});var d=null,o=null;a.on("tool(payList)",function(a){if(event.stopPropagation(),d=a.data,"operation"===a.event){if(o==a.data.id)return $(".ListOperation").fadeOut(),void(o=null);o=a.data.id,$(".ListOperation").fadeIn(),$(".ListOperation").css({left:$(this).offset().left-35+"px",top:$(this).offset().top+35+"px"})}else if("rank"==a.event){if(1==a.data.rank)return;console.log(a),console.log(n);var i=JSON.stringify({merchantId:Number(c),topId:a.data.id,bottomId:n[a.data.rank-2].id});loadingAjax("/pay/sortPayParam","post",i,sessionStorage.token,"","","",e).then(function(a){e.msg("修改成功",{icon:1}),p.reload({where:{}})}).catch(function(a){console.log(res),e.msg("修改失败",{icon:1})})}}),$(".ListOperation .edit").click(function(){console.log(d,"payData"),"微信"==d.payName?($(".changePay .WeChat").show(),$(".changePay .Alipay").hide(),$(".changePay .IcbcPay").hide(),$(".changePay .juhePay").hide(),r=d.cert_dir):"支付宝"==d.payName?($(".changePay .WeChat").hide(),$(".changePay .IcbcPay").hide(),$(".changePay .juhePay").hide(),$(".changePay .Alipay").show()):3==d.payType?($(".changePay .IcbcPay").show(),$(".changePay .WeChat").hide(),$(".changePay .Alipay").hide(),$(".changePay .juhePay").hide()):4==d.payType?(u=d.app_private_key,f=d.alipay_public_key,$(".changePay .juhePay").show(),$(".changePay .IcbcPay").hide(),$(".changePay .WeChat").hide(),$(".changePay .Alipay").hide()):($(".changePay .juhePay").hide(),$(".changePay .WeChat").hide(),$(".changePay .Alipay").hide(),$(".changePay .IcbcPay").hide());var a=String(d.payType);t.val("SetPay",{typeIndex:d.payType,payee:d.payee,officialId:"微信"===d.payName?d.app_id:"",MerchantsId:"微信"===d.payName?d.mchId:"",app_key:"微信"===d.payName?d.app_key:"",MerchantsKey:"微信"===d.payName?d.app_private_key:"",aliPayId:"支付宝"===d.payName?d.app_id:"",alipay_public_key:"支付宝"===d.payName||"4"===a?d.alipay_public_key:"",app_private_key:"支付宝"===d.payName||"4"===a?d.app_private_key:"",mchId:"3"===a?d.mchId:"",app_id:"3"===a?d.app_id:"",ICBC_app_key:"3"===a?d.app_key:"",ICBC_alipay_public_key:"3"===a?d.alipay_public_key:"",ICBC_app_private_key:"3"===a?d.app_private_key:"",juhemchId:"4"===a?d.mchId:"",juheapp_id:"4"===a?d.app_id:"",juheapp_key:"4"===a?d.app_key:""}),popupShow("changePay","changeBox")}),$(".ListOperation .del").click(function(){e.confirm("确定删除？",function(a){e.close(a);var i=JSON.stringify({merchantId:Number(c),id:d.id});loadingAjax("/pay/deletePayParam","post",i,sessionStorage.token,"","","",e).then(function(a){e.msg(a.message,{icon:1}),p.reload({where:{}})}).catch(function(a){e.msg(a.message,{icon:2})})})}),$(".changeBody .cancel_btn").click(function(){popupHide("changePay","changeBox")}),$(".changeBody .submit_btn").click(function(){var a=t.val("SetPay"),i=a.typeIndex;if("2"===i){if(!(a.payee&&a.officialId&&a.MerchantsId&&a.app_key&&a.MerchantsKey))return void e.msg("带*为必填",{icon:7})}else if("1"===i){if(!(a.payee&&a.aliPayId&&a.alipay_public_key&&a.app_private_key))return void e.msg("带*为必填",{icon:7})}else if("3"===i){if(!(a.payee&&a.mchId&&a.app_id&&a.ICBC_app_key&&a.ICBC_alipay_public_key&&a.ICBC_app_private_key))return void e.msg("带*为必填",{icon:7})}else if("4"===i){if(!(a.payee&&a.juhemchId&&a.juheapp_key))return void e.msg("带*为必填",{icon:7})}else if(!a.payee||!a.aliPayId)return void e.msg("带*为必填",{icon:7});if($(".mask").fadeIn(),$(".maskSpan").addClass("maskIcon"),"2"===i)var n=JSON.stringify({app_id:a.officialId,mchId:a.MerchantsId,app_key:a.app_key}),o="/pay/testWxPay";else if("1"===a.typeIndex)n=JSON.stringify({app_id:a.aliPayId,app_private_key:a.app_private_key,alipay_public_key:a.alipay_public_key}),o="/pay/testAliPay";else{if("3"===i){var y=JSON.stringify({alipay_public_key:a.ICBC_alipay_public_key,mchId:a.mchId,app_id:a.app_id,app_key:a.ICBC_app_key,app_private_key:a.ICBC_app_private_key});return void loadingAjax("/pay/testICBCPay","post",y,sessionStorage.token,"mask","","",e).then(function(i){var n=JSON.stringify({merchantId:c,id:d.id,payee:a.payee,payType:a.typeIndex,alipay_public_key:a.ICBC_alipay_public_key,mchId:a.mchId,app_id:a.app_id,app_key:a.ICBC_app_key,app_private_key:a.ICBC_app_private_key});loadingAjax("/pay/updatePayParam","post",n,sessionStorage.token,"mask","changePay","changeBox",e).then(function(a){e.msg(a.message,{icon:1}),p.reload({where:{}}),t.val("addPay",{typeIndex:"",payee:"",alipay_public_key:"",mchId:"",app_id:"",app_key:"",app_private_key:""})}).catch(function(a){e.msg(a.message,{icon:2})})}).catch(function(a){e.msg(a.message,{icon:2})})}if("4"===i)n=JSON.stringify({mchId:a.juhemchId,app_id:a.juheapp_id,app_key:a.juheapp_key,alipay_public_key:f,app_private_key:u}),o="/pay/testSand"}loadingAjax(o,"post",n,sessionStorage.token,"mask","","",e).then(function(n){var o=JSON.stringify({merchantId:c,id:d.id,payee:a.payee,payType:i,app_id:"2"===i?a.officialId:"4"===i?a.juheapp_id:a.aliPayId,app_key:"2"===i?a.app_key:"4"===i?a.juheapp_key:"",mchId:"2"===i?a.MerchantsId:"4"===i?a.juhemchId:"",alipay_public_key:"1"===i?a.alipay_public_key:"4"===i?f:"",app_private_key:"1"===i?a.app_private_key:"4"===i?u:a.MerchantsKey,cert_dir:"2"===i?r:null});loadingAjax("/pay/updatePayParam","post",o,sessionStorage.token,"mask","changePay","changeBox",e).then(function(a){e.msg(a.message,{icon:1}),p.reload({where:{}}),t.val("SetPay",{typeIndex:"",payee:"",officialId:"",juheapp_id:"",juheapp_key:"",juhemchId:"",MerchantsId:"",app_key:"",aliPayId:"",alipay_public_key:"",app_private_key:"",MerchantsKey:""})}).catch(function(a){e.msg(a.message,{icon:2})})}).catch(function(a){e.msg(a.message,{icon:2})})});var c=sessionStorage.machineID,y=treeList();i.render({elem:"#test1",id:"treelist",showLine:!0,onlyIconControl:!0,data:y,spread:!0,text:{defaultNodeName:"无数据",none:"您没有权限，请联系管理员授权!"},click:function(a){console.log(a),p.reload({where:{merchantId:a.data.id}}),c=a.data.id;for(var e=$("#test1 .layui-tree-txt"),i=0;i<e.length;i++)e[i].innerHTML===a.data.title?e[i].style.color="#be954a":e[i].style.color="#555"}}),$(".sidebar i").click(function(){$(".left-mian").hide(),$(".onLeft").show()}),$(".onLeft").click(function(){$(".left-mian").show(),$(".onLeft").hide()});var s=JSON.stringify({status:1});loadingAjax("/pay/getAllPayType","post",s,sessionStorage.token).then(function(a){console.log(a);var e='<option value="">请选择</option>';a.data.forEach(function(a,i){1==a.status&&(e+='<option value="'.concat(a.id,'">').concat(a.name,"</option>"))}),console.log(e),$("#editTypeSelect").html(e),$("#addTypeSelect").html(e),t.render("select")}).catch(function(a){}),$(".addBtnClick").click(function(){popupShow("addePay","addBox")});t.on("select(addSelect)",function(a){console.log(a.value),1==a.value?($(".addePay .WeChat").hide(),$(".addePay .IcbcPay").hide(),$(".addePay .Alipay").show(),$(".addePay .juhePay").hide()):2==a.value?($(".addePay .WeChat").show(),$(".addePay .Alipay").hide(),$(".addePay .IcbcPay").hide(),$(".addePay .juhePay").hide()):3==a.value?($(".addePay .IcbcPay").show(),$(".addePay .WeChat").hide(),$(".addePay .Alipay").hide(),$(".addePay .juhePay").hide()):4==a.value?($(".addePay .juhePay").show(),$(".addePay .IcbcPay").hide(),$(".addePay .WeChat").hide(),$(".addePay .Alipay").hide()):($(".addePay .juhePay").hide(),$(".addePay .IcbcPay").hide(),$(".addePay .WeChat").hide(),$(".addePay .Alipay").hide())}),$(".addePay .submit_btn").click(function(){var a=t.val("addPay"),i=String(a.typeIndex);if(console.log(a,"addData"),"2"===i){if(!(a.payee&&a.officialId&&a.MerchantsId&&a.app_key&&a.MerchantsKey))return void e.msg("带*为必填",{icon:7});if(!l)return void e.msg("请上传微信证书",{icon:7})}else if("1"===i){if(!(a.payee&&a.aliPayId&&a.alipay_public_key&&a.app_private_key))return void e.msg("带*为必填",{icon:7})}else if("3"===i){if(!(a.payee&&a.mchId&&a.app_id&&a.ICBC_app_key&&a.ICBC_alipay_public_key&&a.ICBC_app_private_key))return void e.msg("带*为必填",{icon:7})}else if("4"===i){if(console.log(a),!(a.payee&&a.juhemchId&&a.juheapp_key))return void e.msg("带*为必填",{icon:7});if(!h)return void e.msg("请上传杉德商户私钥证书",{icon:7});if(!_)return void e.msg("请上传杉德公钥证书",{icon:7})}else if(!a.payee||!a.typeIndex)return void e.msg("带*为必填",{icon:7});if($(".mask").fadeIn(),$(".maskSpan").addClass("maskIcon"),"2"!==i&&"1"!==i&&"3"!==i&&"4"!==i){var n=JSON.stringify({merchantId:c,payee:a.payee,payType:a.typeIndex});loadingAjax("/pay/newPayParam","post",n,sessionStorage.token,"mask","addePay","addBox",e).then(function(a){e.msg(a.message,{icon:1}),p.reload({where:{}}),t.val("addPay",{typeIndex:"",payee:"",officialId:"",juheapp_id:"",juheapp_key:"",juhemchId:"",MerchantsId:"",app_key:"",aliPayId:"",alipay_public_key:"",app_private_key:"",MerchantsKey:""})}).catch(function(a){console.log(a),e.msg(a.message,{icon:2})})}if("2"===i)var d=JSON.stringify({app_id:a.officialId,mchId:a.MerchantsId,app_key:a.app_key}),o="/pay/testWxPay";else if("1"===i)d=JSON.stringify({app_id:a.aliPayId,app_private_key:a.app_private_key,alipay_public_key:a.alipay_public_key}),o="/pay/testAliPay";else{if("3"===i){var y=JSON.stringify({alipay_public_key:a.ICBC_alipay_public_key,mchId:a.mchId,app_id:a.app_id,app_key:a.ICBC_app_key,app_private_key:a.ICBC_app_private_key});return void loadingAjax("/pay/testICBCPay","post",y,sessionStorage.token,"mask","","",e).then(function(i){var n=JSON.stringify({merchantId:c,payee:a.payee,payType:a.typeIndex,alipay_public_key:a.ICBC_alipay_public_key,mchId:a.mchId,app_id:a.app_id,app_key:a.ICBC_app_key,app_private_key:a.ICBC_app_private_key,cert_dir:2==a.typeIndex?l:null});loadingAjax("/pay/newPayParam","post",n,sessionStorage.token,"mask","addePay","addBox",e).then(function(a){e.msg(a.message,{icon:1}),p.reload({where:{}}),t.val("addPay",{typeIndex:"",payee:"",ICBC_alipay_public_key:"",mchId:"",app_id:"",ICBC_app_key:"",ICBC_app_private_key:""}),$(".uploadFlag").html("未上传"),l=null}).catch(function(a){e.msg(a.message,{icon:2})})}).catch(function(a){e.msg(a.message,{icon:2})})}if("4"===i)d=JSON.stringify({mchId:a.juhemchId,app_id:a.juheapp_id,app_key:a.juheapp_key,app_private_key:h,alipay_public_key:_}),o="/pay/testSand"}loadingAjax(o,"post",d,sessionStorage.token,"mask","","",e).then(function(n){var d=JSON.stringify({merchantId:c,payee:a.payee,payType:i,app_id:"2"===i?a.officialId:"4"===i?a.juheapp_id:a.aliPayId,app_key:"2"===i||"4"===i?a.juheapp_key:"",mchId:"2"===i?a.MerchantsId:"4"===i?a.juhemchId:"",alipay_public_key:"1"===i?a.alipay_public_key:"4"===i?_:"",app_private_key:"1"===i?a.app_private_key:"4"===i?h:a.MerchantsKey});console.log(JSON.parse(d),"editdPay"),loadingAjax("/pay/newPayParam","post",d,sessionStorage.token,"mask","addePay","addBox",e).then(function(a){e.msg(a.message,{icon:1}),p.reload({where:{}}),t.val("addPay",{typeIndex:"",payee:"",officialId:"",juheapp_id:"",juheapp_key:"",juhemchId:"",MerchantsId:"",app_key:"",aliPayId:"",alipay_public_key:"",app_private_key:"",MerchantsKey:""})}).catch(function(a){e.msg(a.message,{icon:2})})}).catch(function(a){e.msg(a.message,{icon:2})})}),$(".addePay .cancel_btn").click(function(){popupHide("addePay","addBox")}),$(".refreshBtnList").click(function(){var a=treeList();JSON.stringify(a)!=JSON.stringify(y)?(y=a,i.reload("treelist",{data:y}),p.reload({where:{merchantId:Number(sessionStorage.machineID)}})):e.msg("已刷新",{icon:1})});var l=null,r=null,h=null,u=null,_=null,f=null;function m(a,i,t){$.ajax({type:"post",url:"".concat(vApi,"/uploading"),processData:!1,contentType:!1,timeout:6e4,headers:{token:token},data:a,success:function(a){$(".mask").fadeOut(),$(".maskSpan").removeClass("maskIcon"),$(t).val(""),0===a.code?(e.msg("上传成功",{icon:1}),1===i?(l=a.data.src,$(".uploadFlag").html("已上传")):2===i?r=a.data.src:3===i?(h=a.data.src,$(".uploadFlag").html("已上传")):4===i?u=a.data.src:5===i?(_=a.data.src,$(".uploadFlag").html("已上传")):6===i&&(f=a.data.src)):e.msg(a.message,{icon:7})},error:function(a){$(t).val(""),$(".mask").fadeOut(),$(".maskSpan").removeClass("maskIcon"),e.msg("上传失败",{icon:2})}})}$('.addBody .WeChat input[name="addUpload"]').change(function(a){if($(this).val()){var e=new FormData;e.append("file",a.target.files[0]),$(".mask").fadeIn(),$(".maskSpan").addClass("maskIcon"),m(e,1,this)}}),$('.changePay .WeChat input[name="addUpload"]').change(function(a){if($(this).val()){var e=new FormData;e.append("file",a.target.files[0]),$(".mask").fadeIn(),$(".maskSpan").addClass("maskIcon"),m(e,2,this)}}),$('.addBody .juhePay input[name="juheAddSi"]').change(function(a){if($(this).val()){var e=new FormData;e.append("file",a.target.files[0]),$(".mask").fadeIn(),$(".maskSpan").addClass("maskIcon"),m(e,3,this)}}),$('.changePay .juhePay input[name="juheAddSi"]').change(function(a){if($(this).val()){var e=new FormData;e.append("file",a.target.files[0]),$(".mask").fadeIn(),$(".maskSpan").addClass("maskIcon"),m(e,4,this)}}),$('.addBody .juhePay input[name="juheEditGong"]').change(function(a){if($(this).val()){var e=new FormData;e.append("file",a.target.files[0]),$(".mask").fadeIn(),$(".maskSpan").addClass("maskIcon"),m(e,5,this)}}),$('.changePay .juhePay input[name="juheEditGong"]').change(function(a){if($(this).val()){var e=new FormData;e.append("file",a.target.files[0]),$(".mask").fadeIn(),$(".maskSpan").addClass("maskIcon"),m(e,6,this)}}),$("body").click(function(){$(".ListOperation").fadeOut(),o=null})})},660:function(a,e){}});