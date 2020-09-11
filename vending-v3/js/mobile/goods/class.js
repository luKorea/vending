import '../../../MyCss/mobile/goods/class.scss';
import { loadAjax, loadingWith, loadingOut, toastTitle, showPopup, closeParents, closeWindow ,wholeNum,permissionsVal} from '../../../common/common.js';
var addFlag=false,
editFlag=false,
delFlag=false,
fourFlag=false;
permissionsVal(373,374,372,403).then(res=>{
    addFlag=res.addFlag;
    editFlag=res.editFlag;
    delFlag=res.delFlag;
    fourFlag=res.fourFlag;
    addFlag?$('.addBtn').show():$('.addBtn').hide();
});
var pageNum = 1,
    pageSize = 10,
    classArr=[],
    classifyName='';
    // 下拉刷新方法
    var machineListIndex=0;//数组下标
var loadFlag=false;//判断第一次加载是数据长度
function getGoodsClassOne(){
    hui.loading('加载中...');
    classArr=[];
    pageNum=1;
    machineListIndex=0;
    var goodsClassObj=JSON.stringify({
        pageNum,
        pageSize,
        merchantId: sessionStorage.machineID,
        classifyName,
    });
    var arrFlag = false;
    loadAjax('/api/classify/findAll','post',sessionStorage.token,goodsClassObj,'mask').then(res=> {
        classArr=res.data.list;
        $('.classList').empty();
        $('.classList').html('<div class="hui-refresh-icon"></div>');
        if (res.data.list.length > 0) {
            arrFlag = true
        }
        if(res.data.list.length <10){
            loadFlag=false
        }else{
            loadFlag=true;
        }
        if (!arrFlag) {
            $('.classList').append('<div class="empty">查询无数据</div>');
        }
        classDrawing(res.data.list);
        //结束刷新
        hui.endRefresh();
        //重置加载更多状态
        hui.resetLoadMore();
    }).catch(err=>{
        toastTitle(err.message,'error')
        hui.endRefresh();
        //重置加载更多状态
        hui.resetLoadMore();
        return;
    })
    
}

// 下拉刷新
hui.refresh('#classList', getGoodsClassOne);
// 列表渲染
function classDrawing(cData){
    var cstr='';
    cData.forEach((item,index)=>{
        cstr+=`<div class="hui-swipe-do list">
                    <div class="hui-swipe-do-doms">
                        <div class="hui-swipe-do-content" classIndex="${machineListIndex}">
                                <div class=" flex" style="padding: 0.15rem 0;">
                                    <div class="rank ${fourFlag?'':'hides'}">
                                        <img src="${require("../../../img/ascension.png")}" classIndex="${machineListIndex}"  class="${item.rank==1?'hides':''}" alt="">
                                    </div>
                                    <div class="classInformation">
                                        <div class="flex rankTitle"><p>排序:</p><span>${item.rank}</span></div>
                                        <div class="flex"><p>类目名:</p><span>${item.classifyName}</span></div>
                                        <div class="flex"><p>备注:</p><span>${item.remark}</span></div>
                                    </div>
                                </div>
                        </div>
                        <div class="hui-swipe-do-btn delBtn" classIndex="${machineListIndex}" >删除</div>
                    </div>
            </div>`
            machineListIndex++
    });
    $('.classList').append(cstr);
    if(!delFlag){
        $('.delBtn').hide();
    }
    
    hui.swipeDo();
};

// 上拉刷新
function getGoodsClassTwo(){
    pageNum++;
    var goodsClassObj=JSON.stringify({
        pageNum,
        pageSize,
        merchantId: sessionStorage.machineID,
        classifyName,
    })
    loadAjax('/api/classify/findAll','post',sessionStorage.token,goodsClassObj).then(res=> {
        classArr=classArr.concat(res.data.list);
        if(loadFlag){
            classDrawing(res.data.list);           
        }
        if (res.data.list.length < 10) {
            hui.endLoadMore(true, '已加载全部数据');
            return false;
        }
        hui.endLoadMore();
    }).catch(err=>{
        toastTitle(err.message, 'error');
        hui.endLoadMore(true, '已加载全部数据');
    })
}
// 上拉加载
hui.loadMore(getGoodsClassTwo, '正在加载');

// 删除
$('.classList').on('click','.delBtn',function(){
    var delData=classArr[$(this).attr('classIndex')]
    hui.confirm('确定删除？', ['取消','确定'], function(){
        loadingWith('正在删除，请稍后')
       var delObj=JSON.stringify({
        id:delData.classifyId,
        rank:delData.rank,
        merchantId:delData.merchantId
       });
       loadAjax('/api/classify/deleteById','post',sessionStorage.token,delObj,'mask').then(res=>{
        toastTitle(res.message,'error');
        getGoodsClassOne();
       }).catch(err=>{
           console.log(err);
           toastTitle(err.message,'error');
           
       })
    },function(){
        
    });
});


//添加部分
$('.addBtn').click(function(){
    showPopup('.addClassCont','.addClassBox','top30')
});
// 关闭
$('.addClassCont .close').click(function(){
    closeParents(this,'top30')
});
$('.addClassBox').click(function(){
    event.stopPropagation();
});
$('.addClassCont').click(function(){
    closeWindow(this,'top30')
});
// 确定添加
$('.addFooter .confirmBtn').click(function(){
    if(!$('.addClassCont input[name="name"]').val()){
        toastTitle('类名名不能为空','warn');
        return; 
    };
    var addClassobj=JSON.stringify({
        merchantId:Number(sessionStorage.machineID),
        classifyName:$('.addClassCont input[name="name"]').val(),
        remark:$('.addClassCont input[name="note"]').val()
    });
    loadAjax('/api/classify/saveClassify','post',sessionStorage.token,addClassobj,'mask','.addClassCont','top30').then(res=>{
        toastTitle(res.message,'success');
        $('.addClassCont input[name="name"]').val('')
        $('.addClassCont input[name="note"]').val('')
        getGoodsClassOne();
    }).catch(err=>{
        toastTitle(err.message,'error');
    })
});

$('.classList .rank img').click(function(){
    alert(1)
});
// 修改排序
sessionStorage.classTag = sessionStorage.machineID;//修改排序的商户id
$('.classList').on('click','.rank img',function(){
    console.log($(this).attr('classIndex'));
    var rankObj=JSON.stringify({
        topId:classArr[$(this).attr('classIndex')].classifyId,
        bottomId:classArr[Number($(this).attr('classIndex'))-1].classifyId,
        merchantId: sessionStorage.classTag
    });
    loadingWith('正在更改，请稍后')
    loadAjax('/api/classify/sortClassify', 'post',sessionStorage.token,rankObj,'mask').then(res=>{
        toastTitle(res.message,'success')
    }).catch(err=>{
        toastTitle(err.message,'error')
    })
})