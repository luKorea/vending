import '../../MyCss/goods/customCategory.css';
layui.use(['table', 'form', 'layer', 'tree'], function () {
  tooltip('.refreshBtnList', {transition: true, time: 200});
  sessionStorage.classTag = sessionStorage.machineID;
  var table = layui.table,
    layer = layui.layer,
    tree = layui.tree,
    rank = null,
    //数据表格
    token = sessionStorage.token,
    tableIns = table.render({
      elem: '#tableTest'
      , url: `${vApi}/classify/findAll`
      , method: 'post'
      , contentType: 'application/json'
      , headers: {
        token,
      }
      , cols: [[
        { field: '1', width: 80, title: '', templet: "#imgtmp", event: 'rank', align: 'center' },
        { field: 'rank', width: 80, title: '排序', align: 'center' },
        { field: 'classifyName', width: 150, title: '类目名', align: 'center' },
        { field: 'remark', width: 150, title: '备注', align: 'center' },
        // { field: 'type', width: 180, title: '使用机型'},
        {
          field: 'user', width: 150, title: '创建人', align: 'center', templet: function (d) {
            return d.user != null ? d.user.userName : ''
          }
        },  // { field: 'users', width: 180, title: '商户名' }, //templet: '<div>{{d.user.userName}}</div>'      
        {
          field: 'classifyTime', width: 200, title: '创建时间', align: 'center'
        },
        {
          field: 'lastUser', width: 150, title: '最后修改人', align: 'center',
        },
        {
          field: 'lastTime', width: 190, title: '最后修改时间', align: 'center'
        },
        { field: 'operation', align: 'center', position: 'absolute', right: 0, width: 200, title: '操作', toolbar: '#barDemo' }
      ]]
      , id: 'tableId'
      , page: true
      , loading: true
      , request: {
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
        } else if (res.code == 403) {
          window.parent.location.href = "login.html";
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
        rank = res.data;
        permissions();
        if (res.code == 405) {
          $('.hangContent').show();
        }
      }
    });

  // 查询事件
  $('.queryBtn').click(function () {
    tableIns.reload({
      where: {
        // classifyName: $('.keyText').val()
      }
    })
  })
  var indexFlag = null;
  var operationId = null;
  $('.addBtn').click(function () {
    $('.addClass input[name="addTypeName"]').val('');
    $('.addClass input[name="addNote"]').val('')
    popupShow('addClass', 'addContent');
  })
  $('.cancel-btn').click(function () {
    popupHide('addClass', 'addContent')
  })
  var form = layui.form;

  // 确定添加
  $('.determine-btn').click(function () {
    var addVal = form.val("aDDValData");
    if (addVal.addTypeName) {
        var addObj=JSON.stringify({
          classifyName: addVal.addTypeName,
          remark: addVal.addNote,
          merchantId: Number(sessionStorage.machineID)
        });
        $('.mask').fadeIn();
        $('.maskSpan').addClass('maskIcon');
        loadingAjax('/classify/saveClassify','post',addObj,sessionStorage.token,'mask','addClass','addContent',layer).then(res=>{
          layer.msg(res.message, { icon: 1 });
          tableIns.reload({
            where: {}
          })
          loadingAjax('/refreshGoods', 'post', '', sessionStorage.token).then(res => { }).catch(err => { })
        }).catch(err=>{
          layer.msg(err.message, { icon: 2 });
        });
    } else {
      layer.msg('请填写类目名');
    }
  })
  // 监听操作
  var editData = null;
  // 修改排序的商户id

  table.on('tool(test)', function (obj) {
    // 操作事件
    editData = obj.data;
    if (obj.event === 'edit') {
      popupShow('editClass', 'editContent');
      form.val("editValData", {
        "addTypeName": editData.classifyName,
        "addNote": editData.remark,
      })
    } else if (obj.event === 'delete') {
      console.log(obj)
      layer.confirm('确定删除？', function (index) {
        Goodsdel(editData, 2, obj, index, tableIns, sessionStorage.classTag);
      });

    } else if (obj.event == 'rank') {
      console.log(obj)
      var rankObj = JSON.stringify({
        topId: rank[obj.data.rank - 1].classifyId,
        bottomId: rank[obj.data.rank - 2].classifyId,
        merchantId: sessionStorage.classTag
      })
      loadingAjax('/classify/sortClassify', 'post', rankObj, token, '', '', '', layer).then((res) => {
        layer.msg(res.message, { icon: 1 });
        tableIns.reload({
          where: {}
        })
      }).catch((err) => {
        layer.msg(err.message, { icon: 2 });
      })
    }
  });
  // 确定修改
  $('.editDetermine-btn').click(function () {
    var editInputVal = form.val("editValData");
    if (editInputVal.addTypeName) {
      var editObj=JSON.stringify({
        classifyId: editData.classifyId,
        classifyName: editInputVal.addTypeName,
        remark: editInputVal.addNote,
        merchantId: Number(sessionStorage.machineID)
      });
      $('.mask').fadeIn();
      $('.maskSpan').addClass('maskIcon');
      loadingAjax('/classify/updateClassify','post',editObj,sessionStorage.token,'mask','editClass','editContent',layer).then(res=>{
        layer.msg(res.message, { icon: 1 });
        tableIns.reload({
          where: {}
        })
        loadingAjax('/refreshGoods', 'post', '', sessionStorage.token).then(res => { }).catch(err => { })
      }).catch(err=>{
        layer.msg(err.message, { icon: 2 });
      })
    } else {
      layer.msg('请填写类目名');
    }
  })

  $('.editCancel-btn').click(function () {
    popupHide('editClass', 'editContent')
  })

  // 头部×关闭弹窗
  $('.playHeader .close').click(function () {
    $(this).parent().parent().addClass('margin0')
    $(this).parents('.maskContnet').fadeOut();
  });

  var dataList = treeList();
  treeFun(tree, 'testGoods', tableIns, dataList, 'merchantId', '', '', '', 'true');
  // 刷新商户列表
  $('.refreshBtnList').click(function () {
    var dataList1 = treeList();
    if (JSON.stringify(dataList1)  != JSON.stringify(dataList)) {
      dataList = dataList1;
      treeFun(tree, 'testGoods', tableIns, dataList, 'merchantId', '', '', '', 'true');
      tableIns.reload({
        where: {
          merchantId: sessionStorage.machineID,
        }
      })
      layer.msg('已刷新',{icon:1})
    } else {
      layer.msg('已刷新',{icon:1})
    }

  })
  // 刷新页面
  // $('.refreshBtn').click(function () {
  //   // $('.keyText').val('')
  //   tableIns.reload({
  //     where:{
  //       // classifyName:''
  //     }
  //   })
  //   // location.reload();
  // });
  // 收起
  $('.sidebar i').click(function () {
    $('.left-mian').hide();
    $('.on-left').show()
  });
  $('.on-left').click(function () {
    $('.left-mian').show();
    $('.on-left').hide()
  });
  // 监听f5刷新
  $("body").bind("keydown", function (event) {
    if (event.keyCode == 116) {
      f5Fun()
    }
  });

  // function permissions(){
  //   permissionsVal(373,374,372,403).then(res=>{
  //     console.log(res);
  //     res.addFlag?$('.add-btn').removeClass('hide'):$('.add-btn').addClass('hide');
  //     res.editFlag?$('.TEdit').removeClass('hide'):$('.TEdit').addClass('hide');
  //     res.delFlag?$('.TDel').removeClass('hide'):$('.TDel').addClass('hide');
  //     res.fourFlag?$('.rankImg').removeClass('hide'):$('.rankImg').addClass('hide');
  //   }).catch(err=>{
  //     layer.msg('服务器请求超时',{icon:7})
  //   })
  // };
  var addFlag = false,
    editFlag = false,
    delFlag = false,
    fourFlag = false;
  permissionsVal(373, 374, 372, 403).then(res => {
    addFlag = res.addFlag;
    editFlag = res.editFlag;
    delFlag = res.delFlag;
    fourFlag = res.fourFlag;
    permissions();
  }).catch(err => {
    layer.msg('服务器请求超时', { icon: 7 })
  })
  function permissions() {
    addFlag ? $('.addBtn').removeClass('hide') : $('.addBtn').addClass('hide');
    editFlag ? $('.TEdit').removeClass('hide') : $('.TEdit').addClass('hide');
    delFlag ? $('.TDel').removeClass('hide') : $('.TDel').addClass('hide');
    fourFlag ? $('.rankImg').removeClass('hide') : $('.rankImg').addClass('hide');
  };
})                                                      