import { loadAjax, loadingWith, toastTitle, showPopup, closeParents, closeWindow, timeStamp, treeList, numFormat2, getKeyTime, timeFlag } from '../../../common/common';
import '../../../MyCss/mobile/order/machineOrder.scss';


let str = '';

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

/**
 * @method setOrderStatus 设置订单状态
 * @param num
 * @returns {string}
 */
function setOrderStatus(num) {
    let str = '';
    switch (num) {
        case 0:
            str = '未出货';
            break;
        case 1:
            str = '部分出货失败';
            break;
        case 2:
            str = '全部出货成功';
            break;
        case 3:
            str = '出货中';
            break;
        case 4:
            str = '全部出货失败';
            break;
        case 5:
            str = '光检失败';
            break;
    }
    return str;
}

/**
 * @method setOrderDetailStatus 设置出货详情状态
 * @param ship_status {String}
 * @returns {string}
 */
function setOrderDetailStatus(ship_status) {
    let str = '';
    switch (ship_status) {
        case 0:
            str = '出货失败';
            break;
        case 1:
            str = '出货成功';
            break;
        case 2:
            str = '出货正常 光检失败';
            break;
        case 3:
            str = '电机故障';
            break;
        default:
            str = '货道故障';
            break;
    }
    return str;
}


/**
 * @method setPayStatus 设置支付状态
 * @param status
 * @returns {string}
 */
function setPayStatus(status) {
    let str = '';
    switch (status) {
        case 1:
            str = '等待支付';
            break;
        case 2:
            str = '已支付';
            break;
        default:
            str = '未支付';
            break;
    }
    return str;
}

/**
 * @method setRefundStatus 设置退款状态
 * @param status
 * @returns {string}
 */
function setRefundStatus(status) {
    let str = '';
    switch (status) {
        case 1:
            str = '未退款';
            break;
        case 2:
            str = '部分退款';
            break;
        case 3:
            str = '全部退款';
            break;
        default:
            str = '-';
            break;
    }
    return str;
}

/**
 * @method setPayType 设置支付类型
 * @param type
 * @returns {string}
 */
function setPayType(type) {
    let str = '';
    switch (type) {
        case 0:
            str = '支付宝';
            break;
        case 1:
            str = '微信';
            break;
        case 3:
            str = '工行支付';
            break;
        case 4:
            str = '杉德支付';
            break;
    }
    return str;
}



hui('#select1').selectBeautify();
hui('#select2').selectBeautify();
hui('#select3').selectBeautify();
// function showVal(val){
//     hui.toast('选项值 : ' + val);
// }
// 时间
var saStart_time = getKeyTime().startTime,
    saend_time = getKeyTime().endTime;
var NumderIndex = 1,//页数
    keyWord = '';
$('#back').click(function () {
    // window.history.go(-1);
    window.location.href = 'M_managementCenter.html';
});
var merchantIdStr = sessionStorage.machineID,//商户id
    orderListArr = [];//订单列表
