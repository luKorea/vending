import '../MyCss/operation.scss';
import { loadAjax, prompt, getQueryString, decrypt1,loadAjax1  } from '../common/common.js';
var machineId = decrypt1(getQueryString('machineId')),
    machineInformtion = null;
// $.ajax({
//     type: 'post',
//     url: '/api/machine/getStatus',
//     timeout: 10000,
//     async: false,
//     data: JSON.stringify({
//         machineId,
//     }),
//     headers: {
//         "Content-Type": "application/json",
//         token: sessionStorage.token
//     },
//     success: function (res) {
//         if (res.code == 200) {
//             machineInformtion = res.data;
//         } else {
//             prompt(res.message)
//         }
//     }, error: function (err) {
//         prompt('服务器请求超时')
//     }
// });

// 灯光与音量状态
// var lamFlag = machineInformtion.is_light,
//     soundFlag = machineInformtion.is_volume;

// lamFlag == 1 ? $('.lamp p').html('售货机关灯') : $('.lamp p').html('售货机开灯');
// soundFlag == 1 ? $('.sound p').html('售货机静音') : $('.sound p').html('售货机开启声音');

// 开门部分
$('.openTheDoor').click(function () {
    $('.aloneContent').fadeIn(100).children('.aloneBox').addClass('top30')
});
$('.aloneBox').click(function () {
    event.stopPropagation();
})
$('.aloneContent').click(function () {
    $('.aloneContent').fadeOut(100).children('.aloneBox').removeClass('top30')
});
$('.aloneContent .confirmBtn').click(function () {
    
    if (!$('.aloneContent input[name="alonePass"]').val()) {
        prompt('请输入独立密码');
        return;
    }
    
    var alonePassObj = JSON.stringify({
        alonePsd: hex_md5($('.aloneContent input[name="alonePass"]').val()),
        machineId:machineId
    });
    loadAjax1('/api/machine/openDoor','post',sessionStorage.token,alonePassObj).then(res=>{
        $('.aloneContent').fadeOut(100).children('.aloneBox').removeClass('top30');
        prompt('开门成功')
    }).catch(err=>{
        prompt(err.message)
    })
    // loadAjax1('/api/user/verifyAlonePwd','post',sessionStorage.token,alonePassObj).then(res=>{
    //     $('.aloneContent').fadeOut(100).children('.aloneBox').removeClass('top30')
    //     loadAjax1('/api/openTheDoor','post',sessionStorage.token,JSON.stringify({machine:machineId}),'mask').then(res=>{
    //     }).catch(err=>{
    //         if(err=='false'){
    //             prompt('开门失败')
    //         }else{
    //             prompt('开门成功')
    //         }
    //     })
    // }).catch(err=>{
    //     prompt(err.message)
    // })
})

//indexFlag  1开灯 2声音
$('.lamp').click(function () {
    $('.inquiryBox .confirm').attr('indexFlag', 1);
    $('.inquiryBox .confirm').attr('openFlag', 1);
    $('.inquiry h2').html('确定开灯？')
    $('.inquiry').show();
});
$('.lamp1').click(function () {
    $('.inquiryBox .confirm').attr('indexFlag', 1);
    $('.inquiryBox .confirm').attr('openFlag', 2);
    $('.inquiry h2').html('确定关灯？')
    $('.inquiry').show();
});
$('.sound').click(function(){
    $('.inquiryBox .confirm').attr('indexFlag', 2);
    $('.inquiryBox .confirm').attr('openFlag', 1);
    $('.inquiry h2').html('确定开启声音？')
    $('.inquiry').show();
})
$('.sound1').click(function(){
    $('.inquiryBox .confirm').attr('indexFlag', 2);
    $('.inquiryBox .confirm').attr('openFlag', 2);
    $('.inquiry h2').html('确定静音？')
    $('.inquiry').show();
})
// 取消
$('.cancel').click(function () {
    $('.inquiry').hide();
    $('.inquiryBox .confirm').attr('indexFlag', '');
    $('.inquiryBox .confirm').attr('openFlag', '');
})
$('.inquiryBox .confirm').click(function () {
    $('.inquiry').hide();
    $('.mask').show();
    if($(this).attr('indexFlag')==1){
        var lamObj=JSON.stringify({
            action:$(this).attr('openFlag')==1?'true':'false',
            machine:machineId
        })
        loadAjax1('/api/switchLight','post',sessionStorage.token,lamObj,'mask').then(res=>{
            $('.mask').hide();
        }).catch(err=>{
            $('.mask').hide();
            if(err=='true'){
                prompt('操作成功')
            }else{
                prompt('操作失败')
            }
        })
    }else{
        var soundObj=JSON.stringify({
            action:$(this).attr('openFlag')==1?'true':'false',
            machine:machineId
        });
        loadAjax1('/api/switchVolume','post',sessionStorage.token,soundObj,'mask').then(res=>{
            $('.mask').hide();
        }).catch(err=>{
            $('.mask').hide();
            if(err=='true'){
                prompt('操作成功')
            }else{
                prompt('操作失败')
            }
        })
    }
})