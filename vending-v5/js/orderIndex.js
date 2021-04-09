import '../MyCss/index.css';
import {loadAjax, prompt, numFormat1, getQueryString, timeStamp, decrypt1} from '../common/common-mail.js';

// 进入页面获取数据
// 加密
$('#city').val('');
const CryptoJS = require('crypto-js');

function encrypts(content) {
    var content = content;
    var key = CryptoJS.enc.Utf8.parse("yuebaowenhua2020"); //abcdefghigkliopk密码，16位
    var encryptResult = CryptoJS.AES.encrypt(content, key, {
        iv: CryptoJS.enc.Utf8.parse("A-16-Byte-String"), //0102030405060708偏移量，16位
        mode: CryptoJS.mode.CBC, //aes加密模式cbc
        padding: CryptoJS.pad.Pkcs7//填充
    });
    var result = String(encryptResult);//把object转化为string
    return result
};
// return ;
var str = getQueryString('goods');
var goodsData = null;
$.ajax({
    type: 'post',
    url: '/api/order/getMailData',
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
    data: JSON.stringify({
        key: str
    }),
    success: function (res) {
        $('.mask').hide()
        if (res.code == 200) {
            decrypt(res.data);
        } else {
            prompt('页面初始化失败');
        }
    },
    error: function (err) {
        $('.mask').hide()
        prompt('页面初始化失败');
    }
});

// 售货机配置支付方式
var payFlag = [],
    payTypeData = '',
    // 判断是微信或支付宝浏览器
    payTypeIndex = '',
    open = '';

