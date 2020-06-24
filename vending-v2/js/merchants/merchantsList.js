layui.use(['table', 'form', 'layer', 'tree', 'util'], function () {
    var $ = layui.jquery,
        table = layui.table,
        layer = layui.layer,
        layer = layui.layer,
        util = layui.util,
        tree = layui.tree,
        form = layui.form;
    token = sessionStorage.token,
        tableIns = table.render({
            elem: '#tableTest',
            url: `/api/merchant/getMerchantList`,
            method: 'post',
            contentType: "application/json",
            headers: {
                token,
            },
            cols: [[
                { field: 'name', width: 180, title: '商户名' },
                { field: 'merchantName', width: 180, title: '隶属商户' },
                { field: 'alias', width: 180, title: '商户编号' },
                { field: 'addUser', width: 150, title: '创建人', },
                { field: 'addTime', width: 180, title: '创建时间', sort: true },
                { field: '1', width: 150, title: '最后操作人', },
                { field: 'lastTime', width: 180, title: '最后操作时间', sort: true },
                { field: 'operation', fixed: 'right', right: 0, width: 230, title: '操作', toolbar: '#barDemo' },
            ]]
            , id: 'tableId'
            , page: true
            , loading: true
            , limits: [10, 20, 50]
            ,
            request: {
                'pageName': 'pageNum',
                'limitName': 'pageSize'
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
                if (res.code == 403) {
                    window.parent.location.href = "../login/login.html";
                }
            }
        });
    // 商户列表
    var marchantsList = null;
    //监听工具条
    var data = null;
    table.on('tool(test)', function (obj) {
        data = obj.data;
        console.log(data)
        if (obj.event === 'edit') {
            $('.editMerchants input[name="merchantsName"]').val(data.name)
            popupShow('MemberOperation', 'MemberContent')
            // editMarchantsSelect();
            marchantsList = merchantsListMian(data.id);
            mercantsSelectList(marchantsList, 'marchantsList', form);
            $('.editMerchants select[name="marchantsListname"]').val(data.topMerchant);
            form.render('select');
        } else if (obj.event === 'delete') {

            layer.confirm('确定删除？', function (index) {
                $.ajax({
                    type: 'post',
                    url: '/api/merchant/deleteMerchant',
                    headers: {
                        token,
                        "Content-Type": "application/json",
                    },
                    data: JSON.stringify({
                        id: data.id
                    }),
                    success: function (res) {
                        console.log(res)
                        layer.close(index);
                        if (res.code == 200) {
                            layer.msg('删除成功', { icon: 1 })
                            tableIns.reload({
                                where: {}
                            })
                        } else if (res.code == 403) {
                            window.parent.location.href = "../login/login.html";
                        } else if (res.code == 405) {
                            layer.msg(res.msg, { icon: 7 })
                        } else {
                            layer.msg('删除失败', { icon: 2 })
                        }
                    }
                })
            });
        }
    });
    // 查询
    $('.queryBtnClick').click(function () {
        tableIns.reload({
            where: {
                condition: $('.addMember input[name="keyMerchants"]').val()
            }
        })
    })

    //点击添加成员事件
    $('.addBtn').click(function () {
        marchantsList = merchantsListMian('');
        mercantsSelectList(marchantsList, 'addMarchantsList', form);
        form.render('select');
        popupShow('addMerchants', 'addBox')

    });
    // 取消事件
    $('.cancel_btn').click(function () {
        popupHide('MemberOperation', 'MemberContent')
    });

    // 编辑商户
    $('.submit_btn').click(function () {
        // var informData = form.val("information");       
        // $('.mask').fadeIn();
        // $('.maskSpan').addClass('maskIcon')


        // console.log(informData)
        // setTimeout(() => {

        // }, 1000)

    })
    $('.playHeader .close').click(function () {
        $(this).parent().parent().addClass('margin0')
        $(this).parents('.maskContnet').fadeOut();
        indexFlag = null;
    });
    //   关闭添加
    $('.addBox .addCancelBtn').click(function () {
        popupHide('addMerchants', 'addBox')
    })
    // 添加商户事件
    $('.addBody .addSubmiBtn').click(function () {
        console.log(marchantsList);
        var aliasText = null;
        marchantsList.forEach((item, index) => {
            if (item.id == $('.addMarchantsList').val()) {
                aliasText = item.alias
            }
        })
        if ($('.addBox input[name="merchantsName"]').val()) {
            var addMerchantsData = JSON.stringify({
                name: $('.addBox input[name="merchantsName"]').val(),
                topMerchant: Number($('.addMarchantsList').val()),
                alias: aliasText
            })
            loadingAjax('/api/merchant/newMerchant', 'post', addMerchantsData, sessionStorage.token, '', 'addMerchants', 'addBox', layer).then((res) => {
                $('.addBox input[name="merchantsName"]').val('');
                layer.msg(res.message, { icon: 1 })
                tableIns.reload({
                    where: {}
                })
            }).catch((err) => {
                layer.msg(err.message, { icon: 2 })
            })
        } else {
            layer.msg('商户名不能为空', { icon: 7 })
        }
    })
    // 编辑商户事件
    $('.Medit .submit_btn').click(function () {
        console.log($('#marchantsList').val())

        if ($('.marchantsList').val() && $('.editMerchants input[name="merchantsName"]').val()) {
            var aliasText = null;
            marchantsList.forEach((item, index) => {
                if (item.id == $('.marchantsList').val()) {
                    aliasText = item.alias
                }
            })
            var editdMerchantsData = JSON.stringify({
                id: data.id,
                name: $('.editMerchants input[name="merchantsName"]').val(),
                topMerchant: Number($('.marchantsList').val()),
                alias: aliasText
            });
            loadingAjax('/api/merchant/updateMerchant', 'post', editdMerchantsData, sessionStorage.token, '', 'MemberOperation', 'MemberContent', layer).then((res) => {
                layer.msg(res.message, { icon: 1 })
                tableIns.reload({
                    where: {}
                })
            }).catch((err) => {
                layer.msg(err.message, { icon: 2 })
            })
        } else {
            console.log()
            layer.msg('带*未必填', { icon: 7 })
        }
    })
});