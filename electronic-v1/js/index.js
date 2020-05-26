$(function(){
	var Flag=true;
	$('.an img').click(function(){
		if(Flag){
			$(this).addClass('active');
			Flag=false;
		}else{
			$(this).removeClass('active');
			Flag=true;
		}
		$('.detail').slideToggle();
	});
	$('.invoice input').blur(function(){
		if($(this).val()){
			$('.invoiceTitle').fadeOut();
		}else{
			$('.invoiceTitle').fadeIn();
		}
	});
	$('.email input').blur(function(){
		if($(this).val()){
			$('.emailTitle').fadeOut();
		}else{
			$('.emailTitle').fadeIn();
		}
	})
	
	//提交
	$('.footerBtn').click(function(){
		$('.mask').fadeIn();
		$('.wrap').addClass('position')
	})
})
