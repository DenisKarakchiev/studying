'use strict';

document.documentElement.children[1].children[0].children[0].textContent = 'this element gets by \'document.documentElement.children[1].children[0].children[0]\'';

if (document.querySelectorAll('.query-test-elem')[1].hasChildNodes()) {
  document.querySelectorAll(
      '.query-test-elem')[1].innerHTML = 'first of \'.query-test-elem\' has child nodes';
}

// Напишите код, который выделит все ячейки в таблице по диагонали.
let rows = document.querySelectorAll('table tr');

rows.forEach(function(row, i) {
  paintTd(row.children[i]);
});

function paintTd(td) {
  td.style.cssText = 'background-color: red; color: white;';
}

// polifyll for el.closest();

if (!Element.prototype.closest) {
  Element.prototype.closest = function(el) {
    let target = this;

    while (target) {
      if (target.matches(el)) return target;
      else target = target.parentElement();
    }
  };
}

// let widget = document.querySelector('#widget');

// let widgetName = widget.getAttribute('data-widget-name');

let links = document.querySelectorAll('.external-links-list a');

links.forEach(function(el) {
  let href = el.getAttribute('href');

  if (href.indexOf('://') === -1) return false;
  else if (href.indexOf('internal.com') !== -1) return false;

  el.classList.add('external');
});

// Напишите функцию removeChildren, которая удаляет всех потомков элемента.
function removeChildren(elem) {
  while (elem.children[0]) {
    elem.removeChild(elem.children[0]);
  }
}

document.querySelector('.remove-children-test__btn').addEventListener('click', function() {
  removeChildren(document.querySelector('.remove-children-test')); // очищает список
});
