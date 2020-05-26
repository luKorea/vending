layui.use([ 'form', 'layer', ], function () {
    var  layer=layui.layer;
    // 预览图片
    $('.ImgPreviewClick').click(function(){
        $('.previewImgContnet').fadeIn();
        $(' .ImgPreview').removeClass('margin0') 
    });
    // 关闭预览
    $('.ImgPreview .ImgHeader button').click(function(){
        $('.ImgPreview').addClass('margin0');
        $('.previewImgContnet').fadeOut();
    });

    // 点击切换图片
    var files=null;
    $('.InputFile input').change(function(e){
        console.log(e);
        files=e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = ()=>{
            const img  = reader.result
            // document.body.appendChild(img)  // reader.result为获取结果
            $('.background img').attr('src',img);
            console.log(img)
          }
    });
    // 点击上传图片
        $('.ImgUpload button').click(function(){
            if(files){

            }else{
                layer.msg('请更换图片')
            }
        });

        // 点击修改图片
        $('.editImgClick').click(function(){
            $('.editImgContent').fadeIn();
            $('.editImg').removeClass('margin0');
        });
        $('.editImg .ImgHeader button').click(function(){
            $('.editImg').addClass('margin0');
            $('.editImgContent').fadeOut();
        })
})