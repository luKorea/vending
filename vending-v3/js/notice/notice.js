import '../../MyCss/notice/notice.css'
// import E from '../../assets/public/wangEditor.min'
layui.use(['table', 'form', 'layer',], function () {
    var table = layui.table,
        form = layui.form,
        layer = layui.layer,
        token = sessionStorage.token,
        noticeTableIns = table.render({
            elem: '#noticeTable',
            cols: [[
                { field: 'theTitle', width: 450, title: '标题' },
                { field: 'status', width: 150, title: '状态', },
                { field: 'addtime', width: 180, title: '发布时间', },
                { field: 'adduser', width: 200, title: '发布人', },
                { field: 'operation', width: 150, title: '操作', toolbar: '#barDemo' },
            ]],
            data: [
                {
                    theTitle: '尊敬的商户，我司提现审核工作已恢复，请悉知',
                    status: '启用',
                    addtime: '2020-04-27 10:40:31',
                    adduser: 'sysadmin',
                },
                {
                    theTitle: '尊敬的商户，我司提现审核工作已恢复，请悉知',
                    status: '启用',
                    addtime: '2020-04-27 10:40:31',
                    adduser: 'sysadmin',
                }
            ]
        })
    var E = window.wangEditor;
    var addWangEditor = new E('#addWangEditor')
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
        error: function (xhr, editWangEditor) {
            layer.msg('图片上传失败')
        },
    };
    addWangEditor.create();


    // 关闭弹窗
    $('.playHeader .close').click(function () {
        $(this).parent().parent().addClass('margin0')
        $(this).parents('.maskContnet').fadeOut();
    });

    // 发布公告按钮
    $('.addPushBtn').click(function(){
        popupShow('addEditCont','modificationBox')
    })
})