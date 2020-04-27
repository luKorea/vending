layui.use(['table', 'form', 'layer', 'layedit'], function () {
  var $ = layui.jquery;
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
      { field: 'operation', position: 'absolute', right: 0, width: 200, title: '操作', toolbar: '#barDemo',fixed: 'right' },
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
        window.history.go(-1)
      } else {

      }
    }

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
        token,
      },
      success: function (res) {
        if (res.code == 200) {
          var optionList = `<option value="">全部</option>`;
          $('#GoodsType').empty;
          $('#EditGoodsType').empty;
          $('#addGoodsType').empty;
          $.each(res.data.list, function (index, ele) {
            optionList += `<option value="${ele.classifyId}">${ele.classifyName}</option>`
          });
          // $('#GoodsType').empty;
          $('#GoodsType').append(optionList);
          $('#EditGoodsType').append(optionList);
          $('#addGoodsType').append(optionList)
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
      $('.upload-btn1').click(function () {
        addGoodsImgIndex = 1;
        $('.ImgCropping').fadeIn();
        $('.tailoring-container').fadeIn();
      })
      // 点击商品信息事件
      $('.GoodsInformation').click(function () {
        $('.anUp').slideUp();
        $('.editor').fadeIn();

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
      $('.anUp .previewDetails').click(function(){
        $('.anUp').slideUp();
        $('.Goods-warp').addClass('fixed');
        $('.reading').fadeIn();
        $('.reading-header').css({
          'left': $('.reading-contnet').offset().left + 'px',
          'top': $('.reading-contnet').offset().top + 'px',
        });
        $('.reading-box').html(singleData.goods_Descript)
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
  // wangEditor 富文本编辑器创建
  var editWangEditor = new E('#editWangEditor')
  editWangEditor.customConfig.customUploadImg = function (files, insert) {
    var imgs = new FormData();
    imgs.append("file", files[0]);
    $.ajax({
      type: 'post',
      url: `/api/fileUpload`,
      processData: false,
      contentType: false,
      headers: {
        token,
      },
      data: imgs,
      success: function (res) {
        if (res.code == 0) {
          insert(res.data.src)
        } else {
          layer.msg('上传失败')
        }
      }
    })
  };
  editWangEditor.customConfig.uploadImgHooks = {
    error: function (xhr, editWangEditor) {
      layer.msg('图片上传失败')
    },
  };
  editWangEditor.create();
  // 修改商品信息点击事件
  $('.editDetermine-btn').click(function () {
    var EditValData = form.val("EditValData");
    console.log(EditValData)
    if (EditValData.goodsBarcode&&EditValData.goodsName && EditValData.goodsType && EditValData.goodsPrice && EditValData.goodsCost) {
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
            layer.msg('修改成功');
            tableIns.reload({
              where: {
              }
            })
            $('.editor').fadeOut();

          } else if (res.code == 403) {
            window.history.go(-1)
          } else {
            layer.msg(res.message)
          }
        }

      })
    } else {
      layer.msg('带*为必填')
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


  //商品移入移出显示
  // $('.upload-list1').mouseover(function () {
  //   $(this).children('.up-iconCont1').hide();
  //   $(this).children('.layui-icon-close').show();
  // });
  // $('.upload-list1').mouseleave(function () {
  //   $(this).children('.up-iconCont1').show();
  //   $(this).children('.layui-icon-close').hide();
  // })
  // $('.upload-list1 .layui-icon-close').click(function () {
  //   goodsImage = null;
  //   $(this).parent('.upload-list1').hide()
  // });


  // 添加自定义商品部分
  var addGoodsImg = null;
  // var addGoodsImgIndex=null;
  $('.add-btn').click(function () {
    $('.addGoods').fadeIn();
    $('.tailoring-container').fadeIn();
    addGoodsImg = 2;
  });

  // 取消添加自定义商品
  $('.addGoods .cancel-btn2').click(function () {
    $('.addGoods').fadeOut();
    $('.upload-demo2 .upload-list2').fadeOut();
  });

  // 添加商品点击上传图片

  $('.upload-btn2').click(function () {
    // console.log(editor.txt.html())
    addGoodsImgIndex = 2;
    $('.ImgCropping').fadeIn();
    $('.tailoring-container').fadeIn();
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
  // 编辑器上传图片
  addWangEditor.customConfig.customUploadImg = function (files, insert) {
    // files 是 input 中选中的文件列表
    var imgs = new FormData();
    imgs.append("file", files[0]);
    // console.log(files[0]);

    $.ajax({
      type: 'post',
      url: `/api/fileUpload`,
      processData: false,
      contentType: false,
      headers: {
        token,
      },
      data: imgs,
      success: function (res) {
        if (res.code == 0) {
          insert(res.data.src);
        } else {
          layer.msg('上传失败')
        }

      }
    })
  };

  addWangEditor.customConfig.uploadImgHooks = {
    error: function (xhr, addWangEditor) {
      layer.msg('图片上传失败')
    },
  }

  // 编辑器上传视频弹窗tba切换
  var videoTabFlag = true;
  // 点击编辑器视频事件
  $('.upVideo').click(function (e) {
    var e = e || event;
    if (videoTabFlag) {
      $('.videoTab').fadeIn();
      videoTabFlag = false;
      e.stopPropagation();
    } else {
      $('.videoTab').fadeOut();
      videoTabFlag = true;
      e.stopPropagation();
    }
  });
  // 关闭上传视频弹窗事件
  $('.videoTab .layui-icon-close').click(function (e) {
    var e = e || event;
    $('.videoTab').fadeOut();
    videoTabFlag = true;
    e.stopPropagation();
  });
  $('.videoTab').click(function (e) {
    var e = e || event;
    e.stopPropagation();
  });
  $('.tbaTitle li').click(function () {
    $(this).addClass('active').siblings().removeClass('active');
    $('.tabContent>div').eq($(this).index()).show().siblings().hide();
  })
  // 点击盒子其他地方隐藏弹窗
  $('.addGoods').click(function () {
    $('.videoTab').fadeOut();
    videoTabFlag = true;
  });
  $('.editor').click(function () {
    $('.videoTab').fadeOut();
    videoTabFlag = true;
  })


  // 上传视频加入编辑器
  $('.upVideoData input[name="addEidtVideo"]').change(function (e) {
    // console.log(e);
    // $(this).val("")
    var that = this;
    console.log($(this).attr('idType'))
    var addvideo = new FormData();
    addvideo.append("file", e.target.files[0]);
    $.ajax({
      type: 'post',
      url: `/api/fileUpload`,
      processData: false,
      contentType: false,
      headers: {
        token,
      },
      data: addvideo,
      success: function (res) {
        if (res.code == 0) {
          if ($(that).attr('idType') == 'edit') {
            if (editWangEditor.txt.html().length > 11) {
              // console.log(addWangEditor.txt.html())
              editWangEditor.txt.append(`<p><iframe src="${res.data.src}"></iframe></p>`);
              $(that).val("")
            } else {
              editWangEditor.txt.html(`<p><iframe src="${res.data.src}"></iframe></p>`);
              $(that).val("")
              // addWangEditor.txt.append(`<p><iframe src="${res.data.src}"></iframe></p>`);
            }
          } else {
            if (addWangEditor.txt.html().length > 11) {
              // console.log(addWangEditor.txt.html())
              addWangEditor.txt.append(`<p><iframe src="${res.data.src}"></iframe></p>`);
              $(that).val("")
            } else {
              addWangEditor.txt.html(`<p><iframe src="${res.data.src}"></iframe></p>`);
              $(that).val("")
              // addWangEditor.txt.append(`<p><iframe src="${res.data.src}"></iframe></p>`);
            }         
          }
          $('.videoTab').fadeOut();
          videoTabFlag = true;
        } else {
          layer.msg('上传视频失败')
        }
      }, error: function (err) {
        layer.msg('上传视频超过100m')
      }
    })
  });
  // 添加插入网络视频
  $('.addVideoInput .insert-btn').click(function () {
    insert('addVideoInput', addWangEditor);
    videoTabFlag = true;
  });
  $('.EditVideoInput .insert-btn').click(function(){
    console.log(99)
    insert('EditVideoInput', editWangEditor);
    videoTabFlag = true;
  })


  addWangEditor.create();
  // 点击确定添加
  $('.determine-btn2').click(function () {
    var addValData = form.val("addValData");
    console.log(addValData);
    // &&addValData.goodsBrand
    if (addValData.goodsBarcode&&addValData.goodsName && addValData.goodsType && addValData.goodsPrice && addValData.goodsCost) {
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
            goods_Descript: addWangEditor.txt.html() //商品详情，编辑器里的内容
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
              layer.msg('添加成功');


              // 重新加载数据
              tableIns.reload({
                where: {
                }
              })
              // 添加成功清空wangEditor文本内容
              addWangEditor.txt.clear();
            } else {
              layer.msg('操作失败')
            }
          }
        })
      } else {
        layer.msg('请上传商品图片')
      }

    } else {
      layer.msg('带*为必填')
    }
  });



  // 富文本阅览部分
  $('.reading-btn').click(function () {
    // add为添加的富文本  edit为编辑的富文本
    $('.Goods-warp').addClass('fixed');
    $('.reading').fadeIn();
    $('.reading-header').css({
      'left': $('.reading-contnet').offset().left + 'px',
      'top': $('.reading-contnet').offset().top + 'px',
    })
    if ($(this).attr('id') == 'add') {
      $('.reading').fadeIn();
      // $('.reading .reading-header h1').html('详情页预览')
      $('.reading-box').html(addWangEditor.txt.html())
    } else if($(this).attr('id') == 'edit'){
      // $('.reading .reading-header h1').html('详情页预览')
      $('.reading-box').html(editWangEditor.txt.html())
    }
  });

  // 关闭富文本弹窗
  $('.reading-down').click(function () {
    $('.Goods-warp').removeClass('fixed');
    $('.reading').fadeOut();
    indexFlag = null;
  });



  //剪切图片弹窗部分
  (window.onresize = function () {
    var win_height = $(window).height();
    var win_width = $(window).width();
    if (win_width <= 768) {
      $(".tailoring-content").css({
        "top": (win_height - $(".tailoring-content").outerHeight()) / 2,
        "left": 0
      });
    } else {
      $(".tailoring-content").css({
        "top": (win_height - $(".tailoring-content").outerHeight()) / 2,
        "left": (win_width - $(".tailoring-content").outerWidth()) / 2
      });
    }
  })();

  //图像上传
  $('#chooseImg').on('change', function () {
    console.log(this);
    var that = this;
    if (!this.files || !this.files[0]) {
      return;
    }
    var reader = new FileReader();
    reader.onload = function (evt) {
      var replaceSrc = evt.target.result;
      //更换cropper的图片
      $('#tailoringImg').cropper('replace', replaceSrc, false);//默认false，适应高度，不失真
    }
    reader.readAsDataURL(that.files[0]);
  });
  //cropper图片裁剪
  $('#tailoringImg').cropper({
    aspectRatio: 1 / 1,//默认比例
    preview: '.previewImg',//预览视图
    guides: false,  //裁剪框的虚线(九宫格)
    autoCropArea: 0.5,  //0-1之间的数值，定义自动剪裁区域的大小，默认0.8
    movable: false, //是否允许移动图片
    dragCrop: true,  //是否允许移除当前的剪裁框，并通过拖动来新建一个剪裁框区域
    movable: true,  //是否允许移动剪裁框
    resizable: true,  //是否允许改变裁剪框的大小
    zoomable: false,  //是否允许缩放图片大小
    mouseWheelZoom: false,  //是否允许通过鼠标滚轮来缩放图片
    touchDragZoom: true,  //是否允许通过触摸移动来缩放图片
    rotatable: true,  //是否允许旋转图片
    crop: function (e) {
      // 输出结果数据裁剪图像。
      // console.log(e.target.currentSrc)
    }
  });

  //旋转
  $(".cropper-rotate-btn").on("click", function () {
    $('#tailoringImg').cropper("rotate", 45);
  });
  //复位
  $(".cropper-reset-btn").on("click", function () {
    $('#tailoringImg').cropper("reset");
  });
  //换向
  var flagX = true;
  $(".cropper-scaleX-btn").on("click", function () {
    if (flagX) {
      $('#tailoringImg').cropper("scaleX", -1);
      flagX = false;
    } else {
      $('#tailoringImg').cropper("scaleX", 1);
      flagX = true;
    }
    flagX != flagX;
  });
  //裁剪后的处理
  $("#sureCut").on("click", function () {
    if ($("#tailoringImg").attr("src") == null) {
      return false;
    } else {
      var cas = $('#tailoringImg').cropper('getCroppedCanvas');//获取被裁剪后的canvas
      var base64url = cas.toDataURL('image/png'); //转换为base64地址形式
      // console.log(base64url)
      // $("#finalImg").prop("src",base64url);//显示为图片的形式
      $(".tailoring-container").fadeOut();

      // 调用
      var editImgfile = dataURLtoFile(base64url, 'jpg');
      console.log(editImgfile)
      var editImg = new FormData();
      editImg.append("file", editImgfile);
      console.log(editImg)
      $.ajax({
        type: 'post',
        url: '/api/fileUpload',
        processData: false,
        contentType: false,
        headers: {
          token,
        },
        data: editImg,
        success: function (res) {
          console.log(res)
          if (res.code == 0) {
            // addGoodsImgIndex 1为编辑 2为添加
            if (addGoodsImgIndex == 2) {
              addGoodsImg = res.data.src;
              $('#GoodsImg').attr("src", addGoodsImg);
              $('.ImgCropping').fadeOut();
              $('.upload-demo2 .upload-list2').fadeIn();
            } else {
              editGoodsImg = res.data.src;
              $('#editImg').attr("src", editGoodsImg);
              $('.ImgCropping').fadeOut();
            }
          } else {
            layer.msg(res.msg)
          }

        }
      });
    }
  });

  // 关闭图片剪切弹窗
  $('.close-tailoring').click(function () {
    $('.ImgCropping').fadeOut();
  })


  // base64转化为file
  function dataURLtoFile(dataurl, filename) {//将base64转换为文件
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  }

})