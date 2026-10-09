(function () {
  'use strict';
  var query = window.matchMedia('(max-width: 600px)');
  var main = document.getElementById('left-side');
  var actions = document.querySelector('.hero-actions');
  var buttons = Array.from(actions.querySelectorAll('.button'));
  var slope = Math.tan(13 * Math.PI / 180);
  var scheduled = false;

  function setLength(element, property, value) {
    var next = value.toFixed(3) + 'px';
    if (element.style.getPropertyValue(property) !== next) element.style.setProperty(property, next);
  }

  function alignRail() {
    scheduled = false;
    if (!query.matches) return;
    var actionsTop = 0;
    var current = actions;
    // Layout offsets ignore the original ATLAS entrance transforms.
    while (current && current !== main) {
      actionsTop += current.offsetTop;
      current = current.offsetParent;
    }
    var startX = main.clientWidth * .72;
    var topX = startX + actionsTop * slope;
    setLength(document.body, '--rail-width', main.clientWidth);
    setLength(document.body, '--rail-top-x', topX);
    setLength(document.body, '--rail-bottom-x', topX - main.clientHeight * slope);
    var footer = document.querySelector('.site-footer');
    var footerBottom = footer.offsetTop + footer.offsetHeight;
    var edge = parseFloat(getComputedStyle(document.body).getPropertyValue('--edge'));
    setLength(document.body, '--rail-footer-width', Math.max(0, topX - footerBottom * slope - edge - 16));
    buttons.forEach(function (button) {
      var cut = button.offsetHeight * slope;
      setLength(button, '--rail-cut', cut);
      setLength(button, '--rail-button-width', startX - button.offsetTop * slope);
    });
  }

  function schedule() {
    if (!scheduled) { scheduled = true; window.requestAnimationFrame(alignRail); }
  }
  var observer = new ResizeObserver(schedule);
  observer.observe(main);
  observer.observe(document.querySelector('.hero-content'));
  window.addEventListener('resize', schedule);
  query.addEventListener('change', schedule);
  document.addEventListener('portfolio:languagechange', schedule);
  alignRail();
}());
