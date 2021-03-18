const CryptoJS = require('crypto-js');
var password = "testpassword";

function a() {
    var encrypted = CryptoJS.AES.encrypt('11111', password);
    encrypted = encrypted.toString();
    console.log(encrypted);
    var decrypted = CryptoJS.AES.decrypt(encrypted, password);
    decrypted = decrypted.toString(CryptoJS.enc.Utf8)
    console.log(decrypted);
}

a();
