import '../../MyCss/goods/customCategory.css';

layui.use(['table', 'form', 'layer', 'tree'], function () {
    // tooltip('.refreshBtnList', { transition: true, time: 200 });
    var permissionsData0 = window.parent.permissionsData1(),
        merchantId = sessionStorage.machineID,
        permissionsObj = {
            373: false,
            374: false,
            372: false,
            403: false,
        },
        permissionsObjFlag = permissionsVal1(permissionsObj, permissionsData0);

    function permissions() {
        permissionsObjFlag[373] ? $('.addBtn').removeClass('hide') : $('.addBtn').addClass('hide');
        permissionsObjFlag[374] ? $('.ListOperation .edit').removeClass('hide') : $('.ListOperation .edit').addClass('hide');
        permissionsObjFlag[372] ? $('.ListOperation .del').removeClass('hide') : $('.ListOperation .del').addClass('hide');
        (permissionsObjFlag[374] || permissionsObjFlag[372]) ? $('.Toperation').removeClass('hide') : $('.Toperation').addClass('hide');
        permissionsObjFlag[403] ? $('.rankImg').removeClass('hide') : $('.rankImg').addClass('hide');
    };
    permissions();
    sessionStorage.classTag = sessionStorage.machineID;
    var table = layui.table,
        layer = layui.layer,
        tree = layui.tree,
        rank = null,
        //数据表格
        token = sessionStorage.token,
        tableCols = [[
            {field: '1', title: '升降序', templet: "#imgtmp", event: 'rank', align: 'center'},
            {field: 'rank', title: '排序', align: 'center'},
            {field: 'classifyName', title: '类目名', align: 'center'},
            {field: 'remark', title: '备注', align: 'center'},
            {
                field: 'user', title: '创建人', align: 'center', templet: function (d) {
                    return d.user != null ? d.user.userName : ''
                }
            },
            {
                field: 'classifyTime', title: '创建时间', align: 'center'
            },
            {
                field: 'lastUser', title: '最后修改人', align: 'center',
            },
            {
                field: 'lastTime', title: '最后修改时间', align: 'center'
            },
            {field: 'operation', align: 'center', title: '操作', toolbar: '#barDemo'}
        ]],
        tableIns = table.render({
            elem: '#tableTest'
            , url: `${vApi}/classify/findAll`
            , method: 'post'
            , contentType: 'application/json'
            , headers: {
                token,
            }
            , cols: tableCols
            , id: 'tableId'
            , page: true
            , loading: true
            , request: {
                'pageName': 'pageNum',
                'limitName': 'pageSize'
            }
            ,
            where: {
                merchantId: merchantId
            }
            ,
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
                if (res.code == 403) {
                    window.parent.location.href = "login.html";
                } else if (res.code == 405) {
                    $('.hangContent').show();
                }
            }
        });

    // 查询事件
    $('.queryBtn').click(function () {
        saveTableWidth(tableCols)
        tableIns.reload({
            where: {
            },
            cols: tableCols
        })
    })
    var indexFlag = null;
    var operationId = null;
    $('.addBtn').click(function () {
        $('.addClass input[name="addTypeName"]').val('');
        $('.addClass input[name="addNote"]').val('')
        popupShow('addClass', 'addContent');
    })
    $('.cancel-btn').click(function () {
        popupHide('addClass', 'addContent')
    })
    var form = layui.form;

    // 确定添加
    $('.determine-btn').click(function () {
        var addVal = form.val("aDDValData");
        if (addVal.addTypeName) {
            var addObj = JSON.stringify({
                classifyName: addVal.addTypeName,
                remark: addVal.addNote,
                merchantId: Number(merchantId)
            });
            $('.mask').fadeIn();
            $('.maskSpan').addClass('maskIcon');
            loadingAjax('/classify/saveClassify', 'post', addObj, sessionStorage.token, 'mask', 'addClass', 'addContent', layer).then(res => {
                layer.msg(res.message, {icon: 1});
                tableIns.reload({
                    where: {}
                })
                loadingAjax('/refreshGoods', 'post', '', sessionStorage.token).then(res => {
                }).catch(err => {
                })
            }).catch(err => {
                layer.msg(err.message, {icon: 2});
            });
        } else {
            layer.msg('请填写类目名');
        }
    })
    // 监听操作
    var editData = null;
    // 修改排序的商户id
    var operationFlag = null;
    var deitObj = null;
    table.on('tool(test)', function (obj) {
        event.stopPropagation();
        // 操作事件
        editData = obj.data;
        deitObj = obj;
        if (obj.event === 'operation') {
            if (operationFlag == obj.data.classifyId) {
                $('.ListOperation').fadeOut();
                operationFlag = null;
                return;
            }
            operationFlag = obj.data.classifyId;
            $('.ListOperation').fadeIn();
            $('.ListOperation').css({
                left: $(this).offset().left - 35 + 'px',
                top: $(this).offset().top + 35 + 'px'
            })
        } else if (obj.event == 'rank') {
            console.log(obj)
            var rankObj = JSON.stringify({
                topId: rank[obj.data.rank - 1].classifyId,
                bottomId: rank[obj.data.rank - 2].classifyId,
                merchantId: merchantId
            })
            loadingAjax('/classify/sortClassify', 'post', rankObj, token, '', '', '', layer).then((res) => {
                layer.msg(res.message, {icon: 1});
                tableIns.reload({
                    where: {}
                })
            }).catch((err) => {
                layer.msg(err.message, {icon: 2});
            })
        }
    });
    // 编辑
    $('.ListOperation .edit').click(function () {
        popupShow('editClass', 'editContent');
        form.val("editValData", {
            "addTypeName": editData.classifyName,
            "addNote": editData.remark,
        })
    });
    // 删除
    $('.ListOperation .del').click(function () {
        layer.confirm('确定删除？', function (index) {
            Goodsdel(editData, 2, deitObj, index, tableIns, sessionStorage.classTag);
        });
    })
    // 确定修改
    $('.editDetermine-btn').click(function () {
        var editInputVal = form.val("editValData");
        if (editInputVal.addTypeName) {
            var editObj = JSON.stringify({
                classifyId: editData.classifyId,
                classifyName: editInputVal.addTypeName,
                remark: editInputVal.addNote,
                merchantId: Number(merchantId)
            });
            $('.mask').fadeIn();
            $('.maskSpan').addClass('maskIcon');
            loadingAjax('/classify/updateClassify', 'post', editObj, sessionStorage.token, 'mask', 'editClass', 'editContent', layer).then(res => {
                layer.msg(res.message, {icon: 1});
                tableIns.reload({
                    where: {}
                })
                loadingAjax('/refreshGoods', 'post', '', sessionStorage.token).then(res => {
                }).catch(err => {
                })
            }).catch(err => {
                layer.msg(err.message, {icon: 2});
            })
        } else {
            layer.msg('请填写类目名');
        }
    })

    $('.editCancel-btn').click(function () {
        popupHide('editClass', 'editContent')
    })

    // 头部×关闭弹窗
    $('.playHeader .close').click(function () {
        $(this).parent().parent().addClass('margin0')
        $(this).parents('.maskContnet').fadeOut();
    });

    var dataList = treeList();
    treeFun1(tree, 'testGoods', tableIns, dataList);

    function treeFun1(tree, element, tableID, data) {
        tree.render({
            elem: `#${element}`,
            id: 'treelist',
            showLine: !0 //连接线
            ,
            onlyIconControl: true, //左侧图标控制展开收缩
            data,
            spread: true,
            text: {
                defaultNodeName: '无数据',
                none: '您没有权限，请联系管理员授权!'
            },
            click: function (obj) {
                merchantId = String(obj.data.id);
                console.log(merchantId, 'test');
                tableID.reload({
                    where: {
                        merchantId: merchantId,
                        // merchant_id: obj.data.id
                    }
                })
                var nodes = $(`#${element} .layui-tree-txt`)
                for (var i = 0; i < nodes.length; i++) {
                    if (nodes[i].innerHTML === obj.data.title)
                        nodes[i].style.color = "#be954a";
                    else
                        nodes[i].style.color = "#555";
                }
            },
        });
    };
    // 刷新商户列表
    $('.refreshBtnList').click(function () {
        var dataList1 = treeList();
        if (JSON.stringify(dataList1) != JSON.stringify(dataList)) {
            dataList = dataList1;
            treeFun1(tree, 'testGoods', tableIns, dataList);
            tableIns.reload({
                where: {
                    merchantId: merchantId,
                }
            })
            layer.msg('已刷新', {icon: 1})
        } else {
            layer.msg('已刷新', {icon: 1})
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
    $('body').click(function () {
        $('.ListOperation').fadeOut();
        operationFlag = null;
    });
})
