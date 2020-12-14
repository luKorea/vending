import '../../../MyCss/mobile/my/my.scss';
import { loadAjax, loadingWith, loadingOut, toastTitle ,showPopup,closeParents,closeWindow,passRegular,outLogin} from '../../../common/common.js'
$('.loginPassBtn').click(function(){
    showPopup('.loginPassCont','.changeBox','top30');
})
$('.independentPassBtn').click(function(){
    showPopup('.independentPassCont','.changeBox','top30')
});
$('.close').click(function(){
    closeParents(this,'top30');
    event.stopPropagation(); 
});
$('.maskBox ').click(function(){
    event.stopPropagation(); 
});
$('.changePass ').click(function(){
    closeWindow(this,'top30');
});
loadingWith('正在加载');
loadAjax('/user/getUserInfo','post',sessionStorage.token,'','mask').then(res=>{
    $('.userName').html(res.data.userName);
    $('.name').html(res.data.name);
    $('.phone').html(res.data.phone);
    $('.alias').html(res.data.alias);
    $('.merchantName').html(res.data.merchantName)
    console.log(res)
}).catch(err=>{
    setTimeout(_=>{
        toastTitle(err.message,'error')
    },310)
});

$('.confirmBtn').click(function(){
    var ele=null,
        passTypeIndex=$(this).attr('PassType');
        if(passTypeIndex==0){
            ele='loginPassCont';
        }else{
            ele='independentPassCont';
        };
        if(!($(`.${ele} input[name="oldPass"]`).val()&&$(`.${ele} input[name="newPass"]`).val()&&$(`.${ele} input[name="newPassTwo"]`).val())){
            toastTitle('带*为必填','warn')
            return ;
        }
        if($(`.${ele} input[name="newPass"]`).val()!=$(`.${ele} input[name="newPassTwo"]`).val()){
            toastTitle('新密码与确认密码不一致','warn');
            return ;
        }
        var passData=JSON.stringify({
            old:hex_md5($(`.${ele} input[name="oldPass"]`).val()),
            password:hex_md5($(`.${ele} input[name="newPass"]`).val()),
            confirm:hex_md5($(`.${ele} input[name="newPassTwo"]`).val()),
            type:passTypeIndex
        });
        loadAjax('//user/updatePsw','post',sessionStorage.token,passData,'mask',`.${ele}`).then(res=>{
            loadingWith('正在修改');
            toastTitle(res.message)
            // toastTitle(res.message+(passTypeIndex==0?'请重新登录！':''))
            // if(passTypeIndex==0){
            //     setTimeout(_=>{
            //         outLogin()
            //     },1500)
            // };
            $(`.${ele} input[name="oldPass"]`).val('');
            $(`.${ele} input[name="newPass"]`).val('');
            $(`.${ele} input[name="newPassTwo"]`).val('')
        }).catch(err=>[
            toastTitle(err.message)
        ])
});
$('.blur input').blur(function(){
    passRegular(this)
});
// 退出登录
$('.loginOut').click(function(){
    hui.confirm('确定退出登录？', ['取消','确定'], function(){
        // console.log('确认后执行...');
        outLogin();
    },function(){
    });  
})
$('#footer').load('M_footerNav.html');
$('body').on('click','.childBox .center',function(){
    window.location.href='M_managementCenter.html'
})