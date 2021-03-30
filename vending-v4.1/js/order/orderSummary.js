import '../../MyCss/order/orderSummary.scss';

layui.use(['table', 'form', 'layer', 'tree', 'laydate'], function () {
    tooltip('.refreshBtnList', {transition: true, time: 200});
    sessionStorage.classTag = sessionStorage.machineID;
    var table = layui.table,
        layer = layui.layer,
        tree = layui.tree,
        rank = null,
        laydate = layui.laydate,
        marchantName = sessionStorage.marchantName,
        merchantId = sessionStorage.machineID,
        //数据表格
        token = sessionStorage.token,
        //开始时间
        startTime = getKeyTime().startTime,
        //结束时间
        endTime = getKeyTime().endTime;
    laydate.render({
        elem: '#test6',
        range: true,
        value: getKeyTime().keyTimeData,
        done: function (value, date, endDate) {
            console.log(value); //得到日期生成的值，如：2017-08-18
            var timerKey = value.split(' - ');
            console.log(timerKey);
            startTime = timerKey[0];
            endTime = timerKey[1];
        }
    });
    var tableIns = table.render({
        elem: '#tableTest'
        , url: `${vApi}/order/getOrderMerchant`
        , method: 'post'
        , contentType: 'application/json'
        , headers: {
            token,
        }
        ,height: 600
        , cols: [[
            {
                field: 'info', width: 220, title: '售货机名(编号)', align: 'center', templet: function (d) {
                    return `<div>${d.info}</div>
                      <div>(${d.machineNumber})</div>`
                }
            },
            {field: 'number', width: 190, title: '订单编号', align: 'center'},
            {
                field: 'number', width: 130, title: '订单类型', align: 'center', templet: function (d) {
                    return d.mail == 0 ? '售货机订单' : '邮寄订单'
                }
            },
            {
                field: 'amount', width: 130, title: '订单金额(￥)', align: 'center',
                templet: (e) => percentileMoney(e.amount)
            },
            {
                field: 'payStatus', width: 130, align: 'center', title: '支付状态', templet: function (d) {
                    return d.payStatus == 1 ? '等待支付' : d.payStatus == 2 ? '已支付' : '未支付'
                }
            },
            {
                field: 'time', width: 180, title: '支付时间', align: 'center', templet: function (d) {
                    if (d.time) {
                        return timeStamp(d.time)
                    } else {
                        return '-'
                    }
                }
            },
            {
                field: 'bili', width: 130, align: 'center', title: '支付类型', templet: function (d) {
                    return d.payType == 1 ? '微信' : d.payType == 0 ? '支付宝' : '工行支付'
                }
            },
            {
                field: 'sign_name', width: 150, title: '退款状态', align: 'center', templet: function (d) {
                    return d.refund == 1 ? '未退款' : d.refund == 2 ? '部分退款' : d.refund == 3 ? '全部退款' : '-'
                }
            },
            {
                field: 'shipStatus', width: 150, title: '出货状态', align: 'center', templet: function (d) {
                    return d.mail == 0 ? setOrderStatus(d.shipStatus) : '-'
                }
            },
            {
                field: 'ship_info', width: 200, title: '出货详情', align: 'center', templet: function (d) {
                    if (d.ship_info.length == 0) {
                        return '-'
                    } else {
                        var str = '';
                        d.ship_info.forEach((item, index) => {
                            str += `<div>${item.goods_Name}(${item.way}货道${item.ship_status == 0 ? '出货失败' : item.ship_status == 1 ? '出货成功' : '货道故障'})</div>`
                        });
                        return str
                    }
                }
            },
            {
                field: 'ship_info', width: 230, title: '邮寄信息', align: 'center', templet: function (d) {
                    if (d.mail == 1) {
                        return `
                                <div class="mailFlex"><span> 收货人:</span><span>${d.sign_name}</span></div>
                                <div class="mailFlex"> <span>收货人电话:</span><span>${d.sign_phone}</span></div>
                                <div class="mailFlex"><span>收货地址:</span><span>${d.sign_address}</span></div>
                                <div class="mailFlex"><span>快递/物流状态:</span><span>${d.dispatch_status == 0 ? '未发货' : d.dispatch_status == 1 ? '已发货' : '已收货'}</span></div>
                                <div class="mailFlex"><span>快递/物流公司:</span><span>${d.express_type ? d.express_type : '-'}</span></div>
                                <div class="mailFlex"><span>快递/物流单号:</span><span>${d.express_number ? d.express_number : '-'}</span></div>
                               `
                    } else {
                        return '-'
                    }

                }
            },
            {
                field: 'sales_no', width: 160, title: '销售经理', align: 'center', templet: function (d) {
                    return d.sales_no ? d.sales_no : '-'
                }
            },

            {field: 'payee', width: 160, title: '收款方', align: 'center',},
        ]]
        , id: 'tableId'
        , page: true
        , loading: true
        , request: {
            'pageName': 'pageNum',
            'limitName': 'pageSize'
        },
        where: {
            merchant_id: merchantId,
            startTime,
            endTime,
        },
        parseData: function (res) {
            // console.log(res)
            //res 即为原始返回的数据
            if (res.code == 200) {
                return {
                    "code": res.code, //解析接口状态
                    "msg": '', //解析提示文本
                    "count": res.data.total, //解析数据长度
                    "data": res.data.list //解析数据列表
                };
            } else if (res.code == 403) {
                window.parent.location.href = "login.html";
            } else {
                return {
                    "code": res.code, //解析接口状态
                    "msg": res.message, //解析提示文本
                }
            }

        },
        response: {
            statusCode: 200 //规定成功的状态码，默认：0
        },
        done: function (res) {
            rank = res.data;
            permissions();
            if (res.code == 405) {
                $('.hangContent').show();
            }
        }
    });

    var form = layui.form;

    // 头部×关闭弹窗
    $('.playHeader .close').click(function () {
        $(this).parent().parent().addClass('margin0')
        $(this).parents('.maskContnet').fadeOut();
    });

    var dataList = treeList();
    orderTreeFun(tree, 'testGoods', dataList)
    // treeFun(tree, 'testGoods', tableIns, dataList, 'merchant_id', '', '', '', 'true');
    // 刷新商户列表
    $('.refreshBtnList').click(function () {
        var dataList1 = treeList();
        if (JSON.stringify(dataList1) != JSON.stringify(dataList)) {
            dataList = dataList1;
            orderTreeFun(tree, 'testGoods', dataList)
            tableIns.reload({
                where: {
                    merchant_id: sessionStorage.machineID,
                }
            })
            layer.msg('已刷新', {icon: 1})
        } else {
            layer.msg('已刷新', {icon: 1})
        }

    })
    // 收起
    $('.sidebar i').click(function () {
        $('.left-mian').hide();
        $('.on-left').show()
    });
    $('.on-left').click(function () {
        $('.left-mian').show();
        $('.on-left').hide()
    });
    // 监听f5刷新
    $("body").bind("keydown", function (event) {
        if (event.keyCode == 116) {
            f5Fun()
        }
    });

    var permissionsData0 = window.parent.permissionsData1(),
        permissionsObj = {
            464: false,
        },
        permissionsObjFlag = permissionsVal1(permissionsObj, permissionsData0);

    function permissions() {
        permissionsObjFlag[464] ? $('.pushBtn').removeClass('hide') : $('.pushBtn').addClass('hide');
    };
    permissions();

    $('.pushBtn').click(function () {
        if (!(startTime && endTime)) {
            layer.msg('请选择时间', {icon: 7});
            return;
        }
        if (timeFlag(startTime, endTime)) {
            layer.msg('时间选择范围最多三个月', {icon: 7});
            return;
        }
        let fileName = `订单汇总-${marchantName}(${startTime}至${endTime}).xls`,
            conditionThree = $('.key-contnet input[name="orderCode"]').val(),
            conditionSix = $('.newKeyContent select[name="keyPayStatus"]').val(),
            refund = $('.newKeyContent select[name="keyrefundStatus"]').val(),
            url = `${vApi}/complete?startDate=${startTime}&endDate=${endTime}&merchant_id=${merchantId}&conditionThree=${conditionThree}&conditionSix=${conditionSix}&refund=${refund}`;
        exportExcel(url, fileName);
    });



    // 树方法

    function orderTreeFun(tree, element, data,) {
        tree.render({
            elem: `#${element}`,
            id: 'treelist',
            showLine: !0 //连接线
            ,
            onlyIconControl: true, //左侧图标控制展开收缩
            data,
            spread: true,
            text: {
                defaultNodeName: '无数据',
                none: '您没有权限，请联系管理员授权!'
            },
            click: function (obj) {
                console.log(obj);
                marchantName = obj.data.title
                var nodes = $(`#${element} .layui-tree-txt`)
                for (var i = 0; i < nodes.length; i++) {
                    if (nodes[i].innerHTML === obj.data.title)
                        nodes[i].style.color = "#be954a";
                    else
                        nodes[i].style.color = "#555";
                }
                if (merchantId == obj.data.id) {
                    return;
                }
                merchantId = obj.data.id;
                tableIns.reload({
                    where: {
                        merchant_id: merchantId,
                    }
                })
            },
        });
    };
    //   查询
    $('.queryBtn').click(function () {
        if (timeFlag(startTime, endTime)) {
            layer.msg('时间选择范围最多三个月', {icon: 7});
            return;
        }
        tableIns.reload({
            where: {
                startTime,
                endTime,
                conditionThree: $('.key-contnet input[name="orderCode"]').val(),
                conditionSix: $('.newKeyContent select[name="keyPayStatus"]').val(),
                refund: $('.newKeyContent select[name="keyrefundStatus"]').val(),

            }
        })
    })
})
