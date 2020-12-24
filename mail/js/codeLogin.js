import '../MyCss/codeLogin.scss'
import { loadAjax, prompt, getQueryString,decrypt1 } from '../common/common.js';
var machineId =getQueryString('machineId');
// 点击登录事件
$('.searchCont .btn').click(function(){
    if(!$('.formCont input[name="name"]').val()){
        prompt('请输入账号');
        return ;
    }
    if(!$('.formCont input[name="pass"]').val()){
        prompt('请输入密码');
        return ;
    };
    $('.mask').show();
    var loginObj=JSON.stringify({
        username: $('.formCont input[name="name"]').val(),
        password:  hex_md5($('.formCont input[name="pass"]').val()),
        machineId:machineId
    })
    loadAjax('/api/user/login','post',loginObj).then(res=>{
        sessionStorage.token=res.data.token;
        $.ajax({
            type:'post',
            url:'/api/scanLogin',
            timeout: 10000,
            data:JSON.stringify({
                action:sessionStorage.token,
                machine:decrypt1(machineId) 
            }),
            headers: {
                "Content-Type": "application/json",
                token:sessionStorage.token
            },
            success:function(res){
                $('.mask').hide();
                if(res=='true'){
                    window.location.href=`operation.html?machineId=${getQueryString('machineId')}`
                }else{
                    prompt('售货机离线,登录失败') 
                }
            },
            error:function(err){
                $('.mask').hide();
                prompt('服务器请求超时')
            }
        });
    }).catch(err=>{
        $.ajax({
            type:'post',
            url:'/api/scanLogin',
            timeout: 10000,
            data:JSON.stringify({
                action:'false',
                machine:decrypt1(machineId) 
            }),
            headers: {
                "Content-Type": "application/json",
                token:sessionStorage.token
            },
            success:function(res){
            },
            error:function(err){
                $('.mask').hide();
                prompt('服务器请求超时')
            }
        });
        $('.mask').hide();
        prompt(err.message)
    })
    // window.location.href=`operation.html?machineId=${getQueryString('machineId')}`
})