let el = document.querySelector('.experiment-element');

if (el.matches === undefined) {
  console.log('need polyfill');
  Object.defineProperty(Element.prototype, 'matches', {
    value: Element.prototype.matchesSelector || Element.prototype.webkitMatchesSelector,
  });
} else {
  console.log('doesn\'t need a polyfill');
}

if (el.matches('.experiment-element')) {
  console.log('matches');
} else {
  console.log('not matches');
}
