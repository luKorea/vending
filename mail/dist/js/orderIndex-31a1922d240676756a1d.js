/*! 版权所有，翻版必究 */!function(s){function e(e){for(var n,t,a=e[0],i=e[1],o=e[2],r=0,c=[];r<a.length;r++)t=a[r],Object.prototype.hasOwnProperty.call(p,t)&&p[t]&&c.push(p[t][0]),p[t]=0;for(n in i)Object.prototype.hasOwnProperty.call(i,n)&&(s[n]=i[n]);for(f&&f(e);c.length;)c.shift()();return u.push.apply(u,o||[]),d()}function d(){for(var e,n=0;n<u.length;n++){for(var t=u[n],a=!0,i=1;i<t.length;i++){var o=t[i];0!==p[o]&&(a=!1)}a&&(u.splice(n--,1),e=r(r.s=t[0]))}return e}var t={},p={1:0},u=[];function r(e){if(t[e])return t[e].exports;var n=t[e]={i:e,l:!1,exports:{}};return s[e].call(n.exports,n,n.exports,r),n.l=!0,n.exports}r.m=s,r.c=t,r.d=function(e,n,t){r.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:t})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(n,e){if(1&e&&(n=r(n)),8&e)return n;if(4&e&&"object"==typeof n&&n&&n.__esModule)return n;var t=Object.create(null);if(r.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:n}),2&e&&"string"!=typeof n)for(var a in n)r.d(t,a,function(e){return n[e]}.bind(null,a));return t},r.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(n,"a",n),n},r.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},r.p="";var n=window.webpackJsonp=window.webpackJsonp||[],a=n.push.bind(n);n.push=e,n=n.slice();for(var i=0;i<n.length;i++)e(n[i]);var f=a;u.push([118,0]),d()}({118:function(e,n,t){"use strict";t.r(n);var n=t(247),a=t(2);$("#city").val("");var i=t(37);function o(e){var e=e,n=i.enc.Utf8.parse("yuebaowenhua2020"),n=i.AES.encrypt(e,n,{iv:i.enc.Utf8.parse("A-16-Byte-String"),mode:i.mode.CBC,padding:i.pad.Pkcs7});return String(n)}var t=Object(a.b)("goods"),r=null;$.ajax({type:"post",url:"/api/order/getMailData",timeout:1e4,headers:{"Content-Type":"application/json"},data:JSON.stringify({key:t}),success:function(e){$(".mask").hide(),200==e.code?function(e){var n=e,e=i.enc.Utf8.parse("yuebaowenhua2020"),e=i.AES.decrypt(n.toString(),e,{iv:i.enc.Utf8.parse("A-16-Byte-String"),mode:i.mode.CBC,padding:i.pad.Pkcs7}).toString(i.enc.Utf8);r=JSON.parse(e),console.log(r),r.payee.forEach(function(e){c.push(e.payType)});e=navigator.userAgent.toLowerCase();if("alipay"==e.match(/Alipay/i)){if(-1==c.indexOf(1))return $(".determineCont h1").html("当前不支持支付宝付款，请使用其他方式进行扫码购买！"),$(".determineCont").show();d=1,s=r.payee[c.indexOf(1)]}else{if("micromessenger"!=e.match(/MicroMessenger/i))return $(".determineCont h1").html("请使用支付宝或者微信扫码进行购买！"),$(".determineCont").show();if(-1==c.indexOf(2))return $(".determineCont h1").html("当前不支持微信付款，请使用其他方式进行扫码购买！"),$(".determineCont").show();d=2,function(e){var n=Object(a.b)("code"),t=e,e=window.location.href;{null==n||""==n?(window.location.href="https://open.weixin.qq.com/connect/oauth2/authorize?appid=".concat(t,"&redirect_uri=").concat(encodeURIComponent(e),"&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect"),scope=snsapi_base):(n=JSON.stringify({code:n,machineId:r.machineId}),Object(a.c)("/api/pay/wxLogin","post",n).then(function(e){p=e.data}).catch(function(e){Object(a.e)("微信授权失败")}))}}((s=r.payee[c.indexOf(2)]).app_id)}$(".wrap").show(),function(e){var n="";e.forEach(function(e){n+='<li class="list flex">\n                        <div class="img">\n                            <img src="'.concat(e.goods_img,'" />\n                        </div>\n                        <div class="goodsInform">\n                            <h5>').concat(e.goods_Name,'</h5>\n                            <div class="flexC of">\n                                <p>单价：￥').concat(Object(a.d)(e.goods_Price),"</p>\n                               \n                                <p>X").concat(e.count,"</p>\n                            </div>\n                            <h5>总价：￥").concat(Number(e.goods_Price)*Number(e.count),"</h5>\n                        </div>\n                    </li>")}),$(".goodsList").html(n)}(r.goods);e=JSON.stringify({machine:r.machineId});1==r.goods[0].mail?($(".userInformation1").show(),$(".userInformation2").hide(),$(".footer2").hide(),$(".footer1").show(),document.title="邮寄商品购买",$(".header h1").html("邮寄商品购买")):($(".userInformation1").hide(),$(".userInformation2").show(),$(".footer2").show(),$(".footer1").hide(),document.title="商品购买",$(".header h1").html("商品购买"));Object(a.c)("/api/scanSuccess","post",e).then(function(e){}).catch(function(e){})}(e.data):Object(a.e)("页面初始化失败")},error:function(){$(".mask").hide(),Object(a.e)("页面初始化失败")}});var c=[],s="",d="",p="";function u(){var e=JSON.stringify({merchantId:r.merchant,sales_no:$('.informationList input[name="salse"]').val(),payee:s.payee,notes:$('.informationList input[name="notes"]').val(),sign_name:$('.informationList input[name="name"]').val(),sign_address:$("#city").val()+$('.informationList input[name="addressss"]').val(),sign_phone:$('.informationList input[name="phone"]').val(),goods:r.goods,machineId:r.machineId,open_id:p}),e=JSON.stringify({data:o(e)});Object(a.c)("/api/pay/wxpay_js","post",e).then(function(e){l=e.message.slice(2,e.message.indexOf("创")),setTimeout(function(e){var t;t=l,h=setInterval(function(e){var n=JSON.stringify({data:o(t)});Object(a.c)("/api/pay/getPayStatus","post",n).then(function(e){2==e.data.payStatus&&(clearInterval(h),location.href="placeOrder.html")})},1500)},5e3),"undefined"==typeof WeixinJSBridge?document.addEventListener?document.addEventListener("WeixinJSBridgeReady",f,!1):document.attachEvent&&(document.attachEvent("WeixinJSBridgeReady",f),document.attachEvent("onWeixinJSBridgeReady",f)):($(".mask").hide(),f(e.data))}).catch(function(e){$(".mask").hide(),Object(a.e)("微信下单失败")})}function f(e){WeixinJSBridge.invoke("getBrandWCPayRequest",{appId:e.appId,timeStamp:e.timeStamp,nonceStr:e.nonceStr,package:e.package,signType:"MD5",paySign:e.paySign},function(e){"get_brand_wcpay_request:ok"==e.err_msg||(Object(a.e)("已取消支付"),clearInterval(h))})}$("#city").click(function(e){SelCity(this,e)});$(".footer1 h1").click(function(){var e;$("#hcity").val()&&$("#hproper").val()&&$("#harea").val()?$(".address").val()&&$(".name").val()&&$(".phone").val()?1==function(e){var n=1;if(e&&!/^1[3456789]\d{9}$/.test(e))return Object(a.e)("请填写正确的手机号码"),n=0,!1;return n}($(".phone").val())&&($(".mask").show(),1==d?(e=JSON.stringify({merchantId:r.merchant,sales_no:$('.informationList input[name="salse"]').val(),payee:s.payee,notes:$('.informationList input[name="notes"]').val(),sign_name:$('.informationList input[name="name"]').val(),sign_address:$("#city").val()+$('.informationList input[name="addressss"]').val(),sign_phone:$('.informationList input[name="phone"]').val(),goods:r.goods,machineId:r.machineId}),e=JSON.stringify({data:o(e)}),Object(a.c)("/api/pay/alipay_js","post",e).then(function(e){var n=Object(a.a)(e.data),t=n.indexOf("<qr_code>"),e=n.lastIndexOf("</qr_code>"),e=n.slice(t+9,e);location.href=e,$(".mask").hide()}).catch(function(e){$(".mask").hide(),Object(a.e)("下单失败")})):2==d&&($(".mask").show(),u())):Object(a.e)("请把信息完善！"):Object(a.e)("请选择省市区！")}),$(".footer2 h1").click(function(){var e;1==d?($(".mask").show(),e=JSON.stringify({merchantId:r.merchant,sales_no:$('.informationList input[name="salse2"]').val(),payee:s.payee,goods:r.goods,machineId:r.machineId}),e=JSON.stringify({data:o(e)}),Object(a.c)("/api/pay/alipay_js","post",e).then(function(e){var n=Object(a.a)(e.data),t=n.indexOf("<qr_code>"),e=n.lastIndexOf("</qr_code>"),e=n.slice(t+9,e);location.href=e,$(".mask").hide()}).catch(function(e){$(".mask").hide(),Object(a.e)("下单失败")})):2==d&&($(".mask").show(),u())}),$(".cancelFlag p").eq(0).click(function(){window.location.href="placeOrder.html"}),setTimeout(function(e){$(".determineCont h1").html("您已超过2分钟没有提交订单，请关闭页面重新扫码购买。"),$(".determineCont").show()},12e5);var l="",h=null},247:function(e,n){}});