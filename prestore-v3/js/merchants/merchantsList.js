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
            {field: 'bicId', width: 160, title: '??????ID', align: 'center'},
            {field: 'companyName', width: 250, title: '????????????', align: 'center'},
            {field: 'startUsingStr', width: 110, title: '????????????', align: 'center'},
            {
                field: 'balance', width: 160, title: '??????', align: 'center', templet: function (d) {
                    return numFormat2(d.balance)
                }
            },
            {
                field: 'freezeMoney', width: 150, title: '????????????', align: 'center', templet: function (d) {
                    return numFormat2(d.freezeMoney)
                }
            },
            {
                field: 'usableBalance', width: 150, title: '????????????', align: 'center', templet: function (d) {
                    return numFormat2(d.usableBalance)
                }
            },
            {
                field: 'moneyRemind', width: 150, title: '???????????????', align: 'center', templet: function (d) {
                    return numFormat2(d.moneyRemind)
                }
            },
            {field: 'remark', width: 180, title: '??????', align: 'center'},
            {field: 'operation', width: 150, title: '??????', toolbar: '#barDemo', align: 'center'},
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
                    "code": res.code,??//??????????????????
                    "msg": res.message,??//??????????????????
                    "count": res.data.total,??//??????????????????
                    "data": res.data.list //??????????????????
                };
            } else {
                return {
                    "code": res.code,//??????????????????
                    "msg": res.message, //??????????????????
                }
            }
        },
        response: {
            statusCode: 200??//????????????????????????????????????0
        },
        done: function (res) {
            if (res.code == 403) {
                layer.msg('????????????,???????????????', {icon: 2})
                setTimeout(__ => {
                    window.parent.location.href = "login.html";
                }, 1500)
            }
            for (var i in res.data) {
                var item = res.data[i];
                if (item.flag == 2) {// ??????????????????????????????????????????????????????0??????
                    // checkbox ??????????????????????????????
                    $('.data_list1 tr[data-index=' + i + ']').addClass('warning');
                }
            }
            fixedFun();
        }
    });
    // ????????????
    $('.playHeader .close').click(function () {
        orderIns = null;
        $(this).parent().parent().addClass('margin0')
        $(this).parents('.maskContnet').fadeOut();
    });
    // ??????
    $('.queryBtnClick').click(function () {
        tableIns.reload({
            where: {
                companyName: $('.addMember input[name="keyMerchants"]').val(),
                bicId: $('.addMember input[name="keyBIC"]').val()
            }
        })
    });
    //???????????????
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

    // ????????????
    $('.addBtn').click(function () {
        popupShow('.addMerchantsCont', '.addMBox');
    })

    //??????????????????
    $('.addMBox .cancel1').click(function () {
        popupHide('.addMerchantsCont', '.addMBox')
    })
    // ????????????
    $('.addMBox .determine1').click(function () {
        if (!($('.addMBody input[name="companyName"]').val() && $('.addMBody input[name="bicId"]').val() && $('.addMBody input[name="moneyRemind"]').val())) {
            layer.msg('???*?????????', {icon: '7'});
            return;
        }
        // if (!(wholeNum($('.addMBody input[name="moneyRemind"]').val()))) {
        //     layer.msg('?????????????????????????????????', { icon: '7' });
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
    // ????????????
    $('.ListOperation .topUpBtn').click(function () {
        $('.topUPBox input[name="bicId"]').val(companyData.bicId)
        $('.topUPBox input[name="companyName"]').val(companyData.companyName)
        $('.topUPBox input[name="balance"]').val(companyData.balance)
        popupShow('.topUPContent', '.topUPBox')
    });
    // ????????????
    $('.topUPBox .determine1').click(function () {
        if (!($('.topUPBox input[name="topUpNum"]').val())) {
            layer.msg('???*?????????', {icon: 7})
            return;
        }
        if (!($('.topUPBox input[name="topUpNum"]').val() > 0)) {
            layer.msg('????????????????????????0', {icon: 7});
            return;
        }
        layer.confirm('?????????????', function (index) {
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
    //??????????????????
    $('.topUPBox .cancel1').click(function () {
        popupHide('.topUPContent', '.topUPBox')
    });
    // ??????????????????
    $('.ListOperation .reductionsBtn').click(function () {
        $('.reductionsBox input[name="bicId"]').val(companyData.bicId)
        $('.reductionsBox input[name="companyName"]').val(companyData.companyName)
        $('.reductionsBox input[name="balance"]').val(companyData.balance)
        popupShow('.reductionsCOntent', '.reductionsBox');
    });
    // ????????????
    $('.reductionsBox .determine1').click(function () {
        if (!($('.reductionsBox input[name="reductionsNum"]').val())) {
            layer.msg('???*?????????', {icon: 7})
            return;
        }
        if (!($('.reductionsBox input[name="reductionsNum"]').val() > 0)) {
            layer.msg('????????????????????????0', {icon: 7});
            return;
        }
        layer.confirm('?????????????', function (index) {
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
    //??????????????????
    $('.reductionsBox .cancel1').click(function () {
        popupHide('.reductionsCOntent', '.reductionsBox')
    });
    // ??????
    $('.ListOperation .edit').click(function () {
        $('.editBox input[name="companyName"]').val(companyData.companyName);
        $('.editBox input[name="bicId"]').val(companyData.bicId);
        $('.editBox input[name="moneyRemind"]').val(companyData.moneyRemind)
        $('.editBox input[name="open"]').prop('checked', companyData.startUsing == 2 ? true : false);
        $('.editBox input[name="remark"]').val(companyData.remark)
        form.render('checkbox');
        popupShow('.editContent', '.editBox')
    });
    // ????????????
    $('.editBox .determine1').click(function () {
        if (!($('.editBox input[name="companyName"]').val() && $('.editBox input[name="bicId"]').val() && $('.editBox input[name="moneyRemind"]').val())) {
            layer.msg('???*?????????', {icon: '7'});
            return;
        }
        // if (!(wholeNum($('.editBox input[name="moneyRemind"]').val()))) {
        //     layer.msg('?????????????????????????????????', { icon: '7' });
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
    // ????????????
    //??????????????????
    $('.editBox .cancel1').click(function () {
        popupHide('.editContent', '.editBox')
    });
    $('body').click(function () {
        $('.ListOperation').fadeOut();
        operationFlag = null;
    });
    // ??????
    $('.ListOperation .del').click(function () {
        layer.confirm('?????????????', function (index) {
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

    // ????????????????????????
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
                    field: 'frontBalance', width: 160, title: '??????/???????????????', align: 'center', templet: function (d) {
                        return numFormat2(d.frontBalance)
                    }
                },
                {
                    field: 'money', width: 160, title: '??????/????????????', align: 'center', templet: function (d) {
                        if (d.flag == 1) {
                            return '-' + numFormat2(d.money)
                        } else {
                            return numFormat2(d.money)
                        }

                    }
                },
                {
                    field: 'laterBalance', width: 160, title: '??????/???????????????', align: 'center', templet: function (d) {
                        return numFormat2(d.laterBalance)
                    }
                },
                {field: 'remark', width: 160, title: '??????', align: 'center'},
                {
                    field: 'logTime', width: 180, title: '??????/????????????', align: 'center'
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
                //res?????????????????????????????
                if (res.code == 200) {
                    return {
                        "code": res.code,??//??????????????????
                        "msg": res.message,??//??????????????????
                        "count": res.data.total,??//??????????????????
                        "data": res.data.list //??????????????????
                    };
                } else {
                    return {
                        "code": res.code,??//??????????????????
                        "msg": res.message,??  //??????????????????
                    }
                }
            },
            response: {
                statusCode: 200??//????????????????????????????????????0
            },
            done: function (res) {
                if (res.code == 403) {
                    layer.msg('????????????,???????????????', {icon: 2})
                    setTimeout(__ => {
                        window.parent.location.href = "login.html";
                    }, 1500)
                }
                fixedFun();
            }
        });
    }

    // ??????????????????
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
        $('.topUpRecordBox .playHeader span').html(`${companyData.companyName}??????/????????????`)
    });

    // ????????????
    var useIns = null;

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
                    field: 'statisticsTime', width: 200, title: '????????????', align: 'center', templet: function (d) {
                        if (d.statisticsTime) {
                            return timeStampM(d.statisticsTime)
                        } else {
                            return '-'
                        }
                    }
                },
                {
                    field: 'monthMoney', width: 200, title: '????????????', align: 'center', templet: function (d) {
                        if (d.monthMoney || d.monthMoney == 0) {
                            return numFormat2(d.monthMoney)
                        } else {
                            return '-'
                        }
                    }
                },
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
                //res?????????????????????????????
                if (res.code == 200) {
                    return {
                        "code": res.code,??//??????????????????
                        "msg": res.message,??//??????????????????
                        "count": res.data.total,??//??????????????????
                        "data": res.data.list //??????????????????
                    };
                } else {
                    return {
                        "code": res.code,??//??????????????????
                        "msg": res.message,??  //??????????????????
                    }
                }
            },
            response: {
                statusCode: 200??//????????????????????????????????????0
            },
            done: function (res) {
                if (res.code == 403) {
                    layer.msg('????????????,???????????????', {icon: 2})
                    setTimeout(__ => {
                        window.parent.location.href = "login.html";
                    }, 1500)
                }
                fixedFun();
            }
        });
    }

    // ????????????
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
        $('.useRecordBox .playHeader span').html(companyData.companyName + '????????????')
        popupShow('.useRecordContent', '.useRecordBox');
    });
    var useData = null;
    table.on('row(useTable)', function (obj) {
        useData = obj.data;
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
        $('.dayRecordBox .playHeader span').html(`${companyData.companyName}(${timeStampM(useData.statisticsTime)})????????????`)
        popupShow('.dayRecordContent', '.dayRecordBox')
    });

    //   ??????????????????
    var dayIns = null;

    function dayUseFun() {
        dayIns = table.render({
            elem: '#dayTable',
            url: `${Vapi}/company/findDayOrder`,
            method: 'GET',
            headers: {
                token,
            },
            cols: [[
                {field: 'day', width: 180, title: '????????????', align: 'center'},
                {
                    field: 'money', width: 200, title: '????????????', align: 'center', templet: function (d) {
                        return numFormat2(d.money)
                    }
                },
            ]]
            , id: 'dayId',
            loading: true,
            even: true,
            request: {
                'pageName': 'pageNum',
                'limitName': 'pageSize'
            },
            initSort: {
                field: 'day' //????????????????????? cols ?????????????????????
                , type: 'desc' //????????????  asc: ?????????desc: ?????????null: ????????????
            },
            where: {
                bicId: companyData.bicId,
                time: timeStampM(useData.statisticsTime),
            },
            parseData: function (res) {
                //res???????????????????????????
                if (res.code == 200) {
                    return {
                        "code": res.code,??//??????????????????
                        "msg": res.message,??//??????????????????
                        "count": res.data.length,??//??????????????????
                        "data": res.data //??????????????????
                    };
                } else {
                    return {
                        "code": res.code,??//??????????????????
                        "msg": res.message,??  //??????????????????
                    }
                }
            },
            response: {
                statusCode: 200??//????????????????????????????????????0
            },
            done: function (res) {
                if (res.code == 403) {
                    layer.msg('????????????,???????????????', {icon: 2})
                    setTimeout(__ => {
                        window.parent.location.href = "login.html";
                    }, 1500)
                }
                fixedFun();
            }
        });
    };
    table.on('row(dayTable)', function (obj) {
        if (orderIns) {
            orderIns.reload({
                where: {
                    data: obj.data.orders
                }
            })
        } else {
            dayOrderFun(obj.data.orders)
        }
        $('.dayOrderBox .playHeader span').html(`${companyData.companyName}(${obj.data.day})????????????`)
        popupShow('.dayOrderContent', '.dayOrderBox')
    });
    // ????????????
    var orderIns = null;

    function dayOrderFun(data) {
        orderIns = table.render({
            elem: '#orderTable',
            cols: [[
                {field: 'orderId', width: 180, title: '????????????', align: 'center',},
                {field: 'orderYard', width: 180, title: '?????????', align: 'center'},
                {field: 'flagStr', width: 130, title: '????????????', align: 'center'},
                {
                    field: 'expressMoney', width: 130, title: '????????????', align: 'center', templet: function (d) {
                        return numFormat2(d.expressMoney)
                    }
                },
                {
                    field: 'qualityMoney', width: 130, title: '????????????', align: 'center', templet: function (d) {
                        return numFormat2(d.qualityMoney)
                    }
                },
                {field: 'bicId', width: 160, title: '??????ID', align: 'center'},
                {field: 'companyName', width: 160, title: '????????????', align: 'center'},
                {field: 'orderAppointFlag', width: 160, title: '??????????????????', align: 'center'},
                {field: 'cancelStr', width: 160, title: '????????????', align: 'center'},
                {field: 'interceptStr', width: 160, title: '????????????', align: 'center'},
                {field: 'interceptCause', width: 160, title: '????????????', align: 'center'},
                {field: 'mergeBatch', width: 160, title: '???????????????', align: 'center'},
                {field: 'storageNumber', width: 160, title: '????????????', align: 'center'},
                {field: 'testingInstitutes', width: 160, title: '????????????', align: 'center'},
                {field: 'qualityResult', width: 160, title: '????????????', align: 'center'},
                {field: 'recheckResult', width: 160, title: '????????????', align: 'center'},
                {field: 'planExpress', width: 160, title: '??????????????????', align: 'center'},
                {field: 'realityExpress', width: 160, title: '??????????????????', align: 'center'},
                {field: 'expressNumber', width: 160, title: '????????????', align: 'center'},
                {field: 'placeReceipt', width: 160, title: '????????????', align: 'center'},
                {field: 'orderTimeStr', width: 180, title: '????????????', align: 'center'},
                {field: 'storageTimeStr', width: 180, title: '????????????', align: 'center'},
                {field: 'inspectTimeStr', width: 180, title: '????????????', align: 'center'},
                {field: 'accomplishTimeStr', width: 180, title: '??????????????????', align: 'center'},
                {field: ' deliveryTime', width: 180, title: '????????????', align: 'center'},
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
    // ????????????
    // ????????????
    $('.pushBtn').click(function () {
        dataLoading();
        let xhr = new XMLHttpRequest(), //????????????XMLHttpRequest??????
            companyName = $("input[name='keyMerchants']").val(),
            bicId = $("input[name='keyBIC']").val();
        xhr.open("GET", `${Vapi}/company/deriveExcel?bicId=${bicId}&companyName=${companyName}`, true);
        xhr.setRequestHeader("token", sessionStorage.token);
        xhr.responseType = 'blob';//??????ajax??????????????????blob;
        xhr.onload = function (res) {
            if (xhr.status == 200) {
                closeData();
                if (xhr.response.size < 50) {
                    layer.msg('????????????', {icon: 7})
                    return
                }
                var content = xhr.response;
                var fileName = `??????????????????.xls`
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
                layer.msg('?????????????????????', {icon: 2});
                return;
            }
        }
        xhr.send();
    });
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
                    layer.msg('????????????,???????????????', {icon: 2})
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
                        $('.messageBox .message .import_fail').html('????????????')
                    }
                }
            },
            error: function (err) {
                $(that).val('');
                closeData();
                $('.maskSpan').removeClass('maskIcon')
                layer.msg('?????????????????????', {icon: 2})
            }
        })

    })

    // ????????????????????????
    function pushLoseFin(list) {
        var str = ''
        list.forEach(item => {
            str += `<p>${item}</p>`
        });

        $('.messageBox .message .import_fail').html(str)
    }
});


