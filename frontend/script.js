document.addEventListener('DOMContentLoaded', init);

function init() {
  let sectors = document.querySelectorAll('.eizens__block');

  sectors.forEach(function(el) {

    el.addEventListener('click', function() {
      let input = prompt('Enter the task');
      let inputEl = document.createElement('div');
      inputEl.classList.add('task-el');

      inputEl.textContent = input;

      this.appendChild(inputEl);
    });

  });



}

