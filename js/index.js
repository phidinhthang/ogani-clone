const setup = () => {
	let width = window.innerWidth;
	$(window).resize(updateSize);
	handleResponsive(width);
	handleToggleSidebar();
	initialSlickNav();
	initialCarousel();
	initialMixItUp();
	toggleButtonFilter();
	handleLocalStorage();
	$('[data-id="amount"]').text('1');
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
	// SUB_DROPDOWN_MENU_SLICK_NAV
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
	// SUB_DROPDOWN_MENU_SLICK_NAV


	// BANNER_CATEGORIES_LIST_SLICK_NAV
	$('#banner__categories__label > a').click(function(){
		$('#banner__categories__list').slicknav('toggle')
	});
	$(function(){
        $('#banner__categories__list').slicknav({
        	'label':'',
        	'appendTo':'#banner__categories',
        });
    });
	// BANNER_CATEGORIES_LIST_SLICK_NAV
}

const initialCarousel = () => {
  	$(".categories .owl-carousel").owlCarousel({
  		loop:true,
	    nav:true,
	    autoplay:true,
	    autoplaySpeed:1500,
	    items:1,
	    dots:false,
	    navText:["<button class='owl-control-prev'><i class='fa fa-chevron-left'></i></button>","<button class='owl-control-next'><i class='fa fa-chevron-right'></i></button>"],
	    responsive: {
		    576:{
	            items:2,
	            loop:true
	        },
        768:{
            items:3,
            loop:true
        },
        992:{
            items:4,
            loop:true  
        }
      }
  	});
  	$(".lastest-product .owl-carousel").owlCarousel({
  		loop:true,
	    nav:true,
	    autoplay:true,
	    autoplaySpeed:1500,
	    items:1,
	    dots:false,
	    navText:["<button class='owl-control-prev'><i class='fa fa-chevron-left'></i></button>","<button class='owl-control-next'><i class='fa fa-chevron-right'></i></button>"],
  	});
}

const initialMixItUp = () => {
	var mixer = mixitup('.featured__list', {
    selectors: {
        target: '.mix'
    },
    animation: {
        duration: 300
    }
	});
}


const toggleButtonFilter = () => {
	$('.featured__list__control__group button').click((e)=>{
		$('.featured__list__control__group button').removeClass('active');
		$(e.target).addClass('active');
	})
}



const handleLocalStorage = () => {
	let allProducts = getProducts() ? getProducts() : initialLocalStorage();
	console.log(allProducts.length);
	console.log($('#amountOfAllProducts'));
}
const initialLocalStorage = () => {
	localStorage.setItem('allProducts','[]');
	return getProducts();
}
const getProducts = () => {
	return JSON.parse(localStorage.getItem('allProducts'));
}