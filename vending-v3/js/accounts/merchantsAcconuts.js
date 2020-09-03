import '../../MyCss/accounts/merchantsAcconuts.css'
layui.use(['table', 'laydate', 'tree', 'layer'], function () {
    // 时间选择器
    var laydate = layui.laydate,
        tree = layui.tree,
        layer = layui.layer,
        token = sessionStorage.token,
        start = '',
        end = '';
    sessionStorage.acconutsID = sessionStorage.machineID,
        laydate.render({
            elem: '#itemrs1',
            type: 'month',
            range: true,
            done: function (value) {

                timerKey = value.split(' - ');
                start = timerKey[0];
                end = timerKey[1];
            }
        });
    // laydate.render({
    //     elem: '#itemrs2',
    //     value: new Date(),
    //     max: '0'
    // });

    var table = layui.table,
        accountsTable = table.render({
            elem: '#moneyData',
            url: '/api/accounts/getEachMonth',
            method: 'post',
            contentType: "application/json",
            headers: {
                token,
            },
            cols: [[
                {
                    field: 'month', width: 160, title: '月份', templet: function (d) {
                        return d.year + '年' + d.month + '月'
                    }
                },
                { field: 'total', width: 160, title: '营业额(元)' ,templet:function(d){
                    return Number(d.total.toFixed(2)).toLocaleString()
                }},
                { field: 'order_count', width: 160, title: '客单量(笔)' },
                { field: 'good_count', width: 160, title: '商品销量(件)' },
                { field: 'operation', width: 160, title: '详情', toolbar: '#barDemo' },

            ]],
            page: true,
            loading: true,
            request: {
                'pageName': 'pageNum',
                'limitName': 'pageSize'
            },
            where: {
                merchantId: Number(sessionStorage.machineID)
            },
            parseData: function (res) {
                if (res.code == 200) {
                    return {
                        "code": res.code, //解析接口状态
                        "msg": res.message, //解析提示文本
                        "count": res.data.total, //解析数据长度
                        "data": res.data.list //解析数据列表
                    };
                } else {
                    return {
                        "code": res.code, //解析接口状态
                        "msg": res.message,   //解析提示文本
                    }
                }

            },
            response: {
                statusCode: 200 //规定成功的状态码，默认：0
            },
            done: function (res) {
                if (res.code == 200) {
                    if(flagNUmber!=1){
                        totalityNumber();
                    }
                    flagNUmber=0;
                } else if (res.code == 403) {
                    window.parent.location.href = "login.html";
                } else if (res.code == 405) {
                    $('.hangContent').show()
                }
            }
        });
    //树状图
    var dataList = treeList();
    console.log(dataList)
    var accountsDetails = null;
    treeFunMaterial(tree, 'test1', accountsTable, dataList, 'merchantId', 'acconutsTree', 1);
    table.on('tool(moneyData)', function (obj) {
        console.log(obj)
        accountsDetails = obj.data;
        $('.accountsDetailsBox .playHeader span').html(accountsDetails.year + '年' + accountsDetails.month + '月账目详情');
        var condition = accountsDetails.year + '-' + (accountsDetails.month>=10?accountsDetails.month:'0'+accountsDetails.month) + '-' + '01',
            conditionTwo = accountsDetails.year + '-' + (accountsDetails.month>=10?accountsDetails.month:'0'+accountsDetails.month)+ '-' + '31';
        if (!dateDetailsTable) {
            monthDetails();
        }
        var  merchantId = sessionStorage.acconutsID
        dateDetailsTable.reload({
            where: {
                condition,
                conditionTwo,
                conditionFive: merchantId
            }
        })
        popupShow('accountsDetailsCont', 'accountsDetailsBox')
    });


    // 月份详情
    var dateDetailsTable = null;
    function monthDetails() {
        dateDetailsTable = table.render({
            elem: '#dateDetails',
            url: `/api/order/getOrderList`,
            method: 'post',
            contentType: "application/json",
            headers: {
                token,
            },
            cols: [[
                { field: 'time', width: 200, title: '支付时间' },
                { field: 'number', width: 200, title: '订单号' },
                { field: 'amount', width: 160, title: '金额(元)',templet:function(d){
                    return Number(d.amount.toFixed(2)).toLocaleString()
                }},
                // { field: 'guestOrders', width: 160, title: '客单量(笔)' },
                { field: 'ofNumber', width: 160, title: '商品销量(件)' ,templet:function(d){
                    var NUM=0;
                    d.goodsList.forEach((item,index)=>{
                        NUM+=item.count
                    });
                    return NUM
                }
              },
              { field: 'refund', width: 160, title: '退款数(件)',templet:function(d){
                var NUM=0;
                d.goodsList.forEach((item,index)=>{
                    NUM+=item.refund_count
                });
                return NUM
              }},

            ]],
            page: true,
            loading: true,
            request: {
                'pageName': 'pageNum',
                'limitName': 'pageSize'
            },
            where: {
                conditionFive: sessionStorage.acconutsID
            },
            parseData: function (res) {
                // console.log(res)
                //res 即为原始返回的数据
                if (res.code == 200) {
                    return {
                        "code": res.code, //解析接口状态
                        "msg": res.message, //解析提示文本
                        "count": res.data.total, //解析数据长度
                        "data": res.data.list //解析数据列表
                    };
                } else if (res.code == 403) {
                    window.parent.location.href = "login.html";
                }
                else {
                    return {
                        "code": res.code, //解析接口状态
                        "msg": res.message,   //解析提示文本
                    }
                }
            },
            response: {
                statusCode: 200 //规定成功的状态码，默认：0
            },
            done: function (res) {
                if (res.code == 200) {

                } else if (res.code == 405) {
                    $('.hangContent').show();
                }
            }
        });
    }

    $('.playHeader .close').click(function () {
        $(this).parent().parent().addClass('margin0')
        $(this).parents('.maskContnet').fadeOut();
    });

    // 左边商户列表显示隐藏事件
    $('.sidebar i').click(function () {
        $('.left-mian').hide()
        $('.onLeft').show()
    });
    $('.onLeft').click(function () {
        $(this).hide();
        $('.left-mian').show()
    });
    // var merchantId = sessionStorage.acconutsID;
    // 获取账目总数
    function totalityNumber() {
        var dataID = JSON.stringify({
            merchantId:sessionStorage.acconutsID,
        })
        loadingAjax('/api/accounts/getData', 'post', dataID, sessionStorage.token).then(res => {
            if (res.data.order_count == 0) {
                $('.turnover p').html(0);
                $('.guestOrders p').html(0)
                $('.goodsNumber p').html(0)
                // animateNumberFun('.turnover p',0,1);
                // animateNumberFun('.guestOrders p',res.data.order_count,2);
                // animateNumberFun('.goodsNumber p',0,2)
            } else {
                // $('.turnover p').html(res.data.total);
                // $('.guestOrders p').html(res.data.order_count)
                // $('.goodsNumber p').html(res.data.good_count)
                animateNumberFun('.turnover p',res.data.total,1);
                animateNumberFun('.guestOrders p',res.data.order_count,2);
                animateNumberFun('.goodsNumber p',res.data.good_count,2)
            }
        }).catch(err => {
            layer.msg(err.message,{icon:2})
        })
    };
    // totalityNumber();

    // 查询
    var flagNUmber=0;
    $('.queryBtn').click(function () {
        flagNUmber=1
        accountsTable.reload({
            where: {
                start,
                end
            }
        })
    });


     // 监听f5刷新
  $("body").bind("keydown", function (event) {
    if (event.keyCode == 116) {
      f5Fun()
    }
  })
})
// 刷新页面
$('.refreshBtn').click(function () {
    location.reload();
});

// function numFormat1(num) {
//         var oldNum = num;
//         num = Number(Number(num).toFixed(2));
//         if (!isNaN(num)) {
//             var c = (num.toString().indexOf('.') !== -1) ? num.toLocaleString() : num.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
//             var str = c.split(".");
//     console.log(str)
//             if (str.length == 1) { c = c + '.00'; } else { if (str[1].length == 1) { c = c + '0'; } }
//             return c;
//         } else {
//             return oldNum;
//         }

//     }
    