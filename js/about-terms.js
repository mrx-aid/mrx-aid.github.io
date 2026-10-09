/* Native disclosure stays usable if motion or JavaScript is unavailable. */
(function () {
  'use strict';
  var details = document.getElementById('terms-disclosure');
  if (!details) return;
  var summary = details.querySelector('summary');
  var content = document.getElementById('terms-content');
  var collapse = details.querySelector('.terms-collapse');
  var motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  var animation = null;
  var expanded = details.open;
  collapse.hidden = false;

  function finish(open) {
    details.open = open;
    content.inert = !open;
    details.classList.remove('is-animating');
    if (animation) { animation.cancel(); animation = null; }
  }

  function toggle(open) {
    var from = details.getBoundingClientRect().height;
    if (animation) { animation.cancel(); animation = null; }
    expanded = open;
    if (!open && content.contains(document.activeElement)) summary.focus({ preventScroll: true });
    content.inert = !open;
    if (motion.matches || !details.animate) { finish(open); return; }

    details.open = true;
    var to = open ? details.getBoundingClientRect().height : summary.getBoundingClientRect().height + 2;
    details.classList.add('is-animating');
    animation = details.animate([{ height: from + 'px' }, { height: to + 'px' }], {
      duration: open ? 420 : 320,
      easing: 'cubic-bezier(.2,.7,.2,1)'
    });
    animation.onfinish = function () { finish(open); };
  }

  summary.addEventListener('click', function (event) { event.preventDefault(); toggle(!expanded); });
  collapse.addEventListener('click', function () {
    // Move back to the summary before collapsing a tall block, within this panel only.
    var scroller = details.closest('.panel-scroll');
    var offset = details.getBoundingClientRect().top - scroller.getBoundingClientRect().top;
    if (offset < 0) scroller.scrollTop += offset - 20;
    toggle(false);
  });
  content.addEventListener('focusin', function () { if (animation && expanded) finish(true); });
  motion.addEventListener('change', function () { if (animation) finish(expanded); });
  window.addEventListener('resize', function () { if (animation) finish(expanded); });
  content.inert = !expanded;
}());
