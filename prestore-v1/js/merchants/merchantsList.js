import '../../MyCss/merchants/merchantsList.scss';
import { loadAjax, popupShow, popupHide,dataLoading,closeData,wholeNum,numFormat2,mulCaluter  } from '../../common/common.js';
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
            { field: 'companyName', width: 180, title: '商家名称', align: 'center' },
            { field: 'bicId', width: 160, title: '商家ID', align: 'center' },
            { field: 'balance', width: 160, title: '余额', align: 'center',templet:function(d){
                return numFormat2(d.balance)
            } },
            { field: 'freezeMoney', width: 150, title: '冻结金额', align: 'center', templet:function(d){
                return numFormat2(d.freezeMoney)
            }},
            { field: 'usableBalance', width: 150, title: '可用金额', align: 'center', templet:function(d){
                return numFormat2(d.usableBalance)
            }},
            { field: 'moneyRemind', width: 150, title: '余额预警值', align: 'center', },
            { field: 'operation', width: 150, title: '操作', toolbar: '#barDemo', align: 'center' },
        ]]
        , id: 'tableId'
        , page: true,
        loading: true,
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
                layer.msg('登录过期,请重新登录',{icon:2})
                setTimeout(__=>{
                    window.parent.location.href = "login.html";
                },1500)
                
            }
        }
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
    operationFlag=null;
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
    // 关闭弹窗
    $('.playHeader .close').click(function () {
        $(this).parent().parent().addClass('margin0')
        $(this).parents('.maskContnet').fadeOut();
    });
    //点击取消添加
    $('.addMBox .cancel1').click(function () {
        popupHide('.addMerchantsCont', '.addMBox')
    })
  
    // 確定添加
    $('.addMBox .determine1').click(function(){
        if(!($('.addMBody input[name="companyName"]').val()&&$('.addMBody input[name="bicId"]').val()&&$('.addMBody input[name="moneyRemind"]').val())){
            layer.msg('带*为必填',{icon:'7'});
            return ;
        }
        if(!(wholeNum($('.addMBody input[name="moneyRemind"]').val()))){
            layer.msg('余额预警值必须为正整数',{icon:'7'});
            return ;
        }
        dataLoading();
        var addCompanyObj=JSON.stringify({
            companyName:$('.addMBody input[name="companyName"]').val(),
            bicId:$('.addMBody input[name="bicId"]').val(),
            moneyRemind:Number($('.addMBody input[name="moneyRemind"]').val()) 
        });
        
        loadAjax('/company/addCompany','post',sessionStorage.token,addCompanyObj,layer,'mask','.addMerchantsCont','.addMBox').then(res=>{
            layer.msg(res.message,{icon:1});
            tableIns.reload({
                where:{}
            });
            $('.addMBody input[name="companyName"]').val('');
            $('.addMBody input[name="bicId"]').val('');
            $('.addMBody input[name="moneyRemind"]').val('');
        }).catch(err=>{
            layer.msg(err.message,{icon:2});
        })
    })
    // 点击充值
    $('.ListOperation .topUpBtn').click(function(){
        $('.topUPBox input[name="companyName"]').val(companyData.companyName)
        $('.topUPBox input[name="balance"]').val(companyData.balance)
        popupShow('.topUPContent','.topUPBox')
    });
    // 确定充值
    $('.topUPBox .determine1').click(function(){
        if(!($('.topUPBox input[name="topUpNum"]').val())){
            layer.msg('带*为必填',{icon:7})
            return ;
        }
        if(!($('.topUPBox input[name="topUpNum"]').val()>0)){
            layer.msg('充值金额必须大于0',{icon:7});
            return ;
        }
        layer.confirm('确定充值?', function (index) {
            layer.close(index);
            dataLoading();
            var topUpObj=JSON.stringify({
                // balance:Number($('.topUPBox input[name="topUpNum"]').val())*100,
                balance:mulCaluter(Number($('.topUPBox input[name="topUpNum"]').val()),100),
                companyId:companyData.companyId
            });
            loadAjax('/company/addBalance','post',sessionStorage.token,topUpObj,layer,'mask','.topUPContent','.topUPBox').then(res=>{
                layer.msg(res.message,{icon:1});
                tableIns.reload({
                    where:{}
                });
                $('.topUPBox input[name="topUpNum"]').val('')
            }).catch(err=>{
                layer.msg(err.message,{icon:2});
            })
        })
      
    });
      //点击取消充值
      $('.topUPBox .cancel1').click(function () {
        popupHide('.topUPContent', '.topUPBox')
    });
    // 点击核销余额
    $('.ListOperation .reductionsBtn').click(function(){
        $('.reductionsBox input[name="companyName"]').val(companyData.companyName)
        $('.reductionsBox input[name="balance"]').val(companyData.balance)
        popupShow('.reductionsCOntent','.reductionsBox');
    });
    // 确定核销
    $('.reductionsBox .determine1').click(function(){
        if(!($('.reductionsBox input[name="reductionsNum"]').val())){
            layer.msg('带*为必填',{icon:7})
            return ;
        }
        if(!($('.reductionsBox input[name="reductionsNum"]').val()>0)){
            layer.msg('充值金额必须大于0',{icon:7});
            return ;
        }
        layer.confirm('确定核销?', function (index) {
            layer.close(index);
            dataLoading();
            var reductionObj=JSON.stringify({
                balance:mulCaluter(Number($('.reductionsBox input[name="reductionsNum"]').val()),100),
                companyId:companyData.companyId
            });
            loadAjax('/company/subBalance','post',sessionStorage.token,reductionObj,layer,'mask','.reductionsCOntent','.reductionsBox').then(res=>{
                layer.msg(res.message,{icon:1});
                tableIns.reload({
                    where:{}
                });
                $('.reductionsBox input[name="reductionsNum"]').val('')
            }).catch(err=>{
                layer.msg(err.message,{icon:2});
            })
        })
    })
    $('body').click(function () {
        $('.ListOperation').fadeOut();
        operationFlag = null;
    });
});


