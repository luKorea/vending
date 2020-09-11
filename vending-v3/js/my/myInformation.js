import '../../MyCss/my/myInformation.css';
layui.use(['layer','form'], function () {
    var layer=layui.layer;
    // 点击编辑事件
    $('.editBtnClcick').click(function () {
        $('.editCont').fadeIn();
        $('.edit').removeClass('marginVh')
    });
    // 取消编辑事件
    $('.editCancel').click(function () {
        $('.edit').addClass('marginVh');
        $('.editCont').fadeOut();
    });

    // 点击修改密码事件
    $('.loginPawClick').click(function () {
        $('.loginPawCont').fadeIn();
        $('.loginPaw').removeClass('marginVh')
    })
    $('.loginPawCancel').click(function () {
        $('.loginPaw').addClass('marginVh')
        $('.loginPawCont').fadeOut();
    });

    // 点击修改独立密码事件
    $('.independentPawClick').click(function () {
        $('.independentPawCont').fadeIn();
        $('.independentPaw').removeClass('marginVh');
    });
    $('.independentPawCancel').click(function () {
        $('.independentPaw').addClass('marginVh');
        $('.independentPawCont').fadeOut();
    });
    function information() {
        loadingAjax('/api/user/getUserInfo', 'post', '', sessionStorage.token,'','','',layer).then(res => {
            console.log(res);
            var informationText = `<div class="linehei">
                                        <span class="names"><span style="color:red;">*</span>用户名：</span>
                                        <span class="mytitle">${res.data.userName}</span>
                                    </div>
                                    <div class="linehei">
                                        <span class="names"><span style="color:red;">*</span>姓名：</span>
                                        <span class="mytitle">${res.data.name}</span>
                                    </div>
                                    <div class="linehei">
                                        <span class="names"><span style="color:red;">*</span>联系电话：</span>
                                        <span class="mytitle">${res.data.phone}</span>
                                    </div>
                                    <div class="linehei">
                                        <span class="names"><span style="color:red;">*</span>用户编号：</span>
                                        <span class="mytitle">${res.data.alias}</span>
                                    </div> 
                                    <div class="linehei">
                                        <span class="names"><span style="color:red;">*</span>所属商户：</span>
                                        <span class="mytitle">${res.data.merchantName?res.data.merchantName:'-'}</span>
                                    </div> `;
            $('.basicInformation').html(informationText)

        }).catch(err => {
            console.log(err);
            layer.msg(err.message, { icon: 2 })
        })
    }
    information();
    $('.editPassBtn').click(function(){
        console.log($(this).attr('editType'))
        var ele=null,
            element=null,
         typeIndex=null
        if($(this).attr('editType')=='login'){
            element='loginPawCont';
            ele='loginPaw';
            typeIndex='0'
        }else if($(this).attr('editType')=='independent'){
            element='independentPawCont'
            ele='independentPaw';
            typeIndex='1'
        }
        if(!($(`.${ele} input[name="oldPass"]`).val()&&$(`.${ele} input[name="newPassTwo"]`).val()&&$(`.${ele} input[name="newPassTwo"]`).val())){
            layer.msg('带*为必填',{icon:7});
            return ;
        }
        if($(`.${ele} input[name="newPass"]`).val()!=$(`.${ele} input[name="newPassTwo"]`).val()){
            layer.msg('新密码与确认密码不一致',{icon:7});
            return ;
        }
        var passData=JSON.stringify({
            old:hex_md5($(`.${ele} input[name="oldPass"]`).val()),
            password:hex_md5($(`.${ele} input[name="newPass"]`).val()),
            confirm:hex_md5($(`.${ele} input[name="newPassTwo"]`).val()),
            type:typeIndex
        })
        loadingAjax('/api//user/updatePsw','post',passData,sessionStorage.token,'mask',element,ele,layer).then(res=>{
            layer.msg(res.message +(typeIndex=='0'?'请重新登录':''),{icon:1})
            if(typeIndex==0){
                setTimeout(_=>{
                    loginOut();
                },1500)
            }
            $(`.${ele} input[name="oldPass"]`).val('');
            $(`.${ele} input[name="newPass"]`).val('');
            $(`.${ele} input[name="newPassTwo"]`).val('')
        }).catch(err=>{
            layer.msg(err.message,{icon:2})
        })
        
    });

    // 正则判断密码
    $('.passEdit input').blur(function(){
        passRegular(this,layer)
    });


    function loginOut() {
        loadingAjax('/api/user/logout', 'post', '', sessionStorage.token, '', '', '', layer).then((res) => {
            console.log(res)
            // window.history.go(-1);
            sessionStorage.token = '';
            window.parent.location.href = "login.html";
        }).catch((err) => {
            console.log(err)
            layer.msg(err.message)
        })
    };
    // 监听f5刷新
   $("body").bind("keydown", function (event) {
    if (event.keyCode == 116) {
      f5Fun()
    }
  });
})

// permissionsVal(393,394,395)
// permissionsVal(393,394,395).then(res=>{
//     console.log(res)
// }).catch(err=>{
//     console.log(err)
// })