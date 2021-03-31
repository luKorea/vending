import '../../../MyCss/mobile/machine/machineChild.scss';
import {
    loadAjax,
    loadingWith,
    loadingOut,
    toastTitle,
    showPopup,
    closeParents,
    closeWindow,
    wholeNum,
    permissionsFun
} from '../../../common/common.js';

var editAisleFlag = false;

// 千分位金额
function percentileMoney(num) {
    if (num === '') num = 0;
    num = num.toString().replace(/[^\d\.-]/g, ''); //转成字符串并去掉其中除数字, . 和 - 之外的其它字符。
    if (isNaN(num)) num = "0"; //是否非数字值
    var sign = (num == (num = Math.abs(num)));
    num = Math.floor(num * 100 + 0.50000000001); //下舍入
    var cents = num % 100; //求余 余数 = 被除数 - 除数 * 商
    cents = (cents < 10) ? "0" + cents : cents; //小于2位数就补齐
    num = Math.floor(num / 100).toString();
    for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++) { //每隔三位小数分始开隔
        num = num.substring(0, num.length - (4 * i + 3)) + ',' + num.substring(num.length - (4 * i + 3));
    }
    return '￥' + (((sign) ? '' : '-') + num + '.' + cents);
}


function permissions() {
    permissionsFun('/role/findUserPermission', 'post', sessionStorage.token).then(res => {
        res.data.forEach(item => {
            if (item.id == '424') {
                editAisleFlag = true;
            }
        });
    }).catch(err => {
        console.log(err)
    })
};

// TODO 判断用户是不是管理员


var parentWin = window.parent;
// console.log(parentWin)
$('.topHeader .back').click(function () {
    parentWin.hideChild();
})
var requestId = parentWin.machindID();
var merchantsID = parentWin.merchantsID();

function loadChild(machine) {
    loadingWith('加载中...')
    var requestIdData = JSON.stringify({
        machineId: machine
    })
    loadAjax('/machine/getGoodWay', 'post', sessionStorage.token, requestIdData, 'mask').then(res => {
        againFun(res)
    }).catch(err => {
        console.log(err)
    })
}

loadChild(requestId);

var wayList = [];

