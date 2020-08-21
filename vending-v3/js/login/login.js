import '../../MyCss/login/login.css'
layui.use(['form', 'layer'], function () {
    // window.history.forward(1);
    // websocket.close();
    var $ = layui.jquery;
    var form = layui.form;
    var layer = layui.layer;
    var accountPass=null;
    function keppPass() {
        if (sessionStorage.accountPass) {
             accountPass = JSON.parse(sessionStorage.accountPass);
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
    var passIndex=1,
        passType=1;
    $('.list input[name="pass"]').focus(function(){
        if(passIndex==1){
            $(this).val('');
            passIndex=2;
        }else{
            return
        }
    })
    $('.list input[name="pass"]').keyup(function(){
        passType=2;
    })
    function loginFUn(){
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
                        password:passType==1?accountPass.pass:hex_md5(logData.pass) 
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
                                    pass:passType==1?accountPass.pass: hex_md5(logData.pass)
                                })
                            }else{
                                sessionStorage.accountPass=''
                            }
                            // return ;
                            // window.location.href="../index/index.html"
                            location.replace('M_login.html')
                        } else {
                            layer.msg(res.message,{icon:2})
                        }
                    }
                })
            } else {
                layer.msg('请输入密码',{icon:7})
            }
        } else {
            layer.msg('请输入账号',{icon:7})
        }
    }
    javascript:window.history.forward(1);
})