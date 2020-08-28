import '../../../MyCss/mobile/my/managementCenter.scss';
function swiperFun() {
    var swipe = new huiSwpie('#swipe');
    swipe.autoPlay = true;
    swipe.delay = 3000;
    swipe.run();
}
swiperFun();
$('#footer').load('M_footerNav.html');
$('body').on('click','.childBox .my',function(){
    window.location.href='M_my.html'
})