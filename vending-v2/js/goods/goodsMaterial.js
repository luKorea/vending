layui.use(['form', 'layer', 'laydate', 'table'], function () {
  // tab切换
  var index=0
  $('.navTab li').click(function () {
    $(this).addClass('active').siblings().removeClass('active');
    let that = $(this);
    $('.tabLine').animate({
      left: (that.offset().left) + 'px'
    }, 500);
    if ($(this).index() == 0) {
      if(index==0){
        index=$(this).index();
        return ;
      }else if(index==1){
        index=$(this).index();
        onStep('details', 'ImgContnet');      
      }else{
        index=$(this).index();
        onStep('VideoContnet', 'ImgContnet');  
      }
    } else if ($(this).index() == 1) {
      if(index==0){
        index=$(this).index();
        nextStep('ImgContnet', 'details')
      }else if(index==1){
        index=$(this).index();
        return ;
      }else{
        index=$(this).index();
        onStep('VideoContnet', 'details');  
      }
    }else{
      if(index==0){
        index=$(this).index();
        nextStep('ImgContnet', 'VideoContnet')
      }else if(index=1){
        index=$(this).index();
        nextStep('details', 'VideoContnet')
      }else{
        index=$(this).index();
        return ;
      }
    }
  });
  var startTime = '';
  //结束时间
  var endTime = '';
  var form = layui.form;
  //   时间选择器
  var laydate = layui.laydate;
  laydate.render({
    elem: '#itemrs1',
    range: true,
    done: function (value, date, endDate) {
      console.log(value); //得到日期生成的值，如：2017-08-18
      timerKey = value.split(' - ');
      console.log(timerKey);
      startTime = timerKey[0];
      endTime = timerKey[1];
    }
  });

  var startTime2 = '';
  //结束时间
  var endTime2 = '';
  laydate.render({
    elem: '#itemrs2',
    range: true,
    done: function (value, date, endDate) {
      console.log(value); //得到日期生成的值，如：2017-08-18
      timerKey = value.split(' - ');
      console.log(timerKey);
      startTime2 = timerKey[0];
      endTime2 = timerKey[1];
    }
  });
  var startTime3 = '';
  //结束时间
  var endTime3 = '';
  laydate.render({
    elem: '#itemrs3',
    range: true,
    done: function (value, date, endDate) {
      console.log(value); //得到日期生成的值，如：2017-08-18
      timerKey = value.split(' - ');
      console.log(timerKey);
      startTime3 = timerKey[0];
      endTime3 = timerKey[1];
    }
  });
  $('.videoList video').click(function () {
    // console.log($(this))
    $('.playVideo video').attr('src', $(this).attr('src'))
    $('.videoPlay').fadeIn();
  });


  // 关闭视频弹窗
  $('.mask').click(function () {
    $('.videoPlay').fadeOut(function () {
      $('.playVideo video').attr('src', '')
    });
  });
  // 添加图片弹出框
  // 0为添加 1为编辑
  // var ImgIndex = null;
  $('.ImgContnet .add-btn').click(function () {
    popupShow('addImgCont', 'addImgBox')
  })
  // 关闭添加图片
  $('.addImgFooter .cancel-btn').click(function () {
    popupHide('addImgCont', 'addImgBox')
  })
  // 添加视频弹出框
  $('.VideoContnet .add-btn').click(function () {
    popupShow('addVideoCont', 'addVideoBox')
  });
  // 关闭添加视频
  $('.addVideoFooter .cancel-btn').click(function () {
    popupHide('addVideoCont', 'addVideoBox')
  })

  var table = layui.table,
    advertisingLis = table.render({
      elem: '#ImgData',
      method: 'post',
      url: '/api/good_material/getGoodMaterial',
      contentType: "application/json",
      headers: {
        token,
      },
      cols: [[
        { type: 'checkbox', },
        { field: 'img', width: 150, title: '图片', templet: "#imgtmp" },
        { field: 'name', width: 180, title: '图片名称', },
        {
          field: 'status', width: 180, title: '审核状态', templet: function (d) {
            return d.status == 0 ? '未审核' : d.status == 1 ? '待审核' : d.status == 2 ? '审核通过' : '审核不通过'

          }
        },
        { field: 'number', width: 200, title: '图片编号', },
        { field: 'publishTime', width: 180, title: '发布时间', sort: true },
        { field: 'addUser', width: 150, title: '发布人', },
        // {field:'operation', width:120, title: 'caozuo', sort: true, fixed: 'right'}
        { field: 'operation', width: 150, title: '操作', toolbar: '#barDemoImg', },
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
            "msg": res.msg, //解析提示文本
          }
        }

      },
      where: {
        conditionFour: '0'
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
  // 监听图片操作部分
  var ImgDAtaVal = null;
  var tableData = null;
  table.on('tool(ImgData)', function (obj) {
    console.log(obj)
    ImgDAtaVal = obj.data;
    if (obj.event == 'edit') {
      popupShow('editImgCont', 'editBox');
      $('.editImgCont .playHeader span').html('编辑商品图片')
      $('.editBody label').html('图片名称：')
      $('.FlexInputWidth input[name="EidtImgNane"]').val(obj.data.name);
      tableData = advertisingLis;
    } else {
      popupShow('videoPlay', 'playBox');
      $('.playBody div').html(`<img src="${ImgDAtaVal.img}" alt="">`)
    }
  });
  // 修改图片、视频
  $('.editImgBtn').click(function () {
    var dataArray = [];
    if ($('.FlexInputWidth input[name="EidtImgNane"]').val()) {
      var dataobj = {
        number: ImgDAtaVal.number,
        name: $('.FlexInputWidth input[name="EidtImgNane"]').val()
      };
      dataArray.push(dataobj)
      $.ajax({
        type: 'post',
        url: '/api/good_material/updateGoodMaterial',
        headers: {
          "Content-Type": "application/json",
          token,
        },
        data: JSON.stringify({
          data: dataArray
        }),
        success: function (res) {
          console.log(res)
          if (res.code == 200) {
            popupHide('editImgCont', 'editBox')
            layer.msg(res.message, { icon: 1 });
            setTimeout(() => {
              tableData.reload({
                where: {}
              })
            }, 200)
          } else if (res.code == 403) {
            window.parent.location.href = "../login/login.html";
          } else {
            popupHide('editImgCont', 'editBox');
            layer.msg(res.message, { icon: 2 });
          }
        }
      })
    } else {
      layer.msg('名称不能为空', { icon: 7 });
    }
  })

  // 图片查询
  $('.ImgQueyuBtnClick').click(function () {
    advertisingLis.reload({
      where: {
        conditionThree: $('.key-contnet input[name="KeyImgName"]').val(),
        conditionFour: '0',
        condition: startTime,
        conditionTwo: endTime
      }
    })
  });
  // 视频查询
  $('.VideoQueryBtnClick').click(function () {
    videoTable.reload({
      where: {
        conditionThree: $('.key-contnet input[name="keyVideoName"]').val(),
        conditionFour: '1',
        condition: startTime2,
        conditionTwo: endTime2
      }
    })
  });
  // 详情图片查询
  $('.detailsImgQueyuBtnClick').click(function(){
    detailsTable.reload({
      where: {
        conditionThree: $('.details input[name="KeyImgName"]').val(),
        conditionFour: '2',
        condition: startTime3,
        conditionTwo: endTime3
      }
    })
  })
  var videoTable = table.render({
    elem: '#VideoData',
    method: 'post',
    url: '/api/good_material/getGoodMaterial',
    contentType: "application/json",
    headers: {
      token,
    },
    cols: [[
      // { field: 'Img', width: 150, title: '素材图',templet: "" },
      { type: 'checkbox', },
      { field: 'name', width: 180, title: '视频名称', },
      {
        field: 'name', width: 180, title: '审核状态', templet: function (d) {
          return d.status == 0 ? '未审核' : d.status == 1 ? '待审核' : d.status == 2 ? '审核通过' : '审核不通过'
        }
      },
      { field: 'number', width: 200, title: '视频编号', },
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
      conditionFour: '1'
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
  // 监听视频操作
  table.on('tool(VideoData)', function (obj) {
    console.log(obj);
    ImgDAtaVal = obj.data;
    if (obj.event == 'edit') {
      popupShow('editImgCont', 'editBox');
      $('.editImgCont .playHeader span').html('编辑商品视频');
      $('.editBody label').html('视频名称：');
      $('.FlexInputWidth input[name="EidtImgNane"]').val(obj.data.name);
      tableData = videoTable;
    } else {
      popupShow('videoPlay', 'playBox');
      $('.playBody div').html(`<video src="${ImgDAtaVal.img}" controls="controls"></video>`)
    }
  })

  // 取消
  $('.editCancelBtn').click(function () {
    popupHide('editImgCont', 'editBox')
  });

  // 剪切图片弹出
  $('.uploadBtn').click(function () {
    $('.ImgCropping').fadeIn();
    $('.tailoring-container').fadeIn();
  });

  // 图片添加确定
  $('.ImgBtn').click(function () {
    var ImgVal = form.val("ImgData");
    if (ImgVal.ImgNane) {
      if (addGoodsImg) {
        $.ajax({
          type: 'post',
          url: '/api/good_material/saveGoodMaterial',
          headers: {
            "Content-Type": "application/json",
            token,
          },
          data: JSON.stringify({
            attribute: '0',
            img: addGoodsImg,
            name: ImgVal.ImgNane,
          }),
          success: function (res) {
            console.log(res)
            if (res.code == 200) {
              popupHide('addImgCont', 'addImgBox');
              $('.FlexInputWidth ingpu[name="ImgNane"]').val('')
              layer.msg(res.message, { icon: 1 });
              advertisingLis.reload({
                where: {}
              })
            } else if (res.code == 403) {
              window.parent.location.href = "../login/login.html";
            } else {
              layer.msg(res.message, { icon: 2 });
            }
          }
        })
      } else {
        layer.msg('图片不能为空', { icon: 7 });
      }
    } else {
      layer.msg('图片名称不能为空', { icon: 7 });
    }
  });

  // 选择视频
  var videoSrc = null;
  $('.uploadVideoChange').change(function (e) {
    console.log(e);
    var that = this;
    var uploadVideo = new FormData();
    uploadVideo.append('file', e.target.files[0]);
    $.ajax({
      type: 'post',
      url: '/api/fileUpload',
      processData: false,
      contentType: false,
      headers: {
        token,
      },
      data: uploadVideo,
      success: function (res) {
        console.log(res)
        if (res.code == 0) {
          videoSrc = res.data.src
          $('.uploadVideo').fadeIn();
          $('.uploadVideo video').attr('src', res.data.src)
        } else {
          layer.msg(res.message, { icon: 7 });
        }
      }
    })
  })
  // 视频添加确定
  $('.addVideoBtn').click(function () {
    if ($('.FlexInputWidth input[name="VideoName"]').val()) {
      if (videoSrc) {
        $.ajax({
          type: 'post',
          url: '/api/good_material/saveGoodMaterial',
          headers: {
            "Content-Type": "application/json",
            token,
          },
          data: JSON.stringify({
            attribute: '1',
            img: videoSrc,
            name: $('.FlexInputWidth input[name="VideoName"]').val(),
          }),
          success: function (res) {
            console.log(res)
            if (res.code == 200) {
              popupHide('addVideoCont', 'addVideoBox');
              $('.FlexInputWidth input[name="VideoName"]').val('');
              videoSrc=null;
              $('.uploadVideo').fadeIn();
              layer.msg(res.message, { icon: 1 });
              videoTable.reload({
                where: {}
              })
            } else if (res.code == 403) {
              window.parent.location.href = "../login/login.html";
            } else {
              layer.msg(res.message, { icon: 2 });
            }
          }
        })
      } else {
        layer.msg('请上传视频', { icon: 7 });
      }
    } else {
      layer.msg('视频名称不能为空', { icon: 7 });
    }
  });

  // 批量删除
  // 1为图片2为视频
  $('.delBtn').click(function () {
    console.log($(this).attr('typeId'))
    var typeID = $(this).attr('typeId')
    var checkStatus = null;
    var tableIV = null;
    if ($(this).attr('typeId') == 0) {
      checkStatus = table.checkStatus('ImgListData');
      tableIV = advertisingLis;
    } else if($(this).attr('typeId') == 1){
      checkStatus = table.checkStatus('VideoListData');
      tableIV = videoTable;
    }else{
      checkStatus=table.checkStatus('detailsId');
      tableIV=detailsTable;
    }
    console.log(checkStatus)
    if (checkStatus.data.length > 0) {
      layer.confirm('确定删除？', function (index) {
        layer.close(index);
        $('.mask').fadeIn();
        $('.maskSpan').addClass('maskIcon')
        var delID = [];
        checkStatus.data.forEach((ele, index) => {
          var numberList = {
            number: ele.number
          }
          delID.push(numberList)
        });
        console.log(delID)
        setTimeout(() => {
          $.ajax({
            type: 'post',
            url: '/api/good_material/deleteGoodMaterial',
            headers: {
              "Content-Type": "application/json",
              token,
            },
            data: JSON.stringify({
              data: delID
            }),
            success: function (res) {
              console.log(res)
              $('.mask').fadeOut();
              $('.maskSpan').removeClass('maskIcon')
              if (res.code == 200) {
                layer.msg(res.message, { icon: 1 });
                tableIV.reload({
                  where: {
                    conditionFour: typeID
                  }
                })
              } else if (res.code == 201) {
                layer.msg(res.message, { icon: 2 });
              } else if (res.code == 202) {
                layer.msg(res.message, { icon: 7 });
                tableIV.reload({
                  where: {
                    conditionFour: typeID
                  }
                })
              } else if (res.code == 403) {
                window.parent.location.href = "login.html";
              }
            }
          })
        }, 1000)
      })
    } else {
      layer.msg('请选择需要删除的图片或视频', { icon: 7 });
    }
  });
  // 提交审核
  $('.submitAuditBtn').click(function () {
    var checkStatusList = null;
    var tableType = null;
    var that = this;
    var checkList = [];
    if ($(this).attr('typeId') == 0) {
      checkStatusList = table.checkStatus('ImgListData');
      tableType = advertisingLis;
    } else if($(this).attr('typeId') == 1) {
      checkStatusList = table.checkStatus('VideoListData');
      tableType = videoTable;
    }else{
      checkStatusList = table.checkStatus('detailsId');
      tableType = detailsTable;
    }
    if (checkStatusList.data.length > 0) {
      $('.mask').fadeIn();
      $('.maskSpan').addClass('maskIcon');
      console.log(checkStatusList)
      checkStatusList.data.forEach((item, index) => {
        var submiObj = {
          number: item.number,
          status: '1'
        };
        checkList.push(submiObj)
      });
      console.log(checkList)
      setTimeout(() => {
        goodsAudit('1', checkList, tableType, $(that).attr('typeId'));
      }, 1000)
    } else {
      layer.msg('请选择需要提交审核的图片或视频', { icon: 7 });
    }
  });

  // 审核通过和审核不通过
  $('.auditBtn').click(function () {
    var checkStatusList = null;
    var tableType = null;
    var that = this;
    var auditList = [];
    if ($(this).attr('typeId') == 0) {
      checkStatusList = table.checkStatus('ImgListData');
      tableType = advertisingLis;
    } else if($(this).attr('typeId') == 1){
      checkStatusList = table.checkStatus('VideoListData');
      tableType = videoTable;
    }else {
      checkStatusList = table.checkStatus('detailsId');
      tableType = detailsTable;
    }

    if (checkStatusList.data.length > 0) {
      layer.confirm($(that).attr('type') == 2 ? '确定审核通过' : '确定审核不通过？', function (index) {
        layer.close(index);
        $('.mask').fadeIn();
        $('.maskSpan').addClass('maskIcon');
        checkStatusList.data.forEach((item, index) => {
          var submiObj = {
            number: item.number,
            status: $(that).attr('type')
          };
          auditList.push(submiObj)
        });
        setTimeout(() => {
          goodsAudit('0', auditList, tableType, $(that).attr('typeId'));
        }, 1000)
      })
    } else {
      layer.msg('请选择需要提交审核的图片或视频', { icon: 7 });
    }
  })

  // 提交审核，审核通过，审核不通过方法
  function goodsAudit(type, data, eleTable, conditionFour) {
    $.ajax({
      type: 'post',
      url: '/api/good_material/updateGoodMaterial',
      headers: {
        "Content-Type": "application/json",
        token,
      },
      data: JSON.stringify({
        data,
        type,
      }),
      success: function (res) {
        $('.mask').fadeOut();
        $('.maskSpan').removeClass('maskIcon');
        if (res.code == 200) {
          layer.msg(res.message, { icon: 1 });
          eleTable.reload({
            where: {
              conditionFour,
            }
          })
        } else if (res.code == 201) {
          layer.msg(res.message, { icon: 2 });
        } else if (res.code == 202) {
          layer.msg(res.message, { icon: 7 });
          eleTable.reload({
            where: {
              conditionFour,
            }
          })
        } else if (res.code == 403) {
          window.parent.location.href = "login.html";
        }
      }
    })
  };



  // 剪切图片弹出部分
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
  var addGoodsImg = null;
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
            addGoodsImg = res.data.src;
            $('#GoodsImg').attr("src", addGoodsImg);
            $('.ImgCropping').fadeOut();
            $('.upload-list').fadeIn();
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
  });


  // 关闭弹窗
  $('.playHeader .close').click(function () {
    $(this).parent().parent().addClass('margin0')
    $(this).parents('.maskContnet').fadeOut();
  });



  var detailsTable = table.render({
    elem: '#detailsImgData',
    method: 'post',
    url: '/api/good_material/getGoodMaterial',
    contentType: "application/json",
    headers: {
      token,
    },
    cols: [[
      { type: 'checkbox', },
      { field: 'img', width: 150, title: '图片', templet: "#detailsImgtmp" },
      { field: 'name', width: 180, title: '图片名称', },
      {
        field: 'status', width: 180, title: '审核状态', templet: function (d) {
          return d.status == 0 ? '未审核' : d.status == 1 ? '待审核' : d.status == 2 ? '审核通过' : '审核不通过'

        }
      },
      { field: 'number', width: 200, title: '图片编号', },
      { field: 'publishTime', width: 180, title: '发布时间', sort: true },
      { field: 'addUser', width: 150, title: '发布人', },
      // {field:'operation', width:120, title: 'caozuo', sort: true, fixed: 'right'}
      { field: 'operation', width: 150, title: '操作', toolbar: '#barDemoImg', },
    ]]
    , page: true
    , id: 'detailsId'
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
          "msg": res.msg, //解析提示文本
        }
      }

    },
    where: {
      conditionFour: '2'
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

  $('.details .add-btn').click(function(){
    popupShow('addDetailsImgCont','addDetailsImgBox');
  });
  $('.addDetailsImgCont input[name="fileDetails"]').change(function(e){
    var that=this;
    var upDetails=new FormData();
    upDetails.append('file', e.target.files[0]);
    $.ajax({
      type: 'post',
      url: '/api/fileUpload',
      processData: false,
      contentType: false,
      headers: {
        token,
      },
      data: upDetails,
      success: function (res) {
        console.log(res)
        $(that).val('');
        if (res.code == 0) {
          videoSrc = res.data.src
          $('.upload-list2').fadeIn();
          $('#GoodsDetailsImg').attr('src', res.data.src)
        } else {
          layer.msg(res.message, { icon: 7 });
        }
      }
    })
  });
  // 确定添加详情图片
  $('.detailsImgBtn').click(function(){
    if($('.addDetailsImgBody input[name="detailsImgNane"]').val()){
      if( $('#GoodsDetailsImg').attr('src')){
        $.ajax({
          type: 'post',
          url: '/api/good_material/saveGoodMaterial',
          headers: {
            "Content-Type": "application/json",
            token,
          },
          data: JSON.stringify({
            attribute: '2',
            img: $('#GoodsDetailsImg').attr('src'),
            name: $('.addDetailsImgBody input[name="detailsImgNane"]').val(),
          }),
          success: function (res) {
            console.log(res)
            if (res.code == 200) {
              popupHide('addDetailsImgCont','addDetailsImgBox');
              $('.addDetailsImgBody input[name="detailsImgNane"]').val('')
              $('.upload-list2').fadeOut();
              $('#GoodsDetailsImg').attr('src', '')
              layer.msg(res.message, { icon: 1 });
              detailsTable.reload({
                where: {}
              })
            } else if (res.code == 403) {
              window.parent.location.href = "../login/login.html";
            } else {
              layer.msg(res.message, { icon: 2 });
            }
          }
        })
      }else{
        layer.msg('请上传图片', { icon: 7 });
      }
    }else{
      layer.msg('请输入图片', { icon: 7 });
    }
  });

  table.on('tool(detailsImgData)', function (obj) {
    console.log(obj)
    ImgDAtaVal = obj.data;
    if (obj.event == 'edit') {
      popupShow('editImgCont', 'editBox');
      $('.editImgCont .playHeader span').html('编辑详情图片')
      $('.editBody label').html('图片名称：')
      $('.FlexInputWidth input[name="EidtImgNane"]').val(obj.data.name);
      tableData = detailsTable;
    } else {
      popupShow('videoPlay', 'playBox');
      $('.playBody div').html(`<img src="${ImgDAtaVal.img}" alt="">`)
    }
  })
})