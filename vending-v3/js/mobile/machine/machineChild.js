import '../../../MyCss/mobile/machine/machineChild.scss';
import { loadAjax, loadingWith, loadingOut, toastTitle, showPopup, closeParents, closeWindow ,wholeNum} from '../../../common/common.js';

var parentWin = window.parent;
// console.log(parentWin)
$('.topHeader .back').click(function () {
    parentWin.hideChild();
})
var requestId = parentWin.machindID()

function loadChild(machine) {
    loadingWith('加载中...')
    var requestIdData = JSON.stringify({
        machineId: machine
    })
    loadAjax('/api/machine/getGoodWay', 'post', sessionStorage.token, requestIdData, 'mask').then(res => {
        console.log(res)
        againFun(res)
    }).catch(err => {
        console.log(err)
    })
}
loadChild(requestId);
// 渲染数据处理

function againFun(res) {
    var wayList = [],
        wayitem = [];
    for (var i = 0; i < res.data.length; i++) {
        wayitem.push([])
    }
    wayitem.forEach((item, index) => {
        res.data.forEach((ele, i) => {
            if ((index + 1) == ele.way) {
                wayitem[index].push(ele);
            }
        })
    })
    for (var i = 0; i < wayitem.length; i++) {
        if (wayitem[i].length > 0) {
            wayList.push(wayitem[i])
        }
    }
    console.log(wayList)
    aisleHtml(wayList);
};
function aisleHtml(machieList) {
    var aisleStar = '';
    machieList.forEach((item, index) => {
        aisleStar += `<ul class="aisleList flex">
                        <li class="listIndex">
                            <span>${index + 1}</span>
                        </li>`
        item.forEach((child, Cindex) => {
            aisleStar += ` <li class="aisleNumderGoods" fireIndex="${index + ',' + Cindex}" >
                            <div class="delCheckbox">
                            <div>
                                <input type="checkbox" class="delChoose" value="${child.id}" style="width: 20px;height: 20px;">
                                <span class="hui-icons hui-icons-toast "></span>
                            </div>
                            
                        </div>
                            <div class="numberTop">
                                <img src="${child.goods_images ? child.goods_images : 'http://172.16.71.142:8087/image/127b55b9-da32-4569-b740-3adf5e5524af.png'}" alt="">
                                <span>${Cindex + 1}</span>
                            </div>
                            <div class="numderBottom flex">
                                <div class="${child.open == 1 ? 'status1' : 'status2'} ">
                                    
                                    ${child.open == 1 ? '正常' : '禁用'}
                                </div>
                                <div >
                                    数量：${child.count}
                                </div>
                            </div>
                            <p>
                                ${child.goods_Name ? child.goods_Name : '-'}
                            </p>
                        </li>`
        });
        aisleStar += ` <li class="addAisle" indexVal="${index + 1}">
                        <span>+</span>
                    </li>
                    </ul>`

    });
    aisleStar += ` <ul class="aisleList flex">
                    <li class="listIndex">
                        <span>${ machieList.length + 1}</span>
                    </li>
                    <li class="addAisle" indexVal="${machieList.length + 1}">
                        <span>+</span>
                    </li>
                </ul>`
    $('.aisleCont').html(aisleStar);
    $('.aisleCont input').attr('checked', false)
}

// 验证独立密码
// function OPass(){
//     hui.prompt('验证独立密码', ['取消','确定'], function(name){
//         if(name){
//             var IPassWord=JSON.stringify({
//                 alonePwd: hex_md5(name)
//             });
//             loadingWith('正在验证，请稍后');
//             loadAjax('/api/user/verifyAlonePwd','post',sessionStorage.token,IPassWord,'mask').then(res=>{
//                 console.log(res)
//             }).catch(err=>{
//                 toastTitle(err.message,'error')
//             })
//         }else{
//             toastTitle('独立密码不能为空','warn')
//         }
//     }, '', '',function(){
//     });
// };
// OPass();
// 关闭独立独立密码验证
$('.validationContent .close').click(function(){
    closeParents(this,'top50')
});
// 点击独立密码验证
$('.validationContent .confirmBtn').click(function(){
    if(!$('.validationBody input[name="oldPass"]').val()){
        toastTitle('请输入独立密码！','warn');
        return ;
    }
    loadingWith('正在验证，请稍后');
    var IPassWord=JSON.stringify({
        alonePwd: hex_md5($('.validationBody input[name="oldPass"]').val())
    });
    loadAjax('/api/user/verifyAlonePwd','post',sessionStorage.token,IPassWord,'mask').then(res=>{
        console.log(res)
        closeParents(this,'top50');
        sessionStorage.independentPass='true'
        if(addFlag){
            showPopup('.addNumContent','.addNumBox','top50') 
        }else if(delFlag){
            delArr=[];
            loadingWith('正在删除，请稍后！');
            var domArr=$('.aisleCont input[type="checkbox"]');
                $.each(domArr,(index,item)=>{
                    console.log(item.checked)
                    if(item.checked){
                        delArr.push(Number(item.value))
                    }
                })
                var delAisleObj=JSON.stringify({
                    machineId:requestId,
                    ways:delArr
                })
                delAisle(delAisleObj);
        }
    }).catch(err=>{
        toastTitle(err.message,'error')
    })
});
// 关闭验证弹窗
$('.validationBox').click(function(){
    event.stopPropagation();
})
$('.validationContent').click(function(){
    closeWindow(this,'top50')
})
// 输入框禁止提示
$('input').attr('autocomplete','off')
// 判断页面打开后有没有输入独立密码
// sessionStorage.independentPass = '';
// 判断点击是不是在长按之后
var LongPress = 1;//2为长按，1为正常点击
var timeOutEvent = null;
$(".aisleCont").on({
    touchstart: function (e) {
        // 长按事件触发  
        timeOutEvent = setTimeout(function () {
            timeOutEvent = 0;
            $('.numberTop span').hide();
            $('.delCheckbox').show();
            $('.delFooter').addClass('height');
            $('.addAisle').fadeOut();
            LongPress = 2;
            $('.delBtn').text('删除(' + delNum + ')')
        }, 600);
        //长按400毫秒   
        // e.preventDefault();    
    },
    touchmove: function () {
        clearTimeout(timeOutEvent);
        timeOutEvent = 0;
        // alert(1)
    },
    touchend: function () {
        console.log(LongPress)
        clearTimeout(timeOutEvent);
        if (timeOutEvent != 0) { 
            if (LongPress == 2) {
                if ($(this).find('.delChoose').prop('checked')) {
                    $(this).children('.delCheckbox').find('span').removeClass('delCheckboxTrue');
                    $(this).find('.delChoose').prop('checked', false);
                    delNum--;
                    console.log($(this).find('.delChoose').prop('checked'));
                    $('.delBtn').text('删除(' + delNum + ')')
                } else {
                    $(this).children('.delCheckbox').find('span').addClass('delCheckboxTrue');
                    $(this).find('.delChoose').prop('checked', true);
                    console.log($(this).find('.delChoose').prop('checked'));
                    delNum++
                    $('.delBtn').text('删除(' + delNum + ')')
                }
            }
        }
        return false;
    }
}, '.aisleNumderGoods');
// 选择需要删除的货道
var delNum = 0;

