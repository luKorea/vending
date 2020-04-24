layui.use(['table', 'form', 'layer',], function () {
  var $ = layui.jquery;
  var table = layui.table;
  var layer = layui.layer;
  //数据表格
  var token = sessionStorage.token;
  var tableIns = table.render({
    elem: '#tableTest'
    , url: `/api//classify/findAll`
    , method: 'post'
    , contentType: 'application/json'
    , headers: {
      token,
    }
    , cols: [[
      { field: 'rank', width: 150, title: '类目排序', sort: true },
      { field: 'classifyName', width: 150, title: '类目名称', sort: true },
      { field: 'remark', width: 150, title: '类目备注' },
      // { field: 'type', width: 180, title: '使用机型'},
      { field: 'userName', width: 200, title: '创建人', templet: function (d) {
        return d.user.userName != null ? d.user.userName : ""
      }},  // { field: 'users', width: 180, title: '商户名', sort: true }, //templet: '<div>{{d.user.userName}}</div>'      
      { field: 'classifyTime', width: 200, title: '创建时间', sort: true },
      { field: 'users ', width: 160, title: '最后操作人' },
      { field: 'users ', width: 200, title: '最后操作时间' , sort: true },
      { field: 'operation', position: 'absolute', right: 0, width: 200, title: '操作', toolbar: '#barDemo' }
    ]]
    , id: 'tableId'
    , page: true
    , loading: true
    , request: {
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
    $('.addClass').fadeIn();
  })
  $('.cancel-btn').click(function () {
    $('.addClass').fadeOut();
  })
  var form = layui.form;

  // 确定添加
  $('.determine-btn').click(function () {
    var addVal = form.val("aDDValData");
    if (addVal.addTypeName) {
      if (addVal.sorting) {
        $.ajax({
          type: 'post',
          url: `/api/classify/saveClassify`,
          headers: {
            "Content-Type": "application/json",
            token,
          },
          data: JSON.stringify({
            type: addVal.terminalType,
            classifyName: addVal.addTypeName,
            remark: addVal.addNote,
            rank: addVal.sorting,
          }),
          success: function (res) {
            if (res.code == 200) {
              layer.msg('添加成功');
              tableIns.reload({
                where: {

                }
              })
              $('.addClass').fadeOut();
            }
          }
        })
      } else {
        layer.msg('请填写类目排序');
      }
    } else {
      layer.msg('请填写类型名称');
    }
  })
  // 监听操作
  var editData=null;
  table.on('tool(test)', function (obj) {
    // 操作事件
     editData = obj.data;
    if (obj.event === 'edit') {
      $('.editClass').fadeIn();
      form.val("editValData", {
        "addTypeName": editData.classifyName,
        "addNote": editData.remark,
        "sorting":editData.rank
      })    
    } else if (obj.event === 'delete') {
      layer.confirm('确定删除？', function (index) {
        // obj.del();
        // layer.close(index);
        Goodsdel(editData.classifyId, 2, obj, index);
      });

    }
  });
// 确定修改
  $('.editDetermine-btn').click(function () {
    var editInputVal = form.val("editValData");
    if (editInputVal.addTypeName) {
      if (editInputVal.sorting) {
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
            rank:editInputVal.sorting,
          }),
          success: function (res) {
            if (res.code == 200) {
              tableIns.reload({
                where: {

                }
              })
              layer.msg('修改成功');
              // alert(1)
              $('.editClass').fadeOut();
            } else {
              layer.msg('操作失败');
            }
          }
        })
      } else {
        layer.msg('排序不能为空');
      }
    } else {
      layer.msg('请填写类型名称');
    }
  })

  $('.editCancel-btn').click(function () {
    $('.editClass').fadeOut();
  })
})                                                      