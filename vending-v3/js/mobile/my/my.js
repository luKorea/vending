import '../../../MyCss/mobile/my/my.scss';
import { loadAjax, loadingWith, loadingOut, toastTitle } from '../../../common/common.js'
$('.loginPassBtn').click(function(){
    $('.mask').show();
    $('.changeLoginPass').fadeIn().children('.changeBox').addClass('top30').parent('.changeLoginPass');
})