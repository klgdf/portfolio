/*

	Может стоит переделать на data-event=""

*/



function ClickSelector(element, className) {
	try {
		if (element.classList.contains(className)) {
			return element;
		} else {
			let el = (element.closest('.' + className)) ? element.closest('.' + className) : false;
			return el;
		}
	} catch (err) {
	}
}

function documentClicks() {
	document.addEventListener('click', function (e) {

		// Все действия с этом блоке зависят от element
		let
			target = e.target,
			element = false;

		// Пример на все случаи
		// if (document.querySelector('.select')) {
		//   element = ClickSelector(target, 'select');
		//   if (element) {
		//     ETPOpen();
		//   } else {
		//     selectClose();
		//     document.querySelector('.selector').classList.remove('active');
		//   }
		// }

		if (document.querySelector('#menu')) {
			element = ClickSelector(target, 'e_menu');
			if (element) {
				popupOpen('menu');
			}
			element = ClickSelector(target, 'e_menu_close');
			if (element) {
				popupClose('menu');
			}
			element = ClickSelector(target, 'menu-nav');
			if (element) {
				popupClose('menu');
			}
			element = ClickSelector(target, 'menu-call');
			if (element) {
				popupClose('menu');
			}
		}

		if (document.querySelector('#callback')) {
			element = ClickSelector(target, 'e_callback');
			if (element) {
				popupOpen('callback');
			}
			element = ClickSelector(target, 'e_callback_close');
			if (element) {
				popupClose('callback');
			}
		}


		if (document.querySelector('#activity')) {
			element = ClickSelector(target, 'e_activity');
			if (element) {
				popupOpen('activity');
			}
			element = ClickSelector(target, 'e_activity_close');
			if (element) {
				popupClose('activity');
			}
		}

		if (document.querySelector('#call')) {
			element = ClickSelector(target, 'e_call');
			if (element) {
				popupOpen('call');
			}
			element = ClickSelector(target, 'e_call_close');
			if (element) {
				popupClose('call');
			}
		}

		if (document.querySelector('.methods-box-1')) {
			element = ClickSelector(target, 'methods-box-1__item');
			if (element) {
				document.querySelectorAll('.methods-box-1__item').forEach(element => {
					element.classList.remove('active');
				});
				element.classList.toggle('active');
			}
		}

		if (document.querySelector('.methods-box-3')) {
			element = ClickSelector(target, 'methods-box-3__item');
			if (element) {
				document.querySelectorAll('.methods-box-3__item').forEach(element => {
					element.classList.remove('active');
				});
				element.classList.toggle('active');
			}

			element = ClickSelector(target, 'methods-box-3__open');
			if (element) {
				document.querySelector('.methods-box-3').classList.add('active');
				document.querySelector('.methods-box-3__close').classList.add('active');
				element.classList.remove('active');
			}
			element = ClickSelector(target, 'methods-box-3__close');
			if (element) {
				document.querySelector('.methods-box-3').classList.remove('active');
				document.querySelector('.methods-box-3__open').classList.add('active');
				element.classList.remove('active');
			}
		}

	});
}
