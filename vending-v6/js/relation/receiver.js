/* 规则 */
import '../../MyCss/merchants/salesManager.scss';

layui.use(['table', 'form', 'layer', 'laydate', 'tree'], function () {
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
        form = layui.form,
        tree = layui.tree,
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
            {field: 'accsplitMerName', title: '接收方名称', align: 'center'},
            {field: 'merType', title: '接收方类型', align: 'center'},
            // {field: 'businessLicenseType', title: '企业证件类型', align: 'center'},
            // {field: 'businessLicense', title: '企业证件号码', align: 'center'},
            // {field: 'userPapersType', title: '个人证件类型', align: 'center'},
            // {field: 'papersNo', title: '个人证件号码', align: 'center'},
            {field: 'clearCycle', title: '结算周期', align: 'center'},
            {field: 'accountNature', title: '账户属性', align: 'center'},
            {field: 'accountType', title: '账户类型', align: 'center'},
            // {field: 'account', title: '账号', align: 'center'},
            {field: 'accountBank', title: '开户行', align: 'center'},
            // {field: 'accountBankCode', title: '开户行联行号', align: 'center'},
            {field: 'accountName', title: '户名', align: 'center'},
            {field: 'effectiveDate', title: '生效时间', align: 'center'},
            {field: 'expiryDate', title: '失效时间', align: 'center'},
            {field: 'payId', title: '收款账户', align: 'center'},
            {field: 'status', title: '状态', align: 'center'},
            {field: 'operation', align: 'center', title: '操作', toolbar: '#barDemo'},
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

    // 监听类别
    form.on('radio(merType)', function ({value}) {
        if (value === '01') {
            $('.personal').show();
            $('.enterprise').hide();
        } else {
            $('.personal').hide();
            $('.enterprise').show();
        }
    });
    // 监听对公账号
    form.on('radio(accountType)', function ({value}) {
        if (value === '02') {
            $('.accountType').show();
        } else {
            $('.accountType').hide();
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

    function formatTime() {
        let myDate = new Date();
        let y = myDate.getFullYear();
        let m = (myDate.getMonth() + 1) < 10 ? '0' + (myDate.getMonth() + 1) : (myDate.getMonth() + 1);
        let d = myDate.getDate() < 10 ? '0' + myDate.getDate() : myDate.getDate();
        let h = myDate.getHours() < 10 ? '0' + myDate.getHours() : myDate.getHours();
        let min = myDate.getMinutes() < 10 ? '0' + myDate.getMinutes() : myDate.getMinutes();
        let s = myDate.getSeconds() < 10 ? '0' + myDate.getSeconds() : myDate.getSeconds();
        return y + '-' + m + '-' + d + ' ' + h + ':' + min + ':' + s;
        // return y + '-' + m + '-' + d + ' ' + h + ':' + min + ':' + s;
    }
    // 获取收款账号
    function getPayAccount(merchantId) {
        return new Promise((resolve, reject) => {
            loadingAjax('/accSplit/getAccRec', 'post', JSON.stringify({
                pageNum: 1,
                pageSize: 200,
                merchantId,
            }), token).then(res => {
                let optionList = ``;
                $.each(res.data, function (index, ele) {
                    optionList += `<option value="${ele.id}">${ele.payee}</option>`
                });
                $('#payId').html(optionList);
                form.render('select');
                resolve(res);
            }).catch(err => {
                reject(err);
            })
        }).catch(err => {
            return Promise.reject(err);
        })
    }

    // 添加
    let start_time = null,//活动开始时间
        end_time = null;//活动结束时间
    $('.addSalesBtn').click(function () {
        $('.J-datepicker-range').datePicker({
            hasShortcut: true,
            min: formatTime(),
            max: '',
            isRange: true,
            hide: function (type) {
                start_time = this.$input.eq(0).val();
                end_time = this.$input.eq(1).val();
            }
        });
        type = 1;
        $('.text').html('新增接收方');
        getPayAccount(machineId).then(res => {
            popupShow('addSalesCont', 'addSalesBox');
        }).catch(({flag}) => {
            console.log(flag);
            layer.msg('该商户不具备新增接收方的功能，请先配置对应的杉德支付功能', {icon: 7});
            return
        })
    });
    // 编辑
    $('.ListOperation .edit').click(function () {
        type = 2;
        $('.text').html('编辑接收方')
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
        form.val('formData', {
            account: "",
            accountBank: "",
            accountBankCode: "",
            accountName: "",
            accsplitMerName: "",
            businessLicense: "",
            businessLicenseType: "",
            clearCycle: "",
            effectiveDate: "",
            expiryDate: "",
            papersNo: "",
            payId: "",
            status: "",
            userPapersType: "",
        });
    }

    function addOrEditData(url, data) {
        loadingAjax(url, 'post', data, token).then(res => {
            layer.msg(res.message, {icon: 1});
            salesTableIn.reload({where: {}})
            clearInfo();
            popupHide('addSalesCont', 'addSalesBox')
        }).catch(err => {
            layer.msg(err.message, {icon: 2})
        });
    }

    // 添加编辑
    $('.addSalesCont .confirmBtn').click(function () {
        let res = form.val('formData');
        res['machineId'] = machineId;
        if (type === 1) {
            addOrEditData('/accSplit/insertReceiver', JSON.stringify(res))
        } else {
            addOrEditData('/sales_manager/edit',  JSON.stringify(res))
        }
    })
    // 取消添加
    $('.addSalesCont .cancelBtn').click(function () {
        popupHide('addSalesCont', 'addSalesBox')
    });

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
            layer.msg('已刷新', {icon: 1})
        } else {
            layer.msg('已刷新', {icon: 1})
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
