layui.use(['form', 'layer', 'laydate'], function () {
    ImagePreview.init({id:$("#ImgFlex img")})
    // tab切换
    $('.navTab li').click(function () {
        $(this).addClass('active').siblings().removeClass('active');
        let that = $(this);
        $('.tabLine').animate({
            left: (that.offset().left - 4) + 'px'
        }, 500);
        if ($(this).index() == 0) {
            $('.ImgContnet').animate({
                left: 0
            }, 500);
            $('.VideoContnet').animate({
                left: 100 + '%'
            }, 500);
        } else {
            $('.ImgContnet').animate({
                left: -100 + '%'
            }, 500);
            $('.VideoContnet').animate({
                left: 0
            }, 500);
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
        console.log($(this))
    })
})