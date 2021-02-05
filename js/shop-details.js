const initialLocalStorage = () => {
	localStorage.setItem('allProducts','[]');
	return getProducts();
}
const getProducts = () => {
	return JSON.parse(localStorage.getItem('allProducts'));
}
let allProducts = getProducts() ? getProducts() : initialLocalStorage();

window.addEventListener('load',()=>{
	$('.preloader-wrapper').addClass('preloader-finish');
})

const setup = () => {
	let width = window.innerWidth;
	$(window).resize(updateSize);
	handleResponsive(width);
	handleToggleSidebar();
	initialSlickNav();
	initialCarousel();
	$('select').niceSelect();
	// initialMixItUp();
	// toggleButtonFilter();
	handleLocalStorage();
	toggleImage();
	toggleTab();
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
	    autoplay:true,
	    autoplaySpeed:1500,
	    items:4,
	    dots:false,
	    margin:30,
  	});
}





const handleLocalStorage = () => {
	$('[data-id="amount"]').text(allProducts.length);
	updatePrice();
	console.log(allProducts);
	$('.add-to-cart').on('click',addToCart);
}

function addToCart(e) {
	const nameProduct = $(this).parent().parent().parent().find('h4').text();
	const priceProduct = parseFloat($(this).parent().parent().parent().find('p').text().replace("$",""));
	const imageProduct = $(this).parent().parent().parent().find('img').attr('src');
	const product = {
		name:nameProduct,
		price:priceProduct,
		amount:1,
		image:imageProduct
	}
	let onCart = false;
	allProducts.forEach(product => {
		if(product.name == nameProduct){
			onCart = true;
		}
	})
	if(!onCart){
		allProducts.push(product);
		$('[data-id="amount"]').text(allProducts.length);
	}else {
		allProducts.filter(product => product.name == nameProduct)[0].amount++;
	}
	localStorage.setItem('allProducts',JSON.stringify(allProducts));
	updatePrice();
}

const updatePrice = () => {
	if(allProducts.length){
		let total = allProducts.reduce((s,product) => s + product.price*product.amount,0);
		total = (Math.round(total*100)/100).toFixed(2);
		$('[data-id="price"]').text(`$${total}`);
	}
}


const toggleImage = () => {
	$('.product__item').click(function(){
		console.log(this.dataset.target)
		$('.vegetables-pagake__show__product__img img').attr('src',`asset/images/product-details-${this.dataset.target}.jpg`)
	})
}

const toggleTab = () => {

	$('.shop-tab__control h3').on('click',function(){
		$('.shop-tab__control h3').removeClass('active')
		$(this).addClass('active');
		$('.shop-tab__content__item').removeClass('active');
		$(this.dataset['target']).addClass('active');
	})
}