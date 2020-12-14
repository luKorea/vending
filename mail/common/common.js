// import 'babel-polyfill';

// 请求方法
function ajaxFun(url, type, data) {
    return $.ajax({
        type,
        url,
        timeout: 10000,
        data,
        headers: {
            "Content-Type": "application/json",
        },
    })
};
// 请求方法
// 请求方法
function loadAjax(url, type, data, mask, element, top) {
    return new Promise(function (resolve, reject) {
        ajaxFun(url, type, data,resolve,reject).then(res => {
         if(res.code==200){
            resolve(res)
         }else{
            reject(res);
         }
        }).catch(err => {
            $('.mask').hide()
            prompt(err.message)
            return;
        })
    })
};

function ajaxFun1(url, type,token, data) {
    return $.ajax({
        type,
        url,
        timeout: 10000,
        data,
        headers: {
            "Content-Type": "application/json",
            token
        },
    })
};
// 请求方法
// 请求方法
function loadAjax1(url, type,token, data, mask, element, top) {
    return new Promise(function (resolve, reject) {
        ajaxFun1(url, type,token, data,resolve,reject).then(res => {
         if(res.code==200){
            resolve(res)
         }else{
            reject(res);
         }
        }).catch(err => {
            $('.mask').hide()
            prompt(err.message)
            return;
        })
    })
};


// 轻提示
function prompt(work) {
    $('.prompt').html(work);
    $('.prompt').fadeIn();
    var time = 0;
    var setTime = setInterval(_ => {
        time++;
        if (time == 3) {
            $('.prompt').fadeOut();
            clearInterval(setTime)
        }
    }, 1000)
};

// 金额处理
function numFormat1(num) {
    var oldNum = num;
    num = Number(Number(num).toFixed(2));
    if (!isNaN(num)) {
        var c = (num.toString().indexOf('.') !== -1) ? num.toLocaleString() : num.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
        var str = c.split(".");
        // console.log(str)
        if (str.length == 1) { c = c + '.00'; } else { if (str[1].length == 1) { c = c + '0'; } }
        return c;
    } else {
        return oldNum;
    }
};

// 获取地址栏地址
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
};
// 时间处理
function timeStamp(time){
    var myDate = new Date(time);
    var y =myDate.getFullYear();
    var m =(myDate.getMonth() + 1) < 10 ? '0' + (myDate.getMonth() + 1) : (myDate.getMonth() + 1);
    var d =myDate.getDate() < 10 ? '0' + myDate.getDate() : myDate.getDate();
    var h =myDate.getHours() < 10 ? '0' + myDate.getHours() : myDate.getHours();
    var min =myDate.getMinutes() < 10 ? '0' + myDate.getMinutes() : myDate.getMinutes();
    var s =myDate.getSeconds() < 10 ? '0' + myDate.getSeconds() : myDate.getSeconds();
    return y + '-' + m + '-' + d + ' ' + h + ':' + min + ':' + s
  };

function keyText(){
    var keyStr='yuebaowenhua2020';
    return keyStr
}

function decrypt1(cipher) {
    const CryptoJS = require('crypto-js');
    var content = cipher;
    var key = CryptoJS.enc.Utf8.parse("yuebaowenhua2020");
    var bytes = CryptoJS.AES.decrypt(content.toString(), key, {
        iv: CryptoJS.enc.Utf8.parse("A-16-Byte-String"),
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    var decryptResult = bytes.toString(CryptoJS.enc.Utf8);
    return decryptResult
}
export {
    loadAjax,
    prompt,
    // encrypts,
    // decrypts,
    numFormat1,
    getQueryString,
    timeStamp,
    keyText,
    decrypt1,
    loadAjax1
}