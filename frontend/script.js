document.addEventListener('DOMContentLoaded', init);

function init() {
  let sectors = document.querySelectorAll('.eizens__block');

  let inputs = document.querySelectorAll('.eizens__block-input');
  sectors.forEach(function(el) {

    el.addEventListener('click', function() {
      this.querySelector('.eizens__block-input').focus();
    });
  });

  inputs.forEach(function(el) {
    el.addEventListener('keypress', function(event) {
      if (event.key === 'Enter') {
        let value   = this.value;
        let inputEl = document.createElement('div');
        inputEl.classList.add('task-el');
        inputEl.textContent = value;
        this.parentNode.appendChild(inputEl);
        this.value = '';
      }
    });
  });

  let menu    = document.querySelector('.menu');
  let menuBtn = document.querySelector('.menu__button');

  menuBtn.addEventListener('click', function() {
    menu.classList.toggle('menu_visible');
  });
}

