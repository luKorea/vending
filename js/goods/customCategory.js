layui.use(['table', 'form', 'layer',], function () {
    var $ = layui.jquery;
    var table = layui.table;
    //数据表格
 var tableIns= table.render({
        elem: '#tableTest'
        ,url:`/api//classify/findAll`
        ,method:'post'
        ,contentType: 'application/json'
        , cols: [[
            { field: 'classifyName', width: 150, title: '类型名称', sort: true },
            { field: 'remark', width: 150, title: '类型备注'},
            { field: 'type', width: 180, title: '使用机型'},
            { field: 'user', width: 180, title: '商户名', sort: true },
            { field: 'classifyTime', width: 160, title: '添加时间', sort: true },
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
    $('.query-btn').click(function(){
        tableIns.reload({
            where:{
                classifyName:$('.keyText').val()
            }
        })
    })

    // 监听操作删除
  var indexFlag = null;
  var operationId = null;
  table.on('tool(test)', function (obj) {
    // 操作事件
    if (obj.event === 'add') {
      var singleData = obj.data;
      console.log(singleData)
   
   
    } else if (obj.event === 'delete') {
      console.log(obj)
      layer.confirm('真的删除行么', function (index) {
        // obj.del();
        // layer.close(index);
        Goodsdel(obj.data.classifyId, 2, obj, index);
      });

    } else {
      console.log(obj)
    }
  });
})                                                      