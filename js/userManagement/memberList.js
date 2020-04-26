layui.use(['table','form'], function () {
    var $ = layui.jquery;
    var table = layui.table;
    var token=sessionStorage.token;
    var d=JSON.stringify({
        'pageName': 'pageNum',
          'limitName': 'pageSize'
    })
    var tableIns = table.render({
        elem: '#tableTest'
        , url: `/api/user/findUser`
        // , method: 'get',
        // ,contentType: "application/json",
        ,headers: {
          token,
        },
        cols: [[
            { field: 'userName', width: 200, title: '账号' },
            { field: 'name', width: 150, title: '姓名' },
            { field: 'phone', width: 150, title: '手机号' },
            { field: 'addTime', width: 200, title: '添加时间', sort: true  },
            { field: 'open', width: 150, title: '是否启用' , templet: function (d) {
                return d.open == 0 ? '不启用' : '启用'
              }
            },
            { field: 'roleSign', width: 150, title: '终端管理员', templet: function (d) {
                return d.roleSign == 0 ? '否' : '是'
              }
             },
            { field: 'operation', position: 'absolute', right: 0, width: 200, title: '操作', toolbar: '#barDemo' },
        ]]
        , id: 'tableId'
        , page: true
        , loading: true
        // ,method:'post'
        ,limits: [10,20,50]
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
              "msg": res.message, //解析提示文本
              "count": res.data.total, //解析数据长度
              "data": res.data.list //解析数据列表
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
      var uuID=null;
    //监听工具条
    table.on('tool(test)', function (obj) {
        var data = obj.data;
        if (obj.event === 'detail') {
            layer.msg('ID：' + data.id + ' 的查看操作');
        } else if (obj.event === 'delete') {
            layer.confirm('确定删除？', function (index) {
                obj.del();
                layer.close(index);
            });
        } else if (obj.event === 'edit') {
            layer.alert('编辑行：<br>' + JSON.stringify(data))
        }
    });
    $('.demoTable .layui-btn').on('click', function () {
        var type = $(this).data('type');
        active[type] ? active[type].call(this) : '';
    });

    var form = layui.form;

    var informationType=null;
    // type 'add' edit 
    //点击添加成员事件
    $('.addBtn').click(function(){
      $('.MemberOperation').fadeIn();
      informationType=$(this).attr('typeId');
      uuID=null;
    });
    // 取消事件
    $('.cancel_btn').click(function(){
      $('.MemberOperation').fadeOut();
    });

    // 提交事件
    $('.submit_btn').click(function(){
      var urlApi=null;
      if(informationType=='add'){
        urlApi='/api/user/saveUser'
      }else{
        urlApi='/api/user/updateUser'
      }
      var informData=form.val("information");
      var openStart =informData.startThe?1:0;
      var roleSignStart=informData.administrator?1:0;
      if(urlApi){
        $.ajax({
          type:'post',
          url:urlApi,
          headers: {
            "Content-Type": "application/json",
            token,
          },
          data:{
            UUId:uuID,
            userName:informData.userName,
            name:informData.name,
            userPwd:informData.userPwd,
            alonePwd:informData.alonePwd,
            phone:informData.phone,
            cardId:informData.cardId,
            open:openStart,
            roleSign:roleSignStart
          },
          success:function(res){
            console.log(res)
          }
        })
      }
    })
    
});