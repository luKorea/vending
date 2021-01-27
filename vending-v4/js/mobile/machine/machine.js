import '../../../MyCss/mobile/machine/machine.scss';
import { loadAjax, loadingWith, loadingOut, toastTitle, showPopup, closeParents, closeWindow, permissionsFun, timeStamp, treeList, getKeyTime, timeFlag } from '../../../common/common.js';
// loadingWith('正在加载');
//返回上一页
$('#topHeader .back').click(function () {
    // window.history.go(-1);
    window.location.href = 'M_managementCenter.html'
});
// 获取权限
var editFlag = false,//修改设备
    activateFlag = false,//启动设备
    // editAisleFlag = false,//修改货道
    paySetFlag = false,//配置机器支付方式
    // delAisleFlag = false,//删除货道
    // addAisleFlag = false,//增加货道
    AisleDetailsFlag = false,//货道详情
    salesListFlag = false,//销售记录
    shipmentListFlag = false,//出货记录
    replenishmentFlag = false,//补货记录
    editWayFlag = false;
function permissions() {
    permissionsFun('/role/findUserPermission', 'post', sessionStorage.token).then(res => {
        res.data.forEach(item => {
            if (item.id == '396') {
                editFlag = true;
            }
            if (item.id == '392') {
                activateFlag = true;
            }
            if (item.id == '432') {
                paySetFlag = true;
            }
            if (item.id == '427') {
                AisleDetailsFlag = true;
            }
            if (item.id == '401') {
                salesListFlag = true;
            }
            if (item.id == '402') {
                shipmentListFlag = true;
            }
            if (item.id == '456') {
                replenishmentFlag = true;
            }
            if (item.id == '424') {
                editWayFlag = true;
            }
        });
        permissions1()
    }).catch(err => {
        console.log(err)
    })
}
permissions();
function permissions1() {
    activateFlag ? $('.remoteOperation').show() : $('.remoteOperation').hide();
    AisleDetailsFlag ? $('.aisleDetalis').show() : $('.aisleDetalis').hide();
    paySetFlag ? $('.paySetBtn').show() : $('.paySetBtn').hide();
    shipmentListFlag ? $('.shipmentRd').show() : $('.shipmentRd').hide();
    replenishmentFlag ? $('.Rrecord').show() : $('.Rrecord').hide();
    // editWayFlag?$('.editWayBtn').show():$('.editWayBtn').hide();
}
//条件筛选数据、事件
var merchantIdStr = sessionStorage.machineID;
var pageNum = 1,
    pageSize = 10,
    actionIndex = '',//激活
    onlineIndex = '',//在线状态
    permissionsIndex = '',//营业状态
    CreationIndex = '';//缺货状态
