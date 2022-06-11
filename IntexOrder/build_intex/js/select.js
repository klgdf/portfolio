function selectClose() {
  for (let i = 0; i < document.querySelectorAll('.select').length; i++) {
    document.querySelectorAll('.select')[i].classList.remove('active');
  }
}

function selectList(e) {
  let element = e.target;
  let select = element.classList.contains('select') ? element : element.closest('.select');
  if (!select.classList.contains('active')) {
    select.classList.add('active');
  } else {
    if (element.tagName == 'li' || element.closest('li')) {
      select.querySelector('input').value = element.innerText;
    }
    if (!select.querySelector('input:focus')) {
      select.classList.remove('active');
    }
  }
}

function selectSearch(e) {
  let find = e.target.value.toLowerCase();
  let list = e.target.closest('.select').querySelectorAll('.select-list li')
  let arr_list = [];
  for (let i = 0; i < list.length; i++) {
    if (list[i].innerText.toLowerCase().indexOf(find) === 0) {
      list[i].classList.remove('hidden');
    } else {
      list[i].classList.add('hidden');
    }

  }
}

if (document.querySelector('.select')) {
  for (let i = 0; i < document.querySelectorAll('.select').length; i++) {
    document.querySelectorAll('.select')[i].addEventListener('click', selectList);
    document.querySelectorAll('.select')[i].querySelector('.select-input').addEventListener('keyup', selectSearch);
    document.querySelectorAll('.select')[i].querySelector('.select-input').addEventListener('change', selectSearch);
  }
}

