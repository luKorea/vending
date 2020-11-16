import '../../MyCss/merchants/salesResults.scss';
layui.use(['table', 'form', 'layer', 'laydate'], function () {
    var table = layui.table,
        form = layui.form,
        layer = layui.layer,
        laydate = layui.laydate,
        token = sessionStorage.token;
    // 初始时间
    var initialTime = new Date();
    var y = initialTime.getFullYear(),
        m = initialTime.getMonth(),
        d = initialTime.getDate(),
        //开始时间
        startTime = y + '-' + ((m + 1) < 10 ? '0' + (m + 1) : (m + 1)) + '-' + d,
        //结束时间
        endTime = y + '-' + ((m + 1) < 10 ? '0' + (m + 1) : (m + 1)) + '-' + d,
        initialTime1 = startTime + ' - ' + endTime
    console.log(startTime);
    console.log(endTime);
    laydate.render({
        elem: '#test6',
        range: true,
        value: initialTime1,
        // showBottom: false,
        done: function (value, date, endDate) {
            console.log(value); //得到日期生成的值，如：2017-08-18
            var timerKey = value.split(' - ');
            console.log(timerKey);
            startTime = timerKey[0];
            endTime = timerKey[1];
        }

    });
    var salesTableIn = table.render({
        elem: '#salesTable',
        method: 'post',
        url: '/api/sales_manager/getSalesAchievement',
        contentType: "application/json",
        headers: {
            token: sessionStorage.token
        },
        cols: [[
            // { checkbox: true },
            { field: 'sm_no', width: 200, title: '销售经理编号', align: 'center' },
            { field: 'sm_name', width: 230, title: '销售经理姓名', align: 'center' },
            { field: 'sm_phone', width: 230, title: '销售经理电话', align: 'center' },
            { field: 'sm_classify', width: 230, title: '销售经理类别', align: 'center' },
            {
                field: 'create_name', width: 230, title: '总单数', align: 'center', templet: function (d) {
                    if (d.achievement.length == 0) {
                        return '-'
                    } else {
                        return d.achievement[0].order_total
                    }
                }
            },
            {
                field: 'create_name', width: 230, title: '总金额(￥)', align: 'center', templet: function (d) {
                    if (d.achievement.length != 0) {
                        return d.achievement[0].achievement
                    } else {
                        return '-'
                    }
                },
            },
            // {
            //     field: 'create_time', width: 200, title: '创建时间', templet: function (d) {
            //         if (d.create_time) {
            //             return timeStamp(d.create_time)
            //         } else {
            //             return '-'
            //         }
            //     }
            // },
        ]],
        id: 'salesId',
        page: true,
        loading: true,
        request: {
            'pageName': 'pageNum',
            'limitName': 'pageSize'
        },
        where: {
            merchantId: Number(sessionStorage.machineID)
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

        }
    });

    // 总查询
    $('.queryBtn').click(function () {
        salesTableIn.reload({
            where: {
                start_time: startTime,
                end_time: endTime
            }
        })
    });
  // 刷新页面
  $('.refreshBtn').click(function () {
    location.reload();
});
 // 关闭弹窗
 $('.playHeader .close').click(function () {
    $(this).parent().parent().addClass('margin0')
    $(this).parents('.maskContnet').fadeOut();
});
    var managerTable = null;
    function salesFun( managerID) {
        managerTable = table.render({
            elem: '#managerIn',
            method: 'post',
            url: '/api/sales_manager/getSalesManagerOrder',
            contentType: "application/json",
            headers: {
                token: sessionStorage.token
            },
            cols: [[
                // { checkbox: true },
                { field: 'number', width: 200, title: '订单号', align: 'center' },
                { field: 'amount', width: 180, title: '订单金额(￥)', align: 'center' },
                { field: 'sm_phone', width: 130, title: '是否邮寄订单', align: 'center',templet:function(d){
                    return d.mail==1?'是':'否'
                } },
                { field: 'subject', width: 180, title: '订单商品', align: 'center' },
                { field: 'notes', width: 180, title: '出货状态', align: 'center' ,templet:function(d){
                    return d.notes?d.notes:'-'
                }},
                { field: 'payType', width: 180, title: '支付类型', align: 'center' ,templet:function(d){
                    return d.payType==1?'微信':'支付宝'
                }},
                { field: 'payType', width: 180, title: '支付状态', align: 'center' ,templet:function(d){
                    return d.payStatus==0?'未支付':d.payStatus==1?'支付中':'已支付'
                }},
                { field: 'time', width: 230, title: '购买时间', align: 'center',templet:function(d){
                    if(d.time){
                        return timeStamp(d.time)
                    }else{
                        return '-'
                    }
                } },
            ]],
            id: 'managerId',
            page: true,
            loading: true,
            request: {
                'pageName': 'pageNum',
                'limitName': 'pageSize'
            },
            where: {
                sm_no: managerID,
                start_time: startTime,
                end_time: endTime,
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

            }
        });
    };

    var salesData=null;
    table.on('row(salesTable)', function(obj){
         salesData = obj.data;
         console.log(obj)
         $('.salesCont .playHeader span').html(`${salesData.sm_name}(${startTime}-${endTime})销售业绩`)
        popupShow('salesCont','salesBox');
        if(!managerTable){
            salesFun(salesData.sm_no)
        }else{
            managerTable.reload({
                where:{
                    sm_no: salesData.sm_no,
                    start_time: startTime,
                    end_time: endTime,
                }
            })
        }
        
      });
})