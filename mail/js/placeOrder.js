import '../MyCss/placeOrder.scss';
import { loadAjax, prompt,numFormat1 ,  getQueryString,timeStamp,keyText,decrypt1} from '../common/common.js'
function encrypts(content) {
    const CryptoJS = require('crypto-js');
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

javascript: window.history.forward(1);