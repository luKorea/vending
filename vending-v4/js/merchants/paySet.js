import '../../MyCss/merchants/paySet.css'
layui.use(['table', 'form', 'layer', 'tree'], function () {
    tooltip('.refreshBtnList', { transition: true, time: 200 });
    var table = layui.table,
        layer = layui.layer,
        layer = layui.layer,
        util = layui.util,
        tree = layui.tree,
        form = layui.form,
        rank = null,
        tableIns = table.render({
            elem: '#payList',
            url: `${vApi}/pay/getPayParam`,
            method: 'post',
            contentType: "application/json",
            headers: {
                token: sessionStorage.token,
            },
            cols: [[
                { field: '1', width: 80, title: '', templet: "#imgtmp", event: 'rank', align: 'center' },
                { field: 'rank', width: 80, title: '排序', align: 'center' },
                { field: 'payName', width: 180, title: '支付类型', align: 'center' },
                { field: 'app_id', width: 300, title: '微信公众号id/支付宝商户id', align: 'center', },
                { field: 'merchantName', width: 250, title: '所属商户', align: 'center' },
                { field: 'payee', width: 280, title: '收款方', align: 'center' },
                { field: 'update_user', width: 200, title: '最后修改人', align: 'center' },
                {
                    field: 'update_time', width: 250, title: '最后修改时间', align: 'center', templet: function (d) {
                        if (d.update_time) {
                            return timeStamp(d.update_time)
                        } else {
                            return '-';
                        }
                    }
                },
                // { field: 'operation',right: 0, width: 150, title: '操作', toolbar: '#barDemo' ,fixed: 'right'},
                { field: 'operation', right: 0, width: 150, title: '操作', toolbar: '#barDemo', fixed: 'right' },
            ]],
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
    var payData = null;
    table.on('tool(payList)', function (obj) {
        payData = obj.data;
        // console.log(obj)
        console.log(payData)
        if (obj.event == "edit") {
            if (payData.payName == '微信') {
                $('.changePay .WeChat').show();
                $('.changePay .Alipay').hide();
                $('.changePay .IcbcPay').hide();
                editUploadVal=payData.cert_dir;
            } else if (payData.payName == '支付宝') {
                $('.changePay .WeChat').hide();
                $('.changePay .IcbcPay').hide();
                $('.changePay .Alipay').show();
            }else if(payData.payType==3){
                $('.changePay .IcbcPay').show();
                $('.changePay .WeChat').hide();
                $('.changePay .Alipay').hide();
            }else {
                $('.changePay .WeChat').hide();
                $('.changePay .Alipay').hide();
                $('.changePay .IcbcPay').hide();
            }
            // 编辑部分
            form.val("SetPay", {
                'typeIndex': payData.payType,
                'payee': payData.payee,
                'officialId': payData.payName == '微信' ? payData.app_id : '',
                'MerchantsId': payData.payName == '微信' ? payData.mchId : '',
                'app_key': payData.payName == '微信' ? payData.app_key : '',
                'MerchantsKey': payData.payName == '微信' ? payData.app_private_key : '',
                'aliPayId': payData.payName == '支付宝' ? payData.app_id : '',
                'alipay_public_key': payData.payName == '支付宝' ? payData.alipay_public_key : '',
                'app_private_key': payData.payName == '支付宝' ? payData.app_private_key : '',
                'mchId':payData.payType==3?payData.mchId:'',
                'app_id':payData.payType==3?payData.app_id:'',
                'ICBC_app_key':payData.payType==3?payData.app_key:'',
                'ICBC_alipay_public_key':payData.payType==3?payData.alipay_public_key:'',
                'ICBC_app_private_key':payData.payType==3?payData.app_private_key:'',
            })
            popupShow('changePay', 'changeBox')
        } else if (obj.event == "del") {
            layer.confirm('确定删除？', function (index) {
                layer.close(index);
                var paySetDel = JSON.stringify({
                    merchantId: Number(merchantsPay),
                    id: payData.id
                })
                loadingAjax('/pay/deletePayParam', 'post', paySetDel, sessionStorage.token, '', '', '', layer).then(res => {
                    layer.msg(res.message, { icon: 1 });
                    tableIns.reload({
                        where: {}
                    })
                }).catch(err => {
                    layer.msg(err.message, { icon: 2 })
                })
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
                layer.msg('修改成功', { icon: 1 });
                tableIns.reload({
                    where: {}
                })
            }).catch(err => {
                console.log(res)
                layer.msg('修改失败', { icon: 1 })
            })
        }

    });
    $('.changeBody .cancel_btn').click(function () {
        popupHide('changePay', 'changeBox')
    });
    // 编辑提交
    $('.changeBody .submit_btn').click(function () {
        var payFormData = form.val("SetPay");
        if (payFormData.typeIndex == '2') {
            if (!(payFormData.payee && payFormData.officialId && payFormData.MerchantsId && payFormData.app_key && payFormData.MerchantsKey)) {
                layer.msg('带*为必填', { icon: 7 });
                return;
            }
        } else if (payFormData.typeIndex == '1') {
            if (!(payFormData.payee && payFormData.aliPayId && payFormData.alipay_public_key && payFormData.app_private_key)) {
                layer.msg('带*为必填', { icon: 7 });
                return;
            }
        }else if(payFormData.typeIndex == '3'){
            if (!(payFormData.payee && payFormData.mchId && payFormData.app_id && payFormData.ICBC_app_key&& payFormData.ICBC_alipay_public_key&& payFormData.ICBC_app_private_key)) {
                layer.msg('带*为必填', { icon: 7 });
                return;
            }
        }else {
            if (!(payFormData.payee && payFormData.aliPayId)) {
                layer.msg('带*为必填', { icon: 7 });
                return;
            }
        }
        $('.mask').fadeIn();
        $('.maskSpan').addClass('maskIcon')
        if (payFormData.typeIndex == 2) {
            var textParam = JSON.stringify({
                app_id: payFormData.officialId,//微信公众号id
                mchId: payFormData.MerchantsId,//商户号ID
                app_key: payFormData.app_key,//支付密钥
            });
            var editUrl = `/pay/testWxPay`
        } else if (payFormData.typeIndex == 1) {
            var textParam = JSON.stringify({
                app_id: payFormData.aliPayId,//支付宝商户ID
                app_private_key: payFormData.app_private_key,//应用私钥
                alipay_public_key: payFormData.alipay_public_key//公众号密钥
            });
            var editUrl = `/pay/testAliPay`
        }else if(payFormData.typeIndex == 3){
            var editPayObj=JSON.stringify({
                // merchantId: merchantsPay,
                // id: payData.id,
                // payee: payFormData.payee,
                // payType: payFormData.typeIndex,
                alipay_public_key:payFormData.ICBC_alipay_public_key,
                mchId:payFormData.mchId,
                app_id:payFormData.app_id,
                app_key:payFormData.ICBC_app_key,
                app_private_key:payFormData.ICBC_app_private_key
            });
            loadingAjax('/pay/testICBCPay','post',editPayObj,sessionStorage.token,'mask','','',layer).then(res=>{
                var editPayObj1=JSON.stringify({
                    merchantId: merchantsPay,
                    id: payData.id,
                    payee: payFormData.payee,
                    payType: payFormData.typeIndex,
                    alipay_public_key:payFormData.ICBC_alipay_public_key,
                    mchId:payFormData.mchId,
                    app_id:payFormData.app_id,
                    app_key:payFormData.ICBC_app_key,
                    app_private_key:payFormData.ICBC_app_private_key,
                });
                loadingAjax('/pay/updatePayParam', 'post', editPayObj1, sessionStorage.token, 'mask', 'changePay', 'changeBox', layer).then(res => {
                    layer.msg(res.message, { icon: 1 });
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
                    layer.msg(err.message, { icon: 2 })
                })
            }).catch(err=>{
                layer.msg(err.message, { icon: 2 })
            })
            
            return;
        };
        loadingAjax(editUrl, 'post', textParam, sessionStorage.token, 'mask', '', '', layer).then(res => {
            var editPay = JSON.stringify({
                merchantId: merchantsPay,
                id: payData.id,
                payee: payFormData.payee,
                payType: payFormData.typeIndex,
                app_id: payFormData.typeIndex == '2' ? payFormData.officialId : payFormData.aliPayId,
                app_key: payFormData.typeIndex == '2' ? payFormData.app_key : '',
                mchId: payFormData.typeIndex == '2' ? payFormData.MerchantsId : '',
                alipay_public_key: payFormData.typeIndex == '1' ? payFormData.alipay_public_key : '',
                app_private_key: payFormData.typeIndex == '1' ? payFormData.app_private_key : payFormData.MerchantsKey,
                cert_dir:payFormData.typeIndex == 2?editUploadVal:null
            });
            loadingAjax('/pay/updatePayParam', 'post', editPay, sessionStorage.token, 'mask', 'changePay', 'changeBox', layer).then(res => {
                layer.msg(res.message, { icon: 1 });
                tableIns.reload({
                    where: {}
                })
                form.val("SetPay", {
                    'typeIndex': '',
                    'payee': '',
                    'officialId': '',
                    'MerchantsId': '',
                    'app_key': '',
                    'aliPayId': '',
                    'alipay_public_key': '',
                    'app_private_key': '',
                })
            }).catch(err => {
                layer.msg(err.message, { icon: 2 })
            })
        }).catch(err => {
            layer.msg(err.message, { icon: 2 })
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
        } else if (data.value == 2) {
            $('.addePay .WeChat').show();
            $('.addePay .Alipay').hide();
            $('.addePay .IcbcPay').hide();
        } else if (data.value == 3) {
            $('.addePay .IcbcPay').show();
            $('.addePay .WeChat').hide();
            $('.addePay .Alipay').hide();
        } else {
            $('.addePay .IcbcPay').hide();
            $('.addePay .WeChat').hide();
            $('.addePay .Alipay').hide();
        }
    });
    //   添加提交
    $('.addePay .submit_btn').click(function () {
        var addData = form.val("addPay");
        if (addData.typeIndex == '2') {
            if (!(addData.payee && addData.officialId && addData.MerchantsId && addData.app_key && addData.MerchantsKey)) {
                layer.msg('带*为必填', { icon: 7 });
                return;
            }
            if(!addUploadVal){
                layer.msg('请上传微信证书', { icon: 7 });
                return;
            }
        } else if (addData.typeIndex == '1') {
            if (!(addData.payee && addData.aliPayId && addData.alipay_public_key && addData.app_private_key)) {
                layer.msg('带*为必填', { icon: 7 });
                return;
            }
        }else if(addData.typeIndex == '3'){
            if (!(addData.payee && addData.mchId && addData.app_id && addData.ICBC_app_key&&addData.ICBC_alipay_public_key&&addData.ICBC_app_private_key)) {
                layer.msg('带*为必填', { icon: 7 });
                return;
            }
        }
         else {
            if (!(addData.payee && addData.typeIndex)) {
                layer.msg('带*为必填', { icon: 7 });
                return;
            }
        }
        $('.mask').fadeIn();
        $('.maskSpan').addClass('maskIcon');
        if (addData.typeIndex != 2 && addData.typeIndex != 1&&addData.typeIndex != 3) {
            var editPay = JSON.stringify({
                merchantId: merchantsPay,
                payee: addData.payee,
                payType: addData.typeIndex,
            })
            loadingAjax('/pay/newPayParam', 'post', editPay, sessionStorage.token, 'mask', 'addePay', 'addBox', layer).then(res => {
                layer.msg(res.message, { icon: 1 });
                tableIns.reload({
                    where: {}
                });
                form.val("addPay", {
                    'typeIndex': '',
                    'payee': '',
                    'officialId': '',
                    'MerchantsId': '',
                    'app_key': '',
                    'aliPayId': '',
                    'alipay_public_key': '',
                    'app_private_key': '',
                    'MerchantsKey': '',
                })
                return;
            }).catch(err => {
                console.log(err)
                layer.msg(err.message, { icon: 2 })
                return;
            })
        }
        // if (addData.typeIndex != 2 && addData.typeIndex != 1) {
        //     return;
        // }
        if (addData.typeIndex == 2) {
            var textParam = JSON.stringify({
                app_id: addData.officialId,//微信公众号id
                mchId: addData.MerchantsId,//商户号ID
                app_key: addData.app_key,//公众号密钥
            });
            var editUrl = `/pay/testWxPay`
        } else if (addData.typeIndex == 1) {
            var textParam = JSON.stringify({
                app_id: addData.aliPayId,//支付宝商户ID
                app_private_key: addData.app_private_key,//应用私钥
                alipay_public_key: addData.alipay_public_key//公众号密钥
            });
            var editUrl = `/pay/testAliPay`
        } else if (addData.typeIndex == 3) {
            var addPayObj=JSON.stringify({
                // merchantId: merchantsPay,
                // payee: addData.payee,
                // payType: addData.typeIndex,
                alipay_public_key:addData.ICBC_alipay_public_key,
                mchId:addData.mchId,
                app_id:addData.app_id,
                app_key:addData.ICBC_app_key,
                app_private_key:addData.ICBC_app_private_key
            });
            loadingAjax('/pay/testICBCPay','post',addPayObj,sessionStorage.token,'mask','','',layer).then(res=>{
                var addPayObj1=JSON.stringify({
                    merchantId: merchantsPay,
                    payee: addData.payee,
                    payType: addData.typeIndex,
                    alipay_public_key:addData.ICBC_alipay_public_key,
                    mchId:addData.mchId,
                    app_id:addData.app_id,
                    app_key:addData.ICBC_app_key,
                    app_private_key:addData.ICBC_app_private_key,
                    cert_dir:addData.typeIndex==2?addUploadVal:null
                });
                loadingAjax('/pay/newPayParam', 'post', addPayObj1, sessionStorage.token, 'mask', 'addePay', 'addBox', layer).then(res => {
                    layer.msg(res.message, { icon: 1 });
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
                    addUploadVal=null
                }).catch(err => {
                    layer.msg(err.message, { icon: 2 })
                })
            }).catch(err=>{
                layer.msg(err.message, { icon: 2 })
            })
            return;
        }
        loadingAjax(editUrl, 'post', textParam, sessionStorage.token, 'mask', '', '', layer).then(res => {
            var editPay = JSON.stringify({
                merchantId: merchantsPay,
                payee: addData.payee,
                payType: addData.typeIndex,
                app_id: addData.typeIndex == '2' ? addData.officialId : addData.aliPayId,
                app_key: addData.typeIndex == '2' ? addData.app_key : '',
                mchId: addData.typeIndex == '2' ? addData.MerchantsId : '',
                alipay_public_key: addData.typeIndex == '1' ? addData.alipay_public_key : '',
                app_private_key: addData.typeIndex == '1' ? addData.app_private_key : addData.MerchantsKey
            })
            loadingAjax('/pay/newPayParam', 'post', editPay, sessionStorage.token, 'mask', 'addePay', 'addBox', layer).then(res => {
                layer.msg(res.message, { icon: 1 });
                tableIns.reload({
                    where: {}
                });
                form.val("addPay", {
                    'typeIndex': '',
                    'payee': '',
                    'officialId': '',
                    'MerchantsId': '',
                    'app_key': '',
                    'aliPayId': '',
                    'alipay_public_key': '',
                    'app_private_key': '',
                    'MerchantsKey': '',
                })
            }).catch(err => {
                layer.msg(err.message, { icon: 2 })
            })
        }).catch(err => {
            layer.msg(err.message, { icon: 2 })
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
            layer.msg('已刷新', { icon: 1 })
        }
    });

      // 上传附件
      var addUploadVal=null,
          editUploadVal=null;
      $('.addBody .WeChat input[name="addUpload"]').change(function(e){
        if(!$(this).val()){
            return ;
        }
        var that = this;
        var upDetails = new FormData();
        upDetails.append('file', e.target.files[0]);
        $('.mask').fadeIn();
        $('.maskSpan').addClass('maskIcon');
        uploadFun(upDetails,1,that);
    });
    $('.changePay .WeChat input[name="addUpload"]').change(function(e){
        if(!$(this).val()){
            return ;
        }
        var that = this;
        var upDetails = new FormData();
        upDetails.append('file', e.target.files[0]);
        $('.mask').fadeIn();
        $('.maskSpan').addClass('maskIcon');
        uploadFun(upDetails,2,that);
    })
    function uploadFun(data,index,that){
        $.ajax({
            type: 'post',
            url: `${vApi}/uploading`,
            processData: false,
            contentType: false,
            timeout:60000,
            headers: {
                token,
            },
            data,
            success: function (res) {
                $('.mask').fadeOut();
                $('.maskSpan').removeClass('maskIcon');
                $(that).val('')
                if (res.code == 0) {
                    layer.msg('上传成功',{icon:1})
                    if(index==1){
                        addUploadVal=res.data.src;
                        $('.uploadFlag').html('已上传');
                    }else if(index==2){
                        editUploadVal=res.data.src;
                        console.log(editUploadVal)
                    }
                } else {
                    layer.msg(res.message, { icon: 7 });
                }
            },
            error: function (err) {
                $(that).val('')
                $('.mask').fadeOut();
                $('.maskSpan').removeClass('maskIcon')
                layer.msg('上传失败', { icon: 2 })
            }
        })
    }
})