// 渲染数据处理
function againFun(res) {
    wayList = [];
    res.data.forEach(item => {
        if (item.row) {
            if (!(wayList[item.row - 1])) {
                wayList[item.row - 1] = [];
                wayList[item.row - 1].push(item)
            } else {
                wayList[item.row - 1].push(item)
            }
        }
    })
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
                                <img src="${child.goods_images ? child.goods_images : require('../../../img/failure.png')}" alt="">
                                <span>${child.way}</span>
                            </div>
                            <div class="price">价格:${percentileMoney(child.price)}</div>
                            <div class="numderBottom flex">
                                <div class="${child.open == 1 ? 'status1' : 'status2'} ">
                                    
                                    ${child.open == 1 ? '正常' : '禁用'}
                                </div>
                                <div >
                                    数量:${child.count}
                                </div>
                            </div>
                            <p>
                            ${child.mail == 1 ? '(邮寄)' : ''}${child.goods_Name ? child.goods_Name : '-'}
                            </p>
                        </li>`
        });
        aisleStar += `</ul>`
    });
    document.getElementById('aisleCont').innerHTML = aisleStar;
    // $('#aisleCont').html(aisleStar);
    $('#aisleCont input').attr('checked', false)
}

permissions();
// OPass();
// 关闭独立独立密码验证
$('.validationContent .close').click(function () {
    closeParents(this, 'top50')
});


let flag = true;


// 点击独立密码验证
$('.validationContent .confirmBtn').click(function () {
    if (!$('.validationBody input[name="oldPass"]').val()) {
        toastTitle('请输入独立密码！', 'warn');
        return;
    }
    loadingWith('正在验证，请稍后');
    var IPassWord = JSON.stringify({
        alonePwd: hex_md5($('.validationBody input[name="oldPass"]').val())
    });
    loadAjax('/user/verifyAlonePwd', 'post', sessionStorage.token, IPassWord, 'mask').then(res => {
        console.log(res)
        closeParents(this, 'top50');
        sessionStorage.independentPass = 'true'
        if (addFlag) {
            showPopup('.addNumContent', '.addNumBox', 'top50')
        } else if (delFlag) {
            delArr = [];
            loadingWith('正在删除，请稍后！');
            var domArr = $('.aisleCont input[type="checkbox"]');
            $.each(domArr, (index, item) => {
                console.log(item.checked)
                if (item.checked) {
                    delArr.push(Number(item.value))
                }
            })
            var delAisleObj = JSON.stringify({
                machineId: requestId,
                ways: delArr
            })
            delAisle(delAisleObj);
        } else if (editFlag) {
            enableFun();
            aisleEdit();
            flag = false;
            showPopup('.editAisleContent', '.editAisleBox', 'top50');
        }
    }).catch(err => {
        toastTitle(err.message, 'error')
    })
});
// 关闭验证弹窗
$('.validationBox').click(function () {
    event.stopPropagation();
})
$('.validationContent').click(function () {
    closeWindow(this, 'top50')
})
// 输入框禁止提示
$('input').attr('autocomplete', 'off')
var LongPress = 1;//2为长按，1为正常点击
var timeOutEvent = null,
    ArrIndex = null,
    editFlag = null;
// 选择需要删除的货道
$('.aisleCont').on('click', '.aisleNumderGoods', function () {
    disableFun();
    ArrIndex = $(this).attr("fireIndex").split(',');
    editFlag = 1;
    addFlag = null;
    delFlag = null;
    aisleEdit();
    showPopup('.editAisleContent', '.editAisleBox', 'top50');
})
var delNum = 0;
// 取消删除
$('.cancelBtn').click(function () {
    cancelFun();
});

function cancelFun() {
    LongPress = 1
    delNum = 0;
    $('.numberTop span').show();
    $('.delCheckbox').hide();
    $('.delFooter').removeClass('height');
    $('.addAisle').fadeIn();
    $('.delCheckbox span').removeClass('delCheckboxTrue');
    $('.delCheckbox .delChoose').prop('checked', false);
}

// 确定删除
var delArr = [],
    delFlag = null;
$('.delFooter .delBtn').click(function () {
    if (delNum == 0) {
        hui.alert('请选择需要删除的货道！', '好的', function () {
            return;
        });
    } else {
        delArr = [];
        hui.confirm('确定删除？', ['取消', '确定'], function () {
            // console.log('确认后执行...');
            delFlag = 1;
            addFlag = null;
            editFlag = null;
            if (sessionStorage.independentPass) {
                loadingWith('正在删除，请稍后！');
                var domArr = $('.aisleCont input[type="checkbox"]');
                $.each(domArr, (index, item) => {
                    console.log(item.checked)
                    if (item.checked) {
                        delArr.push(Number(item.value))
                    }
                })
                var delAisleObj = JSON.stringify({
                    machineId: requestId,
                    ways: delArr
                })
                delAisle(delAisleObj);

            } else {
                showPopup('.validationContent', '.validationBox', 'top50')
            }
        }, function () {
            // console.log('取消后执行...');
        });

    }


});

// 删除货道方法
function delAisle(delObj) {
    loadAjax('api/machine/deleteGoodWay', 'post', sessionStorage.token, delObj, 'mask').then(res => {
        // console.log(res);
        cancelFun();
        toastTitle(res.message, 'success');
        againFun(res);
    }).catch(err => {
        // console.log(err)
        toastTitle(err.message, 'error')
    })
};

// 添加货道弹窗
var addFlag = null,
    addIndex = null;
$('.aisleCont').on('click', '.addAisle', function () {
    addFlag = 1;
    delFlag = null;
    editFlag = null;
    addIndex = $(this).attr('indexVal');
    showPopup('.addNumContent', '.addNumBox', 'top50')
})
// 关闭添加货道弹窗
$('.addNumContent .close').click(function () {
    closeParents(this, 'top50')
});
// 输入验证是否是正整数
$('.addNumBody input[name="addNumber"]').keyup(function () {
    wholeNum(this);
});
// 关闭添加弹窗
$('.addNumBox').click(function () {
    event.stopPropagation();
});
$('.addNumContent').click(function () {
    closeWindow(this, 'top50')
})


// 关闭编辑
$('.editAisleContent .close').click(function () {
    closeParents(this, 'top50')
});
$('.editAisleBox').click(function () {
    event.stopPropagation();
});
$('.editAisleContent').click(function () {
    closeWindow(this, 'top50')
})
// 渲染货道信息
var goodsDetails = null;

let machineSystem = null;

// 获取是否机器管理员
function Amachinedmin() {
    loadAjax('/machine/findMachineIdUser?machineId=' + requestId,
        'get', sessionStorage.token).then(res => {
        machineSystem = res.data;
        console.log(res.data, 'test');
    }).catch(err => {
        machineSystem = 0;
    })
};

Amachinedmin();


function enableFun() {
    // $('input[name="goodsName"]').attr("disabled",false);
    $('input[name="price"]').attr("disabled",false);
    $('input[name="count"]').attr("disabled",false);
    $('input[name="total"]').attr("disabled",false);
    $('.sumbitBtn').show();
    $('.confirmBtn').hide();
};

function disableFun() {
    $('input[name="goodsName"]').attr("disabled",true);
    $('input[name="price"]').attr("disabled",true);
    $('input[name="count"]').attr("disabled",true);
    $('input[name="total"]').attr("disabled",true);
    $('.sumbitBtn').hide();
    $('.confirmBtn').show();
};


$('.editAisleContent').click(function () {
    if (machineSystem != 1) {
        disableFun();
    }
})


function aisleEdit() {
    goodsDetails = wayList[ArrIndex[0]][ArrIndex[1]];
    console.log(goodsDetails);
    $('.editiAsleBody input[name="goodsName"]').val(goodsDetails.mail == 1 ? '(邮寄)' + goodsDetails.goods_Name : goodsDetails.goods_Name);
    $('.editiAsleBody input[name="goodsName"]').attr('IVal', goodsDetails.goods_Id);
    $('.editiAsleBody input[name="price"]').val(goodsDetails.price);
    $('.editiAsleBody input[name="count"]').val(goodsDetails.count);
    $('.editiAsleBody input[name="total"]').val(goodsDetails.total);
    $('.editiAsleBody input[name="openText"]').val(goodsDetails.open == 1 ? '是' : '否');
    $('.editiAsleBody input[name="openVal"]').val(goodsDetails.open);
};


$('.pickerChoose').click(function () {
    if (machineSystem !== 1) {
        toastTitle('您不是该设备管理员！', 'warn');
        return;
    }
});

var picker1 = new huiPicker('.pickerChoose', function () {
    var val = picker1.getVal(0);
    var txt = picker1.getText(0);
    $('.pickerChoose input[name="openVal"]').val(val);
    $('.pickerChoose input[name="openText"]').val(txt);
});
picker1.bindData(0, [{value: 1, text: '是'}, {value: 0, text: '否'}]);
// 点击选择商品
$('.editAisleContent .goodsChoose').click(function () {
    if (machineSystem === 1) {
        tabLoadEndArray = false;
        pageNum = 1;
        $('.goodsWrap').html(`<div class="goodsList flexThree" id="goodsList"></div>`)
        $('.goodsList').empty();
        showPopup('.goodsContnet', '.goodsBox', 'top50');
        goodsLoad();
    } else {
        toastTitle('您不是该设备管理员！', 'warn');
    }
});
// 关闭选择商品
$('.goodsContnet .close').click(function () {
    closeParents(this, 'top50')
});
$('.goodsBox').click(function () {
    event.stopPropagation();
});
$('.goodsContnet').click(function () {
    closeWindow(this, 'top50')
})
// 商品部分
var pageNum = 1,
    pageSize = 10,
    conditionTwo = '';

// 下拉刷新方法
function goodsRefresh(resetload) {
    var goodsObj = JSON.stringify({
        pageNum,
        pageSize,
        condition: merchantsID,
        conditionFour: '1',
        conditionTwo,
    });
    pageNum++
    loadAjax('/goods/findAll', 'post', sessionStorage.token, goodsObj, 'mask').then(res => {
        if (res.data.list.length != 10) {
            tabLoadEndArray = true;
        }
        if (res.data.list.length > 0) {
            goodsDrawing(res.data.list);
        }

    }).catch(err => {
        // console.log(999)
        resetload();
        tabLoadEndArray = true;
        return;
    })
};

var tabLoadEndArray = false;

function goodsLoad() {
    var dropload = $('.goodsWrap').dropload({
        scrollArea: $('.goodsWrap'),
        // scrollArea:  window,
        domDown: {
            domClass: 'dropload-down',
            domRefresh: '<div class="dropload-refresh">上拉加载更多</div>',
            domLoad: '<div class="dropload-load"><span class="loading"></span>加载中...</div>',
            domNoData: '<div class="dropload-noData">已加载全部数据</div>'
        },
        loadDownFn: function (me) {
            setTimeout(function () {
                if (tabLoadEndArray) {
                    me.resetload();
                    me.lock();
                    me.noData();
                    me.resetload();
                    return;
                }
                goodsRefresh(me.resetload);
                me.resetload();
            }, 500);
        }
    });
}

// 商品渲染方法
function goodsDrawing(gData) {
    var goodsStr = '';
    gData.forEach((item, index) => {
        goodsStr += `<div class="chooseList myScale3d" mail="${item.mail}" gID="${item.goods_Id}" gName="${item.goods_Name}" gPrice="${item.goods_Price}" >
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
    $('.goodsList').append(goodsStr);
};

