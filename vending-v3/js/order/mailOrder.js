import '../../MyCss/order/mailOrder.scss'
layui.use(['table', 'layer', 'form', 'laydate'], function () {
    var table = layui.table,
        layer = layui.layer,
        form = layui.form,
        laydate = layui.laydate,
        mailTable = table.render({
            elem: '#mailTableOn',
            url: `/api/order/getOrderList`,
            method: 'post',
            contentType: "application/json",
            headers: {
                token,
            },
            cols: [[
                { field: 'number', width: 210, title: '订单编号', align: 'center' },
                { field: 'payType', width: 150, title: '付款类型', align: 'center',templet:function(d){
                    return d.payType==0?'支付宝':'微信'
                } },
                { field: 'payee', width: 210, title: '收款账号', align: 'center' },
                { field: 'Number', width: 150, title: '订单金额', align: 'center',templet:function(d){
                    if(d.goodsList.lebght!=0){
                        var Num=0;
                        d.goodsList.forEach(item=>{
                            Num+=item.goods_Price*item.count
                        })
                        return Num;
                    }else{
                        return 0
                    }
                } },
                { field: 'sign_name', width: 180, title: '退款状态', align: 'center' ,templet:function(d){
                    var total=0;
                    var result=0;
                     d.goodsList.forEach(item=>{
                        total+=item.count;
                        result+=item.refund_count
                     })
                     return result==0?'未退款':total-result==0?'全部退款':'部分退款'
                }},
                { field: 'sales_no', width: 210, title: '销售经理', align: 'center' ,templet:function(d){
                    return d.sales_no?d.sales_no:'-'
                }},
                { field: 'sign_name', width: 210, title: '收货人', align: 'center' },
                { field: 'sign_phone', width: 210, title: '收货人电话', align: 'center' },
                { field: 'sign_address', width: 300, title: '收货地址', align: 'center' },
                { field: 'notes', width: 210, title: '备注', align: 'center' ,templet:function(d){
                    return d.notes?d.notes:'-'
                }},
                { field: 'notes', width: 210, title: '下单时间', align: 'center' ,templet:function(d){
                    return timeStamp(d.time)
                }},
                {
                    field: 'dispatch_status', width: 210, title: '物流状态', align: 'center', templet: function (d) {
                        return d.dispatch_status == 0 ? '未发货' : d.dispatch_status == 1 ? '已发货' : '已售货'
                    }
                },
                {
                    field: 'express_type', width: 190, title: '物流公司/快递公司', align: 'center', templet: function (d) {
                        return d.express_type ? d.express_type : '-'
                    }
                },
                {
                    field: 'express_number', width: 210, title: '物流单号', align: 'center', templet: function (d) {
                        return d.express_number ? d.express_number : '-'
                    }
                },
                { field: 'operation', width: 200, title: '操作 ',fixed: 'right', right: 0, toolbar: '#barDemo', align: 'center' },
            ]],
            page: true,
            loading: true,
            request: {
                'pageName': 'pageNum',
                'limitName': 'pageSize'
            },
            where: {
                conditionFive: sessionStorage.machineID,
                conditionSeven: 1
            },
            parseData: function (res) {
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
    // 关闭弹窗
    $('.playHeader .close').click(function () {
        $(this).parent().parent().addClass('margin0')
        $(this).parents('.maskContnet').fadeOut();
    });
    var mailOrderData = null;
    // 监听
    table.on('tool(mailTableOn)', function (obj) {
        console.log(obj);
        mailOrderData = obj.data;
        if (obj.event == 'delivery') {
            popupShow('deliveryCont', 'deliveryBox');
        } else if (obj.event=='edit') {
            $('.editCont input[name="company"]').val(mailOrderData.express_type);
            $('.editCont input[name="logisticsNumber"]').val(mailOrderData.express_number)
            popupShow('editCont', 'editBox')
        }else if(obj.event=='goods'){
          
                goodsDetails(obj.data.goodsList);
              popupShow('goodsCont','goodsBox')
        }

    });
    // 取消
    $('.deliveryCont .cancelBtn').click(function () {
        popupHide('deliveryCont', 'deliveryBox')
    })
    //确定发货
    $('.deliveryCont .determinePushBtn').click(function () {
        if (!($('.deliveryBody input[name="company"]').val() && $('.deliveryBody input[name="logisticsNumber"]').val())) {
            layer.msg('带*为必填', { icon: 7 });
            return;
        };
        $('.mask').fadeIn();
        $('.maskSpan').addClass('maskIcon');
        var deliveryObj = JSON.stringify({
            number: mailOrderData.number,
            express_type: $('.deliveryBody input[name="company"]').val(),
            express_number: $('.deliveryBody input[name="logisticsNumber"]').val(),
        });
        loadingAjax('/api/order/updateMailMsg', 'post', deliveryObj, sessionStorage.token, 'mask', 'deliveryCont', 'deliveryBox', layer).then(res => {
            layer.msg(res.message, { icon: 1 });
            mailTable.reload({
                where: {}
            });
            $('.deliveryBody input[name="company"]').val(''),
                $('.deliveryBody input[name="logisticsNumber"]').val('')
        }).catch(err => {
            layer.msg(err.message, { icon: 2 });
        })
    });
    // 取消编辑
    // 取消
    $('.editCont .cancelBtn').click(function () {
        popupHide('editCont', 'editBox')
    });
    // 确定编辑
    $('.editCont .determinePushBtn').click(function () {
        if (!($('.editCont input[name="company"]').val() && $('.editCont input[name="logisticsNumber"]').val())) {
            layer.msg('带*为必填', { icon: 7 });
            return;
        };
        $('.mask').fadeIn();
        $('.maskSpan').addClass('maskIcon');
        var editObj = JSON.stringify({
            number: mailOrderData.number,
            express_type: $('.editCont input[name="company"]').val(),
            express_number: $('.editCont input[name="logisticsNumber"]').val(),
        });
        loadingAjax('/api/order/updateOrder', 'post', editObj, sessionStorage.token, 'mask', 'editCont', 'deliveryBox', layer).then(res => {
            layer.msg(res.message, { icon: 1 });
            mailTable.reload({
                where: {}
            });
        }).catch(err => {
            layer.msg(res.message, { icon: 1 });
        })
    })

    //导出订单 
    $('.pushBtn').click(function () {
        popupShow('exportCont', 'exportBox');
    })
    // 导出excel表
    // 导出时间
    var exportStareTime = null,
        exportEndTime = null;
    laydate.render({
        elem: '#test8'
        , type: 'month'
        , range: true,
        done: function (value) {
            var timerKey = value.split(' - ');
            exportStareTime = timerKey[0];
            exportEndTime = timerKey[1];
        }
    });
    // 取消导出
    $('.exportCont .cancelBtn').click(function () {
        popupHide('exportCont', 'exportBox')
    })
    // 导出
    $('.exportCont .determinePushBtn').click(function () {
        if (!(exportStareTime && exportEndTime)) {
            layer.msg('请选择时间', { icon: 7 });
            return;
        }
        $('.mask').fadeIn();
        $('.maskSpan').addClass('maskIcon');
        var xhr = new XMLHttpRequest();//定义一个XMLHttpRequest对象
        xhr.open("POST", `/api/order/exportMailExcel`, true);
        xhr.setRequestHeader("token", sessionStorage.token);

        xhr.setRequestHeader('Content-Type', 'application/json;charset=utf-8');
        xhr.responseType = 'blob';//设置ajax的响应类型为blob;

        xhr.onload = function (res) {
            console.log(xhr)
            if (xhr.status == 200) {
                $('.mask').fadeOut();
                $('.maskSpan').removeClass('maskIcon');
                var content = xhr.response;
                // var fileName = `${marchantName}(${dataOf}).xlsx`; // 保存的文件名
                var fileName = `${sessionStorage.marchantName}邮寄订单(${exportStareTime}-${exportEndTime}).xlsx`
                var elink = document.createElement('a');
                elink.download = fileName;
                elink.style.display = 'none';
                var blob = new Blob([content]);
                elink.href = URL.createObjectURL(blob);
                document.body.appendChild(elink);
                elink.click();
                document.body.removeChild(elink);
            } else {
                $('.mask').fadeOut();
                $('.maskSpan').removeClass('maskIcon');
                layer.msg('服务器请求超时', { icon: 2 });
                return;
            }
        }
        var orderObj = JSON.stringify({
            start_time: exportStareTime,
            end_time: exportEndTime,
            merchantId: Number(sessionStorage.machineID)
        })
        xhr.send(orderObj);
    });
    // 日期选择
    var startTime = '';
    //结束时间
    var endTime = '';
    var laydate = layui.laydate;
    laydate.render({
        elem: '#test6',
        range: true,
        done: function (value) {
            var timerKey = value.split(' - ');
            startTime = timerKey[0];
            endTime = timerKey[1];
        }
    });
    // 查询
    $('.queryBtn').click(function () {
        mailTable.reload({
            where: {
                condition: startTime,
                conditionTwo: endTime,
                conditionThree: $('.key-contnet input[name="orderCode"]').val(),
            }
        })
    });
    // 刷新页面
    $('.refreshBtn').click(function () {
        location.reload();
    });


    // 商品部分
    var refundTatol=0;
  var orderGoods = null;
    function goodsDetails(data) {
        orderGoods = table.render({
          elem: '#GooodsData',
          cols: [[
            // { checkbox: true },
            { field: 'goods_images', width: 80, title: '图片', templet: "#imgtmp", align: 'center' },
            { field: 'goods_Name', width: 140, title: '商品名', align: 'center', },
            { field: 'goods_Core', width: 140, title: '商品编号', align: 'center', },
            { field: 'count', width: 120, title: '购买数量', align: 'center' },
            { field: 'refund_count', width: 120, title: '已退款数量', align: 'center' },
            // {
            //   field: 'goods_Cost', align: 'center', width: 140, title: '退款状态 ', templet: function (d) {
            //     return d.refund == 0 ? '-' : '已退款'
            //   }
            // },
    
    
            { field: 'goods_Price', width: 130, title: '销售价 ', align: 'center', },
            { field: 'goods_Cost', width: 130, title: '成本价 ', align: 'center', },
            { field: 'operation', right: 0, width: 80, align: 'center', title: '操作', toolbar: '#refundDemo', fixed: 'right' },
          ]],
          data,
          id: 'goodsLIstTable',
          loading: true,
          done: function (res) {
            refundTatol=0;
            // console.log(res)
            res.data.forEach(item=>{
              refundTatol+=item.goods_Price;
            })
            permissions();
          }
        })
      }

    //   监听退款
    var goodsData=null;
    table.on('tool(GooodsData)', function (obj) {
        if (mailOrderData.payStatus != 2) {
          layer.msg('订单未支付，不能进行退款操作', { icon: 7 });
          return;
        }
        goodsData = obj.data;
        console.log(goodsData)
        if (obj.data.count != obj.data.refund_count) {
          $('.twoPoles span').html(obj.data.count - obj.data.refund_count);
          $('.refundNumber input').val(1)
          $('.refundNumber input').prop('max', obj.data.count - obj.data.refund_count);
          $('.sumInput input[name="sum"]').val(goodsData.goods_Price);
          popupShow('refundNUmCont', 'refundBox')
        } else {
          layer.msg('该商品已全部退款', { icon: 7 })
        }
      });
       // 取消退款
  $('.refundNUmCont .chooseCan').click(function () {
    popupHide('refundNUmCont', 'refundBox')
  });
 // 正则检验只能输入正整数
 var reduction = 1;
 $('.refundNumber input').keyup(function () {
   var num = $(this).val(),
     re = /^\d*$/;
   if (!re.test(num)) {
     layer.msg('只能输入正整数', { icon: 7 });
     $(this).val(reduction);
     $('.sumInput input[name="sum"]').val(Number($(this).val()*goodsData.goods_Price));
   } else {
     reduction = $(this).val();
     console.log(reduction);
     $('.sumInput input[name="sum"]').val(Number($(this).val()*goodsData.goods_Price));
   }
   $('.sumInput input[name="sum"]').val(Number($(this).val()*goodsData.goods_Price));
 });
 $('.refundNumber input').change(function(){
   $('.sumInput input[name="sum"]').val(Number($(this).val()*goodsData.goods_Price));
 })



 $('.refundNUmCont .determineBtn').click(function () {
    console.log($('.refundNumber input').val())
    if ($('.refundNumber input').val() > 0 && $('.refundNumber input').val() <= goodsData.count - goodsData.refund_count) {
      layer.confirm('确定退款？', function (index) {
        layer.close(index);
        $('.mask').fadeIn();
        $('.maskSpan').addClass('maskIcon');
       
        if(mailOrderData.payType==0){
          var refundData = JSON.stringify({
            machineId:mailOrderData.machineId,
            orderId: mailOrderData.number,
            goodId: goodsData.goods_Id,
            count: Number($('.refundNumber input').val()),
            amount:Number($('.sumInput input[name="sum"]').val())
            // amount:0.01
          });
          loadingAjax('/api/pay/refund_alipay', 'post', refundData, sessionStorage.token, 'mask', 'refundNUmCont', 'refundBox').then(res => {
            layer.msg(res.message, { icon: 1 });
            mailTable.reload({
              where: {}
            });
          }).catch(err => {
            layer.msg(err.message, { icon: 2 });
          })
        }else if(mailOrderData.payType==1){
          var refundData = JSON.stringify({
            machineId:mailOrderData.machineId,
            orderId: mailOrderData.number,
            goodId: goodsData.goods_Id,
            count: Number($('.refundNumber input').val()),
            // amount:Number($('.sumInput input[name="sum"]').val()),
            amount:0.01,
            transaction_id:mailOrderData.transaction_id,
            // total:refundTatol
            total:0.01
          });
          loadingAjax('/api/pay/refund_wxpay', 'post', refundData, sessionStorage.token, 'mask', 'refundNUmCont', 'refundBox').then(res => {
            layer.msg(res.message, { icon: 1 });
            popupHide('orderDetails', 'orderDetailsBox');
            mailTable.reload({
              where: {}
            })
          }).catch(err => {
            layer.msg(err.message, { icon: 2 });
          })
        }
       
       
      })
    } else {
      layer.msg('请按照提示填写数量', { icon: 7 })
    }
  });
      var addFlag=false,
      editFlag=false;
    
      permissionsVal(420, 421).then(res => {
        addFlag= res.addFlag;
        editFlag= res.editFlag;
        permissions();
      }).catch(err => {
        layer.msg('服务器请求超时', { icon: 7 })
      });
      function permissions(){
        addFlag ? $('.pushBtn').removeClass('hide') : $('.pushBtn').addClass('hide');
        editFlag ? $('.refundBtnTwo').removeClass('hide') : $('.refundBtnTwo').addClass('hide');
      };
})