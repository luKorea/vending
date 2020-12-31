import '../../MyCss/order/mailOrder.scss'
layui.use(['table', 'layer', 'form', 'laydate'], function () {
  var table = layui.table,
    layer = layui.layer,
    form = layui.form,
    laydate = layui.laydate,
     startTime = getKeyTime().startTime,
    //结束时间
     endTime = getKeyTime().endTime,
    mailTable = table.render({
      elem: '#mailTableOn',
      url: `${vApi}/order/getOrderList`,
      method: 'post',
      contentType: "application/json",
      headers: {
        token,
      },
      cols: [[
        { field: 'number', width: 210, title: '订单编号', align: 'center' },
        {
          field: 'notes', width: 210, title: '下单时间', align: 'center', templet: function (d) {
            return timeStamp(d.time)
          }
        },
        { field: 'sign_name', width: 180, title: '收货人', align: 'center' },
        { field: 'sign_phone', width: 180, title: '收货人电话', align: 'center' },
        { field: 'sign_address', width: 300, title: '收货地址', align: 'center' },
        {
          field: 'notes', width: 230, title: '备注', align: 'center', templet: function (d) {
            return d.notes ? d.notes : '-'
          }
        },
        {
          field: 'payType', width: 150, title: '付款类型', align: 'center', templet: function (d) {
            return d.payType == 0 ? '支付宝' : '微信'
          }
        },
        { field: 'payee', width: 210, title: '收款账号', align: 'center' },
        {
          field: 'amount', width: 150, title: '订单金额', align: 'center'
        },
        {
          field: 'sign_name', width: 180, title: '退款状态', align: 'center', templet: function (d) {
            var total = 0;
            var result = 0;
            d.goodsList.forEach(item => {
              total += item.count;
              result += item.refund_count
            })
            return result == 0 ? '未退款' : total - result == 0 ? '全部退款' : '部分退款'
          }
        },
        {
          field: 'sales_no', width: 210, title: '销售经理', align: 'center', templet: function (d) {
            return d.sales_no ? d.sales_no : '-'
          }
        },
        {
          field: 'dispatch_status', width: 210, title: '快递/物流状态', align: 'center', templet: function (d) {
            return d.dispatch_status == 0 ? '未发货' : d.dispatch_status == 1 ? '已发货' : '已收货'
          }
        },
        {
          field: 'express_type', width: 190, title: '快递/物流公司', align: 'center', templet: function (d) {
            return d.express_type ? d.express_type : '-'
          }
        },
        {
          field: 'express_number', width: 210, title: '快递/物流单号', align: 'center', templet: function (d) {
            return d.express_number ? d.express_number : '-'
          }
        },
        {
          field: 'express_number', width: 210, title: '发货时间', align: 'center', templet: function (d) {
            return d.express_time ? timeStamp(d.express_time) : '-'
          }
        },
        { field: 'operation', width: 200, title: '操作 ', fixed: 'right', right: 0, toolbar: '#barDemo', align: 'center' },
      ]],
      page: true,
      loading: true,
      request: {
        'pageName': 'pageNum',
        'limitName': 'pageSize'
      },
      where: {
        conditionFive: sessionStorage.machineID,
        conditionSeven: 1,
        condition:startTime,
        conditionTwo: endTime,
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

    // 渲染快递下拉框

    // console.log(CourierList)
    var optionList = `<option value="">全部</option>`;
    CourierList.forEach(item=>{
      optionList+=`<option value="${item}">${item}</option>`
    });
    $('#deliverySele').html(optionList);
    $('#editSele').html(optionList);
    form.render('select');
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
    } else if (obj.event == 'edit') {
      $('.editCont select[name="company"]').val(mailOrderData.express_type);
      $('.editCont input[name="logisticsNumber"]').val(mailOrderData.express_number);
      $('#test7').val(mailOrderData.express_time);
      popupShow('editCont', 'editBox')
    } else if (obj.event == 'goods') {

      goodsDetails(obj.data.goodsList);
      popupShow('goodsCont', 'goodsBox')
    }
    form.render('select');
  });
  // 取消
  $('.deliveryCont .cancelBtn').click(function () {
    popupHide('deliveryCont', 'deliveryBox')
  })
  //确定发货
  $('.deliveryCont .determinePushBtn').click(function () {
    if (!($('.deliveryBody select[name="company"]').val() && $('.deliveryBody input[name="logisticsNumber"]').val())) {
      layer.msg('带*为必填', { icon: 7 });
      return;
    };
    $('.mask').fadeIn();
    $('.maskSpan').addClass('maskIcon');
    var deliveryObj = JSON.stringify({
      number: mailOrderData.number,
      express_type: $('.deliveryBody select[name="company"]').val(),
      express_number: $('.deliveryBody input[name="logisticsNumber"]').val(),
      express_time:$('#test5').val()?$('#test5').val():timeStamp(new Date().getTime())
    });
    loadingAjax('/order/updateMailMsg', 'post', deliveryObj, sessionStorage.token, 'mask', 'deliveryCont', 'deliveryBox', layer).then(res => {
      layer.msg(res.message, { icon: 1 });
      mailTable.reload({
        where: {}
      });
      $('.deliveryBody select[name="company"]').val(''),
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
    if (!($('.editCont select[name="company"]').val() && $('.editCont input[name="logisticsNumber"]').val())) {
      layer.msg('带*为必填', { icon: 7 });
      return;
    };
    $('.mask').fadeIn();
    $('.maskSpan').addClass('maskIcon');
    var editObj = JSON.stringify({
      number: mailOrderData.number,
      express_type: $('.editCont select[name="company"]').val(),
      express_number: $('.editCont input[name="logisticsNumber"]').val(),
      express_time:$('#test7').val()?$('#test7').val():timeStamp(new Date().getTime())
    });
    loadingAjax('/order/updateOrder', 'post', editObj, sessionStorage.token, 'mask', 'editCont', 'deliveryBox', layer).then(res => {
      layer.msg(res.message, { icon: 1 });
      mailTable.reload({
        where: {}
      });
    }).catch(err => {
      layer.msg(res.message, { icon: 1 });
    })
  })

  //导出订单 
  // $('.pushBtn').click(function () {
  //   popupShow('exportCont', 'exportBox');
  // })
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
  $('.pushBtn').click(function () {
    if (!(startTime && endTime)) {
      layer.msg('请选择时间', { icon: 7 });
      return;
    }
    if (timeFlag(startTime, endTime)) {
      layer.msg('时间选择范围最多三个月', { icon: 7 });
      return;
  }
    $('.mask').fadeIn();
    $('.maskSpan').addClass('maskIcon');
    var xhr = new XMLHttpRequest();//定义一个XMLHttpRequest对象
    xhr.open("GET", `${vApi}/exportMailExcel?startDate=${startTime}&endDate=${endTime}&merchant_id=${sessionStorage.machineID}`, true);
    xhr.setRequestHeader("token", sessionStorage.token);
    // xhr.setRequestHeader('Content-Type', 'application/json;charset=utf-8');
    xhr.responseType = 'blob';//设置ajax的响应类型为blob;

    xhr.onload = function (res) {
      console.log(xhr)
      if (xhr.status == 200) {
        $('.mask').fadeOut();
        $('.maskSpan').removeClass('maskIcon');
        var content = xhr.response;
        // var fileName = `${marchantName}(${dataOf}).xlsx`; // 保存的文件名
        var fileName = `${sessionStorage.marchantName}邮寄订单(${startTime}-${endTime}).xls`
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
    // var orderObj = JSON.stringify({
    //   start_time: startTime,
    //   end_time: endTime,
    //   merchantId: Number(sessionStorage.machineID)
    // })
    xhr.send();
  });
  // 日期选择
  var laydate = layui.laydate;
  laydate.render({
    elem: '#test6',
    range: true,
    value: getKeyTime().keyTimeData,
    done: function (value) {
      var timerKey = value.split(' - ');
      startTime = timerKey[0];
      endTime = timerKey[1];
    }
  });
  // 查询
  $('.queryBtn').click(function () {
    if (timeFlag(startTime, endTime)) {
      layer.msg('时间选择范围最多三个月', { icon: 7 });
      return;
  }
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


  var orderGoods = null;
  function goodsDetails(data) {
    orderGoods = table.render({
      elem: '#GooodsData',
      cols: [[
        // { checkbox: true },
        { field: 'goods_images', width: 80, title: '图片', templet: "#imgtmp", align: 'center' },
        {
          field: 'goods_Name', width: 140, title: '商品名', align: 'center', templet: function (d) {
            return d.mail == 1 ? '(邮寄)' + d.goods_Name : d.goods_Name
          }
        },
        { field: 'goods_Core', width: 140, title: '商品编号', align: 'center', },
        { field: 'count', width: 120, title: '购买数量', align: 'center' },
        { field: 'refund_count', width: 120, title: '已退款数量', align: 'center' },
        // {
        //   field: 'goods_Cost', align: 'center', width: 140, title: '退款状态 ', templet: function (d) {
        //     return d.refund == 0 ? '-' : '已退款'
        //   }
        // },


        { field: 'price', width: 130, title: '销售价 ', align: 'center', },
        { field: 'goods_Cost', width: 130, title: '成本价 ', align: 'center', },
        { field: 'operation', right: 0, width: 80, align: 'center', title: '操作', toolbar: '#refundDemo', fixed: 'right' },
      ]],
      data,
      id: 'goodsLIstTable',
      loading: true,
      done: function (res) {
      
        permissions();
      }
    })
  }

  //   监听退款
  var goodsData = null;
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
      $('.sumInput input[name="sum"]').val(goodsData.price);
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
      $('.sumInput input[name="sum"]').val(Number($(this).val() * goodsData.price));
    } else {
      reduction = $(this).val();
      console.log(reduction);
      $('.sumInput input[name="sum"]').val(Number($(this).val() * goodsData.price));
    }
    $('.sumInput input[name="sum"]').val(Number($(this).val() * goodsData.price));
  });
  $('.refundNumber input').change(function () {
    $('.sumInput input[name="sum"]').val(Number($(this).val() * goodsData.price));
  })



  $('.refundNUmCont .determineBtn').click(function () {
    console.log($('.refundNumber input').val())
    if ($('.refundNumber input').val() > 0 && $('.refundNumber input').val() <= goodsData.count - goodsData.refund_count) {
      layer.confirm('确定退款？', function (index) {
        layer.close(index);
        $('.mask').fadeIn();
        $('.maskSpan').addClass('maskIcon');
        console.log(mailOrderData);
        // return ;
        if (mailOrderData.payType == 0) {
          var refundData = JSON.stringify({
            machineId: mailOrderData.machineId,
            orderId: mailOrderData.number,
            goodId: goodsData.goods_Id,
            count: Number($('.refundNumber input').val()),
            amount: Number($('.sumInput input[name="sum"]').val()),
            pay_id:mailOrderData.pay_id
            // amount:0.01
          });
          loadingAjax('/pay/refund_alipay', 'post', refundData, sessionStorage.token, 'mask', 'refundNUmCont', 'refundBox',layer).then(res => {
            layer.msg(res.message, { icon: 1 });
            mailTable.reload({
              where: {}
            });
            popupHide('goodsCont ', 'goodsBox ');
          }).catch(err => {
            layer.msg(err.message, { icon: 2 });
          })
        } else if (mailOrderData.payType == 1) {
          var refundData = JSON.stringify({
            machineId: mailOrderData.machineId,
            orderId: mailOrderData.number,
            goodId: goodsData.goods_Id,
            count: Number($('.refundNumber input').val()),
            amount: Number($('.sumInput input[name="sum"]').val()),
            pay_id:mailOrderData.pay_id,
            // amount:0.01,
            transaction_id: mailOrderData.transaction_id,
            total: mailOrderData.amount,
            // total:0.01
          });
          loadingAjax('/pay/refund_wxpay', 'post', refundData, sessionStorage.token, 'mask', 'refundNUmCont', 'refundBox',layer).then(res => {
            layer.msg(res.message, { icon: 1 });

            mailTable.reload({
              where: {}
            });
            popupHide('goodsCont ', 'goodsBox ');
          }).catch(err => {
            layer.msg(err.message, { icon: 2 });
          })
        }
      })
    } else {
      layer.msg('请按照提示填写数量', { icon: 7 })
    }
  });
  var addFlag = false,
    editFlag = false;

  permissionsVal(420, 421).then(res => {
    addFlag = res.addFlag;
    editFlag = res.editFlag;
    permissions();
  }).catch(err => {
    layer.msg('服务器请求超时', { icon: 7 })
  });
  function permissions() {
    addFlag ? $('.pushBtn').removeClass('hide') : $('.pushBtn').addClass('hide');
    editFlag ? $('.refundBtnTwo').removeClass('hide') : $('.refundBtnTwo').addClass('hide');
  };



  // 编辑部分下拉框
  $(".selectBox1 .fa").on("click", function (event) {
    $(this).parent().next().toggle();//ul弹窗展开
    if (event.stopPropagation) {
      // 针对 Mozilla 和 Opera   
      event.stopPropagation();
    } else if (window.event) {
      // 针对 IE   
      window.event.cancelBubble = true;
    }
  });

  //
  $(".selectUl1 li").click(function (event) {
    event = event || window.event;
    console.log($(this).html())
    $('.editCont select[name="company"]').val($(this).html())

  });

  // 发货下拉框
  $(".selectBox2 .fa").on("click", function (event) {
    $(this).parent().next().toggle();//ul弹窗展开
    if (event.stopPropagation) {
      // 针对 Mozilla 和 Opera   
      event.stopPropagation();
    } else if (window.event) {
      // 针对 IE   
      window.event.cancelBubble = true;
    }
  });

  //
  $(".selectUl2 li").click(function (event) {
    event = event || window.event;
    console.log($(this).html())
    $('.deliveryCont select[name="company"]').val($(this).html())

  });
  //点击任意地方隐藏下拉
  $(document).click(function (event) {
    event = event || window.event;
    $(".selectUl").hide();//当点击空白处，隐藏ul弹窗
  });

  // 发货时间部分
  laydate.render({
    elem: '#test5'
    ,type: 'datetime',
  });
   // 编辑发货时间部分
   laydate.render({
    elem: '#test7'
    ,type: 'datetime',
  });
})