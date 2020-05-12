layui.use(['form', 'layer', 'laydate'], function () {
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
})