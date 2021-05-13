import '../../MyCss/order/userOrder.css'
import '../../MyCss/order/order.css'

layui.use(['laydate', 'table', 'tree', 'flow', 'layer', 'form'], function () {
    // 日期选择
    var startTime = getKeyTime().startTime;
    //结束时间
    var endTime = getKeyTime().endTime;
    var laydate = layui.laydate;
    laydate.render({
        elem: '#test6',
        range: true,
        value: getKeyTime().keyTimeData,
        done: function (value) {
            var timerKey = value.split(' - ');
            startTime = timerKey[0];
            endTime = timerKey[1];
        }
    });

    $('.sidebar i').click(function () {
        $('.data-left').hide();
        $('.onLeft').show();
    });
    $('.onLeft').click(function () {
        $('.onLeft').hide();
        $('.data-left').show();
    })
    var token = sessionStorage.token,
        tree = layui.tree,
        flow = layui.flow,
        layer = layui.layer,
        table = layui.table,
        form = layui.form,
        tableCols = [[
            {
                fixed: 'left',
                field: 'info', width: 220, title: '售货机名(编号)', align: 'center', templet: function (d) {
                    return `<div>${d.info}</div>
                  <div>(${d.machineNumber})</div>`
                }
            },
            {field: 'number', width: 190, title: '订单编号', align: 'center', fixed: 'left'},
            {
                field: 'amount', width: 130, title: '订单金额', align: 'center'
                , templet: function (d) {
                    return percentileMoney(d.amount)
                }
            },
            {
                field: 'payStatus', width: 130, align: 'center', title: '支付状态', templet: function (d) {
                    return setPayStatus(d.payStatus)
                }
            },
            {
                field: 'time', width: 180, title: '下单时间', align: 'center', templet: function (d) {
                    if (d.time) {
                        return timeStamp(d.time)
                    } else {
                        return '-'
                    }
                }
            },
            {
                field: 'bili', width: 135, align: 'center', title: '支付类型', templet: function (d) {
                    return setPayType(d.payType)
                }
            },
            {
                field: 'sign_name', width: 135, title: '退款状态', align: 'center', templet: function (d) {
                    return setRefundStatus(d.refund)
                }
            },
            {
                field: 'shipStatus', width: 150, title: '出货状态', align: 'center', templet: function (d) {
                    if (d.shipStatus || d.shipStatus == 0) {
                        return setOrderStatus(d.shipStatus)
                    } else {
                        return '-'
                    }
                }
            },
            {
                field: 'ship_info', width: 200, title: '出货详情', align: 'center', templet: function (d) {
                    if (d.ship_info.length == 0) {
                        return '-'
                    } else {
                        var str = '';
                        d.ship_info.forEach((item, index) => {
                            str += `<span>${item.goods_Name} (${item.way}货道 ${setOrderDetailStatus(item.ship_status)}) </span>`
                        });
                        return str
                    }
                }
            },
            {
                field: 'sales_no', width: 160, title: '销售经理', align: 'center', templet: function (d) {
                    return d.sales_no ? d.sales_no : '-'
                }
            },

            {field: 'payee', width: 160, title: '收款方', align: 'center',},
            {field: 'operation', width: 110, title: '详情 ', toolbar: '#barDemo', align: 'center'},
        ]],
        orderTable = table.render({
            elem: '#moneyData',
            url: `${vApi}/order/getOrderList`,
            method: 'post',
            contentType: "application/json",
            headers: {
                token,
            },
            cols: tableCols,
            page: true,
            loading: true,
            // limits: [10, 20, 50],
            request: {
                'pageName': 'pageNum',
                'limitName': 'pageSize'
            },
            where: {
                conditionFive: sessionStorage.machineID,
                conditionSeven: 0,
                condition: startTime,
                conditionTwo: endTime,
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
            }
        });

    var marchantName = ' ';//文件名
    //树状图
    var merchantId = sessionStorage.machineID,
        dataList = treeList(marchantName);
    marchantName = sessionStorage.marchantName;
    orderTreeFun(tree, 'test1', dataList);

    function getFlow() {
        flow.load({
            elem: '#demo',
            isAuto: true, //流加载容器
            scrollElem: '#demo',
            end: ' ',
            done: function (page, next) { //执行下一页的回调
                //模拟数据插入
                setTimeout(function () {
                    var lis = [];
                    // for (var i = 0; i < 3; i++) {
                    //   lis.push('<span>荔湾西堤邮政支局' + page + '</span>')
                    // }
                    next(lis.join(''), page < 10000); //假设总页数为 10
                    var machineData = JSON.stringify({
                        pageNum: page,
                        pageSize: 100,
                        merchantId,
                    })
                    loadingAjax('/machine/getMachineList', 'post', machineData, sessionStorage.token).then(res => {
                        res.data.list.forEach((item, index) => {
                            lis.push(`<span machineID="${item.machineId}">${item.info ? item.info : '未命名售货机'}</span>`)
                        })
                        next(lis.join(''), res.data.list.length >= 100);
                    }).catch(err => {
                        console.log(err)
                        layer.msg(err.message, {icon: 7})
                        next(lis.join(''), err.code == 200); //假设总页数为 10
                    })
                    //执行下一页渲染，第二参数为：满足“加载更多”的条件，即后面仍有分页
                    //pages为Ajax返回的总页数，只有当前页小于总页数的情况下，才会继续出现加载更多

                }, 200);
            }
        });
    }

    getFlow();

    //售货机编号
    var machineCode = '';
    $('body').on('click', '.machineList span', function () {
        $('.allmachine').removeClass('active')
        $(this).addClass('active').siblings().removeClass('active');
        machineCode = $(this).attr('machineID');
        orderTable.reload({
            where: {
                conditionFour: machineCode
            }
        })
    })
    $('.allmachine').click(function () {
        $(this).addClass('active');
        $('.machineList span').removeClass('active');
        machineCode = '';
        orderTable.reload({
            where: {
                conditionFour: machineCode
            }
        })
    })

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
                $("#demo").remove();
                $(document).unbind();
                $('.equipment').append(`<div class="machineList" id="demo"></div>`);
                getFlow();
                $('.allmachine').addClass('active');
                $('.machineList span').removeClass('active');
                machineCode = '';
                orderTable.reload({
                    where: {
                        conditionFour: machineCode,
                        conditionFive: merchantId
                    }
                })
            },
        });
    };

    // 导出excel表
    // 导出时间
    var exportStareTime = null,
        exportEndTime = null;
    laydate.render({
        elem: '#test8'
        , type: 'month'
        , range: true,
        done: function (value) {
            var timerKey = value.split(' - ');
            exportStareTime = timerKey[0];
            exportEndTime = timerKey[1];
        }
    });
    // $('.pushBtn').click(function () {
    //   $('.exportBody p').html(marchantName + '订单表格')
    //   popupShow('exportCont', 'exportBox');

    // });
    // 关闭弹窗
    $('.playHeader .close').click(function () {
        $(this).parent().parent().addClass('margin0')
        $(this).parents('.maskContnet').fadeOut();
    });
    // 取消导出
    $('.exportCont .cancelBtn').click(function () {
        popupHide('exportCont', 'exportBox');
    })
    // 确认导出
    $('.pushBtn').click(function () {
        if (!(startTime && endTime)) {
            layer.msg('请选择时间', {icon: 7});
            return;
        }
        if (timeFlag(startTime, endTime)) {
            layer.msg('时间选择范围最多三个月', {icon: 7});
            return;
        }
        let fileName = `售货机订单-${marchantName}(${startTime}至${endTime}).xls`,
            url = `${vApi}/exportExcel?startDate=${startTime}&endDate=${endTime}&merchant_id=${merchantId}&conditionSix=${$('.newKeyContent select[name="keyPayStatus"]').val()}&shipStatus=${$('.newKeyContent select[name="keyShipStatus"]').val()}&refund=${$('.newKeyContent select[name="keyrefundStatus"]').val()}&conditionThree=${$('.key-contnet input[name="orderCode"]').val()}`;
        exportExcel(url, fileName);
    })

    // 订单商品列表
    var refundTatol = 0;
    var orderGoods = null;

    function goodsDetails() {
        orderGoods = table.render({
            elem: '#GooodsData',
            cols: [[
                // { checkbox: true },
                {field: 'goods_images', title: '图片', templet: "#imgtmp", align: 'center'},
                {field: 'good_name_core', title: '商品名(编号)', align: 'center',},
                {field: 'count', title: '购买数量', align: 'center'},
                {
                    field: 'refund_count',
                    title: '已退款数量',
                    align: 'center'
                },
                {
                    field: 'price',
                    title: '销售价 ',
                    align: 'center',
                    templet: (e) => percentileMoney(e.price)
                },
                {
                    field: 'operation',
                    align: 'center',
                    title: '操作',
                    toolbar: '#refundDemo'
                },
            ]],
            data: [],
            id: 'goodsLIstTable',
            loading: true,
            done: function (res) {
                // console.log(res)
                refundTatol = 0;
                res.data.forEach(item => {
                    refundTatol += item.goods_Price;
                })
                // console.log(refundTatol)
                permissions();
                for (var i in res.data) {
                    var item = res.data[i];
                    if (item.refund == 1) {
                        $('.goodsListBody tr[data-index=' + i + '] input[type="checkbox"]').prop('disabled', true);
                        form.render();// 重新渲染一下
                    }
                }
            }
        })
    }

    // 监听操作
    var orderData = null;
    // table.on('tool(moneyData)', function (obj) {

    // });
    table.on('row(moneyData)', function (obj) {
        console.log(obj)
        orderData = obj.data;
        if (!orderGoods) {
            goodsDetails();
        }
        loadingAjax('/order/getOrderStatistics', 'post', JSON.stringify({number: orderData.number}), '', '', '', layer).then(res => {
            $('.paidInSum').html(percentileMoney(res.data.real));
            $('.profitsSum').html(percentileMoney(res.data.cost));
            $('.refundSum').html(percentileMoney(res.data.refund));
            $('.collectionBody').show();

        }).catch(err => {
            $('.collectionBody').hide();
        });
        // if (orderData.payStatus == 2) {
        //     loadingAjax('/order/getOrderStatistics', 'post', JSON.stringify({number: orderData.number}), '', '', '', layer).then(res => {
        //         $('.paidInSum').html(percentileMoney(res.data.real));
        //         $('.profitsSum').html(percentileMoney(res.data.cost));
        //         $('.refundSum').html(percentileMoney(res.data.refund));
        //         $('.collectionBody').show();
        //
        //     }).catch(err => {
        //         $('.collectionBody').hide();
        //     });
        // } else {
        //     $('.collectionBody').hide();
        // }

        $('.detailsOrderCode').html(obj.data.number);//订单编号
        $('.payTime').html(timeStamp(obj.data.time));//支付时间
        $('.orderInformation button span').html(setOrderStatus(obj.data.shipStatus))
        // $('.orderInformation button span').html(obj.data.notes)
        var payNum = 0;
        obj.data.goodsList.forEach((item, index) => {
            payNum += item.count;
        })
        $('.payType').html((setPayType(obj.data.payType)));
        $('.payNUmber').html(payNum);
        $('.orderSum').html(percentileMoney(orderData.amount));
        $('.collection button span').html((setPayStatus(obj.data.payStatus)));
        $('.machineCode').html(obj.data.machineNumber);
        $('.merchantName').html(obj.data.merchantName);
        $('.merchantCode ').html(obj.data.alias);
        popupShow('orderDetails', 'orderDetailsBox');
        orderGoods.reload({
            data: obj.data.goodsList
        })
    });
    //查询
    $('.queryBtn').click(function () {
        if (timeFlag(startTime, endTime)) {
            layer.msg('时间选择范围最多三个月', {icon: 7});
            return;
        }
        // saveTableWidth(tableCols);
        // orderTable.reload({
        //     where: {
        //         condition: startTime,
        //         conditionTwo: endTime,
        //         conditionThree: $('.key-contnet input[name="orderCode"]').val(),
        //         conditionSix: $('.newKeyContent select[name="keyPayStatus"]').val(),
        //         shipStatus: $('.newKeyContent select[name="keyShipStatus"]').val(),
        //         refund: $('.newKeyContent select[name="keyrefundStatus"]').val(),
        //     },
        //     cols: tableCols
        // })
        orderTable.reload({
            where: {
                condition: startTime,
                conditionTwo: endTime,
                conditionThree: $('.key-contnet input[name="orderCode"]').val(),
                conditionSix: $('.newKeyContent select[name="keyPayStatus"]').val(),
                shipStatus: $('.newKeyContent select[name="keyShipStatus"]').val(),
                refund: $('.newKeyContent select[name="keyrefundStatus"]').val(),
            }
        })
    });
    // 刷新页面
    $('.refreshBtn').click(function () {
        location.reload();
    });
    // 监听f5刷新
    $("body").bind("keydown", function (event) {
        if (event.keyCode == 116) {
            f5Fun()
        }
    })

    // 监听退款
    var goodsData = null;
    table.on('tool(GooodsData)', function (obj) {
        if (orderData.payStatus != 2) {
            layer.msg('订单未支付，不能进行退款操作', {icon: 7});
            return;
        }
        goodsData = obj.data;
        console.log(goodsData)
        if (obj.data.count != obj.data.refund_count) {
            $('.twoPoles span').html(obj.data.count - obj.data.refund_count);
            $('.refundNumber input').val(1)
            $('.refundNumber input').prop('max', obj.data.count - obj.data.refund_count);
            $('.sumInput input[name="sum"]').val(goodsData.price);
            popupShow('refundNUmCont', 'refundBox')
        } else {
            layer.msg('该商品已全部退款', {icon: 7})
        }
    });
    // 取消退款
    $('.refundNUmCont .chooseCan').click(function () {
        popupHide('refundNUmCont', 'refundBox')
    });
    // 确定退款
    $('.refundNUmCont .determineBtn').click(function () {
        if ($('.refundNumber input').val() > 0 && $('.refundNumber input').val() <= goodsData.count - goodsData.refund_count) {
            layer.confirm('确定退款？', function (index) {
                layer.close(index);
                popupShow('iPasswprd', 'passwordCont')
            })
        } else {
            layer.msg('请按照提示填写数量', {icon: 7})
        }
    });
    // 退款输入独立密码
    $('.iPasswprd .passBtn').click(function () {
        if (!$('.passBody input[name="iPassword"]').val()) {
            layer.msg('请输入独立密码', {icon: 7});
            return;
        }
        var IPassWord = JSON.stringify({
            alonePwd: hex_md5($('.iPasswprd input[name="iPassword"]').val())
        })
        loadingAjax('/user/verifyAlonePwd', 'post', IPassWord, sessionStorage.token, 'mask', 'iPasswprd', 'passwordCont', layer).then(res => {
            $('.mask').fadeIn();
            $('.maskSpan').addClass('maskIcon');
            $('.iPasswprd input[name="iPassword"]').val('')
            if (+orderData.payType === 0) {
                var refundData = JSON.stringify({
                    machineId: orderData.machineId,
                    orderId: orderData.number,
                    goodId: goodsData.goods_Id,
                    count: Number($('.refundNumber input').val()),
                    amount: Number($('.sumInput input[name="sum"]').val()),
                    pay_id: orderData.pay_id
                    // amount:0.01
                });
                loadingAjax('/pay/refund_alipay', 'post', refundData, sessionStorage.token, 'mask', 'refundNUmCont', 'refundBox', layer).then(res => {
                    layer.msg(res.message, {icon: 1});
                    popupHide('orderDetails', 'orderDetailsBox');
                    orderTable.reload({
                        where: {}
                    })
                }).catch(err => {
                    layer.msg(err.message, {icon: 2});
                })
            } else if (+orderData.payType === 1) {
                var refundData = JSON.stringify({
                    machineId: orderData.machineId,
                    orderId: orderData.number,
                    goodId: goodsData.goods_Id,
                    count: Number($('.refundNumber input').val()),
                    amount: Number($('.sumInput input[name="sum"]').val()),
                    // amount: 0.01,
                    transaction_id: orderData.transaction_id,
                    total: orderData.amount,
                    pay_id: orderData.pay_id
                    // total: 0.01
                });
                loadingAjax('/pay/refund_wxpay', 'post', refundData, sessionStorage.token, 'mask', 'refundNUmCont', 'refundBox').then(res => {
                    layer.msg(res.message, {icon: 1});
                    popupHide('orderDetails', 'orderDetailsBox');
                    orderTable.reload({
                        where: {}
                    })
                }).catch(err => {
                    layer.msg(err.message, {icon: 2});
                })
            } else if (+orderData.payType === 3) {
                var refundData = JSON.stringify({
                    machineId: orderData.machineId,
                    orderId: orderData.number,
                    goodId: goodsData.goods_Id,
                    count: Number($('.refundNumber input').val()),
                    transaction_id: orderData.transaction_id,
                    amount: Number($('.sumInput input[name="sum"]').val()),
                    pay_id: orderData.pay_id
                });
                loadingAjax('/pay/refund_icbc', 'post', refundData, sessionStorage.token, 'mask', 'refundNUmCont', 'refundBox').then(res => {
                    layer.msg(res.message, {icon: 1});
                    popupHide('orderDetails', 'orderDetailsBox');
                    orderTable.reload({
                        where: {}
                    })
                }).catch(err => {
                    layer.msg(err.message, {icon: 2});
                })
            } else if (+orderData.payType === 4 || +orderData.payType === 5) {
                var refundData = JSON.stringify({
                    machineId: orderData.machineId,
                    orderId: orderData.number,
                    goodId: goodsData.goods_Id,
                    count: Number($('.refundNumber input').val()),
                    transaction_id: orderData.transaction_id,
                    amount: Number($('.sumInput input[name="sum"]').val()),
                    pay_id: orderData.pay_id
                });
                loadingAjax('/pay/sandRefund', 'post', refundData, sessionStorage.token, 'mask', 'refundNUmCont', 'refundBox').then(res => {
                    layer.msg(res.message, {icon: 1});
                    popupHide('orderDetails', 'orderDetailsBox');
                    orderTable.reload({
                        where: {}
                    })
                }).catch(err => {
                    layer.msg(err.message, {icon: 2});
                })
            }
        }).catch(err => {
            console.log(err)
            layer.msg(err.message, {icon: 2});

        })
    })
    $('.iPasswprd .passCancelBtn').click(function () {
        popupHide('iPasswprd', 'passwordCont')
    });


    // 正则检验只能输入正整数
    var reduction = 1;
    $('.refundNumber input').keyup(function () {
        var num = $(this).val(),
            re = /^\d*$/;
        if (!re.test(num)) {
            layer.msg('只能输入正整数', {icon: 7});
            $(this).val(reduction);
            $('.sumInput input[name="sum"]').val(Number($(this).val() * goodsData.price));
        } else {
            reduction = $(this).val();
            console.log(reduction);
            $('.sumInput input[name="sum"]').val(Number($(this).val() * goodsData.price));
        }
        $('.sumInput input[name="sum"]').val(Number($(this).val() * goodsData.price));
    });
    $('.refundNumber input').change(function () {
        $('.sumInput input[name="sum"]').val(Number($(this).val() * goodsData.price));
    });

    // 退款
    $('.orderDetails .refundBtn').click(function () {
        layer.confirm('确定退款？(请检查订单出货情况！)', function (index) {
            layer.close(index);
            $('.mask').fadeIn();
            $('.maskSpan').addClass('maskIcon');
            var goodsArray = [];
            orderData.goodsList.forEach(item => {
                goodsArray.push(item.goods_Id)
            })
            var refundData = JSON.stringify({
                machineId: orderData.machineId,
                orderId: orderData.number,
                // amount:Number(orderData.amount),
                amount: 0.01,
                goodId: goodsArray,
                transaction_id: orderData.payType == 1 ? orderData.transaction_id : '',
                total: orderData.payType == 1 ? Number(orderData.amount) : ''

            });
            var url = '';
            if (+orderData.payType === 0) {
                url = `${vApi}/pay/refund_alipay`
            } else if (+orderData.payType === 1) {
                url = `${vApi}/pay/refund_wxpay`
            } else if (+orderData.payType === 4 || +orderData.payType === 5) {
                url = `${vApi}/pay/sandRefund`
            }
            loadingAjax(url, 'post', refundData, sessionStorage.token, 'mask', 'orderDetails ', 'orderDetailsBox', layer).then(res => {
                layer.msg(res.message, {icon: 1});
                // popupHide('orderDetails', 'orderDetailsBox');
                orderTable.reload({
                    where: {}
                })
            }).catch(err => {
                layer.msg(err.message, {icon: 2});
            })
        })

    });

    var permissionsData0 = window.parent.permissionsData1(),
        permissionsObj = {
            420: false,
            421: false,
        },
        permissionsObjFlag = permissionsVal1(permissionsObj, permissionsData0);

    function permissions() {
        permissionsObjFlag[420] ? $('.pushBtn').removeClass('hide') : $('.pushBtn').addClass('hide');
        permissionsObjFlag[421] ? $('.refundBtnTwo').removeClass('hide') : $('.refundBtnTwo').addClass('hide');
    };
    permissions();

    // 图片放大事件
    var PImgSHow = true;
    $('.goodsListBody').on('mouseenter', '.pic102', function (e) {
        var that = this;
        $('#pic101').attr('src', $(that).attr('src'));
        var img = new Image();
        img.onload = function () {
            $("#pic101").css({
                "width": this.width >= this.height ? 350 + 'px' : 'auto',
                "height": this.height > this.width ? 450 + 'px' : 'auto'
            }).fadeIn("fast");
            this.onload = null;

        };
        img.src = $(that).attr('src');
    });
    $('.goodsListBody').on('click', '.pic102', function () {
        event.stopPropagation();
        PImgSHow = false;
    });
    $('.goodsListBody').on('mouseleave', '.pic102', function () {
        if (PImgSHow) {
            $('#pic101').hide();
        }
    });
    $('#pic101').click(function () {
        event.stopPropagation();
    });
    $('body').click(function () {
        PImgSHow = true;
        $('#pic101').hide();
    });
    $('#pic101').mouseenter(function () {
        $('#pic101').show();
    })
    $('#pic101').mouseleave(function () {
        if (PImgSHow) {
            $('#pic101').hide();
        }
    });

    $('.refreshBtnList').click(function () {
        layer.msg('已刷新', {icon: 1})
        dataList = treeList(marchantName);
    })
})
