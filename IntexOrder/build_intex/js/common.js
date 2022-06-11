"use strict";

/* BEGIN BASE FUNCTIONS */

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

//табы
function tabChoice(num) {
  let elements = document.querySelectorAll('.tab_inner > form');
  for (let i = 0; i < elements.length; i++) {
    elements[i].classList.add('hidden');
  }
  switch (num) {
    case 0:
      elements[0].classList.remove('hidden');
      break;
    case 1:
      elements[1].classList.remove('hidden');
      break;
    case 2:
      elements[2].classList.remove('hidden');
      break;
  }
}

// Циклические ссылки
function circularReference() {
  // Против циклических ссылок на главной
  if (document.querySelector('.home')) {
    let home = document.querySelectorAll('.home');
    for (let i = 0; i < home.length; i++) {
      home[i].addEventListener('click', function () {
        window.location.pathname = '/';
      });
    }
  }
  // Против циклических ссылок на других страницах
  if (document.querySelector('.self')) {
    let self = document.querySelectorAll('.self');
    for (let i = 0; i < self.length; i++) {
      self[i].addEventListener('click', function () {
        window.location = window.location;
      });
    }
  }
}

//invalid input
function invalid(e) {
  if (e.target.value == '') {
    e.target.placeholder = e.target.dataset.placeholder;
    e.target.classList.add('input-invalid');
  } else {
    e.target.classList.remove('input-invalid');
  }
}
let input_required = document.querySelectorAll('.input-required');
for (let i = 0; i < input_required.length; i++) {
  input_required[i].addEventListener('change', invalid);
  input_required[i].addEventListener('click', invalid);
  input_required[i].addEventListener('keyup', invalid);
}

//счётчик товаров
function addHandlers(count) {
  let minus = count.querySelector(".quantity__minus");
  let number = count.querySelector(".quantity__number");
  let plus = count.querySelector(".quantity__plus");
  plus.addEventListener("click", function () {
    number.innerText++;
  });
  minus.addEventListener("click", function () {
    if (number.innerText != 0) {
      number.innerText--;
    }
  });
}

let counts = document.querySelectorAll(".quantity");
counts.forEach(addHandlers);
/* END BASE FUNCTIONS */

// Основной код после загрузки страницы.
document.addEventListener('DOMContentLoaded', function () {



  (function () { // Базовые функции
    circularReference();
    documentClicks();
  }());
});