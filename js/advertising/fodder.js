layui.use([ 'laydate', 'table','layer'], function () {    
        var layer=layui.layer;
    // 日期选择
    var laydate = layui.laydate;
    // laydate.render({
    //     elem: '#test6'
    //     // ,type: 'datetime'
    //     ,range: true    
    //     ,isInitValue: false
    //   });
    laydate.render({
        elem: '#test6',
        range: true,
      });
    var table = layui.table;
    table.render({
        elem: '#moneyData'
        , cols: [[
              {type:'checkbox',},
            { field: 'username', width: 120, title: '微缩图' },
            { field: 'phone', width: 150, title: '素材名', },
            { field: 'CreationTime', width: 100, title: '大小', },
            { field: 'amendTime', width: 130, title: '分辨率', },
            { field: 'bili', width: 150, title: '素材属性', sort: true },
            { field: 'bili', width: 150, title: '素材类别', sort: true },
            { field: 'bili', width: 100, title: '播放时长', sort: true },
            { field: 'bili', width: 160, title: '审核状态', },
            { field: 'bili', width: 160, title: '素材状态', },
            { field: 'bili', width: 160, title: '上传时间', },
            { field: 'jine', width: 150, title: '上传人 ', },
            // { field: 'operation', width: 200, title: '操作', toolbar: '#barDemo',fixed: 'right',right: 0 },
            { field: 'operation', right: 0, width: 200, title: '操作', toolbar: '#barDemo', fixed: 'right' },
        ]],
        data: [
            {
                username: '2222'
                , phone: 'cs45121'
                , CreationTime: '支付宝'
                , amendTime: '99'
                , bili: '1:2'
                ,id:'1'
            },
            {
                username: '2222'
                , phone: 'cs45121'
                , CreationTime: '支付宝'
                , amendTime: '99'
                , bili: '1:2'
                ,id:'2'
            }
        ]
        , page: true
        ,id:'tableId'
    });

    // 上传素材弹出说明框
    $('.uploadBtn').click(function(){
        $('.uploadTitle').fadeIn();
        $('.titleBox').removeClass('margin0')
    });
    // 关闭说明
    $('.titleHeader button').click(function(){
        $('.uploadTitle').fadeOut();
        $('.titleBox').addClass('margin0')
    });

    // 填写上传素材框
    $('.issue').click(function(){
        popupHide('uploadTitle','titleBox');
        popupShow('uploadMaterialCont','uploadMateriaBox');
    });
    // 取消
    $('.uploadMateriaFooter').click(function(){
        popupHide('uploadMaterialCont','uploadMateriaBox');
    })


    // 监听复选框
    table.on('checkbox(moneyData)', function(obj){
        console.log(obj.checked); //当前是否选中状态
        console.log(obj.data); //选中行的相关数据
        console.log(obj.type); //如果触发的是全选，则为：all，如果触发的是单选，则为：one
      });
      
    //   删除文件
    $('.del-btn').click(function(){
        var checkStatus = table.checkStatus('tableId');
        if(checkStatus.data.length>0){
            layer.msg('11', {icon: 2,anim: 1});
        }else{
            layer.msg('请选择要删除的素材', {icon: 7,anim: 1});
            // layer.alert('酷毙了', {icon: 1});
            // layer.load(1); //风格1的加载
        }
    });
    // 收起左边账号事件
    $('.sidebar .layui-icon-left').click(function(){
        $('.aside-left').slideUp(function(){
            $('.layui-icon-right').show();
        }); 
    });
    $('.layui-icon-right').click(function(){
        $('.aside-left').slideDown(function(){
            $('.layui-icon-right').hide();
        }); 
    });
    var indexFlag=null;
    valData=null;
    table.on('tool(moneyData)', function (obj) {
        // console.log(obj)
        valData=obj.data;
        $('.anUp').slideUp();
        if(indexFlag!=valData.id){
            indexFlag=valData.id;
            $(this).siblings('.anUp').slideDown();
        }else{
            indexFlag=null;
        }
    })
    // 预览素材
    $('.previewDetails').click(function(){
        $('.anUp').slideUp();
        indexFlag=null;
        $('.materialPreview').fadeIn();
        $('.previewBox').removeClass('margin0');
    });
    // 关闭预览
    // $('.previewHeader button').click(function(){
    //     $('.previewBox').addClass('margin0');
    //     $('.materialPreview').fadeOut();
    // })
     // 关闭弹窗
     $('.playHeader .close').click(function () {
        $(this).parent().parent().addClass('margin0')
        $(this).parents('.maskContnet').fadeOut();

    });

    // $.ajax({
    //     type:'post',
    //     url:`/api/advertising/saveAdvertising`,
    //     data:JSON.stringify({
    //         name:'粤宝文化',
    //         size:'3',
    //         attribute:'图片',
    //         duration:'20',
    //         status:1,
    //         uid:'1'
    //     }),
    //     headers: {
    //         "Content-Type": "application/json",
    //         token,
    //       },
    //       success:function(res){
    //           console.log(res)
    //       }
    // })
    var form=layui.form;
    form.on('select(myAttribute)', function(data){
        console.log(data.elem); //得到select原始DOM对象
        console.log(data.value); //得到被选中的值
        console.log(data.othis); //得到美化后的DOM对象
      }); 
});