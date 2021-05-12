import '../../MyCss/goods/customGoods.css'

layui.use(['table', 'form', 'layer', 'layedit', 'tree'], function () {
    // tooltip('.refreshBtnList', {transition: true, time: 200},);
    var $ = layui.jquery,
        tree = layui.tree,
        permissionsData0 = window.parent.permissionsData1(),
        permissionsObj = {
            377: false,
            378: false,
            375: false,
            416: false,
            415: false,
            461: false,
        },
        permissionsObjFlag = permissionsVal1(permissionsObj, permissionsData0);

    function permissions() {
        permissionsObjFlag[377] ? $('.add-btn').removeClass('hide') : $('.add-btn').addClass('hide');
        permissionsObjFlag[378] ? $('.ListOperation .edit').removeClass('hide') : $('.ListOperation .edit').addClass('hide');
        permissionsObjFlag[375] ? $('.ListOperation .del').removeClass('hide') : $('.ListOperation .del').addClass('hide');
        permissionsObjFlag[416] ? $('.pushGoodsBtn').removeClass('hide') : $('.pushGoodsBtn').addClass('hide');
        permissionsObjFlag[415] ? $('.pushListBtn').removeClass('hide') : $('.pushListBtn').addClass('hide');
        permissionsObjFlag[461] ? $('.syncBtn').removeClass('hide') : $('.syncBtn').addClass('hide');
    };
    permissions();

    // 收起
    $('.sidebar i').click(function () {
        $('.left-mian').hide();
        $('.on-left').show()
    });
    $('.on-left').click(function () {
        $('.left-mian').show();
        $('.on-left').hide()
    });
    var table = layui.table;
    // wangEditor 获取全局属性
    var E = window.wangEditor;
    // 商品图片
    var goodsImage = null;
    var token = sessionStorage.token + '';
    var tableIns = table.render({
        elem: '#tableTest'
        , url: `${vApi}/goods/findAll`
        , method: 'post',
        contentType: "application/json",
        headers: {
            token,
        },
        cols: [[
            {align: 'center', type: 'checkbox', fixed: 'left'},
            {field: 'goods_images', width: 100, title: '图片', templet: "#imgtmp", align: 'center', fixed: 'left'},
            {field: 'goods_Core', width: 180, title: '商品编号', align: 'center', fixed: 'left'},
            {
                fixed: 'left',
                field: 'goods_Name',
                width: 200,
                title: '商品名',
                color: '#409eff',
                align: 'center',
                templet: function (d) {
                    return (d.mail == 1 ? '(邮寄)' + d.goods_Name : d.goods_Name)
                }
            },
            {
                field: 'mail', width: 120, title: '是否邮寄商品', align: 'center', templet: function (d) {
                    return d.mail == 0 ? '否' : '是'
                }
            },
            {
                field: 'goods_Status', width: 120, title: '商品状态', align: 'center', templet: function (d) {
                    return d.goods_Status == 1 ? '启用' : '不启用'
                }
            },
            {field: `classifyName`, width: 120, title: '商品类目', align: 'center'},
            {
                field: 'goods_Price',
                width: 120,
                align: 'center',
                title: '销售价 ',
                templet: d => percentileMoney(d.goods_Price)
            },
            {
                field: 'goods_Cost',
                width: 120,
                align: 'center',
                title: '成本价 ',
                templet: d => percentileMoney(d.goods_Cost)
            },
            {field: 'goods_Param', width: 120, title: '规格说明 ', align: 'center'},
            // { field: 'vipPrice', width: 120, title: '会员价 ' },
            // { field: 'strategy', width: 120, title: '优惠价策略 ' },
            // { field: 'goodsActivity', width: 120, title: '其他活动 ' },
            {
                field: 'create_user', width: 130, title: '创建人 ', align: 'center'
            },
            {
                field: 'goods_Time', width: 200, title: '创建时间 ', align: 'center', templet: function (d) {
                    if (d.goods_Time) {
                        return timeStamp(d.goods_Time)
                    } else {
                        return '-';
                    }
                }
            },
            {field: 'update_user', width: 130, title: '最后修改人 ', align: 'center'},
            {
                field: 'update_time', width: 200, title: '最后修改时间 ', align: 'center', templet: function (d) {
                    if (d.update_time) {
                        return timeStamp(d.update_time)
                    } else {
                        return '-';
                    }
                }
            },

            {
                field: 'operation',
                fixed: 'right',
                align: 'center',
                position: 'absolute',
                right: 0,
                width: 150,
                title: '操作',
                toolbar: '#barDemo'
            },
            // { fixed: 'right', width: 160, align: 'center', toolbar: '#barDemo' }
        ]]
        , id: 'tableId'
        , page: true
        , loading: true,
        // ,method:'post'
        limits: [100, 50, 20, 10],

        request: {
            'pageName': 'pageNum',
            'limitName': 'pageSize'
        },
        where: {
            condition: sessionStorage.machineID,
            // mail:1
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
            permissions();
            if (res.code == 403) {
                window.parent.location.href = "login.html";
            } else if (res.code == 405) {
                $('.hangContent').show();
            }
            fixedFun();
        }

    });


    // TODO 关联分则规则
    $('.relation').click(function () {
        console.log(singleData, 'relationData');
        $('.text').html(`${singleData.info} 关联分则规则`);
        $('.relationRules').show();
        // if (singleData.payType.indexOf('4') > -1) {
        //     $('.relationRules').show();
        //     getRulesList(singleData.machineId).then(res => {
        //         form.val('relationRules', {
        //             status: singleData.status,
        //             accsplitRuleNo: singleData.accsplitRuleNo
        //         })
        //     })
        // } else {
        //     layer.msg('您的支付方式不是杉德支付，不能关联分则规则', {icon: 7});
        // }
    });

    // 获取分账列表
    function getRulesList(merchantId) {
        return new Promise((resolve, reject) => {
            loadingAjax('/accSplit/getAccRule', 'post', JSON.stringify({
                pageNum: 1,
                pageSize: 200,
                merchantId,
            }), sessionStorage.token).then(res => {
                var optionList = ``;
                $.each(res.data.list, function (index, ele) {
                    optionList += `<option value="${ele.accsplitRuleNo}">${ele.accsplitRuleName}</option>`
                });
                $('#rules').html(optionList);
                form.render('select');
                resolve();
            }).catch(err => {
                reject(err);
            })
        })
    }

    // 提交分账
    $('.relationBtn').click(function () {
        let data = form.val('relationRules');
        data['machineId'] = machineSetData.machineId;
        data['payId'] = machineSetData.payType;
        loadingAjax('/accSplit/associationRule', 'post', JSON.stringify(data), token).then(res => {
            if (res.code === 200) {
                layer.msg('关联成功', {icon: 1});
                machineList.reload({
                    where: {}
                })
                hideRules();
            } else {
                layer.msg('失败', {icon: 2})
            }
        }).catch(err => {
            layer.msg(err, {icon: 2})
        })
    });

    // 取消分账
    function hideRules() {
        $('.relationRules').hide();
    }

    $('.relationRules .cancelBtn').click(function () {
        hideRules();
    })


    // 商品状态下拉框数据请求
    var form = layui.form;

    function selectData(merchantId, index) {
        loadingAjax('/classify/findAll', 'post', JSON.stringify({
            pageNum: 1,
            pageSize: 200,
            merchantId,
        }), sessionStorage.token).then(res => {
            var optionList = `<option value="">全部</option>`;
            if (index == 1) {
                $('#addGoodsType').empty();
            }
            $('#EditGoodsType').empty();
            $('#GoodsType').empty();
            $.each(res.data.list, function (index, ele) {
                optionList += `<option value="${ele.classifyId}">${ele.classifyName}</option>`
            });
            if (index == 1) {
                $('#addGoodsType').append(optionList);
            }
            $('#EditGoodsType').append(optionList);
            $('#GoodsType').append(optionList);
            form.render('select');
        }).catch(err => {
        })
    }

    selectData(sessionStorage.machineID, 1);
    // 查询商品类型id
    var GoodsTypeID = '';
    // 监听商品类型下拉框
    form.on('select(mySelect1)', function (data) {
        console.log(data)
        GoodsTypeID = data.value;
    });
    var stateId = ''
    // 状态下拉框监听
    form.on('select(stateSelect)', function (data) {
        stateId = data.value;
    });

    // 点击查询事件，重新渲染数据表格
    $('.query-btnClick').click(function () {
        tableIns.reload({
            where: {
                conditionTwo: $(".KyeText").val(), //关键字
                conditionThree: GoodsTypeID, //分类
                conditionFour: stateId, //商品状态
            }
        })
    })

    // 监听操作删除
    var indexFlag = null,
        operationId = null,
        // 剪切图片判断条件
        editGoodsImg = null,
        addGoodsImgIndex = null,
        singleData = null,
        EditIndex = null,
        operationFlag = null,
        goodsObj = null;
    table.on('tool(test)', function (obj) {
        // 操作事件
        event.stopPropagation();
        singleData = obj.data;
        goodsObj = obj
        if (obj.event === 'operation') {
            if (operationFlag == obj.data.goods_Id) {
                $('.ListOperation').fadeOut();
                operationFlag = null;
                return;
            }
            operationFlag = obj.data.goods_Id;
            $('.ListOperation').fadeIn();
            $('.ListOperation').css({
                left: $(this).offset().left - 35 + 'px',
                top: $(this).offset().top + 35 + 'px'
            })
        }
    });

    // 编辑
    $('.ListOperation .edit').click(function () {
        $('.anUp').slideUp();
        // $('.editor').fadeIn();
        popupShow('editor', 'editor-content');
        $('.editor').scrollTop(0)
        form.val("EditValData", { //formTest 即 class="layui-form" 所在元素属性 lay-filter="" 对应的值
            "goodsBarcode": singleData.goods_Core // "商品条码
            , "goodsName": singleData.goods_Name //商品名
            , "goodsType": singleData.classify_Id //商品类型
            // , "goodsBrand": singleData.brand  //品牌
            , "goodsPrice": singleData.goods_Price //零售价
            , "goodsCost": singleData.goods_Cost //成本价
            , "goodsParam": singleData.goods_Param //规格描述
            , 'goodsStatus': singleData.goods_Status, //商品状态
            'cycle': singleData.cycle, // 分账周期(月结: 0,日结: 1): cycle
            'acc_split_total_rate': singleData.acc_split_total_rate, // 分账占订单金额比例: acc_split_total_rate
            'acc_split_rule': singleData.acc_split_rule, // 分账规则编号:
        });
        console.log(singleData.mail, 'hdkjfksjdhfkjsdhfjk')
        singleData.mail == 1 ? $('.editor input[name="editmail"]').prop('checked', true) : $('.editor input[name="editmail"]').prop('checked', false)
        $('#editImg').attr("src", singleData.goods_images)
        var singGoodsDateils = singleData.goods_Descript.replace(/video/g, 'iframe')
        editWangEditor.txt.html(singGoodsDateils);
        form.render();// 重新渲染一下

    });
    // 预览
    $('.ListOperation .goodsPreview').click(function () {
        popupShow('reading', 'margin0');
        $('.reading .playHeader span').html('商品详情页预览')
        $('.reading-box').html(singleData.goods_Descript)
    });
    // 删除
    $('.ListOperation .del').click(function () {
        layer.confirm('确定删除？', function (index) {
            Goodsdel(singleData.goods_Id, 1, goodsObj, index);
        });
    })
    // 选择商品图片
    $('.upload-btn1').click(function () {
        addGoodsImgIndex = 1;
        logoCont = 1;
        conditionFour = 0
        materialCont();
        popupShow('GoodsMaterial', 'goodsMaterialBox');
    });
    // wangEditor 富文本编辑器创建
    var editWangEditor = new E('#editWangEditor')
    editWangEditor.customConfig.uploadImgHooks = {
        error: function (xhr, editWangEditor) {
            layer.msg('图片上传失败')
        },
    };
    editWangEditor.create();
    // 修改商品信息点击事件
    $('.editDetermine-btn').click(function () {
        indexFlag = null;
        var EditValData = form.val("EditValData");
        console.log(EditValData)
        if (EditValData.goodsParam && EditValData.goodsBarcode && EditValData.goodsName && EditValData.goodsType && EditValData.goodsPrice) {
            if (!(EditValData.goodsPrice > 0)) {
                layer.msg('同一销售价必须大于0', {icon: 7});
                return;
            }
            var editGoodsDateils = editWangEditor.txt.html().replace(/iframe/g, 'video  controls="false"')
            var editGoodsObj = JSON.stringify({
                goods_Id: singleData.goods_Id,
                goods_Core: EditValData.goodsBarcode, //商品条码
                goods_Name: EditValData.goodsName,   //商品名
                classify_Id: EditValData.goodsType,     //商品类型
                brand: EditValData.goodsBrand,        //品牌
                goods_Price: EditValData.goodsPrice,  //零售价
                goods_Cost: EditValData.goodsCost ? EditValData.goodsCost : 0,    //成本价
                goods_Param: EditValData.goodsParam,  //规格
                goods_Status: EditValData.goodsStatus, //状态
                goods_Images: $('#editImg').attr("src"), //商品图片 不在form里
                goods_Descript: editGoodsDateils, //商品详情，编辑器里的内容
                mail: $('.editor input[name="editmail"]').prop('checked') ? 1 : 0,
                'cycle': EditValData.cycle, // 分账周期(月结: 0,日结: 1): cycle
                'acc_split_total_rate': EditValData.acc_split_total_rate, // 分账占订单金额比例: acc_split_total_rate
                'acc_split_rule': EditValData.acc_split_rule, // 分账规则编号:
            });
            $('.mask').fadeIn();
            $('.maskSpan').addClass('maskIcon');
            loadingAjax('/goods/updateGoods', 'post', editGoodsObj, sessionStorage.token, 'mask', '', '', layer).then(res => {
                layer.msg('修改成功', {icon: 1});
                editGoodsDateils = '';
                $('.editor').fadeOut();
                tableIns.reload({
                    where: {}
                });
            }).catch(err => {
                layer.msg(err.message, {icon: 2})
            })
        } else {
            layer.msg('带*为必填', {icon: 7})
        }
    })
    //  取消优惠按钮
    $('.preferential .cancel-btn').on('click', function () {
        $('.preferential').fadeOut();
        indexFlag = null;
    })

    // 编辑器初始化
    var layedit = layui.layedit;
    layedit.set({
        uploadImage: {
            url: `${vApi}/fileUpload`,//接口url
            headers: {
                token,
            }
            , type: 'post' //默认post
            , code: 200 //0表示成功，其它失败

        },

    })


    // 取消编辑按钮
    $('.editor .cancel-btn').click(function () {
        $('.editor').fadeOut();
        indexFlag = null;
    });

    // 添加自定义商品部分
    var addGoodsImg = null;
    // 1为logo 2为内容
    var logoCont = null;
    $('.add-btn').click(function () {
        // $('.addGoods').fadeIn();
        popupShow('addGoods', 'editor-content');
        $('.addGoods').scrollTop(0);
        $('.tailoring-container').fadeIn();
    });

    // 取消添加自定义商品
    $('.addGoods .cancel-btn2').click(function () {
        // $('.addGoods').fadeOut();
        popupHide('addGoods', 'editor-content');
        $('.upload-demo2 .upload-list2').fadeOut();
    });

    // 添加商品点击上传图片

    $('.upload-btn2').click(function () {
        // console.log(editor.txt.html())
        addGoodsImgIndex = 2;
        logoCont = 1;
        conditionFour = 0;
        materialCont();
        popupShow('GoodsMaterial', 'goodsMaterialBox');
    });

    // wangEditor 富文本编辑器创建
    var addWangEditor = new E('#addWangEditor');
    addWangEditor.customConfig.menus = [
        'head',  // 标题
        'bold',  // 粗体
        'fontSize',  // 字号
        'fontName',  // 字体
        'italic',  // 斜体
        'underline',  // 下划线
        'strikeThrough',  // 删除线
        'foreColor',  // 文字颜色
        'backColor',  // 背景颜色
        'link',  // 插入链接
        'list',  // 列表
        'justify',  // 对齐方式
        'quote',  // 引用
        'emoticon',  // 表情
        'image',  // 插入图片
        'table',  // 表格
        'video',  // 插入视频
        'undo',  // 撤销
        'redo'  // 重复
    ];
    addWangEditor.customConfig.uploadImgHooks = {
        error: function (xhr, addWangEditor) {
            layer.msg('图片上传失败')
        },
    }

    // 编辑器上传视频弹窗tba切换
    var videoTabFlag = true;
    // 点击编辑器视频事件
    var materialType = null;
    $('.upVideo').click(function (e) {
        materialType = $(this).attr('typeID')
        popupShow('goodsmaterialVideo', 'materialBox');
        if (!videoTable) {
            materVideoCont();
        }
    });

    addWangEditor.create();
    // 点击确定添加
    $('.determine-btn2').click(function () {

        var addValData = form.val("addValData");
        console.log(addValData);
        console.log($('.addGoods input[name="mail"]'));
        console.log($('.addGoods input[name="mail"]').prop('checked'));
        // &&addValData.goodsBrand
        if (addValData.goodsParam && addValData.goodsBarcode && addValData.goodsName && addValData.goodsType && addValData.goodsPrice) {
            if (addGoodsImg) {
                if (!(addValData.goodsPrice > 0)) {
                    layer.msg('同一销售价必须大于0', {icon: 7});
                    return;
                }
                var addGoodsDateails = addWangEditor.txt.html().replace(/iframe/g, 'video controls="false"');
                var addGoodsObj = JSON.stringify({
                    goods_Core: addValData.goodsBarcode, //商品条码
                    goods_Name: addValData.goodsName,   //商品名
                    classify_Id: addValData.goodsType,     //商品类型
                    brand: addValData.goodsBrand,        //品牌
                    goods_Price: addValData.goodsPrice,  //零售价
                    goods_Cost: addValData.goodsCost ? addValData.goodsCost : 0,    //成本价
                    goods_Param: addValData.goodsParam,  //规格
                    goods_Status: addValData.goodsStatus, //状态
                    goods_Images: addGoodsImg, //商品图片 不在form里
                    goods_Descript: addGoodsDateails, //商品详情，编辑器里的内容
                    merchantId: sessionStorage.machineID,
                    mail: $('.addGoods input[name="mail"]').prop('checked') ? 1 : 0,
                    'cycle': +addValData.cycle, // 分账周期(月结: 0,日结: 1): cycle
                    'acc_split_total_rate': addValData.acc_split_total_rate, // 分账占订单金额比例: acc_split_total_rate
                    'acc_split_rule': addValData.acc_split_rule, // 分账规则编号:
                });
                $('.mask').fadeIn();
                $('.maskSpan').addClass('maskIcon');
                loadingAjax('/goods/saveGoods', 'post', addGoodsObj, sessionStorage.token, 'mask', '', '', layer).then(res => {
                    $('.addGoods').fadeOut();
                    $('.upload-demo2 .upload-list2').fadeOut();
                    addGoodsImg = null;
                    form.val("addValData", {
                        "goodsBarcode": '',
                        "goodsName": '',
                        "goodsType": '',
                        "goodsBrand": '',
                        "goodsPrice": '',
                        "goodsCost": 0,
                        "goodsParam": '',
                        'cycle': '', // 分账周期(月结: 0,日结: 1): cycle
                        'acc_split_total_rate': '', // 分账占订单金额比例: acc_split_total_rate
                        'acc_split_rule': '', // 分账规则编号:
                    });
                    addGoodsDateails = '';
                    layer.msg('添加成功', {icon: 1});
                    tableIns.reload({
                        where: {}
                    })
                    addWangEditor.txt.clear();
                }).catch(err => {
                    layer.msg(err.message, {icon: 2})
                })
            } else {
                layer.msg('请上传商品图片', {icon: 7})
            }

        } else {
            layer.msg('带*为必填', {icon: 7})
        }
    });


    // 富文本阅览部分
    $('.reading-btn').click(function () {
        popupShow('reading', 'margin0');
        if ($(this).attr('id') == 'add') {
            $('.reading').fadeIn();
            $('.reading .playHeader span').html('商品详情页预览')
            $('.reading-box').html(addWangEditor.txt.html())
        } else if ($(this).attr('id') == 'edit') {
            $('.reading .playHeader span').html('商品详情页预览')
            $('.reading-box').html(editWangEditor.txt.html())
        }
    });

    // 关闭富文本弹窗
    $('.reading-down').click(function () {
        $('.Goods-wrap').removeClass('fixed');
        $('.reading').fadeOut();
        indexFlag = null;
    });
    // 关闭弹窗
    $('.playHeader .close').click(function () {
        $(this).parent().parent().addClass('margin0')
        $(this).parents('.maskContnet').fadeOut();
        indexFlag = null;
    });

    // 商品素材部分

    // 图片素材
    var conditionFour = null;
    var advertisingLis = null;

    function materialCont() {
        advertisingLis = table.render({
            elem: '#materiaImgTable',
            method: 'post',
            url: `${vApi}/good_material/getGoodMaterial`,
            contentType: "application/json",
            headers: {
                token,
            },
            cols: [[
                {field: 'img', title: '图片', align: 'center', templet: "#materiaImgtmp"},
                {field: 'name', title: '图片名', align: 'center',},
                // { field: 'number', width: 200, title: '图片编号', },
                {field: 'publishTime', title: '发布时间', align: 'center'},
                {field: 'addUser', title: '发布人', align: 'center',},
                {
                    field: 'operationa',
                    right: 0,
                    align: 'center',
                    width: 100,
                    title: '操作',
                    toolbar: '#materiaImg',
                    fixed: 'right'
                },
            ]]
            , page: true
            , id: 'ImgListData'
            , loading: true,
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
            where: {
                conditionFour: conditionFour,
                conditionFive: '2',
                conditionSix: materialId
            },
            response: {
                statusCode: 200 //规定成功的状态码，默认：0
            },
            done: function (res) {
                if (res.code == 403) {
                    window.parent.location.href = "login.html";
                } else {

                }
            }
        });
    }


    // 关键字查询
    $('.materialKeyCont .queryBtnClick').click(function () {
        console.log($('.materialKeyCont input[name="KyeText"]').val())
        advertisingLis.reload({
            where: {
                conditionFour: conditionFour,
                conditionFive: '2',
                conditionThree: $('.materialKeyCont input[name="KyeText"]').val()
            }
        })
    })
    $('.goodsmaterialVideo .queryBtnClick').click(function () {
        videoTable.reload({
            where: {
                conditionFour: '1',
                conditionFive: '2',
                conditionThree: $('.goodsmaterialVideo input[name="KyeText"]').val()
            }
        })
    })

    // 监听素材图片确定
    table.on('tool(materiaImgTable)', function (obj) {
        // 1为商品图片 2为内容图片
        if (obj.event == 'add') {
            if (logoCont == 1) {
                // 1为编辑 2为添加
                if (addGoodsImgIndex == 2) {
                    addGoodsImg = obj.data.img;
                    $('#GoodsImg').attr("src", addGoodsImg);
                    $('.upload-demo2 .upload-list2').fadeIn();
                    popupHide('GoodsMaterial', 'goodsMaterialBox');
                } else {
                    editGoodsImg = obj.data.img;
                    $('#editImg').attr("src", editGoodsImg);
                    popupHide('GoodsMaterial', 'goodsMaterialBox');
                }
            } else {
                if (addGoodsImgIndex == 2) {
                    if (addWangEditor.txt.html().length > 11) {
                        addWangEditor.txt.append(`<p style="text-align: center;"><img src="${obj.data.img}"></img></p>`);
                    } else {
                        addWangEditor.txt.html(`<p style="text-align: center;"><img src="${obj.data.img}"></img></p>`);
                    }
                } else {
                    if (editWangEditor.txt.html().length > 11) {
                        editWangEditor.txt.append(`<p style="text-align: center;"><img src="${obj.data.img}"></img></p>`);
                    } else {
                        editWangEditor.txt.html(`<p style="text-align: center;"><img src="${obj.data.img}"></img></p>`);
                    }
                }
                popupHide('GoodsMaterial', 'goodsMaterialBox');
            }
        } else if (obj.event == 'previewD') {
            popupShow('reading', 'margin0');
            $('.reading .playHeader span').html('商品图片预览')
            $('.reading-box').html(`<img src="${obj.data.img}"/>`)
        }

    });


    // 视频部分
    var videoTable = null;

    function materVideoCont() {
        videoTable = table.render({
            elem: '#materiaVideoTable',
            method: 'post',
            url: `${vApi}/good_material/getGoodMaterial`,
            contentType: "application/json",
            headers: {
                token,
            },
            cols: [[
                // { field: 'Img', width: 150, title: '素材图',templet: "" },
                // { type: 'checkbox', },
                {field: 'name', title: '视频名', align: 'center',},
                {field: 'publishTime', title: '发布时间', align: 'center'},
                {field: 'addUser', title: '发布人', align: 'center',},
                // {field:'operation', width:120, title: 'caozuo', fixed: 'right'}
                {field: 'operation', title: '操作', toolbar: '#barDemoVideo', align: 'center',},

            ]]
            , page: true
            , id: 'VideoListData'
            , loading: true,
            request: {
                'pageName': 'pageNum',
                'limitName': 'pageSize'
            },
            where: {
                conditionFour: '1',
                conditionFive: '2',
                conditionSix: materialId,
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
                    window.parent.location.href = "login.html";
                } else {

                }
            }
        });
    }


    table.on('tool(materiaVideoTable)', function (obj) {
        console.log(obj)
        if (obj.event == 'preview') {
            popupShow('materialPreview', 'previewBox');
            $('.perviewBody video').attr('src', obj.data.img);
            console.log(materialType);
        } else {
            console.log(materialType);
            if (materialType == 2) {
                if (addWangEditor.txt.html().length > 11) {
                    addWangEditor.txt.append(`<div><iframe src="${obj.data.img}"></iframe></div>`);
                } else {
                    addWangEditor.txt.html(`<div><iframe src="${obj.data.img}"></iframe></div>`);
                }
                popupHide('goodsmaterialVideo', 'materialBox');
            } else {
                if (editWangEditor.txt.html().length > 11) {
                    editWangEditor.txt.append(`<div><iframe src="${obj.data.img}"></iframe></div>`);
                } else {
                    editWangEditor.txt.html(`<div><iframe src="${obj.data.img}"></iframe></div>`);
                }
                popupHide('goodsmaterialVideo', 'materialBox');
            }
        }
    })


    // 富文本编辑器选择图片
    $('.upImg').click(function () {
        logoCont = $(this).attr('contType');
        addGoodsImgIndex = $(this).attr('goodsIndex');
        conditionFour = 2
        // console.log(logoCont, addGoodsImgIndex);
        popupShow('GoodsMaterial', 'goodsMaterialBox');
        materialCont();

    });
    // 刷新商户列表
    $('.refreshBtnList').click(function () {
        var dataList1 = treeList();
        if (JSON.stringify(dataList1) != JSON.stringify(dataList)) {
            dataList = dataList1;
            treeFun1(tree, 'testGoods', tableIns, dataList, 'condition', 'goodsClass', selectData)
            tableIns.reload({
                where: {
                    condition: sessionStorage.machineID,
                }
            });
            layer.msg('已刷新', {icon: 1})
        } else {
            layer.msg('已刷新', {icon: 1})
        }
    })
    //树状图
    var materialId = sessionStorage.machineID;
    var dataList1 = null;
    var dataList = dataList1 = treeList();
    // var dataList1 = treeList();
    // console.log(dataList)
    treeFun1(tree, 'testGoods', tableIns, dataList, 'condition', 'goodsClass', selectData)

    function treeFun1(tree, element, tableID, data, key, goodsCLass, selectData,) {
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
                if (permissionsObjFlag[377]) {
                    if (obj.data.id == sessionStorage.machineID) {
                        $('.add-btn').show()
                    } else {
                        $('.add-btn').hide()
                    }
                }
                materialId = obj.data.id + '';
                if (goodsCLass) {
                    selectData(obj.data.id + '');
                }
                // sessionStorage.merchantIdData = obj.data.id;
                tableID.reload({
                    where: {
                        [key]: obj.data.id + '',
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
    }

    // 接收列表非强制
    var parentGoods = null;

    function parentGoodsList() {
        parentGoods = table.render({
            elem: '#parentTableTest'
            , url: `${vApi}/goods/getSendHistory`
            , method: 'post',
            height: 500,
            contentType: "application/json",
            headers: {
                token,
            },
            cols: [[
                {type: 'checkbox'},
                {field: 'goods_images', title: '图片', templet: "#Listimgtmp", align: 'center'},
                {
                    field: 'goods_Name',

                    title: '商品名',
                    color: '#409eff',
                    align: 'center',
                    templet: function (d) {
                        return (d.mail == 1 ? '(邮寄)' + d.goods_Name : d.goods_Name)
                    }
                },
                {field: `classifyName`, title: '商品类目', align: 'center',},
                {field: `tempMerchant`, title: '商品所属商户', align: 'center',},
                {field: `topMerchant`, title: '推送商户', align: 'center',},
                {field: `targetMerchant`, title: '接收商户', align: 'center',},
                {
                    field: 'goods_Param', title: '接收状态 ', align: 'center', templet: function (d) {
                        return d.received == 0 ? '未接收' : '已接收'
                    }
                },
                {
                    field: 'sendTime', title: '推送时间 ', align: 'center', templet: function (d) {
                        var myDate = new Date(d.sendTime);
                        var y = myDate.getFullYear();
                        var m = myDate.getMonth() + 1;
                        var d = myDate.getDate();
                        var h = myDate.getHours();
                        var min = myDate.getMinutes();
                        var s = myDate.getSeconds();
                        return y + '-' + m + '-' + d + ' ' + h + ':' + min + ':' + s
                    }
                },
            ]]
            , id: 'parentTableId'
            , page: true
            , loading: true
            , limits: [10, 20, 50]
            ,
            request: {
                'pageName': 'pageNum',
                'limitName': 'pageSize'
            },
            where: {
                condition: sessionStorage.machineID,
                conditionFour: '0'
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
                    window.parent.location.href = "login.html";
                }
                ;
                for (var i in res.data) {
                    var item = res.data[i];
                    console.log(item.childMerchantId);
                    if (item.childMerchantId != sessionStorage.machineID || item.received == 1) {// 这里是判断需要禁用的条件（如：状态为0的）
                        // checkbox 根据条件设置不可选中
                        $('.list_table1 tr[data-index=' + i + '] input[type="checkbox"]').prop('disabled', true);
                        form.render();// 重新渲染一下
                    }
                }
            }
        });
    }


    // 推送
    //是否强制推送
    var PType = null;
    // 推送数据
    var pushList = null;
    var checkID = null;
    $('.pushGoodsBtn').click(function () {
        pushList = table.checkStatus('tableId');
        console.log(pushList)
        if (pushList.data.length > 0) {
            leg.tree({
                ele: ".treeList",//选者
                data: dataList1,//数据
                cascade: false,//级联
            });
            popupShow('chooseLower', 'chooseBox');
            $.each($(".treeList input"), function () {
                if (pushList.data[0].merchantId == $(this).val()) {
                    $(this).prop('disabled', true);
                    return;
                }
            })
        } else {
            layer.msg('请选择需要推送的商品', {icon: 7})
        }
    });
    // 确定推送
    var role = null;
    $('.determineBtn').click(function () {
        role = leg.getCheckedNodes().map(Number)
        console.log(leg.getCheckedNodes());
        if (role.length == 0) {
            layer.msg('请选择要推送的商户', {icon: 7})
            return;
        }

        popupShow('PushMandatory', 'MandatoryBox')
        console.log(pushList)

    });
    $('.mandatroFooter div').click(function () {
        var pushArray = [];
        PType = $(this).attr('Ptype');
        $('.mask').fadeIn();
        $('.maskSpan').addClass('maskIcon');
        pushList.data.forEach((item, index) => {
            var pushObj = {
                className: item.classifyName,
                goodsId: item.goods_Id,
            }
            pushArray.push(pushObj)
        });
        var pushData = JSON.stringify({
            goods: pushArray,
            merchantId: sessionStorage.machineID,
            mid: role,
            type: PType
        })
        loadingAjax('/goods/sendGoods', 'post', pushData, token, 'mask', 'chooseLower', 'chooseBox', layer).then((res) => {
            console.log(res);
            if (parentGoods) {
                parentGoods.reload({
                    where: {}
                })
            }
            popupHide('PushMandatory', 'MandatoryBox')
            layer.msg(res.message, {icon: 1})
        }).catch((err) => {
            $('.mask').fadeOut();
            $('.maskSpan').removeClass('maskIcon');
            popupHide('PushMandatory', 'MandatoryBox')
            layer.msg(err.message, {icon: 2})
        })
    })
    // 取消
    $('.chooseFooter .chooseCan').click(function () {
        popupHide('chooseLower', 'chooseBox')
    })


    // 推送列表
    $('.pushListBtn').click(function () {
        popupShow('topGoodsList', 'topBox');
        if (!parentGoods) {
            setTimeout(() => {

                parentGoodsList();
            }, 500)
        }
    })
    // 推送列表查询
    $('.topBody .pushQueryBtn').click(function () {
        parentGoods.reload({
            where: {
                conditionTwo: $('.topBody select[name="mandatory"]').val(), //是否强制
                conditionThree: $('.topBody select[name="receiveStatus"]').val(),  //是否接收
                conditionFour: $('.topBody select[name="receiveType"]').val(), //发送接收
                goods_Name: $('.topBody input[name="KyeText"]').val()
            }
        })
    })
    //接收商品
    $('.topBody .pushGoodsListBtn').click(function () {
        var receiveList = table.checkStatus('parentTableId');
        console.log(receiveList)
        var receiveArray = [];
        if (receiveList.data.length > 0) {
            receiveList.data.forEach((item, index) => {
                if (item.childMerchantId == sessionStorage.machineID && item.received == 0) {
                    var receiveObj = {
                        className: item.classifyName,
                        goodsId: item.goods_Id,
                        merchantId: sessionStorage.machineID
                    }
                    receiveArray.push(receiveObj)
                }
            })
            if (!(receiveArray.length > 0)) {
                layer.msg('没有能接收的商品', {icon: 7});
                return;
            }
            $('.mask').fadeIn();
            $('.maskSpan').addClass('maskIcon');
            var receiveData = JSON.stringify({
                goods: receiveArray,
                merchantId: sessionStorage.machineID
            })
            loadingAjax('/goods/forwardGoods', 'post', receiveData, sessionStorage.token, 'mask', 'topGoodsList', 'topBox', layer).then((res) => {
                console.log(res)
                layer.msg(res.message, {icon: 1});
                tableIns.reload({
                    where: {}
                });
                parentGoods.reload({
                    where: {}
                })
            }).catch((err) => {
                $('.mask').fadeOut();
                $('.maskSpan').removeClass('maskIcon');
                layer.msg(err.message, {icon: 2})
            })
        } else {
            layer.msg('请选择接收的商品', {icon: 7})
        }
    })
    // 监听f5刷新
    $("body").bind("keydown", function (event) {
        if (event.keyCode == 116) {
            event.preventDefault(); //阻止默认刷新
            location.reload();
            //采用location.reload()在火狐下可能会有问题，火狐会保留上一次链接
            // location = location;
        }
    });
    // 同步价格部分
    $('.syncBtn').click(function () {
        popupShow('synchronousCont', 'synchronousBox');
        $('.synchronousGoodsName').val();
        $('.synchronousMachineName').val();
        synchronousGoodsFun();
        machineTableFun();
    })
    // 同步商品价格列表；
    var synchronousGoodsTable = null;

    function synchronousGoodsFun() {
        synchronousGoodsTable = table.render({
            elem: '#cGoodsTable'
            , url: `${vApi}/goods/findAll`
            , method: 'post',
            contentType: "application/json",
            headers: {
                token,
            },
            cols: [[
                {checkbox: true},
                {field: 'goods_images', title: '图片', templet: "#imgtmp", align: 'center'},
                {field: 'goods_Core', title: '商品编号', align: 'center'},
                {
                    field: 'goods_Name',
                    title: '商品名',
                    color: '#409eff',
                    align: 'center',
                    templet: function (d) {
                        return (d.mail == 1 ? '(邮寄)' + d.goods_Name : d.goods_Name)
                    }
                },
                {
                    field: 'goods_Price', align: 'center', title: '销售价 ', templet: d => percentileMoney(d.goods_Price)
                },
                {
                    field: 'mail', title: '是否邮寄商品', align: 'center', templet: function (d) {
                        return d.mail == 0 ? '否' : '是'
                    }
                },

            ]]
            , id: 'goodsTableS'
            , page: true
            , loading: true,
            // ,method:'post'
            // ,limits: [10,20,50]

            request: {
                'pageName': 'pageNum',
                'limitName': 'pageSize'
            },
            where: {
                condition: sessionStorage.machineID,
                // mail:1
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
                permissions();
                if (res.code == 403) {
                    window.parent.location.href = "login.html";
                } else if (res.code == 405) {
                    $('.hangContent').show();
                }
            }

        });
    };
    // 查询同步价格商品
    $('.synchronousGoodsQuery').click(function () {
        synchronousGoodsTable.reload({
            where: {
                conditionTwo: $('.synchronousGoodsName').val()
            }
        })
    })
    // 同步商品价格售货机
    var machineTableS = null;

    function machineTableFun() {
        machineTableS = table.render({
            elem: '#machineTable',
            url: `${vApi}/machine/getMachineList`,
            method: 'post',
            contentType: "application/json",
            headers: {
                token,
            },
            cols: [[
                {checkbox: true},
                {
                    field: 'number', title: '售货机编号', align: 'center', templet: function (d) {
                        return d.number ? d.number : '-'
                    }
                },
                {
                    field: 'info', title: '售货机信息', align: 'center', templet: function (d) {
                        return d.info ? `<div>${d.info}</div>` : `<div><span style="color:red;">*</span>(售货机为新上线机器，请编辑售货机信息！)</div>`
                    }
                },
                {
                    field: 'location', title: '地址', align: 'center', templet: function (d) {
                        return d.location ? d.location : ' - '
                    }
                },
            ]]
            , id: 'machineIDTable'
            , page: true
            , loading: true
            , limits: [10, 20, 50, 100]
            ,
            request: {
                'pageName': 'pageNum',
                'limitName': 'pageSize'
            },
            where: {
                merchantId: sessionStorage.machineID
            },
            parseData: function (res) {
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
                permissions();
                if (res.code == 403) {
                    window.parent.location.href = "login.html";
                } else if (res.code == 405) {
                    $('.hangContent').show();
                }
            }
        });
    }

    $('.synchronousMachineQuery').click(function () {
        machineTableS.reload({
            where: {
                keyword: $('.synchronousMachineName').val()
            }
        })
    })
    // 确定同步价格
    $('.synchronousCont .synchronousCancel').click(function () {
        popupHide('synchronousCont', 'synchronousBox');
    })
    $('.synchronousCont .synchronousBtn').click(function () {
        var SGoodsArr = table.checkStatus('goodsTableS').data;
        var SMachineIDArr = table.checkStatus('machineIDTable').data;
        console.log(SGoodsArr);
        console.log(SMachineIDArr)
        if (SGoodsArr.length == 0 || SMachineIDArr.length == 0) {
            layer.msg('请选择需要同步价格的商品与售货机', {icon: 7});
            return;
        }
        ;
        layer.confirm('确定同步价格？', function (index) {
            layer.close(index);
            var SYGoodsVal = [],
                SYMachineVal = [];
            SGoodsArr.forEach(item => {
                var SGObj = {
                    goodId: item.goods_Id,
                    price: item.goods_Price
                };
                SYGoodsVal.push(SGObj)
            });
            SMachineIDArr.forEach(item => {
                var SMObj = {
                    machineId: item.machineId
                };
                SYMachineVal.push(SMObj)
            });
            var syncPriceObj = JSON.stringify({
                goods: SYGoodsVal,
                machines: SYMachineVal
            })
            loadingAjax('/goods/syncPrice', 'post', syncPriceObj, sessionStorage.token).then(res => {
                layer.msg(res.message, {icon: 1});
                synchronousGoodsTable.reload({
                    where: {}
                });
                machineTableS.reload({
                    where: {}
                });
                popupHide('synchronousCont', 'synchronousBox');
            }).catch(err => {
                layer.msg(err.message, {icon: 2})
                console.log(err)
            })

        });

    });
    // 图片放大事件
    var PImgSHow = true;
    $('body').on('mouseenter', '.pic102', function (e) {
        var that = this;
        $('#pic101').attr('src', $(that).attr('src'));
        var img = new Image();
        img.onload = function () {
            $("#pic101").css({
                "width": this.width >= this.height ? 335 + 'px' : 'auto',
                "height": this.height > this.width ? 450 + 'px' : 'auto'
            }).fadeIn("fast");
            this.onload = null;

        };
        img.src = $(that).attr('src');
    });
    $('.Goods-wrap').on('click', '.pic102', function () {
        event.stopPropagation();
        PImgSHow = false;
    });
    $('body').on('mouseleave', '.pic102', function () {
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
