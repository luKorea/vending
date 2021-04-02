import '../MyCss/operation.scss';
import {loadAjax, prompt, getQueryString, decrypt1, keepPass, loadAjax1} from '../common/common-mail.js';

var machineId = decrypt1(getQueryString('machineId')),
    machineInformtion = null;


document.getElementById('mName').innerText += `${sessionStorage.machineName}`;
document.getElementById('mId').innerText += `${sessionStorage.machineNumber}`;



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

//indexFlag  1开灯 2声音 3 管理系统页面 4 常规页面
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
    $('.inquiry h2').html('确定关闭声音？')
    $('.inquiry').show();
})
$('.goAdmin').click(function () {
    $('.inquiryBox .confirm').attr('indexFlag', 3);
    $('.inquiryBox .confirm').attr('openFlag', 3);
    $('.inquiry h2').html('确定打开管理系统页面？')
    $('.inquiry').show();
})
$('.goPage').click(function () {
    console.log(2);
    $('.inquiryBox .confirm').attr('indexFlag', 4);
    $('.inquiryBox .confirm').attr('openFlag', 4);
    $('.inquiry h2').html('确定切换回常规界面？')
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
    let item = Number($(this).attr('indexFlag')),
        flag = Number($(this).attr('openFlag'));
    console.log(item, flag);
    switch (item) {
        case 1:
            one(flag);
            break;
        case 2:
            two(flag);
            break;
        case 3:
            three(flag);
            break;
        case 4:
            four(flag);
            break;
    }

    function one(flag) {
        let lamObj = JSON.stringify({
            action: flag === 1 ? 'true' : 'false',
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
    }
    function two(flag) {
        let soundObj = JSON.stringify({
            action: flag === 1 ? 'true' : 'false',
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
    function three(flag) {
        let soundObj = JSON.stringify({
            action:  sessionStorage.token,
            machine: machineId
        });
        loadAjax1('/api/scanLogin', 'post', sessionStorage.token, soundObj, 'mask').then(res => {
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
    function four(flag) {
        let soundObj = JSON.stringify({
            action:  sessionStorage.token,
            machine: machineId
        });
        loadAjax1('/api/scanLogin', 'post', sessionStorage.token, soundObj, 'mask').then(res => {
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
