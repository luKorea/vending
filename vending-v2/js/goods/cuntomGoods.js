layui.use(['table', 'form', 'layer', 'layedit', 'tree'], function () {
  var $ = layui.jquery,
    tree = layui.tree;
  // 收起
  $('.sidebar i').click(function () {
    $('.left-mian').hide();
    $('.on-left').show()
  });
  $('.on-left').click(function () {
    $('.left-mian').show();
    $('.on-left').hide()
  })
  // $.post('http://172.16.68.199:8086/goods/findAll', { map: 1 }, function (res) {
  //     console.log(res)
  // })
  var table = layui.table;
  // wangEditor 获取全局属性
  var E = window.wangEditor;
  // 商品图片
  var goodsImage = null;
  var token = sessionStorage.token + '';
  // console.log(token)
  // table.set({headers:{token: sessionStorage.token}})
  var tableIns = table.render({
    elem: '#tableTest'
    , url: `/api/goods/findAll`
    , method: 'post',
    contentType: "application/json",
    headers: {
      token,
    },
    cols: [[
      { checkbox: true },
      { field: 'goods_Images', width: 100, title: '图片', templet: "#imgtmp" },
      { field: 'goods_Name', width: 120, title: '商品名称', color: '#409eff' },
      { field: `classifyName`, width: 120, title: '商品类目', templet: '<div>{{  d.classify.classifyName ? d.classify.classifyName: ""}}</div>' },
      { field: 'goods_Core', width: 120, title: '商品编号', },
      { field: 'goods_Param', width: 120, title: '规格说明 ' },
      { field: 'goods_Price', width: 120, title: '销售价 ', sort: true },
      { field: 'goods_Cost', width: 120, title: '成本价 ', sort: true },
      // { field: 'vipPrice', width: 120, title: '会员价 ', sort: true },
      // { field: 'strategy', width: 120, title: '优惠价策略 ' },
      // { field: 'goodsActivity', width: 120, title: '其他活动 ' },
      {
        field: 'userName', width: 130, title: '创建人 ', templet: function (d) {
          return d.user.userName != null ? d.user.userName : ''
        }
      },
      { field: 'goods_Time', width: 200, title: '创建时间 ', sort: true },
      { field: 'update_user', width: 130, title: '最后操作人 ' },
      { field: 'update_time', width: 200, title: '最后操作时间 ', sort: true },
      {
        field: 'goods_Status', width: 120, title: '商品状态 ', templet: function (d) {
          return d.goods_Status = 1 ? '启用' : '不启用'
        }
      },
      { field: 'operation', position: 'absolute', right: 0, width: 200, title: '操作', toolbar: '#barDemo' },
      // { fixed: 'right', width: 160, align: 'center', toolbar: '#barDemo' }
    ]]
    , id: 'tableId'
    , page: true
    , loading: true
    // ,method:'post'
    // ,limits: [10,20,50]
    ,
    request: {
      'pageName': 'pageNum',
      'limitName': 'pageSize'
    },
    where: {
      merchantId: sessionStorage.machineID
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
      if (res.code == 403) {
        window.parent.location.href = "../login/login.html";
      }else if(res.code==405){
        $('.hangContent').show();
      }
    }

  });

  // 商品状态下拉框数据请求
  var form = layui.form;
  function selectData(merchantId,index) {
    $.ajax({
      type: 'post',
      url: `/api/classify/findAll`,
      data: JSON.stringify({ pageNum: 1, pageSize: 10000, merchantId, }),
      headers: {
        "Content-Type": "application/json",
        token,
      },
      success: function (res) {
        if (res.code == 200) {
          var optionList = `<option value="">全部</option>`;
          if(index==1){
            
            $('#addGoodsType').empty();
          }        
          $('#EditGoodsType').empty();
          $('#GoodsType').empty();
          $.each(res.data.list, function (index, ele) {
            optionList += `<option value="${ele.classifyId}">${ele.classifyName}</option>`
          });
          // $('#GoodsType').empty;
          if(index==1){     
            $('#addGoodsType').append(optionList);
          }    
          $('#EditGoodsType').append(optionList);
          $('#GoodsType').append(optionList);
          form.render('select');
        }
      }
    })
  }
  selectData(sessionStorage.machineID,1);
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
  // 剪切图片判断条件
  var editGoodsImg = null;
  var addGoodsImgIndex = null;
  var singleData = null;
  var EditIndex = null;
  table.on('tool(test)', function (obj) {
    // 操作事件
    if (obj.event === 'add') {
      singleData = obj.data;
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

    } else if (obj.event === 'delete') {
      console.log(obj)
      layer.confirm('确定删除？', function (index) {
        // obj.del();
        // layer.close(index);
        Goodsdel(obj.data.goods_Id, 1, obj, index);
      });
    } else {
      console.log(obj)
    }
  });

  // 选择商品图片
  $('.upload-btn1').click(function () {
    addGoodsImgIndex = 1;
    logoCont = 1;
    conditionFour = 0
    materialCont();
    popupShow('GoodsMaterial', 'goodsMaterialBox');
  });
  // 点击商品信息事件
  $('body').on('click', '.GoodsInformation', function () {
    $('.anUp').slideUp();
    // $('.editor').fadeIn();
    popupShow('editor', 'editor-content');
    form.val("EditValData", { //formTest 即 class="layui-form" 所在元素属性 lay-filter="" 对应的值
      "goodsBarcode": singleData.goods_Core // "商品条码
      , "goodsName": singleData.goods_Name //商品名称
      , "goodsType": singleData.classify.classifyId //商品类型
      // , "goodsBrand": singleData.brand  //品牌
      , "goodsPrice": singleData.goods_Price //零售价
      , "goodsCost": singleData.goods_Cost //成本价
      , "goodsParam": singleData.goods_Param //规格描述
      , 'goodsStatus': singleData.goods_Status //商品状态
    });
    $('#editImg').attr("src", singleData.goods_Images)
    editWangEditor.txt.html(singleData.goods_Descript)
  });

  // 点击预览事件
  $('body').on('click', '.anUp .previewDetails', function () {
    $('.anUp').slideUp();
    $('.Goods-wrap').addClass('fixed');
    $('.reading').fadeIn();
    $('.reading-header').css({
      'left': $('.reading-contnet').offset().left + 'px',
      'top': $('.reading-contnet').offset().top + 'px',
    });
    $('.reading-box').html(singleData.goods_Descript)
  })
  // wangEditor 富文本编辑器创建
  var editWangEditor = new E('#editWangEditor')
  editWangEditor.customConfig.uploadImgHooks = {
    error: function (xhr, editWangEditor) {
      layer.msg('图片上传失败')
    },
  };
  editWangEditor.create();
  // 修改商品信息点击事件
  $('.editDetermine-btn').click(function () {
    indexFlag = null;
    var EditValData = form.val("EditValData");
    console.log(EditValData)
    if (EditValData.goodsBarcode && EditValData.goodsName && EditValData.goodsType && EditValData.goodsPrice && EditValData.goodsCost) {
      $.ajax({
        type: 'post',
        url: `/api/goods/updateGoods`,
        headers: {
          "Content-Type": "application/json",
          token,
        },
        data: JSON.stringify({
          goods_Id: singleData.goods_Id,
          goods_Core: EditValData.goodsBarcode, //商品条码
          goods_Name: EditValData.goodsName,   //商品名称
          classify_Id: EditValData.goodsType,     //商品类型
          brand: EditValData.goodsBrand,        //品牌
          goods_Price: EditValData.goodsPrice,  //同意零售价
          goods_Cost: EditValData.goodsCost,    //成本价
          goods_Param: EditValData.goodsParam,  //规格
          goods_Status: EditValData.goodsStatus, //状态
          goods_Images: $('#editImg').attr("src"), //商品图片 不在form里
          goods_Descript: editWangEditor.txt.html() //商品详情，编辑器里的内容
        }),
        success: function (res) {

          if (res.code == 200) {
            layer.msg('修改成功', { icon: 1 });
            tableIns.reload({
              where: {
              }
            })
            $('.editor').fadeOut();

          } else if (res.code == 403) {
            window.parent.location.href = "../login/login.html";
          } else {
            layer.msg(res.message, { icon: 2 })
          }
        }

      })
    } else {
      layer.msg('带*为必填', { icon: 7 })
    }
  })
  //  取消优惠按钮
  $('.preferential .cancel-btn').on('click', function () {
    $('.preferential').fadeOut();
    indexFlag = null;
  })

  // 编辑器初始化
  var layedit = layui.layedit;
  layedit.set({
    uploadImage: {
      url: '/api/fileUpload',//接口url
      headers: {
        token,
      }
      , type: 'post' //默认post
      , code: 200 //0表示成功，其它失败

    },

  })



  // 取消编辑按钮
  $('.editor .cancel-btn').click(function () {
    $('.editor').fadeOut();
    indexFlag = null;
  });

  // 添加自定义商品部分
  var addGoodsImg = null;
  // 1为logo 2为内容
  var logoCont = null;
  $('.add-btn').click(function () {
    // $('.addGoods').fadeIn();
    popupShow('addGoods', 'editor-content');
    $('.tailoring-container').fadeIn();
  });

  // 取消添加自定义商品
  $('.addGoods .cancel-btn2').click(function () {
    // $('.addGoods').fadeOut();
    popupHide('addGoods', 'editor-content');
    $('.upload-demo2 .upload-list2').fadeOut();
  });

  // 添加商品点击上传图片

  $('.upload-btn2').click(function () {
    // console.log(editor.txt.html())
    addGoodsImgIndex = 2;
    logoCont = 1;
    conditionFour = 0;
    materialCont();
    popupShow('GoodsMaterial', 'goodsMaterialBox');
  });
  // layui edit 编辑器创建
  // var AddIndex = layedit.build('addDemo', {
  //   height: 180,
  // })

  // wangEditor 富文本编辑器创建
  var addWangEditor = new E('#addWangEditor');
  addWangEditor.customConfig.menus = [
    'head',  // 标题
    'bold',  // 粗体
    'fontSize',  // 字号
    'fontName',  // 字体
    'italic',  // 斜体
    'underline',  // 下划线
    'strikeThrough',  // 删除线
    'foreColor',  // 文字颜色
    'backColor',  // 背景颜色
    'link',  // 插入链接
    'list',  // 列表
    'justify',  // 对齐方式
    'quote',  // 引用
    'emoticon',  // 表情
    'image',  // 插入图片
    'table',  // 表格
    'video',  // 插入视频
    'undo',  // 撤销
    'redo'  // 重复
  ];
  addWangEditor.customConfig.uploadImgHooks = {
    error: function (xhr, addWangEditor) {
      layer.msg('图片上传失败')
    },
  }

  // 编辑器上传视频弹窗tba切换
  var videoTabFlag = true;
  // 点击编辑器视频事件
  var materialType = null;
  $('.upVideo').click(function (e) {
    materialType = $(this).attr('typeID')
    popupShow('goodsmaterialVideo', 'materialBox');
    if (!videoTable) {
      materVideoCont();
    }
  });

  addWangEditor.create();
  // 点击确定添加
  $('.determine-btn2').click(function () {
    var addValData = form.val("addValData");
    console.log(addValData);
    // &&addValData.goodsBrand
    if (addValData.goodsBarcode && addValData.goodsName && addValData.goodsType && addValData.goodsPrice && addValData.goodsCost) {
      if (addGoodsImg) {
        $.ajax({
          type: 'post',
          url: `/api/goods/saveGoods`,
          headers: {
            "Content-Type": "application/json",
            token,
          },
          data: JSON.stringify({
            goods_Core: addValData.goodsBarcode, //商品条码
            goods_Name: addValData.goodsName,   //商品名称
            classify_Id: addValData.goodsType,     //商品类型
            brand: addValData.goodsBrand,        //品牌
            goods_Price: addValData.goodsPrice,  //同意零售价
            goods_Cost: addValData.goodsCost,    //成本价
            goods_Param: addValData.goodsParam,  //规格
            goods_Status: addValData.goodsStatus, //状态
            goods_Images: addGoodsImg, //商品图片 不在form里
            goods_Descript: addWangEditor.txt.html(), //商品详情，编辑器里的内容
            merchantId: sessionStorage.machineID
          }), success: function (res) {
            console.log(res)
            if (res.code == 200) {
              $('.addGoods').fadeOut();
              $('.upload-demo2 .upload-list2').fadeOut();
              addGoodsImg = null;
              form.val("addValData", { //formTest 即 class="layui-form" 所在元素属性 lay-filter="" 对应的值
                "goodsBarcode": ''
                , "goodsName": ''
                , "goodsType": ''
                , "goodsBrand": ''
                , "goodsPrice": ''
                , "goodsCost": ''
                , "goodsParam": ''
              });
              layer.msg('添加成功', { icon: 1 });


              // 重新加载数据
              tableIns.reload({
                where: {
                }
              })
              // 添加成功清空wangEditor文本内容
              addWangEditor.txt.clear();
            } else if (res.code == 403) {
              window.parent.location.href = "../login/login.html";
            }
            else {
              layer.msg(res.message, { icon: 2 })
            }
          }
        })
      } else {
        layer.msg('请上传商品图片',{icon:7})
      }

    } else {
      layer.msg('带*为必填',{icon:7})
    }
  });



  // 富文本阅览部分
  $('.reading-btn').click(function () {
    // add为添加的富文本  edit为编辑的富文本
    $('.Goods-wrap').addClass('fixed');
    $('.reading').fadeIn();
    $('.reading-header').css({
      'left': $('.reading-contnet').offset().left + 'px',
      'top': $('.reading-contnet').offset().top + 'px',
    })
    if ($(this).attr('id') == 'add') {
      $('.reading').fadeIn();
      // $('.reading .reading-header h1').html('详情页预览')
      $('.reading-box').html(addWangEditor.txt.html())
    } else if ($(this).attr('id') == 'edit') {
      // $('.reading .reading-header h1').html('详情页预览')
      $('.reading-box').html(editWangEditor.txt.html())
    }
  });

  // 关闭富文本弹窗
  $('.reading-down').click(function () {
    $('.Goods-wrap').removeClass('fixed');
    $('.reading').fadeOut();
    indexFlag = null;
  });
  // 关闭弹窗
  $('.playHeader .close').click(function () {
    $(this).parent().parent().addClass('margin0')
    $(this).parents('.maskContnet').fadeOut();
    indexFlag = null;
  });

  // 商品素材部分

  // 图片素材
  var conditionFour = null;
  var advertisingLis = null;
  function materialCont() {
    advertisingLis = table.render({
      elem: '#materiaImgTable',
      method: 'post',
      url: '/api/good_material/getGoodMaterial',
      contentType: "application/json",
      headers: {
        token,
      },
      cols: [[
        { field: 'img', width: 100, title: '图片', templet: "#materiaImgtmp" },
        { field: 'name', width: 120, title: '图片名', },
        // { field: 'number', width: 200, title: '图片编号', },
        { field: 'publishTime', width: 180, title: '发布时间', sort: true },
        { field: 'addUser', width: 150, title: '发布人', },
        { field: 'operationa', right: 0, width: 150, title: '操作', toolbar: '#materiaImg', fixed: 'right' },
      ]]
      , page: true
      , id: 'ImgListData'
      , loading: true,
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
      where: {
        conditionFour: conditionFour,
        conditionFive: '2',
        conditionSix:sessionStorage.machineID
      },
      response: {
        statusCode: 200 //规定成功的状态码，默认：0
      },
      done: function (res) {
        if (res.code == 403) {
          window.parent.location.href = "../login/login.html";
        } else {

        }
      }
    });
  }


  // 关键字查询
  $('.materialKeyCont .queryBtnClick').click(function () {
    console.log($('.materialKeyCont input[name="KyeText"]').val())
    advertisingLis.reload({
      where: {
        conditionFour: conditionFour,
        conditionFive: '2',
        conditionThree: $('.materialKeyCont input[name="KyeText"]').val()
      }
    })
  })
  $('.goodsmaterialVideo .queryBtnClick').click(function () {
    videoTable.reload({
      where: {
        conditionFour: '0',
        conditionFive: '2',
        conditionThree: $('.goodsmaterialVideo input[name="KyeText"]').val()
      }
    })
  })

  // 监听素材图片确定
  table.on('tool(materiaImgTable)', function (obj) {
    console.log(obj);
    // 1为商品图片 2为内容图片
    console.log(logoCont, addGoodsImg)
    if (logoCont == 1) {
      // 1为编辑 2为添加
      if (addGoodsImgIndex == 2) {
        addGoodsImg = obj.data.img;
        $('#GoodsImg').attr("src", addGoodsImg);
        $('.upload-demo2 .upload-list2').fadeIn();
        popupHide('GoodsMaterial', 'goodsMaterialBox');
      } else {
        editGoodsImg = obj.data.img;
        $('#editImg').attr("src", editGoodsImg);
        popupHide('GoodsMaterial', 'goodsMaterialBox');
      }
    } else {
      if (addGoodsImgIndex == 2) {
        if (addWangEditor.txt.html().length > 11) {
          addWangEditor.txt.append(`<p><img src="${obj.data.img}"></img></p>`);
        } else {
          addWangEditor.txt.html(`<p><img src="${obj.data.img}"></img></p>`);
        }
      } else {
        if (editWangEditor.txt.html().length > 11) {
          editWangEditor.txt.append(`<p><img src="${obj.data.img}"></img></p>`);
        } else {
          editWangEditor.txt.html(`<p><img src="${obj.data.img}"></img></p>`);
        }
      }
      popupHide('GoodsMaterial', 'goodsMaterialBox');
    }
  });


  // 视频部分
  var videoTable = null;
  function materVideoCont() {
    videoTable = table.render({
      elem: '#materiaVideoTable',
      method: 'post',
      url: '/api/good_material/getGoodMaterial',
      contentType: "application/json",
      headers: {
        token,
      },
      cols: [[
        // { field: 'Img', width: 150, title: '素材图',templet: "" },
        // { type: 'checkbox', },
        { field: 'name', width: 120, title: '视频名', },
        { field: 'publishTime', width: 180, title: '发布时间', sort: true },
        { field: 'addUser', width: 150, title: '发布人', },
        // {field:'operation', width:120, title: 'caozuo', sort: true, fixed: 'right'}
        { field: 'operation', width: 150, title: '操作', toolbar: '#barDemoVideo', },

      ]]
      , page: true
      , id: 'VideoListData'
      , loading: true,
      request: {
        'pageName': 'pageNum',
        'limitName': 'pageSize'
      },
      where: {
        conditionFour: '1',
        conditionFive: '2',
        conditionSix:sessionStorage.machineID,
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
        if (res.code == 403) {
          window.parent.location.href = "../login/login.html";
        } else {

        }
      }
    });
  }


  table.on('tool(materiaVideoTable)', function (obj) {
    console.log(obj)
    if (obj.event == 'preview') {
      popupShow('materialPreview', 'previewBox');
      $('.perviewBody video').attr('src', obj.data.img);
      console.log(materialType);
    } else {
      console.log(materialType);
      if (materialType == 2) {
        if (addWangEditor.txt.html().length > 11) {
          addWangEditor.txt.append(`<p><iframe src="${obj.data.img}"></iframe></p>`);
        } else {
          addWangEditor.txt.html(`<p><iframe src="${obj.data.img}"></iframe></p>`);
        }
        popupHide('goodsmaterialVideo', 'materialBox');
      } else {
        if (editWangEditor.txt.html().length > 11) {
          editWangEditor.txt.append(`<p><iframe src="${obj.data.img}"></iframe></p>`);
        } else {
          editWangEditor.txt.html(`<p><iframe src="${obj.data.img}"></iframe></p>`);
        }
        popupHide('goodsmaterialVideo', 'materialBox');
      }
    }
  })


  // 富文本编辑器选择图片
  $('.upImg').click(function () {
    logoCont = $(this).attr('contType');
    addGoodsImgIndex = $(this).attr('goodsIndex');
    conditionFour = 2
    console.log(logoCont, addGoodsImgIndex);
    popupShow('GoodsMaterial', 'goodsMaterialBox');
    materialCont();

  });
  // 刷新页面
  $('.refreshBtn').click(function () {
    location.reload();
  });
  //树状图
  var dataList = treeList();
  var dataList1 = treeList();
  treeFun(tree, 'testGoods', tableIns, dataList, 'merchantId','goodsClass',selectData)
  treeFunCheck(tree, 'testGoodsCheck', tableIns, dataList1, 'merchantId',layer)
  // leg.tree({
  //   ele:"#testGoodsCheck",//选者
  //   data:dataList1,//数据
  //   cascade:false,//级联
  // });

  // 接收列表非强制
  var parentGoods = null;
  function parentGoodsList() {
    parentGoods = table.render({
      elem: '#parentTableTest'
      , url: `/api/goods/getSendHistory`
      , method: 'post',
      height:500,
      contentType: "application/json",
      headers: {
        token,
      },
      cols: [[
        { type: 'checkbox', },
        { field: 'goods_images', width: 120, title: '图片', templet: "#Listimgtmp" },
        { field: 'goods_Name', width: 150, title: '商品名称', color: '#409eff' },
        { field: `classifyName`, width: 160, title: '商品类目', },
        { field: `topMerchant`, width: 160, title: '推送商户', },
        { field: `targetMerchant`, width: 160, title: '接收商户', },
        {
          field: 'goods_Param', width: 130, title: '接收状态 ', templet: function (d) {
            return d.received == 0 ? '未接收' : '已接收'
          }
        },
        {
          field: 'sendTime', width: 200, title: '推送时间 ', sort: true, templet: function (d) {
            var myDate = new Date(d.sendTime);
            var y = myDate.getFullYear();
            var m = myDate.getMonth() + 1;
            var d = myDate.getDate();
            var h = myDate.getHours();
            var min = myDate.getMinutes();
            var s = myDate.getSeconds();
            return y + '-' + m + '-' + d + ' ' + h + ':' + min + ':' + s
          }
        },
      ]]
      , id: 'parentTableId'
      , page: true
      , loading: true
      , limits: [10, 20, 50]
      ,
      request: {
        'pageName': 'pageNum',
        'limitName': 'pageSize'
      },
      where: {
        condition: sessionStorage.machineID,
        conditionFour: '0'
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
        if (res.code == 403) {
          window.parent.location.href = "../login/login.html";
        };
        var statusList = res.data.list;

        for (var i in res.data) {
          var item = res.data[i];
          if (item.merchantId == sessionStorage.machineID || item.received == 1) {// 这里是判断需要禁用的条件（如：状态为0的）
            // checkbox 根据条件设置不可选中
            $('.list_table1 tr[data-index=' + i + '] input[type="checkbox"]').prop('disabled', true);
            state = "1";// 隐藏表头全选判断状态
            form.render();// 重新渲染一下
          }
        }

        // if(state == "1"){
        //   // 根据条件移除全选 checkbox
        //   $('th[data-field=0] div').replaceWith('<div class="layui-table-cell laytable-cell-5-0-0"><span></span></div>');
        // }else {
        //    //翻页显示全选按钮 checkbox
        //    $('th[data-field=0] div').replaceWith('<div class="layui-table-cell laytable-cell-1-0-0 laytable-cell-checkbox"><input type="checkbox" name="layTableCheckbox" lay-skin="primary" lay-filter="layTableAllChoose"><div class="layui-unselect layui-form-checkbox" lay-skin="primary"><i class="layui-icon layui-icon-ok"></i></div></div>');
        // }




      }
    });
  }


  // 推送
  //是否强制推送
  var PType = null;
  // 推送数据
  var pushList = null;
  var checkID = null;
  $('.pushGoodsBtn').click(function () {
    pushList = table.checkStatus('tableId');
    console.log(pushList)
    if (pushList.data.length > 0) {
      popupShow('chooseLower', 'chooseBox')
    } else {
      layer.msg('请选择需要推送的商品', { icon: 7 })
    }
  });
  // 确定推送
  var role = null;
  $('.determineBtn').click(function () {
    var checkedData = tree.getChecked('treelistCheck');
    role = getChildNodes(checkedData, []);
    role.shift()
    console.log(role)
    if (role.length == 0) {
      layer.msg('请选择要推送的商户', { icon: 7 })
      return;
    }
    popupShow('PushMandatory', 'MandatoryBox')
    console.log(pushList)
  });
  $('.mandatroFooter div').click(function () {
    var pushArray = [];
    PType = $(this).attr('Ptype');
    $('.mask').fadeIn();
    $('.maskSpan').addClass('maskIcon');
    pushList.data.forEach((item, index) => {
      var pushObj = {
        className: item.classify.classifyName,
        goodsId: item.goods_Id,
      }
      pushArray.push(pushObj)
    });
      var pushData = JSON.stringify({
        goods: pushArray,
        merchantId: sessionStorage.machineID,
        mid: role,
        type: PType
      })
      loadingAjax('/api/goods/sendGoods', 'post', pushData, token, 'mask', 'chooseLower', 'chooseBox', layer).then((res) => {
        console.log(res)
        popupHide('PushMandatory', 'MandatoryBox')
        layer.msg(res.message, { icon: 1 })
      }).catch((err) => {
        $('.mask').fadeOut();
        $('.maskSpan').removeClass('maskIcon');
        popupHide('PushMandatory', 'MandatoryBox')
        layer.msg(err.message, { icon: 2 })
      })
  })
  // 取消
  $('.chooseFooter .chooseCan').click(function () {
    popupHide('chooseLower', 'chooseBox')
  })


  // 推送列表
  $('.pushListBtn').click(function () {
    popupShow('topGoodsList', 'topBox')
    if (!parentGoods) {
      parentGoodsList();
    }
  })
  // 推送列表查询
  $('.topBody .pushQueryBtn').click(function () {
    parentGoods.reload({
      where: {
        conditionTwo: $('.topBody select[name="mandatory"]').val(), //是否强制
        conditionThree: $('.topBody select[name="receiveStatus"]').val(),  //是否接收
        conditionFour: $('.topBody select[name="receiveType"]').val(), //发送接收
        goods_Name: $('.topBody input[name="KyeText"]').val()
      }
    })
  })
  //接收商品
  $('.topBody .pushGoodsListBtn').click(function () {
    var receiveList = table.checkStatus('parentTableId');
    console.log(receiveList)
    var receiveArray = [];
    if (receiveList.data.length > 0) {
      receiveList.data.forEach((item, index) => {
        if (!(item.merchantId == sessionStorage.machineID || item.received == 1)) {
          var receiveObj = {
            className: item.classifyName,
            goodsId: item.goods_Id,
            merchantId: sessionStorage.machineID
          }
          receiveArray.push(receiveObj)
        }
      })
      if (!(receiveArray.length > 0)) {
        layer.msg('没有能接收的商品', { icon: 7 });
        return;
      }
      $('.mask').fadeIn();
      $('.maskSpan').addClass('maskIcon');
      var receiveData = JSON.stringify({
        goods: receiveArray,
        merchantId: sessionStorage.machineID
      })
        loadingAjax('/api/goods/forwardGoods', 'post', receiveData, sessionStorage.token, 'mask', 'topGoodsList', 'topBox', layer).then((res) => {
          console.log(res)
          layer.msg(res.message, { icon: 1 });
          tableIns.reload({
            where: {}
          });
          parentGoods.reload({
            where:{}
          })
        }).catch((err) => {
          $('.mask').fadeOut();
          $('.maskSpan').removeClass('maskIcon');
          layer.msg(err.message, { icon: 2 })
        })
    } else {
      layer.msg('请选择接收的商品', { icon: 7 })
    }
  })
  // 推送列表部分tab切换
  // $('.topPushNav li').click(function(){
  //   $(this).addClass('active').siblings().removeClass('active');
  //   $(this).addClass('active').siblings().removeClass('active');
  //   let that = $(this);
  //   console.log(that.parent().offset().left )
  //   $('.navTabLine').animate({
  //     left: (that.position().left+100) + 'px',
  //     width:that.width()
  //   }, 500);
  // });  
  // 监听f5刷新
 $("body").bind("keydown", function (event) {
    if (event.keyCode == 116) {
      f5Fun()
    }
  });

})