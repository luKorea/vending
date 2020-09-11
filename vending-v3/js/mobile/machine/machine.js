import '../../../MyCss/mobile/machine/machine.scss';
import { loadAjax, loadingWith, loadingOut, toastTitle, showPopup, closeParents, closeWindow,permissionsFun } from '../../../common/common.js';
// loadingWith('正在加载');
//返回上一页
$('#topHeader .back').click(function () {
    window.history.go(-1);
    window.location.href='M_managementCenter.html'
})
// 获取权限
var editFlag = false,//修改设备
activateFlag = false,//启动设备
// editAisleFlag = false,//修改货道
paySetFlag = false,//配置机器支付方式
// delAisleFlag = false,//删除货道
// addAisleFlag = false,//增加货道
AisleDetailsFlag = false,//货道详情
salesListFlag = false,//销售记录
shipmentListFlag = false;//出货记录
function permissions(){
    permissionsFun('/api/role/findUserPermission', 'post', sessionStorage.token).then(res=>{
        res.data.forEach(item => {
            if (item.id == '396') {
                editFlag = true;
            }
            if (item.id == '392') {
                activateFlag = true;
            }
            // if (item.id == '424') {
            //     editAisleFlag = true;
            // }
            if (item.id == '432') {
                paySetFlag = true;
            }
            // if (item.id == '426') {
            //     delAisleFlag = true;
            // }
            // if (item.id == '425') {
            //     addAisleFlag = true;
            // }
            if (item.id == '427') {
                AisleDetailsFlag = true;
            }
            if (item.id == '401') {
                salesListFlag = true;
            }
            if (item.id == '402') {
                shipmentListFlag = true;
            }
        });
        activateFlag?$('.actionStatusBtn').show():$('.actionStatusBtn').hide();
        AisleDetailsFlag?$('.aisleDetalis').show():$('.aisleDetalis').hide();
        paySetFlag?$('.paySetBtn').show():$('.paySetBtn').hide();
    }).catch(err=>{
        console.log(err)
    })
}
permissions();
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
        machineArr1=machineArr1.concat(res.data.list)
        // machineArr1=res.data.list;
        if(loadFlag){
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
                        <li class="${item.stockStatus == 0 ? 'colorYes' : item.stockStatus == 1 ? 'colorG' : 'colorNo'}">${item.stockStatus == 0 ? '货道正常' : item.stockStatus == 1 ? '一般缺货' : '严重缺货'}</li>
                    </ul>
                </div> `
        machineListIndex++
    })
    $('.machineList').append(mstr)
}
// 上拉加载
hui.loadMore(getMachineList, '正在加载');

// 下拉刷新部分
var loadFlag=false;
function getMachineListTwo() {
    hui.loading('加载中...');
    machineArr1=[];
    machineArr2=[];
    pageNum = 1;
    machineListIndex=0;
    var machineData = JSON.stringify({
        pageNum,
        pageSize,
        merchantId: sessionStorage.machineID,
        onlineStatus: onlineIndex ? Number(onlineIndex) : '',
        actionStatus: actionIndex ? Number(actionIndex) : '',
        openStatus: permissionsIndex ? Number(permissionsIndex) : '',
        stockStatus: CreationIndex ? Number(CreationIndex) : '',
        keyword,
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
        if(res.data.list.length <10){
            loadFlag=false
        }else{
            loadFlag=true;
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
    keyword='';
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
    keyword=$('.KeyInput input[name="key"]').val();
    // console.log($('.KeyInput input[name="key"]').val())
    getMachineListTwo();
    closeParents(this, 'top0')
});

// 点击售货机事件
var machineListId = null;//机器id;
var machineIndex=null;//售货机数组下标
$('.machineList').on('click', '.list', function () {
    showPopup('.operationList', '.operationBox', 'top0');
    machineListId = $(this).attr('machineid');
    machineIndex=$(this).attr('machinelistindex');
    console.log(machineIndex);
    $('.machineTitle').html(machineArr1[machineIndex].info+'终端信息')
    machineDetails=machineArr1[machineIndex];
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
// supportpay("6241739031f5ad41", 58);
// 修改收款账户
// 机器信息
var machineDetails=null;
$('#form1').on('change', 'input[type="radio"]', function () {
    if(!paySetFlag){
        toastTitle('您没有修改收款账户得权限','warn');
        return ;
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
        loadAjax('/api/pay/updateMachinePayParam', 'post', sessionStorage.token, setMachinePay, 'mask').then(res => {
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

$('.operationNav .info').click(function(){
    // console.log()
    showPopup('.terminalContent', '.terminalBox', 'top0');
    // var data = hui.getFormData('#form2');
    console.log(machineArr1[machineIndex]);
    if(machineDetails.openStatus==1||(!editFlag)){
        toastTitle(editFlag?'温馨提示！该售货机正在营业，不可进行编辑！':'您没有编辑设备的权限','warn');
        $('.terminalContent input').prop('disabled',true);
        $('.terminalContent .terminalFooter').hide()
    }else{
        $('.terminalContent input').prop('disabled',false);
        $('.terminalContent .terminalFooter').show();
        $('.terminalContent input[name="merchantsNametext"]').prop('disabled',true);
        $('.terminalContent input[name="number"]').prop('disabled',true);
        $('.terminalContent input[name="merchantsName"]').prop('disabled',true);
    }
    $('.terminalContent input[name="sNumber"]').val(machineDetails.number);
    $('.terminalContent input[name="name"]').val(machineDetails.info);
    $('.terminalContent input[name="number"]').val(machineDetails.machineId);
    var region=machineDetails.location.split(' ')
    $('.province').html(region[0]+' '+region[1]+' '+region[2]);
    $('.terminalContent input[name="mapVal"]').val(region[3]);
    $('.terminalContent input[name="area"]').val(machineDetails.area);
    $('.terminalContent input[name="longitude"]').val(machineDetails.longitude);
    $('.terminalContent input[name="latitude"]').val(machineDetails.latitude);
    $('.terminalContent input[name="headPhone"]').val(machineDetails.chargerPhone);
    $('.terminalContent input[name="describe"]').val(machineDetails.description);
    $('.terminalContent input[name="merchantsNametext"]').val(machineDetails.merchantName);
    $('.terminalContent input[name="merchantsName"]').val(machineDetails.userNum);
});
// 关闭
$('.terminalContent .close').click(function(){
    closeParents(this,'top0');
    $('.hui-picker').hide();
})

// 选择省市区
var picker2 = new huiPicker('#province', function() {
    var sheng = picker2.getText(0);
    var shi = picker2.getText(1);
    var qu = picker2.getText(2);
    hui('#province').html(sheng+' ' + shi+' ' + qu);
});
picker2.level = 3;
//cities 数据来源于 cities.js
picker2.bindRelevanceData(cities);

// 确定修改
$('.terminalContent .confirmBtn').click(function(){
    var machineInformation = hui.getFormData('#form2');
    console.log(machineInformation);
    if(machineInformation.sNumber && machineInformation.name && machineInformation.number  && machineInformation.mapVal && machineInformation.area && machineInformation.merchantsName&&machineInformation.longitude&&machineInformation.latitude){
        var editMachine=JSON.stringify({
            number: machineInformation.sNumber,
            info:machineInformation.name,
            machineId:machineInformation.number,
            location:$('.province').html()+' '+$('.terminalContent input[name="mapVal"]').val(),
            area:machineInformation.area,
            longitude:machineInformation.longitude,
            latitude:machineInformation.latitude,
            userNum:machineInformation.merchantsName,
            chargerPhone:machineInformation.headPhone,
            description:machineInformation.describe
        });
        loadingWith('正在编辑，请稍后')
        loadAjax('/api/machine/updateMachine','post',sessionStorage.token,editMachine,'mask').then(res=>{
            toastTitle(res.message,'success');
            getMachineListTwo();
        }).catch(err=>{
            console.log(err)
            toastTitle(err.message,'error')
        })
    }else{
        toastTitle('带*为必填','warn')
    }
})

// 远程操作
$('.remoteOperation').click(function(){
    showPopup('.remoteCont','.remoteBox','top30')
    if(machineDetails.actionStatus==1){
        $('.actionStatusBtn').hide();
    }else{
        $('.businessBtn ').hide();
    }
    if(machineDetails.actionStatus==0){
        $('.businessBtn p').html('营业')
    }else{
        $('.businessBtn p').html('暂停营业')
    }
})
$('.remoteBox').click(function(){
    event.stopPropagation();
});
// 关闭
$('.remoteCont').click(function(){
    closeWindow(this,'top30')
})
// 营业操作
$('.businessBtn').click(function(){
    if(machineDetails.onlineStatus!=1){
        toastTitle('售货机处于离线状态不可以操作此功能','warn');
        return ;
    }
        hui.confirm(machineDetails.actionStatus==0?'确定营业？':'确定暂停营业？', ['取消','确定'], function(){
            var action=machineDetails.actionStatus==0?'true':'false';
            var openStatus=machineDetails.actionStatus==0?'1':'0'
            loadingWith('正在操作，请稍后');
            loadAjax('/api/machine/getStatus','post',sessionStorage.token,JSON.stringify({machineId: machineDetails.machineId}),'mask').then(Dres=>{
                var statusType = JSON.parse(Dres.data);
                if (statusType.actionStatus == 1) {
                    loadAjax('/api/pushActive','post',sessionStorage.token,JSON.stringify({machine: machineDetails.machineId,
                        action,}),'mask').then(res=>{
                            toastTitle(res.message,'warn')
                        }).catch(err=>{
                            if(err=='true'){
                                loadAjax('/api/machine/activeMachine','post',sessionStorage.token,JSON.stringify({achine: machineDetails.machineId,openStatus,}),'mask').then(res=>{
                                    machineDetails=statusType;
                                    toastTitle('操作成功','success');
                                    getMachineListTwo();
                                    if(machineDetails.actionStatus==0){
                                        $('.businessBtn p').html('营业')
                                    }else{
                                        $('.businessBtn p').html('暂停营业')
                                    }     
                                }).catch(err=>{
                                    console.log(err)
                                    toastTitle('操作失败','error')
                                })
                            }else{
                                toastTitle('操作失败','error')
                            }
                        })
                }else{
                    toastTitle('该设备未激活,无法进行营业操作','warn')
                }
            }).catch(err=>{
                toastTitle(err.message,'error')
            })
        },function(){
            console.log('取消后执行...');
        });
});
// 激活操作
$('.actionStatusBtn').click(function(){
    hui.confirm('确定激活该售货机？', ['取消','确定'], function(){
        loadingWith('正在激活，请稍后!')
        loadAjax('/api/machine/activeMachine','post',sessionStorage.token,JSON.stringify({machineId:machineDetails.machineId,actionStatus:'1'}),'mask').then(res=>{
            toastTitle(res.message,'success');
            machineDetails.actionStatus=1;
            $('.actionStatusBtn').hide();
            $('.businessBtn ').show();
            getMachineListTwo();
        }).catch(err=>{
            toastTitle(err.message,'error')
        })
    },function(){
        // console.log('取消后执行...');
    });
})
 // 高德地图部分
 var map = new AMap.Map("machineMap", {
    resizeEnable: true,
    zoom:15
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
