import '../MyCss/operation.scss';
import {loadAjax, prompt, getQueryString, decrypt1, keepPass, loadAjax1} from '../common/common-mail.js';

var machineId = decrypt1(getQueryString('machineId')),
    machineInformtion = null;

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
        machineId: machineId
    });
    loadAjax1('/api/machine/openDoor', 'post', sessionStorage.token, alonePassObj).then(res => {
        $('.aloneContent').fadeOut(100).children('.aloneBox').removeClass('top30');
        prompt('开门成功')
    }).catch(err => {
        prompt(err.message)
    })
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
$('.sound').click(function () {
    $('.inquiryBox .confirm').attr('indexFlag', 2);
    $('.inquiryBox .confirm').attr('openFlag', 1);
    $('.inquiry h2').html('确定开启声音？')
    $('.inquiry').show();
})
$('.sound1').click(function () {
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
    if ($(this).attr('indexFlag') == 1) {
        let lamObj = JSON.stringify({
            action: $(this).attr('openFlag') == 1 ? 'true' : 'false',
            machine: machineId
        })
        loadAjax1('/api/switchLight', 'post', sessionStorage.token, lamObj, 'mask').then(res => {
            $('.mask').hide();
        }).catch(err => {
            $('.mask').hide();
            if (err === 'true') {
                prompt('操作成功')
            } else {
                prompt('操作失败')
            }
        })
    } else {
        var soundObj = JSON.stringify({
            action: $(this).attr('openFlag') == 1 ? 'true' : 'false',
            machine: machineId
        });
        loadAjax1('/api/switchVolume', 'post', sessionStorage.token, soundObj, 'mask').then(res => {
            $('.mask').hide();
        }).catch(err => {
            $('.mask').hide();
            if (err === 'true') {
                prompt('操作成功')
            } else {
                prompt('操作失败')
            }
        })
    }
})
