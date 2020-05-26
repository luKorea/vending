layui.use(['form', 'layer', 'laydate','table'], function () {
    ImagePreview.init({id:$("#ImgFlex img")})
    // tab切换
    $('.navTab li').click(function () {
        $(this).addClass('active').siblings().removeClass('active');
        let that = $(this);
        $('.tabLine').animate({
            left: (that.offset().left) + 'px'
        }, 500);
        if ($(this).index() == 0) {
            onStep('VideoContnet','ImgContnet');
        } else {
            nextStep('ImgContnet','VideoContnet')
        }
    });


    //   时间选择器
    var laydate = layui.laydate;
    laydate.render({
        elem: '#itemrs1',
        value: new Date(),
        max: '0'
    });
    laydate.render({
        elem: '#itemrs2',
        value: new Date(),
        max: '0'
    });
    $('.videoList video').click(function(){
        // console.log($(this))
        $('.playVideo video').attr('src',$(this).attr('src'))
        $('.videoPlay').fadeIn();
    });


    // 关闭视频弹窗
    $('.mask').click(function(){
        $('.videoPlay').fadeOut(function(){
            $('.playVideo video').attr('src','')
        });   
    });
    // 添加图片弹出框
    $('.ImgContnet .add-btn').click(function(){
        $('.addImgCont').fadeIn();
        $('.addImgBox').removeClass('margin0')
    })
    // 关闭添加图片
    $('.addImgFooter .cancel-btn').click(function(){
        $('.addImgBox').addClass('margin0');
        $('.addImgCont').fadeOut();
    })
    // 添加视频弹出框
    $('.VideoContnet .add-btn').click(function(){
        $('.addVideoCont').fadeIn();
        $('.addVideoBox').removeClass('margin0')
    });
    // 关闭添加视频
    $('.addVideoFooter .cancel-btn').click(function(){
        $('.addVideoCont').fadeOut();
        $('.addVideoBox').addClass('margin0')
    })

    var table=layui.table,
        advertisingLis = table.render({
        elem: '#ImgData'

        , cols: [[
            { field: 'Img', width: 150, title: '素材图',templet: "#imgtmp" },
            { field: 'phone', width: 180, title: '素材名', },
            { field: 'CreationTime', width: 200, title: '素材编号', },
            { field: 'bili', width: 180, title: '发布时间', sort: true },
            { field: '2', width: 150, title: '发布人', },
            // {field:'operation', width:120, title: 'caozuo', sort: true, fixed: 'right'}
            { field: 'operation', width: 150, title: '操作', toolbar: '#barDemo',},

        ]],
        data: [
            {
                Img:'http://172.16.68.199:8087/image/1d1704c6-59ad-4566-9436-803fb4c5d24b.jpg ',
                username: '2222'
                , phone: 'cs45121'
                , CreationTime: '支付宝'
                , amendTime: '99'
                , bili: '1:2'
            },
            {
                Img:'http://172.16.68.199:8087/image/1d1704c6-59ad-4566-9436-803fb4c5d24b.jpg ',
                username: '2222'
                , phone: 'cs45121'
                , CreationTime: '支付宝'
                , amendTime: '99'
                , bili: '1:2'
            }
        ]
        , page: true
        , id: 'ImgListData'

    });
  var  videoTable = table.render({
        elem: '#VideoData'

        , cols: [[
            { field: 'Img', width: 150, title: '微缩图',templet: "#imgtmp" },
            { field: 'phone', width: 180, title: '素材名', },
            { field: 'CreationTime', width: 200, title: '素材编号', },
            { field: 'bili', width: 180, title: '发布时间', sort: true },
            { field: '2', width: 150, title: '发布人', },
            // {field:'operation', width:120, title: 'caozuo', sort: true, fixed: 'right'}
            { field: 'operation', width: 150, title: '操作', toolbar: '#barDemo',},

        ]],
        data: [
            {
                Img:'http://172.16.68.199:8087/image/1d1704c6-59ad-4566-9436-803fb4c5d24b.jpg ',
                username: '2222'
                , phone: 'cs45121'
                , CreationTime: '支付宝'
                , amendTime: '99'
                , bili: '1:2'
            },
            {
                Img:'http://172.16.68.199:8087/image/1d1704c6-59ad-4566-9436-803fb4c5d24b.jpg ',
                username: '2222'
                , phone: 'cs45121'
                , CreationTime: '支付宝'
                , amendTime: '99'
                , bili: '1:2'
            }
        ]
        , page: true
        , id: 'VideoListData'

    });
})