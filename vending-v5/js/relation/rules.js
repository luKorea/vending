/* 规则 */
import '../../MyCss/merchants/salesManager.scss';
layui.use(['table', 'form', 'layer', 'laydate','tree'], function () {
    var permissionsData0 = window.parent.permissionsData1(),
        machineId = +sessionStorage.machineID,
        permissionsObj = {
            436: false,
            437: false,
            446: false,
        },
        permissionsObjFlag = permissionsVal1(permissionsObj, permissionsData0);
    function permissions() {
        permissionsObjFlag[436] ? $('.addSalesBtn').removeClass('hide') : $('.addSalesBtn').addClass('hide');
        permissionsObjFlag[437] ? $('.pushImportBtn').removeClass('hide') : $('.pushImportBtn').addClass('hide');
        permissionsObjFlag[446] ? $('.delBtn').removeClass('hide') : $('.delBtn').addClass('hide')
    };
    permissions();
    let table = layui.table,
        layer = layui.layer,
        laydate = layui.laydate,
        tree=layui.tree,
        token = sessionStorage.token;
    // 收起
    $('.sidebar i').click(function () {
        $('.left-mian').hide();
        $('.on-left').show()
    });
    $('.on-left').click(function () {
        $('.left-mian').show();
        $('.on-left').hide()
    });
    // 关闭弹窗
    $('.playHeader .close').click(function () {
        clearInfo();
        $(this).parent().parent().addClass('margin0')
        $(this).parents('.maskContnet').fadeOut();
    });
    // f5刷新
    $("body").bind("keydown", function (event) {
        if (event.keyCode == 116) {
            f5Fun()
        }
    });
    // 刷新页面
    $('.refreshBtn').click(function () {
        location.reload();
    });
    let salesTableIn = table.render({
        elem: '#salesTable',
        method: 'post',
        url: `${vApi}/sales_manager/getSalesManager`,
        contentType: "application/json",
        headers: {
            token: token
        },
        cols: [[
            { field: 'sm_no',  title: '编号', align: 'center' },
            { field: 'sm_name', title: '姓名', align: 'center' },
            { field: 'sm_phone',  title: '电话号', align: 'center' },
            { field: 'sm_classify', title: '类别', align: 'center' },
            { field: 'create_name',  title: '创建人', align: 'center' },
            {
                field: 'create_time', align: 'center', title: '创建时间', templet: function (d) {
                    if (d.create_time) {
                        return timeStamp(d.create_time)
                    } else {
                        return '-'
                    }
                }
            },
            { field: 'operation', align: 'center', title: '操作', toolbar: '#barDemo' },
        ]],
        id: 'salesId',
        page: true,
        loading: true,
        request: {
            'pageName': 'pageNum',
            'limitName': 'pageSize'
        },
        where: {
            merchantId: machineId,
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
            if (res.code == 403) {
                window.parent.location.href = "login.html";
            } else if (res.code == 405) {
                $('.hangContent').show();
            }
            permissions();
        }
    });

    //监听工具条
    let objData = null,
        operationFlag = null,
        type = 1; // 1 新增 2 编辑
    table.on('tool(salesTable)', function (obj) {
        objData = obj.data;
        event.stopPropagation();
        $('.editInput input[name="userName"]').val(objData.name)
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

    // 查询
    $('.queryBtn').click(function () {
        salesTableIn.reload({
            where: {
                keyword: $('.KyeText').val()
            }
        })
    })
    // 添加
    $('.addSalesBtn').click(function () {
        type = 1;
        $('.text').html('新增分账规则')
        popupShow('addSalesCont', 'addSalesBox');
    });
    // 编辑
    $('.ListOperation .edit').click(function () {
        type = 2;
        $('.text').html('编辑分账规则')
        popupShow('addSalesCont', 'addSalesBox');
    })
    // 删除
    $('.ListOperation .del').click(function () {
        console.log(objData);
        layer.confirm('确定删除？', function (index) {
            layer.close(index);
        });
    })

    function clearInfo() {
        $('.addSalesCont input[name="sm_no"]').val('');
        $('.addSalesCont input[name="name"]').val('');
        $('.addSalesCont input[name="phone"]').val('');
        $('.addSalesCont input[name="merchants"]').val('');
    }
    function addOrEditData(url, data) {
        loadingAjax(url, 'post', data, token).then(res => {
            layer.msg(res.message, { icon: 1 });
            salesTableIn.reload({where: {}})
            clearInfo();
            popupHide('addSalesCont', 'addSalesBox')
        }).catch(err => {
            layer.msg(err.message, { icon: 2 })
        });
    }

    // 添加编辑
    $('.addSalesCont .confirmBtn').click(function () {
        if (!($('.addSalesCont input[name="sm_no"]').val() && $('.addSalesCont input[name="name"]').val() && $('.addSalesCont input[name="phone"]').val() && $('.addSalesCont input[name="merchants"]').val())) {
            layer.msg('带*号未必填', { icon: 7 });
            return
        }
        let data = JSON.stringify({
            sm_no: $('.addSalesCont input[name="sm_no"]').val(),
            merchant_id: machineId,
            sm_name: $('.addSalesCont input[name="name"]').val(),
            sm_phone: $('.addSalesCont input[name="phone"]').val(),
            sm_classify: $('.addSalesCont input[name="merchants"]').val(),
        });
        console.log(JSON.parse(data));
        // if (type === 1) {
        //     addOrEditData('/sales_manager/add', data)
        // } else {
        //     addOrEditData('/sales_manager/edit', data)
        // }
    })
    // 取消添加
    $('.addSalesCont .cancelBtn').click(function () {
        clearInfo();
        popupHide('addSalesCont', 'addSalesBox')
    })
    // 刷新商户列表
    let dataList1 = null,
        dataList = dataList1 = treeList();
    $('.refreshBtnList').click(function () {
        var dataList1 = treeList();
        if (JSON.stringify(dataList1) != JSON.stringify(dataList)) {
            dataList = dataList1;
            treeFun1(tree, 'testGoods', salesTableIn, dataList,)
            salesTableIn.reload({
                where: {
                    merchantId: machineId,
                }
            });
            layer.msg('已刷新', { icon: 1 })
        } else {
            layer.msg('已刷新', { icon: 1 })
        }
    });
    treeFun1(tree, 'testGoods', salesTableIn, dataList)
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
                console.log(obj)
                // if (permissionsObjFlag[436]) {
                //     if (obj.data.id == sessionStorage.machineID) {
                //         $('.addSalesBtn').show()
                //     } else {
                //         $('.addSalesBtn').hide()
                //     }
                // }
                // if (permissionsObjFlag[437]) {
                //     if (obj.data.id == sessionStorage.machineID) {
                //         $('.pushImportBtn').show()
                //     } else {
                //         $('.pushImportBtn').hide()
                //     }
                // }
                machineId = obj.data.id;
                tableID.reload({
                    where: {
                        merchantId: obj.data.id
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
    }
    $('body').click(function () {
        $('.ListOperation').fadeOut();
        operationFlag = null;
    });
})
