import '../../MyCss/merchants/salesResults.scss';
layui.use(['table', 'form', 'layer', 'laydate', 'tree'], function () {
    var permissionsData0 = window.parent.permissionsData1(),
        permissionsObj = {
            460: false,
        },
        permissionsObjFlag = permissionsVal1(permissionsObj, permissionsData0);
    function permissions() {
        permissionsObjFlag[460] ? $('.pushBtn').removeClass('hide') : $('.pushBtn').addClass('hide')
    };
    permissions();
    var table = layui.table,
        form = layui.form,
        layer = layui.layer,
        laydate = layui.laydate,
        tree = layui.tree,
        token = sessionStorage.token;
    // 初始时间
    var startTime = getKeyTime().startTime,
        endTime = getKeyTime().endTime;
    laydate.render({
        elem: '#test6',
        range: true,
        value: getKeyTime().keyTimeData,
        done: function (value, date, endDate) {
            // console.log(value); //得到日期生成的值，如：2017-08-18
            var timerKey = value.split(' - ');
            // console.log(timerKey);
            startTime = timerKey[0];
            endTime = timerKey[1];
        }
    });
    // 收起
    $('.sidebar i').click(function () {
        $('.left-mian').hide();
        $('.on-left').show()
    });
    $('.on-left').click(function () {
        $('.left-mian').show();
        $('.on-left').hide()
    });
    var salesTableIn = table.render({
        elem: '#salesTable',
        method: 'post',
        url: `${vApi}/sales_manager/getSalesAchievement`,
        contentType: "application/json",
        headers: {
            token: sessionStorage.token
        },
        cols: [[
            // { checkbox: true },
            { field: 'sm_no',  title: '销售经理编号', align: 'center' },
            { field: 'sm_name', title: '销售经理姓名', align: 'center' },
            { field: 'sm_phone', title: '销售经理电话', align: 'center' },
            { field: 'sm_classify',  title: '销售经理类别', align: 'center' },
            {
                field: 'create_name', title: '总单数', align: 'center', templet: function (d) {
                    if (d.achievement.length == 0) {
                        return '-'
                    } else {
                        return d.order_total
                    }
                }
            },
            {
                field: 'create_name', title: '总金额(￥)', align: 'center', templet: d => percentileMoney(d.achievement)
            },
        ]],
        id: 'salesId',
        page: true,
        loading: true,
        request: {
            'pageName': 'pageNum',
            'limitName': 'pageSize'
        },
        where: {
            merchantId: Number(sessionStorage.machineID),
            refund: 0,
            start_time: startTime,
            end_time: endTime,
            // start_time:startTime,
            // end_time:endTime
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
            if (res.code == 403) {
                window.parent.location.href = "login.html";
            } else if (res.code == 405) {
                $('.hangContent').show();
            }
            permissions();
        }
    });
    // 总查询
    $('.queryBtn').click(function () {
        if (timeFlag(startTime, endTime)) {
            layer.msg('时间选择范围最多三个月', { icon: 7 });
            return;
        }
        salesTableIn.reload({
            where: {
                start_time: startTime,
                end_time: endTime,
                refund: $('.newKeyItem input[name="open"]').prop('checked') ? 0 : 1,
            }
        })
    });
    // 刷新页面
    $('.refreshBtn').click(function () {
        location.reload();
    });
    // 关闭弹窗
    $('.playHeader .close').click(function () {
        $(this).parent().parent().addClass('margin0')
        $(this).parents('.maskContnet').fadeOut();
    });
    var managerTable = null;
    function salesFun(managerID) {
        managerTable = table.render({
            elem: '#managerIn',
            method: 'post',
            url: `${vApi}/sales_manager/getSalesManagerOrder`,
            contentType: "application/json",
            headers: {
                token: sessionStorage.token
            },
            cols: [[
                // { checkbox: true },
                { field: 'number', width: 200, title: '订单号', align: 'center' },
                { field: 'amount', width: 180, title: '订单金额(￥)', align: 'center', templet: d => percentileMoney(d.amount) },
                {
                    field: 'refundAmount', width: 145, title: '退款金额', align: 'center', templet: d => percentileMoney(d.refundAmount[0])
                },
                {
                    field: 'sm_phone', width: 130, title: '是否邮寄订单', align: 'center', templet: function (d) {
                        return d.mail == 1 ? '是' : '否'
                    }
                },
                { field: 'subject', width: 180, title: '订单商品', align: 'center' },
                {
                    field: 'notes', width: 180, title: '出货状态', align: 'center', templet: function (d) {
                        return d.shipStatus ? d.shipStatus : '-'
                    }
                },
                {
                    field: 'payType', width: 180, title: '支付类型', align: 'center', templet: function (d) {
                        return d.payType == 1 ? '微信' : '支付宝'
                    }
                },
                {
                    field: 'payType', width: 180, title: '支付状态', align: 'center', templet: function (d) {
                        return d.payStatus == 0 ? '未支付' : d.payStatus == 1 ? '支付中' : '已支付'
                    }
                },
                {
                    field: 'time', width: 230, title: '购买时间', align: 'center', templet: function (d) {
                        if (d.time) {
                            return timeStamp(d.time)
                        } else {
                            return '-'
                        }
                    }
                },
            ]],
            id: 'managerId',
            page: true,
            loading: true,
            request: {
                'pageName': 'pageNum',
                'limitName': 'pageSize'
            },
            where: {
                sm_no: managerID,
                start_time: startTime,
                end_time: endTime,
                merchantId: Number(sessionStorage.machineID),
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

            }
        });
    };

    var salesData = null;
    table.on('row(salesTable)', function (obj) {
        salesData = obj.data;
        //  console.log(obj)
        $('.salesCont .playHeader span').html(`${salesData.sm_name}(${startTime}-${endTime})销售业绩`)
        popupShow('salesCont', 'salesBox');
        if (!managerTable) {
            salesFun(salesData.sm_no)
        } else {
            managerTable.reload({
                where: {
                    sm_no: salesData.sm_no,
                    start_time: startTime,
                    end_time: endTime,
                }
            })
        }
    });

    //   到处部分
    // 导出excel表
    // 导出时间
    var exportStareTime = timeStamp(new Date().getTime()),
        exportEndTime = timeStamp(new Date().getTime());
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
    // 导出按钮
    $('.pushBtn').click(function () {
        if (!(startTime && endTime)) {
            layer.msg('请选择时间', { icon: 7 });
            return;
        }
        if (timeFlag(startTime, endTime)) {
            layer.msg('时间选择范围最多三个月', { icon: 7 });
            return;
        }
        layer.confirm(`确定导出（${startTime}至${endTime}销售经理业绩）？`, function (index) {
            layer.close(index);
            $('.mask').fadeIn();
            $('.maskSpan').addClass('maskIcon');
            var xhr = new XMLHttpRequest();//定义一个XMLHttpRequest对象
            xhr.open("POST", `${vApi}/sales_manager/exportSalesManagerOrder`, true);
            xhr.setRequestHeader("token", sessionStorage.token);

            xhr.setRequestHeader('Content-Type', 'application/json;charset=utf-8');
            xhr.responseType = 'blob';//设置ajax的响应类型为blob;

            xhr.onload = function (res) {
                // console.log(xhr)
                if (xhr.status == 200) {
                    $('.mask').fadeOut();
                    $('.maskSpan').removeClass('maskIcon');
                    if (xhr.response.size < 50) {
                        layer.msg('导出失败', { icon: 2 })
                        return
                    }
                    var content = xhr.response;
                    // var fileName = `${marchantName}(${dataOf}).xlsx`; // 保存的文件名
                    var fileName = `${sessionStorage.marchantName}销售经理业绩(${startTime}-${endTime}).xlsx`
                    var elink = document.createElement('a');
                    elink.download = fileName;
                    elink.style.display = 'none';
                    var blob = new Blob([content]);
                    elink.href = URL.createObjectURL(blob);
                    document.body.appendChild(elink);
                    elink.click();
                    document.body.removeChild(elink);
                } else {
                    $('.mask').fadeOut();
                    $('.maskSpan').removeClass('maskIcon');
                    layer.msg('服务器请求超时', { icon: 2 });
                    return;
                }
            }
            var orderObj = JSON.stringify({
                start_time: startTime,
                end_time: endTime,
                merchantId: Number(pushMid),
                refund: $('.newKeyItem input[name="open"]').prop('checked') ? 0 : 1,
            })
            xhr.send(orderObj);
        })
        // popupShow('exportCont','exportBox')
    })
    // 取消
    $('.content-footer .cancelBtn').click(function () {
        popupHide('exportCont', 'exportBox')
    })
    // 导出
    $('.exportCont .determinePushBtn').click(function () {
        if (!(exportStareTime && exportEndTime)) {
            layer.msg('请选择时间', { icon: 7 });
            return;
        }
        $('.mask').fadeIn();
        $('.maskSpan').addClass('maskIcon');
        var xhr = new XMLHttpRequest();//定义一个XMLHttpRequest对象
        xhr.open("POST", `${vApi}/sales_manager/exportSalesManagerOrder`, true);
        xhr.setRequestHeader("token", sessionStorage.token);

        xhr.setRequestHeader('Content-Type', 'application/json;charset=utf-8');
        xhr.responseType = 'blob';//设置ajax的响应类型为blob;

        xhr.onload = function (res) {
            // console.log(xhr)
            if (xhr.status == 200) {
                $('.mask').fadeOut();
                $('.maskSpan').removeClass('maskIcon');
                var content = xhr.response;
                // var fileName = `${marchantName}(${dataOf}).xlsx`; // 保存的文件名
                var fileName = `${sessionStorage.marchantName}销售经理业绩(${exportStareTime}-${exportEndTime}).xlsx`
                var elink = document.createElement('a');
                elink.download = fileName;
                elink.style.display = 'none';
                var blob = new Blob([content]);
                elink.href = URL.createObjectURL(blob);
                document.body.appendChild(elink);
                elink.click();
                document.body.removeChild(elink);
            } else {
                $('.mask').fadeOut();
                $('.maskSpan').removeClass('maskIcon');
                layer.msg('服务器请求超时', { icon: 2 });
                return;
            }
        }
        var orderObj = JSON.stringify({
            start_time: exportStareTime,
            // start_time:'2020-10-01',
            end_time: exportEndTime,
            // end_time:'2020-12-30',
            merchantId: Number(sessionStorage.machineID)
        })
        xhr.send(orderObj);
    });
    // 刷新商户列表
    var pushMid = sessionStorage.machineID;
    var dataList1 = null;
    var dataList = dataList1 = treeList();
    $('.refreshBtnList').click(function () {
        var dataList1 = treeList();
        if (JSON.stringify(dataList1) != JSON.stringify(dataList)) {
            dataList = dataList1;
            treeFun1(tree, 'testGoods', salesTableIn, dataList,)
            salesTableIn.reload({
                where: {
                    merchantId: sessionStorage.machineID,
                }
            });
            layer.msg('已刷新', { icon: 1 })
        } else {
            layer.msg('已刷新', { icon: 1 })
        }
    });
    treeFun1(tree, 'testGoods', salesTableIn, dataList,);
    function treeFun1(tree, element, tableID, data,) {
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
                pushMid = obj.data.id;
                tableID.reload({
                    where: {
                        merchantId: obj.data.id
                    }
                })
                var nodes = $(`#${element} .layui-tree-txt`)
                for (var i = 0; i < nodes.length; i++) {
                    if (nodes[i].innerHTML === obj.data.title)
                        nodes[i].style.color = "#be954a";
                    else
                        nodes[i].style.color = "#555";
                }
            },
        });
    }
})
