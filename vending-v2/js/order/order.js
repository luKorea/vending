layui.use(['laydate', 'table', 'tree', 'flow', 'layer'], function () {
  // 日期选择
  var startTime = '';
  //结束时间
  var endTime = '';
  var laydate = layui.laydate;
  laydate.render({
    elem: '#test6',
     range: true,
     done:function(value){
      timerKey = value.split(' - ');
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
    orderTable = table.render({
      elem: '#moneyData',
      url: `/api/order/getOrderList`,
      method: 'post',
      contentType: "application/json",
      headers: {
        token,
      },
      cols: [[
        { field: 'username', width: 150, title: '终端名称' },
        { field: 'machineId', width: 220, title: '设备编号', },
        // { field: 'CreationTime', width: 100, title: '下单时间', },
        { field: 'time', width: 180, title: '支付时间', },
        { field: 'bili', width: 180, title: '订单编号', sort: true },
        { field: 'bili', width: 100, title: '购买数量', sort: true },
        { field: 'bili', width: 120, title: '订单金额', },
        { field: 'bili', width: 120, title: '支付金额', },
        { field: 'hah', width: 160, title: '成本', },
        { field: '2', width: 160, title: '利润', },
        // { field: '3', width: 160, title: '手续费', },
        { field: 'bili', width: 160, title: '退款金额', },
        // { field: 'bili', width: 160, title: '优惠金额', },
        // { field: 'bili', width: 160, title: '优惠券金额', },
        // { field: 'bili', width: 160, title: '活动类型', },
        // { field: 'bili', width: 160, title: '结算状态', },
        { field: 'bili', width: 160, title: '交易编号', },
        { field: 'bili', width: 160, title: '交易状态', },
        { field: 'bili', width: 160, title: '支付类型', },
        { field: 'bili', width: 160, title: '出货状态', },
        // { field: 'bili', width: 160, title: '第三方订单号', },
        { field: 'bili', width: 160, title: '收款方', },
        { field: 'operation', fixed: 'right', width: 110, title: '详情 ', toolbar: '#barDemo' },
      ]],
      page: true,
      loading: true,
      limits: [10, 20, 50],
      request: {
        'pageName': 'pageNum',
        'limitName': 'pageSize'
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
          window.parent.location.href = "../login/login.html";
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
        if (res.code == 405) {
          //   $('.hangContent').show();
        }
      }
    });

    var marchantName=' ';//文件名
  //树状图
  var merchantId = sessionStorage.machineID,
    dataList = treeList(marchantName);
    marchantName=sessionStorage.marchantName;
  console.log(dataList)
  orderTreeFun(tree, 'test1', dataList);
  function getFlow() {
    flow.load({
      elem: '#demo',
      isAuto: true, //流加载容器
      scrollElem: '#demo',
      end: '已展示全部',
      done: function (page, next) { //执行下一页的回调
        console.log(page)
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
            console.log(res)
            res.data.list.forEach((item, index) => {
              lis.push(`<span machineID="${item.machineId}">${item.info}</span>`)
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
  $('body').on('click', '.machineList span', function () {
    $('.allmachine').removeClass('active')
    $(this).addClass('active').siblings().removeClass('active');
  })
  $('.allmachine').click(function () {
    $(this).addClass('active');
    $('.machineList span').removeClass('active')
  })
  // 树方法
  function orderTreeFun(tree, element,  data, ) {
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
        marchantName=obj.data.title
        var nodes = $(`#${element} .layui-tree-txt`)
        for (var i = 0; i < nodes.length; i++) {
          if (nodes[i].innerHTML === obj.data.title)
            nodes[i].style.color = "#be954a";
          else
            nodes[i].style.color = "#555";
        }
        if(merchantId==obj.data.id){
         return ;
        }
        merchantId = obj.data.id;
        $("#demo").remove();
        $(document).unbind();
        $('.equipment').append(`<div class="machineList" id="demo"></div>`);
        getFlow();
      },
    });
  };

  // 导出excel表
  $('.pushBtn').click(function () {
    var myDate=new Date(),
     dataOf=myDate.getFullYear()+''+myDate.getMonth()+''+myDate.getDate(),
     xhr = new XMLHttpRequest();//定义一个XMLHttpRequest对象
    xhr.open("POST", '/api/order/exportExcel', true);
    xhr.setRequestHeader("token",sessionStorage.token);
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
          var fileName = `${marchantName}(${dataOf}).xls`; // 保存的文件名
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
        return ;
      }
    }
    xhr.send(JSON.stringify({
      condition:startTime,
      conditionTwo:endTime,
      // conditionFour:
    }));
  });
  // 关闭弹窗
   $('.playHeader .close').click(function () {
    $(this).parent().parent().addClass('margin0')
    $(this).parents('.maskContnet').fadeOut();
});

// 订单商品列表
var orderGoods=null;
function goodsDetails(){
  orderGoods=table.render({
    elem: '#GooodsData',
    cols:[[
      { checkbox: true },
      { field: 'goods_images', width: 120, title: '图片', templet: "#imgtmp" },
      { field: 'goods_Name', width: 140, title: '商品名称', },
      { field: 'goods_Core', width: 140, title: '商品编号', },
      { field: 'goods_Price', width: 140, title: '销售价 ',  },
      { field: 'goods_Cost', width: 140, title: '成本价 ',  },
    ]],
    data:[
      
    ],
    id:'goodsLIstTable',
    loading: true,
    // height: 'full-10',
  })
}
goodsDetails();
table.on('tool(moneyData)', function (obj) {
  popupShow('orderDetails','orderDetailsBox')
  orderGoods.reload({
    data:obj.data.goodsList
  })
})
})