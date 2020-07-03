layui.use(['form', 'layer'], function () {
    // window.history.forward(1);
    var $ = layui.jquery;
    var form = layui.form;
    var layer = layui.layer;
    function keppPass() {
        if (sessionStorage.accountPass) {
            var accountPass = JSON.parse(sessionStorage.accountPass);
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
        loginFUn()
    });
    $('#pass').keydown(function(e){
        if(e.keyCode == 13){
            loginFUn()
        }
    })
    function loginFUn(){
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
                        password:hex_md5(logData.pass) 
                        // password:logData.pass
                    }),
                    success: function (res) {
                        console.log(hex_md5(logData.pass) )
                        if (res.code == 200) {
                            console.log(res)
                            sessionStorage.username = res.data.username;
                            sessionStorage.token = res.data.token;
                            sessionStorage.machineID=res.data.merchantId;
                            sessionStorage.UserId=res.data.UUId
                            if (logData.keep == 'on') {
                                sessionStorage.accountPass = JSON.stringify({
                                    account: logData.account,
                                    pass: logData.pass
                                })
                            }
                            // return ;
                            // window.location.href="../index/index.html"
                            location.replace('../index/index.html')
                        } else {
                            layer.msg(res.data,{icon:2})
                        }
                    }
                })
            } else {
                layer.msg('请输入密码')
            }
        } else {
            layer.msg('请输入账号')
        }
    }
    javascript:window.history.forward(1);
})