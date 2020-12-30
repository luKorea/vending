import '../../MyCss/goods/customCategory.css';
layui.use(['table', 'form', 'layer', 'tree', 'laydate'], function () {
    tooltip('.refreshBtnList', { transition: true, time: 200 });
    sessionStorage.classTag = sessionStorage.machineID;
    var table = layui.table,
        layer = layui.layer,
        tree = layui.tree,
        rank = null,
        laydate = layui.laydate,
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
        , cols: [[
            {
                field: 'info', width: 220, title: '售货机名(编号)', align: 'center', templet: function (d) {
                    return `<div>${d.info}</div>
                      <div>(${d.machineId})</div>`
                }
            },
            { field: 'number', width: 190, title: '订单编号', align: 'center' },
            {
                field: 'number', width: 130, title: '订单类型', align: 'center', templet: function (d) {
                    return d.mail == 0 ? '售货机订单' : '邮寄订单'
                }
            },
            {
                field: 'amount', width: 130, title: '订单金额(￥)', align: 'center'
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
                    var total = 0;
                    var result = 0;
                    d.goodsList.forEach(item => {
                        total += item.count;
                        result += item.refund_count
                    })
                    return result == 0 ? '未退款' : total - result == 0 ? '全部退款' : '部分退款'
                }
            },
            {
                field: 'shipStatus', width: 150, title: '出货状态', align: 'center', templet: function (d) {
                    return d.mail == 0 ? d.shipStatus == 0 ? '未出货' : d.shipStatus == 1 ? '部分出货失败' : '全部出货成功' : '-'
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
                field: 'ship_info', width: 200, title: '邮寄信息', align: 'center', templet: function (d) {
                    if(d.mail == 1){
                        return `
                                <div>收货人:${d.sign_name}</div>
                                <div>收货人电话:${d.sign_phone}</div>
                                <div>s收货地址:${d.sign_address}</div>
                                <div>快递/物流状态:${d.dispatch_status == 0 ? '未发货' : d.dispatch_status == 1 ? '已发货' : '已收货'}</div>
                                <div>快递/物流公司:${d.express_type ? d.express_type : '-'}</div>
                                <div>快递/物流单号:${d.express_number ? d.express_number : '-'}</div>
                               `
                    }else{
                        return '-'
                    }
                    
                }
            },
            {
                field: 'sales_no', width: 160, title: '销售经理', align: 'center', templet: function (d) {
                    return d.sales_no ? d.sales_no : '-'
                }
            },

            { field: 'payee', width: 160, title: '收款方', align: 'center', },
        ]]
        , id: 'tableId'
        , page: true
        , loading: true
        , request: {
            'pageName': 'pageNum',
            'limitName': 'pageSize'
        },
        where: {
            merchant_id: sessionStorage.machineID
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
    treeFun(tree, 'testGoods', tableIns, dataList, 'merchant_id', '', '', '', 'true');
    // 刷新商户列表
    $('.refreshBtnList').click(function () {
        var dataList1 = treeList();
        if (JSON.stringify(dataList1) != JSON.stringify(dataList)) {
            dataList = dataList1;
            treeFun(tree, 'testGoods', tableIns, dataList, 'merchant_id', '', '', '', 'true');
            tableIns.reload({
                where: {
                    merchantId: sessionStorage.machineID,
                }
            })
            layer.msg('已刷新', { icon: 1 })
        } else {
            layer.msg('已刷新', { icon: 1 })
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
    var addFlag = false,
        editFlag = false,
        delFlag = false,
        fourFlag = false;
    permissionsVal(373, 374, 372, 403).then(res => {
        addFlag = res.addFlag;
        editFlag = res.editFlag;
        delFlag = res.delFlag;
        fourFlag = res.fourFlag;
        permissions();
    }).catch(err => {
        layer.msg('服务器请求超时', { icon: 7 })
    })
    function permissions() {

    };
    $('.pushBtn').click(function () {
        if (!(startTime && endTime)) {
          layer.msg('请选择时间', { icon: 7 });
          return;
        }
        if (timeFlag(startTime, endTime)) {
          layer.msg('时间选择范围最多三个月', { icon: 7 });
          return;
        }
        $('.mask').fadeIn();
        $('.maskSpan').addClass('maskIcon');
        var myDate = new Date(),
          // dataOf = myDate.getFullYear() + '' + (myDate.getMonth()+1>=10?myDate.getMonth()+1:'0'+(myDate.getMonth()+1) )+ '' +( myDate.getDate()>=10?myDate.getDate():'0'+myDate.getDate()),
          xhr = new XMLHttpRequest();//定义一个XMLHttpRequest对象
        xhr.open("POST", `${vApi}/order/exportExcel`, true);
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
            var fileName = `${marchantName}订单(${startTime}-${endTime}).xlsx`
            var elink = document.createElement('a');
            elink.download = fileName;
            elink.style.display = 'none';
            var blob = new Blob([content]);
            elink.href = URL.createObjectURL(blob);
            document.body.appendChild(elink);
            elink.click();
            document.body.removeChild(elink);
            // }
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
          merchantId: merchantId
        })
        xhr.send(orderObj);
      })
})                                                      