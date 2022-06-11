function documentClicks() {
  document.addEventListener('click', function (e) {

    // Все действия с этом блоке зависят от element
    let element = e.target;

    if (document.querySelector('.select')) {
      if (element.classList.contains('select') || element.closest('.select')) {
      } else {
        selectClose();
      }
    }
  });
}