import '../../MyCss/advertising/fodder.css'
layui.use(['laydate', 'table', 'layer', 'tree'], function () {
    tooltip('.refreshBtnList', {transition: true, time: 200});
    var token = sessionStorage.token,
        layer = layui.layer,
        form = layui.form,
        // 日期选择
        laydate = layui.laydate,
        tree = layui.tree;
    //开始时间
    var startTime = '';
    //结束时间
    var endTime = '';
    laydate.render({
        elem: '#test6',
        range: true,
        done: function (value, date, endDate) {
            console.log(value); //得到日期生成的值，如：2017-08-18
            timerKey = value.split(' - ');
            console.log(timerKey);
            startTime = timerKey[0];
            endTime = timerKey[1];
        }

    });
    var table = layui.table;
    var tableIns = table.render({
        elem: '#moneyData',
        url: '/api/advertising/selectAdvertising',
        method: 'post',
        contentType: "application/json",
        headers: {
            token,
        },
        cols: [[
            { type: 'checkbox', },
            { field: 'img', width: 120, title: '微缩图', templet: "#imgtmp" , align: 'center'},
            { field: 'name', width: 150, title: '素材名', align: 'center', },
            { field: 'size', width: 100, title: '大小(MB)', align: 'center', },
            // { field: 'amendTime', width: 130, title: '分辨率', },
            {
                field: 'advertisingAttribute', align: 'center', width: 150, title: '素材属性', templet: function (d) {
                    return d.advertisingAttribute == 0 ? '图片' : '视频'
                }
            },
            {
                field: 'advertisingType', align: 'center', width: 150, title: '素材类别', templet: function (d) {
                    return d.advertisingType == 0 ? '横屏' : '竖屏'
                }
            },
            { field: 'duration', width: 100, title: '播放时长', align: 'center' },
            {
                field: 'checkStatus', align: 'center', width: 160, title: '审核状态', templet: function (d) {
                    return d.checkStatus == 0 ? '未审核' : d.checkStatus == 1 ? '待审核' : d.checkStatus == 2 ? '审核通过' : '审核不通过'
                }
            },
            {
                field: 'advertisingStatus', align: 'center', width: 160, title: '素材状态', templet: function (d) {
                    return d.advertisingStatus == '1' ? '启用' : '不启用'
                }
            },
            { field: 'addUser', width: 150, title: '创建人 ', align: 'center', },
            { field: 'creationTime', width: 160, title: '创建时间', align: 'center', },
           
            // { field: 'operation', width: 200, title: '操作', toolbar: '#barDemo',fixed: 'right',right: 0 },
            { field: 'operation', right: 0, width: 200, title: '操作', align: 'center', toolbar: '#barDemo', align: 'center', fixed: 'right' },
        ]],
        page: true,
        id: 'tableId',
        loading: true,
        height: 'full-200',
        request: {
            'pageName': 'pageNum',
            'limitName': 'pageSize'
        },
        where: {
            'merchantId': Number(sessionStorage.machineID)
            // merchantId: sessionStorage.machineID
        },
        parseData: function (res) {
            // console.log(res)
            //res 即为原始返回的数据
            if (res.code == 200) {
                return {
                    "code": res.code, //解析接口状态
                    "msg": res.message, //解析提示文本
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
            permissions();
            if (res.code == 403) {
                window.parent.location.href = "login.html";
            } else if (res.code == 405) {
                $('.hangContent').show();
            }

        }
    });

    // 查询事件
    $('.keyQueryBtn').click(function () {
        var KeyValData = form.val("KeyValData");
        console.log(KeyValData);
        tableIns.reload({
            where: {      
                keyWord: KeyValData.name,//关键字
                attribute: KeyValData.attribute,//素材属性
                type: KeyValData.type,//素材类别
                checkStatus: KeyValData.checkStatus,//审核状态
                minSize: KeyValData.minSize,//最小mb
                maxSize: KeyValData.maxSize,//最大mb
                status: KeyValData.advertisingStatus,//素材状态
                startTime: startTime,//开始时间
                endTime: endTime//结束时间
            }
        })
    })
    // 上传素材弹出说明框
    $('.uploadBtn').click(function () {
        if (!addFlag) {
            layer.msg('您没有上传广告素材权限!', { iocn: 7 });
            return
        }
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
    //   删除文件
    $('.del-btn').click(function () {
        if (!delFlag) {
            layer.msg('您没有删除广告素材权限!', { iocn: 7 });
            return
        }
        var checkStatus = table.checkStatus('tableId');
        console.log(checkStatus)
        console.log
        var listID = null;
        if (checkStatus.data.length > 0) {
            listID = checkStatus.data.map((item, index) => {
                return item.vid;
            });
            console.log(listID);
            layer.confirm('确定删除？', function (index) {
                $.ajax({
                    type: 'post',
                    url: '/api/advertising/deleteAdvertising',
                    headers: {
                        "Content-Type": "application/json",
                        token,
                    },
                    data: JSON.stringify({ list: listID }),
                    success: function (res) {
                        console.log(res);
                        layer.close(index);
                        if (res.code == 200) {
                            layer.msg(res.message, { icon: 1 });
                            tableIns.reload({
                                where: {
                                }
                            })
                        } else if (res.code == 201) {
                            layer.msg(res.message, { icon: 7 });
                        } else if (res.code == 202) {
                            layer.msg(res.message, { icon: 7 });
                            tableIns.reload({
                                where: {
                                }
                            });

                        } else if (res.code == 403) {
                            window.parent.location.href = "login.html";
                        } else {
                            layer.msg(res.message, { icon: 7 });
                        }
                    }
                })
            });
        } else {
            layer.msg('请选择要删除的素材', { icon: 7 });
        }
    });
    // 收起左边账号事件
    $('.sidebar i').click(function () {
        $('.left-mian').hide();
        $('.on-left').show()
    });
    $('.on-left').click(function () {
        $('.left-mian').show();
        $('.on-left').hide()
    })
    var indexFlag = null;
    var valData = null;
    // 素材内容
    var editImgVideo = null;
    // 素材大小
    var editSize = null;
    // 素材时长
    var editDuration = null;
    var numberOf = 1;
    table.on('tool(moneyData)', function (obj) {
        valData = obj.data;
        if (obj.event == 'preview') {
            if (valData.img.indexOf('mp4') > -1) {
                $('.imgCont video').attr('src', valData.img).show().siblings().hide();
            } else {
                $('.imgCont img').attr('src', valData.img).show().siblings().hide();
            }
            popupShow('materialPreview', 'previewBox');
        } else if (obj.event == 'edit') {
            if (!editFlag) {
                layer.msg('您没有编辑广告素材权限!', { iocn: 7 });
                return
            }
            popupShow('editMaterialCont', 'uploadMateriaBox');
            form.val("editValData", {
                "materialName": valData.name,
                "materiaAttribute": valData.advertisingAttribute,
                "materiaType": valData.advertisingType,
                "materiaStatus": valData.advertisingStatus
            })
            if (valData.checkStatus == '0') {
                $('.editCont select[name="materiaAttribute"]').prop("disabled", '');
                $('.editCont select[name="materiaType"]').prop("disabled", '');
                form.render();
                $('.materiaDowEdit').show().children().show();
                if (valData.advertisingAttribute == '0') {
                    $('.editImgBtn').show().siblings('.editVideoBtn').hide();
                    $('.materiaImgEdit img').attr('src', valData.img).show().siblings().hide();
                } else {
                    $('.editVideoBtn').show().siblings('.editImgBtn').hide();
                    $('.materiaImgEdit video').attr('src', valData.img).show().siblings().hide();
                }
            } else {
                $('.editCont select[name="materiaAttribute"]').prop("disabled", true);
                $('.editCont select[name="materiaType"]').prop("disabled", true);
                form.render();
                $('.editImgBtn').hide();
                $('.editVideoBtn').hide();
                $('.materiaDowEdit').hide().children().hide();
                $('.materiaImgEdit img').hide().siblings().hide();
            }
        }
        // if (obj.event == numberOf) {
        //     valData = obj.data;
        //     editImgVideo = valData.img;
        //     editSize = valData.size;
        //     editDuration = valData.duration;
        //     console.log(valData)
        //     $('.anUp').slideUp();
        //     if (indexFlag != valData.vid) {
        //         indexFlag = valData.vid;
        //         $(this).siblings('.anUp').slideDown();
        //     } else {
        //         indexFlag = null;
        //     }
        // }
    });

    // 预览素材
    // $('body').on('click', '.previewDetails', function () {
    //     $('.anUp').slideUp();
    //     if (valData.img.indexOf('mp4') > -1) {
    //         $('.imgCont video').attr('src', valData.img).show().siblings().hide();
    //     } else {
    //         $('.imgCont img').attr('src', valData.img).show().siblings().hide();
    //     }
    //     indexFlag = null;
    //     popupShow('materialPreview', 'previewBox');
    // });
    // 编辑素材
    // $('body').on('click', '.GoodsInformation', function () {
    //     $('.anUp').slideUp();
    //     indexFlag = null;
    //     popupShow('editMaterialCont', 'uploadMateriaBox');
    //     form.val("editValData", {
    //         "materialName": valData.name,
    //         "materiaAttribute": valData.advertisingAttribute,
    //         "materiaType": valData.advertisingType,
    //         "materiaStatus": valData.advertisingStatus
    //     })
    //     if (valData.checkStatus == '0') {
    //         $('.editCont select[name="materiaAttribute"]').prop("disabled", '');
    //         $('.editCont select[name="materiaType"]').prop("disabled", '');
    //         form.render();
    //         $('.materiaDowEdit').show().children().show();
    //         if (valData.advertisingAttribute == '0') {
    //             $('.editImgBtn').show().siblings('.editVideoBtn').hide();
    //             $('.materiaImgEdit img').attr('src', valData.img).show().siblings().hide();
    //         } else {
    //             $('.editVideoBtn').show().siblings('.editImgBtn').hide();
    //             $('.materiaImgEdit video').attr('src', valData.img).show().siblings().hide();
    //         }
    //     } else {
    //         $('.editCont select[name="materiaAttribute"]').prop("disabled", true);
    //         $('.editCont select[name="materiaType"]').prop("disabled", true);
    //         form.render();
    //         $('.editImgBtn').hide();
    //         $('.editVideoBtn').hide();
    //         $('.materiaDowEdit').hide().children().hide();
    //         $('.materiaImgEdit img').hide().siblings().hide();
    //     }
    // })

    // 提交审核
    $('.submitAuditBtn').click(function () {
        // if (!auditFla) {
        //     layer.msg('您没有审核广告素材权限!', { iocn: 7 });
        //     return
        // }
        var submitCheckStatus = table.checkStatus('tableId');
        console.log(submitCheckStatus);
        var checkList = [];
        if (submitCheckStatus.data.length > 0) {
            $('.mask').fadeIn();
            $('.maskSpan').addClass('maskIcon')
            submitCheckStatus.data.forEach((item, index) => {
                var submitObj = {
                    id: item.vid,
                    status: '1'
                }
                checkList.push(submitObj);
                console.log(checkList);
                return;
            });
            auditMethods('1', checkList, '/api/advertising/submitAdvertisingStatus');
        } else {
            layer.msg('请选择需要提交审核的素材', { icon: 7 });
        }
    });

    // 审核通过
    $('.approvedBtn').click(function () {
        var approveCheckStatus = table.checkStatus('tableId');
        var approveList = [];
        if (approveCheckStatus.data.length > 0) {
            layer.confirm('确定审核通过？', function (index) {
                layer.close(index);
                $('.mask').fadeIn();
                $('.maskSpan').addClass('maskIcon')
                approveCheckStatus.data.forEach((item, index) => {
                    var approveObj = {
                        id: item.vid,
                        status: '2'
                    }
                    approveList.push(approveObj)
                });
                auditMethods('0', approveList, '/api/advertising/checkAdvertisingStatus')
            })

        } else {
            layer.msg('请选择需要通过审核的素材', { icon: 7 });
        }
    });

    // 审核不通过
    $('.noPassBtn').click(function () {
        if (!auditFla) {
            layer.msg('您没有审核广告素材权限!', { iocn: 7 });
            return
        }
        var noPassCheckStatus = table.checkStatus('tableId');
        var noPassList = [];
        if (noPassCheckStatus.data.length > 0) {
            layer.confirm('确定审核不通过？', function (index) {
                layer.close(index);
                $('.mask').fadeIn();
                $('.maskSpan').addClass('maskIcon')
                noPassCheckStatus.data.forEach((item, index) => {
                    var noPassObj = {
                        id: item.vid,
                        status: '3'
                    }
                    noPassList.push(noPassObj)
                });
                auditMethods('0', noPassList, '/api/advertising/checkAdvertisingStatus')
            })
        } else {
            layer.msg('请选择需要不通过审核的素材', { icon: 7 });
        }
    })
    // 
    // 编辑确定修改
    $('.editConfirmBtn').click(function () {
        var editValDataConfirm = form.val("editValData");
        console.log(editValDataConfirm)
        if (valData.checkStatus == '0') {
            $.ajax({
                type: 'post',
                url: '/api/advertising/findAdvertising',
                headers: {
                    "Content-Type": "application/json",
                    token,
                },
                data: JSON.stringify({
                    id: valData.vid
                }),
                success: function (res) {
                    console.log(res)
                    if (res.code == 200) {
                        if (res.data == '0') {
                            console.log(editImgVideo.indexOf('jpg'))
                            if ((editImgVideo.indexOf('jpg') > 1 || editImgVideo.indexOf('png') > 1 || editImgVideo.indexOf('gif') > 1 && editValDataConfirm.materiaAttribute == '0') || (editImgVideo.indexOf('mp4') > 1 && editValDataConfirm.materiaAttribute == '1')) {
                                editMaterial(
                                    valData.vid,
                                    editValDataConfirm.materialName,
                                    editValDataConfirm.materiaAttribute,
                                    editValDataConfirm.materiaStatus,
                                    editValDataConfirm.materiaType,
                                    editDuration,
                                    editImgVideo,
                                    editSize.slice(0, 4),
                                    valData.url);
                            } else {
                                layer.msg('素材属性不正确', { icon: 7 });
                            }

                        } else {
                            layer.confirm('检测到当前素材只能修改素材名和状态，是否继续修改？', function (index) {
                                editMaterial(
                                    valData.vid,
                                    editValDataConfirm.materialName,
                                    editValDataConfirm.materiaAttribute,
                                    editValDataConfirm.materiaStatus,
                                    editValDataConfirm.materiaType,
                                    valData.duration,
                                    valData.img,
                                    valData.size,
                                    valData.url);
                                layer.close(index);
                            })
                        }
                    }
                }
            })
        }
        else {
            console.log()
            editMaterial(
                valData.vid,
                editValDataConfirm.materialName,
                editValDataConfirm.materiaAttribute,
                editValDataConfirm.materiaStatus,
                editValDataConfirm.materiaType,
                valData.duration,
                valData.img,
                valData.size,
                valData.url);
        }
    });
    // 素材内容 editImgVideo
    // 监听 编辑素材属性选择
    form.on('select(EditSelect)', function (data) {
        console.log(data.value); //得到被选中的值
        if (data.value == '0') {
            $('.editImgBtn').show().siblings('.editVideoBtn').hide();
            $('.materiaImgEdit img').show().siblings().hide();
        } else {
            $('.editVideoBtn').show().siblings('.editImgBtn').hide();
            $('.materiaImgEdit video').show().siblings().hide();
        }
    });
    // 编辑图片选择
    $('.editImgBtn input[name="editImg"]').change(function (e) {
        let that = this;
        editSize = e.target.files[0].size / 1024 / 1024 + ''
        var EditImgFile = new FormData();
        EditImgFile.append('file', e.target.files[0]);
        $('.mask').fadeIn();
        $('.maskSpan').addClass('maskIcon')
        $.ajax({
            type: 'post',
            url: `/api/fileUpload`,
            processData: false,
            contentType: false,
            headers: {
                token,
            },
            data: EditImgFile,
            success: function (res) {
                console.log(res)
                $('.mask').fadeOut();
                $('.maskSpan').removeClass('maskIcon')
                if (res.code == 0) {
                    editImgVideo = res.data.src;
                    $('.materiaImgEdit img').attr('src', editImgVideo);
                    $('.materiaImgEdit video').attr('src', '');
                    $(that).val();
                } else if (res.code == 403) {
                    window.parent.location.href = "login.html";
                } else {
                    layer.msg(res.message, { icon: 2 })
                }
            },error:function(err){
                $('.mask').fadeOut();
                $('.maskSpan').removeClass('maskIcon')
                layer.msg('图片上传失败',{icon:2})
            }
        })
    });
    //编辑视频选择
    $('.editVideoBtn input[name="editVideo"]').change(function (e) {
        editSize = e.target.files[0].size / 1024 / 1024 + ''
        let that2 = this;
        var EditVideoFile = new FormData();
        EditVideoFile.append('file', e.target.files[0]);
        $('.mask').fadeIn();
                $('.maskSpan').addClass('maskIcon')
        $.ajax({
            type: 'post',
            url: `/api/fileUpload`,
            processData: false,
            contentType: false,
            headers: {
                token,
            },
            data: EditVideoFile,
            success: function (res) {
                $('.mask').fadeOut();
                $('.maskSpan').removeClass('maskIcon')
                console.log(res);
                if (res.code == 0) {
                    editImgVideo = res.data.src;
                    $('.materiaImgEdit video').attr('src', editImgVideo);
                    $('.materiaImgEdit img').attr('src', '');
                    $("#EditVideo")[0].addEventListener("loadedmetadata", function () {
                        editDuration = parseInt(this.duration)
                        // editDuration = this.duration; //获取总时长
                        console.log(editDuration)
                    });
                    $(that2).val();
                } else if (res.code == 403) {
                    window.history.go(-1)
                } else {
                    layer.msg(res.message)
                }
            },error:function(err){
                $('.mask').fadeOut();
                $('.maskSpan').removeClass('maskIcon');
                layer.msg('视频上传失败',{icon:2})
            }
        })

    })

    // 编辑素材            id 名字  属性                   是否启用         类别            时长    原图  大小 微缩图
    function editMaterial(vid, name, advertisingAttribute, advertisingStatus, advertisingType, duration, img, size, url) {
        $.ajax({
            type: 'post',
            url: '/api/advertising/updateAdvertising',
            headers: {
                "Content-Type": "application/json",
                token,
            },
            data: JSON.stringify({
                vid,
                name,
                advertisingAttribute,
                advertisingStatus,
                advertisingType,
                duration,
                img,
                url,
                size
            }),
            success: function (editRes) {
                if (editRes.code == 200) {
                    popupHide('editMaterialCont', 'uploadMateriaBox');
                    tableIns.reload({
                        where: {
                        }
                    });
                    layer.msg(editRes.message, { icon: 1 });
                } else if (editRes.code == 403) {
                    window.parent.location.href = "login.html";
                } else {
                    layer.msg(editRes.message)
                }
            }
        })
    }


    $('.editCancelBtn').click(function () {
        popupHide('editMaterialCont', 'uploadMateriaBox');
    })

    // 关闭弹窗
    $('.playHeader .close').click(function () {
        $(this).parent().parent().addClass('margin0')
        $(this).parents('.maskContnet').fadeOut();

    });

    form.on('select(myAttribute)', function (data) {
        // console.log(data.value); //得到被选中的值
        if (data.value == '0') {
            $('.VideoBtn').hide();
            $('.ImgBtn').fadeIn();
            $('.materiaDow video').hide()
            if (ImgFile || imgVideoHttp) {
                $('.materiaDow').show();
                $('.materiaDow img').show();
            } else {
                $('.materiaDow').hide();
            }
        } else if (data.value == '1') {
            $('.ImgBtn').hide();
            $('.VideoBtn').fadeIn();
            $('.materiaDow img').hide();
            if (ImgFile || imgVideoHttp) {
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
        ImgVideoSize = e.target.files[0].size / 1024 / 1024 + '';
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
        ImgVideoSize = e.target.files[0].size / 1024 / 1024 + '';
        console.log(ImgVideoSize);
        $('.mask').fadeIn();
        $('.maskSpan').addClass('maskIcon')
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
                $('.mask').fadeOut();
        $('.maskSpan').removeClass('maskIcon')
                console.log(res);
                if (res.code == 0) {
                    $('.materiaDow').show();
                    $('.materiaDow video').show();
                    $('.materiaImg video').attr('src', res.data.src);
                    imgVideoHttp = res.data.src;
                    $("#video")[0].addEventListener("loadedmetadata", function () {
                        tol = parseInt(this.duration); //获取总时长
                        console.log(tol)
                    });
                    that.val('');
                } else {
                    layer.msg(res.msg)
                }
            },error:function(err){
                $('.mask').fadeOut();
        $('.maskSpan').removeClass('maskIcon')
                layer.msg('上传视频失败',{icon:2})
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
                $('.mask').fadeIn();
                $('.maskSpan').addClass('maskIcon');
                var imgFileData = new FormData();
                imgFileData.append('file', ImgFile)       
                console.log(222)
                setTimeout(()=>{
                    if (addList.materiaAttribute == '0') {
                        // 上传图片       
                        $.ajax({
                            type: 'post',
                            url: '/api/fileUpload',
                            async: false,
                            processData: false,
                            contentType: false,
                            headers: {
                                token,
                            },
                            data: imgFileData,
                            success: function (res) {
                                console.log(res)
                                if (res.code == 0) {
                                    imgVideoHttp = res.data.src;
                                } else {
                                    layer.msg(res.message);
                                    return false;
                                }
                            },error:function(err){
                                $('.mask').fadeOut();
                                $('.maskSpan').removeClass('maskIcon')
                                layer.msg('上传图片失败',{icon})
                            }
                        })
                    };
                    // 提交
                    $.ajax({
                        type: 'post',
                        url: '/api/advertising/saveAdvertising',
                        headers: {
                            "Content-Type": "application/json",
                            token,
                        },
                        async: false,
                        data: JSON.stringify({
                            advertisingAttribute: addList.materiaAttribute,//属性
                            advertisingStatus: addList.materiaStatus,//是否启用
                            advertisingType: addList.materiaType,//横竖屏
                            duration: tol,//播放时长
                            img: imgVideoHttp,//素材
                            name: addList.materialName,//素材名
                            size: ImgVideoSize.slice(0, 4),//大小
                            merchantId: sessionStorage.machineID
                        }),
                        success: function (res) {
                            console.log(res)
                            $('.mask').fadeOut();
                         $('.maskSpan').removeClass('maskIcon')
                            if (res.code == 200) {
                                
                                popupHide('uploadMaterialCont', 'uploadMateriaBox');
                                tableIns.reload({
                                    where: {
                                    }
                                });
                                layer.msg(res.message, { icon: 1 })
                                form.val("uploadValData", {
                                    "materialName": '',
                                    "materiaAttribute": '',
                                    "materiaType": '',
                                    "materiaStatus": '',
                                });
                                $('.uploadMaterialCont .materiaImg video').hide();
                                $('.uploadMaterialCont .materiaDow').hide();
                                $('.uploadMaterialCont .materiaDow img').hide();
                                $('.uploadMaterialCont .ImgBtn').hide();
                                $('.uploadMaterialCont .VideoBtn').hide();
                                imgVideoHttp = null;
                                ImgFile = null;
                            } else if (res.code == 403) {
                                window.history.go(-1)
                            } else {
                                layer.msg(res.message, { icon: 2 })
                            }
                        },error:function(err){
                            $('.mask').fadeOut();
                            $('.maskSpan').removeClass('maskIcon')
                            layer.msg('服务器请求超时',{icon:2})
                        }
                    })
                },300)
                
            } else {
                layer.msg('请上传图片或视频', { icon: 7 })
            }
        } else {
            layer.msg('带*为必填', { icon: 7 })
        }
    })

    // 提交审核，审核通过，审核不通过方法
    function auditMethods(type, data, url) {
        $.ajax({
            type: 'post',
            url,
            headers: {
                "Content-Type": "application/json",
                token,
            },
            data: JSON.stringify({
                data,
                type,
            }),
            success: function (res) {
                $('.mask').fadeOut();
                $('.maskSpan').removeClass('maskIcon')
                console.log(res)
                if (res.code == 200) {
                    layer.msg(res.message, { icon: 1 });
                    tableIns.reload({
                        where: {
                        }
                    })
                } else if (res.code == 201) {
                    layer.msg(res.message, { icon: 2 });
                } else if (res.code == 202) {
                    layer.msg(res.message, { icon: 7 });
                    tableIns.reload({
                        where: {
                        }
                    });
                } else if (res.code == 403) {
                    window.parent.location.href = "login.html";
                } else {
                    layer.msg(res.message, { icon: 2 });
                }
            },
        })
    }

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


    var dataList = treeList();
    treeFun(tree, 'test1', tableIns, dataList, 'merchantId')
    // 监听f5刷新
    $("body").bind("keydown", function (event) {
        if (event.keyCode == 116) {
            f5Fun()
        }
    });

    var addFlag = false,
        editFlag = false,
        delFlag = false,
        auditFla = false;
    permissionsFun('/api/role/findUserPermission', 'post', sessionStorage.token, layer).then(res => {
        console.log(res.data)
        addFlag = res.data.some((item, index) => {
            return item.id == '362'
        });
        editFlag = res.data.some((item, index) => {
            return item.id == '371'
        });
        delFlag = res.data.some((item, index) => {
            return item.id == '369'
        })
        auditFla = res.data.some((item, index) => {
            return item.id == '387'
        })
    }).catch(err => {
        layer.msg(err.message, { icon: 2 })
    });
    var addFlag = false,
        editFlag = false,
        delFlag = false,
        fourFlag = false;
    permissionsVal(362, 371, 369, 387).then(res => {
        addFlag = res.addFlag;
        editFlag = res.editFlag;
        delFlag = res.delFlag;
        fourFlag = res.fourFlag;
        permissions();
    }).catch(err => {
        layer.msg('服务器请求超时', { icon: 7 })
    });
    function permissions() {
        addFlag ? $('.uploadBtn').removeClass('hide') : $('.uploadBtn').addClass('hide');
        editFlag ? $('.editBtn').removeClass('hide') : $('.editBtn').addClass('hide');
        delFlag ? $('.del-btn').removeClass('hide') : $('.del-btn').addClass('hide');
        fourFlag ? $('.auditBtnTwo').removeClass('hide') : $('.auditBtnTwo').addClass('hide');
    };
    //刷新
    $('.refreshBtn').click(function () {
        location.reload();
    });

    // 刷新商户列表
    $('.refreshBtnList').click(function(){
        var dataList1=treeList();
        if (JSON.stringify(dataList1)  != JSON.stringify(dataList)) {
            dataList=dataList1;
            treeFun(tree, 'test1', tableIns, dataList, 'merchantId')
            tableIns.reload({
                where: {
                    'merchantId': Number(sessionStorage.machineID)
                }
            })
            layer.msg('已刷新',{icon:1})
        }else{
            layer.msg('已刷新',{icon:1})
        }
        
    })
});