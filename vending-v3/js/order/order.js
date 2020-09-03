import '../../MyCss/order/userOrder.css'
import '../../MyCss/order/order.css'
layui.use(['laydate', 'table', 'tree', 'flow', 'layer', 'form'], function () {
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
      url: `/api/order/getOrderList`,
      method: 'post',
      contentType: "application/json",
      headers: {
        token,
      },
      cols: [[
        { field: 'info', width: 210, title: '终端名', align: 'center' },
        // { field: 'machineId', width: 220, title: '设备编号', },
        // { field: 'CreationTime', width: 100, title: '下单时间', },

        { field: 'number', width: 180, title: '订单编号' },
        // { field: 'bili', width: 100, title: '购买数量' },
        // { field: 'bili', width: 120, title: '订单金额', },
        // { field: 'bili', width: 120, title: '支付金额', },
        // { field: 'hah', width: 160, title: '成本', },
        // { field: '2', width: 160, title: '利润', },
        // { field: 'bili', width: 160, title: '退款金额', },
        {
          field: 'payStatus', width: 130, title: '支付状态', templet: function (d) {
            return d.payStatus == 1 ? '等待支付' : d.payStatus == 2?'已支付':'未支付'
          }
        },
        { field: 'time', width: 180, title: '支付时间', },
        // { field: 'bili', width: 160, title: '支付类型', },
        { field: 'bili', width: 160, title: '出货状态', templet:function(d){
          
        }},
        { field: 'payee', width: 160, title: '收款方', },
        { field: 'operation', width: 110, title: '详情 ', toolbar: '#barDemo' },
      ]],
      page: true,
      loading: true,
      // limits: [10, 20, 50],
      request: {
        'pageName': 'pageNum',
        'limitName': 'pageSize'
      },
      where: {
        conditionFive: sessionStorage.machineID
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
        if (res.code == 200) {
          console.log(res)
          var orderAllSumVal = 0,
            profitsSum = 0,
            PaidInSum = 0,
            refundSum = 0,
            orderNUm = 0;
          $('.ban-input input[name="orderNumVal"]').val(res.data.length);
          res.data.forEach((item, index) => {
            if (item.payStatus == 1) {
              orderAllSumVal += item.amount;
              item.goodsList.forEach((v, i) => {
                profitsSum += (v.goods_Price - v.goods_Cost) * (v.count - v.refund_count);
                PaidInSum += v.goods_Price * (v.count - v.refund_count);
                refundSum += (v.goods_Price * v.refund_count)
              })
            }
          });
          // $('.ban-input input[name="orderAllSumVal"]').val(Number(orderAllSumVal.toFixed(2)).toLocaleString());
          $('.ban-input input[name="orderAllSumVal"]').val(numFormat1(orderAllSumVal));
          $('.ban-input input[name="profitsSum"]').val(numFormat1(profitsSum));
          $('.ban-input input[name="orderPaidInSum"]').val(numFormat1(PaidInSum));
          $('.ban-input input[name="orderRefundSum"]').val(numFormat1(refundSum));
        } else if (res.code == 405) {
          $('.hangContent').show();
        }
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
          next(lis.join(''), page < 3); //假设总页数为 10
          var machineData = JSON.stringify({
            pageNum: page,
            pageSize: 10,
            merchantId,
          })
          loadingAjax('/api/machine/getMachineList', 'post', machineData, sessionStorage.token).then(res => {
            res.data.list.forEach((item, index) => {
              lis.push(`<span machineID="${item.machineId}">${item.info ? item.info : '未命名售货机'}</span>`)
            })
            next(lis.join(''), res.data.list >= 10);
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
  $('.pushBtn').click(function () {
    var myDate = new Date(),
      dataOf = myDate.getFullYear() + '' + (myDate.getMonth()+1>=10?myDate.getMonth()+1:'0'+(myDate.getMonth()+1) )+ '' +( myDate.getDate()>=10?myDate.getDate():'0'+myDate.getDate()),
      xhr = new XMLHttpRequest();//定义一个XMLHttpRequest对象
    xhr.open("POST", '/api/order/exportExcel', true);
    xhr.setRequestHeader("token", sessionStorage.token);
    xhr.setRequestHeader('Content-Type', 'application/json;charset=utf-8');
    xhr.responseType = 'blob';//设置ajax的响应类型为blob;
    xhr.onload = function (res) {
      console.log(xhr)
      if (xhr.status == 200) {
        if (xhr.response.size < 100) {
          layer.msg('您没有导出订单的权限！', { icon: 7 })
          return
        } else {
          var content = xhr.response;
          // var fileName = `${marchantName}(${dataOf}).xls`; // 保存的文件名
          var fileName=`${marchantName}订单${dataOf}`
          var elink = document.createElement('a');
          elink.download = fileName;
          elink.style.display = 'none';
          var blob = new Blob([content]);
          elink.href = URL.createObjectURL(blob);
          document.body.appendChild(elink);
          elink.click();
          document.body.removeChild(elink);
        }
      } else {
        layer.msg('服务器请求超时', { icon: 2 });
        return;
      }
    }
    xhr.send(JSON.stringify({
      condition: startTime,
      conditionTwo: endTime,
      conditionFour: machineCode,
      conditionFive: merchantId
    }));
  });
  // 关闭弹窗
  $('.playHeader .close').click(function () {
    $(this).parent().parent().addClass('margin0')
    $(this).parents('.maskContnet').fadeOut();
  });

  // 订单商品列表
  var orderGoods = null;
  function goodsDetails() {
    orderGoods = table.render({
      elem: '#GooodsData',
      cols: [[
        // { checkbox: true },
        { field: 'goods_images', width: 120, title: '图片', templet: "#imgtmp" },
        { field: 'goods_Name', width: 140, title: '商品名', },
        { field: 'goods_Core', width: 140, title: '商品编号', },
        { field: 'count', width: 120, title: '购买数量', align: 'center' },
        { field: 'refund_count', width: 120, title: '已退款数量', align: 'center' },
        // {
        //   field: 'goods_Cost', align: 'center', width: 140, title: '退款状态 ', templet: function (d) {
        //     return d.refund == 0 ? '-' : '已退款'
        //   }
        // },


        { field: 'goods_Price', width: 140, title: '销售价 ', },
        { field: 'goods_Cost', width: 140, title: '成本价 ', },
        { field: 'operation', right: 0, width: 80, title: '操作', toolbar: '#refundDemo', fixed: 'right' },
      ]],
      data: [

      ],
      id: 'goodsLIstTable',
      loading: true,
      done: function (res) {
        console.log(res)
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
  table.on('tool(moneyData)', function (obj) {
    console.log(obj)
    orderData = obj.data;
    if (!orderGoods) {
      goodsDetails();
    }
    $('.detailsOrderCode').html(obj.data.number);//订单编号
    $('.payTime').html(obj.data.time);//支付时间
    $('.orderInformation button span').html((obj.data.shipStatus == 0 ? '出货失败' : '出货成功'))
    var payNum = 0,
      paindSum = 0,
      childProfits = 0,
      refundNumSum = 0;
    obj.data.goodsList.forEach((item, index) => {
      payNum += item.count;
      paindSum += item.goods_Price * (item.count - item.refund_count);

      childProfits += (item.goods_Price - item.goods_Cost) * (item.count - item.refund_count)
      refundNumSum += item.goods_Price * item.refund_count

    })
    $('.payType').html((obj.data.payType == 0 ? '支付宝' : '微信'))
    $('.payNUmber').html(payNum);
    $('.paidInSum').html(paindSum)
    $('.orderSum').html('￥' + obj.data.amount);
    $('.profitsSum').html('￥' + childProfits)
    $('.collection button span').html((obj.data.payStatus == 1 ? '等待支付' : obj.data.payStatus == 2?'支付成功':'未支付'));
    $('.machineCode').html(obj.data.machineId);
    $('.merchantName').html(obj.data.merchantName);
    $('.merchantCode ').html(obj.data.alias);
    $('.refundSum').html('￥' + refundNumSum)
    popupShow('orderDetails', 'orderDetailsBox')
    orderGoods.reload({
      data: obj.data.goodsList
    })
  });
  //查询
  $('.queryBtn').click(function () {
    orderTable.reload({
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
    if (obj.data.count != obj.data.refund_count) {
      $('.twoPoles span').html(obj.data.count - obj.data.refund_count);
      $('.refundNumber input').val(1)
      $('.refundNumber input').prop('max', obj.data.count - obj.data.refund_count)
      popupShow('refundNUmCont', 'refundBox')
    } else {
      layer.msg('该商品已全部退款', { icon: 7 })
    }
  });
  // 取消退款
  $('.refundNUmCont .chooseCan').click(function () {
    popupHide('refundNUmCont', 'refundBox')
  });
  $('.refundNUmCont .determineBtn').click(function () {
    console.log($('.refundNumber input').val())
    if ($('.refundNumber input').val() > 0 && $('.refundNumber input').val() <= goodsData.count - goodsData.refund_count) {
      layer.confirm('确定退款？', function (index) {
        layer.close(index);
        $('.mask').fadeIn();
        $('.maskSpan').addClass('maskIcon');
        var refundData = JSON.stringify({
          number: orderData.number,
          goods: goodsData.goods_Id,
          count: Number($('.refundNumber input').val())
        });
        loadingAjax('/api/order/refund', 'post', refundData, sessionStorage.token, 'mask', 'refundNUmCont', 'refundBox').then(res => {
          layer.msg(res.message, { icon: 1 });
          popupHide('orderDetails', 'orderDetailsBox');
          orderTable.reload({
            where: {}
          })
        }).catch(err => {
          layer.msg(err.message, { icon: 2 });
        })
      })
    } else {
      layer.msg('请按照提示填写数量', { icon: 7 })
    }
  });
  // 正则检验只能输入正整数
  var reduction = 1;
  $('.refundNumber input').keyup(function () {
    var num = $(this).val(),
      re = /^\d*$/;
    if (!re.test(num)) {
      layer.msg('只能输入正整数', { icon: 7 });
      $(this).val(reduction)
    } else {
      reduction = $(this).val();
      console.log(reduction)
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