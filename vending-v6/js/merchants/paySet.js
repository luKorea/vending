import '../../MyCss/merchants/paySet.css'

layui.use(['table', 'form', 'layer', 'tree'], function () {
    // tooltip('.refreshBtnList', {transition: true, time: 200});
    var table = layui.table,
        layer = layui.layer,
        tree = layui.tree,
        form = layui.form,
        rank = null,
        tableCols = [[
            {field: '1', title: '升降序', templet: "#imgtmp", event: 'rank', align: 'center'},
            {field: 'rank', title: '排序', align: 'center'},
            {field: 'payName', title: '支付类型', align: 'center'},
            {
                field: 'appId', title: '微信公众号id/支付宝商户id/杉德商户号', align: 'center',
                templet: function (d) {
                    return d.app_id ? d.app_id : d.mchId
                }
            },
            {field: 'merchantName', title: '所属商户', align: 'center'},
            {field: 'payee', title: '收款方', align: 'center'},
            {field: 'update_user', title: '最后修改人', align: 'center'},
            {
                field: 'update_time', title: '最后修改时间', align: 'center', templet: function (d) {
                    if (d.update_time) {
                        return timeStamp(d.update_time)
                    } else {
                        return '-';
                    }
                }
            },
            // { field: 'operation',right: 0, width: 150, title: '操作', toolbar: '#barDemo' ,fixed: 'right'},
            {field: 'operation', align: 'center', title: '操作', toolbar: '#barDemo'},
        ]],
        tableIns = table.render({
            elem: '#payList',
            url: `${vApi}/pay/getPayParam`,
            method: 'post',
            contentType: "application/json",
            headers: {
                token: sessionStorage.token,
            },
            cols: tableCols,
            id: 'tablePayId',
            // page:true,
            loading: true,
            request: {
                'pageName': 'pageNum',
                'limitName': 'pageSize'
            },
            where: {
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
                rank = res.data;
                fixedFun();
                if (res.code == 403) {
                    window.parent.location.href = "login.html";
                }
            }
        })
    // 刷新页面
    $('.refreshBtn').click(function () {
        location.reload();
    });
    // 监听f5刷新
    $("body").bind("keydown", function (event) {
        if (event.keyCode == 116) {
            f5Fun()
        }
    });
    // 关闭弹窗
    $('.playHeader .close').click(function () {
        $(this).parent().parent().addClass('margin0')
        $(this).parents('.maskContnet').fadeOut();
    });
    var payData = null,
        operationFlag = null;
    table.on('tool(payList)', function (obj) {
        event.stopPropagation();
        payData = obj.data;
        // console.log(obj)
        if (obj.event === 'operation') {
            if (operationFlag == obj.data.id) {
                $('.ListOperation').fadeOut();
                operationFlag = null;
                return;
            }
            operationFlag = obj.data.id;
            $('.ListOperation').fadeIn();
            $('.ListOperation').css({
                left: $(this).offset().left - 35 + 'px',
                top: $(this).offset().top + 35 + 'px'
            })
        } else if (obj.event == 'rank') {
            if (obj.data.rank == 1) {
                return;
            }
            console.log(obj)
            console.log(rank)
            var rankObj = JSON.stringify({
                merchantId: Number(merchantsPay),
                topId: obj.data.id,
                bottomId: rank[obj.data.rank - 2].id
            })
            loadingAjax('/pay/sortPayParam', 'post', rankObj, sessionStorage.token, '', '', '', layer).then(res => {
                layer.msg('修改成功', {icon: 1});
                tableIns.reload({
                    where: {}
                })
            }).catch(err => {
                console.log(res)
                layer.msg('修改失败', {icon: 1})
            })
        }

    });
    // 编辑
    $('.ListOperation .edit').click(function () {
        console.log(payData, 'payData');
        if (payData.payName == '微信') {
            $('.changePay .WeChat').show();
            $('.changePay .Alipay').hide();
            $('.changePay .IcbcPay').hide();
            $('.changePay .juhePay').hide();
            editUploadVal = payData.cert_dir;
        } else if (payData.payName == '支付宝') {
            $('.changePay .WeChat').hide();
            $('.changePay .IcbcPay').hide();
            $('.changePay .juhePay').hide();
            $('.changePay .Alipay').show();
        } else if (payData.payType == 3) {
            $('.changePay .IcbcPay').show();
            $('.changePay .WeChat').hide();
            $('.changePay .Alipay').hide();
            $('.changePay .juhePay').hide();
        } else if (payData.payType == 4) {
            juheUploadEditSiVal = payData.app_private_key;
            juheUploadEditGongVal = payData.alipay_public_key;
            $('.changePay .juhePay').show();
            $('.changePay .IcbcPay').hide();
            $('.changePay .WeChat').hide();
            $('.changePay .Alipay').hide();
        } else {
            $('.changePay .juhePay').hide();
            $('.changePay .WeChat').hide();
            $('.changePay .Alipay').hide();
            $('.changePay .IcbcPay').hide();
        }
        // 编辑部分
        let tyoe = payData.payType + '';
        form.val("SetPay", {
            typeIndex: payData.payType,
            payee: payData.payee,
            officialId: payData.payName === '微信' ? payData.app_id : '',
            MerchantsId: payData.payName === '微信' ? payData.mchId : '',
            app_key: payData.payName === '微信' ? payData.app_key : '',
            MerchantsKey: payData.payName === '微信' ? payData.app_private_key : '',
            aliPayId: payData.payName === '支付宝' ? payData.app_id : '',
            alipay_public_key: payData.payName === '支付宝' || tyoe === '4' ? payData.alipay_public_key : '',
            app_private_key: payData.payName === '支付宝' || tyoe === '4' ? payData.app_private_key : '',
            mchId: tyoe === '3' ? payData.mchId : '',
            app_id: tyoe === '3' ? payData.app_id : '',
            ICBC_app_key: tyoe === '3' ? payData.app_key : '',
            ICBC_alipay_public_key: tyoe === '3' ? payData.alipay_public_key : '',
            ICBC_app_private_key: tyoe === '3' ? payData.app_private_key : '',
            juhemchId: tyoe === '4' ? payData.mchId : '',
            juheapp_id: tyoe === '4' ? payData.app_id : '',
            juheapp_key: tyoe === '4' ? payData.app_key : '',
        });
        popupShow('changePay', 'changeBox')
    });
    // 删除
    $('.ListOperation .del').click(function () {
        layer.confirm('确定删除？', function (index) {
            layer.close(index);
            var paySetDel = JSON.stringify({
                merchantId: Number(merchantsPay),
                id: payData.id
            })
            loadingAjax('/pay/deletePayParam', 'post', paySetDel, sessionStorage.token, '', '', '', layer).then(res => {
                layer.msg(res.message, {icon: 1});
                tableIns.reload({
                    where: {}
                })
            }).catch(err => {
                layer.msg(err.message, {icon: 2})
            })
        })
    })
    $('.changeBody .cancel_btn').click(function () {
        popupHide('changePay', 'changeBox')
    });
    // 编辑提交
    $('.changeBody .submit_btn').click(function () {
        var payFormData = form.val("SetPay"),
            type = payFormData.typeIndex + '';
        if (type === '2') {
            if (!(payFormData.payee && payFormData.officialId && payFormData.MerchantsId && payFormData.app_key && payFormData.MerchantsKey)) {
                layer.msg('带*为必填', {icon: 7});
                return;
            }
        } else if (type === '1') {
            if (!(payFormData.payee && payFormData.aliPayId && payFormData.alipay_public_key && payFormData.app_private_key)) {
                layer.msg('带*为必填', {icon: 7});
                return;
            }
        } else if (type === '3') {
            if (!(payFormData.payee && payFormData.mchId && payFormData.app_id && payFormData.ICBC_app_key && payFormData.ICBC_alipay_public_key && payFormData.ICBC_app_private_key)) {
                layer.msg('带*为必填', {icon: 7});
                return;
            }
        } else if (type === '4') {
            if (!(payFormData.payee && payFormData.juhemchId && payFormData.juheapp_key)) {
                layer.msg('带*为必填', {icon: 7});
                return;
            }
        }
        else {
            if (!(payFormData.payee && payFormData.aliPayId)) {
                layer.msg('带*为必填', {icon: 7});
                return;
            }
        }
        $('.mask').fadeIn();
        $('.maskSpan').addClass('maskIcon')
        if (type === '2') {
            var textParam = JSON.stringify({
                app_id: payFormData.officialId,//微信公众号id
                mchId: payFormData.MerchantsId,//商户号ID
                app_key: payFormData.app_key,//支付密钥
            });
            var editUrl = `/pay/testWxPay`
        }
        else if (payFormData.typeIndex === '1') {
            var textParam = JSON.stringify({
                app_id: payFormData.aliPayId,//支付宝商户ID
                app_private_key: payFormData.app_private_key,//应用私钥
                alipay_public_key: payFormData.alipay_public_key//公众号密钥
            });
            var editUrl = `/pay/testAliPay`
        }
        else if (type === '3') {
            var editPayObj = JSON.stringify({
                alipay_public_key: payFormData.ICBC_alipay_public_key,
                mchId: payFormData.mchId,
                app_id: payFormData.app_id,
                app_key: payFormData.ICBC_app_key,
                app_private_key: payFormData.ICBC_app_private_key
            });
            loadingAjax('/pay/testICBCPay', 'post', editPayObj, sessionStorage.token, 'mask', '', '', layer).then(res => {
                var editPayObj1 = JSON.stringify({
                    merchantId: merchantsPay,
                    id: payData.id,
                    payee: payFormData.payee,
                    payType: payFormData.typeIndex,
                    alipay_public_key: payFormData.ICBC_alipay_public_key,
                    mchId: payFormData.mchId,
                    app_id: payFormData.app_id,
                    app_key: payFormData.ICBC_app_key,
                    app_private_key: payFormData.ICBC_app_private_key,
                });
                loadingAjax('/pay/updatePayParam', 'post', editPayObj1, sessionStorage.token, 'mask', 'changePay', 'changeBox', layer).then(res => {
                    layer.msg(res.message, {icon: 1});
                    tableIns.reload({
                        where: {}
                    })
                    form.val("addPay", {
                        'typeIndex': '',
                        'payee': '',
                        'alipay_public_key': '',
                        'mchId': '',
                        'app_id': '',
                        'app_key': '',
                        'app_private_key': '',
                    })
                }).catch(err => {
                    layer.msg(err.message, {icon: 2})
                })
            }).catch(err => {
                layer.msg(err.message, {icon: 2})
            })
            return;
        }
        else if (type === '4') {
            var textParam = JSON.stringify({
                mchId: payFormData.juhemchId,
                app_id: payFormData.juheapp_id,
                app_key: payFormData.juheapp_key,
                alipay_public_key: juheUploadEditGongVal,
                app_private_key: juheUploadEditSiVal
            });
            var editUrl = '/pay/testSand'
        }
        loadingAjax(editUrl, 'post', textParam, sessionStorage.token, 'mask', '', '', layer).then(res => {
            var editPay = JSON.stringify({
                merchantId: merchantsPay,
                id: payData.id,
                payee: payFormData.payee,
                payType: type,
                app_id: type === '2' ? payFormData.officialId : type=== '4' ? payFormData.juheapp_id : payFormData.aliPayId,
                app_key: type === '2' ? payFormData.app_key : type === '4' ? payFormData.juheapp_key :  '',
                mchId: type === '2' ? payFormData.MerchantsId : type === '4' ? payFormData.juhemchId : '',
                alipay_public_key:  type === '1' ? payFormData.alipay_public_key : type === '4' ? juheUploadEditGongVal : '',
                app_private_key: type ===  '1' ? payFormData.app_private_key : type === '4' ? juheUploadEditSiVal : payFormData.MerchantsKey,
                cert_dir: type === '2' ? editUploadVal : null
            });
            loadingAjax('/pay/updatePayParam', 'post', editPay, sessionStorage.token, 'mask', 'changePay', 'changeBox', layer).then(res => {
                layer.msg(res.message, {icon: 1});
                tableIns.reload({
                    where: {}
                })
                form.val("SetPay", {
                    typeIndex: '',
                    payee: '',
                    officialId: '',
                    juheapp_id: '',
                    juheapp_key: '',
                    juhemchId: '',
                    MerchantsId: '',
                    app_key: '',
                    aliPayId: '',
                    alipay_public_key: '',
                    app_private_key: '',
                    MerchantsKey: '',
                })
            }).catch(err => {
                layer.msg(err.message, {icon: 2})
            })
        }).catch(err => {
            layer.msg(err.message, {icon: 2})
        })

    })
    var merchantsPay = sessionStorage.machineID;
    // 树
    var dataList = treeList();
    tree.render({
        elem: `#test1`,
        id: 'treelist',
        showLine: !0 //连接线
        ,
        onlyIconControl: true, //左侧图标控制展开收缩
        data: dataList,
        spread: true,
        text: {
            defaultNodeName: '无数据',
            none: '您没有权限，请联系管理员授权!'
        },
        click: function (obj) {
            console.log(obj);
            tableIns.reload({
                where: {
                    merchantId: obj.data.id
                }
            })
            merchantsPay = obj.data.id;
            var nodes = $(`#test1 .layui-tree-txt`)
            for (var i = 0; i < nodes.length; i++) {
                if (nodes[i].innerHTML === obj.data.title)
                    nodes[i].style.color = "#be954a";
                else
                    nodes[i].style.color = "#555";
            }
        },
    });
    // 收起
    $('.sidebar i').click(function () {
        $('.left-mian').hide();
        $('.onLeft').show()
    });
    $('.onLeft').click(function () {
        $('.left-mian').show();
        $('.onLeft').hide()
    });
    var statusFlag = JSON.stringify({
        status: 1
    })
    loadingAjax('/pay/getAllPayType', 'post', statusFlag, sessionStorage.token).then(res => {
        console.log(res)
        var optionList = `<option value="">请选择</option>`;
        res.data.forEach((item, index) => {
            if (item.status == 1) {
                optionList += `<option value="${item.id}">${item.name}</option>`
            }

        });
        console.log(optionList);
        $('#editTypeSelect').html(optionList);
        $('#addTypeSelect').html(optionList);
        form.render('select');
    }).catch(err => {
        return;
    });

    // 添加部分
    $('.addBtnClick').click(function () {
        popupShow('addePay', 'addBox')
    })
    var addTypeIndex = null;
    form.on('select(addSelect)', function (data) {
        console.log(data.value); //得到被选中的值;
        if (data.value == 1) {
            $('.addePay .WeChat').hide();
            $('.addePay .IcbcPay').hide();
            $('.addePay .Alipay').show();
            $('.addePay .juhePay').hide();
        } else if (data.value == 2) {
            $('.addePay .WeChat').show();
            $('.addePay .Alipay').hide();
            $('.addePay .IcbcPay').hide();
            $('.addePay .juhePay').hide();
        } else if (data.value == 3) {
            $('.addePay .IcbcPay').show();
            $('.addePay .WeChat').hide();
            $('.addePay .Alipay').hide();
            $('.addePay .juhePay').hide();
        } else if (data.value == 4) {
            $('.addePay .juhePay').show();
            $('.addePay .IcbcPay').hide();
            $('.addePay .WeChat').hide();
            $('.addePay .Alipay').hide();
        } else {
            $('.addePay .juhePay').hide();
            $('.addePay .IcbcPay').hide();
            $('.addePay .WeChat').hide();
            $('.addePay .Alipay').hide();
        }
    });
    //   添加提交
    $('.addePay .submit_btn').click(function () {
        var addData = form.val("addPay"),
            typeIndex = String(addData.typeIndex);
        console.log(addData, 'addData');
        if (typeIndex === '2') {
            if (!(addData.payee && addData.officialId && addData.MerchantsId && addData.app_key && addData.MerchantsKey)) {
                layer.msg('带*为必填', {icon: 7});
                return;
            }
            if (!addUploadVal) {
                layer.msg('请上传微信证书', {icon: 7});
                return;
            }
        } else if (typeIndex === '1') {
            if (!(addData.payee && addData.aliPayId && addData.alipay_public_key && addData.app_private_key)) {
                layer.msg('带*为必填', {icon: 7});
                return;
            }
        } else if (typeIndex === '3') {
            if (!(addData.payee && addData.mchId && addData.app_id && addData.ICBC_app_key && addData.ICBC_alipay_public_key && addData.ICBC_app_private_key)) {
                layer.msg('带*为必填', {icon: 7});
                return;
            }
        } else if (typeIndex === '4') {
            console.log(addData);
            if (!(addData.payee && addData.juhemchId && addData.juheapp_key)) {
                layer.msg('带*为必填', {icon: 7});
                return;
            }
            if (!juheUploadSiVal) {
                layer.msg('请上传杉德商户私钥证书', {icon: 7});
                return;
            }
            if (!juheUploadGongVal) {
                layer.msg('请上传杉德公钥证书', {icon: 7});
                return;
            }
        } else {
            if (!(addData.payee && addData.typeIndex)) {
                layer.msg('带*为必填', {icon: 7});
                return;
            }
        }
        $('.mask').fadeIn();
        $('.maskSpan').addClass('maskIcon');
        if (typeIndex !== '2' && typeIndex !== '1' && typeIndex !== '3' && typeIndex !== '4') {
            var editPay = JSON.stringify({
                merchantId: merchantsPay,
                payee: addData.payee,
                payType: addData.typeIndex,
            })
            loadingAjax('/pay/newPayParam', 'post', editPay, sessionStorage.token, 'mask', 'addePay', 'addBox', layer).then(res => {
                layer.msg(res.message, {icon: 1});
                tableIns.reload({
                    where: {}
                });
                form.val("addPay", {
                    typeIndex: '',
                    payee: '',
                    officialId: '',
                    juheapp_id: '',
                    juheapp_key: '',
                    juhemchId: '',
                    MerchantsId: '',
                    app_key: '',
                    aliPayId: '',
                    alipay_public_key: '',
                    app_private_key: '',
                    MerchantsKey: '',
                })
                return;
            }).catch(err => {
                console.log(err)
                layer.msg(err.message, {icon: 2})
                return;
            })
        }
        // TODO 微信支付
        if (typeIndex === '2') {
            var textParam = JSON.stringify({
                app_id: addData.officialId,//微信公众号id
                mchId: addData.MerchantsId,//商户号ID
                app_key: addData.app_key,//公众号密钥
            });
            var editUrl = `/pay/testWxPay`
        }
        // TODO 支付宝支付
        else if (typeIndex === '1') {
            var textParam = JSON.stringify({
                app_id: addData.aliPayId,//支付宝商户ID
                app_private_key: addData.app_private_key,//应用私钥
                alipay_public_key: addData.alipay_public_key//公众号密钥
            });
            var editUrl = `/pay/testAliPay`
        }
        // TODO 工行支付
        else if (typeIndex === '3') {
            var addPayObj = JSON.stringify({
                alipay_public_key: addData.ICBC_alipay_public_key,
                mchId: addData.mchId,
                app_id: addData.app_id,
                app_key: addData.ICBC_app_key,
                app_private_key: addData.ICBC_app_private_key
            });
            loadingAjax('/pay/testICBCPay', 'post', addPayObj, sessionStorage.token, 'mask', '', '', layer).then(res => {
                var addPayObj1 = JSON.stringify({
                    merchantId: merchantsPay,
                    payee: addData.payee,
                    payType: addData.typeIndex,
                    alipay_public_key: addData.ICBC_alipay_public_key,
                    mchId: addData.mchId,
                    app_id: addData.app_id,
                    app_key: addData.ICBC_app_key,
                    app_private_key: addData.ICBC_app_private_key,
                    cert_dir: addData.typeIndex == 2 ? addUploadVal : null
                });
                loadingAjax('/pay/newPayParam', 'post', addPayObj1, sessionStorage.token, 'mask', 'addePay', 'addBox', layer).then(res => {
                    layer.msg(res.message, {icon: 1});
                    tableIns.reload({
                        where: {}
                    });
                    form.val("addPay", {
                        'typeIndex': '',
                        'payee': '',
                        'ICBC_alipay_public_key': '',
                        'mchId': '',
                        'app_id': '',
                        'ICBC_app_key': '',
                        'ICBC_app_private_key': '',
                    });
                    $('.uploadFlag').html('未上传');
                    addUploadVal = null
                }).catch(err => {
                    layer.msg(err.message, {icon: 2})
                })
            }).catch(err => {
                layer.msg(err.message, {icon: 2})
            })
            return;
        }
            // TODO 杉德支付
            // 收款方    payee
            // 杉德商户号    mchId
            // 杉德平台商户号   app_id
            // 杉德商户私钥证书密码  app_key
            // 杉德商户私钥证书(.pfx) app_private_key
        // 杉德公钥证书(.cer)   alipay_public_key
        else if (typeIndex === '4') {
            var textParam = JSON.stringify({
                mchId: addData.juhemchId,
                app_id: addData.juheapp_id,
                app_key: addData.juheapp_key,
                app_private_key: juheUploadSiVal, //应用私钥
                alipay_public_key: juheUploadGongVal //公众号密钥
            });
            var editUrl = '/pay/testSand'
        }

        loadingAjax(editUrl, 'post', textParam, sessionStorage.token, 'mask', '', '', layer).then(res => {
            var editPay = JSON.stringify({
                merchantId: merchantsPay,
                payee: addData.payee,
                payType: typeIndex,
                app_id: typeIndex === '2' ? addData.officialId : typeIndex === '4' ? addData.juheapp_id : addData.aliPayId,
                app_key: typeIndex === '2' || typeIndex === '4' ? addData.juheapp_key : '',
                mchId: typeIndex === '2' ? addData.MerchantsId : typeIndex === '4' ? addData.juhemchId : '',
                alipay_public_key: typeIndex === '1' ? addData.alipay_public_key : typeIndex === '4' ? juheUploadGongVal : '',
                app_private_key: typeIndex === '1' ? addData.app_private_key : typeIndex === '4' ? juheUploadSiVal : addData.MerchantsKey
            })
            console.log(JSON.parse(editPay), 'editdPay');
            loadingAjax('/pay/newPayParam', 'post', editPay, sessionStorage.token, 'mask', 'addePay', 'addBox', layer).then(res => {
                layer.msg(res.message, {icon: 1});
                tableIns.reload({
                    where: {}
                });
                form.val("addPay", {
                    typeIndex: '',
                    payee: '',
                    officialId: '',
                    juheapp_id: '',
                    juheapp_key: '',
                    juhemchId: '',
                    MerchantsId: '',
                    app_key: '',
                    aliPayId: '',
                    alipay_public_key: '',
                    app_private_key: '',
                    MerchantsKey: '',
                })
            }).catch(err => {
                layer.msg(err.message, {icon: 2})
            })
        }).catch(err => {
            layer.msg(err.message, {icon: 2})
        })
    });
    $('.addePay .cancel_btn').click(function () {
        popupHide('addePay', 'addBox')
    });

    // 刷新商户
    $('.refreshBtnList').click(function () {
        var dataList1 = treeList();
        if (JSON.stringify(dataList1) != JSON.stringify(dataList)) {
            dataList = dataList1;
            tree.reload('treelist', {
                data: dataList
            });
            tableIns.reload({
                where: {
                    merchantId: Number(sessionStorage.machineID),
                }
            })
        } else {
            layer.msg('已刷新', {icon: 1})
        }
    });

    // 上传附件
    var addUploadVal = null,
        editUploadVal = null,
        juheUploadSiVal = null,
        juheUploadEditSiVal = null,
        juheUploadGongVal = null,
        juheUploadEditGongVal = null;
    $('.addBody .WeChat input[name="addUpload"]').change(function (e) {
        if (!$(this).val()) {
            return;
        }
        var that = this;
        var upDetails = new FormData();
        upDetails.append('file', e.target.files[0]);
        $('.mask').fadeIn();
        $('.maskSpan').addClass('maskIcon');
        uploadFun(upDetails, 1, that);
    });
    $('.changePay .WeChat input[name="addUpload"]').change(function (e) {
        if (!$(this).val()) {
            return;
        }
        var that = this;
        var upDetails = new FormData();
        upDetails.append('file', e.target.files[0]);
        $('.mask').fadeIn();
        $('.maskSpan').addClass('maskIcon');
        uploadFun(upDetails, 2, that);
    });

    $('.addBody .juhePay input[name="juheAddSi"]').change(function (e) {
        if (!$(this).val()) {
            return;
        }
        var that = this;
        var upDetails = new FormData();
        upDetails.append('file', e.target.files[0]);
        $('.mask').fadeIn();
        $('.maskSpan').addClass('maskIcon');
        uploadFun(upDetails, 3, that);
    });
    $('.changePay .juhePay input[name="juheAddSi"]').change(function (e) {
        if (!$(this).val()) {
            return;
        }
        var that = this;
        var upDetails = new FormData();
        upDetails.append('file', e.target.files[0]);
        $('.mask').fadeIn();
        $('.maskSpan').addClass('maskIcon');
        uploadFun(upDetails, 4, that);
    });
    $('.addBody .juhePay input[name="juheEditGong"]').change(function (e) {
        if (!$(this).val()) {
            return;
        }
        var that = this;
        var upDetails = new FormData();
        upDetails.append('file', e.target.files[0]);
        $('.mask').fadeIn();
        $('.maskSpan').addClass('maskIcon');
        uploadFun(upDetails, 5, that);
    });
    $('.changePay .juhePay input[name="juheEditGong"]').change(function (e) {
        if (!$(this).val()) {
            return;
        }
        var that = this;
        var upDetails = new FormData();
        upDetails.append('file', e.target.files[0]);
        $('.mask').fadeIn();
        $('.maskSpan').addClass('maskIcon');
        uploadFun(upDetails, 6, that);
    })


    function uploadFun(data, index, that) {
        $.ajax({
            type: 'post',
            url: `${vApi}/uploading`,
            processData: false,
            contentType: false,
            timeout: 60000,
            headers: {
                token,
            },
            data,
            success: function (res) {
                $('.mask').fadeOut();
                $('.maskSpan').removeClass('maskIcon');
                $(that).val('')
                if (res.code === 0) {
                    layer.msg('上传成功', {icon: 1})
                    if (index === 1) {
                        addUploadVal = res.data.src;
                        $('.uploadFlag').html('已上传');
                    } else if (index === 2) {
                        editUploadVal = res.data.src;
                    } else if (index === 3) {
                        juheUploadSiVal = res.data.src;
                        $('.uploadFlag').html('已上传');
                    } else if (index === 4) {
                        juheUploadEditSiVal = res.data.src;
                    } else if (index === 5) {
                        juheUploadGongVal = res.data.src;
                        $('.uploadFlag').html('已上传');
                    } else if (index === 6) {
                        juheUploadEditGongVal = res.data.src;
                    }
                } else {
                    layer.msg(res.message, {icon: 7});
                }
            },
            error: function (err) {
                $(that).val('')
                $('.mask').fadeOut();
                $('.maskSpan').removeClass('maskIcon')
                layer.msg('上传失败', {icon: 2})
            }
        })
    };
    $('body').click(function () {
        $('.ListOperation').fadeOut();
        operationFlag = null;
    });
})
