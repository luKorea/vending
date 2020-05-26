layui.use(['table', 'form', 'layer', 'layedit'], function () {
    var $ = layui.jquery;
    // 点击编辑事件
    $('.editBtnClcick').click(function(){
        $('.editCont').fadeIn();
        $('.edit').removeClass('marginVh')
    });
    // 取消编辑事件
    $('.editCancel').click(function(){
        $('.edit').addClass('marginVh');
        $('.editCont').fadeOut();
    });

    // 点击修改密码事件
    $('.loginPawClick').click(function(){
        $('.loginPawCont').fadeIn();
        $('.loginPaw').removeClass('marginVh')
    })
    $('.loginPawCancel').click(function(){
        $('.loginPaw').addClass('marginVh')
        $('.loginPawCont').fadeOut();    
    });
    
    // 点击修改独立密码事件
    $('.independentPawClick').click(function(){
        $('.independentPawCont').fadeIn();
        $('.independentPaw').removeClass('marginVh');
    });
    $('.independentPawCancel').click(function(){
        $('.independentPaw').addClass('marginVh');
        $('.independentPawCont').fadeOut();
    })
})