// 取消删除
$('.cancelBtn').click(function () {
    delNum = 0;
    cancelFun();
});
function cancelFun(){
    $('.numberTop span').show();
    $('.delCheckbox').hide();
    $('.delFooter').removeClass('height');
    $('.addAisle').fadeIn();
    $('.delCheckbox span').removeClass('delCheckboxTrue');
    $('.delCheckbox .delChoose').prop('checked', false);
}
// 确定删除
var delArr=[],
    delFlag=null;
$('.delFooter .delBtn').click(function () {
    if(delNum==0){
        hui.alert('请选择需要删除的货道！', '好的', function () {
            return ;
          });
    }else{
        delArr=[];
        // console.log($('.aisleCont input[type="checkbox"]'))
        
        // console.log(domArr)
        // domArr.forEach((item,index)=>{
        //     console.log(item)
        // })
      
        hui.confirm('确定删除？', ['取消','确定'], function(){
            // console.log('确认后执行...');
            delFlag=1;
            addFlag=null;
            if(sessionStorage.independentPass){
                loadingWith('正在删除，请稍后！');
                var domArr=$('.aisleCont input[type="checkbox"]');
                $.each(domArr,(index,item)=>{
                    console.log(item.checked)
                    if(item.checked){
                        delArr.push(Number(item.value))
                    }
                })
                var delAisleObj=JSON.stringify({
                    machineId:requestId,
                    ways:delArr
                })
                delAisle(delAisleObj);
                
            }else{
                showPopup('.validationContent','.validationBox','top50') 
            }
        },function(){
            // console.log('取消后执行...');
        });
       
    }
 
    
});
// 删除货道方法
function delAisle(delObj){ 
    loadAjax('api/machine/deleteGoodWay','post',sessionStorage.token,delObj,'mask').then(res=>{
        // console.log(res);
        cancelFun();
        toastTitle(res.message,'success');
        againFun(res);
    }).catch(err=>{
        // console.log(err)
        toastTitle(err.message,'error')
    })
};

// 添加货道弹窗
var addFlag=null,
    addIndex=null;
$('.aisleCont').on('click','.addAisle',function(){
    addFlag=1;
    delFlag=null;
    // console.log($(this).attr('indexVal'))
     addIndex=$(this).attr('indexVal');
    if(sessionStorage.independentPass){
        showPopup('.addNumContent','.addNumBox','top50') 
    }else{
        showPopup('.validationContent','.validationBox','top50') 
    }
})
// 关闭添加货道弹窗
$('.addNumContent .close').click(function(){
    closeParents(this,'top50')
});
// 确定添加
$('.addNumContent .confirmBtn').click(function(){
    if(!($('.addNumBody input[name="addNumber"]').val()!=0)){
        toastTitle('数量必须大于0','warn');
        return ;
    };
    var addAisleDetalis=JSON.stringify({
        machineId:requestId,
        way:Number(addIndex),
        count:Number($('.addNumBody input[name="addNumber"]').val())
    });
    loadAjax('/api/machine/insertGoodWay','post',sessionStorage.token,addAisleDetalis,'mask','.addNumContent','top50').then(res=>{
        console.log(res);
        toastTitle(res.message,'success')
        againFun(res);
        $('.addNumBody input[name="addNumber"]').val('')
    }).catch(err=>{
        console.log(err)
    })
});
// 输入验证是否是正整数
$('.addNumBody input[name="addNumber"]').keyup(function(){
    wholeNum(this);
});
// 关闭添加弹窗
$('.addNumBox').click(function(){
    event.stopPropagation();
});
$('.addNumContent').click(function(){
    closeWindow(this,'top50')
})
