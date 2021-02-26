import '../../MyCss/merchants/merchantsList.scss';
import { loadAjax, popupShow, popupHide, dataLoading, closeData, wholeNum, numFormat2, mulCaluter,fixedFun } from '../../common/common.js';
layui.use(['table', 'form', 'layer', 'tree', 'util'], function () {
    var $ = layui.jquery,
        table = layui.table,
        layer = layui.layer,
        layer = layui.layer,
        util = layui.util,
        tree = layui.tree,
        form = layui.form,
        token = sessionStorage.token;
    var tableIns = table.render({
        elem: '#tableTest',
        url: `${Vapi}/company/getCompany`,
        method: 'post',
        contentType: "application/json",
        headers: {
            token,
        },
        cols: [[
            { field: 'goods_images', width: 35, title: '', templet: "#imgtmp", align: 'center' },
            { field: 'bicId', width: 160, title: '商家ID', align: 'center' },
            { field: 'companyName', width: 180, title: '商家名称', align: 'center' },
            {
                field: 'balance', width: 160, title: '余额', align: 'center', templet: function (d) {
                    return numFormat2(d.balance)
                }
            },
            {
                field: 'freezeMoney', width: 150, title: '冻结金额', align: 'center', templet: function (d) {
                    return numFormat2(d.freezeMoney)
                }
            },
            {
                field: 'usableBalance', width: 150, title: '可用金额', align: 'center', templet: function (d) {
                    return numFormat2(d.usableBalance)
                }
            },
            { field: 'moneyRemind', width: 150, title: '余额预警值', align: 'center',templet:function(d){
                return numFormat2(d.moneyRemind)
            } },
            { field: 'operation', width: 150, title: '操作', toolbar: '#barDemo', align: 'center' },
        ]]
        , id: 'tableId'
        , page: true,
        loading: true,
        even:true,
        request: {
            'pageName': 'pageNum',
            'limitName': 'pageSize'
        },
        where: {
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
                layer.msg('登录过期,请重新登录', { icon: 2 })
                setTimeout(__ => {
                    window.parent.location.href = "login.html";
                }, 1500)
            }
            for (var i in res.data) {
                var item = res.data[i];
                if (item.flag==2) {// 这里是判断需要禁用的条件（如：状态为0的）
                  // checkbox 根据条件设置不可选中
                  $('.data_list1 tr[data-index=' + i + ']').addClass('warning');
                }
              }
              fixedFun();
        }
    });
      // 关闭弹窗
      $('.playHeader .close').click(function () {
        $(this).parent().parent().addClass('margin0')
        $(this).parents('.maskContnet').fadeOut();
    });
    // 查询
    $('.queryBtnClick').click(function () {
        tableIns.reload({
            where: {
                companyName: $('.addMember input[name="keyMerchants"]').val(),
                bicId: $('.addMember input[name="keyBIC"]').val()
            }
        })
    });
    //监听工具条
    var companyData = null,
        operationFlag = null;
    table.on('tool(tableTest)', function (obj) {
        event.stopPropagation();
        companyData = obj.data;
        if (obj.event === 'operation') {
            if (operationFlag == obj.data.companyId) {
                $('.ListOperation').fadeOut();
                operationFlag = null;
                return;
            }
            operationFlag = obj.data.companyId;
            $('.ListOperation').fadeIn();
            $('.ListOperation').css({
                left: $(this).offset().left - 35 + 'px',
                top: $(this).offset().top + 35 + 'px'
            })
        }
    });

    // 添加商户
    $('.addBtn').click(function () {
        popupShow('.addMerchantsCont', '.addMBox');
    })
  
    //点击取消添加
    $('.addMBox .cancel1').click(function () {
        popupHide('.addMerchantsCont', '.addMBox')
    })
    // 確定添加
    $('.addMBox .determine1').click(function () {
        if (!($('.addMBody input[name="companyName"]').val() && $('.addMBody input[name="bicId"]').val() && $('.addMBody input[name="moneyRemind"]').val())) {
            layer.msg('带*为必填', { icon: '7' });
            return;
        }
        // if (!(wholeNum($('.addMBody input[name="moneyRemind"]').val()))) {
        //     layer.msg('余额预警值必须为正整数', { icon: '7' });
        //     return;
        // }
        dataLoading();
        var addCompanyObj = JSON.stringify({
            companyName: $('.addMBody input[name="companyName"]').val(),
            bicId: $('.addMBody input[name="bicId"]').val(),
            moneyRemind:mulCaluter(Number($('.addMBody input[name="moneyRemind"]').val()),100) 
            // mulCaluter(Number($('.topUPBox input[name="topUpNum"]').val()), 100),
        });
        loadAjax('/company/addCompany', 'post', sessionStorage.token, addCompanyObj, layer, 'mask', '.addMerchantsCont', '.addMBox').then(res => {
            layer.msg(res.message, { icon: 1 });
            tableIns.reload({
                where: {}
            });
            $('.addMBody input[name="companyName"]').val('');
            $('.addMBody input[name="bicId"]').val('');
            $('.addMBody input[name="moneyRemind"]').val('');
        }).catch(err => {
            layer.msg(err.message, { icon: 2 });
        })
    })
    // 点击充值
    $('.ListOperation .topUpBtn').click(function () {
        $('.topUPBox input[name="companyName"]').val(companyData.companyName)
        $('.topUPBox input[name="balance"]').val(companyData.balance)
        popupShow('.topUPContent', '.topUPBox')
    });
    // 确定充值
    $('.topUPBox .determine1').click(function () {
        if (!($('.topUPBox input[name="topUpNum"]').val())) {
            layer.msg('带*为必填', { icon: 7 })
            return;
        }
        if (!($('.topUPBox input[name="topUpNum"]').val() > 0)) {
            layer.msg('充值金额必须大于0', { icon: 7 });
            return;
        }
        layer.confirm('确定充值?', function (index) {
            layer.close(index);
            dataLoading();
            var topUpObj = JSON.stringify({
                // balance:Number($('.topUPBox input[name="topUpNum"]').val())*100,
                balance: mulCaluter(Number($('.topUPBox input[name="topUpNum"]').val()), 100),
                companyId: companyData.companyId
            });
            loadAjax('/company/addBalance', 'post', sessionStorage.token, topUpObj, layer, 'mask', '.topUPContent', '.topUPBox').then(res => {
                layer.msg(res.message, { icon: 1 });
                tableIns.reload({
                    where: {}
                });
                $('.topUPBox input[name="topUpNum"]').val('')
            }).catch(err => {
                layer.msg(err.message, { icon: 2 });
            })
        })

    });
    //点击取消充值
    $('.topUPBox .cancel1').click(function () {
        popupHide('.topUPContent', '.topUPBox')
    });
    // 点击核销余额
    $('.ListOperation .reductionsBtn').click(function () {
        $('.reductionsBox input[name="companyName"]').val(companyData.companyName)
        $('.reductionsBox input[name="balance"]').val(companyData.balance)
        popupShow('.reductionsCOntent', '.reductionsBox');
    });
    // 确定核销
    $('.reductionsBox .determine1').click(function () {
        if (!($('.reductionsBox input[name="reductionsNum"]').val())) {
            layer.msg('带*为必填', { icon: 7 })
            return;
        }
        if (!($('.reductionsBox input[name="reductionsNum"]').val() > 0)) {
            layer.msg('充值金额必须大于0', { icon: 7 });
            return;
        }
        layer.confirm('确定调减?', function (index) {
            layer.close(index);
            dataLoading();
            var reductionObj = JSON.stringify({
                balance: mulCaluter(Number($('.reductionsBox input[name="reductionsNum"]').val()), 100),
                companyId: companyData.companyId
            });
            loadAjax('/company/subBalance', 'post', sessionStorage.token, reductionObj, layer, 'mask', '.reductionsCOntent', '.reductionsBox').then(res => {
                layer.msg(res.message, { icon: 1 });
                tableIns.reload({
                    where: {}
                });
                $('.reductionsBox input[name="reductionsNum"]').val('')
            }).catch(err => {
                layer.msg(err.message, { icon: 2 });
            })
        })
    });
    //点击取消核销
    $('.reductionsBox .cancel1').click(function () {
        popupHide('.reductionsCOntent', '.reductionsBox')
    });
    // 编辑
    $('.ListOperation .edit').click(function () {
        $('.editBox input[name="companyName"]').val(companyData.companyName);
        $('.editBox input[name="bicId"]').val(companyData.bicId);
        $('.editBox input[name="moneyRemind"]').val(companyData.moneyRemind)
        popupShow('.editContent', '.editBox')
    });
    // 确定编辑
    $('.editBox .determine1').click(function () {
        if (!($('.editBox input[name="companyName"]').val() && $('.editBox input[name="bicId"]').val() && $('.editBox input[name="moneyRemind"]').val())) {
            layer.msg('带*为必填', { icon: '7' });
            return;
        }
        // if (!(wholeNum($('.editBox input[name="moneyRemind"]').val()))) {
        //     layer.msg('余额预警值必须为正整数', { icon: '7' });
        //     return;
        // }
        dataLoading();
        var editCompanyObj = JSON.stringify({
            companyName: $('.editBox input[name="companyName"]').val(),
            bicId: $('.editBox input[name="bicId"]').val(),
            moneyRemind:mulCaluter(Number($('.editBox input[name="moneyRemind"]').val()),100),
            companyId: companyData.companyId
        });
        loadAjax('/company/updateCompany', 'post', sessionStorage.token, editCompanyObj, layer, 'mask', '.editContent', '.editBox').then(res => {
            layer.msg(res.message, { icon: 1 });
            tableIns.reload({
                where: {}
            });
        }).catch(err => {
            layer.msg(err.message, { icon: 2 });
        })
    })
    // 取消编辑
         //点击取消核销
         $('.editBox .cancel1').click(function () {
            popupHide('.editContent', '.editBox')
        });
    $('body').click(function () {
        $('.ListOperation').fadeOut();
        operationFlag = null;
    });

    // 充值调减记录部分
    var TopUpIns = table.render({
        elem: '#TopUpTable',
        url: `${Vapi}/company/getCompany`,
        method: 'post',
        contentType: "application/json",
        headers: {
            token,
        },
        cols: [[
            
            { field: 'companyName', width: 180, title: '充值/调减前余额', align: 'center' },
            {
                field: 'balance', width: 160, title: '充值/调减余额', align: 'center', templet: function (d) {
                    return numFormat2(d.balance)
                }
            },
            { field: 'balance', width: 160, title: '余额', align: 'center' },
            {
                field: 'freezeMoney', width: 150, title: '充值/调减时间', align: 'center', templet: function (d) {
                    return numFormat2(d.freezeMoney)
                }
            },
          ]]
        , id: 'tioUpId'
        , page: true,
        loading: true,
        even:true,
        request: {
            'pageName': 'pageNum',
            'limitName': 'pageSize'
        },
        where: {
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
                layer.msg('登录过期,请重新登录', { icon: 2 })
                setTimeout(__ => {
                    window.parent.location.href = "login.html";
                }, 1500)
            }
              fixedFun();
        }
    });
    // 充值调减记录
    $('.ListOperation .top').click(function(){
        popupShow('.TopUpRecordContent','.topUpRecordBox')
    });

    // 使用记录
    var useIns = table.render({
        elem: '#useTable',
        url: `${Vapi}/company/getCompany`,
        method: 'post',
        contentType: "application/json",
        headers: {
            token,
        },
        cols: [[
            { field: 'balance', width: 160, title: '使用时间', align: 'center' },
            { field: 'companyName', width: 180, title: '使用金额', align: 'center' },
            {
                field: 'balance', width: 160, title: '余额', align: 'center', templet: function (d) {
                    return numFormat2(d.balance)
                }
            },
          ]]
        , id: 'useId'
        , page: true,
        loading: true,
        even:true,
        request: {
            'pageName': 'pageNum',
            'limitName': 'pageSize'
        },
        where: {
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
                layer.msg('登录过期,请重新登录', { icon: 2 })
                setTimeout(__ => {
                    window.parent.location.href = "login.html";
                }, 1500)
            }
              fixedFun();
        }
    });
    // 使用记录
    $('.ListOperation .use').click(function(){
        popupShow('.useRecordContent','.useRecordBox');
    })
});


