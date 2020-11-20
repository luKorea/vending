import '../MyCss/orderList.scss';
import { loadAjax, prompt, numFormat1, getQueryString, timeStamp } from '../common/common.js'

// 加密
const CryptoJS = require('crypto-js');
function encrypts(content) {
    // const CryptoJS = require('crypto-js');
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
// 解密
 function decrypts(cipher) {
    // const CryptoJS = require('crypto-js');
    var content = cipher;
    var key = CryptoJS.enc.Utf8.parse("yuebaowenhua2020");
    var bytes = CryptoJS.AES.decrypt(content.toString(), key, {
        iv: CryptoJS.enc.Utf8.parse("A-16-Byte-String"),
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    var decryptResult = bytes.toString(CryptoJS.enc.Utf8);
    return decryptResult
};
var randomNum = '';
for (var i = 0; i < 6; i++) {
    randomNum += Math.ceil(Math.random() * 10);
};

function GetCode() {
    var xhr = new XMLHttpRequest();//定义一个XMLHttpRequest对象
    xhr.open("POST", `/api/order/getVerificationCode`, true);
    xhr.setRequestHeader('Content-Type', 'application/json;charset=utf-8');
    xhr.responseType = 'blob';//设置ajax的响应类型为blob;

    xhr.onload = function (res) {
        if (xhr.status == 200) {
            var content = xhr.response;
            var blob = this.response;
            var img = new Image();
            img.width = 200;
            img.height = 200;
            img.onload = function () {
            }
            $('.codeImg').attr('src', window.URL.createObjectURL(blob))
        } else {
            prompt('服务器请求超时')
            return;
        }
    }
    var orderObj = JSON.stringify({
        random: randomNum
    })
    xhr.send(orderObj);
};
GetCode();



$('.formCont .btn').click(function () {
    if (!($('.list input[name="name"]').val() && $('.list input[name="phone"]').val()&&$('.list input[name="code"]').val())) {
        prompt('收货人、手机号与验证码不能为空');
        return ;
    };
    if (!(/^1[3456789]\d{9}$/.test($('.list input[name="phone"').val()))) {
        prompt('请填写正确的手机号码');
        return false;
    };
    var nameInformation = JSON.stringify({
        phone: $('.list input[name="phone"]').val(),
        name: $('.list input[name="name"]').val(),
        code: $('.list input[name="code"]').val(),
        random: randomNum
    })
    var data = JSON.stringify({
        data: encrypts(nameInformation)
    });
    loadAjax('/api/order/getMailByUser', 'post', data).then(res => {
        var ress= decrypts(res.data);
        if(JSON.parse(ress).length==0){
            prompt('查询无数据');
            return ;
        };
        $('.searchCont').hide();
        orderListFun(JSON.parse(ress))
        $('.orderListCont').show()
    }).catch(err => {
        
        prompt(err.message);
    });
});

$('.codeImg').click(function () {
    randomNum = ''
    for (var i = 0; i < 6; i++) {
        randomNum += Math.ceil(Math.random() * 10);
    };
    GetCode();
});
// ;

// 订单列表渲染
var orderListVal = null;
function orderListFun(listStr) {
    orderListVal = listStr
    var str = '';
    listStr.forEach((item, index) => {
        var orderNum=0;
        item.goodsList.forEach(ele=>{
            orderNum+=Number(ele.count)*Number(ele.goods_Price)
        });
        str+=`<div class="orderNameList" indexs="${index}">
                    <div class="listHeader flexC">
                        <h3>${item.sign_name}/${item.sign_phone}</h3>
                        <p>${item.dispatch_status==0?'未发货':'已发货'}</p>
                    </div>
                    <div class="orderListS">
                        <div class="${item.express_type?'show':'hide'}">
                            <div class="orderList flex">
                                <h5>物流/快递公司:<span>${item.express_type}</span></h5>
                            </div>
                            <div class="orderList flex">
                                <h5>物流/快递单号:<span>${item.express_number}</span></h5>
                            </div>
                            <div class="orderList flex">
                                <h5>发货时间:<span>${item.express_time?timeStamp(item.express_time):''}</span></h5>
                            </div>
                        </div>
                       
                        <div class="orderList flex">
                            <h5>收货地址：<span>${item.sign_address}</span></h5>
                        </div>
                        <div class="orderList flex">
                            <h5>备注：<span>${item.notes}</span></h5>
                        </div>
                        <div class="orderList flex">
                            <h5>订单金额：<span>￥${orderNum}</span></h5>
                        </div>
                    </div>
                </div>`
    });
    
    $('.ordertListBox').html(str);
};

function goodsListFun(goodsList) {
    var str = '';
    goodsList.goodsList.forEach(item => {
        str += `<li class="list flex">
                <div class="img">
                    <img src="${item.goods_images}" />
                </div>
                <div class="goodsInform">
                    <h5>${item.goods_Name}</h5>
                    <div class="flexC of">
                        <p>￥${item.goods_Price}</p>
                        <p>X ${item.count}</p>
                    </div>
                    <h5>总价：￥${Number(item.goods_Price) * Number(item.count)}</h5>
                </div>
            </li>`
    });
    $('.goodsListCont').html(str);
}
$('.orderListCont').on('click', '.orderNameList', function () {
    goodsListFun(orderListVal[$(this).attr('indexs')]);
    $('.goodsCont').show();
});
$('.goodsBox').click(function () {
    event.stopPropagation();
});
$('.goodsCont').click(function () {
    $(this).hide();
});
$('.goodsHeader img').click(function(){
    $('.goodsCont').hide();
});
$('.back').click(function () {
    $('.orderListCont').hide();
    $('.searchCont').show();
    randomNum = ''
    for (var i = 0; i < 6; i++) {
        randomNum += Math.ceil(Math.random() * 10);
    };
    GetCode();
});


