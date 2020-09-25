import '../../MyCss/notice/notice.css'
// import E from '../../assets/public/wangEditor.min'
layui.use(['table', 'form', 'layer',], function () {
    var table = layui.table,
        form = layui.form,
        layer = layui.layer,
        token = sessionStorage.token,
        noticeTableIns = table.render({
            elem: '#noticeTable',
            method: 'post',
            url: '/api/notices/getNoticeList',
            contentType: "application/json",
            headers: {
                token: sessionStorage.token
            },
            cols: [[
                { field: 'n_number', width: 200, title: '公告编号' },
                { field: 'title', width: 230, title: '标题' },
                { field: 'isShow', width: 150, title: '是否首页展示', templet:function(d){
                    return d.is_show==1?'是':'否'
                }},
                { field: 'status', width: 150, title: '状态',templet:function(d){
                    return d.n_status==1?'已发布':'草稿箱'
                }},
                { field: 'attach_name', width: 150, title: '附件名', },
                { field: 'attach_url', width: 320, title: '附件地址', },
                { field: 'create_time', width: 180, title: '创建时间',templet:function(d){
                    return timeStamp(d.create_time)
                } },
                { field: 'operation', width: 200, title: '操作', toolbar: '#barDemo' },
            ]],
            id: 'noticeId',
            page: true,
            loading: true,
            request: {
                'pageName': 'pageNum',
                'limitName': 'pageSize'
            },
            where:{
                // merchantId:Number(sessionStorage.machineID) 
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

            }
        })
 
 


    // 关闭弹窗
    $('.playHeader .close').click(function () {
        $(this).parent().parent().addClass('margin0')
        $(this).parents('.maskContnet').fadeOut();
    });
    // f5刷新
    $("body").bind("keydown", function (event) {
        if (event.keyCode == 116) {
            f5Fun()
        }
    });
      // 刷新页面
      $('.refreshBtn').click(function () {
        location.reload();
    });
    // 发布公告按钮
    $('.addPushBtn').click(function(){
        popupShow('addEditCont','modificationBox')
    });
    // 取消添加
    $('.addEditCont .cancelBtn').click(function(){
        popupHide('addEditCont','modificationBox')
    })
    // 上传附件
    $('.addUploadBtn input[name="addUpload"]').change(function(e){
        if(!$(this).val()){
            return ;
        }
        var that = this;
        var upDetails = new FormData();
        upDetails.append('file', e.target.files[0]);
        $('.mask').fadeIn();
        $('.maskSpan').addClass('maskIcon');
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
                $('.mask').fadeOut();
                $('.maskSpan').removeClass('maskIcon');
                $(that).val('')
                if (res.code == 0) {
                    layer.msg('上传成功')
                    $('.addEditCont input[name="address"]').val(res.data.src)
                } else {
                    layer.msg(res.message, { icon: 7 });
                }
            },
            error: function (err) {
                $(that).val('')
                $('.mask').fadeOut();
                $('.maskSpan').removeClass('maskIcon')
                layer.msg('上传失败', { icon: 2 })
            }
        })
    })
    // 删除附件
    $('.addEditCont .delUploadBtn').click(function(){
        layer.confirm('确定删除附件？', function (index) {
                    layer.close(index);
                    $('.addEditCont input[name="address"]').val('');
                    layer.msg('已删除',{icon:1})
                })
       
    })
    // 添加公告富文本部分
    var E = window.wangEditor;
    var addWangEditor = new E('#addWangEditor')
    addWangEditor.customConfig.customUploadImg = function (files, insert) {
        console.log(files)
        var upDetails = new FormData();
        upDetails.append('file', files[0]);
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
                if (res.code == 0) {
                    insert(res.data.src)
                } else {
                    layer.msg(res.message, { icon: 7 });
                }
            },
            error: function (err) {
                layer.msg('上传失败', { icon: 2 })
            }
        })
    }
    addWangEditor.create();
    // 添加预览
    $('.addEditCont .readingBtn').click(function(){
        $('.previewContent .playHeader span').html('公告详情');
        $('.previewContent .previewHtml').html(addWangEditor.txt.html())
        popupShow('previewContent','previewBox')
    })
    // 点击发布公告
    $('.addEditCont .determinePushBtn').click(function(){
        // console.log($('.addEditCont input[name="push"]:checked').val());
        // return ;
        // console.log(addWangEditor.txt.html().length)
        // console.log(addWangEditor.txt.html());
        if(!($('.addEditCont input[name="title"]').val()&&$('.addEditCont input[name="number"]').val())){
            layer.msg('带*号为必填',{icon:7});
            return ;
        }
        if(!addWangEditor.txt.html().length>11){
            layer.msg('公告详情最少五个字',{icon:7});
            return ;
        };
        if((!($('.addEditCont input[name="accessoryName"]').val()&&$('.addEditCont input[name="address"]').val()))&&($('.addEditCont input[name="accessoryName"]').val()||$('.addEditCont input[name="address"]').val())){
            layer.msg('附近名与附件地址必须同时填写');
            return ;
        };
        
        var addPushObj=JSON.stringify({
            n_number:$('.addEditCont input[name="number"]').val(),
            title:$('.addEditCont input[name="title"]').val(),
            content:addWangEditor.txt.html(),
            is_show:Number($('.addEditCont input[name="indexShow"]:checked').val()),
            n_status:Number($('.addEditCont input[name="push"]:checked').val()),
            attach_name:$('.addEditCont input[name="accessoryName"]').val(),
            attach_url:$('.addEditCont input[name="address"]').val(),
            merchantId:sessionStorage.machineID
        });
        loadingAjax('/api/notices/addNotice','post',addPushObj,sessionStorage.token,'mask','addEditCont','modificationBox',layer).then(res=>{
            layer.msg(res.message,{icon:1});
            noticeTableIns.reload({
                where:{}
            })
            $('.addEditCont input[name="number"]').val('');
            $('.addEditCont input[name="title"]').val('');
            addWangEditor.txt.html('');
            $('.addEditCont input[name="accessoryName"]').val('');
            $('.addEditCont input[name="address"]').val('');
        }).catch(err=>{
            console.log(err)
            layer.msg(err.message,{icon:2});
        })
    });



    // 编辑编辑器
    var editWangEditor = new E('#editWangEditor')
    editWangEditor.customConfig.customUploadImg = function (files, insert) {
        console.log(files)
        var upDetails = new FormData();
        upDetails.append('file', files[0]);
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
                if (res.code == 0) {
                    insert(res.data.src)
                } else {
                    layer.msg(res.message, { icon: 7 });
                }
            },
            error: function (err) {
                layer.msg('上传失败', { icon: 2 })
            }
        })
    }
    editWangEditor.create();
    // 监听
    var noticeData=null;
    table.on('tool(noticeTable)', function (obj) {  
         noticeData=obj.data;
        console.log(noticeData)
        if(obj.event=="preview"){
            $('.previewContent .playHeader span').html(obj.data.title+'的公告详情');
            $('.previewContent .previewHtml').html(obj.data.content)
            popupShow('previewContent','previewBox')
        }else if(obj.event=='edit'){
            $('.EditCont input[name="number"]').val(noticeData.n_number);
            $('.EditCont input[name="title"]').val(noticeData.title);
            $('.EditCont input[name="indexShow"][value=1]').prop("checked", noticeData.is_show == 1 ? true : false);
            $('.EditCont input[name="indexShow"][value=0]').prop("checked", noticeData.is_show == 0 ? true : false);
            $('.EditCont input[name="push"][value=1]').prop("checked", noticeData.n_status == 1 ? true : false);
            $('.EditCont input[name="push"][value=0]').prop("checked", noticeData.n_status == 0 ? true : false);
            $('.EditCont input[name="accessoryName"]').val(noticeData.attach_name);
            $('.EditCont input[name="address"]').val(noticeData.attach_url);
            editWangEditor.txt.html(noticeData.content);
            form.render('radio');
            popupShow('EditCont','editBox');
        }else if(obj.event=='dow'){
            layer.confirm(noticeData.is_show==1?'确定隐藏？':'确定展示？', function (index) {
                layer.close(index);
                var editPushObj=JSON.stringify({
                    n_number:noticeData.n_number,
                    title:noticeData.title,
                    content:noticeData.content,
                    is_show: noticeData.is_show==1?0:1,
                    n_status:noticeData.n_status,
                    attach_name:noticeData.attach_name,
                    attach_url:noticeData.attach_url,
                    merchantId:sessionStorage.machineID,
                    id:noticeData.id
                });
                loadingAjax('/api/notices/updateNotice','post',editPushObj,sessionStorage.token,'mask','EditCont','editBox',layer).then(res=>{
                    layer.msg(res.message,{icon:1});
                    noticeTableIns.reload({
                        where:{}
                    })
                }).catch(err=>{
                    console.log(err)
                    layer.msg(err.message,{icon:2});
                })
            })
        }
    });

    // 编辑预览
    $('.EditCont .readingBtn').click(function(){
        $('.previewContent .playHeader span').html(noticeData.title+'的公告详情');
        $('.previewContent .previewHtml').html(editWangEditor.txt.html())
        popupShow('previewContent','previewBox')
    });
    // 编辑取消
    $('.EditCont .cancelBtn').click(function(){
        popupHide('EditCont','editBox');
    });
    // 编辑删除附件地址
    $('.EditCont .editDelUploadBtn').click(function(){
        layer.confirm('确定删除附件？', function (index) {
            layer.close(index);
            $('.EditCont input[name="address"]').val('');
        })
    });
    // 编辑上传附件
    $('.EditCont .editUploadBtn input[name="editUpload"]').change(function(e){
        if(!$(this).val()){
            return ;
        }
        var that = this;
        var upDetails = new FormData();
        upDetails.append('file', e.target.files[0]);
        $('.mask').fadeIn();
        $('.maskSpan').addClass('maskIcon');
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
                $('.mask').fadeOut();
                $('.maskSpan').removeClass('maskIcon');
                $(that).val('');
                if (res.code == 0) {
                    layer.msg('上传成功')
                    $('.EditCont input[name="address"]').val(res.data.src)
                } else {
                    layer.msg(res.message, { icon: 7 });
                }
            },
            error: function (err) {
                $(that).val('')
                $('.mask').fadeOut();
                $('.maskSpan').removeClass('maskIcon')
                layer.msg('上传失败', { icon: 2 })
            }
        })
    })
    // 确定编辑
    $('.EditCont .determinePushBtn').click(function(){
        if(!($('.EditCont input[name="title"]').val()&&$('.EditCont input[name="number"]').val())){
            layer.msg('带*号为必填',{icon:7});
            return ;
        }
        if(!addWangEditor.txt.html().length>11){
            layer.msg('公告详情最少五个字',{icon:7});
            return ;
        };
        if((!($('.EditCont input[name="accessoryName"]').val()&&$('.EditCont input[name="address"]').val()))&&($('.EditCont input[name="accessoryName"]').val()||$('.EditCont input[name="address"]').val())){
            layer.msg('附近名与附件地址必须同时填写');
            return ;
        };
        console.log($('.addEditCont input[name="push"]:checked').val());
        // return ;
        var editPushObj=JSON.stringify({
            n_number:$('.EditCont input[name="number"]').val(),
            title:$('.EditCont input[name="title"]').val(),
            content:editWangEditor.txt.html(),
            is_show:Number($('.EditCont input[name="indexShow"]:checked').val()),
            n_status:Number($('.EditCont input[name="push"]:checked').val()),
            attach_name:$('.EditCont input[name="accessoryName"]').val(),
            attach_url:$('.EditCont input[name="address"]').val(),
            merchantId:sessionStorage.machineID,
            id:noticeData.id
        });
        loadingAjax('/api/notices/updateNotice','post',editPushObj,sessionStorage.token,'mask','EditCont','editBox',layer).then(res=>{
            layer.msg(res.message,{icon:1});
            noticeTableIns.reload({
                where:{}
            })
        }).catch(err=>{
            console.log(err)
            layer.msg(err.message,{icon:2});
        })
    })
    // 查询公告
    $('.queryBtn').click(function(){
        noticeTableIns.reload({
            where:{
                keyword:$('.key-contnet input[name="keyMerchants"]').val()
            }
        })
    })
    // $('.xlsx').change(function(e){
    //     var upDetails = new FormData();
    //     upDetails.append('file', e.target.files[0]);
    //     upDetails.append('merchantId', 1);
    //     $('.mask').fadeIn();
    //     $('.maskSpan').addClass('maskIcon');
    //     $.ajax({
    //         type: 'post',
    //         url: '/api/sales_manager/importSalesManager',
    //         processData: false,
    //         contentType: false,
    //         timeout:10000,
    //         headers: {
    //             token,
    //         },
    //         data: upDetails,
    //         success: function (res) {
    //             $('.mask').fadeOut();
    //             $('.maskSpan').removeClass('maskIcon');
    //         },
    //         error: function (err) {
    //             $('.mask').fadeOut();
    //             $('.maskSpan').removeClass('maskIcon')
    //             layer.msg('上传失败', { icon: 2 })
    //         }
    //     })
    // })
})