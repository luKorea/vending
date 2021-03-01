import '../../MyCss/order/orderList.scss';
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
            { field: 'bicId', width: 180, title: '订单编号',  align: 'center',templet:function(d){
                return d.bicId+d.bicId
            } },
            { field: 'companyName', width: 180, title: '订单码', align: 'center' },
            { field: 'bicId', width: 160, title: '商家ID', align: 'center' },
            { field: 'companyName', width: 160, title: '商家名称', align: 'center' },
            { field: 'bicId', width: 160, title: '订单履约状态', align: 'center' },
            { field: 'bicId', width: 160, title: '是否取消', align: 'center' },
            { field: 'bicId', width: 160, title: '是否拦截', align: 'center' },
            { field: 'bicId', width: 160, title: '拦截原因', align: 'center' },
            { field: 'bicId', width: 160, title: '合并批次号', align: 'center' },
            { field: 'bicId', width: 160, title: '入库件数', align: 'center' },
            { field: 'bicId', width: 160, title: '质检机构', align: 'center' },
            { field: 'bicId', width: 160, title: '质检结果', align: 'center' },
            { field: 'bicId', width: 160, title: '复检结果', align: 'center' },
            { field: 'bicId', width: 160, title: '计划发货快递', align: 'center' },
            { field: 'bicId', width: 160, title: '实际发货快递', align: 'center' },
            { field: 'bicId', width: 160, title: '快递单号', align: 'center' },
            { field: 'bicId', width: 160, title: '收货省份', align: 'center' },
            { field: 'bicId', width: 180, title: '下单时间', align: 'center' },
            { field: 'bicId', width: 180, title: '入库时间', align: 'center' },
            { field: 'bicId', width: 180, title: '送检时间', align: 'center' },
            { field: 'bicId', width: 180, title: '质检完成时间', align: 'center' },
            { field: 'bicId', width: 180, title: '出库时间', align: 'center' },
            { field: 'operation', width: 150, title: '操作', toolbar: '#barDemo',fixed: 'right', align: 'center' },
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
                // companyName: $('.addMember input[name="keyMerchants"]').val(),
                // bicId: $('.addMember input[name="keyBIC"]').val()
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
//    点击导入订单
    $('.pushBtnShow').click(function(){
        popupShow('.pushOrderContent','.pushOrderBox');
    });
    // 导入订单
     // 导入销售经理
     $('#pushImg').change(function (e) {
        if (!$(this).val()) {
            return;
        }
        var that = this;
        var upDetails = new FormData();
        upDetails.append('file', e.target.files[0]);
        dataLoading();
        $.ajax({
            type: 'post',
            url: `${Vapi}/order/excelOrder`,
            processData: false,
            contentType: false,
            timeout: 60000,
            headers: {
                token:sessionStorage.token,
            },
            data: upDetails,
            success: function (res) {
                closeData();
                $(that).val('')
                if (res.code == 200) {
                    layer.msg(res.message, { icon: 1 });
                    tableIns.reload({
                        where: {}
                    })
                    popupHide('.pushOrderContent ', '.pushOrderBox')
                } else {
                    layer.msg(res.message, { icon: 7 });
                }
            },
            error: function (err) {
                $(that).val('');
                closeData();
                $('.maskSpan').removeClass('maskIcon')
                layer.msg('服务器请求超时', { icon: 2 })
            }
        })
    })

    
    $('body').click(function () {
        $('.ListOperation').fadeOut();
        operationFlag = null;
    });
});