import '../../../MyCss/mobile/machine/machine.scss';
import { loadAjax, loadingWith, loadingOut, toastTitle, showPopup, closeParents, closeWindow } from '../../../common/common.js';
// loadingWith('正在加载');
//返回上一页
$('.topHeader .back').click(function () {
    window.history.go(-1)
})
//条件筛选数据、事件
var pageNum = 1,
    pageSize = 10,
    actionIndex = '',//激活
    onlineIndex = '',//在线状态
    permissionsIndex = '',//营业状态
    CreationIndex = '';//缺货状态
// 请求售货机列表
function getMachineList() {
    machineArr2=[];
    pageNum++;
    var machineData = JSON.stringify({
        pageNum,
        pageSize,
        merchantId: sessionStorage.machineID,
        onlineStatus: onlineIndex ? Number(onlineIndex) : '',
        actionStatus: actionIndex ? Number(actionIndex) : '',
        openStatus: permissionsIndex ? Number(permissionsIndex) : '',
        stockStatus: CreationIndex ? Number(CreationIndex) : ''
    });
    loadAjax('/api/machine/getMachineList', 'post', sessionStorage.token, machineData, 'mask').then(res => {
        $('.allmachine span').html(res.data.total)
        machineArr1=res.data.list;
        if (res.data.list.length < 10) {
            hui.endLoadMore(true, '已加载全部数据');
            return false;
        }

        hui.endLoadMore();
        machineDrawing(res.data.list);
    }).catch(err => {
        toastTitle(err.message, 'error');
        hui.endLoadMore(true, '已加载全部数据');
    })
}
//    售货机渲染方法
// 用数组把售货机列表存起来
var machineArr1 = [],
    machineArr2 = [],
    machineListIndex = 0;
function machineDrawing(mData) {
    console.log(machineArr1)
    var mstr = '';
    mData.forEach((item, index) => {
        mstr += `<div class="list myScale3d" machineid="${item.machineId}" machineListIndex="${machineListIndex}" merchantsId="${item.userNum}">
                    <p class="info">${item.info}</p>
                    <p class="address">${item.location}</p>
                    <ul class="status flex">
                        <li class="${item.actionStatus == 0 ? 'colorG' : 'colorYes'}">${item.actionStatus == 0 ? '未激活' : '已激活'}</li>
                        <li class="${item.onlineStatus == 0 ? 'colorNo' : 'colorYes'}" >${item.onlineStatus == 0 ? '离线' : '在线'}</li>
                        <li class="${item.openStatus == 0 ? 'colorG' : 'colorYes'}">${item.openStatus == 0 ? '无营业' : '正在营业'}</li>
                        <li class="${item.stockStatus == 0 ? 'colorYes' : item.stockStatus == 1 ? 'colorG' : 'colorNo'}">${item.stockStatus == 0 ? '货道正常' : item.stockStatus == 1 ? '一般缺货' : '严重缺货'}</li>
                    </ul>
                </div> `
        machineListIndex++
    })
    $('.machineList').append(mstr)
}
// 上拉加载
// getMachineList();
hui.loadMore(getMachineList, '正在加载');

// 下拉刷新部分
function getMachineListTwo() {
    hui.loading('加载中...');
    machineArr1=[];
    machineArr2=[];
    pageNum = 1;
    var machineData = JSON.stringify({
        pageNum,
        pageSize,
        merchantId: sessionStorage.machineID,
        onlineStatus: onlineIndex ? Number(onlineIndex) : '',
        actionStatus: actionIndex ? Number(actionIndex) : '',
        openStatus: permissionsIndex ? Number(permissionsIndex) : '',
        stockStatus: CreationIndex ? Number(CreationIndex) : ''
    });
    var arrFlag = false;
    loadAjax('/api/machine/getMachineList', 'post', sessionStorage.token, machineData, 'mask').then(res => {
        $('.allmachine span').html(res.data.total);
        $('.machineList').empty();
        $('.machineList').html('<div class="hui-refresh-icon"></div>');
        machineArr1=res.data.list;
        if (res.data.list.length > 0) {
            arrFlag = true
        }
        if (!arrFlag) {
            $('.machineList').append('<div class="empty">查询无数据</div>');
        }
        machineDrawing(res.data.list);
        //结束刷新
        hui.endRefresh();
        //重置加载更多状态
        hui.resetLoadMore();
    }).catch(err => {
        arrFlag = false;
        toastTitle(err.message, 'error');
        hui.endRefresh();
        //重置加载更多状态
        hui.resetLoadMore();
        return;
    })
}
hui.refresh('#machineList', getMachineListTwo);

// 条件筛选部分
var actionIndex0 = '',
    onlineIndex0 = '',
    permissionsIndex0 = '',
    CreationIndex0 = '';
