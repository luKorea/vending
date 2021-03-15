import '../../MyCss/order/orderList.scss';
import {
    loadAjax,
    popupShow,
    popupHide,
    dataLoading,
    closeData,
    wholeNum,
    numFormat2,
    mulCaluter,
    fixedFun,
    getKeyTime,
    timeFlag
} from '../../common/common.js';

layui.use(['table', 'form', 'layer', 'tree', 'util', 'laydate'], function () {
    var $ = layui.jquery,
        table = layui.table,
        layer = layui.layer,
        laydate = layui.laydate,
        token = sessionStorage.token,
        startTime = getKeyTime().startTime,
        endTime = getKeyTime().endTime;

    let roleData = JSON.parse(sessionStorage.roleData),
        permissionsObjFlag = permissionsVal1(permissionData, roleData);

    function permissions() {
        permissionsObjFlag[6] ? removeClass('.pushBtnShow') : addClass('.pushBtnShow');
        permissionsObjFlag[7] ? removeClass('.list-table') : (
            addClass('.list-table'), removeClass('.role-text')
        );
    }

    permissions();


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
    var tableIns = table.render({
        elem: '#tableTest',
        url: `${Vapi}/order/getOrder`,
        method: 'post',
        contentType: "application/json",
        headers: {
            token,
        },
        cols: [[
            {field: 'orderId', width: 180, title: '订单编号', align: 'center',},
            {field: 'orderYard', width: 180, title: '订单码', align: 'center'},
            {field: 'flagStr', width: 130, title: '扣费状态', align: 'center'},
            {
                field: 'expressMoney', width: 130, title: '物流费用', align: 'center', templet: function (d) {
                    return numFormat2(d.expressMoney)
                }
            },
            {
                field: 'qualityMoney', width: 130, title: '质检费用', align: 'center', templet: function (d) {
                    return numFormat2(d.qualityMoney)
                }
            },
            // { field: 'flagStr', width: 180, title: '扣费状态', align: 'center' },
            {field: 'bicId', width: 160, title: '商家ID', align: 'center'},
            {field: 'companyName', width: 160, title: '商家名称', align: 'center'},
            {field: 'orderAppointFlag', width: 160, title: '订单履约状态', align: 'center'},
            {field: 'cancelStr', width: 160, title: '是否取消', align: 'center'},
            {field: 'interceptStr', width: 160, title: '是否拦截', align: 'center'},
            {field: 'interceptCause', width: 160, title: '拦截原因', align: 'center'},
            {field: 'mergeBatch', width: 160, title: '合并批次号', align: 'center'},
            {field: 'storageNumber', width: 160, title: '入库件数', align: 'center'},
            {field: 'testingInstitutes', width: 160, title: '质检机构', align: 'center'},
            {field: 'qualityResult', width: 160, title: '质检结果', align: 'center'},
            {field: 'recheckResult', width: 160, title: '复检结果', align: 'center'},
            {field: 'planExpress', width: 160, title: '计划发货快递', align: 'center'},
            {field: 'realityExpress', width: 160, title: '实际发货快递', align: 'center'},
            {field: 'expressNumber', width: 160, title: '快递单号', align: 'center'},
            {field: 'placeReceipt', width: 160, title: '收货省份', align: 'center'},
            {field: 'orderTime', width: 180, title: '下单时间', align: 'center'},
            {field: 'storageTime', width: 180, title: '入库时间', align: 'center'},
            {field: 'inspectTime', width: 180, title: '送检时间', align: 'center'},
            {field: 'accomplishTime', width: 180, title: '质检完成时间', align: 'center'},
            {field: 'deliveryTime', width: 180, title: '出库时间', align: 'center'},
            // { field: 'operation', width: 150, title: '操作', toolbar: '#barDemo',fixed: 'right', align: 'center' },
        ]]
        , id: 'tableId'
        , page: true,
        loading: true,
        even: true,
        request: {
            'pageName': 'pageNum',
            'limitName': 'pageSize'
        },
        where: {
            startTime,
            endTime,
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
            if (res.code == 403) {
                layer.msg('登录过期,请重新登录', {icon: 2})
                setTimeout(__ => {
                    window.parent.location.href = "login.html";
                }, 1500)
            }
            fixedFun();
        }
    });
    // 关闭弹窗
    $('.playHeader .close').click(function () {
        $(this).parent().parent().addClass('margin0')
        $(this).parents('.maskContnet').fadeOut();
    });
    // 查询
    $('.queryBtnClick').click(function () {
        if (timeFlag(startTime, endTime)) {
            layer.msg('时间选择范围最多三个月', {icon: 7});
            return;
        }
        tableIns.reload({
            where: {
                orderId: $('.newKeyContent input[name="orderId"]').val(),
                orderYard: $('.newKeyContent input[name="orderYard"]').val(),
                bicId: $('.newKeyContent input[name="bicId"]').val(),
                companyName: $('.newKeyContent input[name="companyName"]').val(),
                startTime,
                endTime,
            }
        })
    });
    //监听工具条
    var companyData = null,
        operationFlag = null;
    table.on('tool(tableTest)', function (obj) {
        event.stopPropagation();
        companyData = obj.data;
        if (obj.event === 'operation') {
            if (operationFlag == obj.data.companyId) {
                $('.ListOperation').fadeOut();
                operationFlag = null;
                return;
            }
            operationFlag = obj.data.companyId;
            $('.ListOperation').fadeIn();
            $('.ListOperation').css({
                left: $(this).offset().left - 35 + 'px',
                top: $(this).offset().top + 35 + 'px'
            })
        }
    });
    //    点击导入订单
    $('.pushBtnShow').click(function () {
        popupShow('.pushOrderContent', '.pushOrderBox');
    });
    // 导入订单
    // 导入销售经理
    $('#pushMerchants').change(function (e) {
        if (!$(this).val()) {
            return;
        }
        var that = this;
        var upDetails = new FormData();
        upDetails.append('file', e.target.files[0]);
        dataLoading();
        $.ajax({
            type: 'post',
            url: `${Vapi}/order/excelOrder`,
            processData: false,
            contentType: false,
            timeout: 60000,
            headers: {
                token: sessionStorage.token,
            },
            data: upDetails,
            success: function (res) {
                closeData();
                $(that).val('')
                if (res.code == 200) {
                    layer.msg(res.message, {icon: 1});
                    tableIns.reload({
                        where: {}
                    });
                    // $('.pushOrderBox .message .import_fail').html('全部导入成功')
                    popupHide('.pushOrderContent ', '.pushOrderBox')
                } else if (res.code == 403) {
                    layer.msg('登录过期,请重新登录', {icon: 2})
                    setTimeout(__ => {
                        window.parent.location.href = "login.html";
                    }, 1500)
                } else {
                    // layer.msg(res.message, { icon: 7 });
                    popupHide('.pushOrderContent', '.pushOrderBox');
                    popupShow('.catchContent', '.messageBox');
                    if (res.data.length > 0) {
                        pushLoseFin(res.data);
                    } else {
                        $('.messageBox .message .import_fail').html('导入失败')
                    }
                }
            },
            error: function (err) {
                $(that).val('');
                closeData();
                $('.maskSpan').removeClass('maskIcon')
                layer.msg('服务器请求超时', {icon: 2})
            }
        })
    })

    // 导入失败提示方法
    function pushLoseFin(list) {
        console.log(list);
        var str = ''
        list.forEach(item => {
            str += `<p>${item.replace('null', '')}</p>`
        });

        $('.messageBox .message .import_fail').html(str)
    }

    $('body').click(function () {
        $('.ListOperation').fadeOut();
        operationFlag = null;
    });
});