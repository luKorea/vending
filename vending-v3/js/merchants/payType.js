import '../../MyCss/merchants/payType.css'
layui.use(['table', 'form', 'layer'], function () {
    var table = layui.table,
        form = layui.form,
        layer = layui.layer,
        tableIns = table.render({
            elem: '#payTypeList',
            url: `/api/pay/getAllPayType`,
            method: 'post',
            contentType: "application/json",
            headers: {
                token:sessionStorage.token
            },
            cols: [[
                { field: 'logo', width: 180, title: '图标',templet: "#imgtmp", align: 'center' },
                { field: 'name', width: 180, title: '类型名', align: 'center' },
                { field: 'status', width: 180, title: '状态', align: 'center',templet:function(d){
                    return d.status==1?'启用':'禁用'
                }},
                { field: 'update_user', width: 180, title: '最后修改人', align: 'center' },
                { field: 'update_time', width: 180, title: '最后修改时间', align: 'center',templet:function(d){
                    if (d.update_time) {
                        return timeStamp(d.update_time)
                      } else {
                        return '-';
                      }
                }},
                { field: 'operation', fixed: 'right', align: 'center', right: 0, width: 180, title: '操作', toolbar: '#barDemo' },
            ]]
            , id: 'tableId'
            , loading: true,
            where: {
                condition: sessionStorage.machineID
            },
            parseData: function (res) {
                // console.log(res)
                //res 即为原始返回的数据
                if (res.code == 200) {
                    return {
                        "code": res.code, //解析接口状态
                        "msg": res.message, //解析提示文本
                        "count": res.data.total, //解析数据长度
                        "data": res.data //解析数据列表
                    };
                } else if (res.code == 403) {
                    window.parent.location.href = "login.html";
                }
                else {
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
                if (res.code == 405) {
                    $('.hangContent').show();
                }
            }
        });
    $('.addTypeBtn').click(function () {
        popupShow('addpayType', 'addBox')
    })
    $('.listFlex input[name="uploadImg"]').change(function (e) {

    });
    // 刷新页面
    $('.refreshBtn').click(function () {
        location.reload();
    });

    // 监听f5刷新
    $("body").bind("keydown", function (event) {
        if (event.keyCode == 116) {
            f5Fun()
        }
    });
    // 关闭弹窗
  $('.playHeader .close').click(function () {
    $(this).parent().parent().addClass('margin0')
    $(this).parents('.maskContnet').fadeOut();
  });
//   上传图片
  var addImg=null;
  $('.addpayType .listFlex input[name="uploadImg"]').change(function(e){
      var that=this;
    var upDetails = new FormData();
    upDetails.append('file', e.target.files[0]);
    $.ajax({
        type: 'post',
        url: '/api/fileUpload',
        processData: false,
        contentType: false,
        timeout:10000,
        headers: {
          token,
        },
        data: upDetails,
        success: function (res) {
          console.log(res)
          $(that).val('');
          if (res.code == 0) {
            addImg=res.data.src;
            $('.addpayType .logiImg img').prop('src',addImg);
            $('.logiImg').show();
          } else {
            layer.msg(res.message, { icon: 7 });
          }
        },error:function(err){
            layer.msg('服务器请求超时',{icon:2});
        }
      })
  });
// 添加
  $('.addpayType .addCancelBtn').click(function(){
      popupHide('addpayType','addBox')
  })
  $('.addpayType .RdetermineBtn').click(function(){
      if(!$('.addpayType input[name="name"]').val()){
          layer.msg('类型名不能为空',{icon:7});
          return ;
      }
      if(!addImg){
        layer.msg('请上传图标',{icon:7});
        return ;
    }
    var AddType=JSON.stringify({
        logo:addImg,
        name:$('.addpayType input[name="name"]').val()
    });
    loadingAjax('/api/pay/newPayType','post',AddType,sessionStorage.token,'','addpayType','addBox',layer).then(res=>{
        layer.msg('添加成功',{icon:1})
        tableIns.reload({
            where:{}
        })
        $('.addpayType input[name="name"]').val('');
        $('.addpayType .logiImg').hide();
        addImg=null;
    }).catch(err=>{
        console.log(err)
        layer.msg('添加失败',{icon:2})
    })
  });
  var payTypeData=null;
  table.on('tool(payTypeList)', function (obj) {
    payTypeData=obj.data;
    // console.log(obj)
    if (obj.event == 'edit') {
        $('.editpayType input[name="name"]').val(payTypeData.name);
        $('.editpayType .logiImg img').prop('src',payTypeData.logo);
        popupShow('editpayType','editBox')
    }else if(obj.event == 'del'){
        layer.confirm('确定删除？', function (index) {
            layer.close(index);
            var TypeId=JSON.stringify({
                id:payTypeData.id
            });
            loadingAjax('/api/pay/deletePayType','post',TypeId,sessionStorage.token,'','','',layer).then(res=>{
                layer.msg(res.message,{icon:1})
                tableIns.reload({
                    where:{}
                })
                
            }).catch(err=>{
                layer.msg(err.message,{icon:2})
            })
        })
    }else if(obj.event == 'status'){
        layer.confirm(payTypeData.status==1?'确定禁用？':'确定启用？', function (index) {
            layer.close(index);
            var editType=JSON.stringify({
                id:payTypeData.id,
                logo:(payTypeData.name=='微信'||payTypeData.name=='支付宝')?'':payTypeData.logo,
                name:payTypeData.name,
                status:payTypeData.status==1?0:1
            });
         loadingAjax('/api/pay/updatePayType','post',editType,sessionStorage.token,'','editpayType','editBox',layer).then(res=>{
                console.log(res)
                layer.msg(res.message,{icon:1})
                tableIns.reload({
                    where:{}
                })
                
            }).catch(err=>{
                console.log(err)
                layer.msg(err.message,{icon:2})
            })
        })
    }
  });

  $('.editpayType .listFlex input[name="uploadImg"]').change(function(e){
    var that=this;
  var upDetails = new FormData();
  upDetails.append('file', e.target.files[0]);
  $.ajax({
      type: 'post',
      url: '/api/fileUpload',
      processData: false,
      contentType: false,
      timeout:10000,
      headers: {
        token,
      },
      data: upDetails,
      success: function (res) {
        console.log(res)
        $(that).val('');
        if (res.code == 0) {
          $('.editpayType .logiImg img').prop('src',res.data.src);
        } else {
          layer.msg(res.message, { icon: 7 });
        }
      },error:function(err){
          layer.msg('服务器请求超时',{icon:2});
      }
    })
});
// 编辑取消
$('.editpayType .editCancelBtn').click(function(){
    popupHide('editpayType','editBox');
})
//   编辑
$('.editpayType .RdetermineBtn').click(function(){
    if(!$('.editpayType input[name="name"]').val()){
        layer.msg('类型名不能为空',{icon:7});
        return ;
    }
    var editType=JSON.stringify({
        id:payTypeData.id,
        logo:$('.editpayType .logiImg img').prop('src'),
        name:$('.editpayType input[name="name"]').val(),
    });
 loadingAjax('/api/pay/updatePayType','post',editType,sessionStorage.token,'','editpayType','editBox',layer).then(res=>{
        console.log(res)
        layer.msg(res.message,{icon:1})
        tableIns.reload({
            where:{}
        })
        addImg=null;
        
    }).catch(err=>{
        console.log(err)
        layer.msg(err.message,{icon:2})
    })
})
})