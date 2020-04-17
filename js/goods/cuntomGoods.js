layui.use(['table', 'form', 'layer', 'layedit'], function () {
  var $ = layui.jquery;
  // $.post('http://172.16.68.199:8086/goods/findAll', { map: 1 }, function (res) {
  //     console.log(res)
  // })

  var table = layui.table;
  // 商品图片
  var goodsImage = null;
  var tableIns = table.render({
    elem: '#tableTest'
    , url: `/api/goods/findAll`
    , method: 'post'
    , contentType: 'application/json',
    cols: [[
      { field: 'username', width: 120, title: '图片' },
      { field: 'goods_Name', width: 120, title: '商品名称' },
      { field: `classifyName`, width: 120, title: '商品类型', templet: '<div>{{d.classify.classifyName}}</div>' },
      { field: 'goods_Core', width: 120, title: '商品条码', },
      { field: 'goods_Param', width: 120, title: '规格说明 ' },
      { field: 'goods_Price', width: 120, title: '零售价 ', sort: true },
      { field: 'goods_Cost', width: 120, title: '成本价 ', sort: true },
      { field: 'vipPrice', width: 120, title: '会员价 ', sort: true },
      { field: 'strategy', width: 120, title: '优惠价策略 ' },
      { field: 'goodsActivity', width: 120, title: '其他活动 ' },
      { field: 'userName', width: 130, title: '所属人 ', templet: '<div>{{d.user.userName}}</div>' },
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
      // console.log(res)
      //res 即为原始返回的数据
      if (res.code == 200) {
        return {
          "code": res.code, //解析接口状态
          "msg": '', //解析提示文本
          "count": res.data.total, //解析数据长度
          "data": res.data.list //解析数据列表
        };
      } else {
        return {
          "code": res.code, //解析接口状态
          "msg": res.message, //解析提示文本
        }
      }

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

  // 商品状态下拉框数据请求
  var form = layui.form;
  function selectData(IdClass) {
    $.ajax({
      type: 'post',
      url: `/api/classify/findAll`,
      data: JSON.stringify({ pageNum: 1, pageSize: 10 }),
      headers: {
        "Content-Type": "application/json",
      }, success: function (res) {
        if (res.code == 200) {
          var optionList = `<option value="">全部</option>`;
          $('#GoodsType').empty;
          $('#EditGoodsType').empty;
          $.each(res.data.list, function (index, ele) {
            optionList += `<option value="${ele.classifyId}">${ele.classifyName}</option>`
          });
          // $('#GoodsType').empty;
          $('#GoodsType').append(optionList);
          $('#EditGoodsType').append(optionList)
          form.render('select');
        }
      }
    })
  }
  selectData();
  // 查询商品类型id
  var GoodsTypeID = '';
  // 监听商品类型下拉框
  form.on('select(mySelect)', function (data) {
    GoodsTypeID = data.value;
  });
  var stateId = ''
  // 状态下拉框监听
  form.on('select(stateSelect)', function (data) {
    stateId = data.value;
  });

  // 点击查询事件，重新渲染数据表格
  $('.query-btnClick').click(function () {
    //                        1关键字 2商品类型ID 3状态ID 4开始价格 5结束价格
    upPreferential(tableIns, $(".KyeText").val(), GoodsTypeID, stateId, $('.startingPrice').val(), $('.closingPrice').val());
  })

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
        $('input[name="GoodsName"]').val(singleData.goods_Name);
        $('input[name="goods_Price"]').val(singleData.goods_Price);
        $('input[name="vip_Price"]').val(singleData.vipPrice);
        $('input[name="integral"]').val(singleData.integral);
      })

      // 点击商品信息事件
      $('.GoodsInformation').click(function () {
        $('.anUp').slideUp();
        $('.editor').fadeIn();
        
        form.val("EditValData", { //formTest 即 class="layui-form" 所在元素属性 lay-filter="" 对应的值
          "goods-Barcode": singleData.goods_Core // "商品条码
          , "goods-Name": singleData.goods_Name //商品名称
          , "goods-Type": singleData.classify.classifyId //商品类型
          , "goods-Brand": singleData.brand  //品牌
          , "goods-Price": singleData.goods_Price //零售价
          , "goods-Cost": singleData.goods_Cost //成本价
          , "goods-Param":singleData.goods_Param //规格描述
          , 'goods-Status':singleData.goods_Status //商品状态
        });
        var EditValData=form.val("EditValData");
        console.log(EditValData)
      })
    } else if (obj.event === 'delete') {
      console.log(obj)
      layer.confirm('真的删除行么', function (index) {

        // obj.del();
        // layer.close(index);
        Goodsdel(obj.data.goods_Id, 1, obj, index);
      });

    } else {
      console.log(obj)
    }
  });

  //  取消优惠按钮
  $('.preferential .cancel-btn').on('click', function () {
    $('.preferential').fadeOut();
    indexFlag = null;
  })

  // 编辑器初始化
  var layedit = layui.layedit;
  layedit.set({
    uploadImage: {
      url: '/api/fileUpload' //接口url
      , type: 'post' //默认post
      , code: 200 //0表示成功，其它失败

    },

  })

  //建立编辑器
  var EditIndex = layedit.build('editDemo', {
    height: 180,
  })
  $('.upload-btn1').click(function () {
    console.log(layedit.getContent(EditIndex))
  })

  // 取消编辑按钮
  $('.editor .cancel-btn').click(function () {
    $('.editor').fadeOut();
    indexFlag = null;
  });


  //商品移入移出显示
  $('.upload-list1').mouseover(function () {
    $(this).children('.up-iconCont1').hide();
    $(this).children('.layui-icon-close').show();
  });
  $('.upload-list1').mouseleave(function () {
    $(this).children('.up-iconCont1').show();
    $(this).children('.layui-icon-close').hide();
  })
  $('.upload-list1 .layui-icon-close').click(function () {
    goodsImage = null;
    $(this).parent('.upload-list1').hide()
  })


})