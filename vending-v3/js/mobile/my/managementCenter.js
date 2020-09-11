import '../../../MyCss/mobile/my/managementCenter.scss';
import { loadAjax, loadingWith, loadingOut, toastTitle ,showPopup,closeParents,closeWindow,passRegular,outLogin} from '../../../common/common.js'
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
$('.goodsModule').click(function(){
    showPopup('.goodsChild','.goodsChildBox','top30')
});
$('.goodsChildBox').click(function(){
    event.stopPropagation();
});
$('.goodsChild').click(function(){
    closeWindow(this,'top30')
})
// 点击进入商品类目
$('.goodsClass').click(function(){
    window.location.href="M_class.html"
})