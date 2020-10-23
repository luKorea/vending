import '../../MyCss/order/mailOrder.scss'
layui.use(['table', 'layer', 'form', 'laydate'], function () {
    var table = layui.table,
        layer = layui.layer,
        form = layui.form,
        laydate = layui.laydate,
        mailTable = table.render({
            elem: '#mailTableOn',
            url: `/api/order/getOrderList`,
            method: 'post',
            contentType: "application/json",
            headers: {
                token,
            },
            cols: [[
                { field: 'number', width: 210, title: '订单编号', align: 'center' },
                { field: 'payType', width: 210, title: '付款类型', align: 'center',templet:function(d){
                    return d.payType==0?'支付宝':'微信'
                } },
                { field: 'payee', width: 210, title: '收款账号', align: 'center' },
                { field: 'Number', width: 210, title: '订单金额', align: 'center',templet:function(d){
                    if(d.goodsList.lebght!=0){
                        var Num=0;
                        d.goodsList.forEach(item=>{
                            Num+=item.goods_Price*item.count
                        })
                        return Num;
                    }else{
                        return 0
                    }
                } },
                { field: 'sign_name', width: 210, title: '收货人', align: 'center' },
                { field: 'sign_address', width: 210, title: '售货地址', align: 'center' },
                { field: 'notes', width: 210, title: '备注', align: 'center' },
                { field: 'notes', width: 210, title: '下单时间', align: 'center' ,templet:function(d){
                    return timeStamp(d.time)
                }},
                {
                    field: 'dispatch_status', width: 210, title: '物流状态', align: 'center', templet: function (d) {
                        return d.dispatch_status == 0 ? '未发货' : d.dispatch_status == 1 ? '已发货' : '已售货'
                    }
                },
                {
                    field: 'express_type', width: 190, title: '物流公司/快递公司', align: 'center', templet: function (d) {
                        return d.express_type ? d.express_type : '-'
                    }
                },
                {
                    field: 'express_number', width: 210, title: '物流单号', align: 'center', templet: function (d) {
                        return d.express_number ? d.express_number : '-'
                    }
                },
                { field: 'operation', width: 138, title: '操作 ',fixed: 'right', right: 0, toolbar: '#barDemo', align: 'center' },
            ]],
            page: true,
            loading: true,
            request: {
                'pageName': 'pageNum',
                'limitName': 'pageSize'
            },
            where: {
                conditionFive: sessionStorage.machineID,
                conditionSeven: 1
            },
            parseData: function (res) {
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
    // 关闭弹窗
    $('.playHeader .close').click(function () {
        $(this).parent().parent().addClass('margin0')
        $(this).parents('.maskContnet').fadeOut();
    });
    var mailOrderData = null;
    // 监听
    table.on('tool(mailTableOn)', function (obj) {
        console.log(obj);
        mailOrderData = obj.data;
        if (obj.event == 'delivery') {
            popupShow('deliveryCont', 'deliveryBox');
        } else if (obj.event) {
            $('.editCont input[name="company"]').val(mailOrderData.express_type);
            $('.editCont input[name="logisticsNumber"]').val(mailOrderData.express_number)
            popupShow('editCont', 'editBox')
        }

    });
    // 取消
    $('.deliveryCont .cancelBtn').click(function () {
        popupHide('deliveryCont', 'deliveryBox')
    })
    //确定发货
    $('.deliveryCont .determinePushBtn').click(function () {
        if (!($('.deliveryBody input[name="company"]').val() && $('.deliveryBody input[name="logisticsNumber"]').val())) {
            layer.msg('带*为必填', { icon: 7 });
            return;
        };
        $('.mask').fadeIn();
        $('.maskSpan').addClass('maskIcon');
        var deliveryObj = JSON.stringify({
            number: mailOrderData.number,
            express_type: $('.deliveryBody input[name="company"]').val(),
            express_number: $('.deliveryBody input[name="logisticsNumber"]').val(),
        });
        loadingAjax('/api/order/updateMailMsg', 'post', deliveryObj, sessionStorage.token, 'mask', 'deliveryCont', 'deliveryBox', layer).then(res => {
            layer.msg(res.message, { icon: 1 });
            mailTable.reload({
                where: {}
            });
            $('.deliveryBody input[name="company"]').val(''),
                $('.deliveryBody input[name="logisticsNumber"]').val('')
        }).catch(err => {
            layer.msg(err.message, { icon: 2 });
        })
    });
    // 取消编辑
    // 取消
    $('.editCont .cancelBtn').click(function () {
        popupHide('editCont', 'editBox')
    });
    // 确定编辑
    $('.editCont .determinePushBtn').click(function () {
        if (!($('.editCont input[name="company"]').val() && $('.editCont input[name="logisticsNumber"]').val())) {
            layer.msg('带*为必填', { icon: 7 });
            return;
        };
        $('.mask').fadeIn();
        $('.maskSpan').addClass('maskIcon');
        var editObj = JSON.stringify({
            number: mailOrderData.number,
            express_type: $('.editCont input[name="company"]').val(),
            express_number: $('.editCont input[name="logisticsNumber"]').val(),
        });
        loadingAjax('/api/order/updateOrder', 'post', editObj, sessionStorage.token, 'mask', 'editCont', 'deliveryBox', layer).then(res => {
            layer.msg(res.message, { icon: 1 });
            mailTable.reload({
                where: {}
            });
        }).catch(err => {
            layer.msg(res.message, { icon: 1 });
        })
    })

    //导出订单 
    $('.pushBtn').click(function () {
        popupShow('exportCont', 'exportBox');
    })
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
    // 取消导出
    $('.exportCont .cancelBtn').click(function () {
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
        xhr.open("POST", `/api/order/exportMailExcel`, true);
        xhr.setRequestHeader("token", sessionStorage.token);

        xhr.setRequestHeader('Content-Type', 'application/json;charset=utf-8');
        xhr.responseType = 'blob';//设置ajax的响应类型为blob;

        xhr.onload = function (res) {
            console.log(xhr)
            if (xhr.status == 200) {
                $('.mask').fadeOut();
                $('.maskSpan').removeClass('maskIcon');
                var content = xhr.response;
                // var fileName = `${marchantName}(${dataOf}).xlsx`; // 保存的文件名
                var fileName = `${sessionStorage.marchantName}邮寄订单(${exportStareTime}-${exportEndTime}).xlsx`
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
            end_time: exportEndTime,
            merchantId: Number(sessionStorage.machineID)
        })
        xhr.send(orderObj);
    });
    // 日期选择
    var startTime = '';
    //结束时间
    var endTime = '';
    var laydate = layui.laydate;
    laydate.render({
        elem: '#test6',
        range: true,
        done: function (value) {
            var timerKey = value.split(' - ');
            startTime = timerKey[0];
            endTime = timerKey[1];
        }
    });
    // 查询
    $('.queryBtn').click(function () {
        mailTable.reload({
            where: {
                condition: startTime,
                conditionTwo: endTime,
                conditionThree: $('.key-contnet input[name="orderCode"]').val(),
            }
        })
    });
    // 刷新页面
    $('.refreshBtn').click(function () {
        location.reload();
    });
    var stra = JSON.stringify({
        random: '121312313'
    })
    loadingAjax('/api/order/getVerificationCode', 'post', stra).then(res => {
        console.log(res)
    }).catch(err => {
        // console.log(err)
        $('.imgs').attr('src', err)
    })
})