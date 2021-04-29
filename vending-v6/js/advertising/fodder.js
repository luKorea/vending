import '../../MyCss/advertising/fodder.css'
layui.use(['laydate', 'table', 'layer', 'tree'], function () {
    // tooltip('.refreshBtnList', { transition: true, time: 200 });
    var permissionsData0 = window.parent.permissionsData1(),
        merchantId = sessionStorage.machineID,
     permissionsObj = {
        362: false,
        371: false,
        369: false,
        387: false,
    },
        permissionsObjFlag = permissionsVal1(permissionsObj, permissionsData0);

    function permissions() {
        permissionsObjFlag[362] ? $('.uploadBtn').removeClass('hide') : $('.uploadBtn').addClass('hide');
        permissionsObjFlag[371] ? $('.ListOperation .edit').removeClass('hide') : $('.ListOperation .edit').addClass('hide');
        permissionsObjFlag[369] ? $('.del-btn').removeClass('hide') : $('.del-btn').addClass('hide');
        permissionsObjFlag[387] ? $('.auditBtnTwo').removeClass('hide') : $('.auditBtnTwo').addClass('hide');
    };
    permissions();
    var token = sessionStorage.token,
        layer = layui.layer,
        form = layui.form,
        // 日期选择
        laydate = layui.laydate,
        tableCols = [[
            { type: 'checkbox', },
            { field: 'img', title: '微缩图', templet: "#imgtmp", align: 'center' },
            { field: 'name', title: '素材名', align: 'center', },
            { field: 'size',  title: '大小(MB)', align: 'center', },
            // { field: 'amendTime', width: 130, title: '分辨率', },
            {
                field: 'advertisingAttribute', align: 'center',  title: '素材属性', templet: function (d) {
                    return d.advertisingAttribute == 0 ? '图片' : '视频'
                }
            },
            {
                field: 'advertisingType', align: 'center', title: '素材类别', templet: function (d) {
                    return d.advertisingType == 0 ? '横屏' : '竖屏'
                }
            },
            { field: 'duration', title: '播放时长', align: 'center' },
            {
                field: 'checkStatus', align: 'center', title: '审核状态', templet: function (d) {
                    return d.checkStatus == 0 ? '未审核' : d.checkStatus == 1 ? '待审核' : d.checkStatus == 2 ? '审核通过' : '审核不通过'
                }
            },
            {
                field: 'advertisingStatus', align: 'center', title: '素材状态', templet: function (d) {
                    return d.advertisingStatus == '1' ? '启用' : '不启用'
                }
            },
            { field: 'addUser',  title: '创建人 ', align: 'center', },
            { field: 'creationTime',  title: '创建时间', align: 'center', },

            // { field: 'operation', width: 200, title: '操作', toolbar: '#barDemo',fixed: 'right',right: 0 },
            { field: 'operation', title: '操作', toolbar: '#barDemo', align: 'center'},
        ]],
        tree = layui.tree;
    //开始时间
    var startTime = getKeyTime().startTime,
        //结束时间
        endTime = getKeyTime().endTime;
    laydate.render({
        elem: '#test6',
        range: true,
        value: getKeyTime().keyTimeData,
        done: function (value, date, endDate) {
            console.log(value); //得到日期生成的值，如：2017-08-18
            var timerKey = value.split(' - ');
            console.log(timerKey);
            startTime = timerKey[0];
            endTime = timerKey[1];
        }
    });
    var table = layui.table;
    var tableIns = table.render({
        elem: '#moneyData',
        url: `${vApi}/advertising/selectAdvertising`,
        method: 'post',
        contentType: "application/json",
        headers: {
            token,
        },
        cols: tableCols,
        page: true,
        id: 'tableId',
        loading: true,
        request: {
            'pageName': 'pageNum',
            'limitName': 'pageSize'
        },
        where: {
            'merchantId': Number(merchantId),
            startTime: startTime,//开始时间
            endTime: endTime//结束时间
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
            fixedFun();
            if (res.code == 403) {
                window.parent.location.href = "login.html";
            } else if (res.code == 405) {
                $('.hangContent').show();
            }
        }
    });

    // 查询事件
    $('.keyQueryBtn').click(function () {
        if (timeFlag(startTime, endTime)) {
            layer.msg('时间选择范围最多三个月', { icon: 7 });
            return;
        }
        var KeyValData = form.val("KeyValData");
        // saveTableWidth(tableCols)
        // advertisingLis.reload({
        // where: {
        //     keyWord: KeyValData.name,//关键字
        //         attribute: KeyValData.attribute,//素材属性
        //         type: KeyValData.type,//素材类别
        //         checkStatus: KeyValData.checkStatus,//审核状态
        //         minSize: KeyValData.minSize,//最小mb
        //         maxSize: KeyValData.maxSize,//最大mb
        //         status: KeyValData.advertisingStatus,//素材状态
        //         startTime: startTime,//开始时间
        //         endTime: endTime//结束时间
        // }
        //     cols: tableCols
        // })
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
                layer.close(index);
                $('.mask').fadeIn();
                $('.maskSpan').addClass('maskIcon');
                loadingAjax('/advertising/deleteAdvertising', 'post', JSON.stringify({ list: listID }), sessionStorage.token, 'mask', '', '', layer).then(res => {
                    layer.msg(res.message, { icon: 1 });
                    tableIns.reload({
                        where: {
                        }
                    })
                }).catch(err => {
                    if (err.code == 202) {
                        layer.msg(err.message, { icon: 7 });
                        tableIns.reload({
                            where: {
                            }
                        });
                    } else {
                        layer.msg(err.message, { icon: 7 });
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
    var indexFlag = null,
     valData = null,
    // 素材内容
     editImgVideo = null,
    // 素材大小
     editSize = null,
    // 素材时长
     editDuration = null,
     operationFlag=null;
    table.on('tool(moneyData)', function (obj) {
        valData = obj.data;
        event.stopPropagation();
        if (obj.event === 'operation') {
            if (operationFlag == obj.data.vid) {
              $('.ListOperation').fadeOut();
              operationFlag = null;
              return;
            }
            operationFlag = obj.data.vid;
            $('.ListOperation').fadeIn();
            $('.ListOperation').css({
              left: $(this).offset().left - 35 + 'px',
              top: $(this).offset().top + 35 + 'px'
            })
          }
    });
    $('.ListOperation .edit').click(function(){
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
    });
    $('.ListOperation .Tpreview').click(function(){
        if (valData.img.indexOf('mp4') > -1) {
            $('.imgCont video').attr('src', valData.img).show().siblings().hide();
        } else {
            $('.imgCont img').attr('src', valData.img).show().siblings().hide();
        }
        popupShow('materialPreview', 'previewBox');
    })

    // 提交审核
    $('.submitAuditBtn').click(function () {
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
            auditMethods('1', checkList, '/advertising/submitAdvertisingStatus');
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
                auditMethods('0', approveList, '/advertising/checkAdvertisingStatus')
            })

        } else {
            layer.msg('请选择需要通过审核的素材', { icon: 7 });
        }
    });

    // 审核不通过
    $('.noPassBtn').click(function () {
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
                auditMethods('0', noPassList, '/advertising/checkAdvertisingStatus')
            })
        } else {
            layer.msg('请选择需要不通过审核的素材', { icon: 7 });
        }
    })
    //
    // 编辑确定修改
    $('.editConfirmBtn').click(function () {
        var editValDataConfirm = form.val("editValData");

        if (!editValDataConfirm.materialName) {
            layer.msg('素材名不能空', { icon: 7 });
            return;
        }
        $('.mask').fadeIn();
        $('.maskSpan').addClass('maskIcon');
        if (valData.checkStatus == '0') {
            loadingAjax('/advertising/findAdvertising', 'post', JSON.stringify({ id: valData.vid }),
                sessionStorage.token, '', '', '', layer).then(res => {
                if (res.data == '0') {
                    editImgVideo = valData.img;
                    editSize = editSize ? editSize.slice(0, 4) : valData.size;
                    if ((editImgVideo.indexOf('jpg') > 1 ||
                        editImgVideo.indexOf('png') > 1 || editImgVideo.indexOf('gif') > 1 &&
                        editValDataConfirm.materiaAttribute == '0') || (editImgVideo.indexOf('mp4') > 1
                        && editValDataConfirm.materiaAttribute == '1')) {
                        editMaterial(
                            valData.vid,
                            editValDataConfirm.materialName,
                            editValDataConfirm.materiaAttribute,
                            editValDataConfirm.materiaStatus,
                            editValDataConfirm.materiaType,
                            editDuration,
                            editImgVideo,
                            editSize,
                            valData.url);
                    } else {
                        layer.msg('素材属性不正确', { icon: 7 });
                    }
                }
                else {
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
            }).catch(err => {
                layer.msg(err.message, { icon: 2 });
            });
        }
        else {
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
            url: `${vApi}/fileUpload`,
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
            }, error: function (err) {
                $('.mask').fadeOut();
                $('.maskSpan').removeClass('maskIcon')
                layer.msg('图片上传失败', { icon: 2 })
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
            url: `${vApi}/fileUpload`,
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
            }, error: function (err) {
                $('.mask').fadeOut();
                $('.maskSpan').removeClass('maskIcon');
                layer.msg('视频上传失败', { icon: 2 })
            }
        })

    })

    // 编辑素材            id 名字  属性                   是否启用         类别            时长    原图  大小 微缩图
    function editMaterial(vid, name, advertisingAttribute, advertisingStatus, advertisingType, duration, img, size, url) {
        var editObj = JSON.stringify({
            vid,
            name,
            advertisingAttribute,
            advertisingStatus,
            advertisingType,
            duration,
            img,
            url,
            size
        });
        loadingAjax('/advertising/updateAdvertising', 'post', editObj, sessionStorage.token, 'mask', 'editMaterialCont', 'uploadMateriaBox', layer).then(res => {
            tableIns.reload({
                where: {
                }
            });
            editImgVideo = null;
            layer.msg(res.message, { icon: 1 });
        }).catch(err => {
            layer.msg(err.message, { icon: 2 })
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
            url: `${vApi}/fileUpload`,
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
            }, error: function (err) {
                $('.mask').fadeOut();
                $('.maskSpan').removeClass('maskIcon')
                layer.msg('上传视频失败', { icon: 2 })
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
                setTimeout(() => {
                    if (addList.materiaAttribute == '0') {
                        // 上传图片
                        $.ajax({
                            type: 'post',
                            url: `${vApi}/fileUpload`,
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
                            }, error: function (err) {
                                $('.mask').fadeOut();
                                $('.maskSpan').removeClass('maskIcon')
                                layer.msg('上传图片失败', { icon });
                                return false;
                            }
                        })
                    };
                    // 提交
                    var addFooderObj = JSON.stringify({
                        advertisingAttribute: addList.materiaAttribute,//属性
                        advertisingStatus: addList.materiaStatus,//是否启用
                        advertisingType: addList.materiaType,//横竖屏
                        duration: tol,//播放时长
                        img: imgVideoHttp,//素材
                        name: addList.materialName,//素材名
                        size: ImgVideoSize.slice(0, 4),//大小
                        merchantId: merchantId
                    })
                    loadingAjax('/advertising/saveAdvertising', 'post', addFooderObj, sessionStorage.token, 'mask', 'uploadMaterialCont', 'uploadMateriaBox', layer).then(res => {
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
                    }).catch(err => {
                        layer.msg(err.message, { icon: 2 })
                    })
                }, 300)

            } else {
                layer.msg('请上传图片或视频', { icon: 7 })
            }
        } else {
            layer.msg('带*为必填', { icon: 7 })
        }
    })

    // 提交审核，审核通过，审核不通过方法
    function auditMethods(type, data, url) {
        loadingAjax(url, 'post', JSON.stringify({ data, type }), sessionStorage.token, 'mask', '', '', layer).then(res => {
            layer.msg(res.message, { icon: 1 });
            tableIns.reload({
                where: {
                }
            })
        }).catch(err => {
            if (err.code == 202) {
                layer.msg(err.message, { icon: 7 });
                tableIns.reload({
                    where: {
                    }
                });
            } else {
                layer.msg(err.message, { icon: 2 });
            }
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
        console.log(canvas.toDataURL("image/jpg"))
    };


    var dataList = treeList();
    treeFun1(tree, 'test1', tableIns, dataList);
    function treeFun1(tree, element, tableID, data) {
        tree.render({
            elem: `#${element}`,
            id: 'treelist',
            showLine: !0 //连接线
            ,
            onlyIconControl: true, //左侧图标控制展开收缩
            data,
            spread: true,
            text: {
                defaultNodeName: '无数据',
                none: '您没有权限，请联系管理员授权!'
            },
            click: function (obj) {
                merchantId = String(obj.data.id);
                tableID.reload({
                    where: {
                        merchantId: merchantId,
                        merchant_id: obj.data.id
                    }
                })
                var nodes = $(`#${element} .layui-tree-txt`)
                for (var i = 0; i < nodes.length; i++) {
                    if (nodes[i].innerHTML === obj.data.title)
                        nodes[i].style.color = "#be954a";
                    else
                        nodes[i].style.color = "#555";
                }
            },
        });
    };
    // 监听f5刷新
    $("body").bind("keydown", function (event) {
        if (event.keyCode == 116) {
            f5Fun()
        }
    });
    //刷新
    $('.refreshBtn').click(function () {
        location.reload();
    });

    // 刷新商户列表
    $('.refreshBtnList').click(function () {
        var dataList1 = treeList();
        if (JSON.stringify(dataList1) != JSON.stringify(dataList)) {
            dataList = dataList1;
            treeFun1(tree, 'test1', tableIns, dataList, 'merchantId')
            tableIns.reload({
                where: {
                    'merchantId': Number(merchantId)
                }
            })
            layer.msg('已刷新', { icon: 1 })
        } else {
            layer.msg('已刷新', { icon: 1 })
        }

    })

    // 图片放大事件
    var PImgSHow = true;
    $('.data-list').on('mouseenter', '.pic102', function (e) {
        var that = this;
        $('#pic101').attr('src', $(that).attr('src'));
        var img = new Image();
        img.onload = function () {
            $("#pic101").css({
                "width": this.width >= this.height ? 350 + 'px' : 'auto',
                "height": this.height > this.width ? 350 + 'px' : 'auto'
            }).fadeIn("fast");
            this.onload = null;

        };
        img.src = $(that).attr('src');
    });
    $('.data-list').on('click', '.pic102', function () {
        event.stopPropagation();
        PImgSHow = false;
    });
    $('.data-list').on('mouseleave', '.pic102', function () {
        if (PImgSHow) {
            $('#pic101').hide();
        }
    });
    $('#pic101').click(function () {
        event.stopPropagation();
    });
    $('body').click(function () {
        PImgSHow = true;
        $('#pic101').hide();
        $('.ListOperation').fadeOut();
        operationFlag = null;
    });
    $('#pic101').mouseenter(function () {
        $('#pic101').show();
    })
    $('#pic101').mouseleave(function () {
        if (PImgSHow) {
            $('#pic101').hide();
        }
    })
});
