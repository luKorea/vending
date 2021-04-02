import '../MyCss/codeLogin.scss'
import {loadAjax, prompt, getQueryString, decrypt1, keepPass, encrypt} from '../common/common-mail.js';

var machineId = getQueryString('machineId'),
    time = getQueryString('time');

if (sessionStorage.accountPass) {
    var passFlag = keepPass(sessionStorage.old, new Date().getTime())
    if (passFlag) {
        var accountPass = JSON.parse(sessionStorage.accountPass);
        $('.formCont input[name="name"]').val(accountPass.username);
        $('.formCont input[name="pass"]').val(accountPass.password);
    }
}
var passIndex = 1,
    passType = 1;
$('.list input[name="pass"]').focus(function () {
    if (passIndex == 1) {
        $(this).val('');
        passIndex = 2;
    } else {
        return
    }
});
$('.list input[name="pass"]').keyup(function () {
    passType = 2;
})
// 点击登录事件
$('.searchCont .btn').click(function () {
    if (!$('.formCont input[name="name"]').val()) {
        prompt('请输入账号');
        return;
    }
    if (!$('.formCont input[name="pass"]').val()) {
        prompt('请输入密码');
        return;
    }
    ;
    $('.mask').show();
    var loginObj = JSON.stringify({
        username: $('.formCont input[name="name"]').val(),
        password: passType == 1 ? accountPass.password : hex_md5($('.formCont input[name="pass"]').val()),
        machineId: machineId,
        time: time
    })
    loadAjax('/api/user/login', 'post', loginObj)
        .then(res => {
            sessionStorage.machineName = res.data.machineName;
            sessionStorage.machineNumber = res.data.machineNumber;
            sessionStorage.token = res.data.token;
            if ($('.r1').prop('checked')) {
                sessionStorage.old = new Date().getTime();
                sessionStorage.accountPass = JSON.stringify({
                    username: $('.formCont input[name="name"]').val(),
                    password: passType == 1 ? accountPass.password : hex_md5($('.formCont input[name="pass"]').val()),
                })
            } else {
                sessionStorage.accountPass = ''
            }
            window.location.href = `operation.html?machineId=${getQueryString('machineId')}`
            // $.ajax({
            //     type: 'post',
            //     url: '/api/scanLogin',
            //     timeout: 10000,
            //     data: JSON.stringify({
            //         action: sessionStorage.token,
            //         machine: decrypt1(machineId)
            //     }),
            //     headers: {
            //         "Content-Type": "application/json",
            //         token: sessionStorage.token
            //     },
            //     success: function (res) {
            //         $('.mask').hide();
            //         if (res == 'true') {
            //             if ($('.r1').prop('checked')) {
            //                 sessionStorage.old = new Date().getTime();
            //                 sessionStorage.accountPass = JSON.stringify({
            //                     username: $('.formCont input[name="name"]').val(),
            //                     password: passType == 1 ? accountPass.password : hex_md5($('.formCont input[name="pass"]').val()),
            //                 })
            //             } else {
            //                 sessionStorage.accountPass = ''
            //             }
            //             window.location.href = `operation.html?machineId=${getQueryString('machineId')}`
            //         } else {
            //             prompt('售货机离线,登录失败')
            //         }
            //     },
            //     error: function (err) {
            //         $('.mask').hide();
            //         prompt('服务器请求超时')
            //     }
            // });
        })
        .catch(err => {
            console.log(err);
            // $.ajax({
            //     type: 'post',
            //     url: '/api/scanLogin',
            //     timeout: 10000,
            //     data: JSON.stringify({
            //         action: 'false',
            //         machine: decrypt1(machineId)
            //     }),
            //     headers: {
            //         "Content-Type": "application/json",
            //         token: sessionStorage.token
            //     },
            //     success: function (res) {
            //
            //     },
            //     error: function (err) {
            //         $('.mask').hide();
            //         prompt('服务器请求超时')
            //     }
            // });
            $('.mask').hide();
            prompt(err.message)
        })
})
