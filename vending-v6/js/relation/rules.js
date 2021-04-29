/* 规则 */
import '../../MyCss/merchants/salesManager.scss';
import '../../MyCss/relation/rules.scss';

layui.use(['table', 'form', 'layer', 'laydate', 'tree'], function () {
    var permissionsData0 = window.parent.permissionsData1(),
        merchantId = +sessionStorage.machineID,
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
    let tableCols = [[
        {field: 'accsplitRuleName', title: '规则名', align: 'center'},
        {field: 'payee', title: '收款账户', align: 'center'},
        {field: 'defaultRule', title: '默认规则标识', align: 'center', templet: d => +d.defaultRule === 0 ? '非默认' : '默认'},
        {field: 'accsplitMode', title: '接收方分账模式', align: 'center', templet: d => +d.accsplitMode === 0 ? '指定金额' : '指定比例'},
        {field: 'accsplitRule', title: '分账金额计算模式', align: 'center', templet: d => +d.accsplitRule === 0 ? '固定金额' : '按订单金额比例'},
        {field: 'effectiveDate', title: '生效时间', align: 'center'},
        {field: 'expiryDate', title: '失效时间', align: 'center'},
        {field: 'status', title: '状态', align: 'center', templet: d => d.status === '1' ? '启用' : '禁用'},
        {field: 'operation', align: 'center', title: '操作', toolbar: '#barDemo'},
    ]]
    let salesTableIn = table.render({
        elem: '#salesTable',
        method: 'post',
        url: `${vApi}/accSplit/getAccRule`,
        contentType: "application/json",
        headers: {
            token: token
        },
        height: 600,
        cols: tableCols,
        id: 'salesId',
        page: true,
        loading: true,
        request: {
            'pageName': 'pageNum',
            'limitName': 'pageSize'
        },
        where: {
            merchantId: merchantId,
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
            statusCode: 200//规定成功的状态码，默认：0
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
        console.log(objData);
        event.stopPropagation();
        if (obj.event === 'operation') {
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
        // saveTableWidth(tableCols)
        salesTableIn.reload({
            where: {
                keyword: $('.KyeText').val().trim()
            },
            // cols: tableCols
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
                $('#payIdTwo').html(optionList);
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
        enDisableOperation();
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
        $('.text').html('新增分账规则');
        getPayAccount(merchantId).then(res => {
            popupHide('chooseGoods', 'chooseGoodsBox')
            popupShow('addSalesCont', 'addSalesBox');
        }).catch(({flag}) => {
            console.log(flag);
            layer.msg('该商户不具备新增分账规则的功能，请先配置对应的杉德支付方式', {icon: 7});
            return
        })
    });


    //   商品列表
    var goodsTableIns = null;

    // 商品列表
    function goodsreload() {
        goodsTableIns = table.render({
            elem: '#goodsTable'
            , url: `${vApi}/accSplit/getReceiverList`
            , method: 'post',
            contentType: "application/json",
            headers: {
                token: token,
            },
            cols: [[
                {type: 'checkbox'},
                {field: `accsplitMerName`, title: '接收方名称', align: 'center'},
                {field: 'accsplitMerNo', title: '接收方编号', align: 'center',},
                {field: 'expiryDate', title: '失效日期', align: 'center',},
            ]],
            id: 'goodsID',
            page: true,
            loading: true,
            request: {
                'pageName': 'pageNum',
                'limitName': 'pageSize'
            },
            where: {
                merchantId: merchantId,
            },
            parseData: function (res) {
                // console.log(res)
                //res 即为原始返回的数据
                if (res.code == 200) {
                    var gTotal = [];
                    res.data.list.forEach(item => {
                        if (item.mail == 0) {
                            gTotal.push(item)
                        }
                    })
                    return {
                        "code": res.code, //解析接口状态
                        "msg": res.message, //解析提示文本
                        "count": res.data.total, //解析数据长度
                        "data": res.data.list //解析数据列表
                    };
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
                if (res.code == 403) {
                    window.parent.location.href = "login.html";
                }
                console.log(res)
                console.log(goodsList)
                for (var i in goodsList) {
                    res.data.forEach((item, index) => {
                        if (item.accsplitMerNo === goodsList[i].accsplitMerNo) {
                            $('.goodsChooseList tr[data-index=' + index + '] input[type="checkbox"]').prop('checked', true);
                            form.render();// 重新渲染一下
                        }

                    })
                }
                $('.list-table .layui-table-header input[type="checkbox"]').prop('disabled', true);
                $('.list-table .layui-table-header .laytable-cell-checkbox>div').hide();
                form.render('checkbox');
            }
        })
    }

    form.on('radio(accsplitRule)', function ({value}) {
        if (+value === 0) {
            $('.money').show();
            $('.proportion').hide();
        } else {
            $('.proportion').show();
            $('.money').hide();
        }
    });

    $('input[name="accsplitTotalRate"]').on('change', function (e) {
        if (+e.currentTarget.value > 100) {
            layer.msg('输入的比例不能大于100', {icon: 7});
            $(this).val(0);
        }
    })

    var goodsList = [];
    table.on('checkbox(goodsTable)', function (obj) {
        // console.log(obj.data); //选中行的相关数据
        let data = obj.data;
        if (obj.type == "all") {
        } else {
            if (obj.checked) {
                goodsList.push({
                    accsplitMerName: data.accsplitMerName,
                    expiryDateMer: data.expiryDateMer,
                    accsplitMerNo: data.accsplitMerNo,
                    expiryDate: data.expiryDate,
                    fixedAmt: 0,
                    accsplitAmt: 0,
                    accsplitRate: 0
                });
            } else {
                goodsList.forEach((item, index) => {
                    if (item.accsplitMerNo === obj.data.accsplitMerNo) {
                        goodsList.splice(index, 1)
                    }
                });
            }
        }
        if (goodsList.length > 0) {
            $('.goodsFlag').text('已选择')
        } else {
            $('.goodsFlag').text('未选择')
        }

    });
    $('.goodsCont .determineBtn').click(function () {
        console.log(goodsList);
        if (goodsList.length === 0) {
            layer.msg('请选择接收方', {icon: 7})
            return;
        }
        chooseFun(goodsList);
        $('.chooseFooter').show();
        $('.chooseGoods input').prop('disabled', false)
        popupShow('chooseGoods', 'chooseGoodsBox')
    })

    // 渲染已选择接收方
    function chooseFun(goods) {
        var goodsStr = '';
        goods.forEach((item, index) => {
            goodsStr += ` <li class="setMateraialList">
                            <div class="SetName">
                                <div>${item.accsplitMerName}</div>
                            </div>
                            <div class="SetName">
                                <div>${item.accsplitMerNo}</div>
                            </div>
                            <div class="SetName">
                                <div>${item.expiryDate ? item.expiryDate : item.expiryDateMer}</div>
                            </div>
                            <div class="duration">
                                <div><input type="number" min="0"  name='fixedAmt' inputIndex="${index}" value="${item.fixedAmt}"></div>
                            </div>
                            <div class="duration">
                                <div><input type="number" min="0" name='accsplitAmt' inputIndex="${index}" value="${item.accsplitAmt}"></div>
                            </div>
                            <div class="duration">
                                <div><input type="number" min="0" max="100" name='accsplitRate' inputIndex="${index}" value="${item.accsplitRate}"></div>
                            </div>
                        </li>`
        });
        $('.SetContList').html(goodsStr)
    };

    var reduction = 1;
    // 设置用户配置的分账金额
    $('.SetContList').on('change', '.setMateraialList input', function (e) {
        var num = $(this).val(),
            re = /^\d*$/;
        switch (e.currentTarget.name) {
            case 'fixedAmt':
                sessionStorage.fixedAmt = +e.currentTarget.value;
                break;
            case 'accsplitAmt':
                sessionStorage.accsplitAmt = +e.currentTarget.value;
                break;
            case 'accsplitRate':
                if (+e.currentTarget.value > 100) {
                    layer.msg('输入的比例不能大于100', {icon: 7});
                    $(this).val(0);
                    return
                }
                sessionStorage.accsplitRate = +e.currentTarget.value;
                break;
        }
        if ((!re.test(num))) {
            layer.msg('只能输入正整数', {icon: 7});
            if (reduction) {
                $(this).val(reduction);
                goodsList[$(this).attr('inputIndex')].fixedAmt = sessionStorage.fixedAmt;
                goodsList[$(this).attr('inputIndex')].accsplitAmt = sessionStorage.accsplitAmt
                goodsList[$(this).attr('inputIndex')].accsplitRate = sessionStorage.accsplitRate
            } else {
                $(this).val(1);
                goodsList[$(this).attr('inputIndex')].fixedAmt = sessionStorage.fixedAmt;
                goodsList[$(this).attr('inputIndex')].accsplitAmt = sessionStorage.accsplitAmt
                goodsList[$(this).attr('inputIndex')].accsplitRate = sessionStorage.accsplitRate
            }

        }
        else {
            reduction = $(this).val();
            goodsList[$(this).attr('inputIndex')].fixedAmt = sessionStorage.fixedAmt;
            goodsList[$(this).attr('inputIndex')].accsplitAmt = sessionStorage.accsplitAmt
            goodsList[$(this).attr('inputIndex')].accsplitRate = sessionStorage.accsplitRate
        }
    });

    // 已选择接收方
    $('.chooseGoods .determineBtn').click(function () {
        popupHide('goodsCont', 'goodsBox');
        popupHide('chooseGoods', 'chooseGoodsBox')
    });

    // 选择接收方
    $('.goodsChooseBtn').click(function () {
        if (goodsList.length == 0) {
            goodsreload();
            popupShow('goodsCont', 'goodsBox');
        } else {
            chooseFun(goodsList);
            $('.chooseFooter').show();
            $('.chooseGoods input').prop('disabled', false)
            popupShow('chooseGoods', 'chooseGoodsBox')
        }

    });
    // 选择更多商品
    $('.moreChoose').click(function () {
        popupHide('chooseGoods', 'chooseGoodsBox')
        popupShow('goodsCont', 'goodsBox');
    });

    // 编辑
    function disableOperation() {
        $('input[name="accsplitRuleName"]').prop('disabled', true);
        $('select[name="payId"]').prop('disabled', true);
        $('input[name="accsplitMode"]').prop('disabled', true);
        $('input[name="effectiveDate"]').prop('disabled', true);
        $('input[name="expiryDate"]').prop('disabled', true);
        $('.machineChoose').hide();
    }

    function enDisableOperation() {
        $('input[name="accsplitRuleName"]').prop('disabled', false);
        $('select[name="payId"]').prop('disabled', false);
        $('input[name="accsplitMode"]').prop('disabled', false);
        $('input[name="effectiveDate"]').prop('disabled', false);
        $('input[name="expiryDate"]').prop('disabled', false);
        $('.machineChoose').show();
    }

    $('.ListOperation .edit').click(function () {
        type = 2;
        $('.text').html('编辑分账规则');
        getPayAccount(merchantId).then(res => {
            disableOperation();
            +objData.accsplitRule === 0 ? ($('.money').show(), $('.proportion').hide())
                : ($('.money').hide(), $('.proportion').show());
            form.val('formData', {
                accsplitRuleName: objData.accsplitRuleName,
                defaultRule: objData.defaultRule,
                effectiveDate: objData.effectiveDate,
                expiryDate: objData.expiryDate,
                payId: objData.payId,
                status: objData.status,
                accsplitRule: objData.accsplitRule,
                accsplitTotalAmt: objData.accsplitTotalAmt,
                accsplitTotalRate: objData.accsplitTotalRate
            })
            popupHide('chooseGoods', 'chooseGoodsBox')
            popupShow('addSalesCont', 'addSalesBox');
        })
    })
    $('.ListOperation .receiverList').click(function () {
        chooseFun(objData.accMerList);
        $('.chooseFooter').hide();
        $('.chooseGoods input').prop('disabled', true);
        popupShow('chooseGoods', 'chooseGoodsBox')
    })
    // 删除
    $('.ListOperation .del').click(function () {
        layer.confirm('确定删除？', function (index) {
            layer.close(index);
            $('.mask').fadeIn();
            $('.maskSpan').addClass('maskIcon');
            loadingAjax('/accSplit/deleteAccRule', 'post',
                JSON.stringify({
                    accsplitRuleNo: objData.accsplitRuleNo,
                }), token, 'mask', '', '', layer).then(res => {
                layer.msg(res.message, {icon: 1});
                salesTableIn.reload({
                    where: {}
                })
            }).catch(err => {
                layer.msg(err.message, {icon: 2})
            })
        });
    })

    function clearInfo() {
        form.val('formData', {
            accsplitMode: "",
            accsplitRuleName: "",
            defaultRule: "",
            effectiveDate: "",
            expiryDate: "",
            payId: "",
            status: "",
            accsplitTotalAmt: '',
            accsplitTotalRate: ''
        });
        goodsList = [];
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
        res['accMerList'] = goodsList;
        res['merchantId'] = merchantId;
        if (type === 1) {
            addOrEditData('/accSplit/insertAccRule', JSON.stringify(res))
        } else {
            res['accsplitRuleNo'] = objData.accsplitRuleNo;
            addOrEditData('/accSplit/updateAccRule', JSON.stringify(res))
        }
    })
    // 取消添加
    $('.addSalesCont .cancelBtn').click(function () {
        clearInfo()
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
                    merchantId: merchantId,
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
                merchantId = obj.data.id;
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
    $('.cancel-btn').click(function () {
        popupHide('goodsCont', 'goodsBox');
    })
})
