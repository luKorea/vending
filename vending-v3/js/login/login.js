// import '../../assets/public/documentWrite.js';
import '../../MyCss/login/login1.scss';

layui.use(['form', 'layer', 'carousel'], function () {

    // window.history.forward(1);
    // websocket.close();
    var form = layui.form,
        layer = layui.layer,
        carousel = layui.carousel,
        accountPass = null;

    function keppPass() {
        if (sessionStorage.accountPass) {
            accountPass = JSON.parse(sessionStorage.accountPass);
            form.val("loginData", { //formTest 即 class="layui-form" 所在元素属性 lay-filter="" 对应的值
                "account": accountPass.account // "name": "value"
                , "pass": accountPass.pass
                , "keep": 'on'
            });
        } else {
            return;
        }

    };
    carousel.render({
        elem: '#test10',
        width: '100%',
        height: '100%',
        interval: 3000,
        arrow: 'none'
    });
    keppPass();
    $('.login-btn').click(function () {
        loginFUn()
    });
    $('#pass').keydown(function (e) {
        if (e.keyCode == 13) {
            loginFUn()
        }
    })
    var passIndex = 1,
        passType = 1;
    $('.list input[name="pass"]').focus(function () {
        if (passIndex == 1) {
            $(this).val('');
            passIndex = 2;
        } else {
            return
        }
    })
    $('.list input[name="pass"]').keyup(function () {
        passType = 2;
    })
    function loginFUn() {
        var logData = form.val("loginData")
        if (logData.account) {
            if (logData.pass) {
                $.ajax({
                    type: 'post',
                    url: `/api/user/login`,
                    headers: {
                        "Content-Type": "application/json",
                    },
                    data: JSON.stringify({
                        username: logData.account,
                        password: passType == 1 ? accountPass.pass : hex_md5(logData.pass)
                        // password:logData.pass
                    }),
                    success: function (res) {
                        console.log(hex_md5(logData.pass))
                        if (res.code == 200) {
                            console.log(res)
                            sessionStorage.username = res.data.username;
                            sessionStorage.token = res.data.token;
                            sessionStorage.machineID = res.data.merchantId;
                            sessionStorage.UserId = res.data.UUId
                            if (logData.keep == 'on') {
                                sessionStorage.accountPass = JSON.stringify({
                                    account: logData.account,
                                    pass: passType == 1 ? accountPass.pass : hex_md5(logData.pass)
                                })
                            } else {
                                sessionStorage.accountPass = ''
                            }
                            // return ;
                            window.location.href = "index.html"
                            // location.replace('M_login.html')
                        } else {
                            layer.msg(res.message, { icon: 2 })
                        }
                    }, error: function (err) {
                        layer.msg("服务器请求超时", { icon: 2 })
                    }
                })
            } else {
                layer.msg("请输入密码", { icon: 7 })
            }
        } else {
            layer.msg("请输入账号", { icon: 7 })
        }
    }
    javascript: window.history.forward(1);


    // $('')
})
console.log(99900)

// var browser = navigator.userAgent.toLowerCase();

// if(browser.match(/Alipay/i)=="alipay"){
//    alert("支付宝app的浏览器");

// }else if(browser.match(/MicroMessenger/i)=="micromessenger"){
//     alert("微信app的浏览器");

// }else{
//     console.log("其它浏览器");
// }


// const CryptoJS = require('crypto-js');
// const key = CryptoJS.enc.Utf8.parse("yuebaowenhua2020");  //十六位十六进制数作为密钥
//     const iv = CryptoJS.enc.Utf8.parse('A-16-Byte-String');   //十六位十六进制数作为密钥偏移量

// //     //解密方法
//     function Decrypt(word) {
//         let encryptedHexStr = word;
//         // let srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
//         let decrypt = CryptoJS.AES.decrypt(encryptedHexStr.toString(), key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
//         let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
//         return decryptedStr;
//     }
//     console.log(Decrypt('XXbo2Rgm1ZeuTrgr/09MjQ=='))


    // function encrypt() {
    //     var content = '123456';
    //     var key = CryptoJS.enc.Utf8.parse("yuebaowenhua2020"); //abcdefghigkliopk密码，16位
    //     var encryptResult = CryptoJS.AES.encrypt(content, key, {
    //         iv: CryptoJS.enc.Utf8.parse("A-16-Byte-String"), //0102030405060708偏移量，16位
    //         mode: CryptoJS.mode.CBC, //aes加密模式cbc
    //         padding: CryptoJS.pad.Pkcs7//填充
    //     });
    //     var result = String(encryptResult);//把object转化为string
    //     console.log(result);
    // }
    // encrypt();


    // function decrypt() {
    //     var content = 'nIDY8OGK00dFoZXqtaIGLQ==';
    //     var key = CryptoJS.enc.Utf8.parse("yuebaowenhua2020");
    //     var bytes = CryptoJS.AES.decrypt(content.toString(), key, {
    //         iv: CryptoJS.enc.Utf8.parse("A-16-Byte-String"),
    //         mode: CryptoJS.mode.CBC,
    //         padding: CryptoJS.pad.Pkcs7
    //     });
    //     var decryptResult = bytes.toString(CryptoJS.enc.Utf8);
    //     console.log(decryptResult)
    // }