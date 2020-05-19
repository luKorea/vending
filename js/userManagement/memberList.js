layui.use(['table','form'], function () {
    var $ = layui.jquery;
    var table = layui.table;
    var layer=layui.layer;
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
            { field: 'userName', width: 180, title: '用户名' },
            { field: 'name', width: 150, title: '姓名' },
            { field: 'phone', width: 150, title: '手机号' },
            { field: '1', width: 150, title: '创建人',   },
            { field: 'addTime', width: 180, title: '创建时间', sort: true  },
            { field: '1', width: 150, title: '最后操作人',   },
            { field: '2', width: 180, title: '最后操作时间', sort: true  },
            { field: 'open', width: 150, title: '状态' , templet: function (d) {
                return d.open == 0 ? '不启用' : '启用'
              }
            },
            { field: 'roleSign', width: 100, title: '终端管理员', templet: function (d) {
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
              "msg": res.message,   //解析提示文本
            }
          }
    
        },
        response: {
          statusCode: 200 //规定成功的状态码，默认：0
        },
        done: function (res) {
          if (res.code == 403) {
            window.history.go(-1)
          }
        }
      });
      var uuID=null;
      var indexFlag=null;
    //监听工具条
    table.on('tool(test)', function (obj) {
        var data = obj.data;
        // console.log(data)  
        if (obj.event === 'operation') {
            // layer.msg('ID：' + data.uuid + ' 的查看操作');
            $('.anUp').slideUp();
            if(indexFlag!=data.uuid){
              indexFlag=data.uuid;
              uuID=data.uuid;
              $(this).siblings('.anUp').slideDown()
            }else{
              indexFlag=null;
            };
            // 点击编辑事件
            $('.GoodsInformation').click(function(){
              $('.OperationHeader span').html('编辑用户')
              informationType=$(this).attr('typeId');
              console.log(informationType)
              $('.MemberOperation').fadeIn();
              $('.anUp').slideUp();
              form.val("information", {
                "userName":data.userName,
                "name":data.name,
                "userPwd":'      ',
                "alonePwd":'      ',
                "phone":data.phone,
                "cardId":data.cardId,
                "startThe":data.open?'on':'',
                "administrator":data.roleSign?'on':''
              })
            })

        } else if (obj.event === 'delete') {

            layer.confirm('确定删除？', function (index) {
                $.ajax({
                  type:'get',
                  url:`/api/user/deleteById`,
                  headers: {
                    token,
                  },
                  data:{
                    id:data.uuid+''
                  },
                  success:function(res){
                    if(res.code==200){
                      layer.msg(res.message);
                      obj.del();
                      layer.close(index);
                    }else if(res.code==403){
                      window.history.go(-1)
                    }else{
                      layer.msg(res.message);
                    }
                  }
                });
            });
        } 
    });
    
    var form = layui.form;

    var informationType=null;
    // type 'add' edit 
    //点击添加成员事件
    $('.addBtn').click(function(){
      $('.MemberOperation').fadeIn();
      informationType=$(this).attr('typeId');
      uuID=null;
      $('.OperationHeader span').html('添加用户')
    });
    // 取消事件
    $('.cancel_btn').click(function(){
      $('.MemberOperation').fadeOut();
      indexFlag=null;
    });

    // 提交事件
    $('.submit_btn').click(function(){
      var informData=form.val("information");
      var urlApi=null;
      // 添加
      if(informationType=='add'){
        if(!(informData.userName&&informData.name&&informData.userPwd&&informData.alonePwd&&informData.phone)){
          layer.msg('带*为必填');
          return ;
        }
        urlApi='/api/user/saveUser'
        // 修改
      }else{
        urlApi='/api/user/updateUser'
      }
      var openStart =informData.startThe?1:0;
      var roleSignStart=informData.administrator?1:0;
      console.log(informData)
      if(urlApi){
        $.ajax({
          type:'post',
          url:urlApi,
          headers: {
            "Content-Type": "application/json",
            token,
          },
          data:JSON.stringify({
            UUId:uuID,
            userName:informData.userName,
            name:informData.name,
            userPwd:informData.userPwd!='      '?informData.userPwd:'',
            alonePwd:informData.alonePwd!='      '?informData.alonePwd:'',
            phone:informData.phone,
            cardId:informData.cardId,
            open:openStart,
            roleSign:roleSignStart
          }),
          success:function(res){
            console.log(res)
            if(res.code==200){
              tableIns.reload({
                where:{

                }
              });
              form.val("information", {
                "userName":'',
                "name":'',
                "userPwd":'',
                "alonePwd":'',
                "phone":'',
                "cardId":'',
              })
              $('.MemberOperation').fadeOut();
              layer.msg(res.message)
            }else if(res.code==403){
              window.history.go(-1)
            }else{
              layer.msg(res.message)
            }
          }
        })
      }
    })
    $('.listInput input[name="phone"]').blur(function(){
      var phone = $(this).val();
      if(phone){
        if(!(/^1[3456789]\d{9}$/.test(phone))){ 
          // alert("手机号码有误，请重填");  
          layer.msg('请填写正确的手机号码');
          $(this).val('')
          return false; 
      } 
      }
      
    });

    // 监听终端权限
    form.on('checkbox(permissions)', function(data){
      console.log(data.elem.checked); //是否被选中，true或者false
      console.log(data.value); //复选框value值，也可以通过data.elem.value得到
  //     form.val("information", {
  //       "aaacc":true
  // });
  var data1 = form.val("information");
  console.log(data1)
    }); 
    
});