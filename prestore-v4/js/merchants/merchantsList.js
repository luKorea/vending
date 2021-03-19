import '../../MyCss/merchants/merchantsList.scss';
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
    timeStampM
} from '../../common/common.js';

layui.use(['table', 'form', 'layer', 'tree', 'util'], function () {
    if (!sessionStorage.token) {
        window.parent.location.href = "login.html";
    }

    let roleData = JSON.parse(sessionStorage.roleData),
        permissionsObjFlag = permissionsVal1(permissionData, roleData);

    function permissions() {
        permissionsObjFlag[8] ? removeClass('.addBtn') : addClass('.addBtn');
        permissionsObjFlag[9] ? removeClass('.ListOperation .edit') : addClass('.ListOperation .edit');
        permissionsObjFlag[10] ? removeClass('.list-table') :
            (addClass('.list-table'), removeClass('.role-text'));
        permissionsObjFlag[11] ? removeClass('.ListOperation .topUpBtn') : addClass('.ListOperation .topUpBtn');
        permissionsObjFlag[12] ? removeClass('.ListOperation .reductionsBtn') : addClass('.ListOperation .reductionsBtn');
        permissionsObjFlag[13] ? removeClass('.ListOperation .del') : addClass('.ListOperation .del');
        permissionsObjFlag[14] ? removeClass('.pushBtn') : addClass('.pushBtn');
        permissionsObjFlag[15] ? removeClass('.importBtn') : addClass('.importBtn');
        permissionsObjFlag[16] ? removeClass('.ListOperation .use') : addClass('.ListOperation .use');
        permissionsObjFlag[17] ? removeClass('.ListOperation .top') : addClass('.ListOperation .top');
        permissionsObjFlag[27] ? removeClass('.importQuality') : addClass('.importQuality');
    }

    permissions();

    var $ = layui.jquery,
        table = layui.table,
        layer = layui.layer,
        form = layui.form,
        token = sessionStorage.token;
    var tableIns = table.render({
        elem: '#tableTest',
        url: `${Vapi}/company/getCompany`,
        method: 'post',
        contentType: "application/json",
        headers: {
            token,
        },
        cols: [[
            {field: 'goods_images', width: 20, title: '', templet: "#imgtmp", align: 'center'},
            {field: 'bicId', width: 160, title: '商家ID', align: 'center'},
            {field: 'companyName', width: 250, title: '商家名称', align: 'center'},
            {field: 'startUsingStr', width: 110, title: '是否启用', align: 'center'},
            {
                field: 'balance', width: 160, title: '余额', align: 'center', templet: function (d) {
                    return numFormat2(d.balance)
                }
            },
            {
                field: 'freezeMoney', width: 150, title: '冻结金额', align: 'center', templet: function (d) {
                    return numFormat2(d.freezeMoney)
                }
            },
            {
                field: 'usableBalance', width: 150, title: '可用金额', align: 'center', templet: function (d) {
                    return numFormat2(d.usableBalance)
                }
            },
            {
                field: 'moneyRemind', width: 150, title: '余额预警值', align: 'center', templet: function (d) {
                    return numFormat2(d.moneyRemind)
                }
            },
            {field: 'remark', width: 180, title: '备注', align: 'center'},
            {field: 'operation', width: 150, title: '操作', toolbar: '#barDemo', align: 'center'},
        ]]
        , id: 'tableId'
        , page: true,
        loading: true,
        even: true,
        request: {
            'pageName': 'pageNum',
            'limitName': 'pageSize'
        },
        where: {},
        parseData: function (res) {
            if (res.code === 200) {
                return {
                    "code": res.code, //解析接口状态
                    "msg": res.message, //解析提示文本
                    "count": res.data.total, //解析数据长度
                    "data": res.data.list //解析数据列表
                };
            } else {
                return {
                    "code": res.code,//解析接口状态
                    "msg": res.message, //解析提示文本
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
            for (var i in res.data) {
                var item = res.data[i];
                if (item.flag == 2) {// 这里是判断需要禁用的条件（如：状态为0的）
                    // checkbox 根据条件设置不可选中
                    $('.data_list1 tr[data-index=' + i + ']').addClass('warning');
                }
            }
            fixedFun();
        }
    });
    // 关闭弹窗
    $('.playHeader .close').click(function () {
        orderIns = null;
        $(this).parent().parent().addClass('margin0')
        $(this).parents('.maskContnet').fadeOut();
    });
    // 查询
    $('.queryBtnClick').click(function () {
        tableIns.reload({
            where: {
                companyName: $('.addMember input[name="keyMerchants"]').val(),
                bicId: $('.addMember input[name="keyBIC"]').val()
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

    // 添加商户
    $('.addBtn').click(function () {
        popupShow('.addMerchantsCont', '.addMBox');
    })

    //点击取消添加
    $('.addMBox .cancel1').click(function () {
        popupHide('.addMerchantsCont', '.addMBox')
    })
    // 確定添加
    $('.addMBox .determine1').click(function () {
        if (!($('.addMBody input[name="companyName"]').val() && $('.addMBody input[name="bicId"]').val() && $('.addMBody input[name="moneyRemind"]').val())) {
            layer.msg('带*为必填', {icon: '7'});
            return;
        }
        // if (!(wholeNum($('.addMBody input[name="moneyRemind"]').val()))) {
        //     layer.msg('余额预警值必须为正整数', { icon: '7' });
        //     return;
        // }
        dataLoading();
        var addCompanyObj = JSON.stringify({
            companyName: $('.addMBody input[name="companyName"]').val(),
            bicId: $('.addMBody input[name="bicId"]').val(),
            moneyRemind: mulCaluter(Number($('.addMBody input[name="moneyRemind"]').val()), 100),
            startUsing: $('.addMBox input[name="open"]').prop('checked') ? 2 : 1,
            remark: $('.addMBody input[name="remark"]').val(),
            balance: mulCaluter(Number($('.addMBody input[name="balance"]').val()), 100),
            // mulCaluter(Number($('.topUPBox input[name="topUpNum"]').val()), 100),
        });
        loadAjax('/company/addCompany', 'post', sessionStorage.token, addCompanyObj, layer, 'mask', '.addMerchantsCont', '.addMBox').then(res => {
            layer.msg(res.message, {icon: 1});
            tableIns.reload({
                where: {}
            });
            $('.addMBody input[name="companyName"]').val('');
            $('.addMBody input[name="bicId"]').val('');
            $('.addMBody input[name="moneyRemind"]').val('');
            $('.addMBody input[name="balance"]').val('');
            $('.addMBody input[name="remark"]').val('');
        }).catch(err => {
            layer.msg(err.message, {icon: 2});
        })
    })
    // 点击充值
    $('.ListOperation .topUpBtn').click(function () {
        $('.topUPBox input[name="bicId"]').val(companyData.bicId)
        $('.topUPBox input[name="companyName"]').val(companyData.companyName)
        $('.topUPBox input[name="balance"]').val(companyData.balance)
        popupShow('.topUPContent', '.topUPBox')
    });
    // 确定充值
    $('.topUPBox .determine1').click(function () {
        if (!($('.topUPBox input[name="topUpNum"]').val())) {
            layer.msg('带*为必填', {icon: 7})
            return;
        }
        if (!($('.topUPBox input[name="topUpNum"]').val() > 0)) {
            layer.msg('充值金额必须大于0', {icon: 7});
            return;
        }
        layer.confirm('确定充值?', function (index) {
            layer.close(index);
            dataLoading();
            var topUpObj = JSON.stringify({
                // balance:Number($('.topUPBox input[name="topUpNum"]').val())*100,
                balance: mulCaluter(Number($('.topUPBox input[name="topUpNum"]').val()), 100),
                companyId: companyData.companyId,
                remark: $('.topUPBox input[name="remark"]').val()
            });
            loadAjax('/company/addBalance', 'post', sessionStorage.token, topUpObj, layer, 'mask', '.topUPContent', '.topUPBox').then(res => {
                layer.msg(res.message, {icon: 1});
                tableIns.reload({
                    where: {}
                });
                $('.topUPBox input[name="topUpNum"]').val('');
                $('.topUPBox input[name="remark"]').val('')
            }).catch(err => {
                layer.msg(err.message, {icon: 2});
            })
        })

    });
    //点击取消充值
    $('.topUPBox .cancel1').click(function () {
        popupHide('.topUPContent', '.topUPBox')
    });
    // 点击核销余额
    $('.ListOperation .reductionsBtn').click(function () {
        $('.reductionsBox input[name="bicId"]').val(companyData.bicId)
        $('.reductionsBox input[name="companyName"]').val(companyData.companyName)
        $('.reductionsBox input[name="balance"]').val(companyData.balance)
        popupShow('.reductionsCOntent', '.reductionsBox');
    });
    // 确定核销
    $('.reductionsBox .determine1').click(function () {
        if (!($('.reductionsBox input[name="reductionsNum"]').val())) {
            layer.msg('带*为必填', {icon: 7})
            return;
        }
        if (!($('.reductionsBox input[name="reductionsNum"]').val() > 0)) {
            layer.msg('调减金额必须大于0', {icon: 7});
            return;
        }
        layer.confirm('确定调减?', function (index) {
            layer.close(index);
            dataLoading();
            var reductionObj = JSON.stringify({
                balance: mulCaluter(Number($('.reductionsBox input[name="reductionsNum"]').val()), 100),
                companyId: companyData.companyId,
                remark: $('.reductionsBox input[name="remark"]').val()
            });
            loadAjax('/company/subBalance', 'post', sessionStorage.token, reductionObj, layer, 'mask', '.reductionsCOntent', '.reductionsBox').then(res => {
                layer.msg(res.message, {icon: 1});
                tableIns.reload({
                    where: {}
                });
                $('.reductionsBox input[name="reductionsNum"]').val('');
                $('.reductionsBox input[name="remark"]').val('')
            }).catch(err => {
                layer.msg(err.message, {icon: 2});
            })
        })
    });
    //点击取消核销
    $('.reductionsBox .cancel1').click(function () {
        popupHide('.reductionsCOntent', '.reductionsBox')
    });
    // 编辑
    $('.ListOperation .edit').click(function () {
        $('.editBox input[name="companyName"]').val(companyData.companyName);
        $('.editBox input[name="bicId"]').val(companyData.bicId);
        $('.editBox input[name="moneyRemind"]').val(companyData.moneyRemind)
        $('.editBox input[name="open"]').prop('checked', companyData.startUsing == 2 ? true : false);
        $('.editBox input[name="remark"]').val(companyData.remark)
        form.render('checkbox');
        popupShow('.editContent', '.editBox')
    });
    // 确定编辑
    $('.editBox .determine1').click(function () {
        if (!($('.editBox input[name="companyName"]').val() && $('.editBox input[name="bicId"]').val() && $('.editBox input[name="moneyRemind"]').val())) {
            layer.msg('带*为必填', {icon: '7'});
            return;
        }
        // if (!(wholeNum($('.editBox input[name="moneyRemind"]').val()))) {
        //     layer.msg('余额预警值必须为正整数', { icon: '7' });
        //     return;
        // }
        dataLoading();
        var editCompanyObj = JSON.stringify({
            companyName: $('.editBox input[name="companyName"]').val(),
            bicId: $('.editBox input[name="bicId"]').val(),
            moneyRemind: mulCaluter(Number($('.editBox input[name="moneyRemind"]').val()), 100),
            companyId: companyData.companyId,
            startUsing: $('.editBox input[name="open"]').prop('checked') ? 2 : 1,
            remark: $('.editBox input[name="remark"]').val(),
        });
        loadAjax('/company/updateCompany', 'post', sessionStorage.token, editCompanyObj, layer, 'mask', '.editContent', '.editBox').then(res => {
            layer.msg(res.message, {icon: 1});
            tableIns.reload({
                where: {}
            });
        }).catch(err => {
            layer.msg(err.message, {icon: 2});
        })
    })
    // 取消编辑
    //点击取消核销
    $('.editBox .cancel1').click(function () {
        popupHide('.editContent', '.editBox')
    });
    $('body').click(function () {
        $('.ListOperation').fadeOut();
        $('.ListUseOperation').fadeOut();
        $('.ListDateOperation').fadeOut();
        operationFlag = null;
    });


    // 删除
    $('.ListOperation .del').click(function () {
        layer.confirm('确定删除?', function (index) {
            layer.close(index);
            dataLoading();
            var delObj = {
                companyId: companyData.companyId,
            };
            loadAjax('/company/deleteCompanyId', 'get', sessionStorage.token, delObj, layer, 'mask').then(res => {
                layer.msg(res.message, {icon: 1});
                tableIns.reload({
                    where: {}
                });
            }).catch(err => {
                layer.msg(err.message, {icon: 2});
            })
        })
    })
    // 充值调减记录
    $('.ListOperation .top').click(function () {
        popupShow('.TopUpRecordContent', '.topUpRecordBox')
        if (TopUpIns) {
            TopUpIns.reload({
                where: {
                    companyId: companyData.companyId
                }
            })
        } else {
            topUpFun();
        }
        $('.topUpRecordBox .playHeader span').html(`${companyData.companyName}充值/调减记录`)
    });

    // 使用记录
    $('.ListOperation .use').click(function () {
        if (useIns) {
            useIns.reload({
                where: {
                    bicId: companyData.companyId
                }
            })
        } else {
            useFun();
        }
        $('.useRecordBox .playHeader span').html(companyData.companyName + '使用记录')
        popupShow('.useRecordContent', '.useRecordBox');
    });


    // 充值调减记录部分
    var TopUpIns = null;

    function topUpFun() {
        TopUpIns = table.render({
            elem: '#TopUpTable',
            url: `${Vapi}/logCompany/getTopUpLog`,
            method: 'post',
            contentType: "application/json",
            headers: {
                token,
            },
            cols: [[

                {
                    field: 'frontBalance', width: 160, title: '充值/调减前余额', align: 'center', templet: function (d) {
                        return numFormat2(d.frontBalance)
                    }
                },
                {
                    field: 'money', width: 160, title: '充值/调减金额', align: 'center', templet: function (d) {
                        if (d.flag == 1) {
                            return '-' + numFormat2(d.money)
                        } else {
                            return numFormat2(d.money)
                        }

                    }
                },
                {
                    field: 'laterBalance', width: 160, title: '充值/调减后余额', align: 'center', templet: function (d) {
                        return numFormat2(d.laterBalance)
                    }
                },
                {field: 'remark', width: 160, title: '备注', align: 'center'},
                {
                    field: 'logTime', width: 180, title: '充值/调减时间', align: 'center'
                },
            ]]
            , id: 'tioUpId'
            , page: true,
            loading: true,
            even: true,
            request: {
                'pageName': 'pageNum',
                'limitName': 'pageSize'
            },
            where: {
                companyId: companyData.companyId
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
    }

    // 使用记录
    var useIns = null;
    // TODO 每月
    function useFun() {
        useIns = table.render({
            elem: '#useTable',
            url: `${Vapi}/logCompany/orderStatistics`,
            method: 'GET',
            headers: {
                token,
            },
            cols: [[
                {
                    field: 'statisticsTime', width: 200, title: '使用月份', align: 'center', templet: function (d) {
                        if (d.statisticsTime) {
                            return timeStampM(d.statisticsTime)
                        } else {
                            return '-'
                        }
                    }
                },
                {
                    field: 'orderstatisticsId', width: 150, title: '快递费用', align: 'center', templet: function (d) {
                        return '-'
                    }
                },
                {
                    field: 'ID', width: 150, title: '质检费用', align: 'center', templet: function (d) {
                        return '-'
                    }
                },
                {
                    field: 'monthMoney', width: 150, title: '使用金额', align: 'center', templet: function (d) {
                        if (d.monthMoney || d.monthMoney == 0) {
                            return numFormat2(d.monthMoney)
                        } else {
                            return '-'
                        }
                    }
                },
                {field: 'operationUse', width: 150, title: '操作', toolbar: '#barUser', align: 'center'},
            ]]
            , id: 'useId'
            , page: true,
            loading: true,
            even: true,
            request: {
                'pageName': 'pageNum',
                'limitName': 'pageSize'
            },
            where: {
                bicId: companyData.companyId
            },
            parseData: function (res) {
                //res 即为原始返回的数据
                if (res.code == 200) {
                    return {
                        "code": res.code,//解析接口状态
                        "msg": res.message,//解析提示文本
                        "count": res.data.total,//解析数据长度
                        "data": res.data.list //解析数据列表
                    };
                } else {
                    return {
                        "code": res.code,//解析接口状态
                        "msg": res.message,  //解析提示文本
                    }
                }
            },
            response: {
                statusCode: 200//规定成功的状态码，默认：0
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
    }
    var useData = null;
    table.on('tool(useTable)', function (obj) {
        console.log(obj);
        event.stopPropagation();
        useData = obj.data;
        if (obj.event === "operation") {
            $('.ListUseOperation').fadeIn();
            $('.ListUseOperation').css({
                left: $(this).offset().left - 35 + 'px',
                top: $(this).offset().top + 35 + 'px'
            })
        }
    });

    //使用记录种点击查看详情
    $('.ListUseOperation .detail').click(function () {
        console.log(1);
        if (dayIns) {
            dayIns.reload({
                where: {
                    bicId: companyData.bicId,
                    time: timeStampM(useData.statisticsTime),
                }
            })
        } else {
            dayUseFun();
        }
        $('.dayRecordBox .playHeader span').html(`${companyData.companyName}(${timeStampM(useData.statisticsTime)})使用记录`)
        popupShow('.dayRecordContent', '.dayRecordBox')
    });
    $('.ListUseOperation .quality').click(function () {
        console.log(1);
        if (dayIns) {
            dayIns.reload({
                where: {
                    bicId: companyData.bicId,
                    time: timeStampM(useData.statisticsTime),
                }
            })
        } else {
            dayUseFun();
        }
        $('.dayRecordBox .playHeader span').html(`${companyData.companyName}(${timeStampM(useData.statisticsTime)})使用记录`)
        popupShow('.dayRecordContent', '.dayRecordBox')
    });
    $('.ListUseOperation .express').click(function () {
        console.log(1);
        if (dayIns) {
            dayIns.reload({
                where: {
                    bicId: companyData.bicId,
                    time: timeStampM(useData.statisticsTime),
                }
            })
        } else {
            dayUseFun();
        }
        $('.dayRecordBox .playHeader span').html(`${companyData.companyName}(${timeStampM(useData.statisticsTime)})使用记录`)
        popupShow('.dayRecordContent', '.dayRecordBox')
    });

    //   每日使用情况
    var dayIns = null;

    // TODO 每天
    function dayUseFun() {
        dayIns = table.render({
            elem: '#dayTable',
            url: `${Vapi}/company/findDayOrder`,
            method: 'GET',
            headers: {
                token,
            },
            cols: [[
                {field: 'day', width: 150, title: '使用时间', align: 'center'},
                {
                    field: 'orderstatisticsId', width: 150, title: '快递费用', align: 'center', templet: function (d) {
                        return '-'
                    }
                },
                {
                    field: 'ID', width: 150, title: '质检费用', align: 'center', templet: function (d) {
                        return '-'
                    }
                },
                {
                    field: 'money', width: 150, title: '使用金额', align: 'center', templet: function (d) {
                        return numFormat2(d.money)
                    }
                },
                {field: 'operationDate', width: 150, title: '操作', toolbar: '#barDate', align: 'center'},
            ]]
            , id: 'dayId',
            loading: true,
            even: true,
            request: {
                'pageName': 'pageNum',
                'limitName': 'pageSize'
            },
            initSort: {
                field: 'day' //排序字段，对应 cols 设定的各字段名
                , type: 'desc' //排序方式  asc: 升序、desc: 降序、null: 默认排序
            },
            where: {
                bicId: companyData.bicId,
                time: timeStampM(useData.statisticsTime),
            },
            parseData: function (res) {
                //res即为原始返回的数据
                if (res.code == 200) {
                    return {
                        "code": res.code, //解析接口状态
                        "msg": res.message, //解析提示文本
                        "count": res.data.length, //解析数据长度
                        "data": res.data //解析数据列表
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
    };
    var dateData = null;
    table.on('tool(dayTable)', function (obj) {
        event.stopPropagation();
        dateData = obj.data;
        if (obj.event === "operation") {
            $('.ListDateOperation').fadeIn();
            $('.ListDateOperation').css({
                left: $(this).offset().left - 35 + 'px',
                top: $(this).offset().top + 35 + 'px'
            })
        }
    });
    $('.ListDateOperation .detail').click(function () {
        console.log(dateData);
        if (orderIns) {
            orderIns.reload({
                where: {
                    data: dateData.orders
                }
            })
        } else {
            dayOrderFun(dateData.orders)
        }
        $('.dayOrderBox .playHeader span').html(`${companyData.companyName}(${dateData.day})使用记录`)
        popupShow('.dayOrderContent', '.dayOrderBox')
    });
    $('.ListDateOperation .quality').click(function () {
        console.log(dateData);
        if (orderIns) {
            orderIns.reload({
                where: {
                    data: dateData.orders
                }
            })
        } else {
            dayOrderFun(dateData.orders)
        }
        $('.dayOrderBox .playHeader span').html(`${companyData.companyName}(${dateData.day})使用记录`)
        popupShow('.dayOrderContent', '.dayOrderBox')
    });
    $('.ListDateOperation .express').click(function () {
        console.log(dateData);
        if (orderIns) {
            orderIns.reload({
                where: {
                    data: dateData.orders
                }
            })
        } else {
            dayOrderFun(dateData.orders)
        }
        $('.dayOrderBox .playHeader span').html(`${companyData.companyName}(${dateData.day})使用记录`)
        popupShow('.dayOrderContent', '.dayOrderBox')
    });
    // 每日订单
    var orderIns = null;
    function dayOrderFun(data) {
        orderIns = table.render({
            elem: '#orderTable',
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
                {field: 'orderTimeStr', width: 180, title: '下单时间', align: 'center'},
                {field: 'storageTimeStr', width: 180, title: '入库时间', align: 'center'},
                {field: 'inspectTimeStr', width: 180, title: '送检时间', align: 'center'},
                {field: 'accomplishTimeStr', width: 180, title: '质检完成时间', align: 'center'},
                {field: ' deliveryTime', width: 180, title: '出库时间', align: 'center'},
            ]]
            , id: 'orderId',
            loading: true,
            page: true,
            even: true,
            data,
            request: {
                'pageName': 'pageNum',
                'limitName': 'pageSize'
            },
        });
    };



    // 导出商家
    // 确认导出
    $('.pushBtn').click(function () {
        dataLoading();
        let xhr = new XMLHttpRequest(), //定义一个XMLHttpRequest对象
            companyName = $("input[name='keyMerchants']").val(),
            bicId = $("input[name='keyBIC']").val();
        xhr.open("GET", `${Vapi}/company/deriveExcel?bicId=${bicId}&companyName=${companyName}`, true);
        xhr.setRequestHeader("token", sessionStorage.token);
        xhr.responseType = 'blob';//设置ajax的响应类型为blob;
        xhr.onload = function (res) {
            if (xhr.status == 200) {
                closeData();
                if (xhr.response.size < 50) {
                    layer.msg('导出失败', {icon: 7})
                    return
                }
                var content = xhr.response;
                var fileName = `商家信息汇总.xls`
                var elink = document.createElement('a');
                elink.download = fileName;
                elink.style.display = 'none';
                var blob = new Blob([content]);
                elink.href = URL.createObjectURL(blob);
                document.body.appendChild(elink);
                elink.click();
                document.body.removeChild(elink);
            } else {
                closeData();
                layer.msg('服务器请求超时', {icon: 2});
                return;
            }
        }
        xhr.send();
    });

    // 导入商家模块
    $('.importBtn').click(function () {
        popupShow('.pushOrderContent', '.pushOrderBox')
    })
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
            url: `${Vapi}/company/excelCompany`,
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
                    popupHide('.pushOrderContent', '.pushOrderBox');
                    tableIns.reload({
                        where: {}
                    });
                } else if (res.code == 403) {
                    layer.msg('登录过期,请重新登录', {icon: 2})
                    setTimeout(__ => {
                        window.parent.location.href = "login.html";
                    }, 1500)
                } else {
                    // layer.msg(res.message, { icon: 7 });
                    if (res.data.length > 0) {
                        popupHide('.pushOrderContent', '.pushOrderBox');
                        popupShow('.catchContent', '.messageBox')
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
        var str = ''
        list.forEach(item => {
            str += `<p>${item}</p>`
        });

        $('.messageBox .message .import_fail').html(str)
    }

    // 导入质检费模块
    $('.importQuality').click(function () {
        popupShow('.pushQualityContent', '.pushQualityBox')
    });
    $('#pushQualityMerchants').change(function (e) {
        if (!$(this).val()) {
            return;
        }
        var that = this;
        var upDetails = new FormData();
        upDetails.append('file', e.target.files[0]);
        dataLoading();
        $.ajax({
            type: 'post',
            url: `${Vapi}/company/excelCompany`,
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
                    popupHide('.pushQualityContent', '.pushQualityBox');
                    tableIns.reload({
                        where: {}
                    });
                } else if (res.code == 403) {
                    layer.msg('登录过期,请重新登录', {icon: 2})
                    setTimeout(__ => {
                        window.parent.location.href = "login.html";
                    }, 1500)
                } else {
                    console.log(1);
                    if (res.data.length > 0) {
                        popupHide('.pushQualityContent', '.pushQualityBox')
                        popupShow('.catchQualityContent', '.messageQualityBox')
                        pushLoseQualityFin(res.data);
                    } else {
                        $('.messageQualityBox .message .import_fail').html('导入失败')
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
    function pushLoseQualityFin(list) {
        var str = ''
        list.forEach(item => {
            str += `<p>${item}</p>`
        });

        $('.messageQualityBox .message .import_fail').html(str)
    }

});