$('.actionStatus li').click(function () {
    $(this).addClass('green').siblings().removeClass('green');
    actionIndex0 = $(this).attr('actionIndex');
})
$('.onlineStatus li').click(function () {
    $(this).addClass('yellow').siblings().removeClass('yellow');
    onlineIndex0 = $(this).attr('onlineIndex');
})
$('.permissions li').click(function () {
    $(this).addClass('blue').siblings().removeClass('blue');
    permissionsIndex0 = $(this).attr('permissionsIndex');
})
$('.CreationTime li').click(function () {
    $(this).addClass('red').siblings().removeClass('red');
    CreationIndex0 = $(this).attr('CreationIndex');
})
$('.KeyInput button').click(function () {
    if (!actionIndex) {
        $('.actionStatus li').eq(0).addClass('green').siblings().removeClass('green')
    }
    if (!onlineIndex) {
        $('.onlineStatus li').eq(0).addClass('yellow').siblings().removeClass('yellow')
    }
    if (!permissionsIndex) {
        $('.permissions li').eq(0).addClass('blue').siblings().removeClass('blue')
    }
    if (!CreationIndex) {
        $('.CreationTime li').eq(0).addClass('red').siblings().removeClass('red')
    }
    showPopup('.conditionsCont', '.conditionsHalf', 'top0')
})
// 防止事件冒泡
$('.conditionsHalf').click(function () {
    event.stopPropagation();
});
// 关闭弹窗
$('.conditionsCont').click(function () {
    closeWindow(this, 'top0')
});
$('.conditionFooter .cancelBtn').click(function () {
    closeParents(this, 'top0')
});


// 查询
$('.conditionFooter .confirmBtn').click(function () {
    actionIndex = actionIndex0;
    onlineIndex = onlineIndex0;
    permissionsIndex = permissionsIndex0;
    CreationIndex = CreationIndex0;
    console.log(actionIndex)
    getMachineListTwo();
    closeParents(this, 'top0')
});

// 点击售货机事件
var machineListId = null;//机器id;
var machineIndex=null;
$('.machineList').on('click', '.list', function () {
    showPopup('.operationList', '.operationBox', 'top0');
    machineListId = $(this).attr('machineid');
    machineIndex=$(this).attr('machinelistindex')
});
// 关闭操作详情
$('.operationList .topHeader span').click(function () {
    closeParents(this, 'top0')
});

// 收款账户部分
$('.paySetBtn').click(function () {
    // supportpay(machineListId,sessionStorage.machindID)
    showPopup('.collectionContent', '.collectionBox', 'top30')
})
$('.collectionContent .close').click(function () {
    closeParents(this, 'top30')
})
$('.collectionContent').click(function () {
    closeWindow(this, 'top30')
})
$('.collectionBox').click(function () {
    event.stopPropagation();
})

// 点击货到详情事件
var frameWin = null;
$('.aisleDetalis').click(function () {
    $('.childConten').show();
    $('.childData').prop('src', 'M_machineChild.html');
    frameWin = $('#childData')[0].contentWindow;
    // console.log($('#childData'))
})
// 每次进入页面独立密码为空
sessionStorage.independentPass = '';

// 获取收款账号
function supportpay(machindID, merchantsID) {
    var payList = JSON.stringify({
        machineId: machindID,
    })
    loadAjax('/api/pay/getMachinePayParam', 'post', sessionStorage.token, payList).then(res => {
        console.log(res);
        loadAjax('/api/pay/getPayParam', 'post', sessionStorage.token, JSON.stringify({ merchantId: Number(merchantsID) })).then(pres => {
            var setPayStr = '';
            res.data.forEach((item, index) => {
                if (item.status == 1) {
                    setPayStr += `<div class="hui-form-items">
                                    <div class="hui-form-items-title">${item.tName}</div>
                                    <div class="hui-form-radios" style="line-height:38px;">`
                    if (item.selectPay.length == 0) {
                        setPayStr += `<input type="radio" value="${0 + '-' + 0}" name="${item.id}"  id="${item.id}wu" checked  /><label for="${item.id}wu">无</label>`
                    } else {
                        setPayStr += `<input type="radio" value="${item.selectPay[0].mpId + '-' + 0}" name="${item.id}"  id="${item.id}wu" /><label for="${item.id}wu">无</label>`
                    }
                    pres.data.forEach((e, i) => {
                        if (item.id == e.payType) {
                            setPayStr += `<input type="radio" value="${(item.selectPay.length > 0 ? item.selectPay[0].mpId : 0) + '-' + e.id}" name="${item.id}"  id="${e.id}" ${item.selectPay.length <= 0 ? '' : item.selectPay[0].paramId == e.id ? 'checked' : ''} /><label for="${e.id}">${e.payee}</label>`
                        }
                    })

                    setPayStr += ` </div>
                    </div>`
                }
            });
            $('#form1').html(setPayStr)
        }).catch(err => {
            layer.msg(err.message, { icon: 2 })
        })
    }).catch(err => {
        console.log(err)
        layer.msg(err.message, { icon: 2 })
    })
}
supportpay("6241739031f5ad41", 58);
$('.collectionBody input[type="radio"]').change(function () {
    console.log(990990);
    alert(1)
});
// 修改收款账户
$('#form1').on('change', 'input[type="radio"]', function () {
    console.log($(this).val());
    var that = this;
    hui.confirm('确定修改收款账户？', ['取消', '确定'], function () {
        loadingWith('正在修改，请稍后！');
        var dataID = $(that).val().split('-');
        var setMachinePay = JSON.stringify({
            setMachinePay: machineListId,
            paramId: Number(dataID[1]),
            mpId: Number(dataID[0])
        });
        loadAjax('/api/pay/updateMachinePayParam', 'post', sessionStorage.token, setMachinePay, 'mask').then(res => {
            console.log(res);
            toastTitle(res.message, 'success')
        }).catch(err => {
            toastTitle(err.message, 'error')
        })
    }, function () {
        supportpay("6241739031f5ad41", 58);
    });
})

// 终端信息部分
hui.formInit();
$('.operationNav .info').click(function(){
    showPopup('.terminalContent', '.terminalBox', 'top0');
    var data = hui.getFormData('#form2');
    console.log(data)
})