layui.use(['laydate', 'table', 'layer'], function () {
    var token = sessionStorage.token;
    var layer = layui.layer;
    // 日期选择
    var laydate = layui.laydate;
    // laydate.render({
    //     elem: '#test6'
    //     // ,type: 'datetime'
    //     ,range: true    
    //     ,isInitValue: false
    //   });
    // 查询时间的值
    var timerKey=null;
    laydate.render({
        elem: '#test6',
        range: true,
        done: function(value, date, endDate){
	        console.log(value); //得到日期生成的值，如：2017-08-18
            timerKey=value;
	      }

    });
    var table = layui.table;
    var tableIns =table.render({
        elem: '#moneyData',
        url:'/api//advertising/findAdvertising',
        method:'post',
        contentType: "application/json",
        headers: {
        token,
        },
         cols: [[
            { type: 'checkbox', },
            { field: 'img', width: 120, title: '微缩图',templet: "#imgtmp" },
            { field: 'name', width: 150, title: '素材名', },
            { field: 'size', width: 100, title: '大小(mb)', },
            { field: 'amendTime', width: 130, title: '分辨率', },
            { field: 'advertisingAttribute', width: 150, title: '素材属性', sort: true },
            { field: 'materiaType', width: 150, title: '素材类别', sort: true },
            { field: 'duration', width: 100, title: '播放时长', sort: true },
            { field: 'checkStatus', width: 160, title: '审核状态', },
            { field: 'advertisingStatus', width: 160, title: '素材状态', },
            { field: 'creationTime', width: 160, title: '上传时间', },
            { field: 'addUser', width: 150, title: '上传人 ', },
            // { field: 'operation', width: 200, title: '操作', toolbar: '#barDemo',fixed: 'right',right: 0 },
            { field: 'operation', right: 0, width: 200, title: '操作', toolbar: '#barDemo', align: 'center',  },
        ]],
        page: true,
        id: 'tableId',
        loading:true,   
        height: 'full-200',
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

    // 查询事件
    $('.keyQueryBtn').click(function(){
        alert(1)
    })
    // 上传素材弹出说明框
    $('.uploadBtn').click(function () {
        $('.uploadTitle').fadeIn();
        $('.titleBox').removeClass('margin0')
    });
    // 关闭说明
    $('.titleHeader button').click(function () {
        $('.uploadTitle').fadeOut();
        $('.titleBox').addClass('margin0')
    });

    // 填写上传素材框
    $('.issue').click(function () {
        popupHide('uploadTitle', 'titleBox');
        popupShow('uploadMaterialCont', 'uploadMateriaBox');
    });
    // 取消
    $('.uploadMateriaFooter .cancel-btn').click(function () {
        popupHide('uploadMaterialCont', 'uploadMateriaBox');
    })


    // 监听复选框
    table.on('checkbox(moneyData)', function (obj) {
        console.log(obj.checked); //当前是否选中状态
        console.log(obj.data); //选中行的相关数据
        console.log(obj.type); //如果触发的是全选，则为：all，如果触发的是单选，则为：one
    });

    //   删除文件
    $('.del-btn').click(function () {
        var checkStatus = table.checkStatus('tableId');
        if (checkStatus.data.length > 0) {
            layer.msg('11', { icon: 2, anim: 1 });
        } else {
            layer.msg('请选择要删除的素材', { icon: 7, anim: 1 });
        }
    });
    // 收起左边账号事件
    $('.sidebar .layui-icon-left').click(function () {
        $('.aside-left').slideUp(function () {
            $('.layui-icon-right').show();
        });
    });
    $('.layui-icon-right').click(function () {
        $('.aside-left').slideDown(function () {
            $('.layui-icon-right').hide();
        });
    });
    var indexFlag = null;
    valData = null;
    table.on('tool(moneyData)', function (obj) {
        console.log(obj)
        valData = obj.data;
        $('.anUp').slideUp();
        if (indexFlag != valData.vId) {
            indexFlag = valData.vId;
            $(this).siblings('.anUp').slideDown();
        } else {
            indexFlag = null;
        }
    })
    // 预览素材
    $('.previewDetails').click(function () {
        $('.anUp').slideUp();
        indexFlag = null;
        $('.materialPreview').fadeIn();
        $('.previewBox').removeClass('margin0');
    });
    // 关闭弹窗
    $('.playHeader .close').click(function () {
        $(this).parent().parent().addClass('margin0')
        $(this).parents('.maskContnet').fadeOut();

    });
    var form = layui.form;
    form.on('select(myAttribute)', function (data) {
        // console.log(data.value); //得到被选中的值
        if (data.value == '图片') {
            $('.VideoBtn').hide();
            $('.ImgBtn').fadeIn();
            $('.materiaDow video').hide()
            if (ImgFile||imgVideoHttp) {
                $('.materiaDow').show();
                $('.materiaDow img').show();
            } else {
                $('.materiaDow').hide();
            }
        } else if (data.value == '视频') {
            $('.ImgBtn').hide();
            $('.VideoBtn').fadeIn();
            $('.materiaDow img').hide();
            if (ImgFile||imgVideoHttp) {
                $('.materiaDow').show();
                $('.materiaDow video').show();
            } else {
                $('.materiaDow').hide();
            }
        } else {
            $('.ImgBtn').fadeOut();
            $('.VideoBtn').fadeOut();
            $('.materiaDow').hide();
        }
    });

    var ImgFile = null;
    // 图片视频大小
    var ImgVideoSize = null;
    var imgVideoHttp = null;
    //   选择图片
    $('.ImgBtn input[name="ImgFile"]').change(function (e) {
        $('.materiaImg img').attr('src', '');
        base64(e.target.files[0], '.materiaImg img');
        $('.materiaImg video').hide();
        $('.materiaDow').show();
        $('.materiaDow img').show();
        ImgFile = e.target.files[0];
        ImgVideoSize = e.target.files[0].size / 1024 / 1024+'';
        $(this).val('');
    });
    // 视频播放时长
    var tol = null;
    $('.VideoBtn input[name="videoFile"]').change(function (e) {
        var that = $(this);
        $('.materiaImg video').attr('src', '');
        $('.materiaImg img').hide();
        var VideoData = new FormData();
        VideoData.append('file', e.target.files[0]);
        ImgVideoSize = e.target.files[0].size / 1024 / 1024+'';
        console.log(ImgVideoSize)
        $.ajax({
            type: 'post',
            url: '/api/fileUpload',
            processData: false,
            contentType: false,
            headers: {
                token,
            },
            data: VideoData,
            success: function (res) {
                console.log(res);
                if (res.code == 0) {
                    $('.materiaDow').show();
                    $('.materiaDow video').show();
                    $('.materiaImg video').attr('src', res.data.src);
                    imgVideoHttp = res.data.src;
                    $("#video")[0].addEventListener("loadedmetadata", function () {
                        tol = this.duration; //获取总时长
                    });
                    that.val('');
                } else {
                    layer.msg(res.msg)
                }
            }
        })
    });

    // 确认添加素材事件
    $('.confirmBtn').click(function () {
        var addList = form.val("uploadValData");
        console.log(addList)
        //   return false
        if (addList.materiaAttribute && addList.materiaType && addList.materialName) {
            if (imgVideoHttp || ImgFile) {
                var imgFileData=new FormData();
                imgFileData.append('file',ImgFile)
                if (addList.materiaAttribute == '图片') {
                    // 上传图片
                    $.ajax({
                        type: 'post',
                        url: '/api/fileUpload',
                        async:false,
                        processData: false,
                        contentType: false,
                        headers: {
                            token,
                        },
                        data:imgFileData,
                        success:function(res){
                            console.log(res)
                            if(res.code==0){
                                imgVideoHttp=res.data.src;
                            }else{
                                layer.msg(res.message);
                                return false;
                            }
                        }
                    })
                };
                // 提交
                $.ajax({
                    type:'post',
                    url:'/api/advertising/saveAdvertising',
                    headers: {
                        "Content-Type": "application/json",
                        token,
                    },
                    async:false,
                    data:JSON.stringify({
                        advertisingAttribute:addList.materiaAttribute,//属性
                        advertisingStatus:addList.materiaStatus,//是否启用
                        advertisingType:addList.materiaType,//横竖屏
                        duration:tol,//播放时长
                        img:imgVideoHttp,//素材
                        name:addList.materialName,//素材名
                        size:ImgVideoSize.slice(0,4),//大小
                    }),
                    success:function(res){
                        console.log(res)
                        if(res.code==200){
                            popupHide('uploadMaterialCont','uploadMateriaBox');
                            tableIns.reload({
                                where: {
                                }
                            });
                            layer.msg(res.message)
                        }else if(res.code==403){
                            window.history.go(-1)
                        }else{
                            layer.msg(res.message)
                        }
                    }
                })
            } else {
                layer.msg('请上传图片或视频')
            }
        } else {
            layer.msg('带*为必填')
        }
    })


    //  获取视频第一帧图片
    var scale = 1;
    var videos;
    var initialize = function () {
        videos = document.getElementById("video");
        console.log(videos)
        videos.addEventListener('loadeddata', captureImage);
    };
    var captureImage = function () {
        var canvas = document.createElement("canvas");
        canvas.width = videos.videoWidth * scale;
        canvas.height = videos.videoHeight * scale;
        canvas.getContext('2d').drawImage(videos, 0, 0, canvas.width, canvas.height);
        // canvas.toDataURL("image/png");
        // ImgVideo = dataURLtoFile(canvas.toDataURL("image/png"), 'jpg');
        console.log(canvas.toDataURL("image/jpg"))
        // var VideoImg = new FormData();
        // VideoImg.append('file', ImgVideo)
        // $.ajax({
        //     type: 'post',
        //     url: '/api/fileUpload',
        //     processData: false,
        //     contentType: false,
        //     headers: {
        //         token,
        //     },
        //     data: VideoImg,
        //     success: function (res) {
        //         console.log(res);
        //     }
        // })
    };
});