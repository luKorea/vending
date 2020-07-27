layui.use(['table', 'form', 'layer', 'tree'], function () {
  var $ = layui.jquery;
  table = layui.table,
    layer = layui.layer,
    tree = layui.tree,
    sessionStorage.classTag = sessionStorage.machineID,
    rank = null,
    //数据表格
    token = sessionStorage.token,
    tableIns = table.render({
      elem: '#tableTest'
      , url: `/api/classify/findAll`
      , method: 'post'
      , contentType: 'application/json'
      , headers: {
        token,
      }
      , cols: [[
        { field: '1', width: 80, title: '', templet: "#imgtmp", event: 'rank' },
        { field: 'rank', width: 80, title: '排序', sort: true },
        { field: 'classifyName', width: 150, title: '类目名称', sort: true },
        { field: 'remark', width: 150, title: '备注' },
        // { field: 'type', width: 180, title: '使用机型'},
        {
          field: 'user', width: 150, title: '创建人', templet: function (d) {
            return d.user != null ? d.user.userName : ''
          }
        },  // { field: 'users', width: 180, title: '商户名', sort: true }, //templet: '<div>{{d.user.userName}}</div>'      
        {
          field: 'classifyTime', width: 200, title: '创建时间', sort: true
        },
        {
          field: 'users', width: 150, title: '最后操作人', templet: function (d) {
            return d.user != null ? d.user.lastUser : ''
          }
        },
        {
          field: 'lastTime', width: 190, title: '最后操作时间', sort: true
        },
        { field: 'operation', position: 'absolute', right: 0, width: 200, title: '操作', toolbar: '#barDemo' }
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
        if(res.code==405){
          $('.hangContent').show();
        }
      }
    });

  // 查询事件
  $('.query-btn').click(function () {
    tableIns.reload({
      where: {
        classifyName: $('.keyText').val()
      }
    })
  })
  var indexFlag = null;
  var operationId = null;
  $('.add-btn').click(function () {
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
      // if (addVal.sorting) {
      $.ajax({
        type: 'post',
        url: `/api/classify/saveClassify`,
        headers: {
          "Content-Type": "application/json",
          token,
        },
        data: JSON.stringify({
          // type: addVal.terminalType,
          classifyName: addVal.addTypeName,
          remark: addVal.addNote,
          merchantId: Number(sessionStorage.machineID)
          // rank: addVal.sorting,
        }),
        success: function (res) {
          popupHide('addClass', 'addContent');
          if (res.code == 200) {
            layer.msg(res.message, { icon: 1 });
            tableIns.reload({
              where: {

              }
            })
            // $('.addClass').fadeOut();
            loadingAjax('/refreshGoods','post','',sessionStorage.token).then(res=>{}).catch(err=>{})
          } else if (res.code == 403) {
            window.parent.location.href = "login.html";
          } else {
            layer.msg(res.message, { icon: 2 });
          }
        }, error: function (err) {
          layer.msg('服务器请求超时', { icon: 2 });
        }
      })
      // } else {
      //   layer.msg('请填写类目排序');
      // }
    } else {
      layer.msg('请填写类型名称');
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
        // "sorting":editData.rank
      })
    } else if (obj.event === 'delete') {
      console.log(obj)
      layer.confirm('确定删除？', function (index) {
        // obj.del();
        // layer.close(index);
        Goodsdel(editData, 2, obj, index,tableIns,sessionStorage.classTag);
      });

    } else if (obj.event == 'rank') {
      console.log(obj)
      var rankObj = JSON.stringify({
        topId: rank[obj.data.rank - 1].classifyId,
        bottomId: rank[obj.data.rank - 2].classifyId,
        merchantId: sessionStorage.classTag
      })
      loadingAjax('/api/classify/sortClassify', 'post', rankObj, token, '', '', '', layer).then((res) => {
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
      // if (editInputVal.sorting) {
      $.ajax({
        type: 'post',
        url: `/api/classify/updateClassify`,
        headers: {
          "Content-Type": "application/json",
          token,
        },
        data: JSON.stringify({
          classifyId: editData.classifyId,
          classifyName: editInputVal.addTypeName,
          remark: editInputVal.addNote,
          merchantId: Number(sessionStorage.machineID)
          // rank:Number(editInputVal.sorting),
        }),
        success: function (res) {
          popupHide('editClass', 'editContent');
          if (res.code == 200) {
            layer.msg(res.message, { icon: 1 });
            tableIns.reload({
              where: {

              }
            })
            loadingAjax('/refreshGoods','post','',sessionStoragetoken).then(res=>{}).catch(err=>{})
          } else if (res.code == 403) {
            window.parent.location.href = "login.html";
          }
          else {
            layer.msg(res.message, { icon: 2 });
          }
        }
      })
      // } else {
      //   layer.msg('排序不能为空');
      // }
    } else {
      layer.msg('请填写类型名称');
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
  treeFun(tree, 'testGoods', tableIns, dataList, 'merchantId','','','','true');

  // 刷新页面
  $('.refreshBtn').click(function () {
    location.reload();
  });
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
  })
})                                                      