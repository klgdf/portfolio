"use strict";

@@include('clicks.js')


// Модальные окна.
function popupOpen(eID) {
	document.querySelector('body').classList.add('overflow-hidden');
	let element = document.getElementById(eID);
	element.classList.remove('hidden');
}
function popupClose(eID) {
	document.querySelector('body').classList.remove('overflow-hidden');
	let element = document.getElementById(eID);
	element.classList.add('hidden');
}

// Основной код после загрузки страницы.
document.addEventListener('DOMContentLoaded', function () {


	var details = document.querySelectorAll("details");
	for (let i = 0; i < details.length; i++) {
		details[i].addEventListener("toggle", accordion);
	}
	function accordion(event) {
		if (!event.target.open) return;
		var details = event.target.parentNode.children;
		for (let i = 0; i < details.length; i++) {
			if (details[i].tagName != "DETAILS" || !details[i].hasAttribute('open') || event.target == details[i]) continue;
			details[i].removeAttribute("open");
		}
	}

	//ТАБЫ(УСЛУГИ)
	let service_tabs = document.querySelectorAll('.service-tabs__item');
	for (let i = 0; i < service_tabs.length; i++) {
		service_tabs[i].dataset.tab = i;
		service_tabs[i].addEventListener('click', function (e) {

			let els = document.querySelectorAll('.service-tabs__item');
			for (let j = 0; j < els.length; j++) {
				els[j].classList.remove('active');
			}
			console.log(els)

			let
				el = e.target,
				id = el.dataset.tab;

			e.target.classList.add('active');
			document.querySelectorAll('.service-slider').forEach(element => {
				element.classList.add('hidden');
			});
			document.querySelectorAll('.service-slider')[id].classList.remove('hidden');
		});
	}

	// СЛАЙДЕР (УСЛУГИ)
	if (document.querySelector('.service-slider')) {
		let service = new Swiper('.service-slider', {
			breakpoints: {
				320: {
					slidesPerView: 1,
				},
				440: {
					slidesPerView: 2,
					spaceBetween: 10,
				},
				991: {
					slidesPerView: 2,
					spaceBetween: 10,
				},
				1279: {
					slidesPerView: 1,
					spaceBetween: 10,
				},
			},
			observer: true,
			mousewheel: false,
			autoplay: {
				delay: 4000,
				disableOnInteraction: false,
			},
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			},
		});
	}

	// СЛАЙДЕР (ОТЗЫВЫ)
	if (document.querySelector('.reviews-slider')) {
		let reviews = new Swiper('.reviews-slider', {
			slidesPerView: 1,
			observer: true,
			mousewheel: false,
			autoplay: {
				delay: 4000,
				disableOnInteraction: false,
			},
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			},
		});
	}

	// СЛАЙДЕР (ПРАЙС МОБИЛЬНЫЙ)
	if (document.querySelector('.price-slider')) {
		let price = new Swiper('.price-slider', {
			breakpoints: {
				320: {
					slidesPerView: 1,
				},
				440: {
					slidesPerView: 2,
					spaceBetween: 10,
				},
			},
			lazy: true,
			observer: true,
			mousewheel: false,
			autoplay: {
				delay: 4000,
				disableOnInteraction: false,
			},
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			},
		});
	}

	documentClicks();

});

const smoothLinks = document.querySelectorAll('a[href^="#"]');
for (let smoothLink of smoothLinks) {
	smoothLink.addEventListener('click', function (e) {
		e.preventDefault();
		const id = smoothLink.getAttribute('href');

		document.querySelector(id).scrollIntoView({
			behavior: 'smooth',
			block: 'start'
		});
	});
};

window.addEventListener('scroll', function () {
	if (document.querySelector('html').scrollTop > 0) {
		document.querySelector('.header').classList.add('header_bg');
	} else {
		document.querySelector('.header').classList.remove('header_bg');
	}
});

// window.addEventListener('scroll', function () {
// 	let
// 		scroll_top = document.querySelector('html').scrollTop,
// 		window_height = document.documentElement.clientHeight,
// 		screen_center = window_height / 2,
// 		scroll_screen_center = scroll_top + screen_center,
// 		all_section = document.querySelectorAll('section'),
// 		all_section_scroll_sizes = 



// });
