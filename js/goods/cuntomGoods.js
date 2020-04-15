layui.use(['table', 'form', 'layer'], function () {
  var $ = layui.jquery;
  // $.post('http://172.16.68.199:8086/goods/findAll', { map: 1 }, function (res) {
  //     console.log(res)
  // })

  var table = layui.table;
  var listJson = {
    pageName: 'pageSize',
    limitName: 'pageNum'
  };

 var tableIns = table.render({
    elem: '#tableTest'
    , url: `/api/goods/findAll`
    , method: 'post'
    , contentType: 'application/json',
    cols: [[
      { field: 'username', width: 120, title: '图片' },
      { field: 'goods_Name', width: 120, title: '商品名称' },
      { field: `classifyName`, width: 120, title: '商品类型', templet:'<div>{{d.classify.classifyName}}</div>'},
      { field: 'goods_Core', width: 120, title: '商品条码', },
      { field: 'goods_Param', width: 120, title: '规格说明 ' },
      { field: 'goods_Price', width: 120, title: '零售价 ', sort: true },
      { field: 'goods_Cost', width: 120, title: '成本价 ', sort: true },
      { field: 'vipPrice', width: 120, title: '会员价 ', sort: true },
      { field: 'strategy', width: 120, title: '优惠价策略 ' },
      { field: 'goodsActivity', width: 120, title: '其他活动 ' },
      { field: 'userName', width: 130, title: '所属人 ', templet:'<div>{{d.user.userName}}</div>'},
      { field: 'goods_Status', width: 120, title: '商品状态 ' },
      { field: 'operation', position: 'absolute', right: 0, width: 200, title: '操作', toolbar: '#barDemo' },
      // { fixed: 'right', width: 160, align: 'center', toolbar: '#barDemo' }
    ]]
    , id: 'tableId'
    , page: true
    , loading: true
    , where: {

    }
    // ,method:'post'
    // ,limits: [10,20,50]
    ,
    request: {
      'pageName': 'pageNum',
      'limitName': 'pageSize'
    },
    parseData: function (res) {
      //res 即为原始返回的数据
      return {
        "code": res.code, //解析接口状态
        "msg": '', //解析提示文本
        "count": res.data.total, //解析数据长度
        "data": res.data.list //解析数据列表
      };
    },
    response: {
      statusCode: 200 //规定成功的状态码，默认：0
    },
    done: function (res) {
      // console.log(res);
    }

  });


  //监听排序事件 
  table.on('sort(test)', function (obj) { //注：sort 是工具条事件名，test 是 table 原始容器的属性 lay-filter="对应的值"
    // console.log(obj.field); //当前排序的字段名
    // console.log(obj.type); //当前排序类型：desc（降序）、asc（升序）、null（空对象，默认排序）
    // console.log(this); //当前排序的 th 对象

    //尽管我们的 table 自带排序功能，但并没有请求服务端。
    //有些时候，你可能需要根据当前排序的字段，重新向服务端发送请求，从而实现服务端排序，如：
    table.reload('tableId', {
      page: {
        // curr:1
      }
    });

    // layer.msg('服务端排序。 ' + obj.field + ' ' + obj.type);
  });

  // 监听操作删除
  var indexFlag = null;
  var operationId = null;
  table.on('tool(test)', function (obj) {
    // 操作事件
    if (obj.event === 'add') {
      var singleData = obj.data;
      console.log(singleData)
      $('.anUp').slideUp();
      if (indexFlag != singleData.goods_Id) {
        indexFlag = singleData.goods_Id
        $(this).siblings('.anUp').slideDown()
      } else {
        indexFlag = null;
      }
      // 点击优惠事件
      $('.preferentialClick').click(function () {
        $('.anUp').slideUp();
        $('.preferential').fadeIn();
        
      })
    } else if (obj.event === 'delete') {
      console.log(obj)
      layer.confirm('真的删除行么', function (index) {
        
        // obj.del();
        // layer.close(index);
        Goodsdel(obj.data.goods_Id,1,obj,index);
      });

    } else {
      console.log(obj)
    }
  });

  //  取消优惠按钮
  $('.cancel-btn').on('click', function () {
    $('.preferential').fadeOut();
    indexFlag = null;
  })
  var d = {
    pageSize: 1,
    pageNum: 10
  };
  function ajax() {
    console.log(1)
    $.ajax({
      type: 'post',
      url: `/api/goods/findAll`,
      data: JSON.stringify(d),
      headers: {
        "Content-Type": "application/json",
      },
      success: function (res) {
        console.log(res)
      }
    })
  };
  // ajax(); 
  // 查询渲染优惠设置
  // function upPreferential(){
  //   tableIns.reload({
  //     where: { //设定异步数据接口的额外参数，任意设
  //       aaaaaa: 'xxx'
  //       ,bbb: 'yyy'
  //       //…
  //     }
  //   })
  // }
  // upPreferential(tableIns);

  // 商品状态下拉框数据请求
  var form=layui.form;
  function selectData(IdClass){  
    $.ajax({
      type:'post',
      url:`/api/classify/findAll`,
      data: JSON.stringify({pageNum:1,pageSize:10}),
      headers: {
        "Content-Type": "application/json",
      },success:function (res) {
        if(res.code==200){
          var optionList=`<option value="">全部</option>`;
          $('#GoodsType').empty;
          $.each(res.data.list,function (index,ele) {
              optionList+= `<option value="${ele.classifyId}">${ele.classifyName}</option>`
          });
          // $('#GoodsType').empty;
          $('#GoodsType').append(optionList)
          form.render('select');
        }
      }
    })
  }
  selectData(); 
  // 查询商品类型id
  var GoodsTypeID='';
  // 监听商品类型下拉框
  form.on('select(mySelect)', function(data){
    GoodsTypeID=data.value;
  }); 
  // 关键字
  var keyGoodsName= $(".KyeText").val();
  console.log(keyGoodsName);
  var stateId=''
  // 状态下拉框监听
  form.on('select(stateSelect)', function(data){
    stateId=data.value;
  }); 
  // 开始价格   结束价格
  var startingPrice=$('.startingPrice').val()
  , closingPrice=$('.closingPrice').val();
  console.log(startingPrice,closingPrice)
//                        1关键字 2商品类型ID 3状态ID 4开始价格 5结束价格
  upPreferential(tableIns,keyGoodsName,stateId,startingPrice,closingPrice)
})