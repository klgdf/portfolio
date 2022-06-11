/* BEGIN TARIF TABS */

function clickSelector(element, className) {
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


document.addEventListener('click', function (e) {

	// Все действия с этом блоке зависят от element
	let
		target = e.target,
		element = false;

	if (document.querySelector('.select-langs')) {
		element = clickSelector(target, 'select-langs');
		if (element) {
			element.classList.toggle('active');
		} else {
			document.querySelector('.select-langs').classList.remove('active');
		}
	}

});


let elements = document.querySelectorAll('.accounts-list__tab');
for (let i = 0; i < elements.length; i++) {
	elements[i].dataset.tab = i;
}

document.querySelectorAll('.accounts-list__tab').forEach(element => {
	element.addEventListener('click', function (e) {
		document.querySelectorAll('.accounts-list__conditions').forEach(element => {
			element.classList.add('hidden');
		});
		let id = e.target.closest('.accounts-list__tab').dataset.tab;
		document.querySelectorAll('.accounts-list__conditions')[id].classList.remove('hidden');
	});
});

if (document.querySelector('select')) {
	let selects = document.querySelectorAll('select');
	for (i = 0; i < selects.length; i++) {
		selects[i].onchange = function (e) {
			console.log(e);
			if (e.target.value !== '') {
				e.target.classList.add('fillet');
			} else {
				e.target.classList.remove('fillet');
			}
		}

	}
}




/* END TARIF TABS */
