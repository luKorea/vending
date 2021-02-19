import '../../MyCss/order/userOrder.css'
import '../../MyCss/order/order.css'
layui.use(['laydate', 'table', 'tree', 'flow', 'layer', 'form'], function () {
  // 日期选择
  var startTime = getKeyTime().startTime;
  //结束时间
  var endTime = getKeyTime().endTime;
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

  $('.sidebar i').click(function () {
    $('.data-left').hide();
    $('.onLeft').show();
  });
  $('.onLeft').click(function () {
    $('.onLeft').hide();
    $('.data-left').show();
  })
  var token = sessionStorage.token,
    tree = layui.tree,
    flow = layui.flow,
    layer = layui.layer,
    table = layui.table,
    form = layui.form,
    orderTable = table.render({
      elem: '#moneyData',
      url: `${vApi}/order/getOrderList`,
      method: 'post',
      contentType: "application/json",
      headers: {
        token,
      },
      cols: [[
        {
          field: 'info', width: 220, title: '售货机名(编号)', align: 'center', templet: function (d) {
            return `<div>${d.info}</div>
                  <div>(${d.machineNumber})</div>`
          }
        },
        // { field: 'machineId', width: 220, title: '设备编号', },
        // { field: 'CreationTime', width: 100, title: '下单时间', },

        { field: 'number', width: 190, title: '订单编号', align: 'center' },
        // { field: 'bili', width: 100, title: '购买数量' },
        // { field: 'bili', width: 120, title: '订单金额', },
        // { field: 'bili', width: 120, title: '支付金额', },
        // { field: 'hah', width: 160, title: '成本', },
        // { field: '2', width: 160, title: '利润', },
        // { field: 'bili', width: 160, title: '退款金额', },
        {
          field: 'amount', width: 130, title: '订单金额', align: 'center'
          // ,templet:function(d){
          //   var amount=0;
          //   if(d.goodsList.length!=0){
          //       d.goodsList.forEach(item=>{
          //         amount+=item.price*item.count
          //       });
          //       return amount  
          //   }else{
          //     return 0
          //   }
          // }
        },
        {
          field: 'payStatus', width: 130, align: 'center', title: '支付状态', templet: function (d) {
            return d.payStatus == 1 ? '等待支付' : d.payStatus == 2 ? '已支付' : '未支付'
          }
        },
        {
          field: 'time', width: 180, title: '下单时间', align: 'center', templet: function (d) {
            if (d.time) {
              return timeStamp(d.time)
            } else {
              return '-'
            }
          }
        },
        {
          field: 'bili', width: 160, align: 'center', title: '支付类型', templet: function (d) {
            return d.payType == 1 ? '微信' : d.payType == 0 ? '支付宝' : '工行支付'
          }
        },
        {
          field: 'sign_name', width: 210, title: '退款状态', align: 'center', templet: function (d) {
            return d.refund == 1 ? '未退款' : d.refund == 2 ? '部分退款' : d.refund == 3?'全部退款':'-'
          }
        },
        // { field: 'shipStatus', align: 'center', width: 160, title: '出货状态', templet:function(d){
        //   return d.shipStatus==0?'未出货':d.shipStatus==1?'出货失败':'出货成功'
        // }},
        {
          field: 'shipStatus', width: 210, title: '出货状态', align: 'center', templet: function (d) {
            return d.shipStatus == 0 ? '未出货' : d.shipStatus == 1 ? '部分出货失败' : d.shipStatus == 2? '全部出货成功':'出货中'
          }
        },
        {
          field: 'ship_info', width: 200, title: '出货详情', align: 'center', templet: function (d) {
            if (d.ship_info.length == 0) {
              return '-'
            } else {
              var str = '';
              d.ship_info.forEach((item, index) => {
                str += `<div>${item.goods_Name}(${item.way}货道${item.ship_status == 0 ? '出货失败' : item.ship_status == 1 ? '出货成功' : '货道故障'})</div>`
              });
              return str
            }
          }
        },
        {
          field: 'sales_no', width: 160, title: '销售经理', align: 'center', templet: function (d) {
            return d.sales_no ? d.sales_no : '-'
          }
        },

        { field: 'payee', width: 160, title: '收款方', align: 'center', },
        { field: 'operation', width: 110, title: '详情 ', toolbar: '#barDemo', align: 'center' },
      ]],
      page: true,
      loading: true,
      // limits: [10, 20, 50],
      request: {
        'pageName': 'pageNum',
        'limitName': 'pageSize'
      },
      where: {
        conditionFive: sessionStorage.machineID,
        conditionSeven: 0,
        condition: startTime,
        conditionTwo: endTime,
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
        // console.log(res);
        // if (res.code == 200) {
        //   console.log(res)
        //   var orderAllSumVal = 0,
        //     profitsSum = 0,
        //     PaidInSum = 0,
        //     refundSum = 0;
        //   $('.ban-input input[name="orderNumVal"]').val(res.data.length);
        //   res.data.forEach((item, index) => {
        //     if (item.payStatus == 2) {
        //       orderAllSumVal += item.amount;
        //       item.goodsList.forEach((v, i) => {
        //         profitsSum += (v.price - v.goods_Cost) * (v.count - v.refund_count);
        //         PaidInSum += v.price * (v.count - v.refund_count);
        //         refundSum += (v.price * v.refund_count)
        //       })
        //     }
        //   });
        //   // $('.ban-input input[name="orderAllSumVal"]').val(Number(orderAllSumVal.toFixed(2)).toLocaleString());
        //   $('.ban-input input[name="orderAllSumVal"]').val(numFormat1(orderAllSumVal));

        //   $('.ban-input input[name="profitsSum"]').val(numFormat1(profitsSum));
        //   $('.ban-input input[name="orderPaidInSum"]').val(numFormat1(PaidInSum));
        //   $('.ban-input input[name="orderRefundSum"]').val(numFormat1(refundSum));
        // } else if (res.code == 405) {
        //   $('.hangContent').show();
        // }
      }
    });

  var marchantName = ' ';//文件名
  //树状图
  var merchantId = sessionStorage.machineID,
    dataList = treeList(marchantName);
  marchantName = sessionStorage.marchantName;
  orderTreeFun(tree, 'test1', dataList);
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
          // for (var i = 0; i < 3; i++) {
          //   lis.push('<span>荔湾西堤邮政支局' + page + '</span>')
          // }
          next(lis.join(''), page < 10000); //假设总页数为 10
          var machineData = JSON.stringify({
            pageNum: page,
            pageSize: 100,
            merchantId,
          })
          loadingAjax('/machine/getMachineList', 'post', machineData, sessionStorage.token).then(res => {
            res.data.list.forEach((item, index) => {
              lis.push(`<span machineID="${item.machineId}">${item.info ? item.info : '未命名售货机'}</span>`)
            })
            next(lis.join(''), res.data.list.length >= 100);
          }).catch(err => {
            console.log(err)
            layer.msg(err.message, { icon: 7 })
            next(lis.join(''), err.code == 200); //假设总页数为 10
          })
          //执行下一页渲染，第二参数为：满足“加载更多”的条件，即后面仍有分页
          //pages为Ajax返回的总页数，只有当前页小于总页数的情况下，才会继续出现加载更多

        }, 200);
      }
    });
  }
  getFlow();

  //售货机编号
  var machineCode = '';
  $('body').on('click', '.machineList span', function () {
    $('.allmachine').removeClass('active')
    $(this).addClass('active').siblings().removeClass('active');
    machineCode = $(this).attr('machineID');
    orderTable.reload({
      where: {
        conditionFour: machineCode
      }
    })
  })
  $('.allmachine').click(function () {
    $(this).addClass('active');
    $('.machineList span').removeClass('active');
    machineCode = '';
    orderTable.reload({
      where: {
        conditionFour: machineCode
      }
    })
  })
  // 树方法
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
        console.log(obj);
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
        $('.equipment').append(`<div class="machineList" id="demo"></div>`);
        getFlow();
        $('.allmachine').addClass('active');
        $('.machineList span').removeClass('active');
        machineCode = '';
        orderTable.reload({
          where: {
            conditionFour: machineCode,
            conditionFive: merchantId
          }
        })
      },
    });
  };

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
  // $('.pushBtn').click(function () {
  //   $('.exportBody p').html(marchantName + '订单表格')
  //   popupShow('exportCont', 'exportBox');

  // });
  // 关闭弹窗
  $('.playHeader .close').click(function () {
    $(this).parent().parent().addClass('margin0')
    $(this).parents('.maskContnet').fadeOut();
  });
  // 取消导出
  $('.exportCont .cancelBtn').click(function () {
    popupHide('exportCont', 'exportBox');
  })
  // 确认导出
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
    var  xhr = new XMLHttpRequest();//定义一个XMLHttpRequest对象
    xhr.open("GET", `${vApi}/exportExcel?startDate=${startTime}&endDate=${endTime}&merchant_id=${merchantId}&conditionSix=${$('.newKeyContent select[name="keyPayStatus"]').val()}&shipStatus=${$('.newKeyContent select[name="keyShipStatus"]').val()}&refund=${$('.newKeyContent select[name="keyrefundStatus"]').val()}&conditionThree=${$('.key-contnet input[name="orderCode"]').val()}`, true);
    xhr.setRequestHeader("token", sessionStorage.token);

    // xhr.setRequestHeader('Content-Type', 'application/json;charset=utf-8');
    xhr.responseType = 'blob';//设置ajax的响应类型为blob;

    xhr.onload = function (res) {
      if (xhr.status == 200) {
        $('.mask').fadeOut();
        $('.maskSpan').removeClass('maskIcon');
        if (xhr.response.size < 50) {
          layer.msg('导出失败', { icon: 7 })
          return
        } 
        var content = xhr.response;
        // var fileName = `${marchantName}(${dataOf}).xlsx`; // 保存的文件名
        var fileName = `${marchantName}订单(${startTime}-${endTime}).xls`
        var elink = document.createElement('a');
        elink.download = fileName;
        elink.style.display = 'none';
        var blob = new Blob([content]);
        elink.href = URL.createObjectURL(blob);
        document.body.appendChild(elink);
        elink.click();
        document.body.removeChild(elink);
        // }
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
    //   merchantId: merchantId
    // })
    xhr.send();
  })

  // 订单商品列表
  var refundTatol = 0;
  var orderGoods = null;
  function goodsDetails() {
    orderGoods = table.render({
      elem: '#GooodsData',
      cols: [[
        // { checkbox: true },
        { field: 'goods_images', width: 120, title: '图片', templet: "#imgtmp", align: 'center' },
        { field: 'good_name_core', width: 250, title: '商品名(编号)', align: 'center', },
        // { field: 'goods_Core', width: 140, title: '商品编号', align: 'center', },
        { field: 'count', width: 120, title: '购买数量', align: 'center' },
        // {
        //   field: 'ship_info', width: 300, title: '出货情况', align: 'center', templet: function (d) {
        //     var str = '';
        //     d.ship_info.forEach(item => {
        //       str += `<div>${item.goods_Name + (item.ship_error == 0 ? '全部出货成功' : '出货（' + ((item.ship_total - item.ship_error) + '/' + item.ship_total) + ')')}</div>`
        //     });
        //     return str
        //   }
        // },
        { field: 'refund_count', width: 120, title: '已退款数量', align: 'center' },
        // {
        //   field: 'goods_Cost', align: 'center', width: 140, title: '退款状态 ', templet: function (d) {
        //     return d.refund == 0 ? '-' : '已退款'
        //   }
        // },


        { field: 'price', width: 140, title: '销售价 ', align: 'center', },
        // { field: 'goods_Cost', width: 140, title: '成本价 ', align: 'center', },
        { field: 'operation', right: 0, width: 80, align: 'center', title: '操作', toolbar: '#refundDemo', fixed: 'right' },
      ]],
      data: [

      ],
      id: 'goodsLIstTable',
      loading: true,
      done: function (res) {
        // console.log(res)
        refundTatol = 0;
        res.data.forEach(item => {
          refundTatol += item.goods_Price;
        })
        // console.log(refundTatol)
        permissions();
        for (var i in res.data) {
          var item = res.data[i];
          if (item.refund == 1) {
            $('.goodsListBody tr[data-index=' + i + '] input[type="checkbox"]').prop('disabled', true);
            form.render();// 重新渲染一下
          }
        }
      }
    })
  }
  // 监听操作
  var orderData = null;
  // table.on('tool(moneyData)', function (obj) {

  // });
  table.on('row(moneyData)', function (obj) {
    console.log(obj)
    orderData = obj.data;
    if (!orderGoods) {
      goodsDetails();
    }
    if (orderData.payStatus == 2) {
      loadingAjax('/order/getOrderStatistics', 'post', JSON.stringify({ number: orderData.number }), '', '', '', layer).then(res => {
        $('.paidInSum').html(res.data.real);
        $('.profitsSum').html(res.data.cost);
        $('.refundSum').html(res.data.refund);
        $('.collectionBody').show();

      }).catch(err => {
        $('.collectionBody').hide();
      });
    } else {
      $('.collectionBody').hide();
    }

    $('.detailsOrderCode').html(obj.data.number);//订单编号
    $('.payTime').html(timeStamp(obj.data.time));//支付时间
    $('.orderInformation button span').html((obj.data.shipStatus == 0 ? '未出货' : obj.data.shipStatus == 1 ? '部分出货失败' : obj.data.shipStatus == 2?'全部出货成功':'出货中'));
    // $('.orderInformation button span').html(obj.data.notes)
    var payNum = 0;
    obj.data.goodsList.forEach((item, index) => {
      payNum += item.count;
    })
    $('.payType').html((obj.data.payType == 0 ? '支付宝' : obj.data.payType == 1 ? '微信' : '工行支付'));
    $('.payNUmber').html(payNum);
    // $('.paidInSum').html(orderData.amount);
    $('.orderSum').html('￥' + orderData.amount);
    $('.collection button span').html((obj.data.payStatus == 1 ? '等待支付' : obj.data.payStatus == 2 ? '已支付' : '未支付'));
    $('.machineCode').html(obj.data.machineId);
    $('.merchantName').html(obj.data.merchantName);
    $('.merchantCode ').html(obj.data.alias);
    popupShow('orderDetails', 'orderDetailsBox');
    orderGoods.reload({
      data: obj.data.goodsList
    })
  });
  //查询
  $('.queryBtn').click(function () {
    if (timeFlag(startTime, endTime)) {
      layer.msg('时间选择范围最多三个月', { icon: 7 });
      return;
    }
    orderTable.reload({
      where: {
        condition: startTime,
        conditionTwo: endTime,
        conditionThree: $('.key-contnet input[name="orderCode"]').val(),
        conditionSix:$('.newKeyContent select[name="keyPayStatus"]').val(),
        shipStatus:$('.newKeyContent select[name="keyShipStatus"]').val(),
        refund:$('.newKeyContent select[name="keyrefundStatus"]').val(),
      }
    })
  });
  // 刷新页面
  $('.refreshBtn').click(function () {
    location.reload();
  });
  // 监听f5刷新
  $("body").bind("keydown", function (event) {
    if (event.keyCode == 116) {
      f5Fun()
    }
  })

  // 监听退款
  var goodsData = null;
  table.on('tool(GooodsData)', function (obj) {
    if (orderData.payStatus != 2) {
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
  // 确定退款
  $('.refundNUmCont .determineBtn').click(function () {
    // console.log($('.refundNumber input').val())
    if ($('.refundNumber input').val() > 0 && $('.refundNumber input').val() <= goodsData.count - goodsData.refund_count) {
      layer.confirm('确定退款？', function (index) {
        layer.close(index);
        popupShow('iPasswprd', 'passwordCont')
      })
    } else {
      layer.msg('请按照提示填写数量', { icon: 7 })
    }
  });
  // 退款输入独立密码
  $('.iPasswprd .passBtn').click(function () {
    if (!$('.passBody input[name="iPassword"]').val()) {
      layer.msg('请输入独立密码', { icon: 7 });
      return;
    }
    var IPassWord = JSON.stringify({
      alonePwd: hex_md5($('.iPasswprd input[name="iPassword"]').val())
    })
    loadingAjax('/user/verifyAlonePwd', 'post', IPassWord, sessionStorage.token, 'mask', 'iPasswprd', 'passwordCont', layer).then(res => {
      $('.mask').fadeIn();
      $('.maskSpan').addClass('maskIcon');
      $('.iPasswprd input[name="iPassword"]').val('')
      if (orderData.payType == 0) {
        var refundData = JSON.stringify({
          machineId: orderData.machineId,
          orderId: orderData.number,
          goodId: goodsData.goods_Id,
          count: Number($('.refundNumber input').val()),
          amount: Number($('.sumInput input[name="sum"]').val()),
          pay_id: orderData.pay_id
          // amount:0.01
        });
        loadingAjax('/pay/refund_alipay', 'post', refundData, sessionStorage.token, 'mask', 'refundNUmCont', 'refundBox', layer).then(res => {
          layer.msg(res.message, { icon: 1 });
          popupHide('orderDetails', 'orderDetailsBox');
          orderTable.reload({
            where: {}
          })
        }).catch(err => {
          layer.msg(err.message, { icon: 2 });
        })
      } else if (orderData.payType == 1) {
        var refundData = JSON.stringify({
          machineId: orderData.machineId,
          orderId: orderData.number,
          goodId: goodsData.goods_Id,
          count: Number($('.refundNumber input').val()),
          amount: Number($('.sumInput input[name="sum"]').val()),
          // amount: 0.01,
          transaction_id: orderData.transaction_id,
          total: orderData.amount,
          pay_id: orderData.pay_id
          // total: 0.01
        });
        loadingAjax('/pay/refund_wxpay', 'post', refundData, sessionStorage.token, 'mask', 'refundNUmCont', 'refundBox').then(res => {
          layer.msg(res.message, { icon: 1 });
          popupHide('orderDetails', 'orderDetailsBox');
          orderTable.reload({
            where: {}
          })
        }).catch(err => {
          layer.msg(err.message, { icon: 2 });
        })
      } else if (orderData.payType == 3) {
        var refundData = JSON.stringify({
          machineId: orderData.machineId,
          orderId: orderData.number,
          goodId: goodsData.goods_Id,
          count: Number($('.refundNumber input').val()),
          transaction_id: orderData.transaction_id,
          amount: Number($('.sumInput input[name="sum"]').val()),
          pay_id: orderData.pay_id
        });
        loadingAjax('/pay/refund_icbc', 'post', refundData, sessionStorage.token, 'mask', 'refundNUmCont', 'refundBox').then(res => {
          layer.msg(res.message, { icon: 1 });
          popupHide('orderDetails', 'orderDetailsBox');
          orderTable.reload({
            where: {}
          })
        }).catch(err => {
          layer.msg(err.message, { icon: 2 });
        })
      }
    }).catch(err => {
      console.log(err)
      layer.msg(err.message, { icon: 2 });

    })
  })
  $('.iPasswprd .passCancelBtn').click(function () {
    popupHide('iPasswprd', 'passwordCont')
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
  });

  // 退款
  $('.orderDetails .refundBtn').click(function () {
    // if (orderData.payStatus != 2) {
    //   layer.msg('订单未支付，不能进行退款操作', { icon: 7 });
    //   return;
    // };
    // if(orderData.goodsList[0].refund_count!=0){
    //   layer.msg('订单已退款', { icon: 7 });
    //   return;
    // }
    layer.confirm('确定退款？(请检查订单出货情况！)', function (index) {
      layer.close(index);
      $('.mask').fadeIn();
      $('.maskSpan').addClass('maskIcon');
      var goodsArray = [];
      orderData.goodsList.forEach(item => {
        goodsArray.push(item.goods_Id)
      })
      var refundData = JSON.stringify({
        machineId: orderData.machineId,
        orderId: orderData.number,
        // amount:Number(orderData.amount),
        amount: 0.01,
        goodId: goodsArray,
        transaction_id: orderData.payType == 1 ? orderData.transaction_id : '',
        total: orderData.payType == 1 ? Number(orderData.amount) : ''

      });
      var url = '';
      if (orderData.payType == 0) {
        url = `${vApi}/pay/refund_alipay`
      } else if (orderData.payType == 1) {
        url = `${vApi}/pay/refund_wxpay`
      }
      loadingAjax(url, 'post', refundData, sessionStorage.token, 'mask', 'orderDetails ', 'orderDetailsBox', layer).then(res => {
        layer.msg(res.message, { icon: 1 });
        // popupHide('orderDetails', 'orderDetailsBox');
        orderTable.reload({
          where: {}
        })
      }).catch(err => {
        layer.msg(err.message, { icon: 2 });
      })
    })

  });

  var permissionsData0=window.parent.permissionsData1(),
   permissionsObj={
    420:false,
    421:false,
  },
  permissionsObjFlag= permissionsVal1(permissionsObj,permissionsData0);
  function permissions() {
    permissionsObjFlag[420] ? $('.pushBtn').removeClass('hide') : $('.pushBtn').addClass('hide');
    permissionsObjFlag[421] ? $('.refundBtnTwo').removeClass('hide') : $('.refundBtnTwo').addClass('hide');
  };
  permissions();

  // var addFlag = false,
  //   editFlag = false;
  // permissionsVal(420, 421).then(res => {
  //   addFlag = res.addFlag;
  //   editFlag = res.editFlag;
  //   permissions();
  // }).catch(err => {
  //   layer.msg('服务器请求超时', { icon: 7 })
  // });
  // function permissions() {
  //   addFlag ? $('.pushBtn').removeClass('hide') : $('.pushBtn').addClass('hide');
  //   editFlag ? $('.refundBtnTwo').removeClass('hide') : $('.refundBtnTwo').addClass('hide');
  // };

  // 图片放大事件
  var PImgSHow = true;
  $('.goodsListBody').on('mouseenter', '.pic102', function (e) {
    var that = this;
    $('#pic101').attr('src', $(that).attr('src'));
    var img = new Image();
    img.onload = function () {
      $("#pic101").css({
        "width": this.width >= this.height ? 350 + 'px' : 'auto',
        "height": this.height > this.width ? 450 + 'px' : 'auto'
      }).fadeIn("fast");
      this.onload = null;

    };
    img.src = $(that).attr('src');
  });
  $('.goodsListBody').on('click', '.pic102', function () {
    event.stopPropagation();
    PImgSHow = false;
  });
  $('.goodsListBody').on('mouseleave', '.pic102', function () {
    if (PImgSHow) {
      $('#pic101').hide();
    }
  });
  $('#pic101').click(function () {
    event.stopPropagation();
  });
  $('body').click(function () {
    PImgSHow = true;
    $('#pic101').hide();
  });
  $('#pic101').mouseenter(function(){
    $('#pic101').show();
  })
  $('#pic101').mouseleave(function(){
    if (PImgSHow) {
      $('#pic101').hide();
    }
  })
})