import '../../MyCss/login/login1.scss';
import {loadAjax,popupShow,popupHide} from '../../common/common.js';
layui.use(['form', 'layer', 'carousel'], function () {
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
        height: '40vw',
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
                var loginObj = JSON.stringify({
                    username: logData.account,
                    // password: passType == 1 ? accountPass.pass : hex_md5(logData.pass)
                    password:passType==1?accountPass.pass:logData.pass
                })
                // loadingAjax(`/user/login`, 'post', loginObj, sessionStorage.token,'','','',layer).then(res => {
                //     sessionStorage.username = res.data.username;
                //     sessionStorage.token = res.data.token;
                //     sessionStorage.machineID = res.data.merchantId;
                //     sessionStorage.UserId = res.data.UUId
                //     if (logData.keep == 'on') {
                //         sessionStorage.accountPass = JSON.stringify({
                //             account: logData.account,
                //             // pass: passType == 1 ? accountPass.pass : hex_md5(logData.pass)
                //             pass:passType==1?accountPass.pass:logData.pass
                //         })
                //     } else {
                //         sessionStorage.accountPass = ''
                //     }
                //     window.location.href = "index.html"
                // }).catch(err => {
                //     layer.msg(err.message, { icon: 2 })
                // })

                loadAjax('/user/login','post','',loginObj,layer).then(res=>{
                    console.log(res)
                    sessionStorage.username = res.data.username;
                    sessionStorage.token = res.data.token;
                    // sessionStorage.machineID = res.data.merchantId;
                    sessionStorage.UserId = res.data.userId
                    if (logData.keep == 'on') {
                        sessionStorage.accountPass = JSON.stringify({
                            account: logData.account,
                            // pass: passType == 1 ? accountPass.pass : hex_md5(logData.pass)
                            pass:passType==1?accountPass.pass:logData.pass
                        })
                    } else {
                        sessionStorage.accountPass = ''
                    }
                    window.location.href = "index.html"
                }).catch(err=>{
                    layer.msg(err.message, { icon: 2 })
                })
            } else {
                layer.msg("请输入密码", { icon: 7 })
            }
        } else {
            layer.msg("请输入账号", { icon: 7 })
        }
    }
    javascript: window.history.forward(1);
})