// 订单列表方法
function orderArrList(mId, mNum) {
    var orderObj = JSON.stringify({
        conditionFive: mId,
        pageNum: mNum,
        pageSize: 100,
        condition: saStart_time,
        conditionTwo: saend_time,
        conditionSeven: 0,
        conditionThree: $('#search').val(),
        conditionSix:hui('#select1').val(), //支付状态
        refund:hui('#select2').val(), //退款状态
        shipStatus:hui('#select3').val() //出货状态
    });
    loadAjax('/order/getOrderList', 'post', sessionStorage.token, orderObj).then(res => {
        if (mNum == 1) {
            if (res.data.list.length == 0) {
                $('.pages3').hide();
                $('.orderList').html('<h2>暂无数据</h2>');
                return;
            }
            pageN(res.data.total, '.pages3');
            $('.pages3').show()
        } else {
            $('.pages3').show()
        };
        var str = '';
        orderListArr = res.data.list;
        res.data.list.forEach((item, index) => {
            var shipDetails = '';
            item.ship_info.forEach(items => {
                shipDetails += `<p>
                        ${items.goods_Name}(${items.way}货道${setOrderDetailStatus(items.ship_status)})
                          </p>`
            });
            str += ` <li dataIndex="${index}" class="orderIn">
                        <div class="flex">
                            <label for="">售货机名(编号):</label>
                            <p>${item.info}(${item.machineNumber})</p>
                        </div>
                        <div class="flex">
                            <label for="">订单编号:</label>
                            <p>${item.number}</p>
                        </div>
                        <div class="flex">
                            <label for="">订单金额:</label>
                            <p>${percentileMoney(item.amount)}</p>
                        </div>
                        <div class="flex">
                            <label for="">支付状态:</label>
                            <p>${setPayStatus(item.payStatus)}</p>
                        </div>
                        <div class="flex">
                            <label for="">下单时间:</label>
                            <p> ${timeStamp(item.time)}</p>
                        </div>
                        <div class="flex">
                            <label for="">支付类型:</label>
                            <p>${setPayType(item.payType)}</p>
                        </div>
                        <div class="flex">
                            <label for="">退款状态:</label>
                            <p>${setRefundStatus(item.refund)}</p>
                        </div>
                        <div class="flex">
                            <label for="">出货状态:</label>
                            <p>${setOrderStatus(item.shipStatus)}</p>
                        </div>
                        <div class="flex">
                            <label for="">出货详情:</label>
                            <div>${shipDetails}</div>
                        </div>
                        <div class="flex">
                            <label for="">销售经理:</label>
                            <p>${item.sales_no ? item.sales_no : '-'}</p>
                        </div>
                        <div class="flex">
                            <label for="">收款方:</label>
                            <p>${item.payee}</p>
                        </div>
                    </li>`
        });
        $('.orderList').html(str)
    }).catch(err => {
        toastTitle(err.message, 'error');
    });
}
orderArrList(merchantIdStr, NumderIndex)
//订单点击分页
$('.pages3').on('click', '.pageVal', function () {
    $(this).addClass('hui-pager-active').siblings().removeClass('hui-pager-active')
    NumderIndex = Number($(this).attr('val'))
    orderArrList(merchantIdStr, Number($(this).attr('val')));
});
// 分页页面方法
function pageN(conut, ele) {
    var Num = (Number(conut) / 100)
    Num = Num % 1 == 0 ? Num : Num + 1
    // console.log(Math.floor(Num))
    var ForNum = Math.floor(Num)
    var pageStr = ''
    for (let i = 0; i < ForNum; i++) {
        pageStr += ` <div class="pageVal ${i == 0 ? 'hui-pager-active' : ''}"  val="${i + 1}"><a href="javascript:hui.toast('第${i + 1}页');" >${i + 1}</a></div>`
    };
    $(`${ele} .hui-pager`).html(pageStr)
};
// 商户数部分
var merchantsArr = treeList(sessionStorage.machineID);
// 点击右上角按钮弹出商户树
$('.hui-icons-menu-point').click(function () {
    if (merchantsArr.length == 0) {
        toastTitle('您没有查看下级商户的权限', 'warn');
        return;
    };
    showPopup('.merchantsContent', '.merchantsBox', 'top0');
});
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
    orderArrList(merchantIdStr, 1);
    NumderIndex = 1
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
// 点击订单列表展示商品
var orderData = null;
$('.orderList').on('click', '.orderIn', function () {
    orderData = orderListArr[$(this).attr('dataIndex')];
    console.log(orderData);
    goodDrawing(orderData.goodsList);
    $('.goodsCont').show();
});
// 关闭商品
$('.goodsCont .goodsHeader img').click(function () {
    $('.goodsCont').hide();
})
// 渲染商品列表
function goodDrawing(list) {
    var goodsStr = '';
    list.forEach((item, index) => {
        goodsStr += `
                    <li class="list flex" goodsIndex="${index}">
                        <div class="img">
                            <img
                                src="${item.goods_images}" />
                        </div>
                        <div class="goodsInform">
                            <h5>${item.good_name_core}</h5>
                            <div class="flexThree of">
                                <p>${percentileMoney(item.price)}</p>
                                <p>x${item.count}</p>
                            </div>
                            <p style="margin:5px 0;">已退款数量：${item.refund_count}</p>
                        </div>
                    </li>`
    });
    $('.goodsListCont').html(goodsStr);
};
// 点击商品退款
var goodsVal = null;//商品数据
$('.goodsListCont').on('click', '.list', function () {
    goodsVal = orderData.goodsList[$(this).attr('goodsIndex')];
    // console.log(goodsVal);
    if (orderData.payStatus != 2) {
        return;
    }
    if (goodsVal.count != goodsVal.refund_count) {
        $('.twoPoles span').html(goodsVal.count - goodsVal.refund_count);
        $('.refundNumber input').val(1)
        $('.sumInput input[name="sum"]').val(goodsVal.price);
        showPopup('.refundCont', '.changeBox', 'top30');
    } else {
        return;
    }

});
// 关闭
$('.close').click(function () {
    closeParents(this, 'top30');
    event.stopPropagation();
});
$('.maskBox ').click(function () {
    event.stopPropagation();
});
$('.refundCont ').click(function () {
    closeWindow(this, 'top30');
});
// 正则检验只能输入正整数
var reduction = 1;
$('.refundNumber input').keyup(function () {
    var num = $(this).val(),
        re = /^\d*$/;
    if (!re.test(num)) {
        toastTitle('只能输入正整数', 'warn')
        $(this).val(reduction);
        $('.sumInput input[name="sum"]').val(Number($(this).val() * goodsVal.price));
    } else {
        reduction = $(this).val();
        $('.sumInput input[name="sum"]').val(Number($(this).val() * goodsVal.price));
    }
    $('.sumInput input[name="sum"]').val(Number($(this).val() * goodsVal.price));
});
$('.refundNumber input').change(function () {
    $('.sumInput input[name="sum"]').val(Number($(this).val() * goodsVal.price));
});

