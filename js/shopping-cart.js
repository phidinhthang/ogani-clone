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
	handleLocalStorage();
	renderCartItem();
	handleChangeCart();
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



	// SUB_DROPDOWN_MENU_SLICK_NAV


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


const renderCartItem = () => {
	let html = '';
	allProducts.forEach(item => {
		html += `
			<div class="row shopping-cart__item py-4">
				<div class="col-4 col-md-6">
					<div class="shopping-cart__item__img__wrapper row">
						<div class="col-md-4">
						<img src=${item.image} alt="">
							
						</div>
						<div class="col-md-8" data-name="product">
						<p>${item.name}</p>
							
						</div>
					</div>
				</div>
				<div class="col-8 col-md-6 ">
					<div class="row mt-4">
						<div class="col-3 col-lg-4 ">
							<p class="d-flex justify-content-center mt-3 shopping-cart__item__price" data-price="single">${formatPrice(parseFloat(item.price))}</p>
						</div>
						<div class="col-6 col-lg-4 d-flex justify-content-center shopping-cart__item__button-group">
							<button class="decrement">-</button>
							<input type="number" value="${item.amount}">
							<button class="increment">+</button>
						</div>
						<div class="col-3 col-lg-4 ">
							<p class="d-flex justify-content-center mt-3 shopping-cart__item__price" data-price="total">${formatPrice(parseFloat(item.price)*item.amount)}</p>
						</div>
					</div>
				</div>
				<button class="shopping-cart__item__remove"><i class="fa fa-times"></i></button>
			</div>
		`
	});
	$('.shopping-cart__wrapper').append(html);
}



const handleChangeCart = () => {
	$('.shopping-cart__item__remove').on('click',removeItem);
	$('.shopping-cart__item .increment').on('click',incrementInput);
	$('.shopping-cart__item .decrement').on('click',decrementInput);
	$('[data-update="cart"]').on('click',updateCart);
}

const formatPrice = (price) => {
	return "$" + parseFloat(price).toFixed(2);
}


const removeItem = function () {
	$(this).parent().remove();
}

const incrementInput = function () {
	const input = $(this).parent().find('input');
	let value = input.val();
	value++;
	input.val(value);

	const totalElement = $(this).parent().parent().parent().find('[data-price="total"]');
	const price = parseFloat($(this).parent().parent().parent().find('[data-price="single"]').text().slice(1));
	totalElement.text(formatPrice(value*price))
}

const decrementInput = function () {
	const input = $(this).parent().find('input');
	let value = input.val();
	if(value == 0) return;
	value--;
	input.val(value);

	const totalElement = $(this).parent().parent().parent().find('[data-price="total"]');
	const price = parseFloat($(this).parent().parent().parent().find('[data-price="single"]').text().slice(1));
	totalElement.text(formatPrice(value*price))
}

const updateCart = function() {
	const newProducts = [];
	$('.shopping-cart__item').each(function(i, obj) {
		const newNameProduct = $(this).find('[data-name="product"]').text();
		const newPriceProduct = ((Math.round(parseFloat($(this).find('[data-price="single"]').text().slice(1))*100))/100).toFixed(2);
		const newAmountProduct = $(this).find('input').val();
		const newImageProduct = $(this).find('img').attr('src');
		const newProduct = {
			name:newNameProduct,
			price:newPriceProduct,
			amount:newAmountProduct,
			image:newImageProduct
		}
		newProducts.push(newProduct);
	});
	console.log(newProducts);
	localStorage.setItem('allProducts',JSON.stringify(newProducts));
	location.reload();
}