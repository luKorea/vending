import '../../../MyCss/mobile/login/login.scss'
function swiperFun(){
    var swipe = new huiSwpie('#swipe');
    swipe.autoPlay = true;
    swipe.delay  =3000;
    swipe.run();
}
if(sessionStorage.keepFlag){
    $('.keep input[name="aihao[]"]').prop('checked',true)
}else{
    $('.keep input[name="aihao[]"]').prop('checked',false)
}
swiperFun();
$('.loginBtn').click(function(){
    
    // console.log($('.keep input[name="aihao[]"]').prop('checked'))
})