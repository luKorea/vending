import '../../../MyCss/mobile/login/login.scss'
import { loadAjax, loadingWith, loadingOut, toastTitle } from '../../../common/common.js'
function swiperFun() {
    var swipe = new huiSwpie('#swipe');
    swipe.autoPlay = true;
    swipe.delay = 3000;
    swipe.run();
}
if (sessionStorage.accountPass) {
    var accountPass = JSON.parse(sessionStorage.accountPass);
    $('.keep input[name="aihao[]"]').prop('checked', true);
    $('.flex input[name="account"]').val(accountPass.account);
    $('.flex input[name="pass"]').val(accountPass.pass)
} else {
    $('.keep input[name="aihao[]"]').prop('checked', false)
}
swiperFun();
$('.loginBtn').click(function () {
    loginFUn();
});
var passIndex = 1,
    passType = 1;
$('.flex input[name="pass"]').focus(function () {
    if (passIndex == 1) {
        $(this).val('');
        passIndex = 2;
    } else {
        return
    }
})
$('.flex input[name="pass"]').keyup(function () {
    passType = 2;
});
function loginFUn(){
    if (!($('.flex input[name="account"]').val() && $('.flex input[name="pass"]').val())) {
        toastTitle('账号密码不能为空', 'warn');
        return;
    }
    loadingWith('正在登录，请稍后！')
    var loginData = JSON.stringify({
        username: $('.flex input[name="account"]').val(),
        password: passType == 1 ? accountPass.pass : hex_md5($('.flex input[name="pass"]').val())
    })
    loadAjax('/user/login', 'post', sessionStorage.token, loginData, 'mask').then(res => {
        console.log(res)
        sessionStorage.username = res.data.username;
        sessionStorage.token = res.data.token;
        sessionStorage.machineID = res.data.merchantId;
        sessionStorage.UserId = res.data.UUId
        if ($('.keep input[name="aihao[]"]').prop('checked')) {
            sessionStorage.accountPass = JSON.stringify({
                account: $('.flex input[name="account"]').val(),
                pass:passType==1?accountPass.pass: hex_md5($('.flex input[name="pass"]').val())
            })
        } else {
            sessionStorage.accountPass = '';
        };
        window.location.href='M_my.html'
    }).catch(err => {
        toastTitle(err.message,'error')
    })
}
// loadingWith('数据加载中请稍后!')
// setTimeout(function(){hui.loading(false,true);}, 2000);
// hui.iconToast('服务器请求超时', 'error')
// hui.loading('数据加载中');
