import '../../MyCss/subMerchants/subMerchants.scss';

layui.use(['laydate', 'table', 'tree', 'flow', 'layer', 'form'], function () {
    $('.sidebar i').click(function () {
        $('.activityBox').hide();
        $('.onLeft').show();
    });
    $('.onLeft').click(function () {
        $('.onLeft').hide();
        $('.activityBox').show();
    })
    var token = sessionStorage.token,
        flow = layui.flow,
        layer = layui.layer,
        table = layui.table,
        form = layui.form,
        tree = layui.tree,
        merchantId = sessionStorage.machineID,
        tableCols = [[
            {field: 'sub_name', title: '子商户名称', align: 'center'},
            {field: 'merchant_name', title: '商户名称', align: 'center'},
            {field: 'merchant_short_name', title: '商户简称', align: 'center'},
            {field: 'wallet_id', title: '商户钱包ID', align: 'center'},
            {field: 'contact_name', title: '联系人', align: 'center'},
            {field: 'service_phone', title: '联系人电话', align: 'center'},
            {field: 'contact_email', title: '联系邮箱', align: 'center'},
            {field: 'merchant_remark', title: '商户备注', align: 'center'},
            {
                field: 'status', title: '是否关联', align: 'center', templet: d => +d.status === 1 ? '是' : '否'
            },
            {field: 'operation', title: '操作', toolbar: '#barDemo', align: 'center'},
        ]],
        orderTable = table.render({
            elem: '#moneyData',
            url: `${vApi}/pay/subMerList`,
            method: 'post',
            contentType: "application/json",
            headers: {
                token,
            },
            cols: tableCols,
            page: true,
            loading: true,
            // limits: [10, 20, 50],
            request: {
                'pageName': 'pageNum',
                'limitName': 'pageSize'
            },
            where: {
                payId: activeCode
                // merchant_id: Number(merchantId)
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
            }
        });

    let type = 'add';

    function cleanVal() {
        form.val('information', {
            sub_name: '',
            contact_email: "",
            contact_name: "",
            merchant_remark: "",
            merchant_name: '',
            merchant_short_name: "",
            wallet_id: '',
            service_phone: ""
        })

    }

    $('.addBtn').click(function () {
        if (listData.length === 0) {
            layer.msg('您的商户没有配置对应的数字货币支付方式，不能新增子商户！！', {icon: 7})
            return;
        }
        if (listData.length !== 0 && activeCode === '') {
            layer.msg('清先选择对应的数字货币商户', {icon: 7})
            return;
        }
        $('.subTitle').html('新增子商户');
        popupShow('MemberOperation', 'addBox')
    });


    $('.submit_btn').click(function () {
        let data = form.val('information'),
            url = '/pay/subMerchant';
        data['payId'] = activeCode;
        if (type === 'edit') {
            data['channel_id'] = payData.channel_id;
        }
        loadingAjax(url, 'POST', JSON.stringify(data), token)
            .then(res => {
                if (res.code === 200) {
                    layer.msg('操作成功', {icon: 1});
                    popupHide('MemberOperation', 'MemberContent');
                    cleanVal();
                    orderTable.reload({
                        where: {
                            payId: activeCode
                        }
                    })
                }
            }).catch(err => {
            console.log(err)
            layer.msg(err.message, {icon: 7})
        })
    })


    // 取消事件
    $('.cancel_btn').click(function () {
        $('.ListOperation').fadeOut();
        operationFlag = null;
        popupHide('MemberOperation', 'MemberContent');
        cleanVal();
    });
    $('.playHeader .close').click(function () {
        $(this).parent().parent().addClass('margin0')
        $(this).parents('.maskContnet').fadeOut();
        cleanVal();
    });
    //   关闭添加
    $('.addBox .addCancelBtn').click(function () {
        popupHide('addMerchants', 'addBox')
        cleanVal();
    });


    var payData = null,
        operationFlag = null;
    table.on('tool(moneyData)', function (obj) {
        event.stopPropagation();
        payData = obj.data;
        if (obj.event === 'operation') {
            operationFlag = obj.data.id;
            $('.ListOperation').fadeIn();
            $('.ListOperation').css({
                left: $(this).offset().left - 35 + 'px',
                top: $(this).offset().top + 35 + 'px'
            })
        }
    });

    $('.ListOperation .edit').click(function () {
        type = 'edit';
        $('.subTitle').html('编辑子商户');
        popupShow('MemberOperation', 'addBox');
        console.log(payData);
        form.val('information', {
            sub_name: payData.sub_name,
            contact_email: payData.contact_email,
            contact_name: payData.contact_name,
            merchant_remark: payData.merchant_remark,
            merchant_name: payData.merchant_name,
            merchant_short_name: payData.merchant_short_name,
            wallet_id: payData.wallet_id,
            service_phone: payData.service_phone
        })
    });
    $('.ListOperation .relation').click(function () {
        layer.confirm('收款方只能关联一个子商户，是否修改？', function (index) {
            $.ajax({
                type: 'POST',
                url: `${vApi}/pay/associationMer`,
                headers: {
                    token,
                    "Content-Type": "application/json",
                },
                data: JSON.stringify({
                    channel_id: payData.channel_id,
                    payId: activeCode
                }),
                success: function (res) {
                    if (res.code == 200) {
                        layer.msg(res.message, {icon: 1});
                        layer.close(index);
                        orderTable.reload({
                            where: {
                                payId: activeCode
                            }
                        })
                    } else if (res.code == 403) {
                        window.parent.location.href = "login.html";
                    } else {
                        layer.msg(res.message, {icon: 2});
                    }
                }
            });
        });
    })


    let listData = [];

    function getFlow() {
        flow.load({
            elem: '#demo',
            isAuto: true, //流加载容器
            scrollElem: '#demo',
            end: ' ',
            done: function (page, next) { //执行下一页的回调
                //模拟数据插入
                setTimeout(function () {
                    var lis = [];
                    next(lis.join(''), page < 1000); //假设总页数为 10
                    var machineData = JSON.stringify({
                        pageNum: page,
                        pageSize: 100,
                        merchantId: merchantId
                    })
                    loadingAjax('/pay/digitalCurrencyList', 'post', machineData, sessionStorage.token).then(res => {
                        listData = res.data;
                        res.data.forEach((item, index) => {
                            lis.push(`<span activityID="${item.id}">${item.payee}</span>`)
                        })
                        next(lis.join(''), res.data.length >= 100);
                    }).catch(err => {
                        console.log(err)
                        layer.msg(err.message, {icon: 7})
                        next(lis.join(''), err.code == 200); //假设总页数为 10
                    })
                    //执行下一页渲染，第二参数为：满足“加载更多”的条件，即后面仍有分页
                    //pages为Ajax返回的总页数，只有当前页小于总页数的情况下，才会继续出现加载更多

                }, 200);
            }
        });
    }

    getFlow();

    //查询
    $('.queryBtn').click(function () {
        layer.msg('已刷新', {icon: 1})
        var dataList = treeList();
    });

    //   点击活动
    var activeCode = '';
    $('body').on('click', '.activityArr span', function () {
        $(this).addClass('active').siblings().removeClass('active');
        activeCode = $(this).attr('activityID');
        orderTable.reload({
            where: {
                payId: Number(activeCode)
            }
        });
    });

    let codeData = null;
    var dataList = treeList();
    orderTreeFun(tree, 'test1', dataList);
    // 树方法
    var marchantName = sessionStorage.marchantName,
        machineCode = null;

    function orderTreeFun(tree, element, data,) {
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
                marchantName = obj.data.title
                var nodes = $(`#${element} .layui-tree-txt`)
                for (var i = 0; i < nodes.length; i++) {
                    if (nodes[i].innerHTML === obj.data.title)
                        nodes[i].style.color = "#be954a";
                    else
                        nodes[i].style.color = "#555";
                }
                if (merchantId == obj.data.id) {
                    return;
                }
                merchantId = obj.data.id;
                $("#demo").remove();
                $(document).unbind();
                $('.activityList1').append(`<div class="activityArr" id="demo"></div>`);
                getFlow();
                $('.activityList1 span').removeClass('active');
                machineCode = '';
                activeCode = '';
                orderTable.reload({
                    where: {
                        payId: ''
                    }
                })
            },
        });
    }


    var permissionsData0 = window.parent.permissionsData1(),
        permissionsObj = {
            476: false,
        },
        permissionsObjFlag = permissionsVal1(permissionsObj, permissionsData0);

    function permissions() {
        permissionsObjFlag[476] ? $('.pushBtn').removeClass('hide') : $('.pushBtn').addClass('hide');
    }

    permissions();

    $('.refreshBtnList').click(function () {
        layer.msg('已刷新', {icon: 1})
        var dataList = treeList();
    })
    $('body').click(function () {
        $('.ListOperation').fadeOut();
        operationFlag = null;
    });

})