// 点击选择商品
$('.goodsWrap').on('click', '.chooseList', function () {
    console.log($(this).attr('gName'))
    $('.editiAsleBody input[name="goodsName"]').val($(this).attr('mail') == 1 ? '(邮寄)' + $(this).attr('gName') : $(this).attr('gName'));
    $('.editiAsleBody input[name="goodsName"]').attr('IVal', $(this).attr('gID'));
    $('.editiAsleBody input[name="price"]').val($(this).attr('gPrice'));
    closeParents(this, 'top50')
});

// 维护
$('.editAisleContent .confirmBtn').click(function () {
    if (machineSystem  === 1) {
        if (!sessionStorage.independentPass) {
            showPopup('.validationContent', '.validationBox', 'top50');
        } else {
            enableFun();
        }
    } else {
        disableFun();
        toastTitle('您不是该设备管理员！', 'warn');
        return;
    }
});

// 修改
$('.editAisleContent .sumbitBtn').click(function () {
    if (!$('.editiAsleBody input[name="goodsName"]').attr('IVal')) {
        toastTitle('请选择商品', 'warn');
        return;
    }
    if (!($('.editiAsleBody input[name="count"]').val() && $('.editiAsleBody input[name="total"]').val())) {
        toastTitle('数量和容量为为必填', 'warn');
        return;
    }
    if (!(Number($('.editiAsleBody input[name="total"]').val()) >= Number($('.editiAsleBody input[name="count"]').val()))) {
        toastTitle('货道容量不能小于当前数量', 'warn');
        return;
    };
    loadingWith('正在修改，请稍后！')
    var editObj = JSON.stringify({
        machineId: requestId,
        way: goodsDetails.way,
        goodId: Number(goodsDetails.goods_Id ? goodsDetails.goods_Id : $('.editiAsleBody input[name="goodsName"]').attr('IVal')),
        newGoodId: Number($('.editiAsleBody input[name="goodsName"]').attr('IVal')),
        replenish: goodsDetails.goods_Id ? goodsDetails.count : 0,
        count: Number($('.editiAsleBody input[name="count"]').val()),
        total: Number(goodsDetails.goods_Id ? goodsDetails.total : 0),
        newTotal: Number($('.editiAsleBody input[name="total"]').val()),
        status: goodsDetails.open,
        newStatus: Number($('.editiAsleBody input[name="openVal"]').val()),
        newPrice: $('.editAisleContent input[name="price"]').val(),
        price: goodsDetails.goods_Id ? goodsDetails.price + '' : '0'
    });
    loadAjax('/machine/updateGoodWay',
        'post', sessionStorage.token, editObj, 'mask', '.editAisleContent', 'top50').then(res => {
        loadChild(requestId);
        toastTitle(res.message, 'success')
    }).catch(err => {
        toastTitle(err.message, 'error')
    })
})

// 筛选商品搜索
$('.goodsContnet .confirmBtn').click(function () {
    loadingWith('正在加载，请稍后！')
    conditionTwo = $('.goodsContnet input[name="editName"]').val();
    tabLoadEndArray = false;
    pageNum = 1;
    $('.goodsWrap').html(`<div class="goodsList flexThree" id="goodsList"></div>`)
    $('.goodsList').empty();
    goodsLoad();
});

// 引入底部导航栏
$('#footer').load('M_footerNav.html');