// // // 解密
function decrypt(cipher) {
    var content = cipher;
    var key = CryptoJS.enc.Utf8.parse("yuebaowenhua2020");
    var bytes = CryptoJS.AES.decrypt(content.toString(), key, {
        iv: CryptoJS.enc.Utf8.parse("A-16-Byte-String"),
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    var decryptResult = bytes.toString(CryptoJS.enc.Utf8);
    goodsData = JSON.parse(decryptResult);
    goodsData.payee.forEach(item => {
        payFlag.push(item.payType);
    });

    // getCode();
    var browser = navigator.userAgent.toLowerCase();

    if (browser.match(/Alipay/i) == "alipay") {
        if (payFlag.indexOf(1) == -1) {
            $('.determineCont h1').html('当前不支持支付宝付款，请使用其他方式进行扫码购买！')
            $('.determineCont').show();
            return;
        }
        ;
        payTypeIndex = 1;
        payTypeData = goodsData.payee[payFlag.indexOf(1)]
    } else if (browser.match(/MicroMessenger/i) == "micromessenger") {
        if (payFlag.indexOf(2) == -1) {
            $('.determineCont h1').html('当前不支持微信付款，请使用其他方式进行扫码购买！')
            $('.determineCont').show();
            return;
        }
        ;
        payTypeIndex = 2;
        payTypeData = goodsData.payee[payFlag.indexOf(2)];
        getCode(payTypeData.app_id)
    } else {
        $('.determineCont h1').html('请使用支付宝或者微信扫码进行购买！')
        $('.determineCont').show();
        return;
    }
    $('.wrap').show();
    goodsListStr(goodsData.goods);
    var socketObj = JSON.stringify({
        machine: goodsData.machineId,
    });
    console.log(goodsData, '商品数据');
    console.log(goodsData.goods[0].mail, '类型');
    if (goodsData.goods[0].mail == 1) {
        $('.userInformation1').show();
        $('.userInformation2').hide();
        $('.footer2').hide();
        $('.footer1').show();
        document.title = '邮寄商品购买';
        $('.header h1').html('邮寄商品购买')
    } else if (goodsData.goods[0].mail == 0) {
        $('.userInformation1').hide();
        $('.userInformation2').show();
        $('.footer2').show();
        $('.footer1').hide();
        document.title = '商品购买'
        $('.header h1').html('商品购买')
    }
    loadAjax('/api/scanSuccess', 'post', socketObj).then(res => {
    }).catch(err => {
    });
};

function getCode(appid) {
    let code = getQueryString('code')//获取url中的code值
    let appId = appid;//填写公众号APPID
    let local = window.location.href;//当前地址
    if (code == null || code == '') {//没有授权的code
        window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=${encodeURIComponent(local)}&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect`  //跳转授权链接
        scope = snsapi_base //这句是静默授权的意思
    } else {//获取到授权的code
        var codeObj = JSON.stringify({
            code,
            machineId: goodsData.machineId,
        })
        loadAjax('/api/pay/wxLogin', 'post', codeObj).then(res => {
            open = res.data
        }).catch(err => {
            prompt('微信授权失败')
        })
    }
}


$("#city").click(function (e) {
    SelCity(this, e);
    // console.log("inout", $(this).val(), new Date())
});
// 提交
var nun = 0;

// 邮寄订单支付
$('.footer1 h1').click(function () {
    if (!($('#hcity').val() && $('#hproper').val() && $('#harea').val())) {
        prompt('请选择省市区！');
        return;
    }
    if (!($('.address').val() && $('.name').val() && $('.phone').val())) {
        prompt('请把信息完善！');
        return;
    }
    if (phoneTest($('.phone').val()) != 1) {
        return;
    }
    ;
    $('.mask').show();
    if (payTypeIndex == 1) {
        var pushOrder = JSON.stringify({
            merchantId: goodsData.merchant,
            sales_no: $('.informationList input[name="salse"]').val(),
            payee: payTypeData.payee,
            notes: $('.informationList input[name="notes"]').val(),
            sign_name: $('.informationList input[name="name"]').val(),
            sign_address: $('#city').val() + $('.informationList input[name="addressss"]').val(),
            sign_phone: $('.informationList input[name="phone"]').val(),
            goods: goodsData.goods,
            machineId: goodsData.machineId,
        });
        var alipayObj = JSON.stringify({
            data: encrypts(pushOrder)
        })
        aliPay(alipayObj);
    } else if (payTypeIndex == 2) {
        $('.mask').show();
        wxPay();
    }

});
// 普通订单支付
$('.footer2 h1').click(function () {
    if (payTypeIndex == 1) {
        $('.mask').show();
        var pushOrder = JSON.stringify({
            merchantId: goodsData.merchant,
            sales_no: $('.informationList input[name="salse2"]').val(),
            payee: payTypeData.payee,
            goods: goodsData.goods,
            machineId: goodsData.machineId
        });

        var alipayObj = JSON.stringify({
            data: encrypts(pushOrder)
        })
        aliPay(alipayObj);
    } else if (payTypeIndex == 2) {
        $('.mask').show();
        wxPay();
    }
});
// 取消
$('.cancelFlag p').eq(0).click(function () {
    // $('.determineCont').hide();
    window.location.href = 'placeOrder.html'
});

function phoneTest(value) {
    var flag = 1;
    if (value) {
        if (!(/^1[3456789]\d{9}$/.test(value))) {
            prompt('请填写正确的手机号码');
            flag = 0
            return false;
        }
    }
    return flag
};

// 渲染
function goodsListStr(list) {
    var goodsStr = '';
    list.forEach(item => {
        goodsStr += `<li class="list flex">
                        <div class="img">
                            <img src="${item.goods_img}" />
                        </div>
                        <div class="goodsInform">
                            <h5>${item.goods_Name}</h5>
                            <div class="flexC of">
                                <p>单价：￥${numFormat1(item.goods_Price)}</p>
                               
                                <p>X${item.count}</p>
                            </div>
                            <h5>总价：￥${Number(item.goods_Price) * Number(item.count)}</h5>
                        </div>
                    </li>`
    });
    $('.goodsList').html(goodsStr)
};

// 两分钟不提交页面作废
setTimeout(_ => {
    $('.determineCont h1').html('您已超过2分钟没有提交订单，请关闭页面重新扫码购买。')
    $('.determineCont').show()
}, 1200000);
// 轮询查询订单支付结果
var numberStr = '',
    setTime = null;


const [data, setData] = useState(0);

setData()


function keyNumber(NumberOne) {
    setTime = setInterval(_ => {
        var dataObj = JSON.stringify({
            data: encrypts(NumberOne)
        });
        loadAjax('/api/pay/getPayStatus', 'post', dataObj).then(res => {
            if (res.data.payStatus == 2) {
                clearInterval(setTime)
                if (res.data.url === '' || res.data.url === null) {
                    location.href = 'placeOrder.html';
                } else {
                    location.href = res.data.url;
                }
            }
        })
    }, 1500)
}
// 微信支付方法
function wxPay() {
    var pushOrder = JSON.stringify({
        merchantId: goodsData.merchant,
        sales_no: goodsData.goods[0].mail == 1 ?
            $('.informationList input[name="salse"]').val() :
            $('.informationList input[name="salse2"]').val(),
        payee: payTypeData.payee,
        notes: $('.informationList input[name="notes"]').val(),
        sign_name: $('.informationList input[name="name"]').val(),
        sign_address: $('#city').val() + $('.informationList input[name="addressss"]').val(),
        sign_phone: $('.informationList input[name="phone"]').val(),
        goods: goodsData.goods,
        machineId: goodsData.machineId,
        open_id: open
    });
    var alipayObj1 = JSON.stringify({
        data: encrypts(pushOrder)
    })
    loadAjax('/api/pay/wxpay_js', 'post', alipayObj1).then(res => {
        numberStr = res.message.slice(2, (res.message.indexOf('创')));
        setTimeout(_ => {
            keyNumber(numberStr);
        }, 5000)
        if (typeof WeixinJSBridge == "undefined") {
            if (document.addEventListener) {
                document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
            } else if (document.attachEvent) {
                document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
                document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
            }
        } else {
            $('.mask').hide();
            onBridgeReady(res.data)
        }
    }).catch(err => {
        $('.mask').hide();
        prompt('微信下单失败')
    })
}

// 微信支付
function onBridgeReady(wxData) {
    WeixinJSBridge.invoke(
        'getBrandWCPayRequest', {
            appId: wxData.appId,
            timeStamp: wxData.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
            nonceStr: wxData.nonceStr, // 支付签名随机串，不长于 32 位
            package: wxData.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
            signType: 'MD5', // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
            paySign: wxData.paySign, // 支付签名
        },
        function (res) {
            if (res.err_msg == "get_brand_wcpay_request:ok") {
                // 使用以上方式判断前端返回,微信团队郑重提示：
                //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
            } else {
                prompt('已取消支付');
                clearInterval(setTime);
            }
        });
}
// 支付宝支付
function aliPay(data) {
    $.ajax({
        type: 'post',
        url: '/api/pay/alipay_js',
        timeout: 10000,
        data: data,
        headers: {
            "Content-Type": "application/json",
        },
        success: function (res) {
            let data = decrypt1(res.data)
            if (data.message.indexOf('测试') !== -1) {
                const form = data.body;
                const div = document.createElement('div')
                div.id = 'alipay'
                div.innerHTML = form
                document.body.appendChild(div)
                document.querySelector('#alipay').children[0].submit() // 执行后会唤起支付宝
            } else {
                var a = data.indexOf('<qr_code>');
                var b = data.lastIndexOf('</qr_code>')
                var c = data.slice((a + 9), (b));
                location.href = c;
            }
        },
        error: function (res) {
            prompt(res);
            $('.mask').hide();
            prompt('下单失败')
        }
    })
}
