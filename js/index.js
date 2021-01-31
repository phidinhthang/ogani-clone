const setup = () => {
	let width = window.innerWidth;
	$(window).resize(updateSize);
	handleResponsive(width);
	handleToggleSidebar();
	initialSlickNav();
}
$(document).ready(setup);


const updateSize = (e) => {
	width = window.innerWidth;
	handleResponsive(width);
}

const handleResponsive = (width) => {
	if(width < 992){
		$('.header__bottom').innerHeight(130);
		$('.sidebar').css('display','block');
	}else {
		$('.header__bottom').innerHeight(80);
		$('.sidebar').css('display','none');
	}	
}

const handleToggleSidebar = () => {
	$('.header__bottom .toggle').click(() => {
		$('.sidebar').addClass('open');
		$('.sidebar__menu').css('transform','translateX(0px)');
	});
	$('.sidebar__overlay').click(() => {
		$('.sidebar__menu').css('transform','translateX(-300px)');
		setTimeout(()=>{
			$('.sidebar').removeClass('open');
		},300)
	})
}


const initialSlickNav = () => {
	$('#sub__dropdown > a').click(function(){
		$('#sub__dropdown__menu').slicknav('toggle')
	});
	$(function(){
        $('#sub__dropdown__menu').slicknav({
        	'label':'',
        	'appendTo':'#sub__dropdown',
        	'beforeOpen': function(){
        		$('.slicknav_arrow').text('▼')
        	}, // Called before menu or sub-menu opened.
					'beforeClose': function(){
						$('.slicknav_arrow').text('►')
					} // Called before menu or sub-menu closed.
        });
    });
}