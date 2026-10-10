/* Native links work without JavaScript; PhotoSwipe adds the existing zoom experience. */
(function () {
  'use strict';
  var links = Array.from(document.querySelectorAll('[data-gallery-image]'));
  var overlay = document.querySelector('.pswp');
  var escape = function (value) { return String(value).replace(/[&<>"']/g, function (c) { return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]; }); };
  links.forEach(function (link, index) {
    link.addEventListener('click', function (event) {
      if (event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || !window.PhotoSwipe || !window.PhotoSwipeUI_Default) return;
      event.preventDefault();
      var items = links.map(function (anchor) {
        var caption = anchor.closest('figure').querySelector('figcaption');
        return {src:anchor.href,w:Number(anchor.dataset.width),h:Number(anchor.dataset.height),title:escape(caption.querySelector('h3').textContent)+'<small>'+escape(caption.querySelector('small').textContent)+' · '+escape(caption.querySelector('p').textContent)+'</small>'};
      });
      var gallery = new PhotoSwipe(overlay,PhotoSwipeUI_Default,items,{index:index,history:false,shareEl:false,showAnimationDuration:0,hideAnimationDuration:0});
      var background = Array.from(document.querySelectorAll('body > header, body > main, body > footer'));
      background.forEach(function (node) { node.inert = true; });
      gallery.listen('destroy',function(){background.forEach(function(node){node.inert=false;});link.focus({preventScroll:true});});
      gallery.init();
    });
  });
}());