// 确定退款
$('.refundCont .confirmBtn').click(function () {
    if ($('.refundNumber input').val() > 0 && $('.refundNumber input').val() <= goodsVal.count - goodsVal.refund_count) {
        hui.confirm('确定退款？', ['取消', '确定'], function () {
            showPopup('.validationContent', '.validationBox', 'top50');
        })
    } else {
        toastTitle('请按照提示填写数量', 'warn')
    }
});
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
    loadAjax('/user/verifyAlonePwd', 'post', sessionStorage.token, IPassWord, '', '.validationContent', 'top').then(res => {
        if (orderData.payType == 0) {
            //阿里退款
            var refundData = JSON.stringify({
                machineId: orderData.machineId,
                orderId: orderData.number,
                goodId: goodsVal.goods_Id,
                count: Number($('.refundNumber input').val()),
                amount: Number($('.sumInput input[name="sum"]').val()),
                pay_id: orderData.pay_id
                // amount:0.01
            });
            loadAjax('/pay/refund_alipay', 'post', sessionStorage.token, refundData, 'mask', '.refundCont', 'top30').then(res => {
                toastTitle(res.message, 'success');
                orderArrList(merchantIdStr, NumderIndex);
                $('.goodsCont').hide();
            }).catch(err => {
                toastTitle(err.message, 'error')
            })
        } else if (orderData.payType == 1) {
            var refundData = JSON.stringify({
                machineId: orderData.machineId,
                orderId: orderData.number,
                goodId: goodsVal.goods_Id,
                count: Number($('.refundNumber input').val()),
                amount: Number($('.sumInput input[name="sum"]').val()),
                transaction_id: orderData.transaction_id,
                total: orderData.amount,
                pay_id: orderData.pay_id
            });
            loadAjax('/pay/refund_wxpay', 'post', sessionStorage.token, refundData, 'mask', '.refundCont', 'top30').then(res => {
                toastTitle(res.message, 'success');
                orderArrList(merchantIdStr, NumderIndex);
                $('.goodsCont').hide();
            }).catch(err => {
                toastTitle(err.message, 'error')
            })
        } else if (orderData.payType == 3) {
            var refundData = JSON.stringify({
                machineId: orderData.machineId,
                orderId: orderData.number,
                goodId: goodsVal.goods_Id,
                count: Number($('.refundNumber input').val()),
                transaction_id: orderData.transaction_id,
                amount: Number($('.sumInput input[name="sum"]').val()),
                pay_id: orderData.pay_id
            });
            loadAjax('/pay/refund_icbc', 'post', sessionStorage.token, refundData, 'mask', '.refundCont', 'top30').then(res => {
                toastTitle(res.message, 'success');
                orderArrList(merchantIdStr, NumderIndex);
                $('.goodsCont').hide();
            }).catch(err => {
                toastTitle(err.message, 'error')
            })
        }
    }).catch(err => {
        loadingOut();
        toastTitle(err.message, 'error')
    });
});
// 搜索
// $('#search').keydown(function (e) {
//     if (e.keyCode == 13) {
//         keyWord = $(this).val();
//         orderArrList(merchantIdStr, 1);
//     };
// });
$('#test20').val(getKeyTime().keyTimeData)
jeDate("#test20", {
    format: "YYYY-MM-DD",
    range: " - ",
    isinitVal: true,
    donefun: function (obj) {
        var timerKey = obj.val.split(' - ');
        saStart_time = timerKey[0];
        saend_time = timerKey[1];
    },
    clearfun: function (ele, val) {
        saStart_time = getKeyTime().startTime;
        saend_time = getKeyTime().endTime;
        $('#test20').val(getKeyTime().keyTimeData)
    }
});
// 点击查询展开方法
var dowIndex=1;
$('.dowImg').click(function () {
    $('.dowContent').slideToggle();
    var node = $('.dowContent');
    if (dowIndex==1) {　　//如果node是隐藏的则显示node元素，否则隐藏
        dowIndex=2;
        $(this).children('img').addClass('active')
    } else {
        dowIndex=1;
        $(this).children('img').removeClass('active');
    }
});
// 查询
$('.keyConfirmBtn').click(function(){
    if (timeFlag(saStart_time, saend_time)) {
        toastTitle('时间选择范围最多三个月', 'warn')
        return;
    }
    orderArrList(merchantIdStr, 1);
})
