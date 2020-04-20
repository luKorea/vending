layui.use(['form', 'layer'], function () {
    var $ = layui.jquery;
    var form = layui.form;
    var layer = layui.layer;
    function keppPass() {
        if (sessionStorage.accountPass) {
            var accountPass = JSON.parse(sessionStorage.accountPass);
            console.log(accountPass);
            form.val("loginData", { //formTest 即 class="layui-form" 所在元素属性 lay-filter="" 对应的值
                "account": accountPass.account // "name": "value"
                , "pass": accountPass.pass
                ,"keep":'on'
            });
        }else{
            return ;
        }

    };
    keppPass();
    $('.login-btn').click(function () {
        var logData = form.val("loginData")
        if (logData.account) {
            if (logData.pass) {
                // 
                $.ajax({
                    type: 'post',
                    url: `/api/user/login`,
                    headers: {
                        "Content-Type": "application/json",
                    },
                    data: JSON.stringify({
                        username: logData.account,
                        password: logData.pass
                    }),
                    success: function (res) {
                        if (res.code == 200) {
                            sessionStorage.username = res.data.username;
                            sessionStorage.token = res.data.token;
                            if (logData.keep == 'on') {
                                sessionStorage.accountPass = JSON.stringify({
                                    account: logData.account,
                                    pass: logData.pass
                                })
                            }
                        } else {
                            layer.msg(res.data)
                        }
                    }
                })
            } else {
                layer.msg('请输入密码')
            }
        } else {
            layer.msg('请输入账号')
        }
    })
})