// 请求售货机列表
function getMachineList() {
    machineArr2 = [];
    pageNum++;
    var machineData = JSON.stringify({
        pageNum,
        pageSize,
        // merchantId: sessionStorage.machineID,
        onlineStatus: onlineIndex ? Number(onlineIndex) : '',
        actionStatus: actionIndex ? Number(actionIndex) : '',
        openStatus: permissionsIndex ? Number(permissionsIndex) : '',
        stockStatus: CreationIndex ? Number(CreationIndex) : '',
        merchantId: merchantIdStr,
    });
    loadAjax('/machine/getMachineList', 'post', sessionStorage.token, machineData, 'mask').then(res => {
        $('.allmachine span').html(res.data.total)
        machineArr1 = machineArr1.concat(res.data.list)
        // machineArr1=res.data.list;
        if (loadFlag) {
            machineDrawing(res.data.list);
        }
        if (res.data.list.length < 10) {
            hui.endLoadMore(true, '已加载全部数据');
            return false;
        }

        hui.endLoadMore();

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
    var mstr = '';
    mData.forEach((item, index) => {
        mstr += `<div class="list myScale3d" machineid="${item.machineId}" machineListIndex="${machineListIndex}" merchantsId="${item.userNum}">
                    <p class="info">${item.info}</p>
                    <p class="address">${item.location}</p>
                    <ul class="status flex">
                        <li class="${item.actionStatus == 0 ? 'colorG' : 'colorYes'}">${item.actionStatus == 0 ? '未激活' : '已激活'}</li>
                        <li class="${item.onlineStatus == 0 ? 'colorNo' : 'colorYes'}" >${item.onlineStatus == 0 ? '离线' : '在线'}</li>
                        <li class="${item.openStatus == 0 ? 'colorG' : 'colorYes'}">${item.openStatus == 0 ? '无营业' : '正在营业'}</li>

                    </ul>
                </div> `
        // <li class="${item.stockStatus == 0 ? 'colorYes' : item.stockStatus == 1 ? 'colorG' : 'colorNo'}">${item.stockStatus == 0 ? '货道正常' : item.stockStatus == 1 ? '一般缺货' : '严重缺货'}</li>
        machineListIndex++
    })
    $('.machineList').append(mstr)
}
// 上拉加载
hui.loadMore(getMachineList, '正在加载');

// 下拉刷新部分
var loadFlag = false;

function getMachineListTwo() {
    hui.loading('加载中...');
    machineArr1 = [];
    machineArr2 = [];
    pageNum = 1;
    machineListIndex = 0;
    var machineData = JSON.stringify({
        pageNum,
        pageSize,
        // merchantId: sessionStorage.machineID,
        onlineStatus: onlineIndex ? Number(onlineIndex) : '',
        actionStatus: actionIndex ? Number(actionIndex) : '',
        openStatus: permissionsIndex ? Number(permissionsIndex) : '',
        stockStatus: CreationIndex ? Number(CreationIndex) : '',
        keyword,
        merchantId: merchantIdStr,
    });
    var arrFlag = false;
    loadAjax('/machine/getMachineList', 'post', sessionStorage.token, machineData, 'mask').then(res => {
        $('.allmachine span').html(res.data.total);
        $('.machineList').empty();
        $('.machineList').html('<div class="hui-refresh-icon"></div>');
        machineArr1 = res.data.list;
        if (res.data.list.length > 0) {
            arrFlag = true
        }
        if (res.data.list.length < 10) {
            loadFlag = false
        } else {
            loadFlag = true;
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
    CreationIndex0 = '',
    keyword = '';
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
    keyword = $('.KeyInput input[name="key"]').val();
    // console.log($('.KeyInput input[name="key"]').val())
    getMachineListTwo();
    closeParents(this, 'top0')
});

// 点击售货机事件
var machineListId = null;//机器id;
var machineIndex = null;//售货机数组下标
$('.machineList').on('click', '.list', function () {
    showPopup('.operationList', '.operationBox', 'top0');
    machineListId = $(this).attr('machineid');
    machineIndex = $(this).attr('machinelistindex');
    console.log(machineIndex);
    $('.machineTitle').html(machineArr1[machineIndex].info + '终端信息')
    machineDetails = machineArr1[machineIndex];
});
// 关闭操作详情
$('.operationList .topHeader span').click(function () {
    closeParents(this, 'top0')
});

// 收款账户部分
$('.paySetBtn').click(function () {
    // supportpay(machineListId,sessionStorage.machindID)
    supportpay(machineDetails.machineId, machineDetails.userNum);
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
    loadAjax('/pay/getMachinePayParam', 'post', sessionStorage.token, payList).then(res => {
        console.log(res);
        loadAjax('/pay/getPayParam', 'post', sessionStorage.token, JSON.stringify({ merchantId: Number(merchantsID) })).then(pres => {
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
            // layer.msg(err.message, { icon: 2 })
            toastTitle(err.message, 'error');
        })
    }).catch(err => {
        console.log(err)
        // layer.msg(err.message, { icon: 2 })
        toastTitle(err.message, 'error');
    })
}
// supportpay("6241739031f5ad41", 58);
// 修改收款账户
// 机器信息
var machineDetails = null;
$('#form1').on('change', 'input[type="radio"]', function () {
    if (!paySetFlag) {
        toastTitle('您没有修改收款账户得权限', 'warn');
        return;
    }
    console.log($(this).val());
    var that = this;
    hui.confirm('确定修改收款账户？', ['取消', '确定'], function () {
        loadingWith('正在修改，请稍后！');
        var dataID = $(that).val().split('-');
        var setMachinePay = JSON.stringify({
            machineId: machineListId,
            paramId: Number(dataID[1]),
            mpId: Number(dataID[0])
        });
        loadAjax('/pay/updateMachinePayParam', 'post', sessionStorage.token, setMachinePay, 'mask').then(res => {
            console.log(res);
            toastTitle(res.message, 'success');
            supportpay(machineDetails.machineId, machineDetails.userNum);
        }).catch(err => {
            toastTitle(err.message, 'error');
            // supportpay("6241739031f5ad41", 58);/
            supportpay(machineDetails.machineId, machineDetails.userNum);
        })
    }, function () {
        supportpay(machineDetails.machineId, machineDetails.userNum);
    });
})

// 终端信息部分
// hui.formInit();

$('.operationNav .info').click(function () {
    // console.log()
    showPopup('.terminalContent', '.terminalBox', 'top0');
    // var data = hui.getFormData('#form2');
    console.log(machineArr1[machineIndex]);
    if (machineDetails.openStatus == 1 || (!editFlag)) {
        toastTitle(editFlag ? '温馨提示！该售货机正在营业，不可进行编辑！' : '您没有编辑设备的权限', 'warn');
        $('.terminalContent input').prop('disabled', true);
        $('.terminalContent .terminalFooter').hide()
    } else {
        $('.terminalContent input').prop('disabled', false);
        $('.terminalContent .terminalFooter').show();
        $('.terminalContent input[name="merchantsNametext"]').prop('disabled', true);
        $('.terminalContent input[name="number"]').prop('disabled', true);
        $('.terminalContent input[name="merchantsName"]').prop('disabled', true);
    }
    $('.terminalContent input[name="sNumber"]').val(machineDetails.number);
    $('.terminalContent input[name="name"]').val(machineDetails.info);
    $('.terminalContent input[name="number"]').val(machineDetails.machineId);
    var region = machineDetails.location.split(' ')
    $('.province').html(region[0] + ' ' + region[1] + ' ' + region[2]);
    $('.terminalContent input[name="mapVal"]').val(region[3]);
    $('.terminalContent input[name="area"]').val(machineDetails.area);
    $('.terminalContent input[name="longitude"]').val(machineDetails.longitude);
    $('.terminalContent input[name="latitude"]').val(machineDetails.latitude);
    $('.terminalContent input[name="headPhone"]').val(machineDetails.chargerPhone);
    $('.terminalContent input[name="describe"]').val(machineDetails.description);
    $('.terminalContent input[name="merchantsNametext"]').val(machineDetails.merchantName);
    $('.terminalContent input[name="merchantsName"]').val(machineDetails.userNum);
});
// 初始化开关
// hui('#switchBox').switchBox(['否','是'],function(res){
//     console.log(res)
//     if(res){
//         hui.toast('开关打开');
//     }else{
//         hui.toast('开关关闭');
//     }
// }, true);
// hui('#switchBox2').switchBox(['否','是'],function(res){
//     if(res){
//         hui.toast('开关打开');
//     }else{
//         hui.toast('开关关闭');
//     }
// }, true);
// 关闭
$('.terminalContent .close').click(function () {
    closeParents(this, 'top0');
    $('.hui-picker').hide();
})

// 选择省市区
var picker2 = new huiPicker('#province', function () {
    var sheng = picker2.getText(0);
    var shi = picker2.getText(1);
    var qu = picker2.getText(2);
    hui('#province').html(sheng + ' ' + shi + ' ' + qu);
});
picker2.level = 3;
//cities 数据来源于 cities.js
picker2.bindRelevanceData(cities);

// 确定修改
$('.terminalContent .confirmBtn').click(function () {
    var machineInformation = hui.getFormData('#form2');
    console.log(machineInformation);
    if (machineInformation.sNumber && machineInformation.name && machineInformation.number && machineInformation.mapVal && machineInformation.area && machineInformation.merchantsName && machineInformation.longitude && machineInformation.latitude) {
        var editMachine = JSON.stringify({
            number: machineInformation.sNumber,
            info: machineInformation.name,
            machineId: machineInformation.number,
            location: $('.province').html() + ' ' + $('.terminalContent input[name="mapVal"]').val(),
            area: machineInformation.area,
            longitude: machineInformation.longitude,
            latitude: machineInformation.latitude,
            userNum: machineInformation.merchantsName,
            chargerPhone: machineInformation.headPhone,
            description: machineInformation.describe
        });
        loadingWith('正在编辑，请稍后')
        loadAjax('/machine/updateMachine', 'post', sessionStorage.token, editMachine, 'mask').then(res => {
            toastTitle(res.message, 'success');
            getMachineListTwo();
        }).catch(err => {
            console.log(err)
            toastTitle(err.message, 'error')
        })
    } else {
        toastTitle('带*为必填', 'warn')
    }
})

// 远程操作
$('.remoteOperation').click(function () {
    showPopup('.remoteCont', '.remoteBox', 'top30')
    if (machineDetails.actionStatus == 1) {
        $('.actionStatusBtn').hide();
    } else {
        $('.businessBtn ').hide();
    }
    if (machineDetails.openStatus == 0) {
        $('.businessBtn p').html('营业')
    } else {
        $('.businessBtn p').html('暂停营业')
    }
})
$('.remoteBox').click(function () {
    event.stopPropagation();
});
// 关闭
$('.remoteCont').click(function () {
    closeWindow(this, 'top30')
})
// 营业操作
$('.businessBtn').click(function () {
    if (machineDetails.onlineStatus != 1) {
        toastTitle('售货机处于离线状态不可以操作此功能', 'warn');
        return;
    }
    hui.confirm(machineDetails.actionStatus == 0 ? '确定营业？' : '确定暂停营业？', ['取消', '确定'], function () {
        var action = machineDetails.actionStatus == 0 ? 'true' : 'false';
        var openStatus = machineDetails.openStatus == 0 ? '1' : '0'
        loadingWith('正在操作，请稍后');
        loadAjax('/machine/getStatus', 'post', sessionStorage.token, JSON.stringify({ machineId: machineDetails.machineId }), 'mask').then(Dres => {
            var statusType = Dres.data;
            if (statusType.actionStatus == 1) {
                loadAjax('/pushActive', 'post', sessionStorage.token, JSON.stringify({
                    machine: machineDetails.machineId,
                    action,
                }), 'mask').then(res => {
                    toastTitle(res.message, 'warn')
                }).catch(err => {
                    console.log(err)
                    if (err == 'true') {
                        loadAjax('/machine/activeMachine', 'post', sessionStorage.token, JSON.stringify({ machineId: machineDetails.machineId, openStatus, }), 'mask').then(res => {
                            machineDetails = statusType;
                            toastTitle('操作成功', 'success');
                            getMachineListTwo();
                            if (machineDetails.openStatus == 0) {
                                $('.businessBtn p').html('营业')
                            } else {
                                $('.businessBtn p').html('暂停营业')
                            }
                            $('.remoteCont').fadeOut(100).children('.remoteBox ').removeClass('top30');
                            closeWindow('.operationList', 'top0')
                        }).catch(err => {
                            console.log(err)
                            toastTitle('操作失败', 'error')
                        })
                    } else {
                        toastTitle('操作失败', 'error')
                    }
                })
            } else {
                toastTitle('该设备未激活,无法进行营业操作', 'warn')
            }
        }).catch(err => {
            console.log(err)
            alert(1)
            toastTitle(err.message, 'error')
        })
    }, function () {
        // console.log('取消后执行...');
    });
});
// 激活操作
$('.actionStatusBtn').click(function () {
    hui.confirm('确定激活该售货机？', ['取消', '确定'], function () {
        loadingWith('正在激活，请稍后!')
        loadAjax('/machine/activeMachine', 'post', sessionStorage.token, JSON.stringify({ machineId: machineDetails.machineId, actionStatus: '1' }), 'mask').then(res => {
            toastTitle(res.message, 'success');
            machineDetails.actionStatus = 1;
            $('.actionStatusBtn').hide();
            $('.businessBtn ').show();
            getMachineListTwo();
        }).catch(err => {
            toastTitle(err.message, 'error')
        })
    }, function () {
        // console.log('取消后执行...');
    });
})
// 高德地图部分
var map = new AMap.Map("machineMap", {
    resizeEnable: true,
    zoom: 15
});

var geocoder = new AMap.Geocoder({
    city: "", //城市设为北京，默认：“全国”
});
var marker = new AMap.Marker();
function geoCode() {
    // var address  = document.getElementById('address').value;
    var address = '广东省广州市越秀区丽丰中心';
    geocoder.getLocation(address, function (status, result) {
        if (status === 'complete' && result.geocodes.length) {
            var lnglat = result.geocodes[0].location; //经纬度
            console.log(lnglat)
            marker.setPosition(lnglat);
            map.add(marker);
            map.setFitView(marker);
        } else {
            // log.error('根据地址查询位置失败');
            layer.msg('根据地址查询位置失败', { icon: 2 })

        }
    });
};

// 时间初始化
var sStart_time = getKeyTime().startTime,
    send_time = getKeyTime().endTime;
$('#test08').val(getKeyTime().keyTimeData)
jeDate("#test08", {
    format: "YYYY-MM-DD",
    range: " - ",
    donefun: function (obj) {
        console.log(obj);
        var timerKey = obj.val.split(' - ');
        sStart_time = timerKey[0];
        send_time = timerKey[1]
        if (timeFlag(sStart_time, send_time)) {
            toastTitle('时间选择范围最多三个月', 'warn')
            return;
        }
        shipmenListArr(machineDetails.machineId, 1)
    },
    clearfun: function (ele, val) {
        // console.log(9999);
        sStart_time = getKeyTime().startTime;
        send_time = getKeyTime().endTime;
        shipmenListArr(machineDetails.machineId, 1)
    }
});
// 出货记录部分
$('.shipmentRd').click(function () {
    // console.log(machineDetails);
    $('.shipmentContent .sHeader').html(`${machineDetails.info}出货记录`)
    showPopup('.shipmentContent', '.shipmentBox', 'top0');
    shipmenListArr(machineDetails.machineId, 1)
});

// 出货记录返回
$('.shipmentContent .close').click(function () {
    closeParents(this, 'top0');
    $('.hui-picker').hide();
});

// 获取出货记录
function shipmenListArr(mId, mNum) {
    var sObj = JSON.stringify({
        machineId: mId,
        pageNum: mNum,
        pageSize: 10,
        start_time: sStart_time,
        end_time: send_time
    });
    loadAjax(`/machine/getShippingList`, 'post', sessionStorage.token, sObj).then(res => {
        console.log(res)
        if (mNum == 1) {
            if (res.data.list.length == 0) {
                $('.pages1').hide();
                $('.shipmenList').html('<h2>暂无数据</h2>');
                return;
            }
            pageN(res.data.total, '.pages1');
            $('.pages1').show()
        } else {
            $('.pages1').show()
        }
        var str = '';
        res.data.list.forEach(item => {
            str += `<li>
                    <div class="keyText flex">
                        <label for="">出货时间:</label>
                        <p>${item.create_time ? timeStamp(item.create_time) : '-'}</p>
                    </div>
                    <div class="keyText flex">
                        <label for="">商品名(编号):</label>
                        <p>${item.good_name_core ? item.good_name_core : ''}</p>
                    </div>
                    <div class="keyText flex">
                        <label for="">出货状态:</label>
                        <p>${item.ship_status == 0 ? '出货失败' : item.ship_status == 1 ? '出货成功' : '货道故障'}</p>
                    </div>
                    <div class="keyText flex">
                        <label for="">出货前数量:</label>
                        <p>${item.before_count}</p>
                    </div>
                    <div class="keyText flex">
                        <label for="">出货后数量:</label>
                        <p>${item.ship_status == 1 ? item.before_count - 1 : item.before_count}</p>
                    </div>
                    <div class="keyText flex">
                        <label for="">出货类型:</label>
                        <p>${item.ship_type == 1 ? '订单' : '取货码'}</p>
                    </div>
                    <div class="keyText flex">
                        <label for="">出货货道:</label>
                        <p>${item.way}</p>
                    </div>
                    <div class="keyText flex">
                        <label for="">订单号/取货码:</label>
                        <p>${item.order_code}</p>
                    </div>
                </li>`
        });
        $('.shipmenList').html(str)
    }).catch(err => {
        console.log(err)
        toastTitle(err.message, 'error');
    })
};

// 分页页面方法
function pageN(conut, ele) {
    var Num = (Number(conut) / 10)
    Num = Num % 1 == 0 ? Num : Num + 1
    // console.log(Math.floor(Num))
    var ForNum = Math.floor(Num)
    var pageStr = ''
    for (let i = 0; i < ForNum; i++) {
        pageStr += ` <div class="pageVal ${i == 0 ? 'hui-pager-active' : ''}"  val="${i + 1}"><a href="javascript:hui.toast('第${i + 1}页');" >${i + 1}</a></div>`
    };
    $(`${ele} .hui-pager`).html(pageStr)
};
// 出货记录点击分页
$('.pages1').on('click', '.pageVal', function () {
    $(this).addClass('hui-pager-active').siblings().removeClass('hui-pager-active')
    shipmenListArr(machineDetails.machineId, Number($(this).attr('val')));
});

// 补货记录部分
$('.Rrecord').click(function () {
    $('.rMentContent .rHeader').html(`${machineDetails.info}补货记录`);
    showPopup('.rMentContent', '.rMentBox', 'top0');
    rMentListArr(machineDetails.machineId, 1)
})
// 出货记录返回
$('.rMentContent .close').click(function () {
    closeParents(this, 'top0');
    $('.hui-picker').hide();
});

var rStart_time = getKeyTime().startTime,
    rend_time = getKeyTime().endTime;
    $('#test09').val(getKeyTime().keyTimeData)
jeDate("#test09", {
    format: "YYYY-MM-DD",
    range: " - ",
    donefun: function (obj) {
        console.log(obj);
        var timerKey = obj.val.split(' - ');
        rStart_time = timerKey[0];
        rend_time = timerKey[1]
        if (timeFlag(rStart_time, rend_time)) {
            toastTitle('时间选择范围最多三个月', 'warn')
            return;
        }
        rMentListArr(machineDetails.machineId, 1)
    },
    clearfun: function (ele, val) {
        rStart_time = getKeyTime().startTime;
        rend_time = getKeyTime().endTime;
        rMentListArr(machineDetails.machineId, 1)
    }
});
function rMentListArr(mId, mNum) {
    var rObj = JSON.stringify({
        machineId: mId,
        pageNum: mNum,
        pageSize: 10,
        start_time: rStart_time,
        end_time: rend_time
    });
    loadAjax(`/machine/getReplenish`, 'post', sessionStorage.token, rObj).then(res => {
        if (mNum == 1) {
            if (res.data.list.length == 0) {
                $('.pages2').hide();
                $('.rMentList').html('<h2>暂无数据</h2>');
                return;
            }
            pageN(res.data.total, '.pages2');
            $('.pages2').show();
        } else {
            $('.pages2').show()
        };
        var str = '';
        res.data.list.forEach(item => {
            str += `   <li>
                        <div class="keyText flex">
                            <label for="">补货人</label>
                            <p>${item.name}(${item.username})</p>
                        </div>
                        <div class="keyText flex">
                            <label for="">补货时间:</label>
                            <p>${item.replenish_time ? timeStamp(item.replenish_time) : '-'}</p>
                        </div>
                        <div class="keyText flex">
                            <label for="">补货货道:</label>
                            <p>${item.way}</p>
                        </div>
                        <div class="keyText flex">
                            <label for="">商品名:</label>
                            <p>${item.goods_Name}</p>
                        </div>
                        <div class="keyText flex">
                            <label for="">补货前数量:</label>
                            <p>${item.after_count - item.replenish_count}</p>
                        </div>
                        <div class="keyText flex">
                            <label for="">补货数量:</label>
                            <p>${item.replenish_count}</p>
                        </div>
                        <div class="keyText flex">
                            <label for="">补货后数量:</label>
                            <p>${item.after_count}</p>
                        </div>
                    </li>`
        });
        $('.rMentList').html(str)
    }).catch(err => {
        console.log(err)
        toastTitle(err.message, 'error');
    });
}
// 补货记录点击分页
$('.pages2').on('click', '.pageVal', function () {

    $(this).addClass('hui-pager-active').siblings().removeClass('hui-pager-active')
    rMentListArr(machineDetails.machineId, Number($(this).attr('val')));
});

// 销售记录
$('.salesDetails').click(function () {
    console.log(machineDetails);
    $('.salesContent .salesheader').html(`${machineDetails.info}销售详情`);
    showPopup('.salesContent', '.salesBox', 'top0');
    salesListArr(machineDetails.machineId, 1)
});
// 出货记录返回
$('.salesContent .close').click(function () {
    closeParents(this, 'top0');
    $('.hui-picker').hide();
});
var saStart_time = getKeyTime().startTime,
    saend_time = getKeyTime().endTime;
    $('#test10').val(getKeyTime().keyTimeData)
jeDate("#test10", {
    format: "YYYY-MM-DD",
    range: " - ",
    donefun: function (obj) {
        console.log(obj);
        var timerKey = obj.val.split(' - ');
        saStart_time = timerKey[0];
        saend_time = timerKey[1]
        console.log(saStart_time, saend_time);
        if (timeFlag(saStart_time, saend_time)) {
            toastTitle('时间选择范围最多三个月', 'warn')
            return;
        }
        salesListArr(machineDetails.machineId, 1)
    },
    clearfun: function (ele, val) {
        saend_time = getKeyTime().startTime;
        saend_time = getKeyTime().endTime;
        salesListArr(machineDetails.machineId, 1)
    }
});
// 销售详情方法
function salesListArr(mId, mNum) {
    var salesObj = JSON.stringify({
        condition: mId,
        pageNum: mNum,
        pageSize: 10,
        conditionTwo: saStart_time,
        conditionThree: saend_time
    });
    loadAjax('/machine/getSalesList', 'post', sessionStorage.token, salesObj).then(res => {
        if (mNum == 1) {
            if (res.data.list.length == 0) {
                $('.pages3').hide();
                $('.salesList').html('<h2>暂无数据</h2>');
                return;
            }
            pageN(res.data.total, '.pages3');
            $('.pages3').show()
        } else {
            $('.pages3').show()
        };
        var str = '';
        res.data.list.forEach(item => {
            str += `<li>
                    <div class="keyText flex">
                        <label for="">时间:</label>
                        <p>${timeStamp(item.time)}</p>
                    </div>
                    <div class="keyText flex">
                        <label for="">订单号:</label>
                        <p>${item.number}</p>
                    </div>
                    <div class="keyText flex">
                        <label for="">支付状态:</label>
                        <p>${item.payResult} </p>
                    </div>
                    <div class="keyText flex">
                        <label for="">支付方式:</label>
                        <p>${item.payTypes} </p>
                    </div>
                    <div class="keyText flex">
                        <label for="">收款方:</label>
                        <p>${item.payee}</p>
                    </div>
                    <div class="keyText flex">
                        <label for="">金额:</label>
                        <p>${item.amount}</p>
                    </div>
                </li>`
        });
        $('.salesList').html(str);
    }).catch(err => {
        console.log(err)
        toastTitle(err.message, 'error');
    });
}
// 销售记录点击分页
$('.pages3').on('click', '.pageVal', function () {
    $(this).addClass('hui-pager-active').siblings().removeClass('hui-pager-active')
    salesListArr(machineDetails.machineId, Number($(this).attr('val')));
});

// 商户数部分
var merchantsArr = treeList(sessionStorage.machineID);
// 点击右上角按钮弹出商户树
$('.hui-icons-menu-point').click(function () {
    if (merchantsArr.length == 0) {
        toastTitle('您没有查看下级商户的权限', 'warn');
        return;
    };
    showPopup('.merchantsContent', '.merchantsBox', 'top0');
})

// 点击遮罩隐藏
$('.merchantsBox').click(function () {
    event.stopPropagation();
});
$('.merchantsContent').click(function () {
    closeWindow(this, 'top0');
});



let dom = '<ul class="sire">';
function getTree(data) {
    $.each(data, (index, item) => {
        if (item.children && item.children.length) {
            dom += `<li class="parent "> <img indexFlag="1" class="nextImg" src="${require('../../../img/next.png')}" alt=""> <span class="${index == 0 ? 'navFocus' : ''}" mId="${item.id}">${item.title}</span> <ul class="parentOne">`
            getTree(item.children)
            dom += `</ul>`
        } else {
            dom += `<li> <img src="${require('../../../img/user-group .png')}" alt=""> <span mId="${item.id}">${item.title}</span>`
        }
        dom += '</li>'

    })
}
getTree(merchantsArr);
dom += '</ul>'
$('.merchantsBox').html(dom);

// 点击商户树
$('.merchantsBox').on('click', '.parent span', function () {
    $('.merchantsBox .parent span').removeClass('navFocus');
    $(this).addClass('navFocus');
    // console.log($(this).attr('mId'))
    merchantIdStr = Number($(this).attr('mId'));
    pageNum = 1;
    getMachineListTwo();
});

// 商户树展开收起
$('.merchantsBox').on('click', '.nextImg', function () {
    if ($(this).attr('indexFlag') == 1) {
        $(this).attr('indexFlag', 2);
        $(this).addClass('navImg')
    } else {
        $(this).attr('indexFlag', 1);
        $(this).removeClass('navImg')
    }
    $(this).siblings('.parentOne').slideToggle();
});

// 远程开门部分
$('.openDoor').click(function () {
    showPopup('.aloneContent', '.aloneBox', 'top30')
})
$('.aloneBox').click(function () {
    event.stopPropagation();
});
$('.aloneContent').click(function () {
    closeWindow(this, 'top30');
})
// 确定
// $('.aloneContent .confirmBtn').click(function(){
//         if(!$('.aloneContent input[name="alonePass"]').val()){
//             toastTitle('请输入独立密码','warn');
//             return ;
//         }
//         // machineDetails.machineId 机器id
//         var alonePassObj=JSON.stringify({
//             alonePwd:hex_md5($('.aloneContent input[name="alonePass"]').val())
//         });
//         loadingWith('正在编辑，请稍后')
//         loadAjax('/user/verifyAlonePwd','post',sessionStorage.token,alonePassObj,).then(res=>{
//             loadAjax('/openTheDoor','post',sessionStorage.token,JSON.stringify({machine:machineDetails.machineId}),'mask').then(err=>{

//             }).catch(err=>{

//             })
//         }).catch(err=>{
//             toastTitle
//         })
// })
// 引入底部导航栏;
// 清除货道故障
$('.clearingBtn').click(function () {
    hui.confirm('清除货道故障?', ['取消', '确定'], function () {
        loadingWith('正在操作，请稍后');
        loadAjax('/machine/clearLockMachineWay', 'post', sessionStorage.token, JSON.stringify({ machineId: machineListId }), 'mask').then(res => {
            toastTitle(res.message, 'success');
        }).catch(err => {
            toastTitle(err.message, 'error')
        })
    })

});
// $('.undoAisleBtn').click(function(){
//     hui.confirm('清除货道故障？', ['取消','确定'], function(){
//         loadingWith('正在操作，请稍后');
//         loadAjax('/machine/clearLockMachineWay','post',sessionStorage.token,JSON.stringify({machineId:machineListId})).then(res=>{
//             toastTitle(res.message, 'success');
//             closeWindow('.operationList','top0');
//         }).catch(err=>{
//             toastTitle(err.message, 'error')
//         })
//     })
// });
$('.undoAisleBtn').click(function () {
    hui.confirm('确定撤货？', ['取消', '确定'], function () {
        loadingWith('正在操作，请稍后');
        loadAjax('/machine/removeGoodWay', 'post', sessionStorage.token, JSON.stringify({ machineId: machineListId }), 'mask').then(res => {
            toastTitle(res.message, 'success');
            closeWindow('.operationList', 'top0');
        }).catch(err => {
            toastTitle(err.message, 'error')
        })
    })
})
$('.panelContent .close').click(function () {
    closeParents(this, 'top0');
    $('.hui-picker').hide();
});
// 展板列表
var panelArrVal = null;
function panelListFun() {
    loadAjax('/machine/getDisplayGood', 'post', sessionStorage.token, JSON.stringify({ machineId: machineListId })).then(res => {
        console.log(res);
        panelArrVal = res.data;
        panelaList(panelArrVal);
    }).catch(err => {
        toastTitle(err.message, 'error');
    })
};
$('.panelDetails').click(function () {
    panelListFun();
    showPopup('.panelContent', '.panelBox', 'top0');
})
function panelaList(list) {
    var pStr = '';
    list.forEach((item, index) => {
        pStr += `  <div class="hui-swipe-do ">
            <div class="hui-swipe-do-doms ">
                <div class="hui-swipe-do-content panelList" data-panelData='${JSON.stringify(item)}'>
                    <div class=" flex">
                        <img src="${item.goods_images}" alt="">
                        <div class="panelRight">
                            <h4>${item.goods_Name}</h4>
                            <p><span>数量:</span>${item.goodCount}</p>
                            <p><span>原数量:</span>${item.oldGoodCount}</p>
                        </div>
                    </div>
                   
                </div>
                <div class="hui-swipe-do-btn delBtn" delIndex="${index}">移除</div>
            </div>
        </div>`
    });
    $('.panelDrawing').html(pStr);
    hui.swipeDo();
};
$('.panelDrawing').on('click', '.delBtn', function () {
    var taht = this;
    console.log($(this).attr('delIndex'));
    console.log(panelArrVal[$(this).attr('delIndex')])
    // return ;
    hui.confirm('确定移除？', ['取消', '确定'], function () {
        loadingWith('正在操作，请稍后');
        var panelDelObj = JSON.stringify({
            machineId: machineListId,
            goodId: panelArrVal[$(taht).attr('delIndex')].goods_Id
        })
        loadAjax('/machine/removeDisplayGoodCount', 'post', sessionStorage.token, panelDelObj, 'mask').then(res => {
            toastTitle(res.message, 'success');
            panelListFun();
        }).catch(err => {
            toastTitle(err.message, 'error');
        })
    })
});
// 点击添加展板
var panelIndex = null;
$('.addPanelBtn').click(function () {
    panelIndex = 1
    $('.editiAsleBody input[name="goodsName"]').attr('IVal', '');
    $('.editiAsleBody input[name="goodsName"]').val('');
    $('.editiAsleBody input[name="goodsNum"]').val('');
    showPopup('.editAisleContent', '.editAisleBox', 'top30');
});
// 点击编辑
$('.panelDrawing').on('click', '.panelList', function () {
    panelIndex = 2;
    var paneldata = $(this).data('paneldata');
    $('.editiAsleBody input[name="goodsName"]').attr('IVal', paneldata.goods_Id);
    $('.editiAsleBody input[name="goodsName"]').val(paneldata.goods_Name);
    $('.editiAsleBody input[name="goodsNum"]').val(paneldata.goodCount);
    console.log($(this).data('paneldata'));
    showPopup('.editAisleContent', '.editAisleBox', 'top30');
})
// 关闭添加展板
$('.editAisleBox .close').click(function () {
    closeParents(this, 'top30')
});
$('.editAisleBox').click(function () {
    event.stopPropagation();
});
$('.editAisleContent').click(function () {
    closeWindow(this, 'top30')
});
// 点击选择商品
$('.editAisleContent .goodsChoose').click(function () {
    showPopup('.goodsContnet', '.goodsBox', 'top50');
    goodsListArr(merchantIdStr, 1);
});
// 关闭商品
$('.goodsContnet .close').click(function(){
    closeParents(this, 'top30')
});
$('.goodsBox').click(function () {
    event.stopPropagation();
});
$('.goodsContnet').click(function () {
    closeWindow(this, 'top30')
});
// 商品列表
function goodsListArr(mId, mNum) {
    var goodsObj = JSON.stringify({
        pageNum: mNum,
        pageSize: 10,
        condition: mId,
        conditionFour: '1',
        conditionTwo: $('.goodsBody input[name="editName"]').val()
    });
    loadAjax('/goods/findAll', 'post', sessionStorage.token, goodsObj, 'mask').then(res => {
        if (mNum == 1) {
            if (res.data.list.length == 0) {
                $('.pages4').hide();
                $('.goodsList').html('<h2 style="text-align: center;">暂无数据</h2>');
                return;
            }
            pageN(res.data.total, '.pages4');
            $('.pages4').show()
        } else {
            $('.pages4').show()
        }
        var goodsStr = '';
        res.data.list.forEach((item, index) => {
            goodsStr += `<div class="chooseList" mail="${item.mail}" gID="${item.goods_Id}" gName="${item.goods_Name}">
                                <div class="goodsImg">
                                    <img src="${item.goods_images}"
                                        alt="">
                                </div>
                                <div class="goodsInformation">
                                    <p>${item.mail == 1 ? '(邮寄)' + item.goods_Name : item.goods_Name}</p>
                                    <p>${item.classifyName}</p>
                                    <div class="flexThree">
                                        <p>编号</p>
                                        <span>${item.goods_Core}</span>
                                    </div>
                                    <div class="flexThree">
                                        <p>销售价</p>
                                        <span>￥${item.goods_Price}</span>
                                    </div>
                                </div>
                            </div>`
        });
        $('.goodsList').html(goodsStr);
    }).catch(err => {
        toastTitle(err.message, 'error');
    })
};
// 筛选商品搜索
$('.goodsContnet .goodConfirmBtn').click(function () {
    goodsListArr(merchantIdStr, 1);
});
// 点击选择商品
$('.goodsWrap').on('click', '.chooseList', function () {
    // console.log($(this).attr('gName'))
    $('.editiAsleBody input[name="goodsName"]').val($(this).attr('mail') == 1 ? '(邮寄)' + $(this).attr('gName') : $(this).attr('gName'));
    $('.editiAsleBody input[name="goodsName"]').attr('IVal', $(this).attr('gID'));
    closeParents(this, 'top50')
});
$('.pages4').on('click', '.pageVal', function () {
    $(this).addClass('hui-pager-active').siblings().removeClass('hui-pager-active')
    goodsListArr(merchantIdStr, Number($(this).attr('val')));
});

//展板确定
$('.editAisleBox  .panelConfirmBtn').click(function () {
    if (!$('.editAisleBox input[name="goodsName"]').val()) {
        toastTitle('请选择商品', 'warn');
        return;
    }
    if (!$('.editAisleBox input[name="goodsNum"]').val()) {
        toastTitle('请填写数量', 'warn');
        return;
    };
    loadingWith('正在操作，请稍后');
    var panelApi = panelIndex == 1 ? '/machine/newDisplayGood' : '/machine/updateDisplayGoodCount';
    var panelAddObj = JSON.stringify({
        machineId: machineDetails.machineId,
        goodId: Number($('.editiAsleBody input[name="goodsName"]').attr('IVal')),
        goodCount: Number($('.editAisleBox input[name="goodsNum"]').val()),
    });
    loadAjax(panelApi, 'post', sessionStorage.token, panelAddObj, 'mask', '.editAisleContent').then(res => {
        toastTitle(res.message, 'success');
        panelListFun();
        $('.editiAsleBody input[name="goodsName"]').attr('IVal', '');
        $('.editiAsleBody input[name="goodsName"]').val('');
        $('.editiAsleBody input[name="goodsNum"]').val('');
    }).catch(err => {
        toastTitle(err.message, 'error');
    })
})
$('#footer').load('M_footerNav.html');