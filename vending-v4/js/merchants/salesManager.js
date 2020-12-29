import '../../MyCss/merchants/salesManager.scss';
layui.use(['table', 'form', 'layer', 'laydate'], function () {
    var table = layui.table,
        form = layui.form,
        layer = layui.layer,
        laydate = layui.laydate,
        token = sessionStorage.token;

    // $('.pushXlsxBtn ').prop('href','../../img/exe.xlsx')
    // 关闭弹窗
    $('.playHeader .close').click(function () {
        $(this).parent().parent().addClass('margin0')
        $(this).parents('.maskContnet').fadeOut();
    });
    // f5刷新
    $("body").bind("keydown", function (event) {
        if (event.keyCode == 116) {
            f5Fun()
        }
    });
    var startTime = getKeyTime().startTime,
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
    // 刷新页面
    $('.refreshBtn').click(function () {
        location.reload();
    });
    var salesTableIn = table.render({
        elem: '#salesTable',
        method: 'post',
        url: `${vApi}/sales_manager/getSalesManager`,
        contentType: "application/json",
        headers: {
            token: sessionStorage.token
        },
        cols: [[
            { checkbox: true },
            { field: 'sm_no', width: 200, title: '编号', align: 'center' },
            { field: 'sm_name', width: 230, title: '姓名', align: 'center' },
            { field: 'sm_phone', width: 230, title: '电话号', align: 'center' },
            { field: 'sm_classify', width: 230, title: '类别', align: 'center' },
            { field: 'create_name', width: 230, title: '创建人', align: 'center' },
            {
                field: 'create_time', width: 200, title: '创建时间', templet: function (d) {
                    if (d.create_time) {
                        return timeStamp(d.create_time)
                    } else {
                        return '-'
                    }
                }
            },
            // { field: 'operation', width: 200, title: '操作', toolbar: '#barDemo' },
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
            start_time: startTime,
            end_time: endTime
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
    // 查询
    $('.queryBtn').click(function () {
        if (timeFlag(startTime, endTime)) {
            layer.msg('时间选择范围最多三个月', { icon: 7 });
            return;
        }
        if (startTime) {
            salesTableIn.reload({
                where: {
                    keyword: $('.KyeText').val(),
                    sm_no: $('.keyNumder').val(),
                    start_time: startTime,
                    end_time: endTime
                }
            })
        } else {
            salesTableIn.reload({
                where: {
                    keyword: $('.KyeText').val(),
                    sm_no: $('.keyNumder').val(),
                }
            })
        }

    })
    // 添加销售经理
    $('.addSalesBtn').click(function () {
        popupShow('addSalesCont', 'addSalesBox');
    });
    // 确定添加销售经理
    $('.addSalesCont .confirmBtn').click(function () {
        if (!($('.addSalesCont input[name="sm_no"]').val() && $('.addSalesCont input[name="name"]').val() && $('.addSalesCont input[name="phone"]').val() && $('.addSalesCont input[name="merchants"]').val())) {
            layer.msg('带*号未必填', { icon: 7 });
            return
        }
        var addObj = JSON.stringify({
            sm_no: $('.addSalesCont input[name="sm_no"]').val(),
            merchant_id: Number(sessionStorage.machineID),
            sm_name: $('.addSalesCont input[name="name"]').val(),
            sm_phone: $('.addSalesCont input[name="phone"]').val(),
            sm_classify: $('.addSalesCont input[name="merchants"]').val(),
        });
        loadingAjax('/sales_manager/addSalesManager', 'post', addObj, sessionStorage.token).then(res => {
            layer.msg(res.message, { icon: 1 });
            salesTableIn.reload({
                where: {

                }
            })
            $('.addSalesCont input[name="sm_no"]').val('');
            $('.addSalesCont input[name="name"]').val('');
            $('.addSalesCont input[name="phone"]').val('');
            $('.addSalesCont input[name="merchants"]').val('');
            popupHide('addSalesCont', 'addSalesBox')
        }).catch(err => {
            layer.msg(err.message, { icon: 2 })
        });
    })
    // 取消添加
    $('.addSalesCont .cancelBtn').click(function () {
        popupHide('addSalesCont', 'addSalesBox')
    })
    $('.pushImportBtn').click(function () {
        popupShow('pushSalesCont', 'pushSalesBox')
    })
    // 导入销售经理
    $('.importBtn input[name="addUpload"]').change(function (e) {
        if (!$(this).val()) {
            return;
        }
        var that = this;
        var upDetails = new FormData();
        upDetails.append('file', e.target.files[0]);
        upDetails.append('merchantId ', Number(sessionStorage.machineID));
        $('.mask').fadeIn();
        $('.maskSpan').addClass('maskIcon');
        $.ajax({
            type: 'post',
            url: `${vApi}/sales_manager/importSalesManager`,
            processData: false,
            contentType: false,
            timeout: 10000,
            headers: {
                token,
            },
            data: upDetails,
            success: function (res) {
                $('.mask').fadeOut();
                $('.maskSpan').removeClass('maskIcon');
                $(that).val('')
                if (res.code == 200) {
                    layer.msg(res.message, { icon: 1 });
                    salesTableIn.reload({
                        where: {}
                    })
                    popupHide('pushSalesCont ', 'pushSalesBox')
                } else {
                    layer.msg(res.message, { icon: 7 });
                }
            },
            error: function (err) {
                $(that).val('')
                $('.mask').fadeOut();
                $('.maskSpan').removeClass('maskIcon')
                layer.msg('服务器请求超时', { icon: 2 })
            }
        })
    })
    // 删除销售经理
    $('.delBtn').click(function () {
        var checkStatus = table.checkStatus('salesId');
        console.log(checkStatus);
        if (checkStatus.data.length == 0) {
            layer.msg('请选择需要删除的销售经理', { icon: 7 });
            return;
        }
        layer.confirm('确定删除？', function (index) {
            layer.close(index)
            $('.mask').fadeIn();
            $('.maskSpan').addClass('maskIcon');
            var delArr = [];
            checkStatus.data.forEach(item => {
                delArr.push(item.id)
            });
            var delObj = JSON.stringify({
                ids: delArr
            });
            loadingAjax('/sales_manager/deleteSalesManager', 'post', delObj, sessionStorage.token, 'mask', '', '', layer).then(res => {
                layer.msg(res.message, { icon: 1 });
                salesTableIn.reload({
                    where: {}
                });
                popupHide('addSalesCont', 'addSalesBox')
            }).catch(err => {
                layer.msg(err.message, { icon: 2 })
            })
        })
    })

    // 权限控制
    permissionsVal(436, 437, 446).then(res => {
        res.addFlag ? $('.addSalesBtn').removeClass('hide') : $('.addSalesBtn').addClass('hide');
        res.editFlag ? $('.pushImportBtn').removeClass('hide') : $('.pushImportBtn').addClass('hide');
        res.delFlag ? $('.delBtn').removeClass('hide') : $('.delBtn').addClass('hide')
    });




    //   $('.importBtn').click(function(){
    //       $('.importBtn input[name="addUpload"]').click()
    //   })
})