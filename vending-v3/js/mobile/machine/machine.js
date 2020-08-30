import '../../../MyCss/mobile/machine/machine.scss';
import { loadAjax, loadingWith, loadingOut, toastTitle, showPopup, closeParents, closeWindow, passRegular } from '../../../common/common.js'
// loadingWith('正在加载');
//条件筛选数据、事件
var pageNum = 1,
    pageSize = 10,
    actionIndex='',//激活
    onlineIndex='',//在线状态
    permissionsIndex='',//营业状态
    CreationIndex='';//缺货状态
// 请求售货机列表
function getMachineList() {
    var machineData = JSON.stringify({
        pageNum,
        pageSize,
        merchantId: sessionStorage.machineID,
        onlineStatus:onlineIndex?Number(onlineIndex):'',
        actionStatus:actionIndex?Number(actionIndex):'',
        openStatus:permissionsIndex?Number(permissionsIndex):'',
        stockStatus:CreationIndex?Number(CreationIndex):''
    });
    loadAjax('/api/machine/getMachineList', 'post', sessionStorage.token, machineData, 'mask').then(res => {
        $('.allmachine span').html(res.data.total)
        if (res.data.list.length < 10) {
            hui.endLoadMore(true, '已加载全部数据');
            return false;
        }
        pageNum++;
        hui.endLoadMore();
        machineDrawing(res.data.list);
    }).catch(err => {
        toastTitle(err.message, 'error');
        hui.endLoadMore(true, '已加载全部数据');
    })
}
//    售货机渲染方法
function machineDrawing(mData) {
    var mstr = '';
    mData.forEach((item, index) => {
        mstr += `<div class="list myScale3d">
                    <p class="info">${item.info}</p>
                    <p class="address">${item.location}</p>
                    <ul class="status flex">
                        <li class="${item.actionStatus == 0 ? 'colorG' : 'colorYes'}">${item.actionStatus == 0 ? '未激活' : '已激活'}</li>
                        <li class="${item.onlineStatus == 0 ? 'colorNo' : 'colorYes'}" >${item.onlineStatus == 0 ? '离线' : '在线'}</li>
                        <li class="${item.openStatus == 0 ? 'colorG' : 'colorYes'}">${item.openStatus == 0 ? '无营业' : '正在营业'}</li>
                        <li class="${item.stockStatus == 0 ? 'colorYes' : item.stockStatus == 1 ? 'colorG' : 'colorNo'}">${item.stockStatus == 0 ? '货道正常' : item.stockStatus == 1 ? '一般缺货' : '严重缺货'}</li>
                    </ul>
                </div> `
    })
    $('.machineList').append(mstr)
}
// 上拉加载
// getMachineList();
hui.loadMore(getMachineList,'正在加载');

// 下拉刷新部分
function getMachineListTwo() {
    hui.loading('加载中...');
    
    pageNum=1;
    var machineData = JSON.stringify({
        pageNum,
        pageSize,
        merchantId: sessionStorage.machineID,
        onlineStatus:onlineIndex?Number(onlineIndex):'',
        actionStatus:actionIndex?Number(actionIndex):'',
        openStatus:permissionsIndex?Number(permissionsIndex):'',
        stockStatus:CreationIndex?Number(CreationIndex):''
    });
    var arrFlag=false;
    loadAjax('/api/machine/getMachineList', 'post', sessionStorage.token, machineData, 'mask').then(res => {
        $('.allmachine span').html(res.data.total);
        $('.machineList').empty();
        $('.machineList').html('<div class="hui-refresh-icon"></div>');
        if(res.data.list.length>0){
            arrFlag=true
        }
        if(!arrFlag){
            $('.machineList').append('<div class="empty">查询无数据</div>');
        }
        machineDrawing(res.data.list);
        //结束刷新
        hui.endRefresh();
        //重置加载更多状态
        hui.resetLoadMore();
    }).catch(err => {
        arrFlag=false;
        toastTitle(err.message, 'error');
        hui.endRefresh();
        //重置加载更多状态
        hui.resetLoadMore();
        return ;
    })
}
hui.refresh('#machineList', getMachineListTwo);

// 条件筛选部分
var actionIndex0='',
    onlineIndex0='',
    permissionsIndex0='',
    CreationIndex0='';
$('.actionStatus li').click(function(){
    $(this).addClass('green').siblings().removeClass('green');
    actionIndex0=$(this).attr('actionIndex');
})
$('.onlineStatus li').click(function(){
    $(this).addClass('yellow').siblings().removeClass('yellow');
    onlineIndex0=$(this).attr('onlineIndex');
})
$('.permissions li').click(function(){
    $(this).addClass('blue').siblings().removeClass('blue');
    permissionsIndex0=$(this).attr('permissionsIndex');
})
$('.CreationTime li').click(function(){
    $(this).addClass('red').siblings().removeClass('red');
    CreationIndex0=$(this).attr('CreationIndex');
})
$('.KeyInput button').click(function(){
    if(!actionIndex){
        $('.actionStatus li').eq(0).addClass('green').siblings().removeClass('green')
    }
    if(!onlineIndex){
        $('.onlineStatus li').eq(0).addClass('yellow').siblings().removeClass('yellow')
    }
    if(!permissionsIndex){
        $('.permissions li').eq(0).addClass('blue').siblings().removeClass('blue')
    }
    if(!CreationIndex){
        $('.CreationTime li').eq(0).addClass('red').siblings().removeClass('red')
    }
    showPopup('.conditionsCont','.conditionsHalf','top0')
})
// 防止事件冒泡
$('.conditionsHalf').click(function(){
    event.stopPropagation(); 
});
// 关闭弹窗
$('.conditionsCont').click(function(){
    closeWindow(this,'top0')
});
$('.conditionFooter .cancelBtn').click(function(){
    closeParents(this,'top0')
});


// 查询
$('.conditionFooter .confirmBtn').click(function(){
    actionIndex=actionIndex0;
    onlineIndex=onlineIndex0;
    permissionsIndex=permissionsIndex0;
    CreationIndex=CreationIndex0;
    console.log(actionIndex)
    getMachineListTwo();
    closeParents(this,'top0')
});

// 点击售货机事件
$('.machineList').on('click','.list',function(){
    showPopup('.operationList','.operationBox','top0')
});
// 关闭操作详情
$('.operationList .topHeader span').click(function(){
    closeParents(this,'top0')
});

// 收款账户部分
$('.paySetBtn').click(function(){
    showPopup('.collectionContent','.collectionBox','top30')
})
$('.collectionContent .close').click(function(){
    closeParents(this,'top30')
})
$('.collectionContent').click(function(){
    closeWindow(this,'top30')
})
$('.collectionBox').click(function(){
    event.stopPropagation(); 
})

// 点击货到详情事件
var frameWin=null;
$('.aisleDetalis').click(function(){
    $('.childConten').show();
    $('.childData').prop('src','M_machineChild.html');
    frameWin = $('#childData')[0].contentWindow;
    setTimeout(()=>{
        frameWin.ccc();
    },90)
  
    // console.log($('#childData'))
})
function machindID(){
    re
}