import '../../MyCss/merchants/merchantsList.css';

layui.use(['table', 'form', 'layer', 'tree', 'util'], function () {
    var $ = layui.jquery,
        table = layui.table,
        layer = layui.layer,
        layer = layui.layer,
        util = layui.util,
        tree = layui.tree,
        form = layui.form;
    token = sessionStorage.token;
    var tableIns = table.render({
        elem: '#tableTest',
        url: `${vApi}/merchant/getMerchantList`,
        method: 'post',
        contentType: "application/json",
        headers: {
            token,
        },
        cols: [[
            {field: 'title', width: 150, title: '商户名', align: 'center'},
            {
                field: 'merchantName', width: 120, title: '上级商户', align: 'center', templet: function (d) {
                    return d.id == 0 ? '' : d.merchantName
                }
            },
            {
                field: 'merchantURL', width: 220, title: '商品跳转地址', align: 'center',
                templet: function (d) {
                    return `<a href="${d.merchantURL}" target="_blank" style="color: rgb(190, 149, 74)">${d.merchantURL}</a>`
                }
            },
            {field: 'alias', width: 120, title: '商户编号', align: 'center'},
            {field: 'addUser', width: 120, title: '创建人', align: 'center',},
            {
                field: 'addTime', width: 160, title: '创建时间', align: 'center', templet: function (d) {
                    return timeStamp(d.addTime)
                }
            },
            {field: 'lastUser', width: 150, title: '最后修改人', align: 'center',},
            {
                field: 'lastTime', width: 160, title: '最后修改时间', align: 'center', templet: function (d) {
                    if (d.lastTime) {
                        return timeStamp(d.lastTime)
                    } else {
                        return '-'
                    }
                }
            },
            {field: 'operation', width: 150, title: '操作', toolbar: '#barDemo', align: 'center'},
        ]]
        , id: 'tableId'
        , page: true,
        // height: 'full-2000',
        loading: true
        , limits: [10, 20, 50]
        ,
        request: {
            'pageName': 'pageNum',
            'limitName': 'pageSize'
        },
        where: {
            conditionTwo: sessionStorage.machineID,
            conditionThree: '0'
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
            permissions();
            if (res.code == 403) {
                window.parent.location.href = "login.html";
            } else if (res.code == 405) {

                $('.hangContent').show();
            }
        }
    });
    // 左边商户列表显示隐藏事件
    $('.sidebar i').click(function () {
        $('.left-mian').hide()
        $('.onLeft').show()
    });
    $('.onLeft').click(function () {
        $(this).hide();
        $('.left-mian').show()
    })
    // 商户列表
    // var marchantsList = merchantsListMian('');
    //监听工具条
    var data = null,
        editServiceFlag = false,
        operationFlag = null;
    table.on('tool(test)', function (obj) {
        event.stopPropagation();
        data = obj.data;
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
        }
    });
    // 编辑
    $('.ListOperation .edit').click(function () {
        if (addEditData.length == 0) {
            layer.msg('服务器请求超时', {icon: 7});
            return;
        }
        $('.editMerchants input[name="merchantsName"]').val(data.title);
        $('.editMerchants input[name="merchantURL"]').val(data.merchantURL);
        $('.editMerchants input[name="max_ship"]').val(data.max_ship);
        popupShow('MemberOperation', 'MemberContent');
        if (data.id == 1) {
            $('.listInput input[name="marchantsText"]').val('');
        } else {
            $('.listInput input[name="marchantsText"]').val(data.merchantName);
        }
        $('.marchantsList').val(data.topMerchant);
        $('.MemberOperation input[name="service_phone"]').val(data.service_phone);
        $('.editMerchants input[name="customPhone"]').val(data.custom_phone)
        if (data.service_code) {
            $('.editImg').show()
            $('.editImg img').prop('src', data.service_code);
        } else {
            $('.editImg').hide()
            $('.editImg img').prop('src', '');
        }
        if (data.custom_code) {
            $('.customImg').show();
            $('.customImg img').prop('src', data.custom_code);
        } else {
            $('.customImg').hide();
            $('.customImg img').prop('src', '');
        }
        // 判断客服
        if (data.is_service == 1) {
            $('.editMerchants input[name="editServiceOpen"]').prop('checked', true);
            $('.editServiceContent').show();
            editServiceFlag = true;
        } else {
            $('.editMerchants input[name="editServiceOpen"]').prop('checked', false);
            $('.editServiceContent').hide();
            editServiceFlag = false;
        }
        // 判断定制
        if (data.is_custom == 1) {
            $('.editMerchants input[name="editCustomOpen"]').prop('checked', true);
            $('.editCustomCont').show();
            customFlag = true;
        } else {
            $('.editMerchants input[name="editCustomOpen"]').prop('checked', false);
            $('.editCustomCont').hide();
            customFlag = false;
        }
        // 判断销售经理类别
        salseList = []
        salesClassList(data.id, 1);
        // if(data.is_sales==1){
        //     salseFlag=true;
        //     $('.listFlex input[name="salse"]').prop('checked',true);
        //     $('.salseList').show();
        // }else{
        //     salseFlag=false;
        //     $('.listFlex input[name="salse"]').prop('checked',false);
        //     $('.salseList').hide();
        // }
        $('.MemberOperation input[name="order"]').prop('checked', data.follow_mail == 1 ? true : false);
        form.render();
    });
    // 删除
    $('.ListOperation .del').click(function () {
        if (data.id == 1) {
            layer.msg(data.title + '不能进行删除操作', {icon: 7});
            return;
        }
        layer.confirm('确定删除？', function (index) {
            layer.close(index);
            loadingAjax('/merchant/deleteMerchant', 'post', JSON.stringify({
                id: data.id,
                topMerchant: data.topMerchant
            }), sessionStorage.token, 'mask', '', '', layer).then(res => {
                layer.msg('删除成功', {icon: 1})
                dataList = treeList();
                var addEditData = treeList();
                tree.reload('treelistEdit', {
                    data: addEditData
                });
                tableIns.reload({
                    where: {}
                })
            }).catch(err => {
                layer.msg(err.msg, {icon: 7})
            })
        });
    })

    // 查询
    $('.queryBtnClick').click(function () {
        tableIns.reload({
            where: {
                condition: $('.addMember input[name="keyMerchants"]').val(),
                conditionThree: '1'
            }
        })
    })
    //点击添加成员事件
    $('.addBtn').click(function () {
        if (addEditData.length == 0) {
            layer.msg('服务器请求超时', {icon: 7});
            return;
        }
        $('.addBox input[name="marchantsListname"]').val('');
        popupShow('addMerchants', 'addBox')

    });
    // 取消事件
    $('.cancel_btn').click(function () {
        popupHide('MemberOperation', 'MemberContent')
    });
    $('.playHeader .close').click(function () {
        $(this).parent().parent().addClass('margin0')
        $(this).parents('.maskContnet').fadeOut();
    });
    //   关闭添加
    $('.addBox .addCancelBtn').click(function () {
        popupHide('addMerchants', 'addBox')
    });
    var addImg = null;
    // 添加选择图片
    $('.addBox .addUpload').change(function (e) {
        if (!$(this).val()) {
            return;
        }
        var that = this;
        var upDetails = new FormData();
        upDetails.append('file', e.target.files[0]);
        $('.mask').fadeIn();
        $('.maskSpan').addClass('maskIcon');
        $.ajax({
            type: 'post',
            url: `${vApi}/fileUpload`,
            processData: false,
            contentType: false,
            headers: {
                token,
            },
            data: upDetails,
            success: function (res) {
                $('.mask').fadeOut();
                $('.maskSpan').removeClass('maskIcon');
                $(that).val('')
                if (res.code == 0) {
                    addImg = res.data.src;
                    $('.addImg img').prop('src', addImg);
                    $('.addImg').show();
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
    })
    // 添加商户事件
    $('.addBody .addSubmiBtn').click(function () {
        var topVal = $('.addBox input[name="addmarchantsVal"]').val().split(' ');
        var aliasText = null;
        if ($('.addBox input[name="merchantsName"]').val() && $('.addBox input[name="addmarchantsVal"]').val()) {

            // console.log($('.addBox input[name="service_phone"]').val())
            if (!(addImg || $('.addBox input[name="service_phone"]').val()) && addServiceFlag) {
                layer.msg('请填写客服电话或上传客服微信二维码', {icon: 7});
                return;
            }
            var addMerchantsData = JSON.stringify({
                name: $('.addBox input[name="merchantsName"]').val(),
                merchantURL: $('.addBox input[name="merchantURL"]').val(),
                topMerchant: Number(topVal[0]),
                alias: topVal[1],
                is_service: addServiceFlag ? 1 : 0,
                service_phone: addServiceFlag ? $('.addBox input[name="service_phone"]').val() : '',
                service_code: addServiceFlag ? addImg : '',
                follow_mail: $('.addMerchants input[name="order"]').prop('checked') ? 1 : 0
            })
            loadingAjax('/merchant/newMerchant', 'post', addMerchantsData, sessionStorage.token, '', 'addMerchants', 'addBox', layer).then((res) => {
                $('.addBox input[name="merchantsName"]').val('');
                $('.addMerchants input[name="addServiceOpen"]').prop('checked');
                form.render();
                layer.msg(res.message, {icon: 1});
                addImg = null;
                $('.addImg').hide();
                dataList = treeList();
                var addEditData = treeList();
                tree.reload('treelistEdit', {
                    data: addEditData
                });
                tableIns.reload({
                    where: {}
                })
            }).catch((err) => {
                layer.msg(err.message, {icon: 2})
            })
        } else {
            layer.msg('带*号为必填', {icon: 7})
        }
    })
    // 编辑选择客服图片
    $('.editMerchants .editUpload').change(function (e) {
        if (!$(this).val()) {
            return;
        }
        var that = this;
        var upDetails = new FormData();
        upDetails.append('file', e.target.files[0]);
        $('.mask').fadeIn();
        $('.maskSpan').addClass('maskIcon');
        $.ajax({
            type: 'post',
            url: `${vApi}/fileUpload`,
            processData: false,
            contentType: false,
            headers: {
                token,
            },
            data: upDetails,
            success: function (res) {
                $('.mask').fadeOut();
                $('.maskSpan').removeClass('maskIcon');
                $(that).val('')
                if (res.code == 0) {
                    $('.editImg').show();
                    $('.editImg img').prop('src', res.data.src);
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
    })
    // 编辑商户事件
    $('.Medit .submit_btn').click(function () {
        if ($('.editMerchants input[name="merchantsName"]').val()) {
            if (!((($('.MemberOperation input[name="max_ship"]').val() > 0) && (Number.isInteger(Number($('.MemberOperation input[name="max_ship"]').val())))))) {
                layer.msg('最大出货数必须是正整数', {icon: 7});
                return;
            }
            var editdMerchantsData = JSON.stringify({
                id: data.id,
                name: $('.editMerchants input[name="merchantsName"]').val(),
                merchantURL: $('.editMerchants input[name="merchantURL"]').val(),
                topMerchant: Number($('.marchantsList').val()),
                service_phone: editServiceFlag ? $('.editMerchants input[name="service_phone"]').val() : '',
                service_code: editServiceFlag ? $('.editImg img').attr('src') : '',
                is_service: editServiceFlag ? 1 : 0,
                is_custom: customFlag ? 1 : 0,
                custom_phone: customFlag ? $('.editMerchants input[name="customPhone"]').val() : '',
                custom_code: customFlag ? $('.customImg img').attr('src') : '',
                is_sales: salseFlag ? 1 : 0,
                sales_type: $('.salseCont input[name="salseClassName"]:checked').val(),
                follow_mail: $('.MemberOperation input[name="order"]').prop('checked') ? 1 : 0,
                max_ship: Number($('.MemberOperation input[name="max_ship"]').val())
            });
            loadingAjax('/merchant/updateMerchant', 'post', editdMerchantsData, sessionStorage.token, '', 'MemberOperation', 'MemberContent', layer).then((res) => {
                var addEditData = treeList();
                tree.reload('treelistEdit', {
                    data: addEditData
                });
                layer.msg(res.message, {icon: 1})
                tableIns.reload({
                    where: {}
                })
            }).catch((err) => {
                layer.msg(err.message, {icon: 2})
            })
        } else {
            layer.msg('请填写商户名', {icon: 7})
        }
    });
    //树状图
    var addEditData = null;
    var dataList = addEditData = treeList();
    var eleColor = null; //商户列表颜色
    $('.addBox input[name="marchantsListname"]').prop('placeholder', addEditData[0].title)
    $('.addBox input[name="addmarchantsVal"]').val(addEditData[0].id + ' ' + addEditData[0].alias);
    // 监听f5刷新
    $("body").bind("keydown", function (event) {
        if (event.keyCode == 116) {
            f5Fun()
        }
    });
    var inst2 = tree.render({
        elem: '#test1',
        id: 'treelistEdit',
        showLine: !0 //连接线
        ,
        onlyIconControl: true //左侧图标控制展开收缩
        ,
        isJump: !1 //弹出新窗口跳转
        ,
        edit: false //开启节点的操作
        ,
        data: addEditData,
        text: {
            defaultNodeName: '您没有权限，请联系管理员授权!',
            none: ''
        },
        click: function (obj) {
            tableIns.reload({
                where: {
                    conditionTwo: obj.data.id + '',
                    conditionThree: '0'
                }

            })
            var nodesEdti = $(`#test1 .layui-tree-txt`);
            for (var i = 0; i < nodesEdti.length; i++) {
                if (nodesEdti[i].innerHTML === obj.data.title) {
                    nodesEdti[i].style.color = "#be954a";
                    eleColor = nodesEdti[i];
                } else {
                    nodesEdti[i].style.color = "#555";
                }
            }
            ;
            $('.addBox input[name="marchantsListname"]').prop('placeholder', obj.data.title)
            $('.addBox input[name="addmarchantsVal"]').val(obj.data.id + ' ' + obj.data.alias);
        },
    });

    var permissionsData0 = window.parent.permissionsData1(),
        permissionsObj = {
            393: false,
            394: false,
            395: false,
        },
        permissionsObjFlag = permissionsVal1(permissionsObj, permissionsData0);

    function permissions() {
        permissionsObjFlag[393] ? $('.addBtn').removeClass('hide') : $('.addBtn').addClass('hide');
        permissionsObjFlag[394] ? $('.editBtn').removeClass('hide') : $('.editBtn').addClass('hide');
        permissionsObjFlag[395] ? $('.del-btn').removeClass('hide') : $('.del-btn').addClass('hide');
    };
    permissions();
    // 刷新页面
    $('.refreshBtn').click(function () {
        location.reload();
    });

    // 监听添加客服开关
    var addServiceFlag = false;
    form.on('switch(switchTest)', function (data) {
        // console.log(data.elem.checked); //开关是否开启，true或者false
        addServiceFlag = data.elem.checked;
        if (data.elem.checked) {
            $('.serviceCont').slideDown();
        } else {
            $('.serviceCont').slideUp();
        }
    });
    //   监听编辑客服开关
    form.on('switch(editService)', function (data) {
        editServiceFlag = data.elem.checked;
        if (data.elem.checked) {
            $('.editServiceContent').slideDown();
        } else {
            $('.editServiceContent').slideUp();
        }
    });
    var customFlag = false;
    //   监听编辑定制开关
    form.on('switch(editCustomOpen)', function (data) {
        customFlag = data.elem.checked;
        if (data.elem.checked) {
            $('.editCustomCont').slideDown();
        } else {
            $('.editCustomCont').slideUp();
        }
    });
    //   编辑选中定制图片
    $('.customBtn .customInput').change(function (e) {
        if (!$(this).val()) {
            return;
        }
        var that = this;
        var upDetails = new FormData();
        upDetails.append('file', e.target.files[0]);
        $('.mask').fadeIn();
        $('.maskSpan').addClass('maskIcon');
        $.ajax({
            type: 'post',
            url: `${vApi}/fileUpload`,
            processData: false,
            contentType: false,
            headers: {
                token,
            },
            data: upDetails,
            success: function (res) {
                $('.mask').fadeOut();
                $('.maskSpan').removeClass('maskIcon');
                $(that).val('')
                if (res.code == 0) {
                    $('.customImg').show();
                    $('.customImg img').prop('src', res.data.src);
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
    });
    // 清除定制图片
    $('.editDelImgBtn').click(function () {
        layer.confirm('确定定制图片？', function (index) {
            layer.close(index);
            $('.customImg').hide();
            $('.customImg img').prop('src', '');
        })
    })

    // 销售经理类别
    var salseList = [];

    // 获取商户销售经理类别
    function salesClassList(mid, mNum) {
        var salesObj = JSON.stringify({
            merchantId: mid,
            pageSize: 10,
            pageNum: mNum
        })
        loadingAjax('/sales_manager/getSalesType', 'post', salesObj, sessionStorage.token, 'mask', '', '', layer).then(res => {
            // console.log(res)
            if (res.data.list != 0) {
                salseList = salseList.concat(res.data.list);
                ToSalseListFun(salseList)
            }
            if (salseList.length == 0) {
                $('.salseCont').html(`<input type="radio" name="salseClassName" value="" title="无" checked>`);
                form.render();
            }
            if (res.data.list.length == 10) {
                $('.loadMore').show();
            } else {
                $('.loadMore').hide();
            }
        }).catch(err => {
            layer.msg(err.message, {icon: 2})
        })
    }

    // 渲染销售经理列表
    function ToSalseListFun(ToList) {
        var salseStr = '';
        ToList.forEach(item => {
            salseStr += `<input type="radio" name="salseClassName" ${data.sales_type == item.sm_classify ? 'checked' : ''} value="${item.sm_classify}" title="${item.sm_classify}">`
        });
        $('.salseCont').html(salseStr);
        form.render();
    };
    // 监听销售经理开关
    var salseFlag = false;
    form.on('switch(salseOpne)', function (data) {
        salseFlag = data.elem.checked;
        if (data.elem.checked) {
            // $('.salseList').slideDown();
        } else {
            // $('.salseList').slideUp();
        }
    });
    //   console.log($('.MemberOperation input[name="order"]').prop('checked'))
    $('body').click(function () {
        $('.ListOperation').fadeOut();
        operationFlag = null;
    });
});
